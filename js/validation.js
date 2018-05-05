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

    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i];
      if (tag[0] !== '#') {
        return 'хэш-тег начинается с символа # (решётка)';
      } else if (tag.length < 2) {
        return 'хеш-тег не может состоять только из одной решётки';
      } else if (tag.length > 20) {
        return 'максимальная длина одного хэш-тега 20 символов';
      } else if (tags.slice(0, i).includes(tag)) {
        return 'один и тот же хэш-тег не может быть использован дважды';
      } else {
        continue;
      }
    }

    return null;
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
