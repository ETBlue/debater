$(() => {
  // 爭點太少的自動定位到右方畫面
  const fixPoints = () => {
    const scrollHeight = $(window).scrollTop();
    const divHeight = $('#points').height();

    if (scrollHeight > divHeight) {
      $('#points').css('position', 'fixed').css('top', '15px');
    } else {
      $('#points').css('position', 'initial').css('top', 'initial');
    }
  };

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
  function filterPoints(filters) {
    Object.keys(filters).forEach((key) => {
      $('#points .point').has('[data-' + key + '="' + filters[key] + '"]').css('display', 'block');
      $('#points .point').not($('#points .point').has('[data-' + key + '="' + filters[key] + '"]')).css('display', 'none');
    });
  }

  let filters = {};
  $('#topics').on('click tap', '[data-topic]', function (e) {
    e.stopPropagation();
    const topic = $(this).attr('data-topic');
    if (topic.length > 0) {
      filters.topic = topic;
    } else {
      delete filters.topic;
    }
    $('#topics [data-topic]').removeClass('active');
    $(this).addClass('active');
    filterPoints(filters);
    fixPoints();
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

  // 捲動調整爭點位置
  $(window).scroll(fixPoints);
});


import {home} from 'view/home';
