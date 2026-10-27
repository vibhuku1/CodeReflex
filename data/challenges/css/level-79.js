/**
 * CodeReflex - CSS Level 79 Challenge
 * Topic: Multi-Step Form Experience
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l079-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 79,
    "language": "css",
    "title": "Multi-Step Form Experience",
    "difficulty": "expert",
    "description": "Style a 3-step wizard checkout indicator with circular step numbers and connecting lines showing completion progress.",
    "concepts": [
      "wizard stepper",
      "step indicators",
      "active connecting line",
      "step state"
    ],
    "expectedVisualResult": "A 3-step numbered progress bar with step 1 completed, step 2 active, and step 3 upcoming.",
    "validationCriteria": "Uses flexbox with connecting pseudo-element line or border between circular steps.",
    "completionCondition": "Type the multi-step form stepper CSS.",
    "code": ".stepper-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  max-width: 280px;\n  margin: 0 auto 24px;\n}\n.step {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: #1f2937;\n  color: #9ca3af;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 13px;\n}\n.step.active {\n  background: #3b82f6;\n  color: #ffffff;\n}\n.step.complete {\n  background: #10b981;\n  color: #ffffff;\n}",
    "htmlContext": "<div class=\"stepper-bar\">\n  <div class=\"step complete\">✓</div>\n  <div class=\"step active\">2</div>\n  <div class=\"step\">3</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
