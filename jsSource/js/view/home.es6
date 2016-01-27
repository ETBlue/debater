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
      }
    });
    recordData.on('loaded:file', (file) => {
      $('#title').html(file.title);
      $('#file-status')
        .html('File loaded <span class="glyphicon glyphicon-ok text-success"></span>');
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