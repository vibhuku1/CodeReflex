/**
 * CodeReflex - CSS Level 70 Challenge
 * Topic: Reduced-Motion Accessibility
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l070-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 70,
    "language": "css",
    "title": "Reduced-Motion Accessibility",
    "difficulty": "advanced",
    "description": "Implement a prefers-reduced-motion media query that safely disables animations for users with vestibular sensitivities.",
    "concepts": [
      "@media (prefers-reduced-motion: reduce)",
      "accessibility",
      "graceful degradation"
    ],
    "expectedVisualResult": "A component with smooth animation by default that becomes completely static when reduced motion is requested.",
    "validationCriteria": "Uses @media (prefers-reduced-motion: reduce) to set transition: none.",
    "completionCondition": "Type the reduced-motion accessibility CSS.",
    "code": ".animated-card {\n  transition: transform 0.3s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  .animated-card {\n    transition: none;\n    transform: none;\n  }\n}",
    "htmlContext": "<div class=\"animated-card\">Accessible Motion Component</div>",
    "previewType": "css",
    "status": "ready"
  }
];
