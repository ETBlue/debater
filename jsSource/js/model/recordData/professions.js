'use strict';

define(['exports', 'model/recordData/file'], function (exports, _file) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.professions = undefined;

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
  var professions = exports.professions = {
    get: function get() {
      return dataRef;
    },
    load: function load() {
      dataRef = [];
      $('#professions').html('<li class="active"><a data-profession="">All Backgrounds</a></li>');
      var loadDeferred = new $.Deferred();
      var waiting = [];
      waiting.push(_file.file.load());
      $.when.apply($.when, waiting).done(function () {
        var professions = _file.file.get('professions') || [];
        function remove(arr, what) {
          var found = arr.indexOf(what);

          while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
          }
        }
        remove(professions, "");
        dataRef = professions.map(function (professionData) {
          var profession = new Profession(professionData);
          return profession.toHTML();
        });
        loadDeferred.resolve(dataRef);
        if (dataRef.length == 0) {
          $('#professions').html('');
        }
      });
      return loadDeferred;
    }
  };

  var Profession = (function () {
    function Profession(data) {
      _classCallCheck(this, Profession);

      this._data = data;
      return this;
    }

    _createClass(Profession, [{
      key: 'toHTML',
      value: function toHTML() {
        return '\n      <li>\n        <a data-profession=\'' + this._data + '\'>' + this._data + '\n        </a>\n      </li>';
      }
    }]);

    return Profession;
  })();
});