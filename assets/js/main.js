(function () {
  'use strict';
  var GATEWAY = 'https://portfolio-gateway-production.jaguar999paw.workers.dev';
  var dot = document.getElementById('api-status');

  function setState(state) {
    if (!dot) return;
    dot.classList.remove('online', 'offline');
    if (state) dot.classList.add(state);
  }

  function pingGateway() {
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 4000);
    fetch(GATEWAY + '/api/jeandoe/hello', { signal: controller.signal })
      .then(function (res) { clearTimeout(timeout); if (!res.ok) throw new Error('bad status'); return res.json(); })
      .then(function () { setState('online'); })
      .catch(function () { clearTimeout(timeout); setState('offline'); });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  pingGateway();
})();
