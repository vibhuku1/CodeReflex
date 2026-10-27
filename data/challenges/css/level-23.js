/**
 * CodeReflex - CSS Level 23 Challenge
 * Topic: Feature Cards Section
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l023-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 23,
    "language": "css",
    "title": "Feature Cards Section",
    "difficulty": "beginner",
    "description": "Style a 3-column feature cards section highlighting key product capabilities with icon boxes and title descriptions.",
    "concepts": [
      "multi-card grid",
      "feature icons",
      "card hierarchy",
      "consistent heights"
    ],
    "expectedVisualResult": "A 3-column grid of feature cards with colored icon chips and uniform heights.",
    "validationCriteria": "Employs CSS Grid with 3 columns and icon box styling.",
    "completionCondition": "Type the feature cards section CSS.",
    "code": ".features-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 20px;\n  max-width: 600px;\n}\n.feature-card {\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 10px;\n  padding: 20px;\n  color: #f3f4f6;\n}\n.feature-icon {\n  font-size: 24px;\n  margin-bottom: 12px;\n}",
    "htmlContext": "<div class=\"features-grid\">\n  <div class=\"feature-card\">\n    <div class=\"feature-icon\">⚡</div>\n    <h4>Zero Latency</h4>\n    <p>Real-time typing evaluation engine.</p>\n  </div>\n  <div class=\"feature-card\">\n    <div class=\"feature-icon\">🎯</div>\n    <h4>Real Syntax</h4>\n    <p>Authentic code blocks over fake prose.</p>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
