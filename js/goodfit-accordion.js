(function() {
  'use strict';

  function init() {
    var toggles = document.querySelectorAll('.services-fit .fit-column-toggle');
    if (toggles.length === 0) return;

    var columns = document.querySelectorAll('.services-fit .fit-column');

    columns.forEach(function(c) {
      var body = c.querySelector('.fit-column-body');
      if (!body) return;
      if (c.getAttribute('data-expanded') === 'true') {
        body.classList.add('is-open');
      } else {
        body.classList.remove('is-open');
      }
    });

    toggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        var column = toggle.closest('.fit-column');
        if (!column) return;

        var wasOpen = column.getAttribute('data-expanded') === 'true';
        var target = column;
        if (wasOpen) {
          for (var i = 0; i < columns.length; i++) {
            if (columns[i] !== column) { target = columns[i]; break; }
          }
        }

        columns.forEach(function(c) {
          var shouldOpen = c === target;
          c.setAttribute('data-expanded', shouldOpen ? 'true' : 'false');
          var t = c.querySelector('.fit-column-toggle');
          if (t) t.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
          var b = c.querySelector('.fit-column-body');
          if (b) {
            if (shouldOpen) b.classList.add('is-open');
            else b.classList.remove('is-open');
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
