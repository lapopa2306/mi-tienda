export function scrollToHash(e, hash) {
  if (e) e.preventDefault();
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -64 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
