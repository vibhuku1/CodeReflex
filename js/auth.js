/**
 * CodeReflex - Authentication Manager
 * Handles dedicated Login Page (matching target visual design),
 * Firebase Authentication (Google, Email/Password, Forgot Password, Facebook, Apple),
 * session persistence, profile sync, and view routing (Landing <-> Login <-> Dashboard).
 */

import {
  signInWithGoogle,
  signInWithGoogleRedirect,
  checkRedirectResult,
  signInWithEmail,
  signUpWithEmail,
  sendPasswordReset,
  signInWithFacebook,
  signInWithApple,
  signOutUser,
  subscribeToAuth,
  loadUserProgress,
  getFirebaseServices
} from './firebase.js';
import { isFirebaseConfigured } from './firebase-config.js';
import { StorageManager } from './storage.js';

const AUTH_STORAGE_KEY = 'codereflex_proto_user_v1';

export class AuthManager {
  constructor(options = {}) {
    this.onLoginSuccess = options.onLoginSuccess || (() => {});
    this.onDashboardOpen = options.onDashboardOpen || (() => {});
    this.onLogout = options.onLogout || (() => {});
    this.authMode = 'login'; // 'login' | 'signup'
    this.currentUser = null;

    this.initDOM();
    this.bindEvents();
    this.checkInitialRoute();
  }

  getAuthenticatedUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  initDOM() {
    // Primary View Containers
    this.landingView = document.querySelector('#landing-view');
    this.loginView = document.querySelector('#login-view');
    this.dashboardView = document.querySelector('#dashboard-view');
    this.appView = document.querySelector('#app-view');

    // Landing navigation CTA buttons
    this.btnLoginNav = document.querySelector('#landing-btn-login');
    this.btnGetStarted = document.querySelector('#landing-btn-get-started');
    this.btnPracticeHero = document.querySelector('#landing-btn-practice');

    // Dedicated Login Page Elements
    this.btnLoginBack = document.querySelector('#btn-login-back');
    this.formDedicatedLogin = document.querySelector('#form-dedicated-login');
    this.loginTitleHeading = document.querySelector('.login-title');
    this.tabAuthLogin = document.querySelector('#tab-auth-login');
    this.tabAuthSignup = document.querySelector('#tab-auth-signup');
    this.loginNameGroup = document.querySelector('#login-name-group');
    this.loginNameInput = document.querySelector('#login-name-input');
    this.loginNameErr = document.querySelector('#login-name-err');
    this.loginEmailInput = document.querySelector('#login-email-input');
    this.loginPasswordInput = document.querySelector('#login-password-input');
    this.btnToggleLoginPwd = document.querySelector('#btn-toggle-login-pwd');
    this.loginForgotRow = document.querySelector('#login-forgot-row');
    this.linkForgotPassword = document.querySelector('#link-forgot-password');
    this.btnSubmitLogin = document.querySelector('#btn-submit-login');
    this.authSwitchRow = document.querySelector('#auth-switch-row');
    this.authSwitchPrompt = document.querySelector('#auth-switch-prompt');
    this.btnAuthModeSwitch = document.querySelector('#btn-auth-mode-switch');

    // Social Login Circular Buttons (supports aliases)
    this.btnSocialGoogle = document.querySelector('#btn-social-google') || document.querySelector('#btn-continue-google');
    this.btnSocialFacebook = document.querySelector('#btn-social-facebook');
    this.btnSocialApple = document.querySelector('#btn-social-apple');

    // Feedback and Error Display
    this.loginStatusBanner = document.querySelector('#login-status-banner');
    this.loginEmailErr = document.querySelector('#login-email-err');
    this.loginPasswordErr = document.querySelector('#login-password-err');

    // Header User Badge & Logout Elements
    this.btnLogout = document.querySelector('#header-logout-btn');
    this.userBadgeEmail = document.querySelector('#header-user-email');
    this.userBadgeAvatar = document.querySelector('#header-user-avatar');
    this.userBadgeDot = document.querySelector('#header-user-dot');

    // Dedicated Dashboard Elements
    this.dashUserEmail = document.querySelector('#dash-user-email');
    this.dashUserName = document.querySelector('#dash-user-name');
    this.dashUserAvatar = document.querySelector('#dash-user-avatar');
    this.dashUserDot = document.querySelector('#dash-user-dot');
    this.dashBtnLogout = document.querySelector('#dash-logout-btn');
  }

  bindEvents() {
    // 1. Landing -> Login view navigation
    if (this.btnLoginNav) {
      this.btnLoginNav.addEventListener('click', (e) => {
        e.preventDefault();
        this.openLoginFlow('login');
      });
    }

    if (this.btnGetStarted) {
      this.btnGetStarted.addEventListener('click', (e) => {
        e.preventDefault();
        this.openLoginFlow('signup');
      });
    }

    if (this.btnPracticeHero) {
      this.btnPracticeHero.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.isAuthenticated()) {
          this.showDashboard();
        } else {
          this.openLoginFlow('login');
        }
      });
    }

    // 2. Login Page -> Back to Landing navigation
    if (this.btnLoginBack) {
      this.btnLoginBack.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeLoginFlow();
      });
    }

    // Tabs and Mode Toggle
    if (this.tabAuthLogin) {
      this.tabAuthLogin.addEventListener('click', () => {
        this.setAuthMode('login');
        window.location.hash = '#login';
      });
    }
    if (this.tabAuthSignup) {
      this.tabAuthSignup.addEventListener('click', () => {
        this.setAuthMode('signup');
        window.location.hash = '#signup';
      });
    }
    if (this.btnAuthModeSwitch) {
      this.btnAuthModeSwitch.addEventListener('click', () => {
        const nextMode = this.authMode === 'login' ? 'signup' : 'login';
        this.setAuthMode(nextMode);
        window.location.hash = nextMode === 'signup' ? '#signup' : '#login';
      });
    }

    // Handle browser Back / Forward buttons & URL hash changes
    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });
    window.addEventListener('popstate', () => {
      this.handleHashChange();
    });

    // 3. Password visibility toggle
    if (this.btnToggleLoginPwd && this.loginPasswordInput) {
      this.btnToggleLoginPwd.addEventListener('click', () => {
        const isPassword = this.loginPasswordInput.type === 'password';
        this.loginPasswordInput.type = isPassword ? 'text' : 'password';
        this.btnToggleLoginPwd.innerHTML = isPassword
          ? `<svg class="icon-eye" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>`
          : `<svg class="icon-eye" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>`;
      });
    }

    // Live validation feedback on typing
    if (this.loginNameInput) {
      this.loginNameInput.addEventListener('input', () => {
        if (this.loginNameInput.value.trim()) {
          this.setInputErrorState(this.loginNameInput, false);
          this.showInlineError(this.loginNameErr, '');
        }
      });
    }

    if (this.loginEmailInput) {
      this.loginEmailInput.addEventListener('input', () => {
        const val = this.loginEmailInput.value.trim();
        if (val && this.validateEmail(val)) {
          this.setInputErrorState(this.loginEmailInput, false);
          this.showInlineError(this.loginEmailErr, '');
        }
      });
    }

    if (this.loginPasswordInput) {
      this.loginPasswordInput.addEventListener('input', () => {
        const val = this.loginPasswordInput.value;
        const minLen = this.authMode === 'signup' ? 8 : 6;
        if (val && val.length >= minLen) {
          this.setInputErrorState(this.loginPasswordInput, false);
          this.showInlineError(this.loginPasswordErr, '');
        }
      });
    }

    // 4. Form Submit (Sign In or Create Account)
    const handleAuthSubmit = (e) => {
      if (e) e.preventDefault();
      if (this.authMode === 'signup') {
        this.handleEmailPasswordSignUp();
      } else {
        this.handleEmailPasswordLogin();
      }
    };

    if (this.formDedicatedLogin) {
      this.formDedicatedLogin.addEventListener('submit', handleAuthSubmit);
    }
    if (this.btnSubmitLogin) {
      this.btnSubmitLogin.addEventListener('click', (e) => {
        handleAuthSubmit(e);
      });
    }

    // 5. Forgot Password link
    if (this.linkForgotPassword) {
      this.linkForgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleForgotPassword();
      });
    }

    // 6. Social Login Buttons
    if (this.btnSocialGoogle) {
      this.btnSocialGoogle.addEventListener('click', () => {
        this.handleGoogleSignIn();
      });
    }

    if (this.btnSocialFacebook) {
      this.btnSocialFacebook.addEventListener('click', () => {
        this.handleFacebookSignIn();
      });
    }

    if (this.btnSocialApple) {
      this.btnSocialApple.addEventListener('click', () => {
        this.handleAppleSignIn();
      });
    }

    // 7. Logout Buttons (Header & Dedicated Dashboard)
    if (this.btnLogout) {
      this.btnLogout.addEventListener('click', () => {
        this.handleLogout();
      });
    }
    if (this.dashBtnLogout) {
      this.dashBtnLogout.addEventListener('click', () => {
        this.handleLogout();
      });
    }
  }

  setAuthMode(mode) {
    this.authMode = mode === 'signup' ? 'signup' : 'login';
    this.clearStatusBanner();
    this.clearValidationErrors();

    const isSignUp = this.authMode === 'signup';

    if (this.tabAuthLogin) {
      this.tabAuthLogin.classList.toggle('active', !isSignUp);
      this.tabAuthLogin.setAttribute('aria-selected', String(!isSignUp));
    }
    if (this.tabAuthSignup) {
      this.tabAuthSignup.classList.toggle('active', isSignUp);
      this.tabAuthSignup.setAttribute('aria-selected', String(isSignUp));
    }

    if (this.loginTitleHeading) {
      this.loginTitleHeading.textContent = isSignUp ? 'Create Account' : 'Login';
    }

    if (this.loginNameGroup) {
      this.loginNameGroup.classList.toggle('hidden', !isSignUp);
    }

    if (this.loginForgotRow) {
      this.loginForgotRow.classList.toggle('hidden', isSignUp);
    }

    if (this.btnSubmitLogin) {
      this.btnSubmitLogin.textContent = isSignUp ? 'Create account' : 'Log in';
    }

    if (this.authSwitchPrompt) {
      this.authSwitchPrompt.textContent = isSignUp ? 'Already have an account?' : "Don't have an account?";
    }

    if (this.btnAuthModeSwitch) {
      this.btnAuthModeSwitch.textContent = isSignUp ? 'Sign in' : 'Create account';
    }

    setTimeout(() => {
      if (isSignUp && this.loginNameInput) {
        this.loginNameInput.focus();
      } else if (this.loginEmailInput) {
        this.loginEmailInput.focus();
      }
    }, 60);
  }

  openLoginFlow(initialMode = 'login') {
    this.authMode = initialMode;
    window.location.hash = initialMode === 'signup' ? '#signup' : '#login';
    this.showLoginView(initialMode);
  }

  closeLoginFlow() {
    if (window.location.hash === '#login' || window.location.hash === '#signup') {
      try {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      } catch {
        window.location.hash = '';
      }
    }
    this.showLanding();
  }

  handleHashChange() {
    if (this.isAuthenticated()) return;
    if (window.location.hash === '#signup') {
      this.showLoginView('signup');
    } else if (window.location.hash === '#login') {
      this.showLoginView(this.authMode || 'login');
    } else {
      this.showLanding();
    }
  }

  /**
   * Restores session on load / refresh via Firebase or session storage.
   * Handles redirect sign-in returns, pre-warms Firebase SDK for instantaneous popups,
   * and synchronizes Firestore progress non-blockingly.
   */
  async checkInitialRoute() {
    // 1. Check if returning from a Google redirect authentication
    try {
      const redirectRes = await checkRedirectResult();
      if (redirectRes && redirectRes.success && redirectRes.user) {
        this.currentUser = {
          uid: redirectRes.user.uid,
          email: redirectRes.user.email,
          name: redirectRes.user.displayName || redirectRes.user.email.split('@')[0],
          photoURL: redirectRes.user.photoURL,
          isGoogle: true,
          loginAt: new Date().toISOString()
        };
        try {
          sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser));
          sessionStorage.setItem('codereflex_active_app_session', '1');
        } catch {}

        loadUserProgress(redirectRes.user.uid).then(cloudData => {
          if (cloudData) StorageManager.syncCloudProgress(cloudData);
        }).catch(() => {});

        this.showDashboard();
        return;
      } else if (redirectRes && !redirectRes.success && redirectRes.message) {
        this.showLoginView();
        this.showStatusBanner(`Google sign-in error: ${redirectRes.message}`, 'error');
        return;
      }
    } catch (err) {
      console.warn('Redirect check error:', err);
    }

    // 2. Pre-warm Firebase services in background for immediate click responsiveness
    getFirebaseServices().catch(() => {});

    // 3. Subscribe to Firebase Auth state
    try {
      await subscribeToAuth(async (firebaseUser) => {
        const hasActiveSession = typeof sessionStorage !== 'undefined' &&
          sessionStorage.getItem('codereflex_active_app_session') === '1';

        if (firebaseUser && hasActiveSession) {
          const isGoogleUser = firebaseUser.providerData?.some(p => p.providerId === 'google.com') ?? true;
          this.currentUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            photoURL: firebaseUser.photoURL || null,
            isGoogle: isGoogleUser,
            loginAt: new Date().toISOString()
          };

          try {
            sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.currentUser));
          } catch {}

          // Background cloud progress sync without blocking dashboard navigation
          loadUserProgress(firebaseUser.uid).then(cloudData => {
            if (cloudData) StorageManager.syncCloudProgress(cloudData);
          }).catch(syncErr => {
            console.warn('Background cloud progress sync notice:', syncErr);
          });

          this.showDashboard();
        } else {
          // If no active in-app session or user is logged out, clear currentUser
          if (!hasActiveSession) {
            this.currentUser = null;
            try {
              sessionStorage.removeItem(AUTH_STORAGE_KEY);
              localStorage.removeItem(AUTH_STORAGE_KEY);
            } catch {}
          }

          // Direct hash navigation
          if (window.location.hash === '#signup') {
            this.showLoginView('signup');
          } else if (window.location.hash === '#login') {
            this.showLoginView(this.authMode || 'login');
          } else {
            // Fresh visit to / or any stale non-auth hash (e.g. #levels, #code) -> ALWAYS display landing page
            if (window.location.hash && window.location.hash !== '#login' && window.location.hash !== '#signup' && !window.location.hash.startsWith('#section-')) {
              try {
                history.replaceState('', document.title, window.location.pathname + window.location.search);
              } catch {
                window.location.hash = '';
              }
            }
            this.showLanding();
          }
        }
      });
    } catch {
      this.currentUser = null;
      if (window.location.hash === '#signup') {
        this.showLoginView('signup');
      } else if (window.location.hash === '#login') {
        this.showLoginView(this.authMode || 'login');
      } else {
        this.showLanding();
      }
    }
  }

  showLanding() {
    if (this.landingView) this.landingView.classList.remove('hidden');
    if (this.loginView) this.loginView.classList.add('hidden');
    if (this.dashboardView) this.dashboardView.classList.add('hidden');
    if (this.appView) this.appView.classList.add('hidden');
    document.body.classList.remove('in-app');
    window.scrollTo(0, 0);
  }

  showLoginView(mode = 'login') {
    if (this.landingView) this.landingView.classList.add('hidden');
    if (this.loginView) this.loginView.classList.remove('hidden');
    if (this.dashboardView) this.dashboardView.classList.add('hidden');
    if (this.appView) this.appView.classList.add('hidden');
    document.body.classList.remove('in-app');

    this.setAuthMode(mode);
    if (this.loginView) this.loginView.scrollTop = 0;
  }

  showDashboard() {
    try {
      sessionStorage.setItem('codereflex_active_app_session', '1');
    } catch {}

    if (this.landingView) this.landingView.classList.add('hidden');
    if (this.loginView) this.loginView.classList.add('hidden');
    if (this.appView) this.appView.classList.add('hidden');
    if (this.dashboardView) this.dashboardView.classList.remove('hidden');
    document.body.classList.add('in-app');

    if (window.location.hash === '#login' || window.location.hash === '#signup') {
      try {
        history.replaceState('', document.title, window.location.pathname + window.location.search);
      } catch {
        window.location.hash = '';
      }
    }

    const user = this.getAuthenticatedUser();
    if (user) {
      const displayName = user.name || user.displayName || (user.email ? user.email.split('@')[0] : 'Coder');
      if (this.dashUserName) {
        this.dashUserName.textContent = displayName;
      }
      if (this.dashUserEmail) {
        this.dashUserEmail.textContent = user.email || displayName;
      }
      if (this.dashUserAvatar && this.dashUserDot) {
        if (user.photoURL) {
          this.dashUserAvatar.src = user.photoURL;
          this.dashUserAvatar.classList.remove('hidden');
          this.dashUserDot.classList.add('hidden');
        } else {
          this.dashUserAvatar.classList.add('hidden');
          this.dashUserDot.classList.remove('hidden');
        }
      }

      if (this.userBadgeEmail) {
        this.userBadgeEmail.textContent = displayName;
      }
      if (this.userBadgeAvatar && this.userBadgeDot) {
        if (user.photoURL) {
          this.userBadgeAvatar.src = user.photoURL;
          this.userBadgeAvatar.classList.remove('hidden');
          this.userBadgeDot.classList.add('hidden');
        } else {
          this.userBadgeAvatar.classList.add('hidden');
          this.userBadgeDot.classList.remove('hidden');
        }
      }
    }

    if (typeof this.onDashboardOpen === 'function') {
      this.onDashboardOpen(user);
    }

    this.onLoginSuccess(user);
  }

  showPracticePortal() {
    try {
      sessionStorage.setItem('codereflex_active_app_session', '1');
    } catch {}

    if (this.landingView) this.landingView.classList.add('hidden');
    if (this.loginView) this.loginView.classList.add('hidden');
    if (this.dashboardView) this.dashboardView.classList.add('hidden');
    if (this.appView) this.appView.classList.remove('hidden');
    document.body.classList.add('in-app');
    window.scrollTo(0, 0);
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * Handles email/password sign-in with Firebase.
   */
  async handleEmailPasswordLogin() {
    this.clearStatusBanner();
    this.clearValidationErrors();

    const email = this.loginEmailInput ? this.loginEmailInput.value.trim() : '';
    const password = this.loginPasswordInput ? this.loginPasswordInput.value : '';
    let hasError = false;

    if (!email) {
      this.showInlineError(this.loginEmailErr, 'Email address is required');
      this.setInputErrorState(this.loginEmailInput, true);
      hasError = true;
    } else if (!this.validateEmail(email)) {
      this.showInlineError(this.loginEmailErr, 'Please enter a complete and valid email address (e.g. name@example.com)');
      this.setInputErrorState(this.loginEmailInput, true);
      hasError = true;
    } else {
      this.setInputErrorState(this.loginEmailInput, false);
    }

    if (!password) {
      this.showInlineError(this.loginPasswordErr, 'Password is required');
      this.setInputErrorState(this.loginPasswordInput, true);
      hasError = true;
    } else if (password.length < 6) {
      this.showInlineError(this.loginPasswordErr, 'Password must be at least 6 characters');
      this.setInputErrorState(this.loginPasswordInput, true);
      hasError = true;
    } else {
      this.setInputErrorState(this.loginPasswordInput, false);
    }

    if (hasError) {
      this.showStatusBanner('Please resolve the errors highlighted below.', 'error');
      if (!email || !this.validateEmail(email)) {
        if (this.loginEmailInput) this.loginEmailInput.focus();
      } else if (this.loginPasswordInput) {
        this.loginPasswordInput.focus();
      }
      return;
    }

    if (this.btnSubmitLogin) {
      this.btnSubmitLogin.disabled = true;
      this.btnSubmitLogin.textContent = 'Signing in...';
    }

    try {
      if (isFirebaseConfigured()) {
        const result = await signInWithEmail(email, password);
        if (result.success && result.user) {
          const sessionUser = {
            uid: result.user.uid,
            email: result.user.email,
            name: result.user.displayName || email.split('@')[0],
            photoURL: result.user.photoURL,
            isGoogle: false,
            loginAt: new Date().toISOString()
          };
          this.currentUser = sessionUser;
          try {
            sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
          } catch {}

          // Background cloud progress sync
          loadUserProgress(result.user.uid).then(cloudData => {
            if (cloudData) StorageManager.syncCloudProgress(cloudData);
          }).catch(() => {});

          this.clearStatusBanner();
          this.clearValidationErrors();
          this.showDashboard();
        } else {
          this.showStatusBanner(result.message || 'Authentication failed. Please check your credentials.', 'error');
          this.setInputErrorState(this.loginPasswordInput, true);
        }
      } else {
        // Firebase unconfigured warning with local demo option
        this.showStatusBanner(
          `<strong>Firebase Configuration Required:</strong> To enable live email authentication, enter your web app credentials in <code>js/firebase-config.js</code>.<br>
           <button type="button" class="btn-proto-session-cta" id="btn-proto-login">Continue with local demo session</button>`,
          'warning'
        );

        const btnProto = document.querySelector('#btn-proto-login');
        if (btnProto) {
          btnProto.addEventListener('click', () => {
            const protoUser = {
              email,
              name: email.split('@')[0],
              isPrototype: true,
              loginAt: new Date().toISOString()
            };
            this.currentUser = protoUser;
            try {
              sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(protoUser));
            } catch {}
            this.showDashboard();
          });
        }
      }
    } catch (err) {
      this.showStatusBanner('An unexpected error occurred during login. Please try again.', 'error');
    } finally {
      if (this.btnSubmitLogin) {
        this.btnSubmitLogin.disabled = false;
        this.btnSubmitLogin.textContent = 'Log in';
      }
    }
  }

  /**
   * Handles new account registration with Firebase Email/Password Authentication.
   */
  async handleEmailPasswordSignUp() {
    this.clearStatusBanner();
    this.clearValidationErrors();

    const name = this.loginNameInput ? this.loginNameInput.value.trim() : '';
    const email = this.loginEmailInput ? this.loginEmailInput.value.trim() : '';
    const password = this.loginPasswordInput ? this.loginPasswordInput.value : '';
    let hasError = false;

    if (!name) {
      this.showInlineError(this.loginNameErr, 'Please enter your full name');
      this.setInputErrorState(this.loginNameInput, true);
      hasError = true;
    } else {
      this.setInputErrorState(this.loginNameInput, false);
    }

    if (!email) {
      this.showInlineError(this.loginEmailErr, 'Email address is required');
      this.setInputErrorState(this.loginEmailInput, true);
      hasError = true;
    } else if (!this.validateEmail(email)) {
      this.showInlineError(this.loginEmailErr, 'Please enter a complete and valid email address (e.g. name@example.com)');
      this.setInputErrorState(this.loginEmailInput, true);
      hasError = true;
    } else {
      this.setInputErrorState(this.loginEmailInput, false);
    }

    if (!password) {
      this.showInlineError(this.loginPasswordErr, 'Password is required');
      this.setInputErrorState(this.loginPasswordInput, true);
      hasError = true;
    } else if (password.length < 8) {
      this.showInlineError(this.loginPasswordErr, 'Password must be at least 8 characters long');
      this.setInputErrorState(this.loginPasswordInput, true);
      hasError = true;
    } else {
      this.setInputErrorState(this.loginPasswordInput, false);
    }

    if (hasError) {
      this.showStatusBanner('Please resolve the errors highlighted below.', 'error');
      if (!name) {
        if (this.loginNameInput) this.loginNameInput.focus();
      } else if (!email || !this.validateEmail(email)) {
        if (this.loginEmailInput) this.loginEmailInput.focus();
      } else if (this.loginPasswordInput) {
        this.loginPasswordInput.focus();
      }
      return;
    }

    if (this.btnSubmitLogin) {
      this.btnSubmitLogin.disabled = true;
      this.btnSubmitLogin.textContent = 'Creating account...';
    }

    try {
      if (isFirebaseConfigured()) {
        const result = await signUpWithEmail(email, password, name);
        if (result.success && result.user) {
          const sessionUser = {
            uid: result.user.uid,
            email: result.user.email,
            name: result.user.displayName || name || email.split('@')[0],
            photoURL: result.user.photoURL,
            isGoogle: false,
            loginAt: new Date().toISOString()
          };
          this.currentUser = sessionUser;
          try {
            sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
          } catch {}

          this.clearStatusBanner();
          this.clearValidationErrors();
          this.showDashboard();
        } else {
          this.showStatusBanner(result.message || 'Failed to create account. Please try again.', 'error');
          // Preserve all input fields so user does not lose progress
        }
      } else {
        // Firebase unconfigured warning with local demo option
        this.showStatusBanner(
          `<strong>Firebase Configuration Required:</strong> To enable account registration, enter your web app credentials in <code>js/firebase-config.js</code>.<br>
           <button type="button" class="btn-proto-session-cta" id="btn-proto-signup">Continue with local demo session</button>`,
          'warning'
        );

        const btnProto = document.querySelector('#btn-proto-signup');
        if (btnProto) {
          btnProto.addEventListener('click', () => {
            const protoUser = {
              email,
              name: name || email.split('@')[0],
              isPrototype: true,
              loginAt: new Date().toISOString()
            };
            this.currentUser = protoUser;
            try {
              sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(protoUser));
            } catch {}
            this.showDashboard();
          });
        }
      }
    } catch (err) {
      this.showStatusBanner('An unexpected error occurred while creating your account.', 'error');
    } finally {
      if (this.btnSubmitLogin) {
        this.btnSubmitLogin.disabled = false;
        this.btnSubmitLogin.textContent = 'Create account';
      }
    }
  }

  /**
   * Handles Forgot Password flow via Firebase Authentication.
   */
  async handleForgotPassword() {
    this.clearStatusBanner();
    this.clearValidationErrors();

    const email = this.loginEmailInput ? this.loginEmailInput.value.trim() : '';
    if (!email) {
      this.showInlineError(this.loginEmailErr, 'Please enter your email above first');
      this.setInputErrorState(this.loginEmailInput, true);
      if (this.loginEmailInput) this.loginEmailInput.focus();
      return;
    }
    if (!this.validateEmail(email)) {
      this.showInlineError(this.loginEmailErr, 'Please enter a complete and valid email address');
      this.setInputErrorState(this.loginEmailInput, true);
      return;
    }

    try {
      const result = await sendPasswordReset(email);
      if (result.success) {
        this.showStatusBanner(result.message, 'success');
      } else {
        if (result.code === 'unconfigured') {
          this.showStatusBanner(
            '<strong>Firebase Required:</strong> Password reset requires Firebase Authentication configuration in <code>js/firebase-config.js</code>.',
            'warning'
          );
        } else {
          this.showStatusBanner(result.message || 'Could not send password reset email.', 'error');
        }
      }
    } catch {
      this.showStatusBanner('Could not process password reset request.', 'error');
    }
  }

  /**
   * Handles Google OAuth sign-in with Firebase (Popup with automatic Redirect fallback).
   */
  async handleGoogleSignIn() {
    this.clearStatusBanner();
    this.clearValidationErrors();

    if (this.btnSocialGoogle) {
      this.btnSocialGoogle.disabled = true;
      this.btnSocialGoogle.classList.add('loading');
    }

    try {
      if (!isFirebaseConfigured()) {
        this.showStatusBanner(
          '<strong>Firebase Configuration Required:</strong> To enable Google Sign-In and Cloud Firestore, enter your web app credentials in <code>js/firebase-config.js</code>.<br>' +
          'Be sure to enable Google under <em>Authentication &gt; Sign-in method</em> in Firebase Console.',
          'warning'
        );
        return;
      }

      this.showStatusBanner('Connecting with Google...', 'info');

      const result = await signInWithGoogle();
      if (result.success && result.user) {
        const sessionPayload = {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || result.user.email.split('@')[0],
          photoURL: result.user.photoURL,
          isGoogle: true,
          loginAt: new Date().toISOString()
        };
        this.currentUser = sessionPayload;

        try {
          sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionPayload));
        } catch {}

        loadUserProgress(result.user.uid).then(cloudData => {
          if (cloudData) StorageManager.syncCloudProgress(cloudData);
        }).catch(() => {});

        this.clearStatusBanner();
        this.clearValidationErrors();
        this.showDashboard();
      } else {
        const errorCode = result.code || 'unknown';
        console.warn('[CodeReflex Auth] Captured Google Sign-In failure code:', errorCode);

        if (errorCode === 'auth/unauthorized-domain') {
          const currentHost = window.location.hostname;
          let hint = '';
          if (currentHost === '127.0.0.1') {
            hint = `<div style="margin-top:6px;"><strong>Tip:</strong> Open <a href="http://localhost:8000" style="color:#38bdf8; text-decoration:underline;">http://localhost:8000</a> instead of 127.0.0.1, because <code>localhost</code> is authorized by default in Firebase.</div>`;
          } else {
            hint = `<div style="margin-top:6px;">Add <code>${currentHost}</code> in <strong>Firebase Console &gt; Authentication &gt; Settings &gt; Authorized domains</strong>.</div>`;
          }
          this.showStatusBanner(`<strong>Unauthorized Domain (${errorCode}):</strong> ${result.message}${hint}`, 'error');
        } else if (errorCode === 'auth/popup-blocked' || errorCode === 'auth/popup-closed-by-user') {
          const bannerMsg = errorCode === 'auth/popup-blocked'
            ? `<strong>Popup Blocked (${errorCode}):</strong> Your browser blocked the Google sign-in window.<br>`
            : `<strong>Popup Closed (${errorCode}):</strong> The Google popup was closed before completing.<br>`;

          this.showStatusBanner(
            `${bannerMsg}
             <div style="margin-top:8px;">
               <button type="button" class="btn-status-redirect" id="btn-status-google-redirect">
                 Continue with Google Sign-In (Redirect)
               </button>
             </div>`,
            'warning'
          );

          const btnRedirect = document.querySelector('#btn-status-google-redirect');
          if (btnRedirect) {
            btnRedirect.addEventListener('click', async () => {
              this.showStatusBanner('Redirecting to Google...', 'info');
              await signInWithGoogleRedirect();
            });
          }
        } else {
          this.showStatusBanner(`<strong>Sign-In Error (${errorCode}):</strong> ${result.message}`, 'error');
        }
      }
    } catch (err) {
      console.error('Unexpected Google sign-in error:', err);
      this.showStatusBanner('An unexpected error occurred. Please try again.', 'error');
    } finally {
      if (this.btnSocialGoogle) {
        this.btnSocialGoogle.disabled = false;
        this.btnSocialGoogle.classList.remove('loading');
      }
    }
  }

  /**
   * Handles Facebook Sign-In.
   */
  async handleFacebookSignIn() {
    this.clearStatusBanner();
    this.clearValidationErrors();

    if (this.btnSocialFacebook) this.btnSocialFacebook.disabled = true;

    try {
      const result = await signInWithFacebook();
      if (result.success && result.user) {
        const sessionPayload = {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
          isGoogle: false,
          loginAt: new Date().toISOString()
        };
        this.currentUser = sessionPayload;
        try {
          sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionPayload));
        } catch {}
        this.showDashboard();
      } else {
        this.showStatusBanner(result.message || 'Facebook Sign-In is not enabled.', 'warning');
      }
    } catch (err) {
      this.showStatusBanner('Facebook authentication could not be completed.', 'error');
    } finally {
      if (this.btnSocialFacebook) this.btnSocialFacebook.disabled = false;
    }
  }

  /**
   * Handles Apple Sign-In.
   */
  async handleAppleSignIn() {
    this.clearStatusBanner();
    this.clearValidationErrors();

    if (this.btnSocialApple) this.btnSocialApple.disabled = true;

    try {
      const result = await signInWithApple();
      if (result.success && result.user) {
        const sessionPayload = {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
          isGoogle: false,
          loginAt: new Date().toISOString()
        };
        this.currentUser = sessionPayload;
        try {
          sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionPayload));
        } catch {}
        this.showDashboard();
      } else {
        this.showStatusBanner(result.message || 'Apple Sign-In is not enabled.', 'warning');
      }
    } catch (err) {
      this.showStatusBanner('Apple authentication could not be completed.', 'error');
    } finally {
      if (this.btnSocialApple) this.btnSocialApple.disabled = false;
    }
  }

  async handleLogout() {
    this.currentUser = null;
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem('codereflex_active_app_session');
    } catch {}

    this.onLogout();
    this.closeLoginFlow();

    try {
      await signOutUser();
    } catch (err) {
      console.warn('Logout error:', err);
    }
  }

  showStatusBanner(messageHtml, type = 'error') {
    if (!this.loginStatusBanner) return;
    this.loginStatusBanner.innerHTML = messageHtml;
    this.loginStatusBanner.className = `auth-status-banner banner-${type}`;
    this.loginStatusBanner.classList.remove('hidden');
  }

  clearStatusBanner() {
    if (!this.loginStatusBanner) return;
    this.loginStatusBanner.innerHTML = '';
    this.loginStatusBanner.className = 'auth-status-banner hidden';
  }

  showInlineError(errorElement, message) {
    if (errorElement) errorElement.textContent = message;
  }

  setInputErrorState(inputEl, hasError) {
    if (!inputEl) return;
    inputEl.classList.toggle('has-error', !!hasError);
  }

  clearValidationErrors() {
    if (this.loginNameErr) this.loginNameErr.textContent = '';
    if (this.loginEmailErr) this.loginEmailErr.textContent = '';
    if (this.loginPasswordErr) this.loginPasswordErr.textContent = '';
    this.setInputErrorState(this.loginNameInput, false);
    this.setInputErrorState(this.loginEmailInput, false);
    this.setInputErrorState(this.loginPasswordInput, false);
  }
}

