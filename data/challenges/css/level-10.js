/**
 * CodeReflex - CSS Level 10 Challenge
 * Topic: Flexbox Alignment
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l010-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 10,
    "language": "css",
    "title": "Flexbox Alignment",
    "difficulty": "beginner",
    "description": "Align user profile actions horizontally using Flexbox with space-between distribution and centered cross-axis items.",
    "concepts": [
      "display: flex",
      "justify-content",
      "align-items",
      "gap"
    ],
    "expectedVisualResult": "A toolbar header with title aligned to the left and action buttons aligned to the right, perfectly centered vertically.",
    "validationCriteria": "Sets display: flex, justify-content: space-between, and align-items: center.",
    "completionCondition": "Type the flexbox alignment CSS.",
    "code": ".toolbar-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  padding: 14px 20px;\n  background: #131923;\n  border-radius: 8px;\n  color: #f1f5f9;\n}\n.header-actions {\n  display: flex;\n  gap: 8px;\n}",
    "htmlContext": "<div class=\"toolbar-header\">\n  <div class=\"user-greeting\">Welcome back, Developer!</div>\n  <div class=\"header-actions\">\n    <button class=\"btn-sm\">Filter</button>\n    <button class=\"btn-sm\">Export</button>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
