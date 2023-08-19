import CheckboxList from './CheckboxList';

const initializeCheckboxList = () => {
  const checkboxList = new CheckboxList();
  checkboxList.init();
};

$(document).on('ready', initializeCheckboxList());
