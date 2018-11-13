(function ($, Drupal) {
  Drupal.behaviors.ama_mainNavigation = {
    attach: function (context, settings) {

      var $categoryNavigationMenu = $('.ama_category_navigation_menu');
      var $mobileSearchTrigger = $('.global-search-trigger');
      var $mobileSearch = $('.ama__global-search');

      // Hide/Show menu
      function hideShow() {
        if ($('#global-menu').prop('checked')) {
          $categoryNavigationMenu.slideDown();
        } 
        else {
          $categoryNavigationMenu.slideUp();
        }
      }

      $('.ama__global-menu').click(function(e){
        e.stopPropagation();
        hideShow();
      });

      $(document).click(function(e) {
        if (!$categoryNavigationMenu.is(e.target) && $categoryNavigationMenu.has(e.target).length === 0) {
          $('#global-menu').prop('checked',false);
          hideShow();
        }
      });

      $($mobileSearchTrigger).unbind('click').click(function(e) {
        $mobileSearch.slideToggle();
      });
    }
  };
})(jQuery, Drupal);
