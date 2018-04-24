'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var RESIZE_STEP = 25;
  var RESIZE_VALUE_DEFAULT = 100;
  var RESIZE_VALUE_MIN = 25;
  var RESIZE_VALUE_MAX = 100;

  var uploadFileElement = document.querySelector('#upload-file');
  var uploadCancedElement = document.querySelector('#upload-cancel');
  var imageUploadElement = document.querySelector('.img-upload__overlay');

  var resizeControlsPanel = document.querySelector('.img-upload__resize');
  var resizeControlMinus = document.querySelector('.resize__control--minus');
  var resizeControlPlus = document.querySelector('.resize__control--plus');
  var resizeControlValue = document.querySelector('.resize__control--value');
  var imagePreviewElement = document.querySelector('.img-upload__preview');

  var effectControls = document.querySelectorAll('.effects__radio');
  var scaleElement = document.querySelector('.img-upload__scale');
  var scaleLineElement = document.querySelector('.scale__line');
  var scaleLevelElement = document.querySelector('.scale__level');
  var scalePinControl = document.querySelector('.scale__pin');
  var scaleValueElement = document.querySelector('.scale__value');
  var imagePreviewImage = document.querySelector('.img-upload__preview img');

  var hashTagsElement = document.querySelector('.text__hashtags');
  var imageUploadForm = document.querySelector('.img-upload__form');

  var effectsMap = {
    none: {
      className: '',
      calcFilterValue: function () {
        return null;
      }
    },
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

  var showImageUploadElement = function () {
    imageUploadElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentEscKeydown);

    resizeControlsPanel.style.zIndex = 1;
    resizeControlValue.value = RESIZE_VALUE_DEFAULT + '%';
    imagePreviewElement.style.transform = null;
    applyEffect(true);
  };

  var hideImageUploadElement = function () {
    imageUploadElement.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentEscKeydown);
    uploadFileElement.value = '';
  };

  var applyEffect = function (toDefault) {
    var currentEffect = document.querySelector('.effects__radio:checked').value;

    if (currentEffect === 'none') {
      scaleElement.classList.add('hidden');
    } else if (scaleElement.classList.contains('hidden')) {
      scaleElement.classList.remove('hidden');
    }

    if (toDefault) {
      var leftPositon = scaleLineElement.getBoundingClientRect().left;
      var rightPositon = scaleLineElement.getBoundingClientRect().right;

      scalePinControl.style.left = rightPositon - leftPositon + 'px';
      scaleLevelElement.style.width = rightPositon - leftPositon + 'px';
      scaleValueElement.value = calcEffectScale();
    }

    imagePreviewImage.className = effectsMap[currentEffect].className;
    imagePreviewImage.style.filter = effectsMap[currentEffect].calcFilterValue(scaleValueElement.value);
  };

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

  var calcEffectScale = function () {
    var maxValue = scaleLineElement.offsetWidth;
    var currentValue = scaleLevelElement.offsetWidth;
    return Math.round(currentValue / maxValue * 100);
  };

  var moreThanOnce = function (list, item) {
    return list.reduce(function (acc, elem) {
      return elem.toLowerCase() === item.toLowerCase() ? acc + 1 : acc;
    }, 0) !== 1;
  };

  var isTagsStringValid = function (tagsString) {
    if (tagsString.length === 0) {
      return true;
    }

    var tags = tagsString.split(' ');
    if (tags.length > 5) {
      return false;
    }

    return tags.reduce(function (acc, item) {
      if (
        item[0] !== '#' ||
        item.length === 1 ||
        item.length > 20 ||
        moreThanOnce(tags, item)) {
        return false;
      }
      return acc;
    }, true);
  };

  var onUploadFileChange = function () {
    showImageUploadElement();
  };

  var onUploadCancelClick = function () {
    hideImageUploadElement();
  };

  var onDocumentEscKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE &&
      evt.target !== document.querySelector('.text__hashtags') &&
      evt.target !== document.querySelector('.text__description')) {
      hideImageUploadElement();
    }
  };

  var onResizeControlMinusClick = function () {
    decreaseResizeControlValue();
  };

  var onResizeControlPlusClick = function () {
    increaseResizeControlValue();
  };

  var onEffectControlChange = function () {
    applyEffect(true);
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

  var onHashtagsInput = function () {
    if (!isTagsStringValid(hashTagsElement.value)) {
      hashTagsElement.setCustomValidity('hashtags invalid');
      hashTagsElement.style.outline = '5px solid red';
    } else {
      hashTagsElement.setCustomValidity('');
      hashTagsElement.style.outline = null;
    }
  };

  var onSubmitImageUplodadForm = function (evt) {
    evt.preventDefault();
    if (imageUploadForm.reportValidity()) {
      imageUploadForm.submit();
    }
  };

  uploadFileElement.addEventListener('change', onUploadFileChange);
  uploadCancedElement.addEventListener('click', onUploadCancelClick);

  resizeControlMinus.addEventListener('click', onResizeControlMinusClick);
  resizeControlPlus.addEventListener('click', onResizeControlPlusClick);

  scalePinControl.addEventListener('mousedown', onScalePinControlMousedown);

  for (var i = 0; i < effectControls.length; i++) {
    effectControls[i].addEventListener('change', onEffectControlChange);
  }

  hashTagsElement.addEventListener('input', onHashtagsInput);
  imageUploadForm.addEventListener('submit', onSubmitImageUplodadForm);
})();
