document.addEventListener("DOMContentLoaded", () => {
    // 1. Spring Board Mobile Menu Navigation & Overlay
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const nav = document.querySelector("nav");

    if (mobileMenuBtn && nav) {
        // Ensure backdrop overlay exists
        let navOverlay = document.querySelector(".nav-overlay");
        if (!navOverlay) {
            navOverlay = document.createElement("div");
            navOverlay.className = "nav-overlay";
            document.body.appendChild(navOverlay);
        }

        // Ensure brand header inside mobile drawer with STACKLY Logo & close button
        let drawerTop = nav.querySelector(".drawer-top");
        if (!drawerTop) {
            drawerTop = document.createElement("div");
            drawerTop.className = "drawer-top";
            drawerTop.innerHTML = `
                <a href="index.html" class="drawer-logo" aria-label="Stackly Home">
                    <img src="images/logo-dark.webp" alt="STACKLY Logo" class="drawer-logo-img" />
                </a>
                <button type="button" class="drawer-close-btn" aria-label="Close menu">
                    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
            `;
            nav.prepend(drawerTop);
        }

        const drawerClose = nav.querySelector(".drawer-close-btn");
        if (drawerClose) {
            drawerClose.addEventListener("click", (e) => {
                e.stopPropagation();
                closeMenu();
            });
        }

        // Add Font Awesome arrow icons to nav links for mobile drawer only (pure FA icons)
        nav.querySelectorAll("ul li a").forEach(a => {
            if (!a.querySelector(".nav-drawer-arrow")) {
                const arrow = document.createElement("i");
                arrow.className = "fa-solid fa-arrow-right nav-drawer-arrow";
                arrow.setAttribute("aria-hidden", "true");
                a.appendChild(arrow);
            }
        });

        // Set sequential spring animation indices
        const menuItems = nav.querySelectorAll("ul > li, .auth-mobile a");
        menuItems.forEach((item, idx) => {
            item.style.setProperty("--item-idx", idx);
        });

        const icon = mobileMenuBtn.querySelector("i");

        const openMenu = () => {
            nav.classList.add("active");
            navOverlay.classList.add("active");
            mobileMenuBtn.classList.add("open");
            mobileMenuBtn.setAttribute("aria-expanded", "true");
            document.body.classList.add("menu-open");
            document.documentElement.classList.add("menu-open");
            if (icon) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            }
        };

        const closeMenu = () => {
            nav.classList.remove("active");
            navOverlay.classList.remove("active");
            mobileMenuBtn.classList.remove("open");
            mobileMenuBtn.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
            document.documentElement.classList.remove("menu-open");
            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        };

        const toggleMenu = () => {
            const isOpen = nav.classList.contains("active");
            isOpen ? closeMenu() : openMenu();
        };

        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close when clicking overlay
        navOverlay.addEventListener("click", () => {
            closeMenu();
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            if (nav.classList.contains("active") && !nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Close when clicking any nav link & allow page transitions smoothly
        nav.querySelectorAll("ul li a, .auth-mobile a").forEach(a => {
            a.addEventListener("click", (e) => {
                const href = a.getAttribute("href");
                if (href && href.startsWith("#")) {
                    closeMenu();
                } else {
                    closeMenu();
                }
            });
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && nav.classList.contains("active")) {
                closeMenu();
                mobileMenuBtn.focus();
            }
        });

        // Auto-close on resize if viewport expands beyond mobile breakpoint (992px)
        window.addEventListener("resize", () => {
            if (window.innerWidth > 992 && nav.classList.contains("active")) {
                closeMenu();
            }
        }, { passive: true });
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

    // 7. Tasteful Wobble Card Enter Animation
    function initWobbleCards() {
        const cardSelectors = [
            '.wobble-card',
            '[data-wobble]',
            '.diet-card',
            '.deal-card',
            '.service-card-clean',
            '.service-card',
            '.step-card',
            '.recipe-card',
            '.farmer-card',
            '.testimonial-card',
            '.blog-card',
            '.category-card',
            '.product-card',
            '.values-card',
            '.value-card',
            '.stat-card',
            '.stat-item',
            '.faq-item',
            '.office-card',
            '.contact-card'
        ].join(',');

        const cards = Array.from(document.querySelectorAll(cardSelectors));
        if (!cards.length) return;

        // Stagger siblings in grid containers with --wobble-delay
        const parents = new Set(cards.map(c => c.parentElement).filter(Boolean));
        parents.forEach(parent => {
            const siblings = Array.from(parent.querySelectorAll(':scope > ' + cardSelectors.split(',').join(', :scope > ')));
            siblings.forEach((card, idx) => {
                if (!card.style.getPropertyValue('--wobble-delay')) {
                    card.style.setProperty('--wobble-delay', idx % 4);
                }
                card.classList.add('wobble-card');
            });
        });

        // If reduced motion or no IntersectionObserver, reveal immediately
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
            cards.forEach(card => card.classList.add('wobble-revealed'));
            return;
        }

        const wobbleObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('wobble-revealed');
                        wobbleObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
        );

        cards.forEach(card => {
            card.classList.add('wobble-card');
            wobbleObserver.observe(card);
        });
    }

    initWobbleCards();
});
