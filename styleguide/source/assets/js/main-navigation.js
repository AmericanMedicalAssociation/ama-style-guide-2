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
        var $el = $('article'),
            scrollTop = $(this).scrollTop(),
            scrollBottom = scrollTop + $(this).height(),
            elTop = $el.offset().top,
            elBottom = elTop + $el.outerHeight(),
            visibleTop = elTop < scrollTop ? scrollTop : elTop,
            visibleBottom = elBottom > scrollBottom ? scrollBottom : elBottom,
            viewportHeight =  visibleBottom - visibleTop;

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

      $($mobileSearchTrigger).unbind('click').click(function () {
        $mobileSearch.slideToggle();
      });
    }
  };
})(jQuery, Drupal);



