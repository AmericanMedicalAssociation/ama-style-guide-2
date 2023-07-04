/**
 * @file
 * Ribbon nav user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
 (function ($, Drupal) {

  Drupal.behaviors.backToSearch = {
    attach: function (context, settings) {

      $('a.dr-finder-search-result-card ').on('click', function (e) {
        e.preventDefault();
        // Get params.
        const params = new URLSearchParams(document.referrer.split("?")[1]);
        // Remove page param, so we go back to the beginning if we've scrolled.
        params.delete('page');
        // Redirect to previous page without page param.
        currentPath = document.referrer.split("?")[0] + '?' + params;
        sessionStorage.setItem('searchPath', currentPath);
        window.location = $(this).attr('href');
      });
    }
  };
})(jQuery, Drupal);
