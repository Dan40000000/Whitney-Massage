document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;
    let scrollTimer = null;

    // Handle scroll behavior
    function handleScroll() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when page is scrolled
        if (currentScroll > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }

        // Show/hide navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & past navbar
            navbar.classList.add('nav-hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('nav-hidden');
        }

        lastScroll = currentScroll;

        // Clear and set scroll timer
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }

        scrollTimer = setTimeout(() => {
            // Show navbar after user stops scrolling
            navbar.classList.remove('nav-hidden');
        }, 150);
    }

    // Throttle scroll event
    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({ 
                    top: target.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth' 
                });
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('nav-active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Booking Modal
    const modal = document.getElementById('modal');
    const bookBtn = document.getElementById('bookBtn');
    const closeBtn = document.getElementById('closeModal');
    const bookingForm = document.getElementById('bookingForm');

    if (bookBtn && modal && closeBtn) {
        bookBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });

        if (bookingForm) {
            bookingForm.addEventListener('submit', e => {
                e.preventDefault();
                alert('Thank you! Your booking request has been received.');
                modal.classList.add('hidden');
                document.body.style.overflow = '';
                bookingForm.reset();
            });
        }
    }
});
