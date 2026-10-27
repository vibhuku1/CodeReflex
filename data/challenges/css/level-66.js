/**
 * CodeReflex - CSS Level 66 Challenge
 * Topic: Transform-Based UI Effects
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l066-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 66,
    "language": "css",
    "title": "Transform-Based UI Effects",
    "difficulty": "advanced",
    "description": "Apply subtle 3D tilt perspective to a card using perspective and rotateX/rotateY transforms.",
    "concepts": [
      "transform: perspective",
      "rotateX",
      "rotateY",
      "3D card tilt"
    ],
    "expectedVisualResult": "A card rotated in 3D space with genuine geometric perspective.",
    "validationCriteria": "Uses perspective and rotateX or rotateY transforms.",
    "completionCondition": "Type the 3D perspective transform CSS.",
    "code": ".card-3d-wrap {\n  perspective: 800px;\n}\n.card-3d {\n  background: #1e293b;\n  border: 1px solid #38bdf8;\n  border-radius: 10px;\n  padding: 24px;\n  color: #f8fafc;\n  transform: rotateX(10deg) rotateY(-5deg);\n}",
    "htmlContext": "<div class=\"card-3d-wrap\">\n  <div class=\"card-3d\">3D Perspective Surface</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
