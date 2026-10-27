/**
 * CodeReflex - CSS Level 89 Challenge
 * Topic: Team Collaboration Dashboard
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l089-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 89,
    "language": "css",
    "title": "Team Collaboration Dashboard",
    "difficulty": "expert",
    "description": "Format a team collaboration presence card featuring overlapping stacked user avatars with green online indicator rings.",
    "concepts": [
      "stacked avatar group",
      "online status badges",
      "activity feed",
      "team role labels"
    ],
    "expectedVisualResult": "An avatar stack where circular profile images overlap with -8px margins and border rings.",
    "validationCriteria": "Uses negative margin-left on stacked avatars with 2px border separation.",
    "completionCondition": "Type the team avatar stack CSS.",
    "code": ".team-presence {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #111827;\n  padding: 12px 18px;\n  border-radius: 8px;\n  color: #f3f4f6;\n}\n.avatar-stack {\n  display: flex;\n}\n.av {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: #3b82f6;\n  border: 2px solid #111827;\n  margin-left: -8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 11px;\n  font-weight: 700;\n}\n.av:first-child {\n  margin-left: 0;\n}",
    "htmlContext": "<div class=\"team-presence\">\n  <div class=\"avatar-stack\">\n    <div class=\"av\">A</div>\n    <div class=\"av\">B</div>\n    <div class=\"av\">C</div>\n  </div>\n  <span class=\"team-count\">+4 online</span>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
