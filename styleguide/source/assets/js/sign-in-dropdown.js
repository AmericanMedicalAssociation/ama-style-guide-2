/**
 * @file
 * Attaches behavior to interact with user sign in menu
 */
(function ($, Drupal) {
    Drupal.behaviors.amaSignInMenu = {
      attach: function (context, settings) {
        const $signInDropdown = $('.ama__sign-in-dropdown__trigger');
        const $signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
        const $signInLink = $('.ama__sign-in-dropdown__text');
        let isDropdownOpen = false;
  
        function toggleDropdownMenu(parentElement, menuElement) {
          parentElement.off('click').on('click', function (e) {
            e.stopPropagation();
            if (isDropdownOpen) {
              closeMenu(menuElement, parentElement);
            } else {
              openMenu(menuElement, parentElement);
            }
            isDropdownOpen = !isDropdownOpen;
          });
  
          $signInLink.on('click', function (e) {
            e.preventDefault();
          });
  
          $(document).on('click', function (e) {
            if (!parentElement.is(e.target) && parentElement.has(e.target).length === 0) {
              closeMenu(menuElement, parentElement);
              isDropdownOpen = false;
            }
          });
  
          parentElement.on('mouseenter', function () {
            clearTimeout(parentElement.timeoutId);
          }).on('mouseleave', function () {
            parentElement.timeoutId = setTimeout(function () {
              closeMenu(menuElement, parentElement);
              isDropdownOpen = false;
            }, 2000);
          });
        }
  
        function openMenu(menuElement, parentElement) {
          menuElement.show().addClass('ama__sign-in-dropdown__menu--open');
          parentElement.addClass('open');
        }
  
        function closeMenu(menuElement, parentElement) {
          menuElement.hide().removeClass('ama__sign-in-dropdown__menu--open');
          parentElement.removeClass('open');
        }
  
        toggleDropdownMenu($signInDropdown, $signInDropdownMenu);
      }
    };
  })(jQuery, Drupal);
  
  /**
   * @file
   * Attaches behavior to open dismissable sign-in menu when visiting the site
   */
  (function ($, Drupal) {
    Drupal.behaviors.signInCta = {
      attach: function (context, settings) {
        const $signInDropdown = $('.ama__sign-in-dropdown__trigger');
        const $signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
        const signInCtaCookie = Cookies.get('signInCta');
  
        if (signInCtaCookie !== '1') {
          $signInDropdown.addClass('open');
          $signInDropdownMenu.addClass('ama__sign-in-dropdown__menu--open');
  
          setTimeout(function () {
            Cookies.set('signInCta', '1');
            $signInDropdownMenu.removeClass('ama__sign-in-dropdown__menu--open');
          }, 5000);
        } else {
          $signInDropdownMenu.removeClass('ama__sign-in-dropdown__menu--open');
        }
      }
    };
  })(jQuery, Drupal);
  