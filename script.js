// ===================================
// AUTHOR: Omkar R. Ghare (OG)
// © 2025 OG - All Rights Reserved
// DO NOT REMOVE THIS HEADER
// ===================================
// ===================================
// PRELOADER
// ===================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loadingProgress = document.getElementById('loadingProgress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        }
    }, 200);
});

// ===================================
// THEME TOGGLE
// ===================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// ===================================
// MOBILE MENU
// ===================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===================================
// COUNTER ANIMATION
// ===================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-target]');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            });
        }
    });
}, { threshold: 0.5 });

// Observe all sections with counters
document.querySelectorAll('.hero-stats, .stats-section').forEach(section => {
    counterObserver.observe(section);
});

// ===================================
// SOLUTION TABS
// ===================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.solution-tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.querySelector(`[data-content="${targetTab}"]`).classList.add('active');
    });
});

// ===================================
// PRICING TOGGLE (Monthly/Annual)
// ===================================
const pricingToggle = document.getElementById('pricingToggle');
const priceAmounts = document.querySelectorAll('.pricing-price .amount');

pricingToggle.addEventListener('change', (e) => {
    priceAmounts.forEach(amount => {
        const monthly = amount.getAttribute('data-monthly');
        const annual = amount.getAttribute('data-annual');
        
        if (e.target.checked) {
            // Show annual pricing
            animatePrice(amount, parseInt(amount.textContent), parseInt(annual));
        } else {
            // Show monthly pricing
            animatePrice(amount, parseInt(amount.textContent), parseInt(monthly));
        }
    });
});

function animatePrice(element, start, end) {
    const duration = 500;
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const updatePrice = () => {
        current += increment;
        if ((increment > 0 && current < end) || (increment < 0 && current > end)) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updatePrice);
        } else {
            element.textContent = end;
        }
    };
    
    updatePrice();
}

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// FORM SUBMISSION
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.innerHTML = '✓ Message Sent!';
        submitButton.style.background = '#10b981';
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ===================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// TESTIMONIAL SLIDER AUTO-PLAY (Optional)
// ===================================
const testimonialDots = document.querySelectorAll('.slider-dots .dot');
let currentSlide = 0;

// Auto-advance testimonials every 5 seconds
setInterval(() => {
    testimonialDots[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % testimonialDots.length;
    testimonialDots[currentSlide].classList.add('active');
}, 5000);

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images (if you add images later)
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

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================
// Add keyboard navigation for custom elements
document.querySelectorAll('.tab-btn, .pricing-card, .feature-card').forEach(el => {
    el.setAttribute('tabindex', '0');
    
    el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
        }
    });
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🚀 AI SaaS Platform', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'font-size: 14px; color: #64748b;');
console.log('%cPerformance optimized • SEO friendly • Fully responsive', 'font-size: 12px; color: #94a3b8;');