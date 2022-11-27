import AirDatepicker from '../../libs/air-datepicker/air-datepicker';
import MaskedTextField from '../../libs/inputmask/inputmask';
import SlickCarousel from '../../libs/slick-carousel/slick-carousel';
import Dropdown from '../../components/dropdown/dropdown';
import vars from '../../templates/vars';
import '../../templates/fonts.scss';
import './cards.scss';

class Cards {
  initializeComponents() {
    this.dropdownGuests = new Dropdown(
      '.js-dropdown__wrapper_guests',
      vars.setSelectionGuestsText,
      'Сколько гостей',
    );
  }

  initializePlugins() {
    this._initializeDateDropdown();
    this._initializeMaskedTextField()
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

  _initializeMaskedTextField() {
    this.maskedTextField = new MaskedTextField('.js-masked-text-field__input');

    this.maskedTextField.initializePlugin({
      placeholder: 'ДД.ММ.ГГГГ',
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
    });
  }

  _initializeSlickCarousel() {
    const slickItems = [
      [
        '.js-room-card__slider',
        {
          arrows: false,
          dots: true,
        },
      ],
      [
        '.js-room-card__slider_with_arrows',
        {
          arrows: true,
          dots: true,
          prevArrow: '<span class="room-card__arrow-prev"></span>',
          nextArrow: '<span class="room-card__arrow-next"></span>',
        },
      ],
    ];

    const initializeSlick = () => {
      slickItems.forEach((item) => {
        this.slickCarousel = new SlickCarousel(item[0]);

        this.slickCarousel.initializePlugin(item[1]);
      });
    };

    initializeSlick();
  }
}

const cards = new Cards();

cards.initializeComponents();
cards.initializePlugins();
