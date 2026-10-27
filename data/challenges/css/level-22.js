/**
 * CodeReflex - CSS Level 22 Challenge
 * Topic: Hero Section Design
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l022-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 22,
    "language": "css",
    "title": "Hero Section Design",
    "difficulty": "beginner",
    "description": "Style a high-impact SaaS landing hero section with centered headline, glowing text gradient, and dual CTA buttons.",
    "concepts": [
      "hero banner",
      "gradient text",
      "cta alignment",
      "display: flex column"
    ],
    "expectedVisualResult": "A centered hero presentation with shimmering gradient text heading and prominent action buttons.",
    "validationCriteria": "Applies background-clip: text with gradient and flexbox column layout.",
    "completionCondition": "Type the hero section CSS.",
    "code": ".hero-section {\n  text-align: center;\n  padding: 48px 20px;\n  background: #090d16;\n  color: #f8fafc;\n}\n.hero-title {\n  font-size: 32px;\n  font-weight: 800;\n  margin: 0 0 12px 0;\n}\n.text-gradient {\n  background: linear-gradient(135deg, #f43f5e 0%, #38bdf8 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n.hero-desc {\n  color: #94a3b8;\n  font-size: 16px;\n  margin-bottom: 24px;\n}",
    "htmlContext": "<section class=\"hero-section\">\n  <h1 class=\"hero-title\">Build Real Coding <span class=\"text-gradient\">Muscle Memory</span></h1>\n  <p class=\"hero-desc\">Eliminate syntax hesitation with instantaneous visual feedback.</p>\n  <div class=\"hero-ctas\">\n    <button class=\"btn-cta-main\">Start Free Practice</button>\n  </div>\n</section>",
    "previewType": "css",
    "status": "ready"
  }
];
