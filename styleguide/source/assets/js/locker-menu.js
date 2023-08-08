/**
 * @file
 * Mobile functionality for the locker menu.
 */
(function ($, Drupal) {
    Drupal.behaviors.ama_lockerMenu = {
      attach: function (context, settings) {
        // Select required elements from the DOM.
        const $window = $(window);
        const $menu = $('.ama_locker_navigation');
        const $trigger = $('.ama_locker_navigation-trigger');
        const $catcher = $('.ama_locker_navigation-catcher');
        const $body = $('body');
        const bodyFixed = $('body').css('overflow');

        function lockerMenu() {
            // Open menu on trigger click.
            $trigger.once('click-to-show').on('click', function (e) {
                $menu.toggleClass('hidden');
                $catcher.toggleClass('hidden');
                $body.css({"overflow":"hidden"});
            });
            // Close menu on background click.
            $catcher.once('click-to-hide').on('click', function () {
                $catcher.toggleClass('hidden');
                $menu.toggleClass('hidden');
                $body.css({"overflow":"auto"});
            });
            // Update sticky state on window resize.
            $window.resize(function(){
                if($window.width() < 600) {
                    $menu.unstick().addClass('hidden');
                    $trigger.sticky({zIndex: 501, topSpacing: 62});
                } else {
                    $trigger.unstick();
                    $menu.sticky({zIndex: 501, topSpacing: 60}).removeClass('hidden');
                }
            });
        }

        lockerMenu();

        // Need to load admin toolbar before determining top spacing for sticky elements.
        $(function() {
            if(bodyFixed === 'hidden') {
                $('.ama_locker_navigation').unstick();
            return;
            } else if($window.width() < 600) {
                $menu.unstick().addClass('hidden');
                $trigger.sticky({zIndex: 501, topSpacing: 62});
            } else if($('.toolbar-tray').hasClass('toolbar-tray-horizontal')) {
                $menu.sticky({ zIndex: 501, topSpacing: 132 });
            } else if($('.toolbar-tray').hasClass('toolbar-tray-vertical')) {
                $menu.sticky({ zIndex: 501, topSpacing: 99 });
            } else {
                $menu.sticky({zIndex: 501, topSpacing: 60});
            }
        });

        // If sticky nav wrapper, remove id to prevent duplicate ids.
        $(window).on('load', function() {
            $stickyWrapper = $('.sticky-wrapper');
            if($stickyWrapper.length && $stickyWrapper.has('#share-wrapper')) {
                $stickyWrapper.removeAttr('id');
            }
        });

      }
    };
  })(jQuery, Drupal);
