/**
 * CodeReflex - CSS Level 14 Challenge
 * Topic: Login Form Styling
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l014-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 14,
    "language": "css",
    "title": "Login Form Styling",
    "difficulty": "beginner",
    "description": "Style a clean, accessible login form card with vertical field stacking and focus-ring highlights.",
    "concepts": [
      "form layout",
      "input styling",
      "labels",
      "focus-visible",
      "submit button"
    ],
    "expectedVisualResult": "A structured dark login card with clearly labeled inputs that glow cyan on focus.",
    "validationCriteria": "Defines input padding, border, focus-visible outline, and submit button width.",
    "completionCondition": "Type the login form styling CSS.",
    "code": ".login-card {\n  max-width: 320px;\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 10px;\n  padding: 24px;\n}\n.form-title {\n  margin: 0 0 16px 0;\n  color: #f9fafb;\n  font-size: 18px;\n}\n.form-label {\n  display: block;\n  font-size: 12px;\n  color: #9ca3af;\n  margin-bottom: 6px;\n}\n.form-input {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 10px 12px;\n  background: #1f2937;\n  border: 1px solid #374151;\n  border-radius: 6px;\n  color: #f9fafb;\n  margin-bottom: 16px;\n}\n.form-input:focus {\n  outline: 2px solid #38bdf8;\n  border-color: transparent;\n}\n.form-submit {\n  width: 100%;\n  padding: 10px;\n  background: #3b82f6;\n  border: none;\n  border-radius: 6px;\n  color: #ffffff;\n  font-weight: 600;\n  cursor: pointer;\n}",
    "htmlContext": "<form class=\"login-card\">\n  <h2 class=\"form-title\">Account Login</h2>\n  <label class=\"form-label\" for=\"login-email\">Email Address</label>\n  <input type=\"email\" id=\"login-email\" class=\"form-input\" placeholder=\"you@domain.com\">\n  <button type=\"submit\" class=\"form-submit\">Continue</button>\n</form>",
    "previewType": "css",
    "status": "ready"
  }
];
