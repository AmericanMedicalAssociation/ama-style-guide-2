(function (Drupal) {
    Drupal.behaviors.amaSearchSuggestions = {
        attach: function (context, settings) {
            const block = document.querySelector('.search-suggestions-wrapper');

            // Function to handle keyup event
            const handleKeyUp = (event) => {
                const inputElement = event.target;
                if (inputElement.value.trim() !== '') {
                    if (block.classList.contains('show')) {
                        block.classList.remove('show', 'hide');
                        block.classList.add('hide');
                    }
                } else {
                    if (block.classList.contains('hide')) {
                        block.classList.remove('show', 'hide');
                        block.classList.add('show');
                    }
                }
            };

            const inputElement = context.querySelector('.ama__global-search form input#edit-search');
            inputElement.addEventListener('change', (event) => {
                if (event.target.value.trim() !== '') {
                    if (block.classList.contains('show')) {
                        block.classList.remove('show', 'hide');
                        block.classList.add('hide');
                    }
                } else {
                    if (block.classList.contains('hide')) {
                        block.classList.remove('show', 'hide');
                        block.classList.add('show');
                    }
                }
            }, true);

            inputElement.addEventListener('keyup', handleKeyUp);

            context.addEventListener('focus', (event) => {
                const target = event.target;
                if (target.matches('.ama__global-search form input#edit-search')) {
                    if (target.value.trim() === '') {
                        if (block.classList.contains('hide')) {
                            block.classList.remove('show', 'hide');
                            block.classList.add('show');
                        }
                    }
                    else {
                        if (block.classList.contains('show')) {
                            block.classList.remove('show', 'hide');
                            block.classList.add('hide');
                        }
                    }
                }
            }, true);

            context.addEventListener('blur', (event) => {
                const target = event.target;
                if (target.matches('.ama__global-search form input#edit-search')) {
                    if (block.classList.contains('show')) {
                        block.classList.remove('show', 'hide');
                        block.classList.add('hide');
                    }
                }
            }, true);

            context.addEventListener('mousedown', (event) => {
                if (inputElement === event.target) {
                    inputElement.focus();
                } else {
                    inputElement.blur();
                }
            });

        }
    };
})(Drupal);