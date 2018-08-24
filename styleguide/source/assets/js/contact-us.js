/**
 * @file
 * Contact us interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {

  var verifyFields = function(form) {
    var $sections = form.find('section');
    var $inputs = $('.webform-submission-contact-us-form section *').filter(':input');
    var $iconElement = $('.ama__form-steps__icon');
    var errorSections = [];

    $inputs.each(function(i, input) {
      $closestSection = $(this).closest('section').attr('data-drupal-selector').toString();
      if ($(this).prop('required') && $(this).hasClass('error')) {
        errorSections.push($closestSection);
      }
    });

    $sections.each(function(i, section) {
      if ($.inArray($(this).attr('data-drupal-selector').trim().toString(), errorSections) !== -1) {
        $(this).find($iconElement).removeClass('edit error completed').addClass('error');
      }
      else {
        $(this).find($iconElement).removeClass('edit error completed').addClass('completed');
      }
    });
    return this;
  };

  function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( email );
  }

  Drupal.behaviors.contactUsForm = {
    attach: function (context, settings) {
      $contactForm = $('.webform-submission-contact-us-form');

      if ( $($contactForm).length) {
        $contactForm = $('.webform-submission-contact-us-form');
        $inputs = $('.webform-submission-contact-us-form section *').filter(':input');
        $iconElement = $('.ama__form-steps__icon');
        $submitBuutton = $('.webform-button--submit');

        if ($.active !== 0) {
          verifyFields($contactForm);
        }

        $inputs.on('focus change keypress', function () {
          var iconClass = 'edit';
          $closestSection = $(this).closest('section');
          $closestSection.find($iconElement).removeClass('edit error completed').addClass(iconClass);

          if ($(this).prop('required') && $(this).val().length !== 0) {
            if ($(this).attr('type') === 'email' && validateEmail($(this).val())) {
              $(this).removeClass('error').next().remove('.form-item--error-message');
            }
            if ($(this).attr('type') !== 'email') {
              $(this).removeClass('error').next().remove('.form-item--error-message');
            }
          }
        });

        $inputs.on('blur', function () {
          var iconClass = 'edit';
          $closestSection = $(this).closest('section');
          $closestSectionInputs = $closestSection.find(':input');
          $allFieldsReady = true;

          $closestSectionInputs.each(function () {
            if ($(this).prop('required') && $(this).val().length === 0) {
              $(this).addClass('error');
              $(this).next().remove('.form-item--error-message');
              $(this).after('<div class="form-item--error-message">Field is required.</div>');
              $allFieldsReady = false;
            }
          });

          if ($allFieldsReady) {
            iconClass = 'completed';
          }
          $closestSection.find($iconElement).removeClass('edit error completed').addClass(iconClass);
        });
      }
    }
  };
})(jQuery, Drupal);
