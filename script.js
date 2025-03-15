const hamburger = document.querySelector('.hamburger');
 const navLinks = document.querySelector('.nav-links');
 const themeToggle = document.getElementById('theme-toggle');
 const body = document.body;
 const contactForm = document.querySelector('.contact-form');
 
 // Check for saved theme preference
 const savedTheme = localStorage.getItem('theme');
 if (savedTheme === 'light') {
     body.classList.add('light-mode');
     themeToggle.textContent = 'Portfolio ☀️';
 }
 
 // Theme toggle functionality
 themeToggle.addEventListener('click', (e) => {
     e.preventDefault();
     body.classList.toggle('light-mode');
     
     if (body.classList.contains('light-mode')) {
         themeToggle.textContent = 'Portfolio ☀️';
         localStorage.setItem('theme', 'light');
     } else {
         themeToggle.textContent = 'Portfolio 🌙';
         localStorage.setItem('theme', 'dark');
     }
 });
 
 // Hamburger menu functionality
 hamburger.addEventListener('click', () => {
     hamburger.classList.toggle('active');
     navLinks.classList.toggle('active');
 });
 
 // Smooth scrolling for menu items
 document.querySelectorAll('.nav-links a').forEach(link => {
     link.addEventListener('click', (e) => {
         e.preventDefault();
         const targetId = link.getAttribute('href');
         const targetSection = document.querySelector(targetId);
         
         // Close mobile menu
         hamburger.classList.remove('active');
         navLinks.classList.remove('active');
 
         // Calculate the target position
         const headerOffset = 80; // Height of the fixed header
         const elementPosition = targetSection.getBoundingClientRect().top;
         const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
 
         // Smooth scroll to target section
         window.scrollTo({
             top: offsetPosition,
             behavior: 'smooth'
         });
     });
 });
 
 // Update active menu item based on scroll position
 window.addEventListener('scroll', () => {
     const sections = document.querySelectorAll('section');
     const navLinks = document.querySelectorAll('.nav-links a');
 
     sections.forEach(section => {
         const sectionTop = section.offsetTop - 100;
         const sectionHeight = section.clientHeight;
         const scrollPosition = window.scrollY;
 
         if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
             const targetId = '#' + section.getAttribute('id');
             navLinks.forEach(link => {
                 link.classList.remove('active');
                 if (link.getAttribute('href') === targetId) {
                     link.classList.add('active');
                 }
             });
         }
     });
 });
 
 // Form handling
 contactForm.addEventListener('submit', (e) => {
     e.preventDefault();
     
     const nameInput = document.getElementById('name');
     const emailInput = document.getElementById('email');
     const messageInput = document.getElementById('message');
     const submitBtn = document.querySelector('.submit-btn');
     
     // Basic validation
     if (!nameInput.value || !emailInput.value || !messageInput.value) {
         alert('Please fill in all fields');
         return;
     }
     
     // Disable submit button and show loading state
     submitBtn.disabled = true;
     submitBtn.textContent = 'Sending...';
     
     // Prepare the email parameters
     const templateParams = {
         from_name: nameInput.value,
         from_email: emailInput.value,
         message: messageInput.value,
         to_name: 'Ishwor Sharma',
         to_email: 'isosrmaa@gmail.com'
     };
 
     // Send the email using EmailJS
     emailjs.send(
         // TODO: Replace with your Gmail service ID from EmailJS dashboard (like "service_xxxxxx")
         'service_id_from_emailjs',
         // TODO: Replace with your template ID from EmailJS dashboard (like "template_xxxxxx")
         'template_id_from_emailjs',
         templateParams
     )
     .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
         contactForm.reset();
         submitBtn.disabled = false;
         submitBtn.textContent = 'Send Message';
         alert('Message sent successfully!');
     })
     .catch(function(error) {
         console.error('FAILED...', error);
         submitBtn.disabled = false;
         submitBtn.textContent = 'Send Message';
         alert('Failed to send message. Please try again.');
     });
 });
 
 // Add floating animation to profile image
 const profileImage = document.querySelector('.profile-image');
 if (profileImage) {
     profileImage.addEventListener('mouseover', () => {
         profileImage.style.animation = 'float 3s ease-in-out infinite';
     });
     
     profileImage.addEventListener('mouseout', () => {
         profileImage.style.animation = 'float 6s ease-in-out infinite';
     });
 }
 
 // Add active state to nav links
 document.querySelectorAll('.nav-links a').forEach(link => {
     if (link.href === window.location.href) {
         link.classList.add('active');
     }
 });
 
 // Function to create typing animation with alternating text
 function typeWriter(element, texts, speed = 100) {
     let textIndex = 0;
     let charIndex = 0;
     let isDeleting = false;
     let typingDelay = speed;
     const deleteSpeed = 50; // Speed of deleting characters
     const pauseDelay = 2000; // Delay between words
 
     function type() {
         const currentText = texts[textIndex];
         
         if (isDeleting) {
             // Deleting text
             element.textContent = currentText.substring(0, charIndex - 1);
             charIndex--;
             typingDelay = deleteSpeed;
         } else {
             // Typing text
             element.textContent = currentText.substring(0, charIndex + 1);
             charIndex++;
             typingDelay = speed;
         }
 
         // Check if word is complete
         if (!isDeleting && charIndex === currentText.length) {
             // Pause at end of word
             typingDelay = pauseDelay;
             isDeleting = true;
         } else if (isDeleting && charIndex === 0) {
             // Move to next word
             isDeleting = false;
             textIndex = (textIndex + 1) % texts.length;
             typingDelay = 500; // Pause before starting new word
         }
 
         setTimeout(type, typingDelay);
     }
 
     type();
 }
 
 // Function to initialize home section animations
 function initHomeAnimations() {
     const heroTitle = document.querySelector('.hero-content h1');
     const heroSubtitle = document.querySelector('.hero-content h2');
     const heroText = document.querySelector('.hero-content p');
     const ctaButton = document.querySelector('.cta-button');
 
     // Add animation classes
     if (heroTitle) {
         heroTitle.style.opacity = '0';
         heroTitle.style.transform = 'translateY(20px)';
         setTimeout(() => {
             heroTitle.style.opacity = '1';
             heroTitle.style.transform = 'translateY(0)';
         }, 500);
     }
 
     if (heroSubtitle) {
         heroSubtitle.style.opacity = '0';
         heroSubtitle.style.transform = 'translateY(20px)';
         setTimeout(() => {
             heroSubtitle.style.opacity = '1';
             heroSubtitle.style.transform = 'translateY(0)';
         }, 1000);
     }
 
     if (heroText) {
         heroText.style.opacity = '0';
         heroText.style.transform = 'translateY(20px)';
         setTimeout(() => {
             heroText.style.opacity = '1';
             heroText.style.transform = 'translateY(0)';
         }, 1500);
     }
 
     if (ctaButton) {
         ctaButton.style.opacity = '0';
         ctaButton.style.transform = 'translateY(20px)';
         setTimeout(() => {
             ctaButton.style.opacity = '1';
             ctaButton.style.transform = 'translateY(0)';
         }, 2000);
     }
 }
 
 // Initialize animations when DOM is loaded
 document.addEventListener('DOMContentLoaded', () => {
     initHomeAnimations();
     
     // Initialize typing animation
     const typingElement = document.getElementById('typing-text');
     const textsToType = ['Ishwor Sharma', 'Techlover'];
     typeWriter(typingElement, textsToType, 150);
 });
 
 // Add parallax effect to home section
 window.addEventListener('scroll', () => {
     const homeSection = document.querySelector('#home');
     const scrolled = window.pageYOffset;
     
     if (homeSection) {
         homeSection.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
     }
 });
 
 // Function to handle scroll animations
 function handleScrollAnimations() {
     const elements = document.querySelectorAll('.project-card, .skill-card');
     const windowHeight = window.innerHeight;
 
     elements.forEach(element => {
         const elementTop = element.getBoundingClientRect().top;
         const elementVisible = 150;
 
         if (elementTop < windowHeight - elementVisible) {
             element.classList.add('animate');
         }
     });
 }
 
 // Function to initialize project card interactions
 function initProjectCards() {
     const projectCards = document.querySelectorAll('.project-card');
     
     projectCards.forEach(card => {
         card.addEventListener('mouseenter', () => {
             card.style.transform = 'translateY(-15px) scale(1.02)';
             card.style.boxShadow = '0 15px 30px rgba(100, 255, 218, 0.2)';
         });
 
         card.addEventListener('mouseleave', () => {
             card.style.transform = 'translateY(0) scale(1)';
             card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
         });
     });
 }
 
 // Function to initialize skill card interactions
 function initSkillCards() {
     const skillCards = document.querySelectorAll('.skill-card');
     
     skillCards.forEach(card => {
         const icon = card.querySelector('i');
         
         card.addEventListener('mouseenter', () => {
             icon.style.transform = 'scale(1.1) rotate(5deg)';
             card.style.transform = 'translateY(-10px)';
         });
 
         card.addEventListener('mouseleave', () => {
             icon.style.transform = 'scale(1) rotate(0)';
             card.style.transform = 'translateY(0)';
         });
     });
 }
 
 // Function to add hover effects to footer elements
 function initFooterEffects() {
     const footerIcons = document.querySelectorAll('.footer-bottom i');
     const footerSpans = document.querySelectorAll('.footer-bottom span');
 
     footerIcons.forEach(icon => {
         icon.addEventListener('mouseenter', () => {
             icon.style.transform = 'scale(1.2)';
             icon.style.color = '#64ffda';
         });
 
         icon.addEventListener('mouseleave', () => {
             icon.style.transform = 'scale(1)';
             icon.style.color = '';
         });
     });
 
     footerSpans.forEach(span => {
         span.addEventListener('mouseenter', () => {
             span.style.transform = 'translateY(-2px)';
             span.style.color = '#00ff88';
         });
 
         span.addEventListener('mouseleave', () => {
             span.style.transform = 'translateY(0)';
             span.style.color = '#64ffda';
         });
     });
 }
 
 // Initialize all section enhancements
 document.addEventListener('DOMContentLoaded', () => {
     initProjectCards();
     initSkillCards();
     initFooterEffects();
     handleScrollAnimations();
 });
 
 // Handle scroll animations
 window.addEventListener('scroll', handleScrollAnimations);