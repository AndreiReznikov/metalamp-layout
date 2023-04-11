class CheckboxList {
  init() {
    this._findElements();
    this._toggleLists();
    this._openListsDefault();
  }

  _findElements() {
    this.$listsCollection = $('.js-checkbox-list');
    this.$openedListsCollection = $('.js-checkbox-list__title_expandable.js-checkbox-list__title_opened');
  }

  _toggleLists() {
    this.$listsCollection.each(function toggleLists() {
      const $expandableList = $(this);

      const $title = $expandableList.find('.js-checkbox-list__title_expandable');
      const $list = $expandableList.find('.js-checkbox-list__list');
      const $arrow = $expandableList.find('.js-checkbox-list__arrow');

      const handleTitleToggleList = () => {
        $list.toggleClass('checkbox-list__list_opened');
        $arrow.toggleClass('checkbox-list__arrow_transformed');
      };

      $title.click(handleTitleToggleList);
    });
  }

  _openListsDefault() {
    this.$openedListsCollection.each(function openListsDefault() {
      const $openedList = $(this);

      $openedList.trigger('click');
    });
  }
}

export default CheckboxList;
