/**
 * @file
 * Attaches behavior to interact with user sign in menu
 */
(function ($, Drupal) {
    Drupal.behaviors.drfinderSignInMenu = {
        attach: function (context, settings) {
            const $dropdownBlock = $('.drfinder__sign-in-dropdown');
            const $dropdownTrigger = $('.drfinder__sign-in-dropdown__trigger');
            const $dropdownMenu = $('.drfinder__sign-in-dropdown__menu');
            const $signInLink = $('.drfinder__sign-in-dropdown__trigger__text');
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

                $dropdownBlock.on('focusout', function () {
                    if (!$dropdownBlock.has(event.relatedTarget).length) {
                        closeMenu($dropdownTrigger, $dropdownMenu);
                    }
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

                menuElement.on('click', function (e) {
                    if (!$(e.target).is('a')) {
                        e.stopPropagation();
                    }
                });
            }

            function openMenu(parentElement, menuElement) {
                parentElement.addClass('open');
                menuElement.show().addClass('drfinder__sign-in-dropdown__menu--open');
            }

            function closeMenu(parentElement, menuElement) {
                if ( Cookies.get('signInCta') !== '1' ) Cookies.set('signInCta', '1');
                parentElement.removeClass('open');
                menuElement.hide().removeClass('drfinder__sign-in-dropdown__menu--open');
            }

            setupDropDown($dropdownBlock, $dropdownTrigger, $dropdownMenu);
        }
    };
})(jQuery, Drupal);

/**
 * @file
 * Attaches behavior to open dismissable sign-in menu when visiting the site
 */
(function ($, Drupal) {
    Drupal.behaviors.signInCta = {
        attach: function (context, settings) {

            function hasNoCtaCookie() {
                const signInCtaCookie = Cookies.get('signInCta');
                return signInCtaCookie !== '1'
            }
            function setCtaCompleted(e){
                Cookies.set('signInCta', '1');
            }
            function bindCompletedEvents(dropdownBlock){
                $(document).on('click', setCtaCompleted);
                dropdownBlock.on('click', setCtaCompleted);
            }
            function startCta(signInDropdown, signInDropdownMenu){
                if (hasNoCtaCookie()) {
                    signInDropdown.addClass('open');
                    signInDropdownMenu.addClass('drfinder__sign-in-dropdown__menu--open');

                    setTimeout(function () {
                        signInDropdown.removeClass('open');
                        signInDropdownMenu.removeClass('drfinder__sign-in-dropdown__menu--open');
                        setCtaCompleted()
                    }, 7000);
                }
            }
            const $dropdownBlock = $('.drfinder__sign-in-dropdown');
            const $signInDropdownTrigger = $('.drfinder__sign-in-dropdown__trigger');
            const $signInDropdownMenu = $('.drfinder__sign-in-dropdown__menu');
            bindCompletedEvents($dropdownBlock)
            startCta($signInDropdownTrigger, $signInDropdownMenu)
        }
    };
})(jQuery, Drupal);
  