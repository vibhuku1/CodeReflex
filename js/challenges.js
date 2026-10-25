/**
 * CodeReflex - Curated Practice Challenges
 * Categorized by Practice Mode, Language, and Difficulty
 */

export const CHALLENGES = [
  // ==========================================
  // MODE: CODE TYPING (Mode B)
  // ==========================================

  // --- JavaScript ---
  {
    id: 'js-debounce',
    mode: 'code',
    language: 'javascript',
    title: 'Debounce Utility',
    difficulty: 'beginner',
    description: 'A classic frontend performance utility that delays function execution until user activity stops.',
    expectedOutput: `// Simulated Execution:
const logSearch = debounce((q) => console.log('Searching:', q), 300);
logSearch('a');
logSearch('ap');
logSearch('apple'); // only 'apple' runs after 300ms
> "Searching: apple"`,
    previewType: 'console',
    previewContent: {
      type: 'javascript',
      tests: [
        { label: 'Returns a debounced function wrapper', passed: true },
        { label: 'Clears previous timer on successive calls', passed: true },
        { label: 'Applies original arguments and execution context', passed: true }
      ],
      terminalLines: [
        { type: 'input', text: 'node utils/debounce.test.js' },
        { type: 'info', text: '[INFO] Initializing timer debounce benchmark...' },
        { type: 'success', text: 'PASS test/debounce: 3 calls coalesced into 1 execution (elapsed: 302ms)' },
        { type: 'output', text: 'Output: -> "Searching: apple"' }
      ]
    },
    code: `function debounce(fn, delay) {
  let timerId = null;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}`
  },
  {
    id: 'js-fetch-retry',
    mode: 'code',
    language: 'javascript',
    title: 'Fetch with Exponential Backoff',
    difficulty: 'intermediate',
    description: 'Resilient network requests with automatic retries and exponential delay.',
    expectedOutput: `// Simulated Execution:
fetchWithRetry('https://api.github.com/rate_limit', 3);
> Attempt 1 failed (503 Service Unavailable)
> Retrying in 1000ms...
> Attempt 2 succeeded: 200 OK`,
    previewType: 'console',
    previewContent: {
      type: 'javascript',
      tests: [
        { label: 'Resolves on first successful HTTP response', passed: true },
        { label: 'Exponentially scales delay between retry attempts', passed: true },
        { label: 'Throws comprehensive error when all retries are exhausted', passed: true }
      ],
      terminalLines: [
        { type: 'input', text: 'node network/retry.js' },
        { type: 'warn', text: '[WARN] Request attempt 1 failed with status 503' },
        { type: 'info', text: '[INFO] Retrying after backoff 1000ms...' },
        { type: 'success', text: '✓ Request succeeded on attempt 2 (status 200)' }
      ]
    },
    code: `async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      return await response.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, delay * Math.pow(2, attempt - 1)));
    }
  }
}`
  },
  {
    id: 'js-event-emitter',
    mode: 'code',
    language: 'javascript',
    title: 'Custom Event Emitter',
    difficulty: 'intermediate',
    description: 'Pub/sub event bus pattern implementation with event registration and cleanup.',
    expectedOutput: `// Simulated Execution:
const bus = new EventEmitter();
const unsub = bus.on('data', payload => console.log(payload));
bus.emit('data', { id: 42 }); // Logs: { id: 42 }
unsub(); // listener removed`,
    previewType: 'console',
    previewContent: {
      type: 'javascript',
      tests: [
        { label: 'Registers multiple listeners per event namespace', passed: true },
        { label: 'Dispatches arguments correctly across all callbacks', passed: true },
        { label: 'Returns cleanup unbind function to prevent memory leaks', passed: true }
      ],
      terminalLines: [
        { type: 'input', text: 'node test/event-emitter.js' },
        { type: 'success', text: '✓ Created EventEmitter instance with Map registry' },
        { type: 'output', text: 'Event "sync:state" dispatched to 2 active subscribers' },
        { type: 'success', text: '✓ Cleanup callback successfully removed listener' }
      ]
    },
    code: `class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
    return () => this.events.get(event).delete(listener);
  }
  emit(event, ...data) {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(fn => fn(...data));
    }
  }
}`
  },

  // --- Python ---
  {
    id: 'py-group-by',
    mode: 'code',
    language: 'python',
    title: 'Group By Frequency',
    difficulty: 'beginner',
    description: 'Count frequencies and group elements using standard Python dictionaries and list comprehensions.',
    expectedOutput: `>>> count_frequencies(["apple", "banana", "apple", "cherry"])
{'apple': 2, 'banana': 1, 'cherry': 1}
>>> sorted_by_count({'apple': 2, 'banana': 1, 'cherry': 1})
[('apple', 2), ('banana', 1), ('cherry', 1)]`,
    previewType: 'terminal',
    previewContent: {
      type: 'python',
      terminalLines: [
        { type: 'input', text: 'python3 -m unittest test_frequency.py' },
        { type: 'info', text: 'Testing count_frequencies with 10,000 random tokens...' },
        { type: 'success', text: 'Ran 3 tests in 0.008s - OK' },
        { type: 'output', text: "Result: [('apple', 2), ('banana', 1), ('cherry', 1)]" }
      ]
    },
    code: `def count_frequencies(items: list[str]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for item in items:
        counts[item] = counts.get(item, 0) + 1
    return dict(sorted(counts.items(), key=lambda pair: pair[1], reverse=True))`
  },
  {
    id: 'py-binary-search',
    mode: 'code',
    language: 'python',
    title: 'Binary Search Algorithm',
    difficulty: 'intermediate',
    description: 'Logarithmic search over a sorted list with strict boundaries and type hints.',
    expectedOutput: `>>> binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23)
5
>>> binary_search([2, 5, 8, 12, 16], 99)
-1`,
    previewType: 'terminal',
    previewContent: {
      type: 'python',
      terminalLines: [
        { type: 'input', text: 'python3 -c "import algorithms; print(algorithms.benchmark())"' },
        { type: 'info', text: 'Array size: N = 1,000,000 items (sorted integer keys)' },
        { type: 'success', text: '✓ Target index found at step 19 (O(log N) efficiency)' },
        { type: 'output', text: 'Return: index = 524288 in 0.04ms' }
      ]
    },
    code: `def binary_search(arr: list[int], target: int) -> int:
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`
  },
  {
    id: 'py-lru-cache',
    mode: 'code',
    language: 'python',
    title: 'LRU Cache with OrderedDict',
    difficulty: 'intermediate',
    description: 'Least Recently Used cache eviction structure preserving access order.',
    expectedOutput: `>>> cache = LRUCache(2)
>>> cache.put("a", 1); cache.put("b", 2)
>>> cache.get("a") # returns 1, marks "a" as recently used
>>> cache.put("c", 3) # evicts "b"
>>> cache.get("b") # returns None`,
    previewType: 'terminal',
    previewContent: {
      type: 'python',
      terminalLines: [
        { type: 'input', text: 'python3 -m pytest tests/test_lru.py -v' },
        { type: 'success', text: 'tests/test_lru.py::test_capacity PASSED [33%]' },
        { type: 'success', text: 'tests/test_lru.py::test_eviction_order PASSED [66%]' },
        { type: 'success', text: 'tests/test_lru.py::test_get_updates_recency PASSED [100%]' },
        { type: 'output', text: '3 passed in 0.02s' }
      ]
    },
    code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.store = OrderedDict()

    def get(self, key: str):
        if key not in self.store:
            return None
        self.store.move_to_end(key)
        return self.store[key]

    def put(self, key: str, value: any) -> None:
        if key in self.store:
            self.store.move_to_end(key)
        self.store[key] = value
        if len(self.store) > self.capacity:
            self.store.popitem(last=False)`
  },

  // --- HTML ---
  {
    id: 'html-modal',
    mode: 'code',
    language: 'html',
    title: 'Accessible Native Dialog',
    difficulty: 'beginner',
    description: 'Semantic HTML5 dialog element with header, body content, and action controls.',
    expectedOutput: 'Renders an accessible modal dialog with backdrop and actions.',
    previewType: 'html',
    cssContext: `
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f141c; color: #e2e8f0; padding: 24px; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
      dialog { background: #161d27; color: #e2e8f0; border: 1px solid #2a3442; border-radius: 12px; padding: 24px; max-width: 420px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); display: block; position: static; }
      .dialog-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
      .dialog-header h3 { margin: 0; font-size: 1.1rem; color: #f8fafc; font-weight: 600; }
      p { color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin: 0 0 20px 0; }
      .dialog-actions { display: flex; justify-content: flex-end; gap: 10px; }
      button { padding: 8px 16px; border-radius: 6px; font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all 0.15s; }
      .btn-cancel { background: transparent; border: 1px solid #334155; color: #cbd5e1; }
      .btn-primary { background: #3b82f6; border: 1px solid #2563eb; color: #ffffff; }
    `,
    code: `<dialog id="confirm-modal" class="modal">
  <div class="dialog-header">
    <h3>Discard Changes?</h3>
  </div>
  <p>Any unsaved progress will be permanently lost.</p>
  <div class="dialog-actions">
    <button type="button" class="btn-cancel">Cancel</button>
    <button type="button" class="btn-primary">Confirm</button>
  </div>
</dialog>`
  },

  // --- CSS ---
  {
    id: 'css-badge',
    mode: 'code',
    language: 'css',
    title: 'Neon Status Badge',
    difficulty: 'beginner',
    description: 'Modern pill badge with glowing indicator dot and smooth transitions.',
    expectedOutput: 'Renders a stylish pulse badge component with glowing dot.',
    previewType: 'css',
    htmlContext: `
      <div style="display:flex; justify-content:center; align-items:center; height:100vh; background:#0b0f17; font-family:system-ui, sans-serif;">
        <span class="badge">
          <span class="dot"></span>
          Production Live
        </span>
      </div>
    `,
    code: `.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
.badge .dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10b981;
}`
  },

  // ==========================================
  // MODE: TYPE-TO-BUILD (Mode C)
  // Components rendered live as user types!
  // ==========================================
  {
    id: 'build-product-card',
    mode: 'build',
    language: 'html',
    title: 'Reflex Metric Card',
    difficulty: 'intermediate',
    description: 'Build a modern SaaS statistics card with positive growth telemetry.',
    previewType: 'live-component',
    targetTitle: 'Realtime Telemetry Card',
    baseStyles: `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: #090d14;
        color: #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 20px;
      }
      .card {
        background: #111723;
        border: 1px solid #1e293b;
        border-radius: 14px;
        padding: 24px;
        width: 100%;
        max-width: 320px;
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
        transition: transform 0.2s ease, border-color 0.2s ease;
      }
      .card:hover {
        border-color: #334155;
        transform: translateY(-2px);
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      .label {
        font-size: 13px;
        color: #94a3b8;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        font-size: 12px;
        font-weight: 600;
        color: #34d399;
        background: rgba(16, 185, 129, 0.12);
        padding: 3px 8px;
        border-radius: 999px;
      }
      .value {
        font-size: 32px;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: -0.02em;
        margin-bottom: 8px;
      }
      .footer-text {
        font-size: 12px;
        color: #64748b;
      }
    `,
    code: `<div class="card">
  <div class="card-header">
    <span class="label">Monthly Revenue</span>
    <span class="pill">+18.4%</span>
  </div>
  <div class="value">$48,290</div>
  <div class="footer-text">Compared to $40,780 last cycle</div>
</div>`
  },
  {
    id: 'build-developer-navbar',
    mode: 'build',
    language: 'html',
    title: 'Developer Glass Navbar',
    difficulty: 'intermediate',
    description: 'Build a sleek top navigation header featuring brand logo, menu items, and shortcut key.',
    previewType: 'live-component',
    targetTitle: 'Glassmorphic Top Navigation',
    baseStyles: `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: #090d14;
        color: #e2e8f0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 24px;
      }
      .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 480px;
        padding: 10px 18px;
        background: rgba(17, 24, 39, 0.85);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 700;
        font-size: 14px;
        color: #f8fafc;
      }
      .brand-icon {
        width: 18px;
        height: 18px;
        border-radius: 4px;
        background: #3b82f6;
      }
      .nav-links {
        display: flex;
        gap: 16px;
      }
      .nav-link {
        color: #94a3b8;
        font-size: 13px;
        text-decoration: none;
        transition: color 0.15s;
      }
      .nav-link:hover {
        color: #ffffff;
      }
      .shortcut {
        background: #1f2937;
        border: 1px solid #374151;
        padding: 2px 7px;
        border-radius: 5px;
        font-size: 11px;
        color: #cbd5e1;
        font-family: monospace;
      }
    `,
    code: `<nav class="navbar">
  <div class="brand">
    <div class="brand-icon"></div>
    <span>CodeReflex</span>
  </div>
  <div class="nav-links">
    <a href="#" class="nav-link">Practice</a>
    <a href="#" class="nav-link">Stats</a>
  </div>
  <span class="shortcut">⌘K</span>
</nav>`
  },
  {
    id: 'build-toast-notification',
    mode: 'build',
    language: 'html',
    title: 'Deploy Toast Notification',
    difficulty: 'intermediate',
    description: 'Build a compact deploy notification toast with animated progress indicator.',
    previewType: 'live-component',
    targetTitle: 'Realtime Deployment Toast',
    baseStyles: `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: #090d14;
        color: #e2e8f0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
      }
      .toast {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #111726;
        border: 1px solid #1e293b;
        border-left: 3px solid #10b981;
        padding: 14px 18px;
        border-radius: 10px;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
        width: 100%;
        max-width: 380px;
      }
      .toast-icon {
        width: 10px;
        height: 10px;
        background: #10b981;
        border-radius: 50%;
        box-shadow: 0 0 8px #10b981;
      }
      .toast-body {
        flex: 1;
      }
      .toast-title {
        font-size: 13px;
        font-weight: 600;
        color: #f8fafc;
      }
      .toast-desc {
        font-size: 12px;
        color: #94a3b8;
        margin-top: 2px;
      }
      .toast-btn {
        background: #1e293b;
        border: 1px solid #334155;
        color: #cbd5e1;
        font-size: 12px;
        font-weight: 500;
        padding: 5px 10px;
        border-radius: 6px;
        cursor: pointer;
      }
    `,
    code: `<div class="toast">
  <div class="toast-icon"></div>
  <div class="toast-body">
    <div class="toast-title">Deploy Successful</div>
    <div class="toast-desc">production-edge deployed in 1.4s</div>
  </div>
  <button type="button" class="toast-btn">Logs</button>
</div>`
  },

  // ==========================================
  // MODE: NORMAL TYPING (Mode A)
  // Technical prose & concepts for baseline speed
  // ==========================================
  {
    id: 'prose-clean-code',
    mode: 'normal',
    language: 'text',
    title: 'Readable Architecture',
    difficulty: 'beginner',
    description: 'Technical prose on clarity and software design principles.',
    previewType: 'reading',
    previewContent: {
      category: 'Software Craftsmanship',
      source: 'Engineering Principles Handbook',
      readingTime: '1 min',
      concepts: ['Readability', 'Maintainability', 'Simplicity']
    },
    code: `Clean code reads like well-written prose. It never obscures the designer's intent but rather is full of crisp abstractions and straightforward lines of control.`
  },
  {
    id: 'prose-unix-philosophy',
    mode: 'normal',
    language: 'text',
    title: 'The Unix Philosophy',
    difficulty: 'intermediate',
    description: 'Core tenets of composability and modular software tools.',
    previewType: 'reading',
    previewContent: {
      category: 'Systems Architecture',
      source: 'M. D. McIlroy (Bell Labs)',
      readingTime: '1 min',
      concepts: ['Composability', 'Pipes', 'Standard Interfaces']
    },
    code: `Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface.`
  },
  {
    id: 'prose-latency-numbers',
    mode: 'normal',
    language: 'text',
    title: 'Latency Numbers Every Dev Should Know',
    difficulty: 'intermediate',
    description: 'Hardware latency hierarchy and engineering intuitions.',
    previewType: 'reading',
    previewContent: {
      category: 'Computer Systems',
      source: 'Jeff Dean, Google Fellow',
      readingTime: '1 min',
      concepts: ['L1 Cache', 'DRAM', 'SSD', 'Network RTT']
    },
    code: `L1 cache reference takes half a nanosecond. Main memory lookup takes one hundred nanoseconds. Reading from solid state drive takes one hundred microseconds.`
  }
];

export function getChallengesByFilter(mode, language = null) {
  return CHALLENGES.filter(c => {
    if (mode && c.mode !== mode) return false;
    if (language && language !== 'all' && c.language !== language) return false;
    return true;
  });
}

export function getChallengeById(id) {
  return CHALLENGES.find(c => c.id === id) || CHALLENGES[0];
}

