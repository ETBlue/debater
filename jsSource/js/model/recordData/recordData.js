'use strict';

define(['exports', 'utils/events', 'model/recordData/file', 'model/recordData/authors', 'model/recordData/professions', 'model/recordData/relations', 'model/recordData/topics', 'model/recordData/points'], function (exports, _events, _file, _authors, _professions, _relations, _topics, _points) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.recordData = undefined;
  var recordData = exports.recordData = {
    loadFile: function loadFile() {
      var _this = this;

      this.trigger('load:file');
      return _file.file.load().done(function (fileData) {
        _this.trigger('loaded:file', fileData);
      });
    },
    loadAuthors: function loadAuthors() {
      var _this2 = this;

      this.trigger('load:authors');
      return _authors.authors.load().done(function (authorsData) {
        _this2.trigger('loaded:authors', authorsData);
      });
    },
    loadProfessions: function loadProfessions() {
      var _this3 = this;

      this.trigger('load:professions');
      return _professions.professions.load().done(function (professionsData) {
        _this3.trigger('loaded:professions', professionsData);
      });
    },
    loadRelations: function loadRelations() {
      var _this4 = this;

      this.trigger('load:relations');
      return _relations.relations.load().done(function (relationsData) {
        _this4.trigger('loaded:relations', relationsData);
      });
    },
    loadTopics: function loadTopics() {
      var _this5 = this;

      this.trigger('load:topics');
      return _topics.topics.load().done(function (topicsData) {
        _this5.trigger('loaded:topics', topicsData);
      });
    },
    loadPoints: function loadPoints() {
      var _this6 = this;

      this.trigger('load:points');
      return _points.points.load().done(function (pointsData) {
        _this6.trigger('loaded:points', pointsData);
      });
    }
  };
  exports.default = recordData;
  (0, _events.eventful)(recordData);
});