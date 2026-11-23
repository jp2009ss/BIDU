// Bidu: aviso de cookies e Meta Pixel (o Pixel só carrega depois do aceite)

(function () {
  const PIXEL_ID = "";  // coloque aqui o ID do Meta Pixel. Vazio = sem Pixel e sem aviso.
  const KEY = "bidu_cookieConsent";

  function getConsent() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* ignora */ }
  }

  function loadPixel() {
    if (!PIXEL_ID || window.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
  }

  function showBanner() {
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Aviso de cookies");
    banner.innerHTML =
      '<p>Usamos cookies de marketing (Meta Pixel) para medir nossas campanhas, mas só se você aceitar. ' +
      '<a href="privacidade.html" target="_blank" rel="noopener">Saiba mais</a></p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn ghost" id="cookie-refuse">Recusar</button>' +
      '<button type="button" class="btn" id="cookie-accept">Aceitar</button>' +
      "</div>";
    document.body.appendChild(banner);
    document.getElementById("cookie-accept").onclick = () => { setConsent("accepted"); banner.remove(); loadPixel(); };
    document.getElementById("cookie-refuse").onclick = () => { setConsent("refused"); banner.remove(); };
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!PIXEL_ID) return;
    const consent = getConsent();
    if (consent === "accepted") loadPixel();
    else if (consent !== "refused") showBanner();
  });
})();