/**
 * CodeReflex - CSS Level 95 Challenge
 * Topic: Real Estate Listing Interface
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l095-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 95,
    "language": "css",
    "title": "Real Estate Listing Interface",
    "difficulty": "expert",
    "description": "Format a real estate property card with bed/bath/sqft icon row, price tag pill, and address title.",
    "concepts": [
      "property spec grid",
      "amenity chips",
      "price tag overlay",
      "agent contact"
    ],
    "expectedVisualResult": "A property card displaying $850,000 price and 3-part bed/bath/sqft specification summary.",
    "validationCriteria": "Card layout with spec pill group and prominent price label.",
    "completionCondition": "Type the real estate listing CSS.",
    "code": ".property-card {\n  background: #1e293b;\n  border: 1px solid #334155;\n  border-radius: 10px;\n  padding: 20px;\n  color: #f8fafc;\n  max-width: 320px;\n}\n.prop-price {\n  font-size: 24px;\n  font-weight: 800;\n  color: #34d399;\n  margin-bottom: 6px;\n}\n.prop-specs {\n  font-size: 13px;\n  color: #94a3b8;\n  margin-top: 8px;\n}",
    "htmlContext": "<div class=\"property-card\">\n  <div class=\"prop-price\">$850,000</div>\n  <h4 class=\"prop-address\">742 Evergreen Terrace</h4>\n  <div class=\"prop-specs\">\n    <span>4 Beds</span> • <span>3 Baths</span> • <span>2,400 sqft</span>\n  </div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
