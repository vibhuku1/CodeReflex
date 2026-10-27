/**
 * CodeReflex - CSS Level 11 Challenge
 * Topic: Flexbox Navigation Layout
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l011-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 11,
    "language": "css",
    "title": "Flexbox Navigation Layout",
    "difficulty": "beginner",
    "description": "Construct a horizontal website navigation menu with list reset, flexible items, and custom link padding.",
    "concepts": [
      "flex-direction",
      "flex-wrap",
      "nav alignment",
      "list-style reset"
    ],
    "expectedVisualResult": "A clean horizontal list of navigation links with hover color changes and consistent gaps.",
    "validationCriteria": "Flexbox list with list-style: none, display: flex, and gap.",
    "completionCondition": "Type the flexbox navigation menu CSS.",
    "code": ".nav-list {\n  display: flex;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  gap: 20px;\n}\n.nav-link {\n  color: #94a3b8;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 500;\n  padding: 6px 0;\n}\n.nav-link.active, .nav-link:hover {\n  color: #38bdf8;\n}",
    "htmlContext": "<nav class=\"site-nav\">\n  <ul class=\"nav-list\">\n    <li><a href=\"#dashboard\" class=\"nav-link active\">Dashboard</a></li>\n    <li><a href=\"#projects\" class=\"nav-link\">Projects</a></li>\n    <li><a href=\"#analytics\" class=\"nav-link\">Analytics</a></li>\n    <li><a href=\"#settings\" class=\"nav-link\">Settings</a></li>\n  </ul>\n</nav>",
    "previewType": "css",
    "status": "ready"
  }
];
