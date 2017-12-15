/**
 * @file
 * Ribbon nav user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  $('.js-menu-dropdown-wrapper').each(function (index) {
    var class_active = 'is-active';
    var trigger = '.js-menu-dropdown-trigger';
    var $el = $(this);
    var $list_trigger = $el.find(trigger);
    // When a user clicks on the dropdown trigger
    $list_trigger.on('click', function(event) {
      event.stopPropagation();
      // Unfocus on the dropdown.
      $(this).blur();
      // Add our class for CSS.
      $(this).toggleClass(class_active);
      // Add our class to the dropdown UL.
      $(this).siblings().toggleClass(class_active);
      $list_trigger.closest('section').siblings().find(trigger).removeClass(class_active).siblings().removeClass(class_active);
    });

    $list_trigger.on('mouseover', function(event) {
      $list_trigger.closest('section').siblings().find(trigger).removeClass(class_active).siblings().removeClass(class_active);
    });
  });
})(jQuery, Drupal);

