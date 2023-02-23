import AirDatepicker from '../../libs/air-datepicker';
import Inputmask from '../../libs/inputmask';
import SlickCarousel from '../../libs/slick-carousel';
import vars from '../../templates/vars';
import '../../components/dropdown';
import '../../templates/fonts.scss';
import './cards.scss';

class Cards {
  initializePlugins() {
    this._initializeDateDropdown();
    this._initializeInputmask();
    this._initializeFilterDateDropdown();
    this._initializeSlickCarousel();
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
    this.filterDateDropdown = new AirDatepicker('.js-filter-date-dropdown');

    this.filterDateDropdown.initializePlugin({
      clearButton: true,
      keyboardNav: true,
      range: true,
      navTitles: { days: 'MM <i>yyyy</i>' },
      prevHtml: vars.prevArrow,
      nextHtml: vars.nextArrow,
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

  _initializeSlickCarousel() {
    const initializeSlick = () => {
      this.slickCarousel = new SlickCarousel('.js-room-card__slider');

      this.slickCarousel.initializePlugin({
        arrows: true,
        dots: true,
        prevArrow: '<div class="room-card__arrow-prev"></div>',
        nextArrow: '<div class="room-card__arrow-next"></div>',
      });
    };

    initializeSlick();
  }
}

const cards = new Cards();

cards.initializePlugins();
