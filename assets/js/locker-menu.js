/**
 * @file
 * Mobile functionality for the locker menu.
 */
(function ($, Drupal, once) {
    Drupal.behaviors.ama_lockerMenu = {
      attach: function (context) {
        // Select required elements from the DOM.
        const $window = $(window);
        const $menu = $('.ama_locker_navigation');
        const $trigger = $('.ama_locker_navigation-trigger');
        const $catcher = $('.ama_locker_navigation-catcher');
        const $body = $('body');
        const bodyFixed = $('body').css('overflow');

        function lockerMenu() {
            // Open menu on trigger click.
            $(once('click-to-show', '.ama_locker_navigation-trigger', context)).on('click', function (e) {
                $menu.addClass('expanded');
                $catcher.toggleClass('hidden');
                $body.css({"overflow":"hidden"});
            });
            // Close menu on background click.
            $(once('click-to-hide', '.ama_locker_navigation-catcher', context)).on('click', function () {
                $catcher.toggleClass('hidden');
                $menu.removeClass('expanded');
                $body.css({"overflow":"auto"});
            });
            // Update sticky state on window resize.
            $window.resize(function(){
                if($window.width() < 600) {
                    if($menu.hasClass('expanded')) {
                        $menu.removeClass('expanded');
                    }
                    $menu.unstick();
                    $trigger.sticky({zIndex: 501, topSpacing: 62});
                } else {
                    $menu.removeClass('expanded');
                    $trigger.unstick();
                    $menu.sticky({zIndex: 501, topSpacing: 89});
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
                $menu.unstick();
                $trigger.sticky({zIndex: 501, topSpacing: 62});
            } else if($('.toolbar-tray').hasClass('toolbar-tray-horizontal')) {
                $menu.sticky({ zIndex: 501, topSpacing: 168 });
            } else if($('.toolbar-tray').hasClass('toolbar-tray-vertical')) {
                $menu.sticky({ zIndex: 501, topSpacing: 195 });
            } else {
                $menu.sticky({zIndex: 501, topSpacing: 89});
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
  })(jQuery, Drupal, once);
