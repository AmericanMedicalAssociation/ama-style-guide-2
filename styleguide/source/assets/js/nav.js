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

      // Needs doc ready because the admin toolbar needs to get loaded to determine the top spacing for sticky nav
      $(function() {
        if($(window).width() < 768) { // If less than tablet
          $('.ama__main-navigation').sticky({zIndex: 501});
        } else if($('.toolbar-tray').hasClass('toolbar-tray-horizontal')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 72 });
        } else if($('.toolbar-tray').hasClass('toolbar-tray-vertical')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 39 });
        } else {
          $('.ama__main-navigation ').sticky({ zIndex: 501 });
        }

        function moveSocialSharePosition(layoutPositionUpdate){
          if($('.ama__masthead__content__share').length && $(window).width() > 768) {

            var $layoutPosition = 0;
            var $socialIcons = $('.ama__masthead__content__share');

            if(typeof layoutPositionUpdate !== 'undefined'){
              $layoutPosition = layoutPositionUpdate;
            } else {
              $layoutPosition = $('.layout__region').offset().left - 130;
            }

            if ($layoutPosition < 0) {
              $layoutPosition = -400;
            }

            $socialIcons.sticky({ wrapperClassName: 'ama__masthead__content__share-wrapper', zIndex: 501 });

            $socialIcons.on('sticky-start', function () {
              $('.ama__social-share').addClass('ama__social-share--fixed').css('left', $layoutPosition).hide().fadeTo('slow', 1);
            });

            $socialIcons.on('sticky-update', function () {
              $('.ama__social-share').addClass('ama__social-share--fixed').css('left', $layoutPosition).hide().fadeTo('slow', 1);
            });

            $socialIcons.on('sticky-end', function () {
              $('.ama__social-share--fixed').removeClass('ama__social-share--fixed');
            });
          }
        }

        // Initialize getSocialShare()
        moveSocialSharePosition();

        //Checks the layout position of article on window resize and moves the social icons accordingly
        $( window ).resize(function() {
          var $layoutPositionUpdate = $('.layout__region').offset().left - 130;
          var $socialIcons = $('.ama__social-share');

          if ($layoutPositionUpdate < 0) {
            $layoutPositionUpdate = -100;
          }

          // Update social icon position after window resize
          $socialIcons.css('left', $layoutPositionUpdate);

          moveSocialSharePosition($layoutPositionUpdate);

        });

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
      })
    }
  }
})(jQuery, Drupal);
