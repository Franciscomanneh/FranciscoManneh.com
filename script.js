document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 15, 23, 0.9)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
            navbar.style.backdropFilter = 'blur(16px)';
        } else {
            navbar.style.background = 'rgba(17, 26, 38, 0.6)';
            navbar.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.2)';
            navbar.style.backdropFilter = 'blur(16px)';
        }
    });

    // 3. Intersection Observer for Fade-In Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 4. Form Submission Handling (Basic validation & prevent default if needed)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const btn = form.querySelector('button[type="submit"]');
            
            // If action is placeholder, prevent submission to avoid error page
            if(form.getAttribute('action') === 'YOUR_FORMSPREE_ENDPOINT') {
                e.preventDefault();
                btn.innerHTML = '<i class="bx bx-check"></i> Connected (Demo)';
                btn.style.background = '#10b981';
                btn.style.color = '#fff';
                setTimeout(() => {
                    btn.innerHTML = 'Send Message';
                    btn.style.background = '';
                }, 3000);
                form.reset();
                return;
            }

            // Normal submission visual change for actual endpoints
            btn.innerHTML = 'Sending...';
            btn.style.opacity = '0.7';
        });
    }

    // 5. Course Item Interactive Selection
    const courseItems = document.querySelectorAll('.course-item');
    courseItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            courseItems.forEach(c => c.classList.remove('active'));
            item.classList.add('active');
        });
    });
    // 6. Project Modal Logic & Content Data
    const projectData = {
        'multishop': {
            title: 'MultiShop Pro',
            'case-study': {
                metrics: { 'Status': 'Production Ready', 'Scale': 'Multi-Category' },
                desc: 'MultiShop Pro is a flagship e-commerce engine designed for high-concurrency environments. It features a custom inventory management system and a sub-second optimized search architecture.',
                images: ['./Images/14.png']
            },
            'design': {
                metrics: { 'Tool': 'Design Logic', 'Style': 'Glassmorphic' },
                desc: 'The design focuses on technical clarity and zero-friction navigation, utilizing a dark-mode palette with cyan accents for a professional developer aesthetic.',
                images: ['./Images/14.png']
            }
        },
        'snake': {
            title: 'Snake Logic Engine',
            'case-study': {
                metrics: { 'Performance': '60 FPS', 'Logic': 'State-Driven' },
                desc: 'A pure JavaScript simulation engine demonstrating advanced coordinate systems and real-time state synchronization within the HTML5 Canvas environment.',
                images: ['./Images/1.png']
            },
            'design': {
                metrics: { 'Logic': 'Pure Script', 'Response': 'Sub-15ms' },
                desc: 'The visual design emphasizes high-contrast entity identification and reactive feedback loops for player coordination.',
                images: ['./Images/1.png']
            }
        },
        'ai-chatbot': {
            title: 'Consultation AI',
            'case-study': {
                metrics: { 'Accuracy': '98% Intent', 'Automation': 'High' },
                desc: 'An enterprise-grade AI interface that utilizes custom conversational pipelines and webhooks to automate front-line business inquiry resolution.',
                images: ['./Images/7.png']
            },
            'design': {
                metrics: { 'UX': 'Chat-First', 'Logic': 'Pipeline-Based' },
                desc: 'Designed with a focus on conversational flow and rapid intent resolution, featuring a clean, non-obtrusive chat UI.',
                images: ['./Images/7.png']
            }
        }
    };

    const globalModal = document.getElementById('global-modal');
    const modalContent = document.getElementById('modal-content-root');
    const modalClose = globalModal ? globalModal.querySelector('.modal-close') : null;

    if (globalModal && modalContent) {
        document.querySelectorAll('.open-project-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectKey = btn.getAttribute('data-project');
                const typeKey = btn.getAttribute('data-type');
                const data = projectData[projectKey];

                if (data && data[typeKey]) {
                    const content = data[typeKey];
                    const typeTitle = typeKey.charAt(0).toUpperCase() + typeKey.slice(1).replace('-', ' ');
                    
                    let metricsHtml = '';
                    for (const [label, val] of Object.entries(content.metrics)) {
                        metricsHtml += `<div class="m-info-item"><h4>${label}</h4><p>${val}</p></div>`;
                    }

                    let imagesHtml = '';
                    content.images.forEach(src => {
                        imagesHtml += `<img src="${src}" alt="Project View">`;
                    });

                    modalContent.innerHTML = `
                        <div class="modal-body">
                            <div class="modal-title-wrap">
                                <span class="eyebrow">${typeTitle}</span>
                                <h2>${data.title}</h2>
                            </div>
                            <div class="modal-info-grid">${metricsHtml}</div>
                            <div class="modal-image-gallery">${imagesHtml}</div>
                            <p class="modal-desc-text">${content.desc}</p>
                            <div style="margin-top: 1rem;">
                                <a href="#" class="btn btn-primary close-modal-trigger">Close Details</a>
                            </div>
                        </div>
                    `;

                    globalModal.classList.add('active');
                    document.body.style.overflow = 'hidden';

                    // Close within modal body
                    const innerClose = modalContent.querySelector('.close-modal-trigger');
                    if(innerClose) {
                        innerClose.addEventListener('click', (e) => {
                            e.preventDefault();
                            closeGlobalModal();
                        });
                    }
                }
            });
        });

        const closeGlobalModal = () => {
            globalModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if (modalClose) modalClose.addEventListener('click', closeGlobalModal);
        
        globalModal.addEventListener('click', (e) => {
            if (e.target === globalModal) closeGlobalModal();
        });
    }
});

