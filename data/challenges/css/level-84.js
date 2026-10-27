/**
 * CodeReflex - CSS Level 84 Challenge
 * Topic: Editorial Magazine Website
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l084-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 84,
    "language": "css",
    "title": "Editorial Magazine Website",
    "difficulty": "expert",
    "description": "Construct a dense news magazine homepage layout featuring a breaking news bar and 3-column article feed.",
    "concepts": [
      "multi-column news layout",
      "breaking news ticker",
      "editorial grid hierarchy"
    ],
    "expectedVisualResult": "A news header bar with yellow breaking pill and 3-column article grid below.",
    "validationCriteria": "Uses multi-column grid with styled breaking news header.",
    "completionCondition": "Type the editorial magazine CSS.",
    "code": ".magazine-shell {\n  background: #0b0f17;\n  padding: 16px;\n  color: #f8fafc;\n}\n.ticker-bar {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #161e2e;\n  padding: 10px 16px;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.ticker-tag {\n  background: #ef4444;\n  color: #ffffff;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-weight: 700;\n  font-size: 11px;\n}",
    "htmlContext": "<div class=\"magazine-shell\">\n  <div class=\"ticker-bar\"><span class=\"ticker-tag\">BREAKING</span> Next-gen CSS features live in all modern engines.</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
