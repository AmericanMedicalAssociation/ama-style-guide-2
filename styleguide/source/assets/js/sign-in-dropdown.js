(function ($, Drupal) {
    // Define a Drupal behavior named ama_signInMenu
    Drupal.behaviors.ama_signInMenu = {
        attach: function (context, settings) {
            // Select necessary DOM elements
            var $signInDropdown = $('.ama__sign-in-dropdown');
            var $signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
            var $signInLink = $('.ama__sign-in-dropdown__text');
            var $exploreMenu = $('.ama__explore-menu');
            var $exploreMenuDropdown = $('.ama__explore-menu__menu');

            // Function to handle dropdown menu behavior
            function dropdownDownMenu(parentElement, menuElement) {
                // Toggle menu visibility on click
                parentElement.unbind('click').click(function(e){
                    e.stopPropagation();
                    $(menuElement).slideToggle();
                    $(parentElement).toggleClass('open');
                });

                // Prevent default action for sign-in link
                $signInLink.click(function(e) {
                    e.preventDefault();
                });

                // Close menu if click occurs outside of it
                $(document).click(function(e) {
                    if (!parentElement.is(e.target) && parentElement.has(e.target).length === 0) {
                        $(menuElement).slideUp();
                        $(parentElement).removeClass('open');
                    }
                });

                // Clear timeout on mouse enter
                parentElement.mouseenter(function() {
                    clearTimeout(parentElement.data('timeoutId'));
                }).mouseleave(function() {
                    // Set timeout to close menu on mouse leave
                    var timeoutId = setTimeout(function() {
                        $(menuElement).slideUp();
                        $(parentElement).removeClass('open');
                    }, 2000);
                    parentElement.data('timeoutId', timeoutId);
                });
            }

            // Attach dropdown behavior to sign-in and explore menus
            dropdownDownMenu($signInDropdown, $signInDropdownMenu);
            dropdownDownMenu($exploreMenu, $exploreMenuDropdown);
        }
    };
})(jQuery, Drupal);