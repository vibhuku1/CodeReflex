/**
 * CodeReflex - CSS Level 40 Challenge
 * Topic: Chart Panel Styling
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l040-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 40,
    "language": "css",
    "title": "Chart Panel Styling",
    "difficulty": "intermediate",
    "description": "Style a weekly progress bar chart panel with custom vertical bars, active day highlight, and floating tooltip.",
    "concepts": [
      "chart container",
      "bar chart styling",
      "tooltip box",
      "axis labels"
    ],
    "expectedVisualResult": "A series of vertical bars of varying heights with the active bar glowing crimson with tooltip above.",
    "validationCriteria": "Uses flexbox column-reverse or align-items: flex-end for chart bars with active class.",
    "completionCondition": "Type the chart panel styling CSS.",
    "code": ".chart-panel {\n  background: #111827;\n  padding: 20px;\n  border-radius: 8px;\n}\n.bar-chart {\n  display: flex;\n  align-items: flex-end;\n  gap: 12px;\n  height: 120px;\n}\n.bar {\n  flex: 1;\n  background: #374151;\n  border-radius: 4px 4px 0 0;\n}\n.bar.active {\n  background: #f43f5e;\n  box-shadow: 0 0 12px rgba(244, 63, 94, 0.4);\n}",
    "htmlContext": "<div class=\"chart-panel\">\n  <div class=\"bar-chart\">\n    <div class=\"bar\" style=\"height: 40%;\"></div>\n    <div class=\"bar active\" style=\"height: 85%;\"></div>\n    <div class=\"bar\" style=\"height: 60%;\"></div>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
