/**
 * CodeReflex - CSS Level 20 Challenge
 * Topic: Smooth CSS Transitions
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l020-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 20,
    "language": "css",
    "title": "Smooth CSS Transitions",
    "difficulty": "beginner",
    "description": "Configure high-performance CSS transitions targeting specific properties (opacity and transform) with cubic-bezier easing.",
    "concepts": [
      "transition-property",
      "transition-duration",
      "cubic-bezier",
      "will-change"
    ],
    "expectedVisualResult": "A notification banner that fades in and slides into view smoothly without jank.",
    "validationCriteria": "Uses transition with specific property declarations and cubic-bezier timing function.",
    "completionCondition": "Type the smooth transition CSS.",
    "code": ".toast-banner {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 18px;\n  background: #064e3b;\n  border: 1px solid #059669;\n  border-radius: 8px;\n  color: #ecfdf5;\n  opacity: 0;\n  transform: translateY(8px);\n  transition: opacity 250ms cubic-bezier(0.16, 1, 0.3, 1), transform 250ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n.toast-banner.is-visible {\n  opacity: 1;\n  transform: translateY(0);\n}",
    "htmlContext": "<div class=\"toast-banner is-visible\">\n  <span class=\"toast-icon\">✓</span>\n  <span class=\"toast-msg\">Settings saved successfully</span>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
