/**
 * CodeReflex - CSS Level 78 Challenge
 * Topic: SaaS Settings Interface
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l078-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 78,
    "language": "css",
    "title": "SaaS Settings Interface",
    "difficulty": "expert",
    "description": "Design a SaaS settings page with left category tabs, form switches, and a distinct crimson Danger Zone container.",
    "concepts": [
      "vertical tabs",
      "settings section",
      "toggle switches",
      "danger zone card"
    ],
    "expectedVisualResult": "A settings page with left tabs, toggle switches, and red bordered danger zone box at bottom.",
    "validationCriteria": "Styles .danger-zone with red border and flex tab layout.",
    "completionCondition": "Type the SaaS settings interface CSS.",
    "code": ".settings-shell {\n  background: #111827;\n  border-radius: 8px;\n  padding: 24px;\n  color: #f9fafb;\n  max-width: 500px;\n}\n.danger-zone {\n  margin-top: 28px;\n  border: 1px solid #ef4444;\n  border-radius: 8px;\n  padding: 16px;\n  background: rgba(239, 68, 68, 0.05);\n}\n.btn-danger {\n  background: #ef4444;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  padding: 8px 16px;\n  cursor: pointer;\n}",
    "htmlContext": "<div class=\"settings-shell\">\n  <div class=\"settings-content\">\n    <h3>Account Preferences</h3>\n    <div class=\"danger-zone\">\n      <h4>Delete Account</h4>\n      <button class=\"btn-danger\">Delete</button>\n    </div>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
