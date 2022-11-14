import 'air-datepicker/dist/js/datepicker';
import 'air-datepicker/dist/css/datepicker.css';

class AirDatepicker {
  constructor(element) {
    this._findElement(element);
  }

  initializePlugin(options) {
    this.$datepickerInput.datepicker({
      range: options.range,
      clearButton: options.clearButton,
      dateFormat: options.dateFormat,
      keyboardNav: options.keyboardNav,
      navTitles: options.navTitles,
      prevHtml: options.prevHtml,
      nextHtml: options.nextHtml,
      onShow: () => this._calculateCalendarWidth(),
      onSelect: (date) => this._setDates(date),
    });
  }

  openDatepickerDefault() {
    if (this.$datepickerOpened.length > 0) {
      this.datepickerOpened = this.$datepickerOpened.data('datepicker');
      this.datepickerOpened.show();
    }
  }

  openDatepickerMultiple() {
    const handleDateFromOrDateToShowDatepicker = () => this.datepicker.show();

    this.$dateFrom.click(handleDateFromOrDateToShowDatepicker);
    this.$dateTo.click(handleDateFromOrDateToShowDatepicker);
  }

  setDatesDefault() {
    this.datepicker = this.$datepickerInput.data('datepicker');
    const dateFrom = this.$datepickerInput.data('from');
    const dateTo = this.$datepickerInput.data('to');

    this.datepicker.selectDate([eval(dateFrom), eval(dateTo)]);
  }

  checkEmptyValue() {
    const isFromEmpty = this.$dateFrom.data('from-empty');
    const isToEmpty = this.$dateTo.data('to-empty');

    const setEmptyValue = (element) => element.val('');

    if (isFromEmpty) setEmptyValue(this.$dateFrom);
    if (isToEmpty) setEmptyValue(this.$dateTo);
  }

  addApplyButton() {
    const datepickerElements = this.datepicker.$datepicker;
    const $applyButton = $('<span class=\'datepicker--button\'>Применить</span>');

    datepickerElements.find('.datepicker--buttons').append($applyButton);

    const handleApplyButtonHideDatepicker = () => {
      if (this.datepicker.selectedDates.length < 2) return;
      this.datepicker.hide();
    };

    $applyButton.click(handleApplyButtonHideDatepicker);
  }

  _calculateCalendarWidth() {
    if (this.$datepicker.hasClass('js-filter-date-dropdown')) {
      this.$calendar = $('.datepicker');
      const inputWidth = this.$datepickerInput.width() + parseFloat(this.$datepickerInput.css('padding-left'));

      this.$calendar.width(inputWidth);
    }
  }

  _setDates(date) {
    if (this.$datepicker.hasClass('js-date-dropdown')) {
      const dates = date.split(' - ');
      this.$dateFrom.val(dates[0]);
      this.$dateTo.val(dates[1]);
    }
  }

  _findElement(element) {
    this.$datepicker = $(element);

    if (element === '.js-filter-date-dropdown') {
      this.$datepickerInput = this.$datepicker.find('.js-filter-date-dropdown__input');
      this.$datepickerOpened = this.$datepicker.find('.js-filter-date-dropdown__input_opened');
    } else if (element === '.js-date-dropdown') {
      this.$datepickerInput = this.$datepicker.find('.js-datepicker-multi');
      this.$dateFrom = this.$datepicker.find('.js-date-dropdown__input-from');
      this.$dateTo = this.$datepicker.find('.js-date-dropdown__input-to');
    }
  }
}

export default AirDatepicker;
