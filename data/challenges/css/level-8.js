/**
 * CodeReflex - CSS Level 8 Challenge
 * Topic: Modern Button Design
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l008-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 8,
    "language": "css",
    "title": "Modern Button Design",
    "difficulty": "beginner",
    "description": "Design a high-converting primary CTA button with hover elevation, active press-down, and smooth transitions.",
    "concepts": [
      "buttons",
      "hover states",
      "active states",
      "transitions",
      "focus outlines"
    ],
    "expectedVisualResult": "A crimson primary button with crisp typography, smooth hover brightness transition, and active click state.",
    "validationCriteria": "Defines button geometry, color, cursor pointer, and hover/active pseudo-class rules.",
    "completionCondition": "Type the primary button design CSS.",
    "code": ".btn-primary {\n  background: #f43f5e;\n  color: #ffffff;\n  border: none;\n  border-radius: 8px;\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background-color 0.15s ease, transform 0.1s ease;\n}\n.btn-primary:hover {\n  background: #e11d48;\n}\n.btn-primary:active {\n  transform: translateY(1px);\n}",
    "htmlContext": "<div class=\"button-group\">\n  <button type=\"button\" class=\"btn-primary\">Deploy to Production</button>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
