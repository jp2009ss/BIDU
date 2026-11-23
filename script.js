// Bidu: scripts do site promocional (index.html)

const WAITLIST_URL = "lista.html";
if (WAITLIST_URL) {
  document.querySelectorAll("[data-waitlist]").forEach(a => { a.href = WAITLIST_URL; });
  const btn = document.getElementById("listaBtn");
  const msg = document.getElementById("listaMsg");
  if (btn) btn.hidden = false;
  if (msg) msg.hidden = true;
}

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// true: o cachorro anda mesmo com "reduzir movimento" ligado no sistema (há botão para pausar).
// false: quem pediu menos movimento vê o cachorro parado no parque.
const DOG_ALWAYS_MOVES = true;

if (reduceMotion) {
  const mk = document.getElementById("mk");
  if (mk) {
    mk.querySelectorAll(":scope > circle").forEach(el => el.remove()); // tira o pulso
    if (!DOG_ALWAYS_MOVES) {
      mk.querySelectorAll("animate, animateMotion, animateTransform").forEach(el => el.remove());
      mk.setAttribute("transform", "translate(470 60)");
    }
  }
}

// Botão de pausa da animação da rota (a escolha fica salva)
const route = document.querySelector(".route");
const routeSvg = document.querySelector(".route svg");
const motionToggle = document.getElementById("motionToggle");
function setPaused(paused) {
  if (routeSvg && routeSvg.pauseAnimations) {
    if (paused) routeSvg.pauseAnimations(); else routeSvg.unpauseAnimations();
  }
  if (route) route.classList.toggle("paused", paused);
  if (motionToggle) {
    motionToggle.setAttribute("aria-pressed", String(paused));
    motionToggle.textContent = paused ? "Reproduzir animação" : "Pausar animação";
  }
  try { localStorage.setItem("bidu_motion", paused ? "paused" : "play"); } catch (e) { /* ignora */ }
}
if (motionToggle) {
  motionToggle.addEventListener("click", () => setPaused(motionToggle.getAttribute("aria-pressed") !== "true"));
  let saved = null;
  try { saved = localStorage.getItem("bidu_motion"); } catch (e) { /* ignora */ }
  if (saved === "paused") setPaused(true);
}

// Degraus do rank: aparecem quando entram na tela
const stairs = document.querySelectorAll(".stairs");
if (reduceMotion || !("IntersectionObserver" in window)) {
  stairs.forEach(s => s.classList.add("animate-in"));
} else {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  stairs.forEach(s => obs.observe(s));
}