/**
 * @file
 * Interactions for wayfinder.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.wayfinder = {
    attach: function (context, settings) {
      (function ($) {

        // Read wayfinder cookies set from ama-assn domains
        $.cookie.json = true;
        var ama_wayfinder_cookie = $.cookie('ama_wayfinder_cookie');
        if (typeof ama_wayfinder_cookie !== 'undefined') {
          $('.ama_wayfinder--referrer--link-back a').show().css('display', 'flex');
          $('.ama_wayfinder--referrer--link-back a').attr("href", ama_wayfinder_cookie[1]);
          $('.ama_wayfinder--referrer--link-back_text').text(ama_wayfinder_cookie[0]);
        } else {
          $('.ama_wayfinder_referrer--link-back a').hide()
        }
      })(jQuery);
    }
  };
})(jQuery, Drupal);
