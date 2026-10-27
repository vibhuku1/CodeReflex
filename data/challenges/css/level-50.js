/**
 * CodeReflex - CSS Level 50 Challenge
 * Topic: Responsive Pricing Plans
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l050-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 50,
    "language": "css",
    "title": "Responsive Pricing Plans",
    "difficulty": "intermediate",
    "description": "Style a 3-tier responsive pricing plans container with billing period toggle and highlighted center card.",
    "concepts": [
      "pricing toggle",
      "annual discount badge",
      "multi-card responsive layout"
    ],
    "expectedVisualResult": "A 3-card pricing tier presentation with the center card highlighted with accent border.",
    "validationCriteria": "Responsive grid with distinct featured middle card border and shadow.",
    "completionCondition": "Type the responsive pricing plans CSS.",
    "code": ".pricing-tiers-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 16px;\n  max-width: 600px;\n}\n.tier-box {\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 10px;\n  padding: 20px;\n  color: #f3f4f6;\n  text-align: center;\n}\n.tier-box.popular {\n  border-color: #38bdf8;\n  box-shadow: 0 0 16px rgba(56, 189, 248, 0.2);\n}",
    "htmlContext": "<div class=\"pricing-tiers-grid\">\n  <div class=\"tier-box\">Starter ($0)</div>\n  <div class=\"tier-box popular\">Pro ($19)</div>\n  <div class=\"tier-box\">Enterprise ($49)</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
