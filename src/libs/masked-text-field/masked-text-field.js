import 'inputmask/dist/jquery.inputmask';

class MaskedTextField {
  constructor() {
    this._findInputs();
    this._initializePlugin();
  }

  _findInputs() {
    this.$maskedInputs = $('.js-masked-text-field__input');
  }

  _initializePlugin() {
    this.$maskedInputs.inputmask({
      placeholder: 'ДД.ММ.ГГГГ',
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
    });
  }
}

export default MaskedTextField;
