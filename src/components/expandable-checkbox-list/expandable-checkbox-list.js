class ExpandableCheckboxList {
  constructor() {
    this._findLists();
    this._transformLists();
    this._openListsDefault();
  }

  _findLists() {
    this.$lists = $('.js-expandable-checkbox-list');
    this.$openedLists = $('.js-expandable-checkbox-list__title_opened');
  }

  _transformLists() {
    this.$lists.each(function () {
      const $expandableList = $(this);

      const $title = $($expandableList.find('.js-expandable-checkbox-list__title'));
      const $list = $($expandableList.find('.js-expandable-checkbox-list__list'));
      const $arrow = $($expandableList.find('.js-expandable-checkbox-list__arrow'));

      const handleTitleTransformList = () => {
        $list.toggleClass('expandable-checkbox-list__list_opened');
        $arrow.toggleClass('expandable-checkbox-list__arrow_transformed');
      };

      $title.click(handleTitleTransformList);
    });
  }

  _openListsDefault() {
    this.$openedLists.each(function () {
      const $openedList = $(this);

      $openedList.trigger('click');
    });
  }
}

export default ExpandableCheckboxList;
