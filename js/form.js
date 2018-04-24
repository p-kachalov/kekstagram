'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var uploadFileElement = document.querySelector('#upload-file');
  var uploadCancedElement = document.querySelector('#upload-cancel');
  var imageUploadElement = document.querySelector('.img-upload__overlay');


  var hashTagsElement = document.querySelector('.text__hashtags');
  var imageUploadForm = document.querySelector('.img-upload__form');

  var showImageUploadElement = function () {
    imageUploadElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentEscKeydown);

    window.resize.setDefaultSize();
    window.effects.applyEffect(true);
  };

  var hideImageUploadElement = function () {
    imageUploadElement.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentEscKeydown);
    uploadFileElement.value = '';
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

  hashTagsElement.addEventListener('input', onHashtagsInput);
  imageUploadForm.addEventListener('submit', onSubmitImageUplodadForm);
})();
