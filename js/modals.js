/**
 * CodeReflex - Modal Controllers
 * Handles Completion Summary, Settings, and Progress / History Modals
 */

export class ModalManager {
  constructor(options = {}) {
    this.onRetry = options.onRetry || (() => {});
    this.onNextChallenge = options.onNextChallenge || (() => {});
    this.onSettingsSave = options.onSettingsSave || (() => {});
    this.onClearHistory = options.onClearHistory || (() => {});
    this.getHistory = options.getHistory || (() => ({}));
    this.getSettings = options.getSettings || (() => ({}));

    this.activeModal = null;
    this.init();
  }

  init() {
    this.bindGlobalKeys();
  }

  bindGlobalKeys() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.activeModal) {
          if (this.activeModal.id === 'completion-modal') {
            this.closeAll();
            this.onRetry();
          } else {
            this.closeAll();
          }
        }
      }
    });
  }

  closeAll() {
    document.querySelectorAll('.modal-overlay').forEach(el => {
      el.classList.add('hidden');
    });
    this.activeModal = null;
  }

  showCompletion(metrics, challenge, levelMeta = null) {
    const modal = document.querySelector('#completion-modal');
    if (!modal) return;

    this.activeModal = modal;

    // Fill metrics
    modal.querySelector('#result-wpm').textContent = metrics.wpm;
    modal.querySelector('#result-accuracy').textContent = `${metrics.accuracy}%`;
    modal.querySelector('#result-time').textContent = metrics.elapsedTimeFormatted;
    modal.querySelector('#result-raw-wpm').textContent = metrics.rawWpm;
    modal.querySelector('#result-errors').textContent = metrics.errorCount;
    modal.querySelector('#result-chars').textContent = metrics.totalChars;

    // Challenge title
    modal.querySelector('#result-challenge-title').textContent = challenge.title;
    modal.querySelector('#result-challenge-lang').textContent = challenge.language.toUpperCase();

    // Check Level Mode specific completion state
    const levelTargetEl = modal.querySelector('#result-level-target');
    const nextBtn = modal.querySelector('#result-next-btn');
    const nextBtnSpan = nextBtn ? nextBtn.querySelector('span:first-child') : null;

    if (levelMeta && levelMeta.isLevelMode) {
      if (levelTargetEl) {
        levelTargetEl.style.display = 'block';
        levelTargetEl.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        levelTargetEl.style.color = '#34d399';
        levelTargetEl.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        const nextText = levelMeta.isProgressionV2
          ? `Challenge #${challenge.challengeIndex || 1} completed (${metrics.accuracy}% accuracy)! Progress saved.`
          : (challenge.part < 3 ? `Part ${challenge.part} completed (${metrics.accuracy}% accuracy)! Part ${challenge.part + 1} is now unlocked.` : `Level 1 Mastered! All 3 parts completed (${metrics.accuracy}% accuracy)!`);
        levelTargetEl.innerHTML = `<strong>✓ Challenge Completed:</strong> ${nextText}`;
      }

      if (nextBtnSpan) {
        nextBtnSpan.textContent = levelMeta.isProgressionV2
          ? 'Continue Next Challenge'
          : (challenge.part < 3 ? `Continue to Part ${challenge.part + 1}` : 'Level 1 Complete!');
      }
    } else {
      if (levelTargetEl) levelTargetEl.style.display = 'none';
      if (nextBtnSpan) nextBtnSpan.textContent = 'Next Snippet';
    }

    // Render speed progression sparkline or stats
    this.renderResultSpeedChart(modal.querySelector('#result-chart-area'), metrics.keystrokeLog);

    modal.classList.remove('hidden');

    // Focus primary button
    if (nextBtn) {
      setTimeout(() => nextBtn.focus(), 50);
    }

    // Attach listeners
    const retryBtn = modal.querySelector('#result-retry-btn');
    if (retryBtn) {
      retryBtn.onclick = () => {
        this.closeAll();
        this.onRetry();
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        this.closeAll();
        if (levelMeta && levelMeta.isLevelMode && !levelMeta.passedTarget) {
          this.onRetry();
        } else {
          this.onNextChallenge();
        }
      };
    }
  }

  renderResultSpeedChart(container, log) {
    if (!container) return;
    if (!log || log.length < 5) {
      container.innerHTML = `
        <div class="chart-empty">Steady typing rhythm recorded.</div>
      `;
      return;
    }

    // Downsample keystrokes into 10 buckets
    const bucketCount = 12;
    const bucketSize = Math.max(1, Math.floor(log.length / bucketCount));
    const samples = [];

    for (let i = 0; i < log.length; i += bucketSize) {
      const slice = log.slice(i, i + bucketSize);
      const avgWpm = Math.round(slice.reduce((acc, curr) => acc + (curr.wpm || 0), 0) / slice.length);
      samples.push(avgWpm);
    }

    const maxWpm = Math.max(1, ...samples);
    const minWpm = Math.min(...samples);

    let barsHtml = samples.map((val, idx) => {
      const heightPercent = Math.max(15, Math.round((val / maxWpm) * 100));
      return `
        <div class="chart-bar-col" title="Interval ${idx + 1}: ${val} WPM">
          <div class="chart-bar" style="height: ${heightPercent}%;"></div>
          <span class="chart-bar-label">${val}</span>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="chart-wrapper">
        <div class="chart-title">Speed Progression (WPM per interval)</div>
        <div class="chart-bars-container">
          ${barsHtml}
        </div>
      </div>
    `;
  }

  showSettings(currentSettings) {
    const modal = document.querySelector('#settings-modal');
    if (!modal) return;
    this.activeModal = modal;

    // Set form controls to current settings
    const fontSizeSelect = modal.querySelector('#setting-font-size');
    const caretSelect = modal.querySelector('#setting-caret-style');
    const tabSizeSelect = modal.querySelector('#setting-tab-size');
    const autoIndentCheck = modal.querySelector('#setting-auto-indent');
    const soundCheck = modal.querySelector('#setting-sound');

    if (fontSizeSelect) fontSizeSelect.value = currentSettings.fontSize;
    if (caretSelect) caretSelect.value = currentSettings.caretStyle;
    if (tabSizeSelect) tabSizeSelect.value = currentSettings.tabSize;
    if (autoIndentCheck) autoIndentCheck.checked = currentSettings.autoIndent;
    if (soundCheck) soundCheck.checked = currentSettings.soundEnabled;

    modal.classList.remove('hidden');

    // Close handlers
    modal.querySelectorAll('.modal-close-trigger').forEach(btn => {
      btn.onclick = () => this.closeAll();
    });

    const form = modal.querySelector('#settings-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const updated = {
          fontSize: parseInt(fontSizeSelect.value, 10),
          caretStyle: caretSelect.value,
          tabSize: parseInt(tabSizeSelect.value, 10),
          autoIndent: autoIndentCheck.checked,
          soundEnabled: soundCheck.checked
        };
        this.onSettingsSave(updated);
        this.closeAll();
      };
    }
  }

  showProgress() {
    const modal = document.querySelector('#progress-modal');
    if (!modal) return;
    this.activeModal = modal;

    const history = this.getHistory();

    // Summary stats
    const totalSessions = history.sessions.length;
    const totalTimeSecs = history.totalPracticeSeconds || 0;
    const timeFormatted = `${Math.floor(totalTimeSecs / 60)}m ${totalTimeSecs % 60}s`;

    let avgAccuracy = 100;
    if (totalSessions > 0) {
      const sumAcc = history.sessions.reduce((acc, s) => acc + (s.accuracy || 100), 0);
      avgAccuracy = Math.round(sumAcc / totalSessions);
    }

    modal.querySelector('#progress-total-challenges').textContent = history.totalCompletedChallenges || totalSessions;
    modal.querySelector('#progress-total-time').textContent = timeFormatted;
    modal.querySelector('#progress-avg-accuracy').textContent = `${avgAccuracy}%`;

    // Best WPM list
    const bestByLang = history.bestWpmByLanguage || {};
    const bestLangContainer = modal.querySelector('#progress-best-languages');
    if (bestLangContainer) {
      const langs = ['javascript', 'python', 'html', 'css', 'text'];
      bestLangContainer.innerHTML = langs.map(l => {
        const best = bestByLang[l] || 0;
        return `
          <div class="lang-best-card">
            <span class="lang-best-name">${l.toUpperCase()}</span>
            <span class="lang-best-val">${best > 0 ? `${best} WPM` : '—'}</span>
          </div>
        `;
      }).join('');
    }

    // Sessions table
    const tableBody = modal.querySelector('#progress-sessions-table-body');
    if (tableBody) {
      if (history.sessions.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="5" class="table-empty">No practice sessions completed yet. Start typing to record stats!</td>
          </tr>
        `;
      } else {
        tableBody.innerHTML = history.sessions.slice(0, 10).map(s => {
          const dateStr = new Date(s.date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          return `
            <tr>
              <td><strong>${s.title}</strong></td>
              <td><span class="lang-tag">${s.language.toUpperCase()}</span></td>
              <td class="wpm-highlight">${s.wpm} WPM</td>
              <td>${s.accuracy}%</td>
              <td class="table-date">${dateStr}</td>
            </tr>
          `;
        }).join('');
      }
    }

    modal.classList.remove('hidden');

    // Close handlers
    modal.querySelectorAll('.modal-close-trigger').forEach(btn => {
      btn.onclick = () => this.closeAll();
    });

    const clearBtn = modal.querySelector('#progress-clear-btn');
    if (clearBtn) {
      clearBtn.onclick = () => {
        if (confirm('Clear all stored practice history?')) {
          this.onClearHistory();
          this.showProgress(); // refresh
        }
      };
    }
  }
}
