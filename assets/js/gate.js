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
      if ($('.ama__gate', context).length) {
        var heightGate = $('.ama__tags').offset().top - $('.ama__gate').offset().top;
        $('.ama__gate', context).outerHeight(heightGate);
        $('.ama__gate').nextUntil('.ama__page--news__teasers').wrapAll('<div class="ama__gate__blurry" />');
      }
    }
  };
})(jQuery, Drupal);
