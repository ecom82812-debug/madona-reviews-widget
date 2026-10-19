/*
 * reviews-catalog.js v4 — зірочки рейтингу в каталозі та під назвою товару
 * Ключів немає: один маленький запит до API магазину на всі товари,
 * результат кешується в браузері на 10 хвилин.
 */
(function () {
  var API = 'https://pjbkmajnbqabkunlikoe.supabase.co/functions/v1/reviews-api?a=ratings';
  var CACHE_KEY = 'rw:ratings';
  var TTL = 10 * 60 * 1000;
  var ratings = null;
  var pending = null;

  // ── Дані: кеш → мережа → (при помилці) старий кеш ────────────
  function getRatings() {
    if (ratings) return Promise.resolve(ratings);
    if (pending) return pending;
    var c = null;
    try { c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (e) {}
    if (c && Date.now() - c.t < TTL) { ratings = c.d; return Promise.resolve(ratings); }
    pending = fetch(API)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        ratings = d.r || {};
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: ratings })); } catch (e) {}
        return ratings;
      })
      .catch(function () { ratings = c ? c.d : {}; return ratings; });
    return pending;
  }

  // ── Зірки SVG ──────────────────────────────────────────────
  function starsHtml(avg, size) {
    var html = '<span style="display:inline-flex;gap:2px;vertical-align:middle;">';
    for (var i = 1; i <= 5; i++) {
      var filled = i <= Math.round(avg);
      html += '<svg width="' + size + '" height="' + size + '" viewBox="0 0 16 16" aria-hidden="true">' +
        '<path fill="' + (filled ? '#111' : 'none') + '" stroke="#111" stroke-width="1.2" ' +
        'd="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/></svg>';
    }
    return html + '</span>';
  }

  // ══════════════════════════════════════════════════════════
  // 1. КАТАЛОГ
  // ══════════════════════════════════════════════════════════
  function renderCatalog() {
    var cards = document.querySelectorAll('.t-store__card[data-product-gen-uid]:not([data-rw-done])');
    if (!cards.length) return;
    getRatings().then(function (map) {
      var size = window.innerWidth <= 768 ? 12 : 14;
      cards.forEach(function (card) {
        if (card.dataset.rwDone) return;
        card.dataset.rwDone = '1';
        var x = map[card.getAttribute('data-product-gen-uid')];
        if (!x || !x[1]) return;
        var el = document.createElement('div');
        el.className = 'rw-catalog-rating';
        el.style.cssText = 'display:flex;align-items:center;gap:5px;font-family:inherit;font-size:12px;color:#666;margin:4px 0;';
        el.setAttribute('aria-label', 'Рейтинг ' + x[0].toFixed(1) + ' з 5, відгуків: ' + x[1]);
        el.innerHTML = starsHtml(x[0], size) +
          '<strong style="color:#111;font-weight:500;">' + x[0].toFixed(1) + '</strong>' +
          '<span style="color:#AAA;font-size:11px;">(' + x[1] + ')</span>';
        var title = card.querySelector('.t-store__card__title, .t-store__card-title, .js-store-prod-name, [class*="title"], h3, h2');
        if (title && title.parentNode) title.parentNode.insertBefore(el, title.nextSibling);
        else card.appendChild(el);
      });
    });
  }

  // ══════════════════════════════════════════════════════════
  // 2. РЕЙТИНГ ПІД НАЗВОЮ ТОВАРУ
  // ══════════════════════════════════════════════════════════
  function currentUid() {
    var m = window.location.pathname.match(/tproduct[\/\-](\d{6,})/);
    if (m) return m[1];
    var popup = document.querySelector('.t-popup_show .t-store__prod-popup, .t-store__prod-popup');
    if (popup) {
      var uid = popup.getAttribute('data-product-gen-uid');
      if (uid) return uid;
      var el = popup.querySelector('[data-product-gen-uid]');
      if (el) return el.getAttribute('data-product-gen-uid');
    }
    return null;
  }

  function renderProductRating() {
    var uid = currentUid();
    if (!uid || document.getElementById('rw-header-' + uid)) return;
    var titleEl = document.querySelector('.t-store__prod-popup__name, .js-store-prod-name');
    if (!titleEl) return;
    getRatings().then(function (map) {
      if (document.getElementById('rw-header-' + uid)) return;
      var x = map[uid];
      if (!x || !x[1]) return;
      var size = window.innerWidth <= 768 ? 16 : 20;
      var wrap = document.createElement('div');
      wrap.id = 'rw-header-' + uid;
      wrap.setAttribute('role', 'link');
      wrap.style.cssText = 'display:flex;align-items:center;gap:8px;font-family:inherit;font-size:13px;color:#666;margin:8px 0 10px;cursor:pointer;flex-wrap:wrap;';
      wrap.innerHTML = starsHtml(x[0], size) +
        '<strong style="color:#9E9E9E;font-weight:400;font-size:13px;">' + x[0].toFixed(1) + '</strong>' +
        '<span style="color:#000;font-size:13px;text-decoration:underline;text-underline-offset:2px;">' + x[1] + ' відгуків ↓</span>';
      wrap.addEventListener('click', function () {
        var w = document.getElementById('reviews-widget');
        if (w) w.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling); // під назвою
    });
  }

  // ══════════════════════════════════════════════════════════
  // СТАРТ: реагуємо на зміни сторінки, але не частіше ніж раз на 300 мс
  // ══════════════════════════════════════════════════════════
  var timer = null;
  function schedule() {
    if (timer) return;
    timer = setTimeout(function () { timer = null; renderCatalog(); renderProductRating(); }, 300);
  }
  function init() {
    schedule();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('popstate', schedule);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
