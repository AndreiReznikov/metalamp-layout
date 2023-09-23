import Header from './Header';

const initializeHeader = () => {
  const header = new Header();
  header.init();
};

document.addEventListener('DOMContentLoaded', initializeHeader);
