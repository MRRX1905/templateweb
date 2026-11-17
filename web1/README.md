# Dark GPT

Template landing page gelap untuk produk AI. Satu halaman, tanpa build step:
buka `index.html` di browser dan semuanya jalan.

```
index.html   markup lima bagian, teks bawaan bahasa Inggris
styles.css   token warna, tipografi, lapisan hero, art direction mobile
app.js       orb canvas reaktif pointer, koreografi scroll, toggle ID/EN
```

Halaman contoh ini memasarkan produk fiktif bernama Dark GPT. Semua klaim,
nama dokumen, dan istilah di dalamnya placeholder: ganti dengan milik Anda
sebelum dipakai sungguhan.

## Menjalankan

```bash
python -m http.server 4321      # lalu buka http://127.0.0.1:4321
```

File `index.html` juga bisa dibuka langsung lewat `file://`, hanya saja font
Google tidak akan dimuat dan halaman jatuh ke font sistem.

## Struktur halaman

Lima bagian, masing-masing memakai cara bergerak yang berbeda. Tidak ada dua
bagian berurutan yang memakai device yang sama.

| Bagian | Device | Isi |
| --- | --- | --- |
| Hero (`#top`) | parallax berlapis + pointer | latar, orb, partikel depan bergerak dengan laju berbeda; headline duduk di antaranya |
| `#turn` | pin + kinetic | satu kalimat tersusun baris demi baris saat frame diam |
| `#caps` | pan lateral | rel empat panel, digerakkan scroll vertikal |
| `#why` | reveal | perbandingan terungkap dengan wipe |
| `#start` | pointer | halaman berhenti, glow dan tombol merespons kursor |

Bagian yang di-pin butuh skrip untuk memacetkan lajunya. Tanpa JavaScript,
`html:not(.js)` di `styles.css` mengembalikannya jadi tata letak biasa dan rel
kemampuan jadi penggeser horizontal native.

## Mengubah teks

Teks hidup di dua tempat dan keduanya harus sinkron:

1. `index.html` — teks bawaan (dipakai sebelum skrip jalan, dan untuk SEO).
2. `app.js` — objek `COPY` berisi kamus `en` dan `id` untuk setiap kunci
   `data-i18n="..."`.

Menambah bahasa berarti menambah kunci baru di `COPY` dengan set kunci yang
sama. Atribut `data-i18n-aria` mengisi `aria-label`, sedangkan judul halaman
dan meta description diambil dari kunci `meta.title` dan `meta.desc`.

Pilihan bahasa disimpan di `localStorage` dengan kunci `darkgpt.lang`. Bila
belum ada pilihan, halaman mengikuti bahasa browser.

## Tema

Enam peran warna dan dua font, semuanya di `:root` dalam `styles.css`:

```css
--canvas:#0B0A09; --surface:#171412;
--ink:#F4EFE7; --ink-soft:#9E958C;
--accent:#E9A13C; --accent-ink:#1A1004;
--font-display:"Archivo", ...; --font-text:"Manrope", ...;
```

Kontras teks yang diukur pada halaman ini: `--ink` 17.3:1, `--ink-soft` 6.7:1
di atas `--canvas`, dan teks tombol 8.6:1. Kalau Anda mengganti warna, ukur
ulang rasio ini.

Ukuran ruang memakai skala basis 4px (`--s-1` sampai `--s-11`), ukuran huruf
memakai `clamp()` supaya tidak perlu media query per tingkat.

## Orb reaktif

`createOrb()` di `app.js` menggambar bola partikel di canvas tanpa WebGL.
Titiknya tersebar dengan fibonacci sphere, lalu diproyeksikan ulang setiap
frame. Angka yang biasanya ingin diubah:

- `COUNT` jumlah partikel
- `R = size * 0.34` radius bola
- `pointer.x * w * 0.34` seberapa jauh kursor menarik permukaan
- kecepatan putar `time * 0.00016` dan pengaruh scroll `scrollY / vh * 0.55`

Ada `.orb-fallback` di belakang canvas, jadi bagian hero tetap punya bentuk
kalau canvas gagal.

## Yang perlu diganti sebelum dipakai

- `href="#start"` pada tombol "Minta akses": arahkan ke formulir, email, atau
  halaman pendaftaran Anda.
- Nama brand "Dark GPT" dan `.brand__mark`.
- Nama dokumen contoh di panel sitasi (`caps.p2.s1` sampai `s3`).
- Perintah CLI contoh `darkgpt forget --session 8f21 --purge-index`.
- Klaim di bagian `#why` dan `#start` supaya sesuai kenyataan produk Anda.

## Perilaku yang sudah ditangani

- `prefers-reduced-motion`: bagian yang di-pin jadi tata letak biasa, animasi
  partikel dan drift dimatikan, orb digambar sekali sebagai frame diam.
- Layar sempit (<= 860px): tata letak flat, rel jadi tumpukan vertikal, tabel
  perbandingan jadi blok bertumpuk dengan label kolom.
- Fokus keyboard: skip link, `:focus-visible` bertema aksen, urutan tab sesuai
  urutan baca.
- Satu loop `requestAnimationFrame` untuk semua animasi, dan loop berhenti saat
  bagian yang diamati keluar dari viewport.
