// Bidu: scripts do site promocional (index.html)

const WAITLIST_URL = "lista.html";
if (WAITLIST_URL) {
  document.querySelectorAll("[data-waitlist]").forEach(a => { a.href = WAITLIST_URL; });
  document.getElementById("listaBtn").hidden = false;
  document.getElementById("listaMsg").hidden = true;
}
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.getElementById("mv")?.remove();
  document.getElementById("mk")?.setAttribute("transform", "translate(470 60)");
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

// Cookie Banner Logic
const cookieBanner = document.getElementById("cookie-banner");
if (cookieBanner && !localStorage.getItem("cookieConsent")) {
  cookieBanner.style.display = "flex";
}

const acceptBtn = document.getElementById("accept-cookies");
if (acceptBtn) {
  acceptBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("cookieConsent", "accepted");
    if (cookieBanner) cookieBanner.hidden = true;
  });
}
