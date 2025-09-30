/**
 * SmartMenus jQuery Plugin - v1.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function ($, Drupal, once) {
    Drupal.behaviors.categoryMenuBehavior = {
        attach: function (context, settings) {
            once('categoryMenuBehavior', '.ama_category_navigation_menu__group', context).forEach(function (element) {
                $(element).smartmenus({
                    subIndicatorsPos: 'append'
                });
            });
        }
    };
})(jQuery, Drupal, once);
