import Inputmask from '../../libs/inputmask/Inputmask';
import '../../components/header';
import '../../templates/fonts.scss';
import './registration.scss';

class Registration {
  initializePlugins() {
    this._initializeInputmask();
  }

  _initializeInputmask() {
    this.inputmask = new Inputmask('.js-masked-text-field__input');

    this.inputmask.initializePlugin({
      placeholder: 'ДД.ММ.ГГГГ',
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
    });
  }
}

const registration = new Registration();

registration.initializePlugins();
