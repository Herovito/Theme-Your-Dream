// Theme Your Dream — Business Configuration
// Centralized values for WhatsApp, email, KvK, and Btw-id
// Update here only; HTML files reference these via script

window.TYDCONFIG = {
  // Contact
  whatsapp: '31612166851',
  whatsappUrl: (msg) => `https://wa.me/31612166851?text=${encodeURIComponent(msg)}`,
  email: 'Dionne@ThemeYourDream.nl',

  // Business
  kvk: '42125264',
  btwId: 'NL005516546B27',

  // Social
  instagram: 'https://instagram.com/ThemeYourDream.nl',
  tiktok: 'https://tiktok.com/@ThemeYourDream.nl',

  // Branding
  businessName: 'Theme Your Dream',
  tagline: 'Eventstyling en verhuur'
};
