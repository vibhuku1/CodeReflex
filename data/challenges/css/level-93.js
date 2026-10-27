/**
 * CodeReflex - CSS Level 93 Challenge
 * Topic: Healthcare Appointment Interface
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l093-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 93,
    "language": "css",
    "title": "Healthcare Appointment Interface",
    "difficulty": "expert",
    "description": "Construct an appointment time-slot selector grid with available and booked states highlighted in cyan vs disabled grey.",
    "concepts": [
      "calendar slot picker",
      "doctor profile chip",
      "confirmation step",
      "badge timing"
    ],
    "expectedVisualResult": "A grid of time pills with active selected appointment slot glowing cyan.",
    "validationCriteria": "Styles selectable time slot buttons with .is-selected state.",
    "completionCondition": "Type the appointment interface CSS.",
    "code": ".time-slots {\n  display: flex;\n  gap: 10px;\n}\n.slot-btn {\n  padding: 10px 14px;\n  background: #1f2937;\n  border: 1px solid #374151;\n  border-radius: 6px;\n  color: #f9fafb;\n  cursor: pointer;\n}\n.slot-btn.is-selected {\n  background: #0284c7;\n  border-color: #38bdf8;\n  color: #ffffff;\n}\n.slot-btn.disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}",
    "htmlContext": "<div class=\"time-slots\">\n  <button class=\"slot-btn\">09:00 AM</button>\n  <button class=\"slot-btn is-selected\">10:30 AM</button>\n  <button class=\"slot-btn disabled\">01:00 PM</button>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
