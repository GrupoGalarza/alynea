/* GRUPO GALARZA — interacciones de entregables
   1) Scroll-reveal automático (IntersectionObserver, sin flash, sin editar HTML)
   2) Galería de opciones (tabs)
   Progressive enhancement: si el JS no corre, todo se ve normal (nada queda oculto).
   Respeta prefers-reduced-motion y se desactiva en print. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var SEL = [
    '.section .kicker', '.section h1', '.section h2', '.section .lede',
    '.section .figure', '.section .callout', '.section .stat', '.section .service',
    '.section .step', '.section .vlist li', '.section .checklist li',
    '.section .zone-legend li', '.section .siteplan', '.section .optgallery',
    '.section .tags', '.section .opt-tabs', '.section > .wrap > p', '.section .contact-row'
  ].join(', ');

  function initReveal() {
    var els = [].slice.call(document.querySelectorAll(SEL));
    // stagger dentro de grupos hermanos
    els.forEach(function (el) {
      var sibs = el.parentElement ? [].slice.call(el.parentElement.children).filter(function (c) { return els.indexOf(c) !== -1; }) : [el];
      var i = sibs.indexOf(el);
      if (i > 0 && i < 8) el.style.transitionDelay = (i * 0.06).toFixed(2) + 's';
    });

    if (reduce) {
      els.forEach(function (el) { el.classList.add('reveal', 'in'); });
      return;
    }
    els.forEach(function (el) { el.classList.add('reveal'); });

    // Manejador de scroll: revela todo lo que esté en o por encima del viewport.
    // Robusto a scroll suave Y a saltos rápidos (anclas, teclado, barra de scroll).
    var ticking = false;
    function reveal() {
      ticking = false;
      var vh = window.innerHeight || 800;
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.classList.contains('in')) continue;
        if (el.getBoundingClientRect().top < vh * 0.90) el.classList.add('in');
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(reveal); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    reveal();
  }

  function initGalleries() {
    var galleries = [].slice.call(document.querySelectorAll('[data-gallery]'));
    if (galleries.length) document.documentElement.classList.add('has-js');

    galleries.forEach(function (g, gi) {
      var tabsWrap = g.querySelector('.opt-tabs');
      var tabs = [].slice.call(g.querySelectorAll('.opt-tab'));
      var panels = [].slice.call(g.querySelectorAll('.opt-panel'));
      if (tabsWrap) tabsWrap.setAttribute('role', 'tablist');

      // Semántica ARIA (patrón Tabs de WAI-ARIA)
      tabs.forEach(function (t, i) {
        var opt = t.getAttribute('data-opt');
        var tid = 'g' + gi + '-tab' + opt, pid = 'g' + gi + '-panel' + opt;
        var active = t.classList.contains('is-active');
        t.id = tid; t.setAttribute('role', 'tab');
        t.setAttribute('type', 'button');
        t.setAttribute('aria-controls', pid);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.setAttribute('tabindex', active ? '0' : '-1');
        var p = panels[i];
        if (p) { p.id = pid; p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', tid); p.setAttribute('tabindex', '0'); }
      });

      function activate(opt, focus) {
        tabs.forEach(function (t) {
          var on = t.getAttribute('data-opt') === opt;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.setAttribute('tabindex', on ? '0' : '-1');
          if (on && focus) t.focus();
        });
        panels.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-opt') === opt); });
      }

      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { activate(t.getAttribute('data-opt')); });
        t.addEventListener('keydown', function (e) {
          var ni = null;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') ni = (i + 1) % tabs.length;
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ni = (i - 1 + tabs.length) % tabs.length;
          else if (e.key === 'Home') ni = 0;
          else if (e.key === 'End') ni = tabs.length - 1;
          if (ni !== null) { e.preventDefault(); activate(tabs[ni].getAttribute('data-opt'), true); }
        });
      });
    });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () { initGalleries(); initReveal(); });
})();
