import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

$(document).ready(function() {
  $('.room-short-information-block__slider').each(function() {
    const $item = $(this);
  
    $item.slick({
      arrows: false,
      dots: true
    });
  })
  
  $('.room-short-information-block__slider_width-arrays').each(function() {
    const $item = $(this);
  
    $item.slick({
      arrows: true,
      dots: true,
      prevArrow: '<svg class="slick-arrow slick-prev" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.42188 11.0928L6.01563 12.499L0.0156253 6.49902L6.01563 0.499024L7.42188 1.90527L2.82813 6.49902L7.42188 11.0928Z" fill="white"/></svg>',
      nextArrow: '<svg class="slick-arrow slick-next" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.578125 1.90527L1.98438 0.499024L7.98438 6.49902L1.98438 12.499L0.578125 11.0928L5.17188 6.49902L0.578125 1.90527Z" fill="white"/></svg>'
    });
  })
});