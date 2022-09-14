const $menuExpandableItemsCollection = $('.js-header__list-item_expandable');

$menuExpandableItemsCollection.each(function () {
  const $menuExpandableItem = $(this);
  const $expandableList = $menuExpandableItem.find('.js-header__expanded-menu');
  const menuExpandableLink = $menuExpandableItem.find('.js-header__list-link');
  const arrow = menuExpandableLink.find('.js-header__list-arrow');

  const showExpandableList = () => $expandableList.toggle();
  const transformArrow = () => arrow.toggleClass('header__list-arrow_transformed');

  menuExpandableLink.click((event) => {
    transformArrow();
    showExpandableList();
    event.preventDefault();
  });
});

const $headersCollection = $('.js-header');

$headersCollection.each(function () {
  const $header = $(this);
  const burgerContainer = $header.find('.js-header__burger-container');
  const burger = $header.find('.js-header__burger');

  const mobileMenu = $header.find('~ .js-mobile-menu');
  const $expandableItems = $(mobileMenu.find('.js-mobile-menu__list-link_expandable'));

  $expandableItems.each(function () {
    const $expandableItem = $(this);
    const expandableList = $expandableItem.find('~ .js-mobile-menu__expanded-list');
    const arrow = $expandableItem.find('.js-mobile-menu__list-arrow');

    const transformArrow = () => arrow.toggleClass('mobile-menu__list-arrow_transformed');
    const showList = () => expandableList.slideToggle();

    $expandableItem.click((event) => {
      transformArrow();
      showList();
      event.preventDefault();
    });
  });

  const showMobileMenu = () => mobileMenu.toggleClass('mobile-menu_visible');
  const transformBurger = () => burger.toggleClass('header__burger_transformed');
  const stopScroll = () => $('html, body').toggleClass('stop-scroll');
  const showScrim = () => $('.scrim').toggle();

  burgerContainer.click(() => {
    transformBurger();
    showMobileMenu();
    showScrim();
    stopScroll();
  });
});
