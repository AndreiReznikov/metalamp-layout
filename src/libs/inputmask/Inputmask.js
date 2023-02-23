import 'inputmask/dist/jquery.inputmask';

class Inputmask {
  constructor(input) {
    this._findInputs(input);
  }

  initializePlugin(options) {
    const { placeholder, alias, inputFormat } = options;

    this.$maskedInputs.inputmask({
      placeholder,
      alias,
      inputFormat,
    });
  }

  _findInputs(input) {
    this.$maskedInputs = $(input);
  }
}

export default Inputmask;
