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
            
            // Get the current page URL for Netlify Forms submission
            // For Netlify Forms, submit to the current page
            const formAction = contactForm.getAttribute('action') || window.location.pathname || '/';
            
            // Submit to Netlify Forms
            fetch(formAction, {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: encodedData.toString()
            })
            .then(response => {
                // Netlify Forms returns 200 on success, but also might redirect
                // Check for success (200) or redirect (302)
                if (response.ok || response.status === 200 || response.status === 302) {
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
                } else if (response.status === 404) {
                    // 404 means form endpoint not found - likely testing locally
                    throw new Error('Form endpoint not found. This form only works when deployed to Netlify. Please deploy your site or test on the live Netlify URL.');
                } else {
                    // Try to get error details
                    return response.text().then(text => {
                        console.error('Form submission error response:', text);
                        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
                    });
                }
            })
            .catch(error => {
                // Error handling
                console.error('Form submission error:', error);
                
                // Provide helpful error message
                let errorMessage = '✗ Sorry, there was an error sending your message.';
                if (error.message.includes('404') || error.message.includes('not found')) {
                    errorMessage += ' This form only works when deployed to Netlify. Please deploy your site or email me directly at alanhakim491@gmail.com';
                } else {
                    errorMessage += ' Please try again or email me directly at alanhakim491@gmail.com';
                }
                
                formStatus.textContent = errorMessage;
                formStatus.className = 'mt-2 text-sm text-red-600 dark:text-red-400';
                submitBtn.disabled = false;
                submitBtn.value = 'Send Message';
            });
        });
    }
});


