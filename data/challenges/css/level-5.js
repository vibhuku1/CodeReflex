/**
 * CodeReflex - CSS Level 5 Challenge
 * Topic: CSS Box Model Layout
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l005-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 5,
    "language": "css",
    "title": "CSS Box Model Layout",
    "difficulty": "beginner",
    "description": "Configure standard border-box sizing across input containers to ensure padding and borders do not cause container blowouts.",
    "concepts": [
      "box-sizing",
      "content-box vs border-box",
      "width calculation",
      "overflow"
    ],
    "expectedVisualResult": "A search container where the input element fills 100% width cleanly without overflowing its parent box.",
    "validationCriteria": "Sets box-sizing: border-box with width: 100% and internal padding.",
    "completionCondition": "Type the box model CSS rules.",
    "code": ".search-container {\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 360px;\n  padding: 16px;\n  background: #111827;\n  border-radius: 8px;\n}\n.search-input {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 10px 14px;\n  background: #1f2937;\n  border: 1px solid #374151;\n  border-radius: 6px;\n  color: #f9fafb;\n}",
    "htmlContext": "<div class=\"search-container\">\n  <label for=\"search-input\" class=\"search-label\">Quick Search</label>\n  <input type=\"text\" id=\"search-input\" class=\"search-input\" placeholder=\"Search documentation...\">\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
