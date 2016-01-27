'use strict';

define(['exports', 'model/recordData/file'], function (exports, _file) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.authors = undefined;

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
  var authors = exports.authors = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      var loadDeferred = new $.Deferred();
      var waiting = [];
      waiting.push(_file.file.load());
      $.when.apply($.when, waiting).done(function () {
        dataRef = _file.file.authors.map(function (authorData) {
          var author = new Author(authorData);
          return author.toJSON();
        });
        loadDeferred.resolve(dataRef);
      });
      return loadDeferred;
    }
  };

  var Author = (function () {
    function Author(data) {
      _classCallCheck(this, Author);

      this._data = data;
      return this;
    }

    _createClass(Author, [{
      key: 'toJSON',
      value: function toJSON() {
        var _this = this;

        var result = {};
        Object.keys(this._data).forEach(function (key) {
          result[key] = _this[key] || "";
        });
        return result;
      }
    }, {
      key: 'name',
      get: function get() {
        return 'author name string';
      }
    }, {
      key: 'profiles',
      get: function get() {
        return 'author profiles array';
      }
    }, {
      key: 'professions',
      get: function get() {
        return 'author professions array';
      }
    }, {
      key: 'relations',
      get: function get() {
        return 'author relations array';
      }
    }, {
      key: 'posts',
      get: function get() {
        return 'author posts array';
      }
    }]);

    return Author;
  })();
});