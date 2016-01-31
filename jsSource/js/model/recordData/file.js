'use strict';

define(['exports', 'model/fileURL', 'model/fileSource', 'model/fileUploaded'], function (exports, _fileURL, _fileSource, _fileUploaded) {
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
      dataRef = {};
      var loadDeferred = new $.Deferred();
      if (_fileSource.fileSource.get() == 'web') {
        var url = _fileURL.fileURL.getURL();
        $.get(url).done(function (fileData) {
          var file = new File(fileData);
          dataRef = file.toJSON();
          loadDeferred.resolve(dataRef);
        });
        return loadDeferred;
      } else if (_fileSource.fileSource.get() == 'local') {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          // Great success! All the File APIs are supported.

          _fileUploaded.fileUploaded.load(_fileUploaded.fileUploaded.getUploaded()).done(function (result) {
            var file = new File(result);
            dataRef = file.toJSON();
            loadDeferred.resolve(dataRef);
          });
          return loadDeferred;
        } else {
          alert('The File APIs are not fully supported in this browser.');
        }
      }
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
          result[key] = _this._data[key];
        });
        return result;
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
      topics: {}
    };
    var lines = fileData.split("\n");
    var meta = '';
    var parents = [];

    function setParent(topic, level) {
      if (file.topics[topic]) {
        file.topics[topic].parent = parents[level];
      } else {
        file.topics[topic] = {
          name: topic,
          count: 0,
          parent: parents[level]
        };
      }

      parents[level + 1] = topic;
    }

    ;
    $.each(lines, function (index, line) {
      if (line) {
        if (file.title.length == 0 && line[0] != '#') {
          file.title = line;
        } else if (line.startsWith('# ')) {
          file.authors.push({
            name: line.substring(2)
          });
        } else if (line.startsWith('## profiles')) {
          meta = 'profiles';
          file.authors[file.authors.length - 1][meta] = [];
        } else if (line.startsWith('## relations')) {
          meta = 'relations';
          file.authors[file.authors.length - 1][meta] = [];
        } else if (line.startsWith('## backgrounds')) {
          meta = 'professions';
          file.authors[file.authors.length - 1][meta] = [];
        } else if (line.startsWith('## articles')) {
          meta = 'posts';
          file.authors[file.authors.length - 1][meta] = [];
        } else if (line.startsWith('### ')) {
          var post = {
            timestamp: line.substring(4, line.indexOf('http')).trim(),
            url: line.substring(line.indexOf('http')).trim()
          };
          file.authors[file.authors.length - 1]['posts'].push(post);
        } else if (line.startsWith('___')) {
          meta = 'structure';
        } else if (line.startsWith('- ')) {
          if (meta == 'posts') {
            if (!line.includes('#')) {
              return;
            }

            var topics = [];

            if (line.indexOf('#') > 0) {
              topics = line.substring(line.indexOf('#') + 1).split('#').map(function (topic) {
                return topic.trim();
              });
            }

            var relations = file.authors[file.authors.length - 1]['relations'] || '';
            var professions = file.authors[file.authors.length - 1]['professions'] || '';
            var point = {
              author: file.authors[file.authors.length - 1].name,
              timestamp: file.authors[file.authors.length - 1]['posts'][file.authors[file.authors.length - 1]['posts'].length - 1].timestamp,
              url: file.authors[file.authors.length - 1]['posts'][file.authors[file.authors.length - 1]['posts'].length - 1].url,
              relations: relations,
              professions: professions,
              topics: topics,
              content: line.substring(2, line.indexOf('#'))
            };
            file.points.push(point);
            topics.forEach(function (topic) {
              if (file.topics[topic]) {
                file.topics[topic].count += 1;
              } else {
                file.topics[topic] = {
                  name: topic,
                  count: 1
                };
              }
            });
            file.relations = file.relations.concat(relations).filter(function (item, pos, self) {
              return self.indexOf(item) == pos;
            });
            ;
            file.professions = file.professions.concat(professions).filter(function (item, pos, self) {
              return self.indexOf(item) == pos;
            });
            ;
          } else if (meta == 'structure') {
            var current = line.replace('- ', '').trim();

            if (file.topics[current]) {
              file.topics[current].parent = '';
            } else {
              file.topics[current] = {
                name: current,
                count: 0,
                parent: ''
              };
            }

            parents[0] = current;
            return;
          } else {
            file.authors[file.authors.length - 1][meta].push(line.substring(2));
          }
        } else if (line.startsWith('  - ')) {
          if (meta == 'structure') {
            var current = line.replace('  - ', '').trim();
            setParent(current, 0);
          }
        } else if (line.startsWith('    - ')) {
          if (meta == 'structure') {
            var current = line.replace('    - ', '').trim();
            setParent(current, 1);
          }
        } else if (line.startsWith('      - ')) {
          if (meta == 'structure') {
            var current = line.replace('      - ', '').trim();
            setParent(current, 2);
          }
        } else if (line.startsWith('        - ')) {
          if (meta == 'structure') {
            var current = line.replace('        - ', '').trim();
            setParent(current, 3);
          }
        } else {}
      }
    });
    return file;
  }
});