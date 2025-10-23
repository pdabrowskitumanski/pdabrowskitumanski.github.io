// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initResearchTabs();
    initContactForm();
    initScrollEffects();
    initSmoothScrolling();
    loadPublications();
    loadBlogPosts();
    loadNews();
    loadTeaching(null, null, true); // Show only current courses on main teaching page
    loadProjects();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all sections and nav links
                sections.forEach(section => section.classList.remove('active'));
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                
                // Add active class to target section and clicked nav link
                targetSection.classList.add('active');
                this.classList.add('active');
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Scroll to top of the page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle dropdown links
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // If it's a research subsection, show research section and activate correct tab
                if (targetId.startsWith('research-')) {
                    const researchSection = document.getElementById('research');
                    sections.forEach(section => section.classList.remove('active'));
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    
                    researchSection.classList.add('active');
                    document.querySelector('a[href="#research"]').classList.add('active');
                    
                    // Activate the correct research tab
                    const tabName = targetId.replace('research-', '');
                    activateResearchTab(tabName);
                } else if (targetId.startsWith('teaching-')) {
                    const teachingSection = document.getElementById('teaching');
                    sections.forEach(section => section.classList.remove('active'));
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    
                    teachingSection.classList.add('active');
                    document.querySelector('a[href="#teaching"]').classList.add('active');
                }
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Research tabs functionality
function initResearchTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            activateResearchTab(targetTab);
        });
    });
}

function activateResearchTab(tabName) {
    console.log(`🔬 Activating research tab: ${tabName}`);
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    console.log(`🔬 Found ${tabButtons.length} tab buttons and ${tabContents.length} tab contents`);
    
    // Remove active class from all tabs
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
    const targetContent = document.getElementById(`research-${tabName}`);
    console.log(`🔬 Target button:`, targetButton);
    console.log(`🔬 Target content:`, targetContent);
    
    if (targetButton && targetContent) {
        targetButton.classList.add('active');
        targetContent.classList.add('active');
        console.log(`✅ Activated tab: ${tabName}`);
        
        // Additional debugging for community tab
        if (tabName === 'community') {
            console.log(`🔬 Community tab activated. Content visibility:`, targetContent.style.display);
            console.log(`🔬 Community tab classes:`, targetContent.className);
            console.log(`🔬 Community content children:`, targetContent.children.length);
        }
    } else {
        console.error(`❌ Could not activate tab: ${tabName}. Button found: ${!!targetButton}, Content found: ${!!targetContent}`);
        
        // Additional debugging for community tab
        if (tabName === 'community') {
            console.log(`🔬 Community tab debugging:`);
            console.log(`  - All tab buttons:`, Array.from(tabButtons).map(btn => ({ text: btn.textContent, dataTab: btn.getAttribute('data-tab') })));
            console.log(`  - All tab contents:`, Array.from(tabContents).map(content => ({ id: content.id, classes: content.className })));
        }
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form-element');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual submission logic)
            // showNotification('Thank you for your message! I will get back to you soon.', 'success');
            this.reset();
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Scroll effects
function initScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial call
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    console.log('🔗 Initializing smooth scrolling...');
    // Handle internal anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    console.log(`🔗 Found ${anchorLinks.length} anchor links:`, Array.from(anchorLinks).map(a => a.getAttribute('href')));
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log(`🔗 Clicked link: ${href}`);
            
            // Handle internal anchor links
            e.preventDefault();
            const targetId = href.substring(1);
            console.log(`🎯 Target ID: ${targetId}`);
            
            // Special handling for research tab links
            if (targetId.startsWith('research-') && targetId !== 'research') {
                const tabName = targetId.replace('research-', '');
                console.log(`🔬 Research tab link detected. Tab name: ${tabName}`);
                // Activate the specific research tab
                activateResearchTab(tabName);
                // Scroll to research section
                const researchSection = document.getElementById('research');
                if (researchSection) {
                    console.log(`🔬 Found research section, scrolling...`);
                    const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;
                    const elementRect = researchSection.getBoundingClientRect();
                    const elementTop = elementRect.top + window.pageYOffset;
                    const offsetPosition = elementTop - navbarHeight - 20;
                    console.log(`🔬 Research scroll calculation: navbar=${navbarHeight}, elementTop=${elementTop}, finalOffset=${offsetPosition}`);
                    
                    window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: 'smooth'
                    });
                } else {
                    console.error('❌ Research section not found!');
                }
                return;
            }
            
            // Special handling for teaching filter links
            if (targetId.startsWith('teaching-') && targetId !== 'teaching') {
                console.log(`👩‍🏫 Teaching filter link detected: ${targetId}`);
                
                // Parse the year and institution from the link
                let yearFilter = null;
                let institutionFilter = null;
                
                if (targetId === 'teaching-2024-2025-uksw') {
                    yearFilter = '2024/2025';
                    institutionFilter = 'UKSW';
                } else if (targetId === 'teaching-2025-2026-uksw') {
                    yearFilter = '2025/2026';
                    institutionFilter = 'UKSW';
                } else if (targetId === 'teaching-2025-2026-pw') {
                    yearFilter = '2025/2026';
                    institutionFilter = 'PW';
                }
                
                console.log(`👩‍🏫 Loading teaching with filter: year=${yearFilter}, institution=${institutionFilter}`);
                
                // First, activate the teaching section
                const sections = document.querySelectorAll('.section');
                const navLinks = document.querySelectorAll('.nav-link');
                const teachingSection = document.getElementById('teaching');
                
                if (teachingSection) {
                    // Deactivate all sections and nav links
                    sections.forEach(section => section.classList.remove('active'));
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    
                    // Activate teaching section and nav link
                    teachingSection.classList.add('active');
                    document.querySelector('a[href="#teaching"]').classList.add('active');
                    
                    console.log(`👩‍🏫 Activated teaching section`);
                    
                    // Load filtered teaching content
                    loadTeaching(yearFilter, institutionFilter, false);
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    const navToggle = document.querySelector('.nav-toggle');
                    if (navMenu) navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                    
                    // Scroll to teaching section
                    console.log(`👩‍🏫 Scrolling to teaching section...`);
                    const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;
                    const elementRect = teachingSection.getBoundingClientRect();
                    const elementTop = elementRect.top + window.pageYOffset;
                    const offsetPosition = elementTop - navbarHeight - 20;
                    console.log(`👩‍🏫 Teaching scroll calculation: navbar=${navbarHeight}, elementTop=${elementTop}, finalOffset=${offsetPosition}`);
                    
                    window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: 'smooth'
                    });
                } else {
                    console.error('❌ Teaching section not found!');
                }
                return;
            }
            
            // Special handling for main teaching link (show current courses only)
            if (targetId === 'teaching') {
                console.log(`👩‍🏫 Main teaching link clicked - showing current courses only`);
                
                // First, activate the teaching section
                const sections = document.querySelectorAll('.section');
                const navLinks = document.querySelectorAll('.nav-link');
                const teachingSection = document.getElementById('teaching');
                
                if (teachingSection) {
                    // Deactivate all sections and nav links
                    sections.forEach(section => section.classList.remove('active'));
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    
                    // Activate teaching section and nav link
                    teachingSection.classList.add('active');
                    document.querySelector('a[href="#teaching"]').classList.add('active');
                    
                    console.log(`👩‍🏫 Activated teaching section`);
                    
                    // Load current courses only
                    loadTeaching(null, null, true);
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    const navToggle = document.querySelector('.nav-toggle');
                    if (navMenu) navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                    
                    // Scroll to teaching section
                    const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;
                    const elementRect = teachingSection.getBoundingClientRect();
                    const elementTop = elementRect.top + window.pageYOffset;
                    const offsetPosition = elementTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: 'smooth'
                    });
                }
                return;
            }
            
            // Special handling for blog category links
            if (targetId.startsWith('blog-') && targetId !== 'blog') {
                console.log(`📝 Blog category link detected: ${targetId}`);
                
                // Parse the category from the link
                let categoryFilter = null;
                
                if (targetId === 'blog-cheminformatics') {
                    categoryFilter = 'cheminformatics';
                } else if (targetId === 'blog-sports') {
                    categoryFilter = 'sports';
                } else if (targetId === 'blog-travelling') {
                    categoryFilter = 'travelling';
                }
                
                console.log(`📝 Parsed category filter: "${categoryFilter}" from targetId: "${targetId}"`);
                
                // First, activate the blog section
                const sections = document.querySelectorAll('.section');
                const navLinks = document.querySelectorAll('.nav-link');
                const blogSection = document.getElementById('blog');
                
                if (blogSection) {
                    // Deactivate all sections and nav links
                    sections.forEach(section => section.classList.remove('active'));
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    
                    // Activate blog section and nav link
                    blogSection.classList.add('active');
                    document.querySelector('a[href="#blog"]').classList.add('active');
                    
                    console.log(`📝 Activated blog section`);
                    
                    // Load filtered blog content
                    loadBlogPosts(categoryFilter);
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    const navToggle = document.querySelector('.nav-toggle');
                    if (navMenu) navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                    
                    // Scroll to blog section
                    console.log(`📝 Scrolling to blog section...`);
                    const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;
                    const elementRect = blogSection.getBoundingClientRect();
                    const elementTop = elementRect.top + window.pageYOffset;
                    const offsetPosition = elementTop - navbarHeight - 20;
                    console.log(`📝 Blog scroll calculation: navbar=${navbarHeight}, elementTop=${elementTop}, finalOffset=${offsetPosition}`);
                    
                    window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: 'smooth'
                    });
                } else {
                    console.error('❌ Blog section not found!');
                }
                return;
            }
            
            // Special handling for main blog link (show all posts)
            if (targetId === 'blog') {
                console.log(`📝 Main blog link clicked - showing all posts`);
                
                // First, activate the blog section
                const sections = document.querySelectorAll('.section');
                const navLinks = document.querySelectorAll('.nav-link');
                const blogSection = document.getElementById('blog');
                
                if (blogSection) {
                    // Deactivate all sections and nav links
                    sections.forEach(section => section.classList.remove('active'));
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    
                    // Activate blog section and nav link
                    blogSection.classList.add('active');
                    document.querySelector('a[href="#blog"]').classList.add('active');
                    
                    console.log(`📝 Activated blog section`);
                    
                    // Load all blog posts
                    loadBlogPosts();
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    const navToggle = document.querySelector('.nav-toggle');
                    if (navMenu) navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                    
                    // Scroll to blog section
                    const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;
                    const elementRect = blogSection.getBoundingClientRect();
                    const elementTop = elementRect.top + window.pageYOffset;
                    const offsetPosition = elementTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: 'smooth'
                    });
                }
                return;
            }
            
            // Handle regular internal links
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                console.log(`📍 Found target element for ${targetId}:`, targetElement);
                // Calculate the offset to account for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;
                const elementRect = targetElement.getBoundingClientRect();
                const elementTop = elementRect.top + window.pageYOffset;
                const offsetPosition = elementTop - navbarHeight - 20; // 20px extra padding
                console.log(`📏 Scroll calculation: navbar=${navbarHeight}, elementTop=${elementTop}, finalOffset=${offsetPosition}`);
                
                window.scrollTo({
                    top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
                    behavior: 'smooth'
                });
                console.log(`✅ Scrolling to ${targetId}`);
            } else {
                console.error(`❌ Target element not found: ${targetId}`);
            }
        });
    });
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Intersection Observer for animations (optional enhancement)
function initIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate in
        document.querySelectorAll('.news-item, .project-card, .publication-item, .service-card, .blog-post').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Function to re-initialize intersection observer after content is loaded
function reinitIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate in
        document.querySelectorAll('.news-item, .project-card, .publication-item, .service-card, .blog-post').forEach(el => {
            // Only apply animation styles if not already visible
            if (el.style.opacity !== '1') {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            }
        });
    }
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Print styles handler
window.addEventListener('beforeprint', function() {
    // Ensure all sections are visible for printing
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'block';
    });
});

window.addEventListener('afterprint', function() {
    // Restore normal section visibility
    document.querySelectorAll('.section').forEach(section => {
        if (!section.classList.contains('active')) {
            section.style.display = 'none';
        }
    });
});

// Load Publications from JSON files
async function loadPublications() {
    const publicationYears = ['2025', '2024', '2023', '2021', '2019', '2018', '2017', '2016', '2015', '2013'];
    const publicationsContainer = document.getElementById('research-articles');
    
    if (!publicationsContainer) return;
    
    // Clear existing content except the title
    const title = publicationsContainer.querySelector('h3');
    publicationsContainer.innerHTML = '';
    if (title) publicationsContainer.appendChild(title);
    
    // Check if we can load JSON files (CORS check)
    if (window.location.protocol === 'file:') {
        console.warn('Loading from file:// protocol - cannot load publication files due to CORS restrictions');
        showNotification('Cannot load publications from local files. Please use an HTTP server to view publication content.', 'warning');
        showNoPublicationsMessage();
        return;
    }
    
    try {
        let loadedAny = false;
        for (const year of publicationYears) {
            try {
                const response = await fetch(`data/publications/${year}.json`);
                if (!response.ok) {
                    console.warn(`Failed to load ${year}.json: ${response.status}`);
                    continue;
                }
                
                const data = await response.json();
                const section = createPublicationSection(data);
                publicationsContainer.appendChild(section);
                loadedAny = true;
            } catch (yearError) {
                console.warn(`Error loading ${year}.json:`, yearError);
            }
        }
        
        if (!loadedAny) {
            console.warn('No publication files could be loaded');
            showNotification('No publication files found', 'info');
            showNoPublicationsMessage();
        } else {
            const loadedCount = publicationsContainer.querySelectorAll('.publications-section').length;
            console.log(`✅ Successfully loaded ${loadedCount} publication sections`);
            // showNotification(`Loaded publications from ${loadedCount} time periods`, 'success');
            
            // Re-initialize intersection observer for new content
            setTimeout(() => reinitIntersectionObserver(), 100);
        }
    } catch (error) {
        console.error('Error loading publications:', error);
        showNotification('Failed to load publications', 'error');
        showNoPublicationsMessage();
    }
}

function createPublicationSection(data) {
    const section = document.createElement('div');
    section.className = 'publications-section';
    
    const yearHeader = document.createElement('h4');
    yearHeader.className = 'year-header';
    yearHeader.textContent = data.year_range;
    section.appendChild(yearHeader);
    
    const publicationsList = document.createElement('div');
    publicationsList.className = 'publications-list';
    
    data.publications.forEach(pub => {
        const pubItem = createPublicationItem(pub);
        publicationsList.appendChild(pubItem);
    });
    
    section.appendChild(publicationsList);
    return section;
}

function createPublicationItem(pub) {
    const item = document.createElement('div');
    item.className = 'publication-item';
    
    // Format authors (highlight your name)
    const formattedAuthors = pub.authors.map(author => 
        author === 'Your Name' ? `<strong>${author}</strong>` : author
    ).join(', ');
    
    // Create figure section
    const figureHtml = pub.image ? `
        <div class="publication-figure">
            <img src="${pub.image}" alt="Figure for ${pub.title}" onerror="this.style.display='none'">
        </div>
    ` : '';
    
    // Create DOI badges
    const badgesHtml = pub.doi ? `
        <div class="publication-badges">
            <span class="__dimensions_badge_embed__" data-doi="${pub.doi}" data-style="small_circle" data-legend="never"></span>
            <span class='altmetric-embed' data-badge-type='donut' data-doi="${pub.doi}"></span>
        </div>
    ` : '';
    // _altmetric_embed_init();
    
    // Create links
    const links = [];
    if (pub.pdf_url && pub.pdf_url !== '#') {
        links.push(`<a href="${pub.pdf_url}" class="pub-link" target="_blank">PDF</a>`);
    }
    if (pub.doi) {
        const doiUrl = pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`;
        links.push(`<a href="${doiUrl}" class="pub-link" target="_blank">DOI</a>`);
    }
    if (pub.code_url && pub.code_url !== '#') {
        links.push(`<a href="${pub.code_url}" class="pub-link" target="_blank">Code</a>`);
    }
    if (pub.youtube_url && pub.youtube_url !== '#') {
        links.push(`<a href="${pub.youtube_url}" class="pub-link youtube-link" target="_blank">YouTube</a>`);
    }
    
    item.innerHTML = `
        <div class="publication-content">
            <div class="publication-main">
                <h4>${pub.title}</h4>
                <p class="publication-authors">${formattedAuthors}</p>
                <p class="publication-journal"><em>${pub.journal}</em>, ${pub.year}</p>
                ${pub.abstract ? `<p class="publication-abstract">${pub.abstract}</p>` : ''}
                <div class="publication-links">${links.join('')}</div>
                ${pub.keywords ? `<div class="publication-keywords">${pub.keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}</div>` : ''}
            </div>
            <div class="publication-sidebar">
                ${figureHtml}
                ${badgesHtml}
            </div>
        </div>
    `;
    
    return item;
}

// Load Blog Posts from JSON file
async function loadBlogPosts(categoryFilter = null) {
    const blogContainer = document.querySelector('.blog-posts');
    if (!blogContainer) return;
    
    // Check if we can load JSON files (CORS check)
    if (window.location.protocol === 'file:') {
        console.warn('Loading from file:// protocol - cannot load blog files due to CORS restrictions');
        showNotification('Cannot load blog posts from local files. Please use an HTTP server to view blog content.', 'warning');
        showNoBlogMessage();
        return;
    }
    
    try {
        const response = await fetch(`data/blog/posts.json?v=${Date.now()}`);
        if (!response.ok) {
            throw new Error(`Failed to load blog posts: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log(`📝 Loaded ${data.posts.length} total posts`);
        console.log('📝 Available categories:', [...new Set(data.posts.map(post => post.category))]);
        
        // Apply category filter if specified
        let filteredPosts = data.posts;
        if (categoryFilter) {
            console.log(`📝 Filtering for category: "${categoryFilter}"`);
            console.log('📝 Posts with their categories:');
            data.posts.forEach((post, index) => {
                console.log(`  ${index + 1}. "${post.title}" - category: "${post.category}" (length: ${post.category?.length || 'undefined'})`);
                console.log(`     Match test: "${post.category}" === "${categoryFilter}" = ${post.category === categoryFilter}`);
            });
            
            filteredPosts = data.posts.filter(post => {
                const match = post.category === categoryFilter;
                console.log(`📝 Filter result for "${post.title}": ${match} (category: "${post.category}")`);
                return match;
            });
            console.log(`📝 Posts after filtering: ${filteredPosts.length}`);
            console.log('📝 Filtered posts:', filteredPosts.map(post => `${post.title} (${post.category})`));
        }
        
        // Check if we have posts after filtering
        if (filteredPosts.length === 0) {
            if (categoryFilter) {
                showNoBlogCategoryMessage(categoryFilter);
            } else {
                showNoBlogMessage();
            }
            return;
        }
        
        blogContainer.innerHTML = '';
        
        filteredPosts.forEach(post => {
            const postElement = createBlogPostElement(post);
            blogContainer.appendChild(postElement);
        });
        
        const filterDesc = categoryFilter ? ` in ${categoryFilter}` : '';
        console.log(`✅ Successfully loaded ${filteredPosts.length} blog posts${filterDesc}`);
        // showNotification(`Loaded ${filteredPosts.length} blog posts${filterDesc}!`, 'success');
        
        // Re-initialize intersection observer for new content
        setTimeout(() => reinitIntersectionObserver(), 100);
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showNotification('Failed to load blog posts', 'error');
        showNoBlogMessage();
    }
}

function createBlogPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-post';
    if (post.featured) article.classList.add('featured-post');
    
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const tags = post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('');
    
    article.innerHTML = `
        <div class="post-date">${date}</div>
        <h3><a href="#" onclick="loadBlogPost('${post.id}')">${post.title}</a></h3>
        <p>${post.excerpt}</p>
        <div class="post-meta">
            <span class="read-time">${post.read_time}</span>
            <div class="post-tags">${tags}</div>
        </div>
        <a href="#" onclick="loadBlogPost('${post.id}')" class="read-more">Read more</a>
    `;
    
    return article;
}

// Load individual blog post content
async function loadBlogPost(postId) {
    let post = null;
    let content = null;
    
    // Try to get post data from JSON file first, then fallback to embedded data
    if (window.location.protocol !== 'file:') {
        try {
            const postsResponse = await fetch('data/blog/posts.json');
            const postsData = await postsResponse.json();
            post = postsData.posts.find(p => p.id === postId);
            
            if (post && post.content && !post.content.startsWith('#')) {
                // Try to load external markdown file
                try {
                    const contentResponse = await fetch(post.content);
                    content = await contentResponse.text();
                } catch (contentError) {
                    console.warn('Could not load external content file:', contentError);
                }
            }
        } catch (error) {
            console.warn('Could not load posts.json:', error);
        }
    }
    
    // Fallback to embedded data if JSON loading failed
    if (!post) {
        const embeddedBlogData = {
            "posts": [
                {
                    "id": "future-topology-research",
                    "title": "The Future of Topological Research in Biology",
                    "date": "2024-03-15",
                    "excerpt": "An exploration of emerging trends and future directions in applying topological methods to biological systems...",
                    "content": "# The Future of Topological Research in Biology\n\n*Published on March 15, 2024*\n\nThe intersection of topology and biology represents one of the most exciting frontiers in modern computational science. As we advance deeper into the 21st century, the applications of topological methods in understanding biological systems continue to expand and evolve.\n\n## Current State of the Field\n\nTopological data analysis (TDA) has already proven invaluable in:\n\n- **Protein Structure Analysis**: Understanding folding patterns and stability\n- **DNA Configuration**: Analyzing chromosomal organization and gene regulation\n- **Cellular Networks**: Mapping complex interaction patterns\n- **Evolutionary Biology**: Tracking morphological changes across species\n\n## Emerging Trends\n\n### Machine Learning Integration\n\nThe fusion of topological methods with machine learning is opening new possibilities for understanding complex biological data.\n\n### Multi-Scale Analysis\n\nWe're moving towards understanding biological systems at multiple scales simultaneously, from molecular to cellular to tissue level.\n\n### Real-Time Biological Monitoring\n\nAdvanced computational methods are enabling real-time topological analysis of living systems.\n\n## Challenges Ahead\n\n1. **Computational Complexity**: Scaling TDA methods to larger biological datasets\n2. **Interpretation**: Making topological insights accessible to biologists\n3. **Standardization**: Developing common frameworks and methodologies\n\n## Looking Forward\n\nThe next decade promises breakthroughs in personalized medicine, drug discovery, and synthetic biology through topological analysis.\n\n## Conclusion\n\nAs we continue to push the boundaries of what's possible at the intersection of mathematics and biology, the potential for discovery remains limitless. The key lies in fostering collaboration between mathematicians, computer scientists, and biologists.",
                    "tags": ["topology", "biology", "research", "future trends"],
                    "featured": true,
                    "read_time": "8 min read"
                },
                {
                    "id": "academic-collaboration",
                    "title": "Reflections on Academic Collaboration",
                    "date": "2024-02-28",
                    "excerpt": "Thoughts on building meaningful partnerships in research and the importance of interdisciplinary work...",
                    "content": "# Reflections on Academic Collaboration\n\n*Published on February 28, 2024*\n\nAcademic collaboration has become the cornerstone of modern research, enabling breakthroughs that would be impossible for individual researchers working in isolation.\n\n## The Power of Interdisciplinary Work\n\nSome of the most exciting discoveries happen at the intersection of disciplines. When mathematicians work with biologists, when computer scientists collaborate with physicists, magic happens.\n\n## Building Meaningful Partnerships\n\nSuccessful collaborations require:\n- **Mutual respect** for different expertise areas\n- **Clear communication** across disciplinary boundaries\n- **Shared goals** and vision for the research\n- **Complementary skills** that strengthen the team\n\n## Challenges and Solutions\n\nWhile collaboration brings many benefits, it also presents challenges such as differing publication practices, grant application strategies, and research timelines.\n\n## The Future of Research\n\nAs problems become more complex, collaborative research becomes not just beneficial but essential for advancing human knowledge.",
                    "tags": ["collaboration", "academia", "research", "interdisciplinary"],
                    "featured": false,
                    "read_time": "6 min read"
                },
                {
                    "id": "teaching-digital-age",
                    "title": "Teaching in the Digital Age",
                    "date": "2024-01-20",
                    "excerpt": "How technology is transforming education and research training in mathematics and computational sciences...",
                    "content": "# Teaching in the Digital Age\n\n*Published on January 20, 2024*\n\nThe landscape of education has been fundamentally transformed by digital technologies, creating new opportunities and challenges for educators in mathematics and computational sciences.\n\n## Digital Tools in Mathematics Education\n\nModern teaching leverages:\n- **Interactive visualizations** for complex mathematical concepts\n- **Computational notebooks** for hands-on learning\n- **Virtual reality** for immersive mathematical experiences\n- **AI-powered tutoring** systems for personalized learning\n\n## Adapting Teaching Methods\n\nThe transition to digital education requires rethinking traditional pedagogical approaches while maintaining the rigor and depth that mathematical education demands.\n\n## The Human Element\n\nDespite technological advances, the human connection between teacher and student remains crucial for effective learning and mentorship.\n\n## Looking Ahead\n\nAs we continue to integrate new technologies into education, we must balance innovation with proven pedagogical principles.",
                    "tags": ["teaching", "education", "technology", "digital learning"],
                    "featured": false,
                    "read_time": "7 min read"
                }
            ]
        };
        
        post = embeddedBlogData.posts.find(p => p.id === postId);
    }
    
    if (!post) {
        showNotification('Blog post not found', 'error');
        return;
    }
    
    // Use embedded content if no external content was loaded
    if (!content) {
        content = post.content;
    }
    
    // Show the blog post modal
    showBlogPostModal(post, content);
}

function showBlogPostModal(post, content) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'blog-modal-overlay';
    modal.onclick = (e) => {
        if (e.target === modal) closeBlogModal();
    };
    
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const tags = post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('');
    
    modal.innerHTML = `
        <div class="blog-modal">
            <div class="blog-modal-header">
                <h2>${post.title}</h2>
                <button onclick="closeBlogModal()" class="close-modal">&times;</button>
            </div>
            <div class="blog-modal-meta">
                <span class="post-date">${date}</span>
                <span class="read-time">${post.read_time}</span>
            </div>
            <div class="blog-modal-content">
                ${content.includes('# ') ? convertMarkdownToHTML(content) : `<p>${content}</p>`}
            </div>
            <div class="blog-modal-tags">${tags}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
    const modal = document.querySelector('.blog-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Enhanced markdown to HTML converter with table support
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // Handle code blocks first (to preserve them)
    const codeBlocks = [];
    html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
        const index = codeBlocks.length;
        codeBlocks.push(`<pre><code>${code.trim()}</code></pre>`);
        return `___CODEBLOCK_${index}___`;
    });
    
    // Handle tables
    html = html.replace(/^\|(.+)\|\s*\n\|(.+)\|\s*\n((?:\|.+\|\s*\n?)*)/gm, (match, header, separator, rows) => {
        const headerCells = header.split('|').map(cell => cell.trim()).filter(cell => cell.length > 0);
        const rowLines = rows.trim().split('\n').filter(line => line.trim().length > 0);
        
        let tableHTML = '<table class="course-table">\n<thead>\n<tr>\n';
        headerCells.forEach(cell => {
            tableHTML += `<th>${cell}</th>\n`;
        });
        tableHTML += '</tr>\n</thead>\n<tbody>\n';
        
        rowLines.forEach(rowLine => {
            const cells = rowLine.split('|').map(cell => cell.trim()).filter((cell, index, arr) => {
                // Remove empty cells at start and end
                return !(index === 0 && cell === '') && !(index === arr.length - 1 && cell === '');
            });
            
            if (cells.length > 0) {
                tableHTML += '<tr>\n';
                cells.forEach(cell => {
                    // Handle links in table cells
                    const processedCell = cell.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
                    tableHTML += `<td>${processedCell}</td>\n`;
                });
                tableHTML += '</tr>\n';
            }
        });
        
        tableHTML += '</tbody>\n</table>';
        return tableHTML;
    });
    
    // Handle headers
    html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Handle horizontal rules
    html = html.replace(/^---+$/gm, '<hr>');
    
    // Handle blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
    
    // Handle links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    
    // Handle bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Handle underscore-based bold only (no italic underscores)
    html = html.replace(/\b__(.*?)__\b/g, '<strong>$1</strong>');
    
    // Handle inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Handle lists
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^(\*|\+) (.+)$/gm, '<li>$2</li>');
    
    // Wrap consecutive list items in ul/ol tags
    html = html.replace(/((?:<li>.*<\/li>\s*)+)/g, (match) => {
        // Check if any of the list items came from numbered lists
        const hasNumbered = /^\d+\./.test(match);
        const tag = hasNumbered ? 'ol' : 'ul';
        return `<${tag}>\n${match}</${tag}>\n`;
    });
    
    // Handle paragraphs (split by double newlines)
    const paragraphs = html.split(/\n\s*\n/);
    html = paragraphs.map(para => {
        para = para.trim();
        if (!para) return '';
        
        // Don't wrap if it's already a block element
        if (para.match(/^<(h[1-6]|table|ul|ol|blockquote|pre|hr)/)) {
            return para;
        }
        
        return `<p>${para}</p>`;
    }).join('\n\n');
    
    // Restore code blocks
    codeBlocks.forEach((codeBlock, index) => {
        html = html.replace(`___CODEBLOCK_${index}___`, codeBlock);
    });
    
    // Clean up extra whitespace and line breaks in HTML
    html = html.replace(/\n+/g, '\n').replace(/\n/g, ' ');
    
    // Fix spacing around block elements
    html = html.replace(/(<\/(?:h[1-6]|p|table|ul|ol|blockquote|pre|hr)>)\s*(<(?:h[1-6]|p|table|ul|ol|blockquote|pre|hr))/g, '$1\n\n$2');
    
    return html;
}

// This function is deprecated - replaced with showNoPublicationsMessage
function loadEmbeddedPublications() {
    showNoPublicationsMessage();
}


// Embedded blog posts data (fallback when JSON files can't be loaded)
function loadEmbeddedBlogPosts() {
    showNoBlogMessage();
}

// Show message when no news is available
function showNoNewsMessage() {
    const newsContainer = document.querySelector('.news-grid');
    newsContainer.innerHTML = `
        <div class="no-content-message">
            <div class="no-content-icon">
                <i class="fas fa-newspaper"></i>
            </div>
            <h3>No News Available</h3>
            <p>There are currently no news updates to display. Please check back later for the latest updates on research, publications, and academic activities.</p>
        </div>
    `;
    
    console.log('📰 No news content available');
    showNotification('No news content available', 'info');
}

// Show message when no publications are available
function showNoPublicationsMessage() {
    const publicationsContainer = document.getElementById('research-articles');
    if (!publicationsContainer) return;
    
    // Keep the title if it exists
    const title = publicationsContainer.querySelector('h3');
    publicationsContainer.innerHTML = '';
    if (title) publicationsContainer.appendChild(title);
    
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `
        <div class="no-content-message">
            <div class="no-content-icon">
                <i class="fas fa-file-alt"></i>
            </div>
            <h3>No Publications Available</h3>
            <p>There are currently no publications to display. Publication files should be placed in the <code>data/publications/</code> directory. Please check back later for the latest research publications and academic papers.</p>
        </div>
    `;
    
    publicationsContainer.appendChild(messageDiv);
    console.log('📄 No publications content available');
    showNotification('No publications content available', 'info');
}

// Show message when no teaching content is available
function showNoTeachingMessage() {
    const teachingContainer = document.querySelector('.teaching-content');
    if (!teachingContainer) return;
    
    teachingContainer.innerHTML = `
        <div class="no-content-message">
            <div class="no-content-icon">
                <i class="fas fa-chalkboard-teacher"></i>
            </div>
            <h3>No Teaching Content Available</h3>
            <p>There is currently no teaching content to display. Teaching data should be in <code>data/teaching/teaching.json</code> with course files in <code>data/teaching/courses/</code>. Please check back later for course information and materials.</p>
        </div>
    `;
    
    console.log('👩‍🏫 No teaching content available');
    showNotification('No teaching content available', 'info');
}

// Show message when no current courses are available
function showNoCurrentCoursesMessage() {
    const teachingContainer = document.querySelector('.teaching-content');
    if (!teachingContainer) return;
    
    teachingContainer.innerHTML = `
        <div class="no-content-message">
            <div class="no-content-icon">
                <i class="fas fa-calendar-times"></i>
            </div>
            <h3>No Current Courses</h3>
            <p>There are currently no active courses this semester. Please check the dropdown menu above to view courses from specific academic years, or explore upcoming and past courses.</p>
            <div class="course-suggestions">
                <a href="#teaching-2024-2025-uksw" class="suggestion-link">
                    <i class="fas fa-arrow-right"></i> View 2024/2025 @ UKSW
                </a>
                <a href="#teaching-2025-2026-uksw" class="suggestion-link">
                    <i class="fas fa-arrow-right"></i> View 2025/2026 @ UKSW
                </a>
                <a href="#teaching-2025-2026-pw" class="suggestion-link">
                    <i class="fas fa-arrow-right"></i> View 2025/2026 @ PW
                </a>
            </div>
        </div>
    `;
    
    console.log('📅 No current courses available');
    showNotification('No current courses - check other academic years', 'info');
}

// Show message when no courses match the filter criteria
function showNoFilteredCoursesMessage(yearFilter, institutionFilter) {
    const teachingContainer = document.querySelector('.teaching-content');
    if (!teachingContainer) return;
    
    const filterText = yearFilter && institutionFilter ? 
        `${yearFilter} @ ${institutionFilter}` : 
        (yearFilter || institutionFilter || 'the selected criteria');
    
    teachingContainer.innerHTML = `
        <div class="no-content-message">
            <div class="no-content-icon">
                <i class="fas fa-filter"></i>
            </div>
            <h3>No Courses Found</h3>
            <p>No courses found for <strong>${filterText}</strong>. Try selecting a different academic year or institution from the Teaching dropdown menu.</p>
            <div class="course-suggestions">
                <a href="#teaching" class="suggestion-link">
                    <i class="fas fa-arrow-left"></i> View All Teaching
                </a>
                <a href="#teaching-2024-2025-uksw" class="suggestion-link">
                    <i class="fas fa-university"></i> 2024/2025 @ UKSW
                </a>
                <a href="#teaching-2025-2026-pw" class="suggestion-link">
                    <i class="fas fa-university"></i> 2025/2026 @ PW
                </a>
            </div>
        </div>
    `;
    
    console.log(`🔍 No courses found for filter: ${filterText}`);
    showNotification(`No courses found for ${filterText}`, 'info');
}

// Show message when no projects are available
function showNoProjectsMessage() {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = `
        <div class="no-content-message">
            <div class="no-content-icon">
                <i class="fas fa-project-diagram"></i>
            </div>
            <h3>No Projects Available</h3>
            <p>There are currently no projects to display. Project data should be in <code>data/projects.json</code>. Please check back later for the latest research projects and collaborative work.</p>
        </div>
    `;
    
    console.log('🚀 No projects content available');
    showNotification('No projects content available', 'info');
}

// Show message when no blog posts are available
function showNoBlogMessage() {
    const blogContainer = document.querySelector('.blog-posts');
    if (!blogContainer) return;
    
    blogContainer.innerHTML = `
        <div class="no-content-message">
            <div class="no-content-icon">
                <i class="fas fa-blog"></i>
            </div>
            <h3>No Blog Posts Available</h3>
            <p>There are currently no blog posts to display. Blog posts should be in <code>data/blog/posts.json</code>. Please check back later for the latest articles and insights.</p>
        </div>
    `;
    
    console.log('📝 No blog content available');
    showNotification('No blog content available', 'info');
}

// Show message when no blog posts match the category filter
function showNoBlogCategoryMessage(category) {
    const blogContainer = document.querySelector('.blog-posts');
    if (!blogContainer) return;
    
    const categoryNames = {
        'cheminformatics': 'Cheminformatics',
        'sports': 'Sports', 
        'travelling': 'Travelling'
    };
    
    const categoryName = categoryNames[category] || category;
    
    blogContainer.innerHTML = `
        <div class="no-content-message">
            <div class="no-content-icon">
                <i class="fas fa-filter"></i>
            </div>
            <h3>No Posts in ${categoryName}</h3>
            <p>There are currently no blog posts in the <strong>${categoryName}</strong> category. Try selecting a different category from the Blog dropdown menu or check out all blog posts.</p>
            <div class="course-suggestions">
                <a href="#blog" class="suggestion-link">
                    <i class="fas fa-arrow-left"></i> View All Blog Posts
                </a>
                <a href="#blog-cheminformatics" class="suggestion-link">
                    <i class="fas fa-flask"></i> Cheminformatics
                </a>
                <a href="#blog-sports" class="suggestion-link">
                    <i class="fas fa-running"></i> Sports
                </a>
                <a href="#blog-travelling" class="suggestion-link">
                    <i class="fas fa-plane"></i> Travelling
                </a>
            </div>
        </div>
    `;
    
    console.log(`📝 No blog posts found in category: ${category}`);
    showNotification(`No posts found in ${categoryName}`, 'info');
}

// Show message when no blog posts are available (general function)
function showNoBlogPostsMessage() {
    const blogContainer = document.querySelector('.blog-posts');
    if (!blogContainer) return;
    
    blogContainer.innerHTML = `
        <div class="no-content-message">
            <div class="no-content-icon">
                <i class="fas fa-edit"></i>
            </div>
            <h3>No Blog Posts Available</h3>
            <p>There are currently no blog posts to display. Blog content should be in <code>data/blog/posts.json</code> with corresponding markdown files in <code>data/blog/content/</code>. Please check back later for the latest articles, insights, and updates.</p>
            <div class="course-suggestions">
                <a href="#blog-cheminformatics" class="suggestion-link">
                    <i class="fas fa-flask"></i> Cheminformatics Posts
                </a>
                <a href="#blog-sports" class="suggestion-link">
                    <i class="fas fa-running"></i> Sports Posts
                </a>
                <a href="#blog-travelling" class="suggestion-link">
                    <i class="fas fa-plane"></i> Travel Posts
                </a>
            </div>
        </div>
    `;
    
    console.log('📝 No blog posts content available');
    showNotification('No blog posts content available', 'info');
}

// Deprecated: Embedded teaching data (replaced with file-based loading)
function loadEmbeddedTeaching() {
    showNoTeachingMessage();
}

// Embedded projects data (fallback when JSON files can't be loaded)
function loadEmbeddedProjects() {
    showNoProjectsMessage();
}

// Load News from JSON file
async function loadNews() {
    console.log('🔍 loadNews() called');
    const newsContainer = document.querySelector('.news-grid');
    if (!newsContainer) {
        console.error('❌ News container not found');
        return;
    }
    console.log('✅ News container found:', newsContainer);
    
    // Check if we can load JSON files (CORS check)
    if (window.location.protocol === 'file:') {
        console.warn('Loading from file:// protocol - cannot load news.json due to CORS restrictions');
        showNotification('Cannot load news from local files. Please use an HTTP server to view news content.', 'warning');
        showNoNewsMessage();
        return;
    }
    
    try {
        console.log('📡 Fetching data/news.json...');
        const response = await fetch('data/news.json');
        console.log('📡 Response received:', response.status, response.ok);
        if (!response.ok) throw new Error(`Failed to load news: ${response.status}`);
        
        const data = await response.json();
        console.log('📄 Data parsed:', data);
        
        // Check if news array exists and has content
        if (!data.news || data.news.length === 0) {
            console.warn('News data is empty');
            showNotification('No news content found', 'info');
            showNoNewsMessage();
            return;
        }
        
        console.log('🧹 Clearing news container...');
        newsContainer.innerHTML = '';
        
        console.log(`🔄 Processing ${data.news.length} news items...`);
        data.news.forEach((newsItem, index) => {
            console.log(`  📰 Creating news item ${index + 1}:`, newsItem.title);
            const newsElement = createNewsElement(newsItem);
            newsContainer.appendChild(newsElement);
        });
        
        console.log(`✅ Successfully loaded ${data.news.length} news items`);
        // showNotification(`Loaded ${data.news.length} news items`, 'success');
        
        // Re-initialize intersection observer for new content
        setTimeout(() => reinitIntersectionObserver(), 100);
    } catch (error) {
        console.error('Error loading news:', error);
        showNotification('Failed to load news content', 'error');
        showNoNewsMessage();
    }
}

function createNewsElement(newsItem) {
    const article = document.createElement('article');
    article.className = 'news-item';
    if (newsItem.featured) article.classList.add('featured-news');
    
    const date = new Date(newsItem.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const typeClass = `news-type-${newsItem.type}`;
    
    // Determine if link is external
    let linkHtml = '';
    if (newsItem.link && newsItem.link !== '#') {
        const isExternal = newsItem.link.startsWith('http') || newsItem.link.startsWith('www') || newsItem.link.startsWith('mailto:');
        const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        const linkIcon = isExternal ? ' <i class="fas fa-external-link-alt"></i>' : '';
        linkHtml = `<a href="${newsItem.link}" class="news-link"${targetAttr}>Read more${linkIcon}</a>`;
    }
    
    article.innerHTML = `
        <div class="news-date">${date}</div>
        <h3>${newsItem.title}</h3>
        <p>${newsItem.description}</p>
        <div class="news-meta">
            <span class="news-type ${typeClass}">${newsItem.type}</span>
        </div>
        ${linkHtml}
    `;
    
    return article;
}

// Load Teaching content from JSON file
async function loadTeaching(yearFilter = null, institutionFilter = null, showCurrentOnly = false) {
    const teachingContainer = document.querySelector('.teaching-content');
    if (!teachingContainer) return;
    
    // Check if we can load JSON files (CORS check)
    if (window.location.protocol === 'file:') {
        console.warn('Loading from file:// protocol - cannot load teaching files due to CORS restrictions');
        showNotification('Cannot load teaching content from local files. Please use an HTTP server to view teaching content.', 'warning');
        showNoTeachingMessage();
        return;
    }
    
    try {
        const response = await fetch('data/teaching/teaching.json');
        if (!response.ok) {
            throw new Error(`Failed to load teaching: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Apply filters if specified
        let filteredData = { ...data };
        if (yearFilter || institutionFilter || showCurrentOnly) {
            filteredData.courses = data.courses.filter(course => {
                let matches = true;
                
                if (showCurrentOnly) {
                    matches = matches && course.status === 'current';
                }
                
                if (yearFilter) {
                    matches = matches && course.year === yearFilter;
                }
                
                if (institutionFilter) {
                    matches = matches && course.institution === institutionFilter;
                }
                
                return matches;
            });
        }
        
        createTeachingContent(filteredData, yearFilter, institutionFilter, showCurrentOnly);
        
        const filterDesc = yearFilter && institutionFilter ? 
            ` for ${yearFilter} @ ${institutionFilter}` :
            showCurrentOnly ? ' (current courses only)' : '';
            
        console.log(`✅ Teaching content loaded${filterDesc}`);
        // showNotification(`Teaching content loaded${filterDesc}!`, 'success');
    } catch (error) {
        console.error('Error loading teaching content:', error);
        showNotification('Failed to load teaching content', 'error');
        showNoTeachingMessage();
    }
}

function createTeachingContent(teachingData, yearFilter = null, institutionFilter = null, showCurrentOnly = false) {
    const teachingContainer = document.querySelector('.teaching-content');
    
    // If showing current only and no current courses, show upcoming courses instead
    if (showCurrentOnly && teachingData.courses.filter(course => course.status === 'current').length === 0) {
        const upcomingCourses = teachingData.courses.filter(course => course.status === 'upcoming');
        if (upcomingCourses.length > 0) {
            // Show upcoming courses instead of current courses
            teachingContainer.innerHTML = `
                <div class="teaching-intro">
                    <p>${teachingData.teaching.intro}</p>
                </div>
                
                <div class="teaching-section">
                    <h3>Upcoming Courses</h3>
                    <div class="courses-grid">
                        ${upcomingCourses.map(course => createCourseCard(course)).join('')}
                    </div>
                </div>

                <div class="teaching-philosophy">
                    <h3>Teaching Philosophy</h3>
                    <p>${teachingData.teaching.philosophy}</p>
                </div>

                ${teachingData.teaching.supervision ? `
                <div class="supervision-section">
                    <h3>Student Supervision</h3>
                    <div class="supervision-stats">
                        <div class="supervision-stat">
                            <span class="stat-number">${teachingData.teaching.supervision.master_students}</span>
                            <span class="stat-label">Master Students</span>
                        </div>
                        <div class="supervision-stat">
                            <span class="stat-number">${teachingData.teaching.supervision.undergraduate_projects}</span>
                            <span class="stat-label">Undergraduate Projects</span>
                        </div>
                    </div>
                </div>
                ` : ''}

                ${teachingData.teaching.teaching_awards && teachingData.teaching.teaching_awards.length > 0 ? `
                <div class="teaching-awards">
                    <h3>Teaching Recognition</h3>
                    <div class="awards-list">
                        ${teachingData.teaching.teaching_awards.map(award => `
                            <div class="award-item">
                                <h4>${award.title}</h4>
                                <p>${award.institution} • ${award.year}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            `;
            return;
        } else {
            showNoCurrentCoursesMessage();
            return;
        }
    }
    
    // Separate courses by status
    const currentCourses = teachingData.courses.filter(course => course.status === 'current');
    const upcomingCourses = teachingData.courses.filter(course => course.status === 'upcoming');
    const pastCourses = teachingData.courses.filter(course => course.status === 'past');
    
    // Check if we have any courses after filtering
    if (teachingData.courses.length === 0 && (yearFilter || institutionFilter)) {
        showNoFilteredCoursesMessage(yearFilter, institutionFilter);
        return;
    }
    
    teachingContainer.innerHTML = `
        <div class="teaching-intro">
            <p>${teachingData.teaching.intro}</p>
        </div>
        
        ${currentCourses.length > 0 ? `
        <div class="teaching-section">
            <h3>Current Courses</h3>
            ${groupCoursesByInstitutionAndYear(currentCourses)}
        </div>
        ` : ''}

        ${upcomingCourses.length > 0 ? `
        <div class="teaching-section">
            <h3>Upcoming Courses</h3>
            ${groupCoursesByInstitutionAndYear(upcomingCourses)}
        </div>
        ` : ''}

        ${pastCourses.length > 0 ? `
        <div class="teaching-section">
            <h3>Past Courses</h3>
            ${groupCoursesByInstitutionAndYear(pastCourses)}
        </div>
        ` : ''}

        <div class="teaching-philosophy">
            <h3>Teaching Philosophy</h3>
            <p>${teachingData.teaching.philosophy}</p>
        </div>

        ${teachingData.teaching.supervision ? `
        <div class="supervision-section">
            <h3>Student Supervision</h3>
            <div class="supervision-stats">
                <div class="supervision-stat">
                    <span class="stat-number">${teachingData.teaching.supervision.master_students}</span>
                    <span class="stat-label">Master Students</span>
                </div>
                <div class="supervision-stat">
                    <span class="stat-number">${teachingData.teaching.supervision.undergraduate_projects}</span>
                    <span class="stat-label">Undergraduate Projects</span>
                </div>
            </div>
        </div>
        ` : ''}

        ${teachingData.teaching.teaching_awards && teachingData.teaching.teaching_awards.length > 0 ? `
        <div class="teaching-awards">
            <h3>Teaching Recognition</h3>
            <div class="awards-list">
                ${teachingData.teaching.teaching_awards.map(award => `
                    <div class="award-item">
                        <h4>${award.title}</h4>
                        <p>${award.institution} • ${award.year}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    `;
}

function groupCoursesByInstitutionAndYear(courses) {
    if (!courses || courses.length === 0) return '';
    
    // Group courses by institution and year
    const grouped = {};
    courses.forEach(course => {
        const key = `${course.year} @ ${course.institution}`;
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(course);
    });
    
    // Create HTML for each group
    let html = '';
    Object.keys(grouped).sort().forEach(key => {
        const coursesInGroup = grouped[key];
        html += `
            <div class="course-group">
                <h3 class="course-group-header">${key}</h3>
                <div class="courses-grid">
                    ${coursesInGroup.map(course => createCourseCard(course)).join('')}
                </div>
            </div>
        `;
    });
    
    return html;
}

function createCourseCard(course) {
    const statusClass = `course-status-${course.status}`;
    const featuredClass = course.featured ? 'featured-course' : '';
    const tags = course.tags ? course.tags.map(tag => `<span class="course-tag">${tag}</span>`).join('') : '';
    
    // Provide default values for missing fields
    const credits = course.credits || 'TBD';
    const students = course.students || 'TBD';
    const schedule = course.schedule || 'TBD';
    const room = course.room || 'TBD';
    const description = course.description || 'Course details will be available soon.';
    
    return `
        <div class="course-card ${statusClass} ${featuredClass}" onclick="loadCourse('${course.id}')">
            <div class="course-header">
                <h4>${course.title}</h4>
                <span class="course-level">${course.level}</span>
            </div>
            <div class="course-meta">
                <span class="course-semester">${course.semester} ${course.year}</span>
                <span class="course-credits">${credits} credits • ${students} students</span>
            </div>
            <p class="course-description">${description}</p>
            <div class="course-details">
                <span class="course-schedule"><i class="fas fa-clock"></i> ${schedule}</span>
                <span class="course-room"><i class="fas fa-map-marker-alt"></i> ${room}</span>
            </div>
            ${tags ? `<div class="course-tags">${tags}</div>` : ''}
            <div class="course-action">
                <span class="view-course">View Course Details</span>
            </div>
        </div>
    `;
}

// Load Projects from JSON file
async function loadProjects() {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;
    
    // Check if we can load JSON files (CORS check)
    if (window.location.protocol === 'file:') {
        console.warn('Loading from file:// protocol - using embedded projects data');
        loadEmbeddedProjects();
        return;
    }
    
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`Failed to load projects: ${response.status}`);
        
        const data = await response.json();
        projectsContainer.innerHTML = '';
        
        data.projects.forEach(project => {
            const projectElement = createProjectElement(project);
            projectsContainer.appendChild(projectElement);
        });
        
        console.log('✅ Projects loaded from JSON file');
        // showNotification('Projects loaded from file!', 'success');
        
        // Re-initialize intersection observer for new content
        setTimeout(() => reinitIntersectionObserver(), 100);
    } catch (error) {
        console.error('Error loading projects:', error);
        loadEmbeddedProjects();
    }
}

function createProjectElement(project) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    if (project.status === 'active') projectCard.classList.add('active-project');
    
    const statusBadge = project.status === 'active' ? 
        '<span class="project-status active">Active</span>' : 
        '<span class="project-status completed">Completed</span>';
    
    const tags = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    const links = [];
    if (project.github_repo && project.github_repo !== '#') {
        links.push(`<a href="${project.github_repo}" class="project-link" target="_blank"><i class="fab fa-github"></i> Code</a>`);
    }
    if (project.website && project.website !== '#') {
        links.push(`<a href="${project.website}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Website</a>`);
    }
    
    projectCard.innerHTML = `
        <div class="project-header">
            <h4>${project.title}</h4>
            ${statusBadge}
        </div>
        <p class="project-duration">${project.duration}</p>
        <p class="project-description">${project.description}</p>
        
        ${project.funding ? `<p class="project-funding"><strong>Funding:</strong> ${project.funding}</p>` : ''}
        
        ${project.collaborators && project.collaborators.length > 0 ? `
        <div class="project-collaborators">
            <strong>Collaborators:</strong> ${project.collaborators.join(', ')}
        </div>
        ` : ''}
        
        ${project.key_achievements && project.key_achievements.length > 0 ? `
        <div class="project-achievements">
            <strong>Key Achievements:</strong>
            <ul>
                ${project.key_achievements.slice(0, 3).map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
        
        <div class="project-stats">
            ${project.publications ? `<span class="project-stat">${project.publications} Publications</span>` : ''}
        </div>
        
        <div class="project-tags">
            ${tags}
        </div>
        
        ${links.length > 0 ? `<div class="project-links">${links.join('')}</div>` : ''}
    `;
    
    return projectCard;
}

// Load individual course content
async function loadCourse(courseId) {
    let course = null;
    let content = null;
    
    // Check CORS restrictions
    if (window.location.protocol === 'file:') {
        showNotification('Cannot load course details from local files. Please use an HTTP server.', 'warning');
        return;
    }
    
    try {
        // Load course metadata
        const response = await fetch('data/teaching/teaching.json');
        if (!response.ok) {
            throw new Error(`Failed to load teaching data: ${response.status}`);
        }
        
        const teachingData = await response.json();
        course = teachingData.courses.find(c => c.id === courseId);
        
        if (!course) {
            showNotification('Course not found', 'error');
            return;
        }
        
        // Load course content file
        if (course.content && !course.content.startsWith('#')) {
            try {
                const contentResponse = await fetch(course.content);
                if (!contentResponse.ok) {
                    throw new Error(`Course content file not found: ${contentResponse.status}`);
                }
                content = await contentResponse.text();
                console.log(`✅ Loaded course content for ${courseId}`);
            } catch (contentError) {
                console.warn(`Could not load course content file for ${courseId}:`, contentError);
                content = `# ${course.title}\n\n**Course content file not available.**\n\nPlease check that the file \`${course.content}\` exists.`;
                showNotification('Course content file not found', 'warning');
            }
        } else {
            content = `# ${course.title}\n\n**No detailed content available for this course.**`;
        }
        
        // Show the course modal
        showCourseModal(course, content);
        
    } catch (error) {
        console.error('Error loading course:', error);
        showNotification('Failed to load course details', 'error');
    }
}

function showCourseModal(course, content) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'course-modal-overlay';
    modal.onclick = (e) => {
        if (e.target === modal) closeCourseModal();
    };
    
    const statusBadge = course.status === 'current' ? 
        '<span class="course-status-badge current">Current</span>' : 
        course.status === 'upcoming' ? 
        '<span class="course-status-badge upcoming">Upcoming</span>' :
        '<span class="course-status-badge past">Past</span>';
    
    const tags = course.tags ? course.tags.map(tag => `<span class="course-tag">${tag}</span>`).join('') : '';
    
    modal.innerHTML = `
        <div class="course-modal">
            <div class="course-modal-header">
                <div class="course-modal-title">
                    <h2>${course.title}</h2>
                    ${statusBadge}
                </div>
                <button onclick="closeCourseModal()" class="close-modal">&times;</button>
            </div>
            <div class="course-modal-meta">
                <div class="course-modal-info">
                    <span class="course-info-item">
                        <i class="fas fa-graduation-cap"></i> ${course.level}
                    </span>
                    <span class="course-info-item">
                        <i class="fas fa-calendar"></i> ${course.semester} ${course.year}
                    </span>
                    <span class="course-info-item">
                        <i class="fas fa-credit-card"></i> ${course.credits} Credits
                    </span>
                    <span class="course-info-item">
                        <i class="fas fa-users"></i> ${course.students} Students
                    </span>
                </div>
                <div class="course-schedule-info">
                    <span class="course-info-item">
                        <i class="fas fa-clock"></i> ${course.schedule}
                    </span>
                    <span class="course-info-item">
                        <i class="fas fa-map-marker-alt"></i> ${course.room}
                    </span>
                </div>
            </div>
            <div class="course-modal-content">
                ${content.includes('# ') ? convertMarkdownToHTML(content) : `<p>${content}</p>`}
            </div>
            ${tags ? `<div class="course-modal-tags">${tags}</div>` : ''}
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeCourseModal() {
    const modal = document.querySelector('.course-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Add publications management functions
function addNewPublication(year, publicationData) {
    // Function to add new publication to the data
    // This could be extended with an admin interface
    console.log('Adding new publication:', publicationData);
}

function addNewBlogPost(postData) {
    // Function to add new blog post
    // This could be extended with an admin interface
    console.log('Adding new blog post:', postData);
}

// Make loadCourse globally accessible
window.loadCourse = loadCourse;
window.closeCourseModal = closeCourseModal;

// Export functions for potential external use
window.AcademicPortfolio = {
    activateResearchTab,
    showNotification,
    debounce,
    loadPublications,
    loadBlogPosts,
    loadBlogPost,
    loadNews,
    loadTeaching,
    loadProjects,
    loadCourse,
    closeCourseModal,
    addNewPublication,
    addNewBlogPost,
}; 