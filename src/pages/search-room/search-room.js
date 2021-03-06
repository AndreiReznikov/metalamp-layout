import 'paginationjs/dist/pagination.min.js'
import 'paginationjs/dist/pagination.css'
import 'slick-carousel/slick/slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import '../../components/header/header'
import '../../components/dropdown/dropdown'
import '../../components/filter-date-dropdown/filter-date-dropdown'
import '../../components/range-slider/range-slider'
import '../../components/expandable-checkbox-list/expandable-checkbox-list'

import './search-room.scss'

$(document).ready(function() {
    const $filterButton = $('.js-search-room-filter__button');
    const $filterItems = $('.js-search-room-widgets-container');
    
    const showFilterItems = () => $filterItems.toggle();
    $filterButton.click(() => showFilterItems());


  function simpleTemplating(data) {
    let html = '<ul class="pagination-list">';
    $.each(data, function(index, item){
        html += '<li class="pagination-list__item js-pagination-list__item">' + '<a class="pagination-list__link" href="room-details.html">' + item + '</a>' + '</li>';
    });
    html += '</ul>';
    return html;
  }

  const dataContainer = $('.js-data-container');

  dataContainer.addClass('data-container_visible');

  const paginationArray = [];

  const $roomCard = $('.js-room-short-information-block');

  $roomCard.each(function() {
    const card = this;
    const cardElement = card.outerHTML;

    paginationArray.push(cardElement);
  });

  const showItemsNum = () => {
    const paginationSize = 12;
    let paginationItemsNum = $('.js-pagination-list__item').length;
    let paginationSubText = $('.js-pagination-text__num');
    let pageNum =  $('.js-pagination-container').pagination('getSelectedPageNum');

    const paginationText = `${(paginationSize * pageNum - paginationSize + 1)} - ${paginationSize * pageNum - (paginationSize - paginationItemsNum)} `;

    paginationSubText.text(paginationText);
  };

  const initializeSlick = () => {
    $('.js-data-container .js-room-short-information-block__slider').each(function() {
      const $item = $(this);

      $item.slick({
        arrows: false,
        dots: true
      });
    });
    
    $('.js-data-container .js-room-short-information-block__slider_width-arrays').each(function() {
      const $item = $(this);
    
      $item.slick({
        arrows: true,
        dots: true,
        prevArrow: '<svg class="slick-arrow slick-prev" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.42188 11.0928L6.01563 12.499L0.0156253 6.49902L6.01563 0.499024L7.42188 1.90527L2.82813 6.49902L7.42188 11.0928Z" fill="white"/></svg>',
        nextArrow: '<svg class="slick-arrow slick-next" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.578125 1.90527L1.98438 0.499024L7.98438 6.49902L1.98438 12.499L0.578125 11.0928L5.17188 6.49902L0.578125 1.90527Z" fill="white"/></svg>'
      });
    });
  };

  let windowWidth = $(window).width();
  
  $('.js-pagination-container').pagination({
    dataSource: paginationArray,
    autoHidePrevious: windowWidth < 600 ? false : true,
    autoHideNext: windowWidth < 600 ? false : true,
    pageRange: 1,
    showPageNumbers: windowWidth < 600 ? false : true,
    showNavigator: windowWidth < 600 ? true : false,
    prevText: '',
    nextText: '',
    pageSize: 12,
    callback: (data, pagination) => {
        let html = simpleTemplating(data);

        $('.js-data-container').html(html);
    },
    afterPaging: () => initializeSlick(),
    afterNextOnClick: () => showItemsNum(),
    afterPreviousOnClick: () => showItemsNum(),
    afterPageOnClick: () => showItemsNum()
  });

  const $button = dataContainer.find('button');
  const $arrow = dataContainer.find('.slick-arrow');

  const prevDefault = element => element.click(event => event.preventDefault());

  prevDefault($button);
  prevDefault($arrow);
});