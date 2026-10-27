/**
 * CodeReflex - CSS Level 55 Challenge
 * Topic: Complex Website Header
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l055-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 55,
    "language": "css",
    "title": "Complex Website Header",
    "difficulty": "advanced",
    "description": "Style a modern website header containing brand, search input, mega-menu trigger, and profile avatar with glassmorphic backdrop.",
    "concepts": [
      "multi-level nav",
      "search bar integration",
      "user dropdown",
      "sticky backdrop-filter"
    ],
    "expectedVisualResult": "A semi-transparent header with backdrop-filter blur and aligned utility controls.",
    "validationCriteria": "Uses backdrop-filter: blur(8px) and multi-item flex layout.",
    "completionCondition": "Type the website header CSS.",
    "code": ".glass-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 24px;\n  background: rgba(15, 23, 42, 0.85);\n  backdrop-filter: blur(8px);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  color: #f8fafc;\n}",
    "htmlContext": "<header class=\"glass-header\">\n  <span class=\"logo\">CodeReflex</span>\n  <div class=\"header-search\">Search...</div>\n  <div class=\"user-pill\">Profile</div>\n</header>",
    "previewType": "css",
    "status": "ready"
  }
];
