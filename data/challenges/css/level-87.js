/**
 * CodeReflex - CSS Level 87 Challenge
 * Topic: Advanced Search Results Page
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l087-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 87,
    "language": "css",
    "title": "Advanced Search Results Page",
    "difficulty": "expert",
    "description": "Style a search results listing with breadcrumb paths, highlighted query matching keywords, and timestamp metadata.",
    "concepts": [
      "search hit highlight",
      "result breadcrumbs",
      "meta snippets",
      "pagination"
    ],
    "expectedVisualResult": "A search result card with highlighted query term and breadcrumb path.",
    "validationCriteria": "Styles .search-highlight with yellow/cyan background and title link.",
    "completionCondition": "Type the search results page CSS.",
    "code": ".search-result-card {\n  background: #111827;\n  padding: 18px;\n  border-radius: 8px;\n  color: #cbd5e1;\n  max-width: 450px;\n}\n.res-path {\n  font-size: 11px;\n  color: #9ca3af;\n}\n.res-title {\n  margin: 4px 0 8px 0;\n  color: #38bdf8;\n  font-size: 16px;\n}\n.hl {\n  background: rgba(56, 189, 248, 0.25);\n  color: #38bdf8;\n  padding: 1px 4px;\n  border-radius: 2px;\n}",
    "htmlContext": "<div class=\"search-result-card\">\n  <span class=\"res-path\">docs > css > flexbox</span>\n  <h4 class=\"res-title\">Mastering <mark class=\"hl\">Flexbox</mark> Alignment</h4>\n  <p class=\"res-snippet\">Learn how justify-content and align-items position items.</p>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
