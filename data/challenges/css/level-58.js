/**
 * CodeReflex - CSS Level 58 Challenge
 * Topic: Container Queries
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l058-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 58,
    "language": "css",
    "title": "Container Queries",
    "difficulty": "advanced",
    "description": "Implement modern CSS container queries so a card adapts its layout based on parent container width, not viewport.",
    "concepts": [
      "container-type",
      "container-name",
      "@container",
      "component-driven responsiveness"
    ],
    "expectedVisualResult": "A card that switches to horizontal layout when its container exceeds 400px width.",
    "validationCriteria": "Declares container-type: inline-size and uses @container query.",
    "completionCondition": "Type the container query CSS.",
    "code": ".card-container {\n  container-type: inline-size;\n  container-name: card-box;\n}\n.adaptive-widget {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background: #1e293b;\n  padding: 16px;\n  border-radius: 8px;\n  color: #f8fafc;\n}\n@container card-box (min-width: 400px) {\n  .adaptive-widget {\n    flex-direction: row;\n    align-items: center;\n  }\n}",
    "htmlContext": "<div class=\"card-container\">\n  <div class=\"adaptive-widget\">\n    <div class=\"widget-icon\">⚡</div>\n    <div class=\"widget-body\">Metric Widget</div>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
