/* ═══════════════════════════════════════
   BYTE — main.js
   Core app logic & interactions
   ═══════════════════════════════════════ */

/* ── SMOOTH SCROLL HELPER ── */
/**
 * Smoothly scrolls to a section by its id.
 * Used by buttons throughout the page.
 * @param {string} id - The element id to scroll to
 */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ── NAV SHRINK ON SCROLL ── */
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
})();

/* ── ACTIVE NAV LINK HIGHLIGHT ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => {
            a.classList.toggle(
              'active',
              a.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
})();

/* ── VENDOR CARD CLICK ── */
(function initVendorAdd() {
  const addCard = document.querySelector('.vc.add');
  if (addCard) {
    addCard.addEventListener('click', () => {
      alert('Vendor onboarding opens Q2 2026! Drop us an email at vendors@eatbyte.co.bw to get on the waitlist.');
    });
  }
})();

/* ── LAUNCH BUTTON ── */
(function initLaunchBtn() {
  const btn = document.querySelector('.btn-launch');
  if (btn) {
    btn.addEventListener('click', () => {
      alert('The Byte web app is coming soon! We are currently onboarding vendors across Gaborone. Drop your email at hello@eatbyte.co.bw to get early access.');
    });
  }
})();
