/**
 * CodeReflex - CSS Level 74 Challenge
 * Topic: Complex Analytics Dashboard
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l074-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 74,
    "language": "css",
    "title": "Complex Analytics Dashboard",
    "difficulty": "advanced",
    "description": "Assemble a multi-widget dashboard interface with top stats row and dual chart/activity panes below.",
    "concepts": [
      "4-part layout",
      "KPI grid",
      "chart container",
      "activity feed"
    ],
    "expectedVisualResult": "A coordinated dashboard UI featuring KPI cards above and split analytics panels below.",
    "validationCriteria": "Uses CSS Grid to lay out multiple coordinated widget containers.",
    "completionCondition": "Type the analytics dashboard CSS.",
    "code": ".analytics-shell {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  background: #0b0f17;\n  padding: 20px;\n  color: #f8fafc;\n}\n.chart-split {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 16px;\n}",
    "htmlContext": "<div class=\"analytics-shell\">\n  <div class=\"kpi-strip\">3 KPI Cards</div>\n  <div class=\"chart-split\">\n    <div class=\"main-chart\">Chart</div>\n    <div class=\"side-feed\">Feed</div>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
