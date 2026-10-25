/**
 * CodeReflex - Authentication Gate & Form Validation (Prototype)
 * Manages client-side prototype sessions, inline validation,
 * show/hide password toggles, and landing <-> dashboard routing.
 * NOTE: Prototype mode — plain text passwords are NEVER stored in storage.
 */

const AUTH_STORAGE_KEY = 'codereflex_proto_user_v1';

export class AuthManager {
  constructor(options = {}) {
    this.onLoginSuccess = options.onLoginSuccess || (() => {});
    this.onLogout = options.onLogout || (() => {});
    this.activeTab = 'login'; // 'login' | 'signup'

    this.initDOM();
    this.bindEvents();
    this.checkInitialRoute();
  }

  getAuthenticatedUser() {
    try {
      const data = sessionStorage.getItem(AUTH_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  isAuthenticated() {
    return this.getAuthenticatedUser() !== null;
  }

  initDOM() {
    this.landingView = document.querySelector('#landing-view');
    this.appView = document.querySelector('#app-view');

    // Landing nav & buttons
    this.btnLoginNav = document.querySelector('#landing-btn-login');
    this.btnPracticeHero = document.querySelector('#landing-btn-practice');
    this.authSection = document.querySelector('#auth-section');

    // Auth Card elements
    this.tabLogin = document.querySelector('#tab-auth-login');
    this.tabSignup = document.querySelector('#tab-auth-signup');
    this.formLogin = document.querySelector('#form-login');
    this.formSignup = document.querySelector('#form-signup');

    // Dashboard Logout elements
    this.btnLogout = document.querySelector('#header-logout-btn');
    this.userBadgeEmail = document.querySelector('#header-user-email');
  }

  bindEvents() {
    // Top bar "Login" button -> scroll to/focus auth card
    if (this.btnLoginNav) {
      this.btnLoginNav.addEventListener('click', () => {
        this.switchAuthTab('login');
        this.scrollToAuth();
      });
    }

    // Hero "Practice shuru karo" button
    if (this.btnPracticeHero) {
      this.btnPracticeHero.addEventListener('click', () => {
        if (this.isAuthenticated()) {
          this.showDashboard();
        } else {
          this.switchAuthTab('login');
          this.scrollToAuth();
        }
      });
    }

    // Auth tabs
    if (this.tabLogin && this.tabSignup) {
      this.tabLogin.addEventListener('click', () => this.switchAuthTab('login'));
      this.tabSignup.addEventListener('click', () => this.switchAuthTab('signup'));
    }

    // Password show/hide toggles
    document.querySelectorAll('.auth-toggle-pwd').forEach(btn => {
      btn.addEventListener('click', () => {
        const inputId = btn.dataset.targetInput;
        const input = document.getElementById(inputId);
        if (input) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          btn.innerHTML = isPassword 
            ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
            : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
        }
      });
    });

    // Login Form Submit
    if (this.formLogin) {
      this.formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLoginSubmit();
      });
    }

    // Sign Up Form Submit
    if (this.formSignup) {
      this.formSignup.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSignupSubmit();
      });
    }

    // Logout Button in Practice Dashboard
    if (this.btnLogout) {
      this.btnLogout.addEventListener('click', () => {
        this.handleLogout();
      });
    }
  }

  checkInitialRoute() {
    if (this.isAuthenticated()) {
      this.showDashboard();
    } else {
      this.showLanding();
    }
  }

  showLanding() {
    if (this.landingView) this.landingView.classList.remove('hidden');
    if (this.appView) this.appView.classList.add('hidden');
    document.body.classList.remove('in-app');
    window.scrollTo(0, 0);
  }

  showDashboard() {
    if (this.landingView) this.landingView.classList.add('hidden');
    if (this.appView) this.appView.classList.remove('hidden');
    document.body.classList.add('in-app');

    const user = this.getAuthenticatedUser();
    if (this.userBadgeEmail && user) {
      this.userBadgeEmail.textContent = user.name || user.email;
    }

    this.onLoginSuccess(user);
  }

  switchAuthTab(tab) {
    this.activeTab = tab;
    if (tab === 'login') {
      this.tabLogin.classList.add('active');
      this.tabSignup.classList.remove('active');
      this.formLogin.classList.remove('hidden');
      this.formSignup.classList.add('hidden');
    } else {
      this.tabSignup.classList.add('active');
      this.tabLogin.classList.remove('active');
      this.formSignup.classList.remove('hidden');
      this.formLogin.classList.add('hidden');
    }
    this.clearValidationErrors();
  }

  scrollToAuth() {
    if (this.authSection) {
      this.authSection.scrollIntoView({ behavior: 'smooth' });
      // Focus first input of active tab
      setTimeout(() => {
        const input = this.activeTab === 'login'
          ? document.getElementById('login-email')
          : document.getElementById('signup-name');
        if (input) input.focus();
      }, 400);
    }
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  handleLoginSubmit() {
    this.clearValidationErrors();
    const emailInput = document.getElementById('login-email');
    const pwdInput = document.getElementById('login-password');
    let hasError = false;

    const email = emailInput.value.trim();
    const pwd = pwdInput.value;

    if (!email) {
      this.showError('login-email-error', 'Email is required');
      emailInput.classList.add('input-error');
      hasError = true;
    } else if (!this.validateEmail(email)) {
      this.showError('login-email-error', 'Please enter a valid email address');
      emailInput.classList.add('input-error');
      hasError = true;
    }

    if (!pwd) {
      this.showError('login-password-error', 'Password is required');
      pwdInput.classList.add('input-error');
      hasError = true;
    } else if (pwd.length < 8) {
      this.showError('login-password-error', 'Password must be at least 8 characters');
      pwdInput.classList.add('input-error');
      hasError = true;
    }

    if (hasError) return;

    // In prototype mode: Never store plain-text password!
    const prototypeUser = {
      email,
      name: email.split('@')[0],
      isPrototype: true,
      loginAt: new Date().toISOString()
    };

    try {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(prototypeUser));
    } catch {
      // Memory fallback
    }

    // Transition to authenticated dashboard
    this.showDashboard();
  }

  handleSignupSubmit() {
    this.clearValidationErrors();
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const pwdInput = document.getElementById('signup-password');
    const confirmPwdInput = document.getElementById('signup-confirm-password');
    let hasError = false;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const pwd = pwdInput.value;
    const confirmPwd = confirmPwdInput.value;

    if (!name) {
      this.showError('signup-name-error', 'Name is required');
      nameInput.classList.add('input-error');
      hasError = true;
    }

    if (!email) {
      this.showError('signup-email-error', 'Email is required');
      emailInput.classList.add('input-error');
      hasError = true;
    } else if (!this.validateEmail(email)) {
      this.showError('signup-email-error', 'Please enter a valid email address');
      emailInput.classList.add('input-error');
      hasError = true;
    }

    if (!pwd) {
      this.showError('signup-password-error', 'Password is required');
      pwdInput.classList.add('input-error');
      hasError = true;
    } else if (pwd.length < 8) {
      this.showError('signup-password-error', 'Password must be at least 8 characters');
      pwdInput.classList.add('input-error');
      hasError = true;
    }

    if (!confirmPwd) {
      this.showError('signup-confirm-password-error', 'Please confirm your password');
      confirmPwdInput.classList.add('input-error');
      hasError = true;
    } else if (pwd !== confirmPwd) {
      this.showError('signup-confirm-password-error', 'Passwords do not match');
      confirmPwdInput.classList.add('input-error');
      hasError = true;
    }

    if (hasError) return;

    // Prototype Registration: Never store plain-text password!
    const prototypeUser = {
      email,
      name,
      isPrototype: true,
      loginAt: new Date().toISOString()
    };

    try {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(prototypeUser));
    } catch {
      // Fallback
    }

    this.showDashboard();
  }

  handleLogout() {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Clear
    }

    this.onLogout();
    this.showLanding();
  }

  showError(errorElementId, message) {
    const el = document.getElementById(errorElementId);
    if (el) el.textContent = message;
  }

  clearValidationErrors() {
    document.querySelectorAll('.auth-inline-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.auth-input').forEach(el => el.classList.remove('input-error'));
  }
}

