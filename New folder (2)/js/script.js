
// Configuration object for Element SDK
const defaultConfig = {
    main_title: "محمد امین — گیمینگ و آموزش",
    subtitle: "توسعه‌دهنده و آموزشگر با تجربه در حوزه تکنولوژی",
    cta_button: "تماس با من",
    about_title: "درباره من",
    bio_text: "من محمد امین هستم، توسعه‌دهنده و آموزشگر با بیش از ۵ سال تجربه در حوزه تکنولوژی.",
    portfolio_title: "نمونه کارها",
    contact_title: "تماس با من",
    primary_color: "#00FF99",
    background_color: "#FFFFFF",
    text_color: "#000000",
    font_family: "Vazirmatn",
    font_size: 16
};

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
        this.setupSystemThemeListener();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = this.theme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', this.theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تاریک');
        }
    }

    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    setupToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }
    }

    setupSystemThemeListener() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollSpy();
        this.setupSmoothScroll();
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                const isActive = navMenu.classList.contains('active');
                navMenu.classList.toggle('active');
                mobileToggle.setAttribute('aria-expanded', !isActive);
            });

            // Close mobile menu when clicking on a link
            navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    navMenu.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        if (!this.reducedMotion) {
            this.setupScrollAnimations();
            this.setupSkillBadgeAnimations();
        }
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.fade-in, .portfolio-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupSkillBadgeAnimations() {
        const skillBadges = document.querySelectorAll('.skill-badge');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const badges = entry.target.querySelectorAll('.skill-badge');
                    badges.forEach((badge, index) => {
                        setTimeout(() => {
                            badge.classList.add('animate');
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.5 });

        const skillsContainer = document.querySelector('.skills');
        if (skillsContainer) {
            observer.observe(skillsContainer);
        }
    }
}

// Portfolio Filter Manager
class PortfolioManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFilters();
    }

    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter cards
                portfolioCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const shouldShow = filter === 'all' || category === filter;

                    if (shouldShow) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, 100);
                    } else {
                        card.classList.remove('animate');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.message = document.getElementById('formMessage');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupRealTimeValidation();
        }
    }

    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'این فیلد الزامی است';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'لطفاً ایمیل معتبر وارد کنید';
        }

        this.showFieldError(field, isValid ? '' : errorMessage);
        return isValid;
    }

    clearFieldError(field) {
        this.showFieldError(field, '');
    }

    showFieldError(field, message) {
        let errorElement = field.parentNode.querySelector('.field-error');

        if (message) {
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'field-error';
                errorElement.style.color = '#ff0000';
                errorElement.style.fontSize = '0.875rem';
                errorElement.style.marginTop = '0.25rem';
                field.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = message;
            field.style.borderColor = '#ff0000';
        } else {
            if (errorElement) {
                errorElement.remove();
            }
            field.style.borderColor = '';
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        const inputs = this.form.querySelectorAll('input, textarea');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showMessage('لطفاً خطاهای فرم را برطرف کنید', 'error');
            return;
        }

        // Simulate form submission
        this.showMessage('در حال ارسال...', 'info');

        setTimeout(() => {
            this.showMessage('پیام شما با موفقیت ارسال شد!', 'success');
            this.form.reset();

            // Clear any field errors
            inputs.forEach(input => this.clearFieldError(input));
        }, 1500);
    }

    showMessage(text, type) {
        this.message.textContent = text;
        this.message.className = `form-message ${type} show`;

        setTimeout(() => {
            this.message.classList.remove('show');
        }, 5000);
    }
}

// Element SDK Integration
async function onConfigChange(config) {
    // Update text content
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.textContent = config.main_title || defaultConfig.main_title;
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = config.subtitle || defaultConfig.subtitle;
    }

    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.textContent = config.cta_button || defaultConfig.cta_button;
    }

    const aboutTitle = document.querySelector('#about .section-title');
    if (aboutTitle) {
        aboutTitle.textContent = config.about_title || defaultConfig.about_title;
    }

    const bioText = document.querySelector('.about-text');
    if (bioText) {
        bioText.textContent = config.bio_text || defaultConfig.bio_text;
    }

    const portfolioTitle = document.querySelector('#portfolio .section-title');
    if (portfolioTitle) {
        portfolioTitle.textContent = config.portfolio_title || defaultConfig.portfolio_title;
    }

    const contactTitle = document.querySelector('#contact .section-title');
    if (contactTitle) {
        contactTitle.textContent = config.contact_title || defaultConfig.contact_title;
    }

    // Update colors
    const primaryColor = config.primary_color || defaultConfig.primary_color;
    const backgroundColor = config.background_color || defaultConfig.background_color;
    const textColor = config.text_color || defaultConfig.text_color;

    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--bg-color', backgroundColor);
    document.documentElement.style.setProperty('--text-color', textColor);

    // Update font
    const fontFamily = config.font_family || defaultConfig.font_family;
    document.body.style.fontFamily = `${fontFamily}, 'Inter', sans-serif`;

    // Update font size
    const fontSize = config.font_size || defaultConfig.font_size;
    document.documentElement.style.fontSize = `${fontSize}px`;
}

// Initialize Element SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (config) => ({
            recolorables: [
                {
                    get: () => config.primary_color || defaultConfig.primary_color,
                    set: (value) => {
                        config.primary_color = value;
                        window.elementSdk.setConfig({ primary_color: value });
                    }
                },
                {
                    get: () => config.background_color || defaultConfig.background_color,
                    set: (value) => {
                        config.background_color = value;
                        window.elementSdk.setConfig({ background_color: value });
                    }
                },
                {
                    get: () => config.text_color || defaultConfig.text_color,
                    set: (value) => {
                        config.text_color = value;
                        window.elementSdk.setConfig({ text_color: value });
                    }
                }
            ],
            borderables: [],
            fontEditable: {
                get: () => config.font_family || defaultConfig.font_family,
                set: (value) => {
                    config.font_family = value;
                    window.elementSdk.setConfig({ font_family: value });
                }
            },
            fontSizeable: {
                get: () => config.font_size || defaultConfig.font_size,
                set: (value) => {
                    config.font_size = value;
                    window.elementSdk.setConfig({ font_size: value });
                }
            }
        }),
        mapToEditPanelValues: (config) => new Map([
            ["main_title", config.main_title || defaultConfig.main_title],
            ["subtitle", config.subtitle || defaultConfig.subtitle],
            ["cta_button", config.cta_button || defaultConfig.cta_button],
            ["about_title", config.about_title || defaultConfig.about_title],
            ["bio_text", config.bio_text || defaultConfig.bio_text],
            ["portfolio_title", config.portfolio_title || defaultConfig.portfolio_title],
            ["contact_title", config.contact_title || defaultConfig.contact_title]
        ])
    });
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new AnimationManager();
    new PortfolioManager();
    new ContactFormManager();
});

// Handle reduced motion preference changes
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    } else {
        document.documentElement.style.removeProperty('--animation-duration');
    }
});
(function () { function c() { var b = a.contentDocument || a.contentWindow.document; if (b) { var d = b.createElement('script'); d.innerHTML = "window.__CF$cv$params={r:'99944f5cb3fed364',t:'MTc2MjI2MTM5MS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);"; b.getElementsByTagName('head')[0].appendChild(d) } } if (document.body) { var a = document.createElement('iframe'); a.height = 1; a.width = 1; a.style.position = 'absolute'; a.style.top = 0; a.style.left = 0; a.style.border = 'none'; a.style.visibility = 'hidden'; document.body.appendChild(a); if ('loading' !== document.readyState) c(); else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c); else { var e = document.onreadystatechange || function () { }; document.onreadystatechange = function (b) { e(b); 'loading' !== document.readyState && (document.onreadystatechange = e, c()) } } } })();