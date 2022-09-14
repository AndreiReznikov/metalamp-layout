import 'air-datepicker/dist/js/datepicker';
import 'air-datepicker/dist/css/datepicker.css';

const $dateDropdownsCollection = $('.js-date-dropdown-container');

$dateDropdownsCollection.each(function () {
  const $dateDropdown = $(this);
  const dateDropdownInput = $dateDropdown.find('.js-datepicker-multi');
  const dateFrom = $dateDropdown.find('.js-date-from');
  const dateTo = $dateDropdown.find('.js-date-to');

  dateDropdownInput.datepicker({
    clearButton: true,
    keyboardNav: true,
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
    },
    navTitles: { days: 'MM <i>yyyy</i>' },
    prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
    nextHtml: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0.984375L17.0156 9L9 17.0156L7.59375 15.6094L13.1719 9.98438H0.984375V8.01562H13.1719L7.59375 2.39062L9 0.984375Z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="9" y1="-13" x2="9" y2="31" gradientUnits="userSpaceOnUse"><stop stop-color="#BC9CFF"/><stop offset="1" stop-color="#8BA4F9"/></linearGradient></defs></svg>',
  });

  const datepicker = dateDropdownInput.data('datepicker');
  const datepickerElements = datepicker.$datepicker;

  dateFrom.click(() => datepicker.show());
  dateTo.click(() => datepicker.show());

  const $applyButton = $('<span class=\'datepicker--button\'>Применить</span>');

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
  };

  setDefaultDates();

  const isDateFromEmpty = $(dateFrom).data('from-empty');
  const isDateToEmpty = $(dateTo).data('to-empty');

  const setEmptyValue = (element) => element.val('');

  if (isDateFromEmpty) setEmptyValue($(dateFrom));
  if (isDateToEmpty) setEmptyValue($(dateTo));
});
