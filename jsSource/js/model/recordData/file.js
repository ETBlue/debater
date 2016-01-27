'use strict';

define(['exports', 'model/fileURL'], function (exports, _fileURL) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.file = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var dataRef = undefined;
  var file = exports.file = {
    get: function get(key) {
      return dataRef[key];
    },
    load: function load() {
      var loadDeferred = new $.Deferred();
      $.get('http://etblue.github.io/debater/file/sample.md').done(function (fileData) {
        var file = new File(fileData);
        dataRef = file.toJSON();
        loadDeferred.resolve(dataRef);
      });
      return loadDeferred;
    }
  };

  var File = (function () {
    function File(fileData) {
      _classCallCheck(this, File);

      this._data = getFileJSON(fileData);
      return this;
    }

    _createClass(File, [{
      key: 'toJSON',
      value: function toJSON() {
        var _this = this;

        var result = {};
        Object.keys(this._data).forEach(function (key) {
          result[key] = _this[key];
        });
        return result;
      }
    }, {
      key: 'title',
      get: function get() {
        return this._data.title || "";
      }
    }]);

    return File;
  })();

  function getFileJSON(fileData) {
    var file = {
      title: "",
      authors: [],
      points: [],
      professions: [],
      relations: [],
      topics: []
    };
    console.log(fileData);
    return file;
  }
});