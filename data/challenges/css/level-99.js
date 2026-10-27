/**
 * CodeReflex - CSS Level 99 Challenge
 * Topic: Complete Responsive E-Commerce Website
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l099-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 99,
    "language": "css",
    "title": "Complete Responsive E-Commerce Website",
    "difficulty": "expert",
    "description": "Assemble a complete responsive e-commerce storefront layout combining top announcement bar, product grid, and cart summary.",
    "concepts": [
      "full e-commerce page",
      "header + banner + product grid + cart drawer"
    ],
    "expectedVisualResult": "A complete e-commerce storefront page with coordinated header, announcement, and product listings.",
    "validationCriteria": "Integrates announcement banner, flex header, and responsive grid in unified layout.",
    "completionCondition": "Type the complete responsive e-commerce storefront CSS.",
    "code": ".store-shell {\n  background: #0b0f17;\n  color: #f1f5f9;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.announcement {\n  background: #f43f5e;\n  color: #ffffff;\n  text-align: center;\n  padding: 6px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.store-nav {\n  padding: 14px 20px;\n  border-bottom: 1px solid #1e293b;\n  font-weight: 700;\n}\n.store-catalog {\n  padding: 24px;\n}",
    "htmlContext": "<div class=\"store-shell\">\n  <div class=\"announcement\">Free Worldwide Shipping on Orders Over $100</div>\n  <header class=\"store-nav\">Storefront</header>\n  <div class=\"store-catalog\">Products Grid</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
