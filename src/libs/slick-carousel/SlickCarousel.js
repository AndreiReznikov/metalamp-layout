import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class SlickCarousel {
  constructor(element) {
    this._findElements(element);
  }

  initializePlugin(options) {
    this.$slickItem.slick(options);
  }

  _findElements(element) {
    this.$slickItem = $(element);
  }
}

export default SlickCarousel;
