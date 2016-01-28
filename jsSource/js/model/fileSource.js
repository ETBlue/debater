'use strict';

define(['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var source = '';
  var fileSource = exports.fileSource = {
    get: function get() {
      return source;
    },
    set: function set(fileSource) {
      source = fileSource;
    }
  };
  exports.default = fileSource;
});