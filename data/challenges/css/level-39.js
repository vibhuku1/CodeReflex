/**
 * CodeReflex - CSS Level 39 Challenge
 * Topic: Analytics Statistics Cards
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l039-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 39,
    "language": "css",
    "title": "Analytics Statistics Cards",
    "difficulty": "intermediate",
    "description": "Design analytics KPI summary cards displaying large numeric values with green upward or red downward trend pills.",
    "concepts": [
      "stat metric",
      "percentage trend indicator",
      "trend up/down colors",
      "metric grid"
    ],
    "expectedVisualResult": "A stat card showing 72 WPM with a green +12% pill and subtitle label.",
    "validationCriteria": "Styles large metric typography and positive trend pill with emerald background.",
    "completionCondition": "Type the analytics stat cards CSS.",
    "code": ".stat-kpi-card {\n  background: #1e293b;\n  border: 1px solid #334155;\n  border-radius: 10px;\n  padding: 20px;\n  color: #f8fafc;\n  max-width: 240px;\n}\n.kpi-label {\n  font-size: 12px;\n  color: #94a3b8;\n  text-transform: uppercase;\n}\n.kpi-row {\n  display: flex;\n  align-items: baseline;\n  gap: 12px;\n  margin-top: 8px;\n}\n.kpi-val {\n  font-size: 26px;\n  font-weight: 800;\n}\n.trend-up {\n  color: #34d399;\n  font-size: 12px;\n  font-weight: 600;\n}",
    "htmlContext": "<div class=\"stat-kpi-card\">\n  <span class=\"kpi-label\">Average Speed</span>\n  <div class=\"kpi-row\">\n    <span class=\"kpi-val\">72 WPM</span>\n    <span class=\"kpi-trend trend-up\">↑ +12%</span>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
