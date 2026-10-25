/**
 * CodeReflex - Storage & Progress State Manager
 * Handles local persistence of user settings, practice history, and metrics.
 */

const SETTINGS_KEY = 'codereflex_settings_v1';
const HISTORY_KEY = 'codereflex_history_v1';
const LEVEL_PROGRESS_KEY = 'codereflex_level_progress_v1';

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

    // Unlock next part if accuracy target of 95% is met
    if (accuracy >= 95) {
      lvl.parts[partNum].completed = true;
      if (partNum < 3 && lvl.unlockedPart <= partNum) {
        lvl.unlockedPart = partNum + 1;
      }
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

      // 2. Merge aggregate profile metrics
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

