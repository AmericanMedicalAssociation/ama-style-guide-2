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
        var podcastPlayer = $('div.podcast-container');
        var width = $(document).width();

        if (width < 600) {
          podcastPlayer.insertBefore('div.ama__podcast-player + .ama__podcast-player__links');
        } else if (width > 600) {
          podcastPlayer.insertAfter('div.ama__podcast-player__episode_info h4');
        }
      }
    }
  };
})(jQuery, Drupal);