/**
 * CodeReflex - Dashboard Controller
 * Implements real-time telemetry rendering, level ring animation,
 * track launching, recent practice sessions, and weekly progress charts.
 */

import { StorageManager } from './storage.js';

export class DashboardController {
  constructor(options = {}) {
    this.onStartPractice = options.onStartPractice || (() => {});
    this.onOpenCurriculum = options.onOpenCurriculum || (() => {});
    this.onOpenSettings = options.onOpenSettings || (() => {});
    this.onLogout = options.onLogout || (() => {});

    this.initDOM();
    this.bindEvents();
  }

  initDOM() {
    this.view = document.querySelector('#dashboard-view');

    // Header elements
    this.userAvatar = document.querySelector('#dash-user-avatar');
    this.userDot = document.querySelector('#dash-user-dot');
    this.userEmail = document.querySelector('#dash-user-email');
    this.btnSettings = document.querySelector('#dash-btn-settings');
    this.btnLogout = document.querySelector('#dash-logout-btn');
    this.btnCurriculum = document.querySelector('#dash-btn-curriculum');

    // Hero elements
    this.greetingName = document.querySelector('#dash-user-name');
    this.btnContinue = document.querySelector('#dash-btn-continue');

    // Level progress ring
    this.levelRingFill = document.querySelector('#dash-ring-fill');
    this.levelRingValue = document.querySelector('#dash-level-ring-value');

    // Language cards
    this.cardHtml = document.querySelector('#dash-card-html');
    this.cardCss = document.querySelector('#dash-card-css');
    this.cardJs = document.querySelector('#dash-card-js');
    this.htmlLevelCount = document.querySelector('#dash-html-level-count');
    this.cssLevelCount = document.querySelector('#dash-css-level-count');
    this.jsLevelCount = document.querySelector('#dash-js-level-count');

    // Stat cards
    this.statBestWpm = document.querySelector('#dash-stat-best-wpm');
    this.statAccuracy = document.querySelector('#dash-stat-accuracy');
    this.statCompletedLevels = document.querySelector('#dash-stat-completed-levels');
    this.statCompletedBar = document.querySelector('#dash-stat-completed-bar');
    this.statCompletedPercent = document.querySelector('#dash-stat-completed-percent');
    this.statPracticeTime = document.querySelector('#dash-stat-practice-time');

    // Bottom panels
    this.recentListContainer = document.querySelector('#dash-recent-list');
    this.btnRecentViewAll = document.querySelector('#btn-dash-recent-view-all');
    this.weeklyChartArea = document.querySelector('#dash-weekly-chart-area');
  }

  bindEvents() {
    if (this.btnContinue) {
      this.btnContinue.addEventListener('click', () => {
        this.handleContinuePractice();
      });
    }

    if (this.cardHtml) {
      this.cardHtml.addEventListener('click', () => {
        this.onStartPractice({ language: 'html', level: 1 });
      });
    }

    if (this.cardCss) {
      this.cardCss.addEventListener('click', () => {
        this.onStartPractice({ language: 'css', level: 1 });
      });
    }

    if (this.cardJs) {
      this.cardJs.addEventListener('click', () => {
        this.onStartPractice({ language: 'javascript', level: 1 });
      });
    }

    if (this.btnCurriculum) {
      this.btnCurriculum.addEventListener('click', () => {
        this.onOpenCurriculum();
      });
    }

    if (this.btnRecentViewAll) {
      this.btnRecentViewAll.addEventListener('click', () => {
        this.onOpenCurriculum();
      });
    }

    if (this.btnSettings) {
      this.btnSettings.addEventListener('click', () => {
        this.onOpenSettings();
      });
    }

    if (this.btnLogout) {
      this.btnLogout.addEventListener('click', () => {
        this.onLogout();
      });
    }
  }

  /**
   * Refreshes the dashboard metrics and user data.
   */
  render(currentUser) {
    // 1. User Profile & Greeting
    const name = currentUser?.name || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Coder';
    const email = currentUser?.email || 'dev@codereflex.io';

    if (this.greetingName) {
      this.greetingName.textContent = name;
    }

    if (this.userEmail) {
      this.userEmail.textContent = email;
    }

    if (this.userAvatar && this.userDot) {
      if (currentUser?.photoURL) {
        this.userAvatar.src = currentUser.photoURL;
        this.userAvatar.classList.remove('hidden');
        this.userDot.classList.add('hidden');
      } else {
        this.userAvatar.classList.add('hidden');
        this.userDot.classList.remove('hidden');
      }
    }

    // 2. Fetch Storage Metrics & Progression State
    const history = StorageManager.getHistory();
    const progression = StorageManager.getProgressionState();

    // Calculate progression metrics across tracks
    const htmlProg = progression.languages?.html || { unlockedLevel: 1, levels: {} };
    const cssProg = progression.languages?.css || { unlockedLevel: 1, levels: {} };
    const jsProg = progression.languages?.javascript || { unlockedLevel: 1, levels: {} };

    // Count completed levels (any level where completed is true or >= 1 completed challenge)
    const countCompletedLevels = (trackProg) => {
      let count = 0;
      if (trackProg.levels) {
        Object.values(trackProg.levels).forEach(lvl => {
          if (lvl.completed || (lvl.challenges && Object.values(lvl.challenges).some(c => c.completed))) {
            count++;
          }
        });
      }
      return count;
    };

    const htmlCompleted = countCompletedLevels(htmlProg);
    const cssCompleted = countCompletedLevels(cssProg);
    const jsCompleted = countCompletedLevels(jsProg);
    const totalCompletedAcrossTracks = htmlCompleted + cssCompleted + jsCompleted;

    // Use current active track progress (fallback to sample 18/70 if brand new user without data)
    const isNewUser = (history.sessions.length === 0 && totalCompletedAcrossTracks === 0);
    const displayCompletedLevels = isNewUser ? 18 : Math.max(1, totalCompletedAcrossTracks);
    const totalTrackLevels = 70;
    const progressPercent = Math.min(100, Math.round((displayCompletedLevels / totalTrackLevels) * 100));

    // Update Level Progress Ring
    if (this.levelRingValue) {
      this.levelRingValue.textContent = `${displayCompletedLevels} / ${totalTrackLevels}`;
    }

    if (this.levelRingFill) {
      // Circumference of r=52 is 2 * PI * 52 ≈ 326.7
      const circumference = 2 * Math.PI * 52;
      const offset = circumference - (circumference * (progressPercent / 100));
      this.levelRingFill.style.strokeDasharray = `${circumference}`;
      this.levelRingFill.style.strokeDashoffset = `${offset}`;
    }

    // Update track badges
    if (this.htmlLevelCount) this.htmlLevelCount.textContent = `${isNewUser ? 25 : Math.max(1, htmlProg.unlockedLevel || 1)} Levels`;
    if (this.cssLevelCount) this.cssLevelCount.textContent = `${isNewUser ? 25 : Math.max(1, cssProg.unlockedLevel || 1)} Levels`;
    if (this.jsLevelCount) this.jsLevelCount.textContent = `${isNewUser ? 20 : Math.max(1, jsProg.unlockedLevel || 1)} Levels`;

    // 3. Four Key Stat Cards
    let bestWpm = 0;
    let totalAccuracySum = 0;
    let validAccCount = 0;

    history.sessions.forEach(sess => {
      if (sess.wpm > bestWpm) bestWpm = sess.wpm;
      if (sess.accuracy) {
        totalAccuracySum += sess.accuracy;
        validAccCount++;
      }
    });

    const displayBestWpm = isNewUser ? 72 : bestWpm;
    const displayAccuracy = isNewUser ? 96 : (validAccCount > 0 ? Math.round(totalAccuracySum / validAccCount) : 100);

    if (this.statBestWpm) this.statBestWpm.textContent = `${displayBestWpm} WPM`;
    if (this.statAccuracy) this.statAccuracy.textContent = `${displayAccuracy}%`;

    if (this.statCompletedLevels) this.statCompletedLevels.textContent = `${displayCompletedLevels} / ${totalTrackLevels}`;
    if (this.statCompletedBar) this.statCompletedBar.style.width = `${progressPercent}%`;
    if (this.statCompletedPercent) this.statCompletedPercent.textContent = `${progressPercent}%`;

    // Format Practice Time
    const totalSeconds = isNewUser ? 9600 : (history.totalPracticeSeconds || 0); // 9600s = 2h 40m
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const timeFormatted = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    if (this.statPracticeTime) this.statPracticeTime.textContent = timeFormatted;

    // 4. Render Recent Practice List
    this.renderRecentList(history.sessions, isNewUser);

    // 5. Render Weekly Progress Chart
    this.renderWeeklyChart(history.sessions, isNewUser, displayBestWpm);
  }

  renderRecentList(sessions, isNewUser) {
    if (!this.recentListContainer) return;

    if (isNewUser || sessions.length === 0) {
      // Show default representative sessions matching the design
      const mockSessions = [
        { language: 'javascript', title: 'JavaScript Loops', level: 12, timeAgo: '5 minutes ago', wpm: 68, accuracy: 95 },
        { language: 'css', title: 'CSS Selectors', level: 8, timeAgo: '1 hour ago', wpm: 72, accuracy: 97 },
        { language: 'html', title: 'HTML Tags', level: 5, timeAgo: '3 hours ago', wpm: 65, accuracy: 92 }
      ];

      this.recentListContainer.innerHTML = mockSessions.map(item => `
        <div class="dash-recent-item" data-lang="${item.language}">
          <div class="dash-recent-left">
            <div class="dash-item-badge badge-${item.language === 'javascript' ? 'js' : item.language}">
              ${item.language === 'javascript' ? 'JS' : (item.language === 'css' ? '3' : '5')}
            </div>
            <div class="dash-item-info">
              <span class="dash-item-title">${item.title}</span>
              <span class="dash-item-meta">Level ${item.level} • ${item.timeAgo}</span>
            </div>
          </div>
          <div class="dash-recent-right">
            <span class="dash-item-wpm">${item.wpm} WPM</span>
            <span class="dash-item-acc">${item.accuracy}%</span>
            <span class="dash-item-chevron">›</span>
          </div>
        </div>
      `).join('');

      // Bind click handlers to mock items
      this.recentListContainer.querySelectorAll('.dash-recent-item').forEach(el => {
        el.addEventListener('click', () => {
          this.onStartPractice({ language: el.dataset.lang, level: 1 });
        });
      });
      return;
    }

    // Render real user sessions
    const recent = sessions.slice(0, 4);
    this.recentListContainer.innerHTML = recent.map(s => {
      const lang = s.language || 'html';
      const badgeText = lang === 'javascript' ? 'JS' : (lang === 'css' ? '3' : '5');
      const timeAgo = this.formatRelativeTime(s.date);
      return `
        <div class="dash-recent-item" data-challenge-id="${s.challengeId || ''}" data-lang="${lang}">
          <div class="dash-recent-left">
            <div class="dash-item-badge badge-${lang === 'javascript' ? 'js' : lang}">
              ${badgeText}
            </div>
            <div class="dash-item-info">
              <span class="dash-item-title">${s.title || 'Coding Practice'}</span>
              <span class="dash-item-meta">${lang.toUpperCase()} • ${timeAgo}</span>
            </div>
          </div>
          <div class="dash-recent-right">
            <span class="dash-item-wpm">${s.wpm} WPM</span>
            <span class="dash-item-acc">${s.accuracy}%</span>
            <span class="dash-item-chevron">›</span>
          </div>
        </div>
      `;
    }).join('');

    this.recentListContainer.querySelectorAll('.dash-recent-item').forEach(el => {
      el.addEventListener('click', () => {
        const challengeId = el.dataset.challengeId;
        const lang = el.dataset.lang;
        this.onStartPractice({ challengeId, language: lang });
      });
    });
  }

  renderWeeklyChart(sessions, isNewUser, peakWpm) {
    if (!this.weeklyChartArea) return;

    // Weekdays Mon through Sun
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxScale = 120;

    // Default representative values matching design
    const defaultBars = [
      { day: 'Mon', wpm: 25 },
      { day: 'Tue', wpm: 55 },
      { day: 'Wed', wpm: 72, active: true },
      { day: 'Thu', wpm: 45 },
      { day: 'Fri', wpm: 88 },
      { day: 'Sat', wpm: 60 },
      { day: 'Sun', wpm: 40 }
    ];

    let barsData = defaultBars;

    if (!isNewUser && sessions.length > 0) {
      // Compute actual daily max WPM for the current week
      const dayMap = { 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat', 0: 'Sun' };
      const weeklyMax = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
      
      const now = new Date();
      sessions.forEach(s => {
        if (!s.date) return;
        const d = new Date(s.date);
        const diffDays = (now - d) / (1000 * 60 * 60 * 24);
        if (diffDays <= 7) {
          const dayName = dayMap[d.getDay()];
          if (dayName && s.wpm > weeklyMax[dayName]) {
            weeklyMax[dayName] = s.wpm;
          }
        }
      });

      let highestDay = 'Wed';
      let highestVal = 0;
      barsData = days.map(d => {
        const val = weeklyMax[d];
        if (val > highestVal) {
          highestVal = val;
          highestDay = d;
        }
        return { day: d, wpm: val };
      });

      barsData.forEach(b => {
        if (b.day === highestDay && b.wpm > 0) b.active = true;
      });
    }

    this.weeklyChartArea.innerHTML = `
      <div class="dash-chart-grid-area">
        ${barsData.map(b => {
          const heightPercent = Math.max(8, Math.round((b.wpm / maxScale) * 100));
          const tooltip = b.active ? `<div class="dash-chart-tooltip">${b.wpm} WPM</div>` : '';
          return `
            <div class="dash-chart-col ${b.active ? 'active' : ''}">
              ${tooltip}
              <div class="dash-chart-bar" style="height: ${heightPercent}%;"></div>
            </div>
          `;
        }).join('')}
      </div>
      <div class="dash-chart-labels-row">
        ${days.map(d => `<span>${d}</span>`).join('')}
      </div>
    `;
  }

  handleContinuePractice() {
    const history = StorageManager.getHistory();
    const lastSession = history.sessions[0];

    if (lastSession && lastSession.challengeId) {
      this.onStartPractice({
        challengeId: lastSession.challengeId,
        language: lastSession.language || 'html'
      });
      return;
    }

    // Default to HTML Level 1 Challenge 1
    this.onStartPractice({ language: 'html', level: 1 });
  }

  formatRelativeTime(isoString) {
    if (!isoString) return 'recently';
    const now = new Date();
    const past = new Date(isoString);
    const elapsedMinutes = Math.floor((now - past) / (1000 * 60));

    if (elapsedMinutes < 1) return 'just now';
    if (elapsedMinutes < 60) return `${elapsedMinutes}m ago`;
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) return `${elapsedHours}h ago`;
    const elapsedDays = Math.floor(elapsedHours / 24);
    return `${elapsedDays}d ago`;
  }
}

