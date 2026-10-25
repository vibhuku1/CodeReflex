# CodeReflex — Coding Typing Practice Platform

> A minimal, developer-focused web application designed to build muscle memory, typing speed (WPM), and syntax familiarity with real-world programming code and live-rendered components.

---

## Features

- **Split-Screen Workspace:**
  - **Left Panel (Code Editor):** Monospaced code view with line gutter, muted ghost-text for upcoming characters, real-time error highlighting, caret indicators, and auto-indent support.
  - **Right Panel (Live Preview):**
    - **Type-to-Build Mode:** Real-time sandboxed component rendering (SaaS metric cards, glassmorphic navbars, notification toasts) that build live as you type.
    - **Code Mode (JavaScript & Python):** Simulated execution console and test suite verification checks.
    - **Normal Mode:** Software engineering principles and reader insights.
  - **Draggable Split Resizer:** Customize the width between the code editor and preview panel.
- **Precision Typing Engine:**
  - Accurate capture of brackets (`{}`, `[]`, `()`), punctuation, semicolons, quotes, spaces, tabs, and newlines.
  - Standard Net WPM formula: `((correct_characters / 5) / elapsed_minutes)`.
  - Live accuracy %, error count, keystroke progress bar, and active timer.
  - Word-level backspace (`Ctrl+Backspace` / `Alt+Backspace` / `Cmd+Backspace`).
  - Optional smart auto-indent for leading whitespace on newlines.
- **Synthesized Mechanical Audio (Web Audio API):**
  - Crisp, low-latency synthetic key clicks toggleable in Preferences (zero external audio file dependencies).
- **Completion Telemetry & Persistence:**
  - Post-challenge breakdown: Net WPM, Raw WPM, Accuracy, Elapsed Time, Mistakes, and Interval Speed Progression chart.
  - LocalStorage persistence for user preferences, language personal bests, and recent session history.

---

## Quick Start

Open `index.html` directly in any modern web browser, or serve it using any local static file server:

```bash
# Using Python 3:
python3 -m http.server 8080

# Or using Node npx:
npx serve .
```

Then visit `http://localhost:8080` in your browser.

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Esc` or `Alt + R` | Restart current challenge |
| `Tab + Enter` | Advance to Next Snippet (from completion modal) |
| `Tab` | Indent / match indentation spaces |
| `Enter` | Complete line / advance to next line |
| `Backspace` | Undo previous character / correct mistakes |
| `Ctrl/Cmd + Backspace` | Delete previous word / indentation block |

---

## File Structure

```
CodeReflex/
├── index.html              # Main HTML5 layout & accessible modals
├── css/
│   ├── main.css            # Dark theme design system & navigation
│   ├── editor.css          # Monospace typography, gutter & carets
│   ├── preview.css         # Live sandbox iframe & terminal simulation
│   ├── modals.css          # Results dialog, settings & telemetry table
│   └── responsive.css      # Tablet & mobile responsive breakpoints
├── js/
│   ├── app.js              # State orchestration & event coordinator
│   ├── engine.js           # Core typing engine & metric calculations
│   ├── editor.js           # Line rendering, character tokens & scrolling
│   ├── preview.js          # Live component & console preview controller
│   ├── challenges.js       # Curated challenges across modes & languages
│   ├── storage.js          # LocalStorage settings & history persistence
│   ├── sound.js            # Web Audio API mechanical keyboard audio
│   └── modals.js           # Completion, settings & progress dialogs
└── README.md               # Documentation & usage guide
```

