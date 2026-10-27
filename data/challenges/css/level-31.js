/**
 * CodeReflex - CSS Level 31 Challenge
 * Topic: Checkout Page Layout
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l031-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 31,
    "language": "css",
    "title": "Checkout Page Layout",
    "difficulty": "intermediate",
    "description": "Construct a split checkout layout with customer details on left and sticky order summary card on right.",
    "concepts": [
      "2-column checkout",
      "order summary sidebar",
      "form groups",
      "payment badges"
    ],
    "expectedVisualResult": "A 2-column checkout grid with form fields taking 60% and order summary occupying 40% width.",
    "validationCriteria": "Declares grid-template-columns: 1.5fr 1fr with gap and distinct card styling.",
    "completionCondition": "Type the checkout page layout CSS.",
    "code": ".checkout-grid {\n  display: grid;\n  grid-template-columns: 1.5fr 1fr;\n  gap: 24px;\n  max-width: 720px;\n  color: #f8fafc;\n}\n.checkout-forms, .order-summary {\n  background: #1e293b;\n  padding: 20px;\n  border-radius: 8px;\n}",
    "htmlContext": "<div class=\"checkout-grid\">\n  <div class=\"checkout-forms\">Shipping & Payment</div>\n  <aside class=\"order-summary\">Summary: $134.00</aside>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
