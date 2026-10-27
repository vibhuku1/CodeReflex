/**
 * CodeReflex - CSS Level 88 Challenge
 * Topic: Notification Center Interface
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l088-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 88,
    "language": "css",
    "title": "Notification Center Interface",
    "difficulty": "expert",
    "description": "Style an in-app notification center popover displaying unread items with glowing indicator dots.",
    "concepts": [
      "unread notification dot",
      "grouped notifications",
      "action links",
      "clear all button"
    ],
    "expectedVisualResult": "A notification dropdown panel with unread items marked with cyan dots and timestamp details.",
    "validationCriteria": "Styles unread notification state with background tint and unread dot.",
    "completionCondition": "Type the notification center CSS.",
    "code": ".notif-center {\n  background: #161e2e;\n  border: 1px solid #233044;\n  border-radius: 8px;\n  max-width: 320px;\n  overflow: hidden;\n  color: #f8fafc;\n}\n.notif-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-bottom: 1px solid #233044;\n}\n.notif-item.unread {\n  background: rgba(56, 189, 248, 0.06);\n}\n.unread-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #38bdf8;\n}",
    "htmlContext": "<div class=\"notif-center\">\n  <div class=\"notif-item unread\">\n    <span class=\"unread-dot\"></span>\n    <div class=\"notif-body\">Challenge 88 unlocked!</div>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
