/**
 * CodeReflex - CSS Level 45 Challenge
 * Topic: Image Gallery Layout
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l045-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 45,
    "language": "css",
    "title": "Image Gallery Layout",
    "difficulty": "intermediate",
    "description": "Create an image gallery grid with fixed square aspect ratios and smooth image zoom on card hover.",
    "concepts": [
      "CSS grid gallery",
      "aspect-ratio",
      "hover zoom effect",
      "caption overlay"
    ],
    "expectedVisualResult": "A 3-column square photo grid where images zoom smoothly inside their bounds on hover.",
    "validationCriteria": "Employs aspect-ratio: 1 / 1 with overflow: hidden and transform scale on hover.",
    "completionCondition": "Type the image gallery CSS.",
    "code": ".photo-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n}\n.photo-item {\n  aspect-ratio: 1 / 1;\n  overflow: hidden;\n  border-radius: 8px;\n  background: #1f2937;\n}\n.photo-item img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.photo-item:hover img {\n  transform: scale(1.08);\n}",
    "htmlContext": "<div class=\"photo-grid\">\n  <div class=\"photo-item\"><img src=\"thumb1.jpg\" alt=\"1\"></div>\n  <div class=\"photo-item\"><img src=\"thumb2.jpg\" alt=\"2\"></div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
