/*
 * reviews-catalog.js
 * Вставляється глобально через Site Settings → Custom Code → Body
 * Відображає рейтинг під кожною карткою товару в каталозі Tilda
 */

var RW_CATALOG_CONFIG = {
  supabaseUrl:  'https://pjbkmajnbqabkunlikoe.supabase.co',
  supabaseAnon: 'sb_publishable_UXLaCY899UlouOFe_7xG7Q_b8KreJ85',
  starSize_desktop: 14,
  starSize_mobile:  12,
};

(function () {
  'use strict';

  var BASE = RW_CATALOG_CONFIG.supabaseUrl + '/rest/v1';
  var KEY  = RW_CATALOG_CONFIG.supabaseAnon;

  function isMobile() { return window.innerWidth <= 768; }
  function starSize() { return isMobile() ? RW_CATALOG_CONFIG.starSize_mobile : RW_CATALOG_CONFIG.starSize_desktop; }

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

  function processCard(card, uid) {
    if (card.dataset.rwDone) return;
    card.dataset.rwDone = '1';

    var size = starSize();

    fetch(BASE + '/reviews?product_id=like.*' + uid + '*&approved=eq.true&select=rating', {
      headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY }
    })
    .then(function(r) { return r.json(); })
    .then(function(rows) {
      if (!rows || !rows.length) return;

      var total = rows.reduce(function(s, r) { return s + (r.rating || 0); }, 0);
      var avg   = total / rows.length;

      var el = document.createElement('div');
      el.className = 'rw-catalog-rating';
      el.style.cssText = 'display:flex;align-items:center;gap:5px;font-family:inherit;font-size:12px;color:#666;margin:4px 0;';
      el.innerHTML = starsHtml(avg, size) +
        '<strong style="color:#111;font-weight:500;">' + avg.toFixed(1) + '</strong>' +
        '<span style="color:#AAA;font-size:11px;">(' + rows.length + ')</span>';

      var insertAfter = card.querySelector(
        '.t-store__card__title, .t-store__card-title, .js-store-prod-name, [class*="title"], h3, h2'
      );
      if (insertAfter && insertAfter.parentNode) {
        insertAfter.parentNode.insertBefore(el, insertAfter.nextSibling);
      } else {
        card.appendChild(el);
      }
    })
    .catch(function() {});
  }

  function renderCatalogRatings() {
    var cards = document.querySelectorAll('.t-store__card[data-product-gen-uid]');
    cards.forEach(function(card) {
      var uid = card.getAttribute('data-product-gen-uid');
      if (uid) processCard(card, uid);
    });
  }

  setTimeout(renderCatalogRatings, 1000);
  setTimeout(renderCatalogRatings, 2500);
  setTimeout(renderCatalogRatings, 5000);

  var obs = new MutationObserver(function() {
    var newCards = document.querySelectorAll('.t-store__card[data-product-gen-uid]:not([data-rw-done])');
    if (newCards.length) renderCatalogRatings();
  });
  obs.observe(document.body, { childList: true, subtree: true });

})();
