'use strict';

(function () {
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


  var getRandomComments = function () {
    return window.util.getRandomInt(2) ?
      [COMMENTS_CATALOG[window.util.getRandomInt(COMMENTS_CATALOG.length)]] :
      [
        COMMENTS_CATALOG[window.util.getRandomInt(COMMENTS_CATALOG.length)],
        COMMENTS_CATALOG[window.util.getRandomInt(COMMENTS_CATALOG.length)]
      ];
  };

  var makeRandomPhotosSet = function (num) {
    var photosList = [];
    for (var i = 1; i <= num; i++) {
      var photo = {
        url: PHOTOS_PATH + i + PHOTOS_EXT,
        likes: LIKES_MIN + window.util.getRandomInt(LIKES_MAX - LIKES_MIN + 1),
        comments: getRandomComments(),
        description: DESCRIPTION_CATALOG[window.util.getRandomInt(DESCRIPTION_CATALOG.length)]
      };
      photosList.push(photo);
    }
    return photosList;
  };


  window.dataMock = {
    makeRandomPhotosSet: makeRandomPhotosSet
  };

})();
