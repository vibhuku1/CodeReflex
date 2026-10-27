/**
 * CodeReflex - CSS Level 69 Challenge
 * Topic: Scroll-Driven Visual Effects
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l069-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 69,
    "language": "css",
    "title": "Scroll-Driven Visual Effects",
    "difficulty": "advanced",
    "description": "Style a custom sleek scrollbar with custom track background and glowing thumb handle.",
    "concepts": [
      "animation-timeline: scroll()",
      "progress indicators",
      "scrollbar styling"
    ],
    "expectedVisualResult": "A modern thin dark scrollbar with glowing cyan rounded thumb.",
    "validationCriteria": "Customizes ::-webkit-scrollbar with thumb and track styles.",
    "completionCondition": "Type the custom scrollbar CSS.",
    "code": ".scroll-pane::-webkit-scrollbar {\n  width: 6px;\n}\n.scroll-pane::-webkit-scrollbar-track {\n  background: #0f172a;\n}\n.scroll-pane::-webkit-scrollbar-thumb {\n  background: #38bdf8;\n  border-radius: 999px;\n}",
    "htmlContext": "<div class=\"scroll-pane\">Scrollable Content Area</div>",
    "previewType": "css",
    "status": "ready"
  }
];
