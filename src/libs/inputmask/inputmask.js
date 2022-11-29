import 'inputmask/dist/jquery.inputmask';

class Inputmask {
  constructor(input) {
    this._findInputs(input);
  }

  initializePlugin(options) {
    this.$maskedInputs.inputmask({
      placeholder: options.placeholder,
      alias: options.alias,
      inputFormat: options.inputFormat,
    });
  }

  _findInputs(input) {
    this.$maskedInputs = $(input);
  }
}

export default Inputmask;
