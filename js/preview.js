'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');

  var makeCommentTemplate = function () {
    var commentElement = document.createElement('li');
    var avatarElement = document.createElement('img');

    commentElement.classList.add('social__comment');
    commentElement.classList.add('social__comment--text');
    avatarElement.classList.add('social__picture');

    avatarElement.width = '35';
    avatarElement.height = '35';
    avatarElement.alt = 'Аватар комментатора фотографии';

    commentElement.appendChild(avatarElement);

    return commentElement;
  };

  var renderComent = function (commentText, avatarUrl) {
    var commentElement = makeCommentTemplate();
    var avatarElement = commentElement.querySelector('.social__picture');

    avatarElement.src = avatarUrl;
    commentElement.appendChild(document.createTextNode(commentText));

    return commentElement;
  };

  var showBigPictureElemnt = function (photo) {
    var pictureImage = bigPictureElement.querySelector('.big-picture__img img');
    var pictureLikes = bigPictureElement.querySelector('.likes-count');
    var pictureComentsCount = bigPictureElement.querySelector('.comments-count');
    var pictureComentsList = bigPictureElement.querySelector('.social__comments');
    var socialCommentCount = bigPictureElement.querySelector('.social__comment-count');
    var socialCommentLoad = bigPictureElement.querySelector('.social__comment-loadmore');

    pictureImage.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComentsCount.textContent = photo.comments.length;

    while (pictureComentsList.firstChild) {
      pictureComentsList.removeChild(pictureComentsList.firstChild);
    }
    for (var i = 0; i < photo.comments.length; i++) {
      var commentText = photo.comments[i];
      var avatarUrl = 'img/avatar-' + (1 + window.util.getRandomInt(5)) + '.svg';
      pictureComentsList.appendChild(renderComent(commentText, avatarUrl));
    }

    socialCommentCount.classList.add('visually-hidden');
    socialCommentLoad.classList.add('visually-hidden');

    bigPictureElement.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
    document.addEventListener('keydown', onDocumentBigPictureEscKeydown);
  };

  var hideBigPictureElemnt = function () {
    bigPictureElement.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
    document.removeEventListener('keydown', onDocumentBigPictureEscKeydown);
  };

  var onBigPictureCancelClick = function () {
    hideBigPictureElemnt();
  };

  var onDocumentBigPictureEscKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideBigPictureElemnt();
    }
  };

  window.preview = {
    showBigPictureElemnt: showBigPictureElemnt
  };

})();