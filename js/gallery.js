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

  var onLoad = function (data) {
    var photosSetFragment = renderPicturesSet(data);
    var picturesElement = document.querySelector('.pictures');
    picturesElement.appendChild(photosSetFragment);
  };

  var onError = function (err) {
    window.util.showErrorMessage(err);
  };

  window.backend.loadData(onLoad, onError);

})();
