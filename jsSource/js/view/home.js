'use strict';

define(['exports', 'model/recordData/recordData', 'model/fileURL'], function (exports, _recordData, _fileURL) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.app = undefined;
  var app = exports.app = {
    initialize: function initialize() {
      // show saved fileURL
      var savedURL = _fileURL.fileURL.getURL();
      if (savedURL) {
        $('#fileURL').val(savedURL);
      }
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      $('#fileURL').keypress(function (e) {
        if (e.keyCode == 13) {
          var newURL = $(this).val();
          _fileURL.fileURL.setURL(newURL);
          app.showLoading();
          _recordData.recordData.loadFile();
          _recordData.recordData.loadTopics();
          _recordData.recordData.loadRelations();
          _recordData.recordData.loadProfessions();
          _recordData.recordData.loadPoints();
        }
      });
      _recordData.recordData.on('loaded:file', function (file) {
        $('#title').html(file.title);
      });
      _recordData.recordData.on('loaded:topics', function (topics) {
        topics.forEach(function (topic) {
          $('#topics').append(topic);
        });
      });
      _recordData.recordData.on('loaded:relations', function (relations) {
        relations.forEach(function (relation) {
          $('#relations').append(relation);
        });
      });
      _recordData.recordData.on('loaded:professions', function (professions) {
        professions.forEach(function (profession) {
          $('#professions').append(profession);
        });
      });
      _recordData.recordData.on('loaded:points', function (points) {
        points.forEach(function (point) {
          $('#points').append(point);
        });
      });
    },
    showLoading: function showLoading() {
      $('#file-status').parent().empty().html('\n      <p id="file-status" class="status" style="display: block;">\n        Loading file...\n      </p>\n    ');
    }
  };
  $(function () {
    app.initialize();
  });
});