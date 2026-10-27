/**
 * CodeReflex - CSS Level 85 Challenge
 * Topic: Multi-Panel Workspace
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l085-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 85,
    "language": "css",
    "title": "Multi-Panel Workspace",
    "difficulty": "expert",
    "description": "Style a 3-pane IDE-style developer workspace with file tree on left, central editor, and right inspector panel.",
    "concepts": [
      "split panes",
      "resizer handle",
      "left navigation right inspector",
      "docked layout"
    ],
    "expectedVisualResult": "A 3-column docked developer tool window with clear pane borders and header tabs.",
    "validationCriteria": "Declares grid-template-columns with 3 panels and border separators.",
    "completionCondition": "Type the multi-panel workspace CSS.",
    "code": ".workspace-tri-split {\n  display: grid;\n  grid-template-columns: 160px 1fr 200px;\n  min-height: 200px;\n  background: #090d16;\n  border: 1px solid #1e293b;\n  border-radius: 8px;\n  color: #e2e8f0;\n}\n.pane {\n  padding: 14px;\n  border-right: 1px solid #1e293b;\n}\n.pane:last-child {\n  border-right: none;\n}",
    "htmlContext": "<div class=\"workspace-tri-split\">\n  <div class=\"pane pane-tree\">Files</div>\n  <div class=\"pane pane-code\">Editor</div>\n  <div class=\"pane pane-inspect\">Inspect</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
