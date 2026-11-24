const menuButton = document.querySelector('.nav-trigger');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('.mobile-drawer a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll('.slideshow, .micrograph-slideshow').forEach((slideshow) => {
  const slides = Array.from(slideshow.querySelectorAll('.slide'));
  const controls = Array.from(slideshow.querySelectorAll('.slide-controls button'));
  const caption = slideshow.querySelector('.slide-caption');
  let slideIndex = 0;

  function showSlide(index) {
    if (!slides.length) return;
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === slideIndex));
    controls.forEach((control, i) => {
      control.classList.toggle('active', i === slideIndex);
      control.setAttribute('aria-pressed', String(i === slideIndex));
    });
    if (caption) caption.textContent = slides[slideIndex].dataset.caption || '';
  }

  controls.forEach((control, index) => control.addEventListener('click', () => showSlide(index)));
  showSlide(0);

  if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(() => showSlide(slideIndex + 1), 5000);
  }
});

