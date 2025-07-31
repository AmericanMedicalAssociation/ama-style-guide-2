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
            var $searchWrapper = context.querySelector('.search-suggestions-wrapper');
            var $searchBlock = context.querySelector('.search-suggestions-block');
            var $input = context.querySelector('.ama__global-search form input#edit-search, .ama__global-search form input[id^="edit-search--"]');

            if (!$searchWrapper || !$searchBlock || !$input) {
                return;
            }

            // Debounce function (ES5)
            function debounce(func, wait) {
                var timeout;
                return function () {
                    var args = arguments;
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        func.apply(null, args);
                    }, wait);
                };
            }

            // Set tabindex for links
            function setTabIndex(shouldShow) {
                var links = $searchBlock.querySelectorAll('a');
                var isShown = $searchWrapper.classList.contains('show');
                if (shouldShow !== isShown) {
                    Array.prototype.forEach.call(links, function (link) {
                        link.setAttribute('tabindex', shouldShow ? '0' : '-1');
                    });
                }
            }

            // Check if focus is inside search
            function searchHasFocus() {
                var active = document.activeElement;
                return !!(active && active.closest('.ama__global-search'));
            }

            // Toggle show/hide
            function toggleShowClass() {
                var hasFocus = searchHasFocus();
                var shouldShow = $input && $input.value.trim() === '';
                var isShown = $searchWrapper.classList.contains('show');
                if (hasFocus && shouldShow && !isShown) {
                    setTabIndex(true);
                    $searchWrapper.classList.add('show');
                    $input.setAttribute('aria-expanded', 'true');
                    $searchWrapper.setAttribute('aria-hidden', 'false');
                } else if ((!hasFocus || !shouldShow) && isShown) {
                    setTabIndex(false);
                    $searchWrapper.classList.remove('show');
                    $input.setAttribute('aria-expanded', 'false');
                    $searchWrapper.setAttribute('aria-hidden', 'true');
                }
            }

            var debouncedToggle = debounce(toggleShowClass, 250);

            // Input event
            $input.addEventListener('input', debouncedToggle, true);

            // Focus event (scoped to context)
            context.addEventListener('focus', function (event) {
                var isFocusInside = event.target.closest('.ama__global-search');
                if (isFocusInside) {
                    debouncedToggle();
                } else if ($searchWrapper.classList.contains('show')) {
                    $searchWrapper.classList.remove('show');
                    setTabIndex(false);
                }
            }, true);

            // Focusout on last tabbable element
            var $lastTabbable = $searchBlock.querySelector('a:last-of-type');
            if ($lastTabbable) {
                $lastTabbable.addEventListener('focusout', function (event) {
                    var isFocusOutside = !$searchWrapper.contains(event.relatedTarget);
                    if (isFocusOutside) {
                        $searchWrapper.classList.remove('show');
                        setTabIndex(false);
                        $input.setAttribute('aria-expanded', 'false');
                        $searchWrapper.setAttribute('aria-hidden', 'true');
                    }
                });
            }

            // Click event (scoped to context)
            context.addEventListener('click', function (event) {
                var isClickInside = $searchWrapper.contains(event.target);
                if (!isClickInside && $searchWrapper.classList.contains('show')) {
                    $searchWrapper.classList.remove('show');
                    setTabIndex(false);
                    $input.setAttribute('aria-expanded', 'false');
                    $searchWrapper.setAttribute('aria-hidden', 'true');
                }
            });
        }
    };
})(Drupal);
