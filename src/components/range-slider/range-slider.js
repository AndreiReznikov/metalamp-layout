import 'ion-rangeslider/js/ion.rangeSlider.min';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';

const $rangeSlidersCollection = $('.js-range-slider');

$rangeSlidersCollection.each(function () {
  const $rangeSlider = $(this);
  const $rangeSliderInput = $rangeSlider.find('.js-range-slider__input');

  $rangeSliderInput.ionRangeSlider({
    skin: 'flat',
    min: 600,
    max: 15250,
    from: 5000,
    to: 10000,
    type: 'double',
  });

  const $ionRangeSlider = $($rangeSlider.find('.irs.irs--flat'));

  $ionRangeSlider.append('<div class="range-slider__values js-range-slider__values"></div>');

  const $rangeSliderValues = $($rangeSlider.find('.js-range-slider__values'));

  $rangeSliderValues.append('<span class="range-slider__from js-range-slider__from"></span>').append('<span class=range-slider__value-separator> - </span>').append('<span class="range-slider__to js-range-slider__to"></span>');

  const $valueFrom = $rangeSlider.find('.js-range-slider__from');
  const $valueTo = $rangeSlider.find('.js-range-slider__to');

  $valueFrom.html(`${$rangeSliderInput.data('from').toLocaleString()}&#8381`);
  $valueTo.html(`${$rangeSliderInput.data('to').toLocaleString()}&#8381`);

  function handleRangeSliderInputTransformInputsView(event) {
    const $input = $(event.currentTarget);
    const from = $input.data('from');
    const to = $input.data('to');

    $valueFrom.html(`${from.toLocaleString()}&#8381;`);
    $valueTo.html(`${to.toLocaleString()}&#8381;`);
  }

  $rangeSliderInput.on('change', handleRangeSliderInputTransformInputsView);
});
