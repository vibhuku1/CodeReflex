/**
 * CodeReflex - CSS Level 56 Challenge
 * Topic: Multi-Column Editorial Layout
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l056-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 56,
    "language": "css",
    "title": "Multi-Column Editorial Layout",
    "difficulty": "advanced",
    "description": "Construct an editorial magazine layout using named grid-template-areas for hero story, sidebar, and trending list.",
    "concepts": [
      "magazine grid",
      "featured lead story",
      "sidebar news column",
      "grid-template-areas"
    ],
    "expectedVisualResult": "A 2-part magazine grid with featured article taking left area and trending column on right.",
    "validationCriteria": "Implements grid-template-areas with distinct named regions.",
    "completionCondition": "Type the editorial layout CSS.",
    "code": ".magazine-grid {\n  display: grid;\n  grid-template-areas: \"main side\";\n  grid-template-columns: 2fr 1fr;\n  gap: 20px;\n  color: #f1f5f9;\n}\n.lead-story {\n  grid-area: main;\n  background: #1e293b;\n  padding: 24px;\n  border-radius: 8px;\n}\n.sidebar-stories {\n  grid-area: side;\n  background: #0f172a;\n  padding: 20px;\n  border-radius: 8px;\n}",
    "htmlContext": "<div class=\"magazine-grid\">\n  <article class=\"lead-story\">Featured Story</article>\n  <aside class=\"sidebar-stories\">Trending List</aside>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
