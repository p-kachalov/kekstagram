'use strict';

(function () {
  var KeyCode = {
    ESC: 27
  };

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  var shuffleArray = function (arr) {
    var result = [];
    while (arr.length > 0) {
      var rnd = getRandomInt(arr.length);
      result.push(arr.splice(rnd, 1)[0]);
    }
    return result;
  };

  var isMoreThanOnce = function (list, item) {
    return list.reduce(function (acc, elem) {
      return elem === item ? acc + 1 : acc;
    }, 0) !== 1;
  };

  window.util = {
    getRandomInt: getRandomInt,
    shuffleArray: shuffleArray,
    isMoreThanOnce: isMoreThanOnce,
    KeyCode: KeyCode
  };
})();
