/**
 * CodeReflex - CSS Level 42 Challenge
 * Topic: Dropdown Menu Interface
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l042-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 42,
    "language": "css",
    "title": "Dropdown Menu Interface",
    "difficulty": "intermediate",
    "description": "Style a floating dropdown action menu attached below a trigger button with menu item icons and separators.",
    "concepts": [
      "dropdown menu",
      "absolute positioning",
      "hover/focus trigger",
      "menu divider"
    ],
    "expectedVisualResult": "A floating menu panel appearing directly beneath its trigger with clean item hover highlights.",
    "validationCriteria": "Positions dropdown menu absolutely with z-index and box-shadow.",
    "completionCondition": "Type the dropdown menu CSS.",
    "code": ".dropdown-wrap {\n  position: relative;\n  display: inline-block;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background: #18202c;\n  border: 1px solid #283344;\n  border-radius: 6px;\n  min-width: 140px;\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);\n  z-index: 10;\n  margin-top: 4px;\n}\n.drop-item {\n  display: block;\n  padding: 8px 14px;\n  color: #e2e8f0;\n  text-decoration: none;\n  font-size: 13px;\n}\n.drop-item:hover {\n  background: #253347;\n}",
    "htmlContext": "<div class=\"dropdown-wrap\">\n  <button class=\"btn-drop\">Options ▼</button>\n  <div class=\"dropdown-menu\">\n    <a href=\"#\" class=\"drop-item\">Edit Profile</a>\n    <a href=\"#\" class=\"drop-item\">Settings</a>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
