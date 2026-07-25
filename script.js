// Theme Your Dream — Enhanced Interactions
// Scroll reveals, parallax, animations, and progressive contact form

(function () {
  // ===== 1. SCROLL REVEAL =====
  // Fade in section headings as they come into view
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.section__heading, .page-hero, .content-block');

    const revealOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          revealOnScroll.unobserve(entry.target);
        }
      });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));
  }

  // ===== 2. PARALLAX HERO =====
  // Subtle parallax effect on hero image during scroll
  function initParallax() {
    const hero = document.querySelector('.hero, .page-hero');
    if (!hero || window.innerWidth < 768) return; // Mobile: disabled

    const heroImage = hero.querySelector('img');
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const offset = scrollY * 0.5; // 50% of scroll speed
      heroImage.style.transform = `translateY(${offset}px)`;
    });
  }

  // ===== 3. PULSE CTA BUTTON =====
  // Primary CTA pulses on page load
  function initPulseCTA() {
    setTimeout(() => {
      const ctaButtons = document.querySelectorAll('.section--cta-padded .cta, .section--narrow.section--cta .cta');
      ctaButtons.forEach(btn => {
        btn.classList.add('pulse-once');
      });
    }, 800);
  }

  // ===== 4. ANIMATED WAVES =====
  // Subtle wave animation on SVG wave dividers
  function animateWaves() {
    const waves = document.querySelectorAll('.story-wave');
    waves.forEach((wave, index) => {
      wave.style.animation = `wave-float ${8 + index * 0.5}s ease-in-out infinite`;
    });
  }

  // ===== 5. BOX ZOOM ON SCROLL =====
  // Mood cards zoom in as they scroll into view
  function initBoxZoomScroll() {
    const moodCards = document.querySelectorAll('.mood-card--photo');

    const zoomOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    const zoomOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector('.mood-card__img');
          if (img) {
            img.classList.add('zoom-in-view');
          }
        }
      });
    }, zoomOptions);

    moodCards.forEach(card => zoomOnScroll.observe(card));
  }

  // ===== 6. PROCESS STEP ANIMATION =====
  // Animate process steps with dot progress
  function initProcessAnimation() {
    const steps = document.querySelectorAll('.process__step');

    const stepOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('step-reveal');
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
      });
    }, stepOptions);

    steps.forEach(step => stepObserver.observe(step));
  }

  // ===== 7. CUSTOM CURSOR =====
  // Subtle branded cursor on desktop
  function initCustomCursor() {
    if (window.innerWidth < 768) return; // Mobile: skip

    const style = document.createElement('style');
    style.textContent = `
      body {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="none" stroke="%234A3328" stroke-width="1.5"/></svg>') 12 12, auto;
      }
      a, button, [role="button"] {
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }

  // ===== 8. IMAGE LAZY LOAD FADE =====
  // Fade in images as they load from blur
  function initImageLazyLoadFade() {
    const images = document.querySelectorAll('img[loading="lazy"], .site-photo, .mood-card__img');

    images.forEach(img => {
      // Add loading class for blur effect
      img.classList.add('lazy-load-fade');

      // Fade in when loaded
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
      }
    });
  }

  // ===== 9. SCROLL PROGRESS BAR =====
  // Thin line at top that fills as user scrolls
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-bar';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background-color: #9C6450;
      z-index: 9999;
      width: 0%;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // ===== 10. BACK TO TOP BUTTON =====
  // Smooth scroll to top
  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== 11. PROGRESSIVE CONTACT FORM =====
  // Multi-step contact form with smooth transitions
  function initProgressiveContactForm() {
    const form = document.getElementById('progressive-contact-form');
    if (!form) return;

    const steps = form.querySelectorAll('.form-step');
    const prevBtn = form.querySelector('[data-action="prev"]');
    const nextBtn = form.querySelector('[data-action="next"]');
    let currentStep = 0;

    function showStep(step) {
      steps.forEach((s, index) => {
        if (index === step) {
          s.classList.add('active');
          s.style.animation = 'slideIn 0.3s ease-out';
        } else {
          s.classList.remove('active');
        }
      });

      // Update button visibility
      if (prevBtn) prevBtn.style.display = step === 0 ? 'none' : 'block';
      if (nextBtn) {
        nextBtn.textContent = step === steps.length - 1 ? 'Verstuur' : 'Volgende';
        nextBtn.type = step === steps.length - 1 ? 'submit' : 'button';
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        if (currentStep < steps.length - 1) {
          e.preventDefault();
          currentStep++;
          showStep(currentStep);
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });
    }

    showStep(0);
  }

  // ===== INITIALIZATION =====
  function init() {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      initScrollReveals();
      initParallax();
      initPulseCTA();
      animateWaves();
      initBoxZoomScroll();
      initProcessAnimation();
      initImageLazyLoadFade();
      initScrollProgress();
    }

    initCustomCursor();
    initBackToTop();
    initProgressiveContactForm();
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
