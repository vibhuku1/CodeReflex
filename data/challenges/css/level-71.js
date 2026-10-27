/**
 * CodeReflex - CSS Level 71 Challenge
 * Topic: Fluid Responsive Typography
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l071-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 71,
    "language": "css",
    "title": "Fluid Responsive Typography",
    "difficulty": "advanced",
    "description": "Use the modern CSS clamp() function to create fluid typography that scales smoothly between 20px on mobile and 36px on desktop.",
    "concepts": [
      "clamp()",
      "viewport units (vw)",
      "minimum/maximum scale",
      "fluid headers"
    ],
    "expectedVisualResult": "A headline that fluidly adjusts its font size with viewport width without sudden breakpoint jumps.",
    "validationCriteria": "Uses font-size: clamp(20px, 4vw + 1rem, 36px).",
    "completionCondition": "Type the fluid typography CSS.",
    "code": ".fluid-headline {\n  font-size: clamp(20px, 3vw + 12px, 36px);\n  font-weight: 800;\n  line-height: 1.2;\n  color: #f8fafc;\n}",
    "htmlContext": "<h1 class=\"fluid-headline\">Fluid Responsive Typography</h1>",
    "previewType": "css",
    "status": "ready"
  }
];
