/**
 * CodeReflex - CSS Level 53 Challenge
 * Topic: Interactive Card States
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l053-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 53,
    "language": "css",
    "title": "Interactive Card States",
    "difficulty": "advanced",
    "description": "Style a multi-state interactive card that responds to hover, active clicks, and child focus events using :focus-within.",
    "concepts": [
      ":hover",
      ":focus-within",
      ":active",
      "state transitions"
    ],
    "expectedVisualResult": "A card that highlights when any child button is focused via keyboard.",
    "validationCriteria": "Uses :focus-within to apply a distinct border color to the parent card.",
    "completionCondition": "Type the interactive card states CSS.",
    "code": ".interactive-panel {\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 8px;\n  padding: 16px;\n  color: #f9fafb;\n  transition: border-color 0.15s ease;\n}\n.interactive-panel:focus-within {\n  border-color: #38bdf8;\n  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);\n}",
    "htmlContext": "<div class=\"interactive-panel\">\n  <h4>Keyboard Accessible Card</h4>\n  <button class=\"btn-inner\">Action</button>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
