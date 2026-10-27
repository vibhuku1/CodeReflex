/**
 * CodeReflex - CSS Level 65 Challenge
 * Topic: Decorative CSS Shapes
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l065-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 65,
    "language": "css",
    "title": "Decorative CSS Shapes",
    "difficulty": "advanced",
    "description": "Create a pure CSS pulsing indicator dot with an animated outer halo ring using box-shadow and border-radius.",
    "concepts": [
      "border triangles",
      "diamonds",
      "custom shape geometries",
      "pure CSS icons"
    ],
    "expectedVisualResult": "A glowing green radar ping indicator with animated halo ring.",
    "validationCriteria": "Uses circular geometry and animated box-shadow ring.",
    "completionCondition": "Type the decorative pulse shape CSS.",
    "code": ".radar-ping {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  color: #34d399;\n  font-size: 13px;\n  font-weight: 600;\n}\n.ping-dot {\n  width: 10px;\n  height: 10px;\n  background: #10b981;\n  border-radius: 50%;\n  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.25);\n}",
    "htmlContext": "<div class=\"radar-ping\"><span class=\"ping-dot\"></span> Online</div>",
    "previewType": "css",
    "status": "ready"
  }
];
