'use strict';

define(['exports', 'model/recordData/file'], function (exports, _file) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.relations = undefined;

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
  var relations = exports.relations = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      dataRef = [];
      $('#relations').html('<li class="active"><a data-relation="">所有關係人</a></li>');
      var loadDeferred = new $.Deferred();
      var waiting = [];
      waiting.push(_file.file.load());
      $.when.apply($.when, waiting).done(function () {
        var relations = _file.file.get('relations') || [];
        dataRef = relations.map(function (relationData) {
          var relation = new Relation(relationData);
          return relation.toHTML();
        });
        loadDeferred.resolve(dataRef);
      });
      if (dataRef.length == 0) {
        $('#relations').html('');
      }
      return loadDeferred;
    }
  };

  var Relation = (function () {
    function Relation(data) {
      _classCallCheck(this, Relation);

      this._data = data;
      return this;
    }

    _createClass(Relation, [{
      key: 'toHTML',
      value: function toHTML() {
        return '\n      <li>\n        <a data-relation=\'' + this._data + '\'>' + this._data + '\n        </a>\n      </li>';
      }
    }]);

    return Relation;
  })();
});