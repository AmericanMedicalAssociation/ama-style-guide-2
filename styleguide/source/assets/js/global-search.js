(function ($, Drupal) {
  Drupal.behaviors.ama_search = {
    attach: function (context, settings) {
      var searchInput = $('.ama__global-search .ama__search__field--in-body input');
      var mobileSearch = $('.ama__global-search--mobile');

      function switchSearch() {
        if (searchInput.css('display') === 'none' && mobileSearch.css('display') === 'none') {
          mobileSearch.fadeIn();
        }
        else if (searchInput.css('display') === 'block') {
          $(this).submit();
        }
        else {
          mobileSearch.fadeOut();
        }
      }

      $('.ama__search__field__button').click(function () {
        switchSearch();
      });

      $(window).resize(function() {
        mobileSearch.hide();
      });

      var signInDropdown = $('.ama__sign-in-dropdown');
      var signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
      var exploreMenu = $('.ama__explore-menu');
      var exploreMenuDropdown = $('.ama__explore-menu__menu');

      function dropdownDownMenu(parentElement, menuElement) {

        parentElement.click(function(){
          $(menuElement).slideToggle();
        }).find(signInDropdownMenu).click(function(e) {
          return false;
        });

        $(document).click(function(e) {
          // if the target of the click isn't the container nor a descendant of the container
          if (!parentElement.is(e.target) && parentElement.has(e.target).length === 0) {
            $(menuElement).slideUp();
          }

          // Set timeout for when a user mouses out of the menu
          parentElement.mouseenter(function(){
            clearTimeout();
          }).mouseleave(function(){
            setTimeout(function(){
              $(menuElement).slideUp();
            }, 2000);
          });
        });
      }

      dropdownDownMenu(signInDropdown, signInDropdownMenu);
      dropdownDownMenu(exploreMenu, exploreMenuDropdown);

      // Category Menu
      var categoryMenuSection = $('.ama_category_navigation_menu__section');
      var categoryMenuSectionFlyout = '.ama_category_navigation_menu__flyout';
      var categoryMenuCaret = '.ama_category_navigation_menu__section__caret';

      function flyOutStyle() {

        // Show/hide carets
        $(categoryMenuSection).each(function(){
          if($(this).children(categoryMenuSectionFlyout).length > 0) {
            $(this).find(categoryMenuCaret).show();
          }
        });

        // Determines whether or not to use an accordion or flyout menu
        if($(categoryMenuSectionFlyout).css('position') === 'absolute') {
          // When the flyout menu is absolute then use desktop style
          categoryMenuSection.mouseover(function () {
            $(this).children(categoryMenuSectionFlyout).show();
          });

          categoryMenuSection.mouseout(function () {
            $(this).children(categoryMenuSectionFlyout).hide();
          });
        } else {
          // If the flyout menu is not position absolute then it must be mobile. Use accordion
          categoryMenuSection.click(function() {
            $(this).toggleClass('active');
            $(this).children(categoryMenuSectionFlyout).slideToggle();
          });
        }
      }

      // Invoke the menu
      flyOutStyle();

      $(window).resize(function() {
        // This is just so testers will be happy when resizing the window the method will check if what style of menu to use
        flyOutStyle();
      });

    }
  };
})(jQuery, Drupal);
