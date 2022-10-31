/**
 * @file
 * Dr Finder sticky.
 *
 * Since we're using a fraction of AMA JS, we need just this for sticky nav.
 */
(function ($, Drupal) {
  Drupal.behaviors.ama_dr_finder_sticky = {
    attach: function (context, settings) {
      $('.ama__main-navigation--dr-finder').sticky({zIndex: 501});
    }
  };
})(jQuery, Drupal);
