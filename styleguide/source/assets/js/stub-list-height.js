(function ($, Drupal) {
    Drupal.behaviors.stubListHeight = {
        attach: function (context, settings) {
            $('.article-stub-list', context).each(function () {
                var $articleStubs = $(this).find('.article-stub');
                var maxHeight = 0;
                var eyebrows = [];

                // Collect all eyebrow heights and find the maximum height
                $articleStubs.each(function () {
                    var $eyebrow = $(this).find('.eyebrow');
                    if ($eyebrow.length) {
                        var height = $eyebrow.outerHeight();
                        eyebrows.push({ $eyebrow: $eyebrow, height: height });
                        if (height > maxHeight) {
                            maxHeight = height;
                        }
                    }
                });

                // If no eyebrows are found, do nothing
                if (eyebrows.length === 0) {
                    return;
                }

                // Adjust margin-bottom for images and animate margin-bottom for eyebrows
                $articleStubs.each(function () {
                    var $img = $(this).find('img');
                    var $eyebrow = $(this).find('.eyebrow');

                    if (!$eyebrow.length && $img.css('margin-bottom') === '0px') {
                        $img.css('margin-bottom', maxHeight + 'px');
                    } else if ($eyebrow.length) {
                        var heightDifference = maxHeight - $eyebrow.outerHeight();
                        if (heightDifference > 0) {
                            $eyebrow.animate({ 'margin-bottom': (heightDifference + 10) + 'px' }, 200, 'swing');
                        }
                    }
                });
            });
        }
    };
})(jQuery, Drupal);