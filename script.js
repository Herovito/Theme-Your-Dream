// Theme Your Dream — Enhanced Interactions
// Scroll reveals, animaties, navigatie

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

  // ===== 2. PULSE CTA BUTTON =====
  // Primary CTA pulses on page load
  function initPulseCTA() {
    setTimeout(() => {
      const ctaButtons = document.querySelectorAll('.section--cta-padded .cta, .section--narrow.section--cta .cta');
      ctaButtons.forEach(btn => {
        btn.classList.add('pulse-once');
      });
    }, 800);
  }

  // ===== 3. BOX ZOOM ON SCROLL =====
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

  // ===== 4. CUSTOM CURSOR =====
  // Subtle branded cursor on desktop
  function initCustomCursor() {
    if (window.innerWidth < 768) return; // Mobile: skip

    const style = document.createElement('style');
    style.textContent = `
      body {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="none" stroke="%234A3329" stroke-width="1.5"/></svg>') 12 12, auto;
      }
      a, button, [role="button"] {
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }

  // ===== 5. IMAGE LAZY LOAD FADE =====
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

  // ===== 6. SCROLL PROGRESS BAR =====
  // Thin line at top that fills as user scrolls
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-bar';
    // Kleur en laag komen uit de tokens in style.css, zodat de balk
    // meeverandert wanneer het palet wijzigt.
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background-color: var(--color-accent);
      z-index: var(--z-scroll-progress);
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

  // ===== 7. BACK TO TOP BUTTON =====
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
      // Bij iedere klik opnieuw uitlezen, niet één keer bij het laden:
      // de systeeminstelling kan tussendoor wijzigen.
      const prefersReduced =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  // ===== 8. HEADER OVER DE BEELDHERO =====
  // Op de homepage ligt de balk doorzichtig over de herofoto. Zodra de
  // hero grotendeels voorbij is, vult de balk zich met de paginakleur,
  // zodat de menutekst leesbaar blijft boven gewone inhoud.
  //
  // Dit is een toestandswissel, geen versiering: hij loopt ook wanneer
  // iemand verminderde beweging heeft ingesteld. Alleen de overgang
  // ernaartoe wordt dan door style.css uitgezet.
  function initHeaderScrollState() {
    if (!document.body.classList.contains('hero-overlay')) return;

    const header = document.querySelector('.site-header');
    if (!header) return;

    // 200px: ver genoeg dat een kleine duw aan het scrollwiel de balk
    // niet laat knipperen, ruim binnen de hoogte van de hero.
    const TRIGGER = 200;
    let ticking = false;

    function update() {
      ticking = false;
      header.classList.toggle('site-header--scrolled', window.scrollY > TRIGGER);
    }

    // Via requestAnimationFrame: de klasse wordt hooguit één keer per
    // beeldopbouw gezet in plaats van bij elke scrollgebeurtenis.
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    // Bij terugkeer op de pagina kan de browser de scrollpositie
    // herstellen; dan moet de balk meteen kloppen.
    update();
  }

  // ===== 9. HOOFDMENU: THEMABOXEN-DISCLOSURE + MOBIEL MENU =====
  // De navigatie werkt zonder JavaScript: alle menu-items zijn gewone
  // links. JavaScript voegt alleen het open- en dichtklappen toe.
  function initNavigation() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const nav = header.querySelector('.site-nav');
    const menuToggle = header.querySelector('.site-header__menu-toggle');
    const dropdownBtn = header.querySelector('.nav-link--dropdown');
    const dropdownItem = dropdownBtn && dropdownBtn.closest('.site-nav__item--dropdown');

    function setDropdown(open) {
      if (!dropdownBtn || !dropdownItem) return;
      dropdownBtn.setAttribute('aria-expanded', String(open));
      dropdownItem.classList.toggle('is-open', open);
    }

    function setMenu(open) {
      if (!menuToggle || !nav) return;
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
      nav.classList.toggle('is-open', open);
      // Boven de herofoto is de balk doorzichtig. Een geopend menu moet
      // daar altijd een eigen ondergrond krijgen, anders staan de links
      // op de foto.
      header.classList.toggle('site-header--menu-open', open);
      if (!open) setDropdown(false);
    }

    // Themaboxen open- en dichtklappen. Op desktop opent de lijst ook
    // op hover (CSS); de knop blijft nodig voor touch en toetsenbord.
    if (dropdownBtn) {
      dropdownBtn.addEventListener('click', () => {
        setDropdown(dropdownBtn.getAttribute('aria-expanded') !== 'true');
      });
    }

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
      });
    }

    // Klik buiten de header sluit alles wat open staat.
    document.addEventListener('click', (event) => {
      if (header.contains(event.target)) return;
      setDropdown(false);
      setMenu(false);
    });

    // Escape sluit eerst de themaboxenlijst, daarna het mobiele menu,
    // en zet de focus terug op de knop die het opende.
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (dropdownItem && dropdownItem.classList.contains('is-open')) {
        setDropdown(false);
        dropdownBtn.focus();
      } else if (nav && nav.classList.contains('is-open')) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    // Een gekozen link sluit het menu, zodat de nieuwe pagina niet met
    // een open menubalk begint wanneer de link naar een anker wijst.
    nav && nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });

    // Verbreedt het venster naar desktop, dan mag het mobiele menu geen
    // verborgen toestand achterlaten.
    const desktop = window.matchMedia('(min-width: 900px)');
    const syncViewport = () => { if (desktop.matches) setMenu(false); };
    desktop.addEventListener('change', syncViewport);
  }

  // ===== INITIALIZATION =====
  function init() {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      initScrollReveals();
      initPulseCTA();
      initBoxZoomScroll();
      initImageLazyLoadFade();
      initScrollProgress();
    }

    initCustomCursor();
    initBackToTop();
    initHeaderScrollState();
    initNavigation();
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
