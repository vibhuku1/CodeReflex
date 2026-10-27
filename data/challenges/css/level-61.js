/**
 * CodeReflex - CSS Level 61 Challenge
 * Topic: Advanced CSS Pseudo-Classes
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l061-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 61,
    "language": "css",
    "title": "Advanced CSS Pseudo-Classes",
    "difficulty": "advanced",
    "description": "Use the modern relational selector :has() to highlight a card container when its checkbox is checked.",
    "concepts": [
      ":has()",
      ":is()",
      ":where()",
      "relational selectors"
    ],
    "expectedVisualResult": "A card that turns radiant cyan border when the inner checkbox is checked.",
    "validationCriteria": "Uses parent:has(input:checked) relational selector rule.",
    "completionCondition": "Type the relational :has() pseudo-class CSS.",
    "code": ".selectable-card {\n  background: #1e293b;\n  border: 2px solid #334155;\n  border-radius: 8px;\n  padding: 16px;\n  color: #f8fafc;\n  transition: border-color 0.2s ease;\n}\n.selectable-card:has(input:checked) {\n  border-color: #38bdf8;\n  background: rgba(56, 189, 248, 0.08);\n}",
    "htmlContext": "<div class=\"selectable-card\">\n  <label><input type=\"checkbox\"> Select this plan</label>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
