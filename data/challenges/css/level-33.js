/**
 * CodeReflex - CSS Level 33 Challenge
 * Topic: Product Filter Sidebar
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l033-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 33,
    "language": "css",
    "title": "Product Filter Sidebar",
    "difficulty": "intermediate",
    "description": "Format an e-commerce filter sidebar with collapsible category headings, custom checkbox items, and price range indicator.",
    "concepts": [
      "sidebar accordion",
      "checkbox lists",
      "range sliders",
      "category groups"
    ],
    "expectedVisualResult": "A vertical filter panel with clean category headers and custom-styled checkbox labels.",
    "validationCriteria": "Vertical flex sidebar with padded sections and label alignments.",
    "completionCondition": "Type the product filter sidebar CSS.",
    "code": ".filter-sidebar {\n  width: 220px;\n  background: #0f172a;\n  padding: 18px;\n  border-radius: 8px;\n  color: #f8fafc;\n}\n.filter-heading {\n  margin: 0 0 12px 0;\n  font-size: 14px;\n  color: #38bdf8;\n  text-transform: uppercase;\n}\n.filter-option {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 8px;\n  font-size: 13px;\n  color: #cbd5e1;\n}",
    "htmlContext": "<aside class=\"filter-sidebar\">\n  <h4 class=\"filter-heading\">Categories</h4>\n  <label class=\"filter-option\"><input type=\"checkbox\"> Layouts (14)</label>\n  <label class=\"filter-option\"><input type=\"checkbox\"> Components (28)</label>\n</aside>",
    "previewType": "css",
    "status": "ready"
  }
];
