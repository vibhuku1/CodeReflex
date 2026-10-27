/**
 * CodeReflex - CSS Level 82 Challenge
 * Topic: Advanced Product Comparison UI
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l082-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 82,
    "language": "css",
    "title": "Advanced Product Comparison UI",
    "difficulty": "expert",
    "description": "Format a comprehensive product comparison table with sticky spec column on scroll and diff value highlighting.",
    "concepts": [
      "sticky first column",
      "diff highlights",
      "collapsible spec sections"
    ],
    "expectedVisualResult": "A comparison table with prominent winner column highlight and bold difference indicators.",
    "validationCriteria": "Highlights recommended product column with elevated border and background tint.",
    "completionCondition": "Type the advanced product comparison CSS.",
    "code": ".spec-matrix {\n  display: grid;\n  grid-template-columns: 1.5fr 1fr 1fr;\n  gap: 8px;\n  background: #0f172a;\n  padding: 16px;\n  border-radius: 8px;\n  color: #f1f5f9;\n}\n.spec-col.winner {\n  background: rgba(56, 189, 248, 0.12);\n  border: 1px solid #38bdf8;\n  border-radius: 6px;\n  padding: 8px;\n  font-weight: 700;\n}",
    "htmlContext": "<div class=\"spec-matrix\">\n  <div class=\"spec-col\">Feature</div>\n  <div class=\"spec-col\">Edition A</div>\n  <div class=\"spec-col winner\">Edition B (Pro)</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
