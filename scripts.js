// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    let mobileMenu = document.querySelector('.mobile-menu');
    
    // Create mobile menu if it doesn't exist
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu fixed top-[80px] left-0 w-full bg-black bg-opacity-95 transform -translate-x-full transition-transform duration-300 z-40';
        mobileMenu.innerHTML = `
            <div class="py-4 px-8">
                <a href="index.html" class="block py-3 text-white text-sm uppercase tracking-wider hover-gold transition duration-300">Home</a>
                <a href="work.html" class="block py-3 text-white text-sm uppercase tracking-wider hover-gold transition duration-300">Work</a>
                <a href="about.html" class="block py-3 text-white text-sm uppercase tracking-wider hover-gold transition duration-300">About</a>
                <a href="#" class="block py-3 text-white text-sm uppercase tracking-wider hover-gold transition duration-300">Services</a>
                <a href="contact.html" class="block py-3 text-white text-sm uppercase tracking-wider hover-gold transition duration-300">Contact</a>
            </div>
        `;
        document.body.appendChild(mobileMenu);
    }

    let isMobileMenuOpen = false;

    // Toggle mobile menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            isMobileMenuOpen = !isMobileMenuOpen;
            
            // Toggle menu visibility
            if (isMobileMenuOpen) {
                mobileMenu.style.transform = 'translateX(0)';
                mobileMenuButton.querySelector('i').className = 'fas fa-times text-xl';
            } else {
                mobileMenu.style.transform = 'translateX(-100%)';
                mobileMenuButton.querySelector('i').className = 'fas fa-bars text-xl';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMobileMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            isMobileMenuOpen = false;
            mobileMenu.style.transform = 'translateX(-100%)';
            mobileMenuButton.querySelector('i').className = 'fas fa-bars text-xl';
        }
    });

    // Close mobile menu when window is resized to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMobileMenuOpen) { // 768px is the 'md' breakpoint in Tailwind
            isMobileMenuOpen = false;
            mobileMenu.style.transform = 'translateX(-100%)';
            mobileMenuButton.querySelector('i').className = 'fas fa-bars text-xl';
        }
    });

    // Custom cursor effect
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.7)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
            });
        });
    }

    // Simple testimonial slider - Only initialize if testimonial section exists
    const testimonialSlide = document.querySelector('.testimonial-slide');
    if (testimonialSlide) {
        let currentSlide = 0;
        const slides = [
            {
                quote: "Working with Lab Pictures was an exceptional experience. Their attention to detail and creative vision brought our project to life in ways we couldn't have imagined.",
                name: "Sarah Johnson",
                title: "Creative Director, Brand X"
            },
            {
                quote: "The team at Lab Pictures delivered beyond our expectations. Their professionalism and creativity made the entire process seamless.",
                name: "Michael Chen",
                title: "Marketing Director, Company Y"
            },
            {
                quote: "From concept to final delivery, Lab Pictures demonstrated why they're one of the best in the industry. We'll definitely work with them again.",
                name: "Emma Rodriguez",
                title: "Producer, Studio Z"
            }
        ];

        const dots = document.querySelectorAll('.bg-gray-600, .bg-gray-400');

        function updateTestimonial() {
            testimonialSlide.innerHTML = `
                <div class="text-center">
                    <p class="text-xl md:text-2xl text-gray-300 italic mb-8">"${slides[currentSlide].quote}"</p>
                    <div class="text-white">
                        <h4 class="font-bold">${slides[currentSlide].name}</h4>
                        <p class="text-gray-400">${slides[currentSlide].title}</p>
                    </div>
                </div>
            `;
            
            dots.forEach((dot, index) => {
                dot.className = index === currentSlide ? 'w-3 h-3 rounded-full gold-bg transition duration-300' : 'w-3 h-3 rounded-full bg-gray-600 hover:gold-bg transition duration-300';
            });
        }

        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    updateTestimonial();
                });
            });

            // Auto-rotate testimonials
            setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateTestimonial();
            }, 5000);
        }
    }

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                const animationClass = element.classList.item(1);
                element.classList.add(animationClass);
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});
