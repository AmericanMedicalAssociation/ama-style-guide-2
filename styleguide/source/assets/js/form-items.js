/**
 * @file
 * Form fields masking
 */

(function ($, Drupal) {
  Drupal.behaviors.formItems = {
    attach: function (context, settings) {
      (function ($) {
        $(document).ready(function(){
          $('.ama__select-menu__select').selectmenu();
          $( "[type=checkbox]" ).checkboxradio();

          // Textarea word count
          function count_remaining_character() {
            var max_length = 150;
            var character_entered = $('.textarea').val().length;
            var character_remaining = max_length - character_entered;
            $('.character-count').html(character_remaining);
            if(max_length < character_entered) {
              $('.textarea').addClass('error');
              $('.character-count').addClass('error');
            } else {
              $('.textarea').removeClass('error');
              $('.character-count').removeClass('error');
            }
          }

          $('.textarea').keyup(function() {
            count_remaining_character();
          });
        });
      })(jQuery);
    }
  };
})(jQuery, Drupal);
