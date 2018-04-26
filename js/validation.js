'use strict';

(function () {
  var MAX_TAGS = 5;
  var TAG_TEMPLATE = RegExp('^#([a-zA-Z0-9_]{1,19})$');

  var hashTagsElement = document.querySelector('.text__hashtags');

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
    if (tags.length > MAX_TAGS) {
      return false;
    }

    return tags.reduce(function (acc, item) {
      if (
        !TAG_TEMPLATE.test(item) ||
        moreThanOnce(tags, item)) {
        return false;
      }
      return acc;
    }, true);
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

  hashTagsElement.addEventListener('input', onHashtagsInput);
})();
