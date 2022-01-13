(function ($, Drupal) {
  Drupal.behaviors.ama_podcast = {
    attach: function (context, settings) {
      $(document).ready(function() {
        //Check initial window with
        playerPlacement();
      
        //Check window width on resize
        $(window).resize(function() {
          playerPlacement();
        });

      });

      function playerPlacement() {
        var podcastImage = $('div.ama__podcast-player .ama__image');
        var width = $(document).width();
        console.log(width);
        if (width < 600) {
          podcastImage.insertBefore('div.podcast-container');
        } else if (width > 600) {
          podcastImage.insertAfter('div.ama__podcast-player__episode_info');
        }
      }
    }
  };
})(jQuery, Drupal);