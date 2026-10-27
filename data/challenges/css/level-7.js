/**
 * CodeReflex - CSS Level 7 Challenge
 * Topic: Box Shadows and Visual Depth
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l007-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 7,
    "language": "css",
    "title": "Box Shadows and Visual Depth",
    "difficulty": "beginner",
    "description": "Apply layered ambient and key-light box shadows to construct visual depth and tactile elevation on an interactive surface.",
    "concepts": [
      "box-shadow",
      "elevation layering",
      "ambient light",
      "drop shadows"
    ],
    "expectedVisualResult": "A card floating above the surface with a rich double-layered drop shadow for tactile elevation.",
    "validationCriteria": "Implements multi-layer box-shadow with subtle ambient spread and directional offset.",
    "completionCondition": "Type the box-shadow elevation CSS.",
    "code": ".floating-card {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 12px;\n  padding: 24px;\n  color: #e2e8f0;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.4);\n}",
    "htmlContext": "<div class=\"floating-card\">\n  <h4 class=\"card-title\">Elevation Tier 2</h4>\n  <p class=\"card-desc\">Layered box-shadow creates realistic depth on dark surfaces.</p>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
