import AirDatepicker from '../../libs/air-datepicker/air-datepicker';
import Header from '../../components/header/header';
import Dropdown from '../../components/dropdown/dropdown';
import vars from '../../templates/vars';
import '../../templates/fonts.scss';
import './landing-page.scss';

class LandingPage {
  initializeComponents() {
    this.header = new Header();
    this.dropdownGuests = new Dropdown(
      '.js-dropdown__wrapper_guests',
      vars.setSelectionGuestsText,
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
      prevHtml: vars.prevArrow,
      nextHtml: vars.nextArrow,
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
