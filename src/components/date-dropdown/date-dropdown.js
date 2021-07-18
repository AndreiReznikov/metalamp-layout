import 'air-datepicker/dist/js/datepicker.js'
import 'air-datepicker/dist/css/datepicker.css'

$(document).ready(function() {
  const $dateDropdownsCollection = $('.js-date-dropdown-container');

  $dateDropdownsCollection.each(function() {
    
    const $dateDropdown = $(this);
    const dateDropdownInput = $dateDropdown.find('.js-datepicker-multi');
    const dateFrom = $dateDropdown.find('.js-date-from');
    const dateTo = $dateDropdown.find('.js-date-to');
    
    dateDropdownInput.datepicker({
      clearButton: true,
      onSelect: (date) => {
        const dates = date.split(' - ');
        dateFrom.val(dates[0]);
        dateTo.val(dates[1]);
      },
      onShow: () => {
        const $calendar = $('.datepicker');
        const bordersWidth = 2;
        const width = $dateDropdown.width() - bordersWidth;

        $calendar.width(width);
      }
    });

    dateFrom.click(() => datepicker.show());
    dateTo.click(() => datepicker.show());
    
    const datepicker = dateDropdownInput.data('datepicker');
    const datepickerElements = datepicker.$datepicker;
  
    const $applyButton = $(`<span class='datepicker--button'>Применить</span>`);

    datepickerElements.find('.datepicker--buttons').append($applyButton);
  
    const hideDatepicker = () => {
      if (datepicker.selectedDates.length < 2) return;
      datepicker.hide();
    };

    $applyButton.click(() => hideDatepicker());

    const setDefaultDates = () => {   
      const dateFromVal = $(dateDropdownInput).data('from');
      const dateToVal = $(dateDropdownInput).data('to');
      
      datepicker.selectDate([eval(dateFromVal), eval(dateToVal)]);
    }

    setDefaultDates();

    const isDateFromEmpty = $(dateFrom).data('from-empty');
    const isDateToEmpty = $(dateTo).data('to-empty');

    const setEmptyValue = element => element.val('');

    if (isDateFromEmpty) setEmptyValue($(dateFrom));
    if (isDateToEmpty) setEmptyValue($(dateTo));
  });
});