/**
 * CodeReflex - CSS Level 83 Challenge
 * Topic: Responsive Portfolio Website
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l083-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 83,
    "language": "css",
    "title": "Responsive Portfolio Website",
    "difficulty": "expert",
    "description": "Design a developer portfolio project card featuring project screenshot, technology pills, and link to case study.",
    "concepts": [
      "case study cards",
      "project tags",
      "live demo link",
      "interactive thumbnail"
    ],
    "expectedVisualResult": "A developer case study card with title, tech stack tags, and hover arrow transition.",
    "validationCriteria": "Styles project card with tech pills and hover transition effect.",
    "completionCondition": "Type the responsive portfolio CSS.",
    "code": ".portfolio-card {\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 10px;\n  padding: 22px;\n  color: #f9fafb;\n  max-width: 360px;\n}\n.tech-pills {\n  display: flex;\n  gap: 8px;\n  margin-top: 14px;\n}\n.tech-pills span {\n  background: #1f2937;\n  border: 1px solid #374151;\n  padding: 3px 8px;\n  border-radius: 4px;\n  font-size: 11px;\n  color: #38bdf8;\n}",
    "htmlContext": "<div class=\"portfolio-card\">\n  <h3>CodeReflex Platform</h3>\n  <p>Real-time typing speed and accuracy engine.</p>\n  <div class=\"tech-pills\"><span>CSS3</span><span>JS ES6</span></div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
