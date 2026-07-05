const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
  });
}

const estimateForm = document.querySelector('[data-estimate-form]');

if (estimateForm) {
  estimateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(estimateForm);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const town = String(data.get('town') || '').trim();
    const service = String(data.get('service') || '').trim();
    const message = String(data.get('message') || '').trim();

    const body = [
      'Hi Burmont Cleaning Co.,',
      '',
      'I would like a free cleaning estimate.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Town: ${town}`,
      `Service: ${service}`,
      '',
      'Details:',
      message || 'Please contact me with next steps.',
      '',
      'Thank you.'
    ].join('\n');

    const subject = `Free Cleaning Estimate Request${name ? ` - ${name}` : ''}`;
    const mailto = `mailto:hello@burmontcleaningco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}
