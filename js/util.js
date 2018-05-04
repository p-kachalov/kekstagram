'use strict';

(function () {
  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  var showErrorMessage = function (err) {
    var errorBlock = document.createElement('div');
    errorBlock.classList.add('error-message');
    errorBlock.style.background = 'rgba(255, 100, 100, 0.9)';
    errorBlock.style.display = 'flex';
    errorBlock.style.position = 'absolute';
    errorBlock.style.zIndex = '100';
    errorBlock.style.top = '0';
    errorBlock.style.width = '100%';
    var errorText = document.createElement('p');
    errorText.style.color = 'white';
    errorText.style.fontWeight = 'bold';
    errorText.style.margin = '20px auto';
    errorText.textContent = err;
    errorBlock.appendChild(errorText);
    document.querySelector('body').appendChild(errorBlock);

    var hideErrorMessage = function () {
      document.querySelector('.error-message').remove();
      document.removeEventListener('click', hideErrorMessage);
    };

    document.addEventListener('click', hideErrorMessage);
  };

  var shuffleArray = function (arr) {
    var result = [];
    while (arr.length > 0) {
      var rnd = getRandomInt(arr.length);
      result.push(arr.splice(rnd, 1)[0]);
    }
    return result;
  };

  var moreThanOnce = function (list, item) {
    return list.reduce(function (acc, elem) {
      return elem === item ? acc + 1 : acc;
    }, 0) !== 1;
  };

  window.util = {
    getRandomInt: getRandomInt,
    showErrorMessage: showErrorMessage,
    shuffleArray: shuffleArray,
    moreThanOnce: moreThanOnce
  };
})();
