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

  Drupal.behaviors.ribbonnav = {
    attach: function (context, settings) {

      function setStickyNav() { 
        // Needs doc ready because the admin toolbar needs to get loaded to determine the top spacing for sticky nav
        var $bodyFixed = $('body').css('overflow');
        var $productNav = $('.ama__product-nav');

        // Set product nav height if present.
        if($productNav.length && $productNav.is(':visible') ){
          productNavHeight = $productNav.height();
        } else {
          productNavHeight = 0;
        }

        // Set main nav and product nav sticky state based on admin toolbar and screen size.
        if($bodyFixed === 'hidden') {
          $('.ama__main-navigation').unstick();
          $('.ama__product-nav').unstick();
          return;
        } else if($(window).width() < 768 ) { // If less than tablet
          $('.ama__main-navigation').sticky({zIndex: 501 });
        } else if($('.toolbar-tray').hasClass('toolbar-tray-horizontal')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 99 });
          $('.ama__product-nav').sticky({zIndex: 501, topSpacing: 72 });
        } else if($('.toolbar-tray').hasClass('toolbar-tray-vertical')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 66 });
          $('.ama__product-nav').sticky({zIndex: 501, topSpacing: 39 });
        } else {
          $('.ama__main-navigation ').sticky({ zIndex: 501 });
          if(!($('body.ama__hub').length)) { 
            $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: productNavHeight });
            $('.ama__product-nav').sticky({zIndex: 501});
          }
        }
      };

      setStickyNav();

      // On resize, reset sticky nav positining and state.
      $( window ).resize(function() { 
        setStickyNav();
      });

      $('.ama__ribbon__dropdown').each(function () {
        var class_active = 'is-active';

        $('.ama__ribbon__dropdown__trigger', this).on('click', function(e) {
          e.stopPropagation();
          // Unfocus on the dropdown.
          $(this).blur();
          // Add our class for CSS.
          $(this).toggleClass(class_active);
          // Add our class to the dropdown UL.
          $(this).children().toggleClass(class_active);
        });

        $(document).click( function(){
          $('.ama__ribbon__dropdown__trigger', this).removeClass(class_active).children().removeClass(class_active);
        });
      });
    }
  };
})(jQuery, Drupal);
