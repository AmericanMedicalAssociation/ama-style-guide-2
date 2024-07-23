/*
    shows and hides the search_suggestions views block in the global search form.

    Methods.

    1. debounce(func, wait)
        - Debounces a function to limit how often another function can run.
    2. setTabIndex(shouldShow)
        - Sets the tabindex of links within the search suggestions block based on visibility.
    3. toggleShowClass()
        - Toggles the visibility of the search suggestions block based on input focus and content.
    4. searchHasFocus()
        - Checks if an element within .ama__global-search has focus.

    Event Listeners.

    1. Input
     - Listens for input events on the search input field and invokes the debounced version of toggleShowClass.
    2. Focus
      - Listens for focus events throughout the document. If the focus is within the .ama__global-search, it invokes toggleShowClass.
      Otherwise, it checks if the search suggestions are shown and hides them if so.
    3. FocusOut
      - Adds a focusout event listener to the last tabbable element within the search suggestions. It hides the suggestions if the focus moves outside the search suggestions container.
    4. Click
      - Listens for click events throughout the document. If the click is outside the search suggestions and they are shown, it hides the suggestions.
*/

(function (Drupal) {
    Drupal.behaviors.amaSearchSuggestions = {
        attach: function (context, settings) {

            // Cache DOM elements
            const searchSuggestionsWrapper = document.querySelector('.search-suggestions-wrapper');
            const searchSuggestionsBlock = document.querySelector('.search-suggestions-block');
            const inputElement = context.querySelector('.ama__global-search form input#edit-search, .ama__global-search form input#edit-search--2');

            if (!searchSuggestionsWrapper || !searchSuggestionsBlock || !inputElement) {
                console.log('search-suggestions.js - One or more required elements are missing.');
                return; // Exit the function if any required element is missing
            }

            // Debounced version of toggleShowClass
            const debouncedToggleShowClass = debounce(toggleShowClass, 250);

            // Get last tabbable element
            const lastTabbableElement = searchSuggestionsBlock.querySelector('a:last-of-type');
            if (!lastTabbableElement) {
                return;
            }

            /*
               Methods.
            */

            // Debounce function to limit how often a function can run
            function debounce(func, wait) {

                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }

            //  Set the tabindex of the links within the search suggestions block
            function setTabIndex(shouldShow) {

                const links = searchSuggestionsBlock.querySelectorAll('a');

                // Only update tabindex if the visibility state changes.
                if (shouldShow !== searchSuggestionsWrapper.classList.contains('show')) {
                    links.forEach((link) => {
                        link.setAttribute('tabindex', shouldShow ? '0' : '-1');
                    });
                }
            }

            //  If Focus is within .ama__global-search and the text area is empty, show the block.
            // Else, do not.
            function toggleShowClass() {
                const hasFocus = searchHasFocus();
                const shouldShow = inputElement.value.trim() === '';
                const isShown = searchSuggestionsWrapper.classList.contains('show');

                if (hasFocus && shouldShow && !isShown) {

                    // If the block should be shown but is hidden.
                    setTabIndex(true);
                    searchSuggestionsWrapper.classList.add('show');

                    // Update ARIA attributes for accessibility.
                    inputElement.setAttribute('aria-expanded', 'true');
                    searchSuggestionsWrapper.setAttribute('aria-hidden', 'false');

                } else if ((!hasFocus || !shouldShow) && isShown) {

                    //  If the block should be hidden but is still visible, hide it.
                    setTabIndex(false);
                    searchSuggestionsWrapper.classList.remove('show');

                    // Update ARIA attributes for accessibility.
                    inputElement.setAttribute('aria-expanded', 'false');
                    searchSuggestionsWrapper.setAttribute('aria-hidden', 'true');
                }
            }

            //  Check if an element within .ama__global-search has focus.
            function searchHasFocus() {
                // If the active element is within .ama__global-search.
                if (document.activeElement.closest('.ama__global-search')) {
                    return true;
                }
                //  Else.
                return false;
            }

            /*
                Event Listeners.
             */

            // Set the Input event listener.
            inputElement.addEventListener('input', debouncedToggleShowClass, true);

            // set the focus event listener.
            document.addEventListener('focus', function(event) {

                //  Get focused element.
                const isFocusInsideSearch = event.target.closest('.ama__global-search');

                //  If within search block.
                if (isFocusInsideSearch) {

                    //  Invoke the debounced version of toggleShowClass.
                    debouncedToggleShowClass(); // Directly invoke the debounced version of toggleShowClass

                } else if (searchSuggestionsWrapper.classList.contains('show')) {

                    searchSuggestionsWrapper.classList.remove('show');
                    setTabIndex(false);
                }
            }, true);

            //  Add a `focusout` event listener to the last tabbable element
            lastTabbableElement.addEventListener('focusout', function(event) {

                //  Determine if the focus is moving outside the search suggestions container
                const isFocusOutside = !searchSuggestionsWrapper.contains(event.relatedTarget);

                //  Hide the suggestions on focus out.
                if (isFocusOutside) {
                    searchSuggestionsWrapper.classList.remove('show');
                    setTabIndex(false);

                    // Update ARIA attributes for accessibility
                    inputElement.setAttribute('aria-expanded', 'false');
                    searchSuggestionsWrapper.setAttribute('aria-hidden', 'true');
                }
            });

            //  Add a click event to hide block if user clicks away.
            document.addEventListener('click', function(event) {

                //  Get the click target.
                const isClickInsideSearch = searchSuggestionsWrapper.contains(event.target);

                //  Hide the suggestions on click outside.
                if (!isClickInsideSearch && searchSuggestionsWrapper.classList.contains('show')) {
                    searchSuggestionsWrapper.classList.remove('show');
                    setTabIndex(false);

                    // Update ARIA attributes for accessibility
                    inputElement.setAttribute('aria-expanded', 'false');
                    searchSuggestionsWrapper.setAttribute('aria-hidden', 'true');
                }
            });
        }
    };
})(Drupal);