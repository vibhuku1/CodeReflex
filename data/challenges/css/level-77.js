/**
 * CodeReflex - CSS Level 77 Challenge
 * Topic: Enterprise Admin Workspace
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l077-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 77,
    "language": "css",
    "title": "Enterprise Admin Workspace",
    "difficulty": "expert",
    "description": "Style a dense enterprise admin console featuring compact data density and high-contrast action toolbars.",
    "concepts": [
      "split workspace",
      "sub-navigation tabs",
      "action toolbar",
      "density controls"
    ],
    "expectedVisualResult": "A compact admin workstation view with monospace identifiers and high-density spacing.",
    "validationCriteria": "Implements compact font sizing, padding density, and monospace styling.",
    "completionCondition": "Type the enterprise admin workspace CSS.",
    "code": ".enterprise-ws {\n  background: #090d14;\n  border: 1px solid #1e293b;\n  border-radius: 6px;\n  font-family: ui-monospace, monospace;\n  font-size: 12px;\n  color: #e2e8f0;\n}\n.ws-toolbar {\n  padding: 8px 14px;\n  background: #111827;\n  border-bottom: 1px solid #1e293b;\n  color: #38bdf8;\n}\n.ws-body {\n  padding: 12px 14px;\n}",
    "htmlContext": "<div class=\"enterprise-ws\">\n  <div class=\"ws-toolbar\">Console: Cluster-01 • Status: Healthy</div>\n  <div class=\"ws-body\">Latency: 12ms | CPU: 24% | Memory: 4.2GB</div>\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
