$(() => {

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
    $('#points .point').slideDown('fast');
    Object.keys(filters).forEach((key) => {
      $('#points .point').not($('#points .point').has('[data-' + key + '="' + filters[key] + '"]')).slideUp('fast');
    });
    //$('#points .point').has('[data-topic="'+filters.topic+'"]').show();
  }

  let filters = {};
  $('#topics').on('click tap', '[data-topic]', function () {
    const topic = $(this).attr('data-topic');
    if (topic.length > 0) {
      filters.topic = topic;
    } else {
      delete filters.topic;
    }
    $('#topics li').removeClass('active');
    $(this).parents('li').addClass('active');
    filterPoints(filters);
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

});


import {home} from 'view/home';
