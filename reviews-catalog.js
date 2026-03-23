/*
 * reviews-catalog.js
 * Вставляється у <head> або перед </body> на сторінці каталогу Tilda
 * Автоматично підтягує рейтинг під кожну картку товару
 *
 * Використання в Tilda:
 *   <script src="https://ВАШ-ХОСТИНГ/reviews-catalog.js"></script>
 */

/* ══════════════════════════════════════════
   ⚙️  КОНФІГУРАЦІЯ — замінити!
══════════════════════════════════════════ */
var RW_CATALOG_CONFIG = {
  supabaseUrl:  'https://pjbkmajnbqabkunlikoe.supabase.co',
  supabaseAnon: 'sb_publishable_UXLaCY899UlouOFe_7xG7Q_b8KreJ85',

  // Розмір зірок у каталозі (px)
  starSize_desktop: 14,
  starSize_mobile:  12,
};

(function () {
  'use strict';

  var BASE = RW_CATALOG_CONFIG.supabaseUrl + '/rest/v1';
  var H = { 'apikey': RW_CATALOG_CONFIG.supabaseAnon, 'Authorization': 'Bearer ' + RW_CATALOG_CONFIG.supabaseAnon };
  var cache = {}; // product_id → { avg, total }

  function isMobile() { return window.innerWidth <= 768; }
  function starSize() { return isMobile() ? RW_CATALOG_CONFIG.starSize_mobile : RW_CATALOG_CONFIG.starSize_desktop; }

  /* ── Зірки SVG ───────────────────────── */
  function starsHtml(avg, size) {
    var html = '<span style="display:inline-flex;gap:2px;vertical-align:middle;">';
    for (var i = 1; i <= 5; i++) {
      var pct = Math.min(Math.max((avg - (i - 1)) * 100, 0), 100);
      var id  = 'rw-g-' + i + '-' + Math.random().toString(36).slice(2, 6);
      html +=
        '<svg width="' + size + '" height="' + size + '" viewBox="0 0 16 16">' +
        '<defs><linearGradient id="' + id + '"><stop offset="' + pct + '%" stop-color="#111"/>' +
        '<stop offset="' + pct + '%" stop-color="#111" stop-opacity="0"/></linearGradient></defs>' +
        '<path fill="url(#' + id + ')" stroke="#111" stroke-width="1" ' +
        'd="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/>' +
        '</svg>';
    }
    return html + '</span>';
  }

  /* ── Рядок рейтингу ──────────────────── */
  function ratingRow(avg, total, size, productSlug) {
    var label = total + ' ' + (total === 1 ? 'відгук' : total < 5 ? 'відгуки' : 'відгуків');
    return '<a href="' + (productSlug || '#') + '#reviews" ' +
      'style="display:inline-flex;align-items:center;gap:5px;font-family:\'DM Sans\',sans-serif;' +
      'font-size:12px;color:#666;text-decoration:none;margin-top:5px;cursor:pointer;" ' +
      'onclick="event.stopPropagation();">' +
      starsHtml(avg, size) +
      '<span style="color:#111;font-weight:500;font-size:12px;">' + parseFloat(avg).toFixed(1) + '</span>' +
      '<span style="color:#AAA;font-size:11px;">' + label + '</span>' +
      '</a>';
  }

  /* ── Отримати product_id з картки Tilda ── */
  function getSlugFromCard(card) {
    // Варіант 1: data-product-gen-uid (Tilda Store)
    var uid = card.getAttribute('data-product-gen-uid') || card.getAttribute('data-product-uid');
    if (uid) return uid;

    // Варіант 2: посилання всередині картки
    var link = card.querySelector('a[href]');
    if (link) {
      var href = link.getAttribute('href');
      var m = href.match(/\/([^/?#]+)\/?(?:[?#].*)?$/);
      if (m && m[1] && m[1] !== '#') return m[1];
    }

    // Варіант 3: data-атрибут вручну встановлений
    return card.getAttribute('data-product-id') || null;
  }

  /* ── Завантажити рейтинги пачкою ─────── */
  function loadRatingsForCards(cards) {
    var toLoad = [];
    cards.forEach(function (card) {
      var slug = getSlugFromCard(card);
      if (slug && !card.dataset.rwDone) {
        card.dataset.rwDone = '1';
        if (!cache[slug]) toLoad.push(slug);
      }
    });
    if (!toLoad.length) { applyRatings(cards); return; }

    // Завантажуємо середній рейтинг для всіх потрібних slug одним запитом
    var filter = toLoad.map(function (s) { return 'product_id=eq.' + encodeURIComponent(s); }).join(',');
    // Шукаємо по числовому uid який міститься в product_id slug
    var uidFilter = toLoad.map(function(uid) { return 'product_id=like.*' + uid + '*'; }).join(',');
    fetch(BASE + '/reviews?or=(' + uidFilter + ')&approved=eq.true&select=product_id,rating', { headers: H })
      .then(function (r) { return r.json(); })
      .then(function (rows) {
        // Групуємо — знаходимо який uid міститься в product_id
        var groups = {};
        rows.forEach(function (r) {
          toLoad.forEach(function(uid) {
            if (r.product_id.indexOf(uid) !== -1) {
              if (!groups[uid]) groups[uid] = [];
              groups[uid].push(r.rating);
            }
          });
        });
        toLoad.forEach(function (uid) {
          var ratings = groups[uid] || [];
          if (ratings.length) {
            var avg = ratings.reduce(function (s, v) { return s + v; }, 0) / ratings.length;
            cache[uid] = { avg: avg, total: ratings.length };
          } else {
            cache[uid] = null;
          }
        });
        applyRatings(cards);
      })
      .catch(function () { /* тихо ігноруємо помилку мережі */ });
  }

  /* ── Вставити рейтинг у картку ──────── */
  function applyRatings(cards) {
    var size = starSize();
    cards.forEach(function (card) {
      var slug = getSlugFromCard(card);
      if (!slug || !cache[slug]) return;

      // Не вставляти двічі
      if (card.querySelector('.rw-catalog-rating')) return;

      var data = cache[slug];
      var row  = document.createElement('div');
      row.className = 'rw-catalog-rating';
      row.innerHTML = ratingRow(data.avg, data.total, size, card.querySelector('a[href]') ? card.querySelector('a[href]').href : '');

      // Знаходимо куди вставити — під назву або ціну товару
      var nameEl  = card.querySelector('.t-store__card-title, .t-store__prod-title, [class*="card-title"], [class*="prod-name"]');
      var priceEl = card.querySelector('.t-store__card-price, [class*="card-price"], [class*="prod-price"]');
      var target  = priceEl || nameEl;

      if (target) {
        target.parentNode.insertBefore(row, target.nextSibling);
      } else {
        card.appendChild(row);
      }
    });
  }

  /* ── Знайти всі картки каталогу ─────── */
  function findCards() {
    return Array.from(document.querySelectorAll(
      '.t-store__card, .t-store__col, [class*="t-store__card"], [data-product-gen-uid]'
    ));
  }

  /* ── Запуск + MutationObserver ──────── */
  function run() {
    var cards = findCards();
    if (cards.length) loadRatingsForCards(cards);
  }

  // Запускаємо кілька разів — Tilda завантажує картки динамічно
  setTimeout(run, 800);
  setTimeout(run, 2000);
  setTimeout(run, 4000);

  // Слідкуємо за появою нових карток
  var obs = new MutationObserver(function () {
    var newCards = findCards().filter(function (c) { return !c.dataset.rwDone; });
    if (newCards.length) loadRatingsForCards(newCards);
  });
  obs.observe(document.body, { childList: true, subtree: true });

})();
