/**
 * CodeReflex - CSS Level 86 Challenge
 * Topic: Complex Data Table Interface
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l086-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 86,
    "language": "css",
    "title": "Complex Data Table Interface",
    "difficulty": "expert",
    "description": "Build an advanced admin data table with sticky column headers and right-aligned action buttons.",
    "concepts": [
      "sticky table headers",
      "custom checkboxes",
      "status indicators",
      "row actions"
    ],
    "expectedVisualResult": "A table with sticky header row that stays visible during vertical scroll.",
    "validationCriteria": "Uses position: sticky on th elements with top: 0 and z-index.",
    "completionCondition": "Type the advanced data table CSS.",
    "code": ".sticky-table-box {\n  max-height: 180px;\n  overflow-y: auto;\n  border: 1px solid #1e293b;\n  border-radius: 6px;\n}\n.adv-table {\n  width: 100%;\n  border-collapse: collapse;\n  color: #f8fafc;\n}\n.adv-table th {\n  position: sticky;\n  top: 0;\n  background: #0f172a;\n  padding: 10px 14px;\n  text-align: left;\n  border-bottom: 2px solid #334155;\n  z-index: 2;\n}\n.adv-table td {\n  padding: 10px 14px;\n  border-bottom: 1px solid #1e293b;\n}",
    "htmlContext": "<div class=\"sticky-table-box\">\n  <table class=\"adv-table\">\n    <thead><tr><th>Resource</th><th>Status</th></tr></thead>\n    <tbody><tr><td>Cluster-Alpha</td><td>Online</td></tr></tbody>\n  </table>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
