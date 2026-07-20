// Interlink Properties — page logic.
// Content (listings + translations) lives in js/data.js.

let lang = localStorage.getItem("ilp-lang") || "en";
let shown = [];

function pickListings() {
  const idx = [...LISTINGS.keys()];
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  shown = idx.slice(0, 4).map(i => LISTINGS[i]);
}

function renderListings() {
  const grid = document.getElementById("listingGrid");
  grid.innerHTML = shown.map(l => `
    <article class="listing-card">
      <div class="tag">${TYPE_LABELS[l.t][lang]}</div>
      <h3>${lang === "hi" ? l.size_hi : l.size_en} · ${lang === "hi" ? l.area_hi : l.area_en}</h3>
      <p class="meta">${lang === "hi" ? l.hook_hi : l.hook_en}</p>
      <div class="price">${l.price}</div>
      <a class="btn btn-line" href="tel:+919899014501">${I18N[lang].listCta}</a>
    </article>`).join("");
}

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (I18N[lang][key]) el.textContent = I18N[lang][key];
  });
  const toggle = document.getElementById("langToggle");
  toggle.textContent = lang === "en" ? "हिंदी" : "English";
  toggle.setAttribute("aria-label", lang === "en" ? "हिंदी में देखें" : "Switch to English");
  renderListings();
  localStorage.setItem("ilp-lang", lang);
}

document.getElementById("langToggle").addEventListener("click", () => {
  lang = lang === "en" ? "hi" : "en";
  applyLang();
});

pickListings();
applyLang();

// ---------- Scroll reveal (progressive enhancement) ----------
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(".card, .listing-card, .review, .why-list li, .contact-card, .map-frame, .about-photo, .stat");
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  targets.forEach(t => {
    if (t.getBoundingClientRect().top < window.innerHeight) return; // already on screen: skip
    t.classList.add("js-reveal");
    io.observe(t);
  });
}
