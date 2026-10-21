/**
 * OPERATION FORGE X — TACTICAL DOCUSERIES WEB APPLICATION
 * High Performance Vanilla JS Engine
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIZER (Web Audio API) ---
  class TacticalAudio {
    constructor() {
      this.ctx = null;
      this.enabled = false;
      this.initOnFirstGesture();
    }

    initOnFirstGesture() {
      const unlock = () => {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        }
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
      };
      window.addEventListener('click', unlock);
      window.addEventListener('keydown', unlock);
    }

    toggle() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playBlip(freq = 880, duration = 0.04, type = 'sine') {
      if (!this.enabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Fallback gracefully
      }
    }

    playClick() {
      this.playBlip(1200, 0.03, 'triangle');
    }

    playConfirm() {
      if (!this.enabled || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.15);
      } catch (e) {}
    }
  }

  const audio = new TacticalAudio();

  // --- FORGE SPARKS & EMBER CANVAS PARTICLE SYSTEM ---
  function initForgeParticles() {
    const canvas = document.getElementById('forge-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 48;
    let scrollBoost = 0;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      scrollBoost = Math.min(scrollBoost + delta * 0.04, 4.5);
    }, { passive: true });

    class Spark {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedY = Math.random() * 1.4 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.alpha = Math.random() * 0.7 + 0.3;
        this.decay = Math.random() * 0.003 + 0.0015;
        // Warm fiery tones
        const hues = [25, 35, 45, 15];
        this.hue = hues[Math.floor(Math.random() * hues.length)];
      }

      update() {
        this.y -= (this.speedY + scrollBoost);
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.alpha -= this.decay;
        if (this.alpha <= 0 || this.y < -10) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Spark());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      scrollBoost *= 0.94; // Smooth decay
      requestAnimationFrame(animate);
    }
    animate();
  }

  // --- COUNTDOWN TIMER TO 27 NOV 2026 ---
  function initCountdown() {
    const targetDate = new Date('November 27, 2026 08:00:00 GMT+0530').getTime();

    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minsEl = document.getElementById('count-mins');
    const secsEl = document.getElementById('count-secs');

    if (!daysEl) return;

    function update() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(minutes).padStart(2, '0');
      secsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // --- EXPEDITION / EPISODES TABS ---
  function initExpeditionTabs() {
    const tabBtns = document.querySelectorAll('.series-tab-btn');
    const panels = document.querySelectorAll('.day-panel');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetDay = btn.getAttribute('data-day');

        tabBtns.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));

        btn.classList.add('active');
        const activePanel = document.getElementById(targetDay);
        if (activePanel) {
          activePanel.classList.add('active');
        }

        audio.playClick();
      });
    });
  }

  // --- FACULTY FILTERING & DOSSIER MODAL ---
  const facultyData = {
    bharwan: {
      name: 'Colonel Rajeev Bharwan (Retd.)',
      role: 'Commanding Officer · Operation Forge X',
      branch: 'Indian Army · Airborne Command',
      image: 'assets/images/faculty/bharwan.jpg',
      honour: 'Airborne Veteran',
      bio: "A former Indian Army officer with 21 years of service, Colonel Bharwan's career includes airborne command, counter-insurgency operations and the prestigious Cambrian Patrol. He continues to mentor young leaders through his work as an SSB coach and through Soldier Unplugged.",
      leadershipFocus: 'Leads the Forge X experience from the opening formation through to the final debrief. Command Presence, Platoon Dynamics & Field Tenacity.',
      quote: "True leadership isn't tested in the calm of an office. It is revealed when the plan collapses and the hill must still be taken."
    },
    kapoor: {
      name: 'Air Marshal Nagesh Kapoor (Retd.)',
      role: 'Former Vice Chief of the Air Staff · Indian Air Force',
      branch: 'Indian Air Force',
      image: 'assets/images/faculty/kapoor.jpg',
      honour: 'Vice Chief Veteran',
      bio: 'Brings a senior top-brass leadership perspective to operational capability, aerospace technology, national defence doctrine and high-stakes decision-making under intense pressure.',
      leadershipFocus: 'Keynote & Masterclass: Leadership Under Fire; Technology to Capability; Strategic Scenario Planning.',
      quote: 'When flying at Mach 2 in hostile skies, hesitation is failure. Decision-making is a muscle forged under extreme velocity.'
    },
    pandey: {
      name: 'Lieutenant General D. P. Pandey (Retd.)',
      role: 'Former Corps Commander and Commandant, Army War College',
      branch: 'Indian Army · Senior Command',
      image: 'assets/images/faculty/pandey.jpg',
      honour: 'Corps Commander',
      bio: 'Offers a distinguished strategic perspective on leadership, moral judgement and institutional responsibility developed through senior military command and the preparation of future generals at the Army War College.',
      leadershipFocus: 'Keynote: Military Habits — A Winning Code; Leading Through Uncertainty; Strategic Vision in Volatile Theatres.',
      quote: 'Discipline is not what is imposed from the outside; it is the silent pact an officer makes with their conscience.'
    },
    tewari: {
      name: 'Commodore Shiv Tewari (Retd.)',
      role: 'Indian Navy · Defence-Technology Entrepreneur',
      branch: 'Indian Navy',
      image: 'assets/images/faculty/tewari.jpg',
      honour: 'Naval Veteran & Founder',
      bio: 'Uniquely connects decades of operational experience in the armed forces with cutting-edge entrepreneurship, maritime strategy, and the emerging frontier across defence technology and deep-tech innovation.',
      leadershipFocus: 'Keynote: Leadership Under Fire; Opportunities for Start-ups in Defence Technology; Scaling Under Adversity.',
      quote: 'Modern defence challenges demand agile civilian founders thinking with military precision.'
    },
    kashyap: {
      name: 'Colonel Kaushal Kashyap, SC',
      role: 'Former Special Forces Commander · Author',
      branch: 'Special Forces · Indian Army',
      image: 'assets/images/faculty/kashyap.jpg',
      honour: 'Shaurya Chakra',
      bio: 'Decorated Special Forces commander awarded the Shaurya Chakra for gallantry. Joins the opening evening’s Monks & Warriors conversation, exploring selfless service, courage under fire, and life beyond the uniform.',
      leadershipFocus: 'Evening Session: Monks & Warriors at the Fireline; Psychological Resilience; The Mindset of Elite Special Operations.',
      quote: 'Fear is universal. Courage is simply the decision that something else matters more than yourself.'
    },
    singh: {
      name: 'Lieutenant Colonel Kaushalendra Singh, SM',
      role: 'Indian Army Veteran',
      branch: 'Indian Army · Infantry',
      image: 'assets/images/faculty/singh.jpg',
      honour: 'Sena Medal',
      bio: 'Decorated Indian Army combat veteran awarded the Sena Medal. Joins Monks & Warriors for an unfiltered bonfire discussion on the hard-won experiences, team bonding, and foundational principles that shape military service.',
      leadershipFocus: 'Evening Session: Monks & Warriors at the Fireline; Grassroots Leadership; Unwavering Loyalty to the Team.',
      quote: 'You do not fight because you hate what is in front of you. You fight because you love the person standing beside you.'
    },
    sathe: {
      name: 'Wing Commander Amit Sathe (Retd.)',
      role: 'Former Fighter Pilot · Indian Air Force',
      branch: 'Indian Air Force · Fighter Wing',
      image: 'assets/images/faculty/sathe.jpg',
      honour: 'Fighter Pilot Veteran',
      bio: 'Veteran combat fighter pilot present with the cohort across the three-day programme. Host of the storied Officers’ Mess evening, leading candid conversations on camaraderie, service, leadership, and the human being behind the uniform.',
      leadershipFocus: 'Evening Host: The Officers’ Mess Night; High-Performance Team Culture; Debriefing Without Ego.',
      quote: 'In a fighter squadron, rank stays at the briefing room door during debrief. Humility is how elite teams evolve.'
    }
  };

  function initFaculty() {
    const filterBtns = document.querySelectorAll('.faculty-filter-bar .filter-btn');
    const cards = document.querySelectorAll('.faculty-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        cards.forEach((card) => {
          const branch = card.getAttribute('data-branch');
          if (filter === 'all' || branch.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });

        audio.playClick();
      });
    });

    // Dossier Modal Triggers
    const modalBackdrop = document.getElementById('faculty-modal');
    const modalCloseBtn = document.getElementById('faculty-modal-close');
    const dossierButtons = document.querySelectorAll('.faculty-view-dossier');

    dossierButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-id');
        const person = facultyData[key];
        if (!person || !modalBackdrop) return;

        document.getElementById('modal-faculty-img').src = person.image;
        document.getElementById('modal-faculty-name').textContent = person.name;
        document.getElementById('modal-faculty-role').textContent = person.role;
        document.getElementById('modal-faculty-branch').textContent = person.branch;
        document.getElementById('modal-faculty-bio').textContent = person.bio;
        document.getElementById('modal-faculty-focus').textContent = person.leadershipFocus;
        document.getElementById('modal-faculty-quote').textContent = person.quote;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
        audio.playConfirm();
      });
    });

    if (modalCloseBtn && modalBackdrop) {
      modalCloseBtn.addEventListener('click', () => {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
        audio.playClick();
      });

      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          modalBackdrop.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // --- QUARTERS CALCULATOR & APPLICATION MODAL ---
  function initQuartersCalculator() {
    const quartersRadios = document.querySelectorAll('input[name="calc_quarters"]');
    const qtyInput = document.getElementById('calc-operatives');
    const subtotalEl = document.getElementById('calc-subtotal');
    const gstEl = document.getElementById('calc-gst');
    const totalEl = document.getElementById('calc-total');

    function calculate() {
      let selectedPlan = 'buddy';
      quartersRadios.forEach((r) => {
        if (r.checked) selectedPlan = r.value;
      });

      // Update styling of parent radio label
      quartersRadios.forEach((r) => {
        const label = r.closest('.quarters-radio-label');
        if (label) {
          if (r.checked) label.classList.add('checked');
          else label.classList.remove('checked');
        }
      });

      const pricePerPerson = selectedPlan === 'private' ? 110000 : 80000;
      const count = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;

      const subtotal = pricePerPerson * count;
      const gst = Math.round(subtotal * 0.18);
      const grandTotal = subtotal + gst;

      if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');
      if (gstEl) gstEl.textContent = '₹' + gst.toLocaleString('en-IN');
      if (totalEl) totalEl.textContent = '₹' + grandTotal.toLocaleString('en-IN');
    }

    quartersRadios.forEach((r) => {
      r.addEventListener('change', () => {
        calculate();
        audio.playClick();
      });
    });

    const radioLabels = document.querySelectorAll('.quarters-radio-label');
    radioLabels.forEach((label) => {
      label.addEventListener('click', () => {
        const radio = label.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          calculate();
        }
      });
    });

    if (qtyInput) {
      qtyInput.addEventListener('input', calculate);
    }

    const qtyPlus = document.getElementById('qty-plus');
    const qtyMinus = document.getElementById('qty-minus');

    if (qtyPlus && qtyInput) {
      qtyPlus.addEventListener('click', () => {
        qtyInput.value = Math.min(10, (parseInt(qtyInput.value, 10) || 1) + 1);
        calculate();
        audio.playClick();
      });
    }

    if (qtyMinus && qtyInput) {
      qtyMinus.addEventListener('click', () => {
        qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
        calculate();
        audio.playClick();
      });
    }

    calculate();
  }

  // --- APPLICATION / ENLISTMENT MODAL ---
  function initApplicationModal() {
    const applyModal = document.getElementById('application-modal');
    const applyClose = document.getElementById('apply-modal-close');
    const openBtns = document.querySelectorAll('.open-apply-modal');
    const applyForm = document.getElementById('expedition-apply-form');
    const quartersSelect = document.getElementById('form-quarters');

    function closeModal(modal) {
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const preferredQuarters = btn.getAttribute('data-quarters');
        if (preferredQuarters && quartersSelect) {
          quartersSelect.value = preferredQuarters;
        }
        if (applyModal) {
          applyModal.classList.add('active');
          document.body.style.overflow = 'hidden';
          audio.playConfirm();
        }
      });
    });

    // Close buttons on all modals
    document.querySelectorAll('.modal-close-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-backdrop');
        closeModal(modal);
        audio.playClick();
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          closeModal(backdrop);
          audio.playClick();
        }
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.active').forEach((m) => {
          closeModal(m);
        });
      }
    });

    if (applyForm) {
      applyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const phone = document.getElementById('form-phone').value.trim();
        const role = document.getElementById('form-role').value.trim();
        const company = document.getElementById('form-company').value.trim();
        const quarters = document.getElementById('form-quarters').value;
        const note = document.getElementById('form-note').value.trim();

        // Dispatch via WhatsApp format for immediate action
        const whatsappMsg = `*OPERATION FORGE X — LEADERSHIP APPLICATION*%0A%0A*Applicant:* ${encodeURIComponent(name)}%0A*Designation:* ${encodeURIComponent(role)}%0A*Organisation:* ${encodeURIComponent(company)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email)}%0A*Quarters Preference:* ${encodeURIComponent(quarters)}%0A*Leadership Objective:* ${encodeURIComponent(note || 'Direct enlistment')}%0A%0A_Dispatched via Operation Forge X Portal_`;

        // Success state
        applyForm.innerHTML = `
          <div style="text-align: center; padding: 2.5rem 1rem;">
            <div style="width: 64px; height: 64px; background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #22c55e;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 style="font-family: var(--font-display); font-size: 1.75rem; color: #fff; margin-bottom: 0.75rem;">APPLICATION TRANSMITTED</h3>
            <p style="color: var(--steel-300); font-size: 0.95rem; line-height: 1.6; max-width: 460px; margin: 0 auto 1.75rem;">
              Command debrief received. Our liaison team will review your leadership profile and contact you within 24 hours.
            </p>
            <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
              <a href="https://wa.me/919979869175?text=${whatsappMsg}" target="_blank" class="btn btn-forge" style="padding: 0.75rem 1.5rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                CONFIRM VIA WHATSAPP (+91 9979869175)
              </a>
              <button onclick="document.getElementById('application-modal').classList.remove('active'); document.body.style.overflow='';" class="btn btn-secondary" style="padding: 0.75rem 1.5rem;">CLOSE</button>
            </div>
          </div>
        `;
        audio.playConfirm();
      });
    }
  }

  // --- FAQS ACCORDION & SEARCH FILTER ---
  function initFaqs() {
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.getElementById('faq-search');

    faqItems.forEach((item) => {
      const btn = item.querySelector('.faq-question-btn');
      const answer = item.querySelector('.faq-answer-body');

      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove('active');
            const otherAns = other.querySelector('.faq-answer-body');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          audio.playClick();
        } else {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        }
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        faqItems.forEach((item) => {
          const text = item.textContent.toLowerCase();
          if (text.includes(query)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  }

  // --- SCROLLSPY & STICKY HEADER ---
  function initScrollspy() {
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileToggle && mainNav) {
      mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        audio.playClick();
      });

      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          mainNav.classList.remove('open');
        });
      });
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // --- SOUND TOGGLE ---
  function initSoundToggle() {
    const soundBtns = document.querySelectorAll('.sound-toggle-btn');
    soundBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const isEnabled = audio.toggle();
        soundBtns.forEach((b) => {
          if (isEnabled) {
            b.classList.add('active');
            b.setAttribute('title', 'Sound Telemetry: Active');
          } else {
            b.classList.remove('active');
            b.setAttribute('title', 'Sound Telemetry: Muted');
          }
        });
        if (isEnabled) {
          audio.playConfirm();
        }
      });
    });
  }

  // --- SCROLL ANIMATIONS, PROGRESS & WAYPOINTS ---
  function initScrollAnimations() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const heroBackdropImg = document.querySelector('.hero-backdrop img');
    const heroContent = document.querySelector('.hero-content');
    const backToTopBtn = document.getElementById('back-to-top-radar');
    const waypointItems = document.querySelectorAll('.waypoint-item');
    const sections = document.querySelectorAll('section[id]');

    // 1. Scroll Progress, Hero Parallax & Waypoint Spy
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
      }

      // Parallax on Hero Image
      if (heroBackdropImg && scrollTop < window.innerHeight * 1.5) {
        heroBackdropImg.style.transform = `translateY(${scrollTop * 0.32}px) scale(${1.03 + scrollTop * 0.00012})`;
      }
      if (heroContent && scrollTop < window.innerHeight) {
        heroContent.style.opacity = Math.max(0, 1 - (scrollTop / 850));
        heroContent.style.transform = `translateY(${scrollTop * 0.18}px)`;
      }

      // Back to top button visibility
      if (backToTopBtn) {
        if (scrollTop > 450) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }

      // Waypoint Spy
      let activeId = '';
      sections.forEach((sec) => {
        const top = sec.offsetTop - 260;
        const height = sec.offsetHeight;
        if (scrollTop >= top && scrollTop < top + height) {
          activeId = sec.getAttribute('id');
        }
      });

      if (activeId) {
        waypointItems.forEach((wp) => {
          wp.classList.remove('active');
          if (wp.getAttribute('data-target') === activeId) {
            wp.classList.add('active');
          }
        });
      }
    }, { passive: true });

    // Back to top click
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        audio.playConfirm();
      });
    }

    // Waypoint smooth click
    waypointItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          audio.playClick();
        }
      });
    });

    // 2. IntersectionObserver for Reveal Animations
    const revealElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // 3. Number Counter Animation on Scroll
    const statNums = document.querySelectorAll('.stat-num');
    let counted = false;
    const statsRibbon = document.querySelector('.hero-stats-ribbon');
    if (statsRibbon) {
      const statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !counted) {
              counted = true;
              animateCounters();
            }
          });
        },
        { threshold: 0.25 }
      );
      statsObserver.observe(statsRibbon);
    }

    function animateCounters() {
      statNums.forEach((el) => {
        const text = el.textContent.trim();
        if (text.includes('★')) {
          el.textContent = '5★';
          return;
        }
        const target = parseInt(text, 10);
        if (isNaN(target)) return;
        let count = 0;
        const duration = 1200;
        const stepTime = 30;
        const step = target / (duration / stepTime);

        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(count);
          }
        }, stepTime);
      });
    }

    // 4. Cohort Composition Bar Animation on Scroll
    const cohortCard = document.querySelector('.cohort-composition-card');
    let barsAnimated = false;
    if (cohortCard) {
      const cohortObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !barsAnimated) {
              barsAnimated = true;
              document.querySelectorAll('.comp-bar-fill').forEach((bar) => {
                const targetWidth = bar.getAttribute('data-width') || bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                  bar.style.width = targetWidth;
                }, 180);
              });
            }
          });
        },
        { threshold: 0.25 }
      );
      cohortObserver.observe(cohortCard);
    }

    // 5. Interactive 3D Tilt on Hover for Cards
    const tiltCards = document.querySelectorAll(
      '.tactical-frame, .faculty-card, .quarters-card, .outcome-card, .pillar-card'
    );
    tiltCards.forEach((card) => {
      card.classList.add('tilt-card');
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // --- INIT ALL ---
  document.addEventListener('DOMContentLoaded', () => {
    initForgeParticles();
    initCountdown();
    initExpeditionTabs();
    initFaculty();
    initQuartersCalculator();
    initApplicationModal();
    initFaqs();
    initScrollspy();
    initSoundToggle();
    initScrollAnimations();
  });
})();

