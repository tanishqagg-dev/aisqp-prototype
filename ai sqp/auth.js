// 🔐 Google Authentication & User Management - FIXED VERSION

let currentUser = null;
let isGoogleAuthLoaded = false;

// 🔧 Initialize Google Auth with Error Handling
function initializeGoogleAuth() {
  console.log('🔄 Initializing Google Auth...');
  
  // Check if Google API is loaded
  if (typeof google === 'undefined') {
    console.warn('⚠️ Google API not loaded yet, retrying...');
    setTimeout(initializeGoogleAuth, 1000);
    return;
  }

  try {
    // 🔧 REPLACE WITH YOUR ACTUAL GOOGLE CLIENT ID
    const CLIENT_ID = 'YOUR_ACTUAL_CLIENT_ID_HERE.apps.googleusercontent.com';
    
    // For development/testing, you can use a demo mode
    if (CLIENT_ID.includes('YOUR_ACTUAL') || CLIENT_ID === '1234567890-abcdef.apps.googleusercontent.com') {
      console.warn('⚠️ Using demo auth mode - Google login disabled');
      enableDemoAuth();
      return;
    }

    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
      use_fedcm_for_prompt: false
    });
    
    isGoogleAuthLoaded = true;
    console.log('✅ Google Auth initialized successfully');
    
    // Show login button if user not authenticated
    const user = getStoredUser();
    if (!user) {
      showGoogleLoginButton();
    }
    
  } catch (error) {
    console.error('❌ Google Auth initialization error:', error);
    enableDemoAuth();
  }
}

// 🔧 Enable Demo Authentication (for development)
function enableDemoAuth() {
  console.log('🎭 Demo auth mode enabled');
  
  // Replace Google login buttons with demo login
  const loginButtons = document.querySelectorAll('[onclick*="loginWithGoogle"], #google-login-btn, #google-signin-button');
  
  loginButtons.forEach(button => {
    if (button) {
      button.innerHTML = '🎭 Demo Login (For Testing)';
      button.onclick = demoLogin;
      button.style.display = 'inline-block';
    }
  });

  // Add demo login button if none exist
  if (loginButtons.length === 0) {
    addDemoLoginButton();
  }
}

// 🔧 Demo Login Function
function demoLogin() {
  const demoUser = {
    id: 'demo_user_123',
    name: 'Demo User',
    email: 'demo@cbse-sqp.com',
    picture: 'https://via.placeholder.com/150/007bff/ffffff?text=DEMO',
    loginTime: new Date().toISOString(),
    isDemo: true
  };
  
  // Store demo user
  localStorage.setItem('googleUser', JSON.stringify(demoUser));
  localStorage.setItem('userToken', 'demo_token');
  currentUser = demoUser;
  
  console.log('✅ Demo user logged in:', demoUser);
  
  // Update UI
  updateUIForLogin(demoUser);
  
  // Redirect to dashboard
  if (window.router) {
    window.router.setAuthenticated(true, demoUser);
    window.router.navigate('/dashboard');
  } else {
    window.location.href = 'dashboard.html';
  }
  
  showToast('🎭 Demo login successful! You can now generate papers.', 'success');
}

// 🔧 Add Demo Login Button
function addDemoLoginButton() {
  const authSection = document.getElementById('auth-section') || document.getElementById('login-section');
  
  if (authSection) {
    const demoButton = document.createElement('button');
    demoButton.className = 'btn btn-warning btn-lg me-3';
    demoButton.innerHTML = '🎭 Demo Login (For Testing)';
    demoButton.onclick = demoLogin;
    
    authSection.appendChild(demoButton);
    
    // Add explanation
    const explanation = document.createElement('p');
    explanation.className = 'text-muted mt-2 small';
    explanation.innerHTML = '<i>Demo mode is active. Google OAuth needs to be configured for production.</i>';
    authSection.appendChild(explanation);
  }
}

// 🔧 Show Google Login Button
function showGoogleLoginButton() {
  const loginButton = document.getElementById('google-signin-button');
  if (loginButton) {
    loginButton.style.display = 'block';
    
    try {
      google.accounts.id.renderButton(loginButton, { 
        theme: 'outline', 
        size: 'large',
        text: 'signin_with',
        width: 250,
        logo_alignment: 'left'
      });
    } catch (error) {
      console.error('❌ Error rendering Google button:', error);
      // Fallback to custom button
      loginButton.innerHTML = '<button class="btn btn-primary" onclick="loginWithGoogle()">🚀 Login with Google</button>';
    }
  }
}

// 🔧 Handle Google Credential Response
function handleCredentialResponse(response) {
  try {
    console.log('🔄 Processing Google credential...');
    
    // Decode JWT token
    const userInfo = parseJwt(response.credential);
    
    if (!userInfo) {
      throw new Error('Failed to decode user information');
    }
    
    const user = {
      id: userInfo.sub,
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      loginTime: new Date().toISOString(),
      isDemo: false
    };
    
    // Store user data
    localStorage.setItem('googleUser', JSON.stringify(user));
    localStorage.setItem('userToken', response.credential);
    currentUser = user;
    
    console.log('✅ Google user logged in:', user);
    
    // Update UI
    updateUIForLogin(user);
    
    // Redirect to dashboard
    if (window.router) {
      window.router.setAuthenticated(true, user);
      window.router.navigate('/dashboard');
    } else {
      window.location.href = 'dashboard.html';
    }
    
    showToast('✅ Login successful! Welcome to CBSE SQP Generator.', 'success');
    
  } catch (error) {
    console.error('❌ Login error:', error);
    showToast('❌ Login failed. Please try again.', 'danger');
  }
}

// 🔧 Login with Google (Custom Button)
function loginWithGoogle() {
  if (!isGoogleAuthLoaded) {
    console.warn('⚠️ Google Auth not loaded, using demo login');
    demoLogin();
    return;
  }
  
  try {
    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        console.log('🔄 Google prompt not shown, trying alternative method...');
        
        // Try direct sign-in flow
        google.accounts.id.renderButton(
          document.createElement('div'),
          { theme: 'outline', size: 'large' }
        );
      }
    });
  } catch (error) {
    console.error('❌ Google login error:', error);
    showToast('❌ Google login unavailable. Using demo mode.', 'warning');
    demoLogin();
  }
}

// 🔧 Update UI for Login
function updateUIForLogin(user) {
  // Hide login sections
  const loginSections = document.querySelectorAll('#login-section, #google-signin-button, .login-required');
  loginSections.forEach(section => {
    if (section) section.style.display = 'none';
  });
  
  // Show authenticated sections
  const authSections = document.querySelectorAll('#dashboard-section, #logged-in-section, .auth-required');
  authSections.forEach(section => {
    if (section) section.style.display = 'block';
  });
  
  // Update user name displays
  const userNameElements = document.querySelectorAll('#user-name, #nav-user-name, .user-name');
  userNameElements.forEach(element => {
    if (element) element.textContent = user.name;
  });
  
  // Update user photos
  const userPhotoElements = document.querySelectorAll('#user-photo, #nav-user-photo, .user-photo');
  userPhotoElements.forEach(element => {
    if (element && user.picture) {
      element.src = user.picture;
      element.style.display = 'inline-block';
    }
  });
  
  // Update navbar if available
  if (window.navbarComponent) {
    window.navbarComponent.updateAuthStatus(true, user);
  }
}

// 🔧 Logout Function
function logout() {
  try {
    // Clear local storage
    localStorage.removeItem('googleUser');
    localStorage.removeItem('userToken');
    localStorage.removeItem('cbse_user'); // Legacy key
    currentUser = null;
    
    // Sign out from Google if available
    if (isGoogleAuthLoaded && typeof google !== 'undefined') {
      try {
        google.accounts.id.disableAutoSelect();
      } catch (error) {
        console.log('Google sign-out not available');
      }
    }
    
    console.log('✅ User logged out');
    
    // Update UI
    updateUIForLogout();
    
    // Redirect to home
    if (window.router) {
      window.router.setAuthenticated(false);
      window.router.navigate('/');
    } else {
      window.location.href = 'index.html';
    }
    
    showToast('👋 Logged out successfully!', 'info');
    
  } catch (error) {
    console.error('❌ Logout error:', error);
    // Force redirect even if logout fails
    window.location.href = 'index.html';
  }
}

// 🔧 Update UI for Logout
function updateUIForLogout() {
  // Show login sections
  const loginSections = document.querySelectorAll('#login-section, .login-required');
  loginSections.forEach(section => {
    if (section) section.style.display = 'block';
  });
  
  // Hide authenticated sections
  const authSections = document.querySelectorAll('#dashboard-section, #logged-in-section, .auth-required');
  authSections.forEach(section => {
    if (section) section.style.display = 'none';
  });
  
  // Update navbar if available
  if (window.navbarComponent) {
    window.navbarComponent.updateAuthStatus(false);
  }
}

// 🔧 Get Stored User
function getStoredUser() {
  try {
    // Try new key first, then fallback to legacy
    const userStr = localStorage.getItem('googleUser') || localStorage.getItem('cbse_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('❌ Error getting stored user:', error);
    return null;
  }
}

// 🔧 Check Authentication Status
function checkAuthStatus() {
  const user = getStoredUser();
  
  if (user) {
    currentUser = user;
    updateUIForLogin(user);
    console.log('✅ User is authenticated:', user.name);
    
    // Update router if available
    if (window.router) {
      window.router.setAuthenticated(true, user);
    }
    
    return true;
  } else {
    updateUIForLogout();
    console.log('❌ User not authenticated');
    
    // Initialize auth system
    setTimeout(initializeGoogleAuth, 500);
    
    // Update router if available
    if (window.router) {
      window.router.setAuthenticated(false);
    }
    
    return false;
  }
}

// 🔧 Protect Page (redirect if not authenticated)
function protectPage() {
  const user = getStoredUser();
  if (!user) {
    console.log('🚫 Access denied - redirecting to home');
    
    if (window.router) {
      window.router.navigate('/');
      window.router.showLoginPrompt();
    } else {
      window.location.href = 'index.html';
    }
    return false;
  }
  return true;
}

// 🔧 Save Paper to User Collection
function savePaperToCollection(paperData) {
  const user = getStoredUser();
  const papers = getUserPapers();
  const newPaper = {
    id: Date.now().toString(),
    userId: user.id,
    subject: paperData.subject,
    totalMarks: paperData.totalMarks,
    chapters: paperData.chapters,
    content: paperData.content,
    createdAt: new Date().toISOString()
  };
  
  papers.push(newPaper);
  localStorage.setItem('myPapers', JSON.stringify(papers));
  return newPaper.id;
}

// 🔧 Get User Papers
function getUserPapers() {
  try {
    const user = getStoredUser();
    if (!user) return [];
    
    const allPapers = JSON.parse(localStorage.getItem('myPapers') || '[]');
    return allPapers.filter(paper => paper.userId === user.id);
  } catch (error) {
    console.error('❌ Error getting user papers:', error);
    return [];
  }
}

// 🔧 Delete Paper
function deletePaper(paperId) {
  try {
    const papers = JSON.parse(localStorage.getItem('myPapers') || '[]');
    const filteredPapers = papers.filter(paper => paper.id !== paperId);
    
    localStorage.setItem('myPapers', JSON.stringify(filteredPapers));
    
    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent('papersUpdated'));
    
    console.log('✅ Paper deleted:', paperId);
    return true;
  } catch (error) {
    console.error('❌ Error deleting paper:', error);
    return false;
  }
}

// 🔧 Download Paper
function downloadSQP(sqpId) {
  try {
    const papers = getUserPapers();
    const paper = papers.find(p => p.id === sqpId);
    
    if (!paper) {
      showToast('❌ Paper not found', 'danger');
      return;
    }
    
    // Create downloadable file
    const content = paper.content;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `CBSE_${paper.subject.replace(/\s+/g, '_')}_${paper.totalMarks}marks_${new Date(paper.createdAt).toLocaleDateString().replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showToast('✅ Paper downloaded successfully!', 'success');
    console.log('✅ Paper downloaded:', paper.subject);
  } catch (error) {
    console.error('❌ Download error:', error);
    showToast('❌ Download failed. Please try again.', 'danger');
  }
}

// 🔧 Send Feedback
function sendFeedback(feedbackData) {
  try {
    // Store feedback locally (in real app, send to backend)
    const feedback = {
      ...feedbackData,
      userId: currentUser?.id || 'anonymous',
      timestamp: new Date().toISOString()
    };
    
    const allFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    allFeedback.push(feedback);
    localStorage.setItem('userFeedback', JSON.stringify(allFeedback));
    
    console.log('📧 Feedback stored:', feedback);
    showToast('✅ Thank you for your feedback!', 'success');
    
    return true;
  } catch (error) {
    console.error('❌ Feedback error:', error);
    showToast('❌ Failed to send feedback. Please try again.', 'danger');
    return false;
  }
}

// 🔧 Utility: Parse JWT Token
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('❌ JWT parse error:', error);
    return null;
  }
}

// 🔧 Toast Notification Function
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `alert alert-${type} position-fixed`;
  toast.style.cssText = `
    top: 80px; right: 20px; z-index: 10000; 
    animation: slideIn 0.3s ease-out;
    max-width: 350px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  `;
  toast.innerHTML = `
    <div class="d-flex align-items-center">
      <span>${message}</span>
      <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// 🔧 Add required CSS animations
function addAuthCSS() {
  if (document.getElementById('auth-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'auth-styles';
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    
    .user-avatar {
      transition: all 0.2s ease;
    }
    
    .user-avatar:hover {
      transform: scale(1.05);
    }
  `;
  
  document.head.appendChild(style);
}

// 🎯 Initialize Authentication System
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔄 Initializing authentication system...');
  
  // Add required CSS
  addAuthCSS();
  
  // Check authentication status
  checkAuthStatus();
  
  // Initialize Google Auth after a short delay
  setTimeout(initializeGoogleAuth, 1000);
});

// 🔧 Export for global access
window.loginWithGoogle = loginWithGoogle;
window.logout = logout;
window.checkAuthStatus = checkAuthStatus;
window.protectPage = protectPage;
window.savePaperToCollection = savePaperToCollection;
window.getUserPapers = getUserPapers;
window.downloadSQP = downloadSQP;
window.sendFeedback = sendFeedback;

console.log('🔐 Auth.js loaded successfully');