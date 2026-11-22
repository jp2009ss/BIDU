// Bidu: lista de espera & Gestão de Leads

function initBidu() {
  const COUNT = 142;    // número atual
  const GOAL = 200;      // meta
  const WHATSAPP_NUMBER = "5511999999999"; // Substitua pelo seu WhatsApp real

  // UI Elements
  const n = document.getElementById("n");
  const mk = document.getElementById("mk");
  const done = document.getElementById("done");
  const introView = document.getElementById("intro-view");
  const formSection = document.getElementById("form-section");
  const leadForm = document.getElementById("leadForm");
  const openFormBtn = document.getElementById("openFormBtn");
  const backBtn = document.getElementById("backBtn");
  const successMessage = document.getElementById("successMessage");

  console.log("Bidu: Iniciando script", { openFormBtn: !!openFormBtn, leadForm: !!leadForm });

  // 1. UTM Tracking
  function getUTMs() {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('utm_source') || 'direto',
      medium: params.get('utm_medium') || 'web',
      campaign: params.get('utm_campaign') || 'nenhuma',
      content: params.get('utm_content') || '',
      ref: document.referrer || ''
    };
  }

  const utms = getUTMs();

  // 2. Animação da Barra
  const pct = Math.min(1, COUNT / GOAL);
  function draw(t) {
    if(n) n.textContent = Math.round(COUNT * t).toLocaleString("pt-BR");
    const p = pct * t * 100;
    if(mk) mk.style.left = p + "%";
    if(done) done.style.width = p + "%";
  }

  // Reseta estado para animar
  if (n) n.textContent = "0";
  if (mk) mk.style.left = "0%";
  if (done) done.style.width = "0%";

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

  // 3. Lógica do Formulário
  if (openFormBtn) {
    openFormBtn.onclick = (e) => {
      e.preventDefault();
      console.log("Bidu: Abrindo formulário");
      if (introView) introView.style.display = 'none';
      if (formSection) formSection.style.display = 'block';
      // Evento Pixel: Iniciou cadastro
      if (typeof fbq === 'function') fbq('track', 'Lead', { step: 'init' });
    };
  }

  if (backBtn) {
    backBtn.onclick = (e) => {
      e.preventDefault();
      if (introView) introView.style.display = 'block';
      if (formSection) formSection.style.display = 'none';
    };
  }

  if (leadForm) {
    leadForm.onsubmit = async (e) => {
      e.preventDefault();
      console.log("Bidu: Enviando formulário");

      const formData = new FormData(leadForm);
      const data = {
        nome: formData.get('nome'),
        whatsapp: formData.get('whatsapp'),
        email: formData.get('email'),
        perfil: formData.get('perfil'),
        ...utms,
        timestamp: new Date().toISOString()
      };

      // a. Salvar no CRM Local
      localStorage.setItem('lastLead', JSON.stringify(data));

      // c. Pixel Lead Success
      if (typeof fbq === 'function') fbq('track', 'Lead', { value: 1.0, currency: 'BRL' });

      // d. WhatsApp Redirect
      const msg = `Olá! Meu nome é ${data.nome} (${data.perfil}). Gostaria de entrar na lista VIP do Bidu! 🐾\nE-mail: ${data.email}`;
      const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

      leadForm.style.display = 'none';
      if (successMessage) {
        successMessage.hidden = false;
        successMessage.style.display = 'block';
      }

      console.log("Bidu: Redirecionando para WhatsApp");
      setTimeout(() => {
        window.open(waLink, '_blank');
      }, 800);
    };
  }
}

// Executa no DOMContentLoaded por segurança
document.addEventListener("DOMContentLoaded", initBidu);
