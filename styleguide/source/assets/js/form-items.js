/**
 * @file
 * Form fields masking
 */

(function ($, Drupal) {
  Drupal.behaviors.formItems = {
    attach: function (context, settings) {
      (function ($) {
        $(document).ready(function(){
          var legend = $('.ama__range-field__legend');

          $(".ama__range-field").slider({
            animate: true,
            range: "min",
            value: 50,
            min: 10,
            max: 100,
            step: 1,
          }).append(legend);
        });
      })(jQuery);
    }
  };
})(jQuery, Drupal);
