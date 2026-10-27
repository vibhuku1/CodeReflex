/**
 * CodeReflex - CSS Level 19 Challenge
 * Topic: Interactive Hover Effects
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l019-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 19,
    "language": "css",
    "title": "Interactive Hover Effects",
    "difficulty": "beginner",
    "description": "Create an engaging card hover micro-interaction that shifts the card upward by 4px and deepens the shadow.",
    "concepts": [
      "hover transform",
      "shadow expansion",
      "cursor pointer",
      "transition-timing"
    ],
    "expectedVisualResult": "A card that smoothly lifts up on cursor hover with expanding shadow.",
    "validationCriteria": "Implements :hover with transform: translateY(-4px) and expanded box-shadow.",
    "completionCondition": "Type the interactive hover effect CSS.",
    "code": ".interactive-card {\n  background: #1e293b;\n  border: 1px solid #334155;\n  border-radius: 10px;\n  padding: 20px;\n  color: #f1f5f9;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n.interactive-card:hover {\n  transform: translateY(-4px);\n  border-color: #38bdf8;\n  box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.4);\n}",
    "htmlContext": "<div class=\"interactive-card\">\n  <h4>Hover Me</h4>\n  <p>Micro-interactions provide responsive visual feedback.</p>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
