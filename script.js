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

if (estimateForm instanceof HTMLFormElement) {
  const formStatus = estimateForm.querySelector('[data-form-status]');
  const submitButton = estimateForm.querySelector('button[type="submit"]');
  const originalButtonHtml = submitButton ? submitButton.innerHTML : '';

  estimateForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (formStatus) {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending...';
    }

    try {
      const response = await fetch(estimateForm.action, {
        method: 'POST',
        body: new FormData(estimateForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      estimateForm.reset();

      if (formStatus) {
        formStatus.textContent = 'Thanks — your request was sent. We’ll follow up soon.';
        formStatus.classList.add('is-visible', 'is-success');
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = 'Something went wrong. Please call or text (610) 202-1978, or email hello@burmontcleaningco.com.';
        formStatus.classList.add('is-visible', 'is-error');
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHtml;
      }
    }
  });
}
