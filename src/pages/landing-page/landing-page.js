import AirDatepicker from '../../libs/air-datepicker/AirDatepicker';
import vars from '../../templates/vars';
import '../../components/header';
import '../../components/dropdown';
import '../../templates/fonts.scss';
import './landing-page.scss';

class LandingPage {
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

landingPage.initializePlugins();
