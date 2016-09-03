import {recordData} from 'model/recordData/recordData';
import {fileURL} from 'model/fileURL';
import {fileSource} from 'model/fileSource';
import {fileUploaded} from 'model/fileUploaded';

export const app = {
  initialize() {
    // show saved fileURL
    const savedURL = fileURL.getURL();
    if (savedURL) {
      $('.fileURL #current').val(savedURL);
      this.drawHistory();
    }
    this.bindEvents();
  },
  drawHistory() {
    $('.fileURL #recent').html(function() {
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
            <li>
              <a href='https://hackmd.io/new' target='_blank'>New Topic</a>
            </li>
            <li>
              <a data-url='https://hackmd.io/CYZmCYDYFMAYA4C0BWAnARnYgLAI1gMaKoyQ6wbjbK7gTJA=/download'>Sample</a>
            </li>
        `;
        return html;
      }
    });
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

    let matchQuery;
    if (matchQuery = location.href.match(/(s|source)=(http.*)/)) {
        fileSource.set('web');
        newURL = decodeURIComponent(matchQuery[2]);
        fileURL.setURL(newURL);
        $('#source').attr('data-src',newURL);
        loadPage();
    }

    // source: web
    $('.fileURL #current').keypress(function(e) {
      if (e.keyCode == 13) {
        fileSource.set('web');
        newURL = $(this).val();
        fileURL.setURL(newURL);
        $('#source').attr('data-src',newURL);
        loadPage();
      }
    });
    // retrive history
    $('.fileURL #recent').on('click tap', '[data-url]', function(e) {
      fileSource.set('web');
      newURL = $(this).attr('data-url');
      $('.fileURL #current').val(newURL);
      fileURL.setURL(newURL);
      $('#source').attr('data-src',newURL);
      loadPage();
    });

    // new doc
    $('.fileURL #recent').on('click tap', '[data-action="new"]', function(e) {
      $('#source').attr('src','https://hackmd.io/new');
      $('#source')[0].onload = function() {
        newURL = this.contentWindow.location.href;
        console.log(newURL);
        $('.fileURL #current').val(newURL);
        fileURL.setURL(newURL);
        $('#source').attr('data-src', newURL).attr('src', newURL);
        loadPage();
      }
    });

    // refresh page
    $('#refresh').on('click tap', function(e) {
      loadPage();
    });

    // clear history
    $('.fileURL #recent').on('click tap', '[data-action="clear"]', function(e) {
      $('.fileURL #current').val('');
      fileURL.clearHistory();
      $('.fileURL #recent').html('<li><a>Hmmm. No history yet.</a></li>');
    });

    // source: local
    $('#fileChooser input').change((e) => {
      fileSource.set('local');
      let file = e.target.files[0];
      fileUploaded.set(file);
      loadPage();
    });
    
    // data processing
    recordData.on('loaded:file', (file) => {
      $('#title').html(file.title);
      $('title').html(file.title + ' | Debater: online opinions organizer (BETA)');
      if (fileSource.get() == 'web') {
        fileURL.setHistory(newURL, file.title);
        this.drawHistory();
      }
      if (file.description.length == 0) {
        $('#summary').hide();
      } else {
        $('#summary').show();
        $('#summary .title').html(`Editor's Note`);
        const entityMap = {
          "&amp;" : "&",
          "&lt;" : "<",
          "&gt;" : ">",
          '&quot;' : '"',
          '&#39;' : "'",
          '&#x2F;' : "/"
        };
        const description = String(file.description).replace(/(&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;)/g, function (s) {
          return entityMap[s];
        });
        $('#summary .content').html(description);
      }
    });
    recordData.on('loaded:topics', (topics) => {
      // render topics
      topics.forEach((topic) => {
        $('#topics').append(topic);
      });
      // sort topic with count by default
      $('#topics .topic').sort(function(a,b) {
        return parseInt($(a).data('count')) < parseInt($(b).data('count')) ? 1 : -1;
      }).appendTo('#topics');
      // sort topics if order are specified
      if ($('#topics .topic[data-order="1"]').length > 0) {
        $('#topics .topic').sort(function(a,b) {
          return parseInt($(a).data('order')) < parseInt($(b).data('order')) ? -1 : 1;
        }).appendTo('#topics');
      }
      // arrange nested topics
      $('#topics .topic').each((index, element) => {
        const parent = $(element).data('parent');
        const selector = '#topics .topic[data-topic="' + parent + '"]';
        if ( $(selector + '>ul').length == 0 ) {
          $(selector).append('<ul class="nav-pills-nested"></ul>');
        }
        $(selector + '>ul').append(element);
      });
    });
    recordData.on('loaded:relations', (relations) => {
      if (relations.length > 0) {
        $('#relations-container').show();
        relations.forEach((relation) => {
          $('#relations').append(relation);
        });
      } else {
        $('#relations-container').hide();
      }
    });
    recordData.on('loaded:professions', (professions) => {
      if (professions.length > 0) {
        $('#professions-container').show();
        professions.forEach((profession) => {
          $('#professions').append(profession);
        });
      } else {
        $('#professions-container').hide();
      }
    });
    recordData.on('loaded:points', (points) => {
      points.forEach((point) => {
        $('#points').append(point);
      });
      //$('#points .point').sort(function(a,b) {
      //  return $(a).data('timestamp') > $(b).data('timestamp') ? 1 : -1;
      //}).appendTo('#points');
      $('#topics [data-topic=""] .badge').html($('#points .point').length);
    });
  }
};

$(() => {
  app.initialize();
});