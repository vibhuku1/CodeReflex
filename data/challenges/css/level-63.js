/**
 * CodeReflex - CSS Level 63 Challenge
 * Topic: Layered Gradient Backgrounds
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l063-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 63,
    "language": "css",
    "title": "Layered Gradient Backgrounds",
    "difficulty": "advanced",
    "description": "Stack multiple radial gradients with varying opacities to produce a glowing nebula visual effect.",
    "concepts": [
      "multiple background images",
      "radial-gradient stacking",
      "conic-gradient",
      "glow effects"
    ],
    "expectedVisualResult": "A dark container with dual pink and cyan ambient light glows blending smoothly together.",
    "validationCriteria": "Applies multiple comma-separated radial-gradient backgrounds.",
    "completionCondition": "Type the layered gradient CSS.",
    "code": ".nebula-card {\n  background: \n    radial-gradient(circle at 10% 20%, rgba(244, 63, 94, 0.2) 0%, transparent 40%),\n    radial-gradient(circle at 90% 80%, rgba(56, 189, 248, 0.2) 0%, transparent 40%),\n    #0b0f17;\n  border: 1px solid #1e293b;\n  border-radius: 12px;\n  padding: 28px;\n  color: #f8fafc;\n}",
    "htmlContext": "<div class=\"nebula-card\">\n  <h3>Aurora Surface</h3>\n  <p>Multi-layered gradient mesh creates ambient depth.</p>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
