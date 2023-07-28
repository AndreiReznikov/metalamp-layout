import AirDatepicker from '~libs/air-datepicker';
import consts from '~constants/consts';
import '~components/header';
import '~components/dropdown';
import '~templates/fonts.scss';

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
      prevHtml: consts.prevArrow,
      nextHtml: consts.nextArrow,
    });

    this.dateDropdown.setDatesDefault();
    this.dateDropdown.openDatepickerMultiple();
    this.dateDropdown.addApplyButton();
    this.dateDropdown.checkEmptyValue();
  }
}

const landingPage = new LandingPage();

landingPage.initializePlugins();
