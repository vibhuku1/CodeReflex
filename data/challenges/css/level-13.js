/**
 * CodeReflex - CSS Level 13 Challenge
 * Topic: Website Navigation Bar
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l013-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 13,
    "language": "css",
    "title": "Website Navigation Bar",
    "difficulty": "beginner",
    "description": "Style a sticky top website navbar featuring a brand logo on the left, centered links, and CTA buttons on the right.",
    "concepts": [
      "header layout",
      "brand logo",
      "nav cta",
      "sticky navigation"
    ],
    "expectedVisualResult": "A dark, polished header banner with 3-part layout pinned cleanly across the top.",
    "validationCriteria": "Sets display: flex with space-between alignment and border-bottom divider.",
    "completionCondition": "Type the top navigation bar CSS.",
    "code": ".main-navbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 24px;\n  background: rgba(15, 23, 42, 0.95);\n  border-bottom: 1px solid #1e293b;\n  color: #f8fafc;\n}\n.nav-brand {\n  font-size: 18px;\n  font-weight: 700;\n  color: #f43f5e;\n}",
    "htmlContext": "<header class=\"main-navbar\">\n  <div class=\"nav-brand\">CodeReflex</div>\n  <div class=\"nav-menu\">Features • Pricing • Docs</div>\n  <button class=\"nav-btn\">Sign In</button>\n</header>",
    "previewType": "css",
    "status": "ready"
  }
];
