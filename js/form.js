'use strict';

(function () {

  var uploadFileElement = document.querySelector('#upload-file');
  var uploadCancedElement = document.querySelector('#upload-cancel');
  var imageUploadElement = document.querySelector('.img-upload__overlay');
  var imageUploadForm = document.querySelector('.img-upload__form');

  var showImageUploadElement = function () {
    if (!window.loadUserFile()) {
      return;
    }

    imageUploadElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentEscKeydown);

    window.resize.setDefaultSize();
    window.effects.setOrigin();
  };

  var hideImageUploadElement = function () {
    imageUploadElement.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentEscKeydown);
    imageUploadForm.reset();
    window.validation.resetErrors();
  };

  var showUploadErrorBlock = function () {
    document.querySelector('.img-upload__message--error').classList.remove('hidden');
  };

  var onUploadFileChange = function () {
    showImageUploadElement();
  };

  var onUploadCancelClick = function () {
    hideImageUploadElement();
  };

  var onDocumentEscKeydown = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC &&
      evt.target !== document.querySelector('.text__hashtags') &&
      evt.target !== document.querySelector('.text__description')) {
      hideImageUploadElement();
    }
  };

  var onSubmitImageUplodadForm = function (evt) {
    evt.preventDefault();
    var onLoad = function () {
      imageUploadForm.reset();
      hideImageUploadElement();
    };

    var onError = function () {
      hideImageUploadElement();
      showUploadErrorBlock();
    };

    if (imageUploadForm.reportValidity()) {
      var formData = new FormData(imageUploadForm);
      window.backend.postData(formData, onLoad, onError);
    }
  };

  uploadFileElement.addEventListener('change', onUploadFileChange);
  uploadCancedElement.addEventListener('click', onUploadCancelClick);

  imageUploadForm.addEventListener('submit', onSubmitImageUplodadForm);

})();
