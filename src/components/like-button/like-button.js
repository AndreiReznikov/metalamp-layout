const $likeButtonsCollection = $('.js-like-button');
const unlikeImage = require('../../img/unliked.svg');
const likeImage = require('../../img/liked.svg');

$likeButtonsCollection.each(function() {
  const $this = $(this);
  const $button = $this.find('.js-like-button__button');
  const $icon = $this.find('.js-like-button__icon');
  const $count = $this.find('.js-like-button__count');

  let countValue = Number($count.text());

  function toggleLike() {
    if ($button.hasClass('like-button__button_liked')) {
      $count.text(--countValue);
      $icon.prop('src', unlikeImage);
    }
    else {
      $count.text(++countValue);
      $icon.prop('src', likeImage);
    };
    $button.toggleClass('like-button__button_liked');
  };

  $button.click(() => toggleLike());
})