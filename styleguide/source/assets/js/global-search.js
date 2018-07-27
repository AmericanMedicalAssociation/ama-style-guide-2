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
      var categoryMenu = $('.ama_category_navigation_menu');
      var categoryMenuSection = $('.ama_category_navigation_menu__section');
      var categoryMenuSectionFlyout = '.ama_category_navigation_menu__flyout';

      function hideCategoryMenuSectionFlyout(){
        $(this).children(categoryMenuSectionFlyout).hide();
      }

      function flyOutStyle() {
        if($(categoryMenuSectionFlyout).css('position') === 'absolute') {
          categoryMenuSection.mouseover(function () {
            $(this).children(categoryMenuSectionFlyout).show();
          });

          categoryMenuSection.mouseout(function () {
            $(this).children(categoryMenuSectionFlyout).hide();
          });
        } else {
          categoryMenuSection.click(function() {
            $(this).toggleClass('active');
            $(this).children(categoryMenuSectionFlyout).slideToggle();
          });
        }
      }

      flyOutStyle();

      $(window).resize(function() {
        flyOutStyle();
      });

    }
  };
})(jQuery, Drupal);
