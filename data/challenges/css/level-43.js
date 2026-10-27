/**
 * CodeReflex - CSS Level 43 Challenge
 * Topic: Tabs and Accordion Components
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l043-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 43,
    "language": "css",
    "title": "Tabs and Accordion Components",
    "difficulty": "intermediate",
    "description": "Construct a horizontal tab navigation row with an animated bottom border line under the currently active tab.",
    "concepts": [
      "tab navigation",
      "active tab indicator",
      "tabpanel",
      "border-bottom indicator"
    ],
    "expectedVisualResult": "A clean tab bar with active tab highlighted by a colored bottom border line.",
    "validationCriteria": "Applies border-bottom: 2px solid to active tab and transparent borders to siblings.",
    "completionCondition": "Type the tabs navigation CSS.",
    "code": ".tabs-nav {\n  display: flex;\n  border-bottom: 1px solid #1f2937;\n  gap: 8px;\n}\n.tab-btn {\n  background: transparent;\n  border: none;\n  border-bottom: 2px solid transparent;\n  padding: 10px 16px;\n  color: #9ca3af;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n}\n.tab-btn.active {\n  color: #38bdf8;\n  border-bottom-color: #38bdf8;\n}",
    "htmlContext": "<div class=\"tabs-nav\">\n  <button class=\"tab-btn active\">Editor</button>\n  <button class=\"tab-btn\">Live Preview</button>\n  <button class=\"tab-btn\">Console</button>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
