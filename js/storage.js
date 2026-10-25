/**
 * CodeReflex - Storage & Progress State Manager
 * Handles local persistence of user settings, practice history, and metrics.
 */

const SETTINGS_KEY = 'codereflex_settings_v1';
const HISTORY_KEY = 'codereflex_history_v1';

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
}

