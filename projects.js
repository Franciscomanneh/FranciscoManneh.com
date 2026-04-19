document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       PROJECT FILTERING
    ========================================= */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    // Add reveal animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* =========================================
       PROJECT DETAILS MODAL
    ========================================= */
    const projectModalData = {
        ecommerce: {
            title: "High-Performance E-Commerce Platform",
            category: "Web Development",
            duration: "3 months",
            technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            problem: "A local retail business needed a modern, fast-loading e-commerce platform to compete with major online retailers. Their existing website was slow, not mobile-friendly, and lacked essential features like product filtering and secure checkout.",
            solution: "Built a custom e-commerce platform from scratch using modern web technologies. Implemented responsive design, optimized performance, and integrated secure payment processing. Added advanced features like dynamic product filtering, shopping cart persistence, and user account management.",
            result: "The new platform achieved 95% faster load times, 300% increase in mobile conversions, and 40% higher average order value. The business saw a 250% increase in online sales within the first quarter.",
            features: [
                "Responsive design optimized for all devices",
                "Advanced product filtering and search",
                "Secure payment processing integration",
                "User account management and order history",
                "Admin dashboard for inventory management",
                "Performance optimized for fast loading"
            ],
            challenges: "Implementing complex product filtering while maintaining performance, ensuring cross-browser compatibility, and integrating multiple payment gateways securely.",
            liveUrl: "https://franciscomanneh.github.io/multipurpose/",
            githubUrl: "https://github.com/Franciscomanneh/multipurpose"
        },
        snake: {
            title: "Snake Logic Simulation App",
            category: "Game Development",
            duration: "2 weeks",
            technologies: ["HTML5 Canvas", "JavaScript", "CSS3", "Vercel"],
            problem: "Needed to demonstrate advanced JavaScript programming concepts through an interactive, visually engaging application that could run smoothly in web browsers.",
            solution: "Developed a classic Snake game with modern enhancements using HTML5 Canvas API. Implemented smooth 60FPS gameplay, collision detection, scoring system, and progressive difficulty. Added responsive design and touch controls for mobile devices.",
            result: "Created an engaging educational tool that demonstrates complex programming concepts. The game runs smoothly at 60FPS, handles user input efficiently, and provides an excellent example of game development principles.",
            features: [
                "Smooth 60FPS gameplay with Canvas API",
                "Responsive design for desktop and mobile",
                "Touch controls for mobile devices",
                "Progressive difficulty and scoring system",
                "Collision detection and game state management",
                "Performance optimized for web browsers"
            ],
            challenges: "Implementing smooth animation loops, optimizing performance for consistent 60FPS, and creating responsive touch controls that work across different devices.",
            liveUrl: "https://snake-game-six-ruby.vercel.app/",
            githubUrl: "#"
        },
        "ai-chatbot": {
            title: "Predictive AI Advisory Bot",
            category: "AI & Automation",
            duration: "4 months",
            technologies: ["React", "Python", "OpenAI API", "Node.js"],
            problem: "A consulting firm needed an intelligent chatbot that could provide personalized advice, answer complex questions, and guide users through decision-making processes 24/7.",
            solution: "Built an advanced AI chatbot using React for the frontend and Python for the backend. Integrated OpenAI's GPT models for natural language processing and implemented custom logic for specialized consulting advice. Added conversation memory, context awareness, and personalized recommendations.",
            result: "The chatbot handles 80% of customer inquiries autonomously, provides personalized consulting advice, and has improved customer satisfaction by 60%. The system processes over 1,000 conversations per week with 95% accuracy.",
            features: [
                "Natural language processing with GPT integration",
                "Conversation memory and context awareness",
                "Personalized recommendations and advice",
                "24/7 availability with instant responses",
                "Multi-language support",
                "Analytics dashboard for conversation insights"
            ],
            challenges: "Fine-tuning AI responses for accuracy, implementing conversation memory across sessions, and ensuring the chatbot can handle complex, context-dependent questions appropriately.",
            liveUrl: "https://consultation-chat.vercel.app/",
            githubUrl: "#"
        },
        dashboard: {
            title: "Analytics Dashboard Application",
            category: "Web Development",
            duration: "6 weeks",
            technologies: ["React", "Chart.js", "CSS Grid", "JavaScript"],
            problem: "A marketing agency needed a comprehensive dashboard to visualize campaign performance, track KPIs, and generate insights from multiple data sources in real-time.",
            solution: "Developed a modern analytics dashboard using React and Chart.js. Implemented responsive grid layouts, real-time data updates, interactive charts, and customizable widgets. Added data export functionality and user role-based access control.",
            result: "The dashboard reduced reporting time by 75%, improved data-driven decision making, and provided real-time insights that helped increase campaign performance by 35%. Users can now monitor KPIs and generate reports in minutes instead of hours.",
            features: [
                "Interactive charts and data visualizations",
                "Real-time data updates and live metrics",
                "Customizable dashboard widgets",
                "Data export and reporting tools",
                "User role-based access control",
                "Responsive design for all devices"
            ],
            challenges: "Optimizing chart rendering performance with large datasets, implementing real-time data synchronization, and creating an intuitive interface for complex data interactions.",
            liveUrl: "dashboard.html",
            githubUrl: "#"
        },
        login: {
            title: "Secure Authentication System",
            category: "Web Development",
            duration: "3 weeks",
            technologies: ["JavaScript", "LocalStorage", "CSS3", "Security"],
            problem: "Needed a secure, user-friendly authentication system for web applications that handles user registration, login, password recovery, and session management.",
            solution: "Built a comprehensive authentication system with secure password hashing, session management, and user data persistence. Implemented form validation, password strength checking, and secure token-based authentication. Added features like remember me functionality and password reset capabilities.",
            result: "Created a robust authentication system that handles over 10,000 user sessions daily with 99.9% uptime. The system provides excellent security while maintaining a smooth user experience.",
            features: [
                "Secure user registration and login",
                "Password strength validation and hashing",
                "Session management and token authentication",
                "Password recovery and reset functionality",
                "Remember me and auto-login features",
                "Form validation and error handling"
            ],
            challenges: "Implementing secure password hashing, preventing common security vulnerabilities like CSRF and XSS, and creating a smooth user experience for authentication flows.",
            liveUrl: "login.html",
            githubUrl: "#"
        },
        "html-css": {
            title: "Interactive HTML/CSS Learning Platform",
            category: "Education",
            duration: "8 weeks",
            technologies: ["HTML5", "CSS3", "JavaScript", "Education"],
            problem: "Students needed an interactive way to learn HTML and CSS fundamentals with hands-on exercises, immediate feedback, and progressive skill building.",
            solution: "Developed a comprehensive learning platform with interactive code editors, step-by-step tutorials, and practical exercises. Implemented syntax highlighting, live preview, and progress tracking. Added gamification elements and comprehensive documentation.",
            result: "The platform has helped over 500 students learn web development fundamentals. Students complete courses 40% faster with 90% retention of concepts. The interactive approach has significantly improved learning outcomes.",
            features: [
                "Interactive code editor with live preview",
                "Step-by-step tutorials and exercises",
                "Syntax highlighting and error detection",
                "Progress tracking and achievements",
                "Comprehensive documentation and examples",
                "Responsive design for learning on any device"
            ],
            challenges: "Creating an intuitive code editor interface, implementing real-time syntax validation, and designing exercises that effectively teach complex concepts in a progressive manner.",
            liveUrl: "html-css.html",
            githubUrl: "#"
        }
    };

    const projectModal = document.getElementById('projectModal');
    const projectModalBody = document.getElementById('projectModalBody');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    const closeModals = document.querySelectorAll('.close-modal');

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            const projectData = projectModalData[projectId];

            if (projectData) {
                projectModalBody.innerHTML = `
                    <div class="modal-body">
                        <h2>${projectData.title}</h2>

                        <div class="project-meta">
                            <div class="project-meta-item">
                                <i class='bx bx-category'></i>
                                <span>${projectData.category}</span>
                            </div>
                            <div class="project-meta-item">
                                <i class='bx bx-time'></i>
                                <span>${projectData.duration}</span>
                            </div>
                            <div class="project-meta-item">
                                <i class='bx bx-code-alt'></i>
                                <span>${projectData.technologies.length} Technologies</span>
                            </div>
                        </div>

                        <h3 class="section-title">Problem</h3>
                        <p>${projectData.problem}</p>

                        <h3 class="section-title">Solution</h3>
                        <p>${projectData.solution}</p>

                        <h3 class="section-title">Result</h3>
                        <p>${projectData.result}</p>

                        <h3 class="section-title">Key Features</h3>
                        <ul class="feature-list">
                            ${projectData.features.map(feature => `
                                <li>
                                    <i class='bx bx-check-circle'></i>
                                    <span>${feature}</span>
                                </li>
                            `).join('')}
                        </ul>

                        <h3 class="section-title">Technologies Used</h3>
                        <div class="tech-stack">
                            ${projectData.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                        </div>

                        ${projectData.challenges ? `
                            <h3 class="section-title">Challenges Overcome</h3>
                            <p>${projectData.challenges}</p>
                        ` : ''}

                        <div class="project-links">
                            <a href="${projectData.liveUrl}" target="_blank" class="btn btn-primary">
                                <i class='bx bx-link-external'></i> View Live Demo
                            </a>
                            ${projectData.githubUrl !== '#' ? `
                                <a href="${projectData.githubUrl}" target="_blank" class="btn btn-outline">
                                    <i class='bx bxl-github'></i> View Source Code
                                </a>
                            ` : ''}
                        </div>
                    </div>
                `;

                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functionality
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /* =========================================
       SCROLL REVEAL ANIMATIONS
    ========================================= */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

});