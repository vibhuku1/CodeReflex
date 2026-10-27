/**
 * CodeReflex - CSS Level 64 Challenge
 * Topic: CSS Masks and Clipping
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l064-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 64,
    "language": "css",
    "title": "CSS Masks and Clipping",
    "difficulty": "advanced",
    "description": "Create a modern slanted banner card with a dynamic angled bottom edge using clip-path: polygon().",
    "concepts": [
      "clip-path: polygon()",
      "mask-image",
      "slanted edges",
      "non-rectangular UI"
    ],
    "expectedVisualResult": "A card whose bottom edge slopes diagonally from left to right.",
    "validationCriteria": "Applies clip-path: polygon() with 4 coordinate pairs.",
    "completionCondition": "Type the clip-path polygon CSS.",
    "code": ".slanted-banner {\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  color: #f1f5f9;\n  padding: 24px;\n  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);\n  border-radius: 8px 8px 0 0;\n}",
    "htmlContext": "<div class=\"slanted-banner\">\n  <h2>Angled Cyberpunk Card</h2>\n  <p>Precision cut polygon edges.</p>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
