(function ($, Drupal) {
  Drupal.behaviors.mobileHomepageCta = {
    attach: function (context, settings) {
      (function ($) {
        // Check character count of anchor elements within the ama__mobile-homepage-cta container
        function checkCharacterCount() {
          // Find the ama__mobile-homepage-cta container
          var container = $('.ama__mobile-homepage-cta', context);

          // Remove the 'column' class if it exists
          container.removeClass('column');

          // Find all anchor elements within the ama__mobile-homepage-cta container
          var anchors = container.find('a');

          // Ensure anchors are not null or empty
          if (anchors.length === 0) {
            return;
          }

          // Check if any anchor within the container has a character count greater than 25
          var checkCount = anchors.toArray().some(function(anchor) {
            // Remove all spaces before checking the character count
            var text = $(anchor).text().replace(/\s+/g, '');
            return text.length > 25;
          });

          // Add class 'column' to the container if condition is met
          if (checkCount) {
            var container = $('.ama__mobile-homepage-cta', context);
            if (container.length) {
              container.addClass('column');
            }
          }
        }

        checkCharacterCount();
      })(jQuery);
    }
  };
})(jQuery, Drupal);
