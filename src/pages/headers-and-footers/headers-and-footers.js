import Header from '../../components/header/header';
import '../../templates/fonts.scss';
import './headers-and-footers.scss';

class HeadersAndFooters {
  constructor() {
    this.header = new Header();
  }
}

const headersAndFooters = new HeadersAndFooters();
