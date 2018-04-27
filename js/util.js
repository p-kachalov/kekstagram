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

  var makeSlider = function (lineElement, levelElement, pinElement, inputElement) {
    return {
      line: lineElement,
      level: levelElement,
      pin: pinElement,
      input: inputElement,
      minValuePosition: 0,
      maxValuePosition: 0,
      curentPosition: 0,
      getValue: function () {
        return Math.round(this.level.offsetWidth / this.line.offsetWidth * 100);
      },
      resetToDefault: function () {
        var leftPositon = this.line.getBoundingClientRect().left;
        var rightPositon = this.line.getBoundingClientRect().right;

        this.pin.style.left = rightPositon - leftPositon + 'px';
        this.level.style.width = rightPositon - leftPositon + 'px';
        this.input.value = this.getValue();
      },
      setStartValues: function (position) {
        this.minValuePosition = lineElement.getBoundingClientRect().left;
        this.maxValuePosition = lineElement.getBoundingClientRect().right;
        this.curentPosition = position;
        this.input.value = this.getValue();
      },
      updatePosition: function (newPosition) {
        if (newPosition < this.minValuePosition || newPosition > this.maxValuePosition) {
          return;
        }

        var shift = this.curentPosition - newPosition;
        this.curentPosition = newPosition;

        this.pin.style.left = (this.pin.offsetLeft - shift) + 'px';
        this.level.style.width = (this.level.offsetWidth - shift) + 'px';

        this.input.value = this.getValue();
      }
    };
  };

  window.util = {
    getRandomInt: getRandomInt,
    showErrorMessage: showErrorMessage,
    makeSlider: makeSlider
  };
})();
