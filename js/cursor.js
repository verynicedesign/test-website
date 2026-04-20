(() => {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  const nav = document.getElementById('nav');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let lastEl = null;
  let lastDark = false;

  function isDarkBackground(el) {
    if (el.tagName === 'IMG' && el.src) {
      if (el.src.indexOf('_light') !== -1) return false;
      if (el.src.indexOf('_dark') !== -1) return true;
    }

    var interactive = el.closest('a, button, [role="button"]');
    if (interactive) {
      var bg = getComputedStyle(interactive).backgroundColor;
      if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
        var m = bg.match(/[\d.]+/g);
        if (m && m.length >= 3) {
          var a = m.length >= 4 ? parseFloat(m[3]) : 1;
          if (a >= 0.5) {
            var lum = (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]) / 255;
            return lum < 0.45;
          }
        }
      }
    }

    if (el.closest('[data-dark]')) return true;
    if (nav && nav.classList.contains('scrolled') && el.closest('#nav')) return true;
    if (nav && !nav.classList.contains('scrolled') && el.closest('#nav') && !nav.hasAttribute('data-dark')) return false;

    let current = el;
    while (current && current !== document.documentElement) {
      if (current.nodeType !== 1) { current = current.parentElement; continue; }
      const bg = getComputedStyle(current).backgroundColor;
      if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
        const m = bg.match(/[\d.]+/g);
        if (m && m.length >= 3) {
          const a = m.length >= 4 ? parseFloat(m[3]) : 1;
          if (a < 0.1) { current = current.parentElement; continue; }
          const lum = (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]) / 255;
          return lum < 0.45;
        }
      }
      current = current.parentElement;
    }
    return false;
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    const under = document.elementFromPoint(mouseX, mouseY);
    if (under && under !== lastEl) {
      lastEl = under;
      lastDark = isDarkBackground(under);
    }
    dot.classList.toggle('is-dark', lastDark);
    ring.classList.toggle('is-dark', lastDark);
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, [role="button"], input[type="submit"], summary').forEach((el) => {
    el.addEventListener('mouseenter', () => { dot.classList.add('is-hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('is-hover'); });
  });

  document.addEventListener('mousedown', () => {
    ring.classList.add('is-down');
    dot.classList.add('is-down');
  });
  document.addEventListener('mouseup', () => {
    ring.classList.remove('is-down');
    dot.classList.remove('is-down');
  });
})();
