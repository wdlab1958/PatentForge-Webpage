/* PatentForge page interactions */
(function () {
  'use strict';

  // ---------- Smooth scroll + active sidebar item ----------
  const navItems = document.querySelectorAll('.nav-item');
  const sections = Array.from(document.querySelectorAll('main .section'));
  const sidebar = document.getElementById('sidebar');

  navItems.forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navItems.forEach((n) => n.classList.remove('active'));
      a.classList.add('active');
      if (window.innerWidth <= 720 && sidebar) sidebar.classList.remove('open');
    });
  });

  // ---------- Mobile menu toggle ----------
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (window.innerWidth > 720) return;
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ---------- Scroll spy ----------
  const setActiveByScroll = () => {
    const offset = 140;
    const y = window.scrollY + offset;
    let currentId = sections[0]?.id;
    for (const s of sections) {
      if (s.offsetTop <= y) currentId = s.id;
    }
    if (!currentId) return;
    let matched = false;
    navItems.forEach((n) => {
      const t = n.getAttribute('data-target') || (n.getAttribute('href') || '').replace('#', '');
      if (t === currentId && !matched) { n.classList.add('active'); matched = true; }
      else { n.classList.remove('active'); }
    });
  };

  // ---------- To-top button ----------
  const toTop = document.getElementById('toTop');
  const updateToTop = () => {
    if (!toTop) return;
    if (window.scrollY > 600) toTop.classList.add('show');
    else toTop.classList.remove('show');
  };
  if (toTop) {
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---------- Reveal-on-scroll ----------
  const revealEls = document.querySelectorAll(
    '.card, .principle, .pipeline-step, .gate, .agent, .journey-step, .tier, ' +
    '.stat-card, .tl-item, .arch-layer, .status-pill, .quote-banner, .output, ' +
    '.list-card, .compare, .bars, ' +
    '.mode, .legal-col, .flow-step, .country, .market-seg, .ad-table, .banner, ' +
    '.juris-card, .engine, .compet-table, .meta-card, .api-block, ' +
    '.persona'
  );
  revealEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));

  // ---------- Animated counters ----------
  const counters = document.querySelectorAll('.stat-number, .status-pill .num');
  const animate = (el) => {
    const raw = el.textContent.trim();
    const target = parseInt(raw, 10);
    if (isNaN(target) || /[^0-9]/.test(raw.replace(/[+,]/g, ''))) {
      return;
    }
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        cio.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => cio.observe(el));

  // ---------- Animated horizontal bars ----------
  const bars = document.querySelectorAll('.bar-fill');
  const bio = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target.getAttribute('data-w') || '0%';
        entry.target.style.width = '0%';
        requestAnimationFrame(() => { entry.target.style.width = target; });
        bio.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach((b) => bio.observe(b));

  // ---------- Collapsible .section-lead (더보기/접기) ----------
  const setupLeadCollapse = () => {
    const leads = document.querySelectorAll('.section-lead');
    leads.forEach((lead) => {
      // Already processed?
      if (lead.dataset.collapseSetup === '1') return;
      // Force layout to measure
      const overflow = lead.scrollHeight - lead.clientHeight;
      if (overflow <= 2) {
        // Short lead — release the clamp so it shows fully
        lead.style.maxHeight = 'none';
        lead.dataset.collapseSetup = '1';
        return;
      }

      lead.classList.add('is-clamp');

      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'section-lead-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<span class="label">더보기</span><span class="arrow">▼</span>';
      lead.insertAdjacentElement('afterend', toggle);

      toggle.addEventListener('click', () => {
        const expanded = lead.classList.toggle('is-expanded');
        toggle.querySelector('.label').textContent = expanded ? '접기' : '더보기';
        toggle.setAttribute('aria-expanded', String(expanded));
      });

      lead.dataset.collapseSetup = '1';
    });
  };

  // Initial setup after fonts/layout settle, then re-evaluate on resize
  // (line wrapping changes between viewports, so a 3-line lead at 1280px
  // may become 5 lines at 720px and need re-clamping).
  if (document.readyState === 'complete') {
    setupLeadCollapse();
  } else {
    window.addEventListener('load', setupLeadCollapse);
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reset all leads and re-evaluate
      document.querySelectorAll('.section-lead').forEach((lead) => {
        lead.classList.remove('is-clamp', 'is-expanded');
        lead.style.maxHeight = '';
        lead.dataset.collapseSetup = '';
        // Remove existing toggle if any
        const next = lead.nextElementSibling;
        if (next && next.classList.contains('section-lead-toggle')) {
          next.remove();
        }
      });
      setupLeadCollapse();
    }, 200);
  });

  // ---------- Single scroll handler ----------
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      setActiveByScroll();
      updateToTop();
      ticking = false;
    });
    ticking = true;
  }, { passive: true });

  setActiveByScroll();
  updateToTop();
})();
