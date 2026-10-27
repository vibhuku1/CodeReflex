/**
 * CodeReflex - CSS Level 17 Challenge
 * Topic: Product Card Collection
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l017-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 17,
    "language": "css",
    "title": "Product Card Collection",
    "difficulty": "beginner",
    "description": "Style a vertical list collection of product summary rows with thumbnail on the left, details, and price aligned right.",
    "concepts": [
      "card lists",
      "vertical stacking",
      "subtle separators",
      "hover outlines"
    ],
    "expectedVisualResult": "A list of 3 horizontal product items with clean border dividers and subtle hover highlights.",
    "validationCriteria": "Uses display: flex on list items with border-bottom dividers and hover state.",
    "completionCondition": "Type the product card collection CSS.",
    "code": ".product-collection {\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 8px;\n  overflow: hidden;\n  max-width: 340px;\n}\n.collection-item {\n  display: flex;\n  justify-content: space-between;\n  padding: 14px 18px;\n  border-bottom: 1px solid #1f2937;\n  color: #f3f4f6;\n  font-size: 14px;\n}\n.collection-item:last-child {\n  border-bottom: none;\n}\n.collection-item:hover {\n  background: #1a2234;\n}",
    "htmlContext": "<div class=\"product-collection\">\n  <div class=\"collection-item\">\n    <div class=\"item-title\">Keycaps Set</div>\n    <div class=\"item-price\">$39</div>\n  </div>\n  <div class=\"collection-item\">\n    <div class=\"item-title\">Coiled Cable</div>\n    <div class=\"item-price\">$24</div>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
