// ===== MOBILE MENU FUNCTIONALITY =====
class MobileMenu {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileNav = document.getElementById('mobileNav');
        this.overlay = document.getElementById('overlay');
        this.body = document.body;
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.setAccessibilityAttributes();
    }
    
    addEventListeners() {
        // Menu button click
        this.mobileMenuBtn.addEventListener('click', () => this.toggle());
        
        // Overlay click
        this.overlay.addEventListener('click', () => this.close());
        
        // Mobile links click
        const mobileLinks = document.querySelectorAll('.mobile-nav-menu a, .mobile-call-btn');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        });
    }
    
    setAccessibilityAttributes() {
        this.mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        this.mobileMenuBtn.setAttribute('aria-controls', 'mobileNav');
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.mobileMenuBtn.classList.add('active');
        this.mobileNav.classList.add('active');
        this.overlay.classList.add('active');
        this.body.classList.add('menu-open');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
    }
    
    close() {
        this.mobileMenuBtn.classList.remove('active');
        this.mobileNav.classList.remove('active');
        this.overlay.classList.remove('active');
        this.body.classList.remove('menu-open');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
    }
}

// ===== ENHANCED PROJECTS FILTER FUNCTIONALITY =====
class ProjectsFilter {
    constructor() {
        this.filterTabs = document.querySelectorAll('.filter-tab');
        this.projectsGrid = document.getElementById('projectsGrid');
        this.projectCards = document.querySelectorAll('.project-card');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.currentFilter = 'all';
        this.visibleCount = 6;
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.initializeLoadMore();
        this.updateProjectCounts();
        this.preloadImages();
    }
    
    addEventListeners() {
        // Filter tab clicks
        this.filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.getAttribute('data-filter');
                this.applyFilter(filter);
                this.setActiveTab(tab);
            });
        });
        
        // Load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => this.loadMoreProjects());
        }
        
        // Enhanced quick view with modal simulation
        const quickViewBtns = document.querySelectorAll('.quick-view-btn');
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleQuickView(e);
            });
        });
        
        // Click on project card (excluding quick view button)
        this.projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.quick-view-btn')) {
                    const link = card.querySelector('.project-link');
                    if (link) {
                        window.location.href = link.href;
                    }
                }
            });
        });
    }
    
    preloadImages() {
        // Ensure all images are properly loaded
        this.projectCards.forEach(card => {
            const img = card.querySelector('.project-image img');
            if (img && img.src) {
                const tempImg = new Image();
                tempImg.src = img.src;
                tempImg.onload = () => {
                    img.classList.add('loaded');
                };
                tempImg.onerror = () => {
                    // If image fails to load, add error class for styling
                    img.classList.add('error');
                };
            }
        });
    }
    
    applyFilter(filter) {
        this.currentFilter = filter;
        this.visibleCount = 6;
        
        let visibleCards = 0;
        
        this.projectCards.forEach((card, index) => {
            const status = card.getAttribute('data-status');
            
            if (filter === 'all' || status === filter) {
                card.style.display = 'block';
                card.classList.remove('hidden');
                card.classList.add('visible');
                
                // Staggered animation
                card.style.animationDelay = `${Math.min(visibleCards, 5) * 0.1}s`;
                
                if (visibleCards >= this.visibleCount) {
                    card.style.display = 'none';
                } else {
                    visibleCards++;
                }
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });
        
        this.updateLoadMoreButton();
        
        // Smooth scroll to top of projects
        this.projectsGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    setActiveTab(activeTab) {
        this.filterTabs.forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }
    
    initializeLoadMore() {
        let visibleCount = 0;
        this.projectCards.forEach((card) => {
            if (visibleCount < this.visibleCount) {
                card.style.display = 'block';
                card.classList.add('visible');
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        this.updateLoadMoreButton();
    }
    
    loadMoreProjects() {
        this.visibleCount += 6;
        
        let visibleCount = 0;
        this.projectCards.forEach((card) => {
            const status = card.getAttribute('data-status');
            
            if ((this.currentFilter === 'all' || status === this.currentFilter)) {
                if (visibleCount < this.visibleCount) {
                    card.style.display = 'block';
                    card.classList.add('visible');
                    
                    // Add animation for newly revealed cards
                    if (visibleCount >= this.visibleCount - 6) {
                        card.style.animation = 'fadeInUp 0.6s ease forwards';
                    }
                    
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            }
        });
        
        this.updateLoadMoreButton();
        
        // Smooth scroll to newly loaded content
        setTimeout(() => {
            this.loadMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
    
    updateLoadMoreButton() {
        if (!this.loadMoreBtn) return;
        
        const totalFilteredProjects = Array.from(this.projectCards).filter(card => {
            const status = card.getAttribute('data-status');
            return this.currentFilter === 'all' || status === this.currentFilter;
        }).length;
        
        if (this.visibleCount >= totalFilteredProjects) {
            this.loadMoreBtn.style.display = 'none';
        } else {
            this.loadMoreBtn.style.display = 'inline-flex';
            this.loadMoreBtn.innerHTML = `<span>Load More Projects (${totalFilteredProjects - this.visibleCount} remaining)</span><i class="fas fa-arrow-down"></i>`;
        }
    }
    
    updateProjectCounts() {
        const completedCount = Array.from(this.projectCards).filter(card => 
            card.getAttribute('data-status') === 'completed'
        ).length;
        
        const ongoingCount = Array.from(this.projectCards).filter(card => 
            card.getAttribute('data-status') === 'ongoing'
        ).length;
        
        const upcomingCount = Array.from(this.projectCards).filter(card => 
            card.getAttribute('data-status') === 'upcoming'
        ).length;
        
        const allCount = this.projectCards.length;
        
        this.filterTabs.forEach(tab => {
            const filter = tab.getAttribute('data-filter');
            const span = tab.querySelector('span');
            let count = 0;
            
            switch(filter) {
                case 'all':
                    count = allCount;
                    break;
                case 'completed':
                    count = completedCount;
                    break;
                case 'ongoing':
                    count = ongoingCount;
                    break;
                case 'upcoming':
                    count = upcomingCount;
                    break;
            }
            
            if (span) {
                const baseText = span.textContent.split(' (')[0];
                span.textContent = `${baseText} (${count})`;
            }
        });
    }
    
    handleQuickView(e) {
        const card = e.target.closest('.project-card');
        const projectTitle = card.querySelector('.project-title').textContent;
        const projectStatus = card.getAttribute('data-status');
        const projectImage = card.querySelector('.project-image img').src;
        const projectLocation = card.querySelector('.meta-item:first-child span').textContent;
        
        // Create a simple modal for quick view
        this.showQuickViewModal({
            title: projectTitle,
            status: projectStatus,
            image: projectImage,
            location: projectLocation
        });
    }
    
    showQuickViewModal(project) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'quick-view-modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'quick-view-modal';
        modalContent.style.cssText = `
            background: white;
            border-radius: 16px;
            padding: 3rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;
        
        const statusText = {
            'completed': 'Completed Project',
            'ongoing': 'Ongoing Project',
            'upcoming': 'Upcoming Project'
        }[project.status];
        
        modalContent.innerHTML = `
            <div style="text-align: center;">
                <h3 style="color: var(--primary); margin-bottom: 1rem; font-size: 2.4rem;">${project.title}</h3>
                <div style="background: ${this.getStatusColor(project.status)}; color: white; padding: 0.5rem 1.5rem; border-radius: 20px; display: inline-block; margin-bottom: 2rem; font-size: 1.2rem; font-weight: 600;">
                    ${statusText}
                </div>
                <div style="margin-bottom: 2rem; font-size: 1.4rem; color: var(--gray-dark);">
                    <i class="fas fa-map-marker-alt" style="color: var(--primary); margin-right: 0.5rem;"></i>
                    <span>${project.location}</span>
                </div>
                <p style="margin-bottom: 2rem; color: var(--gray); line-height: 1.6;">
                    This is a quick preview of <strong>${project.title}</strong>. For full details, specifications, floor plans, and pricing information, please visit the project details page.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="close-modal-btn" style="padding: 1rem 2rem; border: 2px solid var(--primary); background: transparent; color: var(--primary); border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                        Close
                    </button>
                    <button class="view-details-btn" style="padding: 1rem 2rem; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                        View Full Details
                    </button>
                </div>
            </div>
        `;
        
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Add event listeners to modal buttons
        const closeBtn = modalContent.querySelector('.close-modal-btn');
        const viewDetailsBtn = modalContent.querySelector('.view-details-btn');
        
        closeBtn.addEventListener('click', () => this.closeModal(modalOverlay));
        viewDetailsBtn.addEventListener('click', () => {
            // Navigate to project details page
            const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
            window.location.href = `projects/${project.status}/${projectSlug}.html`;
        });
        
        // Animate in
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close on overlay click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal(modalOverlay);
            }
        });
        
        // Close on escape key
        const closeModalOnEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modalOverlay);
                document.removeEventListener('keydown', closeModalOnEscape);
            }
        };
        document.addEventListener('keydown', closeModalOnEscape);
    }
    
    closeModal(modal) {
        modal.style.opacity = '0';
        modal.querySelector('.quick-view-modal').style.transform = 'scale(0.9)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    getStatusColor(status) {
        const colors = {
            'completed': '#10b981',
            'ongoing': '#f59e0b',
            'upcoming': '#3b82f6'
        };
        return colors[status] || '#6b73ff';
    }
}

// ===== CUSTOM CURSOR FUNCTIONALITY =====
class CustomCursor {
    constructor() {
        this.cursorDot = document.querySelector('.cursor-dot');
        this.cursorOutline = document.querySelector('.cursor-outline');
        this.mouseX = 0;
        this.mouseY = 0;
        this.outlineX = 0;
        this.outlineY = 0;
        this.hasHover = window.matchMedia('(hover: hover)').matches;
        
        this.init();
    }
    
    init() {
        if (this.hasHover) {
            this.setupCursor();
        } else {
            this.hideCursor();
        }
    }
    
    setupCursor() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            this.cursorDot.style.left = `${this.mouseX}px`;
            this.cursorDot.style.top = `${this.mouseY}px`;
        });

        this.animateOutline();
        this.setupHoverEffects();
        this.setupWindowEvents();
    }
    
    animateOutline() {
        const animate = () => {
            this.outlineX += (this.mouseX - this.outlineX) * 0.1;
            this.outlineY += (this.mouseY - this.outlineY) * 0.1;
            
            this.cursorOutline.style.left = `${this.outlineX}px`;
            this.cursorOutline.style.top = `${this.outlineY}px`;
            
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    setupHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, [data-magnetic], .project-card, .filter-tab, .quick-view-btn');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursorOutline.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursorOutline.classList.remove('hover');
            });
        });
    }
    
    setupWindowEvents() {
        document.addEventListener('mouseleave', () => {
            this.cursorDot.classList.add('hidden');
            this.cursorOutline.classList.add('hidden');
        });
        
        document.addEventListener('mouseenter', () => {
            this.cursorDot.classList.remove('hidden');
            this.cursorOutline.classList.remove('hidden');
        });
    }
    
    hideCursor() {
        this.cursorDot.style.display = 'none';
        this.cursorOutline.style.display = 'none';
    }
}

// ===== MAGNETIC EFFECT FUNCTIONALITY =====
class MagneticEffect {
    constructor() {
        this.hasHover = window.matchMedia('(hover: hover)').matches;
        this.init();
    }
    
    init() {
        if (this.hasHover) {
            this.setupMagneticElements();
        }
    }
    
    setupMagneticElements() {
        const magneticElements = document.querySelectorAll('[data-magnetic], .project-card, .filter-tab');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 20;
                const moveX = (x / rect.width) * strength;
                const moveY = (y / rect.height) * strength;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
}

// ===== HEADER SCROLL EFFECT =====
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('header');
        this.lastScrollY = window.scrollY;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                this.header.style.background = 'rgba(255, 255, 255, 0.98)';
                this.header.style.backdropFilter = 'blur(20px)';
                this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.header.style.background = 'rgba(255, 255, 255, 0.95)';
                this.header.style.backdropFilter = 'blur(10px)';
                this.header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }
            
            this.lastScrollY = currentScrollY;
        });
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }
    
    observeElements() {
        const elementsToAnimate = document.querySelectorAll(
            '.project-card:not(.visible), .filter-tab, .stat, .cta-content'
        );
        
        elementsToAnimate.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// ===== NEWSLETTER FORM HANDLER =====
class NewsletterForm {
    constructor() {
        this.init();
    }
    
    init() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        
        // Simulate form submission
        const button = form.querySelector('button');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Subscribing...</span>';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i><span>Subscribed!</span>';
            form.reset();
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        }, 1500);
    }
}

// ===== PROJECT COUNTER ANIMATION =====
class ProjectCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat .number');
        this.init();
    }
    
    init() {
        this.animateCounters();
    }
    
    animateCounters() {
        this.stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });
    }
}

// ===== IMAGE LOADING OPTIMIZATION =====
class ImageOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.preloadImages();
        this.setupLazyLoading();
        this.setupErrorHandling();
    }
    
    preloadImages() {
        const images = document.querySelectorAll('.project-image img');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    }
    
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    setupErrorHandling() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                e.target.classList.add('image-error');
                console.warn('Image failed to load:', e.target.src);
            }
        }, true);
    }
}

// ===== SMOOTH SCROLLING =====
class SmoothScrolling {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupAnchorLinks();
    }
    
    setupAnchorLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.optimizeScrollEvents();
        this.setupResizeHandler();
    }
    
    optimizeScrollEvents() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    // Re-check scroll animations
                    const scrollAnimations = new ScrollAnimations();
                    scrollTimeout = null;
                }, 100);
            }
        });
    }
    
    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Handle resize operations
                this.handleResize();
            }, 250);
        });
    }
    
    handleResize() {
        // Close mobile menu on desktop
        const mobileMenu = new MobileMenu();
        if (window.innerWidth > 768 && mobileMenu.isOpen) {
            mobileMenu.close();
        }
    }
}

// ===== INITIALIZE ALL FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    new MobileMenu();
    new ProjectsFilter();
    new CustomCursor();
    new MagneticEffect();
    new HeaderScroll();
    new ScrollAnimations();
    new NewsletterForm();
    new ProjectCounter();
    new ImageOptimizer();
    new SmoothScrolling();
    new PerformanceOptimizer();
    
    // Add loading states
    document.body.classList.add('loaded');
});

// Handle full page load
window.addEventListener('load', function() {
    document.body.classList.add('fully-loaded');
    
    // Additional optimizations after full load
    setTimeout(() => {
        // Preload any remaining images
        const imageOptimizer = new ImageOptimizer();
    }, 1000);
});

// Error boundary for unhandled errors
window.addEventListener('error', function(e) {
    console.error('Unhandled error:', e.error);
});

// Export classes for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MobileMenu,
        ProjectsFilter,
        CustomCursor,
        MagneticEffect,
        HeaderScroll,
        ScrollAnimations,
        NewsletterForm,
        ProjectCounter,
        ImageOptimizer,
        SmoothScrolling,
        PerformanceOptimizer
    };
}