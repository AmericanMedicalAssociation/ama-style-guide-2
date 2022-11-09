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

  Drupal.behaviors.filterResultsDrFinder = {
    attach: function (context, settings) {

      $('.dr-finder-filter-buttons__filters-mobile').once().on('click', function (e) {
        e.stopPropagation();
        $('.dr-finder-filter-list').toggleClass(class_active);
      });
    }
  };
})(jQuery, Drupal);
