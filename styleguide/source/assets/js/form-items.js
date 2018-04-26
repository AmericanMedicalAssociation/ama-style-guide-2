/**
 * @file
 * Form fields masking
 */

(function ($, Drupal) {
  Drupal.behaviors.formItems = {
    attach: function (context, settings) {
      (function ($) {
        $(document).ready(function(){
          $( "[type=checkbox]" ).checkboxradio();
          $( "[type=radio]" ).checkboxradio().buttonset().find('label').css('width', '19.4%');
          $('.ama__select-menu__select').selectmenu();
        });
      })(jQuery);
    }
  };
})(jQuery, Drupal);
