/* MADONA — нове меню сайту (шапка, меню на телефоні, випадні панелі на комп'ютері, рядок розділів).
   Підключення: <script src="https://ecom82812-debug.github.io/madona-reviews-widget/menu/menu.js?v=N"></script>
   Ховає старе меню (запис 2009917893) і кнопки розділів (блок 976) на сторінці, де підключено. */
(function () {
  if (window.__madonaMenu) return; window.__madonaMenu = 1;
  var CSS = "#rec2009917893, .t-rec[data-record-type=\"976\"] { display: none !important; }\n\n.mm, .mm * { box-sizing: border-box; }\n.mm { --ink:#141214; --soft:#6c6670; --rule:rgba(20,18,20,.1); --tint:#f3eff2; font-family: Manrope, Arial, sans-serif; color: var(--ink); -webkit-font-smoothing: antialiased; }\n.mm a { color: var(--ink); text-decoration: none; }\n.mm button { font-family: inherit; color: inherit; }\n.mm-ico { all: unset; box-sizing: border-box; width: 44px; height: 44px; display: grid; place-items: center; cursor: pointer; position: relative; -webkit-tap-highlight-color: transparent; }\n.mm-ico svg { display: block; }\n.mm-badge { position: absolute; top: 7px; right: 5px; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 8px; background: var(--ink); color: #fff; font-size: 10px; font-weight: 600; line-height: 16px; text-align: center; }\n.mm-badge[hidden] { display: none; }\n.mm-eyebrow { margin: 0; font-family: 'DM Sans', Manrope, sans-serif; font-size: 10.5px; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: var(--soft); }\n\n/* шапка */\n.mm-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 990; background: #fff; border-bottom: 1px solid var(--rule); transition: box-shadow .2s; }\n.mm-bar.is-scrolled { box-shadow: 0 2px 14px rgba(20,18,20,.06); }\n.mm-in { height: 60px; padding: 0 6px; display: grid; grid-template-columns: 96px 1fr 96px; align-items: center; }\n.mm-logo { justify-self: center; font-weight: 500; font-size: 20px; letter-spacing: .2em; padding-left: .2em; white-space: nowrap; }\n.mm-right { justify-self: end; display: flex; align-items: center; }\n.mm-nav, .mm-phone, .mm-mega, .mm-shade { display: none; }\n\n/* меню на телефоні */\n.mm-drawer { position: fixed; inset: 0; z-index: 1000; background: #fff; display: flex; flex-direction: column; transform: translateX(-100%); visibility: hidden; transition: transform .3s ease, visibility 0s linear .3s; }\n.mm-drawer.is-open { transform: none; visibility: visible; transition: transform .3s ease; }\n.mm-dhead { height: 60px; flex: none; padding: 0 6px 0 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--rule); }\n.mm-dhead .mm-logo { justify-self: auto; font-size: 18px; padding-left: 0; }\n.mm-dbody { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; display: flex; flex-direction: column; }\n.mm-dbody > * { flex-shrink: 0 !important; }\n.mm-search { all: unset; box-sizing: border-box; margin: 16px 20px 6px; height: 46px; padding: 0 14px; background: var(--tint); display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--soft); cursor: text; }\n.mm-groups { padding: 0 20px; }\n.mm-g { border-bottom: 1px solid var(--rule); }\n.mm-gbtn { all: unset; box-sizing: border-box; width: 100%; height: 60px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; -webkit-tap-highlight-color: transparent; }\n.mm-gname { font-family: 'Libre Baskerville', Georgia, serif; font-size: 21px; letter-spacing: -.2px; }\n.mm-gmeta { display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--soft); }\n.mm-gmeta svg { transition: transform .25s; }\n.mm-g.is-open .mm-gmeta svg { transform: rotate(180deg); }\n.mm-glist { display: none; padding: 0 0 14px; }\n.mm-g.is-open .mm-glist { display: block; }\n.mm-glist a { display: flex; align-items: center; justify-content: space-between; height: 44px; padding-left: 13px; border-left: 1px solid rgba(20,18,20,.12); font-size: 15px; }\n.mm-glist a.is-cur { font-weight: 600; border-left: 2px solid var(--ink); padding-left: 12px; }\n.mm-glist a.is-cur::after { content: 'Ви тут'; font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: var(--soft); }\n.mm-service { padding: 26px 20px 22px; display: flex; flex-direction: column; }\n.mm-service .mm-eyebrow { margin-bottom: 6px; }\n.mm-service a { height: 40px; display: flex; align-items: center; font-size: 15px; }\n.mm-contact { margin-top: auto; padding: 18px 20px 24px; background: #f6f3f5; display: flex; flex-direction: column; gap: 12px; }\n.mm-contact small { font-size: 12px; color: var(--soft); display: block; }\n.mm-tel { font-size: 18px; font-weight: 600; letter-spacing: .02em; }\n.mm-wa { height: 46px; display: flex; align-items: center; justify-content: center; gap: 10px; background: var(--ink); color: #fff !important; font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }\nhtml.mm-lock, html.mm-lock body { overflow: hidden !important; }\n\n/* рядок розділів на сторінці категорії */\n.mm-chips-wrap { position: relative; max-width: 1240px; margin: 0 auto; padding: 4px 0 26px; }\n.mm-chips { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding: 0 20px; -webkit-overflow-scrolling: touch; }\n.mm-chips::-webkit-scrollbar { display: none; }\n.mm-chips a, .mm-chips button { all: unset; box-sizing: border-box; flex: none; display: inline-flex; align-items: center; height: 38px; padding: 0 16px; border: 1px solid rgba(20,18,20,.18); font-family: Manrope, sans-serif; font-size: 13px; font-weight: 500; color: var(--ink); white-space: nowrap; cursor: pointer; }\n.mm-chips a.is-cur { background: var(--ink); border-color: var(--ink); color: #fff; }\n.mm-chips .mm-all { background: var(--tint); border-color: var(--tint); }\n.mm-chips-wrap::after { content: ''; position: absolute; top: 4px; right: 0; width: 40px; height: 38px; background: linear-gradient(90deg, rgba(255,255,255,0), #fff); pointer-events: none; }\n\n/* комп'ютер */\n@media (min-width: 1024px) {\n  .mm-in { max-width: 1240px; height: 72px; margin: 0 auto; padding: 0 40px; grid-template-columns: 1fr auto 1fr; }\n  .mm-in > .mm-burger { display: none; }\n  .mm-logo { grid-column: 1; grid-row: 1; justify-self: start; font-size: 22px; letter-spacing: .22em; padding-left: 0; }\n  .mm-nav { display: flex; grid-column: 2; grid-row: 1; height: 72px; gap: 4px; }\n  .mm-right { grid-column: 3; grid-row: 1; }\n  .mm-nav > a, .mm-nav > button { all: unset; box-sizing: border-box; display: flex; align-items: center; padding: 0 16px; height: 72px; font-family: Manrope, sans-serif; font-size: 14px; font-weight: 500; color: var(--ink); cursor: pointer; white-space: nowrap; }\n  .mm-nav > .is-active, .mm-nav > .is-here { box-shadow: inset 0 -2px 0 var(--ink); }\n  .mm-nav > .is-active { font-weight: 600; }\n  .mm-phone { display: block; font-size: 13px; color: var(--soft) !important; margin-right: 10px; white-space: nowrap; }\n  .mm-shade { display: block; position: fixed; left: 0; right: 0; top: 72px; bottom: 0; z-index: 980; background: rgba(20,18,20,.35); opacity: 0; visibility: hidden; transition: opacity .2s, visibility 0s linear .2s; }\n  .mm-shade.is-on { opacity: 1; visibility: visible; transition: opacity .2s; }\n  .mm-mega { display: block; position: absolute; left: 0; right: 0; top: 100%; background: #fff; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); opacity: 0; visibility: hidden; transform: translateY(-6px); transition: opacity .18s, transform .18s, visibility 0s linear .18s; }\n  .mm-mega.is-on { opacity: 1; visibility: visible; transform: none; transition: opacity .18s, transform .18s; }\n  .mm-pane { display: none; max-width: 1240px; margin: 0 auto; padding: 40px 40px 44px; grid-template-columns: 260px 220px 1fr; gap: 48px; }\n  .mm-pane.is-on { display: grid; }\n  .mm-col { display: flex; flex-direction: column; }\n  .mm-col .mm-eyebrow { margin-bottom: 10px; }\n  .mm-cats a { font-family: 'Libre Baskerville', Georgia, serif; font-size: 22px; line-height: 1.2; padding: 6px 0; transition: opacity .15s; }\n  .mm-cats a:hover { opacity: .6; }\n  .mm-cats a.is-cur { text-decoration: underline; text-underline-offset: 5px; text-decoration-thickness: 1px; }\n  .mm-links a { font-size: 15px; padding: 7px 0; }\n  .mm-links a:hover { opacity: .6; }\n  .mm-photos { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }\n  .mm-photos a { display: flex; flex-direction: column; gap: 10px; font-size: 14px; font-weight: 500; }\n  .mm-photos span.mm-ph { display: block; height: 300px; background: var(--tint); overflow: hidden; }\n  .mm-photos img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }\n  .mm-photos a:hover img { transform: scale(1.03); }\n  body.mm-on { padding-top: 28px; }\n  .mm-chips-wrap { padding: 4px 40px 30px; }\n  .mm-chips { padding: 0; flex-wrap: wrap; overflow: visible; }\n  .mm-chips a { height: 40px; padding: 0 18px; }\n  .mm-chips .mm-all, .mm-chips-wrap::after { display: none; }\n}\n";
  var HTML = "<div class=\"mm\" id=\"mm\">\n  <header class=\"mm-bar\" id=\"mm-bar\">\n    <div class=\"mm-in\">\n      <button type=\"button\" class=\"mm-ico mm-burger\" aria-label=\"Відкрити меню\" aria-controls=\"mm-drawer\" aria-expanded=\"false\" data-mm-open>\n        <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\" aria-hidden=\"true\"><path d=\"M3 6h16M3 11h16M3 16h10\" stroke=\"#141214\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>\n      </button>\n      <a class=\"mm-logo\" href=\"/\">MADONA</a>\n      <nav class=\"mm-nav\" aria-label=\"Каталог\" id=\"mm-nav\"></nav>\n      <div class=\"mm-right\">\n        <a class=\"mm-phone\" href=\"tel:+380634428598\">+380 (63) 442 85 98</a>\n        <button type=\"button\" class=\"mm-ico\" aria-label=\"Пошук\" data-mm-search>\n          <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" aria-hidden=\"true\"><circle cx=\"9\" cy=\"9\" r=\"6\" stroke=\"#141214\" stroke-width=\"1.5\"/><path d=\"M13.5 13.5L17 17\" stroke=\"#141214\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>\n        </button>\n        <button type=\"button\" class=\"mm-ico\" aria-label=\"Кошик\" data-mm-cart>\n          <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" aria-hidden=\"true\"><path d=\"M4 7h12l-1 10H5L4 7z\" stroke=\"#141214\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/><path d=\"M7.5 7V5.5a2.5 2.5 0 015 0V7\" stroke=\"#141214\" stroke-width=\"1.5\"/></svg>\n          <span class=\"mm-badge\" id=\"mm-count\" hidden></span>\n        </button>\n      </div>\n    </div>\n    <div class=\"mm-mega\" id=\"mm-mega\"></div>\n  </header>\n  <div class=\"mm-shade\" id=\"mm-shade\"></div>\n\n  <div class=\"mm-drawer\" id=\"mm-drawer\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Меню\">\n    <div class=\"mm-dhead\">\n      <a class=\"mm-logo\" href=\"/\">MADONA</a>\n      <button type=\"button\" class=\"mm-ico\" aria-label=\"Закрити меню\" data-mm-close>\n        <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" aria-hidden=\"true\"><path d=\"M4 4l12 12M16 4L4 16\" stroke=\"#141214\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>\n      </button>\n    </div>\n    <div class=\"mm-dbody\">\n      <button type=\"button\" class=\"mm-search\" data-mm-search>\n        <svg width=\"18\" height=\"18\" viewBox=\"0 0 20 20\" fill=\"none\" aria-hidden=\"true\"><circle cx=\"9\" cy=\"9\" r=\"6\" stroke=\"#6c6670\" stroke-width=\"1.5\"/><path d=\"M13.5 13.5L17 17\" stroke=\"#6c6670\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>\n        Пошук товарів\n      </button>\n      <nav class=\"mm-groups\" id=\"mm-groups\" aria-label=\"Каталог\"></nav>\n      <div class=\"mm-service\">\n        <p class=\"mm-eyebrow\">Покупцям</p>\n        <a href=\"/shipping\">Доставка та оплата</a>\n        <a href=\"/returns-exchange\">Обмін та повернення</a>\n        <a href=\"/ontact\">Контакти</a>\n      </div>\n      <div class=\"mm-contact\">\n        <div><small>Допоможемо з вибором і розміром</small><a class=\"mm-tel\" href=\"tel:+380634428598\">+380 (63) 442 85 98</a></div>\n        <a class=\"mm-wa\" href=\"https://wa.me/380634428598\" target=\"_blank\" rel=\"noopener\">\n          <svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" aria-hidden=\"true\"><path d=\"M3 15l1-3.2A6.5 6.5 0 119 15.5a6.4 6.4 0 01-3-.8L3 15z\" stroke=\"#ffffff\" stroke-width=\"1.3\" stroke-linejoin=\"round\"/></svg>\n          Написати у WhatsApp\n        </a>\n      </div>\n    </div>\n  </div>\n</div>";
  var st = document.createElement('style'); st.id = 'mm-css'; st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);
  function init() {
    var box = document.createElement('div'); box.innerHTML = HTML;
    var root = box.firstElementChild; document.body.appendChild(root);
    document.body.classList.add('mm-on');
  // ---- каталог: групи, розділи, фото для випадного меню ----
  var IMG = 'https://static.tildacdn.one/';
  var GROUPS = [
    { id: 'swim', name: 'Купальники', cats: [['rozdilni', 'Роздільні купальники'], ['sucilni', 'Суцільні купальники'], ['komplektpareo', 'Комплекти з парео'], ['nakudku', 'Пляжні накидки']],
      photos: [['rozdilni', 'Роздільні купальники', 'stor3233-3063-4664-b638-656639366630/97887610af07c8af6228d942a73f67d8.jpg'], ['sucilni', 'Суцільні купальники', 'stor3739-3963-4536-a662-323836633966/ed03900acb18c8241cfb16bdcb6ac6d4.jpg']] },
    { id: 'home', name: 'Дім і сон', cats: [['penyar', 'Пеньюари'], ['pizamu', 'Піжами'], ['domkomplekt', 'Домашні комплекти'], ['xalat', 'Халати']],
      photos: [['penyar', 'Пеньюари', 'stor6635-6431-4834-a335-643864613135/15eddb72cf813d495101f0e0fd04e8ea.jpg'], ['xalat', 'Халати', 'stor3938-6566-4637-b632-653330396365/e170c206c0e9e8b36f10e2c117fe5c39.jpg']] },
    { id: 'linen', name: 'Білизна', cats: [['biluzna', 'Нижня білизна'], ['bodik', 'Бодіки'], ['panties', 'Трусики'], ['pancoxu', 'Панчохи']],
      photos: [['biluzna', 'Нижня білизна', 'stor6162-3938-4535-b339-346335323962/ecb67f29ac7b6b8935fb76b3cfeb2b3a.jpg'], ['bodik', 'Бодіки', 'stor3066-6164-4335-b531-356261343864/5540b9c0476910f491ba9925a7ff31d0.jpg']] },
    { id: 'adult', name: 'Спокуса 18+', cats: [['rolkostym', 'Рольові костюми'], ['foradults', 'Для дорослих']],
      photos: [['rolkostym', 'Рольові костюми', 'stor6132-6435-4431-a233-306135326665/fa5df11b06e28db8626024d904b62415.jpg']] }
  ];
  var SINGLE = ['accessories', 'Аксесуари'];
  var TEST_DEFAULT = 'penyar'; // на тестовій сторінці вважаємо, що ми в «Пеньюарах»

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var thumb = function (p) { return IMG + p.replace(/^(stor[^/]+\/)/, '$1-/resize/600x/'); };
  var alias = (location.pathname.split('/')[1] || '').toLowerCase();
  var cur = null, curGroup = null;
  GROUPS.forEach(function (g) { g.cats.forEach(function (c) { if (c[0] === alias) { cur = c[0]; curGroup = g; } }); });
  if (!cur && alias === SINGLE[0]) cur = alias;
  if (!cur && !curGroup && alias && !/^(tproduct)$/.test(alias)) {
    var isTest = /test|menu/.test(alias);
    if (isTest) { cur = TEST_DEFAULT; GROUPS.forEach(function (g) { g.cats.forEach(function (c) { if (c[0] === cur) curGroup = g; }); }); }
  }

  var $ = function (id) { return document.getElementById(id); };
  var chev = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 5l4 4 4-4" stroke="#141214" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var arrowR = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3l4 4-4 4" stroke="#141214" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // ---- телефон: групи-акордеон ----
  $('mm-groups').innerHTML = GROUPS.map(function (g) {
    var open = curGroup === g;
    return '<div class="mm-g' + (open ? ' is-open' : '') + '" data-g="' + g.id + '">' +
      '<button type="button" class="mm-gbtn" aria-expanded="' + open + '"><span class="mm-gname">' + esc(g.name) + '</span><span class="mm-gmeta">' + g.cats.length + chev + '</span></button>' +
      '<div class="mm-glist">' + g.cats.map(function (c) { return '<a href="/' + c[0] + '"' + (c[0] === cur ? ' class="is-cur" aria-current="page"' : '') + '>' + esc(c[1]) + '</a>'; }).join('') + '</div></div>';
  }).join('') + '<div class="mm-g"><a class="mm-gbtn" href="/' + SINGLE[0] + '"><span class="mm-gname">' + SINGLE[1] + '</span><span class="mm-gmeta">' + arrowR + '</span></a></div>';

  $('mm-groups').addEventListener('click', function (e) {
    var btn = e.target.closest('button.mm-gbtn'); if (!btn) return;
    var g = btn.parentNode, was = g.classList.contains('is-open');
    [].forEach.call(this.querySelectorAll('.mm-g.is-open'), function (x) { x.classList.remove('is-open'); x.querySelector('.mm-gbtn').setAttribute('aria-expanded', 'false'); });
    if (!was) { g.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
  });

  var drawer = $('mm-drawer'), burger = document.querySelector('[data-mm-open]');
  function openDrawer() { drawer.classList.add('is-open'); burger.setAttribute('aria-expanded', 'true'); document.documentElement.classList.add('mm-lock'); }
  function closeDrawer() { drawer.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); document.documentElement.classList.remove('mm-lock'); }
  burger.addEventListener('click', openDrawer);
  drawer.querySelector('[data-mm-close]').addEventListener('click', closeDrawer);

  // ---- комп'ютер: пункти й випадні панелі ----
  var nav = $('mm-nav'), mega = $('mm-mega'), shade = $('mm-shade');
  nav.innerHTML = GROUPS.map(function (g) {
    return '<button type="button" data-pane="' + g.id + '" aria-expanded="false"' + (curGroup === g ? ' class="is-here"' : '') + '>' + esc(g.name) + '</button>';
  }).join('') + '<a href="/' + SINGLE[0] + '"' + (cur === SINGLE[0] ? ' class="is-here"' : '') + '>' + SINGLE[1] + '</a>';
  mega.innerHTML = GROUPS.map(function (g) {
    return '<div class="mm-pane" data-pane="' + g.id + '">' +
      '<div class="mm-col mm-cats"><p class="mm-eyebrow">' + esc(g.name) + '</p>' + g.cats.map(function (c) { return '<a href="/' + c[0] + '"' + (c[0] === cur ? ' class="is-cur"' : '') + '>' + esc(c[1]) + '</a>'; }).join('') + '</div>' +
      '<div class="mm-col mm-links"><p class="mm-eyebrow">Покупцям</p><a href="/shipping">Доставка та оплата</a><a href="/returns-exchange">Обмін та повернення</a><a href="/ontact">Контакти</a></div>' +
      '<div class="mm-photos">' + g.photos.map(function (p) { return '<a href="/' + p[0] + '"><span class="mm-ph"><img data-src="' + thumb(p[2]) + '" alt=""></span>' + esc(p[1]) + ' &rarr;</a>'; }).join('') + '</div></div>';
  }).join('');

  var openId = null, tOpen = 0, tClose = 0;
  function show(id) {
    clearTimeout(tClose);
    openId = id;
    [].forEach.call(mega.querySelectorAll('.mm-pane'), function (p) {
      var on = p.getAttribute('data-pane') === id; p.classList.toggle('is-on', on);
      if (on) [].forEach.call(p.querySelectorAll('img[data-src]'), function (im) { im.src = im.getAttribute('data-src'); im.removeAttribute('data-src'); });
    });
    [].forEach.call(nav.querySelectorAll('[data-pane]'), function (b) { var on = b.getAttribute('data-pane') === id; b.classList.toggle('is-active', on); b.setAttribute('aria-expanded', on); });
    mega.classList.add('is-on'); shade.classList.add('is-on');
  }
  function hide() {
    clearTimeout(tOpen);
    openId = null; mega.classList.remove('is-on'); shade.classList.remove('is-on');
    [].forEach.call(nav.querySelectorAll('[data-pane]'), function (b) { b.classList.remove('is-active'); b.setAttribute('aria-expanded', 'false'); });
  }
  nav.addEventListener('mouseover', function (e) {
    var b = e.target.closest('[data-pane]');
    clearTimeout(tOpen); clearTimeout(tClose);
    if (!b) { if (e.target.closest('a')) tClose = setTimeout(hide, 150); return; }
    var id = b.getAttribute('data-pane');
    tOpen = setTimeout(function () { show(id); }, openId ? 0 : 120);
  });
  nav.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pane]'); if (!b) return;
    var id = b.getAttribute('data-pane');
    if (openId === id) hide(); else show(id);
  });
  var bar = $('mm-bar');
  bar.addEventListener('mouseleave', function () { clearTimeout(tOpen); tClose = setTimeout(hide, 200); });
  bar.addEventListener('mouseenter', function () { clearTimeout(tClose); });
  shade.addEventListener('click', hide);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { hide(); closeDrawer(); } });

  // ---- пошук і кошик: використовуємо штатні вікна Тільди ----
  function trigger(href, fallback) {
    var a = document.querySelector('#rec2009917893 a[href="' + href + '"]') || document.querySelector('a[href="' + href + '"]:not(.mm a)');
    if (a) { a.click(); return; }
    if (fallback) fallback();
  }
  [].forEach.call(document.querySelectorAll('[data-mm-search]'), function (b) {
    b.addEventListener('click', function () { closeDrawer(); hide(); trigger('#opensearch'); });
  });
  document.querySelector('[data-mm-cart]').addEventListener('click', function () {
    hide(); trigger('#opencart', function () { if (window.tcart__openCart) window.tcart__openCart(); });
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

  // ---- рядок розділів замість старих кнопок (блок 976) ----
  var old = document.querySelector('.t-rec[data-record-type="976"]');
  if (old && curGroup) {
    var wrap = document.createElement('div');
    wrap.className = 'mm mm-chips-wrap';
    wrap.innerHTML = '<nav class="mm-chips" aria-label="Розділи групи «' + esc(curGroup.name) + '»">' +
      curGroup.cats.map(function (c) { return '<a href="/' + c[0] + '"' + (c[0] === cur ? ' class="is-cur" aria-current="page"' : '') + '>' + esc(c[1]) + '</a>'; }).join('') +
      '<button type="button" class="mm-all">Усі розділи</button></nav>';
    old.parentNode.insertBefore(wrap, old);
    wrap.querySelector('.mm-all').addEventListener('click', openDrawer);
    var c = wrap.querySelector('.is-cur'); if (c && c.offsetLeft > 200) wrap.querySelector('.mm-chips').scrollLeft = c.offsetLeft - 20;
  }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
