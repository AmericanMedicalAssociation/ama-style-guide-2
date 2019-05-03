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
          categoryNavMenuResizedHeight = 0;


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
          $categoryNavWrapper.outerHeight(categoryNavMenuResizedHeight);
          $categoryNavWrapper.addClass('scroll');

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

      // If the flyout submenu is larger than the viewport add class to prevent it from overlapping the purple banner
      $('.ama_category_navigation_menu__group').on('show.smapi', function(e, menu) {
        var categoryNavigationMenuFlyoutHeight = $(menu).outerHeight() + $mainNav.outerHeight();
        viewportHeight = $(window).innerHeight();

        if (categoryNavigationMenuFlyoutHeight > viewportHeight) {
          $(menu).addClass('ama_category_navigation_menu__flyout--reposition_margin');
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
      $('.ama_category_navigation_menu__flyout').on('mouseenter.smapi', function() {
        $categoryNavWrapper.removeClass('scroll');
        // Temp disables mousewheel plugin
        $categoryNavWrapper.unbind("mousewheel", function(){
          return false;
        });
      });

      // Returns scroll functionality to main menu when the submenu goes away
      $('.ama_category_navigation_menu__flyout').on('mouseleave.smapi', function(e, item) {
        $categoryNavWrapper.addClass('scroll');
        categoryNavHeight();
      });


      // Hide/Show menu
      function hideShow() {
        if ($('#global-menu').prop('checked')) {
          $categoryNavigationMenu.slideDown();
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
    }
  };
})(jQuery, Drupal);



