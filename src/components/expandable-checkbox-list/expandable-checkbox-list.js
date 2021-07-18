$(document).ready(function() {
  const $expandableListsCollection = $('.js-expandable-checkbox-list');
  const $openedListsCollection = $('.js-expandable-checkbox-list__title_opened');
  
  $expandableListsCollection.each(function() {
    const $expandableList = $(this);

    const $listTitle = $($expandableList.find('.js-expandable-checkbox-list__title'));
    const $checkboxList = $($expandableList.find('.js-expandable-checkbox-list__list'));
    const $listArrow = $($expandableList.find('.js-expandable-checkbox-list__arrow'));
    
    const showList = () => {$checkboxList.toggleClass('js-expandable-checkbox-list__list_opened')};
    const transformArrow = () => {$listArrow.toggleClass('js-expandable-checkbox-list__arrow_transformed')};

    $listTitle.click(() => {showList(), transformArrow()});
  });

  $openedListsCollection.each(function() {
    const $openedList = $(this);

    $openedList.trigger('click');
  });
});