/**
 * CodeReflex - CSS Level 90 Challenge
 * Topic: Responsive Learning Platform UI
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l090-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 90,
    "language": "css",
    "title": "Responsive Learning Platform UI",
    "difficulty": "expert",
    "description": "Style a learning curriculum accordion item with circular completion checkmarks and disabled locked states.",
    "concepts": [
      "course curriculum list",
      "level progress ring",
      "lesson locked state"
    ],
    "expectedVisualResult": "A lesson list item with green checkmark for completed and grey padlock icon for locked.",
    "validationCriteria": "Styles .lesson-item with opacity reduction on .is-locked items.",
    "completionCondition": "Type the learning platform lesson CSS.",
    "code": ".curriculum-list {\n  background: #0f172a;\n  border-radius: 8px;\n  padding: 12px;\n  max-width: 340px;\n}\n.lesson-item {\n  padding: 10px 14px;\n  border-radius: 6px;\n  color: #f1f5f9;\n  margin-bottom: 6px;\n  font-size: 13px;\n}\n.lesson-item.is-done {\n  color: #34d399;\n  background: rgba(16, 185, 129, 0.08);\n}\n.lesson-item.is-locked {\n  color: #64748b;\n  opacity: 0.6;\n}",
    "htmlContext": "<div class=\"curriculum-list\">\n  <div class=\"lesson-item is-done\">✓ 01. Box Model</div>\n  <div class=\"lesson-item is-locked\">🔒 02. Flexbox Grid</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
