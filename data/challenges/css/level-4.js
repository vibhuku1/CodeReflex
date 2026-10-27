/**
 * CodeReflex - CSS Level 4 Challenge
 * Topic: Margin, Padding and Spacing
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l004-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 4,
    "language": "css",
    "title": "Margin, Padding and Spacing",
    "difficulty": "beginner",
    "description": "Format an announcement callout with directional padding, explicit block spacing, and badge alignment.",
    "concepts": [
      "margin collapse",
      "directional padding",
      "negative margins",
      "box spacing"
    ],
    "expectedVisualResult": "A well-spaced announcement callout with ample internal breathing room and consistent vertical rhythm.",
    "validationCriteria": "Uses explicit padding and margin rules to eliminate unwanted collapse.",
    "completionCondition": "Type the margin and padding layout CSS.",
    "code": ".callout-box {\n  background: #0f172a;\n  border-left: 4px solid #38bdf8;\n  padding: 18px 24px;\n  margin: 16px 0;\n  border-radius: 0 8px 8px 0;\n}\n.callout-title {\n  margin: 6px 0 8px 0;\n  color: #f8fafc;\n  font-size: 16px;\n}\n.callout-text {\n  margin: 0;\n  color: #94a3b8;\n  font-size: 13px;\n}",
    "htmlContext": "<div class=\"callout-box\">\n  <span class=\"callout-label\">Update</span>\n  <h4 class=\"callout-title\">v2.0 Performance Engine Released</h4>\n  <p class=\"callout-text\">All typing latency has been reduced to zero with hardware-accelerated caret rendering.</p>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
