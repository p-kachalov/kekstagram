'use strict';

(function () {
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
