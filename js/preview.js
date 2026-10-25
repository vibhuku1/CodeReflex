/**
 * CodeReflex - Live Preview Component
 * Handles dynamic sandbox rendering for HTML/CSS and interactive
 * simulated execution console for JS/Python.
 */

export class PreviewManager {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentChallenge = null;
    this.activeTab = 'preview'; // 'preview' | 'specs'
    this.init();
  }

  init() {
    this.renderShell();
  }

  renderShell() {
    this.container.innerHTML = `
      <div class="preview-header">
        <div class="preview-tabs">
          <button class="preview-tab active" data-tab="preview" id="tab-live-preview">
            <span class="preview-tab-indicator"></span>
            <span id="preview-tab-title">Live Preview</span>
          </button>
          <button class="preview-tab" data-tab="specs" id="tab-specs">
            <span>Challenge Specs</span>
          </button>
        </div>
        <div class="preview-controls">
          <span class="preview-badge" id="preview-status-badge">Ready</span>
          <button class="preview-reload-btn" id="preview-refresh-btn" title="Refresh Preview">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="preview-body" id="preview-content-area">
        <!-- Dynamic content injected here -->
      </div>
    `;

    // Tab click handlers
    this.container.querySelectorAll('.preview-tab').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        this.container.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
        tabBtn.classList.add('active');
        this.activeTab = tabBtn.dataset.tab;
        this.renderContent();
      });
    });

    const refreshBtn = this.container.querySelector('#preview-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.update(0);
      });
    }
  }

  setChallenge(challenge) {
    this.currentChallenge = challenge;
    const tabTitle = this.container.querySelector('#preview-tab-title');
    if (tabTitle) {
      if (challenge.mode === 'build') {
        tabTitle.textContent = 'Live Component';
      } else if (challenge.language === 'javascript' || challenge.language === 'python') {
        tabTitle.textContent = 'Simulated Console';
      } else if (challenge.mode === 'normal') {
        tabTitle.textContent = 'Reader Insights';
      } else {
        tabTitle.textContent = 'Live Render';
      }
    }
    this.renderContent();
  }

  /**
   * Called as user types to update real-time visual progress
   * @param {number} progressPercent (0 to 100)
   * @param {string} typedText
   */
  update(progressPercent, typedText = '') {
    if (!this.currentChallenge) return;

    const badge = this.container.querySelector('#preview-status-badge');
    if (badge) {
      if (progressPercent >= 100) {
        badge.textContent = 'Compiled';
        badge.className = 'preview-badge badge-success';
      } else if (progressPercent > 0) {
        badge.textContent = `Typing ${progressPercent}%`;
        badge.className = 'preview-badge badge-active';
      } else {
        badge.textContent = 'Idle';
        badge.className = 'preview-badge';
      }
    }

    if (this.activeTab === 'preview') {
      if (this.currentChallenge.mode === 'build' || this.currentChallenge.previewType === 'html' || this.currentChallenge.previewType === 'css') {
        this.updateHtmlPreview(progressPercent, typedText);
      } else if (this.currentChallenge.previewType === 'console' || this.currentChallenge.previewType === 'terminal') {
        this.updateConsolePreview(progressPercent);
      }
    }
  }

  renderContent() {
    const contentArea = this.container.querySelector('#preview-content-area');
    if (!contentArea || !this.currentChallenge) return;

    if (this.activeTab === 'specs') {
      this.renderSpecsTab(contentArea);
      return;
    }

    // Live Preview Tab
    const mode = this.currentChallenge.mode;
    const pType = this.currentChallenge.previewType;

    if (mode === 'build' || pType === 'html' || pType === 'css') {
      contentArea.innerHTML = `
        <div class="iframe-container">
          <iframe id="preview-sandbox-iframe" sandbox="allow-same-origin" title="Live Preview"></iframe>
        </div>
      `;
      this.updateHtmlPreview(0, '');
    } else if (pType === 'console' || pType === 'terminal') {
      contentArea.innerHTML = `
        <div class="terminal-container" id="terminal-view">
          <!-- Terminal lines render here -->
        </div>
      `;
      this.updateConsolePreview(0);
    } else if (pType === 'reading') {
      this.renderReadingInsights(contentArea);
    }
  }

  updateHtmlPreview(progressPercent, typedText) {
    const iframe = this.container.querySelector('#preview-sandbox-iframe');
    if (!iframe) return;

    let htmlContent = '';
    let cssContent = '';

    if (this.currentChallenge.mode === 'build') {
      cssContent = this.currentChallenge.baseStyles || '';
      // Progressive reveal: if incomplete, reveal typed partial HTML with safe fallback
      if (progressPercent >= 98) {
        htmlContent = this.currentChallenge.code;
      } else if (progressPercent > 10) {
        // Render typed text or target snippet with opacity mask
        htmlContent = `
          <div style="opacity: ${Math.max(0.25, progressPercent / 100)}; transition: opacity 0.2s;">
            ${this.safeHtmlSlice(this.currentChallenge.code, progressPercent)}
          </div>
        `;
      } else {
        htmlContent = `
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; color:#64748b; font-family:sans-serif; text-align:center; padding:20px;">
            <div style="width:40px; height:40px; border-radius:8px; border:2px dashed #334155; margin-bottom:12px; display:flex; align-items:center; justify-content:center;">
              <span style="font-size:18px;">⚡</span>
            </div>
            <p style="font-size:14px; margin:0 0 6px 0; color:#94a3b8; font-weight:500;">Component Wireframe</p>
            <p style="font-size:12px; margin:0;">Start typing code to construct the UI live.</p>
          </div>
        `;
      }
    } else if (this.currentChallenge.previewType === 'html') {
      cssContent = this.currentChallenge.cssContext || '';
      htmlContent = progressPercent >= 95 ? this.currentChallenge.code : this.safeHtmlSlice(this.currentChallenge.code, progressPercent);
    } else if (this.currentChallenge.previewType === 'css') {
      htmlContent = this.currentChallenge.htmlContext || '';
      cssContent = progressPercent >= 95 ? this.currentChallenge.code : this.currentChallenge.code;
    }

    const docContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            ${cssContent}
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    iframe.srcdoc = docContent;
  }

  safeHtmlSlice(fullCode, progress) {
    if (progress >= 100) return fullCode;
    // For clean preview rendering during typing, render the full skeleton with dynamic opacity or progressive build
    return `
      <div class="render-wrapper" style="opacity: ${Math.min(1, Math.max(0.15, progress / 100))}; filter: blur(${progress < 30 ? '1px' : '0px'}); transition: all 0.3s ease;">
        ${fullCode}
      </div>
    `;
  }

  updateConsolePreview(progressPercent) {
    const termView = this.container.querySelector('#terminal-view');
    if (!termView || !this.currentChallenge.previewContent) return;

    const data = this.currentChallenge.previewContent;
    const lines = data.terminalLines || [];

    // Calculate how many terminal output lines to reveal based on typing progress
    const linesToShow = progressPercent === 0 
      ? 1 
      : Math.min(lines.length, Math.ceil((progressPercent / 100) * lines.length));

    let html = `
      <div class="term-window">
        <div class="term-bar">
          <div class="term-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="term-title">${this.currentChallenge.language === 'python' ? 'python3 (simulated virtualenv)' : 'node v20.x runner'}</div>
        </div>
        <div class="term-output">
    `;

    for (let i = 0; i < linesToShow; i++) {
      const line = lines[i];
      let lineClass = 'term-line';
      let icon = '';

      if (line.type === 'input') {
        lineClass += ' term-cmd';
        icon = '<span class="term-prompt">$</span>';
      } else if (line.type === 'success') {
        lineClass += ' term-success';
        icon = '<span class="term-status-icon">✓</span>';
      } else if (line.type === 'warn') {
        lineClass += ' term-warn';
        icon = '<span class="term-status-icon">⚠</span>';
      } else if (line.type === 'info') {
        lineClass += ' term-info';
      }

      html += `<div class="${lineClass}">${icon}<span class="term-text">${this.escapeHtml(line.text)}</span></div>`;
    }

    if (progressPercent < 100) {
      html += `
        <div class="term-line term-cursor-line">
          <span class="term-prompt">&gt;</span>
          <span class="term-typing-indicator">Typing snippet... (${progressPercent}% complete)</span>
          <span class="term-caret"></span>
        </div>
      `;
    } else {
      html += `
        <div class="term-line term-done-line">
          <span class="term-success">Process completed with code 0 (0 errors).</span>
        </div>
      `;
    }

    html += `
        </div>
      </div>
    `;

    // Also include test suite results if present
    if (data.tests) {
      html += `
        <div class="term-test-suite">
          <div class="test-suite-header">
            <span>Automated Verification Checks</span>
            <span class="test-counter">${progressPercent >= 100 ? `${data.tests.length}/${data.tests.length} PASS` : `Running (${progressPercent}%)`}</span>
          </div>
          <div class="test-list">
      `;
      data.tests.forEach((t, idx) => {
        const isPassed = progressPercent >= ((idx + 1) / data.tests.length) * 100;
        html += `
          <div class="test-item ${isPassed ? 'test-passed' : 'test-pending'}">
            <span class="test-icon">${isPassed ? '✓' : '○'}</span>
            <span class="test-label">${t.label}</span>
          </div>
        `;
      });
      html += `
          </div>
        </div>
      `;
    }

    termView.innerHTML = html;
  }

  renderReadingInsights(container) {
    const c = this.currentChallenge;
    const content = c.previewContent || {};

    container.innerHTML = `
      <div class="reading-card">
        <div class="reading-meta-tag">${content.category || 'Engineering Fundamentals'}</div>
        <h4 class="reading-title">${c.title}</h4>
        <p class="reading-desc">${c.description}</p>
        
        <div class="reading-details">
          <div class="reading-stat">
            <span class="reading-stat-label">Source</span>
            <span class="reading-stat-val">${content.source || 'Standard Reference'}</span>
          </div>
          <div class="reading-stat">
            <span class="reading-stat-label">Read Time</span>
            <span class="reading-stat-val">${content.readingTime || '1 min'}</span>
          </div>
        </div>

        <div class="concept-tags">
          <span class="concept-label">Target Concepts:</span>
          ${(content.concepts || []).map(cp => `<span class="concept-pill">${cp}</span>`).join('')}
        </div>
      </div>
    `;
  }

  renderSpecsTab(container) {
    const c = this.currentChallenge;
    container.innerHTML = `
      <div class="specs-view">
        <div class="specs-header">
          <div class="specs-badge">${c.language.toUpperCase()}</div>
          <div class="specs-badge badge-diff-${c.difficulty}">${c.difficulty.toUpperCase()}</div>
          <div class="specs-mode">${c.mode.toUpperCase()} MODE</div>
        </div>
        <h3 class="specs-title">${c.title}</h3>
        <p class="specs-desc">${c.description}</p>
        
        <div class="specs-code-block">
          <div class="specs-block-header">Expected Syntax &amp; Signature</div>
          <pre><code>${this.escapeHtml(c.expectedOutput || c.code)}</code></pre>
        </div>

        <div class="specs-tip">
          <strong>Practice Tip:</strong> Pay attention to exact bracket matching and semicolon placement. Proper touch typing on programming symbols increases coding velocity dramatically.
        </div>
      </div>
    `;
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

