/* ═══════════════════════════════════════
   BYTE — animations.js
   All scroll-triggered & dynamic animations
   ═══════════════════════════════════════ */

/* ── FLOATING PARTICLES (hero) ── */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const COUNT = 18;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 5 + 3;
    const dur   = (Math.random() * 6 + 6).toFixed(1);
    const delay = (Math.random() * 8).toFixed(1);
    p.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `bottom:${Math.random() * 40}%`,
      `--dur:${dur}s`,
      `--delay:${delay}s`,
    ].join(';');
    container.appendChild(p);
  }
})();

/* ── SCROLL REVEAL (cards, headings, etc.) ── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings in the same parent grid
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
          );
          const idx = siblings.indexOf(entry.target);
          const delay = idx >= 0 ? idx * 80 : 0;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ── SCORE BAR ANIMATE ON SCROLL ── */
(function initScoreBars() {
  const scoreBox = document.querySelector('.score-box');
  if (!scoreBox) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scoreBox.querySelectorAll('.bar-fill').forEach((bar) => {
            const target = bar.getAttribute('data-w');
            if (!target) return;
            // Small delay so the user sees the animation
            setTimeout(() => {
              bar.style.width = target + '%';
            }, 250);
          });
          observer.unobserve(scoreBox);
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(scoreBox);
})();

/* ── COUNTER ANIMATION (hero stats) ── */
(function initCounters() {
  const stats = document.querySelectorAll('.stat-n');
  if (!stats.length) return;

  /**
   * Animates a number from 0 to its target value.
   * Supports suffixes like '+' or '%'.
   * @param {HTMLElement} el
   */
  function animateCounter(el) {
    const raw    = el.textContent.trim();           // e.g. "114+" or "25%"
    const suffix = raw.replace(/[\d.]/g, '');       // e.g. "+"
    const target = parseFloat(raw);
    if (isNaN(target)) return;

    const duration = 1400; // ms
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-n').forEach(animateCounter);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) observer.observe(statsContainer);
})();

/* ── STEP CARD STAGGER ON SCROLL ── */
(function initStepStagger() {
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, i) => {
    step.style.transitionDelay = (i * 0.08) + 's';
  });
})();

/* ── FEATURE CARD STAGGER ── */
(function initFeatStagger() {
  const feats = document.querySelectorAll('.feat');
  feats.forEach((feat, i) => {
    feat.style.transitionDelay = (i * 0.08) + 's';
  });
})();

/* ── INFO CARD STAGGER ── */
(function initInfoStagger() {
  const cards = document.querySelectorAll('.info-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = (i * 0.1) + 's';
  });
})();

/* ── VENDOR CARD STAGGER ── */
(function initVendorStagger() {
  const cards = document.querySelectorAll('.vc');
  cards.forEach((card, i) => {
    card.style.transitionDelay = (i * 0.07) + 's';
  });
})();
