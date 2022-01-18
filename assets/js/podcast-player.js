(function ($, Drupal) {
  Drupal.behaviors.ama_podcast = {
    attach: function (context, settings) {
      $(document).ready(function() {
        //Check initial window with
        playerPlacement();

        //Check number of links
        oddLinks();
      
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

      function oddLinks() {
        var count = $("ul.ama__podcast-player__links li").length;
        var linkContainer = $("ul.ama__podcast-player__links");

        console.log('Amount of podcast links: ' + count);
        if (count == 3 || count == 1) {
          linkContainer.addClass('odd_links');
        }
      }
    }
  };
})(jQuery, Drupal);