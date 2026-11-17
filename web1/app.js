/* Dark GPT: page behaviour
   One rAF loop drives the layered hero, the orb canvas, and the scroll acts.
   No dependencies, no build step. */

(() => {
  'use strict';

  /* ------------------------------------------------------------------ copy */

  const COPY = {
    en: {
      'meta.title': 'Dark GPT: a private reasoning engine',
      'meta.desc': 'A dark landing page template for an AI product. Scroll driven hero, bilingual copy, no build step.',
      'a11y.skip': 'Skip to content',
      'nav.aria': 'Sections',
      'nav.langAria': 'Language',
      'nav.how': 'How it works',
      'nav.caps': 'Capabilities',
      'nav.why': 'Why',
      'cta.request': 'Request access',
      'hero.eyebrow': 'A private reasoning engine',
      'hero.h1a': 'Reasoning that never',
      'hero.h1b': 'leaves the room.',
      'hero.lede': 'Dark GPT answers the questions your team cannot put in someone else’s browser. It runs on your cluster, cites every source it used, and clears its traces when you ask.',
      'hero.secondary': 'See how it works',
      'turn.l1': 'The question you cannot paste into a browser tab',
      'turn.l2': 'is the one worth asking.',
      'turn.l3': 'Dark GPT answers it on your own hardware,',
      'turn.l4': 'shows the documents it read,',
      'turn.l5': 'and forgets when you say so.',
      'caps.h2': 'What you can count on',
      'caps.p1.t': 'Inside the perimeter',
      'caps.p1.b': 'Inference runs on your cluster. No prompt, document fragment, or answer crosses to an outside network.',
      'caps.p2.t': 'Citations you can open',
      'caps.p2.b': 'Every sentence carries its source, so a reviewer can check the reasoning instead of trusting it.',
      'caps.p2.label': 'Sources attached to one answer',
      'caps.p2.s1': 'Master agreement, clause 4.2, revision 12 May 2026',
      'caps.p2.s2': 'Q3 forecast, sheet 2, updated 3 September 2026',
      'caps.p2.s3': 'Incident log 2026-114, page 6',
      'caps.p3.t': 'Context that holds whole files',
      'caps.p3.b': 'A long context window keeps the middle of a document in play, so answers do not drift after the first ten pages.',
      'caps.p4.t': 'Forget on request',
      'caps.p4.b': 'One command clears the conversation, the working cache, and the index for that task.',
      'why.eyebrow': 'Why Dark GPT',
      'why.h2': 'The same question, two different paths',
      'why.caption': 'Where a prompt goes with a hosted assistant and with Dark GPT',
      'why.col1': 'What happens',
      'why.col2': 'Hosted assistant',
      'why.col3': 'Dark GPT',
      'why.r1.label': 'Your prompt',
      'why.r1.host': 'Crosses someone else’s network',
      'why.r1.dark': 'Stays on your cluster',
      'why.r2.label': 'The answer',
      'why.r2.host': 'Arrives without its sources',
      'why.r2.dark': 'Names the document it used',
      'why.r3.label': 'The record',
      'why.r3.host': 'Lives in a vendor account',
      'why.r3.dark': 'Gone when you ask',
      'why.close': 'Nothing gets published without a decision from you, so we call it dark.',
      'cta.h2': 'Bring the hardest question you have',
      'cta.sub': 'We install Dark GPT on your cluster within a week. You test it with the files you would not normally upload.',
      'cta.fine': 'No card needed. A security review can be scheduled.',
      'foot.note': 'A landing page template for AI products. All copy is placeholder.'
    },
    id: {
      'meta.title': 'Dark GPT: mesin penalaran privat',
      'meta.desc': 'Template landing page gelap untuk produk AI. Hero berbasis scroll, dwibahasa, tanpa build.',
      'a11y.skip': 'Lewati ke konten',
      'nav.aria': 'Bagian halaman',
      'nav.langAria': 'Bahasa',
      'nav.how': 'Cara kerja',
      'nav.caps': 'Kapabilitas',
      'nav.why': 'Kenapa',
      'cta.request': 'Minta akses',
      'hero.eyebrow': 'Mesin penalaran privat',
      'hero.h1a': 'Penalaran yang tidak',
      'hero.h1b': 'pernah keluar ruangan.',
      'hero.lede': 'Dark GPT menjawab pertanyaan yang tidak bisa tim Anda tempel di peramban orang lain. Berjalan di kluster Anda, mengutip setiap sumber yang dipakai, dan menghapus jejaknya saat Anda meminta.',
      'hero.secondary': 'Lihat cara kerjanya',
      'turn.l1': 'Pertanyaan yang tidak bisa Anda tempel di tab peramban',
      'turn.l2': 'justru pertanyaan yang layak diajukan.',
      'turn.l3': 'Dark GPT menjawabnya di perangkat Anda sendiri,',
      'turn.l4': 'memperlihatkan dokumen yang dibaca,',
      'turn.l5': 'dan lupa saat Anda meminta.',
      'caps.h2': 'Yang bisa Anda andalkan',
      'caps.p1.t': 'Di dalam perimeter',
      'caps.p1.b': 'Inferensi berjalan di kluster Anda. Tidak ada prompt, potongan dokumen, atau jawaban yang menyeberang ke jaringan luar.',
      'caps.p2.t': 'Sitasi yang bisa dibuka',
      'caps.p2.b': 'Setiap kalimat membawa sumbernya, sehingga peninjau bisa memeriksa alasan di baliknya alih-alih mempercayainya.',
      'caps.p2.label': 'Sumber pada satu jawaban',
      'caps.p2.s1': 'Perjanjian induk, pasal 4.2, revisi 12 Mei 2026',
      'caps.p2.s2': 'Prakiraan Q3, lembar 2, diperbarui 3 September 2026',
      'caps.p2.s3': 'Log insiden 2026-114, halaman 6',
      'caps.p3.t': 'Konteks yang memuat berkas utuh',
      'caps.p3.b': 'Jendela konteks panjang menjaga bagian tengah dokumen tetap terbaca, sehingga jawaban tidak melenceng setelah sepuluh halaman pertama.',
      'caps.p4.t': 'Lupa saat diminta',
      'caps.p4.b': 'Satu perintah menghapus percakapan, cache kerja, dan indeks untuk tugas itu.',
      'why.eyebrow': 'Kenapa Dark GPT',
      'why.h2': 'Pertanyaan yang sama, dua jalur berbeda',
      'why.caption': 'Ke mana prompt pergi pada asisten host dan pada Dark GPT',
      'why.col1': 'Yang terjadi',
      'why.col2': 'Asisten host',
      'why.col3': 'Dark GPT',
      'why.r1.label': 'Prompt Anda',
      'why.r1.host': 'Menyeberang jaringan pihak lain',
      'why.r1.dark': 'Tetap di kluster Anda',
      'why.r2.label': 'Jawabannya',
      'why.r2.host': 'Datang tanpa sumbernya',
      'why.r2.dark': 'Menyebut dokumen yang dipakai',
      'why.r3.label': 'Rekamannya',
      'why.r3.host': 'Tersimpan di akun vendor',
      'why.r3.dark': 'Hilang saat Anda meminta',
      'why.close': 'Tidak ada yang terbit tanpa keputusan Anda, jadi kami menyebutnya gelap.',
      'cta.h2': 'Bawa pertanyaan tersulit Anda',
      'cta.sub': 'Kami memasang Dark GPT di kluster Anda dalam satu minggu. Anda mengujinya dengan berkas yang biasanya tidak berani Anda unggah.',
      'cta.fine': 'Tanpa kartu kredit. Audit keamanan bisa dijadwalkan.',
      'foot.note': 'Template landing page untuk produk AI. Semua teks di sini contoh.'
    }
  };

  const root = document.documentElement;
  const reduceQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fineQ = window.matchMedia('(hover: hover) and (pointer: fine)');
  const wideQ = window.matchMedia('(min-width: 861px)');

  const clamp = (v, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const px = v => v.toFixed(2) + 'px';

  /* -------------------------------------------------------------- language */

  const STORE = 'darkgpt.lang';
  const langButtons = [...document.querySelectorAll('[data-lang-btn]')];

  function applyLang(lang) {
    const dict = COPY[lang] || COPY.en;
    root.lang = lang;
    root.dataset.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const text = dict[el.dataset.i18n];
      if (text != null) el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const label = dict[el.dataset.i18nAria];
      if (label != null) el.setAttribute('aria-label', label);
    });

    if (dict['meta.title']) document.title = dict['meta.title'];
    const desc = document.querySelector('meta[name="description"]');
    if (desc && dict['meta.desc']) desc.setAttribute('content', dict['meta.desc']);

    langButtons.forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.langBtn === lang));
    });
    try { localStorage.setItem(STORE, lang); } catch (err) { /* storage blocked */ }
  }

  function preferredLang() {
    try {
      const saved = localStorage.getItem(STORE);
      if (saved && COPY[saved]) return saved;
    } catch (err) { /* storage blocked */ }
    return /^id\b/i.test(navigator.language || '') ? 'id' : 'en';
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.langBtn));
  });
  applyLang(preferredLang());

  /* ---------------------------------------------------------------- layout */

  const hero = document.querySelector('[data-hero]');
  const turn = document.querySelector('[data-turn]');
  const caps = document.querySelector('[data-caps]');
  const why = document.querySelector('[data-why]');
  const cta = document.querySelector('[data-cta]');
  const nav = document.querySelector('[data-nav]');
  const track = document.querySelector('[data-track]');
  const ctaBtn = document.querySelector('[data-cta-btn]');
  const dots = [...document.querySelectorAll('[data-dots] i')];
  const lines = [...document.querySelectorAll('.tl')];
  const panels = [...document.querySelectorAll('.panel')];

  const box = { hero: null, turn: null, caps: null };
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };
  const visible = new Set();
  let whyRevealed = false;

  let pinOK = wideQ.matches && !reduceQ.matches;
  let scrollY = window.scrollY;
  let running = false;

  function measure() {
    const vh = window.innerHeight;
    const read = el => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { top: rect.top + window.scrollY, height: rect.height, vh };
    };
    box.hero = read(hero);
    box.turn = read(turn);
    box.caps = read(caps);
  }

  function progressOf(el, metrics) {
    if (!el || !metrics) return 0;
    const span = Math.max(1, metrics.height - metrics.vh);
    return clamp((scrollY - metrics.top) / span);
  }

  /* ------------------------------------------------------------------ orb */

  function createOrb() {
    const canvas = document.querySelector('[data-orb]');
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const COUNT = 560;
    const GOLDEN = Math.PI * (3 - Math.sqrt(5));
    const nodes = [];
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = GOLDEN * i;
      nodes.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        tw: (i % 17) / 17 * Math.PI * 2
      });
    }

    const arcs = [0.15, 0.72, 1.35].map((tilt, index) => {
      const pts = [];
      const steps = 72;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const scale = 0.72 + index * 0.14;
        pts.push({
          x: Math.cos(t) * scale,
          y: Math.sin(t) * Math.cos(tilt) * scale,
          z: Math.sin(t) * Math.sin(tilt) * scale
        });
      }
      return pts;
    });

    let w = 1, h = 1, size = 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      size = Math.min(w, h);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rotate(point, cosY, sinY, cosX, sinX) {
      const x1 = point.x * cosY - point.z * sinY;
      const z1 = point.x * sinY + point.z * cosY;
      const y2 = point.y * cosX - z1 * sinX;
      const z2 = point.y * sinX + z1 * cosX;
      return { x: x1, y: y2, z: z2 };
    }

    function draw(time, animate) {
      const cx = w / 2;
      const cy = h / 2;
      const R = size * 0.34;

      ctx.clearRect(0, 0, w, h);

      const scrollTurn = animate ? clamp(scrollY / Math.max(1, window.innerHeight)) * 0.55 : 0;
      const ry = (animate ? time * 0.00016 : 0.7) + pointer.x * 0.6 + scrollTurn;
      const rx = (animate ? Math.sin(time * 0.00013) * 0.1 : 0.12) - pointer.y * 0.42;
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const mx = pointer.active ? pointer.x * w * 0.34 : 0;
      const my = pointer.active ? pointer.y * h * 0.34 : 0;

      ctx.globalCompositeOperation = 'lighter';

      const core = ctx.createRadialGradient(cx - R * 0.18, cy - R * 0.24, R * 0.04, cx, cy, R * 1.2);
      core.addColorStop(0, 'rgba(255,228,186,.40)');
      core.addColorStop(0.34, 'rgba(233,161,60,.15)');
      core.addColorStop(1, 'rgba(233,161,60,0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(244,239,231,.14)';
      arcs.forEach((pts, index) => {
        ctx.globalAlpha = 0.5 + index * 0.14;
        ctx.beginPath();
        pts.forEach((point, i) => {
          const p = rotate(point, cosY, sinY, cosX, sinX);
          const persp = 2.6 / (2.6 + p.z);
          const sx = cx + p.x * R * persp;
          const sy = cy + p.y * R * persp;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        });
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(233,161,60,.30)';
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2);
      ctx.stroke();

      nodes.forEach(node => {
        const p = rotate(node, cosY, sinY, cosX, sinX);
        const persp = 2.6 / (2.6 + p.z);
        let sx = cx + p.x * R * persp;
        let sy = cy + p.y * R * persp;

        let pull = 0;
        if (pointer.active) {
          const dx = sx - cx - mx;
          const dy = sy - cy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          pull = Math.max(0, 1 - dist / (R * 1.05));
          sx += (dx / (dist + 0.001)) * pull * 22;
          sy += (dy / (dist + 0.001)) * pull * 22;
        }

        const near = (1 - p.z) / 2;
        const twinkle = animate ? 0.78 + 0.22 * Math.sin(time * 0.0013 + node.tw) : 1;
        const alpha = clamp((0.16 + near * 0.74 + pull * 0.5) * twinkle, 0, 0.95);
        const radius = Math.max(0.6, (0.75 + near * 1.15) * (size / 620) + pull * 1.4);

        ctx.fillStyle = 'rgba(255,232,196,' + alpha.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
    }

    resize();
    if (typeof ResizeObserver === 'function') {
      const observer = new ResizeObserver(() => {
        resize();
        if (reduceQ.matches) draw(0, false);
        requestFrame();
      });
      observer.observe(canvas);
    }

    return { draw, resize };
  }

  const orb = createOrb();

  /* ----------------------------------------------------------- frame loop */

  function frame(time) {
    running = false;
    scrollY = window.scrollY;

    if (nav) nav.classList.toggle('is-stuck', scrollY > 8);

    const settled = Math.abs(pointer.x - pointer.tx) < 0.002 && Math.abs(pointer.y - pointer.ty) < 0.002;
    pointer.x = lerp(pointer.x, pointer.tx, 0.09);
    pointer.y = lerp(pointer.y, pointer.ty, 0.09);

    /* Act 1: four planes at four different rates. */
    if (hero && box.hero && !reduceQ.matches) {
      const p = clamp(scrollY / Math.max(1, box.hero.vh));
      hero.style.setProperty('--bg-x', px(pointer.x * 12));
      hero.style.setProperty('--bg-y', px(p * 46 + pointer.y * 8));
      hero.style.setProperty('--sub-x', px(pointer.x * 26));
      hero.style.setProperty('--sub-y', px(p * -74 - pointer.y * 14));
      hero.style.setProperty('--sub-s', (1 - p * 0.08).toFixed(3));
      hero.style.setProperty('--fg-x', px(pointer.x * -42));
      hero.style.setProperty('--fg-y', px(p * 132 - pointer.y * 22));
      hero.style.setProperty('--content-y', px(p * -26));
      hero.style.setProperty('--content-o', (1 - clamp((p - 0.45) / 0.45)).toFixed(3));
    }

    if (orb && visible.has(hero)) orb.draw(time, !reduceQ.matches);

    /* Act 2: pinned kinetic copy. */
    if (turn && pinOK) {
      const p = progressOf(turn, box.turn);
      turn.style.setProperty('--p', p.toFixed(4));
      const stride = 1 / (lines.length + 0.6);
      lines.forEach((el, i) => {
        const start = i * stride;
        const lp = easeOut(clamp((p - start) / (stride * 1.15)));
        el.style.setProperty('--lp', lp.toFixed(3));
      });
    } else if (turn) {
      turn.style.removeProperty('--p');
      lines.forEach(el => el.style.removeProperty('--lp'));
    }

    /* Act 3: lateral rail paced by the wheel. */
    if (caps && track && pinOK) {
      const p = progressOf(caps, box.caps);
      const padRight = parseFloat(getComputedStyle(track).paddingRight) || 0;
      const distance = Math.max(0, track.scrollWidth - window.innerWidth + padRight);
      track.style.setProperty('--x', px(-p * distance));

      const active = Math.round(p * (panels.length - 1));
      panels.forEach((panel, i) => panel.classList.toggle('is-active', i === active));
      dots.forEach((dot, i) => dot.classList.toggle('is-on', i === active));
    } else if (track) {
      track.style.removeProperty('--x');
      panels.forEach(panel => panel.classList.remove('is-active'));
    }

    revealWhy();
    if (!pinOK) revealLines();

    const heroLive = hero && visible.has(hero);
    const stillMoving = !settled && fineQ.matches && !reduceQ.matches;
    if (heroLive && !reduceQ.matches) requestFrame();
    else if (stillMoving) requestFrame();
  }

  function requestFrame() {
    if (running) return;
    running = true;
    requestAnimationFrame(frame);
  }

  /* ---------------------------------------------------------- interaction */

  if (hero && fineQ.matches && !reduceQ.matches) {
    window.addEventListener('pointermove', event => {
      pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
      pointer.active = true;
      requestFrame();
    }, { passive: true });
  }

  if (cta && !reduceQ.matches) {
    const inner = cta.querySelector('.cta__btn');
    cta.addEventListener('pointermove', event => {
      const rect = cta.getBoundingClientRect();
      cta.style.setProperty('--mx', (((event.clientX - rect.left) / rect.width) * 100).toFixed(2) + '%');
      cta.style.setProperty('--my', (((event.clientY - rect.top) / rect.height) * 100).toFixed(2) + '%');
      if (inner && fineQ.matches) {
        const button = inner.getBoundingClientRect();
        const dx = clamp((event.clientX - (button.left + button.width / 2)) / 7, -10, 10);
        const dy = clamp((event.clientY - (button.top + button.height / 2)) / 7, -8, 8);
        inner.style.setProperty('--bx', px(dx));
        inner.style.setProperty('--by', px(dy));
      }
    }, { passive: true });

    cta.addEventListener('pointerleave', () => {
      cta.style.removeProperty('--mx');
      cta.style.removeProperty('--my');
      if (inner) {
        inner.style.removeProperty('--bx');
        inner.style.removeProperty('--by');
      }
    });
  }

  window.addEventListener('scroll', requestFrame, { passive: true });

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    measure();
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      measure();
      requestFrame();
    }, 140);
    requestFrame();
  });

  function syncMode() {
    pinOK = wideQ.matches && !reduceQ.matches;
    if (!pinOK && track) {
      track.style.removeProperty('--x');
      panels.forEach(panel => panel.classList.remove('is-active'));
      turn && turn.style.removeProperty('--p');
      lines.forEach(el => el.style.removeProperty('--lp'));
    }
    if (reduceQ.matches && orb) orb.draw(0, false);
    measure();
    requestFrame();
  }

  [reduceQ, wideQ].forEach(query => {
    if (typeof query.addEventListener === 'function') query.addEventListener('change', syncMode);
    else if (typeof query.addListener === 'function') query.addListener(syncMode);
  });

  /* ----------------------------------------------------------- reveal pass */

  /* Both reveals are driven by position inside the frame loop. The comparison
     wipe hides itself while clipped, so an IntersectionObserver on it would
     never fire, and a line list read positionally also covers a visitor who
     lands in the middle of the page. */
  function revealWhy() {
    if (whyRevealed || !why) return;
    if (why.getBoundingClientRect().top > window.innerHeight * 0.78) return;
    whyRevealed = true;
    const table = why.querySelector('.compare-scroll');
    if (table) table.classList.add('is-in');
    why.querySelectorAll('[data-compare] tbody tr').forEach(row => row.classList.add('is-in'));
  }

  function revealLines() {
    const limit = scrollY + window.innerHeight * 0.85;
    lines.forEach(el => {
      if (el.classList.contains('is-in')) return;
      if (el.getBoundingClientRect().top + scrollY < limit) el.classList.add('is-in');
    });
  }

  lines.forEach((el, i) => { el.style.transitionDelay = (i * 70) + 'ms'; });

  /* ------------------------------------------- visibility gated rendering */

  if (typeof IntersectionObserver === 'function') {
    const watcher = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      requestFrame();
    }, { threshold: 0.02 });
    [hero, turn, caps, cta].forEach(el => { if (el) watcher.observe(el); });
  } else {
    [hero, turn, caps, cta].forEach(el => { if (el) visible.add(el); });
  }

  /* ----------------------------------------------------------------- boot */

  measure();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { measure(); requestFrame(); });
  }
  window.addEventListener('load', () => { measure(); requestFrame(); }, { once: true });
  requestFrame();
})();
