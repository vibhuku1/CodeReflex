/**
 * CodeReflex - CSS Level 21 Challenge
 * Topic: Responsive Product Card
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l021-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 21,
    "language": "css",
    "title": "Responsive Product Card",
    "difficulty": "beginner",
    "description": "Build a responsive product card that displays as a horizontal split row on desktop and stacks vertically on mobile screens.",
    "concepts": [
      "media queries",
      "max-width",
      "responsive stacking",
      "fluid sizing"
    ],
    "expectedVisualResult": "A card that stacks vertically on screens under 600px and displays side-by-side on larger viewports.",
    "validationCriteria": "Uses @media (max-width: 600px) to switch flex-direction from row to column.",
    "completionCondition": "Type the responsive media query CSS.",
    "code": ".responsive-card {\n  display: flex;\n  flex-direction: row;\n  gap: 16px;\n  background: #161e2e;\n  border-radius: 8px;\n  padding: 16px;\n  color: #f8fafc;\n}\n@media (max-width: 600px) {\n  .responsive-card {\n    flex-direction: column;\n  }\n}",
    "htmlContext": "<div class=\"responsive-card\">\n  <div class=\"card-thumb\">IMG</div>\n  <div class=\"card-info\">\n    <h4>Pro Headset</h4>\n    <p>Spatial audio with ultra-low latency wireless transceiver.</p>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
