/**
 * @file
 * Ribbon nav user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal, once) {

  Drupal.behaviors.filterListDrFinder = {
    attach: function (context) {

      $('.dr-finder-filter-list .fieldgroup', context).each(function () {
        const class_active = 'is-active';
        const openMenu = $('.fieldset-wrapper');
        $(once('filter-legend', '.fieldset-legend', this)).on('click', function(e) {
          e.stopPropagation();
          // Unfocus on the dropdown.
          $(this).blur();
          // toggle active class.
          $(this).toggleClass(class_active);
          $(this).parent().toggleClass(class_active);
          // Remove active from siblings buttons.
          $(this).parent().parent().siblings().find('legend').removeClass(class_active).find('.fieldset-legend').removeClass(class_active);
        });

        // Click outside of menu to close.
        $(document).click( function(e) {
          if (!openMenu.is(e.target) && !openMenu.has(e.target).length) {
            $(this).find('legend').removeClass(class_active).find('.fieldset-legend').removeClass(class_active);
          }
        });
      });
    }
  };
})(jQuery, Drupal, once);
