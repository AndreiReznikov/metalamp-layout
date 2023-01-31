import AirDatepicker from '../../libs/air-datepicker/AirDatepicker';
import IonRangeslider from '../../libs/ion-rangeslider/IonRangeslider';
import SlickCarousel from '../../libs/slick-carousel/SlickCarousel';
import PaginationJS from '../../libs/paginationjs/PaginationJS';
import Header from '../../components/header/Header';
import Dropdown from '../../components/dropdown/Dropdown';
import ExpandableCheckboxList from '../../components/expandable-checkbox-list/ExpandableCheckboxList';
import vars from '../../templates/vars';
import '../../templates/fonts.scss';
import './search-room.scss';

class SearchRoom {
  initializeComponents() {
    this.header = new Header();
    this.expandableCheckboxList = new ExpandableCheckboxList();
    this.dropdownGuests = new Dropdown(
      '.js-dropdown__wrapper_guests',
      vars.setSelectionGuestsText,
      'Сколько гостей',
    );
    this.dropdownConveniences = new Dropdown(
      '.js-dropdown__wrapper_conveniences',
      vars.setSelectionConveniencesText,
      'Выберите удобства',
    );
  }

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
    this.$filterButton = $('.js-search-room-filter__button');
    this.$filterItems = $('.js-search-room-widgets-container');

    const showFilterItems = () => this.$filterItems.toggle();
    this.$filterButton.click(showFilterItems);
  }

  _preventDefault() {
    this.$imageContainer = $('.room-card__image-container');

    this.$imageContainer.click((event) => event.preventDefault());
  }
}

const searchRoom = new SearchRoom();

searchRoom.initializeComponents();
searchRoom.initializePlugins();
