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

      $('#ama__sign-in-dropdown').click(function () {
        var userMenu = $('.ama__sign-in-dropdown__menu');
        if(userMenu.css('display') === 'none') {
          $(userMenu).slideDown();
        } else {
          $(userMenu).slideUp();
        }
      });
    }
  };
})(jQuery, Drupal);
