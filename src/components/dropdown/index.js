import consts from '~constants/consts';

import Dropdown from './Dropdown';

$(document).ready(() => {
  const dropdownGuests = new Dropdown(
    '.js-dropdown__wrapper_guests',
    consts.setSelectionGuestsText,
    'Сколько гостей',
  );

  dropdownGuests.init();

  const dropdownConveniences = new Dropdown(
    '.js-dropdown__wrapper_conveniences',
    consts.setSelectionConveniencesText,
    'Выберите удобства',
  );

  dropdownConveniences.init();
});
