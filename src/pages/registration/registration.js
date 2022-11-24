import Header from '../../components/header/header';
import '../../components/registration-card/registration-card';
import '../../templates/fonts.scss';
import './registration.scss';

class Registration {
  initializeComponents() {
    this.header = new Header();
  }
}

const registration = new Registration();

registration.initializeComponents();
