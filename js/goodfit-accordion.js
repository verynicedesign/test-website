(function() {
  'use strict';

  function init() {
    var toggles = document.querySelectorAll('.services-fit .fit-column-toggle');
    if (toggles.length === 0) return;

    var columns = document.querySelectorAll('.services-fit .fit-column');

    toggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        var column = toggle.closest('.fit-column');
        if (!column) return;

        if (column.getAttribute('data-expanded') === 'true') return;

        columns.forEach(function(c) {
          c.setAttribute('data-expanded', 'false');
          var t = c.querySelector('.fit-column-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        column.setAttribute('data-expanded', 'true');
        toggle.setAttribute('aria-expanded', 'true');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
