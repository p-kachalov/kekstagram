'use strict';

(function () {

  var ACTIVE_CLASS = 'img-filters__button--active';

  var filtersBlock = document.querySelector('.img-filters');
  var filtersControls = filtersBlock.querySelectorAll('.img-filters__button');

  var filtersMap = {
    'filter-recomended': function (data) {
      return data;
    },
    'filter-popular': function (data) {
      return data.sort(function (a, b) {
        return b.likes - a.likes;
      });
    },
    'filter-discussed': function (data) {
      return data.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    },
    'filter-random': function (data) {
      var random;
      var tmp;
      for (var i = data.length - 1; i > 0; i--) {
        random = window.util.getRandomInt(i);
        tmp = data[i];
        data[i] = data[random];
        data[random] = tmp;
      }

      return data;
    }
  };

  var applyFilter = function (data, cb) {
    var filterName = filtersBlock.querySelector('.' + ACTIVE_CLASS).id;
    var result = filtersMap[filterName](data.slice());
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
