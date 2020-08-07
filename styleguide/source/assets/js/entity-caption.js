(function ($, Drupal) {
  Drupal.behaviors.entityCaption = {
    attach: function (context, settings) {

console.log('updated')
      $('figure div[data-entity-embed-display]').each( function () {
        console.log('found one')
          caption = $(this).val( $(this).attr("data-entity-embed-display") );
          console.log(caption)
      });


    }
  };
})(jQuery, Drupal);
