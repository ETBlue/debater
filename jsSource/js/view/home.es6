import {recordData} from 'model/recordData/recordData';
import {fileURL} from 'model/fileURL';

export const app = {
  initialize() {
    // show saved fileURL
    const savedURL = fileURL.getURL();
    if (savedURL) {
      $('#api_key').val(savedURL);
    }
    this.bindEvents();
  },
  bindEvents() {
    $('#api_key').keypress(function(e) {
      if (e.keyCode == 13) {
        const newURL = $(this).val();
        fileURL.setURL(newURL);
        app.showLoading();
        recordData.loadRecord();
      }
    });

    recordData.on('loaded:reocrd', (reocrd) => {
      $('.reocrdname').text(reocrd.name);
      $('.reocrdid').text(reocrd.id);
      $('.reocrdcreated').text(reocrd.created);
      $('.worldname').html(reocrd.world);
      $('.fractal_level').html(reocrd.fractal_level);
      $('.access').html(reocrd.access);

      $('#reocrd-status')
        .html('Record loaded <span class="glyphicon glyphicon-ok text-success"></span>');
    });
  },
  showLoading() {
    $('#reocrd-status').parent().empty().html(`
      <p id="reocrd-status" class="status" style="display: block;">
        Loading reocrd...
      </p>
    `);
  }
};

$(() => {
  app.initialize();
});