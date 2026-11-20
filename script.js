// Bidu: scripts do site promocional (index.html)

const WAITLIST_URL = "lista.html";
if (WAITLIST_URL) {
  document.querySelectorAll("[data-waitlist]").forEach(a => { a.href = WAITLIST_URL; });
  document.getElementById("listaBtn").hidden = false;
  document.getElementById("listaMsg").hidden = true;
}
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.getElementById("mv").remove();
  document.getElementById("mk").setAttribute("transform", "translate(470 60)");
}
