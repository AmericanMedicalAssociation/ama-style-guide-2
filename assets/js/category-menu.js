/**
 * SmartMenus jQuery Plugin - v1.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */
(function ($, Drupal) {
  Drupal.behaviors.categoryMenu = {
    attach: function (context, settings) {
      $('.ama_category_navigation_menu__group').smartmenus({
        mainMenuSubOffsetX: 250,
        mainMenuSubOffsetY: 20,
        keepInViewport: true
      });
    }
  };
})(jQuery, Drupal);
