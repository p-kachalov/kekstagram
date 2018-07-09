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

  window.util = {
    getRandomInt: getRandomInt,
    shuffleArray: shuffleArray,
    KeyCode: KeyCode
  };
})();
