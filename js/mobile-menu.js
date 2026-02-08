document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    
    // Toggle menu visibility
    mainNav.classList.toggle('active');
    
    // Update ARIA attributes
    this.setAttribute('aria-expanded', !isExpanded);
    
    // Change icon
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768 && 
        !mainNav.contains(event.target) && 
        !mobileMenuToggle.contains(event.target)) {
      mainNav.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      const icon = mobileMenuToggle.querySelector('i');
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      mainNav.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      const icon = mobileMenuToggle.querySelector('i');
      if (icon.classList.contains('fa-times')) {
        icon.classList.replace('fa-times', 'fa-bars');
      }
    }
  });
});