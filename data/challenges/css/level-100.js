/**
 * CodeReflex - CSS Level 100 Challenge
 * Topic: CSS Capstone: Full Website Design System
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l100-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 100,
    "language": "css",
    "title": "CSS Capstone: Full Website Design System",
    "difficulty": "expert",
    "description": "Synthesize all 100 levels into a master design system card demonstrating tokens, elevation, responsive layout, and typography.",
    "concepts": [
      "complete design system",
      "tokens",
      "primitives",
      "components",
      "responsive layouts"
    ],
    "expectedVisualResult": "A capstone design system component showcasing custom properties, glowing borders, and production-grade typography.",
    "validationCriteria": "Combines CSS variables, layered elevation, responsive layout, and interactive states into a polished capstone UI.",
    "completionCondition": "Type the CSS Capstone Design System CSS.",
    "code": ".capstone-design-system {\n  background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #090d16 100%);\n  border: 2px solid #8b5cf6;\n  border-radius: 16px;\n  padding: 32px;\n  color: #f8fafc;\n  text-align: center;\n  box-shadow: 0 20px 40px -15px rgba(139, 92, 246, 0.3);\n}\n.capstone-badge {\n  display: inline-block;\n  padding: 4px 12px;\n  background: rgba(139, 92, 246, 0.2);\n  border: 1px solid #8b5cf6;\n  border-radius: 9999px;\n  color: #c4b5fd;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n}\n.capstone-title {\n  font-size: 26px;\n  font-weight: 800;\n  margin: 16px 0 8px 0;\n  color: #ffffff;\n}\n.capstone-cta {\n  background: linear-gradient(135deg, #f43f5e, #8b5cf6);\n  color: #ffffff;\n  border: none;\n  border-radius: 8px;\n  padding: 12px 28px;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  margin-top: 16px;\n}",
    "htmlContext": "<div class=\"capstone-design-system\">\n  <div class=\"capstone-badge\">CSS LEVEL 100 • MASTER</div>\n  <h1 class=\"capstone-title\">Full Website Design System</h1>\n  <p class=\"capstone-summary\">Synthesizing 100 levels of real-world CSS mastery into production architecture.</p>\n  <button class=\"capstone-cta\">Complete Mastery</button>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
