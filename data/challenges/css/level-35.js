/**
 * CodeReflex - CSS Level 35 Challenge
 * Topic: Form Validation States
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l035-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 35,
    "language": "css",
    "title": "Form Validation States",
    "difficulty": "intermediate",
    "description": "Implement explicit success and error validation states for form inputs with colored borders and hint text.",
    "concepts": [
      ":valid",
      ":invalid",
      "is-error class",
      "helper error message",
      "input icons"
    ],
    "expectedVisualResult": "An input marked invalid with crimson border and error message, next to a valid green-bordered input.",
    "validationCriteria": "Styles .input-error with #f43f5e border and .input-success with #10b981 border.",
    "completionCondition": "Type the form validation states CSS.",
    "code": ".input-error {\n  border: 1px solid #f43f5e;\n  background: rgba(244, 63, 94, 0.05);\n  color: #fca5a5;\n  border-radius: 6px;\n  padding: 8px 12px;\n}\n.field-error-msg {\n  display: block;\n  font-size: 12px;\n  color: #f43f5e;\n  margin-top: 4px;\n}",
    "htmlContext": "<div class=\"form-field has-error\">\n  <input type=\"text\" class=\"field-input input-error\" value=\"invalid-email\">\n  <span class=\"field-error-msg\">Please enter a valid email address.</span>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
