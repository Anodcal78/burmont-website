const polishStylesheet = document.createElement('link');
polishStylesheet.rel = 'stylesheet';
polishStylesheet.href = '/polish.css?v=final-polish-1';
document.head.appendChild(polishStylesheet);

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

function upgradePrimaryCta(element, label) {
  if (!(element instanceof HTMLElement)) return;
  element.setAttribute('aria-label', label);
  element.innerHTML = `${label} <span class="cta-arrow" aria-hidden="true">→</span>`;
}

/* Standardize the site around “Free Quote.” */
upgradePrimaryCta(document.querySelector('.nav-cta'), 'Get a Free Quote');
upgradePrimaryCta(document.querySelector('.hero-actions .btn-primary'), 'Get a Free Quote');
upgradePrimaryCta(document.querySelector('.form-submit'), 'Request a Free Quote');

const estimateIntro = document.querySelector('.estimate-copy > p:not(.eyebrow)');
if (estimateIntro) {
  estimateIntro.textContent =
    'Tell us what you need cleaned and how often. We’ll follow up with the next steps for your free quote.';
}

/* Update the two service titles requested. */
document.querySelectorAll('.service-card h3').forEach((heading) => {
  const currentTitle = heading.textContent.trim();

  if (currentTitle === 'Airbnb') {
    heading.textContent = 'Airbnb Turnover Cleaning';
  }

  if (currentTitle === 'Move In / Out') {
    heading.textContent = 'Move-In / Move-Out Cleaning';
  }
});

/* Add reassurance points and remove the awkward empty space. */
const contactCards = document.querySelector('.contact-cards');
if (contactCards && !document.querySelector('.quote-assurances')) {
  const assurances = document.createElement('div');
  assurances.className = 'quote-assurances';
  assurances.innerHTML = `
    <div class="quote-assurance">
      <span class="quote-assurance-icon" aria-hidden="true">✓</span>
      <span>Free, no-obligation quote</span>
    </div>
    <div class="quote-assurance">
      <span class="quote-assurance-icon" aria-hidden="true">✓</span>
      <span>Direct, owner-operated communication</span>
    </div>
    <div class="quote-assurance">
      <span class="quote-assurance-icon" aria-hidden="true">✓</span>
      <span>Fully insured cleaning service</span>
    </div>
  `;
  contactCards.insertAdjacentElement('afterend', assurances);
}

/* Replace the decorative map with transparent service-area messaging. */
const areaMap = document.querySelector('.area-map');
if (areaMap instanceof HTMLElement) {
  areaMap.removeAttribute('role');
  areaMap.removeAttribute('aria-label');
  areaMap.innerHTML = `
    <div class="coverage-card">
      <div class="coverage-card-top">
        <span class="coverage-icon" aria-hidden="true">⌂</span>
        <div>
          <p class="eyebrow">Local Coverage</p>
          <h3>Not Sure Whether We Serve Your Town?</h3>
        </div>
      </div>
      <p>
        Our primary service area includes Delaware County and the Main Line.
        Nearby communities may also be available depending on scheduling and the type of service.
      </p>
      <a class="btn btn-primary" href="#estimate">
        Ask About Your Town <span class="cta-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  `;
}

/* Preserve the existing quote form behavior. */
const estimateForm = document.querySelector('[data-estimate-form]');

if (estimateForm instanceof HTMLFormElement) {
  const serviceSelect = estimateForm.querySelector('select[name="service"]');
  const defaultService = estimateForm.dataset.defaultService;
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
      submitButton.textContent = 'Sending...';
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

      if (serviceSelect instanceof HTMLSelectElement && defaultService) {
        serviceSelect.value = defaultService;
      }

      if (formStatus) {
        formStatus.textContent = 'Thanks — your request was sent. We’ll follow up soon.';
        formStatus.classList.add('is-visible', 'is-success');
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent =
          'Something went wrong. Please call or text (610) 202-1978, or email hello@burmontcleaningco.com.';
        formStatus.classList.add('is-visible', 'is-error');
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHtml;
      }
    }
  });

  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', () => {
      if (serviceSelect instanceof HTMLSelectElement) {
        serviceSelect.value = link.getAttribute('data-service') || '';
      }
    });
  });

  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (serviceSelect instanceof HTMLSelectElement && requestedService) {
    const matchingOption = Array.from(serviceSelect.options).find(
      (option) => option.value.toLowerCase() === requestedService.toLowerCase()
    );

    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    }
  }
}
