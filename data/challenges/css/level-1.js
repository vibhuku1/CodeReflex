/**
 * CodeReflex - CSS Level 1 Challenge
 * Topic: Product Card Design
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l001-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 1,
    "language": "css",
    "title": "Product Card Design",
    "difficulty": "beginner",
    "description": "Style a modern e-commerce product card container with a dark surface background, subtle border, rounded corners, and internal padding.",
    "concepts": [
      "card layout",
      "borders",
      "border-radius",
      "padding",
      "background-color"
    ],
    "expectedVisualResult": "A clean, centered product card container with dark surface #161d27, smooth 12px rounded borders, and structured spacing.",
    "validationCriteria": "Card must define dark background, 1px solid border, 12px border-radius, and 20px padding.",
    "completionCondition": "Type the exact target CSS for the product card container.",
    "code": ".product-card {\n  background-color: #161d27;\n  border: 1px solid #2a3442;\n  border-radius: 12px;\n  padding: 20px;\n  max-width: 320px;\n  color: #f8fafc;\n}",
    "htmlContext": "<div class=\"product-card\">\n  <div class=\"product-badge\">NEW</div>\n  <h3 class=\"product-title\">Reflex Mechanical Keyboard</h3>\n  <p class=\"product-price\">$149.00</p>\n  <button class=\"btn-buy\">Add to Cart</button>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
