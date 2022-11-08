import 'paginationjs/dist/pagination.min';
import 'paginationjs/dist/pagination.css';
import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../../components/header/header';
import '../../components/dropdown/dropdown';
import '../../components/filter-date-dropdown/filter-date-dropdown';
import '../../components/range-slider/range-slider';
import '../../components/expandable-checkbox-list/expandable-checkbox-list';
import '../../templates/fonts.scss';
import './search-room.scss';

const $filterButton = $('.js-search-room-filter__button');
const $filterItems = $('.js-search-room-widgets-container');

const showFilterItems = () => $filterItems.toggle();
$filterButton.click(showFilterItems);

function simpleTemplating(data) {
  let html = '<ul class="pagination__list">';
  $.each(data, (index, item) => {
    html += '<li class="pagination__list-item js-pagination__list-item">'
      + `<a class="pagination__list-link" href="room-details.html">${item}</a>`
      + '</li>';
  });
  html += '</ul>';
  return html;
}

const dataContainer = $('.js-pagination__data-container');

dataContainer.addClass('pagination__data-container_visible');

const paginationArray = [];

const $roomCard = $('.js-room-card');

$roomCard.each(function () {
  const card = this;
  const cardElement = card.outerHTML;

  paginationArray.push(cardElement);
});

const showItemsNum = () => {
  const paginationSize = 12;
  const paginationItemsNum = $('.js-pagination__list-item').length;
  const paginationSubText = $('.js-pagination__numbers');
  const pageNum = $('.js-pagination__container').pagination('getSelectedPageNum');

  const paginationText = `${(paginationSize * pageNum - paginationSize + 1)} - ${paginationSize * pageNum - (paginationSize - paginationItemsNum)} `;

  paginationSubText.text(paginationText);
};

const initializeSlick = () => {
  $('.js-pagination__data-container .js-room-card__slider').each(function () {
    const $item = $(this);

    $item.slick({
      arrows: false,
      dots: true,
    });
  });

  $('.js-pagination__data-container .js-room-card__slider_with_arrows').each(function () {
    const $item = $(this);

    $item.slick({
      arrows: true,
      dots: true,
      prevArrow: '<svg class="slick-arrow slick-prev" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.42188 11.0928L6.01563 12.499L0.0156253 6.49902L6.01563 0.499024L7.42188 1.90527L2.82813 6.49902L7.42188 11.0928Z" fill="white"/></svg>',
      nextArrow: '<svg class="slick-arrow slick-next" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.578125 1.90527L1.98438 0.499024L7.98438 6.49902L1.98438 12.499L0.578125 11.0928L5.17188 6.49902L0.578125 1.90527Z" fill="white"/></svg>',
    });
  });
};

const windowWidth = $(window).width();

$('.js-pagination__container').pagination({
  dataSource: paginationArray,
  autoHidePrevious: !(windowWidth < 600),
  autoHideNext: !(windowWidth < 600),
  pageRange: 1,
  showPageNumbers: !(windowWidth < 600),
  showNavigator: windowWidth < 600,
  prevText: '',
  nextText: '',
  pageSize: 12,
  callback: (data) => {
    const html = simpleTemplating(data);

    $('.js-pagination__data-container').html(html);
  },
  afterPaging: () => initializeSlick(),
  afterNextOnClick: () => showItemsNum(),
  afterPreviousOnClick: () => showItemsNum(),
  afterPageOnClick: () => showItemsNum(),
});

const $button = dataContainer.find('button');
const $arrow = dataContainer.find('.slick-arrow');

const prevDefault = (element) => element.click((event) => event.preventDefault());

prevDefault($button);
prevDefault($arrow);
