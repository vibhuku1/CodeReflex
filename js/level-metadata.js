/**
 * CodeReflex - 70-Level Curriculum Metadata & Challenge Registry
 * Defines progressive pedagogical topics for 70 levels across HTML, CSS, and JavaScript.
 * Exactly 30 challenge slots per level (2,100 per language, 6,300 total slots).
 */

export const LEVEL_TIERS = {
  BEGINNER: { min: 1, max: 20, name: 'Beginner', badgeClass: 'tier-beginner' },
  INTERMEDIATE: { min: 21, max: 45, name: 'Intermediate', badgeClass: 'tier-intermediate' },
  ADVANCED: { min: 46, max: 70, name: 'Advanced', badgeClass: 'tier-advanced' },
  EXPERT: { min: 76, max: 100, name: 'Expert', badgeClass: 'tier-advanced' }
};

export function getTierForLevel(levelNum, lang = 'html') {
  if (lang === 'css') {
    if (levelNum >= 1 && levelNum <= 25) return { min: 1, max: 25, name: 'Beginner', badgeClass: 'tier-beginner' };
    if (levelNum >= 26 && levelNum <= 50) return { min: 26, max: 50, name: 'Intermediate', badgeClass: 'tier-intermediate' };
    if (levelNum >= 51 && levelNum <= 75) return { min: 51, max: 75, name: 'Advanced', badgeClass: 'tier-advanced' };
    return { min: 76, max: 100, name: 'Expert', badgeClass: 'tier-advanced' };
  }
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

// 100 Complete Real-World Topics for CSS
const CSS_TOPICS = [
  // Beginner (Levels 1-25)
  'Product Card Design', 'Color Palette and Background Styling', 'Typography and Text Hierarchy',
  'Margin, Padding and Spacing', 'CSS Box Model Layout', 'Borders and Rounded Corners',
  'Box Shadows and Visual Depth', 'Modern Button Design', 'Product Image Styling',
  'Flexbox Alignment', 'Flexbox Navigation Layout', 'CSS Grid Product Gallery',
  'Website Navigation Bar', 'Login Form Styling', 'User Profile Card',
  'Status Badges and Labels', 'Product Card Collection', 'Positioning and Overlays',
  'Interactive Hover Effects', 'Smooth CSS Transitions', 'Responsive Product Card',
  'Hero Section Design', 'Feature Cards Section', 'Pricing Card Design',
  'Complete Mini Landing Page',

  // Intermediate (Levels 26-50)
  'Advanced Flexbox Composition', 'Nested CSS Grid Dashboard', 'Responsive Navigation System',
  'E-Commerce Product Details Page', 'Shopping Cart Interface', 'Checkout Page Layout',
  'Search Bar and Filter Toolbar', 'Product Filter Sidebar', 'Signup Page Design',
  'Form Validation States', 'Data Table and Pagination', 'Admin Dashboard Layout',
  'Sidebar Navigation System', 'Analytics Statistics Cards', 'Chart Panel Styling',
  'Modal Dialog Design', 'Dropdown Menu Interface', 'Tabs and Accordion Components',
  'Toast Notification Design', 'Image Gallery Layout', 'Masonry Photo Gallery',
  'Blog Article Page', 'Testimonial Section', 'Product Comparison Table',
  'Responsive Pricing Plans',

  // Advanced (Levels 51-75)
  'CSS Custom Properties and Design Tokens', 'Light and Dark Theme System', 'Interactive Card States',
  'Accessible Focus Indicators', 'Complex Website Header', 'Multi-Column Editorial Layout',
  'Responsive Product Listing', 'Container Queries', 'Advanced CSS Grid Composition',
  'Stacking Context and Layer Management', 'Advanced CSS Pseudo-Classes', 'Pseudo-Elements for Decorations',
  'Layered Gradient Backgrounds', 'CSS Masks and Clipping', 'Decorative CSS Shapes',
  'Transform-Based UI Effects', 'Keyframe Animation Design', 'Motion Design System',
  'Scroll-Driven Visual Effects', 'Reduced-Motion Accessibility', 'Fluid Responsive Typography',
  'Fluid Spacing System', 'Reusable Responsive Components', 'Complex Analytics Dashboard',
  'Project Management Board UI',

  // Expert (Levels 76-100)
  'Advanced Responsive Dashboard', 'Enterprise Admin Workspace', 'SaaS Settings Interface',
  'Multi-Step Form Experience', 'Advanced Checkout Experience', 'Marketplace Homepage',
  'Advanced Product Comparison UI', 'Responsive Portfolio Website', 'Editorial Magazine Website',
  'Multi-Panel Workspace', 'Complex Data Table Interface', 'Advanced Search Results Page',
  'Notification Center Interface', 'Team Collaboration Dashboard', 'Responsive Learning Platform UI',
  'Travel Booking Interface', 'Finance Dashboard Styling', 'Healthcare Appointment Interface',
  'Restaurant Ordering Website', 'Real Estate Listing Interface', 'Advanced Component Variant System',
  'Scalable CSS Architecture', 'Multi-Page Website Styling', 'Complete Responsive E-Commerce Website',
  'CSS Capstone: Full Website Design System'
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
 * Builds the canonical metadata for any level in HTML, CSS (1-100), or JavaScript (1-70).
 */
export function getLevelMeta(language, levelNum) {
  const lang = (language || 'html').toLowerCase();
  const isCss = (lang === 'css');
  const maxLvl = isCss ? 100 : 70;
  const lvl = Math.max(1, Math.min(maxLvl, parseInt(levelNum, 10) || 1));
  const topics = TOPIC_MAP[lang] || HTML_TOPICS;
  const topicTitle = topics[lvl - 1] || `Level ${lvl} Progression`;
  const tier = getTierForLevel(lvl, lang);

  if (isCss) {
    const padded = String(lvl).padStart(3, '0');
    const id = `css-l${padded}-q001`;
    return {
      language: 'css',
      level: lvl,
      tier: tier.name,
      badgeClass: tier.badgeClass,
      title: topicTitle,
      description: `Master ${topicTitle} through this complete, practical CSS challenge.`,
      totalChallenges: 1,
      challenges: [
        {
          id,
          index: 1,
          challengeIndex: 1,
          level: lvl,
          language: 'css',
          title: topicTitle,
          difficulty: tier.name.toLowerCase(),
          status: 'ready',
          description: `Master ${topicTitle} (Challenge #1 of Level ${lvl}).`
        }
      ]
    };
  }

  // HTML and JS remain 30 challenges per level, 70 levels
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
 * Returns metadata summary for all levels of a specific language (100 for CSS, 70 for HTML/JS).
 */
export function getAllLevelsSummary(language) {
  const lang = (language || 'html').toLowerCase();
  const maxLvl = (lang === 'css') ? 100 : 70;
  const levels = [];
  for (let lvl = 1; lvl <= maxLvl; lvl++) {
    const meta = getLevelMeta(lang, lvl);
    levels.push({
      language: lang,
      level: lvl,
      tier: meta.tier,
      badgeClass: meta.badgeClass,
      title: meta.title,
      description: meta.description,
      totalChallenges: meta.totalChallenges
    });
  }
  return levels;
}
