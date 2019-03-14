(function ($, Drupal) {
  Drupal.behaviors.peopeListing = {
    attach: function (context, settings) {
      if($('.ama__people-listing__card-container').length){
        var $cardHeight = 0;
        var $card = $('.ama__people-listing__card-container .ama__people-listing-card');

        $card.each(function() {
          $cardHeight = $(this).height() > $cardHeight ? $(this).height() : $cardHeight;
        });

        $card.height($cardHeight);
      }
    }
  };
})(jQuery, Drupal);
