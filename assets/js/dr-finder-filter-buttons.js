/**
 * @file
 * Ribbon nav user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal, once) {

  Drupal.behaviors.filterResultsDrFinder = {
    attach: function (context) {
      // All Filters button for mobile.
      $(once('mobile-filter', '.dr-finder-filter-buttons__filters-mobile', context)).on('click', function (e) {
        e.stopPropagation();
        $('.dr-finder-filter-list').toggleClass('is-active');
      });
      // X button for mobile.
      $(once('mobile-close', '.dr-finder-filter-list-mobile-heading svg', context)).on('click', function (e) {
        e.stopPropagation();
        $('.dr-finder-filter-list').toggleClass('is-active');
      });
    }
  };
})(jQuery, Drupal, once);
