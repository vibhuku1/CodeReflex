/**
 * CodeReflex - CSS Level 76 Challenge
 * Topic: Advanced Responsive Dashboard
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l076-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 76,
    "language": "css",
    "title": "Advanced Responsive Dashboard",
    "difficulty": "expert",
    "description": "Architect a responsive enterprise dashboard that adapts from multi-column grid to compact single-column flow on mobile.",
    "concepts": [
      "responsive dashboard",
      "collapsible sidebar",
      "widget grid",
      "viewport adaptation"
    ],
    "expectedVisualResult": "A dashboard with 3 distinct widget areas that reflows gracefully across screen sizes.",
    "validationCriteria": "Uses CSS grid with media query breakpoints for responsive layout flow.",
    "completionCondition": "Type the advanced responsive dashboard CSS.",
    "code": ".expert-dash {\n  display: grid;\n  grid-template-columns: 2.5fr 1fr;\n  gap: 20px;\n  background: #0b0f17;\n  padding: 20px;\n  color: #f8fafc;\n}\n.dash-widget {\n  background: #161e2e;\n  border: 1px solid #233044;\n  border-radius: 10px;\n  padding: 20px;\n}\n@media (max-width: 768px) {\n  .expert-dash {\n    grid-template-columns: 1fr;\n  }\n}",
    "htmlContext": "<div class=\"expert-dash\">\n  <div class=\"dash-widget widget-main\">Main Metrics</div>\n  <div class=\"dash-widget widget-side\">Quick Actions</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
