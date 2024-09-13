(function ($, Drupal) {
    Drupal.behaviors.ama_signInMenu = {
        attach: function (context, settings) {
            var $signInDropdown = $('.ama__sign-in-dropdown');
            var $signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
            var $signInLink = $('.ama__sign-in-dropdown__text');
            var $exploreMenu = $('.ama__explore-menu');
            var $exploreMenuDropdown = $('.ama__explore-menu__menu');
            var isDropdownOpen = false;

            function dropdownDownMenu(parentElement, menuElement) {
                parentElement.unbind('click').click(function(e){
                    e.stopPropagation();
                    if (isDropdownOpen) {
                        $(menuElement).slideUp();
                        $(parentElement).removeClass('open');
                    } else {
                        $(menuElement).slideDown();
                        $(parentElement).addClass('open');
                    }
                    isDropdownOpen = !isDropdownOpen;
                });

                // Stop link from firing
                $signInLink.click(function(e) {
                    e.preventDefault();
                });

                $(document).click(function(e) {
                    // if the target of the click isn't the container nor a descendant of the container
                    if (!parentElement.is(e.target) && parentElement.has(e.target).length === 0) {
                        $(menuElement).slideUp();
                        $(parentElement).removeClass('open');
                        isDropdownOpen = false;
                    }
                });

                // Set timeout for when a user mouses out of the menu
                parentElement.mouseenter(function(){
                    clearTimeout(parentElement.timeoutId);
                }).mouseleave(function(){
                    parentElement.timeoutId = setTimeout(function(){
                        $(menuElement).slideUp();
                        $(parentElement).removeClass('open');
                        isDropdownOpen = false;
                    }, 2000);
                });
            }

            dropdownDownMenu($signInDropdown, $signInDropdownMenu);
            dropdownDownMenu($exploreMenu, $exploreMenuDropdown);
        }
    };
})(jQuery, Drupal);
