/* Basic consent: no Google code or requests until explicit permission. */
(() => {
  'use strict';
  const measurementId = document.currentScript?.dataset.gaId || '';
  const configured = /^G-[A-Z0-9]+$/.test(measurementId);
  const key = 'tyd-cookie-choice-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  let loaded = false;
  let returnFocus;
  function readChoice() {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && value.version === 1 && typeof value.analytics === 'boolean' &&
        value.measurementId === measurementId && Number.isFinite(value.savedAt) &&
        value.savedAt <= Date.now() && Date.now() - value.savedAt < lifetime ? value : null;
    } catch { return null; }
  }
  function startAnalytics() {
    if (!configured || loaded) return;
    loaded = true;
    window['ga-disable-' + measurementId] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: lifetime / 1000 });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.append(script);
  }
  function removeAnalyticsCookies() {
    const domains = [''];
    const parts = location.hostname.split('.');
    for (let i = 0; i < parts.length - 1; i++) domains.push(parts.slice(i).join('.'), '.' + parts.slice(i).join('.'));
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of domains) document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' + (domain ? '; Domain=' + domain : '');
    }
  }
  const banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-label', 'Cookiekeuze');
  banner.innerHTML = `<div><h2>Even over cookies</h2><p>Kijk gerust rond en doe ideeën op. Met jouw toestemming gebruikt Dionne Google Analytics om te zien welke pagina’s worden bezocht en de website te verbeteren. Liever geen analytische cookies? Kies ‘Weigeren’; je kunt de website gewoon gebruiken. Je keuze wijzigen of intrekken kan altijd via Cookie-instellingen onderaan de pagina.</p><p class="cookie-pending" ${configured ? 'hidden' : ''}>Op dit moment staat Google Analytics nog uit. Zodra dat verandert, vragen we je opnieuw wat jij prettig vindt.</p><a href="privacyverklaring.html#artikel-8">Lees ons cookiebeleid</a></div><div class="cookie-actions"><button type="button" data-choice="accept">Accepteren</button><button type="button" data-choice="reject">Weigeren</button><button type="button" data-choice="settings">Instellingen</button></div>`;
  const dialog = document.createElement('dialog');
  dialog.className = 'cookie-dialog';
  dialog.setAttribute('aria-labelledby', 'cookie-dialog-title');
  dialog.innerHTML = `<h2 id="cookie-dialog-title">Cookie-instellingen</h2><p>Jij kiest wat bij je past. We onthouden je keuze maximaal 180 dagen in deze browser via lokale opslag op je apparaat. Je kunt je toestemming hier altijd wijzigen of intrekken.</p><p><strong>Noodzakelijk</strong><br>Hiermee onthouden we je privacykeuze, zodat je die niet op iedere pagina opnieuw hoeft te maken. Altijd actief.</p><label class="cookie-option"><input type="checkbox" id="cookie-analytics"> <span><strong>Bezoekersstatistieken</strong><br>Met Google Analytics ziet Dionne hoeveel bezoekers langskomen en welke pagina’s zij bekijken. Zo kan ze de website verbeteren. Alleen met jouw toestemming.</span></label><p class="cookie-pending" ${configured ? 'hidden' : ''}>Google Analytics staat nu nog uit. Ook als je toestemming geeft, worden er op dit moment geen statistieken naar Google gestuurd.</p><div class="cookie-actions"><button type="button" data-choice="save">Keuze opslaan</button><button type="button" data-choice="reject">Alles weigeren</button><button type="button" data-choice="close">Sluiten</button></div>`;
  const checkbox = dialog.querySelector('input');
  document.body.append(banner, dialog);
  function openSettings() {
    returnFocus = document.activeElement;
    checkbox.checked = readChoice()?.analytics === true;
    dialog.showModal();
  }
  dialog.addEventListener('close', () => { if (returnFocus?.isConnected) returnFocus.focus(); });
  function save(analytics) {
    try { localStorage.setItem(key, JSON.stringify({ version: 1, analytics, measurementId, savedAt: Date.now() })); } catch { /* Choice still applies to this page when storage is unavailable. */ }
    banner.hidden = true;
    if (dialog.open) dialog.close();
    if (analytics) startAnalytics();
    else {
      window['ga-disable-' + measurementId] = true;
      removeAnalyticsCookies();
      // Discard the already-loaded library without sending a denied-consent ping.
      if (loaded) location.reload();
    }
  }
  for (const surface of [banner, dialog]) surface.addEventListener('click', event => {
    const action = event.target.closest('button')?.dataset.choice;
    if (action === 'accept') save(true);
    if (action === 'reject') save(false);
    if (action === 'settings') openSettings();
    if (action === 'save') save(checkbox.checked);
    if (action === 'close') dialog.close();
  });
  const settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'cookie-settings-link';
  settings.textContent = 'Cookie-instellingen';
  settings.addEventListener('click', openSettings);
  (document.querySelector('.site-footer__legal-links') || document.body).append(settings);
  const choice = readChoice();
  banner.hidden = Boolean(choice);
  if (choice?.analytics) startAnalytics();
  else removeAnalyticsCookies();
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    const current = readChoice();
    if (!current?.analytics && loaded) {
      window['ga-disable-' + measurementId] = true;
      removeAnalyticsCookies();
      location.reload();
      return;
    }
    banner.hidden = Boolean(current);
    if (current?.analytics) startAnalytics();
  });
})();
