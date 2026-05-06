// Form submission with Formspree (AJAX)
function handleForm(formId, successId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById(successId);

    // Basic client-side validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    if (!valid) return;

    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        success.style.display = 'block';
        btn.textContent = 'Sent!';
      } else {
        btn.disabled = false;
        btn.textContent = btn.dataset.label;
        alert('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = btn.dataset.label;
      alert('Network error. Please check your connection and try again.');
    }
  });

  // Store original label
  const btn = form.querySelector('button[type="submit"]');
  btn.dataset.label = btn.textContent;
}

handleForm('care-form', 'care-success');
handleForm('hiring-form', 'hire-success');

// Smooth active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));
