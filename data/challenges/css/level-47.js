/**
 * CodeReflex - CSS Level 47 Challenge
 * Topic: Blog Article Page
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l047-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 47,
    "language": "css",
    "title": "Blog Article Page",
    "difficulty": "intermediate",
    "description": "Format a long-form editorial blog article with centered 65ch readable column width and styled blockquotes.",
    "concepts": [
      "editorial typography",
      "max-width prose",
      "lead paragraph",
      "blockquote styling"
    ],
    "expectedVisualResult": "An elegant reading column with 65ch line measure and left-bordered quote accent.",
    "validationCriteria": "Uses max-width: 65ch with line-height: 1.7 and styled blockquote.",
    "completionCondition": "Type the editorial blog article CSS.",
    "code": ".prose-article {\n  max-width: 65ch;\n  margin: 0 auto;\n  color: #cbd5e1;\n  line-height: 1.7;\n}\n.prose-article h1 {\n  color: #f8fafc;\n  font-size: 28px;\n}\n.lead-text {\n  font-size: 18px;\n  color: #94a3b8;\n}\nblockquote {\n  border-left: 3px solid #38bdf8;\n  margin: 20px 0;\n  padding-left: 16px;\n  color: #e2e8f0;\n  font-style: italic;\n}",
    "htmlContext": "<article class=\"prose-article\">\n  <h1>Building Fluid UIs</h1>\n  <p class=\"lead-text\">Modern layouts demand responsive fluid scale.</p>\n  <blockquote>Design systems unite teams under a shared visual grammar.</blockquote>\n</article>",
    "previewType": "css",
    "status": "ready"
  }
];
