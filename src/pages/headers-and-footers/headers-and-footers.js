import Header from '../../components/header/header';
import '../../templates/fonts.scss';
import './headers-and-footers.scss';

class HeadersAndFooters {
  initializeComponents() {
    this.header = new Header();
  }
}

const headersAndFooters = new HeadersAndFooters();

headersAndFooters.initializeComponents();
