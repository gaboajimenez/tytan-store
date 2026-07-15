/* ============================================
   TYTAN — Landing Page JavaScript
   Handles: Navbar scroll, Mobile menu, FAQ accordion,
   Scroll animations, Smooth scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ============================================
  // MOBILE HAMBURGER MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // FAQ ACCORDION
  // ============================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
        }
      });

      // Toggle current item
      item.classList.toggle('open', !isOpen);
    });
  });

  // ============================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ============================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation for grid items
          const delay = entry.target.closest('.features-grid, .testimonials-grid')
            ? index * 100
            : 0;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements if IntersectionObserver is not supported
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        
        const navHeight = navbar.offsetHeight;
        const announcementBar = document.querySelector('.announcement-bar');
        const extraOffset = announcementBar ? announcementBar.offsetHeight : 0;

        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - extraOffset - 10;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // HERO STATS COUNTER ANIMATION
  // ============================================
  const statNumbers = document.querySelectorAll('.hero-stat-number');
  let statsAnimated = false;

  const animateStats = () => {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(stat => {
      stat.style.animation = 'countUp 0.6s var(--ease-out) forwards';
    });
  };

  // Trigger stats animation when hero is visible
  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateStats, 800);
          heroObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const heroSection = document.getElementById('hero');
    if (heroSection) heroObserver.observe(heroSection);
  } else {
    animateStats();
  }

  // ============================================
  // CTA BUTTON CLICK TRACKING (placeholder)
  // ============================================
  const ctaButtons = document.querySelectorAll('.cta-btn');
  
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Track conversion event (Meta Pixel integration point)
      if (typeof fbq !== 'undefined') {
        fbq('track', 'AddToCart', {
          content_name: 'TYTAN Pro Rotary Shaver',
          content_ids: ['TYTAN-PRO-001'],
          content_type: 'product',
          value: 49.99,
          currency: 'USD'
        });
      }
    });
  });

  // Buy Now button specific tracking
  const buyNowBtn = document.getElementById('buy-now-btn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function() {
      if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
          content_name: 'TYTAN Pro Rotary Shaver',
          content_ids: ['TYTAN-PRO-001'],
          content_type: 'product',
          value: 49.99,
          currency: 'USD'
        });
      }
    });
  }

});
