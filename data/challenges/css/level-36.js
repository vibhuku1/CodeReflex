/**
 * CodeReflex - CSS Level 36 Challenge
 * Topic: Data Table and Pagination
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l036-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 36,
    "language": "css",
    "title": "Data Table and Pagination",
    "difficulty": "intermediate",
    "description": "Style a responsive data table with striped alternating rows, subtle borders, and numbered pagination buttons at bottom.",
    "concepts": [
      "table styling",
      "striped rows",
      "numeric pagination buttons",
      "hover row highlight"
    ],
    "expectedVisualResult": "A polished dark data table with alternating row tints and pagination pill buttons.",
    "validationCriteria": "Uses nth-child(even) for striped background and flex pagination buttons.",
    "completionCondition": "Type the data table and pagination CSS.",
    "code": ".data-table {\n  width: 100%;\n  border-collapse: collapse;\n  color: #f1f5f9;\n  font-size: 13px;\n}\n.data-table th, .data-table td {\n  padding: 10px 14px;\n  text-align: left;\n  border-bottom: 1px solid #1e293b;\n}\n.data-table tbody tr:nth-child(even) {\n  background: rgba(255, 255, 255, 0.02);\n}\n.data-table tbody tr:hover {\n  background: rgba(56, 189, 248, 0.05);\n}",
    "htmlContext": "<div class=\"table-wrap\">\n  <table class=\"data-table\">\n    <thead><tr><th>ID</th><th>User</th><th>Status</th></tr></thead>\n    <tbody>\n      <tr><td>#1</td><td>Dev A</td><td>Active</td></tr>\n      <tr><td>#2</td><td>Dev B</td><td>Idle</td></tr>\n    </tbody>\n  </table>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
