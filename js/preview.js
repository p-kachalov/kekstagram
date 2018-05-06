'use strict';

(function () {

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

  var showBigPictureElement = function (photo) {
    var pictureImage = bigPictureElement.querySelector('.big-picture__img img');
    var pictureLikes = bigPictureElement.querySelector('.likes-count');
    var pictureComentsCount = bigPictureElement.querySelector('.comments-count');
    var pictureComentsList = bigPictureElement.querySelector('.social__comments');
    var socialCommentLoad = bigPictureElement.querySelector('.social__comment-loadmore');
    var headerCaption = bigPictureElement.querySelector('.social__caption');

    pictureImage.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComentsCount.textContent = photo.comments.length;
    headerCaption.textContent = photo.comments[0];

    while (pictureComentsList.firstChild) {
      pictureComentsList.removeChild(pictureComentsList.firstChild);
    }
    for (var i = 0; i < photo.comments.length; i++) {
      var commentText = photo.comments[i];
      var avatarUrl = 'img/avatar-' + (1 + window.util.getRandomInt(5)) + '.svg';
      pictureComentsList.appendChild(renderComent(commentText, avatarUrl));
    }

    socialCommentLoad.classList.add('visually-hidden');

    bigPictureElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
    document.addEventListener('keydown', onDocumentBigPictureEscKeydown);
  };

  var hideBigPictureElement = function () {
    bigPictureElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
    document.removeEventListener('keydown', onDocumentBigPictureEscKeydown);
  };

  var onBigPictureCancelClick = function () {
    hideBigPictureElement();
  };

  var onDocumentBigPictureEscKeydown = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC) {
      hideBigPictureElement();
    }
  };

  window.preview = {
    showBigPictureElement: showBigPictureElement
  };

})();
