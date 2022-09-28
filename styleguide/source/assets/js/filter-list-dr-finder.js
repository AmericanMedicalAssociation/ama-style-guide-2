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

      $('.filter-list-dr-finder__menu-item').each(function () {
        const class_active = 'is-active';

        $('.filter-list-dr-finder__menu-button', this).once().on('click', function(e) {
          e.stopPropagation();
          // Unfocus on the dropdown.
          $(this).blur();
          // Add our class for CSS.
          $(this).toggleClass(class_active);
          // Add our class to the dropdown UL.
          $(this).children().toggleClass(class_active);
        });

        $(document).click( function(){
          $('.filter-list-dr-finder__menu-button', this).removeClass(class_active).children().removeClass(class_active);
        });
      });
    }
  };
})(jQuery, Drupal);
