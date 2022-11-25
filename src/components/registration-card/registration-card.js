import MaskedTextField from '../../libs/inputmask/inputmask';

class RegistrationCard {
  initializePlugins() {
    this.maskedTextField = new MaskedTextField('.js-masked-text-field__input');

    this.maskedTextField.initializePlugin({
      placeholder: 'ДД.ММ.ГГГГ',
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
    });
  }
}

const registrationCard = new RegistrationCard();

registrationCard.initializePlugins();
