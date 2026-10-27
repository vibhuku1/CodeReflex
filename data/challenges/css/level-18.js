/**
 * CodeReflex - CSS Level 18 Challenge
 * Topic: Positioning and Overlays
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l018-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 18,
    "language": "css",
    "title": "Positioning and Overlays",
    "difficulty": "beginner",
    "description": "Position a promotional discount pill over the top-right corner of a product visual banner using absolute positioning.",
    "concepts": [
      "position: relative",
      "position: absolute",
      "inset",
      "z-index"
    ],
    "expectedVisualResult": "A discount badge anchored to the top right of an image with proper z-index layering.",
    "validationCriteria": "Sets parent to position: relative and badge to position: absolute with top and right offsets.",
    "completionCondition": "Type the absolute overlay positioning CSS.",
    "code": ".card-overlay-wrapper {\n  position: relative;\n  background: #1e293b;\n  border-radius: 10px;\n  padding: 24px;\n  color: #f8fafc;\n  max-width: 300px;\n}\n.overlay-tag {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  background: #f43f5e;\n  color: #ffffff;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 11px;\n  font-weight: 700;\n  z-index: 2;\n}",
    "htmlContext": "<div class=\"card-overlay-wrapper\">\n  <span class=\"overlay-tag\">-25% OFF</span>\n  <div class=\"banner-body\">Premium Mechanical Switches</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
