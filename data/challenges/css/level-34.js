/**
 * CodeReflex - CSS Level 34 Challenge
 * Topic: Signup Page Design
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l034-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 34,
    "language": "css",
    "title": "Signup Page Design",
    "difficulty": "intermediate",
    "description": "Style a modern registration card with social OAuth button row, \"or with email\" divider line, and credential inputs.",
    "concepts": [
      "card shadow",
      "social auth buttons",
      "divider with text",
      "form terms"
    ],
    "expectedVisualResult": "A clean signup card featuring Google/GitHub buttons and horizontal divider line with text.",
    "validationCriteria": "Includes social button layout and pseudo-element or border divider.",
    "completionCondition": "Type the signup page design CSS.",
    "code": ".signup-card {\n  max-width: 320px;\n  background: #111827;\n  padding: 24px;\n  border-radius: 10px;\n  color: #f9fafb;\n}\n.btn-oauth {\n  width: 100%;\n  padding: 10px;\n  background: #1f2937;\n  border: 1px solid #374151;\n  color: #f9fafb;\n  border-radius: 6px;\n  font-weight: 500;\n}\n.auth-divider {\n  text-align: center;\n  margin: 16px 0;\n  border-bottom: 1px solid #374151;\n  line-height: 0.1em;\n}\n.auth-divider span {\n  background: #111827;\n  padding: 0 8px;\n  font-size: 11px;\n  color: #9ca3af;\n}",
    "htmlContext": "<div class=\"signup-card\">\n  <h2>Create Account</h2>\n  <button class=\"btn-oauth\">Continue with Google</button>\n  <div class=\"auth-divider\"><span>OR</span></div>\n  <input type=\"email\" class=\"signup-input\" placeholder=\"Work email\">\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
