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
        var $subcategory = $('.ama__subcategory-exploration__subcategory');
        // We want the width minus padding so use width() instead of innerWidth().
        var subcategoryExplorationWidth = $('.ama__subcategory-exploration-with-images').width();
        var subcategoryItemWidth = $subcategory.outerWidth();
        var subcategoryTitle = $('.ama__subcategory-exploration-with-images__title').outerWidth();
        // Set subcategory row items to lowest that should display.
        var subcategoryItemsPerRow = Math.floor((subcategoryExplorationWidth - subcategoryTitle)/subcategoryItemWidth);
        if(subcategoryItemsPerRow < 2) {
          // The minimum subcategory items per row should be two. If the variable computed to less, manually correct it.
          subcategoryItemsPerRow = 2;
        }

        // Get the computed styles and set all items margins to the browser computed ones
        var computedSubcatStyles = window.getComputedStyle($subcategory[0], null);
        $subcategory.css({
          'margin-left': computedSubcatStyles.marginLeft,
          'margin-right': computedSubcatStyles.marginRight,

        });

        $subcategory.hide();
        $subcategory.slice(0, subcategoryItemsPerRow).css('display', 'block');

        viewMore($subcategory);
      }

      function viewMore($element) {
        var $viewLess = $('.ama__subcategory-exploration-with-images__view-less');
        var $viewMore = $('.ama__subcategory-exploration-with-images__view-all');
        var $subcategoryContainer = $('.ama__subcategory-exploration-with-images__container');

        $viewLess.hide();
        $viewMore.show();

        $('.viewAll').click(function(e) {
          e.preventDefault();
          $element.fadeIn();
          $viewMore.hide();
          $subcategoryContainer.addClass('expanded');
          $viewLess.show();

        });

        $('.viewLess').click(function(e) {
          e.preventDefault();
          $element.hide();
          checkSize();
          $viewLess.hide();
          $subcategoryContainer.removeClass('expanded');
          $viewMore.show();
        });
      }

      // run test on initial page load
      checkSize();

      // run test on resize of the window
      $( window ).resize(function() {
        checkSize();
      });
    }
  };
})(jQuery, Drupal);
