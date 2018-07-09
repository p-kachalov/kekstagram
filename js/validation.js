'use strict';

(function () {
  var MAX_TAGS = 5;

  var hashTagsElement = document.querySelector('.text__hashtags');

  var resetErrors = function () {
    hashTagsElement.setCustomValidity('');
    hashTagsElement.style.outline = null;
  };

  var getErrorForTagsString = function (tagsString) {
    if (tagsString.length === 0) {
      return null;
    }

    var tags = tagsString.toLowerCase().split(' ').filter(function (item) {
      return item;
    });

    if (tags.length > MAX_TAGS) {
      return 'нельзя указать больше пяти хэш-тегов';
    }

    var errorMessage;
    var isValid = tags.every(function (tag, index) {
      if (tag[0] !== '#') {
        errorMessage = 'хэш-тег начинается с символа # (решётка)';
        return false;
      }
      if (tag.length < 2) {
        errorMessage = 'хеш-тег не может состоять только из одной решётки';
        return false;
      }
      if (tag.length > 20) {
        errorMessage = 'максимальная длина одного хэш-тега 20 символов';
        return false;
      }
      if (tags.includes(tag, index + 1)) {
        errorMessage = 'один и тот же хэш-тег не может быть использован дважды';
        return false;
      }
      return true;
    });

    return isValid ? null : errorMessage;
  };

  var onHashtagsInput = function () {
    var error = getErrorForTagsString(hashTagsElement.value);
    if (error) {
      hashTagsElement.setCustomValidity(error);
      hashTagsElement.style.outline = '5px solid red';
    } else {
      resetErrors();
    }
  };

  hashTagsElement.addEventListener('input', onHashtagsInput);

  window.validation = {
    resetErrors: resetErrors
  };

})();
