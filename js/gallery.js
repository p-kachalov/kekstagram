'use strict';

(function () {

  var renderPicturesSet = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var pictureElement = window.picture.renderPictureElement(data[i], function (photo) {
        window.preview.showBigPictureElement(photo);
      });
      fragment.appendChild(pictureElement);
    }
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
    window.sorts.showSorts(data, updatePictures);
  };

  var onError = function (err) {
    window.util.showErrorMessage(err);
  };

  window.backend.loadData(onLoad, onError);

})();
