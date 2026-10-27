/**
 * CodeReflex - CSS Level 26 Challenge
 * Topic: Advanced Flexbox Composition
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l026-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 26,
    "language": "css",
    "title": "Advanced Flexbox Composition",
    "difficulty": "intermediate",
    "description": "Build a multi-part chat message layout using nested flexbox containers with responsive message bubble auto-sizing.",
    "concepts": [
      "flex-grow",
      "flex-shrink",
      "flex-basis",
      "order",
      "nested flexbox"
    ],
    "expectedVisualResult": "A chat interface row with avatar, message bubble expanding to fill remaining width, and timestamp aligned right.",
    "validationCriteria": "Uses flex-grow: 1 on message bubble with flex-shrink: 0 on avatar.",
    "completionCondition": "Type the advanced flexbox composition CSS.",
    "code": ".chat-row {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  background: #111827;\n  padding: 16px;\n  border-radius: 8px;\n  color: #f8fafc;\n}\n.chat-avatar {\n  flex-shrink: 0;\n  width: 36px;\n  height: 36px;\n  background: #3b82f6;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n}\n.chat-bubble {\n  flex-grow: 1;\n  background: #1f2937;\n  padding: 10px 14px;\n  border-radius: 8px;\n}\n.chat-time {\n  font-size: 11px;\n  color: #6b7280;\n}",
    "htmlContext": "<div class=\"chat-row\">\n  <div class=\"chat-avatar\">AI</div>\n  <div class=\"chat-bubble\">\n    <div class=\"chat-author\">System Assistant</div>\n    <div class=\"chat-text\">CSS Level 26 unlocked! Ready for advanced compositions.</div>\n  </div>\n  <span class=\"chat-time\">12:45</span>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
