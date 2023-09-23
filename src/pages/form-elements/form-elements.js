import Inputmask from '~libs/inputmask';
import IonRangeslider from '~libs/ion-rangeslider';
import PaginationJS from '~libs/paginationjs';
import AirDatepicker from '~libs/air-datepicker';
import '~components/checkbox-list';
import '~components/dropdown';
import '~components/like-button';
import '~templates/fonts.scss';

import './form-elements.scss';

class FormElements {
  initializePlugins() {
    this._initializeDateDropdown();
    this._initializeFilterDateDropdown();
    this._initializeInputmask();
    this._initializeIonRangeSlider();
    this._initializePaginationJS();
  }

  _initializeDateDropdown() {
    this.dateDropdown = new AirDatepicker('.js-date-dropdown');

    this.dateDropdown.initializePlugin({
      clearButton: true,
      keyboardNav: true,
      navTitles: { days: 'MM <i>yyyy</i>' },
      prevHtml: '<div class="datepicker--arrow-prev"></div>',
      nextHtml: '<div class="datepicker--arrow-next"></div>',
    });

    this.dateDropdown.setDatesDefault();
    this.dateDropdown.openDatepickerMultiple();
    this.dateDropdown.addApplyButton();
    this.dateDropdown.checkEmptyValue();
  }

  _initializeFilterDateDropdown() {
    this.filterDateDropdown = new AirDatepicker(
      '.js-filter-date-dropdown',
      'S',
    );

    this.filterDateDropdown.initializePlugin({
      range: true,
      clearButton: true,
      keyboardNav: true,
      dateFormat: 'd M',
      navTitles: { days: 'MM <i>yyyy</i>' },
      prevHtml: '<div class="datepicker--arrow-prev"></div>',
      nextHtml: '<div class="datepicker--arrow-next"></div>',
    });

    this.filterDateDropdown.setDatesDefault();
    this.filterDateDropdown.openDatepickerDefault();
    this.filterDateDropdown.addApplyButton();
  }

  _initializeInputmask() {
    this.inputmask = new Inputmask('.js-masked-text-field__input');

    this.inputmask.initializePlugin({
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

    const paginationItems = new Array(180).fill(0);

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
  }
}

const formElements = new FormElements();

formElements.initializePlugins();
