(function ($, Drupal) {

  Drupal.behaviors.ama_mainNavigation = {
    attach: function (context, settings) {

      var $categoryNavWrapper = $('.ama_category_navigation_wrapper'),
          $categoryNavigationMenu = $('.ama_category_navigation_menu'),
          $mobileSearchTrigger = $('.global-search-trigger'),
          $mobileSearch = $('.ama__global-search'),
          $mainNav = $('.ama__main-navigation '),
          $productNav = $('.ama__product-nav'),
          viewportHeight = 0,
          productNavHeight = 0,
          categoryNavMenuHeight = $('.ama_category_navigation_menu').outerHeight(),
          categoryNavMenuMResizedHeight = 0;


      if($productNav.length){
        productNavHeight = $productNav.outerHeight();
      }

        // Calculate whether or not the category nav should have scrollbars
      function categoryNavHeight($resizeViewportHeight) {

        if(typeof $resizeViewportHeight !== 'undefined') {
          viewportHeight = $resizeViewportHeight - productNavHeight;
        } else {
          viewportHeight = $(window).innerHeight();
        }

        categoryNavMenuMResizedHeight = viewportHeight - $mainNav.outerHeight();

        if (categoryNavMenuHeight > viewportHeight) {
          $categoryNavWrapper.outerHeight(categoryNavMenuMResizedHeight);
        } else {
          $categoryNavWrapper.outerHeight(viewportHeight);
        }
      }

      function submMenuFlyoutResize() {

        // Calculate the visible height of article
        var $el = $('.layout-container'),
            scrollTop = $(this).scrollTop(),
            scrollBottom = scrollTop + $(this).height(),
            elTop = $el.offset().top,
            elBottom = elTop + $el.outerHeight(),
            visibleTop = elTop < scrollTop ? scrollTop : elTop,
            visibleBottom = elBottom > scrollBottom ? scrollBottom : elBottom,
            viewportHeight =  visibleBottom - visibleTop - $mainNav.outerHeight() - productNavHeight ;

        $('.ama_category_navigation_menu ul li').each(function () {
          $(this).hover(function () {
            if ($(this).find('.ama_category_navigation_menu__flyout').length) {
              if($(this).find('.ama_category_navigation_menu__flyout').outerHeight() > viewportHeight) {
                $('.ama_category_navigation_menu__group').on('activate.smapi', function (e, item) {
                  $(item).next().addClass('pinned').outerHeight(viewportHeight);
                });
              } else {
                $('.ama_category_navigation_menu__group').on('activate.smapi', function (e, item) {
                  $(item).next().removeClass('pinned');
                });
              }
            }
          });
        });
      }

      // Hide/Show menu
      function hideShow() {
        if ($('#global-menu').prop('checked')) {
          $categoryNavigationMenu.slideDown();
          categoryNavHeight();
          submMenuFlyoutResize();
        }
        else {
          $categoryNavigationMenu.slideUp();
          categoryNavHeight(0);
        }
      }

      $(window).resize(function () {
        var $resizeViewportHeight = $(window).innerHeight()
        categoryNavHeight($resizeViewportHeight);

        submMenuFlyoutResize();
      });

      $('.ama__global-menu').click(function (e) {
        e.stopPropagation();
        hideShow();
      });

      $(document).click(function (e) {
        if (!$categoryNavigationMenu.is(e.target) && $categoryNavigationMenu.has(e.target).length === 0) {
          $('#global-menu').prop('checked', false);
          hideShow();
        }
      });

      $($mobileSearchTrigger).unbind('click').click(function () {
        $mobileSearch.slideToggle();
      });

      function moveSocialSharePosition(){
        var mainNavPosition = $('.ama__main-navigation .container').offset().left;
        var $amaSocialShare = $('.ama__social-share');

        // Checks to see if there is enough for the sticky nav
        if(mainNavPosition > 60) {

          var socialStickyPosition = mainNavPosition - 60;
          var $socialIcons = $('.ama__masthead__content__share');

          // Check to see if viewport width is greater 850px then the social icons will be sticky
          if($socialIcons.length && $(window).width() > 850) {
            $socialIcons.sticky({
              wrapperClassName: 'ama__masthead__content__share-wrapper',
              zIndex: 501
            });

            $socialIcons.on('sticky-start', function () {
              $amaSocialShare.addClass('ama__social-share--fixed').css('left', socialStickyPosition).hide().fadeTo('slow', 1);
            });

            $socialIcons.on('sticky-update', function () {
              $amaSocialShare.addClass('ama__social-share--fixed').hide().fadeTo('slow', 1);
            });

            $socialIcons.on('sticky-end', function () {
              $('.ama__social-share--fixed').removeClass('ama__social-share--fixed');
            });
          }
        }
      }

      // Initialize getSocialShare()
      moveSocialSharePosition();

      // Onscroll check to see if social icon position is greater than footer position
      var debounce_timer;

      $(window).scroll(function() {
        var $socialIcons = $('.ama__masthead__content__share .ama__social-share');
        var socialIconPositionBottom = $socialIcons.offset().top + $socialIcons.outerHeight();
        var footerPosition = $('footer').offset().top;

        if(debounce_timer) {
          window.clearTimeout(debounce_timer);
        }

        if($(window).height() < 745) {
          $('.ama__masthead__content__share').hide();
        }

        debounce_timer = window.setTimeout(function() {
          if(socialIconPositionBottom > footerPosition) {
            $('.ama__masthead__content__share').fadeOut('fast');
          } else {
            $('.ama__masthead__content__share').fadeIn('fast');
          }
        }, 50);
      });

      //Checks the layout position of article on window resize and moves the social icons accordingly
      $( window ).resize(function() {

        var mainNavPositionUpdate = $('.ama__main-navigation .container').offset().left - 100;

        $('.ama__social-share.ama__social-share--fixed').css('left', mainNavPositionUpdate);

      });
    }
  };
})(jQuery, Drupal);



