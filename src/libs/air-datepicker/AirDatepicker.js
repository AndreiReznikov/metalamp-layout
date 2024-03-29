import 'air-datepicker/dist/js/datepicker';
import 'air-datepicker/dist/css/datepicker.css';

class AirDatepicker {
  constructor(element, size) {
    this.size = size;
    this._findElement(element);
  }

  initializePlugin(options) {
    const { size } = this;
    const showClearButton = this.showClearButton.bind(this);

    this.$datepickerCollection.each(function initializePlugin() {
      const $datepicker = $(this);
      let $datepickerInput;

      if ($datepicker.hasClass('js-date-dropdown')) {
        $datepickerInput = $datepicker.find('.js-date-dropdown__input');
      } else {
        $datepickerInput = $datepicker.find('.js-filter-date-dropdown__input');
      }

      const $dateFrom = $datepicker.find('.js-date-dropdown__input-from');
      const $dateTo = $datepicker.find('.js-date-dropdown__input-to');

      let cellWidth = 0;

      const handleCalendarCalculateCellHeight = () => {
        const $cell = $('.datepicker--cell');

        cellWidth = $cell.width();
      };

      const handleCalendarSetCellHeight = () => {
        const $cell = $('.datepicker--cell');

        $cell.height(cellWidth);
      };

      const handleDatepickerSetCalendarWidth = () => {
        const $calendar = $('.datepicker');

        if (size === 'S') {
          $calendar.addClass('datepicker_size_s');
        } else {
          $calendar.removeClass('datepicker_size_s');
        }

        $calendar.on('click', handleCalendarSetCellHeight);

        handleCalendarCalculateCellHeight();
        handleCalendarSetCellHeight();
      };

      let isDatepickerVisible = false;

      const handleInputShowDatepicker = () => {
        const datepicker = $datepickerInput.data('datepicker');
        const hideDatepicker = () => datepicker.hide();
        const showDatepicker = () => datepicker.show();

        const bindClickEvents = (eventType = 'show') => {
          const unbindEventType = `click.${eventType}`;

          $datepickerInput.off(unbindEventType);
          $dateFrom.off(unbindEventType);
          $dateTo.off(unbindEventType);

          const bindEventType = eventType === 'show' ? 'click.hide' : 'click.show';
          const datepickerMethod = eventType === 'show' ? hideDatepicker : showDatepicker;

          $datepickerInput.on(bindEventType, datepickerMethod);
          $dateFrom.on(bindEventType, datepickerMethod);
          $dateTo.on(bindEventType, datepickerMethod);
        };

        if (isDatepickerVisible) {
          bindClickEvents('show');
        } else {
          bindClickEvents('hide');
        }
      };

      const {
        range,
        clearButton,
        dateFormat,
        keyboardNav,
        navTitles,
        prevHtml,
        nextHtml,
      } = options;

      $datepickerInput.datepicker({
        range,
        clearButton,
        dateFormat,
        keyboardNav,
        navTitles,
        prevHtml,
        nextHtml,
        minDate: new Date(),
        onSelect: (date) => {
          const dates = date.split(' - ');
          const [dateFrom, dateTo] = dates;

          $dateFrom.val(dateFrom);
          $dateTo.val(dateTo);

          showClearButton('fade');
        },
        onShow: () => {
          handleInputShowDatepicker();
          isDatepickerVisible = true;
          handleDatepickerSetCalendarWidth();
          showClearButton();
        },
        onHide: () => {
          handleInputShowDatepicker();
          isDatepickerVisible = false;
        },
        onChangeMonth: handleDatepickerSetCalendarWidth,
        onChangeYear: handleDatepickerSetCalendarWidth,
        onChangeDecade: handleDatepickerSetCalendarWidth,
        onChangeView: handleDatepickerSetCalendarWidth,
      });
    });
  }

  openDatepickerDefault() {
    if (this.$datepickerOpened.length > 0) {
      this.datepickerOpened = this.$datepickerOpened.data('datepicker');

      this.datepickerOpened.show();
    }
  }

  openDatepickerMultiple() {
    if (this.$datepickerCollection.hasClass('js-date-dropdown')) {
      this.$datepickerCollection.each(function openDatepickerMultiple() {
        const $datepicker = $(this);
        const $datepickerInput = $datepicker.find('.js-date-dropdown__input');
        const $dateFrom = $datepicker.find('.js-date-dropdown__input-from');
        const $dateTo = $datepicker.find('.js-date-dropdown__input-to');
        const datepicker = $datepickerInput.data('datepicker');

        const handleDateFromOrDateToShowDatepicker = () => datepicker.show();

        $dateFrom.on('click', handleDateFromOrDateToShowDatepicker);
        $dateTo.on('click', handleDateFromOrDateToShowDatepicker);
      });
    }
  }

  setDatesDefault() {
    this.$datepickerCollection.each(function setDatesDefault() {
      const $datepicker = $(this);
      let $datepickerInput;

      if ($datepicker.hasClass('js-date-dropdown')) {
        $datepickerInput = $datepicker.find('.js-date-dropdown__input');
      } else {
        $datepickerInput = $datepicker.find('.js-filter-date-dropdown__input');
      }

      const userDateFrom = $datepickerInput.data('from');
      const userDateTo = $datepickerInput.data('to');

      if (!userDateFrom || !userDateTo) return;

      const dateFrom = new Date(userDateFrom);
      const dateTo = new Date(userDateTo);

      if (dateFrom < new Date() || dateTo < new Date()) return;

      const datepicker = $datepickerInput.data('datepicker');
      datepicker.selectDate([dateFrom, dateTo]);
    });
  }

  checkEmptyValue() {
    if (this.$datepickerCollection.hasClass('js-date-dropdown')) {
      this.$datepickerCollection.each(function checkEmptyValue() {
        const $datepicker = $(this);
        const $dateFrom = $datepicker.find('.js-date-dropdown__input-from');
        const $dateTo = $datepicker.find('.js-date-dropdown__input-to');
        const isFromEmpty = $dateFrom.data('from-empty');
        const isToEmpty = $dateTo.data('to-empty');

        const setEmptyValue = (element) => element.val('');

        if (isFromEmpty) setEmptyValue($dateFrom);
        if (isToEmpty) setEmptyValue($dateTo);
      });
    }
  }

  showClearButton(animationType = 'show') {
    this.$datepickerCollection.each(function showClearButton() {
      const $datepicker = $(this);

      let $datepickerInput;

      if ($datepicker.hasClass('js-date-dropdown')) {
        $datepickerInput = $datepicker.find('.js-date-dropdown__input');
      } else {
        $datepickerInput = $datepicker.find('.js-filter-date-dropdown__input');
      }

      const datepicker = $datepickerInput.data('datepicker');
      const datepickerElements = datepicker.$datepicker;

      const $clearButton = datepickerElements.find('[data-action="clear"]');

      if (datepicker.selectedDates.length < 1) {
        const hideButton = animationType === 'fade'
          ? $clearButton.fadeOut.bind($clearButton)
          : $clearButton.hide.bind($clearButton);
        hideButton();

        return;
      }

      const showButton = animationType === 'fade'
        ? $clearButton.fadeIn.bind($clearButton)
        : $clearButton.show.bind($clearButton);
      showButton();
    });
  }

  addApplyButton() {
    this.$datepickerCollection.each(function addApplyButton() {
      const $datepicker = $(this);
      let $datepickerInput;

      if ($datepicker.hasClass('js-date-dropdown')) {
        $datepickerInput = $datepicker.find('.js-date-dropdown__input');
      } else {
        $datepickerInput = $datepicker.find('.js-filter-date-dropdown__input');
      }

      const datepicker = $datepickerInput.data('datepicker');
      const datepickerElements = datepicker.$datepicker;
      const $applyButton = $(
        '<span data-action="selectDate" class=\'datepicker--button\'>Применить</span>',
      );

      datepickerElements.find('.datepicker--buttons').append($applyButton);

      const handleApplyButtonHideDatepicker = () => {
        if (datepicker.selectedDates.length < 2) return;
        datepicker.hide();
      };

      $applyButton.on('click', handleApplyButtonHideDatepicker);
    });
  }

  _findElement(element) {
    this.$datepickerCollection = $(element);

    if (element === '.js-filter-date-dropdown') {
      this.$datepickerOpened = this.$datepickerCollection.find(
        '.js-filter-date-dropdown__input_opened',
      );
    }
  }
}

export default AirDatepicker;
