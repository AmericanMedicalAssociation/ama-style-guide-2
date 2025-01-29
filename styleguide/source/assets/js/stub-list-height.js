(function ($, Drupal) {
    Drupal.behaviors.stubListHeight = {
        attach: function (context, settings) {

            let windowWidth = $(window).width();
            let resizeTimer;

            checkThresholds();

            $(window).resize(function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(checkThresholds, 500);
            });

            $('.article-stub-list', context).each(function () {
                const $articleStubs = $(this).find('.article-stub');
                $articleStubs.each(function () {
                    const $eyebrow = $(this).find('.eyebrow');
                    if ($eyebrow.length && !$(this).closest('.article-stub-list').hasClass('has-eyebrows')) {
                        $(this).closest('.article-stub-list').addClass('has-eyebrows');
                    }
                });
            });

            if ($(window).width() > 900) {
                runSpacingFunction(context);
            }

            function checkThresholds() {
                let hasUpdated = false;
                const newWindowWidth = $(window).width();
                if ((windowWidth <= 900 && newWindowWidth > 900) ||
                    (windowWidth > 900 && newWindowWidth <= 900) ||
                    (windowWidth <= 992 && newWindowWidth > 992) ||
                    (windowWidth > 992 && newWindowWidth <= 992) ||
                    (windowWidth <= 1200 && newWindowWidth > 1200) ||
                    (windowWidth > 1200 && newWindowWidth <= 1200)) {

                    if (windowWidth > 900 && newWindowWidth <= 900) {
                        resetSpacing(context);
                    }
                    windowWidth = newWindowWidth;

                    $('.article-stub-list.has-eyebrows', context).each(function () {
                        const $articleStubs = $(this).find('.article-stub');
                        $articleStubs.each(function () {
                            if ($(this).hasClass('updated')) {
                                hasUpdated = true;
                                return false;
                            }
                        });
                        if (hasUpdated) {
                            return false;
                        }
                    });

                    if (!hasUpdated) {
                        runSpacingFunction(context);
                    } else {
                        reRunSpacingFunction(context);
                    }
                }
            }

            function runSpacingFunction(context) {
                $('.article-stub-list.has-eyebrows', context).each(function () {
                    const $articleStubs = $(this).find('.article-stub');
                    let maxHeight = 0;
                    let heightDifference = 0;

                    $articleStubs.each(function () {
                        const $eyebrow = $(this).find('.eyebrow');
                        if ($eyebrow.length) {
                            const height = $eyebrow.outerHeight();
                            if (height > maxHeight) {
                                maxHeight = height;
                            }
                        }
                    });

                    $articleStubs.each(function () {
                        const $img = $(this).find('img');
                        const $eyebrow = $(this).find('.eyebrow');

                        if (!$eyebrow.length && $img.css('margin-bottom') === '0px') {
                            $img.animate({'margin-bottom': maxHeight + 'px'}, 200, 'swing');
                            if (!$eyebrow.closest('.article-stub').hasClass('updated')) {
                                $eyebrow.closest('.article-stub').addClass('updated');
                            }
                        } else if ($eyebrow.length) {
                            heightDifference = maxHeight - $eyebrow.outerHeight();
                            if (heightDifference > 0) {
                                $eyebrow.animate({ 'margin-bottom': (heightDifference + 10) + 'px' }, 200, 'swing');
                                if (!$eyebrow.closest('.article-stub').hasClass('updated')) {
                                    $eyebrow.closest('.article-stub').addClass('updated');
                                }
                            }
                        }
                    });
                });
            }

            function reRunSpacingFunction(context) {
                $('.article-stub-list.has-eyebrows', context).each(function () {
                    const $articleStubs = $(this).find('.article-stub');
                    let maxHeight = 0;
                    let heightDifference = 0;

                    $articleStubs.each(function () {
                        const $eyebrow = $(this).find('.eyebrow');
                        if ($eyebrow.length) {
                            const height = $eyebrow.outerHeight();
                            if (height > maxHeight) {
                                maxHeight = height;
                            }
                        }
                    });

                    $articleStubs.each(function () {
                        const $eyebrow = $(this).find('.eyebrow');
                        if ($eyebrow.length) {
                            const currentHeight = $eyebrow.outerHeight();
                            if (currentHeight < maxHeight) {
                                heightDifference = (maxHeight - currentHeight) + 10;
                                $eyebrow.animate({ 'margin-bottom': heightDifference + 'px' }, 200, 'swing');
                            } else {
                                if ($eyebrow.css('margin-bottom') !== '10px') {
                                    $eyebrow.animate({ 'margin-bottom': '10px' }, 200, 'swing');
                                }
                            }
                        }
                    });
                });
            }

            function resetSpacing(context) {
                $('.article-stub-list.has-eyebrows', context).each(function () {
                    const $articleStubs = $(this).find('.article-stub.updated');

                    $articleStubs.each(function () {
                        const $img = $(this).find('img');
                        const $eyebrow = $(this).find('.eyebrow');

                        if ($img.length && $img.css('margin-bottom') !== '0px') {
                            $img.animate({ 'margin-bottom': '0px' }, 200, 'swing');
                        }
                        if ($eyebrow.length && $eyebrow.css('margin-bottom') !== '10px') {
                            $eyebrow.animate({ 'margin-bottom': '10px' }, 200, 'swing');
                        }
                    });
                });
            }
        }
    };
})(jQuery, Drupal);