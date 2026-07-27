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
        img.addEventListener('animationend', () => {
          img.classList.remove('lazy-load-fade');
        });
      }
    });
  }

  // ===== 7. BACK TO TOP BUTTON =====
  // Smooth scroll to top
  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    let ticking = false;
    function update() {
      ticking = false;
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

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

  // ===== 8b. DIEPTE IN DE HEROFOTO =====
  // De foto blijft bij het scrollen een klein stukje achter op de
  // tekst ernaast. Dat maakt zichtbaar dat het beeld achter de
  // tekstkolom ligt in plaats van ernaast geplakt.
  //
  // Bewust klein gehouden: hooguit 24px over de hele hero, oftewel een
  // paar pixels per scrollslag. Groter zou de rust breken die de rest
  // van de pagina opbouwt.
  //
  // Alleen vanaf 64rem. Op smallere schermen staat de foto boven de
  // tekst in plaats van ernaast, is er geen dieptelaag om te tonen, en
  // kost de beweging alleen maar batterij.
  function initHeroParallax() {
    const image = document.querySelector('.hero-split__img');
    if (!image) return;

    // Individuele translate-eigenschap, geen transform: de foto heeft
    // al een transform-animatie bij het laden en die twee zouden
    // elkaar overschrijven. Kent de browser translate niet, dan doet
    // deze regel niets en staat de foto stil — geen foutmelding.
    const MAX_SHIFT = 24;
    const FACTOR = 0.04;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 64rem)');

    let ticking = false;
    let running = false;

    function update() {
      ticking = false;
      const shift = Math.min(window.scrollY * FACTOR, MAX_SHIFT);
      image.style.translate = '0 ' + shift.toFixed(2) + 'px';
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    // Eén bron van waarheid voor beide media queries, zodat er nooit
    // twee scroll-listeners tegelijk kunnen blijven hangen.
    function sync() {
      const shouldRun = wide.matches && !reduced.matches;
      if (shouldRun === running) return;
      running = shouldRun;

      if (running) {
        window.addEventListener('scroll', onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener('scroll', onScroll);
        image.style.translate = '';
      }
    }

    reduced.addEventListener('change', sync);
    wide.addEventListener('change', sync);
    sync();
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
      initImageLazyLoadFade();
    }

    initBackToTop();
    initHeaderScrollState();
    // Leest zelf uit of beweging gewenst is, en luistert daarna op
    // wijzigingen. Daarom hier en niet in het blok hierboven.
    initHeroParallax();
    initNavigation();
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
