/*
 * reviews-catalog.js v3 — через Cloudflare Worker
 * Ключ Supabase схований у Worker, не видимий в браузері
 */

var RW_WORKER_URL = 'https://madona-reviews.hatsauck22.workers.dev/api';
var RW_KEY = 'sb_publishable_ZGGrztF1NG0yYDzh6YudHA_10vfmz7D';

// ── Зірки SVG ──────────────────────────────────────────────
function rwStarsHtml(avg, size) {
  var html = '<span style="display:inline-flex;gap:2px;vertical-align:middle;">';
  for (var i = 1; i <= 5; i++) {
    var filled = i <= Math.round(avg);
    html += '<svg width="' + size + '" height="' + size + '" viewBox="0 0 16 16">' +
      '<path fill="' + (filled ? '#111' : 'none') + '" stroke="#111" stroke-width="1.2" ' +
      'd="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/></svg>';
  }
  return html + '</span>';
}

// ══════════════════════════════════════════════════════════
// 1. КАТАЛОГ — ОДИН ПАКЕТНИЙ ЗАПИТ ДЛЯ ВСІХ КАРТОК
// ══════════════════════════════════════════════════════════
function rwRenderCatalog() {
  var cards = document.querySelectorAll('.t-store__card[data-product-gen-uid]:not([data-rw-done])');
  if (!cards.length) return;

  var uids = [];
  cards.forEach(function(card) {
    var uid = card.getAttribute('data-product-gen-uid');
    if (uid) { card.dataset.rwDone = '1'; uids.push(uid); }
  });
  if (!uids.length) return;

  var orFilter = uids.map(function(uid) {
    return 'product_id.like.*' + uid + '*';
  }).join(',');

  fetch('https://pjbkmajnbqabkunlikoe.supabase.co/rest/v1/reviews?or=(' + orFilter + ')&approved=eq.true&select=product_id,rating', { headers: { 'apikey': 'sb_publishable_ZGGrztF1NG0yYDzh6YudHA_10vfmz7D', 'Authorization': 'Bearer sb_publishable_ZGGrztF1NG0yYDzh6YudHA_10vfmz7D' } })
  .then(function(r) { return r.json(); })
  .then(function(rows) {
    if (!rows || !Array.isArray(rows)) return;

    var groups = {};
    rows.forEach(function(r) {
      uids.forEach(function(uid) {
        if (r.product_id && r.product_id.indexOf(uid) !== -1) {
          if (!groups[uid]) groups[uid] = [];
          groups[uid].push(r.rating);
        }
      });
    });

    var size = window.innerWidth <= 768 ? 12 : 14;
    cards.forEach(function(card) {
      var uid = card.getAttribute('data-product-gen-uid');
      var ratings = groups[uid];
      if (!ratings || !ratings.length) return;

      var avg = ratings.reduce(function(s, v) { return s + v; }, 0) / ratings.length;

      var el = document.createElement('div');
      el.className = 'rw-catalog-rating';
      el.style.cssText = 'display:flex;align-items:center;gap:5px;font-family:inherit;font-size:12px;color:#666;margin:4px 0;';
      el.innerHTML = rwStarsHtml(avg, size) +
        '<strong style="color:#111;font-weight:500;">' + avg.toFixed(1) + '</strong>' +
        '<span style="color:#AAA;font-size:11px;">(' + ratings.length + ')</span>';

      var insertAfter = card.querySelector(
        '.t-store__card__title, .t-store__card-title, .js-store-prod-name, [class*="title"], h3, h2'
      );
      if (insertAfter && insertAfter.parentNode) {
        insertAfter.parentNode.insertBefore(el, insertAfter.nextSibling);
      } else {
        card.appendChild(el);
      }
    });
  })
  .catch(function() {});
}

// ══════════════════════════════════════════════════════════
// 2. РЕЙТИНГ НА СТОРІНЦІ ТОВАРУ
// ══════════════════════════════════════════════════════════
function rwInitProductRating(uid) {
  function tryInsert() {
    var titleEl = document.querySelector('.t-store__prod-popup__name, .js-store-prod-name');
    if (!titleEl) return false;
    if (document.getElementById('rw-header-' + uid)) return true;

    var wrap = document.createElement('div');
    wrap.id = 'rw-header-' + uid;
    wrap.style.cssText = 'display:flex;align-items:center;gap:8px;font-family:inherit;font-size:13px;color:#666;margin:6px 0 10px;cursor:pointer;flex-wrap:wrap;';
    wrap.innerHTML = '<span style="width:80px;height:14px;background:#F0F0F0;display:inline-block;border-radius:2px;"></span>';
    wrap.addEventListener('click', function() {
      var widget = document.getElementById('reviews-widget');
      if (widget) widget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    titleEl.parentNode.insertBefore(wrap, titleEl);

    fetch('https://pjbkmajnbqabkunlikoe.supabase.co/rest/v1/reviews?product_id=like.*' + uid + '*&approved=eq.true&select=rating', { headers: { 'apikey': 'sb_publishable_ZGGrztF1NG0yYDzh6YudHA_10vfmz7D', 'Authorization': 'Bearer sb_publishable_ZGGrztF1NG0yYDzh6YudHA_10vfmz7D' } })
    .then(function(r) { return r.json(); })
    .then(function(rows) {
      if (!rows || !rows.length) { wrap.style.display = 'none'; return; }
      var avg = rows.reduce(function(s, r) { return s + (r.rating || 0); }, 0) / rows.length;
      var size = window.innerWidth <= 768 ? 16 : 20;
      wrap.innerHTML =
        rwStarsHtml(avg, size) +
        '<strong style="color:#9E9E9E;font-weight:400;font-size:13px;">' + avg.toFixed(1) + '</strong>' +
        '<span style="color:#000;font-size:13px;text-decoration:underline;text-underline-offset:2px;">' + rows.length + ' відгуків ↓</span>';
    })
    .catch(function() { wrap.style.display = 'none'; });

    return true;
  }

  if (!tryInsert()) {
    var obs = new MutationObserver(function() { if (tryInsert()) obs.disconnect(); });
    obs.observe(document.body, { childList: true, subtree: true });
  }
  setTimeout(tryInsert, 500);
  setTimeout(tryInsert, 1500);
  setTimeout(tryInsert, 3000);
}

function rwGetCurrentProductUid() {
  var m = window.location.pathname.match(/tproduct[\/\-](\d{10,})/);
  if (m) return m[1];
  var popup = document.querySelector('.t-store__prod-popup, .t-popup_show .t-store__prod-popup');
  if (popup) {
    var uid = popup.getAttribute('data-product-gen-uid') || popup.dataset.productGenUid;
    if (uid) return uid;
    var el = popup.querySelector('[data-product-gen-uid]');
    if (el) return el.getAttribute('data-product-gen-uid');
  }
  return null;
}

// ══════════════════════════════════════════════════════════
// СТАРТ
// ══════════════════════════════════════════════════════════
(function() {
  setTimeout(rwRenderCatalog, 1500);
  setTimeout(rwRenderCatalog, 3500);

  var obs = new MutationObserver(function() {
    var newCards = document.querySelectorAll('.t-store__card[data-product-gen-uid]:not([data-rw-done])');
    if (newCards.length) rwRenderCatalog();
  });
  obs.observe(document.body, { childList: true, subtree: true });

  var lastUid = '';
  function checkAndInit() {
    var uid = rwGetCurrentProductUid();
    if (!uid || uid === lastUid) return;
    lastUid = uid;
    rwInitProductRating(uid);
  }
  checkAndInit();
  window.addEventListener('popstate', checkAndInit);
  setInterval(checkAndInit, 500);
})();
