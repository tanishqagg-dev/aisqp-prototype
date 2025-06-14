// 🎯 Navbar Component for CBSE SQP Generator
class NavbarComponent {
  constructor() {
    this.isAuthenticated = false;
    this.userData = null;
    this.currentPage = '';
    this.navbarHTML = '';
    this.init();
  }

  // 🔧 Initialize Navbar Component
  init() {
    this.checkAuthStatus();
    this.detectCurrentPage();
    this.generateNavbarHTML();
    this.attachEventListeners();
    console.log('🧭 Navbar component initialized');
  }

  // 🔧 Check Authentication Status
  checkAuthStatus() {
    const userToken = localStorage.getItem('userToken');
    const googleUser = localStorage.getItem('googleUser');
    
    if (googleUser) {
      try {
        this.userData = JSON.parse(googleUser);
        this.isAuthenticated = true;
      } catch (error) {
        console.error('❌ Error parsing user data:', error);
        this.isAuthenticated = false;
      }
    } else {
      this.isAuthenticated = false;
    }
    
    console.log(`🔐 Navbar auth status: ${this.isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
  }

  // 🔧 Detect Current Page
  detectCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html' || path.includes('index')) {
      this.currentPage = 'home';
    } else if (path.includes('dashboard')) {
      this.currentPage = 'dashboard';
    } else if (path.includes('mypapers')) {
      this.currentPage = 'mypapers';
    } else if (path.includes('about')) {
      this.currentPage = 'about';
    } else if (path.includes('contact')) {
      this.currentPage = 'contact';
    } else {
      this.currentPage = '';
    }
  }

  // 🔧 Generate Navbar HTML
  generateNavbarHTML() {
    const isActive = (page) => this.currentPage === page ? 'active' : '';
    
    this.navbarHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
        <div class="container">
          <!-- Brand -->
          <a class="navbar-brand fw-bold" href="${this.isAuthenticated ? '/dashboard' : '/'}">
            <span class="brand-icon">🎯</span>
            <span class="brand-text">CBSE SQP Generator</span>
          </a>
          
          <!-- Mobile Toggle Button -->
          <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <!-- Navigation Links -->
          <div class="collapse navbar-collapse" id="navbarNav">
            ${this.generateNavigationLinks()}
            
            <!-- Right Side - Auth Section -->
            <div class="navbar-nav ms-auto">
              ${this.generateAuthSection()}
            </div>
          </div>
        </div>
      </nav>
      
      <!-- Mobile Quick Actions (shown only on mobile) -->
      <div class="mobile-quick-actions d-lg-none">
        <div class="container-fluid">
          <div class="row">
            ${this.generateMobileQuickActions()}
          </div>
        </div>
      </div>
    `;
  }

  // 🔧 Generate Navigation Links
  generateNavigationLinks() {
    if (!this.isAuthenticated) {
      // Public navigation
      return `
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link ${this.currentPage === 'home' ? 'active' : ''}" href="/">
              <i class="nav-icon">🏠</i> Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">
              <i class="nav-icon">ℹ️</i> About
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="showLoginPrompt()">
              <i class="nav-icon">📊</i> Dashboard <span class="badge bg-warning text-dark ms-1">Login Required</span>
            </a>
          </li>
        </ul>
      `;
    } else {
      // Authenticated navigation
      return `
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link ${this.currentPage === 'dashboard' ? 'active' : ''}" href="/dashboard">
              <i class="nav-icon">📊</i> Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${this.currentPage === 'mypapers' ? 'active' : ''}" href="/mypapers">
              <i class="nav-icon">📚</i> My Papers
              <span id="papers-count-badge" class="badge bg-success ms-1">0</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${this.currentPage === 'about' ? 'active' : ''}" href="/about">
              <i class="nav-icon">ℹ️</i> About
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${this.currentPage === 'contact' ? 'active' : ''}" href="/contact">
              <i class="nav-icon">📞</i> Contact
            </a>
          </li>
        </ul>
      `;
    }
  }

  // 🔧 Generate Auth Section
  generateAuthSection() {
    if (!this.isAuthenticated) {
      // Login section
      return `
        <button class="btn btn-outline-light me-2" onclick="showLoginPrompt()">
          🚀 Login with Google
        </button>
        <button class="btn btn-light" onclick="scrollToFeatures()">
          📖 Learn More
        </button>
      `;
    } else {
      // User profile section
      const userName = this.userData?.name || 'User';
      const userPhoto = this.userData?.picture || '';
      const userEmail = this.userData?.email || '';
      
      return `
        <!-- Notifications -->
        <div class="nav-item dropdown me-2">
          <a class="nav-link position-relative" href="#" id="notificationsDropdown" role="button" 
             data-bs-toggle="dropdown" aria-expanded="false">
            <span class="notification-icon">🔔</span>
            <span id="notification-badge" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="display: none;">
              0
            </span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end notification-dropdown">
            <li><h6 class="dropdown-header">📢 Notifications</h6></li>
            <li><hr class="dropdown-divider"></li>
            <li id="no-notifications" class="dropdown-item text-muted text-center">
              No new notifications
            </li>
          </ul>
        </div>
        
        <!-- Quick Generate Button -->
        <button class="btn btn-success me-2 d-none d-md-inline-block" onclick="quickGenerate()">
          ⚡ Quick Generate
        </button>
        
        <!-- User Profile Dropdown -->
        <div class="nav-item dropdown">
          <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown" 
             role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="${userPhoto}" alt="User" class="rounded-circle me-2 user-avatar" 
                 width="32" height="32" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';">
            <span class="user-avatar-fallback" style="display: none;">👤</span>
            <span class="user-name d-none d-md-inline">${userName}</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end user-dropdown">
            <li>
              <div class="dropdown-header">
                <div class="d-flex align-items-center">
                  <img src="${userPhoto}" alt="User" class="rounded-circle me-2" width="40" height="40"
                       onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';">
                  <span class="user-avatar-fallback" style="display: none;">👤</span>
                  <div>
                    <div class="fw-bold">${userName}</div>
                    <small class="text-muted">${userEmail}</small>
                  </div>
                </div>
              </div>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="/mypapers">📚 My Papers</a></li>
            <li><a class="dropdown-item" href="#" onclick="showSettingsModal()">⚙️ Settings</a></li>
            <li><a class="dropdown-item" href="#" onclick="exportAllData()">💾 Export Data</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" onclick="logout()">🚪 Logout</a></li>
          </ul>
        </div>
      `;
    }
  }

  // 🔧 Generate Mobile Quick Actions
  generateMobileQuickActions() {
    if (!this.isAuthenticated) {
      return `
        <div class="col-6">
          <button class="btn btn-primary w-100 mb-2" onclick="showLoginPrompt()">
            🚀 Login
          </button>
        </div>
        <div class="col-6">
          <button class="btn btn-outline-primary w-100 mb-2" onclick="scrollToFeatures()">
            📖 About
          </button>
        </div>
      `;
    } else {
      return `
        <div class="col-4">
          <button class="btn btn-success w-100 btn-sm" onclick="quickGenerate()">
            ⚡ Generate
          </button>
        </div>
        <div class="col-4">
          <a href="/mypapers" class="btn btn-outline-primary w-100 btn-sm">
            📚 Papers
          </a>
        </div>
        <div class="col-4">
          <button class="btn btn-outline-secondary w-100 btn-sm" onclick="showSettingsModal()">
            ⚙️ Settings
          </button>
        </div>
      `;
    }
  }

  // 🔧 Render Navbar
  render(targetElement = 'body') {
    const target = typeof targetElement === 'string' 
      ? document.querySelector(targetElement) 
      : targetElement;
    
    if (target) {
      // Remove existing navbar
      const existingNav = target.querySelector('nav.navbar');
      if (existingNav) {
        existingNav.remove();
      }
      
      // Add new navbar at the beginning
      target.insertAdjacentHTML('afterbegin', this.navbarHTML);
      this.attachEventListeners();
      this.updatePapersCount();
      this.addCustomCSS();
      console.log('🧭 Navbar rendered');
    }
  }

  // 🔧 Attach Event Listeners
  attachEventListeners() {
    // Update navbar when auth status changes
    window.addEventListener('authStatusChanged', (e) => {
      this.isAuthenticated = e.detail.isAuthenticated;
      this.userData = e.detail.userData;
      this.generateNavbarHTML();
      this.render();
    });

    // Update papers count
    window.addEventListener('papersUpdated', () => {
      this.updatePapersCount();
    });

    // Handle mobile menu collapse
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    
    if (navbarToggler && navbarCollapse) {
      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
          if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
          }
        }
      });
    }
  }

  // 🔧 Update Papers Count Badge
  updatePapersCount() {
    const badge = document.getElementById('papers-count-badge');
    if (badge) {
      const papers = JSON.parse(localStorage.getItem('myPapers') || '[]');
      const count = papers.length;
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }

  // 🔧 Update Authentication Status
  updateAuthStatus(isAuthenticated, userData = null) {
    this.isAuthenticated = isAuthenticated;
    this.userData = userData;
    this.generateNavbarHTML();
    this.render();
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('authStatusChanged', {
      detail: { isAuthenticated, userData }
    }));
  }

  // 🔧 Add Custom CSS for Navbar
  addCustomCSS() {
    const existingStyle = document.getElementById('navbar-styles');
    if (existingStyle) return;

    const style = document.createElement('style');
    style.id = 'navbar-styles';
    style.textContent = `
      .navbar-brand {
        font-weight: 600;
        font-size: 1.4rem;
        transition: all 0.3s ease;
      }
      
      .navbar-brand:hover {
        transform: scale(1.05);
      }
      
      .brand-icon {
        font-size: 1.6rem;
        margin-right: 8px;
      }
      
      .nav-link {
        font-weight: 500;
        transition: all 0.2s ease;
        border-radius: 6px;
        margin: 0 2px;
      }
      
      .nav-link:hover {
        background: rgba(255,255,255,0.1);
        transform: translateY(-1px);
      }
      
      .nav-link.active {
        background: rgba(255,255,255,0.2);
        font-weight: 600;
      }
      
      .nav-icon {
        margin-right: 5px;
        font-size: 1.1rem;
      }
      
      .user-avatar {
        border: 2px solid rgba(255,255,255,0.3);
        transition: all 0.2s ease;
      }
      
      .user-avatar:hover {
        border-color: rgba(255,255,255,0.6);
        transform: scale(1.1);
      }
      
      .notification-icon {
        font-size: 1.2rem;
        transition: all 0.2s ease;
      }
      
      .notification-dropdown {
        min-width: 300px;
        max-height: 400px;
        overflow-y: auto;
      }
      
      .user-dropdown {
        min-width: 250px;
      }
      
      .mobile-quick-actions {
        background: rgba(0,123,255,0.1);
        padding: 10px 0;
        border-bottom: 1px solid rgba(0,123,255,0.2);
      }
      
      @media (max-width: 991px) {
        .navbar-nav {
          margin-top: 10px;
        }
        
        .nav-link {
          padding: 8px 15px;
          margin: 2px 0;
        }
        
        .brand-text {
          font-size: 1.2rem;
        }
      }
      
      @media (max-width: 576px) {
        .navbar-brand {
          font-size: 1.2rem;
        }
        
        .brand-icon {
          font-size: 1.4rem;
        }
        
        .user-name {
          display: none !important;
        }
      }
      
      /* Dropdown animations */
      .dropdown-menu {
        animation: dropdownFadeIn 0.2s ease-out;
      }
      
      @keyframes dropdownFadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Badge animations */
      .badge {
        animation: badgePulse 2s infinite;
      }
      
      @keyframes badgePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
    `;
    
    document.head.appendChild(style);
  }

  // 🔧 Show/Hide Loading State
  setLoading(isLoading) {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (isLoading) {
        navbar.style.opacity = '0.7';
        navbar.style.pointerEvents = 'none';
      } else {
        navbar.style.opacity = '1';
        navbar.style.pointerEvents = 'auto';
      }
    }
  }
}

// 🔧 Global Helper Functions for Navbar
function showLoginPrompt() {
  if (window.router && window.router.showLoginPrompt) {
    window.router.showLoginPrompt();
  } else {
    // Fallback login prompt
    const loginModal = `
      <div id="login-prompt-modal" class="modal fade show" style="display: block; background: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title">🔐 Login Required</h5>
              <button type="button" class="btn-close btn-close-white" onclick="closeModal('login-prompt-modal')"></button>
            </div>
            <div class="modal-body text-center">
              <p class="mb-4">You need to login to access this feature.</p>
              <button onclick="loginWithGoogle()" class="btn btn-primary btn-lg me-2">
                🚀 Login with Google
              </button>
              <button onclick="closeModal('login-prompt-modal')" class="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loginModal);
  }
}

function quickGenerate() {
  // Quick generate with last used settings
  const lastSettings = JSON.parse(localStorage.getItem('lastGenerateSettings') || '{}');
  
  if (Object.keys(lastSettings).length > 0) {
    // Use last settings
    if (window.router) {
      window.router.navigate('/dashboard');
    } else {
      window.location.href = '/dashboard.html';
    }
    
    // Pre-fill form with last settings
    setTimeout(() => {
      if (lastSettings.subject) {
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) subjectSelect.value = lastSettings.subject;
      }
      
      showToast('⚡ Quick generate with last settings!', 'info');
    }, 500);
  } else {
    // No previous settings, go to dashboard
    if (window.router) {
      window.router.navigate('/dashboard');
    } else {
      window.location.href = '/dashboard.html';
    }
  }
}

function showSettingsModal() {
  const settingsModal = `
    <div id="settings-modal" class="modal fade show" style="display: block; background: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title">⚙️ Settings</h5>
            <button type="button" class="btn-close btn-close-white" onclick="closeModal('settings-modal')"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">🎨 Theme</label>
              <select class="form-select" id="theme-select">
                <option value="light">☀️ Light</option>
                <option value="dark">🌙 Dark</option>
                <option value="auto">🔄 Auto</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">🔔 Notifications</label>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="notifications-enabled" checked>
                <label class="form-check-label" for="notifications-enabled">
                  Enable notifications
                </label>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">💾 Auto-save</label>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="autosave-enabled" checked>
                <label class="form-check-label" for="autosave-enabled">
                  Auto-save generated papers
                </label>
              </div>
            </div>
            <button class="btn btn-info w-100" onclick="saveSettings()">Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', settingsModal);
}

function exportAllData() {
  const allData = {
    papers: JSON.parse(localStorage.getItem('myPapers') || '[]'),
    settings: JSON.parse(localStorage.getItem('userSettings') || '{}'),
    statistics: JSON.parse(localStorage.getItem('userStatistics') || '{}'),
    exportDate: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(allData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `cbse-sqp-data-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  showToast('💾 Data exported successfully!', 'success');
}

function scrollToFeatures() {
  const featuresSection = document.getElementById('features');
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.remove();
  }
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `alert alert-${type} position-fixed`;
  toast.style.cssText = `
    top: 80px; right: 20px; z-index: 10000; 
    animation: slideIn 0.3s ease-out;
    max-width: 350px;
  `;
  toast.innerHTML = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// 🎯 Initialize Navbar Component
const navbarComponent = new NavbarComponent();

// 🔧 Auto-render navbar when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  navbarComponent.render();
});

// 🔧 Export for global access
window.navbarComponent = navbarComponent;

console.log('🧭 Navbar.js loaded successfully');