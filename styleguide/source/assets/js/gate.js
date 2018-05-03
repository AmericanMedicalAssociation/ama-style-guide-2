/**
 * @file
 * Responsive Tables.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.responsiveGate = {
    attach: function(context, settings) {
      var heightGate = $('.ama__tags').offset().top - $('.ama__gate').offset().top;
      console.log(heightGate);
      $('.ama__gate').height(heightGate);
    }
  };
})(jQuery, Drupal);
