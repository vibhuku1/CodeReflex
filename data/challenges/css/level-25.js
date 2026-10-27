/**
 * CodeReflex - CSS Level 25 Challenge
 * Topic: Complete Mini Landing Page
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l025-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 25,
    "language": "css",
    "title": "Complete Mini Landing Page",
    "difficulty": "beginner",
    "description": "Bring together navbar, hero banner, and feature teaser in a unified mini landing page component shell.",
    "concepts": [
      "page composition",
      "header hero footer",
      "layout cohesion",
      "system styling"
    ],
    "expectedVisualResult": "A cohesive single-page mini layout with branded header, centered hero, and integrated container styles.",
    "validationCriteria": "Coordinates full-width container, header flexbox, and hero typography with cohesive aesthetics.",
    "completionCondition": "Type the complete mini landing page layout CSS.",
    "code": ".landing-shell {\n  background: #0b0f17;\n  color: #f8fafc;\n  border: 1px solid #1e293b;\n  border-radius: 12px;\n  overflow: hidden;\n  max-width: 480px;\n}\n.shell-header {\n  display: flex;\n  justify-content: space-between;\n  padding: 14px 20px;\n  background: #111827;\n  border-bottom: 1px solid #1e293b;\n  font-size: 14px;\n}\n.shell-main {\n  text-align: center;\n  padding: 36px 20px;\n}",
    "htmlContext": "<div class=\"landing-shell\">\n  <header class=\"shell-header\">\n    <strong>CodeReflex</strong>\n    <span>v2.0</span>\n  </header>\n  <main class=\"shell-main\">\n    <h2>Type Faster. Code Smarter.</h2>\n    <p>Master real-world CSS layouts one level at a time.</p>\n  </main>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
