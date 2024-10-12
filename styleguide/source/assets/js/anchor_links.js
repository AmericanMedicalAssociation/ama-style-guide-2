(function ($, Drupal) {
  Drupal.behaviors.ama_anchors = {
    attach: function (context, settings) {
      $(document).ready(function () {
        // Function to handle scrolling to anchor
        function scrollToAnchor(hash) {
          // Get the height of the header to determine the initial offset
          var offset = $('header').outerHeight() || 0;

          // Add the height of the page grouper if it exists
          if ($(window).width() < 601 && $('.ama_page_grouping_news').length) {
            offset += $('.ama_page_grouping_news').outerHeight();
          } else {
            // Determine the desktop offset based on the presence of the toolbar-horizontal class
            offset = $('body').hasClass('toolbar-horizontal') ? offset + 80 : offset;
          }

          var target = $(hash);
          target = target.length ? target : $('[name="' + hash.slice(1) + '"]');
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
