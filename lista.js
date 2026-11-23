// Bidu: lista de espera e captura de leads

function initBidu() {
  const COUNT = 0;                          // número atual de pessoas na lista
  const GOAL = 200;                         // meta da barra
  const WHATSAPP_NUMBER = "5511999999999";  // TROQUE pelo número real (com 55 + DDD)

  // Elementos da página
  const n = document.getElementById("n");
  const srn = document.getElementById("srn");
  const mk = document.getElementById("mk");
  const done = document.getElementById("done");
  const first = document.getElementById("first");
  const goalTxt = document.getElementById("goalTxt");
  const introView = document.getElementById("intro-view");
  const formSection = document.getElementById("form-section");
  const leadForm = document.getElementById("leadForm");
  const openFormBtn = document.getElementById("openFormBtn");
  const backBtn = document.getElementById("backBtn");
  const successMessage = document.getElementById("successMessage");
  const waLinkEl = document.getElementById("waLink");

  // 1. UTMs da campanha
  const params = new URLSearchParams(window.location.search);
  const utms = {
    source: params.get("utm_source") || "direto",
    medium: params.get("utm_medium") || "web",
    campaign: params.get("utm_campaign") || "nenhuma",
    content: params.get("utm_content") || "",
    ref: document.referrer || ""
  };

  // 2. Contador e barra
  if (srn) srn.textContent = COUNT + " pessoas na lista";
  if (goalTxt) goalTxt.textContent = "Meta: " + GOAL + " pessoas";
  if (first) first.hidden = COUNT !== 0;

  const pct = Math.min(1, COUNT / GOAL);
  function draw(t) {
    if (n) n.textContent = Math.round(COUNT * t).toLocaleString("pt-BR");
    const p = pct * t * 100;
    if (mk) mk.style.left = p + "%";
    if (done) done.style.width = p + "%";
  }

  if (matchMedia("(prefers-reduced-motion: reduce)").matches || COUNT === 0) {
    draw(1);
  } else {
    draw(0);
    const start = performance.now(), dur = 1400;
    (function step(now) {
      const k = Math.min(1, (now - start) / dur);
      draw(1 - Math.pow(1 - k, 3));
      if (k < 1) requestAnimationFrame(step);
    })(start);
  }

  // 3. Formulário
  if (openFormBtn) {
    openFormBtn.onclick = (e) => {
      e.preventDefault();
      if (introView) introView.style.display = "none";
      if (formSection) formSection.style.display = "block";
      if (typeof fbq === "function") fbq("track", "Lead", { step: "init" });
    };
  }

  if (backBtn) {
    backBtn.onclick = (e) => {
      e.preventDefault();
      if (introView) introView.style.display = "block";
      if (formSection) formSection.style.display = "none";
    };
  }

  if (leadForm) {
    leadForm.onsubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(leadForm);
      const data = {
        nome: formData.get("nome"),
        whatsapp: formData.get("whatsapp"),
        email: formData.get("email"),
        perfil: formData.get("perfil"),
        ...utms,
        timestamp: new Date().toISOString()
      };

      // Guarda uma cópia só neste navegador (não é um banco de dados)
      try { localStorage.setItem("lastLead", JSON.stringify(data)); } catch (err) { /* ignora */ }

      if (typeof fbq === "function") fbq("track", "Lead");

      const msg = `Olá! Meu nome é ${data.nome} (${data.perfil}). Gostaria de entrar na lista VIP do Bidu! 🐾\nE-mail: ${data.email}`;
      const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

      leadForm.style.display = "none";
      if (waLinkEl) waLinkEl.href = waLink;
      if (successMessage) {
        successMessage.hidden = false;
        successMessage.style.display = "block";
      }

      // Abre direto no gesto do usuário (evita bloqueio de pop-up). Se bloquear, o botão "Abrir WhatsApp" resolve.
      window.open(waLink, "_blank", "noopener");
    };
  }
}

document.addEventListener("DOMContentLoaded", initBidu);