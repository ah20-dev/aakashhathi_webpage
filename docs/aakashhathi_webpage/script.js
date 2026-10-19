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
