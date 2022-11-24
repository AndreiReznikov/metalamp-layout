import MaskedTextField from '../../libs/inputmask/inputmask';
import IonRangeslider from '../../libs/ion-rangeslider/ion-rangeslider';
import PaginationJS from '../../libs/paginationjs/paginationjs';
import AirDatepicker from '../../libs/air-datepicker/air-datepicker';
import Dropdown from '../../components/dropdown/dropdown';
import ExpandableCheckboxList from '../../components/expandable-checkbox-list/expandable-checkbox-list';
import LikeButton from '../../components/like-button/like-button';
import vars from '../../templates/vars';
import '../../templates/fonts.scss';
import './form-elements.scss';

class FormElements {
  initializeComponents() {
    this.expandableCheckboxList = new ExpandableCheckboxList();
    this.likeButton = new LikeButton();
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
      prevHtml: vars.prevArrow,
      nextHtml: vars.nextArrow,
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
      prevHtml: vars.prevArrow,
      nextHtml: vars.nextArrow,
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
