/**
 * CodeReflex - CSS Level 44 Challenge
 * Topic: Toast Notification Design
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l044-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 44,
    "language": "css",
    "title": "Toast Notification Design",
    "difficulty": "intermediate",
    "description": "Design a floating toast notification card positioned fixed in the bottom-right corner with status indicator dot.",
    "concepts": [
      "toast notification",
      "fixed bottom-right",
      "icon + message + dismiss",
      "slide-in animation"
    ],
    "expectedVisualResult": "A sleek toast card anchored fixed at bottom right with glowing green dot and close button.",
    "validationCriteria": "Uses position: fixed with bottom and right offsets and subtle drop shadow.",
    "completionCondition": "Type the toast notification CSS.",
    "code": ".toast-card {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 8px;\n  padding: 12px 18px;\n  color: #f3f4f6;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);\n}\n.status-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #10b981;\n}",
    "htmlContext": "<div class=\"toast-card\">\n  <span class=\"status-dot\"></span>\n  <span class=\"toast-msg\">Progress synced to cloud.</span>\n  <button class=\"btn-close\">×</button>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
