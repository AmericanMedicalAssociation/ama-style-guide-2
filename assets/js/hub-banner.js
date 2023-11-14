/**
 * @file
 * Adds offset to footer to account for sticky hub banner.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.hubBanner = {
    attach: function(context, settings) {

      $(function() {
        if ($('.ama__footer.has_banner').length) {
          function setbannerOffset() {
            // get hub banner height, minus one to account for white space below footer
            var hubBanner = $('.ama__hub-banner').outerHeight() - 1;

            // take height and set as margin-bottom on footer
            $('.ama__footer.has_banner').css('margin-bottom', hubBanner + 'px');
          }

          // on load, set offset
          setbannerOffset();

          // on resize, recalculate
          $(window).resize(function() {
            setbannerOffset();
          });
        }
      });
    }
  };
})(jQuery, Drupal);
