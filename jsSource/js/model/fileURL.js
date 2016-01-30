'use strict';

define(['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var storage = localStorage.getItem('debaterData');
  var url = undefined;

  if (storage) {
    if (storage.indexOf('current') > -1) {
      url = JSON.parse(storage);
    } else {
      url = {
        current: storage,
        recent: {}
      };
    }
  }

  var fileURL = exports.fileURL = {
    getURL: function getURL() {
      if (url) {
        return url.current;
      } else {
        return null;
      }
    },
    setURL: function setURL(fileURL) {
      if (!url) {
        url = { current: '', recent: {} };
      } else if (!url.current) {
        url = { current: '', recent: {} };
      }
      url.current = fileURL;
      localStorage.setItem('debaterData', JSON.stringify(url));
      history.pushState({}, '', '?source=' + fileURL);
    },
    getHistory: function getHistory() {
      return url.recent;
    },
    setHistory: function setHistory(fileURL, docTitle) {
      if (!url) {
        url = { current: '', recent: {} };
      } else if (!url.recent) {
        url = { current: '', recent: {} };
      }
      url.recent[fileURL] = docTitle;
      localStorage.setItem('debaterData', JSON.stringify(url));
    },
    clearHistory: function clearHistory() {
      localStorage.removeItem('debaterData');
    }
  };
  exports.default = fileURL;
});