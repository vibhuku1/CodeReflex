/**
 * CodeReflex - Live Preview Component
 * Handles Target Design preview (Ready state) and Progressive Live Build
 * as the user types HTML/CSS or simulated execution for JS/Python.
 */

export class PreviewManager {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentChallenge = null;
    this.activeTab = 'preview'; // 'preview' | 'specs'
    this.currentState = 'ready'; // 'ready' | 'building' | 'completed'
    this.currentProgress = 0;
    this.currentTypedText = '';
    this.showingTarget = false; // When building, user can peek at target

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
          <span class="preview-badge" id="preview-status-badge">Target Design</span>
          <button class="preview-reload-btn" id="preview-refresh-btn" title="Reset View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Preview Sub-Header Status Banner -->
      <div class="preview-status-banner" id="preview-status-banner">
        <div class="banner-left">
          <span class="banner-badge badge-ready" id="banner-state-badge">Target Design</span>
          <span class="banner-title" id="banner-challenge-title">Challenge</span>
        </div>
        <div class="banner-right">
          <div class="banner-hint" id="banner-hint-text">
            <span class="pulse-indicator"></span>
            <span id="banner-hint-msg">Start typing in editor to build</span>
          </div>
          <button type="button" class="banner-toggle-btn" id="banner-toggle-target-btn" style="display:none;">
            View Target
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
        this.showingTarget = false;
        this.update(this.currentProgress, this.currentTypedText);
      });
    }

    const toggleTargetBtn = this.container.querySelector('#banner-toggle-target-btn');
    if (toggleTargetBtn) {
      toggleTargetBtn.addEventListener('click', () => {
        this.showingTarget = !this.showingTarget;
        this.renderActiveState();
      });
    }
  }

  setChallenge(challenge) {
    this.currentChallenge = challenge;
    this.currentState = 'ready';
    this.currentProgress = 0;
    this.currentTypedText = '';
    this.showingTarget = false;

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

    this.currentProgress = progressPercent;
    this.currentTypedText = typedText;

    // Determine state
    if (progressPercent >= 100) {
      this.currentState = 'completed';
      this.showingTarget = false;
    } else if (progressPercent > 0 || (typedText && typedText.length > 0)) {
      this.currentState = 'building';
    } else {
      // 0 progress = ready / restarted
      this.currentState = 'ready';
      this.showingTarget = false;
    }

    this.updateStatusBanner();

    if (this.activeTab === 'preview') {
      this.renderActiveState();
    }
  }

  updateStatusBanner() {
    const banner = this.container.querySelector('#preview-status-banner');
    const badge = this.container.querySelector('#preview-status-badge');
    const bannerBadge = this.container.querySelector('#banner-state-badge');
    const bannerTitle = this.container.querySelector('#banner-challenge-title');
    const bannerHint = this.container.querySelector('#banner-hint-msg');
    const toggleBtn = this.container.querySelector('#banner-toggle-target-btn');

    if (!bannerTitle || !this.currentChallenge) return;

    bannerTitle.textContent = this.currentChallenge.title;

    if (this.currentState === 'ready') {
      // State A: Ready (Before Typing Starts)
      if (badge) {
        badge.textContent = 'Ready';
        badge.className = 'preview-badge';
      }
      if (bannerBadge) {
        bannerBadge.textContent = 'Target Design';
        bannerBadge.className = 'banner-badge badge-ready';
      }
      if (bannerHint) {
        bannerHint.textContent = 'Start typing in editor to build';
      }
      if (toggleBtn) {
        toggleBtn.style.display = 'none';
      }
    } else if (this.currentState === 'building') {
      // State B: Building (In Progress)
      if (badge) {
        badge.textContent = `Building ${this.currentProgress}%`;
        badge.className = 'preview-badge badge-active';
      }
      if (bannerBadge) {
        bannerBadge.textContent = this.showingTarget ? 'Target Preview' : `Live Build • ${this.currentProgress}%`;
        bannerBadge.className = 'banner-badge badge-building';
      }
      if (bannerHint) {
        bannerHint.textContent = this.showingTarget ? 'Viewing target reference' : 'Progressively rendering your code';
      }
      if (toggleBtn) {
        toggleBtn.style.display = 'inline-block';
        toggleBtn.textContent = this.showingTarget ? 'Back to Live Build' : 'View Target';
        toggleBtn.classList.toggle('active', this.showingTarget);
      }
    } else if (this.currentState === 'completed') {
      // State C: Completed
      if (badge) {
        badge.textContent = 'Compiled';
        badge.className = 'preview-badge badge-success';
      }
      if (bannerBadge) {
        bannerBadge.textContent = 'Completed';
        bannerBadge.className = 'banner-badge badge-completed';
      }
      if (bannerHint) {
        bannerHint.textContent = '✓ Component built successfully';
      }
      if (toggleBtn) {
        toggleBtn.style.display = 'none';
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
      this.renderActiveState();
    } else if (pType === 'console' || pType === 'terminal') {
      contentArea.innerHTML = `
        <div class="terminal-container" id="terminal-view">
          <!-- Terminal lines render here -->
        </div>
      `;
      this.renderActiveState();
    } else if (pType === 'reading') {
      this.renderReadingInsights(contentArea);
    }
  }

  renderActiveState() {
    this.updateStatusBanner();

    const mode = this.currentChallenge.mode;
    const pType = this.currentChallenge.previewType;

    if (mode === 'build' || pType === 'html' || pType === 'css') {
      this.updateHtmlPreview();
    } else if (pType === 'console' || pType === 'terminal') {
      this.updateConsolePreview();
    }
  }

  /**
   * Renders either the completed target or the user's progressive code
   */
  updateHtmlPreview() {
    const iframe = this.container.querySelector('#preview-sandbox-iframe');
    if (!iframe || !this.currentChallenge) return;

    let htmlToRender = '';
    let cssToRender = '';

    const isShowingTarget = (this.currentState === 'ready' || (this.currentState === 'building' && this.showingTarget) || this.currentState === 'completed');

    if (isShowingTarget) {
      // 1. Full Completed Target Design
      if (this.currentChallenge.mode === 'build') {
        htmlToRender = this.currentChallenge.code;
        cssToRender = this.currentChallenge.baseStyles || '';
      } else if (this.currentChallenge.previewType === 'html') {
        htmlToRender = this.currentChallenge.code;
        cssToRender = this.currentChallenge.cssContext || '';
      } else if (this.currentChallenge.previewType === 'css') {
        htmlToRender = this.currentChallenge.htmlContext || '';
        cssToRender = this.currentChallenge.code;
      }
    } else {
      // 2. Progressive Live Build from User's Typed Code
      if (this.currentChallenge.mode === 'build') {
        cssToRender = this.currentChallenge.baseStyles || '';
        htmlToRender = this.sanitizeAndCloseHtml(this.currentTypedText);
      } else if (this.currentChallenge.previewType === 'html') {
        cssToRender = this.currentChallenge.cssContext || '';
        htmlToRender = this.sanitizeAndCloseHtml(this.currentTypedText);
      } else if (this.currentChallenge.previewType === 'css') {
        htmlToRender = this.currentChallenge.htmlContext || '';
        cssToRender = this.sanitizePartialCss(this.currentTypedText);
      }
    }

    this.injectIntoIframe(iframe, htmlToRender, cssToRender);
  }

  /**
   * Injects HTML and CSS into the sandbox iframe with zero flicker
   */
  injectIntoIframe(iframe, htmlContent, cssContent) {
    const fullDoc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style id="preview-style">
      ${cssContent}
    </style>
  </head>
  <body>
    <div id="preview-root">${htmlContent}</div>
  </body>
</html>`;

    try {
      const doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
      if (doc && doc.getElementById('preview-style') && doc.getElementById('preview-root')) {
        // Direct fast DOM update: prevents white flash and retains iframe stability
        doc.getElementById('preview-style').textContent = cssContent;
        doc.getElementById('preview-root').innerHTML = htmlContent;
        return;
      }
    } catch {
      // Fallback if cross-origin or uninitialized
    }

    iframe.srcdoc = fullDoc;
  }

  /**
   * Progressively repairs and auto-closes unclosed HTML tags as the user types
   */
  sanitizeAndCloseHtml(rawHtml) {
    if (!rawHtml || !rawHtml.trim()) return '';

    // 1. Strip scripts and inline handlers for absolute safety
    let safe = rawHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    safe = safe.replace(/on\w+\s*=\s*['\"][^'\"]*['\"]/gi, '');
    safe = safe.replace(/on\w+\s*=\s*[^>\s]+/gi, '');

    // 2. If the user is mid-typing a tag (e.g. '<h3' or '<button cla'), strip the incomplete trailing tag
    safe = safe.replace(/<[^>]*$/, '');

    // 3. Track unclosed tags and auto-close them in reverse order
    const openTags = [];
    const tagRegex = /<\/?([a-zA-Z0-9]+)(\s+[^>]*?)?(\/?)>/g;
    const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    let match;

    while ((match = tagRegex.exec(safe)) !== null) {
      const isClosing = match[0].startsWith('</');
      const tagName = match[1].toLowerCase();
      const isSelfClosing = match[3] === '/' || voidTags.has(tagName);

      if (isClosing) {
        const idx = openTags.lastIndexOf(tagName);
        if (idx !== -1) {
          openTags.splice(idx, 1);
        }
      } else if (!isSelfClosing) {
        openTags.push(tagName);
      }
    }

    // Auto-close open tags
    while (openTags.length > 0) {
      safe += '</' + openTags.pop() + '>';
    }

    return safe;
  }

  /**
   * Progressively auto-closes unclosed CSS blocks
   */
  sanitizePartialCss(rawCss) {
    if (!rawCss || !rawCss.trim()) return '';

    // Strip unclosed comments
    let clean = rawCss.replace(/\/\*[\s\S]*?\*\//g, '');
    clean = clean.replace(/\/\*[\s\S]*$/, '');

    let openCount = (clean.match(/{/g) || []).length;
    let closeCount = (clean.match(/}/g) || []).length;

    while (openCount > closeCount) {
      clean += ' }';
      closeCount++;
    }

    return clean;
  }

  /**
   * Terminal Console preview for JavaScript and Python
   */
  updateConsolePreview() {
    const termView = this.container.querySelector('#terminal-view');
    if (!termView || !this.currentChallenge || !this.currentChallenge.previewContent) return;

    const data = this.currentChallenge.previewContent;
    const lines = data.terminalLines || [];
    const isReady = (this.currentState === 'ready');
    const isCompleted = (this.currentState === 'completed');

    // In ready state, show the target expected output
    const linesToShow = isReady 
      ? lines.length 
      : (isCompleted ? lines.length : Math.max(1, Math.ceil((this.currentProgress / 100) * lines.length)));

    let html = `
      <div class="term-window">
        <div class="term-bar">
          <div class="term-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="term-title">
            ${this.currentChallenge.language === 'python' ? 'python3 runner' : 'node runner'} — ${isReady ? 'Expected Target Execution' : 'Live Execution'}
          </div>
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

    if (isReady) {
      html += `
        <div class="term-line term-cursor-line" style="color:var(--accent-cyan);">
          <span class="term-prompt">&gt;</span>
          <span class="term-typing-indicator">Target benchmark reference ready. Start typing code to execute live.</span>
        </div>
      `;
    } else if (!isCompleted) {
      html += `
        <div class="term-line term-cursor-line">
          <span class="term-prompt">&gt;</span>
          <span class="term-typing-indicator">Typing snippet... (${this.currentProgress}% complete)</span>
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

    // Automated test verification checks
    if (data.tests) {
      html += `
        <div class="term-test-suite">
          <div class="test-suite-header">
            <span>Automated Verification Checks</span>
            <span class="test-counter">
              ${isReady ? '3/3 Target Criteria' : (isCompleted ? `${data.tests.length}/${data.tests.length} PASS` : `Running (${this.currentProgress}%)`)}
            </span>
          </div>
          <div class="test-list">
      `;
      data.tests.forEach((t, idx) => {
        const isPassed = isReady || isCompleted || (this.currentProgress >= ((idx + 1) / data.tests.length) * 100);
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
