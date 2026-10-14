// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const links = document.querySelector('.links');
if (menuBtn && links) {
  menuBtn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// Highlight nav link for the section in view (home page)
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.links a[href^="#"]');
if (sections.length && navAnchors.length) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
}

// Filter projects (work page)
const filterBtns = document.querySelectorAll('.filter');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project').forEach(p => {
      const cats = p.dataset.category || '';
      p.classList.toggle('hidden', f !== 'all' && !cats.split(' ').includes(f));
    });
  });
});

// Contact form: shows confirmation (connect to Formspree or similar for real delivery)
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const note = document.querySelector('.form-note');
    note.classList.add('show');
    form.reset();
    setTimeout(() => note.classList.remove('show'), 6000);
  });
}

// Reveal on scroll
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
