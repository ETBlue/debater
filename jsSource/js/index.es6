$(() => {

  // unused
  // 爭點太少的自動定位到右方畫面
  //const fixPoints = () => {
  //  const scrollHeight = $(window).scrollTop();
  //  const divHeight = $('#points').height();
  //
  //  if (scrollHeight > divHeight) {
  //    $('#points').css('position', 'fixed').css('top', '15px');
  //  } else {
  //    $('#points').css('position', 'initial').css('top', 'initial');
  //  }
  //};

  // hide local file option by default
  $('#fileChooser').toggle();

  // toggle about section
  $('[data-click="toggleAbout"]').on('click tap', function(){
    $('#about').slideToggle();
  });

  // toggle file section
  $('[data-source]').on('click tap', function (e) {
    $('#fileURL, #fileChooser').toggle();
    $('[data-source]').toggleClass('btn-active');
  });

  // initialize filter
  let filters = {};
  function filterPoints(filters) {
    if ($('#points .point').has(`[data-topic="${filters.topic}"]`).length > 0) {
      $('#points .point').css('display', 'block');
      Object.keys(filters).forEach((key) => {
        $('#points .point').not($('#points .point').has(`[data-${key}="${filters[key]}"]`)).css('display', 'none');
      });
    }
  }

  // when users click left sidebar
  $('#topics').on('click tap', '[data-topic]', function (e) {
    e.stopPropagation();

    // insert topic summary
    if ( $(this).attr('data-summary').length > 0 ) {
      $('#summary').show().html($(this).attr('data-summary'));
    } else {
      $('#summary').hide();
    }

    // re-filter points
    const topic = $(this).attr('data-topic');
    if (topic.length > 0) {
      filters.topic = topic;
    } else {
      delete filters.topic;
    }
    filterPoints(filters);

    // create highlight effect
    $('#topics [data-topic], #points [data-topic]').removeClass('active');
    $(this).addClass('active');
    $(`#points [data-topic="${filters.topic}"]`).addClass('active');

    // create accordion effect
    $('#topics .nav-pills-nested').not($(this)).not($(this).parents('.nav-pills-nested')).not($(this).find('.nav-pills-nested')).slideUp();
    $(this).parents('.nav-pills-nested').slideDown();
    $(this).find('.nav-pills-nested').slideDown();

    // switch icons for accordion effect
    $('#topics [data-expandable="true"]').not($(this)).not($(this).parents('[data-expandable="true"]')).find('.glyphicon').removeClass('glyphicon-folder-open').addClass('glyphicon-folder-close');
    $(this).parents('[data-expandable="true"]').find('.glyphicon').addClass('glyphicon-folder-open').removeClass('glyphicon-folder-close')

    // 
    $('body, html').stop(true, true).delay(100).animate({
      scrollTop: $('#relations').offset().top - 17
    }, 100);
    
    //if ($(this).text() === $('#topics li').first().text()) {
    //  $('#points .point').css('display', 'block');
    //} else {
    //  filterPoints(filters);
    //}
    //fixPoints();
  });

  // when user click folder icons
  $('#topics').on('click tap', '.glyphicon', function (e) {
    e.stopPropagation();
    // switch icon
    $(this).toggleClass('glyphicon-folder-open glyphicon-folder-close');
    // expand or collapse level 2+ topics under this section
    $(this).closest('.topic').find('.nav-pills-nested').slideToggle();
  });

  // when user click level 1 topics
  $('#topics').on('click tap', '[data-expandable="true"]', function (e) {
    // switch icon
    $(this).find('.glyphicon').addClass('glyphicon-folder-open').removeClass('glyphicon-folder-close');
    // expand level 2+ topics under this section
    $(this).find('.nav-pills-nested').slideDown();
  });

  // expand / collapse all topics
  let topicExpandAll = true;
  // when users click icons inside "all topics"
  $('#topics').on('click tap', '[data-expandable="all"] .glyphicon, [data-expandable="all"]', function (e) {
    // toggle topics expand status
    if (topicExpandAll) {
      $('#topics .glyphicon').addClass('glyphicon-folder-close').removeClass('glyphicon-folder-open');
      $('#topics .nav-pills-nested').slideUp();
    } else {
      $('#topics .glyphicon').addClass('glyphicon-folder-open').removeClass('glyphicon-folder-close');
      $('#topics .nav-pills-nested').slideDown();
    }
    topicExpandAll = !topicExpandAll;
  });

  $('#relations').on('click tap', '[data-relation]', function () {
    const relation = $(this).attr('data-relation');
    if (relation.length > 0) {
      filters.relation = relation;
    } else {
      delete filters.relation;
    }
    $('#relations li').removeClass('active');
    $(this).parents('li').addClass('active');
    filterPoints(filters);
  });
  $('#professions').on('click tap', '[data-profession]', function () {
    const profession = $(this).attr('data-profession');
    if (profession.length > 0) {
      filters.profession = profession;
    } else {
      delete filters.profession;
    }
    $('#professions li').removeClass('active');
    $(this).parents('li').addClass('active');
    filterPoints(filters);
  });

  $('#points').on('click tap', '[data-author]', function () {
    const author = $(this).attr('data-author');
    if (author == filters.author) {
      delete filters.author;
    } else if (author.length > 0) {
      filters.author = author;
    } else {
      delete filters.author;
    }
    filterPoints(filters);
  });
  $('#points').on('click tap', '[data-topic]', function() {
    const topic = $(this).attr('data-topic');
    $(`#topics [data-topic="${topic}"]`).click();
  });

  // 捲動調整爭點位置
  //$(window).scroll(fixPoints);
});


import {home} from 'view/home';
