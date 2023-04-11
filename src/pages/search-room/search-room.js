import AirDatepicker from '../../libs/air-datepicker';
import IonRangeslider from '../../libs/ion-rangeslider';
import SlickCarousel from '../../libs/slick-carousel';
import PaginationJS from '../../libs/paginationjs';
import vars from '../../templates/vars';
import '../../components/header';
import '../../components/dropdown';
import '../../components/checkbox-list';
import '../../templates/fonts.scss';
import './search-room.scss';

class SearchRoom {
  initializePlugins() {
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
      prevHtml: vars.prevArrow,
      nextHtml: vars.nextArrow,
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
    this.$filterButton = $('.js-search-room__filter-button');
    this.$filterItems = $('.js-search-room__widgets-container');

    const showFilterItems = () => this.$filterItems.toggle();
    this.$filterButton.click(showFilterItems);
  }

  _preventDefault() {
    this.$imageContainer = $('.room-card__image-container');

    this.$imageContainer.click((event) => event.preventDefault());
  }
}

const searchRoom = new SearchRoom();

searchRoom.initializePlugins();
