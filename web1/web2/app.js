/* Tapak Aksara: page behaviour
   One page-wide value, the weight axis, with two drivers: the slider in the
   title page and the scroll of the ink chapter. Everything else follows it. */

(() => {
  'use strict';

  /* ------------------------------------------------------------------ copy */

  const COPY = {
    en: {
      'meta.title': 'Rimbun: a display grotesque from Tapak Aksara',
      'meta.desc': 'A specimen landing page template for a type foundry. The scroll is the weight knob.',
      'a11y.skip': 'Skip to content',
      'lang.aria': 'Language',
      'hero.spec': 'Specimen sheet',
      'hero.lede': 'Rimbun is a display grotesque in nine weights, drawn for long headlines on small screens.',
      'axis.label': 'Weight',
      'axis.note': 'One axis holds the whole page.',
      'bukti.h2': 'Type is read at three distances',
      'bukti.p': 'Rimbun began as a poster face and ended up doing most of its work at 17 pixels. The counters stay open below 24 pixels, the terminals are cut flat so small sizes do not smear, and the narrow proportions let one headline hold two more words per line than a normal width grotesque.',
      'bukti.cap': 'The same sentence, three sizes apart, in the weight you set.',
      'rentang.h2': 'The weight range',
      'weight.1': 'Hairline',
      'weight.2': 'Regular',
      'weight.3': 'Medium',
      'weight.4': 'Bold',
      'weight.5': 'Black',
      'rentang.cap': 'Nine weights ship in the family. Five of them have names.',
      'cetak.h2': 'Set your own words',
      'cetak.sub': 'Type anything. The three sizes update as you write, and the weight is whatever the axis is holding.',
      'cetak.label': 'Your words',
      'kolo.h2': 'Colophon',
      'kolo.licenceTitle': 'Licence covers',
      'kolo.l1': 'Desktop and print use, up to five seats',
      'kolo.l2': 'Web and app embedding, one product',
      'kolo.l3': 'Broadcast, film titling and packaging',
      'kolo.indexTitle': 'On this page',
      'nav.top': 'Title',
      'nav.bukti': 'Proof',
      'nav.rentang': 'Range',
      'nav.cetak': 'Set your words',
      'kolo.langTitle': 'Language',
      'kolo.askLead': 'Ready to set something in it?',
      'cta.ask': 'Request a licence',
      'kolo.note': 'A specimen landing page template. The face name, the licence terms and every line of copy here are placeholders, set in a Google variable font.'
    },
    id: {
      'meta.title': 'Rimbun: grotesque display dari Tapak Aksara',
      'meta.desc': 'Template landing page spesimen untuk foundry huruf. Scroll-nya adalah kenop berat.',
      'a11y.skip': 'Lewati ke konten',
      'lang.aria': 'Bahasa',
      'hero.spec': 'Lembar spesimen',
      'hero.lede': 'Rimbun adalah grotesque display dengan sembilan berat, digambar untuk headline panjang di layar kecil.',
      'axis.label': 'Berat',
      'axis.note': 'Satu sumbu memegang seluruh halaman.',
      'bukti.h2': 'Huruf dibaca dari tiga jarak',
      'bukti.p': 'Rimbun mulai sebagai huruf poster dan akhirnya paling sering dipakai di 17 piksel. Rongganya tetap terbuka di bawah 24 piksel, ujungnya dipotong datar supaya ukuran kecil tidak meleber, dan proporsinya yang sempit membuat satu baris headline menampung dua kata lebih banyak daripada grotesque berlebar normal.',
      'bukti.cap': 'Kalimat yang sama, tiga ukuran berbeda, pada berat yang Anda pasang.',
      'rentang.h2': 'Rentang berat',
      'weight.1': 'Tipis',
      'weight.2': 'Regular',
      'weight.3': 'Sedang',
      'weight.4': 'Tebal',
      'weight.5': 'Sangat tebal',
      'rentang.cap': 'Sembilan berat ada di keluarga ini. Lima di antaranya punya nama.',
      'cetak.h2': 'Cetak kata Anda',
      'cetak.sub': 'Ketik apa saja. Tiga ukuran ikut berubah, dan beratnya sesuai sumbu yang sedang dipegang.',
      'cetak.label': 'Kata Anda',
      'kolo.h2': 'Kolofon',
      'kolo.licenceTitle': 'Cakupan lisensi',
      'kolo.l1': 'Pemakaian desktop dan cetak, sampai lima kursi',
      'kolo.l2': 'Penanaman di web dan aplikasi, satu produk',
      'kolo.l3': 'Siaran, judul film, dan kemasan',
      'kolo.indexTitle': 'Di halaman ini',
      'nav.top': 'Judul',
      'nav.bukti': 'Bukti',
      'nav.rentang': 'Rentang',
      'nav.cetak': 'Cetak kata Anda',
      'kolo.langTitle': 'Bahasa',
      'kolo.askLead': 'Sudah siap memakainya?',
      'cta.ask': 'Minta lisensi',
      'kolo.note': 'Template landing page spesimen. Nama huruf, isi lisensi, dan seluruh teks di sini contoh, diset dengan variabel font Google.'
    }
  };

  const root = document.documentElement;
  const reduceQ = window.matchMedia('(prefers-reduced-motion: reduce)');

  const MIN = 200;
  const MAX = 800;
  const STEP = 10;

  const clamp = (v, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);

  /* ------------------------------------------------------------ elements */

  const hero = document.querySelector('[data-hero]');
  const rentang = document.querySelector('[data-rentang]');
  const scale = document.querySelector('[data-scale]');
  const kinetic = document.querySelector('[data-kinetic]');
  const wipe = document.querySelector('[data-wipe]');
  const words = document.querySelector('[data-words]');
  const specimens = [...document.querySelectorAll('.specimen')];
  const specTexts = [...document.querySelectorAll('[data-spec-text]')];
  const ranges = [...document.querySelectorAll('[data-wght-input]')];
  const outs = [...document.querySelectorAll('[data-wght-out]')];
  const stops = [...document.querySelectorAll('.scale__stop')];
  const langButtons = [...document.querySelectorAll('[data-lang-btn]')];

  /* ------------------------------------------------------------ language */

  const STORE = 'tapak.lang';

  function splitKinetic() {
    if (!kinetic || reduceQ.matches) return;
    const text = kinetic.dataset.plain || kinetic.textContent;
    kinetic.dataset.plain = text;
    kinetic.setAttribute('aria-label', text);
    kinetic.textContent = '';
    const frag = document.createDocumentFragment();
    [...text].forEach((character, i) => {
      const span = document.createElement('span');
      span.className = 'ch';
      span.setAttribute('aria-hidden', 'true');
      span.style.setProperty('--i', String(i));
      span.textContent = character === ' ' ? '\u00A0' : character;
      frag.appendChild(span);
    });
    kinetic.appendChild(frag);
  }

  function applyLang(lang) {
    const dict = COPY[lang] || COPY.en;
    root.lang = lang;
    root.dataset.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const text = dict[el.dataset.i18n];
      if (text != null) {
        el.textContent = text;
        if (el === kinetic) delete el.dataset.plain;
      }
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

    splitKinetic();
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

  /* ---------------------------------------------------------- the axis */

  let wght = 420;
  let manual = false;

  function paintMeta() {
    specimens.forEach(figure => {
      const line = figure.querySelector('.spec');
      if (!line) return;
      const computed = getComputedStyle(line);
      const size = figure.querySelector('[data-size]');
      const weight = figure.querySelector('[data-weight]');
      if (size) size.textContent = Math.round(parseFloat(computed.fontSize)) + ' px';
      if (weight) weight.textContent = 'wght ' + Math.round(parseFloat(computed.fontWeight)) ;
    });
  }

  function paintAxis() {
    const pct = ((wght - MIN) / (MAX - MIN)) * 100;
    root.style.setProperty('--wght', String(wght));
    if (scale) scale.style.setProperty('--p', (pct / 100).toFixed(4));

    outs.forEach(out => { out.textContent = String(wght); });
    ranges.forEach(range => {
      if (+range.value !== wght) range.value = String(wght);
      range.style.setProperty('--pct', pct.toFixed(2) + '%');
    });

    let nearest = stops[0];
    let closest = Infinity;
    stops.forEach(stop => {
      const distance = Math.abs(+stop.dataset.stop - wght);
      if (distance < closest) { closest = distance; nearest = stop; }
    });
    stops.forEach(stop => stop.classList.toggle('is-on', stop === nearest));

    paintMeta();
  }

  function setAxis(value, fromVisitor) {
    const next = Math.round(clamp(value, MIN, MAX) / STEP) * STEP;
    if (fromVisitor) manual = true;
    if (next === wght) {
      paintAxis();
      return;
    }
    wght = next;
    paintAxis();
  }

  ranges.forEach(range => {
    range.addEventListener('input', () => setAxis(+range.value, true));
  });

  /* -------------------------------------------------------- the specimens */

  function mirrorWords() {
    if (!words) return;
    const value = words.value;
    specTexts.forEach(el => { el.textContent = value; });
    paintMeta();
  }

  if (words) {
    words.addEventListener('input', mirrorWords);
    mirrorWords();
  }

  /* ------------------------------------------------------------- motion */

  let box = null;
  let running = false;
  let kineticRevealed = false;
  let wipeRevealed = false;

  function measure() {
    if (!rentang) return;
    const rect = rentang.getBoundingClientRect();
    box = { top: rect.top + window.scrollY, height: rect.height, vh: window.innerHeight };
  }

  function reveal() {
    const limit = window.scrollY + window.innerHeight * 0.85;
    if (kinetic && !kineticRevealed && kinetic.getBoundingClientRect().top + window.scrollY < limit) {
      kinetic.classList.add('is-in');
      kineticRevealed = true;
    }
    if (wipe && !wipeRevealed && wipe.getBoundingClientRect().top + window.scrollY < limit) {
      wipe.classList.add('is-in');
      wipeRevealed = true;
    }
  }

  function frame() {
    running = false;
    const y = window.scrollY;

    if (rentang && box) {
      const span = Math.max(1, box.height - box.vh);
      const progress = clamp((y - box.top) / span);
      if (progress < 0.02) manual = false;
      /* Above the chapter the walk has not started, so it must not drag the
         axis down to its minimum while the visitor is still on the title page. */
      if (!manual && progress > 0) setAxis(MIN + progress * (MAX - MIN), false);
    }

    if (hero && !reduceQ.matches) {
      const heroProgress = clamp(y / Math.max(1, window.innerHeight));
      hero.style.setProperty('--marks-y', (-heroProgress * 90).toFixed(1) + 'px');
      hero.style.setProperty('--marks-o', (1 - clamp((heroProgress - 0.35) / 0.55)).toFixed(3));
      hero.style.setProperty('--grid-y', (heroProgress * 32).toFixed(1) + 'px');
    }

    reveal();
  }

  function requestFrame() {
    if (running) return;
    running = true;
    requestAnimationFrame(frame);
  }

  window.addEventListener('scroll', requestFrame, { passive: true });

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      measure();
      paintMeta();
      requestFrame();
    }, 140);
    requestFrame();
  });

  if (typeof reduceQ.addEventListener === 'function') {
    reduceQ.addEventListener('change', () => {
      measure();
      splitKinetic();
      requestFrame();
    });
  }

  /* ---------------------------------------------------------------- boot */

  applyLang(preferredLang());
  measure();
  paintAxis();
  mirrorWords();
  reveal();
  requestFrame();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      measure();
      paintMeta();
      requestFrame();
    });
  }
  window.addEventListener('load', () => {
    measure();
    paintMeta();
    requestFrame();
  }, { once: true });
})();
