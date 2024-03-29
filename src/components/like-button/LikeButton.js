class LikeButton {
  init() {
    this._findElements();
    this._toggleButtons();
  }

  _findElements() {
    this.$likeButtonsCollection = $('.js-like-button');
  }

  _toggleButtons() {
    this.$likeButtonsCollection.each(function toggleButtons() {
      const $this = $(this);
      const $button = $this.find('.js-like-button__button');
      const $icon = $this.find('.js-like-button__icon');
      const $count = $this.find('.js-like-button__count');

      let countValue = Number($count.text());

      const handleButtonToggleLike = () => {
        if ($button.hasClass('like-button__button_liked')) {
          $count.text((countValue -= 1));
        } else {
          $count.text((countValue += 1));
        }
        $button.toggleClass('like-button__button_liked');
        $icon.toggleClass('like-button__icon_liked');
      };

      $button.on('click', handleButtonToggleLike);
    });
  }
}

export default LikeButton;
