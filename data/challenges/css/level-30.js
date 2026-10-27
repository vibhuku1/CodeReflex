/**
 * CodeReflex - CSS Level 30 Challenge
 * Topic: Shopping Cart Interface
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l030-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 30,
    "language": "css",
    "title": "Shopping Cart Interface",
    "difficulty": "intermediate",
    "description": "Style a shopping cart item row with thumbnail, title, quantity stepper, price, and delete button.",
    "concepts": [
      "cart table",
      "quantity controls",
      "item removal",
      "subtotal calculation"
    ],
    "expectedVisualResult": "A clean cart item row with aligned item details, numeric stepper controls, and line total.",
    "validationCriteria": "Uses flexbox with align-items: center and space-between distribution.",
    "completionCondition": "Type the shopping cart interface CSS.",
    "code": ".cart-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n  background: #111827;\n  border-bottom: 1px solid #1f2937;\n  color: #f9fafb;\n}\n.item-stepper {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.btn-step {\n  width: 24px;\n  height: 24px;\n  background: #374151;\n  border: none;\n  color: #f9fafb;\n  border-radius: 4px;\n}",
    "htmlContext": "<div class=\"cart-item\">\n  <div class=\"item-name\">Custom Keycap Set</div>\n  <div class=\"item-stepper\">\n    <button class=\"btn-step\">-</button>\n    <span class=\"step-val\">1</span>\n    <button class=\"btn-step\">+</button>\n  </div>\n  <div class=\"item-total\">$45.00</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
