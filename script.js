document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const nav = document.querySelector("nav");

    if (mobileMenuBtn && nav) {
        const icon = mobileMenuBtn.querySelector("i");
        const toggleMenu = (open) => {
            const shouldOpen = open !== undefined ? open : !nav.classList.contains("active");
            if (shouldOpen) {
                nav.classList.add("active");
                if (icon) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                }
            } else {
                nav.classList.remove("active");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        };

        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            if (nav.classList.contains("active") && !nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Close when clicking any nav link
        nav.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", () => {
                toggleMenu(false);
            });
        });
    }

    // 1.5. Hero Background Slideshow (Cross-fade one by one)
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.slider-dot');
    if (heroSlides.length > 1) {
        let currentSlide = 0;
        let slideTimer;

        const setSlide = (idx) => {
            heroSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === idx);
            });
            heroDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === idx);
            });
            currentSlide = idx;
        };

        const nextSlide = () => {
            const next = (currentSlide + 1) % heroSlides.length;
            setSlide(next);
        };

        const startTimer = () => {
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, 5000);
        };

        heroDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                setSlide(idx);
                startTimer();
            });
        });

        startTimer();
    }

    // 2. Dynamic Active Links
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav ul li a");
    
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.classList.remove("active");
            const linkPath = link.getAttribute("href");
            if (linkPath === currentPath || (currentPath === "" && linkPath === "index.html")) {
                link.classList.add("active");
            }
        });
    }

    // 3. Global CTA & Card Button Navigation
    const ctaButtons = document.querySelectorAll(".btn-add, .deal-card, .recipe-link, .read-more, .category-card");
    ctaButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const href = btn.getAttribute("href") || (btn.dataset && btn.dataset.href);
            if (href === "404.html" || btn.classList.contains("category-card") || btn.classList.contains("btn-add")) {
                window.location.href = "404.html";
            }
        });
    });

    // 4. Form Submissions Simulation
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        if (form.id !== 'loginForm' && form.id !== 'signupForm' && !form.classList.contains('news-form') && !form.classList.contains('contact-form') && !form.getAttribute("onsubmit")) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                form.reset();
            });
        }
    });

    // 5. Stats Counter Animation
    const statCounters = document.querySelectorAll('.stat-new h3, .stat-item h3');
    if (statCounters.length > 0) {
        const animateCounter = (el) => {
            const originalText = el.innerText.trim();
            const match = originalText.match(/^([^\d]*)([\d\.]+)(.*)$/);
            if (!match) return;
            
            const prefix = match[1] || '';
            const target = parseFloat(match[2]);
            const suffix = match[3] || '';
            const isFloat = match[2].includes('.');
            
            let current = 0;
            const increment = target / 60;
            const duration = 1500;
            const interval = duration / 60;
            
            const updateText = () => {
                current += increment;
                if (current >= target) {
                    el.innerText = prefix + (isFloat ? target.toFixed(1) : Math.ceil(target)) + suffix;
                    clearInterval(timer);
                } else {
                    el.innerText = prefix + (isFloat ? current.toFixed(1) : Math.ceil(current)) + suffix;
                }
            };
            
            el.innerText = prefix + '0' + suffix;
            const timer = setInterval(updateText, interval);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        statCounters.forEach(counter => observer.observe(counter));
    }

    // 6. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            document.querySelectorAll('.faq-item.active').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});
