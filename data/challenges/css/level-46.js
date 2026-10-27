/**
 * CodeReflex - CSS Level 46 Challenge
 * Topic: Masonry Photo Gallery
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l046-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 46,
    "language": "css",
    "title": "Masonry Photo Gallery",
    "difficulty": "intermediate",
    "description": "Build a multi-column masonry photo gallery layout using CSS multi-column properties to accommodate varied heights.",
    "concepts": [
      "column-count",
      "column-gap",
      "break-inside avoid",
      "pinterest layout"
    ],
    "expectedVisualResult": "A natural Pinterest-style cascading column layout with no broken images across columns.",
    "validationCriteria": "Uses column-count with break-inside: avoid on child items.",
    "completionCondition": "Type the masonry gallery CSS.",
    "code": ".masonry-wrap {\n  column-count: 2;\n  column-gap: 16px;\n  max-width: 480px;\n}\n.masonry-card {\n  break-inside: avoid;\n  background: #1e293b;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 16px;\n  color: #f1f5f9;\n}",
    "htmlContext": "<div class=\"masonry-wrap\">\n  <div class=\"masonry-card\">Short Item</div>\n  <div class=\"masonry-card tall\">Tall Item With Long Content</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
