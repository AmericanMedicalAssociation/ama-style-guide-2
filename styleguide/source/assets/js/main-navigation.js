(function ($, Drupal) {

  Drupal.behaviors.ama_mainNavigation = {
    attach: function (context, settings) {

      var $categoryNavWrapper = $('.ama_category_navigation_wrapper');
      var $categoryNavigationMenu = $('.ama_category_navigation_menu');
      var $mobileSearchTrigger = $('.global-search-trigger');
      var $mobileSearch = $('.ama__global-search');
      var $viewportHeight = $(window).innerHeight();
      var $mainNav = $('.ama__main-navigation ');
      var $categoryNavMenuHeight = $('.ama_category_navigation_menu').outerHeight();
      var $categoryNavMenuMResizedHeight = 0;

      // Calculate whether or not the category nav should have scrollbars
      function categoryNavHeight($resizeViewportHeight) {
        $viewportHeight = typeof $resizeViewportHeight !== 'undefined' ? $resizeViewportHeight : $(window).innerHeight();
        $categoryNavMenuMResizedHeight = $viewportHeight - $mainNav.outerHeight();

        if ($categoryNavMenuHeight > $viewportHeight) {
          $categoryNavWrapper.outerHeight($categoryNavMenuMResizedHeight);
        } else {
          $categoryNavWrapper.outerHeight($viewportHeight);
        }
      }

      function submMenuFlyoutResize() {
        $('.ama_category_navigation_menu ul li').each(function () {
          $(this).hover(function () {

            if ($(this).find('.ama_category_navigation_menu__flyout').length) {

              if ($('.ama_category_navigation_menu__submenu', this).outerHeight() > $viewportHeight) {
                $('.ama_category_navigation_menu__submenu', this).outerHeight($viewportHeight);
              }

              if ($('.ama_category_navigation_menu__articles', this).outerHeight() > $viewportHeight) {
                $('.ama_category_navigation_menu__articles', this).outerHeight($viewportHeight);
              }
            }
          });
        });
      }


      // Hide/Show menu
      function hideShow() {

        categoryNavHeight();
        submMenuFlyoutResize();

        if ($('#global-menu').prop('checked')) {
          $categoryNavigationMenu.slideDown();
        }
        else {
          $categoryNavigationMenu.slideUp();
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

      $($mobileSearchTrigger).unbind('click').click(function (e) {
        $mobileSearch.slideToggle();
      });
    }
  }
})(jQuery, Drupal);



