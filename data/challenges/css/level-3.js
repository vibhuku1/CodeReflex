/**
 * CodeReflex - CSS Level 3 Challenge
 * Topic: Typography and Text Hierarchy
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l003-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 3,
    "language": "css",
    "title": "Typography and Text Hierarchy",
    "difficulty": "beginner",
    "description": "Establish typographic hierarchy between article headings, meta category tags, and descriptive body copy.",
    "concepts": [
      "font-size",
      "font-weight",
      "line-height",
      "letter-spacing",
      "text-transform"
    ],
    "expectedVisualResult": "A typography specimen with bold prominent heading, uppercase tracked category tag, and readable body paragraph.",
    "validationCriteria": "Applies uppercase letter-spacing to category, 700-weight heading, and 1.6 line-height to body copy.",
    "completionCondition": "Type the typography hierarchy CSS rules.",
    "code": ".category-tag {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #38bdf8;\n}\n.article-heading {\n  font-size: 22px;\n  font-weight: 700;\n  line-height: 1.3;\n  color: #ffffff;\n  margin: 8px 0;\n}\n.article-summary {\n  font-size: 14px;\n  line-height: 1.6;\n  color: #94a3b8;\n}",
    "htmlContext": "<div class=\"article-meta\">\n  <span class=\"category-tag\">Architecture</span>\n  <h1 class=\"article-heading\">Designing Scalable CSS Design Systems</h1>\n  <p class=\"article-summary\">Explore how design tokens, layout primitives, and strict component contracts empower engineering teams.</p>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
