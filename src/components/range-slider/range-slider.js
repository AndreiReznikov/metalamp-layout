import 'ion-rangeslider/js/ion.rangeSlider.min.js'
import 'ion-rangeslider/css/ion.rangeSlider.min.css'

$(document).ready(function() {
  const $rangeSlidersCollection = $('.js-range-slider');

  $rangeSlidersCollection.each(function() {
    const $rangeSlider = $(this);
    const $rangeSliderInput = $rangeSlider.find('.js-range-slider__input');

    $rangeSliderInput.ionRangeSlider({
      skin: "flat",
      min: 600,
      max: 15250,
      from: 5000,
      to: 10000,
      type: 'double',
    });

    const $ionRangeSlider = $($rangeSlider.find('.irs.irs--flat'))

    $ionRangeSlider.append('<div class="range-slider-values js-range-slider-values"></div>');

    const $rangeSliderValues = $($rangeSlider.find('.js-range-slider-values'));

    $rangeSliderValues.append('<span class="range-slider-value-from js-range-slider-value-from"></span>').append('<span class=range-slider-value-separator> - </span>').append('<span class="range-slider-value-to js-range-slider-value-to"></span>');

    const $valueFrom = $rangeSlider.find('.js-range-slider-value-from');
    const $valueTo = $rangeSlider.find('.js-range-slider-value-to');

    $valueFrom .html($rangeSliderInput.data('from').toLocaleString() + '&#8381');
    $valueTo.html($rangeSliderInput.data('to').toLocaleString() + '&#8381');

    $rangeSliderInput.on('change', function() {
      const $input = $(this);
      const from = $input.data('from');
      const to = $input.data('to');
      
      $valueFrom.html(from.toLocaleString() + '&#8381');
      $valueTo.html(to.toLocaleString() + '&#8381');
      });
  });
});
