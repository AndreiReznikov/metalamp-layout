import MaskedTextField from '../../libs/inputmask/inputmask';

const maskedTextField = new MaskedTextField('.js-masked-text-field__input');

maskedTextField.initializePlugin({
  placeholder: 'ДД.ММ.ГГГГ',
  alias: 'datetime',
  inputFormat: 'dd.mm.yyyy',
});
