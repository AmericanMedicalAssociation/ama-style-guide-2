/**
 * @file
 * CKEditor Accordion functionality.
 */

(function (Drupal, drupalSettings) {
    'use strict';

    let animating = false;
    let animateObjects = [];

    // Default config.
    const defaults = {
        duration: 300,
        easing: (t, b, c, d) => {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    };

    // Two directions.
    const directions = {
        OPEN: 1,
        CLOSE: 2
    };

    // Animate fn.
    const animate = (animateSets, now) => {
        let animationContinue = false;
        for(let x = 0; x < animateSets.length; x++) {
            let element = animateSets[x][0];
            let options = animateSets[x][1];
            if (!options.startTime) {
                options.startTime = now;
            }
            let currentTime = now - options.startTime;
            animationContinue = currentTime < options.duration;
            if (animationContinue) {
                let newHeight = options.easing(currentTime, options.startingHeight, options.distanceHeight, options.duration);
                element.style.height = `${newHeight.toFixed(2)}px`;
            }
        }

        if (animationContinue) {
            window.requestAnimationFrame((timestamp) => animate(animateSets, timestamp));
        }
        else {
            for(let x = 0; x < animateSets.length; x++) {
                let element = animateSets[x][0];
                let options = animateSets[x][1];
                if (options.direction === directions.CLOSE) {
                    element.style.display = 'none';
                }
                if (options.direction === directions.OPEN) {
                    element.style.display = 'block';
                }

                // Remove element animation styles.
                element.style.height = null;
                element.style.overflow = null;
                element.style.marginTop = null;
                element.style.marginBottom = null;
                element.style.paddingTop = null;
                element.style.paddingBottom = null;
            }

            // Reset vars.
            animateObjects = [];
            animating = false;
        }
    }

    // Animation handler.
    const doAnimations = (animateObjects) => {
        let doAnimate = drupalSettings.ckeditorAccordion.accordionStyle.animateAccordionOpenAndClose ?? true;
        if (!doAnimate) {
            animateObjects.forEach(object => {
                const element = object[1];
                if (object[0] == 'slideUp') {
                    element.style.display = 'none';
                }
                else {
                    element.style.display = 'block';
                }
            });
            animating = false;
        }
        else {
            let animateSets = [];
            animateObjects.forEach(object => {
                const element = object[1];
                let options = Object.assign({}, defaults);
                if (object[0] == 'slideUp') {
                    options.direction = directions.CLOSE;
                    options.to = 0;
                    options.startingHeight = element.scrollHeight;
                    options.distanceHeight = -options.startingHeight;

                    // Set element animation styles.
                    element.style.display = 'block';
                    element.style.overflow = 'hidden';
                    element.style.marginTop = '0';
                    element.style.marginBottom = '0';
                    element.style.paddingTop = '0';
                    element.style.paddingBottom = '0';
                } else {
                    element.style.height = '0px';

                    // Set element animation styles.
                    element.style.display = 'block';
                    element.style.overflow = 'hidden';
                    element.style.marginTop = '0';
                    element.style.marginBottom = '0';
                    element.style.paddingTop = '0';
                    element.style.paddingBottom = '0';

                    options.direction = directions.OPEN;
                    options.to = element.scrollHeight;
                    options.startingHeight = 0;
                    options.distanceHeight = options.to;
                }

                delete options.startTime;
                animateSets.push([element, options]);
            });

            window.requestAnimationFrame((timestamp) => animate(animateSets, timestamp));
        }
    }

    Drupal.behaviors.ckeditorAccordion = {

        attach: function (context, settings) {
            const $ckeditorAccordions = once('ckeditorAccordions', '.ckeditor-accordion', context);
            const doAnimate = drupalSettings.ckeditorAccordion.accordionStyle.animateAccordionOpenAndClose ?? true;
            const openTabsWithHash = drupalSettings.ckeditorAccordion.accordionStyle.openTabsWithHash ?? false;
            for (let i = 0; i < $ckeditorAccordions.length; i++) {
                let $accordion = $ckeditorAccordions[i];

                // The first one is the correct one.
                if (!drupalSettings.ckeditorAccordion.accordionStyle.collapseAll) {
                    $accordion.querySelector('dt:first-child').classList.add('active');
                    let dd = $accordion.querySelector('dd:first-of-type');
                    dd.classList.add('active');
                    dd.style.display = 'block';
                }

                // Turn the accordion tabs to links so that the content is accessible & can be traversed using keyboard.
                let childDts = Array.from($accordion.children).filter(function (child) {
                    return (child.tagName.toLowerCase() == 'dt');
                });
                for (let x = 0; x < childDts.length; x++) {
                    let $tab = childDts[x];
                    let tabText = $tab.innerText.trim();
                    let toggleClass = $tab.classList.contains('active') ? ' active' : '';
                    let hrefAndIds = 'href="#"';
                    if (openTabsWithHash) {
                        let tabHash = encodeURIComponent(tabText.replace(/[^A-Za-z0-9]/g, ""));
                        hrefAndIds = 'href="#' + tabHash + '" id="' + tabHash + '" onclick="return false;"';
                    }
                    $tab.innerHTML = '<h2><a class="ckeditor-accordion-toggler" ' + hrefAndIds + '><span class="ckeditor-accordion-toggle' + toggleClass + '"></span>' + tabText + '</a></h2>';
                }

                // Wrap the accordion in a div element so that quick edit function shows the source correctly.
                $accordion.classList.add('styled');
                $accordion.classList.remove('ckeditor-accordion');
                let $wrapper = document.createElement('div');
                $wrapper.classList.add('ckeditor-accordion-container');
                if (!doAnimate) {
                    $wrapper.classList.add('no-animations');
                }
                $accordion.after($wrapper);
                $wrapper.appendChild($accordion);

                // Trigger an ckeditorAccordionAttached event to let other frameworks know that the accordion has been attached.
                let eventAccordionAttached = new Event('ckeditorAccordionAttached');
                $accordion.dispatchEvent(eventAccordionAttached);

                // Handle click events.
                let $togglers = $accordion.querySelectorAll('.ckeditor-accordion-toggler');
                for (let x = 0; x < $togglers.length; x++) {
                    $togglers[x].addEventListener("click", function(e) {
                        let $title = this.parentNode;
                        let $content = $title.nextElementSibling;
                        let $parent = $title.parentNode;

                        if (animating) {
                            // Prevent defaults.
                            e.preventDefault();
                            return;
                        }
                        animating = true;

                        // Clicking on open element, close it.
                        if ($title.classList.contains('active')) {
                            $title.classList.remove('active');
                            $content.classList.remove('active');

                            // Add to animateObjects.
                            animateObjects.push(['slideUp', $content]);
                        }
                        else {
                            if(!drupalSettings.ckeditorAccordion.accordionStyle.keepRowsOpen) {
                                let activeChilds = Array.from($parent.children).filter(function (child) {
                                    return (child.classList.contains('active'));
                                });
                                activeChilds.forEach(function(activeChild) {
                                    // Remove active class from all.
                                    activeChild.classList.remove('active');
                                    if (activeChild.tagName.toLowerCase() == 'dd') {
                                        // Slide DDs up.
                                        animateObjects.push(['slideUp', activeChild]);
                                    }
                                });
                            }

                            $title.classList.add('active');
                            $content.classList.add('active');

                            // Add to animateObjects.
                            animateObjects.push(['slideDown', $content]);
                        }

                        doAnimations(animateObjects);

                        // Prevent defaults.
                        e.preventDefault();
                    });
                }

                // Open tabs with hash if config requires.
                if (openTabsWithHash) {
                    // Trigger hash change when clicking an anchor to an accordion tab on the same page.
                    const $hashLinks = document.querySelectorAll('a[href*="#"]:not(.ckeditor-accordion-toggler):not(.visually-hidden)');
                    for (let x = 0; x < $hashLinks.length; x++) {
                        $hashLinks[x].addEventListener('click', function (e) {
                            var parser = document.createElement('a'), hash;
                            var preventDefault = false;
                            parser.href = this.getAttribute('href');
                            hash = parser.hash;
                            if (hash) {
                                // Get the matching accordion toggler with hash.
                                var el = document.querySelector('a.ckeditor-accordion-toggler[href="' + hash + '"]');
                                if (el != null) {
                                    // Set / update hash so that the event listener below fires.
                                    if (window.location.hash === hash) {
                                        window.dispatchEvent(new Event('hashchange'));
                                    }
                                    else {
                                        window.location.hash = hash;
                                    }

                                    preventDefault = true;
                                }
                            }

                            if (preventDefault) {
                                e.preventDefault();
                            }
                        });
                    }

                    // Open content that matches the hash on hash change.
                    window.addEventListener('hashchange', function() {
                        var el = document.querySelector('h2 a.ckeditor-accordion-toggler[href="' + window.location.hash + '"]');
                        if (el != null && !el.parentNode.classList.contains('active')) {
                            el.click();
                        }
                    });
                    // Trigger event once on page load so that the right accordion is open.
                    window.dispatchEvent(new Event('hashchange'));
                }

            }
        }
    };
})(Drupal, drupalSettings);
