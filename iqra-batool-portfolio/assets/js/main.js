document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });

  // Reveal elements as they enter the viewport; show immediately if motion is reduced.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(el => observer.observe(el));
  }

  // Header gains a little depth after the page starts scrolling.
  const header = document.querySelector('.site-header');
  const updateHeader = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 18);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      const data = new FormData(form);
      const subject = encodeURIComponent(`Portfolio enquiry: ${data.get('subject') || 'New project'}`);
      const body = encodeURIComponent(
        `Name: ${data.get('name')}\\nEmail: ${data.get('email')}\\n\\n${data.get('message')}`
      );
      status.textContent = 'Opening your email app…';
      window.location.href = `mailto:hello@iqrabatool.com?subject=${subject}&body=${body}`;
    });
  }

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
});
