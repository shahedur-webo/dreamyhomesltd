// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Initialize cursor position
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// Check if device supports hover
const hasHover = window.matchMedia('(hover: hover)').matches;

if (hasHover) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth outline movement
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateOutline);
    }
    
    animateOutline();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, [data-magnetic], .stat-card, .moto-card, .value-card, .team-member');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.classList.add('hidden');
        cursorOutline.classList.add('hidden');
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.classList.remove('hidden');
        cursorOutline.classList.remove('hidden');
    });
} else {
    // Hide custom cursor on touch devices
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
    document.body.classList.add('loaded');
}

// Mobile Menu Functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');
const body = document.body;

function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-menu a').forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
});

// Text Reveal Animation
function initTextReveal() {
    const textElements = document.querySelectorAll('[data-text-reveal]');
    
    textElements.forEach(element => {
        const children = element.children;
        
        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * 0.2}s`;
        });
    });
}

// Magnetic Effect
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            if (!hasHover) return;
            
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 20;
            const moveX = (x / rect.width) * strength;
            const moveY = (y / rect.height) * strength;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Counter Animation for Statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.classList.contains('number') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.classList.contains('number') ? '+' : '');
        }
    }, 16);
}

// Initialize counters when in viewport
function initCounters() {
    const counters = document.querySelectorAll('.stat-number, .number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter, target);
        }
    });
}

// Scroll Animations
function checkScroll() {
    const elements = document.querySelectorAll('.timeline-item, .stat-card, .moto-card, .value-card, .team-member, .achievement-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
    
    // Initialize counters when they come into view
    initCounters();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form handling
function handleFormSubmission(form, successMessage) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(successMessage);
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    handleFormSubmission(newsletterForm, 'Thank you for subscribing to our newsletter!');
}

// Interactive timeline
function setupTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
        
        // Add delay for staggered animation
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Button ripple effect
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .call-now-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup interactive elements
    initTextReveal();
    initMagneticEffect();
    setupTimeline();
    initRippleEffect();
    
    // Initial check for scroll animations
    checkScroll();
    
    // Set up scroll event listener
    window.addEventListener('scroll', function() {
        checkScroll();
    });
    
    // Initialize counters if already in viewport
    initCounters();
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.classList.add('loaded');
    }, 100);
});

// Enhanced touch interactions for mobile
document.addEventListener('touchstart', function() {}, { passive: true });

// Performance optimization for scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            checkScroll();
            scrollTimeout = null;
        }, 100);
    }
});

// Handle browser resize
window.addEventListener('resize', function() {
    // Re-check scroll animations after resize
    setTimeout(checkScroll, 100);
});