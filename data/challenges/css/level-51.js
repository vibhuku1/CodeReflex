/**
 * CodeReflex - CSS Level 51 Challenge
 * Topic: CSS Custom Properties and Design Tokens
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l051-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 51,
    "language": "css",
    "title": "CSS Custom Properties and Design Tokens",
    "difficulty": "advanced",
    "description": "Implement a structured design token system using CSS variables for semantic colors, radii, and spacing.",
    "concepts": [
      "custom properties",
      "token architecture",
      "--color-primary",
      "computed tokens"
    ],
    "expectedVisualResult": "A UI component consuming centralized custom properties with consistent brand theme values.",
    "validationCriteria": "Declares custom properties with --prefix and consumes via var().",
    "completionCondition": "Type the design tokens system CSS.",
    "code": ":root {\n  --clr-brand: #f43f5e;\n  --clr-surface: #1e293b;\n  --radius-lg: 12px;\n}\n.token-card {\n  background: var(--clr-surface);\n  border-radius: var(--radius-lg);\n  padding: 20px;\n  color: #f8fafc;\n}\n.token-btn {\n  background: var(--clr-brand);\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  padding: 8px 16px;\n}",
    "htmlContext": "<div class=\"token-card\">\n  <h4 class=\"token-title\">Token-Driven Architecture</h4>\n  <button class=\"token-btn\">Confirm</button>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
