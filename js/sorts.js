'use strict';

(function () {

  var ACTIVE_CLASS = 'img-filters__button--active';

  var sortsBlock = document.querySelector('.img-filters');
  var sortsControls = sortsBlock.querySelectorAll('.img-filters__button');

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

  var sortPhotos = function (data, cb) {
    var filterName = sortsBlock.querySelector('.' + ACTIVE_CLASS).id;
    var result = data.slice().sort(sortFunctions[filterName]);
    cb(result);
  };

  var clearActivity = function () {
    sortsControls.forEach(function (item) {
      item.classList.remove(ACTIVE_CLASS);
    });
  };

  var showSorts = function (data, cb) {
    sortsBlock.classList.remove('img-filters--inactive');

    sortsControls.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (evt.target.classList.contains(ACTIVE_CLASS)) {
          return;
        }

        clearActivity();
        evt.target.classList.add(ACTIVE_CLASS);
        window.util.debounce(function () {
          sortPhotos(data, cb);
        });
      });
    });
  };

  window.sorts = {
    showSorts: showSorts
  };
})();
