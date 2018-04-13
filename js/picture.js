'use strict';

(function () {

  var PHOTOS_NUMBER = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var PHOTOS_PATH = 'photos/';
  var PHOTOS_EXT = '.jpg';

  var COMMENTS_CATALOG = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var DESCRIPTION_CATALOG = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  var getRandomComments = function () {
    return getRandomInt(2) ?
      [COMMENTS_CATALOG[getRandomInt(COMMENTS_CATALOG.length)]] :
      [
        COMMENTS_CATALOG[getRandomInt(COMMENTS_CATALOG.length)],
        COMMENTS_CATALOG[getRandomInt(COMMENTS_CATALOG.length)]
      ];
  };

  var makeRandomPhotosSet = function (num) {
    var photosList = [];
    for (var i = 1; i <= num; i++) {
      var photo = {
        url: PHOTOS_PATH + i + PHOTOS_EXT,
        likes: LIKES_MIN + getRandomInt(LIKES_MAX - LIKES_MIN + 1),
        comments: getRandomComments(),
        description: DESCRIPTION_CATALOG[getRandomInt(DESCRIPTION_CATALOG.length)]
      };
      photosList.push(photo);
    }
    return photosList;
  };

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

  var renderPictureElement = function (photo, template) {
    var pictureElement = template.cloneNode(true);
    var pictureImage = pictureElement.querySelector('.picture__img');
    var pictureLikes = pictureElement.querySelector('.picture__stat--likes');
    var pictureComents = pictureElement.querySelector('.picture__stat--comments');
    pictureImage.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComents.textContent = photo.comments.length;
    return pictureElement;
  };

  var renderPicturesSet = function (data) {
    var fragment = document.createDocumentFragment();
    var photoTemplate = document.querySelector('#picture')
        .content.querySelector('.picture__link');
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPictureElement(data[i], photoTemplate));
    }
    return fragment;
  };

  var renderComent = function (commentText, avatarUrl) {
    var commentElement = makeCommentTemplate();
    var avatarElement = commentElement.querySelector('.social__picture');

    avatarElement.src = avatarUrl;
    commentElement.appendChild(document.createTextNode(commentText));

    return commentElement;
  };

  var showBigPictureElemnt = function (photo) {
    var bigPictureElement = document.querySelector('.big-picture');
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
      var avatarUrl = 'img/avatar-' + (1 + getRandomInt(5)) + '.svg';
      pictureComentsList.appendChild(renderComent(commentText, avatarUrl));
    }

    socialCommentCount.classList.add('visually-hidden');
    socialCommentLoad.classList.add('visually-hidden');

    bigPictureElement.classList.remove('hidden');

  };

  var randomPhotosSet = makeRandomPhotosSet(PHOTOS_NUMBER);
  var photosSetFragment = renderPicturesSet(randomPhotosSet);
  var picturesElement = document.querySelector('.pictures');
  picturesElement.appendChild(photosSetFragment);

  showBigPictureElemnt(randomPhotosSet[0]);
})();
