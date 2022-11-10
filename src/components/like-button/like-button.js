class LikeButton {
  constructor() {
    this._findButtons();
    this._toggleButtons();
  }

  _findButtons() {
    this.$likeButtonsCollection = $('.js-like-button');
  }

  _toggleButtons() {
    const unlikeIcon = '../../img/unliked.svg';
    const likeIcon = '../../img/liked.svg';

    this.$likeButtonsCollection.each(function () {
      const $this = $(this);
      const $button = $this.find('.js-like-button__button');
      const $icon = $this.find('.js-like-button__icon');
      const $count = $this.find('.js-like-button__count');

      let countValue = Number($count.text());

      const handleButtonToggleLike = () => {
        if ($button.hasClass('like-button__button_liked')) {
          $count.text(countValue -= 1);
          $icon.css('background-image', unlikeIcon);
        } else {
          $count.text(countValue += 1);
          $icon.css('background-image', likeIcon);
        }
        $button.toggleClass('like-button__button_liked');
        $icon.toggleClass('like-button__icon_liked');
      };

      $button.click(handleButtonToggleLike);
    });
  }
}

export default LikeButton;
