/**
 * @file
 * Subcategory
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.subcategories = {
    attach: function(context, settings) {

      function checkSize(){
        if ($(".ama__subcategory-exploration__subcategory-wrapper").outerWidth() < 800 ) {
          $('.ama__subcategory-exploration__subcategory:lt(3)').show();
        } else {
          $('.ama__subcategory-exploration__subcategory:lt(5)').show();
        }
      }

      // run test on initial page load
      checkSize();

      // run test on resize of the window
      $( window ).resize(function() {
        checkSize();
      });

      $('.viewAll').click(function() {
        $('.ama__subcategory-exploration__subcategory').fadeIn();
        $('.ama__subcategory-exploration__view-all').hide();
        $('.ama__subcategory-exploration__view-less').show();
      });

      $('.viewLess').click(function() {
        $('.ama__subcategory-exploration__subcategory').hide();
        checkSize();
        $('.ama__subcategory-exploration__view-less').hide();
        $('.ama__subcategory-exploration__view-all').show();
      });
    }
  };
})(jQuery, Drupal);
