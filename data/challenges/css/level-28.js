/**
 * CodeReflex - CSS Level 28 Challenge
 * Topic: Responsive Navigation System
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l028-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 28,
    "language": "css",
    "title": "Responsive Navigation System",
    "difficulty": "intermediate",
    "description": "Style a mobile-first responsive navigation bar that switches from desktop links to a collapsable mobile drawer.",
    "concepts": [
      "mobile drawer",
      "hamburger button",
      "transition transform",
      "responsive hide"
    ],
    "expectedVisualResult": "A navigation header with hidden mobile toggle on desktop that reveals on smaller screen widths.",
    "validationCriteria": "Uses media queries to adapt navigation layout between desktop and mobile.",
    "completionCondition": "Type the responsive navigation system CSS.",
    "code": ".nav-system {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 18px;\n  background: #111827;\n  color: #f3f4f6;\n}\n.nav-toggle {\n  display: none;\n  background: transparent;\n  border: none;\n  color: #f3f4f6;\n  font-size: 20px;\n}\n@media (max-width: 640px) {\n  .nav-links-desktop {\n    display: none;\n  }\n  .nav-toggle {\n    display: block;\n  }\n}",
    "htmlContext": "<nav class=\"nav-system\">\n  <div class=\"nav-brand\">Logo</div>\n  <div class=\"nav-links-desktop\">\n    <a href=\"#\">Home</a>\n    <a href=\"#\">Tracks</a>\n  </div>\n  <button class=\"nav-toggle\" aria-label=\"Toggle Menu\">☰</button>\n</nav>",
    "previewType": "css",
    "status": "ready"
  }
];
