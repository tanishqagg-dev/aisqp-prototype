// 🎯 Simple Client-Side Router for CBSE SQP Generator
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.isAuthenticated = false;
    this.protectedRoutes = ['dashboard', 'mypapers', 'contact'];
    
    // Initialize router
    this.init();
  }

  // 🔧 Initialize Router
  init() {
    // Define all routes
    this.defineRoutes();
    
    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      this.handleRoute(window.location.pathname);
    });
    
    // Handle initial page load
    this.handleRoute(window.location.pathname);
    
    // Check authentication status
    this.checkAuth();
    
    console.log('🎯 Router initialized');
  }

  // 🔧 Define All Routes
  defineRoutes() {
    this.routes = {
      '/': {
        title: 'Home - CBSE AI SQP Generator',
        file: 'index.html',
        protected: false,
        handler: this.loadHomePage.bind(this)
      },
      '/home': {
        title: 'Home - CBSE AI SQP Generator',
        file: 'index.html',
        protected: false,
        handler: this.loadHomePage.bind(this)
      },
      '/dashboard': {
        title: 'Dashboard - CBSE AI SQP Generator',
        file: 'dashboard.html',
        protected: true,
        handler: this.loadDashboard.bind(this)
      },
      '/mypapers': {
        title: 'My Papers - CBSE AI SQP Generator',
        file: 'mypapers.html',
        protected: true,
        handler: this.loadMyPapers.bind(this)
      },
      '/about': {
        title: 'About - CBSE AI SQP Generator',
        file: 'about.html',
        protected: false,
        handler: this.loadAbout.bind(this)
      },
      '/contact': {
        title: 'Contact - CBSE AI SQP Generator',
        file: 'contact.html',
        protected: true,
        handler: this.loadContact.bind(this)
      }
    };
  }

  // 🔧 Handle Route Navigation
  handleRoute(path) {
    // Normalize path
    path = path === '' ? '/' : path;
    
    const route = this.routes[path];
    
    if (!route) {
      // Route not found - redirect to home
      this.navigate('/');
      return;
    }

    // Check if route is protected
    if (route.protected && !this.isAuthenticated) {
      // Redirect to home with login prompt
      this.navigate('/');
      this.showLoginPrompt();
      return;
    }

    // If already on this route, don't reload
    if (this.currentRoute === path) {
      return;
    }

    // Load the route
    this.currentRoute = path;
    document.title = route.title;
    
    // Execute route handler
    if (route.handler) {
      route.handler();
    }
    
    console.log(`🎯 Navigated to: ${path}`);
  }

  // 🔧 Navigate to Route
  navigate(path, pushState = true) {
    if (pushState) {
      window.history.pushState({}, '', path);
    }
    this.handleRoute(path);
  }

  // 🔧 Check Authentication Status
  checkAuth() {
    // Check if user is logged in (using localStorage or Google Auth)
    const userToken = localStorage.getItem('userToken');
    const googleUser = localStorage.getItem('googleUser');
    
    this.isAuthenticated = !!(userToken || googleUser);
    
    if (this.isAuthenticated) {
      this.updateUIForAuthenticatedUser();
    }
    
    console.log(`🔐 Auth status: ${this.isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
  }

  // 🔧 Update UI for authenticated users
  updateUIForAuthenticatedUser() {
    // Update navigation links
    const authButtons = document.querySelectorAll('.auth-required');
    authButtons.forEach(btn => {
      btn.style.display = 'inline-block';
    });

    // Hide login buttons
    const loginButtons = document.querySelectorAll('.login-required');
    loginButtons.forEach(btn => {
      btn.style.display = 'none';
    });

    // Update user info in navbar
    const userData = JSON.parse(localStorage.getItem('googleUser') || '{}');
    if (userData.name) {
      const userNameElements = document.querySelectorAll('#user-name');
      userNameElements.forEach(el => {
        el.textContent = userData.name;
      });
    }

    if (userData.picture) {
      const userPhotoElements = document.querySelectorAll('#user-photo');
      userPhotoElements.forEach(el => {
        el.src = userData.picture;
        el.style.display = 'inline-block';
      });
    }
  }

  // 🔧 Show Login Prompt
  showLoginPrompt() {
    // Create login prompt modal
    const modalHTML = `
      <div id="login-prompt-modal" class="modal fade show" style="display: block; background: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title">🔐 Login Required</h5>
            </div>
            <div class="modal-body text-center">
              <p class="mb-4">You need to login to access this page.</p>
              <button onclick="router.loginWithGoogle()" class="btn btn-primary btn-lg me-2">
                🚀 Login with Google
              </button>
              <button onclick="router.closeLoginPrompt()" class="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // 🔧 Close Login Prompt
  closeLoginPrompt() {
    const modal = document.getElementById('login-prompt-modal');
    if (modal) {
      modal.remove();
    }
  }

  // 🔧 Login with Google
  loginWithGoogle() {
    // This will be called from the main auth system
    if (window.loginWithGoogle) {
      window.loginWithGoogle();
    } else {
      console.error('❌ Google login function not found');
    }
    this.closeLoginPrompt();
  }

  // 🔧 Logout
  logout() {
    // Clear authentication data
    localStorage.removeItem('userToken');
    localStorage.removeItem('googleUser');
    this.isAuthenticated = false;
    
    // Redirect to home
    this.navigate('/');
    
    // Reload page to reset UI
    window.location.reload();
    
    console.log('🚪 User logged out');
  }

  // 📄 Route Handlers
  loadHomePage() {
    // If user is authenticated and tries to go to home, show dashboard option
    if (this.isAuthenticated) {
      // Show dashboard redirect option
      setTimeout(() => {
        const dashboardSection = document.getElementById('dashboard-section');
        const loginSection = document.getElementById('login-section');
        
        if (dashboardSection && loginSection) {
          dashboardSection.style.display = 'block';
          loginSection.style.display = 'none';
        }
      }, 100);
    }
  }

  loadDashboard() {
    // Dashboard-specific initialization
    console.log('📊 Loading dashboard...');
    
    // Initialize dashboard components
    setTimeout(() => {
      if (window.initializeDashboard) {
        window.initializeDashboard();
      }
    }, 100);
  }

  loadMyPapers() {
    // My Papers page initialization
    console.log('📚 Loading my papers...');
    
    setTimeout(() => {
      if (window.initializeMyPapers) {
        window.initializeMyPapers();
      }
    }, 100);
  }

  loadAbout() {
    // About page initialization
    console.log('ℹ️ Loading about page...');
  }

  loadContact() {
    // Contact page initialization
    console.log('📞 Loading contact page...');
    
    setTimeout(() => {
      if (window.initializeContactForm) {
        window.initializeContactForm();
      }
    }, 100);
  }

  // 🔧 Set Authentication Status
  setAuthenticated(status, userData = null) {
    this.isAuthenticated = status;
    
    if (status && userData) {
      localStorage.setItem('googleUser', JSON.stringify(userData));
      this.updateUIForAuthenticatedUser();
    }
    
    console.log(`🔐 Auth status updated: ${status}`);
  }

  // 🔧 Get Current Route
  getCurrentRoute() {
    return this.currentRoute;
  }

  // 🔧 Check if current route is protected
  isCurrentRouteProtected() {
    const route = this.routes[this.currentRoute];
    return route ? route.protected : false;
  }
}

// 🎯 Initialize Router
const router = new Router();

// 🔧 Global Navigation Functions
function navigateTo(path) {
  router.navigate(path);
}

function logout() {
  router.logout();
}

// 🔧 Handle Link Clicks for SPA Navigation
document.addEventListener('DOMContentLoaded', () => {
  // Add click handlers to internal links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    
    if (link && link.href) {
      const url = new URL(link.href);
      
      // Check if it's an internal link
      if (url.origin === window.location.origin) {
        e.preventDefault();
        router.navigate(url.pathname);
      }
    }
  });
  
  console.log('🔗 Link handlers attached');
});

// 🔧 Export router for global access
window.router = router;

console.log('🎯 Router.js loaded successfully');