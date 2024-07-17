(function (Drupal) {
    // Attach search suggestion behaviors to Drupal
    Drupal.behaviors.amaSearchSuggestions = {
        attach: function (context, settings) {

            const block = document.querySelector('.search-suggestions-wrapper');
            const inputElement = context.querySelector('.ama__global-search form input#edit-search');

            // Function to handle visibility based on 'keyup' event
            const handleKeyUp = (event) => {
                const inputElement = event.target;
                // Show suggestions if there is no text in the input field.
                if (inputElement.value.trim() === '') {
                    if (block.classList.contains('hide')) {
                        block.classList.remove('show', 'hide');
                        block.classList.add('show');
                    }
                }
            };

            // Add 'change' event listener to input element
            inputElement.addEventListener('change', (event) => {
                // Toggle visibility based on input value
                if (event.target.value.trim() !== '') {
                    // Hide suggestions if input is not empty
                    if (block.classList.contains('show')) {
                        block.classList.remove('show', 'hide');
                        block.classList.add('hide');
                    }
                } else {
                    // Show suggestions if input is empty
                    if (block.classList.contains('hide')) {
                        block.classList.remove('show', 'hide');
                        block.classList.add('show');
                    }
                }
            }, true);

            // Add 'keyup' event listener to input element
            inputElement.addEventListener('keyup', handleKeyUp);

            // Add 'focus' event listener within context for input
            context.addEventListener('focus', (event) => {
                const target = event.target;
                // Toggle visibility based on input focus and value
                if (target.matches('.ama__global-search form input#edit-search')) {
                    if (target.value.trim() === '') {
                        // Show suggestions if input is empty
                        if (block.classList.contains('hide')) {
                            block.classList.remove('show', 'hide');
                            block.classList.add('show');
                        }
                    }
                    else {
                        // Hide suggestions if input is not empty
                        if (block.classList.contains('show')) {
                            block.classList.remove('show', 'hide');
                            block.classList.add('hide');
                        }
                    }
                }
            }, true);

            // Add 'blur' event listener within context for input
            context.addEventListener('blur', (event) => {
                const target = event.target;
                // Hide suggestions when input loses focus
                if (target.matches('.ama__global-search form input#edit-search')) {
                    if (block.classList.contains('show')) {
                        block.classList.remove('show', 'hide');
                        block.classList.add('hide');
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