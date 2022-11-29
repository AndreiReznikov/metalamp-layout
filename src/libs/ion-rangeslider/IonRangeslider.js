import 'ion-rangeslider/js/ion.rangeSlider.min';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';

class IonRangeslider {
  constructor(slider) {
    this._findElements(slider);
  }

  initializePlugin(options) {
    this.$rangeSliderInput.ionRangeSlider({
      skin: options.skin,
      min: options.min,
      max: options.max,
      from: options.from,
      to: options.to,
      type: options.max,
    });
  }

  addTooltips() {
    this.$ionRangeSlider = this.$rangeSlider.find('.irs.irs--flat');
    this.$ionRangeSlider.append('<div class="range-slider__values js-range-slider__values"></div>');
    this.$rangeSliderValues = $(this.$ionRangeSlider.find('.js-range-slider__values'));
    this.$rangeSliderValues.append(
      '<span class="range-slider__from js-range-slider__from"></span>',
      '<span class=range-slider__value-separator> - </span>',
      '<span class="range-slider__to js-range-slider__to"></span>',
    );
  }

  setTooltipsValues() {
    const $valueFrom = this.$ionRangeSlider.find('.js-range-slider__from');
    const $valueTo = this.$ionRangeSlider.find('.js-range-slider__to');

    $valueFrom.html(`${this.$rangeSliderInput.data('from').toLocaleString()}&#8381`);
    $valueTo.html(`${this.$rangeSliderInput.data('to').toLocaleString()}&#8381`);

    const handleRangeSliderInputTransformInputsView = (event) => {
      const $input = $(event.currentTarget);
      const from = $input.data('from');
      const to = $input.data('to');
      $valueFrom.html(`${from.toLocaleString()}&#8381;`);
      $valueTo.html(`${to.toLocaleString()}&#8381;`);
    };

    this.$rangeSliderInput.on('change', handleRangeSliderInputTransformInputsView);
  }

  _findElements(slider) {
    this.$rangeSlider = $(slider);
    this.$rangeSliderInput = this.$rangeSlider.find('.js-range-slider__input');
  }
}

export default IonRangeslider;
