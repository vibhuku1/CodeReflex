/**
 * CodeReflex - Firebase Client Configuration
 * 
 * Instructions to configure Firebase Authentication and Cloud Firestore:
 * 1. Go to the Firebase Console: https://console.firebase.google.com/
 * 2. Create a new project (e.g. "codereflex-app") or select an existing one.
 * 3. In the project dashboard, click the web icon ("</>") to register a web app.
 * 4. Copy the `firebaseConfig` object and replace the placeholder values below.
 * 5. In Firebase Console > Build > Authentication > Sign-in method:
 *    - Enable "Google" as a sign-in provider.
 *    - Ensure your project support email is selected.
 * 6. In Firebase Console > Build > Firestore Database:
 *    - Click "Create database" and select production mode or start in test mode.
 *    - Deploy the security rules from `firestore.rules`.
 * 7. In Firebase Console > Authentication > Settings > Authorized Domains:
 *    - Ensure `localhost` and your production deployment domain are listed.
 */

export const firebaseConfig = {
  apiKey: "AIzaSyDxGqWmhJH-nrpgjHTq8IxkiYafYuy5olw",
  authDomain: "codereflex-d6a26.firebaseapp.com",
  projectId: "codereflex-d6a26",
  storageBucket: "codereflex-d6a26.firebasestorage.app",
  messagingSenderId: "438658432326",
  appId: "1:438658432326:web:2fe2c4ef2ef08f3dad3947"
};

/**
 * Checks whether the developer has configured valid Firebase credentials.
 * @returns {boolean}
 */
export function isFirebaseConfigured() {
  return Boolean(
    firebaseConfig &&
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== "YOUR_API_KEY" &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID"
  );
}

