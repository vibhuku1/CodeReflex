/**
 * CodeReflex - CSS Level 81 Challenge
 * Topic: Marketplace Homepage
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l081-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 81,
    "language": "css",
    "title": "Marketplace Homepage",
    "difficulty": "expert",
    "description": "Build a digital marketplace layout featuring a promotional hero ribbon and an auto-wrapping category card shelf.",
    "concepts": [
      "category carousel",
      "featured seller banner",
      "trending badge grid"
    ],
    "expectedVisualResult": "A marketplace portal with top seller banner and categorized product cards.",
    "validationCriteria": "Uses CSS grid and flexbox for category cards and seller ribbon.",
    "completionCondition": "Type the marketplace homepage CSS.",
    "code": ".marketplace-shell {\n  background: #090d16;\n  border-radius: 10px;\n  padding: 20px;\n  color: #f8fafc;\n}\n.promo-ribbon {\n  background: linear-gradient(90deg, #f43f5e, #8b5cf6);\n  padding: 12px 18px;\n  border-radius: 6px;\n  font-weight: 700;\n  text-align: center;\n}\n.category-shelf {\n  display: flex;\n  gap: 10px;\n  margin-top: 16px;\n}\n.cat-pill {\n  background: #1a2234;\n  padding: 8px 14px;\n  border-radius: 20px;\n  font-size: 13px;\n}",
    "htmlContext": "<div class=\"marketplace-shell\">\n  <div class=\"promo-ribbon\">Flash Sale: 50% Off All Developer Kits</div>\n  <div class=\"category-shelf\">\n    <div class=\"cat-pill\">Keyboards</div>\n    <div class=\"cat-pill\">Keycaps</div>\n    <div class=\"cat-pill\">Switches</div>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
