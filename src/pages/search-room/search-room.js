import AirDatepicker from '~libs/air-datepicker';
import IonRangeslider from '~libs/ion-rangeslider';
import SlickCarousel from '~libs/slick-carousel';
import PaginationJS from '~libs/paginationjs';
import consts from '~constants/consts';
import '~mock-data/data.json';
import '~components/header';
import '~components/dropdown';
import '~components/checkbox-list';
import '~templates/fonts.scss';

import './search-room.scss';

class SearchRoom {
  initializePlugins() {
    this._findElements();
    this._initializeFilterDateDropdown();
    this._initializeSlickCarousel();
    this._initializePaginationJS();
    this._initializeIonRangeSlider();
    this._toggleFilterItems();
    this._preventDefault();
  }

  _initializeFilterDateDropdown() {
    this.filterDateDropdown = new AirDatepicker('.js-filter-date-dropdown', 'S');

    this.filterDateDropdown.initializePlugin({
      range: true,
      clearButton: true,
      keyboardNav: true,
      dateFormat: 'd M',
      navTitles: { days: 'MM <i>yyyy</i>' },
      prevHtml: consts.prevArrow,
      nextHtml: consts.nextArrow,
    });

    this.filterDateDropdown.setDatesDefault();
    this.filterDateDropdown.openDatepickerDefault();
    this.filterDateDropdown.addApplyButton();
  }

  _initializeSlickCarousel() {
    this.initializeSlick = () => {
      this.slickCarousel = new SlickCarousel('.js-pagination__data-container .js-room-card__slider');

      this.slickCarousel.initializePlugin({
        arrows: true,
        dots: true,
        prevArrow: '<div class="room-card__arrow-prev"></div>',
        nextArrow: '<div class="room-card__arrow-next"></div>',
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

    $roomCardsCollection.each(function addCards() {
      const card = this;
      const cardElement = card.outerHTML;

      paginationItems.push(cardElement);
    });

    const windowWidth = $(window).width();
    const isMobileResolution = windowWidth < 600;

    this.paginationjs = new PaginationJS('.js-pagination');

    this.paginationjs.showDataContainer();

    this.paginationjs.initializePlugin({
      dataSource: paginationItems,
      autoHidePrevious: !isMobileResolution,
      autoHideNext: !isMobileResolution,
      pageRange: 1,
      showPageNumbers: !isMobileResolution,
      showNavigator: isMobileResolution,
      formatNavigator: '<%= currentPage %> / <%= totalPage %>',
      prevText: '',
      nextText: '',
      pageSize: 12,
      callback: addPaginationItem,
      afterPaging: () => {
        this.initializeSlick();
        this._preventDefault();
      },
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
    const showFilterItems = () => this.$filterItems.toggle();
    this.$filterButton.click(showFilterItems);
  }

  _preventDefault() {
    $(document).ready(() => {
      this.$imageContainer = $('.room-card__image-container');

      this.$imageContainer.click((event) => event.preventDefault());
    });
  }

  _findElements() {
    this.$filterButton = $('.js-search-room__filter-button');
    this.$filterItems = $('.js-search-room__widgets-container');
  }
}

const searchRoom = new SearchRoom();

searchRoom.initializePlugins();
