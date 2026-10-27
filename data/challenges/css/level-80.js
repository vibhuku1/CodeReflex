/**
 * CodeReflex - CSS Level 80 Challenge
 * Topic: Advanced Checkout Experience
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l080-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 80,
    "language": "css",
    "title": "Advanced Checkout Experience",
    "difficulty": "expert",
    "description": "Style an advanced checkout payment selection card with radio selector tabs for Credit Card, Apple Pay, and PayPal.",
    "concepts": [
      "payment method radio tabs",
      "express checkout buttons",
      "security badges"
    ],
    "expectedVisualResult": "A modern card containing 3 radio payment options with highlighted selected option.",
    "validationCriteria": "Styles selected payment option with active border and tint.",
    "completionCondition": "Type the advanced checkout experience CSS.",
    "code": ".payment-selector {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  max-width: 340px;\n}\n.pay-option {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  background: #161e2e;\n  border: 1px solid #283548;\n  border-radius: 8px;\n  color: #f8fafc;\n  cursor: pointer;\n}\n.pay-option.selected {\n  border-color: #38bdf8;\n  background: rgba(56, 189, 248, 0.08);\n}",
    "htmlContext": "<div class=\"payment-selector\">\n  <label class=\"pay-option selected\"><input type=\"radio\" checked> Credit Card</label>\n  <label class=\"pay-option\"><input type=\"radio\"> PayPal</label>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
