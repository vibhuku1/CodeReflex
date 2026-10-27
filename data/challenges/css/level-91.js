/**
 * CodeReflex - CSS Level 91 Challenge
 * Topic: Travel Booking Interface
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l091-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 91,
    "language": "css",
    "title": "Travel Booking Interface",
    "difficulty": "expert",
    "description": "Design a flight itinerary card featuring departure/arrival airport codes, direct duration line, and fare price callout.",
    "concepts": [
      "date range picker",
      "flight departure cards",
      "seat class selectors"
    ],
    "expectedVisualResult": "An airline ticket row with airport codes connected by a dotted path line and price pill.",
    "validationCriteria": "Employs flexbox layout with flight path graphic or divider.",
    "completionCondition": "Type the travel booking interface CSS.",
    "code": ".flight-card {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #1e293b;\n  border: 1px solid #334155;\n  border-radius: 10px;\n  padding: 18px 24px;\n  color: #f8fafc;\n  max-width: 440px;\n}\n.flight-fare {\n  font-size: 22px;\n  font-weight: 800;\n  color: #38bdf8;\n}",
    "htmlContext": "<div class=\"flight-card\">\n  <div class=\"flight-route\"><strong>SFO</strong> ────✈──── <strong>JFK</strong></div>\n  <div class=\"flight-fare\">$389</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
