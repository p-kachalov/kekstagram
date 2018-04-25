'use strict';

(function () {

  var PHOTOS_NUMBER = 25;

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

  var randomPhotosSet = window.dataMock.makeRandomPhotosSet(PHOTOS_NUMBER);
  var photosSetFragment = renderPicturesSet(randomPhotosSet);
  var picturesElement = document.querySelector('.pictures');
  picturesElement.appendChild(photosSetFragment);

})();
