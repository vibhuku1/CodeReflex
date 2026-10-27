/**
 * CodeReflex - CSS Level 62 Challenge
 * Topic: Pseudo-Elements for Decorations
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l062-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 62,
    "language": "css",
    "title": "Pseudo-Elements for Decorations",
    "difficulty": "advanced",
    "description": "Construct a corner ribbon banner over a card using ::after pseudo-element with pure CSS geometric borders.",
    "concepts": [
      "::before",
      "::after",
      "content: \"\"",
      "decorative ribbons",
      "geometric badges"
    ],
    "expectedVisualResult": "A card featuring a decorative corner accent triangle created purely via pseudo-elements.",
    "validationCriteria": "Declares ::after with content: \"\", absolute positioning, and borders.",
    "completionCondition": "Type the pseudo-element decoration CSS.",
    "code": ".ribbon-card {\n  position: relative;\n  background: #161d2a;\n  border-radius: 8px;\n  padding: 24px;\n  color: #f8fafc;\n}\n.ribbon-card::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  right: 0;\n  border-width: 0 32px 32px 0;\n  border-style: solid;\n  border-color: transparent #f43f5e transparent transparent;\n}",
    "htmlContext": "<div class=\"ribbon-card\">Featured Pro Level</div>",
    "previewType": "css",
    "status": "ready"
  }
];
