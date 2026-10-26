/**
 * CodeReflex - 70-Level & 30-Challenge Progression Controller
 * Manages the curriculum modal, track switching (HTML/CSS/JS), tier filtering,
 * level unlocking rules, challenge selection, and slot status rendering.
 */

import { getLevelMeta, getAllLevelsSummary, LEVEL_TIERS, getTierForLevel } from './level-metadata.js';
import { loadLevelChallenges, getChallengeByIdAsync } from './challenge-loader.js';
import { StorageManager } from './storage.js';

export class LevelController {
  constructor(options = {}) {
    this.onChallengeSelect = options.onChallengeSelect || (() => {});
    this.currentTrack = 'html'; // 'html' | 'css' | 'javascript'
    this.currentTier = 'all'; // 'all' | 'beginner' | 'intermediate' | 'advanced'
    this.activeLevelNum = 1;
    this.viewMode = 'levels'; // 'levels' | 'challenges'

    this.initDOM();
    this.bindEvents();
  }

  initDOM() {
    this.modal = document.querySelector('#level-browser-modal');
    this.btnBrowseHeader = document.querySelector('#btn-browse-levels');
    this.headerTrackSelect = document.querySelector('#header-level-lang-select');
    this.headerStatusLabel = document.querySelector('#header-levels-status-label');

    // Modal internal controls
    this.trackTabs = document.querySelectorAll('.level-track-tab');
    this.tierFilterBtns = document.querySelectorAll('.tier-filter-pill');
    this.breadcrumbLabel = document.querySelector('#level-browser-breadcrumb');
    this.trackProgressBadge = document.querySelector('#level-track-progress-badge');
    this.btnBackToLevels = document.querySelector('#btn-level-view-back');

    // Containers
    this.viewLevels = document.querySelector('#level-grid-view');
    this.viewChallenges = document.querySelector('#challenge-grid-view');
    this.levelsContainer = document.querySelector('#level-cards-container');
    this.challengesContainer = document.querySelector('#challenge-slots-container');
    this.levelDetailOverview = document.querySelector('#level-detail-overview');
  }

  bindEvents() {
    if (this.btnBrowseHeader) {
      this.btnBrowseHeader.addEventListener('click', () => {
        this.openModal(this.currentTrack);
      });
    }

    if (this.headerTrackSelect) {
      this.headerTrackSelect.addEventListener('change', (e) => {
        this.currentTrack = e.target.value;
        StorageManager.setActiveLanguage(this.currentTrack);
        this.updateHeaderStatus();
      });
    }

    // Track tab switching inside modal
    if (this.trackTabs) {
      this.trackTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const lang = tab.dataset.lang;
          this.switchTrack(lang);
        });
      });
    }

    // Tier filtering
    if (this.tierFilterBtns) {
      this.tierFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.tierFilterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentTier = btn.dataset.tier;
          this.renderLevelsGrid();
        });
      });
    }

    // Back to levels button
    if (this.btnBackToLevels) {
      this.btnBackToLevels.addEventListener('click', () => {
        this.showLevelsView();
      });
    }

    // Modal close triggers
    if (this.modal) {
      const closeButtons = this.modal.querySelectorAll('.modal-close-trigger');
      closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.closeModal();
        });
      });

      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }
  }

  openModal(language = null, levelNum = null) {
    if (!this.modal) return;
    if (language) this.currentTrack = language;
    if (this.headerTrackSelect) this.headerTrackSelect.value = this.currentTrack;

    this.modal.classList.remove('hidden');

    if (levelNum) {
      this.openLevelChallenges(levelNum);
    } else {
      this.showLevelsView();
    }
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
  }

  switchTrack(language) {
    this.currentTrack = (language || 'html').toLowerCase();
    StorageManager.setActiveLanguage(this.currentTrack);
    if (this.headerTrackSelect) this.headerTrackSelect.value = this.currentTrack;

    if (this.trackTabs) {
      this.trackTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.lang === this.currentTrack);
      });
    }

    this.showLevelsView();
    this.updateHeaderStatus();
  }

  showLevelsView() {
    this.viewMode = 'levels';
    if (this.viewLevels) this.viewLevels.classList.remove('hidden');
    if (this.viewChallenges) this.viewChallenges.classList.add('hidden');
    if (this.btnBackToLevels) this.btnBackToLevels.classList.add('hidden');

    const langName = this.getLanguageDisplayName(this.currentTrack);
    if (this.breadcrumbLabel) {
      this.breadcrumbLabel.textContent = `${langName} Track • 70 Levels`;
    }

    this.renderLevelsGrid();
  }

  getLanguageDisplayName(lang) {
    switch (lang) {
      case 'html': return 'HTML';
      case 'css': return 'CSS';
      case 'javascript': return 'JavaScript';
      default: return lang.toUpperCase();
    }
  }

  updateHeaderStatus() {
    const unlockedLevel = StorageManager.getUnlockedLevel(this.currentTrack);
    const langProg = StorageManager.getLanguageProgression(this.currentTrack);
    const currentLvl = langProg.currentLevel || 1;
    const langName = this.getLanguageDisplayName(this.currentTrack);

    const status = StorageManager.getLevelStatus(this.currentTrack, currentLvl);

    if (this.headerStatusLabel) {
      this.headerStatusLabel.textContent = `${langName}: LV ${currentLvl} (${status.completedCount}/30) • Browse 70 Levels`;
    }

    // Update modal progress badge
    if (this.trackProgressBadge) {
      let totalCompletedInTrack = 0;
      if (langProg.levels) {
        for (let l = 1; l <= 70; l++) {
          const lData = langProg.levels[l];
          if (lData && lData.challenges) {
            for (let c = 1; c <= 30; c++) {
              if (lData.challenges[c] && lData.challenges[c].completed) {
                totalCompletedInTrack++;
              }
            }
          }
        }
      }
      this.trackProgressBadge.textContent = `Unlocked: LV ${unlockedLevel}/70 • ${totalCompletedInTrack}/2,100 Completed`;
    }
  }

  renderLevelsGrid() {
    if (!this.levelsContainer) return;
    this.levelsContainer.innerHTML = '';

    const lang = this.currentTrack;
    const allSummaries = getAllLevelsSummary(lang);
    const unlockedLevel = StorageManager.getUnlockedLevel(lang);

    allSummaries.forEach(lvlMeta => {
      const lvl = lvlMeta.level;
      const tier = lvlMeta.tier.toLowerCase();

      // Apply tier filter
      if (this.currentTier !== 'all' && tier !== this.currentTier) {
        return;
      }

      const status = StorageManager.getLevelStatus(lang, lvl);
      const isUnlocked = status.unlocked;
      const isCompleted = status.completed;

      const card = document.createElement('div');
      card.className = `level-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}`;
      card.dataset.level = lvl;

      const progressPercent = Math.round((status.completedCount / 30) * 100);

      card.innerHTML = `
        <div class="level-card-top">
          <div class="level-card-num ${lvlMeta.badgeClass}">LV ${lvl < 10 ? '0' + lvl : lvl}</div>
          <div class="level-status-pill ${isCompleted ? 'pill-completed' : (isUnlocked ? 'pill-available' : 'pill-locked')}">
            ${isCompleted ? '✓ Mastered' : (isUnlocked ? '⚡ Open' : '🔒 Locked')}
          </div>
        </div>
        <div class="level-card-title">${lvlMeta.title}</div>
        <div class="level-card-tier">${lvlMeta.tier} • 30 Challenges</div>
        <div class="level-progress-bar-wrap">
          <div class="level-progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>
        <div class="level-card-footer">
          <span class="level-progress-count">${status.completedCount}/30 Completed</span>
          <span class="level-action-label">${isUnlocked ? 'Practice →' : 'Requires LV ' + (lvl - 1)}</span>
        </div>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          this.openLevelChallenges(lvl);
        });
      } else {
        card.title = `Locked: Complete all 30 challenges in Level ${lvl - 1} to unlock Level ${lvl}.`;
      }

      this.levelsContainer.appendChild(card);
    });

    this.updateHeaderStatus();
  }

  async openLevelChallenges(levelNum) {
    const lvl = parseInt(levelNum, 10);
    this.activeLevelNum = lvl;
    this.viewMode = 'challenges';

    if (this.viewLevels) this.viewLevels.classList.add('hidden');
    if (this.viewChallenges) this.viewChallenges.classList.remove('hidden');
    if (this.btnBackToLevels) this.btnBackToLevels.classList.remove('hidden');

    const langName = this.getLanguageDisplayName(this.currentTrack);
    const meta = getLevelMeta(this.currentTrack, lvl);

    if (this.breadcrumbLabel) {
      this.breadcrumbLabel.textContent = `${langName} Track > Level ${lvl}: ${meta.title}`;
    }

    const status = StorageManager.getLevelStatus(this.currentTrack, lvl);
    if (this.levelDetailOverview) {
      this.levelDetailOverview.innerHTML = `
        <div class="level-overview-header">
          <div class="level-overview-left">
            <span class="level-badge-large ${meta.badgeClass}">Level ${lvl}</span>
            <span class="level-tier-tag">${meta.tier} Tier</span>
          </div>
          <div class="level-overview-stats">
            <span><strong>${status.completedCount} / 30</strong> Challenges Completed</span>
            <span class="level-pass-target">Complete 30 to Unlock Next</span>
          </div>
        </div>
        <h2 class="level-overview-title">${meta.title}</h2>
        <p class="level-overview-desc">${meta.description}</p>
      `;
    }

    await this.renderChallengesGrid(lvl);
  }

  async renderChallengesGrid(levelNum) {
    if (!this.challengesContainer) return;
    this.challengesContainer.innerHTML = '<div class="challenges-loading">Loading challenge slots...</div>';

    const lang = this.currentTrack;
    const lvl = parseInt(levelNum, 10);
    const levelData = await loadLevelChallenges(lang, lvl);

    this.challengesContainer.innerHTML = '';

    levelData.challenges.forEach((slot, index) => {
      const chNum = index + 1;
      const chStatus = StorageManager.getChallengeStatus(lang, lvl, chNum);
      const isCompleted = chStatus.completed;
      const isAuthored = slot.status === 'ready' || Boolean(slot.code);

      const card = document.createElement('div');
      card.className = `challenge-slot-card ${isCompleted ? 'completed' : ''} ${isAuthored ? 'ready' : 'pending'}`;
      card.dataset.challengeId = slot.id;

      card.innerHTML = `
        <div class="slot-card-header">
          <span class="slot-num">#${chNum < 10 ? '0' + chNum : chNum}</span>
          <span class="slot-badge ${isCompleted ? 'badge-completed' : 'badge-ready'}">
            ${isCompleted ? '✓ Done' : 'Available'}
          </span>
        </div>
        <div class="slot-title">${slot.title}</div>
        <div class="slot-id-label">ID: <code>${slot.id}</code></div>
        <div class="slot-meta">
          ${isCompleted ? `
            <span class="slot-stats">Best: <strong>${chStatus.bestWpm} WPM</strong> • <strong>${chStatus.bestAccuracy}% Acc</strong></span>
          ` : `
            <span class="slot-target">Complete to Advance</span>
          `}
        </div>
      `;

      card.addEventListener('click', () => {
        this.handleSlotClick(slot);
      });

      this.challengesContainer.appendChild(card);
    });
  }

  handleSlotClick(slot) {
    this.closeModal();
    this.onChallengeSelect(slot);
  }
}
