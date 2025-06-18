// GSAP Animations and Scroll Triggers
gsap.registerPlugin(ScrollTrigger);

class WebsiteAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initNavbarAnimations();
        this.initHeroAnimations();
        this.initServiceAnimations();
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initFormAnimations();
    }

    initNavbarAnimations() {
        // Navbar scroll effect
        let lastScrollTop = 0;
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                gsap.to(navbar, { duration: 0.3, y: -100, ease: "power2.out" });
            } else {
                gsap.to(navbar, { duration: 0.3, y: 0, ease: "power2.out" });
            }
            
            lastScrollTop = scrollTop;
        });

        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }

    initHeroAnimations() {
        const tl = gsap.timeline();

        // Hero content animation
        tl.from('.hero-title-line', {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        })
        .from('.hero-description', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5")
        .from('.hero-buttons .btn', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .from('.stat-item', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4");

        // Scroll indicator animation
        gsap.to('.scroll-line', {
            duration: 2,
            scaleY: 0.5,
            yoyo: true,
            repeat: -1,
            ease: "power2.inOut"
        });
    }

    initServiceAnimations() {
        // Service cards scroll animation
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                duration: 0.8,
                y: 100,
                opacity: 0,
                delay: index * 0.1,
                ease: "power3.out"
            });

            // Hover glow effect
            const glow = card.querySelector('.service-glow');
            if (glow) {
                card.addEventListener('mouseenter', () => {
                    gsap.to(glow, { duration: 0.5, opacity: 1, scale: 1.2 });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(glow, { duration: 0.5, opacity: 0, scale: 1 });
                });
            }
        });

        // Service icon animations
        gsap.utils.toArray('.service-icon').forEach(icon => {
            gsap.from(icon, {
                scrollTrigger: {
                    trigger: icon,
                    start: "top 85%"
                },
                duration: 0.6,
                scale: 0,
                rotation: 180,
                ease: "back.out(1.7)"
            });
        });
    }

    initScrollAnimations() {
        // Section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%"
                },
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "power3.out"
            });
        });

        // Section descriptions
        gsap.utils.toArray('.section-description').forEach(desc => {
            gsap.from(desc, {
                scrollTrigger: {
                    trigger: desc,
                    start: "top 80%"
                },
                duration: 0.8,
                y: 30,
                opacity: 0,
                delay: 0.2,
                ease: "power2.out"
            });
        });

        // Feature items
        gsap.utils.toArray('.feature-item').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%"
                },
                duration: 0.8,
                x: index % 2 === 0 ? -50 : 50,
                opacity: 0,
                delay: index * 0.1,
                ease: "power2.out"
            });
        });

        // Contact methods
        gsap.utils.toArray('.contact-method').forEach((method, index) => {
            gsap.from(method, {
                scrollTrigger: {
                    trigger: method,
                    start: "top 85%"
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                delay: index * 0.1,
                ease: "power3.out"
            });
        });

        // Stats animation with counting effect
        gsap.utils.toArray('.stat-number').forEach(stat => {
            const finalValue = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.replace(/\d/g, '');
            
            ScrollTrigger.create({
                trigger: stat,
                start: "top 80%",
                onEnter: () => {
                    gsap.from({ value: 0 }, {
                        duration: 2,
                        value: finalValue,
                        roundProps: "value",
                        ease: "power2.out",
                        onUpdate: function() {
                            stat.textContent = this.targets()[0].value + suffix;
                        }
                    });
                }
            });
        });
    }

    initHoverEffects() {
        // Button hover effects
        gsap.utils.toArray('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, { duration: 0.3, scale: 1.05, ease: "power2.out" });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { duration: 0.3, scale: 1, ease: "power2.out" });
            });
        });

        // Card hover effects
        gsap.utils.toArray('.service-card, .contact-method').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { 
                    duration: 0.4, 
                    y: -10, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    ease: "power2.out" 
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { 
                    duration: 0.4, 
                    y: 0, 
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    ease: "power2.out" 
                });
            });
        });

        // Nav link hover effects
        gsap.utils.toArray('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (!link.classList.contains('active')) {
                    gsap.to(link, { duration: 0.3, color: "#06B6D4", ease: "power2.out" });
                }
            });
            
            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('active')) {
                    gsap.to(link, { duration: 0.3, color: "#D1D5DB", ease: "power2.out" });
                }
            });
        });
    }

    initFormAnimations() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        // Form field focus effects
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    gsap.to(label, { duration: 0.3, color: "#06B6D4", scale: 0.9, ease: "power2.out" });
                    gsap.to(input, { duration: 0.3, borderColor: "#06B6D4", ease: "power2.out" });
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        gsap.to(label, { duration: 0.3, color: "#FFFFFF", scale: 1, ease: "power2.out" });
                    }
                    gsap.to(input, { duration: 0.3, borderColor: "rgba(255,255,255,0.2)", ease: "power2.out" });
                });
            }
        });

        // Form submission animation
        form.addEventListener('submit', (e) => {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                gsap.to(submitBtn, { duration: 0.3, scale: 0.95, ease: "power2.out" });
            }
        });
    }

    // Utility method for creating staggered animations
    staggerFrom(elements, options) {
        gsap.utils.toArray(elements).forEach((el, index) => {
            gsap.from(el, {
                ...options,
                delay: (options.delay || 0) + (index * (options.stagger || 0.1))
            });
        });
    }

    // Page transition effects
    pageTransition() {
        const tl = gsap.timeline();
        
        tl.to('main', { duration: 0.5, opacity: 0, y: 50, ease: "power2.in" })
          .to('main', { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" });
        
        return tl;
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animations = new WebsiteAnimations();
    
    // Smooth scrolling for anchor links
    gsap.utils.toArray('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, { duration: 1, scrollTo: target, ease: "power2.inOut" });
            }
        });
    });
});

// Loading animation
window.addEventListener('load', () => {
    gsap.to('body', { duration: 0.5, opacity: 1, ease: "power2.out" });
});