/**
 * CodeReflex - Editor DOM Controller
 * Handles line rendering, character status tagging, cursor positioning,
 * and auto-scrolling without layout shifts.
 */

export class EditorView {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.options = options;
    this.targetText = '';
    this.charElements = [];
    this.lineElements = [];
    this.isFocused = true;
    this.onKeyInput = options.onKeyInput || (() => {});
    this.onRestartClick = options.onRestartClick || (() => {});
    this.onFocusChange = options.onFocusChange || (() => {});

    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="editor-header">
        <div class="editor-header-left">
          <div class="editor-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <span class="editor-filename" id="editor-tab-name">snippet.js</span>
        </div>
        <div class="editor-header-actions">
          <button class="editor-tool-btn" id="editor-restart-btn" title="Restart Challenge (Esc or Tab+Enter)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
            <span>Restart</span>
          </button>
        </div>
      </div>
      <div class="editor-scroll-area" id="editor-scroll-pane" tabindex="0" role="textbox" aria-label="Code typing area">
        <div class="editor-code-container" id="editor-lines-wrapper">
          <!-- Lines rendered here -->
        </div>
        <div class="editor-focus-overlay" id="editor-focus-banner">
          <div class="focus-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M6 16h12"/>
            </svg>
            <span>Click or press any key to focus</span>
          </div>
        </div>
      </div>
    `;

    this.scrollPane = this.container.querySelector('#editor-scroll-pane');
    this.linesWrapper = this.container.querySelector('#editor-lines-wrapper');
    this.focusBanner = this.container.querySelector('#editor-focus-banner');
    this.restartBtn = this.container.querySelector('#editor-restart-btn');

    this.bindEvents();
  }

  bindEvents() {
    this.restartBtn.addEventListener('click', () => {
      this.onRestartClick();
      this.focus();
    });

    // Handle focus / blur
    this.scrollPane.addEventListener('focus', () => {
      this.isFocused = true;
      this.focusBanner.classList.add('hidden');
      this.onFocusChange(true);
    });

    this.scrollPane.addEventListener('blur', () => {
      // Small timeout to check if focus moved to a child or modal
      setTimeout(() => {
        if (document.activeElement !== this.scrollPane && !this.scrollPane.contains(document.activeElement)) {
          this.isFocused = false;
          this.focusBanner.classList.remove('hidden');
          this.onFocusChange(false);
        }
      }, 100);
    });

    this.focusBanner.addEventListener('click', () => {
      this.focus();
    });

    // Intercept keyboard events on the focused scrollPane
    this.scrollPane.addEventListener('keydown', (e) => {
      // Don't intercept if modifier keys like Ctrl+Shift+I (DevTools)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R')) {
        // Let page refresh or restart challenge
        return;
      }
      this.onKeyInput(e);
    });

    // Also click anywhere on scrollPane to focus
    this.scrollPane.addEventListener('click', () => {
      this.focus();
    });
  }

  focus() {
    if (this.scrollPane) {
      this.scrollPane.focus();
      this.isFocused = true;
      this.focusBanner.classList.add('hidden');
      this.onFocusChange(true);
    }
  }

  setFilename(filename) {
    const tabName = this.container.querySelector('#editor-tab-name');
    if (tabName) {
      tabName.textContent = filename;
    }
  }

  /**
   * Builds the DOM structure for all lines and characters in the snippet
   */
  renderSnippet(targetText) {
    this.targetText = targetText;
    this.charElements = [];
    this.lineElements = [];
    this.linesWrapper.innerHTML = '';

    const lines = targetText.split('\n');
    let globalIndex = 0;

    lines.forEach((lineText, lineIdx) => {
      const lineRow = document.createElement('div');
      lineRow.className = 'editor-line';
      lineRow.dataset.lineNumber = lineIdx + 1;

      // Line number gutter
      const gutter = document.createElement('div');
      gutter.className = 'editor-gutter';
      gutter.textContent = lineIdx + 1;
      lineRow.appendChild(gutter);

      // Line code content
      const content = document.createElement('div');
      content.className = 'editor-line-content';

      // Render each character in this line
      for (let i = 0; i < lineText.length; i++) {
        const char = lineText[i];
        const span = document.createElement('span');
        span.className = 'code-char char-pending';
        span.dataset.index = globalIndex;

        if (char === ' ') {
          span.classList.add('char-space');
          span.innerHTML = '&nbsp;';
          span.dataset.original = ' ';
        } else if (char === '\t') {
          span.classList.add('char-tab');
          span.innerHTML = '&nbsp;&nbsp;';
          span.dataset.original = '\t';
        } else {
          span.textContent = char;
          span.dataset.original = char;
        }

        content.appendChild(span);
        this.charElements[globalIndex] = span;
        globalIndex++;
      }

      // If not the last line, render the newline character
      if (lineIdx < lines.length - 1) {
        const nlSpan = document.createElement('span');
        nlSpan.className = 'code-char char-pending char-newline';
        nlSpan.dataset.index = globalIndex;
        nlSpan.dataset.original = '\n';
        nlSpan.innerHTML = '<span class="newline-glyph">↵</span>';
        content.appendChild(nlSpan);
        this.charElements[globalIndex] = nlSpan;
        globalIndex++;
      }

      lineRow.appendChild(content);
      this.linesWrapper.appendChild(lineRow);
      this.lineElements.push(lineRow);
    });

    // Position cursor at first character initially
    this.updateCursor(0, []);
  }

  /**
   * Updates character visual classes and cursor position
   */
  updateCursor(cursorIndex, charStates) {
    // Remove current cursor class from all characters
    this.container.querySelectorAll('.char-current').forEach(el => {
      el.classList.remove('char-current');
      const cur = el.querySelector('.active-cursor');
      if (cur) cur.remove();
    });

    // Update states of characters
    charStates.forEach((stateObj, idx) => {
      const span = this.charElements[idx];
      if (!span) return;

      // Remove previous state classes
      span.classList.remove('char-pending', 'char-correct', 'char-incorrect');

      if (stateObj.state === 'correct') {
        span.classList.add('char-correct');
      } else if (stateObj.state === 'incorrect') {
        span.classList.add('char-incorrect');
      } else {
        span.classList.add('char-pending');
      }
    });

    // Place active cursor
    if (cursorIndex < this.charElements.length) {
      const currentSpan = this.charElements[cursorIndex];
      if (currentSpan) {
        currentSpan.classList.add('char-current');
        const cursorEl = document.createElement('span');
        cursorEl.className = 'active-cursor';
        currentSpan.appendChild(cursorEl);

        // Keep active line visible in scroll area smoothly
        this.scrollIntoViewIfNeeded(currentSpan);
      }
    } else if (this.charElements.length > 0) {
      // Completed, cursor at end
      const lastSpan = this.charElements[this.charElements.length - 1];
      if (lastSpan) {
        lastSpan.classList.add('char-current');
      }
    }
  }

  scrollIntoViewIfNeeded(span) {
    if (!this.scrollPane || !span) return;
    const paneRect = this.scrollPane.getBoundingClientRect();
    const spanRect = span.getBoundingClientRect();

    if (spanRect.top < paneRect.top + 60) {
      this.scrollPane.scrollTop -= (paneRect.top + 60 - spanRect.top);
    } else if (spanRect.bottom > paneRect.bottom - 60) {
      this.scrollPane.scrollTop += (spanRect.bottom - (paneRect.bottom - 60));
    }
  }

  applyFontSettings(fontSize, caretStyle) {
    if (this.linesWrapper) {
      this.linesWrapper.style.fontSize = `${fontSize}px`;
    }
    // Set caret style
    this.container.classList.remove('caret-line', 'caret-block', 'caret-underline');
    this.container.classList.add(`caret-${caretStyle || 'line'}`);
  }
}

