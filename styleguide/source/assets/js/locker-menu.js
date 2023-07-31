/**
 * @file
 * Mobile functionality for the locker menu.
 */
(function ($, Drupal) {
    Drupal.behaviors.ama_lockerMenu = {
      attach: function (context, settings) {

        // Select required elements from the DOM
        const menu = $('.ama_locker_navigation');
        const trigger = $('.ama_locker_navigation-trigger');
        const catcher = $('.ama_locker_navigation-catcher');
        const body = $('body');

        function lockerMenu(menu, trigger, catcher, body) {
            trigger.once('click-to-show').on('click', function (e) {
                catcher.toggleClass('hidden').fadeTo('slow', 1);
                menu.toggleClass('hidden').fadeTo('slow', 1);
                body.css({"overflow":"hidden"});
            });
            catcher.once('click-to-hide').on('click', function () {
                catcher.toggleClass('hidden');
                menu.fadeToggle( "fast", "linear" );
                menu.toggleClass('hidden');
                body.css({"overflow":"auto"});
            });
            // When resizing screen, check size of viewport to update sticky state
            $( window ).resize(function(){
                // If less than 850, unstick and remove classes and applied styles from sticky
                if($(window).width() < 768) {
                    $('.ama_locker_navigation').unstick();
                    $('.ama_locker_navigation').toggleClass('hidden');
                    $('.ama_locker_navigation-trigger').sticky({zIndex: 501, topSpacing: 62});
                } else {
                    $('.ama_locker_navigation-trigger').unstick();
                    $('.ama_locker_navigation').sticky({zIndex: 501, topSpacing: 60});
                }
            });
        }

        // Needs doc ready because the admin toolbar needs to get loaded to determine the top spacing for sticky nav
        $(function() {
            var $bodyFixed = $('body').css('overflow');
            if($bodyFixed === 'hidden') {
                $('.ama_locker_navigation').unstick();
            return;
            } else if($(window).width() < 768 ) { // If less than tablet
                $('.ama_locker_navigation-trigger').sticky({zIndex: 501, topSpacing: 62});
                //$('.ama_locker_navigation').toggleClass('hidden');
            } else if($('.toolbar-tray').hasClass('toolbar-tray-horizontal')) {
                $('.ama_locker_navigation').sticky({ zIndex: 501, topSpacing: 132 });
            } else if($('.toolbar-tray').hasClass('toolbar-tray-vertical')) {
                $('.ama_locker_navigation').sticky({ zIndex: 501, topSpacing: 99 });
            } else {
                $('.ama_locker_navigation').sticky({zIndex: 501, topSpacing: 60});
            }
        });

        lockerMenu(menu, trigger, catcher, body);

      }
    };
  })(jQuery, Drupal);
