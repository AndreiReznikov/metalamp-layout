import AirDatepicker from '../../libs/air-datepicker/air-datepicker';
import IonRangeslider from '../../libs/ion-rangeslider/ion-rangeslider';
import Header from '../../components/header/header';
import ExpandableCheckboxList from '../../components/expandable-checkbox-list/expandable-checkbox-list';
import SlickCarousel from '../../libs/slick-carousel/slick-carousel';
import PaginationJS from '../../libs/paginationjs/paginationjs';
import '../../components/dropdown/dropdown';
import '../../templates/fonts.scss';
import './search-room.scss';

class SearchRoom {
  constructor() {
    this.header = new Header();
    this.expandableCheckboxList = new ExpandableCheckboxList();

    this._initializeFilterDateDropdown();
    this._initializeSlickCarousel();
    this._initializePaginationJS();
    this._initializeIonRangeSlider();
    this._toggleFilterItems();
  }

  _initializeFilterDateDropdown() {
    this.filterDateDropdown = new AirDatepicker('.js-filter-date-dropdown');

    this.filterDateDropdown.initializePlugin({
      range: true,
      clearButton: true,
      keyboardNav: true,
      dateFormat: 'd M',
      navTitles: { days: 'MM <i>yyyy</i>' },
      prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
      nextHtml: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0.984375L17.0156 9L9 17.0156L7.59375 15.6094L13.1719 9.98438H0.984375V8.01562H13.1719L7.59375 2.39062L9 0.984375Z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="9" y1="-13" x2="9" y2="31" gradientUnits="userSpaceOnUse"><stop stop-color="#BC9CFF"/><stop offset="1" stop-color="#8BA4F9"/></linearGradient></defs></svg>',
    });

    this.filterDateDropdown.setDatesDefault();
    this.filterDateDropdown.openDatepickerDefault();
    this.filterDateDropdown.addApplyButton();
  }

  _initializeSlickCarousel() {
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
          prevArrow: '<span class="room-card__arrow-prev"></span>',
          nextArrow: '<span class="room-card__arrow-next"></span>',
        },
      ],
    ];

    this.initializeSlick = () => {
      slickItems.forEach((item) => {
        this.slickCarousel = new SlickCarousel(item[0]);

        this.slickCarousel.initializePlugin(item[1]);
      });
    };

    this.initializeSlick();
  }

  _initializePaginationJS() {
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

    this.paginationjs = new PaginationJS('.js-pagination');

    this.paginationjs.showDataContainer();

    this.paginationjs.initializePlugin({
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
      afterPaging: () => this.initializeSlick(),
    });
  }

  _initializeIonRangeSlider() {
    this.ionRangeSlider = new IonRangeslider('.js-range-slider');

    this.ionRangeSlider.initializePlugin({
      skin: 'flat',
      min: 600,
      max: 15250,
      from: 5000,
      to: 10000,
      type: 'double',
    });

    this.ionRangeSlider.addTooltips();
    this.ionRangeSlider.setTooltipsValues();
  }

  _toggleFilterItems() {
    this.$filterButton = $('.js-search-room-filter__button');
    this.$filterItems = $('.js-search-room-widgets-container');

    const showFilterItems = () => this.$filterItems.toggle();
    this.$filterButton.click(showFilterItems);
  }
}

const searchRoom = new SearchRoom();
