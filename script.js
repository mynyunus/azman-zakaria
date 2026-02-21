const navPill = document.querySelector('.nav-pill');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const backToTop = document.querySelector('.back-to-top');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const faqButtons = document.querySelectorAll('.faq-question');
const revealItems = document.querySelectorAll('.reveal');
const aboutCarousel = document.querySelector('#tentang .about-carousel');
const galleryCarousel = document.querySelector('#testimoni .gallery-carousel');

function handleScrollState() {
  const isScrolled = window.scrollY > 24;
  navPill.classList.toggle('is-scrolled', isScrolled);
  backToTop.classList.toggle('visible', window.scrollY > 460);
}

window.addEventListener('scroll', handleScrollState, { passive: true });
handleScrollState();

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('open', !expanded);
  });
}

function closeMobileMenu() {
  if (!navToggle || !mobileMenu) return;
  navToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
}

anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobileMenu();
  });
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const currentlyExpanded = button.getAttribute('aria-expanded') === 'true';

    faqButtons.forEach((item) => {
      const panel = document.getElementById(item.getAttribute('aria-controls'));
      item.setAttribute('aria-expanded', 'false');
      if (panel) panel.hidden = true;
    });

    if (!currentlyExpanded) {
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      button.setAttribute('aria-expanded', 'true');
      if (panel) panel.hidden = false;
    }
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

function initCarousel(root, config) {
  if (!root) return;

  const track = root.querySelector(config.trackSelector);
  const slides = Array.from(root.querySelectorAll(config.slideSelector));
  const dots = Array.from(root.querySelectorAll(config.dotSelector));
  const prevButton = root.querySelector(config.prevButtonSelector);
  const nextButton = root.querySelector(config.nextButtonSelector);

  if (!track || slides.length === 0) return;

  let currentSlide = 0;
  let autoSlideTimer = null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateCarousel = (nextIndex) => {
    const normalizedIndex = (nextIndex + slides.length) % slides.length;
    currentSlide = normalizedIndex;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    slides.forEach((slide, index) => {
      const isActive = index === currentSlide;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    dots.forEach((dot, index) => {
      const isActive = index === currentSlide;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', String(isActive));
    });
  };

  const stopAutoSlide = () => {
    if (!autoSlideTimer) return;
    window.clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  };

  const startAutoSlide = () => {
    if (reduceMotion || slides.length < 2) return;
    stopAutoSlide();
    autoSlideTimer = window.setInterval(() => updateCarousel(currentSlide + 1), config.intervalMs);
  };

  if (slides.length > 1) {
    prevButton?.addEventListener('click', () => updateCarousel(currentSlide - 1));
    nextButton?.addEventListener('click', () => updateCarousel(currentSlide + 1));

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => updateCarousel(index));
    });

    root.addEventListener('mouseenter', stopAutoSlide);
    root.addEventListener('mouseleave', startAutoSlide);
    root.addEventListener('focusin', stopAutoSlide);
    root.addEventListener('focusout', startAutoSlide);
  }

  updateCarousel(0);
  startAutoSlide();
}

initCarousel(aboutCarousel, {
  trackSelector: '.about-carousel-track',
  slideSelector: '.about-slide',
  dotSelector: '.about-dot',
  prevButtonSelector: '.about-carousel-btn.prev',
  nextButtonSelector: '.about-carousel-btn.next',
  intervalMs: 4800
});

initCarousel(galleryCarousel, {
  trackSelector: '.gallery-carousel-track',
  slideSelector: '.gallery-slide',
  dotSelector: '.gallery-dot',
  prevButtonSelector: '.gallery-carousel-btn.prev',
  nextButtonSelector: '.gallery-carousel-btn.next',
  intervalMs: 4300
});

window.addEventListener('click', (event) => {
  if (!mobileMenu || !navToggle) return;
  const clickedInsideNav = navPill.contains(event.target);
  if (!clickedInsideNav) {
    closeMobileMenu();
  }
});
