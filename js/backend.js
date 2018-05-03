'use strict';

(function () {
  var GET_ADDRESS = 'https://js.dump.academy/kekstagram/data';
  var POST_ADDRESS = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;
  var RESPONSE_TYPE = 'json';

  var runRequest = function (method, address, postData, onLoad, onError) {
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

    xhr.timeout = TIMEOUT;
    xhr.responseType = RESPONSE_TYPE;
    xhr.open(method, address);
    xhr.send(postData);
  };

  var loadData = function (onLoad, onError) {
    runRequest('GET', GET_ADDRESS, null, onLoad, onError);
  };

  var postData = function (formData, onLoad, onError) {
    runRequest('POST', POST_ADDRESS, formData, onLoad, onError);
  };

  window.backend = {
    loadData: loadData,
    postData: postData
  };
})();
