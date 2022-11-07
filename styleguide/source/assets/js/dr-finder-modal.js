/**
 * @file
 * Dr Finder sticky.
 *
 * Since we're using a fraction of AMA JS, we need just this for sticky nav.
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
