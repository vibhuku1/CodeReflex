/**
 * CodeReflex - Storage & Progress State Manager
 * Handles local persistence of user settings, practice history, and metrics.
 */

const SETTINGS_KEY = 'codereflex_settings_v1';
const HISTORY_KEY = 'codereflex_history_v1';
const LEVEL_PROGRESS_KEY = 'codereflex_level_progress_v1';
const PROGRESSION_V2_KEY = 'codereflex_progression_v2';

const DEFAULT_SETTINGS = {
  fontSize: 16,
  caretStyle: 'line', // 'line' | 'block' | 'underline'
  autoIndent: true,
  soundEnabled: false,
  tabSize: 2,
  theme: 'dark-default'
};

export class StorageManager {
  static getSettings() {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : { ...DEFAULT_SETTINGS };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  static saveSettings(newSettings) {
    try {
      const current = this.getSettings();
      const merged = { ...current, ...newSettings };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
      return merged;
    } catch (err) {
      console.warn('Failed to save settings:', err);
      return DEFAULT_SETTINGS;
    }
  }

  static getHistory() {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : {
        sessions: [],
        bestWpmByLanguage: {},
        totalPracticeSeconds: 0,
        totalCompletedChallenges: 0
      };
    } catch {
      return {
        sessions: [],
        bestWpmByLanguage: {},
        totalPracticeSeconds: 0,
        totalCompletedChallenges: 0
      };
    }
  }

  static recordSession(sessionData) {
    try {
      const history = this.getHistory();
      const session = {
        id: 'sess_' + Date.now(),
        date: new Date().toISOString(),
        challengeId: sessionData.challengeId,
        title: sessionData.title,
        language: sessionData.language,
        mode: sessionData.mode,
        wpm: sessionData.wpm,
        rawWpm: sessionData.rawWpm,
        accuracy: sessionData.accuracy,
        elapsedSeconds: sessionData.elapsedSeconds,
        errorCount: sessionData.errorCount
      };

      // Keep recent 30 sessions
      history.sessions.unshift(session);
      if (history.sessions.length > 30) {
        history.sessions.pop();
      }

      // Update aggregate metrics
      history.totalPracticeSeconds += session.elapsedSeconds;
      history.totalCompletedChallenges += 1;

      // Update best WPM by language
      const lang = session.language;
      const currentBest = history.bestWpmByLanguage[lang] || 0;
      if (session.wpm > currentBest) {
        history.bestWpmByLanguage[lang] = session.wpm;
      }

      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      return history;
    } catch (err) {
      console.warn('Failed to record session:', err);
      return null;
    }
  }

  static clearHistory() {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (err) {
      console.warn('Failed to clear history:', err);
    }
  }

  static getLevelProgress() {
    try {
      const data = localStorage.getItem(LEVEL_PROGRESS_KEY);
      return data ? JSON.parse(data) : {
        level1: {
          unlockedPart: 1, // 1, 2, or 3
          parts: {
            1: { completed: false, bestWpm: 0, bestAccuracy: 0 },
            2: { completed: false, bestWpm: 0, bestAccuracy: 0 },
            3: { completed: false, bestWpm: 0, bestAccuracy: 0 }
          }
        }
      };
    } catch {
      return {
        level1: {
          unlockedPart: 1,
          parts: {
            1: { completed: false, bestWpm: 0, bestAccuracy: 0 },
            2: { completed: false, bestWpm: 0, bestAccuracy: 0 },
            3: { completed: false, bestWpm: 0, bestAccuracy: 0 }
          }
        }
      };
    }
  }

  static recordLevelPartCompletion(levelId, partNum, wpm, accuracy) {
    const progress = this.getLevelProgress();
    if (!progress[levelId]) {
      progress[levelId] = {
        unlockedPart: 1,
        parts: {
          1: { completed: false, bestWpm: 0, bestAccuracy: 0 },
          2: { completed: false, bestWpm: 0, bestAccuracy: 0 },
          3: { completed: false, bestWpm: 0, bestAccuracy: 0 }
        }
      };
    }

    const lvl = progress[levelId];
    if (!lvl.parts) lvl.parts = {};
    if (!lvl.parts[partNum]) {
      lvl.parts[partNum] = { completed: false, bestWpm: 0, bestAccuracy: 0 };
    }

    // Completing the part unlocks the next part (no minimum accuracy threshold)
    lvl.parts[partNum].completed = true;
    if (partNum < 3 && lvl.unlockedPart <= partNum) {
      lvl.unlockedPart = partNum + 1;
    }

    if (wpm > (lvl.parts[partNum].bestWpm || 0)) {
      lvl.parts[partNum].bestWpm = wpm;
    }
    if (accuracy > (lvl.parts[partNum].bestAccuracy || 0)) {
      lvl.parts[partNum].bestAccuracy = accuracy;
    }

    try {
      localStorage.setItem(LEVEL_PROGRESS_KEY, JSON.stringify(progress));
    } catch (err) {
      console.warn('Failed to save level progress:', err);
    }
    return progress;
  }

  static clearLevelProgress() {
    try {
      localStorage.removeItem(LEVEL_PROGRESS_KEY);
    } catch (err) {
      console.warn('Failed to clear level progress:', err);
    }
  }

  /**
   * Alias for getProgressionState
   */
  static getProgression() {
    return this.getProgressionState();
  }

  /**
   * Safe migration from v1 legacy level progress into v2 multi-language progression.
   */
  static getProgressionState() {
    try {
      const data = localStorage.getItem(PROGRESSION_V2_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (err) {
      console.warn('Failed to parse progression v2 state:', err);
    }

    // Default structure for new user: Level 1 available for HTML, CSS, JavaScript
    const initialProgression = {
      version: 2,
      schemaVersion: 2,
      activeLanguage: 'html',
      languages: {
        html: { currentLevel: 1, unlockedLevel: 1, levels: {} },
        css: { currentLevel: 1, unlockedLevel: 1, levels: {} },
        javascript: { currentLevel: 1, unlockedLevel: 1, levels: {} }
      }
    };

    // Safely migrate from legacy v1 progress if present
    try {
      const legacyData = localStorage.getItem(LEVEL_PROGRESS_KEY);
      if (legacyData) {
        const legacy = JSON.parse(legacyData);
        if (legacy && legacy.level1 && legacy.level1.parts) {
          // Part 1: HTML Level 1 Exercise 1
          if (legacy.level1.parts[1]) {
            const p1 = legacy.level1.parts[1];
            initialProgression.languages.html.levels[1] = {
              completed: false,
              challenges: {
                1: {
                  completed: !!p1.completed,
                  attempts: 1,
                  bestWpm: p1.bestWpm || 0,
                  bestAccuracy: p1.bestAccuracy || 0,
                  lastAttemptAt: new Date().toISOString()
                }
              }
            };
          }
          // Part 2: CSS Level 1 Exercise 1
          if (legacy.level1.parts[2]) {
            const p2 = legacy.level1.parts[2];
            initialProgression.languages.css.levels[1] = {
              completed: false,
              challenges: {
                1: {
                  completed: !!p2.completed,
                  attempts: 1,
                  bestWpm: p2.bestWpm || 0,
                  bestAccuracy: p2.bestAccuracy || 0,
                  lastAttemptAt: new Date().toISOString()
                }
              }
            };
          }
          // Part 3: HTML Level 1 Exercise 2
          if (legacy.level1.parts[3]) {
            const p3 = legacy.level1.parts[3];
            if (!initialProgression.languages.html.levels[1]) {
              initialProgression.languages.html.levels[1] = { completed: false, challenges: {} };
            }
            initialProgression.languages.html.levels[1].challenges[2] = {
              completed: !!p3.completed,
              attempts: 1,
              bestWpm: p3.bestWpm || 0,
              bestAccuracy: p3.bestAccuracy || 0,
              lastAttemptAt: new Date().toISOString()
            };
          }
        }
      }
    } catch (migErr) {
      console.warn('Legacy level1 migration notice:', migErr);
    }

    try {
      localStorage.setItem(PROGRESSION_V2_KEY, JSON.stringify(initialProgression));
    } catch {}

    return initialProgression;
  }

  static saveProgressionState(state) {
    try {
      localStorage.setItem(PROGRESSION_V2_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Failed to save progression state:', err);
    }
  }

  static getLanguageProgression(language) {
    const state = this.getProgressionState();
    const lang = (language || 'html').toLowerCase();
    if (!state.languages[lang]) {
      state.languages[lang] = { currentLevel: 1, unlockedLevel: 1, levels: {} };
      this.saveProgressionState(state);
    }
    return state.languages[lang];
  }

  static getActiveLanguage() {
    const state = this.getProgressionState();
    return (state.activeLanguage || 'html').toLowerCase();
  }

  static setActiveLanguage(language) {
    if (!language) return;
    const state = this.getProgressionState();
    state.activeLanguage = language.toLowerCase();
    this.saveProgressionState(state);
  }

  static getCurrentLevel(language) {
    const prog = this.getLanguageProgression(language);
    return prog.currentLevel || prog.unlockedLevel || 1;
  }

  static setCurrentLevel(language, levelNum) {
    const state = this.getProgressionState();
    const lang = (language || 'html').toLowerCase();
    const lvl = parseInt(levelNum, 10);
    if (!state.languages[lang]) {
      state.languages[lang] = { currentLevel: 1, unlockedLevel: 1, levels: {} };
    }
    state.languages[lang].currentLevel = lvl;
    this.saveProgressionState(state);
  }

  /**
   * Compares the current levels of HTML, CSS, and JavaScript and returns
   * the highest one with consistent tie-breaking (HTML > CSS > JavaScript).
   */
  static getHighestCurrentLevel() {
    const state = this.getProgressionState();
    const tracks = ['html', 'css', 'javascript'];
    const trackNames = { html: 'HTML', css: 'CSS', javascript: 'JavaScript' };

    let highestLevel = 1;
    let highestLang = 'html';

    for (const lang of tracks) {
      const prog = state.languages?.[lang] || { currentLevel: 1, unlockedLevel: 1 };
      const lvl = Math.max(prog.currentLevel || 1, prog.unlockedLevel || 1);
      if (lvl > highestLevel) {
        highestLevel = lvl;
        highestLang = lang;
      }
    }

    return {
      language: highestLang,
      languageName: trackNames[highestLang],
      level: highestLevel,
      displayText: `${trackNames[highestLang]} · Level ${highestLevel}`
    };
  }

  static getUnlockedLevel(language) {
    const prog = this.getLanguageProgression(language);
    return prog.unlockedLevel || 1;
  }

  static isLevelUnlocked(language, levelNum) {
    const lvl = parseInt(levelNum, 10);
    if (lvl === 1) return true; // Level 1 is always available
    const unlocked = this.getUnlockedLevel(language);
    return lvl <= unlocked;
  }

  static getLevelStatus(language, levelNum) {
    const lvl = parseInt(levelNum, 10);
    const prog = this.getLanguageProgression(language);
    const unlocked = this.isLevelUnlocked(language, lvl);
    const lvlData = (prog.levels && prog.levels[lvl]) || { completed: false, challenges: {} };
    
    let completedCount = 0;
    if (lvlData.challenges) {
      for (let ch = 1; ch <= 30; ch++) {
        if (lvlData.challenges[ch] && lvlData.challenges[ch].completed) {
          completedCount++;
        }
      }
    }

    return {
      level: lvl,
      unlocked,
      completed: Boolean(lvlData.completed || completedCount >= 30),
      completedCount,
      totalCount: 30
    };
  }

  static getChallengeStatus(language, levelNum, challengeIndex) {
    const lvl = parseInt(levelNum, 10);
    const ch = parseInt(challengeIndex, 10);
    const prog = this.getLanguageProgression(language);
    const lvlData = (prog.levels && prog.levels[lvl]) || { challenges: {} };
    const chData = (lvlData.challenges && lvlData.challenges[ch]) || null;

    return {
      completed: Boolean(chData && chData.completed),
      attempts: (chData && chData.attempts) || 0,
      bestWpm: (chData && chData.bestWpm) || 0,
      bestAccuracy: (chData && chData.bestAccuracy) || 0,
      lastAttemptAt: (chData && chData.lastAttemptAt) || null
    };
  }

  /**
   * Records a challenge completion, updates level statistics, and unlocks next level
   * ONLY after all 30 challenges in the current level are completed.
   */
  static recordChallengeCompletion(language, levelNum, challengeIndex, wpm, accuracy) {
    const state = this.getProgressionState();
    const lang = (language || 'html').toLowerCase();
    const lvl = parseInt(levelNum, 10);
    const ch = parseInt(challengeIndex, 10);

    if (!state.languages[lang]) {
      state.languages[lang] = { currentLevel: 1, unlockedLevel: 1, levels: {} };
    }
    const langProg = state.languages[lang];
    if (!langProg.levels[lvl]) {
      langProg.levels[lvl] = { completed: false, challenges: {} };
    }
    const lvlData = langProg.levels[lvl];
    if (!lvlData.challenges) lvlData.challenges = {};
    if (!lvlData.challenges[ch]) {
      lvlData.challenges[ch] = {
        completed: false,
        attempts: 0,
        bestWpm: 0,
        bestAccuracy: 0,
        lastAttemptAt: null
      };
    }

    const chRecord = lvlData.challenges[ch];
    chRecord.attempts = (chRecord.attempts || 0) + 1;
    chRecord.lastAttemptAt = new Date().toISOString();

    // Completing the challenge marks it completed (no minimum accuracy threshold)
    chRecord.completed = true;

    if (wpm > (chRecord.bestWpm || 0)) {
      chRecord.bestWpm = wpm;
    }
    if (accuracy > (chRecord.bestAccuracy || 0)) {
      chRecord.bestAccuracy = accuracy;
    }

    // Check if all 30 challenges in this level are now completed
    let completedCount = 0;
    for (let c = 1; c <= 30; c++) {
      if (lvlData.challenges[c] && lvlData.challenges[c].completed) {
        completedCount++;
      }
    }

    if (completedCount >= 30) {
      lvlData.completed = true;
      // Unlocks next level only after all 30 challenges are completed
      if (lvl === langProg.unlockedLevel && langProg.unlockedLevel < 70) {
        langProg.unlockedLevel = lvl + 1;
      }
    }

    langProg.currentLevel = lvl;
    langProg.currentChallengeIndex = ch;
    state.activeLanguage = lang;

    this.saveProgressionState(state);
    return {
      language: lang,
      level: lvl,
      challenge: ch,
      completed: chRecord.completed,
      completedCount,
      levelCompleted: !!lvlData.completed,
      unlockedLevel: langProg.unlockedLevel,
      unlockedNextLevel: Boolean(lvlData.completed && langProg.unlockedLevel > lvl)
    };
  }

  /**
   * Merges remote Firestore progress into local storage, preserving existing achievements.
   */
  static syncCloudProgress(cloudData) {
    if (!cloudData) return;

    try {
      // 1. Merge Level Progress
      if (cloudData.level1) {
        const local = this.getLevelProgress();
        const remote = cloudData.level1;

        const mergedUnlocked = Math.max(local.level1.unlockedPart || 1, remote.unlockedPart || 1);
        const mergedParts = { ...local.level1.parts };

        if (remote.parts) {
          for (const [partKey, remotePart] of Object.entries(remote.parts)) {
            const localPart = mergedParts[partKey] || { completed: false, bestWpm: 0, bestAccuracy: 0 };
            mergedParts[partKey] = {
              completed: Boolean(localPart.completed || remotePart.completed),
              bestWpm: Math.max(localPart.bestWpm || 0, remotePart.bestWpm || 0),
              bestAccuracy: Math.max(localPart.bestAccuracy || 0, remotePart.bestAccuracy || 0)
            };
          }
        }

        local.level1 = {
          unlockedPart: mergedUnlocked,
          parts: mergedParts
        };

        localStorage.setItem(LEVEL_PROGRESS_KEY, JSON.stringify(local));
      }

      // 2. Merge Multi-Language Progression (v2)
      if (cloudData.progression && cloudData.progression.languages) {
        const state = this.getProgressionState();
        for (const [lang, remoteProg] of Object.entries(cloudData.progression.languages)) {
          if (!state.languages[lang]) {
            state.languages[lang] = { currentLevel: 1, unlockedLevel: 1, levels: {} };
          }
          const localProg = state.languages[lang];
          localProg.unlockedLevel = Math.max(localProg.unlockedLevel || 1, remoteProg.unlockedLevel || 1);
          localProg.currentLevel = Math.max(localProg.currentLevel || 1, remoteProg.currentLevel || 1);

          if (remoteProg.levels) {
            for (const [lvlKey, remoteLvl] of Object.entries(remoteProg.levels)) {
              if (!localProg.levels[lvlKey]) {
                localProg.levels[lvlKey] = { completed: false, challenges: {} };
              }
              const localLvl = localProg.levels[lvlKey];
              localLvl.completed = Boolean(localLvl.completed || remoteLvl.completed);
              if (remoteLvl.challenges) {
                for (const [chKey, remoteCh] of Object.entries(remoteLvl.challenges)) {
                  const localCh = localLvl.challenges[chKey] || { completed: false, attempts: 0, bestWpm: 0, bestAccuracy: 0 };
                  localLvl.challenges[chKey] = {
                    completed: Boolean(localCh.completed || remoteCh.completed),
                    attempts: Math.max(localCh.attempts || 0, remoteCh.attempts || 0),
                    bestWpm: Math.max(localCh.bestWpm || 0, remoteCh.bestWpm || 0),
                    bestAccuracy: Math.max(localCh.bestAccuracy || 0, remoteCh.bestAccuracy || 0),
                    lastAttemptAt: remoteCh.lastAttemptAt || localCh.lastAttemptAt
                  };
                }
              }
            }
          }
        }
        this.saveProgressionState(state);
      }

      // 3. Merge aggregate profile metrics
      if (cloudData.profile) {
        const history = this.getHistory();
        if (cloudData.profile.completedChallenges > history.totalCompletedChallenges) {
          history.totalCompletedChallenges = cloudData.profile.completedChallenges;
        }
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      }
    } catch (err) {
      console.warn('Error syncing cloud progress to local storage:', err);
    }
  }
}

