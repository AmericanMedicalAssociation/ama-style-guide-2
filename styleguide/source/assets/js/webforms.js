(function ($, Drupal) {
  Drupal.behaviors.formValidate = {
    attach: function (context, settings) {
      (function ($) {

        $.validator.addMethod(
          "regex",
          function(value, element, regexp) {
            return this.optional(element) || regexp.test(value);
          },
          "Please check your input."
        );

        // On webform submit check to see if all inputs are valid
        $('.webform-submission-form').validate({
          ignore: [],
          rules: {
            'email': {
              email: true
            },
            'telephone': {
              'regex': /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
            },
            'birth_year': {
              'regex': /^(19|20)\d{2}$/
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

            if($('.js-form-type-radio').find('label.error').length !== 0) {
              $('.js-form-type-radio label.error').parents('.fieldset-wrapper').addClass('error');
            }
          }
        });

        // Check to see if inputs are valid
        $('.webform-submission-form input').change(function() {
          $('.webform-submission-form label.error').each(function() {
            if( $(this).text() !== '') {
              $('.ama__form-steps__icon').addClass('error')
            }
            else {
              $('.ama__form-steps__icon').removeClass('error')
            }
          });
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
