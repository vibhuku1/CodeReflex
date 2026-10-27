/**
 * CodeReflex - CSS Level 2 Challenge
 * Topic: Color Palette and Background Styling
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l002-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 2,
    "language": "css",
    "title": "Color Palette and Background Styling",
    "difficulty": "beginner",
    "description": "Define an atmospheric dark theme color palette and apply a smooth radial gradient background to a hero banner container.",
    "concepts": [
      "color palette",
      "CSS variables",
      "linear gradients",
      "accent colors"
    ],
    "expectedVisualResult": "A banner featuring a dark crimson radial glow blending into deep space black with radiant crimson text accents.",
    "validationCriteria": "Banner applies radial-gradient background, bright heading color, and contrast-checked text.",
    "completionCondition": "Type the exact target CSS for the palette and atmospheric background.",
    "code": ".color-showcase {\n  background: radial-gradient(circle at 50% 0%, #2a1120 0%, #0b0f17 80%);\n  border: 1px solid #4c1d30;\n  border-radius: 16px;\n  padding: 28px;\n  color: #f1f5f9;\n}\n.palette-title {\n  color: #f43f5e;\n  margin-top: 0;\n  font-size: 24px;\n}",
    "htmlContext": "<div class=\"color-showcase\">\n  <h2 class=\"palette-title\">Deep Space Crimson</h2>\n  <p class=\"palette-subtitle\">Precision UI Palette for Developer Tools</p>\n  <div class=\"color-chip chip-primary\">Primary: #f43f5e</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
