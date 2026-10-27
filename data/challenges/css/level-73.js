/**
 * CodeReflex - CSS Level 73 Challenge
 * Topic: Reusable Responsive Components
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l073-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 73,
    "language": "css",
    "title": "Reusable Responsive Components",
    "difficulty": "advanced",
    "description": "Style a BEM-structured alert banner component with title, body, and dismiss action modifier classes.",
    "concepts": [
      "BEM naming",
      "component modifiers",
      "reusability",
      "encapsulation"
    ],
    "expectedVisualResult": "A modular alert banner with BEM classes .alert, .alert__title, and modifier .alert--info.",
    "validationCriteria": "Implements BEM class conventions with block, element, and modifier.",
    "completionCondition": "Type the BEM component CSS.",
    "code": ".alert {\n  padding: 16px;\n  border-radius: 8px;\n  background: #1f2937;\n  color: #f3f4f6;\n}\n.alert--info {\n  border-left: 4px solid #38bdf8;\n}\n.alert__title {\n  font-weight: 700;\n  margin-bottom: 4px;\n}\n.alert__text {\n  margin: 0;\n  font-size: 13px;\n  color: #9ca3af;\n}",
    "htmlContext": "<div class=\"alert alert--info\">\n  <div class=\"alert__title\">Notice</div>\n  <p class=\"alert__text\">Level 73 completed successfully.</p>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
