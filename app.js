/* ==========================================================================
   ASK CONSULTING - MAIN JAVASCRIPT APPLICATION ENGINE & CMS STORE
   ========================================================================== */

const STORAGE_KEY = 'ASK_CONSULTING_CMS_DATA_V2';

// Global Application State
let appState = {
  company: {},
  advantages: [],
  clients: [],
  services: [],
  team: [],
  projects: [],
  articles: [],
  inquiries: []
};

let currentLang = localStorage.getItem('ask_consulting_lang') || 'id';

const translations = {
  id: {
    nav_services: "Layanan",
    nav_about: "Tentang Kami",
    nav_why_us: "Keunggulan",
    nav_clients: "Klien Korporasi",
    nav_assessment: "IT Assessment",
    nav_insights: "Insights",
    nav_contact: "Kontak",
    btn_free_consultation: "Konsultasi Gratis",
    hero_badge: "SEJAK 2017 • JAKARTA, INDONESIA",
    hero_desc: "ASK Consulting — Solusi IT Komprehensif yang mencakup tiga pilar utama: Application, System, dan Network. Mitra terpercaya dalam memberikan transformasi digital yang andal dan inovatif bagi setiap klien.",
    btn_explore_services: "Eksplorasi 3 Pilar Layanan",
    btn_discuss_project: "Diskusi Proyek",
    stat_est: "TAHUN BERDIRI",
    stat_exp: "PENGALAMAN TIM (THN)",
    stat_clients: "KLIEN KORPORASI",
    stat_pillars: "LAYANAN UTAMA",
    about_badge: "Profil Perusahaan",
    about_title_1: "Profil",
    about_title_2: "ASK Consulting",
    about_sub: "Mengenal lebih dekat PT Andromeda Sinergi Komputasi",
    about_p1: "ASK (Andromeda Sinergi Komputasi) berdiri secara resmi di Jakarta sejak 2017, dikelola oleh tim ahli berpengalaman lebih dari 15 tahun di bidang teknologi informasi.",
    about_p2: "Kami hadir dengan misi menjawab kebutuhan klien dan mengembangkan kreativitas melalui kerja yang berdedikasi. ASK terdiri dari para profesional kreatif dan berpengalaman dalam memberikan solusi teknologi yang andal dan inovatif bagi sektor pemerintahan, pendidikan, telekomunikasi, perbankan, serta industri swasta.",
    mission_title: "Misi Kami",
    mission_quote: "\"Menjadi mitra terpercaya klien dengan memberikan dukungan terbaik dan jawaban atas kebutuhan teknologi informasi\"",
    vision_title: "Visi Kami",
    vision_quote: "\"Menjadi perusahaan teknologi terdepan yang memberikan transformasi digital berkelanjutan bagi setiap klien\"",
    services_badge: "Layanan Kami",
    services_title_1: "Tiga Pilar Utama",
    services_title_2: "Layanan IT",
    services_desc: "ASK Consulting menyediakan layanan IT komprehensif yang mencakup Application, System, dan Network — disesuaikan dengan kebutuhan spesifik setiap klien.",
    why_us_badge: "Keunggulan",
    why_us_title_1: "Mengapa Memilih",
    why_us_title_2: "ASK Consulting?",
    why_us_desc: "Komitmen kami dalam memberikan nilai tambah dan keandalan terbaik bagi setiap mitra bisnis.",
    clients_badge: "Our Clients",
    clients_title: "Trusted by Companies and Institutions",
    clients_desc: "Working with strategic partners across Indonesia",
    clients_hover: "Hover over to stop the animation",
    assessment_badge: "Assessment Tool",
    assessment_title_1: "Hitung Skor",
    assessment_title_2: "Kesiapan IT",
    assessment_desc: "Gunakan kalkulator interaktif ini untuk menilai tingkat kematangan tata kelola TI dan kepatuhan keamanan informasi di organisasi Anda secara instan.",
    assessment_label_sector: "Sektor Industri",
    opt_gov: "Pemerintahan & BUMN",
    opt_bank: "Perbankan & Keuangan",
    opt_telco: "Telekomunikasi & Jaringan",
    opt_edu: "Pendidikan & Akademis",
    opt_health: "Kesehatan & Swasta",
    assessment_label_q1: "Kematangan Infrastruktur Server & Cloud System?",
    assessment_label_q2: "Keamanan Jaringan & Monitoring NOC 24/7?",
    assessment_label_q3: "Integrasi Aplikasi Enterprise (ERP/CRM/API)?",
    assessment_score_title: "Skor Kematangan TI Proyeksi",
    assessment_btn_audit: "Dapatkan Rekomendasi Audit Detail",
    projects_badge: "Portofolio Proyek",
    projects_title_1: "Studi Kasus",
    projects_title_2: "Implementasi",
    projects_desc: "Lihat bagaimana solusi Application, System, dan Network kami membantu performa bisnis mitra.",
    filter_all: "Semua Proyek",
    team_badge: "Tim Pakar",
    team_title_1: "Dipimpin Oleh",
    team_title_2: "Profesional Berpengalaman",
    team_desc: "Dikelola oleh tim ahli berpengalaman lebih dari 15 tahun di bidang teknologi informasi.",
    articles_badge: "Pusat Pengetahuan",
    articles_title_1: "Insights &",
    articles_title_2: "Artikel Terbaru",
    articles_desc: "Perspektif dan edukasi teknologi langsung dari tim konsultan ASK Consulting.",
    contact_badge: "Contact Us",
    contact_title_1: "Siap",
    contact_title_2: "Berkolaborasi?",
    contact_desc: "Hubungi kami sekarang untuk konsultasi gratis dan diskusi kebutuhan teknologi Anda.",
    label_company_title: "Nama Perusahaan",
    label_office_address: "Alamat Kantor",
    label_phone: "Telepon & WhatsApp",
    label_email: "Email Official",
    label_website: "Website Resmi",
    contact_box_title: "Konsultasi Gratis & Diskusi Kebutuhan",
    label_full_name: "Nama Lengkap",
    label_company_name: "Nama Perusahaan / Organisasi",
    label_business_email: "Email Bisnis",
    label_service_focus: "Pilar Layanan Focus",
    label_message_detail: "Detail Pesan / Kebutuhan Solusi",
    btn_submit_message: "Kirim Pesan Konsultasi",
    ph_name: "Contoh: Ahmad Riyadi",
    ph_company: "Contoh: PT Telkom Indonesia",
    ph_email: "nama@perusahaan.co.id",
    ph_message: "Jelaskan kebutuhan proyek IT Anda..."
  },
  en: {
    nav_services: "Services",
    nav_about: "About Us",
    nav_why_us: "Advantages",
    nav_clients: "Corporate Clients",
    nav_assessment: "IT Assessment",
    nav_insights: "Insights",
    nav_contact: "Contact",
    btn_free_consultation: "Free Consultation",
    hero_badge: "EST. 2017 • JAKARTA, INDONESIA",
    hero_desc: "ASK Consulting — Comprehensive IT Solutions covering three main pillars: Application, System, and Network. Your trusted partner for reliable digital transformation across all business sectors.",
    btn_explore_services: "Explore 3 Service Pillars",
    btn_discuss_project: "Discuss Project",
    stat_est: "ESTABLISHED YEAR",
    stat_exp: "TEAM EXPERIENCE (YRS)",
    stat_clients: "CORPORATE CLIENTS",
    stat_pillars: "MAIN PILLARS",
    about_badge: "Company Profile",
    about_title_1: "About",
    about_title_2: "ASK Consulting",
    about_sub: "Get to know PT Andromeda Sinergi Komputasi",
    about_p1: "ASK (Andromeda Sinergi Komputasi) was officially established in Jakarta in 2017, managed by an expert team with over 15 years of experience in information technology.",
    about_p2: "We exist with a mission to answer clients' needs and develop creativity through dedicated work. ASK consists of creative and experienced professionals delivering reliable and innovative technology solutions for government, education, telecommunications, banking, and private sectors.",
    mission_title: "Our Mission",
    mission_quote: "\"To become client's valued partner by providing ultimate supports and answers to the clients needs\"",
    vision_title: "Our Vision",
    vision_quote: "\"To become a leading technology company delivering sustainable digital transformation for every client\"",
    services_badge: "Our Services",
    services_title_1: "Three Main Pillars of",
    services_title_2: "IT Services",
    services_desc: "ASK Consulting provides comprehensive IT services covering Application, System, and Network — tailored to the specific needs of each client.",
    why_us_badge: "Why Choose Us",
    why_us_title_1: "Why Choose",
    why_us_title_2: "ASK Consulting?",
    why_us_desc: "Our commitment to delivering the best value-added and reliability for every business partner.",
    clients_badge: "Our Clients",
    clients_title: "Trusted by Companies and Institutions",
    clients_desc: "Working with strategic partners across Indonesia",
    clients_hover: "Hover over to stop the animation",
    assessment_badge: "Assessment Tool",
    assessment_title_1: "Calculate Your",
    assessment_title_2: "IT Readiness Score",
    assessment_desc: "Use this interactive calculator to instantly assess your organization's IT governance maturity and information security compliance level.",
    assessment_label_sector: "Industry Sector",
    opt_gov: "Government & SOEs",
    opt_bank: "Banking & Financial Services",
    opt_telco: "Telecommunications & Network",
    opt_edu: "Education & Academia",
    opt_health: "Healthcare & Private Enterprises",
    assessment_label_q1: "Server Infrastructure & Cloud System Maturity?",
    assessment_label_q2: "Network Security & 24/7 NOC Monitoring?",
    assessment_label_q3: "Enterprise Application Integration (ERP/CRM/API)?",
    assessment_score_title: "Projected IT Maturity Score",
    assessment_btn_audit: "Get Detailed Audit Recommendation",
    projects_badge: "Project Portfolio",
    projects_title_1: "Implementation",
    projects_title_2: "Case Studies",
    projects_desc: "Discover how our Application, System, and Network solutions elevate business performance.",
    filter_all: "All Projects",
    team_badge: "Expert Team",
    team_title_1: "Led by Experienced",
    team_title_2: "IT Professionals",
    team_desc: "Managed by an expert team with over 15 years of industry experience.",
    articles_badge: "Knowledge Center",
    articles_title_1: "Latest Tech Insights &",
    articles_title_2: "Articles",
    articles_desc: "Technology perspectives and education directly from the ASK Consulting team.",
    contact_badge: "Contact Us",
    contact_title_1: "Ready to",
    contact_title_2: "Collaborate?",
    contact_desc: "Contact us today for a free consultation and discussion of your technology needs.",
    label_company_title: "Company Name",
    label_office_address: "Office Address",
    label_phone: "Phone & WhatsApp",
    label_email: "Official Email",
    label_website: "Official Website",
    contact_box_title: "Free Consultation & Project Discussion",
    label_full_name: "Full Name",
    label_company_name: "Company / Organization Name",
    label_business_email: "Business Email",
    label_service_focus: "Service Pillar Focus",
    label_message_detail: "Message Details / Project Requirements",
    btn_submit_message: "Send Consultation Message",
    ph_name: "e.g. John Doe",
    ph_company: "e.g. PT Telkom Indonesia",
    ph_email: "name@company.com",
    ph_message: "Describe your IT project requirements..."
  }
};

function setLanguage(lang, notify = false) {
  currentLang = lang;
  localStorage.setItem('ask_consulting_lang', lang);
  document.documentElement.setAttribute('lang', lang);

  const idBtn = document.getElementById('lang-btn-id');
  const enBtn = document.getElementById('lang-btn-en');
  if (idBtn && enBtn) {
    if (lang === 'id') {
      idBtn.classList.add('active');
      enBtn.classList.remove('active');
    } else {
      enBtn.classList.add('active');
      idBtn.classList.remove('active');
    }
  }

  const dict = translations[lang] || translations.id;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  renderPublicView();

  if (notify) {
    showToast(lang === 'en' ? 'Language switched to English (EN)' : 'Bahasa diubah ke Bahasa Indonesia (ID)', 'info');
  }
}

// ==========================================================================
// 1. INITIALIZATION & DATA STORE MANAGEMENT
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
  initThemeToggle();
  await loadDataStore();
  initHeroCanvas();
  renderPublicView();
  initMaturityAssessment();
  initAdminAuth();
  initCMSPanel();
  initNavigationAndModals();
  initContactForm();
  initArticleReaderModal();
  checkAdminLoginRoute();
  setLanguage(currentLang, false);
});

async function loadDataStore() {
  // 1. Try fetching from Express REST API Server Database
  try {
    const res = await fetch(API_BASE + '/api/data');
    if (res.ok) {
      appState = await res.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      return;
    }
  } catch (err) {
    console.warn('Backend REST API tidak terjangkau, menggunakan penyimpanan lokal:', err);
  }

  // 2. Fallback to LocalStorage
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) {
    try {
      appState = JSON.parse(localData);
      return;
    } catch (e) {
      console.error('Gagal membaca data localStorage:', e);
    }
  }

  // 3. Fallback to initial seed data.json
  try {
    const res = await fetch('data.json');
    if (res.ok) {
      appState = await res.json();
      saveDataStore();
    }
  } catch (err) {
    console.error('Fetch data.json error:', err);
  }
}

async function saveDataStore() {
  // Update local cache
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));

  // Sync with Backend Server API Database
  try {
    const res = await fetch(API_BASE + '/api/data', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appState)
    });
    if (res.ok) {
      console.log('⚡ Data CMS tersimpan di Database Server db.json');
    }
  } catch (err) {
    console.warn('Gagal sinkronisasi data ke server backend:', err);
  }
}

// ==========================================================================
// 1.5 THEME TOGGLE (DARK / LIGHT MODE ENGINE)
// ==========================================================================
function initThemeToggle() {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('ask_consulting_theme', 'light');
}

// ==========================================================================
// 2. PUBLIC SITE RENDERING ENGINE
// ==========================================================================
function renderPublicView() {
  updateCompanyDetails();
  renderServices();
  renderAdvantages();
  renderClientsGrid();
  renderProjects('all');
  renderTeam();
  renderArticles();
  updateCompanyStats();
  initMaturityAssessment();
}

function updateCompanyDetails() {
  if (!appState.company) return;
  const c = appState.company;

  const logoEl = document.getElementById('main-brand-logo');
  if (logoEl) {
    if (c.logo) {
      logoEl.innerHTML = `<img src="${c.logo}" alt="${escapeHtml(c.name || 'ASK Consulting Logo')}" style="height: 70px; max-width: 280px; object-fit: contain; display: block;">`;
    } else {
      logoEl.innerHTML = `
        <div class="logo-icon">
          <i class="fa-solid fa-cubes"></i>
        </div>
        <span>ASK <span class="accent">CONSULTING</span></span>
      `;
    }
  }

  const addrEl = document.getElementById('contact-address');
  const phoneEl = document.getElementById('contact-phone');
  const emailEl = document.getElementById('contact-email');
  const legalEl = document.getElementById('contact-legal-name');

  if (addrEl && c.address) addrEl.textContent = c.address;
  if (phoneEl && c.phone) phoneEl.textContent = `${c.phone} (${c.contactPerson || 'Erick Dazki'})`;
  if (emailEl && c.email) emailEl.textContent = c.email;
  if (legalEl && c.legalName) legalEl.textContent = `${c.legalName} (${c.name || 'ASK Consulting'})`;
}

function renderAdvantages() {
  const container = document.getElementById('advantages-grid-container');
  if (!container) return;

  const advs = appState.advantages || [
    { icon: 'fa-circle-check', title: 'Pengalaman & Keahlian', description: 'Tim kami berpengalaman 15+ tahun di berbagai proyek IT skala nasional dan enterprise.' },
    { icon: 'fa-sliders', title: 'Solusi Customized', description: 'Setiap solusi dirancang khusus sesuai proses bisnis dan kebutuhan unik masing-masing klien.' },
    { icon: 'fa-handshake', title: 'Partner Jangka Panjang', description: 'Kami membangun hubungan kemitraan jangka panjang, bukan sekadar transaksi proyek satu kali.' },
    { icon: 'fa-shield-halved', title: 'Keamanan & Keandalan', description: 'Standar keamanan enterprise: dari enkripsi data hingga disaster recovery plan.' }
  ];

  const EN_ADV_MAP = {
    "Pengalaman & Keahlian": "Experience & Expertise",
    "Tim kami berpengalaman 15+ tahun di berbagai proyek IT skala nasional dan enterprise.": "Our team brings 15+ years of experience across national and enterprise-scale IT projects.",
    "Solusi Customized": "Customized Solutions",
    "Setiap solusi dirancang khusus sesuai proses bisnis dan kebutuhan unik masing-masing klien.": "Every solution is custom-architected to fit your specific business workflows and requirements.",
    "Partner Jangka Panjang": "Long-Term Strategic Partner",
    "Kami membangun hubungan kemitraan jangka panjang, bukan sekadar transaksi proyek satu kali.": "We build long-term strategic partnerships beyond simple one-off project execution.",
    "Keamanan & Keandalan": "Security & Reliability",
    "Standar keamanan enterprise: dari enkripsi data hingga disaster recovery plan.": "Enterprise-grade security standards: from end-to-end data encryption to disaster recovery planning."
  };

  container.innerHTML = advs.map(a => {
    const title = currentLang === 'en' && EN_ADV_MAP[a.title] ? EN_ADV_MAP[a.title] : a.title;
    const desc = currentLang === 'en' && EN_ADV_MAP[a.description] ? EN_ADV_MAP[a.description] : a.description;
    return `
      <div class="advantage-card">
        <div class="advantage-icon">
          <i class="fa-solid ${a.icon || 'fa-check-circle'}"></i>
        </div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(desc)}</p>
      </div>
    `;
  }).join('');
}

function renderClientsGrid() {
  const track1 = document.getElementById('clients-track-1');
  const track2 = document.getElementById('clients-track-2');

  const clients = appState.clients || [];
  if (clients.length === 0) return;

  const half = Math.ceil(clients.length / 2);
  const row1Clients = clients.slice(0, half);
  const row2Clients = clients.slice(half).length > 0 ? clients.slice(half) : clients;

  function buildLogoHtml(cli) {
    const isImageIcon = cli.icon && (cli.icon.startsWith('http') || cli.icon.startsWith('/') || cli.icon.startsWith('data:'));
    if (isImageIcon) {
      return `
        <div class="client-logo-item" title="${escapeHtml(cli.name)} - ${escapeHtml(cli.category)}">
          <img src="${cli.icon}" alt="${escapeHtml(cli.name)}">
        </div>
      `;
    }
    return `
      <div class="client-logo-item" title="${escapeHtml(cli.name)} - ${escapeHtml(cli.category)}">
        <div class="client-logo-fallback">
          <i class="fa-solid ${cli.icon || 'fa-building'}"></i>
          <span>${escapeHtml(cli.name)}</span>
        </div>
      </div>
    `;
  }

  // Duplicate items 4x for continuous seamless marquee animation
  const track1Logos = [...row1Clients, ...row1Clients, ...row1Clients, ...row1Clients];
  const track2Logos = [...row2Clients, ...row2Clients, ...row2Clients, ...row2Clients];

  if (track1) track1.innerHTML = track1Logos.map(buildLogoHtml).join('');
  if (track2) track2.innerHTML = track2Logos.map(buildLogoHtml).join('');
}

function renderServices() {
  const container = document.getElementById('services-grid-container');
  if (!container) return;

  const EN_SRV_MAP = {
    "Application & Software Development": {
      title: "Application & Software Development",
      desc: "Custom Enterprise Software, ERP/CRM, Web & Mobile Apps, BI & API Gateway Integration."
    },
    "System Infrastructure & Architecture": {
      title: "System Infrastructure & Architecture",
      desc: "High Availability Server Management, Hybrid Cloud Migration, Virtualization & IT Security Audit."
    },
    "Network Design & Managed Services": {
      title: "Network Design & Managed Services",
      desc: "Enterprise Network Topology Design, Next-Gen Firewall/VPN, 24/7 NOC Monitoring & Managed IT Services."
    }
  };

  container.innerHTML = appState.services.map(srv => {
    const title = currentLang === 'en' && EN_SRV_MAP[srv.title] ? EN_SRV_MAP[srv.title].title : srv.title;
    const desc = currentLang === 'en' && EN_SRV_MAP[srv.title] ? EN_SRV_MAP[srv.title].desc : srv.shortDesc;
    return `
      <div class="glass-card service-card">
        <div class="service-icon-box">
          <i class="fa-solid ${srv.icon || 'fa-shield-halved'}"></i>
        </div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(desc)}</p>
        <ul class="service-features-list">
          ${(srv.features || []).map(f => `<li><i class="fa-solid fa-check"></i> ${escapeHtml(f)}</li>`).join('')}
        </ul>
      </div>
    `;
  }).join('');
}

function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-grid-container');
  if (!container) return;

  const filtered = filter === 'all' 
    ? appState.projects 
    : appState.projects.filter(p => p.category === filter);

  const EN_PRJ_MAP = {
    "prj-1": {
      title: "Enterprise Learning Management System (LMS) Implementation",
      impact: "Facilitated interactive digital learning for tens of thousands of personnel & educators.",
      desc: "Integrated LMS platform design with participant performance analytics module and self-paced learning portal."
    },
    "prj-2": {
      title: "Enterprise Network & Security Infrastructure Modernization",
      impact: "Boosted network uptime to 99.99% and strengthened defenses against cyber incidents.",
      desc: "Network topology audit, enterprise firewall & VPN hardening, and 24/7 NOC monitoring integration."
    },
    "prj-3": {
      title: "Custom ERP & Fleet Management System Implementation",
      impact: "Automated asset tracking and boosted supply chain efficiency by up to 35%.",
      desc: "Custom ERP module development and real-time fleet tracking system powered by IoT & API gateway."
    }
  };

  container.innerHTML = filtered.map(p => {
    const title = currentLang === 'en' && EN_PRJ_MAP[p.id] ? EN_PRJ_MAP[p.id].title : p.title;
    const desc = currentLang === 'en' && EN_PRJ_MAP[p.id] ? EN_PRJ_MAP[p.id].desc : p.description;
    const impact = currentLang === 'en' && EN_PRJ_MAP[p.id] ? EN_PRJ_MAP[p.id].impact : p.impact;
    return `
      <div class="glass-card project-card">
        <div class="project-img-wrapper">
          <img src="${p.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}" alt="${escapeHtml(title)}">
          <span class="project-category-tag">${escapeHtml(p.category)}</span>
        </div>
        <div class="project-body">
          <span class="project-client">${escapeHtml(p.client)}</span>
          <h3>${escapeHtml(title)}</h3>
          <p style="font-size:0.875rem; margin-bottom:16px;">${escapeHtml(desc)}</p>
          <div class="project-impact-box">
            <i class="fa-solid fa-chart-line"></i> ${escapeHtml(impact)}
          </div>
        </div>
      </div>
    `;
  }).join('');
}


function renderTeam() {
  const container = document.getElementById('team-grid-container');
  if (!container) return;

  const EN_TEAM_MAP = {
    "tm-1": {
      role: "Managing Director / Principal Consultant",
      bio: "15+ years of experience leading enterprise digital transformation projects across Indonesia."
    },
    "tm-2": {
      role: "VP of System & Cloud Infrastructure",
      bio: "Senior architect specializing in high-availability server clusters, cloud migration, and disaster recovery."
    },
    "tm-3": {
      role: "Head of Network & Cybersecurity",
      bio: "Certified CISSP expert managing NOC operations, enterprise VPN/Firewalls, and security audits."
    }
  };

  container.innerHTML = appState.team.map(m => {
    const role = currentLang === 'en' && EN_TEAM_MAP[m.id] ? EN_TEAM_MAP[m.id].role : m.role;
    const bio = currentLang === 'en' && EN_TEAM_MAP[m.id] ? EN_TEAM_MAP[m.id].bio : m.bio;
    return `
      <div class="glass-card team-card">
        <div class="team-photo-wrap">
          <img src="${m.image}" alt="${escapeHtml(m.name)}">
        </div>
        <h3>${escapeHtml(m.name)}</h3>
        <p class="role">${escapeHtml(role)}</p>
        <p class="bio">${escapeHtml(bio)}</p>
      </div>
    `;
  }).join('');
}

function renderArticles() {
  const container = document.getElementById('articles-grid-container');
  if (!container) return;

  const published = appState.articles.filter(a => a.status !== 'draft');
  const btnLabel = currentLang === 'en' ? 'Read Full Article' : 'Baca Selengkapnya';

  const EN_ARTICLES_MAP = {
    "art-1": {
      title: "The Importance of Synergizing Three Pillars of Enterprise IT: Application, System, and Network",
      excerpt: "How to synergize system infrastructure, secure networking, and business applications for sustainable growth in the digital transformation era."
    },
    "art-2": {
      title: "Cloud Native Migration Strategy & Enterprise Server Resiliency Management",
      excerpt: "A tactical guide for organizations moving legacy server workloads to the cloud with zero downtime."
    }
  };

  container.innerHTML = published.map(a => {
    const title = currentLang === 'en' && EN_ARTICLES_MAP[a.id] ? EN_ARTICLES_MAP[a.id].title : a.title;
    const excerpt = currentLang === 'en' && EN_ARTICLES_MAP[a.id] ? EN_ARTICLES_MAP[a.id].excerpt : a.excerpt;
    return `
      <div class="glass-card article-card">
        <span class="badge" style="margin-bottom:12px;">${escapeHtml(a.category)}</span>
        <h3>${escapeHtml(title)}</h3>
        <div class="article-meta">
          <span><i class="fa-solid fa-user"></i> ${escapeHtml(a.author)}</span>
          <span><i class="fa-solid fa-calendar"></i> ${escapeHtml(a.date)}</span>
        </div>
        <p style="font-size:0.9rem; margin-bottom:20px;">${escapeHtml(excerpt)}</p>
        <button class="btn btn-outline btn-sm" onclick="viewArticleDetails('${a.id}')">
          ${btnLabel} <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    `;
  }).join('');
}

function updateCompanyStats() {
  if (appState.company && appState.company.stats) {
    const s = appState.company.stats;
    const elEst = document.getElementById('stat-est');
    const elExp = document.getElementById('stat-exp');
    const elCli = document.getElementById('stat-clients-count');
    const elPil = document.getElementById('stat-pillars');

    if (elEst) elEst.textContent = s.estYear || '2017';
    if (elExp) elExp.textContent = s.experienceYears || '15+';
    if (elCli) elCli.textContent = s.clients || '7+';
    if (elPil) elPil.textContent = s.mainPillars || '3';
  }
}

// Filter projects event listener
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.getAttribute('data-filter');
    renderProjects(filter);
  }
});

// ==========================================================================
// 3. INTERACTIVE HERO CANVAS ANIMATION
// ==========================================================================
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const numParticles = Math.min(60, Math.floor(width / 20));

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.12)' : 'rgba(0, 242, 254, 0.06)';
    ctx.lineWidth = 1;

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = isLight ? `rgba(2, 132, 199, ${p.alpha * 0.7})` : `rgba(0, 242, 254, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================================================
// 4. IT MATURITY ASSESSMENT CALCULATOR TOOL
// ==========================================================================
function initMaturityAssessment() {
  const q1 = document.getElementById('q1-slider');
  const q2 = document.getElementById('q2-slider');
  const q3 = document.getElementById('q3-slider');
  const scoreEl = document.getElementById('calculated-score');
  const statusEl = document.getElementById('score-status');
  const recEl = document.getElementById('score-recommendation');

  if (!q1 || !q2 || !q3) return;

  function updateScore() {
    document.getElementById('q1-val').textContent = `${q1.value}/5`;
    document.getElementById('q2-val').textContent = `${q2.value}/5`;
    document.getElementById('q3-val').textContent = `${q3.value}/5`;

    const avg = ((parseFloat(q1.value) + parseFloat(q2.value) + parseFloat(q3.value)) / 3).toFixed(1);
    if (scoreEl) scoreEl.textContent = avg;

    const isEn = currentLang === 'en';

    if (avg < 2.5) {
      if (statusEl) {
        statusEl.textContent = 'Initial / Ad-Hoc Level';
        statusEl.style.color = '#ef4444';
      }
      if (recEl) {
        recEl.textContent = isEn 
          ? 'IT governance is fragmented. Requires an urgent IT Master Plan and cybersecurity risk audit.'
          : 'Tata kelola TI perusahaan masih bersifat terfragmentasi. Memerlukan penyusunan IT Master Plan mendesak dan audit risiko siber.';
      }
    } else if (avg < 3.8) {
      if (statusEl) {
        statusEl.textContent = 'Defined & Managed Level';
        statusEl.style.color = 'var(--primary-cyan)';
      }
      if (recEl) {
        recEl.textContent = isEn
          ? 'Standard IT procedures are running well. The next step is ISO 27001 audit standardization and enterprise integration.'
          : 'Prosedur IT baku telah berjalan. Langkah berikutnya adalah standarisasi audit ISO 27001 dan kepatuhan UU PDP secara menyeluruh.';
      }
    } else {
      if (statusEl) {
        statusEl.textContent = 'Optimized Enterprise Level';
        statusEl.style.color = 'var(--accent-emerald)';
      }
      if (recEl) {
        recEl.textContent = isEn
          ? 'Your IT maturity is very high. Focus on AI-driven threat monitoring automation and continuous cloud integration.'
          : 'Kematangan TI Anda sangat tinggi. Fokus pada otomasi pemantauan ancaman siber berbasis AI dan integrasi arsitektur cloud kontinu.';
      }
    }
  }

  [q1, q2, q3].forEach(input => input.addEventListener('input', updateScore));
  updateScore();
}

// ==========================================================================
// 5. PUBLIC CONTACT FORM & LEADS HANDLER
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('public-contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const company = document.getElementById('contact-company').value;
    const email = document.getElementById('contact-user-email').value;
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value;

    const payload = { name, company, email, service, message };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.inquiry) {
          appState.inquiries.unshift(data.inquiry);
        }
      } else {
        throw new Error('Server non-200 response');
      }
    } catch (err) {
      console.warn('POST /api/inquiries gagal, fallback lokal:', err);
      const newInquiry = {
        id: 'inq-' + Date.now(),
        name,
        company,
        email,
        service,
        message,
        date: new Date().toISOString().slice(0, 10),
        status: 'unread'
      };
      appState.inquiries.unshift(newInquiry);
    }

    saveDataStore();
    renderCMSInquiries();

    showToast('Terima kasih! Pesan Anda berhasil dikirim ke tim konsultan kami.', 'success');
    form.reset();
  });
}

// ==========================================================================
// 6. ADMIN AUTHENTICATION ENGINE
// ==========================================================================
function getAdminToken() {
  return sessionStorage.getItem('ask_admin_token') || localStorage.getItem('ask_admin_token');
}

function setAdminToken(token, remember = true) {
  if (remember) {
    localStorage.setItem('ask_admin_token', token);
  } else {
    sessionStorage.setItem('ask_admin_token', token);
  }
}

function clearAdminToken() {
  sessionStorage.removeItem('ask_admin_token');
  localStorage.removeItem('ask_admin_token');
}

async function isSessionValid() {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const res = await fetch(API_BASE + '/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    if (res.ok) {
      const data = await res.json();
      return data.valid;
    }
  } catch (err) {
    // If backend offline, consider local token valid
    return true;
  }
  return false;
}

function initAdminAuth() {
  const loginModal = document.getElementById('admin-login-modal');
  const loginForm = document.getElementById('admin-login-form');
  const alertBox = document.getElementById('login-alert-box');
  const togglePassBtn = document.getElementById('toggle-password-btn');
  const togglePassIcon = document.getElementById('toggle-password-icon');
  const passInput = document.getElementById('admin-password');
  const closeLoginBtn = document.getElementById('close-login-btn');
  const logoutBtn = document.getElementById('btn-admin-logout');

  // Password visibility toggle
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passInput.setAttribute('type', type);
      if (togglePassIcon) {
        togglePassIcon.className = type === 'password' ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
      }
    });
  }

  // Close Login Modal
  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('active');
      cleanAdminUrl();
    });
  }

  // Admin Login Form Handler
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('admin-username')?.value || '';
      const password = passInput?.value || '';
      const remember = document.getElementById('remember-session')?.checked ?? true;
      const submitBtn = document.getElementById('btn-admin-login-submit');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Memverifikasi Autentikasi...`;
      }

      if (alertBox) alertBox.style.display = 'none';

      try {
        const res = await fetch(API_BASE + '/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setAdminToken(data.token, remember);
          
          if (alertBox) {
            alertBox.className = 'login-alert-box success';
            alertBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.message || 'Login Berhasil!'}`;
            alertBox.style.display = 'flex';
          }

          setTimeout(() => {
            loginModal?.classList.remove('active');
            cleanAdminUrl();
            openCMSPanelModal();
            showToast('Selamat datang kembali, Administrator CMS!', 'success');
          }, 600);
        } else {
          throw new Error(data.error || 'Username atau password salah.');
        }
      } catch (err) {
        // Fallback for offline / direct match verification
        if (username.trim().toLowerCase() === 'admin' && (password.trim() === 'askconsulting2026' || password.trim() === 'admin' || password.trim() === 'admin123')) {
          const fallbackToken = 'ask-fallback-token-' + Date.now();
          setAdminToken(fallbackToken, remember);

          if (alertBox) {
            alertBox.className = 'login-alert-box success';
            alertBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> Login Offline Admin Berhasil!`;
            alertBox.style.display = 'flex';
          }

          setTimeout(() => {
            loginModal?.classList.remove('active');
            cleanAdminUrl();
            openCMSPanelModal();
            showToast('Login Admin Berhasil (Modus Offline)!', 'success');
          }, 600);
        } else {
          if (alertBox) {
            alertBox.className = 'login-alert-box error';
            alertBox.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${err.message || 'Username atau password administrator salah.'}`;
            alertBox.style.display = 'flex';
          }
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> Masuk Ke Panel Admin CMS`;
        }
      }
    });
  }

  // Admin Logout Handler
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const token = getAdminToken();
      if (token) {
        try {
          await fetch(API_BASE + '/api/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
          });
        } catch (e) {
          // ignore
        }
      }

      clearAdminToken();
      document.getElementById('cms-modal')?.classList.remove('active');
      cleanAdminUrl();
      showToast('Logout Admin Berhasil. Sesi telah diakhiri secara aman.', 'info');
    });
  }
}

const API_BASE = window.location.protocol === 'file:' ? 'http://localhost:5000' : '';

function cleanAdminUrl() {
  if (window.location.pathname.includes('adminlogin') || window.location.hash.includes('adminlogin')) {
    window.history.pushState({}, '', '/');
  }
}

function openCMSPanelModal() {
  const cmsModal = document.getElementById('cms-modal');
  if (cmsModal) {
    cmsModal.classList.add('active');
    renderCMSCompany();
    renderCMSAdvantages();
    renderCMSClients();
    renderCMSTeam();
    renderCMSArticles();
    renderCMSProjects();
    renderCMSServices();
    renderCMSInquiries();
    renderCMSMedia();
  }
}

async function openAdminModal() {
  const valid = await isSessionValid();
  if (valid) {
    openCMSPanelModal();
  } else {
    const loginModal = document.getElementById('admin-login-modal');
    if (loginModal) loginModal.classList.add('active');
  }
}

function checkAdminLoginRoute() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path.includes('adminlogin') || hash === '#adminlogin') {
    openAdminModal();
  }
}

// Global Keyboard Shortcut: Ctrl + Shift + A to open Admin Login Popup anytime
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
    e.preventDefault();
    openAdminModal();
  }
});

// Listen to route and hash changes for /adminlogin
window.addEventListener('hashchange', checkAdminLoginRoute);
window.addEventListener('popstate', checkAdminLoginRoute);

// Upload Image File Helper to Server / Base64 Data URL Fallback
async function uploadImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target.result;
      try {
        const res = await fetch(API_BASE + '/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data, filename: file.name })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            const fullUrl = data.url.startsWith('/') ? (API_BASE + data.url) : data.url;
            resolve(fullUrl);
            return;
          }
        }
      } catch (err) {
        console.warn('Backend upload REST API offline, fallback ke Base64 Data URL:', err);
      }
      resolve(base64Data);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Universal Form Field Image Upload Handler
async function handleFormFieldImageUpload(event, targetInputId, previewImgId) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    showToast('Mengunggah berkas gambar dari komputer...', 'info');
    const url = await uploadImageFile(file);

    const targetInput = document.getElementById(targetInputId);
    if (targetInput) targetInput.value = url;

    if (previewImgId) {
      const previewImg = document.getElementById(previewImgId);
      if (previewImg) {
        previewImg.src = url;
        previewImg.style.display = 'block';
      }
    }
    showToast('Gambar berhasil diunggah dan terpasang!', 'success');
  } catch (err) {
    showToast('Gagal mengunggah berkas gambar.', 'error');
  }
}

function initMediaUploaders() {
  const inputBrandLogo = document.getElementById('input-brand-logo');
  const inputGeneralImage = document.getElementById('input-general-image');

  if (inputBrandLogo) {
    inputBrandLogo.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        showToast('Mengunggah berkas logo...', 'info');
        const url = await uploadImageFile(file);

        if (!appState.company) appState.company = {};
        appState.company.logo = url;
        saveDataStore();
        renderPublicView();

        const previewWrap = document.getElementById('brand-logo-preview-wrap');
        const previewImg = document.getElementById('brand-logo-preview');
        const urlText = document.getElementById('brand-logo-url-text');

        if (previewImg) previewImg.src = url;
        if (urlText) urlText.textContent = url;
        if (previewWrap) previewWrap.style.display = 'flex';

        showToast('Logo perusahaan berhasil diunggah & disimpan!', 'success');
        renderCMSMedia();
      } catch (err) {
        showToast('Gagal mengunggah logo perusahaan.', 'error');
      }
    });
  }

  if (inputGeneralImage) {
    inputGeneralImage.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        showToast('Mengunggah gambar ke server...', 'info');
        const url = await uploadImageFile(file);

        if (!Array.isArray(appState.media)) appState.media = [];
        appState.media.unshift({
          id: 'med-' + Date.now(),
          url: url,
          name: file.name,
          date: new Date().toISOString().slice(0, 10)
        });
        saveDataStore();

        const previewWrap = document.getElementById('general-image-preview-wrap');
        const previewImg = document.getElementById('general-image-preview');
        const urlInput = document.getElementById('general-image-url-input');

        if (previewImg) previewImg.src = url;
        if (urlInput) urlInput.value = url;
        if (previewWrap) previewWrap.style.display = 'flex';

        showToast('Gambar berhasil diunggah!', 'success');
        renderCMSMedia();
      } catch (err) {
        showToast('Gagal mengunggah gambar.', 'error');
      }
    });
  }
}

function renderCMSMedia() {
  const container = document.getElementById('media-gallery-grid');
  if (!container) return;

  const mediaList = appState.media || [];
  if (mediaList.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); font-size: 0.875rem;">Belum ada berkas media terunggah. Gunakan uploader di atas untuk menambah logo / gambar baru.</p>`;
    return;
  }

  container.innerHTML = mediaList.map(m => `
    <div class="glass-card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px;">
      <img src="${m.url}" alt="${escapeHtml(m.name)}" style="width: 100%; height: 110px; object-fit: cover; border-radius: var(--radius-sm);">
      <p style="font-size: 0.75rem; font-weight: 600; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; margin: 0;">${escapeHtml(m.name)}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
        <button class="btn btn-outline btn-sm" style="font-size: 0.7rem; padding: 2px 8px;" onclick="navigator.clipboard.writeText('${m.url}'); showToast('URL Disalin!', 'info');">
          <i class="fa-solid fa-copy"></i> Salin URL
        </button>
        <button class="icon-action-btn delete" style="width: 26px; height: 26px; font-size: 0.75rem;" onclick="deleteCMSMedia('${m.id}')" title="Hapus"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function deleteCMSMedia(id) {
  if (confirm('Hapus gambar ini dari galeri media?')) {
    appState.media = (appState.media || []).filter(m => m.id !== id);
    saveDataStore();
    renderCMSMedia();
    showToast('Media terhapus.', 'info');
  }
}

// ==========================================================================
// 6.5 CMS ADMIN MODAL & TAB ENGINE
// ==========================================================================
function initNavigationAndModals() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const cmsModal = document.getElementById('cms-modal');
  const loginModal = document.getElementById('admin-login-modal');
  const openCmsBtn = document.getElementById('open-cms-btn');
  const closeCmsBtn = document.getElementById('close-cms-btn');

  if (openCmsBtn) {
    openCmsBtn.addEventListener('click', async () => {
      const valid = await isSessionValid();
      if (valid) {
        openCMSPanelModal();
      } else {
        if (loginModal) loginModal.classList.add('active');
      }
    });
  }

  if (closeCmsBtn && cmsModal) {
    closeCmsBtn.addEventListener('click', () => {
      cmsModal.classList.remove('active');
    });
  }

  // Close modal when clicking background overlay
  [cmsModal, loginModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // CMS Tabs switching logic
  const tabBtns = document.querySelectorAll('.cms-tab-btn');
  const tabContents = document.querySelectorAll('.cms-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      const targetEl = document.getElementById(target);
      if (targetEl) targetEl.classList.add('active');
    });
  });
}

function initCMSPanel() {
  // Profil Company listener
  const compForm = document.getElementById('cms-company-form');
  if (compForm) {
    compForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveCompanySettings();
    });
  }

  // Add item listeners
  document.getElementById('btn-add-advantage')?.addEventListener('click', () => openAdvantageEditor());
  document.getElementById('btn-add-client')?.addEventListener('click', () => openClientEditor());
  document.getElementById('btn-add-team')?.addEventListener('click', () => openTeamEditor());
  document.getElementById('btn-add-article')?.addEventListener('click', () => openArticleEditor());
  document.getElementById('btn-add-project')?.addEventListener('click', () => openProjectEditor());
  document.getElementById('btn-add-service')?.addEventListener('click', () => openServiceEditor());
  
  // Media uploaders listener
  initMediaUploaders();

  // Backup & Reset listeners
  document.getElementById('btn-export-json')?.addEventListener('click', exportDataJSON);
  document.getElementById('btn-reset-default')?.addEventListener('click', resetDefaultData);

  document.getElementById('close-editor-btn')?.addEventListener('click', () => {
    document.getElementById('editor-modal')?.classList.remove('active');
  });
}

// --------------------------------------------------------------------------
// CMS PROFIL PERUSAHAAN & HERO SETTINGS
// --------------------------------------------------------------------------
function renderCMSCompany() {
  const c = appState.company || {};
  const s = c.stats || {};

  const nameEl = document.getElementById('cms-comp-name');
  const legalEl = document.getElementById('cms-comp-legal');
  const tagEl = document.getElementById('cms-comp-tagline');
  const descEl = document.getElementById('cms-comp-desc');
  const missEl = document.getElementById('cms-comp-mission');
  const visEl = document.getElementById('cms-comp-vision');
  const phoneEl = document.getElementById('cms-comp-phone');
  const contactEl = document.getElementById('cms-comp-contact');
  const emailEl = document.getElementById('cms-comp-email');
  const addrEl = document.getElementById('cms-comp-address');
  const web1El = document.getElementById('cms-comp-web1');
  const web2El = document.getElementById('cms-comp-web2');

  const estEl = document.getElementById('cms-stat-est');
  const expEl = document.getElementById('cms-stat-exp');
  const cliEl = document.getElementById('cms-stat-clients');
  const pilEl = document.getElementById('cms-stat-pillars');

  if (nameEl) nameEl.value = c.name || '';
  if (legalEl) legalEl.value = c.legalName || '';
  if (tagEl) tagEl.value = c.tagline || '';
  if (descEl) descEl.value = c.description || '';
  if (missEl) missEl.value = c.mission || '';
  if (visEl) visEl.value = c.vision || '';
  if (phoneEl) phoneEl.value = c.phone || '';
  if (contactEl) contactEl.value = c.contactPerson || '';
  if (emailEl) emailEl.value = c.email || '';
  if (addrEl) addrEl.value = c.address || '';
  if (web1El) web1El.value = c.website || '';
  if (web2El) web2El.value = c.websiteSecondary || '';

  if (estEl) estEl.value = s.estYear || '2017';
  if (expEl) expEl.value = s.experienceYears || '15+';
  if (cliEl) cliEl.value = s.clients || '7+';
  if (pilEl) pilEl.value = s.mainPillars || '3';
}

function saveCompanySettings() {
  if (!appState.company) appState.company = {};

  appState.company.name = document.getElementById('cms-comp-name').value;
  appState.company.legalName = document.getElementById('cms-comp-legal').value;
  appState.company.tagline = document.getElementById('cms-comp-tagline').value;
  appState.company.description = document.getElementById('cms-comp-desc').value;
  appState.company.mission = document.getElementById('cms-comp-mission').value;
  appState.company.vision = document.getElementById('cms-comp-vision').value;
  appState.company.phone = document.getElementById('cms-comp-phone').value;
  appState.company.contactPerson = document.getElementById('cms-comp-contact').value;
  appState.company.email = document.getElementById('cms-comp-email').value;
  appState.company.address = document.getElementById('cms-comp-address').value;
  appState.company.website = document.getElementById('cms-comp-web1').value;
  appState.company.websiteSecondary = document.getElementById('cms-comp-web2').value;

  appState.company.stats = {
    estYear: document.getElementById('cms-stat-est').value,
    experienceYears: document.getElementById('cms-stat-exp').value,
    clients: document.getElementById('cms-stat-clients').value,
    mainPillars: document.getElementById('cms-stat-pillars').value
  };

  saveDataStore();
  renderPublicView();
  showToast('Pengaturan profil perusahaan & hero berhasil disimpan!', 'success');
}

// --------------------------------------------------------------------------
// CMS KEUNGGULAN (ADVANTAGES) CRUD
// --------------------------------------------------------------------------
function renderCMSAdvantages() {
  const container = document.getElementById('cms-advantages-list');
  if (!container) return;

  const advs = appState.advantages || [];
  container.innerHTML = advs.map(a => `
    <tr>
      <td><i class="fa-solid ${a.icon || 'fa-check'}"></i></td>
      <td><strong>${escapeHtml(a.title)}</strong></td>
      <td>${escapeHtml(a.description)}</td>
      <td>
        <div class="table-actions">
          <button class="icon-action-btn edit" onclick="openAdvantageEditor('${a.id}')"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-action-btn delete" onclick="deleteAdvantage('${a.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAdvantageEditor(advId = null) {
  const adv = advId ? (appState.advantages || []).find(a => a.id === advId) : null;
  const modal = document.getElementById('editor-modal');
  const title = document.getElementById('editor-modal-title');
  const form = document.getElementById('cms-generic-form');

  title.textContent = adv ? 'Edit Keunggulan' : 'Tambah Keunggulan Baru';

  form.innerHTML = `
    <div class="form-group">
      <label>Judul Keunggulan</label>
      <input type="text" id="edt-adv-title" class="text-input" value="${adv ? escapeHtml(adv.title) : ''}" required>
    </div>
    <div class="form-group">
      <label>Icon Class FontAwesome</label>
      <input type="text" id="edt-adv-icon" class="text-input" value="${adv ? escapeHtml(adv.icon) : 'fa-circle-check'}" required>
    </div>
    <div class="form-group">
      <label>Deskripsi Penjelasan</label>
      <textarea id="edt-adv-desc" class="textarea-input" rows="3" required>${adv ? escapeHtml(adv.description) : ''}</textarea>
    </div>
    <button type="submit" class="btn btn-primary" style="margin-top:12px;">
      <i class="fa-solid fa-save"></i> Simpan Keunggulan
    </button>
  `;

  form.onsubmit = (e) => {
    e.preventDefault();
    if (!Array.isArray(appState.advantages)) appState.advantages = [];

    if (adv) {
      adv.title = document.getElementById('edt-adv-title').value;
      adv.icon = document.getElementById('edt-adv-icon').value;
      adv.description = document.getElementById('edt-adv-desc').value;
    } else {
      appState.advantages.push({
        id: 'adv-' + Date.now(),
        title: document.getElementById('edt-adv-title').value,
        icon: document.getElementById('edt-adv-icon').value,
        description: document.getElementById('edt-adv-desc').value
      });
    }

    saveDataStore();
    renderCMSAdvantages();
    renderAdvantages();
    modal.classList.remove('active');
    showToast('Keunggulan berhasil disimpan!', 'success');
  };

  modal.classList.add('active');
}

function deleteAdvantage(id) {
  if (confirm('Hapus keunggulan ini?')) {
    appState.advantages = (appState.advantages || []).filter(a => a.id !== id);
    saveDataStore();
    renderCMSAdvantages();
    renderAdvantages();
    showToast('Keunggulan terhapus.', 'info');
  }
}

// --------------------------------------------------------------------------
// CMS KLIEN KORPORASI CRUD (WITH LOGO UPLOAD)
// --------------------------------------------------------------------------
function renderCMSClients() {
  const container = document.getElementById('cms-clients-list');
  if (!container) return;

  const clients = appState.clients || [];
  container.innerHTML = clients.map(c => `
    <tr>
      <td><i class="fa-solid ${c.icon || 'fa-building'}"></i></td>
      <td><strong>${escapeHtml(c.name)}</strong></td>
      <td><span class="badge" style="font-size:0.75rem;">${escapeHtml(c.category)}</span></td>
      <td>${escapeHtml(c.description)}</td>
      <td>
        <div class="table-actions">
          <button class="icon-action-btn edit" onclick="openClientEditor('${c.id}')"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-action-btn delete" onclick="deleteClient('${c.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openClientEditor(clientId = null) {
  const cli = clientId ? (appState.clients || []).find(c => c.id === clientId) : null;
  const modal = document.getElementById('editor-modal');
  const title = document.getElementById('editor-modal-title');
  const form = document.getElementById('cms-generic-form');

  title.textContent = cli ? 'Edit Klien Korporasi' : 'Tambah Klien Korporasi Baru';

  form.innerHTML = `
    <div class="form-group">
      <label>Nama Klien / Institusi</label>
      <input type="text" id="edt-cli-name" class="text-input" value="${cli ? escapeHtml(cli.name) : ''}" required>
    </div>
    <div class="form-group">
      <label>Kategori Sektor</label>
      <input type="text" id="edt-cli-category" class="text-input" value="${cli ? escapeHtml(cli.category) : 'Pemerintahan'}" required>
    </div>
    <div class="form-group">
      <label>Icon FontAwesome atau URL Logo</label>
      <div style="display:flex; gap:10px; align-items:center;">
        <input type="text" id="edt-cli-icon" class="text-input" value="${cli ? escapeHtml(cli.icon) : 'fa-building'}" required>
        <input type="file" id="file-cli-logo" accept="image/*" style="display:none;" onchange="handleFormFieldImageUpload(event, 'edt-cli-icon', 'preview-cli-logo')">
        <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('file-cli-logo').click()" style="white-space:nowrap;">
          <i class="fa-solid fa-upload"></i> Upload Logo
        </button>
      </div>
      <img id="preview-cli-logo" src="${cli && cli.icon && cli.icon.startsWith('http') ? cli.icon : ''}" style="max-height:50px; margin-top:8px; border-radius:4px; display:${cli && cli.icon && cli.icon.startsWith('http') ? 'block' : 'none'};">
    </div>
    <div class="form-group">
      <label>Deskripsi Kerjasama Proyek</label>
      <textarea id="edt-cli-desc" class="textarea-input" rows="3" required>${cli ? escapeHtml(cli.description) : ''}</textarea>
    </div>
    <button type="submit" class="btn btn-primary" style="margin-top:12px;">
      <i class="fa-solid fa-save"></i> Simpan Data Klien
    </button>
  `;

  form.onsubmit = (e) => {
    e.preventDefault();
    if (!Array.isArray(appState.clients)) appState.clients = [];

    if (cli) {
      cli.name = document.getElementById('edt-cli-name').value;
      cli.category = document.getElementById('edt-cli-category').value;
      cli.icon = document.getElementById('edt-cli-icon').value;
      cli.description = document.getElementById('edt-cli-desc').value;
    } else {
      appState.clients.push({
        id: 'cli-' + Date.now(),
        name: document.getElementById('edt-cli-name').value,
        category: document.getElementById('edt-cli-category').value,
        icon: document.getElementById('edt-cli-icon').value,
        description: document.getElementById('edt-cli-desc').value
      });
    }

    saveDataStore();
    renderCMSClients();
    renderClientsGrid();
    modal.classList.remove('active');
    showToast('Data klien berhasil disimpan!', 'success');
  };

  modal.classList.add('active');
}

function deleteClient(id) {
  if (confirm('Hapus data klien ini?')) {
    appState.clients = (appState.clients || []).filter(c => c.id !== id);
    saveDataStore();
    renderCMSClients();
    renderClientsGrid();
    showToast('Klien terhapus.', 'info');
  }
}

// --------------------------------------------------------------------------
// CMS TIM PAKAR CRUD (WITH PHOTO UPLOAD)
// --------------------------------------------------------------------------
function renderCMSTeam() {
  const container = document.getElementById('cms-team-list');
  if (!container) return;

  const team = appState.team || [];
  container.innerHTML = team.map(m => `
    <tr>
      <td><img src="${m.image}" alt="${escapeHtml(m.name)}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;"></td>
      <td><strong>${escapeHtml(m.name)}</strong></td>
      <td>${escapeHtml(m.role)}</td>
      <td>${escapeHtml(m.bio)}</td>
      <td>
        <div class="table-actions">
          <button class="icon-action-btn edit" onclick="openTeamEditor('${m.id}')"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-action-btn delete" onclick="deleteTeam('${m.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openTeamEditor(memberId = null) {
  const m = memberId ? (appState.team || []).find(tm => tm.id === memberId) : null;
  const modal = document.getElementById('editor-modal');
  const title = document.getElementById('editor-modal-title');
  const form = document.getElementById('cms-generic-form');

  title.textContent = m ? 'Edit Anggota Tim Pakar' : 'Tambah Anggota Tim Pakar Baru';

  form.innerHTML = `
    <div class="form-group">
      <label>Nama Lengkap & Gelar</label>
      <input type="text" id="edt-tm-name" class="text-input" value="${m ? escapeHtml(m.name) : ''}" required>
    </div>
    <div class="form-group">
      <label>Jabatan / Peran Utama (Role)</label>
      <input type="text" id="edt-tm-role" class="text-input" value="${m ? escapeHtml(m.role) : ''}" required>
    </div>
    <div class="form-group">
      <label>Foto Anggota Tim</label>
      <div style="display:flex; gap:10px; align-items:center;">
        <input type="text" id="edt-tm-img" class="text-input" value="${m ? escapeHtml(m.image) : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}" required>
        <input type="file" id="file-tm-photo" accept="image/*" style="display:none;" onchange="handleFormFieldImageUpload(event, 'edt-tm-img', 'preview-tm-photo')">
        <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('file-tm-photo').click()" style="white-space:nowrap;">
          <i class="fa-solid fa-upload"></i> Upload Foto
        </button>
      </div>
      <img id="preview-tm-photo" src="${m ? m.image : ''}" style="max-height:70px; margin-top:8px; border-radius:6px; display:${m ? 'block' : 'none'};">
    </div>
    <div class="form-group">
      <label>Bio & Pengalaman Singkat</label>
      <textarea id="edt-tm-bio" class="textarea-input" rows="3" required>${m ? escapeHtml(m.bio) : ''}</textarea>
    </div>
    <button type="submit" class="btn btn-primary" style="margin-top:12px;">
      <i class="fa-solid fa-save"></i> Simpan Data Tim
    </button>
  `;

  form.onsubmit = (e) => {
    e.preventDefault();
    if (!Array.isArray(appState.team)) appState.team = [];

    if (m) {
      m.name = document.getElementById('edt-tm-name').value;
      m.role = document.getElementById('edt-tm-role').value;
      m.image = document.getElementById('edt-tm-img').value;
      m.bio = document.getElementById('edt-tm-bio').value;
    } else {
      appState.team.push({
        id: 'tm-' + Date.now(),
        name: document.getElementById('edt-tm-name').value,
        role: document.getElementById('edt-tm-role').value,
        image: document.getElementById('edt-tm-img').value,
        bio: document.getElementById('edt-tm-bio').value
      });
    }

    saveDataStore();
    renderCMSTeam();
    renderTeam();
    modal.classList.remove('active');
    showToast('Data anggota tim berhasil disimpan!', 'success');
  };

  modal.classList.add('active');
}

function deleteTeam(id) {
  if (confirm('Hapus anggota tim ini?')) {
    appState.team = (appState.team || []).filter(tm => tm.id !== id);
    saveDataStore();
    renderCMSTeam();
    renderTeam();
    showToast('Anggota tim dihapus.', 'info');
  }
}

// CMS Articles Renderer & CRUD
function renderCMSArticles() {
  const container = document.getElementById('cms-articles-list');
  if (!container) return;

  container.innerHTML = appState.articles.map(a => `
    <tr>
      <td><strong>${escapeHtml(a.title)}</strong></td>
      <td><span class="badge" style="font-size:0.75rem;">${escapeHtml(a.category)}</span></td>
      <td>${escapeHtml(a.author)}</td>
      <td>${escapeHtml(a.date)}</td>
      <td>
        <div class="table-actions">
          <button class="icon-action-btn edit" onclick="openArticleEditor('${a.id}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-action-btn delete" onclick="deleteArticle('${a.id}')" title="Hapus"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openArticleEditor(articleId = null) {
  const article = articleId ? appState.articles.find(a => a.id === articleId) : null;
  const modal = document.getElementById('editor-modal');
  const title = document.getElementById('editor-modal-title');
  const form = document.getElementById('cms-generic-form');

  title.textContent = article ? 'Edit Artikel Insight' : 'Tambah Artikel Insight Baru';

  form.innerHTML = `
    <div class="form-group">
      <label>Judul Artikel</label>
      <input type="text" id="edt-art-title" class="text-input" value="${article ? escapeHtml(article.title) : ''}" required>
    </div>
    <div class="form-group">
      <label>Kategori</label>
      <input type="text" id="edt-art-category" class="text-input" value="${article ? escapeHtml(article.category) : 'IT Governance'}" required>
    </div>
    <div class="form-group">
      <label>Penulis / Author</label>
      <input type="text" id="edt-art-author" class="text-input" value="${article ? escapeHtml(article.author) : 'Prof. Richardus Eko Indrajit'}" required>
    </div>
    <div class="form-group">
      <label>Gambar Sampul Artikel</label>
      <div style="display:flex; gap:10px; align-items:center;">
        <input type="text" id="edt-art-image" class="text-input" value="${article ? escapeHtml(article.image || '') : ''}" placeholder="URL Gambar atau Upload...">
        <input type="file" id="file-art-img" accept="image/*" style="display:none;" onchange="handleFormFieldImageUpload(event, 'edt-art-image', 'preview-art-img')">
        <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('file-art-img').click()" style="white-space:nowrap;">
          <i class="fa-solid fa-upload"></i> Upload Gambar
        </button>
      </div>
      <img id="preview-art-img" src="${article ? (article.image || '') : ''}" style="max-height:70px; margin-top:8px; border-radius:6px; display:${article && article.image ? 'block' : 'none'};">
    </div>
    <div class="form-group">
      <label>Ringkasan (Excerpt)</label>
      <textarea id="edt-art-excerpt" class="textarea-input" rows="2" required>${article ? escapeHtml(article.excerpt) : ''}</textarea>
    </div>
    <div class="form-group">
      <label>Konten Lengkap</label>
      <textarea id="edt-art-content" class="textarea-input" rows="6" required>${article ? escapeHtml(article.content) : ''}</textarea>
    </div>
    <button type="submit" class="btn btn-primary" style="margin-top:12px;">
      <i class="fa-solid fa-save"></i> Simpan Artikel
    </button>
  `;

  form.onsubmit = (e) => {
    e.preventDefault();
    if (article) {
      article.title = document.getElementById('edt-art-title').value;
      article.category = document.getElementById('edt-art-category').value;
      article.author = document.getElementById('edt-art-author').value;
      article.image = document.getElementById('edt-art-image').value;
      article.excerpt = document.getElementById('edt-art-excerpt').value;
      article.content = document.getElementById('edt-art-content').value;
    } else {
      appState.articles.unshift({
        id: 'art-' + Date.now(),
        title: document.getElementById('edt-art-title').value,
        category: document.getElementById('edt-art-category').value,
        author: document.getElementById('edt-art-author').value,
        image: document.getElementById('edt-art-image').value || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        date: new Date().toISOString().slice(0, 10),
        status: 'published',
        excerpt: document.getElementById('edt-art-excerpt').value,
        content: document.getElementById('edt-art-content').value
      });
    }

    saveDataStore();
    renderCMSArticles();
    renderArticles();
    modal.classList.remove('active');
    showToast('Artikel berhasil disimpan!', 'success');
  };

  modal.classList.add('active');
}

function deleteArticle(id) {
  if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
    appState.articles = appState.articles.filter(a => a.id !== id);
    saveDataStore();
    renderCMSArticles();
    renderArticles();
    showToast('Artikel berhasil dihapus.', 'info');
  }
}

// CMS Projects Renderer & CRUD
function renderCMSProjects() {
  const container = document.getElementById('cms-projects-list');
  if (!container) return;

  container.innerHTML = appState.projects.map(p => `
    <tr>
      <td><strong>${escapeHtml(p.title)}</strong></td>
      <td>${escapeHtml(p.client)}</td>
      <td><span class="badge" style="font-size:0.75rem;">${escapeHtml(p.category)}</span></td>
      <td style="color:var(--accent-emerald); font-size:0.85rem;">${escapeHtml(p.impact)}</td>
      <td>
        <div class="table-actions">
          <button class="icon-action-btn edit" onclick="openProjectEditor('${p.id}')"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-action-btn delete" onclick="deleteProject('${p.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openProjectEditor(projectId = null) {
  const project = projectId ? appState.projects.find(p => p.id === projectId) : null;
  const modal = document.getElementById('editor-modal');
  const title = document.getElementById('editor-modal-title');
  const form = document.getElementById('cms-generic-form');

  title.textContent = project ? 'Edit Case Study Proyek' : 'Tambah Case Study Baru';

  form.innerHTML = `
    <div class="form-group">
      <label>Judul Proyek</label>
      <input type="text" id="edt-prj-title" class="text-input" value="${project ? escapeHtml(project.title) : ''}" required>
    </div>
    <div class="form-group">
      <label>Nama Klien</label>
      <input type="text" id="edt-prj-client" class="text-input" value="${project ? escapeHtml(project.client) : ''}" required>
    </div>
    <div class="form-group">
      <label>Kategori Proyek</label>
      <select id="edt-prj-category" class="select-input">
        <option value="Governance" ${project && project.category === 'Governance' ? 'selected' : ''}>IT Governance</option>
        <option value="Security" ${project && project.category === 'Security' ? 'selected' : ''}>Cybersecurity</option>
        <option value="Transformation" ${project && project.category === 'Transformation' ? 'selected' : ''}>Transformation</option>
      </select>
    </div>
    <div class="form-group">
      <label>Gambar Sampul Proyek</label>
      <div style="display:flex; gap:10px; align-items:center;">
        <input type="text" id="edt-prj-image" class="text-input" value="${project ? escapeHtml(project.image || '') : ''}" placeholder="URL Gambar atau Upload...">
        <input type="file" id="file-prj-img" accept="image/*" style="display:none;" onchange="handleFormFieldImageUpload(event, 'edt-prj-image', 'preview-prj-img')">
        <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('file-prj-img').click()" style="white-space:nowrap;">
          <i class="fa-solid fa-upload"></i> Upload Foto Proyek
        </button>
      </div>
      <img id="preview-prj-img" src="${project ? (project.image || '') : ''}" style="max-height:70px; margin-top:8px; border-radius:6px; display:${project && project.image ? 'block' : 'none'};">
    </div>
    <div class="form-group">
      <label>Metrik Hasil & Dampak (Impact)</label>
      <input type="text" id="edt-prj-impact" class="text-input" value="${project ? escapeHtml(project.impact) : ''}" placeholder="Contoh: Efisiensi biaya 35%" required>
    </div>
    <div class="form-group">
      <label>Deskripsi Proyek</label>
      <textarea id="edt-prj-desc" class="textarea-input" rows="4" required>${project ? escapeHtml(project.description) : ''}</textarea>
    </div>
    <button type="submit" class="btn btn-primary" style="margin-top:12px;">
      <i class="fa-solid fa-save"></i> Simpan Proyek
    </button>
  `;

  form.onsubmit = (e) => {
    e.preventDefault();
    if (project) {
      project.title = document.getElementById('edt-prj-title').value;
      project.client = document.getElementById('edt-prj-client').value;
      project.category = document.getElementById('edt-prj-category').value;
      project.image = document.getElementById('edt-prj-image').value;
      project.impact = document.getElementById('edt-prj-impact').value;
      project.description = document.getElementById('edt-prj-desc').value;
    } else {
      appState.projects.unshift({
        id: 'prj-' + Date.now(),
        title: document.getElementById('edt-prj-title').value,
        client: document.getElementById('edt-prj-client').value,
        category: document.getElementById('edt-prj-category').value,
        year: '2026',
        image: document.getElementById('edt-prj-image').value || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        impact: document.getElementById('edt-prj-impact').value,
        description: document.getElementById('edt-prj-desc').value
      });
    }

    saveDataStore();
    renderCMSProjects();
    renderProjects('all');
    modal.classList.remove('active');
    showToast('Proyek berhasil disimpan!', 'success');
  };

  modal.classList.add('active');
}

function deleteProject(id) {
  if (confirm('Hapus proyek ini dari portofolio?')) {
    appState.projects = appState.projects.filter(p => p.id !== id);
    saveDataStore();
    renderCMSProjects();
    renderProjects('all');
    showToast('Proyek dihapus.', 'info');
  }
}

// CMS Services Renderer & CRUD
function renderCMSServices() {
  const container = document.getElementById('cms-services-list');
  if (!container) return;

  container.innerHTML = appState.services.map(s => `
    <tr>
      <td><i class="fa-solid ${s.icon}"></i></td>
      <td><strong>${escapeHtml(s.title)}</strong></td>
      <td><span class="badge" style="font-size:0.75rem;">${escapeHtml(s.category)}</span></td>
      <td>${escapeHtml(s.shortDesc)}</td>
      <td>
        <div class="table-actions">
          <button class="icon-action-btn edit" onclick="openServiceEditor('${s.id}')"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-action-btn delete" onclick="deleteService('${s.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openServiceEditor(serviceId = null) {
  const srv = serviceId ? appState.services.find(s => s.id === serviceId) : null;
  const modal = document.getElementById('editor-modal');
  const title = document.getElementById('editor-modal-title');
  const form = document.getElementById('cms-generic-form');

  title.textContent = srv ? 'Edit Layanan IT' : 'Tambah Layanan IT Baru';

  form.innerHTML = `
    <div class="form-group">
      <label>Nama Layanan</label>
      <input type="text" id="edt-srv-title" class="text-input" value="${srv ? escapeHtml(srv.title) : ''}" required>
    </div>
    <div class="form-group">
      <label>Class Icon FontAwesome</label>
      <input type="text" id="edt-srv-icon" class="text-input" value="${srv ? escapeHtml(srv.icon) : 'fa-shield-halved'}" required>
    </div>
    <div class="form-group">
      <label>Kategori</label>
      <input type="text" id="edt-srv-category" class="text-input" value="${srv ? escapeHtml(srv.category) : 'Governance'}" required>
    </div>
    <div class="form-group">
      <label>Deskripsi Singkat</label>
      <textarea id="edt-srv-desc" class="textarea-input" rows="3" required>${srv ? escapeHtml(srv.shortDesc) : ''}</textarea>
    </div>
    <button type="submit" class="btn btn-primary" style="margin-top:12px;">
      <i class="fa-solid fa-save"></i> Simpan Layanan
    </button>
  `;

  form.onsubmit = (e) => {
    e.preventDefault();
    if (srv) {
      srv.title = document.getElementById('edt-srv-title').value;
      srv.icon = document.getElementById('edt-srv-icon').value;
      srv.category = document.getElementById('edt-srv-category').value;
      srv.shortDesc = document.getElementById('edt-srv-desc').value;
    } else {
      appState.services.push({
        id: 'srv-' + Date.now(),
        title: document.getElementById('edt-srv-title').value,
        icon: document.getElementById('edt-srv-icon').value,
        category: document.getElementById('edt-srv-category').value,
        shortDesc: document.getElementById('edt-srv-desc').value,
        features: ["Standard ISO Compliance", "Executive Advisory"]
      });
    }

    saveDataStore();
    renderCMSServices();
    renderServices();
    modal.classList.remove('active');
    showToast('Layanan disimpan!', 'success');
  };

  modal.classList.add('active');
}

function deleteService(id) {
  if (confirm('Hapus layanan ini?')) {
    appState.services = appState.services.filter(s => s.id !== id);
    saveDataStore();
    renderCMSServices();
    renderServices();
    showToast('Layanan dihapus.', 'info');
  }
}

// CMS Inquiries Renderer
function renderCMSInquiries() {
  const container = document.getElementById('cms-inquiries-list');
  if (!container) return;

  container.innerHTML = appState.inquiries.map(inq => `
    <tr>
      <td style="font-size:0.8rem; color:var(--text-dim);">${inq.date}</td>
      <td><strong>${escapeHtml(inq.name)}</strong><br><span style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(inq.email)}</span></td>
      <td>${escapeHtml(inq.company)}</td>
      <td><span class="badge" style="font-size:0.75rem;">${escapeHtml(inq.service)}</span></td>
      <td><span style="color:${inq.status === 'unread' ? 'var(--primary-cyan)' : 'var(--text-dim)'};">${inq.status.toUpperCase()}</span></td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="viewInquiryDetail('${inq.id}')">Detail</button>
      </td>
    </tr>
  `).join('');
}

function viewInquiryDetail(id) {
  const inq = appState.inquiries.find(i => i.id === id);
  if (!inq) return;

  inq.status = 'read';
  saveDataStore();
  renderCMSInquiries();

  alert(`PESAN INQUIRY DARI: ${inq.name} (${inq.company})\nEmail: ${inq.email}\nLayanan Focus: ${inq.service}\n\nDetail Pesan:\n${inq.message}`);
}

function initArticleReaderModal() {
  const closeBtn = document.getElementById('close-reader-btn');
  const modal = document.getElementById('article-reader-modal');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
}

function shareArticle(type) {
  const url = window.location.href;
  const title = document.getElementById('reader-article-title')?.textContent || 'Artikel ASK Consulting';

  if (type === 'wa') {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' - ' + url)}`, '_blank');
  } else if (type === 'copy') {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    showToast('Link artikel berhasil disalin ke clipboard!', 'success');
  }
}

function viewArticleDetails(id) {
  const a = appState.articles.find(item => item.id === id);
  if (!a) return;

  const modal = document.getElementById('article-reader-modal');
  if (!modal) return;

  const EN_ARTICLES_FULL = {
    "art-1": {
      title: "The Importance of Synergizing Three Pillars of Enterprise IT: Application, System, and Network",
      category: "Enterprise IT Strategy",
      author: "Erick Dazki",
      content: "In a rapidly moving digital transformation era, enterprise organization success is not determined by adopting a single technology, but by how the entire IT ecosystem synergizes harmoniously.\n\nPT Andromeda Sinergi Komputasi (ASK Consulting) divides this technology foundation into three main pillars: Application, System, and Network.\n\n1. Application & Software Pillar: Custom apps, ERP, CRM, and portal systems are the front lines of business directly interacting with users. High-quality applications must be responsive, modular, and process business workflows accurately.\n\n2. System & Infrastructure Pillar: Advanced applications cannot sustain without high-performance servers and cloud architecture. Reliable infrastructure management ensures high availability, capacity scalability, and Disaster Recovery Plans (DRP).\n\n3. Network & Security Architecture Pillar: The network is the bloodstream of enterprise information. Multi-layer cybersecurity, data encryption, firewalls, and 24/7 NOC monitoring protect all communication traffic against cyber threats.\n\nSynergy between Application, System, and Network is the ultimate key for enterprises seeking long-term digital resilience."
    },
    "art-2": {
      title: "Cloud Native Migration Strategy & Enterprise Server Resiliency Management",
      category: "System & Cloud",
      author: "ASK Consulting Expert Team",
      content: "Migrating server infrastructure from on-premise environments to hybrid or cloud-native cloud is often a major challenge for corporate IT management. Risks of downtime and data loss are top concerns.\n\nHere are fundamental steps recommended by ASK Consulting expert consultants:\n\nStep 1 — Assessment & Dependency Mapping: Conduct a comprehensive audit of application interdependencies, database workloads, and running server specifications.\n\nStep 2 — Hybrid Cloud Architecture Design: Formulate cloud topology compliant with regulatory standards (such as ISO 27001), separating sensitive data from general compute workloads.\n\nStep 3 — Simulation Testing & Gradual Cutover: Utilize canary deployment strategies to ensure business operations run uninterrupted with zero downtime.\n\nWith thorough planning and expert guidance, cloud migration runs smoothly while slashing operational costs by up to 30%."
    }
  };

  const isEn = currentLang === 'en';
  const enData = EN_ARTICLES_FULL[a.id];

  const catTag = document.getElementById('reader-category-tag');
  const dateTxt = document.getElementById('reader-date-text');
  const readTimeTxt = document.getElementById('reader-read-time');
  const titleEl = document.getElementById('reader-article-title');
  const authorEl = document.getElementById('reader-author-name');
  const authorSubEl = document.getElementById('reader-author-sub');
  const imgEl = document.getElementById('reader-hero-image');
  const bodyEl = document.getElementById('reader-article-body');
  const shareBtnWa = document.getElementById('reader-share-wa');
  const shareBtnCopy = document.getElementById('reader-share-copy');
  const ctaTitle = document.getElementById('reader-cta-title');
  const ctaDesc = document.getElementById('reader-cta-desc');
  const ctaBtn = document.getElementById('reader-cta-btn');

  if (catTag) catTag.textContent = (isEn && enData?.category) ? enData.category : (a.category || 'Insights');
  if (dateTxt) dateTxt.innerHTML = `<i class="fa-regular fa-calendar"></i> ${a.date || '2026'}`;
  if (readTimeTxt) readTimeTxt.innerHTML = `<i class="fa-regular fa-clock"></i> ${isEn ? '5 Min Read' : '5 Menit Baca'}`;
  if (titleEl) titleEl.textContent = (isEn && enData?.title) ? enData.title : (a.title || '');
  if (authorEl) authorEl.textContent = (isEn && enData?.author) ? enData.author : (a.author || 'Tim Pakar ASK Consulting');
  if (authorSubEl) authorSubEl.textContent = isEn ? 'IT Consulting Expert Team — PT Andromeda Sinergi Komputasi' : 'Tim Pakar IT Consulting — PT Andromeda Sinergi Komputasi';

  if (shareBtnWa) shareBtnWa.innerHTML = `<i class="fa-brands fa-whatsapp" style="color: #25d366;"></i> ${isEn ? 'Share' : 'Bagikan'}`;
  if (shareBtnCopy) shareBtnCopy.innerHTML = `<i class="fa-solid fa-link" style="color: var(--primary-cyan);"></i> ${isEn ? 'Copy Link' : 'Salin Link'}`;

  if (ctaTitle) ctaTitle.textContent = isEn ? 'Interested in Discussing This Solution for Your Business?' : 'Tertarik Mendiskusikan Solusi Ini untuk Perusahaan Anda?';
  if (ctaDesc) ctaDesc.textContent = isEn ? 'ASK Consulting senior team is ready to assist with enterprise IT assessment & solution planning.' : 'Tim konsultan senior ASK Consulting siap membantu asesmen & perencanaan solusi IT enterprise bagi bisnis Anda.';
  if (ctaBtn) ctaBtn.innerHTML = `<i class="fa-solid fa-comments"></i> ${isEn ? 'Free Consultation Now' : 'Konsultasi Gratis Sekarang'}`;

  if (imgEl) {
    imgEl.src = a.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
  }

  if (bodyEl) {
    const rawContent = (isEn && enData?.content) ? enData.content : (a.content || a.summary || '');
    const paragraphs = rawContent.split('\n\n').filter(Boolean);

    bodyEl.innerHTML = paragraphs.map((p, idx) => {
      if (idx === 0) {
        return `<p style="font-size: 1.15rem; font-weight: 500; color: #0f172a; margin-bottom: 24px; line-height: 1.8;">${escapeHtml(p)}</p>`;
      }
      return `<p style="margin-bottom: 20px;">${escapeHtml(p)}</p>`;
    }).join('');
  }

  modal.classList.add('active');
}

// Data Export & Reset
function exportDataJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `ask_consulting_cms_backup_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Data CMS berhasil di-export ke JSON!', 'success');
}

async function resetDefaultData() {
  if (confirm('Apakah Anda yakin ingin mereset seluruh data CMS ke pengaturan awal? Data lokal akan digantikan.')) {
    localStorage.removeItem(STORAGE_KEY);
    await loadDataStore();
    renderPublicView();
    renderCMSArticles();
    renderCMSProjects();
    renderCMSServices();
    renderCMSInquiries();
    showToast('Data CMS telah di-reset ke default.', 'info');
  }
}

// Utility: Toast Notification
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color:var(--primary-cyan)"></i> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
