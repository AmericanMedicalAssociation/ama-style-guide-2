(function ($, Drupal) {
    Drupal.behaviors.stubListHeight = {
        attach: function (context, settings) {
            let windowWidth = window.innerWidth;
            let resizeTimer;

            // check thresholds on resize
            $(window).resize(function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(checkThresholds, 250);
            });

            // Add class to article-stub-list if it contains an eyebrow.
            $('.article-stub-list', context).each(function () {
                const $articleStubs = $(this).find('.article-stub');
                $articleStubs.each(function () {
                    const $eyebrow = $(this).find('.eyebrow');
                    if ($eyebrow.length && !$(this).closest('.article-stub-list').hasClass('has-eyebrows')) {
                        $(this).closest('.article-stub-list').addClass('has-eyebrows');
                    }
                });
            });

            //  Initialize thresholds.
            checkThresholds();

            // Run the spacing function on page load
            if (windowWidth >= 1200) {
                runSpacingFunction();
            }
            if (windowWidth > 900 && windowWidth <= 1199) {
                runTabletSpacingFunction();
            }

            function checkThresholds() {
                const newWindowWidth = window.innerWidth;
                //  If any breakpoint is passed, run.
                if ((windowWidth <= 900 && newWindowWidth > 900) ||
                    (windowWidth > 900 && newWindowWidth <= 900) ||
                    (windowWidth <= 992 && newWindowWidth > 992) ||
                    (windowWidth > 992 && newWindowWidth <= 992) ||
                    (windowWidth <= 1199 && newWindowWidth > 1200) ||
                    (windowWidth > 1200 && newWindowWidth <= 1199)) {

                    // If going to mobile, reset spacing.
                    if (windowWidth > 900 && newWindowWidth <= 900) {
                        resetSpacing(context);
                    }

                    // If going to or from the two tablet breakpoints, run the tablet spacing function.
                    if ((windowWidth <= 900 && newWindowWidth > 900 && newWindowWidth <= 1199) ||
                        (windowWidth >= 1200 && newWindowWidth > 900 && newWindowWidth <= 1199) ||
                        (windowWidth > 900 && windowWidth <= 992 && newWindowWidth > 992 && newWindowWidth <= 1199) ||
                        (windowWidth > 991 && windowWidth <= 1199 && newWindowWidth > 900 && newWindowWidth <= 991)) {
                        runTabletSpacingFunction(context);
                    }

                    // If going to desktop, run the spacing function.
                    if (windowWidth < 1200 && newWindowWidth >= 1200) {
                        runSpacingFunction(context);
                    }

                    // Update windowWidth for next run.
                    windowWidth = newWindowWidth;
                }
            }

            function runSpacingFunction(context) {
                $('.has-eyebrows', context).each(function () {
                    const $articleStubs = $(this).find('.article-stub');
                    // Get the height of the tallest eyebrow.
                    const result = getEyebrowHeight($articleStubs);
                    let maxHeight = result.maxHeight;

                    $articleStubs.each(function () {
                        const $img = $(this).find('img');
                        const $eyebrow = $(this).find('.eyebrow');

                        // If this stub doesn't have an eyebrow.
                        if (!$eyebrow.length) {
                            // Check the bottom margin of the img. If it doesn't equal maxHeight, change it.
                            const currentMarginBottom = parseInt($img.css('margin-bottom'), 10);
                            if (currentMarginBottom !== maxHeight) {
                                $img.css('margin-bottom', maxHeight + 'px');
                            }
                        } else {
                            // If it has an eyebrow, measure it and compare it to maxHeight. If it's different, change it.
                            const currentHeight = $eyebrow.outerHeight();
                            if (currentHeight !== maxHeight) {
                                $eyebrow.css('margin-bottom', (maxHeight - currentHeight) + 'px');
                            }
                        }
                    });
                });
            }

            // Trigger spacing adjustments on tablet.
            function runTabletSpacingFunction(context) {
                $('.has-eyebrows', context).each(function () {
                    const $articleStubs = $(this).find('.article-stub');
                    const dataCount = parseInt($(this).attr('data-count'), 10);
                    // Depending on number of articles, slice differently.
                    if (dataCount === 4) {
                        adjustPair($articleStubs.slice(0, 2));
                        adjustPair($articleStubs.slice(2, 4));
                    } else if (dataCount === 3) {
                        adjustPair($articleStubs.slice(0, 2));
                        adjustPair($articleStubs.slice(1, 3));
                    }
                });
            }

            // In tablet mode, align the titles of stubs 1-2 and 3-4 independently.
            function adjustPair($pair) {
                // If there is only one article in the pair, it doesn't need alignment.
                if ($pair.length === 1) {
                    quickReset($pair);
                } else {
                    const result = getEyebrowHeight($pair);
                    let maxHeight = result.maxHeight;
                    let hasEyebrow = result.hasEyebrow;

                    //  This pair contains at least 1 eyebrow.
                    if (hasEyebrow) {
                        $pair.each(function () {
                            const $img = $(this).find('img');
                            const $eyebrow = $(this).find('.eyebrow');

                            //  This stub has an eyebrow, adjust the spacing
                            if ($eyebrow.length) {
                                const currentHeight = $eyebrow.outerHeight();
                                //  If they're different, match the maxHeight.
                                if (currentHeight !== maxHeight) {
                                    $eyebrow.css('margin-bottom', (maxHeight- currentHeight) + 'px' );
                                }
                                // If they're the same, set default margin.
                                if (currentHeight === maxHeight) {
                                    const currentMargin = parseInt($eyebrow.css('margin-bottom'), 10);
                                    if (currentMargin !== 10) {
                                        $eyebrow.css('margin-bottom', '10px');
                                    }
                                }
                            } else {
                            //  This stub doesn't have an eyebrow, so set the max-height as the img bottom margin.
                                const currentMarginBottom = parseInt($img.css('margin-bottom'), 10);
                                if (currentMarginBottom !== maxHeight) {
                                    $img.css('margin-bottom', maxHeight + 'px');
                                }
                            }
                        });
                    } else {
                    //  This pair doesn't have eyebrows, so reset the img bottom margin.
                        $pair.each(function () {
                            const $img = $(this).find('img');
                            const currentMarginBottom = parseInt($img.css('margin-bottom'), 10);
                            if (currentMarginBottom !== 0) {
                                $img.css('margin-bottom', '0px');
                            }
                        });
                    }
                }
            }

            // Reset all spacing on mobile.
            function resetSpacing(context) {
                $('.has-eyebrows', context).each(function () {
                    const $articleStubs = $(this).find('.article-stub');

                    $articleStubs.each(function () {
                        const $img = $(this).find('img');
                        const $eyebrow = $(this).find('.eyebrow');

                        if ($img.length && !$eyebrow.length) {
                            const currentMarginBottom = parseInt($img.css('margin-bottom'), 10);
                            if (currentMarginBottom !== 0) {
                                $img.css('margin-bottom', '0px');
                            }
                        }
                        if ($eyebrow.length && $eyebrow.css('margin-bottom') !== '10px') {
                            $eyebrow.css('margin-bottom', '10px');
                        }
                    });
                });
            }

            // Reset a single or pair of cards in tablet mode.
            function quickReset($pair) {
                $pair.each(function () {
                    const $img = $(this).find('img');
                    const $eyebrow = $(this).find('.eyebrow');

                    if ($eyebrow.length) {
                        const currentMarginBottom = parseInt($eyebrow.css('margin-bottom'), 10);
                        if (currentMarginBottom !== 10) {
                            $eyebrow.css('margin-bottom', '10px');
                        }
                    } else {
                        const currentMarginBottom = parseInt($img.css('margin-bottom'), 10);
                        if (currentMarginBottom !== 0) {
                            $img.css('margin-bottom', '0px');
                        }
                    }
                });
            }

            // Get the tallest eyebrow height and set a boolean whether the set contains an eyebrow.
            function getEyebrowHeight($articleStubs) {
                let maxHeight = 0;
                let hasEyebrow = false;
                $articleStubs.each(function () {
                    const $eyebrow = $(this).find('.eyebrow');
                    if ($eyebrow.length) {
                        hasEyebrow = true;
                        const height = $eyebrow.outerHeight();
                        if (height > maxHeight) {
                            maxHeight = height;
                        }
                    }
                });
                maxHeight = maxHeight + 10;
                return { maxHeight, hasEyebrow };
            }

        }
    };
})(jQuery, Drupal);