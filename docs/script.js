// Refresh starts at the top; fresh anchor links and in-page navigation still work.
const isPageReload = performance.getEntriesByType('navigation')[0]?.type === 'reload';
if (isPageReload) {
  history.scrollRestoration = 'manual';
  if (location.hash) {
    history.replaceState(history.state, '', location.pathname + location.search);
  }
  window.addEventListener('pageshow', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      history.scrollRestoration = 'auto';
    });
  }, { once: true });
}

const progress = document.querySelector('.progress');
let queued = false;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, window.scrollY / distance) : 0})`;
  queued = false;
}
window.addEventListener('scroll', () => {
  if (!queued) { queued = true; requestAnimationFrame(updateProgress); }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
const navLinks = [...document.querySelectorAll('.rail nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        for (const link of navLinks) {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        }
      }
    }
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('.timeline > section[id]').forEach(section => observer.observe(section));
}

// Deter casual copying. Publicly served content remains accessible in page source.
for (const eventName of ['copy', 'cut', 'contextmenu']) {
  document.addEventListener(eventName, event => {
    const target = event.target;
    if (target instanceof Element && target.closest('input, textarea, [contenteditable="true"]')) return;
    event.preventDefault();
  });
}
document.addEventListener('dragstart', event => {
  if (event.target instanceof Element && event.target.closest('img')) event.preventDefault();
});
