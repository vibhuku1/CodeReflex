/**
 * CodeReflex - 70-Level Curriculum Metadata & Challenge Registry
 * Defines progressive pedagogical topics for 70 levels across HTML, CSS, and JavaScript.
 * Exactly 30 challenge slots per level (2,100 per language, 6,300 total slots).
 */

export const LEVEL_TIERS = {
  BEGINNER: { min: 1, max: 20, name: 'Beginner', badgeClass: 'tier-beginner' },
  INTERMEDIATE: { min: 21, max: 45, name: 'Intermediate', badgeClass: 'tier-intermediate' },
  ADVANCED: { min: 46, max: 70, name: 'Advanced', badgeClass: 'tier-advanced' }
};

export function getTierForLevel(levelNum) {
  if (levelNum >= 1 && levelNum <= 20) return LEVEL_TIERS.BEGINNER;
  if (levelNum >= 21 && levelNum <= 45) return LEVEL_TIERS.INTERMEDIATE;
  return LEVEL_TIERS.ADVANCED;
}

// 70 Progressive Topics for HTML
const HTML_TOPICS = [
  // 1-20: Beginner
  'Document Anatomy & DOCTYPE', 'Head & Title Configuration', 'Heading Hierarchy (H1-H6)', 'Paragraphs & Text Flow',
  'Inline Text Formatting', 'Hyperlinks & Navigational Anchors', 'Image Elements & Accessibility', 'Ordered & Unordered Lists',
  'Description & Definition Lists', 'Table Foundations (TR, TD, TH)', 'Form Input Fundamentals', 'Form Labels & Association',
  'Buttons & Form Actions', 'Semantic Headers & Footers', 'Main & Section Containers', 'Article & Aside Elements',
  'Figure & Figcaption Grouping', 'Quotations & Citations', 'Preformatted Text & Code Blocks', 'Basic Document Accessibility',
  // 21-45: Intermediate
  'Complex Form Input Types', 'Input Validation Attributes', 'Textarea & Datalist Controls', 'Fieldset & Legend Grouping',
  'Select Dropdowns & Options', 'Advanced Table Headers & Scope', 'Table Column Groups (Colgroup)', 'Inline SVG Graphics',
  'Audio & Video Embeds', 'Video Subtitles & Track Tags', 'Iframe Sandboxing & Embeds', 'Accessible Navigation Menus',
  'ARIA Landmark Roles', 'ARIA States & Expansions', 'ARIA Live Regions', 'Accessible Form Error Hints',
  'Microdata & Meta Schemas', 'Responsive Image Srcset', 'Picture Element Art Direction', 'Web App Manifest Headers',
  'Canvas Element Skeletons', 'Details & Summary Widgets', 'Native Dialog Elements', 'Contenteditable & Spellcheck',
  'Bi-directional Text Controls',
  // 46-70: Advanced
  'Enterprise App Shell Layouts', 'Multi-step Wizard Forms', 'Accessible Modal Architectures', 'Data Grid Table Markup',
  'Accessible Treeview Patterns', 'Tablist & Tabpanel Structures', 'Combobox & Autocomplete Shells', 'Accordion Component Markups',
  'Toast & Notification Shelves', 'Breadcrumb Stepper Skeletons', 'File Dropzone Containers', 'Custom Media Player Skeletons',
  'Web Component Host Templates', 'Shadow DOM Slot Elements', 'Multi-lingual Alternate Links', 'Security Meta Tags (CSP)',
  'Accessible Tooltip Markups', 'Typeahead Search Interfaces', 'Kanban Board Column Structures', 'Analytics Metric Card Grids',
  'High-Density Report Tables', 'Infinite Scroll Sentinel Markup', 'Off-canvas Drawer Markup', 'Split-Pane Workspace Shells',
  'Virtualized List Containers'
];

// 70 Progressive Topics for CSS
const CSS_TOPICS = [
  // 1-20: Beginner
  'Type & Universal Selectors', 'Class & ID Selectors', 'Color Formats (HEX, RGB, HSL)', 'Typography & Font Families',
  'Font Size, Weight & Line Height', 'Text Alignment & Decoration', 'Box Model: Content & Padding', 'Box Model: Borders & Radii',
  'Box Model: Margins & Spacing', 'Display: Block & Inline', 'Display: Inline-Block', 'Units: Pixels & Rem Units',
  'Units: Percentages & Viewports', 'Element Visibility & Opacity', 'Box Shadows & Elevations', 'List Styling & Markers',
  'Hover & Active States', 'Cursor Types & Interactivity', 'Overflow Clipping & Scrolling', 'Positioning: Relative & Absolute',
  // 21-45: Intermediate
  'Positioning: Fixed & Sticky', 'Flexbox: Direction & Wrap', 'Flexbox: Justify Content', 'Flexbox: Align Items & Self',
  'Flexbox: Grow, Shrink & Basis', 'Flexbox: Gap & Alignment', 'CSS Grid: Template Columns', 'CSS Grid: Fr Units & Repeat',
  'CSS Grid: Minmax & Auto-fill', 'CSS Grid: Areas & Templates', 'Media Queries: Mobile Breakpoints', 'Fluid Typography with Clamp',
  'CSS Custom Properties (Variables)', 'Pseudo-elements (::before, ::after)', 'Structural Pseudo-classes (:nth-child)', 'Form Pseudo-classes (:checked, :focus)',
  'Focus Visible & Focus Rings', 'CSS Transitions & Durations', 'Transition Timing Functions', '2D Transforms: Translate & Scale',
  '2D Transforms: Rotate & Skew', 'Linear & Radial Gradients', 'Custom Scrollbar Styling', 'Filter Effects (Blur, Grayscale)',
  'Backdrop Filter & Glassmorphism',
  // 46-70: Advanced
  'Keyframe Animation Foundations', 'Multi-step Animation Chaining', 'CSS Grid Holy Grail Layout', 'Subgrid Implementations',
  'Container Queries: Inline Size', 'Container Queries: Style', 'Native CSS Nesting Syntax', 'Modern Selector: :has() Relational',
  'Modern Selectors: :is() & :where()', 'Logical Properties (Inline/Block)', 'Modern Color Space: OKLCH', 'Color Mixing (color-mix)',
  'Scroll-driven Animations', 'Anchor Positioning Basics', '3D Transforms & Perspective', 'Clip Paths & Polygon Masks',
  'Dark Theme Custom Property Systems', 'Print Stylesheet Optimizations', 'Hardware Acceleration (will-change)', 'Custom Select Menu Styling',
  'Interactive Tooltip Architecture', 'Responsive Data Table Layouts', 'Fluid Space Clamp Scale Systems', 'Skeleton Loading Shimmer Effects',
  'Split-pane Resizer Component Styles'
];

// 70 Progressive Topics for JavaScript
const JS_TOPICS = [
  // 1-20: Beginner
  'Variable Declarations (const, let)', 'Primitive Types (string, number, boolean)', 'Template Literals & Interpolation', 'Arithmetic & Assignment Operators',
  'Comparison Operators & Coercion', 'Conditional If & Else Branches', 'Logical Operators (&&, ||, !)', 'Ternary Operator Expressions',
  'Switch Case Statements', 'While & Do-While Iterations', 'Standard For Loop Iterations', 'Function Declarations & Return',
  'Function Expressions & Arguments', 'Arrow Function Syntax', 'Array Creation & Index Access', 'Array Push & Pop Operations',
  'Array Shift & Unshift Operations', 'Object Literals & Dot Notation', 'Object Bracket Notation & Updates', 'Basic Console & Typeof Debugging',
  // 21-45: Intermediate
  'Array Iteration: forEach()', 'Array Transformation: map()', 'Array Filtering: filter()', 'Array Aggregation: reduce()',
  'Array Searching: find() & findIndex()', 'Array Checks: some() & every()', 'Array Slicing & Splicing', 'Object Destructuring & Defaults',
  'Array Destructuring & Rest Syntax', 'Spread Operator: Arrays & Objects', 'Object Static Methods (keys, values)', 'Object Entries & Traversal',
  'String Methods (slice, split, replace)', 'Math Object Calculation Helpers', 'Date Creation & Timestamps', 'Scope, Closures & Encapsulation',
  'Higher-Order Functions & Callbacks', 'DOM Selection (querySelector)', 'DOM Text & HTML Manipulation', 'DOM ClassList Token Operations',
  'DOM Inline Style Adjustments', 'Event Listeners & Event Types', 'Event Object & Target Properties', 'Form Submit & Default Prevention',
  'LocalStorage Storage Operations',
  // 46-70: Advanced
  'JSON Serialization & Parsing', 'Set & Map Collection Types', 'Error Handling (try, catch, finally)', 'Timeout & Interval Scheduling',
  'Promise Creation & Resolution', 'Promise Chaining (.then/.catch)', 'Async/Await Syntax & Flow', 'Fetch API HTTP GET Requests',
  'Fetch API JSON Post & Headers', 'Promise.all & Parallel Requests', 'Custom Event Dispatching', 'Debounce Utility Implementation',
  'Throttle Utility Implementation', 'IntersectionObserver Viewport Watch', 'MutationObserver DOM Watch', 'ResizeObserver Element Watch',
  'ES6 Classes & Constructors', 'Class Inheritance (extends, super)', 'Static Methods & Private Fields', 'Prototypes & Method Delegation',
  'RegExp Patterns & Test Method', 'Web Audio Synth Click Synthesis', 'URLSearchParams Query Handling', 'AbortController Request Cancel',
  'State Management Store Pattern'
];

const TOPIC_MAP = {
  html: HTML_TOPICS,
  css: CSS_TOPICS,
  javascript: JS_TOPICS
};

/**
 * Builds the canonical metadata for any level (1-70) in HTML, CSS, or JavaScript.
 */
export function getLevelMeta(language, levelNum) {
  const lang = (language || 'html').toLowerCase();
  const lvl = Math.max(1, Math.min(70, parseInt(levelNum, 10) || 1));
  const topics = TOPIC_MAP[lang] || HTML_TOPICS;
  const topicTitle = topics[lvl - 1] || `Level ${lvl} Progression`;
  const tier = getTierForLevel(lvl);

  const challenges = [];
  for (let ch = 1; ch <= 30; ch++) {
    const id = `${lang}-l${lvl}-c${ch}`;
    challenges.push({
      id,
      index: ch,
      challengeIndex: ch,
      level: lvl,
      language: lang,
      title: `${topicTitle} - Exercise ${ch}`,
      difficulty: tier.name.toLowerCase(),
      // Unimplemented slots are tracked cleanly
      status: 'unimplemented',
      description: `Practice coding and typing proficiency for ${topicTitle} (Challenge #${ch} of Level ${lvl}).`
    });
  }

  return {
    language: lang,
    level: lvl,
    tier: tier.name,
    badgeClass: tier.badgeClass,
    title: topicTitle,
    description: `Master ${topicTitle} through 30 focused coding typing challenges.`,
    totalChallenges: 30,
    challenges
  };
}

/**
 * Returns metadata summary for all 70 levels of a specific language.
 */
export function getAllLevelsSummary(language) {
  const lang = (language || 'html').toLowerCase();
  const levels = [];
  for (let lvl = 1; lvl <= 70; lvl++) {
    const meta = getLevelMeta(lang, lvl);
    levels.push({
      language: lang,
      level: lvl,
      tier: meta.tier,
      badgeClass: meta.badgeClass,
      title: meta.title,
      description: meta.description,
      totalChallenges: 30
    });
  }
  return levels;
}
