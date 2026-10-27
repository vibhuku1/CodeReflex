/**
 * CodeReflex - CSS Level 27 Challenge
 * Topic: Nested CSS Grid Dashboard
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l027-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 27,
    "language": "css",
    "title": "Nested CSS Grid Dashboard",
    "difficulty": "intermediate",
    "description": "Create an analytics dashboard grid containing a nested subgrid for 2 key metric cards within the main content cell.",
    "concepts": [
      "nested grid",
      "grid-template-areas",
      "sidebar content layout"
    ],
    "expectedVisualResult": "A 2-column dashboard layout with sidebar and main area containing a nested 2-column metric card grid.",
    "validationCriteria": "Declares grid-template-columns with a nested grid container.",
    "completionCondition": "Type the nested CSS grid CSS.",
    "code": ".dash-grid-shell {\n  display: grid;\n  grid-template-columns: 80px 1fr;\n  gap: 16px;\n  background: #0f172a;\n  padding: 16px;\n  border-radius: 8px;\n  color: #f8fafc;\n}\n.subgrid-metrics {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.metric-box {\n  background: #1e293b;\n  padding: 16px;\n  border-radius: 6px;\n  text-align: center;\n}",
    "htmlContext": "<div class=\"dash-grid-shell\">\n  <aside class=\"dash-sidebar\">Nav</aside>\n  <main class=\"dash-main-area\">\n    <div class=\"subgrid-metrics\">\n      <div class=\"metric-box\">WPM: 85</div>\n      <div class=\"metric-box\">Acc: 98%</div>\n    </div>\n  </main>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
