/**
 * CodeReflex - CSS Level 37 Challenge
 * Topic: Admin Dashboard Layout
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l037-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 37,
    "language": "css",
    "title": "Admin Dashboard Layout",
    "difficulty": "intermediate",
    "description": "Create an enterprise admin dashboard shell with fixed left sidebar, sticky header bar, and scrolling main content area.",
    "concepts": [
      "dashboard shell",
      "sidebar + header + main",
      "min-height: 100vh",
      "fixed header"
    ],
    "expectedVisualResult": "A 2-part full screen admin layout with sidebar and main content zone.",
    "validationCriteria": "Employs CSS Grid with 220px sidebar and 1fr main container.",
    "completionCondition": "Type the admin dashboard layout CSS.",
    "code": ".admin-shell {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  min-height: 240px;\n  background: #0b0f17;\n  color: #f8fafc;\n}\n.admin-sidebar {\n  background: #111827;\n  padding: 20px;\n  border-right: 1px solid #1f2937;\n}\n.admin-workspace {\n  padding: 24px;\n}",
    "htmlContext": "<div class=\"admin-shell\">\n  <aside class=\"admin-sidebar\">Admin Nav</aside>\n  <div class=\"admin-workspace\">Workspace Content</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
