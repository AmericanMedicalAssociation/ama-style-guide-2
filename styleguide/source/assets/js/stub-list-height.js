(function ($, Drupal) {
    // Define a Drupal behavior for adjusting the position of article stub elements.
    Drupal.behaviors.stubListHeight = {
        attach: function (context, settings) {
            // Initialize window width and resize timer
            let windowWidth = $(window).innerWidth();
            let resizeTimer;

            // Iterate over each article stub list in the context on load and set classes.
            $('.article-stub-list', context).each(function () {
                const $articleStubs = $(this).find('.article-stub');
                $articleStubs.each(function () {
                    const $eyebrow = $(this).find('.eyebrow');
                    if ($eyebrow.length && !$(this).closest('.article-stub-list').hasClass('has-eyebrows')) {
                        $(this).closest('.article-stub-list').addClass('has-eyebrows');
                    }
                });
                // If not mobile, run the spacing immediately.
                if (windowWidth > 900) {
                    runSpacingFunction(context);
                }
            });

            // Run CheckThresholds to set variables.
            checkThresholds();

            // Resize event listener to check thresholds after resizing
            $(window).resize(function () {
                clearTimeout(resizeTimer);
                // Only fire if it has been a full 200ms since the last resize.
                resizeTimer = setTimeout(checkThresholds, 250);
            });

            /*
            Function list:
            - checkThresholds: Check window width thresholds and trigger when breakpoints are passed.
            - runSpacingFunction: Run initial spacing adjustments.
            - resetSpacing: Reset all spacing adjustments.
            - getEyebrowHeight: Get the height of the tallest div.eyebrow in the .article-stub-list.
            */

            function checkThresholds() {
                const newWindowWidth = $(window).width();
                // check if breakpoints have been passed.
                if ((windowWidth <= 900 && newWindowWidth > 900) ||
                    (windowWidth > 900 && newWindowWidth <= 900) ||
                    (windowWidth <= 992 && newWindowWidth > 992) ||
                    (windowWidth > 992 && newWindowWidth <= 992) ||
                    (windowWidth <= 1200 && newWindowWidth > 1200) ||
                    (windowWidth > 1200 && newWindowWidth <= 1200)) {

                    // If the windows went from larger to mobile, reset the spacing.
                    if (windowWidth >= 900 && newWindowWidth < 900) {
                        resetSpacing(context);
                    }
                    else {
                        // otherwise run the spacing function.
                        runSpacingFunction(context);
                    }
                    // Update and wait for next resize.
                    windowWidth = newWindowWidth;
                }
            }

            function runSpacingFunction(context) {
                $('.article-stub-list.has-eyebrows', context).each(function () {
                    const $articleStubs = $(this).find('.article-stub');
                    let maxHeight = getEyebrowHeight($articleStubs);

                    $articleStubs.each(function () {
                        const $img = $(this).find('img');
                        const $eyebrow = $(this).find('.eyebrow');

                        if (!$eyebrow.length) {
                            const currentMarginBottom = parseInt($img.css('margin-bottom'), 10);
                            if (currentMarginBottom !== maxHeight) {
                                $img.animate({'margin-bottom': maxHeight + 'px'}, 200, 'swing');
                            }
                        } else {
                            const currentHeight = $eyebrow.outerHeight();
                            if (currentHeight !== maxHeight) {
                                $eyebrow.animate({ 'margin-bottom': (maxHeight - currentHeight) + 'px' }, 200, 'swing');
                            }
                        }
                    });
                });
            }

            function resetSpacing(context) {
                $('.article-stub-list.has-eyebrows', context).each(function () {
                    const $articleStubs = $(this).find('.article-stub');

                    $articleStubs.each(function () {
                        const $img = $(this).find('img');
                        const $eyebrow = $(this).find('.eyebrow');

                        if ($img.length && !$eyebrow.length) {
                            const currentMarginBottom = parseInt($img.css('margin-bottom'), 10);
                            if (currentMarginBottom !== 0) {
                                $img.animate({ 'margin-bottom': '0px' }, 200, 'swing', function() {
                                    $img.css('margin-bottom', '0px');
                                });
                            }
                        }
                        if ($eyebrow.length && $eyebrow.css('margin-bottom') !== '10px') {
                            $eyebrow.animate({ 'margin-bottom': '10px' }, 200, 'swing');
                        }
                    });
                });
            }

            function getEyebrowHeight($articleStubs) {
                let maxHeight = 0;
                $articleStubs.each(function () {
                    const $eyebrow = $(this).find('.eyebrow');
                    if ($eyebrow.length) {
                        const height = $eyebrow.outerHeight();
                        if (height > maxHeight) {
                            maxHeight = height;
                        }
                    }
                });
                // div.eyebrow height + 10px default bottom margin.
                maxHeight = maxHeight + 10;
                return maxHeight;
            }
        }
    };
})(jQuery, Drupal);