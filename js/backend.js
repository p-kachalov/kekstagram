'use strict';

(function () {
  var GET_ADDRESS = 'https://js.dump.academy/kekstagram/data';
  var POST_ADDRESS = 'https://js.dump.academy/kekstagram';

  var loadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.responseType = 'json';
    xhr.open('GET', GET_ADDRESS);
    xhr.send();
  };

  var postData = function (formData, onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', POST_ADDRESS);
    xhr.send(formData);

  };

  window.backend = {
    loadData: loadData,
    postData: postData
  };
})();
