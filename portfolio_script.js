const optionsLinks = document.getElementsByClassName('options-links');  
const optionsContents = document.getElementsByClassName('options-content');

function openTab(tabName) {
// Remove active class from all tabs
    for (let link of optionsLinks) {
        link.classList.remove('active-links');
    }

    // Hide all content sections
    for (let content of optionsContents) {
        content.classList.remove('active-tab');
    }

    // Add active class to the clicked tab
    event.currentTarget.classList.add('active-links');

    // Show the corresponding content
    document.getElementById(tabName).classList.add('active-tab');
}

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbar = document.getElementById('navbar');
    const tools = document.querySelector('.tools');
    
    if (mobileMenuToggle && navbar) {
        mobileMenuToggle.addEventListener('click', function() {
            navbar.classList.toggle('mobile-nav-active');
            tools.classList.toggle('mobile-nav-active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('mobile-nav-active');
                tools.classList.remove('mobile-nav-active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
});

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);
// Whenever the user explicitly chooses light mode
localStorage.theme = "light";
// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";
// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form[name="contact"]');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.value = 'Sending...';
            formStatus.textContent = '';
            formStatus.className = 'mt-2 text-sm';
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Ensure form-name is included
            if (!formData.has('form-name')) {
                formData.append('form-name', 'contact');
            }
            
            // Convert FormData to URL-encoded string
            const encodedData = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                encodedData.append(key, value);
            }
            
            // Submit to Netlify Forms
            fetch('/', {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: encodedData.toString()
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    formStatus.className = 'mt-2 text-sm text-green-600 dark:text-green-400';
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.value = 'Send Message';
                        formStatus.textContent = '';
                    }, 3000);
                } else {
                    // Try to get error details
                    return response.text().then(text => {
                        console.error('Form submission error:', text);
                        throw new Error(`Server error: ${response.status}`);
                    });
                }
            })
            .catch(error => {
                // Error handling
                console.error('Form submission error:', error);
                formStatus.textContent = '✗ Sorry, there was an error sending your message. Please try again or email me directly at alanhakim491@gmail.com';
                formStatus.className = 'mt-2 text-sm text-red-600 dark:text-red-400';
                submitBtn.disabled = false;
                submitBtn.value = 'Send Message';
            });
        });
    }
});


