(function (Drupal) {
  Drupal.behaviors.amaSearchSuggestions = {
    attach: function (context, settings) {
      // Select the input element and ensure the behavior is processed for the context.
      const inputElements = context.querySelectorAll('.ama__global-search form input#edit-search');
      inputElements.forEach(function (element) {
        element.addEventListener('focus', function () {
          // Attach keyup event listener on focus
          document.querySelector('.search-suggestions-block').style.background = 'blue';

          const keyUpFunction = function () {
            if (element.value.trim() !== '') {
              document.querySelector('.search-suggestions-block').style.background = 'blue';
            } else {
              document.querySelector('.search-suggestions-block').style.background = 'red';
            }
          };

          element.addEventListener('keyup', keyUpFunction);

          // Remove keyup event listener on blur to prevent multiple attachments
          element.addEventListener('blur', function () {
            element.removeEventListener('keyup', keyUpFunction);
            document.querySelector('.search-suggestions-block').style.background = 'blue';
            console.log('Input lost focus'); // Example action
          }, { once: true });
        });

        // New logic to handle clicks outside the input element
        document.addEventListener('mousedown', function(event) {
          if (element !== event.target && !element.contains(event.target)) {
            element.blur();
          }
        });

      });
    }
  };
})(Drupal);
