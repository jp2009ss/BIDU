// Bidu: lista de espera. Edite COUNT, GOAL e FORM_URL abaixo.

const COUNT = 0;      // número de pessoas na lista
const GOAL = 100;     // meta da barra
const FORM_URL = "";  // link do formulário de inscrição

const n = document.getElementById("n"), mk = document.getElementById("mk"), done = document.getElementById("done");
document.getElementById("srn").textContent = COUNT + " pessoas na lista";
document.getElementById("goalTxt").textContent = "Meta: " + GOAL + " pessoas";
if (COUNT === 0) document.getElementById("first").hidden = false;

const forms = document.querySelectorAll("[data-form]");
if (FORM_URL) {
  forms.forEach(a => { a.href = FORM_URL; a.target = "_blank"; a.rel = "noopener"; });
} else {
  forms.forEach(a => a.setAttribute("aria-disabled", "true"));
  document.getElementById("msg").hidden = false;
}

const pct = Math.min(1, COUNT / GOAL);
function draw(t) {
  n.textContent = Math.round(COUNT * t).toLocaleString("pt-BR");
  const p = pct * t * 100;
  mk.style.left = p + "%";
  done.style.width = p + "%";
}
if (matchMedia("(prefers-reduced-motion: reduce)").matches || COUNT === 0) {
  draw(1);
} else {
  const start = performance.now(), dur = 1400;
  (function step(now) {
    const k = Math.min(1, (now - start) / dur);
    draw(1 - Math.pow(1 - k, 3));
    if (k < 1) requestAnimationFrame(step);
  })(start);
}
