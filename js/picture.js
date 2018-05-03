'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture')
      .content.querySelector('.picture__link');

  var renderPictureElement = function (photo, onPictureClick) {
    var pictureElement = photoTemplate.cloneNode(true);
    var pictureImage = pictureElement.querySelector('.picture__img');
    var pictureLikes = pictureElement.querySelector('.picture__stat--likes');
    var pictureComents = pictureElement.querySelector('.picture__stat--comments');
    pictureImage.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComents.textContent = photo.comments.length;
    pictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      onPictureClick(photo);
    });
    return pictureElement;
  };

  window.picture = {
    renderPictureElement: renderPictureElement
  };
})();
