(function ($, Drupal) {
  Drupal.behaviors.jumpMenu = {
    attach: function (context, settings) {
      $(".ama__jump_menu").selectmenu();
      $('.ama__jump_menu').on('selectmenuchange', function () {
        window.location = $(this).find(':selected').data('url');
      });
    }
  };
})(jQuery, Drupal);
