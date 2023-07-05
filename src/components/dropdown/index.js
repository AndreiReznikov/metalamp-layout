import vars from '~templates/vars';

import Dropdown from './Dropdown';

$(document).ready(() => {
  const dropdownGuests = new Dropdown(
    '.js-dropdown__wrapper_guests',
    vars.setSelectionGuestsText,
    'Сколько гостей',
  );

  dropdownGuests.init();

  const dropdownConveniences = new Dropdown(
    '.js-dropdown__wrapper_conveniences',
    vars.setSelectionConveniencesText,
    'Выберите удобства',
  );

  dropdownConveniences.init();
});
