class Header {
  constructor() {
    this._findElements();
    this._expandItems();
    this._showMobileMenu();
  }

  _findElements() {
    this.$headersCollection = $('.js-header__container');
    this.$menuExpandableItemsCollection = $('.js-header__list-link');
    this.$mobileMenu = $('.js-header__container').find('~ .js-mobile-menu');
    this.$mobileMenuExpandableItems = this.$mobileMenu.find('.js-mobile-menu__list-link_expandable');
  }

  _expandItems() {
    const menuItems = [
      [
        this.$menuExpandableItemsCollection,
        '~ .js-header__expanded-menu',
        '.js-header__list-arrow',
        'header__list-arrow_transformed',
        'toggle',
      ],
      [
        this.$mobileMenuExpandableItems,
        '~ .js-mobile-menu__expanded-list',
        '.js-mobile-menu__list-arrow',
        'mobile-menu__list-arrow_transformed',
        'slideToggle',
      ],
    ];

    menuItems.forEach((item) => {
      item[0].each(function () {
        const $expandableItem = $(this);
        const $expandableMenu = $expandableItem.find(item[1]);
        const $arrow = $expandableItem.find(item[2]);

        const toggleMenu = (event) => {
          event.preventDefault();
          $arrow.toggleClass(item[3]);

          if (item[4] === 'slideToggle') {
            $expandableMenu.slideToggle();
            return;
          }
          $expandableMenu.toggle();
        };

        $expandableItem.click(toggleMenu);
      });
    });
  }

  _showMobileMenu() {
    this.$headersCollection.each(function () {
      const $header = $(this);
      const $burgerContainer = $header.find('.js-header__burger-container');
      const $burger = $header.find('.js-header__burger');
      const $mobileMenu = $header.find('~ .js-mobile-menu');
      const $html = $('html');
      const $scrim = $('.scrim');

      const handleBurgerContainerToggleMobileMenu = () => {
        $mobileMenu.toggleClass('mobile-menu_visible');
        $burger.toggleClass('header__burger_transformed');
        $html.toggleClass('non-scrollable');
        $scrim.toggle();
      };

      $burgerContainer.click(handleBurgerContainerToggleMobileMenu);
    });
  }
}

export default Header;
