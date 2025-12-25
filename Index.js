(function () {
  const scrollHint = document.getElementById("scrollHint");
  const coverWrap = document.getElementById("coverWrap");
  const cover = document.getElementById("cover");

  if (!coverWrap || !cover) return;

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function getCoverProgress() {
    const rect = coverWrap.getBoundingClientRect();
    const total = coverWrap.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    return clamp(scrolled / Math.max(1, total), 0, 1);
  }

  function onScroll() {
    if (scrollHint) {
      scrollHint.classList.toggle("is-hidden", window.scrollY > 80);
    }

    const p = getCoverProgress();
    const y = lerp(0, -80, p);
    const op = lerp(1, 0, p);

    cover.style.transform = `translateY(${y}px)`;
    cover.style.opacity = `${op}`;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();
