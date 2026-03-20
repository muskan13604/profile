document.addEventListener('DOMContentLoaded', () => {
    
    // ======= Mobile Navigation =======
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ======= Typing Effect =======
    const typingText = document.querySelector('.typing-text');
    const words = [
        "Software Engineer", 
        "Full-Stack Developer", 
        "Problem Solver", 
        "IT Enthusiast"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function type() {
        if (!typingText) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50; // Faster deleting
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100; // Normal typing
        }
        
        // If word is complete, pause then start deleting
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingDelay = 2000; // Pause at end of word
        } 
        // If word is completely deleted, move to next word
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 500; // Pause before new word
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Start typing effect
    if (words.length > 0) {
        setTimeout(type, 1000);
    }

    // ======= Scroll Animations =======
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const checkScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        fadeElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // ======= Navbar Background on Scroll =======
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 17, 23, 0.9)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ======= Active Link Highlighting =======
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});
