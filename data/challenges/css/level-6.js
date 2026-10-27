/**
 * CodeReflex - CSS Level 6 Challenge
 * Topic: Borders and Rounded Corners
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l006-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 6,
    "language": "css",
    "title": "Borders and Rounded Corners",
    "difficulty": "beginner",
    "description": "Create an asymmetric pill status tag with distinctive border-radius curvatures and a colored accent border.",
    "concepts": [
      "border-width",
      "border-style",
      "border-radius asymmetric",
      "pill shapes"
    ],
    "expectedVisualResult": "A distinctively rounded pill badge with 9999px horizontal radius and glowing emerald borders.",
    "validationCriteria": "Utilizes border-radius: 9999px and subtle 1px border for pill geometry.",
    "completionCondition": "Type the border-radius styling CSS.",
    "code": ".status-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 14px;\n  background: rgba(16, 185, 129, 0.12);\n  border: 1px solid rgba(16, 185, 129, 0.35);\n  border-radius: 9999px;\n  color: #34d399;\n  font-size: 12px;\n  font-weight: 600;\n}",
    "htmlContext": "<div class=\"tag-wrapper\">\n  <span class=\"status-pill status-active\">\n    <span class=\"pulse-dot\"></span>\n    System Healthy\n  </span>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
