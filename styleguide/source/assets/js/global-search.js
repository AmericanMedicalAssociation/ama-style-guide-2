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

      $( window ).resize(function() {
        mobileSearch.hide();
      });

      var signInDropdown = $('#ama__sign-in-dropdown');
      var signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
      var exploreMenu = $('#ama__explore-menu');
      var exploreMenuDropdown = $('.ama__explore-menu__menu');

      function dropdownDownMenu(parentElement, menuElement) {
        parentElement.click(function () {
          console.log('fads');
          if(menuElement.css('display') === 'none') {
            $(menuElement).slideDown();
          } else {
            $(menuElement).slideUp();
          }
        });
      }

      dropdownDownMenu(signInDropdown, signInDropdownMenu);
      dropdownDownMenu(exploreMenu, exploreMenuDropdown);
    }
  };
})(jQuery, Drupal);
