/**
 * CodeReflex - CSS Level 96 Challenge
 * Topic: Advanced Component Variant System
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l096-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 96,
    "language": "css",
    "title": "Advanced Component Variant System",
    "difficulty": "expert",
    "description": "Implement a comprehensive button variant system supporting sizes (sm, md, lg) and intents (primary, outline, ghost).",
    "concepts": [
      "multi-variant classes",
      "size variants (sm, md, lg)",
      "color intents"
    ],
    "expectedVisualResult": "A series of button variants sharing a base class with customized modifier dimensions.",
    "validationCriteria": "Defines .btn base class with .btn--sm, .btn--lg, and .btn--outline modifier rules.",
    "completionCondition": "Type the component variant system CSS.",
    "code": ".btn {\n  display: inline-flex;\n  align-items: center;\n  font-weight: 600;\n  border-radius: 6px;\n  cursor: pointer;\n  border: 1px solid transparent;\n}\n.btn--sm {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn--lg {\n  padding: 12px 24px;\n  font-size: 16px;\n}\n.btn--primary {\n  background: #f43f5e;\n  color: #ffffff;\n}\n.btn--outline {\n  background: transparent;\n  border-color: #38bdf8;\n  color: #38bdf8;\n}",
    "htmlContext": "<div class=\"variant-preview\">\n  <button class=\"btn btn--sm btn--outline\">Small Outline</button>\n  <button class=\"btn btn--lg btn--primary\">Large Primary</button>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
