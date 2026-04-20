(function() {
  'use strict';

  function init() {
    var toggles = document.querySelectorAll('.services-packages .package-toggle');
    if (toggles.length === 0) return;

    toggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        var article = toggle.closest('.package');
        if (!article) return;

        var isExpanded = article.getAttribute('data-expanded') === 'true';

        if (isExpanded) {
          article.setAttribute('data-expanded', 'false');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          document.querySelectorAll('.services-packages .package').forEach(function(pkg) {
            pkg.setAttribute('data-expanded', 'false');
            var pkgToggle = pkg.querySelector('.package-toggle');
            if (pkgToggle) pkgToggle.setAttribute('aria-expanded', 'false');
          });
          article.setAttribute('data-expanded', 'true');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
