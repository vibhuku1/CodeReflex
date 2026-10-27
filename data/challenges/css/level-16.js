/**
 * CodeReflex - CSS Level 16 Challenge
 * Topic: Status Badges and Labels
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l016-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 16,
    "language": "css",
    "title": "Status Badges and Labels",
    "difficulty": "beginner",
    "description": "Implement a suite of semantic status badge classes (success, warning, error) with tinted backgrounds and matching borders.",
    "concepts": [
      "badge variants",
      "color states",
      "pill geometry",
      "inline-flex"
    ],
    "expectedVisualResult": "A row of 3 distinct badges: green success, amber warning, and crimson error.",
    "validationCriteria": "Defines modifier classes for .badge-success, .badge-warning, and .badge-error.",
    "completionCondition": "Type the status badge variant classes.",
    "code": ".badge {\n  display: inline-flex;\n  padding: 4px 10px;\n  border-radius: 9999px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.badge-success {\n  background: rgba(16, 185, 129, 0.15);\n  color: #34d399;\n  border: 1px solid rgba(16, 185, 129, 0.3);\n}\n.badge-warning {\n  background: rgba(245, 158, 11, 0.15);\n  color: #fbbf24;\n  border: 1px solid rgba(245, 158, 11, 0.3);\n}\n.badge-error {\n  background: rgba(244, 63, 94, 0.15);\n  color: #fb7185;\n  border: 1px solid rgba(244, 63, 94, 0.3);\n}",
    "htmlContext": "<div class=\"badges-row\">\n  <span class=\"badge badge-success\">Passed</span>\n  <span class=\"badge badge-warning\">Review</span>\n  <span class=\"badge badge-error\">Failed</span>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
