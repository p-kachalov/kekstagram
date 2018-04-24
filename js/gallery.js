'use strict';

(function () {

  var PHOTOS_NUMBER = 25;
  var pictureClickHandler = window.preview.showBigPictureElemnt;

  var renderPicturesSet = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var pictureElement = window.picture.renderPictureElement(data[i], pictureClickHandler);
      fragment.appendChild(pictureElement);
    }
    return fragment;
  };

  var randomPhotosSet = window.dataMock.makeRandomPhotosSet(PHOTOS_NUMBER);
  var photosSetFragment = renderPicturesSet(randomPhotosSet);
  var picturesElement = document.querySelector('.pictures');
  picturesElement.appendChild(photosSetFragment);

})();
