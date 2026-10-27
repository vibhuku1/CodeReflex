/**
 * CodeReflex - CSS Level 38 Challenge
 * Topic: Sidebar Navigation System
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l038-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 38,
    "language": "css",
    "title": "Sidebar Navigation System",
    "difficulty": "intermediate",
    "description": "Style a vertical admin sidebar menu featuring category section titles, active left-indicator bar, and badge count pills.",
    "concepts": [
      "vertical menu",
      "active indicator bar",
      "menu section labels",
      "icon alignment"
    ],
    "expectedVisualResult": "A vertical menu list where active items display a cyan accent border on their left edge.",
    "validationCriteria": "Uses border-left highlight on active menu items with background tint.",
    "completionCondition": "Type the sidebar navigation menu CSS.",
    "code": ".sidebar-menu {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.menu-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px;\n  color: #94a3b8;\n  border-left: 3px solid transparent;\n  cursor: pointer;\n}\n.menu-item.active {\n  color: #38bdf8;\n  background: rgba(56, 189, 248, 0.08);\n  border-left-color: #38bdf8;\n}",
    "htmlContext": "<ul class=\"sidebar-menu\">\n  <li class=\"menu-item active\"><span class=\"menu-icon\">⚡</span> Dashboard</li>\n  <li class=\"menu-item\"><span class=\"menu-icon\">👥</span> Users</li>\n</ul>",
    "previewType": "css",
    "status": "ready"
  }
];
