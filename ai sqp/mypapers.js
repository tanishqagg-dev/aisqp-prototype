// 📚 My Papers Page Functionality

let currentPapers = [];
let filteredPapers = [];
let currentPage = 1;
const papersPerPage = 6;

// 🔧 Initialize My Papers Page
function initializeMyPapers() {
  console.log('📚 Initializing My Papers page...');
  
  // Check authentication
  if (!checkAuthStatus()) {
    console.log('❌ User not authenticated, redirecting...');
    window.location.href = 'index.html';
    return;
  }
  
  // Load papers
  loadUserPapers();
  
  // Setup event listeners
  setupEventListeners();
  
  // Update statistics
  updateStatistics();
}

// 🔧 Load User Papers
function loadUserPapers() {
  try {
    currentPapers = getUserPapers();
    filteredPapers = [...currentPapers];
    
    console.log(`📚 Loaded ${currentPapers.length} papers`);
    
    // Show appropriate state
    if (currentPapers.length === 0) {
      showEmptyState();
    } else {
      showPapersGrid();
      renderPapers();
      setupPagination();
    }
    
    // Hide loading
    const loadingState = document.getElementById('loading-state');
    if (loadingState) loadingState.style.display = 'none';
    
  } catch (error) {
    console.error('❌ Error loading papers:', error);
    showEmptyState();
  }
}

// 🔧 Create Paper Card - GRID VERSION
function createPaperCard(paper) {
  const createdDate = new Date(paper.createdAt).toLocaleDateString();
  const difficultyColors = {
    'easy': 'success',
    'medium': 'warning', 
    'hard': 'danger'
  };
  
  const difficultyColor = difficultyColors[paper.difficulty] || 'secondary';
  const difficultyText = (paper.difficulty || 'medium').charAt(0).toUpperCase() + 
                        (paper.difficulty || 'medium').slice(1);
  
  // Create column div with proper Bootstrap classes
  const colDiv = document.createElement('div');
  colDiv.className = 'col-xl-4 col-lg-6 col-md-6 col-sm-12';
  
  // Create card HTML
  colDiv.innerHTML = `
    <div class="card h-100 border-0 shadow-sm paper-card">
      <div class="card-header bg-primary text-white">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="mb-0">📚 ${paper.subject || 'Unknown Subject'}</h6>
          <span class="badge bg-light text-dark">${paper.totalMarks || 0} marks</span>
        </div>
      </div>
      <div class="card-body d-flex flex-column">
        <div class="mb-2">
          <small class="text-muted">📅 ${createdDate}</small>
        </div>
        <div class="mb-2">
          <span class="badge bg-${difficultyColor}">
            ${difficultyText} Level
          </span>
        </div>
        <div class="mb-3 flex-grow-1">
          <strong>Topics:</strong>
          <p class="text-muted small mb-0">${paper.chapters || 'All chapters'}</p>
        </div>
      </div>
      <div class="card-footer bg-transparent">
        <div class="d-grid gap-2">
          <div class="btn-group" role="group">
            <button class="btn btn-outline-primary btn-sm" onclick="viewPaper('${paper.id}')">
              👀 View
            </button>
            <button class="btn btn-success btn-sm" onclick="downloadSQP('${paper.id}')">
              📥 Download
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="deletePaperPrompt('${paper.id}')">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return colDiv;
}

// 🔧 Render Papers
function renderPapers() {
  const papersGrid = document.getElementById('papers-grid');
  if (!papersGrid) {
    console.error('❌ Papers grid element not found');
    return;
  }
  
  const startIndex = (currentPage - 1) * papersPerPage;
  const endIndex = startIndex + papersPerPage;
  const papersToShow = filteredPapers.slice(startIndex, endIndex);
  
  // Clear existing papers
  papersGrid.innerHTML = '';
  
  console.log(`🔄 Rendering ${papersToShow.length} papers`);
  
  // Add each paper card to the grid
  papersToShow.forEach(paper => {
    const paperCard = createPaperCard(paper);
    papersGrid.appendChild(paperCard);
  });
  
  // If no papers to show
  if (papersToShow.length === 0 && filteredPapers.length === 0) {
    papersGrid.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="alert alert-info">
          <h5>🔍 No papers found</h5>
          <p class="mb-0">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    `;
  }
}

// 🔧 Show Papers Grid
function showPapersGrid() {
  const loadingState = document.getElementById('loading-state');
  const emptyState = document.getElementById('empty-state');
  const papersGrid = document.getElementById('papers-grid');
  const paginationNav = document.getElementById('pagination-nav');
  
  if (loadingState) loadingState.style.display = 'none';
  if (emptyState) emptyState.style.display = 'none';
  if (papersGrid) papersGrid.style.display = 'flex'; // Changed to flex for better grid
  if (paginationNav) paginationNav.style.display = 'block';
}

// 🔧 Show Empty State
function showEmptyState() {
  const loadingState = document.getElementById('loading-state');
  const emptyState = document.getElementById('empty-state');
  const papersGrid = document.getElementById('papers-grid');
  const paginationNav = document.getElementById('pagination-nav');
  
  if (loadingState) loadingState.style.display = 'none';
  if (emptyState) emptyState.style.display = 'block';
  if (papersGrid) papersGrid.style.display = 'none';
  if (paginationNav) paginationNav.style.display = 'none';
}

// 🔧 Setup Event Listeners
function setupEventListeners() {
  // Search
  const searchInput = document.getElementById('search-papers');
  if (searchInput) {
    searchInput.addEventListener('input', filterPapers);
  }
  
  // Filter by subject
  const subjectFilter = document.getElementById('filter-subject');
  if (subjectFilter) {
    subjectFilter.addEventListener('change', filterPapers);
  }
  
  // Sort papers
  const sortSelect = document.getElementById('sort-papers');
  if (sortSelect) {
    sortSelect.addEventListener('change', sortPapers);
  }
  
  // Delete confirmation
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', confirmDelete);
  }
}

// 🔧 Filter Papers
function filterPapers() {
  const searchInput = document.getElementById('search-papers');
  const subjectFilter = document.getElementById('filter-subject');
  
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const subjectFilterValue = subjectFilter ? subjectFilter.value.toLowerCase() : '';
  
  filteredPapers = currentPapers.filter(paper => {
    const matchesSearch = !searchTerm || 
      (paper.subject && paper.subject.toLowerCase().includes(searchTerm)) ||
      (paper.chapters && paper.chapters.toLowerCase().includes(searchTerm));
    
    const matchesSubject = !subjectFilterValue || 
      (paper.subject && paper.subject.toLowerCase().includes(subjectFilterValue));
    
    return matchesSearch && matchesSubject;
  });
  
  currentPage = 1;
  renderPapers();
  setupPagination();
}

// 🔧 Sort Papers
function sortPapers() {
  const sortSelect = document.getElementById('sort-papers');
  const sortBy = sortSelect ? sortSelect.value : 'newest';
  
  switch (sortBy) {
    case 'newest':
      filteredPapers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'oldest':
      filteredPapers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'subject':
      filteredPapers.sort((a, b) => (a.subject || '').localeCompare(b.subject || ''));
      break;
    case 'marks':
      filteredPapers.sort((a, b) => (b.totalMarks || 0) - (a.totalMarks || 0));
      break;
  }
  
  renderPapers();
}

// 🔧 Setup Pagination
function setupPagination() {
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage);
  const pagination = document.getElementById('pagination');
  
  if (!pagination) return;
  
  if (totalPages <= 1) {
    const paginationNav = document.getElementById('pagination-nav');
    if (paginationNav) paginationNav.style.display = 'none';
    return;
  }
  
  const paginationNav = document.getElementById('pagination-nav');
  if (paginationNav) paginationNav.style.display = 'block';
  
  pagination.innerHTML = '';
  
  // Previous button
  const prevLi = document.createElement('li');
  prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
  prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>`;
  pagination.appendChild(prevLi);
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${i === currentPage ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
    pagination.appendChild(li);
  }
  
  // Next button
  const nextLi = document.createElement('li');
  nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
  nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>`;
  pagination.appendChild(nextLi);
}

// 🔧 Change Page
function changePage(page) {
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage);
  
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderPapers();
    setupPagination();
    
    // Scroll to top of papers
    const papersGrid = document.getElementById('papers-grid');
    if (papersGrid) {
      papersGrid.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// 🔧 View Paper
function viewPaper(paperId) {
  const paper = currentPapers.find(p => p.id === paperId);
  
  if (paper) {
    const paperPreview = document.getElementById('paper-preview');
    if (paperPreview) {
      paperPreview.value = paper.content || 'No content available';
    }
    
    const modal = new bootstrap.Modal(document.getElementById('viewModal'));
    modal.show();
  }
}

// 🔧 Copy Paper Content
function copyPaperContent() {
  const content = document.getElementById('paper-preview').value;
  
  navigator.clipboard.writeText(content).then(() => {
    showToast('📋 Paper content copied to clipboard!', 'success');
  }).catch(() => {
    // Fallback for older browsers
    const paperPreview = document.getElementById('paper-preview');
    if (paperPreview) {
      paperPreview.select();
      document.execCommand('copy');
      showToast('📋 Paper content copied!', 'success');
    }
  });
}

// 🔧 Delete Paper Prompt
let paperToDelete = null;

function deletePaperPrompt(paperId) {
  paperToDelete = paperId;
  const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
  modal.show();
}

// 🔧 Confirm Delete
function confirmDelete() {
  if (paperToDelete) {
    const success = deletePaper(paperToDelete);
    
    if (success) {
      showToast('✅ Paper deleted successfully!', 'success');
      loadUserPapers();
      updateStatistics();
      
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
      if (modal) modal.hide();
    } else {
      showToast('❌ Failed to delete paper. Please try again.', 'danger');
    }
    
    paperToDelete = null;
  }
}

// 🔧 Update Statistics
function updateStatistics() {
  const papers = currentPapers;
  const subjects = [...new Set(papers.map(p => p.subject))];
  const totalMarks = papers.reduce((sum, p) => sum + (p.totalMarks || 0), 0);
  const thisWeek = papers.filter(p => {
    const paperDate = new Date(p.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return paperDate >= weekAgo;
  }).length;
  
  // Update stats display
  const totalPapersEl = document.getElementById('total-papers');
  const totalSubjectsEl = document.getElementById('total-subjects');
  const totalMarksEl = document.getElementById('total-marks');
  const recentActivityEl = document.getElementById('recent-activity');
  
  if (totalPapersEl) totalPapersEl.textContent = papers.length;
  if (totalSubjectsEl) totalSubjectsEl.textContent = subjects.length;
  if (totalMarksEl) totalMarksEl.textContent = totalMarks.toLocaleString();
  if (recentActivityEl) recentActivityEl.textContent = thisWeek;
}

// 🔧 Toast function (if not already defined)
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
  
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// 🔧 Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeMyPapers);

// 🔧 Export functions for global access
window.initializeMyPapers = initializeMyPapers;
window.viewPaper = viewPaper;
window.copyPaperContent = copyPaperContent;
window.deletePaperPrompt = deletePaperPrompt;
window.changePage = changePage;

console.log('📚 MyPapers.js loaded successfully');

// 🔧 Create Paper Card - BOOTSTRAP GRID VERSION
function createPaperCard(paper) {
  const createdDate = new Date(paper.createdAt).toLocaleDateString();
  const difficultyColors = {
    'easy': 'success',
    'medium': 'warning', 
    'hard': 'danger'
  };
  
  const difficultyColor = difficultyColors[paper.difficulty] || 'secondary';
  const difficultyText = (paper.difficulty || 'medium').charAt(0).toUpperCase() + 
                        (paper.difficulty || 'medium').slice(1);
  
  // Create card HTML string
  const cardHTML = `
    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4">
      <div class="card h-100 border-0 shadow-sm paper-card">
        <div class="card-header bg-primary text-white">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="mb-0">📚 ${paper.subject || 'Unknown Subject'}</h6>
            <span class="badge bg-light text-dark">${paper.totalMarks || 0} marks</span>
          </div>
        </div>
        <div class="card-body d-flex flex-column">
          <div class="mb-2">
            <small class="text-muted">📅 ${createdDate}</small>
          </div>
          <div class="mb-2">
            <span class="badge bg-${difficultyColor}">
              ${difficultyText} Level
            </span>
          </div>
          <div class="mb-3 flex-grow-1">
            <strong>Topics:</strong>
            <p class="text-muted small mb-0">${paper.chapters || 'All chapters'}</p>
          </div>
        </div>
        <div class="card-footer bg-transparent">
          <div class="d-grid gap-2">
            <div class="btn-group" role="group">
              <button class="btn btn-outline-primary btn-sm" onclick="viewPaper('${paper.id}')">
                👀 View
              </button>
              <button class="btn btn-success btn-sm" onclick="downloadSQP('${paper.id}')">
                📥 Download
              </button>
              <button class="btn btn-outline-danger btn-sm" onclick="deletePaperPrompt('${paper.id}')">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return cardHTML;
}

// 🔧 Render Papers - DIRECT HTML VERSION
function renderPapers() {
  const papersGrid = document.getElementById('papers-grid');
  if (!papersGrid) {
    console.error('❌ Papers grid element not found');
    return;
  }
  
  const startIndex = (currentPage - 1) * papersPerPage;
  const endIndex = startIndex + papersPerPage;
  const papersToShow = filteredPapers.slice(startIndex, endIndex);
  
  console.log(`🔄 Rendering ${papersToShow.length} papers`);
  
  // Build HTML string for all cards
  let gridHTML = '';
  
  papersToShow.forEach(paper => {
    gridHTML += createPaperCard(paper);
  });
  
  // Set the HTML directly
  papersGrid.innerHTML = gridHTML;
  
  // If no papers to show
  if (papersToShow.length === 0 && filteredPapers.length === 0) {
    papersGrid.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="alert alert-info">
          <h5>🔍 No papers found</h5>
          <p class="mb-0">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    `;
  }
}