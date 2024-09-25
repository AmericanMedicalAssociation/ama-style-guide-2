(function ($, Drupal) {
  Drupal.behaviors.ama_anchors = {
    attach: function (context, settings) {
      $(document).ready(function () {
        // Function to handle scrolling to anchor
        function scrollToAnchor(hash) {
          // Determine the offset based on the presence of the toolbar-horizontal class
          var offset;
          if ($(window).width() < 601) {
            offset = 160;
          } else {
            offset = $('body').hasClass('toolbar-horizontal') ? 180 : 110;
          }

          var target = $(hash);
          target = target.length ? target : $('[name=' + hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate(
              {
                scrollTop: target.offset().top - offset,
              },
              500
            );
          }
        }

        // On click of any anchor link
        $('a[href^="#"], a[href*="#"]').bind('click', function (e) {
          e.preventDefault(); // prevent hard jump, the default behavior

          // Perform animated scrolling
          scrollToAnchor(this.hash);
        });

        // On page load with anchor in URL
        if (window.location.hash) {
          scrollToAnchor(window.location.hash);
        }
      });
    },
  };
})(jQuery, Drupal);