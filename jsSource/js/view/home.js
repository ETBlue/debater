'use strict';

define(['exports', 'model/recordData/recordData', 'model/fileURL', 'model/fileSource', 'model/fileUploaded'], function (exports, _recordData, _fileURL, _fileSource, _fileUploaded) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.app = undefined;
  var app = exports.app = {
    initialize: function initialize() {
      // show saved fileURL
      var savedURL = _fileURL.fileURL.getURL();
      if (savedURL) {
        $('#fileURL #current').val(savedURL);
        this.drawHistory();
      }
      this.bindEvents();
    },
    drawHistory: function drawHistory() {
      $('#fileURL #recent').html(function () {
        var savedURLHistory = _fileURL.fileURL.getHistory();
        if (savedURLHistory) {
          var html = '';
          Object.keys(savedURLHistory).forEach(function (key) {
            html += '\n            <li>\n              <a data-url=\'' + key + '\'>' + savedURLHistory[key] + '</a>\n            </li>\n          ';
          });
          html += '\n            <li role="separator" class="divider"></li>\n            <li>\n              <a data-action="clear">Clear Hostory</a>\n            </li>\n        ';
          return html;
        }
      });
    },
    bindEvents: function bindEvents() {
      var _this = this;

      var newURL = undefined;
      function loadPage() {
        _recordData.recordData.loadFile();
        _recordData.recordData.loadTopics();
        _recordData.recordData.loadRelations();
        _recordData.recordData.loadProfessions();
        _recordData.recordData.loadPoints();
      }

      // source: web
      $('#fileURL #current').keypress(function (e) {
        if (e.keyCode == 13) {
          _fileSource.fileSource.set('web');
          newURL = $(this).val();
          _fileURL.fileURL.setURL(newURL);
          loadPage();
        }
      });
      // retrive history
      $('#fileURL #recent').on('click tap', '[data-url]', function (e) {
        newURL = $(this).attr('data-url');
        $('#fileURL #current').val(newURL);
        _fileURL.fileURL.setURL(newURL);
        loadPage();
      });
      // clear history
      $('#fileURL #recent').on('click tap', '[data-action="clear"]', function (e) {
        $('#fileURL #current').val('');
        _fileURL.fileURL.clearHistory();
        $('#fileURL #recent').html('<li><a>Hmmm. No history yet.</a></li>');
      });

      // source: local
      $('#fileChooser input').change(function (e) {
        _fileSource.fileSource.set('local');
        var file = e.target.files[0];
        _fileUploaded.fileUploaded.set(file);
        loadPage();
      });

      _recordData.recordData.on('loaded:file', function (file) {
        $('#title').html(file.title);
        if (_fileSource.fileSource.get() == 'web') {
          _fileURL.fileURL.setHistory(newURL, file.title);
          _this.drawHistory();
        }
      });
      _recordData.recordData.on('loaded:topics', function (topics) {
        topics.forEach(function (topic) {
          $('#topics').append(topic);
        });
        $('#topics .topic').sort(function (a, b) {
          return $(a).data('topic') > $(b).data('topic');
        }).appendTo('#topics');
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
        $('#points .point').sort(function (a, b) {
          return $(a).data('timestamp') > $(b).data('timestamp');
        }).appendTo('#points');
        $('#topics [data-topic=""] .badge').html($('#points .point').length);
      });
    }
  };
  $(function () {
    app.initialize();
  });
});