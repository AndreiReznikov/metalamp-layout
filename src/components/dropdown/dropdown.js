class Dropdown {
  constructor(element, setSelectionText, selectionDefaultText) {
    this.totalSum = 0;
    this.selectionDefaultText = selectionDefaultText || '';
    this.setSelectionText = setSelectionText;

    this._findElements(element);
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
      '<span class="dropdown__counter-value js-dropdown__counter-value">0</span>',
      '<span class="dropdown__counter-increment js-dropdown__counter-increment">+</span>',
    );
  }

  _setSelectionDefaultText() {
    this.$selectionCollection.text(this.selectionDefaultText);
  }

  _toggleMenu() {
    this.$dropdownsCollection.each(function toggleMenu() {
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
    this.$dropdownsCollection.each(function openMenuDefault() {
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

    this.$dropdownsCollection.each(function changeCounterValue() {
      const $dropdown = $(this);
      const $selection = $dropdown.find('.js-dropdown__selection');
      const $optionsCollection = $dropdown.find('.js-dropdown__option');
      const $clearButton = $dropdown.find('.js-dropdown__clear-button');

      let totalSum = 0;
      let itemsCount = [];

      $optionsCollection.each(function changeValue(index) {
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
    this.$dropdownsCollection.each(function clickCountButtonsDefault() {
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

  _findElements(element) {
    this.$dropdownsCollection = $(element);
    this.$selectionCollection = this.$dropdownsCollection.find('.js-dropdown__selection');
    this.$optionsCollection = this.$dropdownsCollection.find('.js-dropdown__option');
  }
}

export default Dropdown;
