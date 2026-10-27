/**
 * CodeReflex - CSS Level 75 Challenge
 * Topic: Project Management Board UI
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l075-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 75,
    "language": "css",
    "title": "Project Management Board UI",
    "difficulty": "advanced",
    "description": "Style a project management Kanban board with horizontal scrolling columns and task card items.",
    "concepts": [
      "kanban columns",
      "drag card surface",
      "horizontal scrolling",
      "column badges"
    ],
    "expectedVisualResult": "A 3-column Kanban board with \"To Do\", \"In Progress\", and \"Done\" swimlanes.",
    "validationCriteria": "Sets display: flex with horizontal overflow-x: auto and column cards.",
    "completionCondition": "Type the Kanban board CSS.",
    "code": ".kanban-board {\n  display: flex;\n  gap: 16px;\n  overflow-x: auto;\n  padding: 12px;\n  background: #0f172a;\n}\n.kanban-col {\n  flex: 0 0 240px;\n  background: #1e293b;\n  border-radius: 8px;\n  padding: 14px;\n  color: #f1f5f9;\n}\n.task-card {\n  background: #0f172a;\n  border: 1px solid #334155;\n  border-radius: 6px;\n  padding: 10px;\n  margin-top: 8px;\n}",
    "htmlContext": "<div class=\"kanban-board\">\n  <div class=\"kanban-col\">\n    <div class=\"col-head\">To Do (3)</div>\n    <div class=\"task-card\">Build Level 75</div>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
