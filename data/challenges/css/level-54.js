/**
 * CodeReflex - CSS Level 54 Challenge
 * Topic: Accessible Focus Indicators
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l054-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 54,
    "language": "css",
    "title": "Accessible Focus Indicators",
    "difficulty": "advanced",
    "description": "Design accessible, high-contrast focus rings using :focus-visible and outline-offset for WCAG compliance.",
    "concepts": [
      ":focus-visible",
      "focus-ring offset",
      "WCAG contrast",
      "outline-offset"
    ],
    "expectedVisualResult": "A button displaying a 2px offset neon focus ring only when navigated with keyboard tab.",
    "validationCriteria": "Uses :focus-visible with outline and outline-offset: 2px.",
    "completionCondition": "Type the accessible focus indicator CSS.",
    "code": ".btn-accessible {\n  background: #3b82f6;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  padding: 10px 18px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-accessible:focus-visible {\n  outline: 2px solid #38bdf8;\n  outline-offset: 3px;\n}",
    "htmlContext": "<button class=\"btn-accessible\" type=\"button\">Accessible Button</button>",
    "previewType": "css",
    "status": "ready"
  }
];
