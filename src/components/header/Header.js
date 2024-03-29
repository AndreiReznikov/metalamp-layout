class Header {
  init() {
    this._findElements();
    this._expandItems();
    this._showMobileMenu();
  }

  _findElements() {
    this.$document = $(document);
    this.$headersCollection = $('.js-header__container');
    this.$menuExpandableItemsCollection = $('.js-header__list-item_expandable');
    this.$mobileMenu = $('.js-header__container').find(
      '~ .js-header__mobile-menu',
    );
    this.$mobileMenuExpandableItemsCollection = this.$mobileMenu.find(
      '.js-header__mobile-list-item_expandable',
    );
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
        '.js-header__mobile-expanded-list',
        '.js-header__mobile-list-arrow',
        'header__mobile-list-arrow_transformed',
        'slideToggle',
      ],
    ];

    this.menuItems.forEach((item) => {
      const [
        $elements,
        menuClass,
        menuArrowClass,
        arrowTransformedClass,
        method,
      ] = item;

      const closeExpandableMenu = ($expandableMenu, $arrow) => {
        if (method === 'slideToggle') {
          $expandableMenu.slideUp();
        } else {
          $expandableMenu.hide();
        }

        $arrow.removeClass(arrowTransformedClass);
      };

      const toggleExpandableMenu = ($expandableMenu, $arrow) => {
        $arrow.toggleClass(arrowTransformedClass);

        if (method === 'slideToggle') {
          $expandableMenu.slideToggle();
          return;
        }
        $expandableMenu.toggle();
      };

      const handleDocumentToggleMenu = (event) => {
        const $target = $(event.target);
        const isClickOnMenu = $target.closest('.js-header__expanded-menu').length
          || $target.closest('.js-header__mobile-expanded-list').length;
        const isClickOnExpandableItem = $target.closest('.js-header__list-item_expandable').length
          || $target.closest('.js-header__mobile-list-item_expandable').length;

        if (isClickOnMenu) return;

        let $expandableItem;
        let $expandableMenu;
        let $arrow;

        if (isClickOnExpandableItem) {
          event.preventDefault();
          event.stopPropagation();

          $elements.each(function toggleMenu() {
            $expandableItem = $(this);
            $expandableMenu = $expandableItem.find(menuClass);
            $arrow = $expandableItem.find(menuArrowClass);
            const isTargetCurrentExpandableItem = $target
              .closest('.js-header__list-item_expandable')
              .is($expandableItem)
              || $target
                .closest('.js-header__mobile-list-item_expandable')
                .is($expandableItem);

            if (isTargetCurrentExpandableItem) {
              toggleExpandableMenu($expandableMenu, $arrow);
            } else {
              closeExpandableMenu($expandableMenu, $arrow);
            }
          });
        } else {
          $elements.each(function closeMenu() {
            $expandableItem = $(this);
            $expandableMenu = $expandableItem.find(menuClass);
            $arrow = $expandableItem.find(menuArrowClass);

            closeExpandableMenu($expandableMenu, $arrow);
          });
        }
      };

      this.$document.on('click', handleDocumentToggleMenu);
    });
  }

  _showMobileMenu() {
    this.$headersCollection.each(function showMobileMenu() {
      const $header = $(this);
      const $burgerContainer = $header.find('.js-header__burger-container');
      const $burger = $header.find('.js-header__burger');
      const $mobileMenu = $header.find('~ .js-header__mobile-menu');
      const $scrim = $('.header__scrim');
      const $html = $('html');
      const htmlClass = $html.attr('class');

      const handleBurgerContainerToggleMobileMenu = () => {
        $mobileMenu.toggleClass('header__mobile-menu_visible');
        $burger.toggleClass('header__burger_transformed');
        $html.toggleClass(`${htmlClass}_non-scrollable`);
        $scrim.toggle();
      };

      $burgerContainer.on('click', handleBurgerContainerToggleMobileMenu);
    });
  }
}

export default Header;
