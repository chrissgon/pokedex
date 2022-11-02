(function initParallax() {
  try {
    const els = document.querySelectorAll(".parallax");

    if (els.length === 0) throw new Error("undefined elements");

    for (const el of document.querySelectorAll(".parallax")) {
      new Parallax(el);
    }
  } catch {
    setTimeout(() => {
      initParallax();
    }, 1000);
  }
})();
