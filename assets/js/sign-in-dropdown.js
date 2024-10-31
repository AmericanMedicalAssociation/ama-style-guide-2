(function ($, Drupal) {
    Drupal.behaviors.amaSignInMenu = {
        attach: function (context, settings) {
            const $dropdownBlock = $('.ama__sign-in-dropdown');
            const $dropdownTrigger = $('.ama__sign-in-dropdown__trigger');
            const $dropdownMenu = $('.ama__sign-in-dropdown__menu');
            const $signInLink = $('.ama__sign-in-dropdown__trigger__text');
            const $menuLinks = $dropdownMenu.find('a');
            let isDropdownOpen = false;

            function setupDropDown(dropdownBlock, triggerElement, menuElement) {
                dropdownBlock.off('click').on('click', function (e) {
                    e.stopPropagation();
                    if (isDropdownOpen) {
                        closeMenu(triggerElement, menuElement);
                    } else {
                        openMenu(triggerElement, menuElement);
                    }
                    isDropdownOpen = !isDropdownOpen;
                });

                $signInLink.on('click', function (e) {
                    e.preventDefault();
                });

                menuElement.on('click', function (e) {
                    e.stopPropagation();
                });

                $menuLinks.on('click', function () {
                    closeMenu($dropdownTrigger, $dropdownMenu);
                    isDropdownOpen = false;
                });

                $(document).on('click', function (e) {
                    if (!dropdownBlock.is(e.target) && dropdownBlock.has(e.target).length === 0) {
                        closeMenu(triggerElement, menuElement);
                        isDropdownOpen = false;
                    }
                });

                dropdownBlock.on('mouseenter', function () {
                    clearTimeout(dropdownBlock.timeoutId);
                }).on('mouseleave', function () {
                    dropdownBlock.timeoutId = setTimeout(function () {
                        closeMenu(triggerElement, menuElement);
                        isDropdownOpen = false;
                    }, 2000);
                });
            }

            function openMenu(parentElement, menuElement) {
                parentElement.addClass('open');
                menuElement.show().addClass('ama__sign-in-dropdown__menu--open');
            }

            function closeMenu(parentElement, menuElement) {
                if (Cookies.get('signInCta') !== '1') Cookies.set('signInCta', '1');
                parentElement.removeClass('open');
                menuElement.hide().removeClass('ama__sign-in-dropdown__menu--open');
            }

            setupDropDown($dropdownBlock, $dropdownTrigger, $dropdownMenu);
        }
    };
})(jQuery, Drupal);