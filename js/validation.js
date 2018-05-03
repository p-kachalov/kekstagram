'use strict';

(function () {
  var MAX_TAGS = 5;
  var TAG_TEMPLATE = RegExp('^#([a-zA-Z0-9_]{1,19})$');

  var hashTagsElement = document.querySelector('.text__hashtags');

  var isTagsStringValid = function (tagsString) {
    if (tagsString.length === 0) {
      return true;
    }

    var tags = tagsString.split(' ')
        .filter(function (item) {
          return item;
        })
        .map(function (item) {
          return item.toLowerCase();
        });

    if (tags.length > MAX_TAGS) {
      return false;
    }

    return tags.reduce(function (acc, item) {
      if (
        !TAG_TEMPLATE.test(item) ||
        window.util.moreThanOnce(tags, item)) {
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
