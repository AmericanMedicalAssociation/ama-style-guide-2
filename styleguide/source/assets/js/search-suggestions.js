(function (Drupal) {
    // Attach search suggestion behaviors to Drupal
    Drupal.behaviors.amaSearchSuggestions = {
        attach: function (context, settings) {

            const block = document.querySelector('.search-suggestions-wrapper');
            const inputElement = context.querySelector('.ama__global-search form input#edit-search');

           //  If there is no text in the field, show the block.
            function toggleShowClass() {
                const shouldShow = inputElement.value.trim() === '';
                block.classList.toggle('show', shouldShow);
            }

            // If there is a keyup event on the input, check the content.
            const handleKeyUp = (event) => {
                // Show suggestions if there is no text in the input field.
                toggleShowClass();
            };

            //  If there is a change on the input, check the content.
            inputElement.addEventListener('change', (event) => {
                // Toggle visibility based on input value
                toggleShowClass();
            }, true);

            // Add 'keyup' event listener to input element
            inputElement.addEventListener('keyup', handleKeyUp);

            // Add 'focus' event listener within context for input
            inputElement.addEventListener('focus', (event) => {
                // Toggle visibility based on input focus and value
                if (inputElement.matches('.ama__global-search form input#edit-search')) {
                    toggleShowClass();
                }
            }, true);

            // Add 'blur' event listener within context for input
            inputElement.addEventListener('blur', (event) => {
                // Hide suggestions when input loses focus
                if (inputElement.matches('.ama__global-search form input#edit-search')) {
                    if (block.classList.contains('show')) {
                        block.classList.toggle('show');
                    }
                }
            }, true);

            // Add 'mousedown' event listener to manage input focus/blur
            context.addEventListener('mousedown', (event) => {
                // Focus or blur input based on where the user clicks
                if (inputElement === event.target) {
                    inputElement.focus();
                } else {
                    inputElement.blur();
                }
            });
        }
    };
})(Drupal);