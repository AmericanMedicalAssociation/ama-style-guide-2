(function ($, Drupal) {

  Drupal.behaviors.ama_mainNavigation = {
    attach: function (context, settings) {

      var $categoryNavWrapper = $('.ama_category_navigation_wrapper'),
          $categoryNavigationMenu = $('.ama_category_navigation_menu'),
          $mobileSearchTrigger = $('.global-search-trigger'),
          $mobileSearch = $('.ama__global-search'),
          $mainNav = $('.ama__main-navigation '),
          $categoryMenuFlyout = $('.ama_category_navigation_menu__flyout'),
          $productNav = $('.ama__product-nav'),
          viewportHeight = 0,
          productNavHeight = 0,
          categoryNavMenuHeight = $('.ama_category_navigation_menu').outerHeight(),
          categoryNavMenuResizedHeight = 0;
      $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));


      if($productNav.length){
        productNavHeight = $productNav.height();
      }

        // Calculate whether or not the category nav should have scrollbars
      function categoryNavHeight($resizeViewportHeight) {
        // Check to see if viewport height is passed back when the window gets resized
        if(typeof $resizeViewportHeight !== 'undefined') {
          viewportHeight = $resizeViewportHeight - productNavHeight;
        } else {
          // Window height is used by default
          viewportHeight = $(window).innerHeight();
        }

        // Subtract the navigation height from window height to assess content height
        categoryNavMenuResizedHeight = viewportHeight - $mainNav.outerHeight();

        // Check to see if main menu purple dropdown height is larger than viewport height
        if (categoryNavMenuHeight > viewportHeight) {
          // Set the menu dropdown the same as viewport to enable scrolling
          $categoryNavWrapper.outerHeight(categoryNavMenuResizedHeight).addClass('scroll');

          // Scoll main menu and fix body to prevent it from scrolling
          $categoryNavWrapper.bind('mousewheel',function(ev, delta) {
            var scrollTop = $(this).scrollTop();
            // Initializes the mousewheel plugin
            $(this).scrollTop(scrollTop - Math.round(delta));

            // Prevents the document scrolling while the main menu is scrolling
            if ($(document).height() > $(window).height()) {
              $('html').addClass('noscroll');
            }
            // Listen to when the scroll stops
            clearTimeout($.data(this, 'timer'));
            $.data(this, 'timer', setTimeout(function () {
            // Renables document scroll
              $('html').removeClass('noscroll');
            }, 200));
          });
        }
      }

      // Only make the menu height same as viewport on mobile devices
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $categoryNavigationMenu.outerHeight($(window).innerHeight());
      }

      // If the flyout submenu is larger than the viewport add class to prevent it from overlapping the purple banner
      $('.ama_category_navigation_menu__group').on('show.smapi', function(e, menu) {
        viewportHeight = $(window).innerHeight();
        var categoryNavigationMenuFlyoutHeight = $(menu).outerHeight() + $mainNav.outerHeight() ;

        if (categoryNavigationMenuFlyoutHeight > viewportHeight) {
          $(menu).css('top', $mainNav.position().top + $mainNav.outerHeight(true) + 30 + 'px');
        }
      });

      // When mouse enters main nav div then enable scrolling and menu height resize
      // Uses the smartmenu API for mouseleave
      $categoryNavWrapper.on('mouseenter.smapi', function() {
        categoryNavHeight();
      });

      // Prevent main menu from scrolling while the submenu is shown
      // Uses the smartmenu API for mouseleave
      $categoryNavWrapper.on('mouseleave.smapi', function() {
        $categoryNavWrapper.removeClass('scroll');
      });

      // Prevent main menu from scrolling while the submenu is shown
      // Uses the smartmenu API for mouseenter
      $categoryMenuFlyout.on('mouseenter.smapi', function() {
        $categoryNavWrapper.removeClass('scroll');
        // Temp disables mousewheel plugin
        $categoryNavWrapper.unbind("mousewheel", function(){
          return false;
        });
      });

      // Returns scroll functionality to main menu when the submenu goes away
      $categoryMenuFlyout.on('mouseleave.smapi', function() {
        $categoryNavWrapper.addClass('scroll');
        categoryNavHeight();
      });


      // Hide/Show menu
      function hideShow() {
        if ($('#global-menu').prop('checked')) {
          $categoryNavigationMenu.slideDown(function () {
            $(this).parent().height('auto');
          });
        }
        else {
          $categoryNavigationMenu.slideUp(function () {
            $(this).parent().height('0');
          });
        }
      }

      $(window).resize(function () {
        var $resizeViewportHeight = $(window).innerHeight();
        categoryNavHeight($resizeViewportHeight);
      });

      $('.ama__global-menu').click(function (e) {
        hideShow();
        e.stopPropagation();
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

        debounce_timer = window.setTimeout(function() {
          if(socialIconPositionBottom > footerPosition) {
            $('.ama__masthead__content__share').fadeOut('fast');
          } else {
            $('.ama__masthead__content__share').fadeIn('fast');
          }
        }, 50);

        if($(window).scrollTop() + $(window).height() >= $(document).height()) {
          categoryNavHeight();
        }
      });

      //Checks the layout position of article on window resize and moves the social icons accordingly
      $( window ).resize(function() {

        var mainNavPositionUpdate = $('.ama__main-navigation .container').offset().left - 100;

        $('.ama__social-share.ama__social-share--fixed').css('left', mainNavPositionUpdate);

      });
    }
  };
})(jQuery, Drupal);



