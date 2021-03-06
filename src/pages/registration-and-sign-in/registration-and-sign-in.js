import '../../components/header/header'
import '../../components/registration-card/registration-card'

import './registration-and-sign-in.scss'

$(document).ready(function() {
  const registrationCardHtml = $('.js-registration-block');
  const entryCardHtml = $('.js-entry-block');

  const search = document.location.search;

  if (search == '?page=entry') {
    entryCardHtml.addClass('show-card');
    return;
  }
  registrationCardHtml.addClass('show-card');

  const $forms = $('form');

  $forms.submit(function(event) {
    event.preventDefault();
  });
});