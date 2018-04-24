'use strict';

(function () {
  var RESIZE_STEP = 25;
  var RESIZE_VALUE_DEFAULT = 100;
  var RESIZE_VALUE_MIN = 25;
  var RESIZE_VALUE_MAX = 100;

  var resizeControlsPanel = document.querySelector('.img-upload__resize');
  var resizeControlMinus = document.querySelector('.resize__control--minus');
  var resizeControlPlus = document.querySelector('.resize__control--plus');
  var resizeControlValue = document.querySelector('.resize__control--value');
  var imagePreviewElement = document.querySelector('.img-upload__preview');

  var decreaseResizeControlValue = function () {
    var resizeValueNum = parseFloat(resizeControlValue.value);
    resizeValueNum -= RESIZE_STEP;
    if (resizeValueNum >= RESIZE_VALUE_MIN) {
      resizeControlValue.value = resizeValueNum + '%';
      imagePreviewElement.style.transform = 'scale(' + resizeValueNum / 100 + ')';
    }
  };

  var increaseResizeControlValue = function () {
    var resizeValueNum = parseFloat(resizeControlValue.value);
    resizeValueNum += RESIZE_STEP;
    if (resizeValueNum <= RESIZE_VALUE_MAX) {
      resizeControlValue.value = resizeValueNum + '%';
      imagePreviewElement.style.transform = 'scale(' + resizeValueNum / 100 + ')';
    }
  };

  var onResizeControlMinusClick = function () {
    decreaseResizeControlValue();
  };

  var onResizeControlPlusClick = function () {
    increaseResizeControlValue();
  };

  var setDefaultSize = function () {
    resizeControlValue.value = RESIZE_VALUE_DEFAULT + '%';
    imagePreviewElement.style.transform = null;
  };

  resizeControlsPanel.style.zIndex = 1;
  resizeControlMinus.addEventListener('click', onResizeControlMinusClick);
  resizeControlPlus.addEventListener('click', onResizeControlPlusClick);

  window.resize = {
    setDefaultSize: setDefaultSize
  };

})();
