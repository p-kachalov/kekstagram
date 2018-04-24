'use strict';

(function () {
  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  window.util = {
    getRandomInt: getRandomInt
  };
})();
