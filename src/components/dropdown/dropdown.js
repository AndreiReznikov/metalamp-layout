class Dropdown {
  constructor(element, setSelectionText, selectionDefaultText) {
    this.totalSum = 0;
    this.selectionDefaultText = selectionDefaultText || '';
    this.setSelectionText = setSelectionText;

    this._findElement(element);
    this._setSelectionDefaultText();
    this._toggleMenu();
    this._openMenuDefault();
    this._addCounters();
    this._changeCounterValue();
    this._clickCountButtonsDefault();
  }

  _addCounters() {
    this.$optionsCollection.append('<div class="dropdown__counter"></div>');
    const $counter = this.$optionsCollection.find('.dropdown__counter');

    $counter.append(
      '<span class="dropdown__counter-decrement dropdown__counter-decrement_dim js-dropdown__counter-decrement">-</span>',
    ).append(
      '<span class="dropdown__counter-value js-dropdown__counter-value">0</span>',
    ).append(
      '<span class="dropdown__counter-increment js-dropdown__counter-increment">+</span>',
    );
  }

  _setSelectionDefaultText() {
    this.$selectionCollection.text(this.selectionDefaultText);
  }

  _toggleMenu() {
    this.$dropdownsCollection.each(function () {
      const $dropdown = $(this);
      const $selection = $dropdown.find('.js-dropdown__selection');
      const $applyButton = $dropdown.find('.js-dropdown__apply-button');
      const $menu = $dropdown.find('.js-dropdown__menu');

      const handleSelectionToggleMenu = () => {
        $dropdown.toggleClass('dropdown__wrapper_opened');
        $menu.toggleClass('dropdown__menu_visible');
      };

      const elements = [$selection, $applyButton];

      elements.forEach(($element) => $element.click(handleSelectionToggleMenu));
    });
  }

  _openMenuDefault() {
    this.$dropdownsCollection.each(function () {
      const $dropdown = $(this);
      const $selection = $dropdown.find('.js-dropdown__selection');
      const isDropdownOpened = $dropdown.hasClass('dropdown__wrapper_opened');

      if (isDropdownOpened) {
        $selection.trigger('click');
        $dropdown.addClass('dropdown__wrapper_opened');
      }
    });
  }

  _changeCounterValue() {
    const setSelectionText = this.setSelectionText || ((itemsCount, totalSum) => `${totalSum} items`);
    const changeSelectionText = (element, callback) => element.text(callback);

    this.$dropdownsCollection.each(function () {
      const $dropdown = $(this);
      const $selection = $dropdown.find('.js-dropdown__selection');
      const $optionsCollection = $dropdown.find('.js-dropdown__option');
      const $clearButton = $dropdown.find('.js-dropdown__clear-button');

      let totalSum = 0;
      let itemsCount = [];

      $optionsCollection.each(function (index) {
        const $option = $(this);
        const $minus = $option.find('.js-dropdown__counter-decrement');
        const $plus = $option.find('.js-dropdown__counter-increment');
        const $value = $option.find('.js-dropdown__counter-value');

        const getOptionCount = () => {
          const valueCount = Number($value.text());

          return valueCount;
        };

        const handleMinusDecrementValue = () => {
          $value.text(`${getOptionCount() - 1}`);

          if (getOptionCount() === 0) {
            $minus.addClass('dropdown__counter-decrement_dim');
          }

          if (getOptionCount() < 0) {
            $value.text('0');
            return;
          }

          itemsCount[index] = getOptionCount();

          totalSum -= 1;

          if (totalSum === 0) {
            $clearButton.removeClass('dropdown__clear-button_visible');
          }

          changeSelectionText($selection, setSelectionText(itemsCount, totalSum));
        };

        const handlePlusIncrementValue = () => {
          $value.text(`${getOptionCount() + 1}`);

          itemsCount[index] = getOptionCount();

          totalSum += 1;

          changeSelectionText($selection, setSelectionText(itemsCount, totalSum));

          $minus.removeClass('dropdown__counter-decrement_dim');
          $clearButton.addClass('dropdown__clear-button_visible');
        };

        const handleClearButtonClearCount = () => {
          itemsCount = [];
          totalSum = 0;
          $value.text(0);
          $minus.addClass('dropdown__counter-decrement_dim');
          $clearButton.removeClass('dropdown__clear-button_visible');
          changeSelectionText($selection, setSelectionText(itemsCount, totalSum));
        };

        $minus.click(handleMinusDecrementValue);
        $plus.click(handlePlusIncrementValue);
        $clearButton.click(handleClearButtonClearCount);
      });
    });
  }

  _clickCountButtonsDefault() {
    this.$dropdownsCollection.each(function () {
      const $dropdown = $(this);
      const $plusButtons = $dropdown.find('.js-dropdown__counter-increment');

      const buttonsNums = $dropdown.data('buttons');
      const clicksNums = $dropdown.data('clicks');

      if (buttonsNums && clicksNums) {
        for (let i = 0; i < buttonsNums.length; i += 1) {
          const $plusButton = $($plusButtons[buttonsNums[i]]);

          for (let j = 0; j < clicksNums[i]; j += 1) {
            $plusButton.trigger('click');
          }
        }
      }
    });
  }

  _findElement(element) {
    this.$dropdownsCollection = $(element);
    this.$selectionCollection = this.$dropdownsCollection.find('.js-dropdown__selection');
    this.$optionsCollection = this.$dropdownsCollection.find('.js-dropdown__option');
  }
}

const setSelectionGuestsText = (itemsCount, totalSum) => {
  let guests;
  let babies;

  const babiesNumber = itemsCount[2] ? itemsCount[2] : 0;

  const firstGuestWordCondition = (totalSum - babiesNumber)
    % 10 === 1 && (totalSum - babiesNumber) !== 11;
  const secondGuestWordCondition = [2, 3, 4].includes((totalSum - babiesNumber) % 10)
    && ![12, 13, 14].includes(totalSum - babiesNumber);

  if (totalSum === 0) return 'Сколько гостей';

  if (firstGuestWordCondition) guests = 'гость';
  else if (secondGuestWordCondition) guests = 'гостя';
  else guests = 'гостей';

  const firstBabyWordCondition = babiesNumber % 10 === 1 && babiesNumber !== 11;
  const secondBabyWordCondition = [2, 3, 4].includes(babiesNumber % 10)
    && ![12, 13, 14].includes(babiesNumber);

  if (firstBabyWordCondition) babies = 'младенец';
  else if (secondBabyWordCondition) babies = 'младенца';
  else babies = 'младенцев';

  const babiesOnly = babiesNumber !== 0 && (totalSum - babiesNumber) === 0;
  const babiesAndGuests = babiesNumber !== 0 && (totalSum - babiesNumber) !== 0;

  let selectionText = `${totalSum} ${guests}`;

  if (babiesOnly) selectionText = `${babiesNumber} ${babies}`;
  else if (babiesAndGuests) selectionText = `${totalSum - babiesNumber} ${guests}, ${babiesNumber} ${babies}`;

  return selectionText;
};

const setSelectionConveniencesText = (itemsCount, totalSum) => {
  let bedrooms;
  let beds;
  let bathrooms;

  const bedroomsNumber = itemsCount[0] ? itemsCount[0] : 0;
  const bedsNumber = itemsCount[1] ? itemsCount[1] : 0;
  const bathroomsNumber = itemsCount[2] ? itemsCount[2] : 0;

  const firstBedroomWordCondition = bedroomsNumber !== 0
    && bedroomsNumber % 10 === 1 && bedroomsNumber !== 11;
  const secondBedroomWordCondition = [2, 3, 4].includes(bedroomsNumber % 10)
    && ![12, 13, 14].includes(bedroomsNumber);

  if (totalSum === 0) return 'Выберите удобства';

  if (firstBedroomWordCondition) bedrooms = 'спальня';
  else if (secondBedroomWordCondition) bedrooms = 'спальни';
  else bedrooms = 'спален';

  const firstBedWordCondition = bedsNumber !== 0 && bedsNumber % 10 === 1 && bedsNumber !== 11;
  const secondBedWordCondition = [2, 3, 4].includes(bedsNumber % 10)
    && ![12, 13, 14].includes(bedsNumber);

  if (firstBedWordCondition) beds = 'кровать';
  else if (secondBedWordCondition) beds = 'кровати';
  else beds = 'кроватей';

  const firstBathroomWordCondition = bathroomsNumber !== 0
    && bathroomsNumber % 10 === 1 && bathroomsNumber !== 11;
  const secondBathroomWordCondition = [2, 3, 4].includes(bathroomsNumber % 10)
    && ![12, 13, 14].includes(bathroomsNumber);

  if (firstBathroomWordCondition) bathrooms = 'ванная комната';
  else if (secondBathroomWordCondition) bathrooms = 'ванные комнаты';
  else bathrooms = 'ванных комнат';

  const bedroomsOnly = bedroomsNumber !== 0
    && totalSum - bedroomsNumber === 0;
  const bedsOnly = bedsNumber !== 0 && totalSum - bedsNumber === 0;
  const bathroomsOnly = bathroomsNumber !== 0
    && totalSum - bathroomsNumber === 0;
  const bedroomsAndBeds = bedroomsNumber !== 0
    && bedsNumber !== 0 && totalSum - bedroomsNumber - bedsNumber === 0;
  const bedroomsAndBathrooms = bedroomsNumber !== 0
    && bathroomsNumber !== 0 && totalSum - bedroomsNumber - bathroomsNumber === 0;
  const bedsAndBathrooms = bedsNumber !== 0
    && bathroomsNumber !== 0 && totalSum - bedsNumber - bathroomsNumber === 0;
  const allConveniences = bedroomsNumber !== 0
    && bedsNumber !== 0 && bathroomsNumber !== 0;

  let selectionText = '';

  if (bedroomsOnly) selectionText = `${bedroomsNumber} ${bedrooms}...`;
  else if (bedsOnly) selectionText = `${bedsNumber} ${beds}...`;
  else if (bathroomsOnly) selectionText = `${bathroomsNumber} ${bathrooms}...`;
  else if (bedroomsAndBeds) selectionText = `${bedroomsNumber} ${bedrooms}, ${bedsNumber} ${beds}...`;
  else if (bedroomsAndBathrooms) selectionText = `${bedroomsNumber} ${bedrooms}, ${bathroomsNumber} ${bathrooms}...`;
  else if (bedsAndBathrooms) selectionText = `${bedsNumber} ${beds}, ${bathroomsNumber} ${bathrooms}...`;
  else if (allConveniences) selectionText = `${bedroomsNumber} ${bedrooms}, ${bedsNumber} ${beds}, ${bathroomsNumber} ван...`;

  return selectionText;
};

const dropdownGuests = new Dropdown('.js-dropdown__wrapper_guests', setSelectionGuestsText, 'Сколько гостей');
const dropdownConveniences = new Dropdown('.js-dropdown__wrapper_conveniences', setSelectionConveniencesText, 'Выберите удобства');
