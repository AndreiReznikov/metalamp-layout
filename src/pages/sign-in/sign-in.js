import Header from '../../components/header/Header';
import '../../templates/fonts.scss';
import './sign-in.scss';

class SignIn {
  initializeComponents() {
    this.header = new Header();
  }
}

const signIn = new SignIn();

signIn.initializeComponents();
