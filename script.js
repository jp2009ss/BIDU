// Bidu: scripts do site promocional (index.html)

const WAITLIST_URL = "lista.html";
if (WAITLIST_URL) {
  document.querySelectorAll("[data-waitlist]").forEach(a => { a.href = WAITLIST_URL; });
  document.getElementById("listaBtn").hidden = false;
  document.getElementById("listaMsg").hidden = true;
}
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const mk = document.getElementById("mk");
  if (mk) mk.setAttribute("transform", "translate(470 60)");
}

const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".stairs").forEach(s => obs.observe(s));
