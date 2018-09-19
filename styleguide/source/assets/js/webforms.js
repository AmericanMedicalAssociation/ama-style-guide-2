(function ($, Drupal) {
  Drupal.behaviors.formValidate = {
    attach: function (context, settings) {
      (function ($) {
        // On webform submit check to see if all inputs are valid
        $('.webform-submission-form').validate({
          meta: "validate",
          ignore: [],
          groups: {
            checks: checkbox_names
          },
          invalidHandler: function(form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
              $('.progress-marker').addClass('error')
            }
          }
        })

        // Check to see if inputs are valid
        $('.webform-submission-form input').keyup(function() {
          if($(this).valid()) {
            $('.progress-marker').removeClass('error')
          } else {
            $('.progress-marker').addClass('error')
          }
        });

      })(jQuery);
    }
  };
})(jQuery, Drupal);
