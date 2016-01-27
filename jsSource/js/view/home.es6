import {recordData} from 'model/recordData/recordData';
import {fileURL} from 'model/fileURL';

export const app = {
  initialize() {
    // show saved fileURL
    const savedURL = fileURL.getURL();
    if (savedURL) {
      $('#fileURL').val(savedURL);
    }
    this.bindEvents();
  },
  bindEvents() {
    $('#fileURL').keypress(function(e) {
      if (e.keyCode == 13) {
        const newURL = $(this).val();
        fileURL.setURL(newURL);
        app.showLoading();
        recordData.loadFile();
        recordData.loadTopics();
        recordData.loadRelations();
        recordData.loadProfessions();
        recordData.loadPoints();
      }
    });
    recordData.on('loaded:file', (file) => {
      $('#title').html(file.title);
    });
    recordData.on('loaded:topics', (topics) => {
      topics.forEach((topic) => {
        $('#topics').append(topic);
      });
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
    });
  },
  showLoading() {
    $('#file-status').parent().empty().html(`
      <p id="file-status" class="status" style="display: block;">
        Loading file...
      </p>
    `);
  }
};

$(() => {
  app.initialize();
});