// Main JavaScript for Find A Room Website

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Hero Slider functionality
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.slide');
        const dots = heroSlider.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        
        // Show the first slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Function to change slide
        function changeSlide(index) {
            // Hide current slide
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            // Update current slide index
            currentSlide = index;
            
            // Show new slide
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Auto-advance slides
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % slides.length;
            changeSlide(nextSlide);
        }, 5000);
        
        // Click handlers for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                changeSlide(index);
            });
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                question.classList.toggle('active');
            });
        });
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        // Add error class and message
                        const formGroup = field.closest('.form-group');
                        if (formGroup) {
                            formGroup.classList.add('has-error');
                            
                            // Create error message if it doesn't exist
                            let errorMessage = formGroup.querySelector('.form-message.error');
                            if (!errorMessage) {
                                errorMessage = document.createElement('div');
                                errorMessage.className = 'form-message error';
                                errorMessage.textContent = 'This field is required';
                                formGroup.appendChild(errorMessage);
                            }
                        }
                    } else {
                        // Remove error class and message
                        const formGroup = field.closest('.form-group');
                        if (formGroup) {
                            formGroup.classList.remove('has-error');
                            const errorMessage = formGroup.querySelector('.form-message.error');
                            if (errorMessage) {
                                errorMessage.remove();
                            }
                        }
                        
                        // Email validation
                        if (field.type === 'email') {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(field.value)) {
                                isValid = false;
                                const formGroup = field.closest('.form-group');
                                if (formGroup) {
                                    formGroup.classList.add('has-error');
                                    
                                    // Create error message if it doesn't exist
                                    let errorMessage = formGroup.querySelector('.form-message.error');
                                    if (!errorMessage) {
                                        errorMessage = document.createElement('div');
                                        errorMessage.className = 'form-message error';
                                        formGroup.appendChild(errorMessage);
                                    }
                                    errorMessage.textContent = 'Please enter a valid email address';
                                }
                            }
                        }
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                } else {
                    // For the demo version, simulate form submission
                    if (form.classList.contains('demo-form')) {
                        e.preventDefault();
                        
                        // Hide form and show success message
                        const formContainer = form.closest('.form-container');
                        if (formContainer) {
                            const successMessage = formContainer.querySelector('.success-message');
                            if (successMessage) {
                                form.style.display = 'none';
                                successMessage.style.display = 'block';
                            }
                        }
                    }
                }
            });
            
            // Real-time validation feedback on blur
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    // Skip if not required
                    if (!this.hasAttribute('required')) return;
                    
                    const formGroup = this.closest('.form-group');
                    if (!formGroup) return;
                    
                    if (!this.value.trim()) {
                        formGroup.classList.add('has-error');
                        
                        // Create error message if it doesn't exist
                        let errorMessage = formGroup.querySelector('.form-message.error');
                        if (!errorMessage) {
                            errorMessage = document.createElement('div');
                            errorMessage.className = 'form-message error';
                            errorMessage.textContent = 'This field is required';
                            formGroup.appendChild(errorMessage);
                        }
                    } else {
                        formGroup.classList.remove('has-error');
                        const errorMessage = formGroup.querySelector('.form-message.error');
                        if (errorMessage) {
                            errorMessage.remove();
                        }
                        
                        // Email validation
                        if (this.type === 'email') {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(this.value)) {
                                formGroup.classList.add('has-error');
                                
                                // Create error message if it doesn't exist
                                let errorMessage = formGroup.querySelector('.form-message.error');
                                if (!errorMessage) {
                                    errorMessage = document.createElement('div');
                                    errorMessage.className = 'form-message error';
                                    errorMessage.textContent = 'Please enter a valid email address';
                                    formGroup.appendChild(errorMessage);
                                }
                            }
                        }
                    }
                });
            });
        });
    }
    
    // Property Filters
    const propertyFilterForm = document.getElementById('property-filter-form');
    const propertyGrid = document.querySelector('.property-grid');
    
    if (propertyFilterForm && propertyGrid) {
        propertyFilterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get filter values
            const location = document.getElementById('location').value.toLowerCase();
            const bedrooms = document.getElementById('bedrooms').value;
            const maxPrice = document.getElementById('price-range').value;
            
            // Get amenity checkboxes
            const amenities = [];
            const amenityCheckboxes = document.querySelectorAll('input[name="amenities"]:checked');
            amenityCheckboxes.forEach(checkbox => {
                amenities.push(checkbox.value.toLowerCase());
            });
            
            // Filter properties
            const propertyCards = propertyGrid.querySelectorAll('.property-card');
            
            propertyCards.forEach(card => {
                let showCard = true;
                
                // Filter by location
                if (location && !card.dataset.location.toLowerCase().includes(location)) {
                    showCard = false;
                }
                
                // Filter by bedrooms
                if (bedrooms && card.dataset.bedrooms !== bedrooms) {
                    showCard = false;
                }
                
                // Filter by price
                if (maxPrice && parseInt(card.dataset.price) > parseInt(maxPrice)) {
                    showCard = false;
                }
                
                // Filter by amenities
                if (amenities.length > 0) {
                    const cardAmenities = card.dataset.amenities.toLowerCase().split(',');
                    let hasAllAmenities = true;
                    
                    amenities.forEach(amenity => {
                        if (!cardAmenities.includes(amenity)) {
                            hasAllAmenities = false;
                        }
                    });
                    
                    if (!hasAllAmenities) {
                        showCard = false;
                    }
                }
                
                // Show/hide card
                if (showCard) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update results count
            const visibleProperties = propertyGrid.querySelectorAll('.property-card[style="display: block;"]');
            const resultCount = document.getElementById('result-count');
            
            if (resultCount) {
                resultCount.textContent = visibleProperties.length;
            }
        });
        
        // Clear filters button
        const clearFiltersBtn = document.getElementById('clear-filters');
        
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', function() {
                // Reset form
                propertyFilterForm.reset();
                
                // Show all properties
                const propertyCards = propertyGrid.querySelectorAll('.property-card');
                propertyCards.forEach(card => {
                    card.style.display = 'block';
                });
                
                // Update results count
                const resultCount = document.getElementById('result-count');
                if (resultCount) {
                    resultCount.textContent = propertyCards.length;
                }
            });
        }
    }
    
    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');
    
    if (modalTriggers.length > 0) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const modalId = this.dataset.target;
                const modal = document.querySelector(modalId);
                
                if (modal) {
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                    
                    // Close button inside modal
                    const closeBtn = modal.querySelector('.modal-close');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', function() {
                            modal.classList.remove('show');
                            document.body.style.overflow = 'auto';
                        });
                    }
                    
                    // Close when clicking outside content
                    modal.addEventListener('click', function(e) {
                        if (e.target === modal) {
                            modal.classList.remove('show');
                            document.body.style.overflow = 'auto';
                        }
                    });
                }
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const content = dropdown.querySelector('.dropdown-content');

        // Toggle dropdown on click (mobile)
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) { // Only for mobile
                e.preventDefault(); // Prevent the link from navigating
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            }
        });

        // Close dropdown when clicking outside (mobile)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && !dropdown.contains(e.target)) {
                content.style.display = 'none';
            }
        });
    });
});