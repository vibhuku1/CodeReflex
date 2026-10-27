/**
 * CodeReflex - CSS Level 52 Challenge
 * Topic: Light and Dark Theme System
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l052-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 52,
    "language": "css",
    "title": "Light and Dark Theme System",
    "difficulty": "advanced",
    "description": "Create a dynamic dual-theme card system using data-theme=\"dark\" attribute selectors with variable overrides.",
    "concepts": [
      "color-scheme",
      "theme switching",
      "prefers-color-scheme",
      "data-theme"
    ],
    "expectedVisualResult": "A component that switches seamlessly between light slate and deep dark space colors.",
    "validationCriteria": "Defines root variables and re-maps them under [data-theme=\"dark\"].",
    "completionCondition": "Type the dark theme system CSS.",
    "code": "[data-theme=\"dark\"] {\n  --bg-panel: #0f172a;\n  --text-main: #f8fafc;\n  --border-subtle: #334155;\n}\n.theme-box {\n  background: var(--bg-panel);\n  color: var(--text-main);\n  border: 1px solid var(--border-subtle);\n  border-radius: 8px;\n  padding: 20px;\n}",
    "htmlContext": "<div class=\"theme-box\" data-theme=\"dark\">\n  <h3>Adaptive Theme Card</h3>\n  <p>Automatically overrides surface and text tokens.</p>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
