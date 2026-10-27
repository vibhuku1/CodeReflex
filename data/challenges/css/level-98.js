/**
 * CodeReflex - CSS Level 98 Challenge
 * Topic: Multi-Page Website Styling
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l098-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 98,
    "language": "css",
    "title": "Multi-Page Website Styling",
    "difficulty": "expert",
    "description": "Style a unified website layout shell that maintains consistent header, breadcrumb navigation, and footer spacing.",
    "concepts": [
      "shared page wrapper",
      "consistent footer",
      "breadcrumb trail",
      "global layout"
    ],
    "expectedVisualResult": "A cohesive page framework linking header, content container, and footer with uniform borders.",
    "validationCriteria": "Defines .page-shell with sticky footer layout using min-height: 100vh.",
    "completionCondition": "Type the multi-page website layout CSS.",
    "code": ".page-shell {\n  display: flex;\n  flex-direction: column;\n  min-height: 240px;\n  background: #090d16;\n  color: #f8fafc;\n}\n.page-top, .page-foot {\n  padding: 14px 20px;\n  background: #111827;\n}\n.page-content {\n  flex: 1;\n  padding: 24px 20px;\n}",
    "htmlContext": "<div class=\"page-shell\">\n  <header class=\"page-top\">Site Header</header>\n  <main class=\"page-content\">Main Body</main>\n  <footer class=\"page-foot\">Footer 2026</footer>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
