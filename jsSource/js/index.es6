$(() => {
  // enable bootstrap tabs ui
  $('#tabs').tab();
  $('body').on('mouseenter','*[data-toggle="tooltip"]',function(){$(this).tooltip('show')}); 
  $('body').on('mouseleave','*[data-toggle="tooltip"]',function(){$(this).tooltip('hide')}); 

  // toggle level 2 navbar
  $('.tab-pane [data-subset]').on('click tap', function(){
    $(this).parents('.tab-pane').children('.subset').removeClass('active').filter('#' + $(this).attr('data-subset')).addClass('active');
  });

  // toggle about section
  $('[data-click="toggleAbout"]').on('click tap', function(){
    $('#about').slideToggle();
  });
});

import {home} from 'view/home';
