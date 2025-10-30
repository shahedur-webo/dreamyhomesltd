// Enhanced JavaScript with Advanced Interactions

// Mobile Menu Functionality
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
        this.animateMenuItems();
    }
    
    close() {
        this.mobileMenuBtn.classList.remove('active');
        this.mobileNav.classList.remove('active');
        this.overlay.classList.remove('active');
        this.body.classList.remove('menu-open');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
    }
    
    animateMenuItems() {
        const menuItems = document.querySelectorAll('.mobile-nav-menu li');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Smooth Scroll for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Only apply smooth scroll for anchor links on same page
                if (href !== '#' && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
}

// Header Scroll Effect
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

// Animation on Scroll
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
            '.overview-card, .project-card, .stat-card, .about-visual, .comfort-text'
        );
        
        elementsToAnimate.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.init();
    }
    
    init() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
        }
    }
    
    handleNewsletterSubmit(e) {
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

// Video Player Controls
class VideoPlayer {
    constructor() {
        this.init();
    }
    
    init() {
        const video = document.querySelector('.comfort-video video');
        const playBtn = document.querySelector('.play-btn');
        
        if (video && playBtn) {
            playBtn.addEventListener('click', () => this.togglePlay(video, playBtn));
            
            video.addEventListener('click', () => this.togglePlay(video, playBtn));
            
            video.addEventListener('play', () => {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });
            
            video.addEventListener('pause', () => {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            });
        }
    }
    
    togglePlay(video, button) {
        if (video.paused) {
            video.play();
            button.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            button.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
}

// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursorDot = document.getElementById('cursorDot');
        this.cursorOutline = document.getElementById('cursorOutline');
        this.mouseX = 0;
        this.mouseY = 0;
        this.outlineX = 0;
        this.outlineY = 0;
        this.init();
    }
    
    init() {
        if (window.matchMedia('(pointer: fine)').matches) {
            this.bindEvents();
        } else {
            this.hideCursor();
        }
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        document.addEventListener('mouseenter', () => this.showCursor());
        document.addEventListener('mouseleave', () => this.hideCursor());
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [data-magnetic]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.onElementHover());
            el.addEventListener('mouseleave', () => this.onElementLeave());
        });
        
        this.animate();
    }
    
    animate() {
        // Dot follows cursor directly
        this.cursorDot.style.left = this.mouseX + 'px';
        this.cursorDot.style.top = this.mouseY + 'px';
        
        // Outline follows with delay
        this.outlineX += (this.mouseX - this.outlineX) * 0.1;
        this.outlineY += (this.mouseY - this.outlineY) * 0.1;
        
        this.cursorOutline.style.left = this.outlineX + 'px';
        this.cursorOutline.style.top = this.outlineY + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
    
    onElementHover() {
        this.cursorOutline.classList.add('hover');
    }
    
    onElementLeave() {
        this.cursorOutline.classList.remove('hover');
    }
    
    showCursor() {
        this.cursorDot.classList.remove('hidden');
        this.cursorOutline.classList.remove('hidden');
    }
    
    hideCursor() {
        this.cursorDot.classList.add('hidden');
        this.cursorOutline.classList.add('hidden');
    }
}

// Magnetic Buttons
class MagneticButtons {
    constructor() {
        this.magneticElements = document.querySelectorAll('[data-magnetic]');
        this.init();
    }
    
    init() {
        this.magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.onMouseMove(e, element));
            element.addEventListener('mouseleave', (e) => this.onMouseLeave(e, element));
        });
    }
    
    onMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) * 0.1;
        const deltaY = (y - centerY) * 0.1;
        
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
    
    onMouseLeave(e, element) {
        element.style.transform = 'translate(0, 0)';
    }
}

// Tilt Effect
class TiltEffect {
    constructor() {
        this.tiltElements = document.querySelectorAll('[data-tilt]');
        this.init();
    }
    
    init() {
        this.tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.onMouseMove(e, element));
            element.addEventListener('mouseleave', (e) => this.onMouseLeave(e, element));
        });
    }
    
    onMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        const tiltX = deltaY * 10; // Rotate on X axis based on Y position
        const tiltY = -deltaX * 10; // Rotate on Y axis based on X position
        
        element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
    
    onMouseLeave(e, element) {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// Text Reveal Animation
class TextReveal {
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
                    this.animateText(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }
    
    observeElements() {
        const elementsToAnimate = document.querySelectorAll('[data-text-reveal]');
        elementsToAnimate.forEach(el => {
            this.observer.observe(el);
        });
    }
    
    animateText(element) {
        const children = element.children;
        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Counter Animation
class CounterAnimation {
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
                    this.animateCounter(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
    }
    
    observeElements() {
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            this.observer.observe(counter);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const numberElement = element.querySelector('.number');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            numberElement.textContent = Math.floor(current);
        }, 16);
    }
}

// Ripple Effect
class RippleEffect {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-ripple]');
            if (target) {
                this.createRipple(e, target);
            }
        });
    }
    
    createRipple(event, element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Parallax Scrolling
class ParallaxScroll {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.updateParallax();
        });
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background, .floating-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = index * 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}

// Initialize all enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    new MobileMenu();
    new SmoothScroll();
    new HeaderScroll();
    new ScrollAnimations();
    new FormHandler();
    new VideoPlayer();
    
    // New enhanced functionality
    new CustomCursor();
    new MagneticButtons();
    new TiltEffect();
    new TextReveal();
    new CounterAnimation();
    new RippleEffect();
    new ParallaxScroll();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Performance optimizations
window.addEventListener('load', function() {
    document.body.classList.add('fully-loaded');
    
    // Remove loading spinner if exists
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Enhanced lazy loading with intersection observer
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Enhanced resize handler with debouncing
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Re-initialize components that need recalculation
        if (window.innerWidth > 768) {
            const mobileMenu = document.querySelector('.mobile-nav');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }
    }, 250);
});