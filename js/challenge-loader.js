/**
 * CodeReflex - Dynamic Modular Challenge Loader
 * Asynchronously loads level modules from data/challenges/{language}/ on demand,
 * with memory caching to avoid bundle bloat.
 */

import { getLevelMeta } from './level-metadata.js';
import { CHALLENGES as LEGACY_CHALLENGES } from './challenges.js';

const cache = new Map();

/**
 * Asynchronously loads the 30 challenges for a specific language and level.
 */
export async function loadLevelChallenges(language, levelNumber) {
  const lang = (language || 'html').toLowerCase();
  const lvl = parseInt(levelNumber, 10) || 1;
  const cacheKey = `${lang}-lvl-${lvl}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  // Generate canonical metadata slots
  const meta = getLevelMeta(lang, lvl);

  // Attempt dynamic import of modular authored data if present
  try {
    const mod = await import(`../data/challenges/${lang}/level-${lvl}.js`).catch(() => null);
    if (mod && Array.isArray(mod.CHALLENGES) && mod.CHALLENGES.length > 0) {
      // Merge authored content over slots
      const merged = meta.challenges.map((slot, idx) => {
        const authored = mod.CHALLENGES[idx];
        if (authored && authored.code) {
          return {
            ...slot,
            ...authored,
            status: 'ready'
          };
        }
        return slot;
      });
      const levelPayload = { ...meta, challenges: merged };
      cache.set(cacheKey, levelPayload);
      return levelPayload;
    }
  } catch {
    // Dynamic import failed, fallback to canonical slots
  }

  // Connect existing Level 1 prototype challenges if available
  if (lvl === 1) {
    if (lang === 'html') {
      const leg1 = LEGACY_CHALLENGES.find(c => c.id === 'level1-part1');
      if (leg1) {
        meta.challenges[0] = {
          ...meta.challenges[0],
          title: leg1.title,
          description: leg1.description,
          code: leg1.code,
          cssContext: leg1.cssContext,
          previewType: 'html',
          status: 'ready'
        };
      }
    } else if (lang === 'css') {
      const leg2 = LEGACY_CHALLENGES.find(c => c.id === 'level1-part2');
      if (leg2) {
        meta.challenges[0] = {
          ...meta.challenges[0],
          title: leg2.title,
          description: leg2.description,
          code: leg2.code,
          htmlContext: leg2.htmlContext,
          previewType: 'css',
          status: 'ready'
        };
      }
    } else if (lang === 'javascript') {
      const legJs = LEGACY_CHALLENGES.find(c => c.id === 'js-debounce');
      if (legJs) {
        meta.challenges[0] = {
          ...meta.challenges[0],
          title: legJs.title,
          description: legJs.description,
          code: legJs.code,
          previewType: legJs.previewType,
          previewContent: legJs.previewContent,
          status: 'ready'
        };
      }
    }
  }

  cache.set(cacheKey, meta);
  return meta;
}

/**
 * Resolves a challenge by ID across legacy challenges and the multi-level registry.
 */
export async function getChallengeByIdAsync(challengeId) {
  if (!challengeId) return null;

  // 1. Check legacy challenges
  const legacy = LEGACY_CHALLENGES.find(c => c.id === challengeId);
  if (legacy) return legacy;

  // 2. Parse challenge ID format: {lang}-l{lvl}-c{ch} or {lang}-l{lvl}-q{ch} (e.g. css-l001-q001)
  const match = challengeId.match(/^([a-z]+)-l(\d+)-(?:c|q)(\d+)$/i);
  if (match) {
    const [, lang, lvlStr, chStr] = match;
    const lvl = parseInt(lvlStr, 10);
    const ch = parseInt(chStr, 10);
    const levelData = await loadLevelChallenges(lang, lvl);
    const challenge = levelData.challenges.find(c => c.index === ch || c.id === challengeId || (lang.toLowerCase() === 'css' && ch === 1));
    if (challenge) return challenge;
  }

  return null;
}

if (typeof window !== 'undefined') {
  window.loadLevelChallenges = loadLevelChallenges;
}

