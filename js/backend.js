'use strict';

(function () {
  var GET_ADDRESS = 'https://js.dump.academy/kekstagram/data';
  var POST_ADDRESS = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;
  var RESPONSE_TYPE = 'json';

  var makeRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;

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

    return xhr;
  };

  var loadData = function (onLoad, onError) {
    var request = makeRequest(onLoad, onError);
    request.responseType = RESPONSE_TYPE;
    request.open('GET', GET_ADDRESS);
    request.send();
  };

  var postData = function (formData, onLoad, onError) {
    var request = makeRequest(onLoad, onError);
    request.open('POST', POST_ADDRESS);
    request.send(formData);
  };

  window.backend = {
    loadData: loadData,
    postData: postData
  };
})();
