(function ($, Drupal) {
  Drupal.behaviors.mobileHomepageCta = {
    attach: function (context, settings) {
      (function ($) {
        function checkCharacterCount() {
          // Find all anchor elements within the ama__mobile-homepage-cta container
          var anchors = $('.ama__mobile-homepage-cta a', context);

          // Ensure anchors are not null or empty
          if (anchors.length === 0) {
            return;
          }

          // Check if any anchor within the container has a character count greater than 25
          var checkCount = anchors.toArray().some(function(anchor) {
            return $(anchor).text().length > 25;
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
