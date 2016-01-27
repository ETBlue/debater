'use strict';

define(['exports', 'model/recordData/file'], function (exports, _file) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.points = undefined;

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
  var points = exports.points = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      var loadDeferred = new $.Deferred();
      var waiting = [];
      waiting.push(_file.file.load());
      $.when.apply($.when, waiting).done(function () {
        dataRef = _file.file.points.map(function (pointData) {
          var point = new Point(pointData);
          return point.toJSON();
        });
        loadDeferred.resolve(dataRef);
      });
      return loadDeferred;
    }
  };

  var Point = (function () {
    function Point(data) {
      _classCallCheck(this, Point);

      this._data = data;
      return this;
    }

    _createClass(Point, [{
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
      key: 'author',
      get: function get() {
        return 'point author string';
      }
    }, {
      key: 'cite',
      get: function get() {
        return 'point cite string';
      }
    }, {
      key: 'timestamp',
      get: function get() {
        return 'point timestamp string';
      }
    }, {
      key: 'topics',
      get: function get() {
        return 'point topics array';
      }
    }]);

    return Point;
  })();
});