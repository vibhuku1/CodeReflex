/**
 * CodeReflex - CSS Level 49 Challenge
 * Topic: Product Comparison Table
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l049-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 49,
    "language": "css",
    "title": "Product Comparison Table",
    "difficulty": "intermediate",
    "description": "Construct a multi-product feature comparison matrix with fixed feature column and aligned checkmark columns.",
    "concepts": [
      "comparison matrix",
      "feature rows",
      "check/cross symbols",
      "sticky header"
    ],
    "expectedVisualResult": "A 3-column table comparing features between Basic and Pro tiers with checkmarks.",
    "validationCriteria": "Uses CSS grid or table layout with centered checkmarks and alternating row styles.",
    "completionCondition": "Type the comparison table CSS.",
    "code": ".compare-table {\n  background: #1e293b;\n  border-radius: 8px;\n  overflow: hidden;\n  color: #f8fafc;\n}\n.compare-table .row {\n  display: grid;\n  grid-template-columns: 2fr 1fr 1fr;\n  padding: 12px 16px;\n  border-bottom: 1px solid #334155;\n  text-align: center;\n}\n.compare-table .row .col:first-child {\n  text-align: left;\n}\n.compare-table .row.header {\n  font-weight: 700;\n  background: #0f172a;\n}",
    "htmlContext": "<div class=\"compare-table\">\n  <div class=\"row header\"><div class=\"col\">Feature</div><div class=\"col\">Basic</div><div class=\"col\">Pro</div></div>\n  <div class=\"row\"><div class=\"col\">CSS 100 Levels</div><div class=\"col\">-</div><div class=\"col\">✓</div></div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
