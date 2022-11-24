import MaskedTextField from '../../libs/inputmask/inputmask';
import IonRangeslider from '../../libs/ion-rangeslider/ion-rangeslider';
import PaginationJS from '../../libs/paginationjs/paginationjs';
import AirDatepicker from '../../libs/air-datepicker/air-datepicker';
import Dropdown from '../../components/dropdown/dropdown';
import ExpandableCheckboxList from '../../components/expandable-checkbox-list/expandable-checkbox-list';
import LikeButton from '../../components/like-button/like-button';
import setSelectionTextFunctions from '../../templates/vars';
import '../../templates/fonts.scss';
import './form-elements.scss';

class FormElements {
  initializeComponents() {
    this.expandableCheckboxList = new ExpandableCheckboxList();
    this.likeButton = new LikeButton();
    this.dropdownGuests = new Dropdown(
      '.js-dropdown__wrapper_guests',
      setSelectionTextFunctions.guestsText,
      'Сколько гостей',
    );
    this.dropdownConveniences = new Dropdown(
      '.js-dropdown__wrapper_conveniences',
      setSelectionTextFunctions.conveniencesText,
      'Выберите удобства',
    );
  }

  initializePlugins() {
    this._initializeDateDropdown();
    this._initializeFilterDateDropdown();
    this._initializeMaskedTextField();
    this._initializeIonRangeSlider();
    this._initializePaginationJS();
  }

  _initializeDateDropdown() {
    this.dateDropdown = new AirDatepicker('.js-date-dropdown');

    this.dateDropdown.initializePlugin({
      clearButton: true,
      keyboardNav: true,
      navTitles: { days: 'MM <i>yyyy</i>' },
      prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
      nextHtml: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0.984375L17.0156 9L9 17.0156L7.59375 15.6094L13.1719 9.98438H0.984375V8.01562H13.1719L7.59375 2.39062L9 0.984375Z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="9" y1="-13" x2="9" y2="31" gradientUnits="userSpaceOnUse"><stop stop-color="#BC9CFF"/><stop offset="1" stop-color="#8BA4F9"/></linearGradient></defs></svg>',
    });

    this.dateDropdown.setDatesDefault();
    this.dateDropdown.openDatepickerMultiple();
    this.dateDropdown.addApplyButton();
    this.dateDropdown.checkEmptyValue();
  }

  _initializeFilterDateDropdown() {
    this.filterDateDropdown = new AirDatepicker('.js-filter-date-dropdown', 'S');

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

  _initializeMaskedTextField() {
    this.maskedTextField = new MaskedTextField('.js-masked-text-field__input');

    this.maskedTextField.initializePlugin({
      placeholder: 'ДД.ММ.ГГГГ',
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
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

  _initializePaginationJS() {
    const addPaginationItem = (item) => {
      const paginationItem = `<li class="pagination__list-item">${item}</li>`;

      return paginationItem;
    };

    const paginationItems = [];
    for (let i = 0; i < 180; i += 1) {
      paginationItems.push(i);
    }

    this.pagination = new PaginationJS('.js-pagination');

    this.pagination.initializePlugin({
      dataSource: paginationItems,
      autoHidePrevious: true,
      autoHideNext: true,
      pageRange: 1,
      showPageNumbers: true,
      showNavigator: false,
      prevText: '',
      nextText: '',
      pageSize: 12,
      callback: addPaginationItem,
    });

    const $paginationContainer = $('.pagination__container');

    $paginationContainer.removeClass('pagination__container_indented');
  }
}

const formElements = new FormElements();

formElements.initializeComponents();
formElements.initializePlugins();
