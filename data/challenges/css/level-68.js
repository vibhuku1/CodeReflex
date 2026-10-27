/**
 * CodeReflex - CSS Level 68 Challenge
 * Topic: Motion Design System
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l068-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 68,
    "language": "css",
    "title": "Motion Design System",
    "difficulty": "advanced",
    "description": "Define motion design tokens (--ease-out-back, --dur-fast) and apply them across button interactions.",
    "concepts": [
      "standard durations",
      "easing curves",
      "micro-interactions",
      "motion tokens"
    ],
    "expectedVisualResult": "A button that springs up with an energetic bounce easing on hover.",
    "validationCriteria": "Uses custom cubic-bezier spring curve on button transform.",
    "completionCondition": "Type the motion design system CSS.",
    "code": ".spring-btn {\n  background: #f43f5e;\n  color: #ffffff;\n  border: none;\n  border-radius: 8px;\n  padding: 10px 20px;\n  cursor: pointer;\n  transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.spring-btn:hover {\n  transform: translateY(-3px) scale(1.03);\n}",
    "htmlContext": "<button class=\"spring-btn\">Spring Interactive</button>",
    "previewType": "css",
    "status": "ready"
  }
];
