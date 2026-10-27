/**
 * CodeReflex - CSS Level 59 Challenge
 * Topic: Advanced CSS Grid Composition
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l059-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 59,
    "language": "css",
    "title": "Advanced CSS Grid Composition",
    "difficulty": "advanced",
    "description": "Leverage CSS Grid track alignment across multiple cards using standard multi-track row alignments.",
    "concepts": [
      "subgrid",
      "nested alignments",
      "track inheritance",
      "grid-template-rows: subgrid"
    ],
    "expectedVisualResult": "Two adjacent cards with titles and button footers perfectly aligned across columns.",
    "validationCriteria": "Declares 3-row grid with title, body, and footer alignment.",
    "completionCondition": "Type the grid composition CSS.",
    "code": ".aligned-card {\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n  gap: 12px;\n  background: #161e2e;\n  padding: 20px;\n  border-radius: 8px;\n  color: #f8fafc;\n  min-height: 180px;\n}",
    "htmlContext": "<div class=\"aligned-cards-grid\">\n  <div class=\"aligned-card\">\n    <h3 class=\"card-head\">Title</h3>\n    <p class=\"card-mid\">Body text</p>\n    <div class=\"card-foot\">Action</div>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
