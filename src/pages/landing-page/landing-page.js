import AirDatepicker from '../../libs/air-datepicker/air-datepicker';
import Header from '../../components/header/header';
import Dropdown from '../../components/dropdown/dropdown';
import setSelectionTextFunctions from '../../templates/vars';
import '../../templates/fonts.scss';
import './landing-page.scss';

class LandingPage {
  initializeComponents() {
    this.header = new Header();
    this.dropdownGuests = new Dropdown(
      '.js-dropdown__wrapper_guests',
      setSelectionTextFunctions.guestsText,
      'Сколько гостей',
    );
  }

  initializePlugins() {
    this._initializeDateDropdown();
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
}

const landingPage = new LandingPage();

landingPage.initializeComponents();
landingPage.initializePlugins();
