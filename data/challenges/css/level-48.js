/**
 * CodeReflex - CSS Level 48 Challenge
 * Topic: Testimonial Section
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l048-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 48,
    "language": "css",
    "title": "Testimonial Section",
    "difficulty": "intermediate",
    "description": "Style a customer testimonial card featuring star rating icons, quotation paragraph, and user attribution avatar.",
    "concepts": [
      "quote card",
      "author avatar",
      "star rating",
      "customer feedback"
    ],
    "expectedVisualResult": "A polished quote card with golden star ratings, italic feedback, and user identity chip.",
    "validationCriteria": "Card layout with flex attribution row and star rating coloration.",
    "completionCondition": "Type the testimonial section CSS.",
    "code": ".testimonial-card {\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 12px;\n  padding: 24px;\n  color: #f3f4f6;\n  max-width: 340px;\n}\n.stars {\n  color: #fbbf24;\n  margin-bottom: 8px;\n}\n.quote {\n  font-size: 15px;\n  font-style: italic;\n  margin: 0 0 16px 0;\n}\n.author {\n  font-size: 13px;\n  color: #9ca3af;\n}",
    "htmlContext": "<div class=\"testimonial-card\">\n  <div class=\"stars\">★★★★★</div>\n  <p class=\"quote\">\"CodeReflex transformed our typing fluency completely.\"</p>\n  <div class=\"author\">Alex Chen, Senior Frontend Engineer</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
