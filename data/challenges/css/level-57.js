/**
 * CodeReflex - CSS Level 57 Challenge
 * Topic: Responsive Product Listing
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l057-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 57,
    "language": "css",
    "title": "Responsive Product Listing",
    "difficulty": "advanced",
    "description": "Build a product listing grid that dynamically increases column density on ultra-wide screens.",
    "concepts": [
      "view switcher",
      "grid view vs list view",
      "fluid card density"
    ],
    "expectedVisualResult": "A grid that gracefully scales from 2 to 4 columns across viewports.",
    "validationCriteria": "Utilizes repeat(auto-fill, minmax(200px, 1fr)) with consistent gap.",
    "completionCondition": "Type the product listing CSS.",
    "code": ".product-listing {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 16px;\n  padding: 12px;\n}\n.product-listing .item {\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 8px;\n  padding: 16px;\n  color: #f3f4f6;\n}",
    "htmlContext": "<div class=\"product-listing\">\n  <div class=\"item\">Item 1</div>\n  <div class=\"item\">Item 2</div>\n  <div class=\"item\">Item 3</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
