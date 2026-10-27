/**
 * CodeReflex - CSS Level 12 Challenge
 * Topic: CSS Grid Product Gallery
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l012-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 12,
    "language": "css",
    "title": "CSS Grid Product Gallery",
    "difficulty": "beginner",
    "description": "Create an auto-fitting multi-column responsive product card grid using repeat() and minmax().",
    "concepts": [
      "display: grid",
      "grid-template-columns",
      "repeat()",
      "minmax()",
      "gap"
    ],
    "expectedVisualResult": "A responsive grid that lays out items in adaptive columns with uniform gaps.",
    "validationCriteria": "Uses grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) and gap.",
    "completionCondition": "Type the CSS grid gallery CSS.",
    "code": ".product-gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n  padding: 16px;\n}\n.gallery-item {\n  background: #1e293b;\n  border: 1px solid #334155;\n  border-radius: 8px;\n  padding: 16px;\n  color: #f8fafc;\n}",
    "htmlContext": "<div class=\"product-gallery\">\n  <div class=\"gallery-item\">Item 1</div>\n  <div class=\"gallery-item\">Item 2</div>\n  <div class=\"gallery-item\">Item 3</div>\n  <div class=\"gallery-item\">Item 4</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
