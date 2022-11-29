import MaskedTextField from '../../libs/inputmask/inputmask';
import Header from '../../components/header/header';
import '../../templates/fonts.scss';
import './registration.scss';

class Registration {
  initializeComponents() {
    this.header = new Header();
  }

  initializePlugins() {
    this._initializeMaskedTextField();
  }

  _initializeMaskedTextField() {
    this.maskedTextField = new MaskedTextField('.js-masked-text-field__input');

    this.maskedTextField.initializePlugin({
      placeholder: 'ДД.ММ.ГГГГ',
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
    });
  }
}

const registration = new Registration();

registration.initializeComponents();
registration.initializePlugins();
