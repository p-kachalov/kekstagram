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

  window.util = {
    getRandomInt: getRandomInt,
    showErrorMessage: showErrorMessage,
  };
})();
