'use strict';

(function () {

  var PHOTOS_NUMBER = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var PHOTOS_PATH = 'photos/';
  var PHOTOS_EXT = '.jpg';
  var ESC_KEYCODE = 27;
  var RESIZE_STEP = 25;
  var RESIZE_VALUE_DEFAULT = 100;
  var RESIZE_VALUE_MIN = 25;
  var RESIZE_VALUE_MAX = 100;

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
    pictureElement.dataset.id = photo.id;
    pictureImage.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComents.textContent = photo.comments.length;
    pictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      showBigPictureElemnt(photo);
    });
    return pictureElement;
  };

  var renderPicturesSet = function (data) {
    var fragment = document.createDocumentFragment();
    var photoTemplate = document.querySelector('#picture')
        .content.querySelector('.picture__link');

    for (var i = 0; i < data.length; i++) {
      var pictureElement = renderPictureElement(data[i], photoTemplate);
      fragment.appendChild(pictureElement);
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
    document.addEventListener('keydown', onDocumentBigPictureEscKeydown);
  };

  var hideBigPictureElemnt = function () {
    bigPictureElement.classList.add('hidden');
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

  var randomPhotosSet = makeRandomPhotosSet(PHOTOS_NUMBER);
  var photosSetFragment = renderPicturesSet(randomPhotosSet);
  var picturesElement = document.querySelector('.pictures');
  picturesElement.appendChild(photosSetFragment);

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancel = bigPictureElement.querySelector('.big-picture__cancel');
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);


  // Upload Actions
  var uploadFileElement = document.querySelector('#upload-file');
  var uploadCancedElement = document.querySelector('#upload-cancel');
  var imageUploadElement = document.querySelector('.img-upload__overlay');

  var resizeControlsPanel = document.querySelector('.img-upload__resize');
  var resizeControlMinus = document.querySelector('.resize__control--minus');
  var resizeControlPlus = document.querySelector('.resize__control--plus');
  var resizeControlValue = document.querySelector('.resize__control--value');
  var imagePreviewElement = document.querySelector('.img-upload__preview');

  var effectControls = document.querySelectorAll('.effects__radio');
  var scalePinControl = document.querySelector('.scale__pin');
  var scaleValueElement = document.querySelector('.scale__value');
  var imagePreviewImage = document.querySelector('.img-upload__preview img');

  var effectsMap = {
    none: {
      className: '',
      calcFilterValue: function () {
        return null;
      }
    },
    chrome: {
      className: 'effects__preview--chrome',
      calcFilterValue: function (value) {
        return 'grayscale(' + value / 100 + ')';
      }
    },
    sepia: {
      className: 'effects__preview--sepia',
      calcFilterValue: function (value) {
        return 'sepia(' + value / 100 + ')';
      }
    },
    marvin: {
      className: 'effects__preview--marvin',
      calcFilterValue: function (value) {
        return 'invert(' + value + '%)';
      }
    },
    phobos: {
      className: 'effects__preview--phobos',
      calcFilterValue: function (value) {
        return 'blur(' + value / 100 * 3 + 'px)';
      }
    },
    heat: {
      className: 'effects__preview--heat',
      calcFilterValue: function (value) {
        return 'brightness(' + (1 + value / 100 * 2) + ')';
      }
    }
  };

  var showImageUploadElement = function () {
    imageUploadElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentEscKeydown);

    resizeControlsPanel.style.zIndex = 1;
    resizeControlValue.value = RESIZE_VALUE_DEFAULT + '%';
    applyEffect();
  };

  var hideImageUploadElement = function () {
    imageUploadElement.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentEscKeydown);
    uploadFileElement.value = '';
  };

  var applyEffect = function () {
    var currentEffect = document.querySelector('.effects__radio:checked').value;
    scaleValueElement.value = calcEffectScale();
    scaleValueElement.value = 100;

    imagePreviewImage.className = effectsMap[currentEffect].className;
    imagePreviewImage.style.filter = effectsMap[currentEffect].calcFilterValue(scaleValueElement.value);
  };

  var decreaseResizeControlValue = function () {
    var resizeValueNum = parseFloat(resizeControlValue.value);
    resizeValueNum -= RESIZE_STEP;
    if (resizeValueNum >= RESIZE_VALUE_MIN) {
      resizeControlValue.value = resizeValueNum + '%';
      imagePreviewElement.style.transform = 'scale(' + resizeValueNum / 100 + ')';
    }
  };

  var increaseResizeControlValue = function () {
    var resizeValueNum = parseFloat(resizeControlValue.value);
    resizeValueNum += RESIZE_STEP;
    if (resizeValueNum <= RESIZE_VALUE_MAX) {
      resizeControlValue.value = resizeValueNum + '%';
      imagePreviewElement.style.transform = 'scale(' + resizeValueNum / 100 + ')';
    }
  };

  var calcEffectScale = function () {
    var scaleLineElement = document.querySelector('.scale__line');
    var scaleLevelElement = document.querySelector('.scale__level');
    var maxValue = scaleLineElement.offsetWidth;
    var currentValue = scaleLevelElement.offsetWidth;
    return Math.round(currentValue / maxValue * 100);
  };

  var onUploadFileChange = function () {
    showImageUploadElement();
  };

  var onUploadCancelClick = function () {
    hideImageUploadElement();
  };

  var onDocumentEscKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideImageUploadElement();
    }
  };

  var onResizeControlMinusClick = function () {
    decreaseResizeControlValue();
  };

  var onResizeControlPlusClick = function () {
    increaseResizeControlValue();
  };

  var onEffectControlChange = function () {
    applyEffect();
  };

  var onScalePinControlMouseup = function () {
    applyEffect();
  };

  uploadFileElement.addEventListener('change', onUploadFileChange);
  uploadCancedElement.addEventListener('click', onUploadCancelClick);

  resizeControlMinus.addEventListener('click', onResizeControlMinusClick);
  resizeControlPlus.addEventListener('click', onResizeControlPlusClick);

  scalePinControl.addEventListener('mouseup', onScalePinControlMouseup);

  for (var i = 0; i < effectControls.length; i++) {
    effectControls[i].addEventListener('change', onEffectControlChange);
  }

})();
