(function ($, Drupal) {
  Drupal.behaviors.formValidate = {
    attach: function (context, settings) {
      (function ($) {

        // On webform submit check to see if all inputs are valid
        $('.webform-submission-form').validate({
          ignore: [],
          rules: {
            'email': {
              email: true
            }
          },
          errorPlacement: function(error, element) {
            if (element.attr("type") == "checkbox") {
              error.insertAfter(element.parent().siblings().last());
            }
            else if (element.is("select")) {
              error.insertAfter(element.next())
            }
            else {
              error.insertAfter(element);
            }
          },
          invalidHandler: function(form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
              $('.progress-marker').addClass('error')
            }
          }
        });

        // Check to see if inputs are valid
        $('.webform-submission-form input').keyup(function() {
          if($(this).valid()) {
            $('.progress-marker').removeClass('error')
          } else {
            $('.progress-marker').addClass('error')
          }
        });
        
        // Add validation to select dropdown menus using jQuery UI
        $('.webform-submission-form select').selectmenu({
          style: 'dropdown',
          transferClasses: true,
          width: null,
          change: function() {
            $(".webform-submission-form").validate().element(this);
          }
        });
      })(jQuery);
    }
  };
})(jQuery, Drupal);
