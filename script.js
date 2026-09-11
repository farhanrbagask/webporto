// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  const icon = newTheme === 'dark' 
    ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
    : '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  
  themeToggle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>`;
}

// Set initial theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);
if(savedTheme === 'light') toggleTheme(); // to update icon

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

// Active Navigation based on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Number Counter Animation
const countElements = document.querySelectorAll('.stat-num[data-target]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-target'));
      const isFloat = target % 1 !== 0;
      let current = 0;
      const increment = target / 40;
      
      const updateCount = () => {
        current += increment;
        if (current < target) {
          el.innerText = isFloat ? current.toFixed(2) : Math.ceil(current);
          requestAnimationFrame(updateCount);
        } else {
          el.innerText = isFloat ? target.toFixed(2) : target;
        }
      };
      updateCount();
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

countElements.forEach(el => countObserver.observe(el));

// Technical Skills — Editorial List
const technicalSkillIcons = {
  eng: '<path d="M8 4L2 10l6 6M16 4l6 6-6 6"/>',
  data: '<path d="M3 20h18M6 20V10M12 20V4M18 20v-7"/>',
  ai: '<path d="M9 3a3 3 0 00-3 3v1a3 3 0 000 6v1a3 3 0 003 3M15 3a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3"/>',
  tools: '<path d="M14.7 6.3a4 4 0 10-4.4 4.4L4 17v3h3l6.3-6.3a4 4 0 004.4-4.4l-2.8 2.8-2.1-2.1z"/>'
};

const technicalSkillCategories = [
  {
    key: 'eng', title: 'Frontend & Backend', accent: '#5B8CFF',
    skills: [
      { name: 'Laravel', core: true, used: 'Sistem Pusaka' },
      { name: 'PHP', core: true, used: 'Sistem Pusaka' },
      { name: 'JavaScript', core: true, used: 'Semua proyek web' },
      { name: 'HTML & CSS', core: true },
      { name: 'MySQL', core: true, used: 'Sipalu, MDM' },
      { name: 'REST API', core: true }
    ]
  },
  {
    key: 'data', title: 'Data Analytics', accent: '#3FD1A5',
    skills: [
      { name: 'Python', core: true, used: 'Riset K-Means' },
      { name: 'Pandas & NumPy', core: true },
      { name: 'Matplotlib', core: true },
      { name: 'Power BI', core: true },
      { name: 'Excel', core: true, used: 'Riset K-Means' }
    ]
  },
  {
    key: 'ai', title: 'Machine Learning & AI Exploration', accent: '#C77DFF',
    skills: [
      { name: 'Python', core: true, used: 'CNN Dashboard' },
      { name: 'Deep Learning (CNN)', core: true, used: 'CNN Dashboard' },
      { name: 'openCV', core: true },
      { name: 'TensorFlow & Keras', core: true },
      { name: 'Scikit-learn', core: true }
    ]
  },
  {
    key: 'tools', title: 'Tools & Version Control', accent: '#FFB454',
    skills: [
      { name: 'Git & GitHub', core: true, used: 'Semua proyek' },
      { name: 'VS Code', core: true },
      { name: 'Jupyter Notebook', core: true },
      { name: 'XAMPP', core: true },
      { name: 'Figma', core: true }
    ]
  }
];

const technicalSkillsList = document.getElementById('technicalSkillsList');

if (technicalSkillsList) {
  technicalSkillCategories.forEach((category, categoryIndex) => {
    const row = document.createElement('div');
    row.className = 'technical-skill-row';
    row.style.setProperty('--skill-accent', category.accent);

    const skillsHtml = category.skills.map((skill, skillIndex) => `
      <span class="technical-skill ${skill.core ? 'core' : ''}">
        ${skill.name}
        ${skill.used ? `<span class="tip">dipakai di: <b>${skill.used}</b></span>` : ''}
      </span>
    `).join('');

    row.innerHTML = `
      <div class="technical-skill-head">
        <span class="bar"></span>
        <span class="technical-skill-icon">
          <svg viewBox="0 0 24 24">${technicalSkillIcons[category.key]}</svg>
        </span>
        <h3>${category.title}</h3>
      </div>
      <div class="technical-skill-line">${skillsHtml}</div>
    `;

    technicalSkillsList.appendChild(row);
  });
}

// Current Year
const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) currentYearEl.innerText = new Date().getFullYear();

// CV Download Alert
const downloadCvBtn = document.getElementById('downloadCv');
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Resume file is not available yet. Please add a CV.pdf to the root directory and update this button link.');
  });
}

// Project Data for Lightbox
const projectsData = [
  {
    id: 0,
    cat: 'Research & Publications',
    title: 'Perancangan Sistem Integrasi Data Pelanggaran Lalu Lintas Berbasis Web Dengan Metode Waterfall Di Pos Satlantas Pada Kawasan Tertib Lalu Lintas Polres Gresik',
    desc: 'JATI (Jurnal Mahasiswa Teknik Informatika).',
    tech: ['Jurnal Ilmiah', 'Sistem Informasi', 'Waterfall'],
    slides: [
      { img: 'images/Sipalu.png', caption: 'Research overview and model architecture' }
    ],
    github: 'https://garuda.kemdiktisaintek.go.id/documents/detail/4704357'
  },
  {
    id: 1,
    cat: 'Web Application',
    title: 'Pusaka - Pusat Alat Tulis Kantor HIMATIF',
    desc: 'Website ini merupakan media informasi badan usaha HIMATIF yang menyediakan layanan alat tulis kantor (ATK), printing, fotokopi, percetakan, dan kebutuhan administrasi lainnya. Website ini hadir untuk memudahkan mahasiswa dan masyarakat memperoleh layanan secara cepat, praktis, dan efisien.',
    tech: ['PHP Native', 'MySQL', 'JavaScript', 'HTML/CSS'],
    slides: [
      { img: 'images/web-pusaka/landing-Pages.png', caption: 'Main dashboard — Data integration overview' },
      { img: 'images/web-pusaka/kalkulator-1.png', caption: 'Login page — Secure officer authentication' },
      { img: 'images/web-pusaka/kalkulator-2.png', caption: 'Violation calculator — Automated fine calculation' },
      { img: 'images/web-pusaka/aktivitas.png', caption: 'Violation calculator — Automated fine calculation' },
      { img: 'images/web-pusaka/admin-pages.png', caption: 'Violation calculator — Automated fine calculation' },
      { img: 'images/web-pusaka/artikel-berita.png', caption: 'Violation calculator — Automated fine calculation' }
    ],
    github: 'https://github.com/farhanrbagask/web-pusaka.git'
  },
  {
    id: 2,
    cat: 'Deep Learning CNN Xception - Web Application',
    title: 'DCNN Xception for AI Generated Image Detection',
    desc: 'Project ini merupakan implementasi Deep Learning berbasis Convolutional Neural Network (CNN) untuk mendeteksi apakah sebuah gambar merupakan gambar asli atau gambar yang dihasilkan oleh Artificial Intelligence.',
    tech: ['Laravel', 'Python', 'NumPy', 'Scikit-learn', 'Pandas'],
    slides: [
      { img: 'images/cnn-xception-detection/hasil-pages.png', caption: 'Master Data Management — reference data overview' },
      { img: 'images/cnn-xception-detection/dashboard-pages.png', caption: 'Master Data Management — reference data overview' },
      { img: 'images/cnn-xception-detection/upload-dataset-pages.png', caption: 'Master Data Management — reference data overview' },
      { img: 'images/cnn-xception-detection/detection-pages.png', caption: 'Master Data Management — reference data overview' }
    ],
    github: 'https://github.com/farhanrbagask/cnn-xception-detection-image-generated-by-ai.git'
  },
  {
    id: 3,
    cat: 'Forecasting - Web Application',
    title: 'Peramalan Penjualan Menggunakan Metode Weighted Moving Averages',
    desc: 'Aplikasi web untuk memprediksi penjualan menggunakan metode Weighted Moving Average (WMA). Project ini dibangun dengan Laravel dan dilengkapi fitur pengelolaan data penjualan, perhitungan prediksi, evaluasi akurasi menggunakan MAPE (Mean Absolute Percentage Error), serta export hasil ke Excel.',
    tech: ['Laravel', 'MySQL', 'Php', 'Excel', 'JavaScript'],
    slides: [
      { img: 'images/weighted-moving-averages/dashboard-pages.png', caption: 'Forecasting — sales prediction' },
      { img: 'images/weighted-moving-averages/login-pages.png', caption: 'Forecasting — sales prediction' },
      { img: 'images/weighted-moving-averages/upload-data-penjualan.png', caption: 'Forecasting — sales prediction' },
      { img: 'images/weighted-moving-averages/proses-prediksi-pages.png', caption: 'Forecasting — sales prediction' },
      { img: 'images/weighted-moving-averages/stok-pages.png', caption: 'Forecasting — sales prediction' }
    ],
    github: 'https://github.com/farhanrbagask/weighted-moving-average-forecasting.git'
  },
  {
    id: 4,
    cat: 'Data Mining - Naive Bayes - Web Application',
    title: 'Prediksi Kerusakan Laptop',
    desc: 'Aplikasi web untuk melakukan prediksi kerusakan laptop menggunakan algoritma Naive Bayes berdasarkan data gejala atau kondisi perangkat. Aplikasi ini dibangun menggunakan Laravel sebagai framework pengembangan web dan MySQL sebagai database. Sistem menyediakan pengelolaan data latih, data uji, proses perhitungan Naive Bayes, hasil prediksi, serta detail perhitungan probabilitas yang digunakan dalam menentukan jenis kerusakan laptop.',
    tech: ['Laravel', 'JavaScript', 'MySQL'],
    slides: [
      { img: 'images/prediksi-kerusakan-laptop/login-pages.png', caption: 'Main platform — structured data display & navigation' },
      { img: 'images/prediksi-kerusakan-laptop/dashboard.png', caption: 'Landing page — conversion-focused design' },
      { img: 'images/prediksi-kerusakan-laptop/data-latih.png', caption: 'Main platform — structured data display & navigation' },
      { img: 'images/prediksi-kerusakan-laptop/data-uji.png', caption: 'Main platform — structured data display & navigation' },
      { img: 'images/prediksi-kerusakan-laptop/prediksi.png', caption: 'Main platform — structured data display & navigation' }

    ],
    github: 'https://github.com/farhanrbagask/prediksi-kerusakan-laptop.git'
  },
  {
    id: 5,
    cat: 'Mobile Device Management - Web Application',
    title: 'Mobile Device Management System',
    desc: 'Mengelola perangkat Android perusahaan melalui sistem Mobile Device Management (MDM), mencakup proses provisioning dan konfigurasi perangkat secara terpusat, penerapan kebijakan keamanan, pengelolaan aplikasi dan akses pengguna, serta monitoring status perangkat untuk memastikan keamanan, kepatuhan, dan kelancaran operasional.',
    tech: ['Airdroid'],
    slides: [
      { img: 'images/mdm/mdm1.png', caption: 'Main platform — structured data display & navigation' },
      { img: 'images/mdm/mdm2.png', caption: 'Landing page — conversion-focused design' },
      { img: 'images/mdm/mdm3.png', caption: 'Landing page — conversion-focused design' }
    ],
    github: '#'
  }
];

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lbClose = document.getElementById('lbClose');
const lbCat = document.getElementById('lbCat');
const lbTitle = document.getElementById('lbTitle');
const lbDesc = document.getElementById('lbDesc');
const lbTech = document.getElementById('lbTech');
const lbGithub = document.getElementById('lbGithub');

// Lightbox Slideshow Elements
const lbSlidesContainer = document.getElementById('lbSlidesContainer');
const lbDotsContainer = document.getElementById('lbDotsContainer');
const lbPrevBtn = document.getElementById('lbPrevBtn');
const lbNextBtn = document.getElementById('lbNextBtn');
let lbCurrentSlide = 0;
let lbSlidesLength = 0;

function goLbSlide(index) {
  if (!lbSlidesContainer || !lbDotsContainer) return;
  const slides = lbSlidesContainer.querySelectorAll('.pc-slide');
  const dots = lbDotsContainer.querySelectorAll('.pc-dot');
  if(slides.length === 0) return;
  
  slides[lbCurrentSlide].classList.remove('active');
  if(dots[lbCurrentSlide]) dots[lbCurrentSlide].classList.remove('active');
  
  lbCurrentSlide = (index + slides.length) % slides.length;
  
  slides[lbCurrentSlide].classList.add('active');
  if(dots[lbCurrentSlide]) dots[lbCurrentSlide].classList.add('active');
}

if (lbPrevBtn) lbPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); goLbSlide(lbCurrentSlide - 1); });
if (lbNextBtn) lbNextBtn.addEventListener('click', (e) => { e.stopPropagation(); goLbSlide(lbCurrentSlide + 1); });

document.querySelectorAll('.lb-trigger').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    // Prevent triggering if clicked on inner buttons like prev/next or details itself
    if(e.target.closest('.pc-slide-btn') || e.target.closest('.pub-link')) return;

    const id = parseInt(trigger.getAttribute('data-id'));
    const project = projectsData.find(p => p.id === id);
    
    if (project && lightbox) {
      // Populate Slides
      lbSlidesContainer.innerHTML = '';
      lbDotsContainer.innerHTML = '';
      lbCurrentSlide = 0;
      lbSlidesLength = project.slides.length;

      project.slides.forEach((slide, i) => {
        // Slide HTML
        const slideDiv = document.createElement('div');
        slideDiv.className = 'pc-slide' + (i === 0 ? ' active' : '');
        slideDiv.innerHTML = `
          <img src="${slide.img}" alt="${project.title}">
          <div class="pc-slide-caption">${slide.caption}</div>
        `;
        lbSlidesContainer.appendChild(slideDiv);

        // Dot HTML
        const dot = document.createElement('span');
        dot.className = 'pc-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goLbSlide(i));
        lbDotsContainer.appendChild(dot);
      });

      // Show/hide controls
      if (lbSlidesLength <= 1) {
        lbPrevBtn.style.display = 'none';
        lbNextBtn.style.display = 'none';
        lbDotsContainer.style.display = 'none';
      } else {
        lbPrevBtn.style.display = 'flex';
        lbNextBtn.style.display = 'flex';
        lbDotsContainer.style.display = 'flex';
      }

      lbCat.textContent = project.cat;
      lbTitle.textContent = project.title;
      lbDesc.textContent = project.desc;
      
      lbTech.innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
      
      lbGithub.href = project.github;
      if (project.github === '#') {
        lbGithub.style.opacity = '0.5';
        lbGithub.title = 'GitHub link not available yet';
      } else {
        lbGithub.style.opacity = '1';
        lbGithub.title = 'View on GitHub';
      }
      
      lightbox.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  });
});

const closeLightbox = () => {
  if (lightbox) {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
  }
};

if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && lightbox.classList.contains('show')) closeLightbox();
});

// ── Project Slideshows ─────────────────────────────────────
document.querySelectorAll('.pc-slideshow').forEach(slideshow => {
  const slides = slideshow.querySelectorAll('.pc-slide');
  const dotsContainer = slideshow.querySelector('.pc-slide-dots');
  const prevBtn = slideshow.querySelector('.pc-slide-btn.prev');
  const nextBtn = slideshow.querySelector('.pc-slide-btn.next');
  let current = 0;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'pc-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    if (dotsContainer) dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dotsContainer) dotsContainer.querySelectorAll('.pc-dot')[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dotsContainer) dotsContainer.querySelectorAll('.pc-dot')[current].classList.add('active');
  }

  // Hide buttons when only 1 slide
  if (slides.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (dotsContainer) dotsContainer.style.display = 'none';
  } else {
    if (prevBtn) prevBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current + 1); });
  }
});

// ── Education / Organization Tabs ─────────────────────────
document.querySelectorAll('.edu-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    document.querySelectorAll('.edu-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.edu-tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const tabEl = document.getElementById('tab-' + tab);
    if (tabEl) tabEl.classList.add('active');
  });
});

// ── Publication Link placeholder ───────────────────────────
// Replace '#' with your actual publication URL, e.g.:
// document.getElementById('pubLink0').href = 'https://your-publication-url.com';
const pubLink0 = document.getElementById('pubLink0');
if (pubLink0 && pubLink0.getAttribute('href') === '#') {
  pubLink0.addEventListener('click', e => {
    e.preventDefault();
    alert('Publication link not set yet. Update the href of #pubLink0 in the HTML.');
  });
}

// EmailJS Form
const EJ_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EJ_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EJ_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
if (EJ_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && typeof emailjs !== 'undefined') {
  emailjs.init({ publicKey: EJ_PUBLIC_KEY });
}

const contactForm = document.getElementById('contactForm');
const cfSubmit = document.getElementById('cfSubmit');
const formMsg = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const msg = document.getElementById('cf-msg').value.trim();
    
    if (!name || !email || !msg) return;
    
    if (cfSubmit) {
      cfSubmit.disabled = true;
      cfSubmit.textContent = 'Sending...';
    }
    if (formMsg) {
      formMsg.textContent = '';
      formMsg.className = 'form-msg';
    }

    if (EJ_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      setTimeout(() => {
        if (formMsg) {
          formMsg.textContent = 'Form is ready! Add EmailJS credentials to enable real sending.';
          formMsg.className = 'form-msg success';
        }
        if (cfSubmit) {
          cfSubmit.disabled = false;
          cfSubmit.textContent = 'Send Message';
        }
        contactForm.reset();
      }, 800);
      return;
    }

    try {
      if (typeof emailjs !== 'undefined') {
        await emailjs.send(EJ_SERVICE_ID, EJ_TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          message: msg
        });
      }
      if (formMsg) {
        formMsg.textContent = 'Message sent successfully! I will get back to you soon.';
        formMsg.className = 'form-msg success';
      }
      contactForm.reset();
    } catch (err) {
      if (formMsg) {
        formMsg.textContent = 'Failed to send message. Please try again or contact me directly.';
        formMsg.className = 'form-msg error';
      }
    } finally {
      if (cfSubmit) {
        cfSubmit.disabled = false;
        cfSubmit.textContent = 'Send Message';
      }
    }
  });
}
