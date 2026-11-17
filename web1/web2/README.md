# Tapak Aksara

Template landing page spesimen untuk foundry huruf. Satu halaman, tanpa build
step: buka `index.html` di browser.

```
index.html   lima bab, teks bawaan bahasa Inggris
styles.css   ground kertas dan tinta, sumbu berat, skala cetak, kolofon
app.js       sumbu berat halaman, bab tinta, karakter kinetic, spesimen hidup, ID/EN
BRIEF.md     brief dan feeling curve untuk build ini
FINGERPRINTS.md  gerbang fingerprint terhadap build di folder induk
```

Rimbun, syarat lisensi, dan seluruh teks di halaman ini placeholder. Ganti
sebelum dipakai sungguhan.

## Menjalankan

```bash
python -m http.server 4322      # lalu buka http://127.0.0.1:4322
```

## Grammar dan struktur

Halaman ini memakai grammar **poster tipografis**: tipografi adalah gambarannya,
kontras skala menggantikan fotografi, dan tidak ada kartu, scrim, atau media.
Lima bab:

| Bab | Isi | Yang bergerak |
| --- | --- | --- |
| Halaman judul | Satu kata pada skala ekstrem, plus kontrol sumbu | Bidang tanda cetak melintasi huruf, grid kertas bergerak lebih lambat |
| Bukti | Kalimat yang sama pada tiga ukuran, dengan paragraf penjelas | Huruf datang satu per satu, blok kedua terbuka dengan wipe |
| Rentang | Bab bertinta: scroll berjalan menyusuri sumbu 200 sampai 800 | Kata raksasa, angka, dan skala ikut berubah berat |
| Cetak | Kata Anda sendiri pada tiga ukuran nyata | Spesimen hidup mengikuti ketikan |
| Kolofon | Type terkecil di halaman, ajakan sebagai teks berjalan | Reveal ringan |

Satu-satunya bab yang di-pin adalah Rentang. Sisanya mengalir seperti halaman
cetak, sesuai grammar-nya.

## Sumbu berat

`--wght` adalah satu nilai untuk seluruh halaman. Tiga hal membacanya: kata di
halaman judul, kata dan angka di bab Rentang, dan semua spesimen di bab Cetak.
Dua hal menulisnya:

- Penggeser di halaman judul (juga bisa dikendalikan panah keyboard).
- Scroll bab Rentang, yang memetakan progres 0 sampai 1 ke 200 sampai 800.

Begitu pengunjung memakai penggeser, scroll berhenti menulis sampai bab Rentang
dimasuki lagi dari atas. Di luar bab itu sumbu dibiarkan pada nilai terakhir:
inilah kenapa halaman judul bisa kembali dalam keadaan tebal setelah pengunjung
menyusuri bab tinta. Kalau Anda ingin halaman judul selalu mulai di 420,
tambahkan satu baris di `frame()` pada `app.js` setelah blok `rentang`:

```js
if (!box || y < box.top) setAxis(420, false);
```

Rentangnya diatur di `COPY`? Tidak: ubah `MIN`, `MAX`, dan `STEP` di bagian atas
`app.js`, lalu samakan `min`, `max`, `step`, dan `value` pada input di
`index.html`. Nilai bawaan 420 juga muncul di `html:not(.js) .scale__fill` pada
`styles.css` sebagai cadangan tanpa skrip.

## Mengubah teks

Sama seperti build sebelumnya, teks hidup di dua tempat dan harus sinkron:

1. `index.html` untuk teks bawaan dan SEO.
2. Objek `COPY` di `app.js`, kamus `en` dan `id` untuk setiap `data-i18n`.

`data-i18n-aria` mengisi `aria-label`. Judul halaman dan meta description diambil
dari `meta.title` dan `meta.desc`. Pilihan bahasa disimpan di `localStorage`
dengan kunci `tapak.lang`, dan halaman mengikuti bahasa browser kalau belum ada.

## Tema

Dua ground, satu hue aksen dengan dua lightness, sesuai aturan halaman yang
memotong keras antara ground terang dan gelap:

```css
/* kertas */
--ground:#F1EDE4; --fg:#17150F; --fg-soft:#6B6558; --accent:#2130C0;
/* tinta, di .ground-ink */
--ground:#14130F; --fg:#EFEAE0; --fg-soft:#9C9486; --accent:#8D9AFF;
```

Kontras terukur pada halaman ini: teks utama 15,6:1 di kertas dan 15,5:1 di
tinta, teks sekunder 4,95:1 dan 6,19:1, tautan aksen 7,99:1. `color` selalu
ditulis ulang bersamaan dengan token di `.ground-ink`, karena `color` diwarisi
sebagai nilai jadi dan tidak ikut berubah kalau hanya tokennya yang diganti.

## Huruf spesimen

Halaman memakai Bricolage Grotesque (sumbu `wght` 200 sampai 800, plus `opsz`)
sebagai pengganti rilis sungguhan. Untuk memakai huruf Anda sendiri, ganti tautan
font dan `--font-spec`, lalu pastikan:

- Fontnya variabel dengan sumbu `wght` minimal 200 sampai 800, karena seluruh
  gerakan halaman bergantung pada itu.
- Ukuran kecil mendapat kompensasi optis: `font-weight: calc(var(--wght) / 2 + 260)`
  memetakan sumbu ke pita yang terbaca di 17 piksel, dan kata di bab tinta
  memakai `calc(var(--wght) + 30)` karena teks terang di ground gelap perlu satu
  langkah lebih berat.

## Yang perlu diganti sebelum dipakai

- `href="#kolofon"` pada "Minta lisensi": arahkan ke formulir atau surel Anda.
- Nama foundry, nama huruf, dan isi daftar lisensi (tanpa harga, sesuai isi
  template ini).
- Kalimat di `kolo.note` yang menyatakan halaman ini template.
- Nilai bawaan pada input kata (`value="Aksara"`).

## Perilaku yang sudah ditangani

- Tanpa JavaScript: bab tinta jadi bab pendek statis, skala tetap menunjukkan
  posisi sumbu bawaan, dan semua teks terlihat.
- `prefers-reduced-motion`: transisi dimatikan, bab tinta dipendekkan jadi 180vh,
  dan bab yang di-pin tidak lagi memaksa scroll panjang. Susunan tetap lengkap.
- Layar sempit (<= 900px): skala berat jadi daftar bertumpuk, kata judul hampir
  selebar layar, kolofon jadi satu kolom.
- Keyboard: skip link, penggeser sumbu dengan tombol panah, fokus bertema aksen,
  dan urutan tab sesuai urutan baca.
