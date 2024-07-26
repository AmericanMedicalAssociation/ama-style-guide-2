(function (Drupal) {
    Drupal.behaviors.ama_signInMenu = {
        attach: function (context, settings) {
            var signInDropdown = document.querySelector('.ama__sign-in-dropdown');
            var signInDropdownMenu = document.querySelector('.ama__sign-in-dropdown__menu');
            var signInLink = document.querySelector('.ama__sign-in-dropdown__text');
            var exploreMenu = document.querySelector('.ama__explore-menu');
            var exploreMenuDropdown = document.querySelector('.ama__explore-menu__menu');

            function dropdownDownMenu(parentElement, menuElement) {
                parentElement.addEventListener('click', function (e) {
                    e.stopPropagation();
                    menuElement.classList.toggle('open');
                    parentElement.classList.toggle('open');
                });

                // Stop link from firing
                signInLink.addEventListener('click', function (e) {
                    e.preventDefault();
                });

                document.addEventListener('click', function (e) {
                    if (!parentElement.contains(e.target)) {
                        menuElement.classList.remove('open');
                        parentElement.classList.remove('open');
                    }
                });

                parentElement.addEventListener('mouseenter', function () {
                    clearTimeout(parentElement.timeoutId);
                });

                parentElement.addEventListener('mouseleave', function () {
                    parentElement.timeoutId = setTimeout(function () {
                        menuElement.classList.remove('open');
                        parentElement.classList.remove('open');
                    }, 2000);
                });
            }

            dropdownDownMenu(signInDropdown, signInDropdownMenu);
            dropdownDownMenu(exploreMenu, exploreMenuDropdown);
        }
    };
})(Drupal);