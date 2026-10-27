/**
 * CodeReflex - CSS Level 92 Challenge
 * Topic: Finance Dashboard Styling
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l092-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 92,
    "language": "css",
    "title": "Finance Dashboard Styling",
    "difficulty": "expert",
    "description": "Style a credit card preview with metallic gradient background, chip graphic, and masked card numbers.",
    "concepts": [
      "balance overview",
      "transaction list",
      "credit card preview",
      "currency styling"
    ],
    "expectedVisualResult": "A realistic dark credit card container with gold gradient accent and monospace numbers.",
    "validationCriteria": "Uses aspect-ratio: 1.586 (standard card ratio) and linear gradient.",
    "completionCondition": "Type the finance credit card CSS.",
    "code": ".credit-card-preview {\n  width: 280px;\n  aspect-ratio: 1.586;\n  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  border-radius: 14px;\n  padding: 20px;\n  color: #f8fafc;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);\n}\n.card-num {\n  font-family: monospace;\n  font-size: 16px;\n  letter-spacing: 2px;\n}",
    "htmlContext": "<div class=\"credit-card-preview\">\n  <div class=\"card-brand\">VIRTUAL DEBIT</div>\n  <div class=\"card-num\">•••• •••• •••• 4242</div>\n  <div class=\"card-exp\">08/29</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
