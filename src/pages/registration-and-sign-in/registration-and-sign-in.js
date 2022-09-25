import '../../components/header/header';
import '../../components/registration-card/registration-card';
import '../../templates/fonts.scss';
import './registration-and-sign-in.scss';

$(document).ready(() => {
  const $forms = $('form');

  const handleFormsPreventDefault = (event) => {
    event.preventDefault();
  };

  $forms.submit(handleFormsPreventDefault);

  const registrationCardHtml = $('.js-registration-card-wrapper');
  const entryCardHtml = $('.js-entry-card-wrapper');
  const registraitionAndSignInBackground = $('.registration-and-sign-in-background-container');

  const { search } = document.location;

  const backgroundMinHeight = search === '?page=entry' ? '702px' : '684px';

  registraitionAndSignInBackground.css('min-height', backgroundMinHeight);

  if (search === '?page=entry') {
    entryCardHtml.addClass('show-card');
    return;
  }

  registrationCardHtml.addClass('show-card');
});
