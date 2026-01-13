// EmailJS Initialization
(function() {
    emailjs.init({
        publicKey: "O0FKNusDC9dVulDnK", // Your EmailJS Public Key
    });
})();

// Page Navigation System with Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.Navigation a');
    const pages = document.querySelectorAll('.page');
    const navigation = document.querySelector('.Navigation');
    const socialMedia = document.querySelector('.SocialMedia');
    
    // Create mobile menu elements
    createMobileMenu();

    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');

    // Load saved page from localStorage or default to home
    loadSavedPage();

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            toggleMenu();
        });
    }

    // Close menu when overlay is clicked
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }

    // Navigation Link Click Handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            
            // Save current page to localStorage
            localStorage.setItem('currentPage', pageId);
            
            // Remove active class from all navigation links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked navigation link
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            const selectedPage = document.getElementById(pageId + '-page');
            if (selectedPage) {
                selectedPage.classList.add('active');
                // Scroll to top when switching pages
                window.scrollTo(0, 0);
            }

            // Close mobile menu after navigation (on mobile)
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Close menu on window resize if opened
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Clear previous status
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            // Send email using EmailJS
            emailjs.sendForm(
                'service_xocbs9k',    // Your EmailJS Service ID
                'template_9ry93jw',   // Your EmailJS Template ID
                this
            ).then(
                function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                },
                function(error) {
                    console.error('EmailJS Error Details:', error);
                    
                    let errorMessage = 'Oops! Something went wrong. ';
                    
                    if (error.text) {
                        console.error('Error text:', error.text);
                        if (error.text.includes('template')) {
                            errorMessage += 'Please check your Template ID.';
                        } else if (error.text.includes('service')) {
                            errorMessage += 'Please check your Service ID.';
                        } else if (error.text.includes('publicKey') || error.text.includes('user')) {
                            errorMessage += 'Please check your Public Key.';
                        } else {
                            errorMessage += 'Please try again or email me directly.';
                        }
                    } else {
                        errorMessage += 'Please verify your EmailJS configuration.';
                    }
                    
                    // Show error message
                    formStatus.textContent = errorMessage;
                    formStatus.className = 'form-status error';
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            );
        });
    }

    // Helper Functions
    function createMobileMenu() {
        // Create hamburger menu toggle button
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle menu');
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        
        // Insert elements into DOM
        const upperBar = document.querySelector('.UpperBar');
        if (upperBar) {
            upperBar.appendChild(menuToggle);
        }
        document.body.appendChild(overlay);
    }

    function toggleMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const menuOverlay = document.querySelector('.menu-overlay');
        const navigation = document.querySelector('.Navigation');
        const socialMedia = document.querySelector('.SocialMedia');
        
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        navigation.classList.toggle('active');
        socialMedia.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navigation.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function closeMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const menuOverlay = document.querySelector('.menu-overlay');
        const navigation = document.querySelector('.Navigation');
        const socialMedia = document.querySelector('.SocialMedia');
        
        if (menuToggle) menuToggle.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        if (navigation) navigation.classList.remove('active');
        if (socialMedia) socialMedia.classList.remove('active');
        
        // Re-enable body scroll
        document.body.style.overflow = '';
    }

    function loadSavedPage() {
        // Get saved page from localStorage
        const savedPage = localStorage.getItem('currentPage') || 'home';
        
        // Find and activate the saved page
        const pageToShow = document.getElementById(savedPage + '-page');
        const linkToActivate = document.querySelector(`.Navigation a[data-page="${savedPage}"]`);
        
        if (pageToShow && linkToActivate) {
            // Hide all pages first
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Remove active from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Show the saved page
            pageToShow.classList.add('active');
            linkToActivate.classList.add('active');
        } else {
            // Fallback to home if saved page doesn't exist
            const homePage = document.getElementById('home-page');
            const homeLink = document.querySelector('.Navigation a[data-page="home"]');
            
            if (homePage) homePage.classList.add('active');
            if (homeLink) homeLink.classList.add('active');
        }
    }
});