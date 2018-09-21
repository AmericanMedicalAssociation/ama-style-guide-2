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
    var $inputs = $('.webform-submission-form section *').filter(':input');
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
    return emailReg.test(email);
  }

  function fieldIsRequired(input) {
    input.addClass('error');
    input.next().remove('.form-item--error-message');
    input.after('<div class="form-item--error-message">Field is required.</div>');
  }

  function checkField(input) {
    if (input.prop('required') && (input.val().length === 0 || input.val() === "")) {
      fieldIsRequired(input);
    }
    else {
      if (input.attr('type') === 'email' && !validateEmail(input.val())) {
        fieldIsRequired(input);
      }
      else {
        input.removeClass('error').next().remove('.form-item--error-message');
      }
    }
  }

  // Go back to previous back is user clicks decline submit button
  $('.ama__button--decline').click(function(e) {
    e.preventDefault();

    if (document.referrer == "") {
      document.location.href='/';
    } else {
      history.back()
    }
  });

  var initialLoad = true;

  Drupal.behaviors.webForm = {
    attach: function (context, settings) {
      $(document).ready(function(e) {
        $contactForm = $('.webform-submission-form');
        $inputs = $('.webform-submission-form section *').filter(':input');
        $iconElement = $('.ama__form-steps__icon');
        $submitBuutton = $('.webform-button--submit');

        if (initialLoad === false) {
          verifyFields($contactForm);
        }

        $inputs.on('focus change keypress selectmenuchange', function () {
          var iconClass = 'edit';
          $closestSection = $(this).closest('section');
          $closestSectionInputs = $closestSection.find(':input');
          $closestSection.find($iconElement).removeClass('edit error completed').addClass(iconClass);
          $closestSectionInputs.each(function () {
            checkField($(this));
          });
        });

        $inputs.on('focus blur', function () {
          var iconClass = 'edit';
          $closestSection = $(this).closest('section');
          $closestSectionInputs = $closestSection.find(':input');
          $allFieldsReady = true;

          $closestSectionInputs.each(function () {
            if ($(this).prop('required') && $(this).val().length === 0) {
              $allFieldsReady = false;
              iconClass = 'error';
            }
          });

          if ($allFieldsReady) {
            iconClass = 'completed';
          }
          $closestSection.find($iconElement).removeClass('edit error completed').addClass(iconClass);
        });

        initialLoad = false;
      });
    }
  };


})(jQuery, Drupal);
