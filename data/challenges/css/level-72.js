/**
 * CodeReflex - CSS Level 72 Challenge
 * Topic: Fluid Spacing System
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l072-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 72,
    "language": "css",
    "title": "Fluid Spacing System",
    "difficulty": "advanced",
    "description": "Establish a fluid spacing system where section padding scales dynamically with viewport width using clamp().",
    "concepts": [
      "clamp() for padding/gap",
      "fluid layouts",
      "no breakpoints"
    ],
    "expectedVisualResult": "A section container with padding that expands smoothly on larger monitors.",
    "validationCriteria": "Uses padding: clamp(16px, 5vw, 48px).",
    "completionCondition": "Type the fluid spacing CSS.",
    "code": ".fluid-section {\n  padding: clamp(16px, 4vw, 48px);\n  background: #111827;\n  border-radius: 8px;\n  color: #f1f5f9;\n}",
    "htmlContext": "<section class=\"fluid-section\">Fluid Padding Section</section>",
    "previewType": "css",
    "status": "ready"
  }
];
