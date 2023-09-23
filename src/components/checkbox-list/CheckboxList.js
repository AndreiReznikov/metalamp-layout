class CheckboxList {
  init() {
    this._findElements();
    this._toggleLists();
  }

  _findElements() {
    this.$listsCollection = $('.js-checkbox-list_expandable');
  }

  _toggleLists() {
    this.$listsCollection.each(function toggleLists() {
      const $expandableList = $(this);

      const handleTitleToggleList = (event) => {
        const $target = $(event.target);

        if (!$target.hasClass('checkbox-list__title')) return;

        $expandableList.toggleClass('checkbox-list_opened');
      };

      $expandableList.on('click', handleTitleToggleList);
    });
  }
}

export default CheckboxList;
