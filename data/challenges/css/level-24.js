/**
 * CodeReflex - CSS Level 24 Challenge
 * Topic: Pricing Card Design
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l024-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 24,
    "language": "css",
    "title": "Pricing Card Design",
    "difficulty": "beginner",
    "description": "Design a high-converting pricing card for a Pro plan featuring a \"Most Popular\" ribbon, large price display, and checkmark list.",
    "concepts": [
      "pricing tiers",
      "recommended badge",
      "price currency format",
      "bullet feature list"
    ],
    "expectedVisualResult": "A standout pricing card with crimson border highlight, large price typography, and feature bullets.",
    "validationCriteria": "Styles highlighted pricing tier with featured border and prominent price typography.",
    "completionCondition": "Type the pricing card design CSS.",
    "code": ".pricing-card.featured {\n  background: #161d2a;\n  border: 2px solid #f43f5e;\n  border-radius: 14px;\n  padding: 28px;\n  color: #f8fafc;\n  max-width: 280px;\n}\n.plan-tag {\n  color: #f43f5e;\n  font-size: 13px;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.price-val {\n  font-size: 36px;\n  font-weight: 800;\n  margin: 12px 0 20px 0;\n}\n.price-period {\n  font-size: 14px;\n  color: #94a3b8;\n  font-weight: 400;\n}",
    "htmlContext": "<div class=\"pricing-card featured\">\n  <span class=\"plan-tag\">Pro Plan</span>\n  <div class=\"price-val\">$19<span class=\"price-period\">/mo</span></div>\n  <ul class=\"plan-features\">\n    <li>All 100 CSS Levels</li>\n    <li>Cloud Synchronization</li>\n  </ul>\n  <button class=\"btn-plan\">Upgrade to Pro</button>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
