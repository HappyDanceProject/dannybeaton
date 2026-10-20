// Danny Beaton — small progressive enhancements. The site works without this file.

const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveals for browsers without CSS scroll-driven animations (Safari, Firefox).
if (!reduceMotion && !CSS.supports('animation-timeline: view()') && 'IntersectionObserver' in window) {
  root.classList.add('io');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal, .statement').forEach((el) => io.observe(el));
}

// Footer year.
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// Newsletter: until a MailerLite / Kit form action is pasted into the HTML, don't pretend to subscribe anyone.
document.querySelectorAll('form[data-newsletter]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    if (form.getAttribute('action')) return; // connected: let the provider handle it
    event.preventDefault();
    (form.querySelector('.form-note') || form.parentElement.querySelector('.form-note')).textContent = 'Sign-ups open very soon. Check back shortly.';
  });
});

// Contact: sends in-page to the form service in the form's action (Formspree), so visitors never leave the page.
document.querySelectorAll('form[data-contact]').forEach((form) => {
  const note = form.querySelector('.form-note');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('_gotcha')) return; // honeypot

    const endpoint = form.getAttribute('action');
    if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
      note.textContent = 'The form isn’t switched on yet. Please try again soon.';
      return;
    }

    note.textContent = 'Sending…';
    try {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      note.textContent = 'Thanks — your message is on its way.';
    } catch {
      note.textContent = 'That didn’t send. Please try again in a moment.';
    }
  });
});
