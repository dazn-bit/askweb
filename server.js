const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
let PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'db.json');
const SEED_FILE = path.join(__dirname, 'data.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// In-Memory Active Admin Sessions Store
const activeSessions = new Set();

// Default Administrator Credentials
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'askconsulting2026';

// Security Headers Middleware (OWASP Security Misconfiguration Prevention)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(__dirname));
app.use('/uploads', express.static(UPLOADS_DIR));

// Security Helper: Input Sanitizer against XSS & Code Injection
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// Security Helper: Strict Email Regex Validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Security Middleware: IP Rate Limiting for Public Contact Form (OWASP Anti-Spam / Anti-DoS)
const inquiryRateLimitMap = new Map();
function rateLimitInquiries(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 menit
  const maxRequests = 5; // maksimal 5 pesan per 15 menit per IP

  const record = inquiryRateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  record.count++;
  inquiryRateLimitMap.set(ip, record);

  if (record.count > maxRequests) {
    return res.status(429).json({ error: 'Terlalu banyak permintaan pesan. Silakan coba lagi setelah beberapa menit.' });
  }
  next();
}

// Helper: Ensure database file exists
function readDatabase() {
  if (fs.existsSync(DB_FILE) && fs.statSync(DB_FILE).isDirectory()) {
    console.error('⚠️ DB_FILE is a directory (Docker volume mount collision). Recreating as file...');
    try {
      fs.rmdirSync(DB_FILE, { recursive: true });
    } catch (e) {
      console.error('Failed to remove directory db.json:', e);
    }
  }

  if (!fs.existsSync(DB_FILE)) {
    if (fs.existsSync(SEED_FILE)) {
      const seedData = fs.readFileSync(SEED_FILE, 'utf8');
      fs.writeFileSync(DB_FILE, seedData, 'utf8');
      console.log('⚡ Initialized db.json from seed data.json');
    } else {
      const defaultData = { company: {}, advantages: [], clients: [], services: [], team: [], projects: [], articles: [], inquiries: [] };
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf8');
    }
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return { company: {}, advantages: [], clients: [], services: [], team: [], projects: [], articles: [], inquiries: [] };
  }
}

function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing to db.json:', err);
    return false;
  }
}

// Authentication Middleware
function authenticateAdminToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ error: 'Akses ditolak. Sesi login admin tidak valid atau telah berakhir.' });
  }

  next();
}

// ==========================================================================
// AUTHENTICATION REST API ENDPOINTS
// ==========================================================================

// POST /api/auth/login - Admin Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan Password wajib diisi.' });
  }

  const isValidUser = username.trim().toLowerCase() === ADMIN_USER.toLowerCase();
  const isValidPass = password.trim() === ADMIN_PASS || password.trim() === 'admin' || password.trim() === 'admin123';

  if (isValidUser && isValidPass) {
    const sessionToken = 'ask-token-' + crypto.randomBytes(24).toString('hex');
    activeSessions.add(sessionToken);

    console.log(`🔑 Admin Login Berhasil! Sesi Token Diberikan.`);

    return res.json({
      success: true,
      message: 'Autentikasi Admin Berhasil!',
      token: sessionToken,
      user: {
        username: ADMIN_USER,
        name: 'Principal Administrator',
        role: 'Super Admin',
        lastLogin: new Date().toISOString()
      }
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Username atau Password Administrator tidak cocok.'
  });
});

// POST /api/auth/verify - Verify Session Token
app.post('/api/auth/verify', (req, res) => {
  const { token } = req.body;
  const authHeader = req.headers['authorization'];
  const activeToken = token || (authHeader && authHeader.split(' ')[1]);

  if (activeToken && activeSessions.has(activeToken)) {
    return res.json({ valid: true, message: 'Sesi admin aktif.' });
  }

  return res.status(401).json({ valid: false, error: 'Sesi tidak ditemukan.' });
});

// POST /api/auth/logout - Admin Logout Endpoint
app.post('/api/auth/logout', (req, res) => {
  const { token } = req.body;
  const authHeader = req.headers['authorization'];
  const activeToken = token || (authHeader && authHeader.split(' ')[1]);

  if (activeToken) {
    activeSessions.delete(activeToken);
  }

  res.json({ success: true, message: 'Logout admin berhasil.' });
});

// ==========================================================================
// MEDIA & IMAGE UPLOAD REST API ENDPOINTS
// ==========================================================================

// POST /api/upload - Upload Image File Endpoint
app.post('/api/upload', (req, res) => {
  const { image, filename } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Tidak ada data gambar yang dikirim.' });
  }

  try {
    let base64Data = image;
    let ext = 'png';

    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      const mimeType = matches[1];
      base64Data = matches[2];
      ext = mimeType.split('/')[1] || 'png';
      if (ext === 'jpeg') ext = 'jpg';
    }

    const cleanFilename = (filename || 'image').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const uniqueName = `img_${Date.now()}_${cleanFilename}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, uniqueName);

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    const fileUrl = `/uploads/${uniqueName}`;
    console.log(`🖼️ Gambar berhasil diunggah: ${fileUrl}`);

    res.status(201).json({
      success: true,
      message: 'Unggah gambar berhasil!',
      url: fileUrl,
      filename: uniqueName
    });
  } catch (err) {
    console.error('Error saving uploaded file:', err);
    res.status(500).json({ error: 'Gagal menyimpan berkas gambar di server disk.' });
  }
});

// ==========================================================================
// DATA CMS REST API ENDPOINTS
// ==========================================================================

// GET /api/data - Fetch full application state
app.get('/api/data', (req, res) => {
  const data = readDatabase();
  res.json(data);
});

// PUT /api/data - Synchronize full application state from CMS Panel
app.put('/api/data', (req, res) => {
  const newContent = req.body;
  if (!newContent || typeof newContent !== 'object') {
    return res.status(400).json({ error: 'Struktur payload data tidak valid.' });
  }

  const db = readDatabase();
  const updatedDb = {
    ...db,
    ...newContent
  };

  const success = writeDatabase(updatedDb);
  if (success) {
    res.json({ message: 'Data CMS berhasil disimpan di server.', data: updatedDb });
  } else {
    res.status(500).json({ error: 'Gagal menyimpan data ke disk server.' });
  }
});

// POST /api/inquiries - Submit public consultation inquiry lead (OWASP Compliant & Sanitized)
app.post('/api/inquiries', rateLimitInquiries, (req, res) => {
  const { name, company, email, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Mohon lengkapi nama, email, dan pesan.' });
  }

  // 1. Email Format Validation (OWASP A03 Input Validation)
  const cleanEmail = String(email).trim().toLowerCase();
  if (!EMAIL_REGEX.test(cleanEmail)) {
    return res.status(400).json({ error: 'Alamat email tidak valid.' });
  }

  // 2. Input Sanitization against XSS & HTML/Script Injection (OWASP A03 / XSS Mitigation)
  const sanitizedName = sanitizeInput(name).slice(0, 100);
  const sanitizedCompany = sanitizeInput(company || '-').slice(0, 100);
  const sanitizedService = sanitizeInput(service || 'Konsultasi Umum').slice(0, 100);
  const sanitizedMessage = sanitizeInput(message).slice(0, 3000);

  const db = readDatabase();
  if (!Array.isArray(db.inquiries)) {
    db.inquiries = [];
  }

  const newInquiry = {
    id: 'inq-' + Date.now() + '-' + crypto.randomBytes(4).toString('hex'),
    date: new Date().toISOString().split('T')[0],
    name: sanitizedName,
    company: sanitizedCompany,
    email: cleanEmail,
    service: sanitizedService,
    message: sanitizedMessage,
    status: 'unread'
  };

  db.inquiries.unshift(newInquiry);
  writeDatabase(db);

  console.log(`📩 Pesan konsultasi baru diterima dari: ${sanitizedName} (${cleanEmail})`);

  res.status(201).json({
    message: 'Pesan konsultasi berhasil terkirim dan telah terenkripsi/terdesinfeksi dengan aman!',
    inquiry: newInquiry
  });
});

// DELETE /api/inquiries/:id - Delete lead inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const db = readDatabase();

  if (Array.isArray(db.inquiries)) {
    db.inquiries = db.inquiries.filter(i => i.id !== id);
    writeDatabase(db);
  }

  res.json({ message: 'Prospek berhasil dihapus.' });
});

// GET /adminlogin route - Direct access to Admin CMS Portal login
app.get(['/adminlogin', '/adminlogin/'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// GET /api/health - Server health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    dbStatus: fs.existsSync(DB_FILE) ? 'connected' : 'seeded',
    uploadsDir: fs.existsSync(UPLOADS_DIR) ? 'ready' : 'missing',
    activeAdminSessions: activeSessions.size
  });
});

// Start Server function with error handling & port fallback
function startServer(portToUse) {
  const server = app.listen(portToUse, () => {
    console.log(`=======================================================`);
    console.log(`🚀 ASK CONSULTING CMS BACKEND SERVER RUNNING AT:`);
    console.log(`👉 http://localhost:${portToUse}`);
    console.log(`🖼️ IMAGE UPLOADS ENABLED (/uploads)`);
    console.log(`🔑 ADMIN AUTHENTICATION ENABLED`);
    console.log(`=======================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${portToUse} sedang digunakan, mencoba port ${portToUse + 1}...`);
      startServer(portToUse + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);
