document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. STICKY HEADER & ACTIVE SCROLL INDICATOR
    // ==========================================
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlight on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        let activeSectionId = currentSectionId;
        if (activeSectionId === 'chairman') {
            activeSectionId = 'about';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 2. MOBILE MENU HAMBURGER TOGGLE
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 3. PRODUCT SHOWCASE TAB FILTERING
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked tab
            button.classList.add('active');

            const filterCategory = button.getAttribute('data-tab');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Show/hide based on category filter
                if (filterCategory === 'all' || cardCategory === filterCategory) {
                    card.style.display = 'flex';
                    // Trigger tiny entry transition
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 5. CONTACT FORM VALIDATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccessAlert = document.getElementById('formSuccessAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Field references
            const nameInput = document.getElementById('contactName');
            const emailInput = document.getElementById('contactEmail');
            const phoneInput = document.getElementById('contactPhone');
            const messageInput = document.getElementById('contactMessage');

            let isValid = true;

            // Name validation (min 2 chars)
            if (nameInput.value.trim().length < 2) {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('invalid');
            }

            // Email validation (regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('invalid');
            }

            // Phone validation (optional, but if filled must be 10 digits)
            const phoneVal = phoneInput.value.trim();
            if (phoneVal.length > 0) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(phoneVal)) {
                    phoneInput.parentElement.classList.add('invalid');
                    isValid = false;
                } else {
                    phoneInput.parentElement.classList.remove('invalid');
                }
            } else {
                phoneInput.parentElement.classList.remove('invalid');
            }

            // Message validation
            if (messageInput.value.trim().length < 5) {
                messageInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                messageInput.parentElement.classList.remove('invalid');
            }

            // If form inputs are validated
            if (isValid) {
                // Mock form submission success
                formSuccessAlert.style.display = 'flex';
                contactForm.reset();

                // Clear success notification after 7 seconds
                setTimeout(() => {
                    formSuccessAlert.style.display = 'none';
                }, 7000);
            }
        });

        // Add real-time visual feedback on typing to clear error messages
        const inputsToMonitor = [
            document.getElementById('contactName'),
            document.getElementById('contactEmail'),
            document.getElementById('contactPhone'),
            document.getElementById('contactMessage')
        ];

        inputsToMonitor.forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    input.parentElement.classList.remove('invalid');
                });
            }
        });
    }

    // ==========================================
    // 6. DYNAMIC PRODUCTS INQUIRY (EMAIL & WHATSAPP)
    // ==========================================
    const inquiryButtons = document.querySelectorAll('.btn-inquiry');
    const contactMessageTextarea = document.getElementById('contactMessage');
    const interestSelect = document.getElementById('inquiryType');

    inquiryButtons.forEach(button => {
        const productName = button.getAttribute('data-product');
        const encodedProduct = encodeURIComponent(productName);
        
        // Create action wrapper
        const actionsWrapper = document.createElement('div');
        actionsWrapper.classList.add('product-actions');
        
        // Create custom email button (derived from original)
        const emailBtn = document.createElement('a');
        emailBtn.classList.add('btn', 'btn-outline', 'btn-inquiry-email');
        emailBtn.textContent = 'Email Quote';
        emailBtn.href = '#contact';
        
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (contactMessageTextarea && interestSelect) {
                contactMessageTextarea.value = `Dear Sales Team,\n\nI would like to request a price quote and technical catalog for the "${productName}" range.\n\nPlease share the details. Thank you!`;
                interestSelect.value = 'quote';
                contactMessageTextarea.parentElement.classList.remove('invalid');
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        contactMessageTextarea.focus();
                    }, 800);
                }
            }
        });

        // Create WhatsApp button
        const whatsappBtn = document.createElement('a');
        whatsappBtn.classList.add('btn', 'btn-whatsapp');
        whatsappBtn.setAttribute('target', '_blank');
        whatsappBtn.setAttribute('href', `https://wa.me/917827631154?text=Hi%2C%20I%20am%20interested%20in%20inquiring%20about%20the%20product%3A%20${encodedProduct}.%20Please%20provide%20pricing%20details.`);
        whatsappBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="14" height="14" fill="currentColor" style="margin-right: 5px; vertical-align: -1px;"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
            WhatsApp
        `;

        actionsWrapper.appendChild(emailBtn);
        actionsWrapper.appendChild(whatsappBtn);
        
        button.parentNode.replaceChild(actionsWrapper, button);
    });
});
