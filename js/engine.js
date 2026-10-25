/**
 * CodeReflex - Robust Typing Engine
 * Handles character tracking, keystroke evaluation, indentation,
 * WPM/accuracy metrics, and event dispatching.
 */

export class TypingEngine {
  constructor(options = {}) {
    this.targetText = '';
    this.cursorIndex = 0;
    this.charStates = []; // Array of { char, state: 'pending'|'correct'|'incorrect', userChar }
    this.startTime = null;
    this.endTime = null;
    this.timerInterval = null;
    this.isActive = false;
    this.isCompleted = false;

    // Metrics counters
    this.totalKeystrokes = 0;
    this.correctChars = 0;
    this.errorCount = 0;
    this.keystrokeLog = []; // { time, char, isCorrect, wpm }

    // Configuration
    this.autoIndent = options.autoIndent ?? true;
    this.tabSize = options.tabSize ?? 2;

    // Event callbacks
    this.onStateChange = options.onStateChange || (() => {});
    this.onProgress = options.onProgress || (() => {});
    this.onComplete = options.onComplete || (() => {});
    this.onError = options.onError || (() => {});
  }

  /**
   * Loads a code challenge and resets the engine state
   */
  loadSnippet(text) {
    // Standardize CRLF to LF and trim trailing line breaks for clean completion
    this.targetText = text.replace(/\r\n/g, '\n').trimEnd();
    this.reset();
  }

  /**
   * Resets all progress and metrics
   */
  reset() {
    this.stopTimer();
    this.cursorIndex = 0;
    this.startTime = null;
    this.endTime = null;
    this.isActive = false;
    this.isCompleted = false;
    this.totalKeystrokes = 0;
    this.correctChars = 0;
    this.errorCount = 0;
    this.keystrokeLog = [];

    // Pre-populate character states
    this.charStates = Array.from(this.targetText).map(char => ({
      char,
      state: 'pending',
      userChar: null
    }));

    this.onStateChange(this.getStateSnapshot());
    this.onProgress(this.getMetrics());
  }

  /**
   * Handles raw keyboard input event
   */
  handleKey(e) {
    if (this.isCompleted) return;

    const key = e.key;

    // Ignore modifier standalone presses
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(key)) {
      return;
    }

    // 1. Backspace handling (supports Ctrl/Cmd/Alt + Backspace for word deletion)
    if (key === 'Backspace') {
      e.preventDefault();
      this.handleBackspace(e.ctrlKey || e.altKey || e.metaKey);
      return;
    }

    // If Ctrl or Command is active with any other key, ignore to preserve system shortcuts
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    // 2. Tab key handling
    if (key === 'Tab') {
      e.preventDefault();
      this.handleTab();
      return;
    }

    // 3. Enter key handling
    if (key === 'Enter') {
      e.preventDefault();
      this.processChar('\n');
      return;
    }

    // 4. Normal character typing (single printable character)
    if (key.length === 1) {
      e.preventDefault();
      this.processChar(key);
    }
  }

  /**
   * Process a single typed character against the target
   */
  processChar(typedChar) {
    if (this.isCompleted) return;
    if (this.cursorIndex >= this.targetText.length) return;

    if (!this.isActive) {
      this.startTimer();
    }

    const expectedChar = this.targetText[this.cursorIndex];
    this.totalKeystrokes++;

    const isMatch = (typedChar === expectedChar);

    if (isMatch) {
      this.charStates[this.cursorIndex].state = 'correct';
      this.charStates[this.cursorIndex].userChar = typedChar;
      this.correctChars++;
      this.cursorIndex++;

      // Auto-indent helper: If we just hit a newline and the next characters are leading spaces
      if (this.autoIndent && typedChar === '\n') {
        this.autoFillIndentation();
      }
    } else {
      // Mistake made
      this.charStates[this.cursorIndex].state = 'incorrect';
      this.charStates[this.cursorIndex].userChar = typedChar;
      this.errorCount++;
      this.onError({
        expected: expectedChar,
        actual: typedChar,
        index: this.cursorIndex
      });
      // Advance cursor past the mistake so user can continue or backspace to fix
      this.cursorIndex++;
    }

    // Log telemetry for consistency graphing
    const currentMetrics = this.getMetrics();
    this.keystrokeLog.push({
      time: currentMetrics.elapsedSeconds,
      char: typedChar,
      isCorrect: isMatch,
      wpm: currentMetrics.wpm
    });

    this.onStateChange(this.getStateSnapshot());
    this.onProgress(currentMetrics);

    // Check completion condition
    if (this.cursorIndex >= this.targetText.length) {
      this.completeChallenge();
    }
  }

  /**
   * Automatically advance through leading whitespace on a new line
   */
  autoFillIndentation() {
    let spacesCount = 0;
    while (
      this.cursorIndex < this.targetText.length &&
      (this.targetText[this.cursorIndex] === ' ' || this.targetText[this.cursorIndex] === '\t')
    ) {
      this.charStates[this.cursorIndex].state = 'correct';
      this.charStates[this.cursorIndex].userChar = this.targetText[this.cursorIndex];
      this.correctChars++;
      this.cursorIndex++;
      spacesCount++;
    }
  }

  /**
   * Handle Tab key press (matches either a literal \t or a block of spaces)
   */
  handleTab() {
    if (this.cursorIndex >= this.targetText.length) return;

    const expected = this.targetText[this.cursorIndex];
    if (expected === '\t') {
      this.processChar('\t');
    } else if (expected === ' ') {
      // Match consecutive spaces up to tabSize
      for (let i = 0; i < this.tabSize; i++) {
        if (this.cursorIndex < this.targetText.length && this.targetText[this.cursorIndex] === ' ') {
          this.processChar(' ');
        } else {
          break;
        }
      }
    } else {
      // If Tab is pressed where not expected, count as incorrect attempt
      this.processChar(' ');
    }
  }

  /**
   * Handle Backspace with support for word/indent deletion
   */
  handleBackspace(wordDelete = false) {
    if (this.cursorIndex <= 0) return;

    if (wordDelete) {
      // Delete back to nearest whitespace or token boundary
      let targetIndex = this.cursorIndex - 1;
      while (targetIndex > 0 && this.targetText[targetIndex] !== ' ' && this.targetText[targetIndex] !== '\n') {
        targetIndex--;
      }
      while (this.cursorIndex > targetIndex) {
        this.stepBackSingle();
      }
    } else {
      this.stepBackSingle();
    }

    this.onStateChange(this.getStateSnapshot());
    this.onProgress(this.getMetrics());
  }

  stepBackSingle() {
    if (this.cursorIndex <= 0) return;
    this.cursorIndex--;

    const prevState = this.charStates[this.cursorIndex].state;
    if (prevState === 'correct') {
      this.correctChars = Math.max(0, this.correctChars - 1);
    }

    this.charStates[this.cursorIndex].state = 'pending';
    this.charStates[this.cursorIndex].userChar = null;
  }

  startTimer() {
    this.isActive = true;
    this.startTime = performance.now();
    this.timerInterval = setInterval(() => {
      if (this.isActive && !this.isCompleted) {
        this.onProgress(this.getMetrics());
      }
    }, 100);
  }

  stopTimer() {
    this.isActive = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.startTime && !this.endTime) {
      this.endTime = performance.now();
    }
  }

  completeChallenge() {
    this.stopTimer();
    this.isCompleted = true;
    const finalMetrics = this.getMetrics();
    this.onComplete(finalMetrics);
  }

  /**
   * Computes accurate WPM, accuracy, time elapsed, and progress
   */
  getMetrics() {
    const now = this.endTime || (this.startTime ? performance.now() : null);
    const elapsedSeconds = this.startTime && now ? Math.max(0.1, (now - this.startTime) / 1000) : 0;
    const elapsedMinutes = elapsedSeconds / 60;

    // Standard Typing Formula: 1 Word = 5 characters
    // Net WPM: Based on correctly typed characters
    let wpm = 0;
    let rawWpm = 0;

    if (elapsedMinutes > 0) {
      wpm = Math.round((this.correctChars / 5) / elapsedMinutes);
      rawWpm = Math.round((this.totalKeystrokes / 5) / elapsedMinutes);
    }

    // Accuracy calculation:
    // Keystroke accuracy = (totalKeystrokes - errorCount) / totalKeystrokes
    let accuracy = 100;
    if (this.totalKeystrokes > 0) {
      const accurateKeystrokes = Math.max(0, this.totalKeystrokes - this.errorCount);
      accuracy = Math.round((accurateKeystrokes / this.totalKeystrokes) * 100);
    }

    // Challenge progress
    const totalChars = this.targetText.length;
    const progressPercent = totalChars > 0 ? Math.min(100, Math.round((this.cursorIndex / totalChars) * 100)) : 0;

    return {
      wpm: Math.max(0, wpm),
      rawWpm: Math.max(0, rawWpm),
      accuracy: Math.min(100, Math.max(0, accuracy)),
      elapsedSeconds: Math.floor(elapsedSeconds),
      elapsedTimeFormatted: this.formatTime(elapsedSeconds),
      cursorIndex: this.cursorIndex,
      totalChars,
      correctChars: this.correctChars,
      errorCount: this.errorCount,
      totalKeystrokes: this.totalKeystrokes,
      progressPercent,
      isCompleted: this.isCompleted,
      keystrokeLog: this.keystrokeLog
    };
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  getStateSnapshot() {
    return {
      cursorIndex: this.cursorIndex,
      charStates: this.charStates,
      totalChars: this.targetText.length,
      isCompleted: this.isCompleted
    };
  }
}
