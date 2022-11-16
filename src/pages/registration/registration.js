import Header from '../../components/header/header';
import '../../components/registration-card/registration-card';
import '../../templates/fonts.scss';
import './registration.scss';

class Registration {
  constructor() {
    this.header = new Header();
  }
}

const registration = new Registration();
