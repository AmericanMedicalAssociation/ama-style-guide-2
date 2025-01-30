(function ($, Drupal) {
    Drupal.behaviors.stubListHeight = {
        attach: function (context, settings) {

            let windowWidth = $(window).width();
            let resizeTimer;

            $(window).resize(function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(checkThresholds, 200);
            });

            $('.article-stub-list', context).each(function () {
                const $articleStubs = $(this).find('.article-stub');
                $articleStubs.each(function () {
                    const $eyebrow = $(this).find('.eyebrow');
                    if ($eyebrow.length && !$(this).closest('.article-stub-list').hasClass('has-eyebrows')) {
                        $(this).closest('.article-stub-list').addClass('has-eyebrows');
                        $(this).closest('.article-stub-list').addClass('unprocessed');
                    }
                });
            });

            checkThresholds();

            function checkThresholds() {
                const newWindowWidth = $(window).width();

                $('.article-stub-list.has-eyebrows.unprocessed', context).each(function () {
                    if (windowWidth > 900) {
                        runSpacingFunction(context);
                    }
                }) ;

                if ((windowWidth <= 900 && newWindowWidth > 900) ||
                    (windowWidth > 900 && newWindowWidth <= 900) ||
                    (windowWidth <= 992 && newWindowWidth > 992) ||
                    (windowWidth > 992 && newWindowWidth <= 992) ||
                    (windowWidth <= 1200 && newWindowWidth > 1200) ||
                    (windowWidth > 1200 && newWindowWidth <= 1200)) {

                    if (windowWidth <= 900 && newWindowWidth > 900) {
                        $('.article-stub-list.has-eyebrows', context).each(function () {
                            if ($(this).hasClass('unprocessed')) {
                                runSpacingFunction(context);
                            }
                            else {
                                reRunSpacingFunction(context);
                            }
                        });
                    }

                    else if (windowWidth >= 900 && newWindowWidth < 900) {
                        resetSpacing(context);
                    }
                    else {
                        $('.article-stub-list.has-eyebrows', context).each(function () {
                            if (!$(this).hasClass('unprocessed')) {
                                reRunSpacingFunction(context);
                            }
                        });
                    }
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

                        if (!$eyebrow.length && $img.css('margin-bottom') === '0px') {
                            $img.animate({'margin-bottom': maxHeight + 'px'}, 200, 'swing');
                        } else if ($eyebrow.length) {
                            const currentHeight = $eyebrow.outerHeight();
                            if (currentHeight < maxHeight) {
                                $eyebrow.animate({ 'margin-bottom': (maxHeight - currentHeight) + 'px' }, 200, 'swing');
                            } else {
                                $eyebrow.css('margin-bottom', '0px');
                            }
                        }
                    });
                    $(this).removeClass('unprocessed');
                });
            }

            function reRunSpacingFunction(context) {
                $('.article-stub-list.has-eyebrows', context).each(function () {
                    const $articleStubs = $(this).find('.article-stub');
                    let maxHeight = getEyebrowHeight($articleStubs);

                    // Set the new img bottom margin for updated article stubs without .eyebrows
                    $articleStubs.each(function () {
                        const $img = $(this).find('img');
                        const $eyebrow = $(this).find('.eyebrow');

                        if (!$eyebrow.length && $img.length) {
                            const currentMarginBottom = parseInt($img.css('margin-bottom'), 10);
                            if (currentMarginBottom !== maxHeight) {
                                $img.animate({'margin-bottom': maxHeight + 'px'}, 200, 'swing');
                            }
                        } else if ($eyebrow.length) {
                            const currentHeight = $eyebrow.outerHeight();
                            if (currentHeight < maxHeight) {
                                $eyebrow.animate({ 'margin-bottom': (maxHeight - currentHeight) + 'px' }, 200, 'swing');
                            } else {
                                $eyebrow.css('margin-bottom', '0px');
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
                maxHeight = maxHeight + 10;
                return maxHeight;
            }
        }
    };
})(jQuery, Drupal);