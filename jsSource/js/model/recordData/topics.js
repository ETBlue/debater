'use strict';

define(['exports', 'model/recordData/file'], function (exports, _file) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.topics = undefined;

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

  var dataRef = [];
  var topics = exports.topics = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      $('#topics').html('<li data-topic="" class="active"><a>所有主題 <span class="badge badge-light"></span></a></li>');
      var loadDeferred = new $.Deferred();
      var waiting = [];
      waiting.push(_file.file.load());
      $.when.apply($.when, waiting).done(function () {
        var topics = _file.file.get('topics');
        Object.keys(topics).forEach(function (topicData) {
          var topic = new Topic(topics[topicData], topicData);
          dataRef.push(topic.toHTML());
        });
        loadDeferred.resolve(dataRef);
      });
      return loadDeferred;
    }
  };

  var Topic = (function () {
    function Topic(count, data) {
      _classCallCheck(this, Topic);

      this._data = data;
      this._count = count;
      return this;
    }

    _createClass(Topic, [{
      key: 'toHTML',
      value: function toHTML() {
        return '\n      <li class=\'topic\' data-topic=\'' + this._data + '\'>\n        <a>' + this._data + ' \n          <span class=\'badge badge-light\'>' + this._count + '</span>\n        </a>\n      </li>';
      }
    }]);

    return Topic;
  })();
});