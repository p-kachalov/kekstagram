'use strict';

(function () {

  var renderPicturesSet = function (data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (element) {
      var pictureElement = window.picture.renderElement(element, function (photo) {
        window.preview.showBigPictureElement(photo);
      });
      fragment.appendChild(pictureElement);
    });
    return fragment;
  };

  var updatePictures = function (data) {
    var photosSetFragment = renderPicturesSet(data);

    var picturesElement = document.querySelector('.pictures');
    document.querySelectorAll('.picture__link').forEach(function (item) {
      item.parentNode.removeChild(item);
    });

    picturesElement.appendChild(photosSetFragment);
  };

  var onLoad = function (data) {
    updatePictures(data);
    window.showSorts(data, updatePictures);
  };

  var onError = function (err) {
    window.showErrorMessage(err);
  };

  window.backend.loadData(onLoad, onError);

})();
