/**
 * CodeReflex - CSS Level 67 Challenge
 * Topic: Keyframe Animation Design
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l067-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 67,
    "language": "css",
    "title": "Keyframe Animation Design",
    "difficulty": "advanced",
    "description": "Author a smooth continuous breathing glow animation using @keyframes that pulsates a component border shadow.",
    "concepts": [
      "@keyframes",
      "animation-duration",
      "animation-iteration-count",
      "infinite pulsing"
    ],
    "expectedVisualResult": "A card whose border smoothly transitions between deep crimson and bright glowing pink.",
    "validationCriteria": "Defines @keyframes glow and applies animation with infinite iteration.",
    "completionCondition": "Type the keyframe animation CSS.",
    "code": "@keyframes pulseGlow {\n  0%, 100% {\n    box-shadow: 0 0 5px rgba(244, 63, 94, 0.3);\n  }\n  50% {\n    box-shadow: 0 0 16px rgba(244, 63, 94, 0.8);\n  }\n}\n.pulsing-badge {\n  display: inline-block;\n  padding: 8px 16px;\n  background: #181c26;\n  border: 1px solid #f43f5e;\n  border-radius: 999px;\n  color: #f43f5e;\n  animation: pulseGlow 2s infinite ease-in-out;\n}",
    "htmlContext": "<div class=\"pulsing-badge\">Live System</div>",
    "previewType": "css",
    "status": "ready"
  }
];
