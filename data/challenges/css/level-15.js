/**
 * CodeReflex - CSS Level 15 Challenge
 * Topic: User Profile Card
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l015-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 15,
    "language": "css",
    "title": "User Profile Card",
    "difficulty": "beginner",
    "description": "Construct a compact user profile card with circular avatar, user name, role tag, and statistics counter row.",
    "concepts": [
      "avatar image",
      "profile bio",
      "social counters",
      "flex-column"
    ],
    "expectedVisualResult": "A centered profile card with round avatar, name, and 3-column stats row at bottom.",
    "validationCriteria": "Uses border-radius: 50% for avatar and flex row for follower statistics.",
    "completionCondition": "Type the user profile card CSS.",
    "code": ".user-card {\n  text-align: center;\n  background: #18202c;\n  border: 1px solid #283344;\n  border-radius: 12px;\n  padding: 24px;\n  max-width: 260px;\n  color: #f1f5f9;\n}\n.user-avatar {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: #f43f5e;\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  margin: 0 auto 12px;\n}\n.user-role {\n  font-size: 12px;\n  color: #38bdf8;\n}\n.user-stats {\n  display: flex;\n  justify-content: space-around;\n  margin-top: 16px;\n  padding-top: 12px;\n  border-top: 1px solid #283344;\n  font-size: 13px;\n}",
    "htmlContext": "<div class=\"user-card\">\n  <div class=\"user-avatar\">VP</div>\n  <h3 class=\"user-name\">Vibhu Sharma</h3>\n  <span class=\"user-role\">Lead Architect</span>\n  <div class=\"user-stats\">\n    <div><strong>124</strong> WPM</div>\n    <div><strong>99%</strong> Acc</div>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
