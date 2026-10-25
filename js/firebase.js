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

    // Create or sync user profile document in Firestore
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
    console.warn('Google Sign-In error:', err.code, err.message);

    // Map common Firebase auth error codes to actionable messages
    let friendlyMessage = 'Authentication failed. Please try again.';
    if (err.code === 'auth/popup-closed-by-user') {
      friendlyMessage = 'Sign-in cancelled. The Google popup was closed.';
    } else if (err.code === 'auth/cancelled-popup-request') {
      friendlyMessage = 'Previous sign-in attempt was cancelled.';
    } else if (err.code === 'auth/popup-blocked') {
      friendlyMessage = 'Popup was blocked by your browser. Please allow popups for this site.';
    } else if (err.code === 'auth/unauthorized-domain') {
      friendlyMessage = 'This domain is not authorized in Firebase Console > Authentication > Settings > Authorized Domains.';
    } else if (err.code === 'auth/network-request-failed') {
      friendlyMessage = 'Network error. Please check your internet connection and try again.';
    } else if (err.message) {
      friendlyMessage = err.message;
    }

    return {
      success: false,
      code: err.code || 'unknown',
      message: friendlyMessage
    };
  }
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
      try {
        await modules.updateProfile(user, { displayName: trimmedName });
      } catch (profileErr) {
        console.warn('Could not update display name on user:', profileErr);
      }
    }

    const effectiveName = trimmedName || user.displayName || email.split('@')[0];
    const profile = await syncUserProfile({
      uid: user.uid,
      displayName: effectiveName,
      email: user.email,
      photoURL: user.photoURL || null
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        displayName: effectiveName,
        email: user.email,
        photoURL: user.photoURL || null
      },
      profile
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
    const docSnap = await modules.getDoc(userRef);
    const isNew = !docSnap.exists();
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

    await modules.setDoc(userRef, profileData, { merge: true });
    return { ...existingData, ...profileData };
  } catch (err) {
    console.warn('Firestore profile sync error (offline or permission):', err);
    return null;
  }
}

/**
 * Saves a completed challenge session and updated level telemetry to Firestore.
 */
export async function saveUserProgress(uid, sessionData, levelProgress) {
  if (!uid || !isFirebaseConfigured()) return;

  const services = await getFirebaseServices();
  if (!services.configured || !services.db) return;

  const { db, modules } = services;
  const userRef = modules.doc(db, 'users', uid);

  try {
    // 1. Fetch current metrics to compute incremental aggregates
    const docSnap = await modules.getDoc(userRef);
    const currentData = docSnap.exists() ? docSnap.data() : {};

    const prevBestWpm = currentData.bestWpm || 0;
    const newBestWpm = Math.max(prevBestWpm, sessionData.wpm || 0);
    const prevCompleted = currentData.completedChallenges || 0;
    const newCompleted = prevCompleted + 1;

    // Running average accuracy
    const prevAvgAcc = currentData.averageAccuracy || 100;
    const newAvgAcc = Math.round(((prevAvgAcc * prevCompleted) + (sessionData.accuracy || 100)) / newCompleted);

    const unlockedPart = (levelProgress && levelProgress.level1 && levelProgress.level1.unlockedPart)
      ? levelProgress.level1.unlockedPart
      : (currentData.currentPart || 1);

    // Update parent user profile document
    await modules.setDoc(userRef, {
      bestWpm: newBestWpm,
      averageAccuracy: newAvgAcc,
      completedChallenges: newCompleted,
      currentLevel: 1,
      currentPart: unlockedPart,
      updatedAt: modules.serverTimestamp ? modules.serverTimestamp() : new Date().toISOString()
    }, { merge: true });

    // 2. Write to subcollection: users/{uid}/history/{sessionId}
    const sessionRef = modules.doc(db, 'users', uid, 'history', sessionData.id || `sess_${Date.now()}`);
    await modules.setDoc(sessionRef, {
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
    });

    // 3. Write to subcollection: users/{uid}/progress/level1
    if (levelProgress && levelProgress.level1) {
      const levelRef = modules.doc(db, 'users', uid, 'progress', 'level1');
      await modules.setDoc(levelRef, {
        unlockedPart: levelProgress.level1.unlockedPart || 1,
        parts: levelProgress.level1.parts || {},
        updatedAt: modules.serverTimestamp ? modules.serverTimestamp() : new Date().toISOString()
      }, { merge: true });
    }
  } catch (err) {
    console.warn('Failed to save user progress to Firestore (offline/permission):', err);
  }
}

/**
 * Loads user profile and level progress from Firestore.
 */
export async function loadUserProgress(uid) {
  if (!uid || !isFirebaseConfigured()) return null;

  const services = await getFirebaseServices();
  if (!services.configured || !services.db) return null;

  const { db, modules } = services;

  try {
    const userRef = modules.doc(db, 'users', uid);
    const levelRef = modules.doc(db, 'users', uid, 'progress', 'level1');

    const [userSnap, levelSnap] = await Promise.all([
      modules.getDoc(userRef),
      modules.getDoc(levelRef)
    ]);

    return {
      profile: userSnap.exists() ? userSnap.data() : null,
      level1: levelSnap.exists() ? levelSnap.data() : null
    };
  } catch (err) {
    console.warn('Failed to load user progress from Firestore:', err);
    return null;
  }
}

