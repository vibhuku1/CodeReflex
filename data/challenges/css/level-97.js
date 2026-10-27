/**
 * CodeReflex - CSS Level 97 Challenge
 * Topic: Scalable CSS Architecture
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l097-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 97,
    "language": "css",
    "title": "Scalable CSS Architecture",
    "difficulty": "expert",
    "description": "Organize style rules using modern CSS @layer declarations to manage specificity cleanly across components and utilities.",
    "concepts": [
      "layer cascade (@layer)",
      "utility vs component layers",
      "specificity management"
    ],
    "expectedVisualResult": "A component governed by declared @layer rules where utilities reliably override component styles.",
    "validationCriteria": "Declares @layer components, utilities; with ordered layer definitions.",
    "completionCondition": "Type the @layer architecture CSS.",
    "code": "@layer components {\n  .layer-box {\n    background: #111827;\n    border-radius: 8px;\n    padding: 16px;\n    color: #f9fafb;\n  }\n}\n@layer utilities {\n  .text-center {\n    text-align: center;\n  }\n}",
    "htmlContext": "<div class=\"layer-box text-center\">Layered Architecture</div>",
    "previewType": "css",
    "status": "ready"
  }
];
