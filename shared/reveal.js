/* ============================================================
   Shared scroll behaviour — classic (non-module) script so it
   runs over file:// via <script src="../shared/reveal.js"></script>.

   Provides:
   - .reveal  -> adds .is-visible when scrolled into view
   - .progress -> sets --progress (0..1) for the top bar
   - .nav-dots a[href="#id"] -> toggles .is-active for current section
   - window.__scrollProgress -> 0..1, read by three.js scenes each frame
   ============================================================ */
(function () {
  "use strict";

  // --- Reveal on scroll ---
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target); // reveal once
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // --- Section nav dots (active state via IntersectionObserver) ---
  var sections = document.querySelectorAll(".section[id]");
  var dotFor = {};
  document.querySelectorAll(".nav-dots a").forEach(function (a) {
    var id = a.getAttribute("href").replace("#", "");
    dotFor[id] = a;
  });
  if (sections.length && "IntersectionObserver" in window) {
    var navIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && dotFor[e.target.id]) {
            Object.keys(dotFor).forEach(function (k) {
              dotFor[k].classList.toggle("is-active", k === e.target.id);
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach(function (s) { navIo.observe(s); });
  }

  // --- Scroll progress (bar + global for three.js) ---
  var bar = document.querySelector(".progress");
  window.__scrollProgress = 0;
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      window.__scrollProgress = p;
      if (bar) bar.style.setProperty("--progress", p.toFixed(4));
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();
})();
