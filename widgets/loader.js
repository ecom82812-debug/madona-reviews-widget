/*
 * Завантажувач віджетів відгуків madona.com.ua
 * У Тільді лежить лише:  <div data-madona-widget="product"></div>  (або "home")
 *                        <script src=".../widgets/loader.js" defer></script>
 * Сам віджет (розмітка, стилі, код) береться з GitHub — оновлюється без Тільди.
 */
(function () {
  if (window.__madonaLoader) { window.__madonaLoader(); return; }
  var BASE = 'https://ecom82812-debug.github.io/madona-reviews-widget/widgets/';
  var VERSION = '1'; // міняється при кожному оновленні віджетів

  function mount(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = '1';
    var name = host.getAttribute('data-madona-widget');
    if (!/^[a-z-]+$/.test(name)) return;
    fetch(BASE + name + '.html?v=' + VERSION)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        // стилі та шрифти — у <head> сторінки, один раз
        doc.head.querySelectorAll('style, link[rel="stylesheet"]').forEach(function (el) {
          var key = 'mw-' + name + '-' + (el.href || el.textContent.length);
          if (document.querySelector('[data-mw="' + key + '"]')) return;
          var c = el.cloneNode(true);
          c.setAttribute('data-mw', key);
          document.head.appendChild(c);
        });
        // розмітка
        var scripts = [];
        Array.prototype.slice.call(doc.body.childNodes).forEach(function (n) {
          if (n.nodeName === 'SCRIPT') { scripts.push(n); return; }
          host.appendChild(document.importNode(n, true));
        });
        // код — виконується після вставки розмітки
        scripts.forEach(function (s) {
          var el = document.createElement('script');
          el.textContent = s.textContent;
          host.appendChild(el);
        });
      })
      .catch(function (e) { host.dataset.mounted = ''; console.warn('madona widget', name, e); });
  }

  function run() { document.querySelectorAll('[data-madona-widget]').forEach(mount); }
  window.__madonaLoader = run;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
