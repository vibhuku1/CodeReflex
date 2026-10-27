/**
 * CodeReflex - CSS Level 29 Challenge
 * Topic: E-Commerce Product Details Page
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l029-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 29,
    "language": "css",
    "title": "E-Commerce Product Details Page",
    "difficulty": "intermediate",
    "description": "Format a comprehensive product details layout featuring image gallery on left and purchase options on right.",
    "concepts": [
      "product gallery layout",
      "variant selectors",
      "price callout",
      "sticky add to cart"
    ],
    "expectedVisualResult": "A 2-column e-commerce product view with gallery image preview and checkout action pane.",
    "validationCriteria": "Implements 2-column layout with flexible gallery and options column.",
    "completionCondition": "Type the product details page layout CSS.",
    "code": ".pdp-layout {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n  background: #161e2e;\n  padding: 24px;\n  border-radius: 12px;\n  color: #f8fafc;\n}\n.pdp-price {\n  display: block;\n  font-size: 24px;\n  font-weight: 700;\n  color: #38bdf8;\n  margin: 12px 0;\n}\n.btn-checkout {\n  padding: 12px 24px;\n  background: #f43f5e;\n  border: none;\n  border-radius: 6px;\n  color: #ffffff;\n  font-weight: 700;\n}",
    "htmlContext": "<div class=\"pdp-layout\">\n  <div class=\"pdp-gallery\">Preview Image</div>\n  <div class=\"pdp-details\">\n    <h2>Wireless Gaming Mouse</h2>\n    <span class=\"pdp-price\">$89.99</span>\n    <button class=\"btn-checkout\">Buy Now</button>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
