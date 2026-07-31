# PT Andromeda Sinergi Komputasi | ASK Consulting Web App & CMS

Aplikasi web enterprise modern **ASK Consulting** (Application • System • Network) dilengkapi dengan **Custom Admin CMS Panel**, REST API Backend (Node.js/Express), dan penyimpanan data dinamis.

---

## 🚀 Fitur Utama

- **Landing Page Enterprise**: Desain responsif, modern (Glassmorphism & Neon Cyan Theme), bilingual (ID/EN), animasi canvas interaktif, dan kalkulator IT Maturity Assessment (COBIT Scale).
- **Custom Admin CMS Panel**: Pengaturan Profil Perusahaan, Visi Misi, Layanan IT, Keunggulan, Klien Korporasi, Tim Pakar, Studi Kasus, Artikel Insights, Inbox Leads, dan Media Uploader.
- **OWASP Top 10 Compliant Security**:
  - Sanitasi Input XSS pada Formulir Kontak (`/#contact`)
  - Validasi Email Strict
  - IP Rate Limiting (Pencegahan Bot Spam & DoS)
  - Security HTTP Response Headers (X-Content-Type-Options, X-Frame-Options, XSS Protection)
  - Autentikasi Sesi Token Admin CMS

---

## 📁 Struktur Direktori

```text
ask-consulting-web/
├── app.js               # Engine JavaScript Utama (Public View & CMS Logic)
├── index.html           # Struktur HTML Landing Page & Modal Admin CMS
├── styles.css           # Design System & Styling CSS (Glassmorphism & Responsive)
├── server.js            # Node.js Express Backend REST API & Auth Engine
├── db.json              # Database Utama Penyimpanan CMS
├── data.json            # Seed Data Default Database
├── uploads/             # Direktori Penyimpanan Berkas Gambar/Logo Terunggah
├── Dockerfile           # Konfigurasi Build Container Docker
├── docker-compose.yml   # Orchestration Deployment Docker VPS
├── .env.example         # Template Variable Lingkungan Server
├── .gitignore           # Filter Berkas Repository Git
└── package.json         # Dependensi Node.js & Script Jalankan Aplikasi
```

---

## 💻 Panduan Jalankan di Lokal (Development)

### 1. Prasyarat
- [Node.js](https://nodejs.org/) (v16 atau v18+)

### 2. Langkah-Langkah
```bash
# Clone repository
git clone <URL_REPOSITORY_GITHUB_ANDA>
cd ask-consulting-web

# Install dependensi
npm install

# Jalankan server
npm start
```
Buka browser di `http://localhost:5000`.

---

## 📤 Langkah Push Kode ke GitHub

Jalankan perintah berikut di terminal komputer lokal Anda untuk mengunggah proyek ke GitHub:

```bash
# 1. Inisialisasi Git (jika belum)
git init

# 2. Tambahkan remote repository GitHub Anda
git remote add origin https://github.com/USERNAME_ANDA/REPO_ANDA.git

# 3. Add semua file
git add .

# 4. Commit perubahan
git commit -m "feat: setup production ready ask consulting web app & docker configuration"

# 5. Ubah branch ke main dan push
git branch -M main
git push -u origin main
```

---

## 🐳 Panduan Deployment di VPS Menggunakan Docker

Proyek ini telah siap di-deploy ke VPS yang sudah terinstall Docker dan Docker Compose.

### Langkah 1: Clone Repository di VPS
Masuk ke VPS Anda via SSH, lalu jalankan:
```bash
cd /opt
git clone https://github.com/USERNAME_ANDA/REPO_ANDA.git ask-consulting-web
cd ask-consulting-web
```

### Langkah 2: Atur Environment (Opsional)
Buat file `.env` jika ingin mengubah port atau kredensial admin:
```bash
cp .env.example .env
nano .env
```

### Langkah 3: Jalankan Container Docker Compose
```bash
docker compose up -d --build
```

Aplikasi Anda kini sudah berjalan secara otomatis di port `5000` pada VPS!

### Cek Status Container & Log
```bash
# Cek status container
docker compose ps

# Cek log aplikasi
docker compose logs -f
```

### Hentikan / Restart Container
```bash
# Restart container
docker compose restart

# Stop container
docker compose down
```

---

## 💾 Ketahanan Data (Data Persistence)

Pada `docker-compose.yml`, direktori `db.json` dan `uploads/` telah di-mount sebagai **Volume Host**. Hal ini memastikan data CMS dan logo/gambar yang diunggah **tidak akan hilang** meskipun container Docker di-restart atau di-build ulang.

---

## 🔐 Kredensial Administrator CMS

Secara default, Anda dapat mengakses portal Admin CMS melalui shortcut tombol `Admin Login` pada footer halaman atau dengan menekan tombol keyboard `Ctrl + Shift + A` pada browser.

---

## 📄 Lisensi
© 2026 PT Andromeda Sinergi Komputasi (ASK Consulting). All Rights Reserved.
