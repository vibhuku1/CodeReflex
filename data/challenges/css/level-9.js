/**
 * CodeReflex - CSS Level 9 Challenge
 * Topic: Product Image Styling
 * Exactly 1 Complete, Practical Question
 */

export const CHALLENGES = [
  {
    "id": "css-l009-q001",
    "index": 1,
    "challengeIndex": 1,
    "level": 9,
    "language": "css",
    "title": "Product Image Styling",
    "difficulty": "beginner",
    "description": "Frame a product showcase image using modern aspect-ratio and object-fit: cover to prevent layout shifts.",
    "concepts": [
      "aspect-ratio",
      "object-fit",
      "overflow hidden",
      "image framing"
    ],
    "expectedVisualResult": "An image container with fixed 16/9 aspect-ratio, rounded corners, and clean cover crop.",
    "validationCriteria": "Uses aspect-ratio: 16 / 9 with object-fit: cover and border-radius.",
    "completionCondition": "Type the image framing CSS.",
    "code": ".product-media {\n  width: 100%;\n  max-width: 380px;\n  aspect-ratio: 16 / 9;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #0f172a;\n}\n.product-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}",
    "htmlContext": "<div class=\"product-media\">\n  <img src=\"assets/keyboard-hero.png\" alt=\"Custom Mechanical Keycaps\" class=\"product-img\">\n</div>",
    "previewType": "css",
    "status": "ready"
  }
];
