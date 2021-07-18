import 'air-datepicker/dist/js/datepicker.js'
import 'air-datepicker/dist/css/datepicker.css'

$(document).ready(function() {
  const $filterDropdownsCollection = $('.js-filter-date-dropdown');

  $filterDropdownsCollection.each(function() {
    const $filterDateDropdown = $(this);

    const filterDropdownInput = $filterDateDropdown.find('.js-filter-date-dropdown__input');

    filterDropdownInput.datepicker({
      range: true,
      clearButton: true,
      dateFormat: 'd M',
      onShow: () => {
        const $calendar = $('.datepicker');
        const inputPadding = 15;
        const width = filterDropdownInput.width() + inputPadding;

        $calendar.width(width);
      }
    });

    if ($('.js-filter-date-dropdown__input_opened').length > 0) {
      const filterDropdownOpened = $filterDateDropdown.find('.js-filter-date-dropdown__input_opened');

      const datepickerOpened = filterDropdownOpened.data('datepicker');

      datepickerOpened.show();
    };

    const datepicker = filterDropdownInput.data('datepicker');
    const filterDropdownElements = datepicker.$datepicker;

    const $applyButton = $(`<span class='datepicker--button'>Применить</span>`);

    filterDropdownElements.find('.datepicker--buttons').append($applyButton);

    const hideDatepicker = () => {
      if (datepicker.selectedDates.length < 2) return;
      datepicker.hide();
    };

    $applyButton.click(() => hideDatepicker());

    const setDefaultDates = () => {   
      const dateFromVal = $(filterDropdownInput).data('from');
      const dateToVal = $(filterDropdownInput).data('to');
      
      datepicker.selectDate([eval(dateFromVal), eval(dateToVal)]);
    }

    setDefaultDates();
  });
});
