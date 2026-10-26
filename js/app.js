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
import { AuthManager } from './auth.js?v=1.7';
import { LevelController } from './level-controller.js';
import { loadLevelChallenges } from './challenge-loader.js';
import { DashboardController } from './dashboard.js';

class CodeReflexApp {
  constructor() {
    this.settings = StorageManager.getSettings();
    soundPlayer.enabled = this.settings.soundEnabled;

    this.currentMode = 'levels'; // 'normal' | 'code' | 'build' | 'levels' | 'level1'
    this.currentLanguage = StorageManager.getActiveLanguage() || 'html'; // 'html' | 'css' | 'javascript' | 'python' | 'text'
    this.currentDifficulty = 'all';
    this.activeChallenge = null;

    this.initDOMRefs();
    this.initModules();
    this.initAuth();
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
      headerStandardControls: document.querySelector('#header-standard-controls'),
      headerLevelsControls: document.querySelector('#header-levels-controls'),
      headerLevelTrackSelect: document.querySelector('#header-level-lang-select'),
      btnBrowseLevels: document.querySelector('#btn-browse-levels'),
      headerLevelsStatusLabel: document.querySelector('#header-levels-status-label'),
      levelStepper: document.querySelector('#level-parts-stepper'),
      levelPartBtns: document.querySelectorAll('.level-part-btn'),

      // Minimal Practice Portal Header Controls
      btnBackToDashboard: document.querySelector('#btn-back-to-dashboard'),
      practiceLangPill: document.querySelector('#practice-current-lang-pill'),
      practiceChallengeInfo: document.querySelector('#practice-current-challenge-info'),
      practiceBrowseLevelsBtn: document.querySelector('#btn-practice-browse-levels'),
      practiceRestartBtn: document.querySelector('#practice-restart-btn'),

      // Live Stats
      statWpm: document.querySelector('#stat-wpm-value'),
      statAccuracy: document.querySelector('#stat-acc-value'),
      statTime: document.querySelector('#stat-time-value'),
      statChars: document.querySelector('#stat-chars-value'),
      statErrors: document.querySelector('#stat-errors-value'),
      progressBar: document.querySelector('#stat-progress-fill'),
      progressPercent: document.querySelector('#stat-progress-percent'),

      // Containers
      appView: document.querySelector('#app-view'),
      landingView: document.querySelector('#landing-view'),
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

    // 5. 70-Levels Progression Controller
    this.levelController = new LevelController({
      onChallengeSelect: (challenge) => {
        this.loadProgressionChallenge(challenge);
      }
    });

    // 6. Dedicated Visual Dashboard Controller
    this.dashboard = new DashboardController({
      onStartPractice: (target) => {
        if (target.challengeId) {
          if (target.challengeId.startsWith('ch-')) {
            const parts = target.challengeId.split('-');
            const lang = parts[1] || 'html';
            const lvlMatch = parts[2] ? parts[2].match(/\d+/) : null;
            const lvl = lvlMatch ? parseInt(lvlMatch[0], 10) : 1;
            loadLevelChallenges(lang, lvl).then(lvlData => {
              const matched = lvlData.challenges.find(c => c.id === target.challengeId);
              if (matched) {
                this.loadProgressionChallenge(matched);
              } else {
                this.loadChallenge(target.challengeId);
              }
            }).catch(() => {
              this.loadChallenge(target.challengeId);
            });
          } else {
            this.loadChallenge(target.challengeId);
          }
        } else if (target.language) {
          const track = target.language;
          const level = target.level || StorageManager.getCurrentLevel(track) || 1;
          this.currentLanguage = track;
          this.currentMode = 'levels';
          StorageManager.setActiveLanguage(track);
          StorageManager.setCurrentLevel(track, level);
          if (this.levelController) {
            this.levelController.switchTrack(track);
          }
          loadLevelChallenges(track, level).then(lvlData => {
            // Find first uncompleted challenge in this level, or first slot
            const uncompleted = lvlData.challenges.find(c => {
              const status = StorageManager.getChallengeStatus(track, level, c.challengeIndex || 1);
              return !status.completed;
            });
            const slotToLoad = uncompleted || lvlData.challenges[0];
            if (slotToLoad) {
              this.loadProgressionChallenge(slotToLoad);
            }
          }).catch(() => {
            this.populateChallengeList();
            this.loadFirstAvailableChallenge();
          });
        }
        this.auth.showPracticePortal();
        setTimeout(() => this.editor.focus(), 80);
      },
      onOpenCurriculum: (track) => {
        const lang = track || this.currentLanguage || 'html';
        this.levelController.openModal(lang);
      },
      onOpenSettings: () => {
        this.modals.showSettings(this.settings);
      },
      onLogout: () => {
        this.auth.handleLogout();
      }
    });
  }

  initAuth() {
    this.auth = new AuthManager({
      onDashboardOpen: (user) => {
        if (this.dashboard) {
          this.dashboard.render(user);
        }
      },
      onLoginSuccess: (user) => {
        if (this.dashboard) {
          this.dashboard.render(user);
        }
        this.restartCurrentChallenge();
        setTimeout(() => this.editor.focus(), 120);
      },
      onLogout: () => {
        this.restartCurrentChallenge();
      }
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

    // Level 1 parts stepper click
    if (this.dom.levelPartBtns) {
      this.dom.levelPartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const partNum = parseInt(btn.dataset.levelPart, 10);
          this.handleLevelPartSelect(partNum);
        });
      });
    }

    // Practice Portal Header controls
    if (this.dom.btnBackToDashboard) {
      this.dom.btnBackToDashboard.addEventListener('click', () => {
        this.auth.showDashboard();
      });
    }

    if (this.dom.practiceBrowseLevelsBtn) {
      this.dom.practiceBrowseLevelsBtn.addEventListener('click', () => {
        const track = ['html', 'css', 'javascript'].includes(this.currentLanguage) ? this.currentLanguage : 'html';
        this.levelController.openModal(track);
      });
    }

    if (this.dom.practiceLangPill) {
      this.dom.practiceLangPill.style.cursor = 'pointer';
      this.dom.practiceLangPill.title = 'Switch Language or Browse Levels';
      this.dom.practiceLangPill.addEventListener('click', () => {
        const track = ['html', 'css', 'javascript'].includes(this.currentLanguage) ? this.currentLanguage : 'html';
        this.levelController.openModal(track);
      });
    }

    if (this.dom.practiceRestartBtn) {
      this.dom.practiceRestartBtn.addEventListener('click', () => {
        this.restartCurrentChallenge();
      });
    }

    // Header buttons (legacy/modal triggers)
    if (this.dom.progressBtn) {
      this.dom.progressBtn.addEventListener('click', () => {
        this.modals.showProgress();
      });
    }

    if (this.dom.settingsBtn) {
      this.dom.settingsBtn.addEventListener('click', () => {
        this.modals.showSettings(this.settings);
      });
    }

    // Global keyboard shortcuts and auto-focus capture
    window.addEventListener('keydown', (e) => {
      // Guard: Do not capture typing if unauthenticated or on landing page
      if (!this.auth || !this.auth.isAuthenticated()) {
        return;
      }
      if (this.dom.appView && this.dom.appView.classList.contains('hidden')) {
        return;
      }

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

    if (mode === 'levels') {
      if (this.dom.headerStandardControls) this.dom.headerStandardControls.classList.add('hidden');
      if (this.dom.levelStepper) this.dom.levelStepper.classList.add('hidden');
      if (this.dom.headerLevelsControls) this.dom.headerLevelsControls.classList.remove('hidden');

      const track = ['html', 'css', 'javascript'].includes(this.currentLanguage)
        ? this.currentLanguage
        : 'html';
      this.levelController.switchTrack(track);
      this.levelController.openModal(track);
    } else if (mode === 'level1') {
      if (this.dom.headerStandardControls) this.dom.headerStandardControls.classList.add('hidden');
      if (this.dom.headerLevelsControls) this.dom.headerLevelsControls.classList.add('hidden');
      if (this.dom.levelStepper) this.dom.levelStepper.classList.remove('hidden');
      this.loadCurrentLevelPart();
    } else {
      if (this.dom.headerStandardControls) this.dom.headerStandardControls.classList.remove('hidden');
      if (this.dom.headerLevelsControls) this.dom.headerLevelsControls.classList.add('hidden');
      if (this.dom.levelStepper) this.dom.levelStepper.classList.add('hidden');
      this.updateLanguageOptionsForMode(mode);
      this.populateChallengeList();
      this.loadFirstAvailableChallenge();
    }
    this.editor.focus();
  }

  updateLevelStepper() {
    const progressData = StorageManager.getLevelProgress();
    const progress = (progressData && progressData.level1) ? progressData.level1 : { unlockedPart: 1, parts: {} };
    const unlockedPart = progress.unlockedPart || 1;
    const currentPart = (this.activeChallenge && this.activeChallenge.mode === 'level1')
      ? (this.activeChallenge.part || 1)
      : unlockedPart;

    if (this.dom.levelPartBtns) {
      this.dom.levelPartBtns.forEach(btn => {
        const partNum = parseInt(btn.dataset.levelPart, 10);
        const isCompleted = progress.parts && progress.parts[partNum] && progress.parts[partNum].completed;
        const isUnlocked = partNum <= unlockedPart;
        const isActive = (partNum === currentPart && this.currentMode === 'level1');

        btn.classList.toggle('active', isActive);
        btn.classList.toggle('part-completed', !!isCompleted);
        btn.classList.toggle('part-locked', !isUnlocked);
        btn.disabled = !isUnlocked;

        const iconEl = btn.querySelector('.part-status-icon');
        if (iconEl) {
          if (isCompleted) {
            iconEl.textContent = '✓';
            iconEl.title = `Completed with ${progress.parts[partNum].bestAccuracy}% accuracy`;
          } else if (isUnlocked) {
            iconEl.textContent = isActive ? 'Active' : 'Open';
            iconEl.title = 'Available to practice';
          } else {
            iconEl.textContent = '🔒';
            iconEl.title = `Locked (Complete Part ${partNum - 1} to unlock)`;
          }
        }
      });
    }

    // Update connector lines
    const conn1 = document.querySelector('#stepper-connector-1');
    const conn2 = document.querySelector('#stepper-connector-2');
    if (conn1) conn1.classList.toggle('passed', !!(progress.parts && progress.parts[1] && progress.parts[1].completed));
    if (conn2) conn2.classList.toggle('passed', !!(progress.parts && progress.parts[2] && progress.parts[2].completed));
  }

  handleLevelPartSelect(partNum) {
    const progressData = StorageManager.getLevelProgress();
    const progress = (progressData && progressData.level1) ? progressData.level1 : { unlockedPart: 1, parts: {} };
    const unlockedPart = progress.unlockedPart || 1;

    if (partNum > unlockedPart) {
      // Locked part!
      return;
    }

    this.loadChallenge(`level1-part${partNum}`);
    this.updateLevelStepper();
    this.editor.focus();
  }

  loadCurrentLevelPart() {
    const progressData = StorageManager.getLevelProgress();
    const progress = (progressData && progressData.level1) ? progressData.level1 : { unlockedPart: 1, parts: {} };
    const partNum = Math.min(3, progress.unlockedPart || 1);
    this.loadChallenge(`level1-part${partNum}`);
    this.updateLevelStepper();
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
    if (this.currentMode === 'levels') {
      const track = ['html', 'css', 'javascript'].includes(this.currentLanguage) ? this.currentLanguage : 'html';
      const level = StorageManager.getCurrentLevel(track) || 1;
      this.currentLanguage = track;
      StorageManager.setActiveLanguage(track);
      loadLevelChallenges(track, level).then(lvlData => {
        const uncompleted = lvlData.challenges.find(c => {
          const status = StorageManager.getChallengeStatus(track, level, c.challengeIndex || 1);
          return !status.completed;
        });
        const slot = uncompleted || lvlData.challenges[0];
        if (slot) {
          this.loadProgressionChallenge(slot);
        }
      }).catch(() => {
        this.updateLanguageOptionsForMode(this.currentMode);
        this.populateChallengeList();
        this.loadFirstAvailableChallenge();
      });
      return;
    }

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
    this.updatePracticeHeaderBadge(challenge);

    if (challenge.mode === 'level1') {
      this.updateLevelStepper();
    }
  }

  updatePracticeHeaderBadge(challenge) {
    if (!challenge) return;
    const lang = challenge.language ? challenge.language.toUpperCase() : 'CODE';
    if (this.dom.practiceLangPill) {
      this.dom.practiceLangPill.textContent = lang;
    }
    if (this.dom.practiceChallengeInfo) {
      if (challenge.mode === 'levels' && challenge.level) {
        this.dom.practiceChallengeInfo.textContent = `Level ${challenge.level} • Challenge ${challenge.challengeIndex || 1}: ${challenge.title || ''}`;
      } else if (challenge.mode === 'level1') {
        this.dom.practiceChallengeInfo.textContent = `Level 1 • Part ${challenge.part || 1}: ${challenge.title || ''}`;
      } else {
        this.dom.practiceChallengeInfo.textContent = challenge.title || 'Coding Practice';
      }
    }
  }

  restartCurrentChallenge() {
    if (!this.activeChallenge) return;
    this.engine.reset();
    this.editor.renderSnippet(this.engine.targetText);
    this.preview.update(0, '');
    this.updateStatsDisplay(this.engine.getMetrics());
    this.editor.focus();
  }

  loadProgressionChallenge(challenge) {
    if (!challenge) return;

    const lang = (challenge.language || 'html').toLowerCase();
    this.currentLanguage = lang;
    this.currentMode = 'levels';
    StorageManager.setActiveLanguage(lang);
    if (challenge.level) {
      StorageManager.setCurrentLevel(lang, challenge.level);
    }

    this.activeChallenge = {
      ...challenge,
      mode: 'levels'
    };

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

    if (challenge.code) {
      this.engine.loadSnippet(challenge.code);
      this.editor.renderSnippet(this.engine.targetText);
      this.preview.setChallenge(challenge);
      this.updateStatsDisplay(this.engine.getMetrics());
    }

    this.updatePracticeHeaderBadge(this.activeChallenge);

    if (this.levelController) {
      this.levelController.currentTrack = lang;
      this.levelController.updateHeaderStatus();
    }
    this.editor.focus();
  }

  goToNextChallenge() {
    if (this.activeChallenge && this.activeChallenge.mode === 'levels') {
      const lang = (this.activeChallenge.language || 'html').toLowerCase();
      const lvl = this.activeChallenge.level || 1;
      const chIdx = this.activeChallenge.challengeIndex || 1;

      if (chIdx < 30) {
        loadLevelChallenges(lang, lvl).then(levelData => {
          const nextSlot = levelData && levelData.challenges ? levelData.challenges[chIdx] : null;
          if (nextSlot && (nextSlot.status === 'ready' || nextSlot.code)) {
            this.loadProgressionChallenge(nextSlot);
          } else {
            this.levelController.openModal(lang, lvl);
          }
        }).catch(() => {
          this.levelController.openModal(lang, lvl);
        });
      } else {
        // chIdx >= 30: Completed the level! Advance to next level of the SAME language
        const maxLevel = (lang === 'javascript') ? 20 : 25;
        const nextLevel = lvl + 1;
        if (nextLevel <= maxLevel) {
          StorageManager.setCurrentLevel(lang, nextLevel);
          loadLevelChallenges(lang, nextLevel).then(levelData => {
            const firstSlot = levelData && levelData.challenges ? levelData.challenges[0] : null;
            if (firstSlot && (firstSlot.status === 'ready' || firstSlot.code)) {
              this.loadProgressionChallenge(firstSlot);
            } else {
              this.levelController.openModal(lang, nextLevel);
            }
          }).catch(() => {
            this.levelController.openModal(lang, nextLevel);
          });
        } else {
          // Completed all levels of this track
          this.levelController.openModal(lang, lvl);
        }
      }
      return;
    }

    if (this.activeChallenge && this.activeChallenge.mode === 'level1') {
      const progressData = StorageManager.getLevelProgress();
      const progress = (progressData && progressData.level1) ? progressData.level1 : { unlockedPart: 1, parts: {} };
      const currentPart = this.activeChallenge.part || 1;
      const unlockedPart = progress.unlockedPart || 1;

      if (currentPart < 3 && currentPart < unlockedPart) {
        this.handleLevelPartSelect(currentPart + 1);
      } else {
        this.restartCurrentChallenge();
      }
      return;
    }

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
    let isLevel = false;
    let isProgressionV2 = false;
    let passedTarget = false;

    if (this.activeChallenge && this.activeChallenge.mode === 'level1') {
      isLevel = true;
      passedTarget = true;
      const partNum = this.activeChallenge.part || 1;
      StorageManager.recordLevelPartCompletion('level1', partNum, metrics.wpm, metrics.accuracy);
      this.updateLevelStepper();
    } else if (this.activeChallenge && this.activeChallenge.mode === 'levels') {
      isLevel = true;
      isProgressionV2 = true;
      passedTarget = true;
      const lang = this.activeChallenge.language || 'html';
      const lvl = this.activeChallenge.level || 1;
      const chIdx = this.activeChallenge.challengeIndex || 1;
      StorageManager.recordChallengeCompletion(lang, lvl, chIdx, metrics.wpm, metrics.accuracy);
      if (this.levelController) {
        this.levelController.updateHeaderStatus();
      }
    }

    // Record session in history
    const sessionPayload = {
      id: 'sess_' + Date.now(),
      challengeId: this.activeChallenge.id,
      title: this.activeChallenge.title,
      language: this.activeChallenge.language,
      mode: this.activeChallenge.mode,
      wpm: metrics.wpm,
      rawWpm: metrics.rawWpm,
      accuracy: metrics.accuracy,
      elapsedSeconds: metrics.elapsedSeconds,
      errorCount: metrics.errorCount
    };
    StorageManager.recordSession(sessionPayload);

    // Save to Cloud Firestore if user is authenticated with a Firebase UID
    const currentUser = this.auth ? this.auth.getAuthenticatedUser() : null;
    if (currentUser && currentUser.uid) {
      const levelProgress = StorageManager.getLevelProgress();
      const progressionV2 = StorageManager.getProgressionState();
      import('./firebase.js').then(({ saveUserProgress }) => {
        saveUserProgress(currentUser.uid, sessionPayload, levelProgress, progressionV2);
      }).catch(err => {
        console.warn('[CodeReflex Sync] Asynchronous Firestore progress sync notice:', err);
      });
    }

    // Re-render dashboard stats and highest level display if dashboard is initialized
    if (this.dashboard) {
      this.dashboard.render(currentUser);
    }

    // Update preview to 100% finished
    this.preview.update(100, this.engine.targetText);

    // Trigger celebration modal
    this.modals.showCompletion(metrics, this.activeChallenge, {
      isLevelMode: isLevel,
      isProgressionV2,
      passedTarget: true
    });
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
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new CodeReflexApp();
  });
} else {
  window.app = new CodeReflexApp();
}
