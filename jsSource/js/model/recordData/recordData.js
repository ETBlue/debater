'use strict';

define(['exports', 'utils/events', 'model/recordData/file', 'model/recordData/authors', 'model/recordData/points', 'model/recordData/professions', 'model/recordData/relations', 'model/recordData/topics'], function (exports, _events, _file, _authors, _points, _professions, _relations, _topics) {
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
    loadAuthor: function loadAuthor() {
      var _this2 = this;

      this.trigger('load:authors');
      return _authors.authors.load().done(function (authorsData) {
        _this2.trigger('loaded:authors', authorsData);
      });
    },
    loadPost: function loadPost() {
      var _this3 = this;

      this.trigger('load:points');
      return _points.points.load().done(function (pointsData) {
        _this3.trigger('loaded:points', pointsData);
      });
    },
    loadProfession: function loadProfession() {
      var _this4 = this;

      this.trigger('load:professions');
      return _professions.professions.load().done(function (professionsData) {
        _this4.trigger('loaded:professions', professionsData);
      });
    },
    loadRelation: function loadRelation() {
      var _this5 = this;

      this.trigger('load:relations');
      return _relations.relations.load().done(function (relationsData) {
        _this5.trigger('loaded:relations', relationsData);
      });
    },
    loadTopic: function loadTopic() {
      var _this6 = this;

      this.trigger('load:topics');
      return _topics.topics.load().done(function (topicsData) {
        _this6.trigger('loaded:topics', topicsData);
      });
    }
  };
  exports.default = recordData;
  (0, _events.eventful)(recordData);
});