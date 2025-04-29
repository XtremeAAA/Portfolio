document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // Coding projects data
    const codingProjects = [
        {
            title: "Rock Paper Scissors Lizard Spock (RPSLS)",
            description: "A simple game of RPSLC, built with C and C++ with twists",
            image: "Project Images/RPSLS.png",
            details: "This project has three separate parts to it. " +
                    "The first part is a simple game of RPSLC, built with C and C++. " +
                    "The second part is a simple game of RPS however with 3, built with C and C++. " +
                    "The third part is a simple game of RPSLC, built with C and C++.",
            link: "https://github.com/XtremeAAA/RPSLS-game"
        },
        {
            title: "Project Beta",
            description: "Mobile app developed with Flutter",
            image: "https://via.placeholder.com/600x400?text=Project+Beta",
            details: "A cross-platform mobile application that helps users do X. Implemented features like A and B.",
            link: "https://github.com/yourusername/project-beta"
        },
        {
            title: "Project Gamma",
            description: "Data visualization dashboard",
            image: "https://via.placeholder.com/600x400?text=Project+Gamma",
            details: "Interactive dashboard displaying real-time data from various sources using D3.js and Python backend.",
            link: "https://github.com/yourusername/project-gamma"
        }
    ];

    // Marketing projects data
    const marketingProjects = [
        {
            title: "Brand X Campaign",
            description: "Social media marketing campaign",
            image: "https://via.placeholder.com/600x400?text=Brand+X",
            social: {
                facebook: "https://facebook.com/brandx",
                instagram: "https://instagram.com/brandx",
                tiktok: "https://tiktok.com/@brandx"
            },
            contact: {
                name: "John Smith",
                phone: "(123) 456-7890",
                email: "john@brandx.com"
            }
        },
        {
            title: "Product Y Launch",
            description: "Digital product launch strategy",
            image: "https://via.placeholder.com/600x400?text=Product+Y",
            social: {
                facebook: "https://facebook.com/producty",
                instagram: "https://instagram.com/producty",
                tiktok: "https://tiktok.com/@producty"
            },
            contact: {
                name: "Sarah Johnson",
                phone: "(987) 654-3210",
                email: "sarah@producty.com"
            }
        },
        {
            title: "Company Z Rebrand",
            description: "Complete brand identity overhaul",
            image: "https://via.placeholder.com/600x400?text=Company+Z",
            social: {
                facebook: "https://facebook.com/companyz",
                instagram: "https://instagram.com/companyz",
                tiktok: "https://tiktok.com/@companyz"
            },
            contact: {
                name: "Michael Brown",
                phone: "(555) 123-4567",
                email: "michael@companyz.com"
            }
        }
    ];

    // Initialize coding projects slider
    const sliderContainer = document.querySelector('.slider-container');
    
    codingProjects.forEach((project, index) => {
        const slide = document.createElement('div');
        //console.log(index);
        
        slide.className = 'slide';
        slide.innerHTML = `
            <div class="slide-content">
                <div class="slide-image" style="background-image: url('${project.image}')"></div>
                <div class="slide-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <button class="view-project" data-index="${index}">View Project</button>
                </div>
            </div>
        `;
        sliderContainer.appendChild(slide);
    });

    // Initialize marketing projects grid
    const marketingGrid = document.querySelector('.marketing-grid');
    
    marketingProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'marketing-card';
        card.innerHTML = `
            <div class="marketing-image" style="background-image: url('${project.image}')"></div>
            <div class="marketing-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="social-links">
                    <a href="${project.social.facebook}" target="_blank"><i class="fab fa-facebook"></i></a>
                    <a href="${project.social.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="${project.social.tiktok}" target="_blank"><i class="fab fa-tiktok"></i></a>
                </div>
                <div class="contact-info" style="margin-top: 15px;">
                    <p><strong>Contact:</strong> ${project.contact.name}</p>
                    <p>${project.contact.phone}</p>
                    <p>${project.contact.email}</p>
                </div>
            </div>
        `;
        marketingGrid.appendChild(card);
    });

    // Modal functionality
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');
    const closeModal = document.querySelector('.close-modal');

    // Open modal with project details
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-project')) {
            const index = e.target.getAttribute('data-index');
            const project = codingProjects[currentSlideIndex];
            
            modalTitle.textContent = project.title;
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalDescription.textContent = project.details;
            modalLink.href = project.link;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Slider functionality
    let currentSlideIndex = 0;
    let slides = document.querySelectorAll('.slide');
    let sliderInterval;

    function initSlider() {
        if (slides.length > 0) {
            slides[currentSlideIndex].classList.add('active');
            startSliderTimer();
        }
    }

    function goToSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        
        // Update current slide index
        currentSlideIndex = index;
        
        // Add active class to new slide
        slides[currentSlideIndex].classList.add('active');
    }

    function nextSlide() {
        let nextIndex = currentSlideIndex + 1;
        console.log(currentSlideIndex);
        index = nextIndex;
        if (nextIndex >= slides.length) nextIndex = 0;
        
        // Mark current slide as prev for transition
        slides[currentSlideIndex].classList.add('prev');
        
        goToSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = currentSlideIndex - 1;
        //console.log(currentSlideIndex);
        if (prevIndex < 0) prevIndex = slides.length - 1;
        
        // Mark current slide as prev for transition
        slides[currentSlideIndex].classList.add('prev');
        
        goToSlide(prevIndex);
    }

    function startSliderTimer() {
        sliderInterval = setInterval(nextSlide, 5000); // Rotate every 5 seconds
    }

    function resetSliderTimer() {
        clearInterval(sliderInterval);
        startSliderTimer();
    }

    // Initialize slider
    initSlider();
    
    // Slider navigation
    document.querySelector('.slider-next').addEventListener('click', function() {
        nextSlide();
        resetSliderTimer();
    });

    document.querySelector('.slider-prev').addEventListener('click', function() {
        prevSlide();
        resetSliderTimer();
    });
    
    // Pause on hover
    const slider = document.querySelector('.slider-container');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(sliderInterval));
        slider.addEventListener('mouseleave', startSliderTimer);
    }

    // Smooth scrolling for navigation
    
});