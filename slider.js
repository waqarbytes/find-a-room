// Hero Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;
    
    // Data for slides
    const slidesData = [
        {
            image: 'slider1.jpg',
            title: 'Find Your Perfect Shared Accommodation',
            description: 'Quality shared living spaces across New Zealand for professionals and students.',
            primaryButtonText: 'Browse Rentals',
            primaryButtonLink: 'https://www.trademe.co.nz/a/search?member_listing=8900509',
            secondaryButtonText: 'About us',
            secondaryButtonLink: 'about.html'
        },
        {
            image: 'slider2.jpeg',
            title: 'Property Management Solutions',
            description: 'Comprehensive property management .',
            primaryButtonText: 'Owner Services',
            primaryButtonLink: 'tenant-services.html',
            secondaryButtonText: 'Learn More',
            secondaryButtonLink: 'about.html'
        },
        {
            image: 'slider3.jpg',
            title: 'Expert Tenant Services',
            description: 'From maintenance requests to lease management, we\'ve got you covered.',
            primaryButtonText: 'Tenant Services',
            primaryButtonLink: 'tenant-services.html',
            secondaryButtonText: 'Contact Us',
            secondaryButtonLink: 'contact.html'
        }
    ];
    
    // Create slides dynamically
    let slidesHTML = '';
    let dotsHTML = '';
    
    slidesData.forEach((slide, index) => {
        // Create slide
        slidesHTML += `
            <div class="slide" style="background-image: url('${slide.image}');">
                <div class="slide-overlay"></div>
                <div class="slide-content">
                    <h2 class="slide-title">${slide.title}</h2>
                    <p class="slide-description">${slide.description}</p>
                    <div class="slide-buttons">
                        <a href="${slide.primaryButtonLink}" class="btn btn-secondary">${slide.primaryButtonText}</a>
                        <a href="${slide.secondaryButtonLink}" class="btn btn-outline btn-white">${slide.secondaryButtonText}</a>
                    </div>
                </div>
            </div>
        `;
        
        // Create dot
        dotsHTML += `<div class="slider-dot" data-index="${index}"></div>`;
    });
    
    // Add slides and dots to the DOM
    heroSlider.innerHTML = `
        ${slidesHTML}
        <div class="slider-controls">
            ${dotsHTML}
        </div>
    `;
    
    // Set up slider functionality
    const slides = heroSlider.querySelectorAll('.slide');
    const dots = heroSlider.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;
    
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
    
    // Function to go to next slide
    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        changeSlide(next);
    }
    
    // Auto-advance slides
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Start slideshow
    startSlideshow();
    
    // Click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideshow();
            changeSlide(index);
            startSlideshow();
        });
    });
    
    // Pause slideshow when hovering over the slider
    heroSlider.addEventListener('mouseenter', stopSlideshow);
    heroSlider.addEventListener('mouseleave', startSlideshow);
});