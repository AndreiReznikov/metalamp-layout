class Dropdown {
  constructor(element, setSelectionText, selectionDefaultText) {
    this.selectionDefaultText = selectionDefaultText || '';
    this.setSelectionText = setSelectionText;

    this._findElements(element);
  }

  init() {
    this._setSelectionDefaultText();
    this._openMenuDefault();
    this._addCounters();
    this._changeCounterValue();
    this._clickCountButtonsDefault();
    this._toggleMenu();
  }

  _addCounters() {
    this.$optionsCollection.append('<div class="dropdown__counter"></div>');
    const $counter = this.$optionsCollection.find('.dropdown__counter');

    $counter.append(
      '<span class="dropdown__counter-decrement dropdown__counter-decrement_dim js-dropdown__counter-decrement"></span>',
      '<input class="dropdown__counter-value js-dropdown__counter-value" value="0" type="number" readonly></input>',
      '<span class="dropdown__counter-increment js-dropdown__counter-increment"></span>',
    );
  }

  _setSelectionDefaultText() {
    this.$selectionCollection.val(this.selectionDefaultText);
  }

  _toggleMenu() {
    const handleDocumentToggleMenu = (event) => {
      const $target = $(event.target);
      const isClickOnMenuOrApplyButton = $target.closest('.js-dropdown__menu').length
        && !$target.closest('.js-dropdown__apply-button').length;
      const isClickOnDropdown = $target.closest('.js-dropdown').length;

      if (isClickOnMenuOrApplyButton) return;

      const toggleDropdownMenu = ($dropdown) => $dropdown.toggleClass('dropdown_opened');

      const removeDropdownMenu = ($dropdown) => $dropdown.removeClass('dropdown___opened');

      let $dropdown = $(this);
      let $menu = $dropdown.find('.js-dropdown__menu');
      let $applyButton = $dropdown.find(
        '.js-dropdown__apply-button .button__text',
      );

      if (isClickOnDropdown) {
        this.$dropdownsCollection.each(function toggleMenu() {
          $dropdown = $(this);
          $menu = $dropdown.find('.js-dropdown__menu');
          $applyButton = $dropdown.find(
            '.js-dropdown__apply-button .button__text',
          );

          const isClickOnDropdownOrApplyButton = $target
            .closest('.js-dropdown')
            .is($dropdown.closest('.js-dropdown'))
            || $target.is($applyButton);

          const totalSum = $dropdown.data('total-sum');

          if (isClickOnDropdownOrApplyButton) {
            if ($target.is($applyButton) && totalSum === 0) return;

            toggleDropdownMenu($dropdown, $menu);
          } else {
            removeDropdownMenu($dropdown, $menu);
          }
        });
      } else {
        this.$dropdownsCollection.each(function toggleMenu() {
          $dropdown = $(this);
          $menu = $dropdown.find('.js-dropdown__menu');

          removeDropdownMenu($dropdown, $menu);
        });
      }
    };

    this.$document.on('click', handleDocumentToggleMenu);
  }

  _openMenuDefault() {
    this.$dropdownsCollection.each(function openMenuDefault() {
      const $dropdown = $(this);
      const isDropdownOpened = $dropdown.hasClass('dropdown_opened');

      if (isDropdownOpened) {
        $dropdown.addClass('dropdown_opened');
      }
    });
  }

  _changeCounterValue() {
    const setSelectionText = this.setSelectionText || ((itemsCount, totalSum) => `${totalSum} items`);
    const changeSelectionText = (element, callback) => element.val(callback);

    this.$dropdownsCollection.each(function changeCounterValue() {
      const $dropdown = $(this);
      const $selection = $dropdown.find('.js-dropdown__selection');
      const $optionsCollection = $dropdown.find('.js-dropdown__option');
      const $clearButton = $dropdown.find('.js-dropdown__clear-button');

      let totalSum = 0;
      let itemsCount = [];

      const setSumToData = (sum = 0) => {
        $dropdown.data('total-sum', sum);
      };

      setSumToData(totalSum);

      $optionsCollection.each(function changeValue(index) {
        const $option = $(this);
        const $minus = $option.find('.js-dropdown__counter-decrement');
        const $plus = $option.find('.js-dropdown__counter-increment');
        const $value = $option.find('.js-dropdown__counter-value');

        const getOptionCount = () => {
          const valueCount = Number($value.val());

          return valueCount;
        };

        const changeValueWidth = () => {
          $value.css('width', `${$value.val().length * 10}px`);
        };

        changeValueWidth();

        const handleMinusDecrementValue = () => {
          $value.val(getOptionCount() - 1);
          changeValueWidth();

          if (getOptionCount() === 0) {
            $minus.addClass('dropdown__counter-decrement_dim');
          }

          if (getOptionCount() < 0) {
            $value.val(0);
            return;
          }

          itemsCount[index] = getOptionCount();

          totalSum -= 1;

          if (totalSum === 0) {
            $clearButton.fadeOut();
          }

          changeSelectionText(
            $selection,
            setSelectionText(itemsCount, totalSum),
          );
          setSumToData(totalSum);
        };

        const handlePlusIncrementValue = () => {
          $value.val(getOptionCount() + 1);
          changeValueWidth();

          itemsCount[index] = getOptionCount();

          totalSum += 1;

          changeSelectionText(
            $selection,
            setSelectionText(itemsCount, totalSum),
          );

          $minus.removeClass('dropdown__counter-decrement_dim');
          $clearButton.fadeIn();

          setSumToData(totalSum);
        };

        const handleClearButtonClearCount = () => {
          itemsCount = [];
          totalSum = 0;
          $value.val(0);
          changeValueWidth();
          $minus.addClass('dropdown__counter-decrement_dim');
          $clearButton.fadeOut();
          changeSelectionText(
            $selection,
            setSelectionText(itemsCount, totalSum),
          );
          setSumToData(totalSum);
        };

        $minus.on('click', handleMinusDecrementValue);
        $plus.on('click', handlePlusIncrementValue);
        $clearButton.on('click', handleClearButtonClearCount);
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
        buttonsNums.forEach((index) => {
          const $plusButton = $($plusButtons[buttonsNums[index]]);

          const clicks = new Array(clicksNums[index]).fill(0);

          clicks.forEach(() => {
            $plusButton.trigger('click');
          });
        });
      }
    });
  }

  _findElements(element) {
    this.$document = $(document);
    this.$dropdownsCollection = $(element);
    this.$selectionCollection = this.$dropdownsCollection.find(
      '.js-dropdown__selection',
    );
    this.$optionsCollection = this.$dropdownsCollection.find(
      '.js-dropdown__option',
    );
  }
}

export default Dropdown;
