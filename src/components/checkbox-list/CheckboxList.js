class CheckboxList {
  init() {
    this._findElements();
    this._toggleLists();
  }

  _findElements() {
    this.$listsCollection = $('.js-checkbox-list');
    this.$openedListsCollection = $('.js-checkbox-list__title_expandable.js-checkbox-list__title_opened');
  }

  _toggleLists() {
    this.$listsCollection.each(function toggleLists() {
      const $expandableList = $(this);

      const $title = $expandableList.find('.js-checkbox-list__title_expandable');

      const handleTitleToggleList = () => $title.toggleClass('js-checkbox-list__title_opened');

      $title.on('click', handleTitleToggleList);
    });
  }
}

export default CheckboxList;
