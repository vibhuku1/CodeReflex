/**
 * CodeReflex - CSS Level 60 Challenge
 * Topic: Stacking Context and Layer Management
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l060-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 60,
    "language": "css",
    "title": "Stacking Context and Layer Management",
    "difficulty": "advanced",
    "description": "Isolate component z-index stacking context using isolation: isolate to prevent modal/overlay leaks.",
    "concepts": [
      "z-index",
      "isolation: isolate",
      "stacking context",
      "overlay conflicts"
    ],
    "expectedVisualResult": "A component with isolated stacking context so internal z-indices never conflict with global page elements.",
    "validationCriteria": "Applies isolation: isolate on component root container.",
    "completionCondition": "Type the stacking context isolation CSS.",
    "code": ".isolated-component {\n  position: relative;\n  isolation: isolate;\n  background: #111827;\n  padding: 20px;\n  border-radius: 8px;\n  color: #f9fafb;\n}\n.badge-layer {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  z-index: 5;\n}",
    "htmlContext": "<div class=\"isolated-component\">\n  <div class=\"badge-layer\">Z-Index 10</div>\n  <div class=\"content-layer\">Isolated Root</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
