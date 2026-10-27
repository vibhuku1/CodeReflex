/**
 * CodeReflex - CSS Level 94 Challenge
 * Topic: Restaurant Ordering Website
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l094-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 94,
    "language": "css",
    "title": "Restaurant Ordering Website",
    "difficulty": "expert",
    "description": "Style an appetizing menu item card with dietary tag pills (Vegan, Gluten-Free), price, and quick-add button.",
    "concepts": [
      "menu category bar",
      "dish item card",
      "spice level badges",
      "add button"
    ],
    "expectedVisualResult": "A restaurant menu card with dietary badges and rounded Add button.",
    "validationCriteria": "Card with title, description, dietary pills, and action button.",
    "completionCondition": "Type the restaurant ordering CSS.",
    "code": ".menu-dish-card {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 8px;\n  padding: 16px;\n  color: #f3f4f6;\n  max-width: 440px;\n}\n.diet-tag {\n  display: inline-block;\n  background: rgba(16, 185, 129, 0.15);\n  color: #34d399;\n  font-size: 11px;\n  padding: 2px 8px;\n  border-radius: 4px;\n  margin-top: 6px;\n}\n.dish-price {\n  font-size: 18px;\n  font-weight: 700;\n}",
    "htmlContext": "<div class=\"menu-dish-card\">\n  <div class=\"dish-info\">\n    <h4>Truffle Pasta</h4>\n    <p>Handmade tagliatelle with black truffle butter.</p>\n    <span class=\"diet-tag\">Vegetarian</span>\n  </div>\n  <div class=\"dish-price\">$26.00</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
