'use strict';

(function () {

  var ACTIVE_CLASS = 'img-filters__button--active';

  var filtersBlock = document.querySelector('.img-filters');
  var filtersControls = filtersBlock.querySelectorAll('.img-filters__button');

  var sortFunctions = {
    'filter-recomended': function () {
      return 0;
    },
    'filter-popular': function (a, b) {
      return b.likes - a.likes;
    },
    'filter-discussed': function (a, b) {
      return b.comments.length - a.comments.length;
    },
    'filter-random': function () {
      return window.util.getRandomInt(2) ? 1 : -1;
    }
  };

  var applyFilter = function (data, cb) {
    var filterName = filtersBlock.querySelector('.' + ACTIVE_CLASS).id;
    var result = data.slice().sort(sortFunctions[filterName]);
    cb(result);
  };

  var clearActivity = function () {
    filtersControls.forEach(function (item) {
      item.classList.remove(ACTIVE_CLASS);
    });
  };

  var showFilters = function (data, cb) {
    filtersBlock.classList.remove('img-filters--inactive');

    filtersControls.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (evt.target.classList.contains(ACTIVE_CLASS)) {
          return;
        }

        clearActivity();
        evt.target.classList.add(ACTIVE_CLASS);
        window.util.debounce(function () {
          applyFilter(data, cb);
        });
      });
    });
  };

  window.filters = {
    showFilters: showFilters
  };
})();
