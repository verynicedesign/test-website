(function() {
  'use strict';

  var STEPS = [
    {
      label: 'The Brief',
      title: 'Every project starts with a proper conversation.',
      body: 'Goals, audience, and priorities are captured and documented so the work always has something to come back to.'
    },
    {
      label: 'The Plan',
      title: 'A clear plan before design begins.',
      body: 'Scope, timeline, and deliverables are laid out so there are no questions about what\u2019s being built or when.'
    },
    {
      label: 'The Build',
      title: 'Weekly sprints, shared progress.',
      body: 'Work is shared at each milestone so you can be updated on progress. Feedback is collected and incorporated before the next sprint begins.'
    },
    {
      label: 'The Launch',
      title: 'Delivered in full, with a check-in after.',
      body: 'Completed work is delivered with a handoff session covering everything needed to move forward confidently. A two-week check-in follows to make sure everything is running smoothly.'
    }
  ];

  function init() {
    var tabs = document.querySelectorAll('.process-tab');
    if (tabs.length === 0) return;

    var panel = document.getElementById('process-panel');
    var labelEl = panel.querySelector('.process-panel-label');
    var titleEl = panel.querySelector('.process-panel-title');
    var bodyEl = panel.querySelector('.process-panel-body');
    var prevBtn = document.getElementById('process-prev');
    var nextBtn = document.getElementById('process-next');

    var current = 0;

    function render(next) {
      if (next === current) return;
      panel.classList.add('is-fading');

      setTimeout(function() {
        current = next;
        var step = STEPS[current];
        labelEl.textContent = step.label;
        titleEl.textContent = step.title;
        bodyEl.textContent = step.body;

        tabs.forEach(function(tab, i) {
          tab.setAttribute('aria-selected', i === current ? 'true' : 'false');
        });

        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === STEPS.length - 1;

        panel.classList.remove('is-fading');
      }, 200);
    }

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        render(parseInt(tab.getAttribute('data-step'), 10));
      });
    });

    prevBtn.addEventListener('click', function() {
      if (current > 0) render(current - 1);
    });

    nextBtn.addEventListener('click', function() {
      if (current < STEPS.length - 1) render(current + 1);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
