# PANDUAN LENGKAP — Website Undangan Pernikahan Sica & Abner

Panduan ini menjelaskan **semua cara** pakai website undangan kamu, dari upload pertama kali sampai cara edit semua kata-kata, foto, dan informasi. Simpan file ini buat referensi.

---

## DAFTAR ISI

1. [Persiapan Awal](#1-persiapan-awal)
2. [Upload ke GitHub](#2-upload-ke-github)
3. [Aktifkan GitHub Pages](#3-aktifkan-github-pages)
4. [Ganti Foto](#4-ganti-foto)
5. [Edit Semua Kata-kata di Website](#5-edit-semua-kata-kata-di-website)
6. [Ganti Tanggal & Link Peta](#6-ganti-tanggal--link-peta)
7. [Aktifkan RSVP & Wishes Wall](#7-aktifkan-rsvp--wishes-wall)
8. [Kirim Undangan ke Tamu](#8-kirim-undangan-ke-tamu)
9. [Ringkasan Edit Cepat](#9-ringkasan-edit-cepat)

---

## 1. PERSIAPAN AWAL

Yang kamu butuh:
- Akun GitHub (gratis) → daftar di https://github.com/signup
- Akun Google (untuk Google Sheets RSVP) — kalau mau pakai fitur RSVP
- Foto-foto pernikahan kamu (yang sudah kamu upload ke saya)
- 1 file musik latar (.mp3) — opsional

File-file website siap pakai ada di folder:
```
/home/z/my-project/download/
```

---

## 2. UPLOAD KE GITHUB

### Langkah 1 — Buat Repository Baru
1. Login ke https://github.com
2. Klik tombol **`+`** di pojok kanan atas → **New repository**
3. Isi:
   - **Repository name**: `wedding-sica-abner` (atau apa saja, bebas)
   - **Description**: `Digital Wedding Invitation Sica & Abner` (opsional)
   - **Public / Private**: pilih **Public** (wajib supaya GitHub Pages gratis jalan)
   - Jangan centang "Add a README file"
4. Klik **Create repository**

### Langkah 2 — Upload Semua File
1. Di repository baru, klik **"uploading an existing file"**
2. Buka folder `/home/z/my-project/download/` di komputer kamu
3. Drag SEMUA file dan folder ke kotak upload di GitHub:
   - `.github/` (folder)
   - `assets/` (folder, berisi foto + music)
   - `css/` (folder)
   - `js/` (folder)
   - `google-apps-script/` (folder)
   - `index.html`
   - `README.md`
   - `.gitignore`
4. Tunggu sampai semua file selesai upload (progress bar di pojok kanan bawah)
5. Di kotak "Commit changes", ketik pesan: `Initial upload wedding invitation`
6. Klik tombol hijau **Commit changes**

> **Penting untuk folder `.github`:** Folder ini mungkin tersembunyi di komputer. Aktifkan "Show hidden files" di File Explorer (Windows) / Finder (Mac) supaya kelihatan.

---

## 3. AKTIFKAN GITHUB PAGES

### Langkah 3 — Nyalakan Hosting Gratis
1. Di repository kamu, klik tab **Settings** (di atas, sebelah kanan)
2. Di menu kiri, klik **Pages**
3. Pada bagian **"Build and deployment"**:
   - Source: pilih **GitHub Actions** (bukan "Deploy from a branch")
4. Selesai! File `.github/workflows/deploy.yml` yang sudah saya sediakan akan otomatis deploy website kamu

### Langkah 4 — Cek Website Live
1. Klik tab **Actions** (di atas repository)
2. Tunggu sampai muncul centang hijau ✅ di workflow terbaru (sekitar 30 detik)
3. Website kamu sudah live di:
   ```
   https://USERNAME-KAMU.github.io/wedding-sica-abner/
   ```
   Ganti `USERNAME-KAMU` dengan username GitHub kamu, dan `wedding-sica-abner` dengan nama repository yang kamu buat di Langkah 1.

4. Buka link itu di HP dan laptop untuk tes. Done!

---

## 4. GANTI FOTO

Foto-foto di website kamu sekarang sudah pakai foto asli upload-anmu. Tapi kalau mau ganti foto lain, ini caranya:

### Langkah 5 — Siapkan Foto Baru
1. Kompress foto dulu supaya loading cepat di HP:
   - Buka https://tinypng.com atau https://squoosh.app
   - Upload foto kamu, download versi kompress
   - Target: <300KB per foto
2. Rename foto kamu dengan nama EXACT sama:

| Foto asli kamu | Ganti nama jadi | Lokasi di GitHub |
|---|---|---|
| Foto pre-wedding portrait (cover) | `cover.jpg` | `assets/photos/cover.jpg` |
| Foto mempelai pria (profil) | `groom.jpg` | `assets/photos/groom.jpg` |
| Foto mempelai wanita (profil) | `bride.jpg` | `assets/photos/bride.jpg` |
| Foto gallery 1 | `gallery-1.jpg` | `assets/photos/gallery-1.jpg` |
| Foto gallery 2 | `gallery-2.jpg` | `assets/photos/gallery-2.jpg` |
| Foto gallery 3 | `gallery-3.jpg` | `assets/photos/gallery-3.jpg` |
| Foto gallery 4 | `gallery-4.jpg` | `assets/photos/gallery-4.jpg` |
| Foto gallery 5 | `gallery-5.jpg` | `assets/photos/gallery-5.jpg` |
| Foto gallery 6 | `gallery-6.jpg` | `assets/photos/gallery-6.jpg` |
| Foto gallery 7 | `gallery-7.jpg` | `assets/photos/gallery-7.jpg` |
| Foto gallery 8 | `gallery-8.jpg` | `assets/photos/gallery-8.jpg` |

### Langkah 6 — Upload Foto Baru ke GitHub
1. Buka repository → klik folder `assets` → klik folder `photos`
2. Klik tombol **Add file** → **Upload files**
3. Drag foto kamu yang sudah di-rename
4. Kalau GitHub tanya "replace existing file?" → biarkan replace (jangan ubah nama)
5. Klik **Commit changes**
6. Tunggu ±30 detik → website otomatis rebuild → foto langsung berubah

> **Tip:** Tidak perlu edit kode HTML sama sekali! Cukup upload foto dengan nama yang sama, foto langsung berubah.

### Ganti Musik Latar (Opsional)
1. Siapkan file `.mp3` (durasi 2-4 menit, ukuran <2MB)
2. Rename jadi `song.mp3`
3. Upload ke folder `assets/music/` di GitHub (replace file lama)
4. Commit changes

---

## 5. EDIT SEMUA KATA-KATA DI WEBSITE

Inilah bagian yang kamu minta — cara edit semua teks di website. **Semua kata-kata bisa diubah** langsung dari GitHub, tanpa install software apa pun.

### Cara Edit Umum (untuk semua teks di bawah):
1. Buka repository kamu di https://github.com
2. Klik file `index.html`
3. Klik ikon pensil ✏️ di pojok kanan atas file (tombol "Edit this file")
4. Cari teks yang mau diganti pakai Ctrl+F (Windows) atau Cmd+F (Mac)
5. Ganti teksnya
6. Scroll ke bawah → klik tombol hijau **Commit changes**
7. Tunggu ±30 detik → website otomatis update

### Bagian 1 — Cover / Halaman Pembuka

| Lokasi di file | Teks saat ini | Ganti dengan |
|---|---|---|
| Baris ~49 | `The Wedding Of` | Judul pembuka (misal: `Undangan Pernikahan`, `The Wedding Of`, `Pernikahan`) |
| Baris ~53 | `<span class="script">Sica</span>` | Nama mempelai wanita (di cover) |
| Baris ~55 | `<span class="script">Abner</span>` | Nama mempelai pria (di cover) |
| Baris ~59 | `Thursday, 16 May 2030` | Tanggal pernikahan kamu |
| Baris ~61 | `Dear,` | Sapaan ke tamu (bisa biarkan `Dear,` atau ganti `Kepada Yth,`) |
| Baris ~65 | `Open Invitation` | Teks tombol (bisa `Buka Undangan`, `Open Invitation`, dll) |

### Bagian 2 — Quote / Kutipan Agama

| Lokasi di file | Teks saat ini | Keterangan |
|---|---|---|
| Baris ~78 | `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ` | Arabic Bismillah — biarkan |
| Baris ~80-82 | `"Dan di antara tanda-tanda..."` | Ayat Q.S. Ar-Rum: 21 — bisa ganti ayat lain |
| Baris ~84 | `— Q.S. Ar-Rum: 21` | Sumber ayat |

### Bagian 3 — Section Bride & Groom

| Lokasi di file | Teks saat ini | Ganti dengan |
|---|---|---|
| Baris ~94 | `Bismillahirrahmanirrahim` | Pembuka section (bisa biarkan) |
| Baris ~95 | `The Bride & Groom` | Judul section (misal: `Mempelai`, `The Bride & Groom`) |
| Baris ~96-99 | `Dengan memohon rahmat...` | Teks pembuka section mempelai |
| Baris ~108 | `The Groom` | Label mempelai pria (bisa `The Groom`, `Mempelai Pria`) |
| Baris ~109 | `Abner` | Nama lengkap mempelai pria |
| Baris ~110 | `Son of` | `Putra dari` / `Son of` |
| Baris ~111 | `Father: Bapak [Nama Ayah Abner]` | Nama ayah mempelai pria |
| Baris ~112 | `& Mother: Ibu [Nama Ibu Abner]` | Nama ibu mempelai pria |
| Baris ~113 | `@abner_ig` | Instagram mempelai pria (atau hapus jadi `#`) |
| Baris ~124 | `The Bride` | Label mempelai wanita |
| Baris ~125 | `Sica` | Nama lengkap mempelai wanita |
| Baris ~126 | `Daughter of` | `Putri dari` / `Daughter of` |
| Baris ~127 | `Father: Bapak [Nama Ayah Sica]` | Nama ayah mempelai wanita |
| Baris ~128 | `& Mother: Ibu [Nama Ibu Sica]` | Nama ibu mempelai wanita |
| Baris ~129 | `@sica_ig` | Instagram mempelai wanita (atau hapus jadi `#`) |

### Bagian 4 — Section Countdown

| Lokasi di file | Teks saat ini | Ganti dengan |
|---|---|---|
| Baris ~141 | `Save The Date` | Sub-judul (bisa biarkan) |
| Baris ~142 | `Counting The Moments` | Judul section (misal: `Menuju Hari Bahagia`, `Counting The Moments`) |
| Baris ~146 | `Thursday, 16 May 2030 · 09:00 WIB` | Tanggal countdown (juga diatur di js/config.js — lihat Bagian 6) |
| Baris ~152 | `Days` | Label hari (bisa `Hari`) |
| Baris ~156 | `Hours` | Label jam (bisa `Jam`) |
| Baris ~160 | `Minutes` | Label menit (bisa `Menit`) |
| Baris ~164 | `Seconds` | Label detik (bisa `Detik`) |

### Bagian 5 — Section Event Details

| Lokasi di file | Teks saat ini | Ganti dengan |
|---|---|---|
| Baris ~176 | `Celebrate With Us` | Sub-judul section |
| Baris ~177 | `Event Details` | Judul section (misal: `Rangkaian Acara`) |
| Baris ~187 | `Akad Nikah` | Judul acara 1 |
| Baris ~188 | `Thursday, 16 May 2030` | Tanggal Akad |
| Baris ~189 | `09:00 — 11:00 WIB` | Jam Akad |
| Baris ~190 | `Masjid Agung Al-Falah` | Nama tempat Akad |
| Baris ~191 | `Jl. Placeholder No. 123, City` | Alamat Akad |
| Baris ~201 | `Resepsi` | Judul acara 2 |
| Baris ~202 | `Thursday, 16 May 2030` | Tanggal Resepsi |
| Baris ~203 | `12:00 — 15:00 WIB` | Jam Resepsi |
| Baris ~204 | `Ballroom The Grand Hall` | Nama tempat Resepsi |
| Baris ~205 | `Jl. Placeholder No. 456, City` | Alamat Resepsi |

### Bagian 6 — Section Venue / Google Maps

| Lokasi di file | Teks saat ini | Ganti dengan |
|---|---|---|
| Baris ~217 | `Find Us` | Sub-judul |
| Baris ~218 | `Wedding Venue` | Judul section (misal: `Lokasi Acara`) |
| Baris ~223 | `https://www.google.com/maps?q=Monas+Jakarta&output=embed` | Embed Maps venue kamu (lihat cara di Bagian 6 bawah) |
| Baris ~231 | `Ballroom The Grand Hall` | Nama tempat venue |
| Baris ~232 | `Jl. Placeholder No. 456, City, Indonesia` | Alamat lengkap venue |
| Baris ~234 | `https://www.google.com/maps/search/?api=1&query=Monas+Jakarta` | Link Google Maps venue kamu |
| Baris ~235 | `Open in Google Maps` | Teks tombol (bisa `Buka di Google Maps`) |

### Bagian 7 — Section Gallery (Foto Pre-wedding)

| Lokasi di file | Teks saat ini | Ganti dengan |
|---|---|---|
| Baris ~248 | `Our Moments` | Sub-judul (bisa `Momen Kami`) |
| Baris ~249 | `Pre-Wedding Gallery` | Judul section |
| Baris ~250-252 | `Beberapa cuplikan kebahagiaan kami...` | Deskripsi gallery |

### Bagian 8 — Section RSVP

| Lokasi di file | Teks saat ini | Ganti dengan |
|---|---|---|
| Baris ~289 | `Kindly RSVP` | Sub-judul (bisa `Konfirmasi Kehadiran`) |
| Baris ~290 | `RSVP Confirmation` | Judul section |
| Baris ~291-293 | `We would be honored...` | Teks pembuka RSVP |
| Baris ~297 | `Full Name` | Label nama (bisa `Nama Lengkap`) |
| Baris ~298 | `Your full name` | Placeholder input |
| Baris ~301 | `Will you attend?` | Label konfirmasi (bisa `Apakah Anda hadir?`) |
| Baris ~305 | `Attending` | Pilihan hadir (bisa `Hadir`) |
| Baris ~308 | `Not Attending` | Pilihan tidak hadir (bisa `Tidak Hadir`) |
| Baris ~314 | `Number of Guests (including you)` | Label jumlah tamu (bisa `Jumlah Tamu (termasuk Anda)`) |
| Baris ~316-320 | `1 person`, `2 people`, dst | Opsi dropdown (bisa `1 orang`, `2 orang`, dst) |
| Baris ~327 | `Wishes & Messages` | Label pesan (bisa `Ucapan & Doa`) |
| Baris ~328 | `Send your warmest wishes to the bride and groom...` | Placeholder textarea (bisa `Kirim ucapan terbaik untuk mempelai...`) |
| Baris ~333 | `Send RSVP` | Teks tombol (bisa `Kirim RSVP`, `Kirim Konfirmasi`) |

### Bagian 9 — Section Wedding Wishes

| Lokasi di file | Teks saat ini | Ganti dengan |
|---|---|---|
| Baris ~346 | `Words of Love` | Sub-judul (bisa `Ucapan & Doa`) |
| Baris ~347 | `Wedding Wishes` | Judul section (bisa `Ucapan Pernikahan`) |
| Baris ~354 | `Load more wishes` | Teks tombol (bisa `Muat ucapan lain`) |

### Bagian 10 — Section Gift

| Lokasi di file | Teks saat ini | Ganti dengan |
|---|---|---|
| Baris ~363 | `A Token Of Love` | Sub-judul (bisa `Tanda Kasih`) |
| Baris ~364 | `Wanna give us some gifts?` | Judul section (bisa `Ingin memberi hadiah?`) |
| Baris ~365-367 | `Your presence is the greatest gift...` | Teks pembuka gift |
| Baris ~373 | `Bank Transfer` | Judul card 1 (bisa `Transfer Bank`) |
| Baris ~374 | `Bank BCA` | Nama bank kamu |
| Baris ~375 | `1234567890` | Nomor rekening kamu |
| Baris ~376 | `a.n. Abner` | Nama pemilik rekening |
| Baris ~377 | `Copy Account Number` | Teks tombol (bisa `Salin Nomor Rekening`) |
| Baris ~381 | `Gift Delivery` | Judul card 2 (bisa `Kirim Hadiah`) |
| Baris ~383-385 | `Jl. Placeholder No. 78, City, ZIP, Indonesia` | Alamat kirim hadiah |
| Baris ~386 | `a.n. Abner` | Nama penerima hadiah |
| Baris ~387 | `Copy Address` | Teks tombol (bisa `Salin Alamat`) |

### Bagian 11 — Section Closing

| Lokasi di file | Teks saat ini | Ganti dengan |
|---|---|---|
| Baris ~399 | `Terima Kasih` | Ucapan terima kasih |
| Baris ~400-402 | `Merupakan suatu kehormatan dan kebahagiaan...` | Teks penutup |
| Baris ~404-405 | `Wassalamu'alaikum Warahmatullahi Wabarakatuh` | Salam penutup |
| Baris ~408 | `With Love,` | Penutup (bisa `Dengan Cinta,`) |
| Baris ~409 | `Sica & Abner` | Nama pasangan di penutup |
| Baris ~413 | `Made with ♥ · Digital Wedding Invitation` | Footer (bisa hapus atau ganti) |

---

## 6. GANTI TANGGAL & LINK PETA

Beberapa hal teknis tidak di-edit di `index.html`, tapi di `js/config.js`.

### Langkah 7 — Edit js/config.js
1. Klik file `js/config.js` di repository
2. Klik ikon pensil ✏️ untuk edit
3. Update bagian ini:

```javascript
WEDDING_DATETIME: "2030-05-16T09:00:00",
// Format: YYYY-MM-DDTHH:MM:SS (24 jam, waktu lokal)
// Contoh: 16 Mei 2030 jam 09:00 → "2030-05-16T09:00:00"

WEDDING_DATETIME_TEXT: "Thursday, 16 May 2030 · 09:00 WIB",
// Teks yang tampil di bawah countdown — sesuaikan formatnya

WEDDING_END_DATETIME: "2030-05-16T15:00:00",
// Jam selesai acara (untuk Google Calendar)
```

### Langkah 8 — Ganti Link Google Maps
1. Buka https://www.google.com/maps
2. Cari venue pernikahan kamu (misal: ketik "Ballroom Hotel X Jakarta")
3. Klik **Share** → **Copy link**
4. Paste link itu di `js/config.js` pada bagian:
```javascript
VENUE_MAPS_LINK: "https://www.google.com/maps/search/?api=1&query=...",
```
5. Untuk embed map (yang tampil di section venue), edit juga `index.html` baris ~223:
   - Cari baris: `<iframe src="https://www.google.com/maps?q=Monas+Jakarta&output=embed"`
   - Ganti `Monas+Jakarta` dengan alamat venue kamu (pakai tanda `+` bukan spasi)
   - Contoh: `https://www.google.com/maps?q=Ballroom+Hotel+X+Jakarta&output=embed`

### Langkah 9 — Update Info Google Calendar (Supaya Tamu Bisa "Add to Calendar")
Masih di `js/config.js`:
```javascript
EVENT: {
  title:       "Wedding of Sica & Abner",     // Judul acara di Google Calendar
  location:    "Ballroom The Grand Hall, Jl. Placeholder No. 456, City",
  description: "We invite you to share in our joy as we celebrate our wedding. ..."
},
```
Ganti dengan info asli kamu. Commit changes.

---

## 7. AKTIFKAN RSVP & WISHES WALL

Supaya RSVP tamu tersimpan ke Google Sheets & ucapan otomatis muncul di website:

### Langkah 10 — Setup Google Apps Script
1. Buka https://script.google.com → klik **New project**
2. Di repository GitHub kamu, buka folder `google-apps-script/` → klik file `Code.gs`
3. Klik tombol **Raw** atau **Copy raw file** → copy semua isinya
4. Kembali ke Apps Script editor → hapus kode default yang ada → paste kode `Code.gs` tadi
5. Klik ikon disket 💾 (Save project) → kasih nama project: `Wedding RSVP API`

### Langkah 11 — Deploy sebagai Web App
1. Klik **Deploy** (pojok kanan atas) → **New deployment**
2. Klik ikon gear ⚙️ → pilih **Web app**
3. Isi:
   - **Description**: `Wedding RSVP API`
   - **Execute as**: **Me** (akun Google kamu)
   - **Who has access**: **Anyone**
4. Klik **Deploy**
5. Akan muncul pop-up authorization → klik **Authorize access**
6. Google akan warning "Google hasn't verified this app" → klik **Advanced** → klik **Go to Wedding RSVP API (unsafe)** → klik **Allow**
7. Copy URL yang muncul (akhiran `/exec`)

### Langkah 12 — Paste URL ke Website
1. Buka repository GitHub → klik `js/config.js` → edit (ikon pensil)
2. Cari baris: `APPS_SCRIPT_URL: "",`
3. Paste URL kamu:
```javascript
APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfyc.../exec",
```
4. Commit changes

### Langkah 13 — Test RSVP
1. Buka website kamu
2. Isi RSVP form dengan data test (nama kamu, Attending, 1 person, pesan)
3. Klik **Send RSVP**
4. Tunggu → seharusnya muncul "Thank you! Your RSVP has been received."
5. Buka Google Drive kamu → otomatis ada spreadsheet baru bernama **"Wedding RSVP Database"**
6. Buka spreadsheet itu → ada kolom: Timestamp, Name, Attendance, GuestCount, Message
7. Test submission kamu muncul sebagai row baru di sana
8. Kembali ke website → scroll ke section "Wedding Wishes" → tunggu 15 detik → ucapan kamu otomatis muncul

### Struktur Google Sheet (auto-created)
| Timestamp | Name | Attendance | GuestCount | Message |
|---|---|---|---|---|
| 2030-05-16 10:30:12 | Ade Fitriyani | Attending | 2 | Wishing you both… |
| 2030-05-16 11:02:45 | Budi Santoso | Not Attending | 1 | Sorry I can't… |

Bisa export ke Excel/CSV kapan saja dari Google Sheets → File → Download.

---

## 8. KIRIM UNDANGAN KE TAMU

### Langkah 14 — Buat Link Personal per Tamu
Supaya cover menampilkan nama tamu secara otomatis, tambahkan `?to=Nama+Tamu` di akhir URL:

```
https://USERNAME-KAMU.github.io/wedding-sica-abner/?to=Ade+Fitriyani
```

Cover akan tampil "Dear, Ade Fitriyani" (bukan "Dear, Guest").

### Langkah 15 — Broadcast ke Tamu
Buat daftar tamu di Excel/Google Sheets, lalu untuk setiap tamu:
1. Ganti `?to=Nama+Tamu` dengan nama tamu (pakai `+` bukan spasi)
2. Kirim link personal itu via WhatsApp/email ke tamu

Contoh:
```
https://USERNAME-KAMU.github.io/wedding-sica-abner/?to=Ade+Fitriyani
https://USERNAME-KAMU.github.io/wedding-sica-abner/?to=Budi+Santoso
https://USERNAME-KAMU.github.io/wedding-sica-abner/?to=Citra+Lestari
```

---

## 9. RINGKASAN EDIT CEPAT

Setelah setup awal selesai, mau update apa saja tinggal lakukan ini:

| Mau ganti... | File yang di-edit | Caranya |
|---|---|---|
| **Foto** | Tidak perlu edit kode | Upload foto baru ke `assets/photos/` dengan nama sama → Commit |
| **Musik latar** | Tidak perlu edit kode | Upload `song.mp3` baru ke `assets/music/` → Commit |
| **Nama mempelai / orang tua / Instagram** | `index.html` | Edit → Find & Replace → Commit |
| **Tanggal pernikahan (countdown)** | `js/config.js` | Edit `WEDDING_DATETIME` → Commit |
| **Tanggal yang tampil di section event** | `index.html` | Edit baris 188 & 202 → Commit |
| **Alamat venue / link Google Maps** | `js/config.js` + `index.html` | Edit `VENUE_MAPS_LINK` & iframe src → Commit |
| **Info bank / alamat hadiah** | `js/config.js` + `index.html` | Edit `BANK_ACCOUNT_NUMBER`, `GIFT_ADDRESS` & teks di gift section → Commit |
| **Semua judul section / kata-kata** | `index.html` | Edit teks di dalam tag `<p>`, `<h2>`, dll → Commit |
| **Quote ayat / kutipan agama** | `index.html` baris ~78-84 | Edit teks di dalam tag → Commit |
| **Teks tombol (Open Invitation, Send RSVP, dll)** | `index.html` | Edit teks di dalam `<button>` → Commit |

Setiap klik **Commit changes**, GitHub rebuild website dalam ±30 detik. Semua bisa dilakukan langsung dari browser HP/laptop, tanpa install software apa pun.

---

## TROUBLESHOOTING (Kalau Ada Masalah)

**Q: Website tidak bisa diakses**
A: Cek tab Actions di repository → pastikan ada centang hijau. Kalau silang merah, klik untuk lihat error.

**Q: Foto tidak muncul**
A: Pastikan nama file EXACT sama (`cover.jpg`, bukan `Cover.JPG` atau `cover.jpeg`). Case-sensitive!

**Q: Countdown angka 00 semua**
A: Tanggal di `js/config.js` (`WEDDING_DATETIME`) sudah lewat atau format salah. Format harus `YYYY-MM-DDTHH:MM:SS`.

**Q: RSVP error "not configured yet"**
A: `APPS_SCRIPT_URL` di `js/config.js` masih kosong. Lakukan Langkah 10-12.

**Q: Music tidak mau bunyi**
A: Browser mobile blok autoplay. Musik baru bunyi setelah tamu klik "Open Invitation". Pastikan file `assets/music/song.mp3` ada.

**Q: Link Google Calendar salah tanggal**
A: Update `WEDDING_DATETIME` dan `WEDDING_END_DATETIME` di `js/config.js`.

**Q: Ganti kode Apps Script tapi API masih jalan pakai kode lama**
A: Harus buat deployment baru. Deploy → Manage deployments → ikon pensil → Version: **New version** → Deploy. URL tetap sama.

---

## CHECKLIST FINAL (Sebelum Kirim ke Tamu)

- [ ] Website sudah live di `https://USERNAME.github.io/wedding-sica-abner/`
- [ ] Semua nama (mempelai, orang tua) sudah benar di `index.html`
- [ ] Tanggal pernikahan benar di `index.html` & `js/config.js`
- [ ] Foto cover, groom, bride, gallery sudah pakai foto asli
- [ ] Alamat Akad & Resepsi sudah benar
- [ ] Link Google Maps venue sudah benar
- [ ] Info bank (nomor rekening) sudah benar
- [ ] Alamat kirim hadiah sudah benar
- [ ] RSVP form sudah terhubung Google Sheets (test submit)
- [ ] Wishes wall sudah tampil (test lihat ucapan muncul)
- [ ] Music sudah di-upload (opsional)
- [ ] Test buka di HP (iPhone Safari + Android Chrome)
- [ ] Test buka di laptop
- [ ] Test link `?to=Nama+Tamu` personal

Selesai! Website undangan kamu siap dibagikan ke tamu. Selamat menikah, Sica & Abner! 💙
