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
        var subcategoryWrapper = $('.ama__subcategory-exploration__subcategory-wrapper').outerWidth();
        var subcategoryTitle = $('.ama__subcategory-exploration__title').outerWidth();
        $(".ama__subcategory-exploration__subcategory").hide();
        console.log(subcategoryTitle < 550)

        if (subcategoryWrapper > 0 && subcategoryWrapper < 290 && subcategoryTitle > 200 ) {
          $(".ama__subcategory-exploration__subcategory").slice(0, 2).css('display', 'block');
        } else if (subcategoryWrapper > 290 && subcategoryWrapper < 500 && subcategoryTitle > 200 ) {
          $(".ama__subcategory-exploration__subcategory").slice(0, 3).css('display', 'block');
        } else if ((subcategoryWrapper > 300 && subcategoryWrapper < 450) && subcategoryTitle < 200) {
          $(".ama__subcategory-exploration__subcategory").slice(0, 2).css('display', 'block');
        } else if ((subcategoryWrapper > 450 && subcategoryWrapper < 715) && subcategoryTitle < 200) {
          $(".ama__subcategory-exploration__subcategory").slice(0, 3).css('display', 'block');
        } else if ((subcategoryWrapper > 715 && subcategoryWrapper < 950) && subcategoryTitle < 200) {
          $(".ama__subcategory-exploration__subcategory").slice(0, 4).css('display', 'block');
        } else {
          $(".ama__subcategory-exploration__subcategory").slice(0, 5).css('display', 'block');
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
