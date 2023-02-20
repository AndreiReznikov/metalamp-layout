class ExpandableCheckboxList {
  init() {
    this._findElements();
    this._toggleLists();
    this._openListsDefault();
  }

  _findElements() {
    this.$listsCollection = $('.js-expandable-checkbox-list');
    this.$openedListsCollection = $('.js-expandable-checkbox-list__title_opened');
  }

  _toggleLists() {
    this.$listsCollection.each(function toggleLists() {
      const $expandableList = $(this);

      const $title = $expandableList.find('.js-expandable-checkbox-list__title');
      const $list = $expandableList.find('.js-expandable-checkbox-list__list');
      const $arrow = $expandableList.find('.js-expandable-checkbox-list__arrow');

      const handleTitleToggleList = () => {
        $list.toggleClass('expandable-checkbox-list__list_opened');
        $arrow.toggleClass('expandable-checkbox-list__arrow_transformed');
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

export default ExpandableCheckboxList;
