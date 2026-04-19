document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. LOADING SCREEN
    ========================================= */
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500); // 1.5s loading simulation
    }

    /* =========================================
       2. NAVIGATION LAYERS
    ========================================= */
    const topNav = document.querySelector('.top-nav');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const overlayNav = document.querySelector('.overlay-nav');
    const closeOverlayBtn = document.querySelector('.close-overlay-btn');
    const overlayLinks = document.querySelectorAll('.overlay-link');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    const desktopLinks = document.querySelectorAll('.nav-link');

    // Sticky Top Nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            topNav.classList.add('scrolled');
        } else {
            topNav.classList.remove('scrolled');
        }
    });

    // Toggle Overlay Nav
    const toggleOverlay = () => {
        overlayNav.classList.toggle('active');
        document.body.style.overflow = overlayNav.classList.contains('active') ? 'hidden' : '';
    };

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleOverlay);
    if (closeOverlayBtn) closeOverlayBtn.addEventListener('click', toggleOverlay);
    
    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlayNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* =========================================
       3. ACTIVE SECTION HIGHLIGHTING
    ========================================= */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update Bottom Nav
        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });

        // Update Desktop Nav
        desktopLinks.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });

        // Update Overlay Nav
        overlayLinks.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    /* =========================================
       4. SCROLL REVEAL ANIMATIONS
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       5. SERVICES MODAL POPUPS
    ========================================= */
    const modalData = {
        web: {
            title: "Web Development",
            content: "Modern, responsive, and scalable web solutions.",
            features: [
                "Custom Architecture Design",
                "SEO & Performance Optimization",
                "Progressive Web Apps (PWA)",
                "Secure Backend APIs"
            ]
        },
        app: {
            title: "App Development",
            content: "Native-grade cross-platform applications.",
            features: [
                "iOS & Android Compatibility",
                "Fluid UI/UX Navigation",
                "Offline Support",
                "Cloud Database Integration"
            ]
        },
        ai: {
            title: "AI Chatbots & Automation",
            content: "Intelligent systems that think and act like human operators.",
            features: [
                "NLP & Custom LLM Integration",
                "Workflow Automations",
                "24/7 Customer Support Bots",
                "CRM Integrations"
            ]
        }
    };

    const serviceModal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('modalBody');
    const closeModals = document.querySelectorAll('.close-modal');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');

    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const service = btn.getAttribute('data-service');
            const data = modalData[service];
            
            if (data) {
                modalBody.innerHTML = `
                    <div class="modal-body">
                        <h3>${data.title}</h3>
                        <p>${data.content}</p>
                        <ul>
                            ${data.features.map(f => `<li><i class='bx bx-check-circle'></i> ${f}</li>`).join('')}
                        </ul>
                        <a href="#contact" class="btn btn-primary" onclick="document.getElementById('serviceModal').classList.remove('active');">Start a Project</a>
                    </div>
                `;
                serviceModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            serviceModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            serviceModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /* =========================================
       6. TESTIMONIAL SLIDER WITH SWIPE
    ========================================= */
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (track && dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        let currentSlide = 0;
        const totalSlides = dots.length;

        const updateSlide = (index) => {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateSlide(index));
        });

        // Auto Scroll
        let autoSlide = setInterval(() => {
            updateSlide((currentSlide + 1) % totalSlides);
        }, 5000);

        // Swipe Functionality
        let startX = 0;
        let diffX = 0;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            clearInterval(autoSlide); // Pause auto
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            diffX = e.touches[0].clientX - startX;
        }, { passive: true });

        track.addEventListener('touchend', () => {
            if (Math.abs(diffX) > 50) {
                if (diffX > 0 && currentSlide > 0) {
                    updateSlide(currentSlide - 1); // Swipe Right
                } else if (diffX < 0 && currentSlide < totalSlides - 1) {
                    updateSlide(currentSlide + 1); // Swipe Left
                }
            }
            diffX = 0;
            autoSlide = setInterval(() => {
                updateSlide((currentSlide + 1) % totalSlides);
            }, 5000);
        }, { passive: true });
    }

});
