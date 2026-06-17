/* ============================================================
   AF PROD — Interactions
   Curseur custom · scroll reveals · marquee · compteurs ·
   scroll horizontal · sticky text · form · nav
   ============================================================ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* ---------- Année footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Curseur custom ---------- */
  if (!isTouch && !prefersReduced) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    const hoverTargets = document.querySelectorAll('a, button, [data-magnetic], [data-tilt], input, select, textarea');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    });
  }

  /* ---------- Boutons magnétiques ---------- */
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Tilt + glow sur cartes ---------- */
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rotX = (py - 0.5) * -6;
        const rotY = (px - 0.5) * 6;
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
        card.style.setProperty('--mx', px * 100 + '%');
        card.style.setProperty('--my', py * 100 + '%');
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- Logo 3D interactif (suit la souris) ---------- */
  const logo3d = document.getElementById('logo3d');
  if (logo3d && !prefersReduced) {
    const scene = logo3d.querySelector('.logo3d__scene');
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const move = (e) => {
      const r = logo3d.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tx = py * -22;   // rotateX
      ty = px * 28;    // rotateY
    };
    // sur tout le hero pour une zone de réaction plus large
    const heroSection = document.getElementById('hero');
    (heroSection || logo3d).addEventListener('mousemove', move);
    (heroSection || logo3d).addEventListener('mouseleave', () => { tx = 0; ty = 0; });

    const animate = () => {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      scene.style.transform = `rotateX(${cx}deg) rotateY(${cy}deg)`;
      requestAnimationFrame(animate);
    };
    animate();
  }

  /* ---------- Navigation : scroll state ---------- */
  const nav = document.getElementById('nav');
  const progress = document.querySelector('.scroll-progress');
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    const toggle = (open) => {
      burger.classList.toggle('is-open', open);
      mobileMenu.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
      mobileMenu.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle(!mobileMenu.classList.contains('is-open')));
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
  }

  /* ---------- Scroll reveals ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach((el) => revealObs.observe(el));

  /* ---------- Process steps (barre top) ---------- */
  const stepObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); stepObs.unobserve(e.target); } });
  }, { threshold: 0.4 });
  document.querySelectorAll('.process-step').forEach((s) => stepObs.observe(s));

  /* ---------- Compteurs animés ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const dur = 1600;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (target >= 100 ? '+' : '');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => countObs.observe(c));

  /* ---------- Sticky text reveal (mot par mot) ---------- */
  const statement = document.querySelector('[data-words]');
  if (statement) {
    const accentWords = ['démarquer.', 'cohérente,', 'image'];
    const words = statement.textContent.trim().split(/\s+/);
    statement.innerHTML = words.map((w) => {
      const acc = accentWords.includes(w) ? ' accent' : '';
      return `<span class="word${acc}">${w}</span>`;
    }).join(' ');
    const wordEls = statement.querySelectorAll('.word');

    if (!prefersReduced) {
      const onScrollWords = () => {
        const rect = statement.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.85;
        const end = vh * 0.25;
        const progressRatio = (start - rect.top) / (start - end);
        const litCount = Math.floor(progressRatio * wordEls.length);
        wordEls.forEach((w, i) => w.classList.toggle('is-lit', i < litCount));
      };
      window.addEventListener('scroll', onScrollWords, { passive: true });
      onScrollWords();
    } else {
      wordEls.forEach((w) => w.classList.add('is-lit'));
    }
  }

  /* ---------- Scroll horizontal des réalisations ---------- */
  const workTrack = document.getElementById('workTrack');
  const workSticky = document.querySelector('.work__sticky');
  if (workTrack && workSticky) {
    const workSection = document.querySelector('.work');
    const setHeight = () => {
      const extra = workTrack.scrollWidth - window.innerWidth;
      workSection.style.height = (window.innerHeight + Math.max(extra, 0) + 200) + 'px';
    };
    setHeight();
    window.addEventListener('resize', setHeight);

    const onScrollWork = () => {
      const rect = workSection.getBoundingClientRect();
      const extra = workTrack.scrollWidth - window.innerWidth + 48;
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const scrolled = -rect.top;
        const max = workSection.offsetHeight - window.innerHeight;
        const ratio = Math.min(Math.max(scrolled / max, 0), 1);
        workTrack.style.transform = `translateX(${-ratio * Math.max(extra, 0)}px)`;
      }
    };
    window.addEventListener('scroll', onScrollWork, { passive: true });
    onScrollWork();
  }

  /* ---------- Validation formulaire ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    const success = document.getElementById('formSuccess');
    const showError = (field, msg) => {
      field.classList.add('is-error');
      const err = field.querySelector('[data-error]');
      if (err) err.textContent = msg;
    };
    const clearError = (field) => {
      field.classList.remove('is-error');
      const err = field.querySelector('[data-error]');
      if (err) err.textContent = '';
    };

    const errorBox = document.getElementById('formError');
    const submitBtn = form.querySelector('.contact__submit');
    const submitLabel = submitBtn ? submitBtn.querySelector('span') : null;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (success) success.hidden = true;
      if (errorBox) errorBox.hidden = true;
      let valid = true;

      // Validation des champs visibles (on ignore les champs cachés Web3Forms)
      form.querySelectorAll('.field').forEach((field) => {
        const input = field.querySelector('input, select, textarea');
        if (!input) return;
        clearError(field);
        if (!input.value.trim()) {
          showError(field, 'Ce champ est requis.');
          valid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          showError(field, 'Adresse email invalide.');
          valid = false;
        }
      });
      if (!valid) return;

      // Honeypot : si rempli, c'est un bot → on simule un succès sans rien envoyer
      const honeypot = form.querySelector('.hp-field');
      if (honeypot && honeypot.checked) { if (success) success.hidden = false; form.reset(); return; }

      // Si la clé Web3Forms n'est pas configurée, on évite un envoi qui échouerait
      const key = form.querySelector('[name="access_key"]');
      if (!key || key.value === 'VOTRE_CLE_WEB3FORMS') {
        if (errorBox) { errorBox.textContent = 'Formulaire non configuré : ajoute ta clé Web3Forms.'; errorBox.hidden = false; }
        return;
      }

      const controls = form.querySelectorAll('input, select, textarea, button');
      controls.forEach((el) => (el.disabled = true));
      if (submitLabel) submitLabel.textContent = 'Envoi…';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          if (success) success.hidden = false;
          form.reset();
        } else {
          if (errorBox) errorBox.hidden = false;
        }
      } catch (err) {
        if (errorBox) errorBox.hidden = false;
      } finally {
        controls.forEach((el) => (el.disabled = false));
        if (submitLabel) submitLabel.textContent = 'Envoyer ma demande';
      }
    });

    // Nettoie l'erreur à la saisie
    form.querySelectorAll('input, select, textarea').forEach((input) => {
      input.addEventListener('input', () => clearError(input.closest('.field')));
    });
  }

  /* ---------- Smooth scroll (offset nav) pour ancres ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  });
})();
