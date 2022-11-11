import Header from '../../components/header/header';
import '../../components/dropdown/dropdown';
import '../../components/filter-date-dropdown/filter-date-dropdown';
import IonRangeslider from '../../libs/ion-rangeslider/ion-rangeslider';
import ExpandableCheckboxList from '../../components/expandable-checkbox-list/expandable-checkbox-list';
import SlickCarousel from '../../libs/slick-carousel/slick-carousel';
import PaginationJS from '../../libs/paginationjs/paginationjs';
import '../../templates/fonts.scss';
import './search-room.scss';

const header = new Header();
const expandableCheckboxList = new ExpandableCheckboxList();

const slickItems = [
  [
    '.js-pagination__data-container .js-room-card__slider',
    {
      arrows: false,
      dots: true,
    },
  ],
  [
    '.js-pagination__data-container .js-room-card__slider_with_arrows',
    {
      arrows: true,
      dots: true,
      prevArrow: '<svg class="slick-arrow slick-prev" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.42188 11.0928L6.01563 12.499L0.0156253 6.49902L6.01563 0.499024L7.42188 1.90527L2.82813 6.49902L7.42188 11.0928Z" fill="white"/></svg>',
      nextArrow: '<svg class="slick-arrow slick-next" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.578125 1.90527L1.98438 0.499024L7.98438 6.49902L1.98438 12.499L0.578125 11.0928L5.17188 6.49902L0.578125 1.90527Z" fill="white"/></svg>',
    },
  ],
];

const initializeSlick = () => {
  slickItems.forEach((item) => {
    const slickCarousel = new SlickCarousel(item[0]);

    slickCarousel.initializePlugin(item[1]);
  });
};

const addPaginationItem = (item) => {
  const paginationItem = '<li class="pagination__list-item js-pagination__list-item">'
    + `<a class="pagination__list-link" href="room-details.html">${item}</a>`
    + '</li>';

  return paginationItem;
};

const paginationItems = [];
const $roomCardsCollection = $('.js-room-card');

$roomCardsCollection.each(function () {
  const card = this;
  const cardElement = card.outerHTML;

  paginationItems.push(cardElement);
});

const windowWidth = $(window).width();

const paginationjs = new PaginationJS('.js-pagination');

paginationjs.showDataContainer();

paginationjs.initializePlugin({
  dataSource: paginationItems,
  autoHidePrevious: !(windowWidth < 600),
  autoHideNext: !(windowWidth < 600),
  pageRange: 1,
  showPageNumbers: !(windowWidth < 600),
  showNavigator: windowWidth < 600,
  prevText: '',
  nextText: '',
  pageSize: 12,
  callback: addPaginationItem,
  afterPaging: () => initializeSlick(),
});

const ionRangeSlider = new IonRangeslider('.js-range-slider');

ionRangeSlider.initializePlugin({
  skin: 'flat',
  min: 600,
  max: 15250,
  from: 5000,
  to: 10000,
  type: 'double',
});

ionRangeSlider.addTooltips();
ionRangeSlider.setTooltipsValues();

const $filterButton = $('.js-search-room-filter__button');
const $filterItems = $('.js-search-room-widgets-container');

const showFilterItems = () => $filterItems.toggle();
$filterButton.click(showFilterItems);
