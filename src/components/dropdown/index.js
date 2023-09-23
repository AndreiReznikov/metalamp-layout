import consts from '~constants/consts';

import Dropdown from './Dropdown';

const initializeDropdowns = () => {
  const dropdownGuests = new Dropdown(
    '.js-dropdown_guests',
    consts.setSelectionGuestsText,
    'Сколько гостей',
  );

  dropdownGuests.init();

  const dropdownConveniences = new Dropdown(
    '.js-dropdown_conveniences',
    consts.setSelectionConveniencesText,
    'Выберите удобства',
  );

  dropdownConveniences.init();
};

document.addEventListener('DOMContentLoaded', initializeDropdowns());
