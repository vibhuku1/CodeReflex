/**
 * CodeReflex - CSS Level 41 Challenge
 * Topic: Modal Dialog Design
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l041-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 41,
    "language": "css",
    "title": "Modal Dialog Design",
    "difficulty": "intermediate",
    "description": "Style an accessible modal dialog centered on screen with dark semi-transparent backdrop and rounded content card.",
    "concepts": [
      "modal backdrop",
      "dialog box",
      "fixed positioning",
      "modal header actions"
    ],
    "expectedVisualResult": "A centered modal card over a backdrop overlay with title, body, and action button footer.",
    "validationCriteria": "Uses position: fixed with inset: 0, backdrop blur, and centered card.",
    "completionCondition": "Type the modal dialog CSS.",
    "code": ".modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-card {\n  background: #1e293b;\n  border: 1px solid #334155;\n  border-radius: 12px;\n  padding: 24px;\n  max-width: 380px;\n  color: #f1f5f9;\n}\n.modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n}",
    "htmlContext": "<div class=\"modal-backdrop\">\n  <div class=\"modal-card\">\n    <h3>Confirm Action</h3>\n    <p>Are you sure you want to proceed?</p>\n    <div class=\"modal-actions\">\n      <button class=\"btn-cancel\">Cancel</button>\n      <button class=\"btn-confirm\">Confirm</button>\n    </div>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
