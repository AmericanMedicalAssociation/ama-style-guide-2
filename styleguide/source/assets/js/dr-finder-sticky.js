/**
 * @file
 * Dr Finder sticky.
 *
 * Since we're using a fraction of AMA JS, we need just this for sticky nav.
 */
(function ($, Drupal) {

  Drupal.behaviors.ama_dr_finder_sticky = {
    attach: function (context, settings) {

      $(function () {
        // If we logged in as admin, we have to unstick the nav bar for admin role be able to manage the site.
        if($('body').hasClass('toolbar-tray-open')) {
          $('.ama__main-navigation--dr-finder').unstick().css("margin-top","8px");
        }else{
          $('.ama__main-navigation--dr-finder').sticky();
        }
      });

    }
  };
})(jQuery, Drupal);