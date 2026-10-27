/**
 * CodeReflex - CSS Level 32 Challenge
 * Topic: Search Bar and Filter Toolbar
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l032-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 32,
    "language": "css",
    "title": "Search Bar and Filter Toolbar",
    "difficulty": "intermediate",
    "description": "Style a unified search toolbar featuring a search input with integrated search icon and clickable filter pills.",
    "concepts": [
      "input with icon",
      "filter pills",
      "active filter state",
      "inline controls"
    ],
    "expectedVisualResult": "A search input accompanied by active and inactive filter tags in a horizontal toolbar.",
    "validationCriteria": "Flexbox toolbar with styled search input and tag pill states.",
    "completionCondition": "Type the search toolbar CSS.",
    "code": ".search-toolbar {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  background: #111827;\n  padding: 16px;\n  border-radius: 8px;\n}\n.bar-input {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px 12px;\n  background: #1f2937;\n  border: 1px solid #374151;\n  border-radius: 6px;\n  color: #f9fafb;\n}\n.filter-pills {\n  display: flex;\n  gap: 8px;\n}\n.pill {\n  padding: 4px 10px;\n  background: #1f2937;\n  border-radius: 999px;\n  font-size: 12px;\n  color: #9ca3af;\n}\n.pill.active {\n  background: #3b82f6;\n  color: #ffffff;\n}",
    "htmlContext": "<div class=\"search-toolbar\">\n  <input type=\"text\" class=\"bar-input\" placeholder=\"Search challenges...\">\n  <div class=\"filter-pills\">\n    <span class=\"pill active\">All</span>\n    <span class=\"pill\">Flexbox</span>\n    <span class=\"pill\">Grid</span>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
