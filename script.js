/* =========================================================
   FIZA TAHIR — PORTFOLIO SCRIPT
   Two responsibilities only: mobile navigation toggle, and
   revealing sections as they scroll into view.
   ========================================================= */

document.documentElement.classList.remove('no-js');

/* ---------- Mobile navigation ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // close the menu after a link is chosen
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

/* ---------- Work filter tabs ---------- */
const workTabs = document.getElementById('workTabs');
const workList = document.getElementById('workList');

if (workTabs && workList) {
  const tabs = workTabs.querySelectorAll('.work-tab');
  const rows = workList.querySelectorAll('.work-row');

  workTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.work-tab');
    if (!tab) return;

    tabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');

    const filter = tab.dataset.filter;
    rows.forEach((row) => {
      const show = filter === 'all' || row.dataset.category === filter;
      row.classList.toggle('is-hidden', !show);
    });
  });
}

/* ---------- Contact form ---------- */
// Static site, no backend — this opens the visitor's email client with the
// message pre-filled. Swap the mailto address for your real one, or point
// this at a form service (e.g. Formspree) if you'd rather receive submissions
// directly without the visitor needing their own email client to open.
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const info = document.getElementById('projectInfo').value;

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`${info}\n\n— ${name} (${email})`);

    window.location.href = `mailto:fizaatahir1506@gmail.com?subject=${subject}&body=${body}`;
  });
}
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // no IntersectionObserver support — just show everything
  revealEls.forEach((el) => el.classList.add('is-visible'));
}
