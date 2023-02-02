class Header {
  constructor() {
    this._findElements();
    this._expandItems();
    this._showMobileMenu();
  }

  _findElements() {
    this.$document = $(document);
    this.$headersCollection = $('.js-header__container');
    this.$menuExpandableItemsCollection = $('.js-header__list-item_expandable');
    this.$mobileMenu = $('.js-header__container').find('~ .js-mobile-menu');
    this.$mobileMenuExpandableItemsCollection = this.$mobileMenu.find('.js-mobile-menu__list-item_expandable');
  }

  _expandItems() {
    this.menuItems = [
      [
        this.$menuExpandableItemsCollection,
        '.js-header__expanded-menu',
        '.js-header__list-arrow',
        'header__list-arrow_transformed',
        'toggle',
      ],
      [
        this.$mobileMenuExpandableItemsCollection,
        '.js-mobile-menu__expanded-list',
        '.js-mobile-menu__list-arrow',
        'mobile-menu__list-arrow_transformed',
        'slideToggle',
      ],
    ];

    this.menuItems.forEach((item) => {
      const [$elements, menuClass, menuArrowClass, arrowTransformedClass, method] = item;

      const closeExpandableMenu = ($element) => {
        if (method === 'slideToggle') {
          $element.slideUp();
        } else {
          $element.hide();
        }
      };

      this.$document.click((event) => {
        const $target = $(event.target);
        const clickOnMenu = $target.closest('.js-header__expanded-menu').length
          || $target.closest('.js-mobile-menu__expanded-list').length;
        const clickOnExpandableItem = $target.closest('.js-header__list-item_expandable').length
          || $target.closest('.js-mobile-menu__list-item_expandable').length;

        if (clickOnMenu) return;

        if (clickOnExpandableItem) {
          event.preventDefault();
          event.stopPropagation();

          $elements.each(function toggleMenu() {
            const $expandableItem = $(this);
            const $expandableMenu = $expandableItem.find(menuClass);
            const $arrow = $expandableItem.find(menuArrowClass);
            const isTargetCurrentExpandableItem = $target.closest('.js-header__list-item_expandable').is($expandableItem)
              || $target.closest('.js-mobile-menu__list-item_expandable').is($expandableItem);

            const toggleExpandableMenu = () => {
              $arrow.toggleClass(arrowTransformedClass);

              if (method === 'slideToggle') {
                $expandableMenu.slideToggle();
                return;
              }
              $expandableMenu.toggle();
            };

            if (isTargetCurrentExpandableItem) {
              toggleExpandableMenu();
            } else {
              closeExpandableMenu($expandableMenu);
              $arrow.removeClass(arrowTransformedClass);
            }
          });
        } else {
          $elements.each(function closeMenu() {
            const $expandableItem = $(this);
            const $expandableMenu = $expandableItem.find(menuClass);
            const $arrow = $expandableItem.find(menuArrowClass);

            closeExpandableMenu($expandableMenu);
            $arrow.removeClass(arrowTransformedClass);
          });
        }
      });
    });
  }

  _showMobileMenu() {
    this.$headersCollection.each(function showMobileMenu() {
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
