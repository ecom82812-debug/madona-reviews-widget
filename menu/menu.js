/* MADONA — нове меню сайту: шапка (гамбургер, лого, пошук, кошик) і бокове меню з усіма розділами одним списком.
   Підключення: <script src="https://ecom82812-debug.github.io/madona-reviews-widget/menu/menu.js?v=N"></script>
   Ховає старе меню (запис 2009917893 на сторінці-шапці) на сторінці, де підключено. Кнопки розділів (блок 976) не чіпає. */
(function () {
  if (window.__madonaMenu) return; window.__madonaMenu = 1;

  // Розділи — у тому ж порядку, що й у старому меню
  var CATS = [
    ['rozdilni', 'Роздільні купальники'], ['sucilni', 'Суцільні купальники'], ['komplektpareo', 'Комплекти з парео'],
    ['nakudku', 'Пляжні накидки'], ['penyar', 'Пеньюари'], ['pizamu', 'Піжами'], ['domkomplekt', 'Домашні комплекти'],
    ['xalat', 'Халати'], ['bodik', 'Бодіки'], ['biluzna', 'Нижня білизна'], ['rolkostym', 'Рольові костюми'],
    ['pancoxu', 'Панчохи'], ['panties', 'Трусики'], ['accessories', 'Аксесуари'], ['foradults', 'Для дорослих']
  ];
  var SERVICE = [['/shipping', 'Доставка та оплата'], ['/returns-exchange', 'Обмін та повернення'], ['/ontact', 'Контакти']];
  var PHONE = '+380 (63) 442 85 98', PHONE_HREF = 'tel:+380634428598', WA = 'https://wa.me/380634428598';
  var TEST_DEFAULT = 'penyar'; // тестова сторінка — копія «Пеньюарів»

  var CSS = [
    '#rec2009917893{display:none!important}',
    '.mm,.mm *{box-sizing:border-box}',
    '.mm{--ink:#141214;--soft:#6c6670;--rule:rgba(20,18,20,.1);--tint:#f3eff2;font-family:Manrope,Arial,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}',
    '.mm a{color:var(--ink);text-decoration:none}',
    '.mm-ico{all:unset;box-sizing:border-box;width:44px;height:44px;display:grid;place-items:center;cursor:pointer;position:relative;-webkit-tap-highlight-color:transparent}',
    '.mm-ico svg{display:block}',
    '.mm-badge{position:absolute;top:7px;right:5px;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:var(--ink);color:#fff;font-size:10px;font-weight:600;line-height:16px;text-align:center}',
    '.mm-badge[hidden]{display:none}',
    '.mm-eyebrow{margin:0;font-family:"DM Sans",Manrope,sans-serif;font-size:10.5px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--soft)}',
    /* шапка */
    '.mm-bar{position:fixed;top:0;left:0;right:0;z-index:990;background:#fff;border-bottom:1px solid var(--rule);transition:box-shadow .2s}',
    '.mm-bar.is-scrolled{box-shadow:0 2px 14px rgba(20,18,20,.06)}',
    '.mm-in{height:60px;padding:0 6px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center}',
    '.mm-left{display:flex;align-items:center}',
    '.mm-logo{justify-self:center;font-weight:500;font-size:20px;letter-spacing:.2em;padding-left:.2em;white-space:nowrap}',
    '.mm-right{justify-self:end;display:flex;align-items:center}',
    '.mm-phone,.mm-menu-word{display:none}',
    /* бокове меню */
    '.mm-shade{position:fixed;inset:0;z-index:999;background:rgba(20,18,20,.35);opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s linear .25s}',
    '.mm-shade.is-on{opacity:1;visibility:visible;transition:opacity .25s}',
    '.mm-drawer{position:fixed;top:0;bottom:0;left:0;width:100%;z-index:1000;background:#fff;display:flex;flex-direction:column;transform:translateX(-100%);visibility:hidden;transition:transform .3s ease,visibility 0s linear .3s}',
    '.mm-drawer.is-open{transform:none;visibility:visible;transition:transform .3s ease}',
    '.mm-dhead{height:60px;flex:none;padding:0 6px 0 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--rule)}',
    '.mm-dhead .mm-logo{font-size:18px;padding-left:0}',
    '.mm-dbody{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;display:flex;flex-direction:column}',
    '.mm-dbody>*{flex-shrink:0!important}',
    '.mm-search{all:unset;box-sizing:border-box;margin:16px 20px 8px;height:46px;padding:0 14px;background:var(--tint);display:flex;align-items:center;gap:10px;font-family:Manrope,sans-serif;font-size:15px;color:var(--soft);cursor:text}',
    '.mm-cats{padding:8px 20px 0;display:flex;flex-direction:column}',
    '.mm-cats .mm-eyebrow{margin:8px 0 6px}',
    '.mm-cats a{display:flex;align-items:center;justify-content:space-between;min-height:48px;padding:6px 0;border-bottom:1px solid var(--rule);font-family:"Libre Baskerville",Georgia,serif;font-size:18px;line-height:1.25;letter-spacing:-.1px}',
    '.mm-cats a.is-cur::after{content:"Ви тут";flex:none;margin-left:12px;font-family:"DM Sans",sans-serif;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--soft)}',
    '.mm-cats a.is-cur{font-weight:700}',
    '.mm-service{padding:26px 20px 22px;display:flex;flex-direction:column}',
    '.mm-service .mm-eyebrow{margin-bottom:6px}',
    '.mm-service a{height:40px;display:flex;align-items:center;font-size:15px}',
    '.mm-contact{margin-top:auto;padding:18px 20px 24px;background:#f6f3f5;display:flex;flex-direction:column;gap:12px}',
    '.mm-contact small{font-size:12px;color:var(--soft);display:block}',
    '.mm-tel{font-size:18px;font-weight:600;letter-spacing:.02em}',
    '.mm-wa{height:46px;display:flex;align-items:center;justify-content:center;gap:10px;background:var(--ink);color:#fff!important;font-family:"DM Sans",sans-serif;font-size:12.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase}',
    'html.mm-lock,html.mm-lock body{overflow:hidden!important}',
    'body.mm-on .t706__carticon{display:none!important}',
    'body.mm-pad{padding-top:24px!important}',
    '.mm-nosearch [data-mm-search]{display:none!important}',
    '@media (hover:hover){.mm-cats a:hover,.mm-service a:hover{opacity:.6}}',
    /* комп'ютер */
    '@media (min-width:1024px){',
    '.mm-in{max-width:1240px;height:72px;margin:0 auto;padding:0 28px}',
    '.mm-logo{font-size:22px;letter-spacing:.22em}',
    '.mm-menu-word{display:inline;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;margin-left:2px}',
    '.mm-burger{width:auto;padding:0 10px;gap:10px;grid-auto-flow:column}',
    '.mm-phone{display:block;font-size:13px;color:var(--soft)!important;margin-right:10px;white-space:nowrap}',
    '.mm-drawer{width:440px;box-shadow:0 0 40px rgba(20,18,20,.12)}',
    '.mm-dhead{height:72px;padding:0 16px 0 32px}',
    '.mm-search{margin:20px 32px 8px}',
    '.mm-cats{padding:8px 32px 0}',
    '.mm-service{padding:28px 32px 24px}',
    '.mm-contact{padding:20px 32px 28px}',
    'body.mm-on{padding-top:28px}',
    'body.mm-pad{padding-top:0!important}',
    '}'
  ].join('\n');

  var SVG_BURGER = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M3 6h16M3 11h16M3 16h10" stroke="#141214" stroke-width="1.5" stroke-linecap="round"/></svg>';
  var SVG_SEARCH = function (c, s) { return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="' + c + '" stroke-width="1.5"/><path d="M13.5 13.5L17 17" stroke="' + c + '" stroke-width="1.5" stroke-linecap="round"/></svg>'; };
  var SVG_CART = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 7h12l-1 10H5L4 7z" stroke="#141214" stroke-width="1.5" stroke-linejoin="round"/><path d="M7.5 7V5.5a2.5 2.5 0 015 0V7" stroke="#141214" stroke-width="1.5"/></svg>';
  var SVG_CLOSE = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="#141214" stroke-width="1.5" stroke-linecap="round"/></svg>';
  var SVG_WA = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 15l1-3.2A6.5 6.5 0 119 15.5a6.4 6.4 0 01-3-.8L3 15z" stroke="#ffffff" stroke-width="1.3" stroke-linejoin="round"/></svg>';

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var alias = (location.pathname.split('/')[1] || '').toLowerCase();
  if (/test/.test(alias)) alias = TEST_DEFAULT;

  var HTML =
    '<div class="mm" id="mm">' +
      '<header class="mm-bar" id="mm-bar"><div class="mm-in">' +
        '<div class="mm-left"><button type="button" class="mm-ico mm-burger" aria-label="Відкрити меню" aria-controls="mm-drawer" aria-expanded="false" data-mm-open>' + SVG_BURGER + '<span class="mm-menu-word">Меню</span></button></div>' +
        '<a class="mm-logo" href="/">MADONA</a>' +
        '<div class="mm-right"><a class="mm-phone" href="' + PHONE_HREF + '">' + PHONE + '</a>' +
          '<button type="button" class="mm-ico" aria-label="Пошук" data-mm-search>' + SVG_SEARCH('#141214', 20) + '</button>' +
          '<button type="button" class="mm-ico" aria-label="Кошик" data-mm-cart>' + SVG_CART + '<span class="mm-badge" id="mm-count" hidden></span></button>' +
        '</div>' +
      '</div></header>' +
      '<div class="mm-shade" id="mm-shade"></div>' +
      '<div class="mm-drawer" id="mm-drawer" role="dialog" aria-modal="true" aria-label="Меню">' +
        '<div class="mm-dhead"><a class="mm-logo" href="/">MADONA</a><button type="button" class="mm-ico" aria-label="Закрити меню" data-mm-close>' + SVG_CLOSE + '</button></div>' +
        '<div class="mm-dbody">' +
          '<button type="button" class="mm-search" data-mm-search>' + SVG_SEARCH('#6c6670', 18) + 'Пошук товарів</button>' +
          '<nav class="mm-cats" aria-label="Каталог"><p class="mm-eyebrow">Каталог</p>' +
            CATS.map(function (c) { return '<a href="/' + c[0] + '"' + (c[0] === alias ? ' class="is-cur" aria-current="page"' : '') + '>' + esc(c[1]) + '</a>'; }).join('') +
          '</nav>' +
          '<div class="mm-service"><p class="mm-eyebrow">Покупцям</p>' + SERVICE.map(function (s) { return '<a href="' + s[0] + '">' + s[1] + '</a>'; }).join('') + '</div>' +
          '<div class="mm-contact"><div><small>Допоможемо з вибором і розміром</small><a class="mm-tel" href="' + PHONE_HREF + '">' + PHONE + '</a></div>' +
            '<a class="mm-wa" href="' + WA + '" target="_blank" rel="noopener">' + SVG_WA + 'Написати у WhatsApp</a></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var st = document.createElement('style'); st.id = 'mm-css'; st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  function init() {
    var box = document.createElement('div'); box.innerHTML = HTML;
    document.body.appendChild(box.firstElementChild);
    document.body.classList.add('mm-on');
    // сторінки без загальної шапки (картка товару): відступ під меню
    if (!document.getElementById('rec2009917893')) document.body.classList.add('mm-pad');
    // немає штатного пошуку Тільди на сторінці — ховаємо кнопки пошуку
    if (!document.querySelector('a[href="#opensearch"], .t985')) document.getElementById('mm').classList.add('mm-nosearch');
    var $ = function (id) { return document.getElementById(id); };
    var drawer = $('mm-drawer'), shade = $('mm-shade'), bar = $('mm-bar'), burger = document.querySelector('[data-mm-open]');

    function openDrawer() {
      drawer.classList.add('is-open'); shade.classList.add('is-on'); burger.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('mm-lock');
      var cur = drawer.querySelector('.is-cur'); var body = drawer.querySelector('.mm-dbody');
      if (cur && cur.offsetTop > body.clientHeight - 80) body.scrollTop = cur.offsetTop - 160;
    }
    function closeDrawer() {
      drawer.classList.remove('is-open'); shade.classList.remove('is-on'); burger.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('mm-lock');
    }
    burger.addEventListener('click', openDrawer);
    drawer.querySelector('[data-mm-close]').addEventListener('click', closeDrawer);
    shade.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

    // пошук і кошик — штатні вікна Тільди
    function trigger(href, fallback) {
      var a = document.querySelector('#rec2009917893 a[href="' + href + '"]') || document.querySelector('a[href="' + href + '"]:not(.mm a)');
      if (a) { a.click(); return; }
      if (fallback) fallback();
    }
    [].forEach.call(document.querySelectorAll('[data-mm-search]'), function (b) {
      b.addEventListener('click', function () { closeDrawer(); trigger('#opensearch'); });
    });
    document.querySelector('[data-mm-cart]').addEventListener('click', function () {
      trigger('#opencart', function () { if (window.tcart__openCart) window.tcart__openCart(); });
    });

    var countEl = $('mm-count');
    function syncCount() {
      var n = 0;
      try { if (window.tcart) { n = parseInt(tcart.total, 10) || 0; if (!n && tcart.products) tcart.products.forEach(function (p) { if (p && !p.deleted) n += parseInt(p.quantity || 1, 10) || 0; }); } } catch (e) {}
      countEl.hidden = !n; countEl.textContent = n > 99 ? '99+' : n;
      countEl.parentNode.setAttribute('aria-label', n ? 'Кошик, товарів: ' + n : 'Кошик');
    }
    syncCount(); setInterval(syncCount, 1200);

    window.addEventListener('scroll', function () { bar.classList.toggle('is-scrolled', window.pageYOffset > 4); }, { passive: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
