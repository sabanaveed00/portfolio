/**
 * ==========================================================================
 * Saba Naveed - Vanilla JavaScript Controller (script.js)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initTypewriter();
  initThemeAndColors();
  initSkillBarsAnimation();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initBackToTop();
  initResumeModal();
  initPhotoManager();
  initMobileMenu();
});

/* --------------------------------------------------------------------------
   1. Initialize Lucide Icons
   -------------------------------------------------------------------------- */
function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* --------------------------------------------------------------------------
   2. Typewriter Effect for Hero Section
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const titles = [
    'Nutritionist & Dietitian',
    'Clinical Nutritionist',
    'Health-Tech Founder',
    'Dietetic Researcher'
  ];

  const targetElement = document.getElementById('typewriter-text');
  if (!targetElement) return;

  let loopIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeLoop() {
    const currentTitle = titles[loopIndex % titles.length];

    if (!isDeleting) {
      targetElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;

      if (charIndex === currentTitle.length) {
        typingSpeed = 2000;
        isDeleting = true;
      }
    } else {
      targetElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;

      if (charIndex === 0) {
        isDeleting = false;
        loopIndex++;
        typingSpeed = 350;
      }
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* --------------------------------------------------------------------------
   3. Theme & Accent Color Controller
   -------------------------------------------------------------------------- */
function initThemeAndColors() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const colorButtons = document.querySelectorAll('[data-set-color]');

  // Load Saved Theme (Default is dark mode)
  const savedTheme = localStorage.getItem('saba_theme') || 'dark';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', 'sun');
    }
  } else {
    document.body.classList.remove('dark-mode');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', 'moon');
    }
  }
  initIcons();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('saba_theme', isDark ? 'dark' : 'light');
      
      if (themeIcon) {
        themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      }
      initIcons();
    });
  }

  // Load Saved Color Accent
  const savedColor = localStorage.getItem('saba_color') || 'orange';
  document.body.setAttribute('data-color', savedColor);

  colorButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-set-color');
      if (!color) return;
      document.body.setAttribute('data-color', color);
      localStorage.setItem('saba_color', color);
    });
  });
}

/* --------------------------------------------------------------------------
   4. Animated Skill Progress Bars (0% to Target on Scroll)
   -------------------------------------------------------------------------- */
function initSkillBarsAnimation() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  if (!progressBars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetPercent = bar.getAttribute('data-percent') || '0';
          bar.style.width = targetPercent + '%';
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.2 }
  );

  progressBars.forEach((bar) => observer.observe(bar));
}

/* --------------------------------------------------------------------------
   5. Portfolio Category Filter
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-project-category]');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('bg-[var(--accent-color)]', 'text-[#121214]', 'shadow-md');
        b.classList.add('bg-[var(--bg-surface-elevated)]', 'text-[var(--text-muted)]');
      });

      btn.classList.remove('bg-[var(--bg-surface-elevated)]', 'text-[var(--text-muted)]');
      btn.classList.add('bg-[var(--accent-color)]', 'text-[#121214]', 'shadow-md');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-project-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Project Modal Details
   -------------------------------------------------------------------------- */
const PROJECT_DETAILS = {
  1: {
    title: "ASET Health-Tech Platform",
    subtitle: "Digital Clinical Dietetics Platform",
    category: "Health-Tech & SRS Architecture",
    description: "A comprehensive digital health platform designed to automate Medical Nutrition Therapy (MNT) workflows, precision macronutrient calculations, and patient dietary records.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "SRS Specs", "Figma UI/UX", "Clinical Logic"],
    highlights: [
      "Engineered end-to-end Software Requirement Specifications (SRS) with medical data compliance.",
      "Harris-Benedict & Mifflin-St Jeor real-time energy expenditure calculators.",
      "Integrated Renal & Diabetic dietary matrix filtering."
    ]
  },
  2: {
    title: "Renal & Nephrology MNT Care",
    subtitle: "Electrolyte-Targeted Clinical Case Study",
    category: "Clinical Inpatient Dietetics",
    description: "Formulated therapeutic dietary regimes for stage 3-4 Chronic Kidney Disease (CKD) patients requiring rigorous potassium, phosphorus, and sodium monitoring.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    tags: ["Medical Nutrition Therapy", "Nephrology", "Inpatient Care", "Biochemical Profiling"],
    highlights: [
      "Targeted phosphorus and potassium restriction with high-biological-value protein titration.",
      "Reduced fluid retention in 15+ monitored patients.",
      "Collaborated directly with nephrologists and ward nursing staff."
    ]
  },
  3: {
    title: "Metabolic Syndrome & PCOS Portal",
    subtitle: "Glycemic Index & Macro Partitioning System",
    category: "Metabolic Clinical Nutrition",
    description: "A clinical dietary framework designed to reverse insulin resistance in PCOS and type-2 diabetes patients using low glycemic load meal planning.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    tags: ["PCOS Reversal", "Insulin Sensitivity", "Glycemic Index", "Endocrine Nutrition"],
    highlights: [
      "Custom anti-inflammatory meal plans with inositol & micronutrient balance.",
      "Over 40+ female patients achieved hormonal and metabolic stabilization.",
      "Continuous glucose tracking guidance and behavioral habit coaching."
    ]
  },
  4: {
    title: "SKMCH Cancer Care Fundraising",
    subtitle: "PKR 100,000+ Youth Ambassador Campaign",
    category: "Philanthropy & Health Leadership",
    description: "Spearheaded student-led fundraising and public oncology awareness campaigns for Shaukat Khanum Memorial Cancer Hospital & Research Centre.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80",
    tags: ["Healthcare Leadership", "Fundraising", "Cancer Awareness", "Public Speaking"],
    highlights: [
      "Directly raised over PKR 100,000 for patient cancer treatments.",
      "Organized university-wide health symposiums on early oncology screening.",
      "Awarded official certificate of merit for exemplary ambassador leadership."
    ]
  },
  5: {
    title: "Nutrition Diagnostic Web Portal",
    subtitle: "Single Page Application for Caloric Analytics",
    category: "Web Development & Health-Tech",
    description: "A fast, responsive single-page application built to calculate BMR, TDEE, macronutrient distribution, and micronutrient thresholds in under 3 seconds.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Health Algorithms"],
    highlights: [
      "Instant dual-algorithm computation (Harris-Benedict & Mifflin-St Jeor).",
      "Dynamic PDF dietary export functionality for clients.",
      "Fully responsive on mobile, tablet, and desktop viewports."
    ]
  },
  6: {
    title: "Nutritional Infographics Suite",
    subtitle: "30+ Clinical Patient Education Visuals",
    category: "Visual Communication & UI Design",
    description: "Designed scientific educational posters and brochures breaking down complex nutritional biochemistry into engaging visual infographics for hospital clinics.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Canva Pro", "Figma", "Infographics", "Health Literacy", "Typography"],
    highlights: [
      "Created 30+ visual guides for diabetic portion sizing, iron deficiency, and hydration.",
      "Distributed across hospital outpatient clinics in Lahore.",
      "Enhanced patient comprehension by over 45% during clinical trials."
    ]
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');
  const closeBtns = document.querySelectorAll('[data-close-project-modal]');
  const triggerBtns = document.querySelectorAll('[data-open-project-id]');

  if (!modal || !modalBody) return;

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-open-project-id');
      const data = PROJECT_DETAILS[id];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="space-y-4">
          <div class="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-[var(--border-subtle)]">
            <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover" />
            <div class="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-[var(--accent-color)] border border-white/20">
              ${data.category}
            </div>
          </div>

          <div>
            <h3 class="text-xl sm:text-2xl font-extrabold text-[var(--text-heading)] mb-1">${data.title}</h3>
            <p class="text-xs font-bold text-[var(--accent-color)] mb-3">${data.subtitle}</p>
            <p class="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">${data.description}</p>
          </div>

          <div class="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
            <h4 class="text-xs font-bold text-[var(--text-heading)] uppercase tracking-wider">Key Milestones & Deliverables:</h4>
            <ul class="space-y-1.5 text-xs text-[var(--text-body)]">
              ${data.highlights.map(h => `<li class="flex items-start gap-2"><span class="text-[var(--accent-color)] font-bold">✓</span> <span>${h}</span></li>`).join('')}
            </ul>
          </div>

          <div>
            <h4 class="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Technologies & Competencies:</h4>
            <div class="flex flex-wrap gap-1.5">
              ${data.tags.map(t => `<span class="px-2.5 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[10.5px] font-semibold text-[var(--text-heading)]">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      initIcons();
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
}

/* --------------------------------------------------------------------------
   7. CV / Resume Modal
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const modal = document.getElementById('cv-modal');
  const openBtns = document.querySelectorAll('[data-open-cv]');
  const closeBtns = document.querySelectorAll('[data-close-cv-modal]');

  if (!modal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      initIcons();
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
}

/* --------------------------------------------------------------------------
   8. Photo Manager / Upload Feature
   -------------------------------------------------------------------------- */
function initPhotoManager() {
  const modal = document.getElementById('photo-modal');
  const openBtns = document.querySelectorAll('[data-open-photo-manager]');
  const closeBtns = document.querySelectorAll('[data-close-photo-modal]');
  const heroImg = document.getElementById('hero-portrait-img');
  const fileInput = document.getElementById('photo-file-input');

  // Load saved hero photo from localStorage if present
  const savedPhoto = localStorage.getItem('saba_hero_photo');
  if (savedPhoto && heroImg) {
    heroImg.src = savedPhoto;
  }

  if (!modal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      initIcons();
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result && heroImg) {
          heroImg.src = result;
          localStorage.setItem('saba_hero_photo', result);
          alert('Photo updated and saved to your browser!');
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

/* --------------------------------------------------------------------------
   9. Contact Form & WhatsApp Integration
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const waBtn = document.getElementById('whatsapp-direct-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || 'Client';

      if (alertBox) {
        alertBox.textContent = `Thank you ${name}! Your consultation inquiry has been recorded. Saba Naveed will get in touch promptly.`;
        alertBox.classList.remove('hidden');
      }

      form.reset();
      setTimeout(() => {
        if (alertBox) alertBox.classList.add('hidden');
      }, 5000);
    });
  }

  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const msg = encodeURIComponent("Hello Saba! I am reaching out through your portfolio regarding clinical nutrition consultation and health-tech projects.");
      window.open(`https://wa.me/923076992836?text=${msg}`, '_blank');
    });
  }
}

/* --------------------------------------------------------------------------
   10. Mobile Menu Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('#mobile-menu a');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/* --------------------------------------------------------------------------
   11. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      btn.classList.remove('opacity-100', 'pointer-events-auto');
      btn.classList.add('opacity-0', 'pointer-events-none');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
