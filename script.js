// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Terminal command functionality
const terminalCommand = document.getElementById('terminalCommand');
const contactForm = document.getElementById('contactForm');

terminalCommand.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (terminalCommand.value.trim().toLowerCase() === 'contact') {
            contactForm.style.display = 'block';
            terminalCommand.value = '';
        }
    }
});

// Form submission using Formspree
const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send form data to Formspree
    try {
        const response = await fetch('https://formspree.io/f/service_z6eq1oc', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: new FormData(messageForm)
        });

        if (response.ok) {
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            messageForm.reset();
            contactForm.style.display = 'none';
        } else {
            alert('Oops! Something went wrong. Please try again later.');
        }
    } catch (error) {
        alert('Oops! Something went wrong. Please try again later.');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});