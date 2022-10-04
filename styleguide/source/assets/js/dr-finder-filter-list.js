/**
 * @file
 * Ribbon nav user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {

  Drupal.behaviors.filterListDrFinder = {
    attach: function (context, settings) {

      $('.filter-list-dr-finder__menu-item', context).each(function () {
        const class_active = 'is-active';
        const button = '.filter-list-dr-finder__menu-button';
        const openMenu = $('.filter-list-dr-finder__submenu');

        $(button, this).once().on('click', function(e) {
          e.stopPropagation();
          // Unfocus on the dropdown.
          $(this).blur();
          // Add our class for CSS and remove from siblings button.
          $(this).toggleClass(class_active).parent().siblings().find('button').removeClass(class_active);
          // Add our class to the dropdown UL.
          $(this).children().toggleClass(class_active);
        });

        // Click outside of menu to close.
        $(document).click( function(e) {
          if (!openMenu.is(e.target) && !openMenu.has(e.target).length) {
            $(button, this).removeClass(class_active).children().removeClass(class_active);
          }
        });
      });
    }
  };
})(jQuery, Drupal);
