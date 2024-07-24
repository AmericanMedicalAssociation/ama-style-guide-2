/**
 * @file
 * Dr Finder modal click.
 *
 * Click on the X to close modal.
 */
(function ($, Drupal) {

  Drupal.behaviors.ama_dr_finder_modal = {
    attach: function (context, settings) {

      $(function () {
        $(".dr-finder-modal__close").click(function() {
          $(".dr-finder-modal").remove();
        });
      });
    }
  };
})(jQuery, Drupal);
