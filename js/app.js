/**
 * CodeReflex - Main Application Controller
 * Connects Engine, Editor, Preview, Storage, and UI Controls.
 */

import { CHALLENGES, getChallengesByFilter, getChallengeById } from './challenges.js';
import { TypingEngine } from './engine.js';
import { EditorView } from './editor.js';
import { PreviewManager } from './preview.js';
import { StorageManager } from './storage.js';
import { ModalManager } from './modals.js';
import { soundPlayer } from './sound.js';

class CodeReflexApp {
  constructor() {
    this.settings = StorageManager.getSettings();
    soundPlayer.enabled = this.settings.soundEnabled;

    this.currentMode = 'code'; // 'normal' | 'code' | 'build'
    this.currentLanguage = 'javascript'; // 'javascript' | 'python' | 'html' | 'css' | 'text'
    this.currentDifficulty = 'all';
    this.activeChallenge = null;

    this.initDOMRefs();
    this.initModules();
    this.bindEvents();
    this.initSplitPaneResizer();
    this.applySettingsToUI();

    // Load initial challenge
    this.selectDefaultChallenge();
  }

  initDOMRefs() {
    this.dom = {
      // Header controls
      modeTabs: document.querySelectorAll('.mode-tab'),
      langSelect: document.querySelector('#header-lang-select'),
      challengeSelect: document.querySelector('#header-challenge-select'),
      progressBtn: document.querySelector('#header-progress-btn'),
      settingsBtn: document.querySelector('#header-settings-btn'),

      // Live Stats
      statWpm: document.querySelector('#stat-wpm-value'),
      statAccuracy: document.querySelector('#stat-acc-value'),
      statTime: document.querySelector('#stat-time-value'),
      statChars: document.querySelector('#stat-chars-value'),
      statErrors: document.querySelector('#stat-errors-value'),
      progressBar: document.querySelector('#stat-progress-fill'),
      progressPercent: document.querySelector('#stat-progress-percent'),

      // Containers
      editorContainer: document.querySelector('#editor-pane-container'),
      previewContainer: document.querySelector('#preview-pane-container'),
      splitResizer: document.querySelector('#split-pane-resizer'),
      splitWrapper: document.querySelector('#workspace-split-view')
    };
  }

  initModules() {
    // 1. Preview Manager
    this.preview = new PreviewManager(this.dom.previewContainer);

    // 2. Editor View
    this.editor = new EditorView(this.dom.editorContainer, {
      onKeyInput: (e) => this.handleEditorKey(e),
      onRestartClick: () => this.restartCurrentChallenge(),
      onFocusChange: (isFocused) => {
        // Handle visual cues
      }
    });

    // 3. Typing Engine
    this.engine = new TypingEngine({
      autoIndent: this.settings.autoIndent,
      tabSize: this.settings.tabSize,
      onStateChange: (state) => {
        this.editor.updateCursor(state.cursorIndex, state.charStates);
      },
      onProgress: (metrics) => {
        this.updateStatsDisplay(metrics);
        this.preview.update(metrics.progressPercent, this.engine.targetText.slice(0, metrics.cursorIndex));
      },
      onError: (errData) => {
        soundPlayer.playKeypress(true);
      },
      onComplete: (metrics) => {
        this.handleChallengeComplete(metrics);
      }
    });

    // 4. Modal Manager
    this.modals = new ModalManager({
      onRetry: () => this.restartCurrentChallenge(),
      onNextChallenge: () => this.goToNextChallenge(),
      onSettingsSave: (newSettings) => {
        this.settings = StorageManager.saveSettings(newSettings);
        soundPlayer.enabled = this.settings.soundEnabled;
        this.engine.autoIndent = this.settings.autoIndent;
        this.engine.tabSize = this.settings.tabSize;
        this.applySettingsToUI();
      },
      onClearHistory: () => {
        StorageManager.clearHistory();
      },
      getHistory: () => StorageManager.getHistory(),
      getSettings: () => this.settings
    });
  }

  bindEvents() {
    // Mode tabs
    this.dom.modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const mode = tab.dataset.mode;
        this.setMode(mode);
      });
    });

    // Language selector change
    this.dom.langSelect.addEventListener('change', (e) => {
      this.currentLanguage = e.target.value;
      this.populateChallengeList();
      this.loadFirstAvailableChallenge();
      this.editor.focus();
    });

    // Challenge selector change
    this.dom.challengeSelect.addEventListener('change', (e) => {
      const challengeId = e.target.value;
      this.loadChallenge(challengeId);
      this.editor.focus();
    });

    // Header buttons
    this.dom.progressBtn.addEventListener('click', () => {
      this.modals.showProgress();
    });

    this.dom.settingsBtn.addEventListener('click', () => {
      this.modals.showSettings(this.settings);
    });

    // Global keyboard shortcuts and auto-focus capture
    window.addEventListener('keydown', (e) => {
      const activeModal = document.querySelector('.modal-overlay:not(.hidden)');
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isInputActive = ['input', 'select', 'textarea', 'button'].includes(activeTag);

      // If a modal is open, let modal handle keys
      if (activeModal) {
        return;
      }

      // Quick restart via Escape or Alt+R
      if (e.key === 'Escape' || (e.altKey && (e.key === 'r' || e.key === 'R'))) {
        e.preventDefault();
        this.restartCurrentChallenge();
        return;
      }

      // If focus is not inside an input/select/button and not inside editor, auto-focus editor
      if (!isInputActive && document.activeElement !== this.editor.scrollPane) {
        if (e.key.length === 1 || ['Backspace', 'Enter', 'Tab'].includes(e.key)) {
          this.editor.focus();
          this.handleEditorKey(e);
        }
      }
    });
  }

  handleEditorKey(e) {
    if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab') {
      soundPlayer.playKeypress(false);
    }
    this.engine.handleKey(e);
  }

  setMode(mode) {
    this.currentMode = mode;
    this.dom.modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    // Adapt available languages for mode
    this.updateLanguageOptionsForMode(mode);
    this.populateChallengeList();
    this.loadFirstAvailableChallenge();
    this.editor.focus();
  }

  updateLanguageOptionsForMode(mode) {
    const select = this.dom.langSelect;
    select.innerHTML = '';

    if (mode === 'normal') {
      select.innerHTML = `<option value="text">Technical Prose</option>`;
      this.currentLanguage = 'text';
    } else if (mode === 'build') {
      select.innerHTML = `
        <option value="html">HTML + CSS Components</option>
      `;
      this.currentLanguage = 'html';
    } else {
      // Code Typing
      select.innerHTML = `
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      `;
      if (!['javascript', 'python', 'html', 'css'].includes(this.currentLanguage)) {
        this.currentLanguage = 'javascript';
      }
      select.value = this.currentLanguage;
    }
  }

  populateChallengeList() {
    const list = getChallengesByFilter(this.currentMode, this.currentLanguage);
    const select = this.dom.challengeSelect;
    select.innerHTML = '';

    if (list.length === 0) {
      select.innerHTML = `<option value="">No challenges available</option>`;
      return;
    }

    list.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.title} (${c.difficulty})`;
      select.appendChild(opt);
    });
  }

  selectDefaultChallenge() {
    this.updateLanguageOptionsForMode(this.currentMode);
    this.populateChallengeList();
    this.loadFirstAvailableChallenge();
  }

  loadFirstAvailableChallenge() {
    const list = getChallengesByFilter(this.currentMode, this.currentLanguage);
    if (list.length > 0) {
      this.loadChallenge(list[0].id);
    }
  }

  loadChallenge(challengeId) {
    const challenge = getChallengeById(challengeId);
    if (!challenge) return;

    this.activeChallenge = challenge;
    this.dom.challengeSelect.value = challenge.id;

    // File name representation
    const extMap = {
      javascript: 'js',
      python: 'py',
      html: 'html',
      css: 'css',
      text: 'md'
    };
    const ext = extMap[challenge.language] || 'txt';
    const filename = `${challenge.id}.${ext}`;
    this.editor.setFilename(filename);

    // Initialize engine & views
    this.engine.loadSnippet(challenge.code);
    this.editor.renderSnippet(this.engine.targetText);
    this.preview.setChallenge(challenge);

    // Reset stats displays
    this.updateStatsDisplay(this.engine.getMetrics());
  }

  restartCurrentChallenge() {
    if (!this.activeChallenge) return;
    this.engine.reset();
    this.editor.renderSnippet(this.engine.targetText);
    this.preview.update(0);
    this.updateStatsDisplay(this.engine.getMetrics());
    this.editor.focus();
  }

  goToNextChallenge() {
    const list = getChallengesByFilter(this.currentMode, this.currentLanguage);
    if (list.length <= 1) {
      this.restartCurrentChallenge();
      return;
    }

    const currentIndex = list.findIndex(c => c.id === this.activeChallenge.id);
    const nextIndex = (currentIndex + 1) % list.length;
    this.loadChallenge(list[nextIndex].id);
    this.editor.focus();
  }

  updateStatsDisplay(metrics) {
    this.dom.statWpm.textContent = metrics.wpm;
    this.dom.statAccuracy.textContent = `${metrics.accuracy}%`;
    this.dom.statTime.textContent = metrics.elapsedTimeFormatted;
    this.dom.statChars.textContent = `${metrics.cursorIndex}/${metrics.totalChars}`;
    this.dom.statErrors.textContent = metrics.errorCount;
    this.dom.progressBar.style.width = `${metrics.progressPercent}%`;
    this.dom.progressPercent.textContent = `${metrics.progressPercent}%`;
  }

  handleChallengeComplete(metrics) {
    // Record session in history
    StorageManager.recordSession({
      challengeId: this.activeChallenge.id,
      title: this.activeChallenge.title,
      language: this.activeChallenge.language,
      mode: this.activeChallenge.mode,
      wpm: metrics.wpm,
      rawWpm: metrics.rawWpm,
      accuracy: metrics.accuracy,
      elapsedSeconds: metrics.elapsedSeconds,
      errorCount: metrics.errorCount
    });

    // Update preview to 100% finished
    this.preview.update(100);

    // Trigger celebration modal
    this.modals.showCompletion(metrics, this.activeChallenge);
  }

  applySettingsToUI() {
    this.editor.applyFontSettings(this.settings.fontSize, this.settings.caretStyle);
  }

  initSplitPaneResizer() {
    const resizer = this.dom.splitResizer;
    const splitWrapper = this.dom.splitWrapper;
    const leftPane = this.dom.editorContainer;

    if (!resizer || !splitWrapper || !leftPane) return;

    let isDragging = false;

    const onMouseDown = (e) => {
      isDragging = true;
      document.body.classList.add('resizing');
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const rect = splitWrapper.getBoundingClientRect();
      const offset = e.clientX - rect.left;
      const minWidth = 320;
      const maxWidth = rect.width - 320;

      if (offset >= minWidth && offset <= maxWidth) {
        const percent = (offset / rect.width) * 100;
        leftPane.style.flex = `0 0 ${percent}%`;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.classList.remove('resizing');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    resizer.addEventListener('mousedown', onMouseDown);
  }
}

// Bootstrap once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new CodeReflexApp();
});
