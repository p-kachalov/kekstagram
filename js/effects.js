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

  var EffectsMap = {
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
      slider.resetToDefault();
    }

    imagePreviewImage.className = EffectsMap[currentEffect].className;
    imagePreviewImage.style.filter = EffectsMap[currentEffect].calcFilterValue(scaleValueElement.value);
  };

  var setOrigin = function () {
    effectControls[ORIGIN_EFFECT.position].checked = true;
    imagePreviewImage.className = null;
    imagePreviewImage.style.filter = null;
    scaleElement.classList.add('hidden');
  };

  var onEffectControlChange = function () {
    slider.resetToDefault();
    applyEffect();
  };

  for (var i = 0; i < effectControls.length; i++) {
    effectControls[i].addEventListener('change', onEffectControlChange);
  }

  var slider = window.slider.makeSlider(
      {
        line: scaleLineElement,
        level: scaleLevelElement,
        pin: scalePinControl,
        input: scaleValueElement,
      },
      function () {
        applyEffect();
      });

  window.effects = {
    setOrigin: setOrigin,
    applyEffect: applyEffect
  };

})();
