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


