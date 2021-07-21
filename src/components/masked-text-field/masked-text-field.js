import 'inputmask/dist/jquery.inputmask'

$(document).ready(function() {
  const maskedInput = $('.js-masked-text-field__input');

  maskedInput.inputmask({placeholder: 'ДД.ММ.ГГГГ', alias: 'datetime', inputFormat: 'dd.mm.yyyy'});
});
