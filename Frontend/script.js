/* ══════════════════════════════════════════════
   PRASHANT PORTFOLIO — script.js
══════════════════════════════════════════════ */

/* ─── CUSTOM CURSOR ─── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      follower.style.transform = 'translate(-50%, -50%) scale(1.4)';
      follower.style.opacity = '0.2';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.opacity = '0.4';
    });
  });
})();


/* ─── NAVBAR: SCROLL + ACTIVE LINKS ─── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlight
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
})();


/* ─── HAMBURGER MENU ─── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();


/* ─── TYPED TEXT ANIMATION ─── */
(function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Aspiring Full Stack Developer',
    'Creative Problem Solver',
    'Web Development Enthusiast',
    'Java & JavaScript Learner',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseDuration = 2200;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
    } else {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
    }

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => { isDeleting = true; type(); }, pauseDuration);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
  }

  setTimeout(type, 800);
})();


/* ─── SCROLL REVEAL OBSERVER ─── */
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger within the same parent
          entry.target.style.transitionDelay = `${(entry.target.dataset.delay || 0) * 120}ms`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Add scroll-reveal to all major elements
  const targets = document.querySelectorAll(
    '.skill-card, .project-card, .about-grid, .contact-grid, .stat, .education-card, .contact-item'
  );
  targets.forEach((el, i) => {
    el.classList.add('scroll-reveal');
    el.dataset.delay = i % 4; // reset delay per row
    observer.observe(el);
  });
})();


/* ─── SKILL BAR ANIMATION ─── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.dataset.width + '%';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach(bar => observer.observe(bar));
})();


/* ─── CONTACT FORM VALIDATION ─── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name:    { el: document.getElementById('name'),    errEl: document.getElementById('nameError') },
    email:   { el: document.getElementById('email'),   errEl: document.getElementById('emailError') },
    message: { el: document.getElementById('message'), errEl: document.getElementById('messageError') },
  };
  const successMsg = document.getElementById('formSuccess');

  // Live validation on blur
  Object.values(fields).forEach(({ el, errEl }) => {
    el.addEventListener('blur', () => validateField(el, errEl));
    el.addEventListener('input', () => {
      el.classList.remove('error');
      errEl.textContent = '';
    });
  });

  function validateField(el, errEl) {
    const value = el.value.trim();
    let error = '';

    if (el.id === 'name') {
      if (!value) error = 'Name is required.';
      else if (value.length < 2) error = 'Name must be at least 2 characters.';
    }

    if (el.id === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = 'Email is required.';
      else if (!emailRegex.test(value)) error = 'Please enter a valid email.';
    }

    if (el.id === 'message') {
      if (!value) error = 'Message is required.';
      else if (value.length < 10) error = 'Message should be at least 10 characters.';
    }

    if (error) {
      el.classList.add('error');
      errEl.textContent = error;
      return false;
    } else {
      el.classList.remove('error');
      errEl.textContent = '';
      return true;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    Object.values(fields).forEach(({ el, errEl }) => {
      if (!validateField(el, errEl)) isValid = false;
    });

    if (!isValid) return;

    // Simulate sending
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending…';

    setTimeout(() => {
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Send Message';
      form.reset();
      successMsg.classList.add('show');
      setTimeout(() => successMsg.classList.remove('show'), 5000);
    }, 1600);
  });
})();


/* ─── SMOOTH SCROLL FOR ANCHOR LINKS ─── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ─── SECTION ENTRANCE: PARALLAX ORBS ─── */
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = 0.04 + i * 0.02;
      orb.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
})();


/*───Connecting to backend API to fetch users and display them ───*/
async function getUsers() {
try {
const response = await fetch("http://localhost:3000/users");
const data = await response.json();

```
const output = document.getElementById("output");
output.innerHTML = "";

data.forEach(user => {
  const p = document.createElement("p");
  p.textContent = user.name + " - " + user.email;
  output.appendChild(p);
});
```

} catch (error) {
console.log("Error:", error);
}
}
