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

var RW_BASE = RW_CATALOG_CONFIG.supabaseUrl + '/rest/v1';
var RW_KEY  = RW_CATALOG_CONFIG.supabaseAnon;

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

// ── Завантажити рейтинг ─────────────────────────────────────
function rwFetchRating(uid, callback) {
  fetch(RW_BASE + '/reviews?product_id=like.*' + uid + '*&approved=eq.true&select=rating', {
    headers: { 'apikey': RW_KEY, 'Authorization': 'Bearer ' + RW_KEY }
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
function rwProcessCard(card, uid) {
  if (card.dataset.rwDone) return;
  card.dataset.rwDone = '1';

  rwFetchRating(uid, function(data) {
    if (!data) return;

    var el = document.createElement('div');
    el.className = 'rw-catalog-rating';
    el.style.cssText = 'display:flex;align-items:center;gap:5px;font-family:inherit;font-size:12px;color:#666;margin:4px 0;';
    el.innerHTML = rwStarsHtml(data.avg, RW_CATALOG_CONFIG.starSize_catalog) +
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

function rwRenderCatalog() {
  var cards = document.querySelectorAll('.t-store__card[data-product-gen-uid]');
  cards.forEach(function(card) {
    var uid = card.getAttribute('data-product-gen-uid');
    if (uid) rwProcessCard(card, uid);
  });
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
    wrap.style.cssText = 'display:flex;align-items:center;gap:6px;font-family:inherit;font-size:13px;color:#666;margin:6px 0 10px;cursor:pointer;';
    wrap.innerHTML = '<span style="width:80px;height:14px;background:#F0F0F0;display:inline-block;border-radius:2px;"></span>';

    wrap.addEventListener('click', function() {
      var widget = document.getElementById('reviews-widget');
      if (widget) widget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    titleEl.parentNode.insertBefore(wrap, titleEl);

    rwFetchRating(uid, function(data) {
      if (!data) { wrap.style.display = 'none'; return; }
      wrap.innerHTML =
        rwStarsHtml(data.avg, RW_CATALOG_CONFIG.starSize_product) +
        '<strong style="color:#111;font-weight:500;">' + data.avg.toFixed(1) + '</strong>' +
        '<span style="color:#AAA;font-size:12px;">(' + data.count + ' відгуків)</span>';
    });

    return true;
  }

  if (!tryInsert()) {
    var obs = new MutationObserver(function() {
      if (tryInsert()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  setTimeout(tryInsert, 500);
  setTimeout(tryInsert, 1500);
  setTimeout(tryInsert, 3000);
}

// ── Отримати UID з URL ──────────────────────────────────────
function rwGetUidFromPath(path) {
  var m = path.match(/tproduct[\/\-](\d{10,})/);
  return m ? m[1] : null;
}

// ══════════════════════════════════════════════════════════
// СТАРТ + слідкуємо за зміною URL (Tilda AJAX навігація)
// ══════════════════════════════════════════════════════════
(function() {
  // Каталог
  setTimeout(rwRenderCatalog, 1000);
  setTimeout(rwRenderCatalog, 2500);
  setTimeout(rwRenderCatalog, 5000);

  var catObs = new MutationObserver(function() {
    var newCards = document.querySelectorAll('.t-store__card[data-product-gen-uid]:not([data-rw-done])');
    if (newCards.length) rwRenderCatalog();
  });
  catObs.observe(document.body, { childList: true, subtree: true });

  // Сторінка товару — перевіряємо поточний URL і слідкуємо за змінами
  var lastPath = '';

  function checkAndInit() {
    var path = window.location.pathname;
    if (path === lastPath) return;
    lastPath = path;

    var uid = rwGetUidFromPath(path);
    if (uid) {
      rwInitProductRating(uid);
    }
  }

  // Перевіряємо одразу
  checkAndInit();

  // Слідкуємо за навігацією
  window.addEventListener('popstate', checkAndInit);

  // Tilda міняє URL без popstate — перевіряємо кожні 500мс
  setInterval(checkAndInit, 500);

})();
