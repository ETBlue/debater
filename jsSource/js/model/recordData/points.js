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
        dataRef = _file.file.get('points').map(function (pointData) {
          var point = new Point(pointData);
          return point.toHTML();
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
      key: 'toHTML',
      value: function toHTML() {
        var topics = this._data.topics.map(function (topic) {
          return '<span class="label label-light">#' + topic + '</span>';
        });

        var relations = this._data.relations.map(function (relation) {
          return '<span class="label label-light">@' + relation + '</span>';
        });

        var professions = this._data.professions.map(function (profession) {
          return '<span class="label label-light">@' + profession + '</span>';
        });

        return '\n      <blockquote cite="' + this._data.url + '">\n        <p>' + this._data.content + '</p>\n        <div class="align-right small">\n          <a href="' + this._data.url + '">' + this._data.timestamp + '</a> by <a href="">' + this._data.author + '</a>\n        </div>\n        <div class="align-right clear">\n        </div>\n      </blockquote>\n    ';
      }
    }]);

    return Point;
  })();
});