/**
 * IDEAL CABELEIREIROS – script.js
 * Funcionalidades: Header scroll, menu mobile,
 *                  scroll reveal, lightbox galeria,
 *                  ano automático no footer.
 */

/* =============================================
   1. HEADER: adiciona classe .scrolled ao rolar
============================================= */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });


/* =============================================
   2. MENU MOBILE: hamburguer toggle
============================================= */
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');
const navLinks  = nav.querySelectorAll('a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
  // Impede scroll do body enquanto menu está aberto
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

// Fecha o menu ao clicar em qualquer link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  }
});


/* =============================================
   3. SCROLL REVEAL: animação ao entrar na tela
============================================= */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Opcional: para parar de observar após animar, descomente:
      // revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


/* =============================================
   4. LIGHTBOX: galeria de imagens
============================================= */
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbClose   = document.getElementById('lbClose');
const galItems  = document.querySelectorAll('.gal-item');

galItems.forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    const alt = item.querySelector('img').alt;
    lbImg.src = src;
    lbImg.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

lbClose.addEventListener('click', closeLightbox);

// Fecha ao clicar fora da imagem
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Fecha com Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});


/* =============================================
   5. YEAR: ano automático no footer
============================================= */
const anoEl = document.getElementById('ano');
if (anoEl) anoEl.textContent = new Date().getFullYear();


/* =============================================
   6. SMOOTH SCROLL: compatibilidade extra
   (complementa o scroll-behavior: smooth do CSS)
============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
