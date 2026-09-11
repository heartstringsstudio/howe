(() => {
  document.documentElement.classList.add('js');
  const target = new Date('2026-09-19T15:00:00-04:00').getTime();
  const endOfWeddingDay = new Date('2026-09-20T00:00:00-04:00').getTime();
  const grid = document.getElementById('countdown');
  const heading = document.getElementById('count-heading');
  const message = document.getElementById('count-message');
  const units = ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'].map(id => document.getElementById(id));
  let timer;
  function tick() {
    const now = Date.now();
    if (now >= target) {
      grid.hidden = true;
      message.hidden = false;
      heading.textContent = now >= endOfWeddingDay ? 'With love and thanks' : 'Today’s the day!';
      message.textContent = now >= endOfWeddingDay ? 'Thank you for celebrating with us.' : 'We can’t wait to celebrate with you.';
      if (now >= endOfWeddingDay && timer) clearInterval(timer);
      return;
    }
    const diff = target - now;
    [Math.floor(diff / 86400000), Math.floor(diff / 3600000) % 24, Math.floor(diff / 60000) % 60, Math.floor(diff / 1000) % 60]
      .forEach((value, index) => { units[index].textContent = String(value).padStart(2, '0'); });
  }
  tick();
  if (Date.now() < endOfWeddingDay) timer = setInterval(tick, 1000);
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.remove('awaiting'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.documentElement.classList.add('motion-ready');
    document.querySelectorAll('.reveal').forEach(el => {
      // Content already on screen remains visible; only upcoming sections animate.
      if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('awaiting');
      observer.observe(el);
    });
  }
})();
