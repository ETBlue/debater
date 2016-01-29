import {recordData} from 'model/recordData/recordData';
import {fileURL} from 'model/fileURL';
import {fileSource} from 'model/fileSource';
import {fileUploaded} from 'model/fileUploaded';

export const app = {
  initialize() {
    // show saved fileURL
    const savedURL = fileURL.getURL();
    if (savedURL) {
      $('#fileURL #current').val(savedURL);
      $('#fileURL #recent').html(function() {
        const savedURLHistory = fileURL.getHistory();
        if (savedURLHistory) {
          let html = '';
          Object.keys(savedURLHistory).forEach((key) => {
            html += `
              <li>
                <a data-url='${key}'>${savedURLHistory[key]}</a>
              </li>
            `;
          });
          html += `
              <li role="separator" class="divider"></li>
              <li>
                <a data-action="clear">Clear Hostory</a>
              </li>
          `;
          return html;
        }
      });
    }
    this.bindEvents();
  },
  bindEvents() {
    let newURL;
    function loadPage() {
      recordData.loadFile();
      recordData.loadTopics();
      recordData.loadRelations();
      recordData.loadProfessions();
      recordData.loadPoints();
    }
    function drawHistory() {
      $('#fileURL #recent').html(function() {
        const savedURLHistory = fileURL.getHistory();
        if (savedURLHistory) {
          let html = '';
          Object.keys(savedURLHistory).forEach((key) => {
            html += `
              <li>
                <a data-url='${key}'>${savedURLHistory[key]}</a>
              </li>
            `;
          });
          html += `
              <li role="separator" class="divider"></li>
              <li>
                <a data-action="clear">Clear Hostory</a>
              </li>
          `;
          return html;
        }
      });
    }

    // source: web
    $('#fileURL #current').keypress(function(e) {
      if (e.keyCode == 13) {
        fileSource.set('web');
        newURL = $(this).val();
        fileURL.setURL(newURL);
        loadPage();
      }
    });
    // retrive history
    $('#fileURL #recent').on('click tap', '[data-url]', function(e) {
      newURL = $(this).attr('data-url');
      $('#fileURL #current').val(newURL);
      fileURL.setKey(newURL);
      loadpage();
    });
    // clear history
    $('#fileURL #recent').on('click tap', '[data-action="clear"]', function(e) {
      $('#fileURL #current').val('');
      fileURL.clearHistory();
      $('#fileURL #recent').html('<li><a>Hmmm. No history yet.</a></li>');
    });

    // source: local
    $('#fileChooser input').change((e) => {
      fileSource.set('local');
      let file = e.target.files[0];
      fileUploaded.set(file);
      loadPage();
    });
    
    recordData.on('loaded:file', (file) => {
      $('#title').html(file.title);
      if (fileSource.get() == 'web') {
        fileURL.setHistory(newURL, file.title);
        drawHistory();
      }
    });
    recordData.on('loaded:topics', (topics) => {
      topics.forEach((topic) => {
        $('#topics').append(topic);
      });
      $('#topics .topic').sort(function(a,b) {
        return $(a).data('topic') > $(b).data('topic');
      }).appendTo('#topics');
    });
    recordData.on('loaded:relations', (relations) => {
      relations.forEach((relation) => {
        $('#relations').append(relation);
      });
    });
    recordData.on('loaded:professions', (professions) => {
      professions.forEach((profession) => {
        $('#professions').append(profession);
      });
    });
    recordData.on('loaded:points', (points) => {
      points.forEach((point) => {
        $('#points').append(point);
      });
      $('#points .point').sort(function(a,b) {
        return $(a).data('timestamp') > $(b).data('timestamp');
      }).appendTo('#points');
    });
  }
};

$(() => {
  app.initialize();
});