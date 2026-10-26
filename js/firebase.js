/**
 * CodeReflex - Firebase Service Layer
 * Manages Google Sign-In with Firebase Authentication and
 * persistent user profiles & typing telemetry in Cloud Firestore.
 */

import { firebaseConfig, isFirebaseConfigured } from './firebase-config.js';
export { isFirebaseConfigured, firebaseConfig };

const CDN_BASE = 'https://www.gstatic.com/firebasejs/10.12.0';

let appInstance = null;
let authInstance = null;
let dbInstance = null;
let googleProviderInstance = null;
let sdkModules = null;
let initPromise = null;

/**
 * Initializes and returns the Firebase SDK instances.
 * Loads modules dynamically to preserve lightweight client startup.
 */
export async function getFirebaseServices() {
  if (!isFirebaseConfigured()) {
    return {
      configured: false,
      error: 'Firebase is not yet configured. Please add your credentials in js/firebase-config.js.'
    };
  }

  if (appInstance && authInstance && dbInstance) {
    return {
      configured: true,
      app: appInstance,
      auth: authInstance,
      db: dbInstance,
      googleProvider: googleProviderInstance,
      modules: sdkModules
    };
  }

  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const [appMod, authMod, firestoreMod] = await Promise.all([
        import(`${CDN_BASE}/firebase-app.js`),
        import(`${CDN_BASE}/firebase-auth.js`),
        import(`${CDN_BASE}/firebase-firestore.js`)
      ]);

      appInstance = appMod.initializeApp(firebaseConfig);
      authInstance = authMod.getAuth(appInstance);
      dbInstance = firestoreMod.getFirestore(appInstance);

      if (authMod.browserSessionPersistence && authMod.setPersistence) {
        await authMod.setPersistence(authInstance, authMod.browserSessionPersistence).catch(() => {});
      }

      googleProviderInstance = new authMod.GoogleAuthProvider();
      googleProviderInstance.setCustomParameters({ prompt: 'select_account' });

      sdkModules = {
        ...authMod,
        ...firestoreMod
      };

      return {
        configured: true,
        app: appInstance,
        auth: authInstance,
        db: dbInstance,
        googleProvider: googleProviderInstance,
        modules: sdkModules
      };
    } catch (err) {
      console.error('Failed to initialize Firebase SDK:', err);
      return { configured: false, error: err.message };
    }
  })();

  return initPromise;
}

/**
 * Initiates Google Sign-In with popup.
 * Creates or updates the user profile document in Firestore upon success.
 */
export async function signInWithGoogle() {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      code: 'unconfigured',
      message: 'Firebase configuration required. Please enter your web app credentials in js/firebase-config.js.'
    };
  }

  const services = await getFirebaseServices();
  if (!services.configured) {
    return {
      success: false,
      code: 'init-failed',
      message: services.error || 'Failed to initialize Firebase.'
    };
  }

  const { auth, googleProvider, modules } = services;

  try {
    const result = await modules.signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Create or sync user profile document in Firestore asynchronously without blocking return
    syncUserProfile(user).catch(profileErr => {
      console.warn('Background Firestore profile sync notice:', profileErr);
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || null
      }
    };
  } catch (err) {
    console.warn('[CodeReflex Auth] Google Sign-In error code:', err.code, 'message:', err.message);

    // Map common Firebase auth error codes to actionable messages
    let friendlyMessage = 'Authentication failed. Please try again.';
    if (err.code === 'auth/popup-closed-by-user') {
      friendlyMessage = 'Google sign-in popup was closed before completing.';
    } else if (err.code === 'auth/cancelled-popup-request') {
      friendlyMessage = 'Previous sign-in attempt was cancelled.';
    } else if (err.code === 'auth/popup-blocked') {
      friendlyMessage = 'Popup was blocked by your browser. Please allow popups or use Redirect Sign-In.';
    } else if (err.code === 'auth/unauthorized-domain') {
      const host = typeof window !== 'undefined' ? window.location.hostname : 'current domain';
      friendlyMessage = `This domain (${host}) is not authorized in Firebase Console > Authentication > Settings > Authorized Domains.`;
    } else if (err.code === 'auth/network-request-failed') {
      friendlyMessage = 'Network error. Please check your internet connection and try again.';
    } else if (err.message) {
      friendlyMessage = err.message;
    }

    return {
      success: false,
      code: err.code || 'unknown',
      message: friendlyMessage,
      rawError: err
    };
  }
}

/**
 * Initiates Google Sign-In with browser redirect (fallback when popup is blocked).
 */
export async function signInWithGoogleRedirect() {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      code: 'unconfigured',
      message: 'Firebase configuration required. Please enter your credentials in js/firebase-config.js.'
    };
  }

  const services = await getFirebaseServices();
  if (!services.configured || !services.auth) {
    return {
      success: false,
      code: 'init-failed',
      message: services.error || 'Failed to initialize Firebase.'
    };
  }

  const { auth, googleProvider, modules } = services;
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('codereflex_auth_redirect_active', '1');
    }
    await modules.signInWithRedirect(auth, googleProvider);
    return { success: true };
  } catch (err) {
    console.error('[CodeReflex Auth] Google Redirect error:', err.code, err.message);
    return {
      success: false,
      code: err.code || 'unknown',
      message: err.message
    };
  }
}

/**
 * Checks for a pending redirect sign-in result on page load.
 */
export async function checkRedirectResult() {
  if (!isFirebaseConfigured()) return null;
  if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem('codereflex_auth_redirect_active')) {
    return null;
  }

  const services = await getFirebaseServices();
  if (!services.configured || !services.auth || !services.modules || !services.modules.getRedirectResult) {
    return null;
  }

  try {
    const cred = await services.modules.getRedirectResult(services.auth);
    if (cred && cred.user) {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('codereflex_auth_redirect_active');
      }
      syncUserProfile(cred.user).catch(() => {});
      return {
        success: true,
        user: {
          uid: cred.user.uid,
          displayName: cred.user.displayName || cred.user.email.split('@')[0],
          email: cred.user.email,
          photoURL: cred.user.photoURL || null
        }
      };
    }
  } catch (err) {
    console.warn('[CodeReflex Auth] Redirect result notice:', err.code, err.message);
    return {
      success: false,
      code: err.code || 'unknown',
      message: err.message
    };
  }
  return null;
}

/**
 * Signs in with Email and Password using Firebase Authentication.
 */
export async function signInWithEmail(email, password) {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      code: 'unconfigured',
      message: 'Firebase configuration required. Please enter your credentials in js/firebase-config.js.'
    };
  }

  const services = await getFirebaseServices();
  if (!services.configured || !services.auth) {
    return {
      success: false,
      code: 'init-failed',
      message: services.error || 'Failed to initialize Firebase.'
    };
  }

  const { auth, modules } = services;

  try {
    const cred = await modules.signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    // Sync profile in background without blocking authentication return
    syncUserProfile(user).catch(profileErr => {
      console.warn('Background Firestore profile sync notice:', profileErr);
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || null
      }
    };
  } catch (err) {
    console.warn('Email sign-in error:', err.code, err.message);
    let msg = 'Authentication failed. Please check your credentials.';
    if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
      msg = 'Incorrect email or password.';
    } else if (err.code === 'auth/user-not-found') {
      msg = 'No registered developer account found with this email.';
    } else if (err.code === 'auth/invalid-email') {
      msg = 'Please enter a valid email address.';
    } else if (err.code === 'auth/too-many-requests') {
      msg = 'Access temporarily disabled due to many failed attempts. Try again later.';
    } else if (err.message) {
      msg = err.message;
    }

    return {
      success: false,
      code: err.code || 'unknown',
      message: msg
    };
  }
}

/**
 * Creates a new user with Email and Password using Firebase Authentication.
 * Sets the display name and initializes their user profile in Firestore.
 */
export async function signUpWithEmail(email, password, displayName = '') {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      code: 'unconfigured',
      message: 'Firebase configuration required. Please enter your credentials in js/firebase-config.js.'
    };
  }

  const services = await getFirebaseServices();
  if (!services.configured || !services.auth) {
    return {
      success: false,
      code: 'init-failed',
      message: services.error || 'Failed to initialize Firebase.'
    };
  }

  const { auth, modules } = services;

  try {
    const cred = await modules.createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    const trimmedName = (displayName || '').trim();
    if (trimmedName && modules.updateProfile) {
      modules.updateProfile(user, { displayName: trimmedName }).catch(profileErr => {
        console.warn('Could not update display name on user:', profileErr);
      });
    }

    const effectiveName = trimmedName || user.displayName || email.split('@')[0];

    // Sync profile in background without blocking authentication return
    syncUserProfile({
      uid: user.uid,
      displayName: effectiveName,
      email: user.email,
      photoURL: user.photoURL || null
    }).catch(profileErr => {
      console.warn('Background Firestore profile sync notice:', profileErr);
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        displayName: effectiveName,
        email: user.email,
        photoURL: user.photoURL || null
      }
    };
  } catch (err) {
    console.warn('Email sign-up error:', err.code, err.message);
    let msg = 'Failed to create account. Please try again.';
    if (err.code === 'auth/email-already-in-use') {
      msg = 'An account with this email address already exists. Please sign in instead.';
    } else if (err.code === 'auth/weak-password') {
      msg = 'Password is too weak. Please use at least 8 characters with letters and numbers.';
    } else if (err.code === 'auth/invalid-email') {
      msg = 'Please enter a valid email address.';
    } else if (err.code === 'auth/operation-not-allowed') {
      msg = 'Email/Password sign-in is not enabled in Firebase Console. Please enable it in Authentication > Sign-in method.';
    } else if (err.code === 'auth/network-request-failed') {
      msg = 'Network error. Please check your internet connection.';
    } else if (err.message) {
      msg = err.message;
    }

    return {
      success: false,
      code: err.code || 'unknown',
      message: msg
    };
  }
}

/**
 * Sends a password reset email using Firebase Authentication.
 */
export async function sendPasswordReset(email) {
  if (!email) {
    return { success: false, message: 'Please enter your email address first.' };
  }

  if (!isFirebaseConfigured()) {
    return {
      success: false,
      code: 'unconfigured',
      message: 'Firebase configuration required. Configure Firebase to enable password reset.'
    };
  }

  const services = await getFirebaseServices();
  if (!services.configured || !services.auth) {
    return { success: false, message: services.error || 'Firebase not initialized.' };
  }

  try {
    await services.modules.sendPasswordResetEmail(services.auth, email);
    return {
      success: true,
      message: `Password reset email sent to ${email}. Please check your inbox.`
    };
  } catch (err) {
    let msg = 'Failed to send password reset email.';
    if (err.code === 'auth/user-not-found') {
      msg = 'No account found with this email address.';
    } else if (err.code === 'auth/invalid-email') {
      msg = 'Please enter a valid email address.';
    } else if (err.message) {
      msg = err.message;
    }
    return {
      success: false,
      code: err.code,
      message: msg
    };
  }
}

/**
 * Facebook Sign-In handler with provider status verification.
 */
export async function signInWithFacebook() {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      code: 'unconfigured',
      message: 'Firebase is not yet configured. Please add your credentials in js/firebase-config.js and enable Facebook in the Firebase Console.'
    };
  }

  const services = await getFirebaseServices();
  if (!services.configured) {
    return { success: false, message: services.error };
  }

  try {
    const provider = new services.modules.FacebookAuthProvider();
    const result = await services.modules.signInWithPopup(services.auth, provider);
    const user = result.user;
    const profile = await syncUserProfile(user);
    return {
      success: true,
      user: {
        uid: user.uid,
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || null
      },
      profile
    };
  } catch (err) {
    let msg = 'Facebook Sign-In is not enabled. Please enable Facebook in Firebase Console > Authentication > Sign-in method.';
    if (err.code === 'auth/popup-closed-by-user') {
      msg = 'Facebook sign-in was cancelled.';
    } else if (err.code !== 'auth/operation-not-allowed' && err.message) {
      msg = err.message;
    }
    return {
      success: false,
      code: err.code || 'provider-not-enabled',
      message: msg
    };
  }
}

/**
 * Apple Sign-In handler with provider status verification.
 */
export async function signInWithApple() {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      code: 'unconfigured',
      message: 'Firebase is not yet configured. Please add your credentials in js/firebase-config.js and enable Apple in the Firebase Console.'
    };
  }

  const services = await getFirebaseServices();
  if (!services.configured) {
    return { success: false, message: services.error };
  }

  try {
    const provider = new services.modules.OAuthProvider('apple.com');
    const result = await services.modules.signInWithPopup(services.auth, provider);
    const user = result.user;
    const profile = await syncUserProfile(user);
    return {
      success: true,
      user: {
        uid: user.uid,
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || null
      },
      profile
    };
  } catch (err) {
    let msg = 'Apple Sign-In is not enabled. Please configure Apple in Firebase Console > Authentication > Sign-in method.';
    if (err.code === 'auth/popup-closed-by-user') {
      msg = 'Apple sign-in was cancelled.';
    } else if (err.code !== 'auth/operation-not-allowed' && err.message) {
      msg = err.message;
    }
    return {
      success: false,
      code: err.code || 'provider-not-enabled',
      message: msg
    };
  }
}

/**
 * Signs the user out of Firebase.
 */
export async function signOutUser() {
  const services = await getFirebaseServices();
  if (!services.configured || !services.auth) {
    return { success: true };
  }

  try {
    await services.modules.signOut(services.auth);
    return { success: true };
  } catch (err) {
    console.warn('Firebase signOut error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Subscribes to Firebase Authentication state changes.
 * Automatically triggers callback with user data or null.
 */
export async function subscribeToAuth(callback) {
  if (!isFirebaseConfigured()) {
    callback(null);
    return () => {};
  }

  const services = await getFirebaseServices();
  if (!services.configured || !services.auth) {
    callback(null);
    return () => {};
  }

  return services.modules.onAuthStateChanged(services.auth, async (firebaseUser) => {
    if (firebaseUser) {
      const user = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || null
      };
      callback(user);
    } else {
      callback(null);
    }
  });
}

/**
 * Creates or updates the user profile document in Cloud Firestore: users/{uid}
 * Preserves existing progress metrics and timestamps.
 */
export async function syncUserProfile(user) {
  const services = await getFirebaseServices();
  if (!services.configured || !services.db) return null;

  const { db, modules } = services;
  const userRef = modules.doc(db, 'users', user.uid);

  try {
    const fetchWithTimeout = new Promise((resolve) => {
      const timer = setTimeout(() => resolve(null), 3500);
      modules.getDoc(userRef).then(snap => {
        clearTimeout(timer);
        resolve(snap);
      }).catch(err => {
        clearTimeout(timer);
        console.warn('[CodeReflex Firestore] syncUserProfile getDoc notice:', err.code || err.message);
        resolve(null);
      });
    });

    const docSnap = await fetchWithTimeout;
    const isNew = !docSnap || !docSnap.exists();
    const existingData = isNew ? {} : docSnap.data();

    const profileData = {
      displayName: user.displayName || user.email.split('@')[0],
      email: user.email,
      photoURL: user.photoURL || null,
      lastLoginAt: modules.serverTimestamp ? modules.serverTimestamp() : new Date().toISOString(),
      updatedAt: modules.serverTimestamp ? modules.serverTimestamp() : new Date().toISOString(),
      // Preserve existing or initialize defaults
      bestWpm: existingData.bestWpm !== undefined ? existingData.bestWpm : 0,
      averageAccuracy: existingData.averageAccuracy !== undefined ? existingData.averageAccuracy : 100,
      completedChallenges: existingData.completedChallenges !== undefined ? existingData.completedChallenges : 0,
      currentLevel: existingData.currentLevel !== undefined ? existingData.currentLevel : 1,
      currentPart: existingData.currentPart !== undefined ? existingData.currentPart : 1
    };

    if (isNew) {
      profileData.createdAt = modules.serverTimestamp ? modules.serverTimestamp() : new Date().toISOString();
    }

    await modules.setDoc(userRef, profileData, { merge: true }).catch(err => {
      console.warn('[CodeReflex Firestore] Background profile save warning:', err.code || err.message);
    });

    return { ...existingData, ...profileData };
  } catch (err) {
    console.warn('[CodeReflex Firestore] Profile sync error:', err.code || err.message, err);
    return null;
  }
}

/**
 * Saves a completed challenge session, level progression, and leaderboard metrics to Firestore.
 */
export async function saveUserProgress(uid, sessionData, levelProgress = null, progressionV2 = null) {
  if (!uid || !isFirebaseConfigured()) return { success: false, reason: 'unconfigured_or_no_uid' };

  const services = await getFirebaseServices();
  if (!services.configured || !services.db) return { success: false, reason: 'services_unavailable' };

  const { db, modules } = services;
  const userRef = modules.doc(db, 'users', uid);

  // Handle argument flexibility (if progressionV2 was passed in 3rd position)
  let actualLevelProgress = levelProgress;
  let actualProgressionV2 = progressionV2;
  if (levelProgress && levelProgress.languages && !progressionV2) {
    actualProgressionV2 = levelProgress;
    actualLevelProgress = null;
  }

  try {
    // 1. Fetch current user metrics with timeout
    const fetchWithTimeout = new Promise((resolve) => {
      const timer = setTimeout(() => resolve(null), 3500);
      modules.getDoc(userRef).then(snap => {
        clearTimeout(timer);
        resolve(snap);
      }).catch(err => {
        clearTimeout(timer);
        console.warn('[CodeReflex Firestore] saveUserProgress fetch notice:', err.code || err.message);
        resolve(null);
      });
    });

    const docSnap = await fetchWithTimeout;
    const currentData = (docSnap && docSnap.exists()) ? docSnap.data() : {};

    const prevBestWpm = currentData.bestWpm || 0;
    const newBestWpm = Math.max(prevBestWpm, sessionData.wpm || 0);
    const prevCompleted = currentData.completedChallenges || 0;
    const newCompleted = prevCompleted + 1;

    // Running average accuracy
    const prevAvgAcc = currentData.averageAccuracy || 100;
    const newAvgAcc = Math.round(((prevAvgAcc * prevCompleted) + (sessionData.accuracy || 100)) / newCompleted);

    const unlockedPart = (actualLevelProgress && actualLevelProgress.level1 && actualLevelProgress.level1.unlockedPart)
      ? actualLevelProgress.level1.unlockedPart
      : (currentData.currentPart || 1);

    // Resolve user identifiers for profile & leaderboard
    const authUser = services.auth?.currentUser;
    const userEmail = currentData.email || authUser?.email || '';
    const userDisplayName = currentData.displayName || authUser?.displayName || (userEmail ? userEmail.split('@')[0] : 'Coder');
    const userPhotoURL = currentData.photoURL !== undefined ? currentData.photoURL : (authUser?.photoURL || null);

    const profilePayload = {
      displayName: userDisplayName,
      email: userEmail,
      photoURL: userPhotoURL,
      bestWpm: newBestWpm,
      averageAccuracy: newAvgAcc,
      completedChallenges: newCompleted,
      currentLevel: 1,
      currentPart: unlockedPart,
      updatedAt: modules.serverTimestamp ? modules.serverTimestamp() : new Date().toISOString()
    };

    if (!docSnap || !docSnap.exists()) {
      profilePayload.createdAt = modules.serverTimestamp ? modules.serverTimestamp() : new Date().toISOString();
      profilePayload.lastLoginAt = profilePayload.createdAt;
    }

    const writeTasks = [];

    // Task 1: Update main user document
    writeTasks.push(modules.setDoc(userRef, profilePayload, { merge: true }));

    // Task 2: Write session telemetry to users/{uid}/history/{sessionId}
    const sessionRef = modules.doc(db, 'users', uid, 'history', sessionData.id || `sess_${Date.now()}`);
    writeTasks.push(modules.setDoc(sessionRef, {
      challengeId: sessionData.challengeId,
      title: sessionData.title,
      language: sessionData.language,
      mode: sessionData.mode,
      wpm: sessionData.wpm,
      rawWpm: sessionData.rawWpm,
      accuracy: sessionData.accuracy,
      elapsedSeconds: sessionData.elapsedSeconds,
      errorCount: sessionData.errorCount,
      completedAt: modules.serverTimestamp ? modules.serverTimestamp() : new Date().toISOString()
    }));

    // Task 3: Write level progress to users/{uid}/progress/level1 (if present)
    if (actualLevelProgress && actualLevelProgress.level1) {
      const levelRef = modules.doc(db, 'users', uid, 'progress', 'level1');
      writeTasks.push(modules.setDoc(levelRef, {
        unlockedPart: actualLevelProgress.level1.unlockedPart || 1,
        parts: actualLevelProgress.level1.parts || {},
        updatedAt: modules.serverTimestamp ? modules.serverTimestamp() : new Date().toISOString()
      }, { merge: true }));
    }

    // Task 4: Write 70-level progression to users/{uid}/progression/v2 (if present)
    if (actualProgressionV2 && actualProgressionV2.languages) {
      const progRef = modules.doc(db, 'users', uid, 'progression', 'v2');
      writeTasks.push(modules.setDoc(progRef, {
        version: 2,
        languages: actualProgressionV2.languages,
        updatedAt: modules.serverTimestamp ? modules.serverTimestamp() : new Date().toISOString()
      }, { merge: true }));
    }

    // Task 5: Write to dedicated public leaderboard collection (leaderboard/{uid})
    // Only non-sensitive approved stats (NO email or private progress)
    if (newBestWpm > 0) {
      const lbRef = modules.doc(db, 'leaderboard', uid);
      writeTasks.push(modules.setDoc(lbRef, {
        userId: uid,
        displayName: userDisplayName,
        photoURL: userPhotoURL,
        bestWpm: newBestWpm,
        averageAccuracy: newAvgAcc,
        completedChallenges: newCompleted,
        updatedAt: modules.serverTimestamp ? modules.serverTimestamp() : new Date().toISOString()
      }, { merge: true }));
    }

    // Wait for all writes to complete
    await Promise.all(writeTasks);
    console.log('[CodeReflex Firestore] Successfully persisted user progress & leaderboard for:', uid);
    return { success: true };
  } catch (err) {
    console.warn('[CodeReflex Firestore] Failed to save user progress:', err.code || err.message, err);
    return { success: false, error: err };
  }
}

/**
 * Loads user profile, level progress, and multi-language progression from Firestore.
 */
export async function loadUserProgress(uid) {
  if (!uid || !isFirebaseConfigured()) return null;

  const services = await getFirebaseServices();
  if (!services.configured || !services.db) return null;

  const { db, modules } = services;

  try {
    const userRef = modules.doc(db, 'users', uid);
    const levelRef = modules.doc(db, 'users', uid, 'progress', 'level1');
    const progRef = modules.doc(db, 'users', uid, 'progression', 'v2');

    const fetchWithTimeout = new Promise((resolve) => {
      const timer = setTimeout(() => {
        console.warn('[CodeReflex Firestore] loadUserProgress timed out after 3500ms');
        resolve(null);
      }, 3500);
      Promise.all([
        modules.getDoc(userRef),
        modules.getDoc(levelRef),
        modules.getDoc(progRef)
      ]).then(snaps => {
        clearTimeout(timer);
        resolve(snaps);
      }).catch(err => {
        clearTimeout(timer);
        console.warn('[CodeReflex Firestore] loadUserProgress fetch error:', err.code || err.message);
        resolve(null);
      });
    });

    const snaps = await fetchWithTimeout;
    if (!snaps) return null;

    const [userSnap, levelSnap, progSnap] = snaps;

    return {
      profile: userSnap && userSnap.exists() ? userSnap.data() : null,
      level1: levelSnap && levelSnap.exists() ? levelSnap.data() : null,
      progression: progSnap && progSnap.exists() ? progSnap.data() : null
    };
  } catch (err) {
    console.warn('[CodeReflex Firestore] Failed to load user progress:', err.code || err.message, err);
    return null;
  }
}

/**
 * Reads public rankings from the dedicated public leaderboard collection.
 * Exposes only approved non-sensitive fields.
 */
export async function loadLeaderboard(limitCount = 20) {
  if (!isFirebaseConfigured()) {
    const res = [];
    res.success = false;
    res.unconfigured = true;
    return res;
  }

  const services = await getFirebaseServices();
  if (!services.configured || !services.db) {
    const res = [];
    res.success = false;
    res.unconfigured = true;
    return res;
  }

  const { db, modules } = services;

  try {
    const lbCol = modules.collection(db, 'leaderboard');
    let q = lbCol;
    if (modules.query && modules.orderBy && modules.limit) {
      q = modules.query(lbCol, modules.orderBy('bestWpm', 'desc'), modules.limit(limitCount));
    }
    const snap = await modules.getDocs(q);
    const leaders = [];
    snap.forEach(docSnap => {
      const data = docSnap.data();
      leaders.push({
        userId: data.userId || docSnap.id,
        displayName: data.displayName || 'Coder',
        photoURL: data.photoURL || null,
        bestWpm: data.bestWpm || 0,
        averageAccuracy: data.averageAccuracy || 0,
        completedChallenges: data.completedChallenges || 0
      });
    });
    leaders.success = true;
    return leaders;
  } catch (err) {
    console.warn('[CodeReflex Firestore] loadLeaderboard error:', err.code || err.message);
    const res = [];
    res.success = false;
    res.error = err.code || err.message;
    return res;
  }
}

