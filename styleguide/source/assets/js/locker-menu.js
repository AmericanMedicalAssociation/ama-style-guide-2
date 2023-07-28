/**
 * @file
 * Mobile functionality for the locker menu.
 */
(function ($, Drupal) {
    Drupal.behaviors.ama_lockerMenu = {
      attach: function (context, settings) {

        // Select required elements from the DOM
        const modal = $('.ama_locker_navigation-menu-mobile');
        const trigger = $('.locker-menu-trigger');
        const catcher = $('.click-catcher');
        const body = $('body');

        function lockerMenu(modal, trigger, catcher, body) {
          trigger.unbind('click').click(function(e){
            e.stopPropagation();
            modal.fadeToggle( "fast", "linear" );
            body.css({"overflow":"hidden"});
            modal.toggleClass('hidden');

          });
          catcher.once('click-to-hide').on('click', function () {
            modal.fadeToggle( "fast", "linear" );
            modal.toggleClass('hidden');
            body.css({"overflow":"auto"});
          });
        }

        lockerMenu(modal, trigger, catcher, body);

      }
    };
  })(jQuery, Drupal);

