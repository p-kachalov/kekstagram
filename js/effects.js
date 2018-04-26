'use strict';

(function () {
  var ORIGIN_EFFECT = {name: 'none', position: 0};

  var effectControls = document.querySelectorAll('.effects__radio');
  var scaleElement = document.querySelector('.img-upload__scale');
  var scaleLineElement = document.querySelector('.scale__line');
  var scaleLevelElement = document.querySelector('.scale__level');
  var scalePinControl = document.querySelector('.scale__pin');
  var scaleValueElement = document.querySelector('.scale__value');
  var imagePreviewImage = document.querySelector('.img-upload__preview img');

  var effectsMap = {
    chrome: {
      className: 'effects__preview--chrome',
      calcFilterValue: function (value) {
        return 'grayscale(' + value / 100 + ')';
      }
    },
    sepia: {
      className: 'effects__preview--sepia',
      calcFilterValue: function (value) {
        return 'sepia(' + value / 100 + ')';
      }
    },
    marvin: {
      className: 'effects__preview--marvin',
      calcFilterValue: function (value) {
        return 'invert(' + value + '%)';
      }
    },
    phobos: {
      className: 'effects__preview--phobos',
      calcFilterValue: function (value) {
        return 'blur(' + value / 100 * 3 + 'px)';
      }
    },
    heat: {
      className: 'effects__preview--heat',
      calcFilterValue: function (value) {
        return 'brightness(' + (1 + value / 100 * 2) + ')';
      }
    }
  };

  var applyEffect = function () {
    var currentEffect = document.querySelector('.effects__radio:checked').value;

    if (currentEffect === ORIGIN_EFFECT.name) {
      setOrigin();
      return;
    }

    if (scaleElement.classList.contains('hidden')) {
      scaleElement.classList.remove('hidden');
      resetEffectValue();
    }

    imagePreviewImage.className = effectsMap[currentEffect].className;
    imagePreviewImage.style.filter = effectsMap[currentEffect].calcFilterValue(scaleValueElement.value);
  };

  var setOrigin = function () {
    effectControls[ORIGIN_EFFECT.position].checked = true;
    imagePreviewImage.className = null;
    imagePreviewImage.style.filter = null;
    scaleElement.classList.add('hidden');
  };

  var resetEffectValue = function () {
    var leftPositon = scaleLineElement.getBoundingClientRect().left;
    var rightPositon = scaleLineElement.getBoundingClientRect().right;

    scalePinControl.style.left = rightPositon - leftPositon + 'px';
    scaleLevelElement.style.width = rightPositon - leftPositon + 'px';
    scaleValueElement.value = calcEffectScale();
  };

  var calcEffectScale = function () {
    var maxValue = scaleLineElement.offsetWidth;
    var currentValue = scaleLevelElement.offsetWidth;
    return Math.round(currentValue / maxValue * 100);
  };

  var onScalePinControlMousedown = function (evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;
    var linePosition = scaleLineElement.getBoundingClientRect();
    var leftBorder = linePosition.left;
    var rightBorder = linePosition.right;

    var onScalePinControlMousemove = function (moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.clientX < leftBorder || moveEvt.clientX > rightBorder) {
        return;
      }

      var shiftX = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      scalePinControl.style.left = (scalePinControl.offsetLeft - shiftX) + 'px';
      scaleLevelElement.style.width = (scaleLevelElement.offsetWidth - shiftX) + 'px';

      scaleValueElement.value = calcEffectScale();
      // console.log(scaleValueElement.value);
      applyEffect();
    };

    var onScalePinControlMouseup = function (upEvt) {
      upEvt.preventDefault();

      scaleValueElement.value = calcEffectScale();
      applyEffect();

      document.removeEventListener('mousemove', onScalePinControlMousemove);
      document.removeEventListener('mouseup', onScalePinControlMouseup);
    };

    document.addEventListener('mousemove', onScalePinControlMousemove);
    document.addEventListener('mouseup', onScalePinControlMouseup);
  };

  var onEffectControlChange = function () {
    resetEffectValue();
    applyEffect();
  };

  scalePinControl.addEventListener('mousedown', onScalePinControlMousedown);

  for (var i = 0; i < effectControls.length; i++) {
    effectControls[i].addEventListener('change', onEffectControlChange);
  }

  window.effects = {
    setOrigin: setOrigin,
    applyEffect: applyEffect
  };

})();
