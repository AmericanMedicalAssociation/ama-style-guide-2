(function ($, Drupal) {
  Drupal.behaviors.glossary_load = {
    attach: function(context, settings) {

      $(document).ready(function() {

        var currUrl = window.location.href;

        //  look for any topic being searched.
        var regex = /topic=(.*?)&|&topic=.*/i;

        //  Loop through the filter links looking for a topic query parameter. If there is one, strip it out.
        $('#edit-name--2 a.bef-link').once().each(function (i, link) {
          var oldUrl = $(link).attr("href");
          if(regex.test(oldUrl)) {
            var newUrl = oldUrl.replace(regex, '');
            $(link).attr("href", newUrl);
          }
        });

        // Set selected category link to center of horizontal div
        function catalogLinkScroll() {
          // Get link wrapper
          var catalogLinkWrapper = $('#edit-name--2');
          // Get horizontal position of currently selected link
          var scrollPosition = $('#edit-name--2--wrapper a.bef-link--selected').position().left;
          // Get current scroll position
          var currentScrollPosition = catalogLinkWrapper.scrollLeft();
          // Get current width of wrapper container
          var containerWidth = catalogLinkWrapper.width();
          // Set new scroll position to half of wrapper width
          var scrollPosition = (scrollPosition + currentScrollPosition) - (containerWidth/2);
          // Set horizontal scroll position to show letter
          $('#edit-name--2').scrollLeft(scrollPosition);
          // Scroll the bar automatically to show that item
          catalogLinkWrapper.animate({'scrollLeft': scrollPosition});
        }

        // Only set the scroll on mobile
        if ($(window).width() < 900) {
          catalogLinkScroll();
        }
      });

    }
  };
})(jQuery, Drupal);
