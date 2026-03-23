/*
 * reviews-catalog.js
 * Підключається глобально через Site Settings → Custom Code → Body
 * 1. Рейтинг під кожною карткою в каталозі
 * 2. Рейтинг біля назви товару на сторінці товару
 */

var RW_CATALOG_CONFIG = {
  supabaseUrl:  'https://pjbkmajnbqabkunlikoe.supabase.co',
  supabaseAnon: 'sb_publishable_UXLaCY899UlouOFe_7xG7Q_b8KreJ85',
  starSize_catalog: 14,
  starSize_product: 20,
};

(function () {
  'use strict';

  var BASE = RW_CATALOG_CONFIG.supabaseUrl + '/rest/v1';
  var KEY  = RW_CATALOG_CONFIG.supabaseAnon;

  // ── Отримати UID товару з URL ──────────────────────────────
  function getProductUid() {
    // Формат Tilda: /tproduct/430898805012-назва або /назва-tproduct-430898805012-...
    var m = window.location.pathname.match(/tproduct[\/\-](\d{10,})/);
    if (m) return m[1];
    // Запасний варіант — будь-яке 10+ цифрове число в URL
    var m2 = window.location.pathname.match(/(\d{10,})/);
    if (m2) return m2[1];
    return null;
  }

  // ── Зірки SVG ──────────────────────────────────────────────
  function starsHtml(avg, size) {
    var html = '<span style="display:inline-flex;gap:2px;vertical-align:middle;">';
    for (var i = 1; i <= 5; i++) {
      var filled = i <= Math.round(avg);
      html += '<svg width="' + size + '" height="' + size + '" viewBox="0 0 16 16">' +
        '<path fill="' + (filled ? '#111' : 'none') + '" stroke="#111" stroke-width="1.2" ' +
        'd="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/></svg>';
    }
    return html + '</span>';
  }

  // ── Завантажити рейтинг для uid ────────────────────────────
  function fetchRating(uid, callback) {
    fetch(BASE + '/reviews?product_id=like.*' + uid + '*&approved=eq.true&select=rating', {
      headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY }
    })
    .then(function(r) { return r.json(); })
    .then(function(rows) {
      if (!rows || !rows.length) { callback(null); return; }
      var total = rows.reduce(function(s, r) { return s + (r.rating || 0); }, 0);
      callback({ avg: total / rows.length, count: rows.length });
    })
    .catch(function() { callback(null); });
  }

  // ══════════════════════════════════════════════════════════
  // 1. РЕЙТИНГ В КАТАЛОЗІ
  // ══════════════════════════════════════════════════════════
  function processCard(card, uid) {
    if (card.dataset.rwDone) return;
    card.dataset.rwDone = '1';

    fetchRating(uid, function(data) {
      if (!data) return;

      var el = document.createElement('div');
      el.className = 'rw-catalog-rating';
      el.style.cssText = 'display:flex;align-items:center;gap:5px;font-family:inherit;font-size:12px;color:#666;margin:4px 0;';
      el.innerHTML = starsHtml(data.avg, RW_CATALOG_CONFIG.starSize_catalog) +
        '<strong style="color:#111;font-weight:500;">' + data.avg.toFixed(1) + '</strong>' +
        '<span style="color:#AAA;font-size:11px;">(' + data.count + ')</span>';

      var insertAfter = card.querySelector(
        '.t-store__card__title, .t-store__card-title, .js-store-prod-name, [class*="title"], h3, h2'
      );
      if (insertAfter && insertAfter.parentNode) {
        insertAfter.parentNode.insertBefore(el, insertAfter.nextSibling);
      } else {
        card.appendChild(el);
      }
    });
  }

  function renderCatalogRatings() {
    var cards = document.querySelectorAll('.t-store__card[data-product-gen-uid]');
    cards.forEach(function(card) {
      var uid = card.getAttribute('data-product-gen-uid');
      if (uid) processCard(card, uid);
    });
  }

  // ══════════════════════════════════════════════════════════
  // 2. РЕЙТИНГ НА СТОРІНЦІ ТОВАРУ (біля назви)
  // Точно як у старому коді — tryInsertHeader + MutationObserver
  // ══════════════════════════════════════════════════════════
  function initProductPageRating(uid) {

    function tryInsertHeader() {
      var titleEl = document.querySelector('.t-store__prod-popup__name, .js-store-prod-name');
      if (!titleEl) return false;
      if (document.getElementById('rw-header-' + uid)) return true;

      // Створюємо враппер — при кліку прокручуємо до відгуків
      var wrap = document.createElement('div');
      wrap.id = 'rw-header-' + uid;
      wrap.style.cssText = 'display:flex;align-items:center;gap:6px;font-family:inherit;font-size:13px;color:#666;margin:6px 0 10px;cursor:pointer;';
      wrap.innerHTML = '<span style="width:80px;height:14px;background:#F0F0F0;display:inline-block;border-radius:2px;"></span>';

      wrap.addEventListener('click', function() {
        var widget = document.getElementById('reviews-widget');
        if (widget) widget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      titleEl.parentNode.insertBefore(wrap, titleEl);

      // Завантажуємо реальний рейтинг
      fetchRating(uid, function(data) {
        if (!data) {
          wrap.style.display = 'none';
          return;
        }
        wrap.innerHTML =
          starsHtml(data.avg, RW_CATALOG_CONFIG.starSize_product) +
          '<strong style="color:#111;font-weight:500;">' + data.avg.toFixed(1) + '</strong>' +
          '<span style="color:#AAA;font-size:12px;">(' + data.count + ' відгуків)</span>';
      });

      return true;
    }

    // Чекаємо поки елемент з'явиться — точно як у старому коді
    if (!tryInsertHeader()) {
      var obs = new MutationObserver(function() {
        if (tryInsertHeader()) obs.disconnect();
      });
      obs.observe(document.body, { childList: true, subtree: true });
    }

    setTimeout(tryInsertHeader, 500);
    setTimeout(tryInsertHeader, 1500);
    setTimeout(tryInsertHeader, 3000);
  }

  // ══════════════════════════════════════════════════════════
  // СТАРТ
  // ══════════════════════════════════════════════════════════

  // Каталог
  setTimeout(renderCatalogRatings, 1000);
  setTimeout(renderCatalogRatings, 2500);
  setTimeout(renderCatalogRatings, 5000);

  var obs = new MutationObserver(function() {
    var newCards = document.querySelectorAll('.t-store__card[data-product-gen-uid]:not([data-rw-done])');
    if (newCards.length) renderCatalogRatings();
  });
  obs.observe(document.body, { childList: true, subtree: true });

  // Сторінка товару
  var productUid = getProductUid();
  if (productUid) {
    initProductPageRating(productUid);
  }

})();
