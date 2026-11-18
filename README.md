# KDN Executive AI Course Portal — GitHub Pages

Website kursus **HTML + CSS + JavaScript tulen**. Tiada Apps Script, Google Sheets, backend, atau build step. Sesuai untuk GitHub Pages.

## 1. Preview di laptop

Extract fail ZIP. Double-click `index.html`. Website boleh dibuka terus dalam browser.

## 2. Publish menggunakan GitHub Pages

1. Login ke https://github.com dan klik **New repository**.
2. Nama repository contohnya `kdn-kursus-ai-2026`. Untuk akaun GitHub Free, repository perlu **Public** bagi menggunakan GitHub Pages. **Jangan upload kandungan sensitif**.
3. Klik **Add file → Upload files** dan upload semua fail di dalam folder ini **terus ke root repository** (bukan upload ZIP sahaja): `index.html`, `styles.css`, `app.js`, `content.js`, `favicon.svg`, `.nojekyll` dan README.
4. Klik **Commit changes**.
5. Pergi ke **Settings → Pages → Build and deployment → Source: Deploy from a branch → main → /(root) → Save**.
6. Apabila deployment berjaya, laman tersedia di `https://USERNAME.github.io/kdn-kursus-ai-2026/` (ganti USERNAME dan nama repository).

Rujukan rasmi: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 3. Tukar kandungan tanpa coding

Buka fail `content.js` dalam repository GitHub → klik ikon pensel (Edit) → ubah nilai teks yang perlu → Commit changes. Reload website selepas GitHub Pages publish versi baru.

Antara kandungan yang boleh diubah:

- `settings` — nama kursus, tarikh, tempat, peserta, pakaian, contact dan lain-lain.
- `objectives` — objektif kursus.
- `speakers` — nama, gelaran, profil, topik penceramah, `imageUrl` untuk gambar yang dibenarkan secara terbuka.
- `agenda` — atur cara. `time` masih dikosongkan sehingga masa rasmi diterima.
- `materials` — `title`, `description`, `category`, dan `url` pautan bahan. Kalau `url` kosong, button download tidak muncul.
- `notices` — pengumuman. Contoh: `{"id":"n1","title":"Makluman","message":"Sila hadir 15 minit awal.","sort":"1"}`.
- `faqs` — soalan lazim.

**Penting:** Semua text hendaklah kekal dalam format JavaScript JSON yang betul. Jangan buang koma di antara objek/medan. `content.js` menggunakan `window.PORTAL_DATA = {...};`.

## 4. Folder dan fail

```
index.html      Halaman dan struktur portal
styles.css      Rekaan, warna, mobile responsive
app.js          Fungsi menu, modal, search, filter, paparan data
content.js      Semua data kursus — edit fail ini
favicon.svg     Ikon logo abstrak (bukan Jata Negara)
.nojekyll       Bypass Jekyll processing di GitHub Pages
README.md       Panduan ini
```

## 5. Keselamatan dan had penting

- **GitHub Pages ialah website publik**, termasuk jika repository private dibenarkan oleh pelan tertentu. Jangan letakkan data terperingkat, dokumen dalaman, nombor peribadi atau pautan yang tidak sepatutnya dilihat umum.
- Google Drive boleh digunakan untuk bahan yang diluluskan untuk dikongsi; tetapan izin Drive masih menentukan siapa boleh buka dokumen, tetapi **URL bahan yang ditulis dalam `content.js` boleh dilihat umum**.
- GitHub Pages tidak menyediakan login peserta atau access control. Jika perlu portal khas pegawai KDN, guna platform dalaman KDN/hosting access-controlled yang diluluskan.
- Nama, biodata dan topik penceramah dalam projek ini adalah draf; pastikan semakan urus setia sebelum publish.
- Masa atur cara dan pautan bahan belum diisi; jangan anggap final.

## 6. Modifikasi visual

Warna tiga tona utama ditetapkan dalam `styles.css`:

- Navy `#102A43`
- White `#FFFFFF`
- Gold `#CDB27E`

Tiada build, npm, atau database diperlukan.
