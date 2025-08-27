/**
 * @file
 * Initialization script for global processes
 */

(function ($, Drupal) {

/**
 *
 * Initialize fitVid for YouTube vieos.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */

	Drupal.behaviors.fitvidinit = {
	 attach: function (context, settings) {
			(function ($) {
				$(document).ready(function(){
					$('.video-container').fitVids();
				});
			})(jQuery);
		}
	};

})(jQuery, Drupal);

/**
 * @file
 * alert.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.alert = {
    attach: function (context, settings) {
      var alertId = $('.ama__alert__wrap').attr('id');
      var alertCookie = Cookies.get('alertCookie');
      var alertNode = Cookies.get('alertNode');

      (function ($) {
        // If the 'hide cookie is not set we show the alert
        if ((alertNode !== alertId) || (alertCookie !== '1')) {
          $('.ama__alert__wrap').css({
            "transition": "opacity .15s",
            "opacity": "1"
          });
        }
        else {
          $('.ama__alert__wrap').css({
            "display": "none"
          });
        }

        // Add the event that closes the popup and sets the cookie that tells us to
        // not show it again until one day has passed.
        $('body').on('click', '.ama__alert__close', function() {
          $('.ama__alert__wrap').css({
            "transition": "opacity 2s",
            "opacity": "0",
            "display": "none"
          });

          // set the cookies
          Cookies.set('alertCookie', '1', { expires: 1});
          Cookies.set('alertNode', alertId, { expires: 1});

          return false;
        });
      })(jQuery);
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Sadly adds footer to left resource page column.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
    Drupal.behaviors.browsertheme = {
      attach: function (context, settings) {
        (function ($) {
          $(document).ready(function(){
            
            const setThemeColor = (color) => {
                const meta = document.querySelector('meta[name="theme-color"]')
                if (meta) {
                  meta.setAttribute('content', color)
                }
              }
              
              if ("IntersectionObserver" in window) {
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                      const { isIntersecting, target } = entry
                      if (isIntersecting) {
                        const color = window.getComputedStyle(target).getPropertyValue("background-color");
                        setThemeColor(color)
                      }
                    })
                }, {
                  root: document.getElementById('viewport'),
                  rootMargin: "1px 0px -100% 0px",
                  treshold: 0.1
                })
                
                document.querySelectorAll('.section').forEach(section => {
                  observer.observe(section)
                })
              }
              
              
          });
        })(jQuery);
      }
    };
  })(jQuery, Drupal);
  
/**
 * @file
 * Form fields masking
 */

(function ($, Drupal) {
    Drupal.behaviors.formItems = {
        attach: function (context, settings) {
            (function ($) {
                $(document).ready(function(){

                    // Do not execute in the layout builder edit dialog
                    if (!$('.js-off-canvas-dialog-open').length) {
                        $('.multiselect').multiselect();

                        $('.ama__tooltip').tooltip({
                            tooltipClass: "ama__tooltip-bubble"
                        });

                        function count_remaining_character() {
                            var max_length = 150;
                            var character_entered = $('.textarea').val().length;
                            var character_remaining = max_length - character_entered;
                            $('.character-count').html(character_remaining);
                            if (max_length < character_entered) {
                                $('.textarea').addClass('error');
                                $('.character-count').addClass('error');
                            } else {
                                $('.textarea').removeClass('error');
                                $('.character-count').removeClass('error');
                            }
                        }

                        // jQueryUI selectmenu method to initiate custom dropdown menu
                        $('.ama__select-menu__select').selectmenu();

                        // Wait for a short delay to ensure the menu is fully loaded and initialized
                        setTimeout(function() {
                            // Set aria-label on selectmenu button
                            var inititalSelectedOptionText = $('.ui-selectmenu-menu').find('div.ui-state-active').text();
                            $('.ui-selectmenu-menu').find('div.ui-state-active').attr('aria-label', 'Sort by ' + inititalSelectedOptionText);
                        }, 100);

                        // Set aria-label on selectmenu button when an option is selected
                        $('.ama__select-menu__select').selectmenu({
                            change: function(event, ui) {
                                // Get the text of the currently selected option
                                var selectedOptionText = $(this).find('option:selected').text();

                                // Set the aria-label attribute to the text of the selected option
                                $('.ama__select-menu__select').next('.ui-selectmenu-button').find('.ui-selectmenu-text').attr('aria-label', 'Sorty by ' + selectedOptionText);
                                $('.ui-selectmenu-menu').find('.ui-menu-item div.ui-state-active').attr('aria-label', 'Sort by ' + selectedOptionText);
                            }
                        });

                        // Refresh menu to set changes
                        $('.ama__select-menu__select').selectmenu('refresh');

                        // If focus is on the select menu
                        // Only submit after hitting enter
                        $('#edit-sort-by--3-button').on('keyup',function(e) {
                            if(e.which == 9) {
                                $('#edit-sort-by--3-button').on('keyup',function(e) {
                                    if(e.which == 13) {
                                        $('#block-exposedformacquia-search-solrpage-2').submit();
                                    }
                                });
                            }
                        });

                        // Submits the search form after a select menu items has been selected
                        $('.ama__select-menu__select:not(#edit-sort-by--3)').on('selectmenuchange', function() {
                            $('#block-exposedformacquia-search-solrpage-2').submit();
                        });

                        $('#edit-sort-by--3-menu').click(function () {
                            $('#block-exposedformacquia-search-solrpage-2').submit();
                            $('#edit-sort-by--3-menu').hide();
                        });

                        // Start search filter

                        var availableTags = [
                            "Alabama",
                            "Alaska",
                            "American Samoa",
                            "Arizona",
                            "Arkansas",
                            "California",
                            "Colorado",
                            "Connecticut",
                            "Delaware",
                            "District Of Columbia",
                            "Federated States Of Micronesia",
                            "Florida",
                            "Georgia",
                            "Guam",
                            "Hawaii",
                            "Idaho",
                            "Illinois",
                            "Indiana",
                            "Iowa",
                            "Kansas",
                            "Kentucky",
                            "Louisiana",
                            "Maine",
                            "Marshall Islands",
                            "Maryland",
                            "Massachusetts",
                            "Michigan",
                            "Minnesota",
                            "Mississippi",
                            "Missouri",
                            "Montana",
                            "Nebraska",
                            "Nevada",
                            "New Hampshire",
                            "New Jersey",
                            "New Mexico",
                            "New York",
                            "North Carolina",
                            "North Dakota",
                            "Northern Mariana Islands",
                            "Ohio",
                            "Oklahoma",
                            "Oregon",
                            "Palau",
                            "Pennsylvania",
                            "Puerto Rico",
                            "Rhode Island",
                            "South Carolina",
                            "South Dakota",
                            "Tennessee",
                            "Texas",
                            "Utah",
                            "Vermont",
                            "Virgin Islands",
                            "Virginia",
                            "Washington",
                            "West Virginia",
                            "Wisconsin",
                            "Wyoming"
                        ];

                        $( "#search_filter" ).autocomplete({
                            source: availableTags
                        });

                        $.ui.autocomplete.prototype._resizeMenu = function () {
                            var ul = this.menu.element;
                            ul.outerWidth(this.element.outerWidth());
                        };


                        // Start search filter with checkboxes

                        var dataModel = [
                            {text: 'Alabama', value: '2'},
                            {text: 'Alaska', value: '2'},
                            {text: 'American Samoa', value: '2'},
                            {text: 'Arizona', value: '2'},
                            {text: 'Arkansas', value: '2'},
                            {text: 'California', value: '2'},
                            {text: 'Colorado', value: '2'},
                            {text: 'Connecticut', value: '2'},
                            {text: 'Delaware', value: '2'},
                            {text: 'District Of Columbia', value: '2'},
                            {text: 'Federated States Of Micronesia', value: '2'},
                            {text: 'Florida', value: '2'},
                            {text: 'Georgia', value: '2'},
                            {text: 'Guam', value: '2'},
                            {text: 'Hawaii', value: '2'},
                            {text: 'Idaho', value: '2'},
                            {text: 'Illinois', value: '2'},
                            {text: 'Indiana', value: '2'},
                            {text: 'Iowa', value: '2'},
                            {text: 'Kansas', value: '2'},
                            {text: 'Kentucky', value: '2'},
                            {text: 'Louisiana', value: '2'},
                            {text: 'Maine', value: '2'},
                            {text: 'Marshall Islands', value: '2'},
                            {text: 'Maryland', value: '2'},
                            {text: 'Massachusetts', value: '2'},
                            {text: 'Michigan', value: '2'},
                            {text: 'Minnesota', value: '2'},
                            {text: 'Mississippi', value: '2'},
                            {text: 'Missouri', value: '2'},
                            {text: 'Montana', value: '2'},
                            {text: 'Nebraska', value: '2'},
                            {text: 'Nevada', value: '2'},
                            {text: 'New Hampshire', value: '2'},
                            {text: 'New Jersey', value: '2'},
                            {text: 'New Mexico', value: '2'},
                            {text: 'New York', value: '2'},
                            {text: 'North Carolina', value: '2'},
                            {text: 'North Dakota', value: '2'},
                            {text: 'Northern Mariana Islands', value: '2'},
                            {text: 'Ohio', value: '2'},
                            {text: 'Oklahoma', value: '2'},
                            {text: 'Oregon', value: '2'},
                            {text: 'Palau', value: '2'},
                            {text: 'Pennsylvania', value: '2'},
                            {text: 'Puerto Rico', value: '2'},
                            {text: 'Rhode Island', value: '2'},
                            {text: 'South Carolina', value: '2'},
                            {text: 'South Dakota', value: '2'},
                            {text: 'Tennessee', value: '2'},
                            {text: 'Texas', value: '2'},
                            {text: 'Utah', value: '2'},
                            {text: 'Vermont', value: '2'},
                            {text: 'Virgin Islands', value: '2'},
                            {text: 'Virginia', value: '2'},
                            {text: 'Washington', value: '2'},
                            {text: 'West Virginia', value: '2'},
                            {text: 'Wisconsin', value: '2'},
                            {text: 'Wyoming', value: '2'},
                            {text: '', value: ''}
                        ];

                        function selChange(){
                            var selection = $('#myCheckList').checkList('getSelection');

                            $('#selectedItems').text(JSON.stringify(selection));
                        }

                        if (typeof(jQuery.ui.checkList) != 'undefined'){
                            $('#filterList').checkList({
                                listItems: dataModel,
                                onChange: selChange
                            });
                        }

                        $('form:not([class*="layout-builder"]) [type=checkbox]').each( function() {
                            $('[type=checkbox]').checkboxradio();
                        });

                        $('form:not([class*="layout-builder"]) [type=radio]').checkboxradio().buttonset().find('label').css('width', '19.4%');

                        $('.textarea').keyup(function() {
                            count_remaining_character();
                        });

                        // Range Field
                        var legend = $('.ama__range-field__legend');
                        var handle = $( "#currentValue" );

                        $(".ama__range-field").slider({
                            animate: true,
                            range: 'min',
                            value: 1,
                            min: 2000,
                            max: 5000,
                            step: 1,
                            create: function(){
                                var handle = jQuery(this).find('.ui-slider-handle');
                                var bubble = jQuery('<div class="ama__range-field__valuebox"></div>');
                                handle.append(bubble);
                            },
                            slide: function(evt, ui) {
                                ui.handle.childNodes[0].innerHTML = '$' + ui.value;
                            }
                        }).append(legend);

                        // Form accordion
                        $( ".tablist" ).accordion({
                            header: ".ama__form-steps__step",
                            heightStyle: "content"
                        });

                        function listFilter(input, list) { // header is any element, list is an unordered list
                            // custom css expression for a case-insensitive contains()
                            jQuery.expr[':'].Contains = function(a,i,m){
                                return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
                            };

                            $(input).change( function () {
                                var filter = $(this).val();
                                if(filter) {
                                    // this finds all links in a list that contain the input,
                                    // and hide the ones not containing the input while showing the ones that do
                                    $(list).find("span:not(:Contains(" + filter + "))").parent().hide();
                                    $(list).find("span:Contains(" + filter + ")").parent().show();
                                } else {
                                    $(list).find("label").show();
                                }
                                return false;
                                // only show results after 3 characters are entered
                            }).keyup( function() {
                                if( this.value.length < 4 ) return;
                                $(this).change();
                            });
                        }
                        listFilter($("#ama__search__location"), $(".ama__form-group"));
                    }
                    // make the entire subscribe button clickable.
                    $('form.salesforce-subscribe-form, .ama__input-wrapper--subscribe-news').on('click', function(e) {
                        if ($(this).hasClass('salesforce-subscribe-form')) {
                            // If on subscriptions page, save the scroll position before submitting the form
                            if($('div.view-my-subscription').length) {
                                localStorage.setItem('scrollPos', $(window).scrollTop());
                            };
                            $(this).submit();
                        }
                        else {
                            var link = $(this).find('a').attr('href');
                            location.href = link;
                        }
                    });

                    // For subcriptions page, on subscribe button click, reload the page at the same location (i.e offset from top)
                    if($('div.view-my-subscription').length) {
                        $(window).on('load', function() {
                            if (localStorage.getItem('scrollPos')) {
                                $(window).scrollTop(localStorage.getItem('scrollPos'));
                                localStorage.removeItem('scrollPos');
                            }
                        });
                    };
                });
            })(jQuery);
        }
    };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.abstractFormFilters = {
    attach: function (context, settings) {
      $(once('span', '.abstract-topics-filter-button', context)).on('click', function(e) {
        if ($('.abstract-topics-checkboxes').hasClass('hidden')) {
          $('.abstract-topics-checkboxes').removeClass('hidden');
          $('.abstract-topics-wrapper').addClass('active');
        }
        else {
          $('.abstract-topics-checkboxes').addClass('hidden');
          $('.abstract-topics-wrapper').removeClass('active');
        }
        e.stopPropagation();
      });
    }
  };
})(jQuery, Drupal);
/**
 * @file
 * Ribbon nav user interactions.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.ribbonnav = {
    attach: function (context, settings) {

      $('.ama__ribbon__dropdown').each(function () {
        var class_active = 'is-active';

        $('.ama__ribbon__dropdown__trigger', this).on('click', function(e) {
          e.stopPropagation();
          // Unfocus on the dropdown.
          $(this).blur();
          // Add our class for CSS.
          $(this).toggleClass(class_active);
          // Add our class to the dropdown UL.
          $(this).children().toggleClass(class_active);
        });

        $(document).on('click', function(){
          $('.ama__ribbon__dropdown__trigger', this).removeClass(class_active).children().removeClass(class_active);
        });
      });

    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Subcategory
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.subcategories = {
    attach: function (context, settings) {

      // Create static var for subcategory item count. To be used for determining whether recalculations are needed.
      var subcategoryExplorationColumns = 0;

      function checkSize() {
        var $subcategory = $('.ama__subcategory-exploration__subcategory');
        var $subcategoryContainer = $('.ama__subcategory-exploration-with-images__container');
        var $subcategoryTitle = $('.ama__subcategory-exploration-with-images__title');
        // We want the width minus padding so use width() instead of innerWidth().
        var subcategoryExplorationWidth = $('.ama__subcategory-exploration-with-images').width();
        // Subcategory items have max-width of 180px. This will be used for calculations instead of extracting it via jQuery calls.
        var subcategoryItemWidth = 180;
        var subcategoryTitleWidth = $subcategoryTitle.outerWidth();
        var totalGridItems = $subcategory.length + 1;
        // Start column count as lowest possible.
        var columnCount = 2;
        // Set subcategory row items to lowest that should display.
        var subcategoryItemsPerRow = Math.floor((subcategoryExplorationWidth - subcategoryTitleWidth) / subcategoryItemWidth);

        if (subcategoryItemsPerRow < 2) {
          // The minimum subcategory items per row should be two. If the variable computed to less, manually correct it.
          subcategoryItemsPerRow = 2;
          totalGridItems = totalGridItems - 1;
        } else {
          columnCount = subcategoryItemsPerRow + 1;
        }

        // Determine if changes in column count has occurred and act accordingly
        if (subcategoryExplorationColumns !== columnCount) {
          // Determine additional "filler-box" needed to create complete row
          var fillerBoxCount = columnCount - (totalGridItems % columnCount);
          fillGridRow($subcategoryContainer, fillerBoxCount);
          // Update persistent column count
          subcategoryExplorationColumns = columnCount;
        }

        // Update viewable subcategories.
        $subcategory.hide();
        $subcategory.slice(0, subcategoryItemsPerRow).css('display', 'inline-block');

        viewMore();
      }

      function viewMore() {
        var $viewLess = $('.ama__subcategory-exploration-with-images__view-less');
        var $viewMore = $('.ama__subcategory-exploration-with-images__view-all');
        var $subcategory = $('.ama__subcategory-exploration__subcategory');
        var $subcategoryContainer = $('.ama__subcategory-exploration-with-images__container');

        $viewLess.hide();
        $viewMore.show();

        $('.viewAll').click(function (e) {
          e.preventDefault();
          $subcategory.fadeIn();
          $viewMore.hide();
          $subcategoryContainer.addClass('expanded');
          $viewLess.show();

        });

        $('.viewLess').click(function (e) {
          e.preventDefault();
          $subcategory.hide();
          checkSize();
          $viewLess.hide();
          $subcategoryContainer.removeClass('expanded');
          $viewMore.show();
        });
      }


      function fillGridRow($container, count) {
        var fillerBox = '<div class="filler-box"></div>';
        // clear out current filler boxes
        var $fillerBoxes = $container.find('.filler-box');
        $fillerBoxes.remove();
        // fill out grid row
        for (var i = 0; i < count; i++) {
          $container.append(fillerBox);
        }
      }

      // run test on initial page load
      checkSize();

      // run test on resize of the window
      $(window).resize(function () {
        checkSize();
      });
    }
  };
})(jQuery, Drupal);

/*====== jQuery UI tabs ======*/


(function ($, Drupal) {
  Drupal.behaviors.ama_tabs = {
    attach: function (context, settings) {
      var defaultActiveTab = 0;
      var viewportWidth = window.innerWidth;
      if (viewportWidth >= 600 && $('.ama__resource-tabs').length > 0) {
        defaultActiveTab = 1;
      }

      $(".ama__tabs, .ama__resource-tabs").tabs({
        active: defaultActiveTab,
        activate: removeHighlights
      });

      // Prevent jump onclick
      $('.ui-tabs-anchor').on('click', function (e) {
        e.preventDefault();
        return false;
      });


      //Simulate click event on actual simpleTabs tab from mobile drop down.
      $('.ama__tabs-navigation--mobile select').on("selectmenuchange", function (event, ui) {
        var selectedValue = ui.item.value;
        $('a[href="#' + selectedValue + '"]').click();
      });

      // When clicking an inline resource page link referencing a tab, open referenced tab.
      $('.ama__resource-link--inline, .ama__page--resource__resource-link').on('click', function (e) {

        e.preventDefault();

        var $tabs = $('.ama__resource-tabs');
        switchTabs($tabs, this);
        // Stop bubbling and default actions
        return false;
      });

      function removeHighlights() {
        $('.ama_resource-header--highlight').removeClass('ama_resource-header--highlight');
      }

      /*
       * This function animates the browser scroll action with attention to keyboard only accessibility concerns
       *
       * @param {jQuery Object} $tabNav
       * @param {jQuery Object} $target
       */
      function smoothScroll($tabNav, tabHash, positionInTab) {
        var scrollTarget = window.innerWidth >= 1200 ? '.ama__resource-tabs__content' : 'html,body';

        // Remove previous highlights, if any
        removeHighlights();

        // Try to find target element offset, but default to zero
        var scrollPosition = 0;
        var $target;
        if (positionInTab !== undefined) {
          var tabElements = $(tabHash + ' .ama__resource-tabs__item');
          if (tabElements.length) {
            // If desired position is larger than the result set, use the last element
            if (tabElements.length <= positionInTab) {
              positionInTab = tabElements.length;
            }
            // Users are instructed to consider 1 as the first element
            var target = tabElements[positionInTab - 1];
            scrollPosition = target.offsetTop;
            // Add highlight to target
            $target = $(target).find('.ama_resource-header'); // save for use in animate() callback
            $target.addClass('ama_resource-header--highlight');
          }
        } else {
          $target = $(tabHash);
        }
        
        $(scrollTarget).animate({
          scrollTop: scrollPosition
        }, 850, function () {
          // Update focus for keyboard only navigation
          $target.attr('tabindex', '-1').focus();
        });

        // Stop bubbling and default actions
        return false;
      }

      /*
       * This function opens referenced tabs from inline links
       *
       * @param {jQuery Object} $tabObj The element which has the .tab() function attached.
       * @param {Element} link
       */
      function switchTabs($tabObj, link) {

        var linkHash = link.getAttribute("href");
        var widget = $tabObj.data('ui-tabs');

        var tabHash, positionInTab;
        var parts = linkHash.split('-');
        tabHash = parts[0];
        if (parts.length > 1) {
          positionInTab = parts[1];
        } else {
          // If old link, try to determine position from link text
          var matches = link.innerText.match(/([0-9]+)/g);
          if (matches) {
            positionInTab = matches.shift();
          }
        }

        // Ensure correct tab is active
        var tabIndex = widget._getIndex(tabHash);
        $tabObj.tabs({
          active: tabIndex
        });

        // Scroll to top of ui tabs navigation
        smoothScroll($tabObj, tabHash, positionInTab);

        // Stop bubbling and default actions
        return false;
      }
    }
  };
})(jQuery, Drupal);

/*====== jQuery UI accordion ======*/

(function($) {
    $( ".ama__accordion" ).accordion({
        heightStyle: "content",
        collapsible: true,
        active: false
    });
})(jQuery);

(function ($, Drupal) {
  var verifyFields = function(form) {
    var $sections = form.find('section');
    var $inputs = $('.webform-submission-form section *').filter(':input');
    var $iconElement = $('.ama__form-steps__icon');
    var errorSections = [];

    $inputs.each(function(i, input) {
      $closestSection = $(this).closest('section').attr('data-drupal-selector').toString();
      if ($(this).prop('required') && $(this).hasClass('error')) {
        errorSections.push($closestSection);
      }
    });

    $sections.each(function(i, section) {
      if ($.inArray($(this).attr('data-drupal-selector').trim().toString(), errorSections) !== -1) {
        $(this).find($iconElement).removeClass('edit error completed').addClass('error');
      }
      else {
        $(this).find($iconElement).removeClass('edit error completed').addClass('completed');
      }
    });
    return this;
  };

  function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);
  }

  function fieldIsRequired(input) {
    input.addClass('error');
    input.next().remove('.form-item--error-message');
    input.after('<div class="form-item--error-message">Field is required.</div>');
  }

  function checkField(input) {
    if (input.prop('required') && (input.val().length === 0 || input.val() === "")) {
      fieldIsRequired(input);
    }
    else {
      if (input.attr('type') === 'email' && !validateEmail(input.val())) {
        fieldIsRequired(input);
      }
      else {
        input.removeClass('error').next().remove('.form-item--error-message');
      }
    }
  }

  // Submits first page of Contact Us form on radio button selection
  $.fn.contactSubmit = function(){
    var $webform_buttons = $('.webform-submission-contact-us-form input[type="radio"]');
    $webform_buttons.bind('click', function(e) {
      $('.webform-submission-contact-us-form').submit();
    });
  }
  $.fn.contactSubmit();
  $( document ).ajaxComplete(function() {
    $.fn.contactSubmit();
  });

  // Go back to previous back is user clicks decline submit button
  $('.ama__button--decline').click(function(e) {
    e.preventDefault();

    if (document.referrer === "") {
      document.location.href='/';
    }
    else {
      history.back();
    }
  });

  var initialLoad = true;

  Drupal.behaviors.webForm = {
    detach: function (context, settings, trigger) {
      if (trigger === 'serialize') {
        initialLoad = false;
      }
    },
    attach: function (context, settings) {
      if (!initialLoad) {
        if (!context.innerText.match("Error message")) {
          $('.ama__sales-landing-page__form__heading').hide();
        }
      }

      $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
          return this.optional(element) || regexp.test(value);
        },
        "Please check your input."
      );

      // On webform submit check to see if all inputs are valid
      $('.webform-submission-form').validate({
        ignore: [],
        rules: {
          'email': {
            email: true
          },
          'telephone': {
            'regex': /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
          },
          'birth_year': {
            'regex': /^(19|20)\d{2}$/
          }
        },
        errorPlacement: function(error, element) {
          if (element.attr("type") === "checkbox") {
            error.insertAfter(element.parent().siblings().last());
          }
          else if (element.is("select")) {
            error.insertAfter(element.next());
          }
          else {
            error.insertAfter(element);
          }
        },
        invalidHandler: function(form, validator) {
          var errors = validator.numberOfInvalids();
          if (errors) {
            $('.ama__form-steps__icon').addClass('error');
          }

          if($('.js-form-type-radio').find('label.error').length !== 0) {
            $('.js-form-type-radio label.error').parents('.fieldset-wrapper').addClass('error');
          }
        }
      });

      // Check to see if inputs are valid
      $('.webform-submission-form input').change(function() {
        $('.webform-submission-form label.error').each(function() {
          if( $(this).text() !== '') {
            $('.ama__form-steps__icon').addClass('error');
          }
          else {
            $('.ama__form-steps__icon').removeClass('error');
          }
        });
      });

      // Add validation to select dropdown menus using jQuery UI
      $('.webform-submission-form select').selectmenu({
        style: 'dropdown',
        transferClasses: true,
        width: null,
        change: function() {
          $(".webform-submission-form").validate().element(this);
        }
      });
    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {

  Drupal.behaviors.ama_mainNavigation = {
    attach: function (context, settings) {

      var $categoryNavWrapper = $('.ama_category_navigation_wrapper'),
          $categoryNavigationMenu = $('.ama_category_navigation_menu'),
          $categoryNavigationMenuGroup = $('.ama_category_navigation_menu__group'),
          $mobileSearchTrigger = $('.global-search-trigger'),
          $mobileSearch = $('.ama__global-search'),
          $mainNav = $('.ama__main-navigation '),
          $subMenu = $('.ama_category_navigation_menu__submenu'),
          $subMenuArticle = $('.ama_category_navigation_menu__articles'),
          viewportHeight = 0,
          productNavHeight = 0,
          categoryNavMenuHeight = $('.ama_category_navigation_menu').outerHeight(),
          categoryNavMenuResizedHeight = 0,
          windowWidth = $(window).width(),
          $alert_banner = $('.ama__alert__wrap');

      // Checks if user agent is a mobile device
      var deviceAgent = navigator.userAgent.toLowerCase();
      var agentID = deviceAgent.match(/(android|webos|iphone|ipod|blackberry)/) && windowWidth < 768;

      // Set alert banner height if present.
      if($alert_banner.length && $alert_banner.is(':visible')) {
        alertBannerHeight = $alert_banner.outerHeight();
      } else {
        alertBannerHeight = 0;
      }

        // Calculate whether or not the category nav should have scrollbars
      function categoryNavHeight(resizeViewportHeight) {

        // Check to see if viewport height is passed back when the window gets resized
        if(typeof resizeViewportHeight !== 'undefined') {
          viewportHeight = resizeViewportHeight;
        } else {
          // Window height is used by default
          viewportHeight = window.innerHeight ? window.innerHeight : $(window).height();
        }

        // Subtract the navigation height from window height to assess content height
        categoryNavMenuResizedHeight = viewportHeight;
        // Check to see if main menu purple dropdown height is larger than viewport height
        if (categoryNavMenuHeight + $mainNav.outerHeight() + productNavHeight > viewportHeight && !agentID) {

          // Set the menu dropdown the same as viewport to enable scrolling
          var categoryNavMenuHeightResized = categoryNavMenuResizedHeight - $mainNav.outerHeight() - productNavHeight - alertBannerHeight;
          $categoryNavigationMenuGroup.addClass('scroll').outerHeight(categoryNavMenuHeightResized);

          $categoryNavigationMenuGroup.on('show.smapi', function(e, menu) {
            if($('.ama_category_navigation_menu__submenu', menu).outerHeight() > categoryNavMenuHeightResized) {
              $('.ama_category_navigation_menu__submenu', menu).outerHeight(categoryNavMenuHeightResized);
            }

            if($('.ama_category_navigation_menu__articles', menu).outerHeight() > categoryNavMenuHeightResized) {
              $('.ama_category_navigation_menu__articles', menu).outerHeight(categoryNavMenuHeightResized).addClass('one_article');
            }
          });
        } else {
          $categoryNavigationMenuGroup.removeClass('scroll').outerHeight('auto');
          $subMenu.outerHeight('auto');
          $subMenuArticle.outerHeight('auto');
        }
      }


      // Hide/Show menu
      function hideShow() {
        if ($('#global-menu').prop('checked')) {
          $categoryNavigationMenu.slideDown(function () {
              if ((categoryNavMenuHeight + $mainNav.outerHeight() + productNavHeight + alertBannerHeight) > viewportHeight) {
                  if ((categoryNavMenuHeight + $mainNav.outerHeight() + productNavHeight + alertBannerHeight) > viewportHeight) {
                      $categoryNavigationMenuGroup
                          .addClass('scroll')
                          .css({
                              'max-height': (viewportHeight - $mainNav.outerHeight() - productNavHeight - alertBannerHeight) + 'px',
                              'overflow-y': 'auto'
                          });
                  } else {
                      $categoryNavigationMenuGroup
                          .removeClass('scroll')
                          .css({
                              'max-height': '',
                              'overflow-y': ''
                          });
                  }
              }

            if (agentID) {
              // Only make the menu height same as viewport on mobile devices
              var mobileHeight = window.innerHeight ? window.innerHeight : $(window).height();
              $categoryNavWrapper.height(mobileHeight).addClass('scroll');

              $categoryNavigationMenuGroup.on('show.smapi', function(e, menu) {
                if($(menu).outerHeight() > mobileHeight) {
                  $(menu).outerHeight(mobileHeight);
                }

              });
            } else {
              $(this).parent().height('auto');
              categoryNavHeight();
            }
          });
        }
        else {
          $categoryNavigationMenu.slideUp(function () {
            $(this).parent().height(0);
          });
        }
      }

      // Closes menu on doc load
      $('#global-menu').prop('checked', false);

      function handleGlobalMenuActivate(e) {
        // For keydown, only act on Enter or Space
        if (e.type === 'keydown') {
          if (!(e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32)) {
            return;
          }
          e.preventDefault();
          var $checkbox = $('#global-menu');
          $checkbox.prop('checked', !$checkbox.prop('checked'));
        }
        // For click, just toggle if not already handled
        if (e.type === 'click') {
          var $checkbox = $('#global-menu');
          $checkbox.prop('checked', !$checkbox.prop('checked'));
        }
        hideShow();
        e.stopPropagation();
      }

      $('.ama__global-menu').on('click keydown', handleGlobalMenuActivate);

      $('.ama_category_navigation_menu__group > .ama_category_navigation_menu__section > a').on('keydown', function(e) {
        // Check if Escape is pressed and focus is on the ul itself
        if ((e.key === 'Escape' || e.keyCode === 27) && document.activeElement === this) {
          $('#global-menu').prop('checked', false);
          hideShow();
        }
      });

      $(document).ready(function () {
        // Clear search input on main nav on search page
        if(window.location.href.includes("/search")) {
          var $searchInput = $("form[id='block-exposedformacquia-search-solrpage']").find("input[name='search']");
          if($searchInput.length) {
            $searchInput.val('');
          }
        }
      });

      // If sticky nav wrapper, remove id to prevent duplicate ids.
      $(window).on('load', function() {
        $stickyWrapper = $('header.sticky-nav');
        if($stickyWrapper.length && $stickyWrapper.has('#share-wrapper')) {
          $stickyWrapper.removeAttr('id');
        }
      });

      // If a user clicks outside the menu then close it
      $(document).click(function (e) {
        if (!$categoryNavigationMenu.is(e.target) && $categoryNavigationMenu.has(e.target).length === 0) {
          $('#global-menu').prop('checked', false);
          hideShow();
        }
      });

      $($mobileSearchTrigger).unbind('click').click(function () {
        $mobileSearch.slideToggle("fast", "linear");
        $mobileSearchTrigger.toggleClass('open');
        $('#edit-search').focus();
      });

      //Set focus state on mobile trigger button
      $($mobileSearchTrigger).focus(function(){
        $mobileSearchTrigger.css('outline', 'outline: 2px solid #80d4f5');
      });

      function moveSocialSharePosition(){
        var mainNavPosition = $('.ama__main-navigation .container').offset().left;
        var fixedClass = 'ama__social-share--fixed';
        var $amaSocialShare = $('.ama__social-share');
        var $amaShareContainer = $(".ama__category .ama__masthead__content__container, .ama__subcategory-index .share-row");

        // Check to see if viewport width is greater than 850px.
        if ($(window).width() > 850) {
          // Checks to see if there is enough for the sticky nav
          if(mainNavPosition > 60) {

            var socialStickyPosition = mainNavPosition - 60;
            var $socialIcons = $('.ama__masthead__content__share');

            // Check to see if viewport width is greater 850px then the social icons will be sticky
            if($socialIcons.length && $(window).width() > 850) {
              $socialIcons.sticky({
                wrapperClassName: 'ama__masthead__content__share-wrapper',
                zIndex: 500
              });

              $socialIcons.on('sticky-start', function () {
                $amaShareContainer.css('visibility','visible');
                $amaSocialShare.addClass(fixedClass).css('left', socialStickyPosition).hide().fadeTo('slow', 1);
              });

              $socialIcons.on('sticky-update', function () {
                $amaSocialShare.addClass(fixedClass).hide().fadeTo('slow', 1);
              });

              $socialIcons.on('sticky-end', function () {
                $amaShareContainer.css('visibility','hidden');
                $('.ama__social-share--fixed').removeClass(fixedClass);
              });
            }
          }
        } else {
          // Ensure visibility is hidden on mobile.
          $amaShareContainer.css('visibility','hidden');
          $amaSocialShare.removeClass(fixedClass).css('left', '');
        }
      }

      // Initialize getSocialShare()
      moveSocialSharePosition();

      // Onscroll check to see if social icon position is greater than footer position
      var debounce_timer;
      if($('.ama__masthead__content__share .ama__social-share').is(':visible')) {
        $(window).scroll(function() {
          var $socialIcons = $('.ama__masthead__content__share .ama__social-share');
          var socialIconPositionBottom = $socialIcons.offset().top + $socialIcons.outerHeight();
          var footerPosition = $('footer').offset().top;

          if(debounce_timer) {
            window.clearTimeout(debounce_timer);
          }

          debounce_timer = window.setTimeout(function() {
            if(socialIconPositionBottom > footerPosition) {
              $('.ama__masthead__content__share').fadeOut('fast');
            } else {
              $('.ama__masthead__content__share').fadeIn('fast');
            }
          }, 50);
        });
      }


      $(window).scroll(function() {
        var resizeViewportHeight = window.innerHeight ? window.innerHeight : $(window).height();
        categoryNavHeight(resizeViewportHeight);
      });

      //Checks the layout position of article on window resize and moves the social icons accordingly
      $( window ).resize(function() {
        if (!agentID) {
          var resizeViewportHeight = $(window).innerHeight();
          var mainNavPositionUpdate = $('.ama__main-navigation .container').offset().left - 100;

          categoryNavHeight(resizeViewportHeight);
          $('.ama__social-share.ama__social-share--fixed').css('left', mainNavPositionUpdate);
        }
      });

      //If empty or otherwise unpopulated search field (i.e spaces only)
      //prevent search from submitting and reload current page
      var searchForm = $("form[id^='block-exposedformacquia-search-solrpage']");

      $(searchForm, this).submit(function(e) {
          var searchInput = $(this).find("input[name*='search']");

          //Trim and check if search input has any value
          if ($.trim(searchInput.val()).length < 1) {
            e.preventDefault();
            console.log('No search term entered');
            location.reload();
          }

          //Ensure no spaces before or after query are counted in search
          $(this).find(searchInput).each(function(){
            //Submit trimmed value
            $(this).val($.trim($(this).val()));
          });

      });
    }
  };
})(jQuery, Drupal);




/**
 * SmartMenus jQuery Plugin - v1.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function ($, Drupal, once) {
    Drupal.behaviors.categoryMenuBehavior = {
        attach: function (context, settings) {
            once('categoryMenuBehavior', '.ama_category_navigation_menu__group', context).forEach(function (element) {
                $(element).smartmenus({
                    subIndicatorsPos: 'append'
                });
            });
        }
    };
})(jQuery, Drupal, once);

/**
 * @file
 * Attaches behavior to interact with user sign in menu
 */
(function ($, Drupal) {
    Drupal.behaviors.amaSignInMenu = {
        attach: function (context, settings) {
            const $dropdownBlock = $('.ama__sign-in-dropdown');
            const $dropdownTrigger = $('.ama__sign-in-dropdown__trigger');
            const $dropdownMenu = $('.ama__sign-in-dropdown__menu');
            const $signInLink = $('.ama__sign-in-dropdown__trigger__text');
            let isDropdownOpen = false;

            function setupDropDown(dropdownBlock, triggerElement, menuElement) {
                dropdownBlock.off('click').on('click', function (e) {
                    e.stopPropagation();
                    if (isDropdownOpen) {
                        closeMenu(triggerElement, menuElement);
                    } else {
                        openMenu(triggerElement, menuElement);
                    }
                    isDropdownOpen = !isDropdownOpen;
                });

                $signInLink.on('click', function (e) {
                    e.preventDefault();
                });

                $dropdownBlock.on('focusout', function () {
                    if (!$dropdownBlock.has(event.relatedTarget).length) {
                        closeMenu($dropdownTrigger, $dropdownMenu);
                    }
                });

                $(document).on('click', function (e) {
                    if (!dropdownBlock.is(e.target) && dropdownBlock.has(e.target).length === 0) {
                        closeMenu(triggerElement, menuElement);
                        isDropdownOpen = false;
                    }
                });

                dropdownBlock.on('mouseenter', function () {
                    clearTimeout(dropdownBlock.timeoutId);
                }).on('mouseleave', function () {
                    dropdownBlock.timeoutId = setTimeout(function () {
                        closeMenu(triggerElement, menuElement);
                        isDropdownOpen = false;
                    }, 2000);
                });

                menuElement.on('click', function (e) {
                    if (!$(e.target).is('a')) {
                        e.stopPropagation();
                    }
                });
            }

            function openMenu(parentElement, menuElement) {
                parentElement.addClass('open');
                menuElement.show().addClass('ama__sign-in-dropdown__menu--open');
            }

            function closeMenu(parentElement, menuElement) {
                if ( Cookies.get('signInCta') !== '1' ) Cookies.set('signInCta', '1');
                parentElement.removeClass('open');
                menuElement.hide().removeClass('ama__sign-in-dropdown__menu--open');
            }

            setupDropDown($dropdownBlock, $dropdownTrigger, $dropdownMenu);
        }
    };
})(jQuery, Drupal);

/**
 * @file
 * Attaches behavior to open dismissable sign-in menu when visiting the site
 */
(function ($, Drupal) {
    Drupal.behaviors.signInCta = {
        attach: function (context, settings) {

            function hasNoCtaCookie() {
                const signInCtaCookie = Cookies.get('signInCta');
                return signInCtaCookie !== '1'
            }
            function setCtaCompleted(e){
                Cookies.set('signInCta', '1');
            }
            function bindCompletedEvents(dropdownBlock){
                $(document).on('click', setCtaCompleted);
                dropdownBlock.on('click', setCtaCompleted);
            }
            function startCta(signInDropdown, signInDropdownMenu){
                if (hasNoCtaCookie()) {
                    signInDropdown.addClass('open');
                    signInDropdownMenu.addClass('ama__sign-in-dropdown__menu--open');

                    setTimeout(function () {
                        signInDropdown.removeClass('open');
                        signInDropdownMenu.removeClass('ama__sign-in-dropdown__menu--open');
                        setCtaCompleted()
                    }, 7000);
                }
            }
            const $dropdownBlock = $('.ama__sign-in-dropdown');
            const $signInDropdownTrigger = $('.ama__sign-in-dropdown__trigger');
            const $signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
            bindCompletedEvents($dropdownBlock)
            startCta($signInDropdownTrigger, $signInDropdownMenu)
        }
    };
})(jQuery, Drupal);
  
(function ($, Drupal) {
  Drupal.behaviors.ama_search_checkbox = {
    attach: function (context, settings) {

      var $categorySearchInput = $('#search_category');
      var $categorySearchList = $('.facets-widget-checkbox ul li');
      var $clearSearchFilter = $('#appliedFiltersRemove');

      // Filter list using jQuery filter
      function filterList(searchBox, list) {
        searchBox.keyup(function () {
          var $regex = new RegExp(this.value, 'i');
          list.hide().filter(function () {
            return $regex.test($.trim($(this).text()));
          }).show();
        });
      }

      // Clear filter
      function cleafFilterList(clearSearchFilter) {
        clearSearchFilter.click(function (e) {
          e.preventDefault();
          $categorySearchInput.val('');
          $categorySearchInput.trigger('keyup');

          $('.facets-widget-checkbox ul li [type=checkbox]').each( function() {
            $(this).prop("checked", false);
            $('#block-exposedformacquia-search-solrpage-2').submit();
          });
        });
      }

      // Invoke filter list
      filterList($categorySearchInput, $categorySearchList);

      // Invoke clear filter
      cleafFilterList($clearSearchFilter);
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * bp calculator.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */

(function ($, Drupal) {
  Drupal.behaviors.bpCalculator = {
    attach: function (context, settings) {

      // Clone last row of table
      $('.add-bp-row').unbind('click').click(function(e){
        e.preventDefault();
        var $tableBody = $('#bpCalculator table').find('tbody'),
          $trLast = $tableBody.find('tr:last'),
          $trNew = $trLast.clone();

        // Append new class name to cloned row
        $trLast.before($trNew).addClass('cloned').find('input').val('');

        // Add new name with index
        $tableBody.find('tr:last input').each(function () {
          var $trInputClassIndex = $('#bpCalculator tbody>tr').length + 1,
              $trInputClassName = $(this).attr('class');

          $(this).attr('name', $trInputClassName + '-' + $trInputClassIndex);
        });

        $('td:eq(0)', $trLast).text($('#bpCalculator tbody>tr').length);
        return false;
      });

      // When clear/restart button is clicked return table to initial state
      $('.clear-restart').unbind('click').click(function(e){
        e.preventDefault();

        // Remove all cloned rows
        var $trCloned = $('.cloned');
        $trCloned.remove();

        // Reset to intial values
        $('#bpCalculator input').each(function () {
          $(this).val('');
        });

        // Reset form
        $('#bpCalculator ').validate().resetForm();

        // Hide output row
        $('.bpCalculator__table__output').hide();

        return false;
      });

      // Calculate average BP
      function calculcateBP(bpValue, bpOutput) {
        var bpInput = 0, // row count
            bpTotal = 0, // incremented input values
            bpAverage; // averaged bpTotal / bpInput

        bpValue.each(function () {
          // If Input values are greater than 0 then turn into a number and round
          var val = $(this).val() > 0 ? Math.round(parseInt($(this).val(), 10)) : false;

          if (val !== 0) {
            bpInput += 1;
            bpTotal += val;
          }
        });

        // Calculate average
        bpAverage = bpTotal / bpInput > 0 ? Math.round(bpTotal / bpInput) : 0;

        bpOutput.text(bpAverage);

        $('.bpCalculator__table__output').show();
      }

      // Validate BP Form
      $('#bpCalculator').validate({
        // Calculate BP when calculate is clicked
        submitHandler: function(form) {
          var sysBpValue = $('.bpCalculator__systolic-input'),
            sysBpOutput = $('.bpCalculator__systolic-output');

          var diaBpValue = $('.bpCalculator__diastolic-input'),
            diaBpOutput = $('.bpCalculator__diastolic-output');

          calculcateBP(sysBpValue, sysBpOutput);
          calculcateBP(diaBpValue, diaBpOutput);

          return false;
        }
      });
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Mobile functionality for the product menu.
 */
(function ($, Drupal, once) {
    Drupal.behaviors.ama_productMenu = {
      attach: function (context) {
        // Select required elements from the DOM.
        const $menu = $('.ama__product-nav');
        const $trigger = '.product-menu-title';
        const $catcher = $('.ama__product-nav-catcher');
        const $menuItems = $('.ama__product-nav .dropdown-container ul li');
        
        $(once('expand-collapse', $trigger, context)).on('click', function (e) {
          if ($menu.hasClass('expanded')) {
            $('.ama__product-nav.expanded .dropdown-container').css({"max-height": "262px"});
            $menu.removeClass('expanded');
            $catcher.addClass('hidden');
            $('body').css({"overflow":"auto"});
          }
          else {
            $menu.addClass('expanded');
            $catcher.removeClass('hidden');
            $('body').css({"overflow":"hidden"});
            $menuItems.each(function() {
              if ($( this ).innerHeight() == '62') {
                $openDropdown = $('.ama__product-nav.expanded .dropdown-container');
                $menuHeight = $openDropdown.innerHeight() + 24;
                $openDropdown.css({"max-height": $menuHeight + "px"});
              }
            });
          }
        });

        $(once('collapse-product-nav',  $catcher, context)).on('click', function (e) {
            $('.ama__product-nav.expanded .dropdown-container').css({"max-height": "262px"});
            $menu.removeClass('expanded');
            $catcher.addClass('hidden');
            $('body').css({"overflow":"auto"});
        });
      }
    };
  })(jQuery, Drupal, once);

/**
 * @file
 * Sadly adds footer to left resource page column.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.resourcePageFooter = {
    attach: function(context, settings) {

      $(function() {
        if ($('body.ama__resource-page').length) {
          $('footer', context).clone().appendTo('.ama__layout--split__left').addClass('ama__footer ama__resource-page__desktop-footer');
        }
      });
    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Responsive Tables.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.responsiveTables = {
    attach: function(context, settings) {
        window.screen.width;

      // This conditional has been added to prevent basicTable plugin to selectively not run on tables
      if (!$('table').hasClass('bt')) {
        $('table').basictable({
          breakpoint: 1182
        });
      }

      // Set the table as bt for mobile.
        $('.ama__forum-table-wrap table').each( function() {
            if(window.screen.width <= 1182) {
                $(this).basictable('start');
            }
        });

      // this forces tables inside of the .ama__resource--schedules div to have mobile look and feel
      $('.ama__resource--schedules table').each( function() {
              $(this).basictable('start');
      });

    }
  };
})(jQuery, Drupal);

/**
 * @file
 * Listicle Clases.
 *
 * Handling classes to build listicle properly outside ckeditor.
 */
(function ($, Drupal, once) {
  Drupal.behaviors.listicle = {
    attach: function(context) {
      if ($('.listicle', context).length) {
        $('.listicle').each(function () {
          $(this).children().each(function (idx, e) {
            $(e).addClass('listicle__item');
            $(e).find('ol, ul').each(function (idx, f) {
              $(f).addClass('listicle__item-sub');
              $(f).children('li').addClass('listicle__item-sub-item');
            });
          });
        });
      }

      //if the listicle item contains an image, put a clearfix div on the item so if it has a trailing image, the next item won't wrap on it.
      //Also, determine it the image is almost 100% of the list width. if it is, add a class to remove the left margin and make the image 100% width. I chose 80%.
      if($('.listicle__item img')) {
        $('.listicle__item img').each(function () {
          var width = $(this).closest('.listicle__item').width()
          console.log(width)
          var imageWidth = $(this).width()
          console.log(imageWidth)
          var clearfix = '<div class="clearfix"></div>'
          $(once('listicle-item', '.listicle__item', this)).append(clearfix)
          if (imageWidth >= width*.7) {
            $(this).addClass('no-margin')
            $(this).closest ('figure').addClass('no-margin')
          }
        })
      }
    }
  };
})(jQuery, Drupal, once);

/**
 * @file
 * Attaches AMA Image Popup library.
 */

(function ($, Drupal) {
	function alterModal (context) {
		$('.ui-dialog').css({"z-index": "50001"});
		$('.ui-dialog-title').hide();
		$('.ui-button-icon-only .ui-icon').hide();
		// Styleguide specific treatment to hide and css to elements.
		$('.ui-draggable .ui-dialog-titlebar').css({
			"border": "none",
			"padding:": "0",
			"background": "none"
		});
		$('.ui-widget-overlay').css({
			"opacity": ".5",
			"z-index:": "5000"
		});
		$('.ui-dialog .ui-dialog-titlebar-close').css({
			"background": "url('/assets/images/icon-modal-close.svg')",
			"border": "none",
			"position": "absolute",
			"right": "-20px",
			"top": "-10px",
			"height": "28px",
			"width": "28px",
			"padding": "0",
		});
	}

	function closeModal (context) {
		$('.ui-icon-closethick').unbind('click.close');
		$('.ui-icon-closethick').trigger('click');
	}

	Drupal.behaviors.ama_image_popup = {
		attach: function (context) {
			$(document).on("dialogopen", ".ui-dialog", function (event, ui) {
				alterModal();
			});
			$(document).on("click", ".ui-widget-overlay", function (event, ui) {
				closeModal();
			});
		}
	};

})(jQuery, Drupal);

/**
 * @file
 * Attaches AMA Image Popup library.
 */

(function ($, Drupal) {
	function alterModal (context) {
		$('.ama-image-popup-modal .ui-dialog-title').hide();
		$('.ama-image-popup-modal .ui-button-icon-only .ui-icon').hide();
	}

	function closeModal (context) {
		$('.ui-icon-closethick').unbind('click.close');
		$('.ui-icon-closethick').trigger('click');
	}

	Drupal.behaviors.ama_image_popup = {
		attach: function (context) {
			$(document).on("dialogopen", ".ui-dialog", function(event, ui) {
				alterModal();
			});
			$(document).on("click", ".ui-widget-overlay", function(event, ui) {
				closeModal();
			});
		}
	}
})(jQuery, Drupal);

(function ($, Drupal, once) {
  Drupal.behaviors.index = {
    attach: function (context, settings) {

  if ( $('.desc-display').length ) {

    var full = $('.fulltext');
    var trunc = $('.truncated')
    var desc = $('.desc-display')
    var fullText = $('.fulltext').html()
    var truncated = $('.truncated').html()
    var fullHeight = ''
    var truncHeight = ''
    var moreHtml = '<a accesskey="l" href="#" alt="Read More" class="more" tabindex="0"> ...Read More</a>'
    var lessHtml = '<a accesskey="l" href="#" alt="Show Less" class="less" tabindex="0">Show Less</a>'
    var width = ''

      function getDimensions () {

        // If closest parent indicates category.
        // Adjust hieght values.
        if (desc.closest('div.ama__category')) {
          width = $(window).width()
          if (width < 400) {
            truncHeight = trunc.height() + 25
            fullHeight = full.height() + 20
          } else if (width < 900) {
              truncHeight = trunc.height() + 51
              fullHeight = full.height() + 20
          } else {
            truncHeight = trunc.height() + 26
            fullHeight = full.height() + 14
          }
        } else {
          width = $(window).width()
          if (width < 400) {
            truncHeight = trunc.height() + 25
            fullHeight = full.height() + 20
          } else if (width < 900) {
              truncHeight = trunc.height() + 25
              fullHeight = full.height() + 20
          } else {
            truncHeight = trunc.height()
            fullHeight = full.height() + 14
          }
        }
      };

      /*
        * Animate the height of a dynamic height object? SIMPLE!
        * What a fool you would be to not think of so elegant a solution.
        * In the markup, there are hidden fulltext and summary divs.
        * They are absolutely positioned whithin the page template to keep an accurate height.
       */

      // Set height on pageload using the hidden divs.
      $(once('getHeight', '.desc-display', context)).each(function () {
        getDimensions()
        desc.css('height', truncHeight + 'px')
      });

      // Set the height again on window resize.
      $(window).on('resize', function () {
        getDimensions()
        if (desc.hasClass('full')) {
          desc.css('height', fullHeight + 'px')
        } else if (desc.hasClass('summary')) {
          desc.css('height', truncHeight + 'px')
        }
      });

      // On click, set the height to trigger css transition.
      desc.on('click', '.more', function () {
        getDimensions()
        desc.css('height', fullHeight + 'px')
        desc.addClass('full').removeClass('summary')
        // Swap the full copy into the display div.
        desc.html($.parseHTML(fullText)).append(lessHtml)
      });
      desc.on('click', '.less', function () {
        getDimensions()
        desc.css('height', truncHeight + 'px')
        desc.addClass('summary').removeClass('full')
        // Swap the truncated copy into the display div.
        desc.html($.parseHTML(truncated)).append(moreHtml)
        // Scroll to top.
        $('html, body').animate({ scrollTop: 0 }, 500, 'swing')
      });
    }

    }
  };
})(jQuery, Drupal, once);

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
                    // Don't scroll to anchor social links, urls with a /#/ component, accordion headings on desktop or any other external links with anchors.
                    if (this.getAttribute('data-ga-site_events') == 'social_click' || 
                    this.hash.includes('#/') || 
                    ($(this).parent().is('dt') && $(window).width() > 992) || 
                    /\/comment\/\d+#/.test(this.href) || 
                    this.hasAttribute('data-extlink') || 
                    this.pathname !== window.location.pathname) {
                        return;
                    } else {
                        e.preventDefault(); // prevent hard jump, the default behavior
                        // Perform animated scrolling
                        scrollToAnchor(this.hash);
                    }
                });

                // On page load with anchor in URL
                if (window.location.hash) {
                    scrollToAnchor(window.location.hash);
                }
            });
        },
    };
})(jQuery, Drupal);
/**
 * @file
 * Application dropdown.
 */
(function ($, Drupal) {
  Drupal.behaviors.appMenu = {
    attach: function (context, settings) {

      $('#block-accountnav').each(function () {
        var class_active = 'is-active';

        $('.account_nav_trigger', this).on('click', function(e) {
          e.stopPropagation();
          // Unfocus on the dropdown.
          $(this).blur();
          // Add our class for CSS.
          $(this).toggleClass(class_active);
          // Add our class to the dropdown UL.
          $(this).next().toggleClass(class_active);
        });

        $(document).click( function(){
          $('.account_nav_trigger', this).removeClass(class_active).next().removeClass(class_active);
        });
      });
    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.ama_podcast = {
    attach: function (context, settings) {
      $(document).ready(function() {
        //Check number of links
        oddLinks();
      });

      function oddLinks() {
        var count = $("ul.ama__podcast-player__links li").length;
        var linkContainer = $("ul.ama__podcast-player__links");

        if (count == 3 || count == 1) {
          linkContainer.addClass('odd_links');
        }
      }
    }
  };
})(jQuery, Drupal);
/**
 * @file
 * Mobile functionality for the locker menu.
 */
(function ($, Drupal, once) {
    Drupal.behaviors.ama_lockerMenu = {
      attach: function (context) {
        // Select required elements from the DOM.
        const $window = $(window);
        const $menu = $('.ama_locker_navigation');
        const $trigger = $('.ama_locker_navigation-trigger');
        const $catcher = $('.ama_locker_navigation-catcher');
        const $body = $('body');
        const bodyFixed = $('body').css('overflow');

        function lockerMenu() {
            // Open menu on trigger click.
            $(once('click-to-show', '.ama_locker_navigation-trigger', context)).on('click', function (e) {
                $menu.addClass('expanded');
                $catcher.toggleClass('hidden');
                $body.css({"overflow":"hidden"});
            });
            // Close menu on background click.
            $(once('click-to-hide', '.ama_locker_navigation-catcher', context)).on('click', function () {
                $catcher.toggleClass('hidden');
                $menu.removeClass('expanded');
                $body.css({"overflow":"auto"});
            });
        }

        lockerMenu();

      }
    };
  })(jQuery, Drupal, once);

(function ($, Drupal) {
    Drupal.behaviors.ama_signInMenu = {
        attach: function (context, settings) {
            var $exploreMenu = $('.ama__explore-menu');
            var $exploreMenuDropdown = $('.ama__explore-menu__menu');
            var isDropdownOpen = false;

            function dropdownDownMenu(parentElement, menuElement) {
                parentElement.unbind('click').click(function(e){
                    e.stopPropagation();
                    if (isDropdownOpen) {
                        $(menuElement).slideUp();
                        $(parentElement).removeClass('open');
                    } else {
                        $(menuElement).slideDown();
                        $(parentElement).addClass('open');
                    }
                    isDropdownOpen = !isDropdownOpen;
                });
            
                $(document).click(function(e) {
                    // if the target of the click isn't the container nor a descendant of the container
                    if (!parentElement.is(e.target) && parentElement.has(e.target).length === 0) {
                        $(menuElement).slideUp();
                        $(parentElement).removeClass('open');
                        isDropdownOpen = false;
                    }
                });

                // Set timeout for when a user mouses out of the menu
                parentElement.mouseenter(function(){
                    clearTimeout(parentElement.timeoutId);
                }).mouseleave(function(){
                    parentElement.timeoutId = setTimeout(function(){
                        $(menuElement).slideUp();
                        $(parentElement).removeClass('open');
                        isDropdownOpen = false;
                    }, 2000);
                });
            }

            dropdownDownMenu($exploreMenu, $exploreMenuDropdown);
        }
    };
})(jQuery, Drupal);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQuanMiLCJhbGVydC5qcyIsImJyb3dzZXItdGhlbWUuanMiLCJmb3JtLWl0ZW1zLmpzIiwibmF2LmpzIiwic3ViY2F0ZWdvcnkuanMiLCJ0YWJzLmpzIiwiYWNjb3JkaW9uLmpzIiwid2ViZm9ybXMuanMiLCJtYWluLW5hdmlnYXRpb24uanMiLCJjYXRlZ29yeS1tZW51LmpzIiwic2lnbi1pbi1kcm9wZG93bi5qcyIsInNlYXJjaC1jaGVja2JveC5qcyIsImJwLWNhbGN1bGF0b3IuanMiLCJwcm9kdWN0LW1lbnUuanMiLCJyZXNvdXJjZS5qcyIsInRhYmxlcy5qcyIsImxpc3RpY2xlLmpzIiwibW9kYWwuanMiLCJpbmRleC1wYWdlLmpzIiwiYW5jaG9yX2xpbmtzLmpzIiwiYXBwbGljYXRpb24tZHJvcGRvd24uanMiLCJwb2RjYXN0LXBsYXllci5qcyIsImxvY2tlci1tZW51LmpzIiwiZXhwbG9yZS1kcm9wZG93bi5qcyIsIm1vYmlsZS1ob21lcGFnZS1jdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic3R5bGVndWlkZS1jdXN0b20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlXG4gKiBJbml0aWFsaXphdGlvbiBzY3JpcHQgZm9yIGdsb2JhbCBwcm9jZXNzZXNcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXG4vKipcbiAqXG4gKiBJbml0aWFsaXplIGZpdFZpZCBmb3IgWW91VHViZSB2aWVvcy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuXG5cdERydXBhbC5iZWhhdmlvcnMuZml0dmlkaW5pdCA9IHtcblx0IGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cdFx0XHQoZnVuY3Rpb24gKCQpIHtcblx0XHRcdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKCcudmlkZW8tY29udGFpbmVyJykuZml0VmlkcygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pKGpRdWVyeSk7XG5cdFx0fVxuXHR9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBhbGVydC5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbGVydCA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgdmFyIGFsZXJ0SWQgPSAkKCcuYW1hX19hbGVydF9fd3JhcCcpLmF0dHIoJ2lkJyk7XG4gICAgICB2YXIgYWxlcnRDb29raWUgPSBDb29raWVzLmdldCgnYWxlcnRDb29raWUnKTtcbiAgICAgIHZhciBhbGVydE5vZGUgPSBDb29raWVzLmdldCgnYWxlcnROb2RlJyk7XG5cbiAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICAvLyBJZiB0aGUgJ2hpZGUgY29va2llIGlzIG5vdCBzZXQgd2Ugc2hvdyB0aGUgYWxlcnRcbiAgICAgICAgaWYgKChhbGVydE5vZGUgIT09IGFsZXJ0SWQpIHx8IChhbGVydENvb2tpZSAhPT0gJzEnKSkge1xuICAgICAgICAgICQoJy5hbWFfX2FsZXJ0X193cmFwJykuY3NzKHtcbiAgICAgICAgICAgIFwidHJhbnNpdGlvblwiOiBcIm9wYWNpdHkgLjE1c1wiLFxuICAgICAgICAgICAgXCJvcGFjaXR5XCI6IFwiMVwiXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5jc3Moe1xuICAgICAgICAgICAgXCJkaXNwbGF5XCI6IFwibm9uZVwiXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGhlIGV2ZW50IHRoYXQgY2xvc2VzIHRoZSBwb3B1cCBhbmQgc2V0cyB0aGUgY29va2llIHRoYXQgdGVsbHMgdXMgdG9cbiAgICAgICAgLy8gbm90IHNob3cgaXQgYWdhaW4gdW50aWwgb25lIGRheSBoYXMgcGFzc2VkLlxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5hbWFfX2FsZXJ0X19jbG9zZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQoJy5hbWFfX2FsZXJ0X193cmFwJykuY3NzKHtcbiAgICAgICAgICAgIFwidHJhbnNpdGlvblwiOiBcIm9wYWNpdHkgMnNcIixcbiAgICAgICAgICAgIFwib3BhY2l0eVwiOiBcIjBcIixcbiAgICAgICAgICAgIFwiZGlzcGxheVwiOiBcIm5vbmVcIlxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBjb29raWVzXG4gICAgICAgICAgQ29va2llcy5zZXQoJ2FsZXJ0Q29va2llJywgJzEnLCB7IGV4cGlyZXM6IDF9KTtcbiAgICAgICAgICBDb29raWVzLnNldCgnYWxlcnROb2RlJywgYWxlcnRJZCwgeyBleHBpcmVzOiAxfSk7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfSkoalF1ZXJ5KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBTYWRseSBhZGRzIGZvb3RlciB0byBsZWZ0IHJlc291cmNlIHBhZ2UgY29sdW1uLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIERydXBhbC5iZWhhdmlvcnMuYnJvd3NlcnRoZW1lID0ge1xuICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qgc2V0VGhlbWVDb2xvciA9IChjb2xvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ0aGVtZS1jb2xvclwiXScpXG4gICAgICAgICAgICAgICAgaWYgKG1ldGEpIHtcbiAgICAgICAgICAgICAgICAgIG1ldGEuc2V0QXR0cmlidXRlKCdjb250ZW50JywgY29sb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBpZiAoXCJJbnRlcnNlY3Rpb25PYnNlcnZlclwiIGluIHdpbmRvdykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGVudHJpZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgaXNJbnRlcnNlY3RpbmcsIHRhcmdldCB9ID0gZW50cnlcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGFyZ2V0KS5nZXRQcm9wZXJ0eVZhbHVlKFwiYmFja2dyb3VuZC1jb2xvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRoZW1lQ29sb3IoY29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgIHJvb3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydCcpLFxuICAgICAgICAgICAgICAgICAgcm9vdE1hcmdpbjogXCIxcHggMHB4IC0xMDAlIDBweFwiLFxuICAgICAgICAgICAgICAgICAgdHJlc2hvbGQ6IDAuMVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlY3Rpb24nKS5mb3JFYWNoKHNlY3Rpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShzZWN0aW9uKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KShqUXVlcnkpO1xuICAgICAgfVxuICAgIH07XG4gIH0pKGpRdWVyeSwgRHJ1cGFsKTtcbiAgIiwiLyoqXG4gKiBAZmlsZVxuICogRm9ybSBmaWVsZHMgbWFza2luZ1xuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5mb3JtSXRlbXMgPSB7XG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIERvIG5vdCBleGVjdXRlIGluIHRoZSBsYXlvdXQgYnVpbGRlciBlZGl0IGRpYWxvZ1xuICAgICAgICAgICAgICAgICAgICBpZiAoISQoJy5qcy1vZmYtY2FudmFzLWRpYWxvZy1vcGVuJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubXVsdGlzZWxlY3QnKS5tdWx0aXNlbGVjdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuYW1hX190b29sdGlwJykudG9vbHRpcCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcENsYXNzOiBcImFtYV9fdG9vbHRpcC1idWJibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heF9sZW5ndGggPSAxNTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9lbnRlcmVkID0gJCgnLnRleHRhcmVhJykudmFsKCkubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfcmVtYWluaW5nID0gbWF4X2xlbmd0aCAtIGNoYXJhY3Rlcl9lbnRlcmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5odG1sKGNoYXJhY3Rlcl9yZW1haW5pbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXhfbGVuZ3RoIDwgY2hhcmFjdGVyX2VudGVyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRleHRhcmVhJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8galF1ZXJ5VUkgc2VsZWN0bWVudSBtZXRob2QgdG8gaW5pdGlhdGUgY3VzdG9tIGRyb3Bkb3duIG1lbnVcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5zZWxlY3RtZW51KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdhaXQgZm9yIGEgc2hvcnQgZGVsYXkgdG8gZW5zdXJlIHRoZSBtZW51IGlzIGZ1bGx5IGxvYWRlZCBhbmQgaW5pdGlhbGl6ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGFyaWEtbGFiZWwgb24gc2VsZWN0bWVudSBidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5pdGl0YWxTZWxlY3RlZE9wdGlvblRleHQgPSAkKCcudWktc2VsZWN0bWVudS1tZW51JykuZmluZCgnZGl2LnVpLXN0YXRlLWFjdGl2ZScpLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudWktc2VsZWN0bWVudS1tZW51JykuZmluZCgnZGl2LnVpLXN0YXRlLWFjdGl2ZScpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnU29ydCBieSAnICsgaW5pdGl0YWxTZWxlY3RlZE9wdGlvblRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGFyaWEtbGFiZWwgb24gc2VsZWN0bWVudSBidXR0b24gd2hlbiBhbiBvcHRpb24gaXMgc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5zZWxlY3RtZW51KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIHRleHQgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT3B0aW9uVGV4dCA9ICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgYXJpYS1sYWJlbCBhdHRyaWJ1dGUgdG8gdGhlIHRleHQgb2YgdGhlIHNlbGVjdGVkIG9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0JykubmV4dCgnLnVpLXNlbGVjdG1lbnUtYnV0dG9uJykuZmluZCgnLnVpLXNlbGVjdG1lbnUtdGV4dCcpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnU29ydHkgYnkgJyArIHNlbGVjdGVkT3B0aW9uVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy51aS1zZWxlY3RtZW51LW1lbnUnKS5maW5kKCcudWktbWVudS1pdGVtIGRpdi51aS1zdGF0ZS1hY3RpdmUnKS5hdHRyKCdhcmlhLWxhYmVsJywgJ1NvcnQgYnkgJyArIHNlbGVjdGVkT3B0aW9uVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZnJlc2ggbWVudSB0byBzZXQgY2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLnNlbGVjdG1lbnUoJ3JlZnJlc2gnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgZm9jdXMgaXMgb24gdGhlIHNlbGVjdCBtZW51XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHN1Ym1pdCBhZnRlciBoaXR0aW5nIGVudGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjZWRpdC1zb3J0LWJ5LS0zLWJ1dHRvbicpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGUud2hpY2ggPT0gOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjZWRpdC1zb3J0LWJ5LS0zLWJ1dHRvbicpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZS53aGljaCA9PSAxMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2gtc29scnBhZ2UtMicpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VibWl0cyB0aGUgc2VhcmNoIGZvcm0gYWZ0ZXIgYSBzZWxlY3QgbWVudSBpdGVtcyBoYXMgYmVlbiBzZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdDpub3QoI2VkaXQtc29ydC1ieS0tMyknKS5vbignc2VsZWN0bWVudWNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2gtc29scnBhZ2UtMicpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNlZGl0LXNvcnQtYnktLTMtbWVudScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNoLXNvbHJwYWdlLTInKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjZWRpdC1zb3J0LWJ5LS0zLW1lbnUnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RhcnQgc2VhcmNoIGZpbHRlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXZhaWxhYmxlVGFncyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFsYWJhbWFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFsYXNrYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQW1lcmljYW4gU2Ftb2FcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFyaXpvbmFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFya2Fuc2FzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDYWxpZm9ybmlhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb2xvcmFkb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29ubmVjdGljdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkRlbGF3YXJlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEaXN0cmljdCBPZiBDb2x1bWJpYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJGbG9yaWRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHZW9yZ2lhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHdWFtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJIYXdhaWlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIklkYWhvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJJbGxpbm9pc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSW5kaWFuYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSW93YVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiS2Fuc2FzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJLZW50dWNreVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTG91aXNpYW5hXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNYWluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTWFyc2hhbGwgSXNsYW5kc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTWFyeWxhbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1hc3NhY2h1c2V0dHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1pY2hpZ2FuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNaW5uZXNvdGFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1pc3Npc3NpcHBpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNaXNzb3VyaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTW9udGFuYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTmVicmFza2FcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk5ldmFkYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTmV3IEhhbXBzaGlyZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTmV3IEplcnNleVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTmV3IE1leGljb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTmV3IFlvcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk5vcnRoIENhcm9saW5hXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOb3J0aCBEYWtvdGFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiT2hpb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiT2tsYWhvbWFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk9yZWdvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUGFsYXVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBlbm5zeWx2YW5pYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHVlcnRvIFJpY29cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJob2RlIElzbGFuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU291dGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNvdXRoIERha290YVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVGVubmVzc2VlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUZXhhc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXRhaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVmVybW9udFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVmlyZ2luIElzbGFuZHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZpcmdpbmlhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXYXNoaW5ndG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXZXN0IFZpcmdpbmlhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXaXNjb25zaW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIld5b21pbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCggXCIjc2VhcmNoX2ZpbHRlclwiICkuYXV0b2NvbXBsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGF2YWlsYWJsZVRhZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkLnVpLmF1dG9jb21wbGV0ZS5wcm90b3R5cGUuX3Jlc2l6ZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVsID0gdGhpcy5tZW51LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWwub3V0ZXJXaWR0aCh0aGlzLmVsZW1lbnQub3V0ZXJXaWR0aCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RhcnQgc2VhcmNoIGZpbHRlciB3aXRoIGNoZWNrYm94ZXNcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFNb2RlbCA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ0FsYWJhbWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ0FsYXNrYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnQW1lcmljYW4gU2Ftb2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ0FyaXpvbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ0Fya2Fuc2FzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdDYWxpZm9ybmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdDb2xvcmFkbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnQ29ubmVjdGljdXQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ0RlbGF3YXJlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdEaXN0cmljdCBPZiBDb2x1bWJpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdGbG9yaWRhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdHZW9yZ2lhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdHdWFtJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdIYXdhaWknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ0lkYWhvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdJbGxpbm9pcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnSW5kaWFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnSW93YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnS2Fuc2FzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdLZW50dWNreScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnTG91aXNpYW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdNYWluZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnTWFyc2hhbGwgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnTWFyeWxhbmQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ01hc3NhY2h1c2V0dHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ01pY2hpZ2FuJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdNaW5uZXNvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ01pc3Npc3NpcHBpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdNaXNzb3VyaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnTW9udGFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnTmVicmFza2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ05ldmFkYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEhhbXBzaGlyZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEplcnNleScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IE1leGljbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IFlvcmsnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ05vcnRoIENhcm9saW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdOb3J0aCBEYWtvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnT2hpbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnT2tsYWhvbWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ09yZWdvbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnUGFsYXUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ1Blbm5zeWx2YW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnUHVlcnRvIFJpY28nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ1Job2RlIElzbGFuZCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnU291dGggQ2Fyb2xpbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ1NvdXRoIERha290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnVGVubmVzc2VlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdUZXhhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnVXRhaCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnVmVybW9udCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdXYXNoaW5ndG9uJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdXZXN0IFZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdXaXNjb25zaW4nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ1d5b21pbmcnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dDogJycsIHZhbHVlOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNlbENoYW5nZSgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSAkKCcjbXlDaGVja0xpc3QnKS5jaGVja0xpc3QoJ2dldFNlbGVjdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3NlbGVjdGVkSXRlbXMnKS50ZXh0KEpTT04uc3RyaW5naWZ5KHNlbGVjdGlvbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGpRdWVyeS51aS5jaGVja0xpc3QpICE9ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjZmlsdGVyTGlzdCcpLmNoZWNrTGlzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtczogZGF0YU1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogc2VsQ2hhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2Zvcm06bm90KFtjbGFzcyo9XCJsYXlvdXQtYnVpbGRlclwiXSkgW3R5cGU9Y2hlY2tib3hdJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnW3R5cGU9Y2hlY2tib3hdJykuY2hlY2tib3hyYWRpbygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2Zvcm06bm90KFtjbGFzcyo9XCJsYXlvdXQtYnVpbGRlclwiXSkgW3R5cGU9cmFkaW9dJykuY2hlY2tib3hyYWRpbygpLmJ1dHRvbnNldCgpLmZpbmQoJ2xhYmVsJykuY3NzKCd3aWR0aCcsICcxOS40JScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5rZXl1cChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudF9yZW1haW5pbmdfY2hhcmFjdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmFuZ2UgRmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZWdlbmQgPSAkKCcuYW1hX19yYW5nZS1maWVsZF9fbGVnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGFuZGxlID0gJCggXCIjY3VycmVudFZhbHVlXCIgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5hbWFfX3JhbmdlLWZpZWxkXCIpLnNsaWRlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogJ21pbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluOiAyMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGpRdWVyeSh0aGlzKS5maW5kKCcudWktc2xpZGVyLWhhbmRsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnViYmxlID0galF1ZXJ5KCc8ZGl2IGNsYXNzPVwiYW1hX19yYW5nZS1maWVsZF9fdmFsdWVib3hcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmFwcGVuZChidWJibGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2dCwgdWkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWkuaGFuZGxlLmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gJyQnICsgdWkudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuYXBwZW5kKGxlZ2VuZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvcm0gYWNjb3JkaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCBcIi50YWJsaXN0XCIgKS5hY2NvcmRpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIuYW1hX19mb3JtLXN0ZXBzX19zdGVwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gbGlzdEZpbHRlcihpbnB1dCwgbGlzdCkgeyAvLyBoZWFkZXIgaXMgYW55IGVsZW1lbnQsIGxpc3QgaXMgYW4gdW5vcmRlcmVkIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXN0b20gY3NzIGV4cHJlc3Npb24gZm9yIGEgY2FzZS1pbnNlbnNpdGl2ZSBjb250YWlucygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV4cHJbJzonXS5Db250YWlucyA9IGZ1bmN0aW9uKGEsaSxtKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChhLnRleHRDb250ZW50IHx8IGEuaW5uZXJUZXh0IHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihtWzNdLnRvVXBwZXJDYXNlKCkpPj0wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGlucHV0KS5jaGFuZ2UoIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlciA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBmaW5kcyBhbGwgbGlua3MgaW4gYSBsaXN0IHRoYXQgY29udGFpbiB0aGUgaW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgaGlkZSB0aGUgb25lcyBub3QgY29udGFpbmluZyB0aGUgaW5wdXQgd2hpbGUgc2hvd2luZyB0aGUgb25lcyB0aGF0IGRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJzcGFuOm5vdCg6Q29udGFpbnMoXCIgKyBmaWx0ZXIgKyBcIikpXCIpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcInNwYW46Q29udGFpbnMoXCIgKyBmaWx0ZXIgKyBcIilcIikucGFyZW50KCkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwibGFiZWxcIikuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25seSBzaG93IHJlc3VsdHMgYWZ0ZXIgMyBjaGFyYWN0ZXJzIGFyZSBlbnRlcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkua2V5dXAoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy52YWx1ZS5sZW5ndGggPCA0ICkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdEZpbHRlcigkKFwiI2FtYV9fc2VhcmNoX19sb2NhdGlvblwiKSwgJChcIi5hbWFfX2Zvcm0tZ3JvdXBcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgdGhlIGVudGlyZSBzdWJzY3JpYmUgYnV0dG9uIGNsaWNrYWJsZS5cbiAgICAgICAgICAgICAgICAgICAgJCgnZm9ybS5zYWxlc2ZvcmNlLXN1YnNjcmliZS1mb3JtLCAuYW1hX19pbnB1dC13cmFwcGVyLS1zdWJzY3JpYmUtbmV3cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzYWxlc2ZvcmNlLXN1YnNjcmliZS1mb3JtJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBvbiBzdWJzY3JpcHRpb25zIHBhZ2UsIHNhdmUgdGhlIHNjcm9sbCBwb3NpdGlvbiBiZWZvcmUgc3VibWl0dGluZyB0aGUgZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQoJ2Rpdi52aWV3LW15LXN1YnNjcmlwdGlvbicpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2Nyb2xsUG9zJywgJCh3aW5kb3cpLnNjcm9sbFRvcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuc3VibWl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGluayA9ICQodGhpcykuZmluZCgnYScpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gbGluaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIHN1YmNyaXB0aW9ucyBwYWdlLCBvbiBzdWJzY3JpYmUgYnV0dG9uIGNsaWNrLCByZWxvYWQgdGhlIHBhZ2UgYXQgdGhlIHNhbWUgbG9jYXRpb24gKGkuZSBvZmZzZXQgZnJvbSB0b3ApXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoJ2Rpdi52aWV3LW15LXN1YnNjcmlwdGlvbicpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzY3JvbGxQb3MnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzY3JvbGxQb3MnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzY3JvbGxQb3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKGpRdWVyeSk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFic3RyYWN0Rm9ybUZpbHRlcnMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICQob25jZSgnc3BhbicsICcuYWJzdHJhY3QtdG9waWNzLWZpbHRlci1idXR0b24nLCBjb250ZXh0KSkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJCgnLmFic3RyYWN0LXRvcGljcy1jaGVja2JveGVzJykuaGFzQ2xhc3MoJ2hpZGRlbicpKSB7XG4gICAgICAgICAgJCgnLmFic3RyYWN0LXRvcGljcy1jaGVja2JveGVzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICQoJy5hYnN0cmFjdC10b3BpY3Mtd3JhcHBlcicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkKCcuYWJzdHJhY3QtdG9waWNzLWNoZWNrYm94ZXMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgJCgnLmFic3RyYWN0LXRvcGljcy13cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7IiwiLyoqXG4gKiBAZmlsZVxuICogUmliYm9uIG5hdiB1c2VyIGludGVyYWN0aW9ucy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gJ2Fub255bW91cyBjbG9zdXJlJy4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMucmliYm9ubmF2ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsYXNzX2FjdGl2ZSA9ICdpcy1hY3RpdmUnO1xuXG4gICAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd25fX3RyaWdnZXInLCB0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAvLyBVbmZvY3VzIG9uIHRoZSBkcm9wZG93bi5cbiAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIGZvciBDU1MuXG4gICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgdG8gdGhlIGRyb3Bkb3duIFVMLlxuICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd25fX3RyaWdnZXInLCB0aGlzKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFN1YmNhdGVnb3J5XG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuc3ViY2F0ZWdvcmllcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAvLyBDcmVhdGUgc3RhdGljIHZhciBmb3Igc3ViY2F0ZWdvcnkgaXRlbSBjb3VudC4gVG8gYmUgdXNlZCBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciByZWNhbGN1bGF0aW9ucyBhcmUgbmVlZGVkLlxuICAgICAgdmFyIHN1YmNhdGVnb3J5RXhwbG9yYXRpb25Db2x1bW5zID0gMDtcblxuICAgICAgZnVuY3Rpb24gY2hlY2tTaXplKCkge1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5ID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3N1YmNhdGVnb3J5Jyk7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnlDb250YWluZXIgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fY29udGFpbmVyJyk7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnlUaXRsZSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX190aXRsZScpO1xuICAgICAgICAvLyBXZSB3YW50IHRoZSB3aWR0aCBtaW51cyBwYWRkaW5nIHNvIHVzZSB3aWR0aCgpIGluc3RlYWQgb2YgaW5uZXJXaWR0aCgpLlxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbldpZHRoID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXMnKS53aWR0aCgpO1xuICAgICAgICAvLyBTdWJjYXRlZ29yeSBpdGVtcyBoYXZlIG1heC13aWR0aCBvZiAxODBweC4gVGhpcyB3aWxsIGJlIHVzZWQgZm9yIGNhbGN1bGF0aW9ucyBpbnN0ZWFkIG9mIGV4dHJhY3RpbmcgaXQgdmlhIGpRdWVyeSBjYWxscy5cbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5SXRlbVdpZHRoID0gMTgwO1xuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlUaXRsZVdpZHRoID0gJHN1YmNhdGVnb3J5VGl0bGUub3V0ZXJXaWR0aCgpO1xuICAgICAgICB2YXIgdG90YWxHcmlkSXRlbXMgPSAkc3ViY2F0ZWdvcnkubGVuZ3RoICsgMTtcbiAgICAgICAgLy8gU3RhcnQgY29sdW1uIGNvdW50IGFzIGxvd2VzdCBwb3NzaWJsZS5cbiAgICAgICAgdmFyIGNvbHVtbkNvdW50ID0gMjtcbiAgICAgICAgLy8gU2V0IHN1YmNhdGVnb3J5IHJvdyBpdGVtcyB0byBsb3dlc3QgdGhhdCBzaG91bGQgZGlzcGxheS5cbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgPSBNYXRoLmZsb29yKChzdWJjYXRlZ29yeUV4cGxvcmF0aW9uV2lkdGggLSBzdWJjYXRlZ29yeVRpdGxlV2lkdGgpIC8gc3ViY2F0ZWdvcnlJdGVtV2lkdGgpO1xuXG4gICAgICAgIGlmIChzdWJjYXRlZ29yeUl0ZW1zUGVyUm93IDwgMikge1xuICAgICAgICAgIC8vIFRoZSBtaW5pbXVtIHN1YmNhdGVnb3J5IGl0ZW1zIHBlciByb3cgc2hvdWxkIGJlIHR3by4gSWYgdGhlIHZhcmlhYmxlIGNvbXB1dGVkIHRvIGxlc3MsIG1hbnVhbGx5IGNvcnJlY3QgaXQuXG4gICAgICAgICAgc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyA9IDI7XG4gICAgICAgICAgdG90YWxHcmlkSXRlbXMgPSB0b3RhbEdyaWRJdGVtcyAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sdW1uQ291bnQgPSBzdWJjYXRlZ29yeUl0ZW1zUGVyUm93ICsgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSBpZiBjaGFuZ2VzIGluIGNvbHVtbiBjb3VudCBoYXMgb2NjdXJyZWQgYW5kIGFjdCBhY2NvcmRpbmdseVxuICAgICAgICBpZiAoc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbkNvbHVtbnMgIT09IGNvbHVtbkNvdW50KSB7XG4gICAgICAgICAgLy8gRGV0ZXJtaW5lIGFkZGl0aW9uYWwgXCJmaWxsZXItYm94XCIgbmVlZGVkIHRvIGNyZWF0ZSBjb21wbGV0ZSByb3dcbiAgICAgICAgICB2YXIgZmlsbGVyQm94Q291bnQgPSBjb2x1bW5Db3VudCAtICh0b3RhbEdyaWRJdGVtcyAlIGNvbHVtbkNvdW50KTtcbiAgICAgICAgICBmaWxsR3JpZFJvdygkc3ViY2F0ZWdvcnlDb250YWluZXIsIGZpbGxlckJveENvdW50KTtcbiAgICAgICAgICAvLyBVcGRhdGUgcGVyc2lzdGVudCBjb2x1bW4gY291bnRcbiAgICAgICAgICBzdWJjYXRlZ29yeUV4cGxvcmF0aW9uQ29sdW1ucyA9IGNvbHVtbkNvdW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIHZpZXdhYmxlIHN1YmNhdGVnb3JpZXMuXG4gICAgICAgICRzdWJjYXRlZ29yeS5oaWRlKCk7XG4gICAgICAgICRzdWJjYXRlZ29yeS5zbGljZSgwLCBzdWJjYXRlZ29yeUl0ZW1zUGVyUm93KS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG5cbiAgICAgICAgdmlld01vcmUoKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdmlld01vcmUoKSB7XG4gICAgICAgIHZhciAkdmlld0xlc3MgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdmlldy1sZXNzJyk7XG4gICAgICAgIHZhciAkdmlld01vcmUgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdmlldy1hbGwnKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zdWJjYXRlZ29yeScpO1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5Q29udGFpbmVyID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX2NvbnRhaW5lcicpO1xuXG4gICAgICAgICR2aWV3TGVzcy5oaWRlKCk7XG4gICAgICAgICR2aWV3TW9yZS5zaG93KCk7XG5cbiAgICAgICAgJCgnLnZpZXdBbGwnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnkuZmFkZUluKCk7XG4gICAgICAgICAgJHZpZXdNb3JlLmhpZGUoKTtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnlDb250YWluZXIuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgJHZpZXdMZXNzLnNob3coKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcudmlld0xlc3MnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnkuaGlkZSgpO1xuICAgICAgICAgIGNoZWNrU2l6ZSgpO1xuICAgICAgICAgICR2aWV3TGVzcy5oaWRlKCk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICR2aWV3TW9yZS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG5cbiAgICAgIGZ1bmN0aW9uIGZpbGxHcmlkUm93KCRjb250YWluZXIsIGNvdW50KSB7XG4gICAgICAgIHZhciBmaWxsZXJCb3ggPSAnPGRpdiBjbGFzcz1cImZpbGxlci1ib3hcIj48L2Rpdj4nO1xuICAgICAgICAvLyBjbGVhciBvdXQgY3VycmVudCBmaWxsZXIgYm94ZXNcbiAgICAgICAgdmFyICRmaWxsZXJCb3hlcyA9ICRjb250YWluZXIuZmluZCgnLmZpbGxlci1ib3gnKTtcbiAgICAgICAgJGZpbGxlckJveGVzLnJlbW92ZSgpO1xuICAgICAgICAvLyBmaWxsIG91dCBncmlkIHJvd1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAkY29udGFpbmVyLmFwcGVuZChmaWxsZXJCb3gpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJ1biB0ZXN0IG9uIGluaXRpYWwgcGFnZSBsb2FkXG4gICAgICBjaGVja1NpemUoKTtcblxuICAgICAgLy8gcnVuIHRlc3Qgb24gcmVzaXplIG9mIHRoZSB3aW5kb3dcbiAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGVja1NpemUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qPT09PT09IGpRdWVyeSBVSSB0YWJzID09PT09PSovXG5cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfdGFicyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgdmFyIGRlZmF1bHRBY3RpdmVUYWIgPSAwO1xuICAgICAgdmFyIHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGlmICh2aWV3cG9ydFdpZHRoID49IDYwMCAmJiAkKCcuYW1hX19yZXNvdXJjZS10YWJzJykubGVuZ3RoID4gMCkge1xuICAgICAgICBkZWZhdWx0QWN0aXZlVGFiID0gMTtcbiAgICAgIH1cblxuICAgICAgJChcIi5hbWFfX3RhYnMsIC5hbWFfX3Jlc291cmNlLXRhYnNcIikudGFicyh7XG4gICAgICAgIGFjdGl2ZTogZGVmYXVsdEFjdGl2ZVRhYixcbiAgICAgICAgYWN0aXZhdGU6IHJlbW92ZUhpZ2hsaWdodHNcbiAgICAgIH0pO1xuXG4gICAgICAvLyBQcmV2ZW50IGp1bXAgb25jbGlja1xuICAgICAgJCgnLnVpLXRhYnMtYW5jaG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuXG4gICAgICAvL1NpbXVsYXRlIGNsaWNrIGV2ZW50IG9uIGFjdHVhbCBzaW1wbGVUYWJzIHRhYiBmcm9tIG1vYmlsZSBkcm9wIGRvd24uXG4gICAgICAkKCcuYW1hX190YWJzLW5hdmlnYXRpb24tLW1vYmlsZSBzZWxlY3QnKS5vbihcInNlbGVjdG1lbnVjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9IHVpLml0ZW0udmFsdWU7XG4gICAgICAgICQoJ2FbaHJlZj1cIiMnICsgc2VsZWN0ZWRWYWx1ZSArICdcIl0nKS5jbGljaygpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFdoZW4gY2xpY2tpbmcgYW4gaW5saW5lIHJlc291cmNlIHBhZ2UgbGluayByZWZlcmVuY2luZyBhIHRhYiwgb3BlbiByZWZlcmVuY2VkIHRhYi5cbiAgICAgICQoJy5hbWFfX3Jlc291cmNlLWxpbmstLWlubGluZSwgLmFtYV9fcGFnZS0tcmVzb3VyY2VfX3Jlc291cmNlLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgJHRhYnMgPSAkKCcuYW1hX19yZXNvdXJjZS10YWJzJyk7XG4gICAgICAgIHN3aXRjaFRhYnMoJHRhYnMsIHRoaXMpO1xuICAgICAgICAvLyBTdG9wIGJ1YmJsaW5nIGFuZCBkZWZhdWx0IGFjdGlvbnNcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZUhpZ2hsaWdodHMoKSB7XG4gICAgICAgICQoJy5hbWFfcmVzb3VyY2UtaGVhZGVyLS1oaWdobGlnaHQnKS5yZW1vdmVDbGFzcygnYW1hX3Jlc291cmNlLWhlYWRlci0taGlnaGxpZ2h0Jyk7XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgKiBUaGlzIGZ1bmN0aW9uIGFuaW1hdGVzIHRoZSBicm93c2VyIHNjcm9sbCBhY3Rpb24gd2l0aCBhdHRlbnRpb24gdG8ga2V5Ym9hcmQgb25seSBhY2Nlc3NpYmlsaXR5IGNvbmNlcm5zXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFiTmF2XG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICR0YXJnZXRcbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKCR0YWJOYXYsIHRhYkhhc2gsIHBvc2l0aW9uSW5UYWIpIHtcbiAgICAgICAgdmFyIHNjcm9sbFRhcmdldCA9IHdpbmRvdy5pbm5lcldpZHRoID49IDEyMDAgPyAnLmFtYV9fcmVzb3VyY2UtdGFic19fY29udGVudCcgOiAnaHRtbCxib2R5JztcblxuICAgICAgICAvLyBSZW1vdmUgcHJldmlvdXMgaGlnaGxpZ2h0cywgaWYgYW55XG4gICAgICAgIHJlbW92ZUhpZ2hsaWdodHMoKTtcblxuICAgICAgICAvLyBUcnkgdG8gZmluZCB0YXJnZXQgZWxlbWVudCBvZmZzZXQsIGJ1dCBkZWZhdWx0IHRvIHplcm9cbiAgICAgICAgdmFyIHNjcm9sbFBvc2l0aW9uID0gMDtcbiAgICAgICAgdmFyICR0YXJnZXQ7XG4gICAgICAgIGlmIChwb3NpdGlvbkluVGFiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgdGFiRWxlbWVudHMgPSAkKHRhYkhhc2ggKyAnIC5hbWFfX3Jlc291cmNlLXRhYnNfX2l0ZW0nKTtcbiAgICAgICAgICBpZiAodGFiRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBJZiBkZXNpcmVkIHBvc2l0aW9uIGlzIGxhcmdlciB0aGFuIHRoZSByZXN1bHQgc2V0LCB1c2UgdGhlIGxhc3QgZWxlbWVudFxuICAgICAgICAgICAgaWYgKHRhYkVsZW1lbnRzLmxlbmd0aCA8PSBwb3NpdGlvbkluVGFiKSB7XG4gICAgICAgICAgICAgIHBvc2l0aW9uSW5UYWIgPSB0YWJFbGVtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBVc2VycyBhcmUgaW5zdHJ1Y3RlZCB0byBjb25zaWRlciAxIGFzIHRoZSBmaXJzdCBlbGVtZW50XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGFiRWxlbWVudHNbcG9zaXRpb25JblRhYiAtIDFdO1xuICAgICAgICAgICAgc2Nyb2xsUG9zaXRpb24gPSB0YXJnZXQub2Zmc2V0VG9wO1xuICAgICAgICAgICAgLy8gQWRkIGhpZ2hsaWdodCB0byB0YXJnZXRcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKHRhcmdldCkuZmluZCgnLmFtYV9yZXNvdXJjZS1oZWFkZXInKTsgLy8gc2F2ZSBmb3IgdXNlIGluIGFuaW1hdGUoKSBjYWxsYmFja1xuICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnYW1hX3Jlc291cmNlLWhlYWRlci0taGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICR0YXJnZXQgPSAkKHRhYkhhc2gpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAkKHNjcm9sbFRhcmdldCkuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxQb3NpdGlvblxuICAgICAgICB9LCA4NTAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBVcGRhdGUgZm9jdXMgZm9yIGtleWJvYXJkIG9ubHkgbmF2aWdhdGlvblxuICAgICAgICAgICR0YXJnZXQuYXR0cigndGFiaW5kZXgnLCAnLTEnKS5mb2N1cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9wIGJ1YmJsaW5nIGFuZCBkZWZhdWx0IGFjdGlvbnNcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICogVGhpcyBmdW5jdGlvbiBvcGVucyByZWZlcmVuY2VkIHRhYnMgZnJvbSBpbmxpbmUgbGlua3NcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICR0YWJPYmogVGhlIGVsZW1lbnQgd2hpY2ggaGFzIHRoZSAudGFiKCkgZnVuY3Rpb24gYXR0YWNoZWQuXG4gICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGxpbmtcbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gc3dpdGNoVGFicygkdGFiT2JqLCBsaW5rKSB7XG5cbiAgICAgICAgdmFyIGxpbmtIYXNoID0gbGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICB2YXIgd2lkZ2V0ID0gJHRhYk9iai5kYXRhKCd1aS10YWJzJyk7XG5cbiAgICAgICAgdmFyIHRhYkhhc2gsIHBvc2l0aW9uSW5UYWI7XG4gICAgICAgIHZhciBwYXJ0cyA9IGxpbmtIYXNoLnNwbGl0KCctJyk7XG4gICAgICAgIHRhYkhhc2ggPSBwYXJ0c1swXTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBwb3NpdGlvbkluVGFiID0gcGFydHNbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgb2xkIGxpbmssIHRyeSB0byBkZXRlcm1pbmUgcG9zaXRpb24gZnJvbSBsaW5rIHRleHRcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IGxpbmsuaW5uZXJUZXh0Lm1hdGNoKC8oWzAtOV0rKS9nKTtcbiAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgcG9zaXRpb25JblRhYiA9IG1hdGNoZXMuc2hpZnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbnN1cmUgY29ycmVjdCB0YWIgaXMgYWN0aXZlXG4gICAgICAgIHZhciB0YWJJbmRleCA9IHdpZGdldC5fZ2V0SW5kZXgodGFiSGFzaCk7XG4gICAgICAgICR0YWJPYmoudGFicyh7XG4gICAgICAgICAgYWN0aXZlOiB0YWJJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTY3JvbGwgdG8gdG9wIG9mIHVpIHRhYnMgbmF2aWdhdGlvblxuICAgICAgICBzbW9vdGhTY3JvbGwoJHRhYk9iaiwgdGFiSGFzaCwgcG9zaXRpb25JblRhYik7XG5cbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKj09PT09PSBqUXVlcnkgVUkgYWNjb3JkaW9uID09PT09PSovXG5cbihmdW5jdGlvbigkKSB7XG4gICAgJCggXCIuYW1hX19hY2NvcmRpb25cIiApLmFjY29yZGlvbih7XG4gICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcbiAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICB9KTtcbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICB2YXIgdmVyaWZ5RmllbGRzID0gZnVuY3Rpb24oZm9ybSkge1xuICAgIHZhciAkc2VjdGlvbnMgPSBmb3JtLmZpbmQoJ3NlY3Rpb24nKTtcbiAgICB2YXIgJGlucHV0cyA9ICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBzZWN0aW9uIConKS5maWx0ZXIoJzppbnB1dCcpO1xuICAgIHZhciAkaWNvbkVsZW1lbnQgPSAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJyk7XG4gICAgdmFyIGVycm9yU2VjdGlvbnMgPSBbXTtcblxuICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbihpLCBpbnB1dCkge1xuICAgICAgJGNsb3Nlc3RTZWN0aW9uID0gJCh0aGlzKS5jbG9zZXN0KCdzZWN0aW9uJykuYXR0cignZGF0YS1kcnVwYWwtc2VsZWN0b3InKS50b1N0cmluZygpO1xuICAgICAgaWYgKCQodGhpcykucHJvcCgncmVxdWlyZWQnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdlcnJvcicpKSB7XG4gICAgICAgIGVycm9yU2VjdGlvbnMucHVzaCgkY2xvc2VzdFNlY3Rpb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHNlY3Rpb25zLmVhY2goZnVuY3Rpb24oaSwgc2VjdGlvbikge1xuICAgICAgaWYgKCQuaW5BcnJheSgkKHRoaXMpLmF0dHIoJ2RhdGEtZHJ1cGFsLXNlbGVjdG9yJykudHJpbSgpLnRvU3RyaW5nKCksIGVycm9yU2VjdGlvbnMpICE9PSAtMSkge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJGljb25FbGVtZW50KS5yZW1vdmVDbGFzcygnZWRpdCBlcnJvciBjb21wbGV0ZWQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJGljb25FbGVtZW50KS5yZW1vdmVDbGFzcygnZWRpdCBlcnJvciBjb21wbGV0ZWQnKS5hZGRDbGFzcygnY29tcGxldGVkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbCkge1xuICAgIHZhciBlbWFpbFJlZyA9IC9eKFtcXHctXFwuXStAKFtcXHctXStcXC4pK1tcXHctXXsyLDR9KT8kLztcbiAgICByZXR1cm4gZW1haWxSZWcudGVzdChlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBmaWVsZElzUmVxdWlyZWQoaW5wdXQpIHtcbiAgICBpbnB1dC5hZGRDbGFzcygnZXJyb3InKTtcbiAgICBpbnB1dC5uZXh0KCkucmVtb3ZlKCcuZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlJyk7XG4gICAgaW5wdXQuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJmb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2VcIj5GaWVsZCBpcyByZXF1aXJlZC48L2Rpdj4nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRmllbGQoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQucHJvcCgncmVxdWlyZWQnKSAmJiAoaW5wdXQudmFsKCkubGVuZ3RoID09PSAwIHx8IGlucHV0LnZhbCgpID09PSBcIlwiKSkge1xuICAgICAgZmllbGRJc1JlcXVpcmVkKGlucHV0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoaW5wdXQuYXR0cigndHlwZScpID09PSAnZW1haWwnICYmICF2YWxpZGF0ZUVtYWlsKGlucHV0LnZhbCgpKSkge1xuICAgICAgICBmaWVsZElzUmVxdWlyZWQoaW5wdXQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcicpLm5leHQoKS5yZW1vdmUoJy5mb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTdWJtaXRzIGZpcnN0IHBhZ2Ugb2YgQ29udGFjdCBVcyBmb3JtIG9uIHJhZGlvIGJ1dHRvbiBzZWxlY3Rpb25cbiAgJC5mbi5jb250YWN0U3VibWl0ID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgJHdlYmZvcm1fYnV0dG9ucyA9ICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tY29udGFjdC11cy1mb3JtIGlucHV0W3R5cGU9XCJyYWRpb1wiXScpO1xuICAgICR3ZWJmb3JtX2J1dHRvbnMuYmluZCgnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWNvbnRhY3QtdXMtZm9ybScpLnN1Ym1pdCgpO1xuICAgIH0pO1xuICB9XG4gICQuZm4uY29udGFjdFN1Ym1pdCgpO1xuICAkKCBkb2N1bWVudCApLmFqYXhDb21wbGV0ZShmdW5jdGlvbigpIHtcbiAgICAkLmZuLmNvbnRhY3RTdWJtaXQoKTtcbiAgfSk7XG5cbiAgLy8gR28gYmFjayB0byBwcmV2aW91cyBiYWNrIGlzIHVzZXIgY2xpY2tzIGRlY2xpbmUgc3VibWl0IGJ1dHRvblxuICAkKCcuYW1hX19idXR0b24tLWRlY2xpbmUnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKGRvY3VtZW50LnJlZmVycmVyID09PSBcIlwiKSB7XG4gICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmPScvJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoaXN0b3J5LmJhY2soKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBpbml0aWFsTG9hZCA9IHRydWU7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy53ZWJGb3JtID0ge1xuICAgIGRldGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzLCB0cmlnZ2VyKSB7XG4gICAgICBpZiAodHJpZ2dlciA9PT0gJ3NlcmlhbGl6ZScpIHtcbiAgICAgICAgaW5pdGlhbExvYWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICBpZiAoIWluaXRpYWxMb2FkKSB7XG4gICAgICAgIGlmICghY29udGV4dC5pbm5lclRleHQubWF0Y2goXCJFcnJvciBtZXNzYWdlXCIpKSB7XG4gICAgICAgICAgJCgnLmFtYV9fc2FsZXMtbGFuZGluZy1wYWdlX19mb3JtX19oZWFkaW5nJykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICQudmFsaWRhdG9yLmFkZE1ldGhvZChcbiAgICAgICAgXCJyZWdleFwiLFxuICAgICAgICBmdW5jdGlvbih2YWx1ZSwgZWxlbWVudCwgcmVnZXhwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHwgcmVnZXhwLnRlc3QodmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBcIlBsZWFzZSBjaGVjayB5b3VyIGlucHV0LlwiXG4gICAgICApO1xuXG4gICAgICAvLyBPbiB3ZWJmb3JtIHN1Ym1pdCBjaGVjayB0byBzZWUgaWYgYWxsIGlucHV0cyBhcmUgdmFsaWRcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybScpLnZhbGlkYXRlKHtcbiAgICAgICAgaWdub3JlOiBbXSxcbiAgICAgICAgcnVsZXM6IHtcbiAgICAgICAgICAnZW1haWwnOiB7XG4gICAgICAgICAgICBlbWFpbDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ3RlbGVwaG9uZSc6IHtcbiAgICAgICAgICAgICdyZWdleCc6IC9eKFxcK1xcZHsxLDJ9XFxzKT9cXCg/XFxkezN9XFwpP1tcXHMuLV0/XFxkezN9W1xccy4tXT9cXGR7NH0kL1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2JpcnRoX3llYXInOiB7XG4gICAgICAgICAgICAncmVnZXgnOiAvXigxOXwyMClcXGR7Mn0kL1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uKGVycm9yLCBlbGVtZW50KSB7XG4gICAgICAgICAgaWYgKGVsZW1lbnQuYXR0cihcInR5cGVcIikgPT09IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudC5wYXJlbnQoKS5zaWJsaW5ncygpLmxhc3QoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnQuaXMoXCJzZWxlY3RcIikpIHtcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQubmV4dCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWRIYW5kbGVyOiBmdW5jdGlvbihmb3JtLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgICB2YXIgZXJyb3JzID0gdmFsaWRhdG9yLm51bWJlck9mSW52YWxpZHMoKTtcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoJCgnLmpzLWZvcm0tdHlwZS1yYWRpbycpLmZpbmQoJ2xhYmVsLmVycm9yJykubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAkKCcuanMtZm9ybS10eXBlLXJhZGlvIGxhYmVsLmVycm9yJykucGFyZW50cygnLmZpZWxkc2V0LXdyYXBwZXInKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBDaGVjayB0byBzZWUgaWYgaW5wdXRzIGFyZSB2YWxpZFxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gbGFiZWwuZXJyb3InKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKCAkKHRoaXMpLnRleHQoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBBZGQgdmFsaWRhdGlvbiB0byBzZWxlY3QgZHJvcGRvd24gbWVudXMgdXNpbmcgalF1ZXJ5IFVJXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gc2VsZWN0Jykuc2VsZWN0bWVudSh7XG4gICAgICAgIHN0eWxlOiAnZHJvcGRvd24nLFxuICAgICAgICB0cmFuc2ZlckNsYXNzZXM6IHRydWUsXG4gICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQoXCIud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm1cIikudmFsaWRhdGUoKS5lbGVtZW50KHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX21haW5OYXZpZ2F0aW9uID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciAkY2F0ZWdvcnlOYXZXcmFwcGVyID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX3dyYXBwZXInKSxcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudSA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51JyksXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cCA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19ncm91cCcpLFxuICAgICAgICAgICRtb2JpbGVTZWFyY2hUcmlnZ2VyID0gJCgnLmdsb2JhbC1zZWFyY2gtdHJpZ2dlcicpLFxuICAgICAgICAgICRtb2JpbGVTZWFyY2ggPSAkKCcuYW1hX19nbG9iYWwtc2VhcmNoJyksXG4gICAgICAgICAgJG1haW5OYXYgPSAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gJyksXG4gICAgICAgICAgJHN1Yk1lbnUgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fc3VibWVudScpLFxuICAgICAgICAgICRzdWJNZW51QXJ0aWNsZSA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19hcnRpY2xlcycpLFxuICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0ID0gMCxcbiAgICAgICAgICBwcm9kdWN0TmF2SGVpZ2h0ID0gMCxcbiAgICAgICAgICBjYXRlZ29yeU5hdk1lbnVIZWlnaHQgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudScpLm91dGVySGVpZ2h0KCksXG4gICAgICAgICAgY2F0ZWdvcnlOYXZNZW51UmVzaXplZEhlaWdodCA9IDAsXG4gICAgICAgICAgd2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKSxcbiAgICAgICAgICAkYWxlcnRfYmFubmVyID0gJCgnLmFtYV9fYWxlcnRfX3dyYXAnKTtcblxuICAgICAgLy8gQ2hlY2tzIGlmIHVzZXIgYWdlbnQgaXMgYSBtb2JpbGUgZGV2aWNlXG4gICAgICB2YXIgZGV2aWNlQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICB2YXIgYWdlbnRJRCA9IGRldmljZUFnZW50Lm1hdGNoKC8oYW5kcm9pZHx3ZWJvc3xpcGhvbmV8aXBvZHxibGFja2JlcnJ5KS8pICYmIHdpbmRvd1dpZHRoIDwgNzY4O1xuXG4gICAgICAvLyBTZXQgYWxlcnQgYmFubmVyIGhlaWdodCBpZiBwcmVzZW50LlxuICAgICAgaWYoJGFsZXJ0X2Jhbm5lci5sZW5ndGggJiYgJGFsZXJ0X2Jhbm5lci5pcygnOnZpc2libGUnKSkge1xuICAgICAgICBhbGVydEJhbm5lckhlaWdodCA9ICRhbGVydF9iYW5uZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0QmFubmVySGVpZ2h0ID0gMDtcbiAgICAgIH1cblxuICAgICAgICAvLyBDYWxjdWxhdGUgd2hldGhlciBvciBub3QgdGhlIGNhdGVnb3J5IG5hdiBzaG91bGQgaGF2ZSBzY3JvbGxiYXJzXG4gICAgICBmdW5jdGlvbiBjYXRlZ29yeU5hdkhlaWdodChyZXNpemVWaWV3cG9ydEhlaWdodCkge1xuXG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB2aWV3cG9ydCBoZWlnaHQgaXMgcGFzc2VkIGJhY2sgd2hlbiB0aGUgd2luZG93IGdldHMgcmVzaXplZFxuICAgICAgICBpZih0eXBlb2YgcmVzaXplVmlld3BvcnRIZWlnaHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSByZXNpemVWaWV3cG9ydEhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBXaW5kb3cgaGVpZ2h0IGlzIHVzZWQgYnkgZGVmYXVsdFxuICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3VidHJhY3QgdGhlIG5hdmlnYXRpb24gaGVpZ2h0IGZyb20gd2luZG93IGhlaWdodCB0byBhc3Nlc3MgY29udGVudCBoZWlnaHRcbiAgICAgICAgY2F0ZWdvcnlOYXZNZW51UmVzaXplZEhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgbWFpbiBtZW51IHB1cnBsZSBkcm9wZG93biBoZWlnaHQgaXMgbGFyZ2VyIHRoYW4gdmlld3BvcnQgaGVpZ2h0XG4gICAgICAgIGlmIChjYXRlZ29yeU5hdk1lbnVIZWlnaHQgKyAkbWFpbk5hdi5vdXRlckhlaWdodCgpICsgcHJvZHVjdE5hdkhlaWdodCA+IHZpZXdwb3J0SGVpZ2h0ICYmICFhZ2VudElEKSB7XG5cbiAgICAgICAgICAvLyBTZXQgdGhlIG1lbnUgZHJvcGRvd24gdGhlIHNhbWUgYXMgdmlld3BvcnQgdG8gZW5hYmxlIHNjcm9sbGluZ1xuICAgICAgICAgIHZhciBjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkID0gY2F0ZWdvcnlOYXZNZW51UmVzaXplZEhlaWdodCAtICRtYWluTmF2Lm91dGVySGVpZ2h0KCkgLSBwcm9kdWN0TmF2SGVpZ2h0IC0gYWxlcnRCYW5uZXJIZWlnaHQ7XG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cC5hZGRDbGFzcygnc2Nyb2xsJykub3V0ZXJIZWlnaHQoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCk7XG5cbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLm9uKCdzaG93LnNtYXBpJywgZnVuY3Rpb24oZSwgbWVudSkge1xuICAgICAgICAgICAgaWYoJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnLCBtZW51KS5vdXRlckhlaWdodCgpID4gY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCkge1xuICAgICAgICAgICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fc3VibWVudScsIG1lbnUpLm91dGVySGVpZ2h0KGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZigkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnLCBtZW51KS5vdXRlckhlaWdodCgpID4gY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCkge1xuICAgICAgICAgICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnLCBtZW51KS5vdXRlckhlaWdodChjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKS5hZGRDbGFzcygnb25lX2FydGljbGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLnJlbW92ZUNsYXNzKCdzY3JvbGwnKS5vdXRlckhlaWdodCgnYXV0bycpO1xuICAgICAgICAgICRzdWJNZW51Lm91dGVySGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgJHN1Yk1lbnVBcnRpY2xlLm91dGVySGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICAvLyBIaWRlL1Nob3cgbWVudVxuICAgICAgZnVuY3Rpb24gaGlkZVNob3coKSB7XG4gICAgICAgIGlmICgkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZURvd24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoKGNhdGVnb3J5TmF2TWVudUhlaWdodCArICRtYWluTmF2Lm91dGVySGVpZ2h0KCkgKyBwcm9kdWN0TmF2SGVpZ2h0ICsgYWxlcnRCYW5uZXJIZWlnaHQpID4gdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0ICsgJG1haW5OYXYub3V0ZXJIZWlnaHQoKSArIHByb2R1Y3ROYXZIZWlnaHQgKyBhbGVydEJhbm5lckhlaWdodCkgPiB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzY3JvbGwnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXgtaGVpZ2h0JzogKHZpZXdwb3J0SGVpZ2h0IC0gJG1haW5OYXYub3V0ZXJIZWlnaHQoKSAtIHByb2R1Y3ROYXZIZWlnaHQgLSBhbGVydEJhbm5lckhlaWdodCkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnYXV0bydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzY3JvbGwnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXgtaGVpZ2h0JzogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb3ZlcmZsb3cteSc6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhZ2VudElEKSB7XG4gICAgICAgICAgICAgIC8vIE9ubHkgbWFrZSB0aGUgbWVudSBoZWlnaHQgc2FtZSBhcyB2aWV3cG9ydCBvbiBtb2JpbGUgZGV2aWNlc1xuICAgICAgICAgICAgICB2YXIgbW9iaWxlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICAgICAgICAkY2F0ZWdvcnlOYXZXcmFwcGVyLmhlaWdodChtb2JpbGVIZWlnaHQpLmFkZENsYXNzKCdzY3JvbGwnKTtcblxuICAgICAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLm9uKCdzaG93LnNtYXBpJywgZnVuY3Rpb24oZSwgbWVudSkge1xuICAgICAgICAgICAgICAgIGlmKCQobWVudSkub3V0ZXJIZWlnaHQoKSA+IG1vYmlsZUhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgJChtZW51KS5vdXRlckhlaWdodChtb2JpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgICAgIGNhdGVnb3J5TmF2SGVpZ2h0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuc2xpZGVVcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhlaWdodCgwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDbG9zZXMgbWVudSBvbiBkb2MgbG9hZFxuICAgICAgJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlR2xvYmFsTWVudUFjdGl2YXRlKGUpIHtcbiAgICAgICAgLy8gRm9yIGtleWRvd24sIG9ubHkgYWN0IG9uIEVudGVyIG9yIFNwYWNlXG4gICAgICAgIGlmIChlLnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgICAgIGlmICghKGUua2V5ID09PSAnRW50ZXInIHx8IGUua2V5ID09PSAnICcgfHwgZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdmFyICRjaGVja2JveCA9ICQoJyNnbG9iYWwtbWVudScpO1xuICAgICAgICAgICRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgISRjaGVja2JveC5wcm9wKCdjaGVja2VkJykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZvciBjbGljaywganVzdCB0b2dnbGUgaWYgbm90IGFscmVhZHkgaGFuZGxlZFxuICAgICAgICBpZiAoZS50eXBlID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgdmFyICRjaGVja2JveCA9ICQoJyNnbG9iYWwtbWVudScpO1xuICAgICAgICAgICRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgISRjaGVja2JveC5wcm9wKCdjaGVja2VkJykpO1xuICAgICAgICB9XG4gICAgICAgIGhpZGVTaG93KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgICQoJy5hbWFfX2dsb2JhbC1tZW51Jykub24oJ2NsaWNrIGtleWRvd24nLCBoYW5kbGVHbG9iYWxNZW51QWN0aXZhdGUpO1xuXG4gICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fZ3JvdXAgPiAuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fc2VjdGlvbiA+IGEnKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgRXNjYXBlIGlzIHByZXNzZWQgYW5kIGZvY3VzIGlzIG9uIHRoZSB1bCBpdHNlbGZcbiAgICAgICAgaWYgKChlLmtleSA9PT0gJ0VzY2FwZScgfHwgZS5rZXlDb2RlID09PSAyNykgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcykge1xuICAgICAgICAgICQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgaGlkZVNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQ2xlYXIgc2VhcmNoIGlucHV0IG9uIG1haW4gbmF2IG9uIHNlYXJjaCBwYWdlXG4gICAgICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwiL3NlYXJjaFwiKSkge1xuICAgICAgICAgIHZhciAkc2VhcmNoSW5wdXQgPSAkKFwiZm9ybVtpZD0nYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNoLXNvbHJwYWdlJ11cIikuZmluZChcImlucHV0W25hbWU9J3NlYXJjaCddXCIpO1xuICAgICAgICAgIGlmKCRzZWFyY2hJbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICRzZWFyY2hJbnB1dC52YWwoJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIHN0aWNreSBuYXYgd3JhcHBlciwgcmVtb3ZlIGlkIHRvIHByZXZlbnQgZHVwbGljYXRlIGlkcy5cbiAgICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3RpY2t5V3JhcHBlciA9ICQoJ2hlYWRlci5zdGlja3ktbmF2Jyk7XG4gICAgICAgIGlmKCRzdGlja3lXcmFwcGVyLmxlbmd0aCAmJiAkc3RpY2t5V3JhcHBlci5oYXMoJyNzaGFyZS13cmFwcGVyJykpIHtcbiAgICAgICAgICAkc3RpY2t5V3JhcHBlci5yZW1vdmVBdHRyKCdpZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgYSB1c2VyIGNsaWNrcyBvdXRzaWRlIHRoZSBtZW51IHRoZW4gY2xvc2UgaXRcbiAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICghJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuaXMoZS50YXJnZXQpICYmICRjYXRlZ29yeU5hdmlnYXRpb25NZW51LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICBoaWRlU2hvdygpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJCgkbW9iaWxlU2VhcmNoVHJpZ2dlcikudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJG1vYmlsZVNlYXJjaC5zbGlkZVRvZ2dsZShcImZhc3RcIiwgXCJsaW5lYXJcIik7XG4gICAgICAgICRtb2JpbGVTZWFyY2hUcmlnZ2VyLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICQoJyNlZGl0LXNlYXJjaCcpLmZvY3VzKCk7XG4gICAgICB9KTtcblxuICAgICAgLy9TZXQgZm9jdXMgc3RhdGUgb24gbW9iaWxlIHRyaWdnZXIgYnV0dG9uXG4gICAgICAkKCRtb2JpbGVTZWFyY2hUcmlnZ2VyKS5mb2N1cyhmdW5jdGlvbigpe1xuICAgICAgICAkbW9iaWxlU2VhcmNoVHJpZ2dlci5jc3MoJ291dGxpbmUnLCAnb3V0bGluZTogMnB4IHNvbGlkICM4MGQ0ZjUnKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBtb3ZlU29jaWFsU2hhcmVQb3NpdGlvbigpe1xuICAgICAgICB2YXIgbWFpbk5hdlBvc2l0aW9uID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uIC5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICB2YXIgZml4ZWRDbGFzcyA9ICdhbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnO1xuICAgICAgICB2YXIgJGFtYVNvY2lhbFNoYXJlID0gJCgnLmFtYV9fc29jaWFsLXNoYXJlJyk7XG4gICAgICAgIHZhciAkYW1hU2hhcmVDb250YWluZXIgPSAkKFwiLmFtYV9fY2F0ZWdvcnkgLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX2NvbnRhaW5lciwgLmFtYV9fc3ViY2F0ZWdvcnktaW5kZXggLnNoYXJlLXJvd1wiKTtcblxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdmlld3BvcnQgd2lkdGggaXMgZ3JlYXRlciB0aGFuIDg1MHB4LlxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA4NTApIHtcbiAgICAgICAgICAvLyBDaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGVub3VnaCBmb3IgdGhlIHN0aWNreSBuYXZcbiAgICAgICAgICBpZihtYWluTmF2UG9zaXRpb24gPiA2MCkge1xuXG4gICAgICAgICAgICB2YXIgc29jaWFsU3RpY2t5UG9zaXRpb24gPSBtYWluTmF2UG9zaXRpb24gLSA2MDtcbiAgICAgICAgICAgIHZhciAkc29jaWFsSWNvbnMgPSAkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUnKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHZpZXdwb3J0IHdpZHRoIGlzIGdyZWF0ZXIgODUwcHggdGhlbiB0aGUgc29jaWFsIGljb25zIHdpbGwgYmUgc3RpY2t5XG4gICAgICAgICAgICBpZigkc29jaWFsSWNvbnMubGVuZ3RoICYmICQod2luZG93KS53aWR0aCgpID4gODUwKSB7XG4gICAgICAgICAgICAgICRzb2NpYWxJY29ucy5zdGlja3koe1xuICAgICAgICAgICAgICAgIHdyYXBwZXJDbGFzc05hbWU6ICdhbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZS13cmFwcGVyJyxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDUwMFxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAkc29jaWFsSWNvbnMub24oJ3N0aWNreS1zdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkYW1hU2hhcmVDb250YWluZXIuY3NzKCd2aXNpYmlsaXR5JywndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICRhbWFTb2NpYWxTaGFyZS5hZGRDbGFzcyhmaXhlZENsYXNzKS5jc3MoJ2xlZnQnLCBzb2NpYWxTdGlja3lQb3NpdGlvbikuaGlkZSgpLmZhZGVUbygnc2xvdycsIDEpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAkc29jaWFsSWNvbnMub24oJ3N0aWNreS11cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJGFtYVNvY2lhbFNoYXJlLmFkZENsYXNzKGZpeGVkQ2xhc3MpLmhpZGUoKS5mYWRlVG8oJ3Nsb3cnLCAxKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgJHNvY2lhbEljb25zLm9uKCdzdGlja3ktZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRhbWFTaGFyZUNvbnRhaW5lci5jc3MoJ3Zpc2liaWxpdHknLCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAkKCcuYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJykucmVtb3ZlQ2xhc3MoZml4ZWRDbGFzcyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBFbnN1cmUgdmlzaWJpbGl0eSBpcyBoaWRkZW4gb24gbW9iaWxlLlxuICAgICAgICAgICRhbWFTaGFyZUNvbnRhaW5lci5jc3MoJ3Zpc2liaWxpdHknLCdoaWRkZW4nKTtcbiAgICAgICAgICAkYW1hU29jaWFsU2hhcmUucmVtb3ZlQ2xhc3MoZml4ZWRDbGFzcykuY3NzKCdsZWZ0JywgJycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEluaXRpYWxpemUgZ2V0U29jaWFsU2hhcmUoKVxuICAgICAgbW92ZVNvY2lhbFNoYXJlUG9zaXRpb24oKTtcblxuICAgICAgLy8gT25zY3JvbGwgY2hlY2sgdG8gc2VlIGlmIHNvY2lhbCBpY29uIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhhbiBmb290ZXIgcG9zaXRpb25cbiAgICAgIHZhciBkZWJvdW5jZV90aW1lcjtcbiAgICAgIGlmKCQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZSAuYW1hX19zb2NpYWwtc2hhcmUnKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciAkc29jaWFsSWNvbnMgPSAkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUgLmFtYV9fc29jaWFsLXNoYXJlJyk7XG4gICAgICAgICAgdmFyIHNvY2lhbEljb25Qb3NpdGlvbkJvdHRvbSA9ICRzb2NpYWxJY29ucy5vZmZzZXQoKS50b3AgKyAkc29jaWFsSWNvbnMub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICB2YXIgZm9vdGVyUG9zaXRpb24gPSAkKCdmb290ZXInKS5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICBpZihkZWJvdW5jZV90aW1lcikge1xuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChkZWJvdW5jZV90aW1lcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGVib3VuY2VfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKHNvY2lhbEljb25Qb3NpdGlvbkJvdHRvbSA+IGZvb3RlclBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZScpLmZhZGVPdXQoJ2Zhc3QnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZScpLmZhZGVJbignZmFzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlc2l6ZVZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICBjYXRlZ29yeU5hdkhlaWdodChyZXNpemVWaWV3cG9ydEhlaWdodCk7XG4gICAgICB9KTtcblxuICAgICAgLy9DaGVja3MgdGhlIGxheW91dCBwb3NpdGlvbiBvZiBhcnRpY2xlIG9uIHdpbmRvdyByZXNpemUgYW5kIG1vdmVzIHRoZSBzb2NpYWwgaWNvbnMgYWNjb3JkaW5nbHlcbiAgICAgICQoIHdpbmRvdyApLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFhZ2VudElEKSB7XG4gICAgICAgICAgdmFyIHJlc2l6ZVZpZXdwb3J0SGVpZ2h0ID0gJCh3aW5kb3cpLmlubmVySGVpZ2h0KCk7XG4gICAgICAgICAgdmFyIG1haW5OYXZQb3NpdGlvblVwZGF0ZSA9ICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAuY29udGFpbmVyJykub2Zmc2V0KCkubGVmdCAtIDEwMDtcblxuICAgICAgICAgIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KTtcbiAgICAgICAgICAkKCcuYW1hX19zb2NpYWwtc2hhcmUuYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJykuY3NzKCdsZWZ0JywgbWFpbk5hdlBvc2l0aW9uVXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vSWYgZW1wdHkgb3Igb3RoZXJ3aXNlIHVucG9wdWxhdGVkIHNlYXJjaCBmaWVsZCAoaS5lIHNwYWNlcyBvbmx5KVxuICAgICAgLy9wcmV2ZW50IHNlYXJjaCBmcm9tIHN1Ym1pdHRpbmcgYW5kIHJlbG9hZCBjdXJyZW50IHBhZ2VcbiAgICAgIHZhciBzZWFyY2hGb3JtID0gJChcImZvcm1baWRePSdibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2gtc29scnBhZ2UnXVwiKTtcblxuICAgICAgJChzZWFyY2hGb3JtLCB0aGlzKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciBzZWFyY2hJbnB1dCA9ICQodGhpcykuZmluZChcImlucHV0W25hbWUqPSdzZWFyY2gnXVwiKTtcblxuICAgICAgICAgIC8vVHJpbSBhbmQgY2hlY2sgaWYgc2VhcmNoIGlucHV0IGhhcyBhbnkgdmFsdWVcbiAgICAgICAgICBpZiAoJC50cmltKHNlYXJjaElucHV0LnZhbCgpKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gc2VhcmNoIHRlcm0gZW50ZXJlZCcpO1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy9FbnN1cmUgbm8gc3BhY2VzIGJlZm9yZSBvciBhZnRlciBxdWVyeSBhcmUgY291bnRlZCBpbiBzZWFyY2hcbiAgICAgICAgICAkKHRoaXMpLmZpbmQoc2VhcmNoSW5wdXQpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vU3VibWl0IHRyaW1tZWQgdmFsdWVcbiAgICAgICAgICAgICQodGhpcykudmFsKCQudHJpbSgkKHRoaXMpLnZhbCgpKSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcblxuXG5cbiIsIi8qKlxuICogU21hcnRNZW51cyBqUXVlcnkgUGx1Z2luIC0gdjEuMS4wIC0gU2VwdGVtYmVyIDE3LCAyMDE3XG4gKiBodHRwOi8vd3d3LnNtYXJ0bWVudXMub3JnL1xuICpcbiAqIENvcHlyaWdodCBWYXNpbCBEaW5rb3YsIFZhZGlrb20gV2ViIEx0ZC5cbiAqIGh0dHA6Ly92YWRpa29tLmNvbVxuICpcbiAqIExpY2Vuc2VkIE1JVFxuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsLCBvbmNlKSB7XG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5jYXRlZ29yeU1lbnVCZWhhdmlvciA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIG9uY2UoJ2NhdGVnb3J5TWVudUJlaGF2aW9yJywgJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19ncm91cCcsIGNvbnRleHQpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnNtYXJ0bWVudXMoe1xuICAgICAgICAgICAgICAgICAgICBzdWJJbmRpY2F0b3JzUG9zOiAnYXBwZW5kJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwsIG9uY2UpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogQXR0YWNoZXMgYmVoYXZpb3IgdG8gaW50ZXJhY3Qgd2l0aCB1c2VyIHNpZ24gaW4gbWVudVxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIERydXBhbC5iZWhhdmlvcnMuYW1hU2lnbkluTWVudSA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0ICRkcm9wZG93bkJsb2NrID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bicpO1xuICAgICAgICAgICAgY29uc3QgJGRyb3Bkb3duVHJpZ2dlciA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX3RyaWdnZXInKTtcbiAgICAgICAgICAgIGNvbnN0ICRkcm9wZG93bk1lbnUgPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duX19tZW51Jyk7XG4gICAgICAgICAgICBjb25zdCAkc2lnbkluTGluayA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX3RyaWdnZXJfX3RleHQnKTtcbiAgICAgICAgICAgIGxldCBpc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXR1cERyb3BEb3duKGRyb3Bkb3duQmxvY2ssIHRyaWdnZXJFbGVtZW50LCBtZW51RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duQmxvY2sub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Ryb3Bkb3duT3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VNZW51KHRyaWdnZXJFbGVtZW50LCBtZW51RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuTWVudSh0cmlnZ2VyRWxlbWVudCwgbWVudUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlzRHJvcGRvd25PcGVuID0gIWlzRHJvcGRvd25PcGVuO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHNpZ25Jbkxpbmsub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duQmxvY2sub24oJ2ZvY3Vzb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISRkcm9wZG93bkJsb2NrLmhhcyhldmVudC5yZWxhdGVkVGFyZ2V0KS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlTWVudSgkZHJvcGRvd25UcmlnZ2VyLCAkZHJvcGRvd25NZW51KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkcm9wZG93bkJsb2NrLmlzKGUudGFyZ2V0KSAmJiBkcm9wZG93bkJsb2NrLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU1lbnUodHJpZ2dlckVsZW1lbnQsIG1lbnVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGRyb3Bkb3duQmxvY2sub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChkcm9wZG93bkJsb2NrLnRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgfSkub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duQmxvY2sudGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU1lbnUodHJpZ2dlckVsZW1lbnQsIG1lbnVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbWVudUVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkKGUudGFyZ2V0KS5pcygnYScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9wZW5NZW51KHBhcmVudEVsZW1lbnQsIG1lbnVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgIG1lbnVFbGVtZW50LnNob3coKS5hZGRDbGFzcygnYW1hX19zaWduLWluLWRyb3Bkb3duX19tZW51LS1vcGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsb3NlTWVudShwYXJlbnRFbGVtZW50LCBtZW51RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICggQ29va2llcy5nZXQoJ3NpZ25JbkN0YScpICE9PSAnMScgKSBDb29raWVzLnNldCgnc2lnbkluQ3RhJywgJzEnKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgbWVudUVsZW1lbnQuaGlkZSgpLnJlbW92ZUNsYXNzKCdhbWFfX3NpZ24taW4tZHJvcGRvd25fX21lbnUtLW9wZW4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0dXBEcm9wRG93bigkZHJvcGRvd25CbG9jaywgJGRyb3Bkb3duVHJpZ2dlciwgJGRyb3Bkb3duTWVudSk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuXG4vKipcbiAqIEBmaWxlXG4gKiBBdHRhY2hlcyBiZWhhdmlvciB0byBvcGVuIGRpc21pc3NhYmxlIHNpZ24taW4gbWVudSB3aGVuIHZpc2l0aW5nIHRoZSBzaXRlXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5zaWduSW5DdGEgPSB7XG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGhhc05vQ3RhQ29va2llKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpZ25JbkN0YUNvb2tpZSA9IENvb2tpZXMuZ2V0KCdzaWduSW5DdGEnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2lnbkluQ3RhQ29va2llICE9PSAnMSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldEN0YUNvbXBsZXRlZChlKXtcbiAgICAgICAgICAgICAgICBDb29raWVzLnNldCgnc2lnbkluQ3RhJywgJzEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGJpbmRDb21wbGV0ZWRFdmVudHMoZHJvcGRvd25CbG9jayl7XG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgc2V0Q3RhQ29tcGxldGVkKTtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkJsb2NrLm9uKCdjbGljaycsIHNldEN0YUNvbXBsZXRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBzdGFydEN0YShzaWduSW5Ecm9wZG93biwgc2lnbkluRHJvcGRvd25NZW51KXtcbiAgICAgICAgICAgICAgICBpZiAoaGFzTm9DdGFDb29raWUoKSkge1xuICAgICAgICAgICAgICAgICAgICBzaWduSW5Ecm9wZG93bi5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICBzaWduSW5Ecm9wZG93bk1lbnUuYWRkQ2xhc3MoJ2FtYV9fc2lnbi1pbi1kcm9wZG93bl9fbWVudS0tb3BlbicpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbkluRHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25JbkRyb3Bkb3duTWVudS5yZW1vdmVDbGFzcygnYW1hX19zaWduLWluLWRyb3Bkb3duX19tZW51LS1vcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDdGFDb21wbGV0ZWQoKVxuICAgICAgICAgICAgICAgICAgICB9LCA3MDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCAkZHJvcGRvd25CbG9jayA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd24nKTtcbiAgICAgICAgICAgIGNvbnN0ICRzaWduSW5Ecm9wZG93blRyaWdnZXIgPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duX190cmlnZ2VyJyk7XG4gICAgICAgICAgICBjb25zdCAkc2lnbkluRHJvcGRvd25NZW51ID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bl9fbWVudScpO1xuICAgICAgICAgICAgYmluZENvbXBsZXRlZEV2ZW50cygkZHJvcGRvd25CbG9jaylcbiAgICAgICAgICAgIHN0YXJ0Q3RhKCRzaWduSW5Ecm9wZG93blRyaWdnZXIsICRzaWduSW5Ecm9wZG93bk1lbnUpXG4gICAgICAgIH1cbiAgICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuICAiLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9zZWFyY2hfY2hlY2tib3ggPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgdmFyICRjYXRlZ29yeVNlYXJjaElucHV0ID0gJCgnI3NlYXJjaF9jYXRlZ29yeScpO1xuICAgICAgdmFyICRjYXRlZ29yeVNlYXJjaExpc3QgPSAkKCcuZmFjZXRzLXdpZGdldC1jaGVja2JveCB1bCBsaScpO1xuICAgICAgdmFyICRjbGVhclNlYXJjaEZpbHRlciA9ICQoJyNhcHBsaWVkRmlsdGVyc1JlbW92ZScpO1xuXG4gICAgICAvLyBGaWx0ZXIgbGlzdCB1c2luZyBqUXVlcnkgZmlsdGVyXG4gICAgICBmdW5jdGlvbiBmaWx0ZXJMaXN0KHNlYXJjaEJveCwgbGlzdCkge1xuICAgICAgICBzZWFyY2hCb3gua2V5dXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciAkcmVnZXggPSBuZXcgUmVnRXhwKHRoaXMudmFsdWUsICdpJyk7XG4gICAgICAgICAgbGlzdC5oaWRlKCkuZmlsdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkcmVnZXgudGVzdCgkLnRyaW0oJCh0aGlzKS50ZXh0KCkpKTtcbiAgICAgICAgICB9KS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBDbGVhciBmaWx0ZXJcbiAgICAgIGZ1bmN0aW9uIGNsZWFmRmlsdGVyTGlzdChjbGVhclNlYXJjaEZpbHRlcikge1xuICAgICAgICBjbGVhclNlYXJjaEZpbHRlci5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAkY2F0ZWdvcnlTZWFyY2hJbnB1dC52YWwoJycpO1xuICAgICAgICAgICRjYXRlZ29yeVNlYXJjaElucHV0LnRyaWdnZXIoJ2tleXVwJyk7XG5cbiAgICAgICAgICAkKCcuZmFjZXRzLXdpZGdldC1jaGVja2JveCB1bCBsaSBbdHlwZT1jaGVja2JveF0nKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcykucHJvcChcImNoZWNrZWRcIiwgZmFsc2UpO1xuICAgICAgICAgICAgJCgnI2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaC1zb2xycGFnZS0yJykuc3VibWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnZva2UgZmlsdGVyIGxpc3RcbiAgICAgIGZpbHRlckxpc3QoJGNhdGVnb3J5U2VhcmNoSW5wdXQsICRjYXRlZ29yeVNlYXJjaExpc3QpO1xuXG4gICAgICAvLyBJbnZva2UgY2xlYXIgZmlsdGVyXG4gICAgICBjbGVhZkZpbHRlckxpc3QoJGNsZWFyU2VhcmNoRmlsdGVyKTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBicCBjYWxjdWxhdG9yLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiAnYW5vbnltb3VzIGNsb3N1cmUnLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmJwQ2FsY3VsYXRvciA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAvLyBDbG9uZSBsYXN0IHJvdyBvZiB0YWJsZVxuICAgICAgJCgnLmFkZC1icC1yb3cnKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyICR0YWJsZUJvZHkgPSAkKCcjYnBDYWxjdWxhdG9yIHRhYmxlJykuZmluZCgndGJvZHknKSxcbiAgICAgICAgICAkdHJMYXN0ID0gJHRhYmxlQm9keS5maW5kKCd0cjpsYXN0JyksXG4gICAgICAgICAgJHRyTmV3ID0gJHRyTGFzdC5jbG9uZSgpO1xuXG4gICAgICAgIC8vIEFwcGVuZCBuZXcgY2xhc3MgbmFtZSB0byBjbG9uZWQgcm93XG4gICAgICAgICR0ckxhc3QuYmVmb3JlKCR0ck5ldykuYWRkQ2xhc3MoJ2Nsb25lZCcpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcblxuICAgICAgICAvLyBBZGQgbmV3IG5hbWUgd2l0aCBpbmRleFxuICAgICAgICAkdGFibGVCb2R5LmZpbmQoJ3RyOmxhc3QgaW5wdXQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgJHRySW5wdXRDbGFzc0luZGV4ID0gJCgnI2JwQ2FsY3VsYXRvciB0Ym9keT50cicpLmxlbmd0aCArIDEsXG4gICAgICAgICAgICAgICR0cklucHV0Q2xhc3NOYW1lID0gJCh0aGlzKS5hdHRyKCdjbGFzcycpO1xuXG4gICAgICAgICAgJCh0aGlzKS5hdHRyKCduYW1lJywgJHRySW5wdXRDbGFzc05hbWUgKyAnLScgKyAkdHJJbnB1dENsYXNzSW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCd0ZDplcSgwKScsICR0ckxhc3QpLnRleHQoJCgnI2JwQ2FsY3VsYXRvciB0Ym9keT50cicpLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBXaGVuIGNsZWFyL3Jlc3RhcnQgYnV0dG9uIGlzIGNsaWNrZWQgcmV0dXJuIHRhYmxlIHRvIGluaXRpYWwgc3RhdGVcbiAgICAgICQoJy5jbGVhci1yZXN0YXJ0JykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBjbG9uZWQgcm93c1xuICAgICAgICB2YXIgJHRyQ2xvbmVkID0gJCgnLmNsb25lZCcpO1xuICAgICAgICAkdHJDbG9uZWQucmVtb3ZlKCk7XG5cbiAgICAgICAgLy8gUmVzZXQgdG8gaW50aWFsIHZhbHVlc1xuICAgICAgICAkKCcjYnBDYWxjdWxhdG9yIGlucHV0JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXNldCBmb3JtXG4gICAgICAgICQoJyNicENhbGN1bGF0b3IgJykudmFsaWRhdGUoKS5yZXNldEZvcm0oKTtcblxuICAgICAgICAvLyBIaWRlIG91dHB1dCByb3dcbiAgICAgICAgJCgnLmJwQ2FsY3VsYXRvcl9fdGFibGVfX291dHB1dCcpLmhpZGUoKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2FsY3VsYXRlIGF2ZXJhZ2UgQlBcbiAgICAgIGZ1bmN0aW9uIGNhbGN1bGNhdGVCUChicFZhbHVlLCBicE91dHB1dCkge1xuICAgICAgICB2YXIgYnBJbnB1dCA9IDAsIC8vIHJvdyBjb3VudFxuICAgICAgICAgICAgYnBUb3RhbCA9IDAsIC8vIGluY3JlbWVudGVkIGlucHV0IHZhbHVlc1xuICAgICAgICAgICAgYnBBdmVyYWdlOyAvLyBhdmVyYWdlZCBicFRvdGFsIC8gYnBJbnB1dFxuXG4gICAgICAgIGJwVmFsdWUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gSWYgSW5wdXQgdmFsdWVzIGFyZSBncmVhdGVyIHRoYW4gMCB0aGVuIHR1cm4gaW50byBhIG51bWJlciBhbmQgcm91bmRcbiAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKSA+IDAgPyBNYXRoLnJvdW5kKHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKSkgOiBmYWxzZTtcblxuICAgICAgICAgIGlmICh2YWwgIT09IDApIHtcbiAgICAgICAgICAgIGJwSW5wdXQgKz0gMTtcbiAgICAgICAgICAgIGJwVG90YWwgKz0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIGF2ZXJhZ2VcbiAgICAgICAgYnBBdmVyYWdlID0gYnBUb3RhbCAvIGJwSW5wdXQgPiAwID8gTWF0aC5yb3VuZChicFRvdGFsIC8gYnBJbnB1dCkgOiAwO1xuXG4gICAgICAgIGJwT3V0cHV0LnRleHQoYnBBdmVyYWdlKTtcblxuICAgICAgICAkKCcuYnBDYWxjdWxhdG9yX190YWJsZV9fb3V0cHV0Jykuc2hvdygpO1xuICAgICAgfVxuXG4gICAgICAvLyBWYWxpZGF0ZSBCUCBGb3JtXG4gICAgICAkKCcjYnBDYWxjdWxhdG9yJykudmFsaWRhdGUoe1xuICAgICAgICAvLyBDYWxjdWxhdGUgQlAgd2hlbiBjYWxjdWxhdGUgaXMgY2xpY2tlZFxuICAgICAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbihmb3JtKSB7XG4gICAgICAgICAgdmFyIHN5c0JwVmFsdWUgPSAkKCcuYnBDYWxjdWxhdG9yX19zeXN0b2xpYy1pbnB1dCcpLFxuICAgICAgICAgICAgc3lzQnBPdXRwdXQgPSAkKCcuYnBDYWxjdWxhdG9yX19zeXN0b2xpYy1vdXRwdXQnKTtcblxuICAgICAgICAgIHZhciBkaWFCcFZhbHVlID0gJCgnLmJwQ2FsY3VsYXRvcl9fZGlhc3RvbGljLWlucHV0JyksXG4gICAgICAgICAgICBkaWFCcE91dHB1dCA9ICQoJy5icENhbGN1bGF0b3JfX2RpYXN0b2xpYy1vdXRwdXQnKTtcblxuICAgICAgICAgIGNhbGN1bGNhdGVCUChzeXNCcFZhbHVlLCBzeXNCcE91dHB1dCk7XG4gICAgICAgICAgY2FsY3VsY2F0ZUJQKGRpYUJwVmFsdWUsIGRpYUJwT3V0cHV0KTtcblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogTW9iaWxlIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBwcm9kdWN0IG1lbnUuXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsLCBvbmNlKSB7XG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfcHJvZHVjdE1lbnUgPSB7XG4gICAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIC8vIFNlbGVjdCByZXF1aXJlZCBlbGVtZW50cyBmcm9tIHRoZSBET00uXG4gICAgICAgIGNvbnN0ICRtZW51ID0gJCgnLmFtYV9fcHJvZHVjdC1uYXYnKTtcbiAgICAgICAgY29uc3QgJHRyaWdnZXIgPSAnLnByb2R1Y3QtbWVudS10aXRsZSc7XG4gICAgICAgIGNvbnN0ICRjYXRjaGVyID0gJCgnLmFtYV9fcHJvZHVjdC1uYXYtY2F0Y2hlcicpO1xuICAgICAgICBjb25zdCAkbWVudUl0ZW1zID0gJCgnLmFtYV9fcHJvZHVjdC1uYXYgLmRyb3Bkb3duLWNvbnRhaW5lciB1bCBsaScpO1xuICAgICAgICBcbiAgICAgICAgJChvbmNlKCdleHBhbmQtY29sbGFwc2UnLCAkdHJpZ2dlciwgY29udGV4dCkpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAkKCcuYW1hX19wcm9kdWN0LW5hdi5leHBhbmRlZCAuZHJvcGRvd24tY29udGFpbmVyJykuY3NzKHtcIm1heC1oZWlnaHRcIjogXCIyNjJweFwifSk7XG4gICAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICRjYXRjaGVyLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICQoJ2JvZHknKS5jc3Moe1wib3ZlcmZsb3dcIjpcImF1dG9cIn0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRtZW51LmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgJGNhdGNoZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7XCJvdmVyZmxvd1wiOlwiaGlkZGVuXCJ9KTtcbiAgICAgICAgICAgICRtZW51SXRlbXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCQoIHRoaXMgKS5pbm5lckhlaWdodCgpID09ICc2MicpIHtcbiAgICAgICAgICAgICAgICAkb3BlbkRyb3Bkb3duID0gJCgnLmFtYV9fcHJvZHVjdC1uYXYuZXhwYW5kZWQgLmRyb3Bkb3duLWNvbnRhaW5lcicpO1xuICAgICAgICAgICAgICAgICRtZW51SGVpZ2h0ID0gJG9wZW5Ecm9wZG93bi5pbm5lckhlaWdodCgpICsgMjQ7XG4gICAgICAgICAgICAgICAgJG9wZW5Ecm9wZG93bi5jc3Moe1wibWF4LWhlaWdodFwiOiAkbWVudUhlaWdodCArIFwicHhcIn0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQob25jZSgnY29sbGFwc2UtcHJvZHVjdC1uYXYnLCAgJGNhdGNoZXIsIGNvbnRleHQpKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgJCgnLmFtYV9fcHJvZHVjdC1uYXYuZXhwYW5kZWQgLmRyb3Bkb3duLWNvbnRhaW5lcicpLmNzcyh7XCJtYXgtaGVpZ2h0XCI6IFwiMjYycHhcIn0pO1xuICAgICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAkY2F0Y2hlci5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAkKCdib2R5JykuY3NzKHtcIm92ZXJmbG93XCI6XCJhdXRvXCJ9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoalF1ZXJ5LCBEcnVwYWwsIG9uY2UpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogU2FkbHkgYWRkcyBmb290ZXIgdG8gbGVmdCByZXNvdXJjZSBwYWdlIGNvbHVtbi5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5yZXNvdXJjZVBhZ2VGb290ZXIgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAkKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCgnYm9keS5hbWFfX3Jlc291cmNlLXBhZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAkKCdmb290ZXInLCBjb250ZXh0KS5jbG9uZSgpLmFwcGVuZFRvKCcuYW1hX19sYXlvdXQtLXNwbGl0X19sZWZ0JykuYWRkQ2xhc3MoJ2FtYV9fZm9vdGVyIGFtYV9fcmVzb3VyY2UtcGFnZV9fZGVza3RvcC1mb290ZXInKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogUmVzcG9uc2l2ZSBUYWJsZXMuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMucmVzcG9uc2l2ZVRhYmxlcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgIHdpbmRvdy5zY3JlZW4ud2lkdGg7XG5cbiAgICAgIC8vIFRoaXMgY29uZGl0aW9uYWwgaGFzIGJlZW4gYWRkZWQgdG8gcHJldmVudCBiYXNpY1RhYmxlIHBsdWdpbiB0byBzZWxlY3RpdmVseSBub3QgcnVuIG9uIHRhYmxlc1xuICAgICAgaWYgKCEkKCd0YWJsZScpLmhhc0NsYXNzKCdidCcpKSB7XG4gICAgICAgICQoJ3RhYmxlJykuYmFzaWN0YWJsZSh7XG4gICAgICAgICAgYnJlYWtwb2ludDogMTE4MlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHRoZSB0YWJsZSBhcyBidCBmb3IgbW9iaWxlLlxuICAgICAgICAkKCcuYW1hX19mb3J1bS10YWJsZS13cmFwIHRhYmxlJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZih3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDExODIpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmJhc2ljdGFibGUoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzIGZvcmNlcyB0YWJsZXMgaW5zaWRlIG9mIHRoZSAuYW1hX19yZXNvdXJjZS0tc2NoZWR1bGVzIGRpdiB0byBoYXZlIG1vYmlsZSBsb29rIGFuZCBmZWVsXG4gICAgICAkKCcuYW1hX19yZXNvdXJjZS0tc2NoZWR1bGVzIHRhYmxlJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICQodGhpcykuYmFzaWN0YWJsZSgnc3RhcnQnKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogTGlzdGljbGUgQ2xhc2VzLlxuICpcbiAqIEhhbmRsaW5nIGNsYXNzZXMgdG8gYnVpbGQgbGlzdGljbGUgcHJvcGVybHkgb3V0c2lkZSBja2VkaXRvci5cbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwsIG9uY2UpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5saXN0aWNsZSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgIGlmICgkKCcubGlzdGljbGUnLCBjb250ZXh0KS5sZW5ndGgpIHtcbiAgICAgICAgJCgnLmxpc3RpY2xlJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24gKGlkeCwgZSkge1xuICAgICAgICAgICAgJChlKS5hZGRDbGFzcygnbGlzdGljbGVfX2l0ZW0nKTtcbiAgICAgICAgICAgICQoZSkuZmluZCgnb2wsIHVsJykuZWFjaChmdW5jdGlvbiAoaWR4LCBmKSB7XG4gICAgICAgICAgICAgICQoZikuYWRkQ2xhc3MoJ2xpc3RpY2xlX19pdGVtLXN1YicpO1xuICAgICAgICAgICAgICAkKGYpLmNoaWxkcmVuKCdsaScpLmFkZENsYXNzKCdsaXN0aWNsZV9faXRlbS1zdWItaXRlbScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvL2lmIHRoZSBsaXN0aWNsZSBpdGVtIGNvbnRhaW5zIGFuIGltYWdlLCBwdXQgYSBjbGVhcmZpeCBkaXYgb24gdGhlIGl0ZW0gc28gaWYgaXQgaGFzIGEgdHJhaWxpbmcgaW1hZ2UsIHRoZSBuZXh0IGl0ZW0gd29uJ3Qgd3JhcCBvbiBpdC5cbiAgICAgIC8vQWxzbywgZGV0ZXJtaW5lIGl0IHRoZSBpbWFnZSBpcyBhbG1vc3QgMTAwJSBvZiB0aGUgbGlzdCB3aWR0aC4gaWYgaXQgaXMsIGFkZCBhIGNsYXNzIHRvIHJlbW92ZSB0aGUgbGVmdCBtYXJnaW4gYW5kIG1ha2UgdGhlIGltYWdlIDEwMCUgd2lkdGguIEkgY2hvc2UgODAlLlxuICAgICAgaWYoJCgnLmxpc3RpY2xlX19pdGVtIGltZycpKSB7XG4gICAgICAgICQoJy5saXN0aWNsZV9faXRlbSBpbWcnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgd2lkdGggPSAkKHRoaXMpLmNsb3Nlc3QoJy5saXN0aWNsZV9faXRlbScpLndpZHRoKClcbiAgICAgICAgICBjb25zb2xlLmxvZyh3aWR0aClcbiAgICAgICAgICB2YXIgaW1hZ2VXaWR0aCA9ICQodGhpcykud2lkdGgoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGltYWdlV2lkdGgpXG4gICAgICAgICAgdmFyIGNsZWFyZml4ID0gJzxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PidcbiAgICAgICAgICAkKG9uY2UoJ2xpc3RpY2xlLWl0ZW0nLCAnLmxpc3RpY2xlX19pdGVtJywgdGhpcykpLmFwcGVuZChjbGVhcmZpeClcbiAgICAgICAgICBpZiAoaW1hZ2VXaWR0aCA+PSB3aWR0aCouNykge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbm8tbWFyZ2luJylcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCAoJ2ZpZ3VyZScpLmFkZENsYXNzKCduby1tYXJnaW4nKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCwgb25jZSk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBBdHRhY2hlcyBBTUEgSW1hZ2UgUG9wdXAgbGlicmFyeS5cbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXHRmdW5jdGlvbiBhbHRlck1vZGFsIChjb250ZXh0KSB7XG5cdFx0JCgnLnVpLWRpYWxvZycpLmNzcyh7XCJ6LWluZGV4XCI6IFwiNTAwMDFcIn0pO1xuXHRcdCQoJy51aS1kaWFsb2ctdGl0bGUnKS5oaWRlKCk7XG5cdFx0JCgnLnVpLWJ1dHRvbi1pY29uLW9ubHkgLnVpLWljb24nKS5oaWRlKCk7XG5cdFx0Ly8gU3R5bGVndWlkZSBzcGVjaWZpYyB0cmVhdG1lbnQgdG8gaGlkZSBhbmQgY3NzIHRvIGVsZW1lbnRzLlxuXHRcdCQoJy51aS1kcmFnZ2FibGUgLnVpLWRpYWxvZy10aXRsZWJhcicpLmNzcyh7XG5cdFx0XHRcImJvcmRlclwiOiBcIm5vbmVcIixcblx0XHRcdFwicGFkZGluZzpcIjogXCIwXCIsXG5cdFx0XHRcImJhY2tncm91bmRcIjogXCJub25lXCJcblx0XHR9KTtcblx0XHQkKCcudWktd2lkZ2V0LW92ZXJsYXknKS5jc3Moe1xuXHRcdFx0XCJvcGFjaXR5XCI6IFwiLjVcIixcblx0XHRcdFwiei1pbmRleDpcIjogXCI1MDAwXCJcblx0XHR9KTtcblx0XHQkKCcudWktZGlhbG9nIC51aS1kaWFsb2ctdGl0bGViYXItY2xvc2UnKS5jc3Moe1xuXHRcdFx0XCJiYWNrZ3JvdW5kXCI6IFwidXJsKCcvYXNzZXRzL2ltYWdlcy9pY29uLW1vZGFsLWNsb3NlLnN2ZycpXCIsXG5cdFx0XHRcImJvcmRlclwiOiBcIm5vbmVcIixcblx0XHRcdFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuXHRcdFx0XCJyaWdodFwiOiBcIi0yMHB4XCIsXG5cdFx0XHRcInRvcFwiOiBcIi0xMHB4XCIsXG5cdFx0XHRcImhlaWdodFwiOiBcIjI4cHhcIixcblx0XHRcdFwid2lkdGhcIjogXCIyOHB4XCIsXG5cdFx0XHRcInBhZGRpbmdcIjogXCIwXCIsXG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBjbG9zZU1vZGFsIChjb250ZXh0KSB7XG5cdFx0JCgnLnVpLWljb24tY2xvc2V0aGljaycpLnVuYmluZCgnY2xpY2suY2xvc2UnKTtcblx0XHQkKCcudWktaWNvbi1jbG9zZXRoaWNrJykudHJpZ2dlcignY2xpY2snKTtcblx0fVxuXG5cdERydXBhbC5iZWhhdmlvcnMuYW1hX2ltYWdlX3BvcHVwID0ge1xuXHRcdGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwiZGlhbG9nb3BlblwiLCBcIi51aS1kaWFsb2dcIiwgZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRhbHRlck1vZGFsKCk7XG5cdFx0XHR9KTtcblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIudWktd2lkZ2V0LW92ZXJsYXlcIiwgZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRjbG9zZU1vZGFsKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcblxuLyoqXG4gKiBAZmlsZVxuICogQXR0YWNoZXMgQU1BIEltYWdlIFBvcHVwIGxpYnJhcnkuXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblx0ZnVuY3Rpb24gYWx0ZXJNb2RhbCAoY29udGV4dCkge1xuXHRcdCQoJy5hbWEtaW1hZ2UtcG9wdXAtbW9kYWwgLnVpLWRpYWxvZy10aXRsZScpLmhpZGUoKTtcblx0XHQkKCcuYW1hLWltYWdlLXBvcHVwLW1vZGFsIC51aS1idXR0b24taWNvbi1vbmx5IC51aS1pY29uJykuaGlkZSgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2xvc2VNb2RhbCAoY29udGV4dCkge1xuXHRcdCQoJy51aS1pY29uLWNsb3NldGhpY2snKS51bmJpbmQoJ2NsaWNrLmNsb3NlJyk7XG5cdFx0JCgnLnVpLWljb24tY2xvc2V0aGljaycpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdH1cblxuXHREcnVwYWwuYmVoYXZpb3JzLmFtYV9pbWFnZV9wb3B1cCA9IHtcblx0XHRhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImRpYWxvZ29wZW5cIiwgXCIudWktZGlhbG9nXCIsIGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRhbHRlck1vZGFsKCk7XG5cdFx0XHR9KTtcblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIudWktd2lkZ2V0LW92ZXJsYXlcIiwgZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0XHRcdGNsb3NlTW9kYWwoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwsIG9uY2UpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5pbmRleCA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gIGlmICggJCgnLmRlc2MtZGlzcGxheScpLmxlbmd0aCApIHtcblxuICAgIHZhciBmdWxsID0gJCgnLmZ1bGx0ZXh0Jyk7XG4gICAgdmFyIHRydW5jID0gJCgnLnRydW5jYXRlZCcpXG4gICAgdmFyIGRlc2MgPSAkKCcuZGVzYy1kaXNwbGF5JylcbiAgICB2YXIgZnVsbFRleHQgPSAkKCcuZnVsbHRleHQnKS5odG1sKClcbiAgICB2YXIgdHJ1bmNhdGVkID0gJCgnLnRydW5jYXRlZCcpLmh0bWwoKVxuICAgIHZhciBmdWxsSGVpZ2h0ID0gJydcbiAgICB2YXIgdHJ1bmNIZWlnaHQgPSAnJ1xuICAgIHZhciBtb3JlSHRtbCA9ICc8YSBhY2Nlc3NrZXk9XCJsXCIgaHJlZj1cIiNcIiBhbHQ9XCJSZWFkIE1vcmVcIiBjbGFzcz1cIm1vcmVcIiB0YWJpbmRleD1cIjBcIj4gLi4uUmVhZCBNb3JlPC9hPidcbiAgICB2YXIgbGVzc0h0bWwgPSAnPGEgYWNjZXNza2V5PVwibFwiIGhyZWY9XCIjXCIgYWx0PVwiU2hvdyBMZXNzXCIgY2xhc3M9XCJsZXNzXCIgdGFiaW5kZXg9XCIwXCI+U2hvdyBMZXNzPC9hPidcbiAgICB2YXIgd2lkdGggPSAnJ1xuXG4gICAgICBmdW5jdGlvbiBnZXREaW1lbnNpb25zICgpIHtcblxuICAgICAgICAvLyBJZiBjbG9zZXN0IHBhcmVudCBpbmRpY2F0ZXMgY2F0ZWdvcnkuXG4gICAgICAgIC8vIEFkanVzdCBoaWVnaHQgdmFsdWVzLlxuICAgICAgICBpZiAoZGVzYy5jbG9zZXN0KCdkaXYuYW1hX19jYXRlZ29yeScpKSB7XG4gICAgICAgICAgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKVxuICAgICAgICAgIGlmICh3aWR0aCA8IDQwMCkge1xuICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKSArIDI1XG4gICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDIwXG4gICAgICAgICAgfSBlbHNlIGlmICh3aWR0aCA8IDkwMCkge1xuICAgICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgNTFcbiAgICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAyMFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgMjZcbiAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMTRcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKVxuICAgICAgICAgIGlmICh3aWR0aCA8IDQwMCkge1xuICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKSArIDI1XG4gICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDIwXG4gICAgICAgICAgfSBlbHNlIGlmICh3aWR0aCA8IDkwMCkge1xuICAgICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgMjVcbiAgICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAyMFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpXG4gICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDE0XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvKlxuICAgICAgICAqIEFuaW1hdGUgdGhlIGhlaWdodCBvZiBhIGR5bmFtaWMgaGVpZ2h0IG9iamVjdD8gU0lNUExFIVxuICAgICAgICAqIFdoYXQgYSBmb29sIHlvdSB3b3VsZCBiZSB0byBub3QgdGhpbmsgb2Ygc28gZWxlZ2FudCBhIHNvbHV0aW9uLlxuICAgICAgICAqIEluIHRoZSBtYXJrdXAsIHRoZXJlIGFyZSBoaWRkZW4gZnVsbHRleHQgYW5kIHN1bW1hcnkgZGl2cy5cbiAgICAgICAgKiBUaGV5IGFyZSBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgd2hpdGhpbiB0aGUgcGFnZSB0ZW1wbGF0ZSB0byBrZWVwIGFuIGFjY3VyYXRlIGhlaWdodC5cbiAgICAgICAqL1xuXG4gICAgICAvLyBTZXQgaGVpZ2h0IG9uIHBhZ2Vsb2FkIHVzaW5nIHRoZSBoaWRkZW4gZGl2cy5cbiAgICAgICQob25jZSgnZ2V0SGVpZ2h0JywgJy5kZXNjLWRpc3BsYXknLCBjb250ZXh0KSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldERpbWVuc2lvbnMoKVxuICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgdHJ1bmNIZWlnaHQgKyAncHgnKVxuICAgICAgfSk7XG5cbiAgICAgIC8vIFNldCB0aGUgaGVpZ2h0IGFnYWluIG9uIHdpbmRvdyByZXNpemUuXG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXG4gICAgICAgIGlmIChkZXNjLmhhc0NsYXNzKCdmdWxsJykpIHtcbiAgICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgZnVsbEhlaWdodCArICdweCcpXG4gICAgICAgIH0gZWxzZSBpZiAoZGVzYy5oYXNDbGFzcygnc3VtbWFyeScpKSB7XG4gICAgICAgICAgZGVzYy5jc3MoJ2hlaWdodCcsIHRydW5jSGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIE9uIGNsaWNrLCBzZXQgdGhlIGhlaWdodCB0byB0cmlnZ2VyIGNzcyB0cmFuc2l0aW9uLlxuICAgICAgZGVzYy5vbignY2xpY2snLCAnLm1vcmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldERpbWVuc2lvbnMoKVxuICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgZnVsbEhlaWdodCArICdweCcpXG4gICAgICAgIGRlc2MuYWRkQ2xhc3MoJ2Z1bGwnKS5yZW1vdmVDbGFzcygnc3VtbWFyeScpXG4gICAgICAgIC8vIFN3YXAgdGhlIGZ1bGwgY29weSBpbnRvIHRoZSBkaXNwbGF5IGRpdi5cbiAgICAgICAgZGVzYy5odG1sKCQucGFyc2VIVE1MKGZ1bGxUZXh0KSkuYXBwZW5kKGxlc3NIdG1sKVxuICAgICAgfSk7XG4gICAgICBkZXNjLm9uKCdjbGljaycsICcubGVzcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXG4gICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCB0cnVuY0hlaWdodCArICdweCcpXG4gICAgICAgIGRlc2MuYWRkQ2xhc3MoJ3N1bW1hcnknKS5yZW1vdmVDbGFzcygnZnVsbCcpXG4gICAgICAgIC8vIFN3YXAgdGhlIHRydW5jYXRlZCBjb3B5IGludG8gdGhlIGRpc3BsYXkgZGl2LlxuICAgICAgICBkZXNjLmh0bWwoJC5wYXJzZUhUTUwodHJ1bmNhdGVkKSkuYXBwZW5kKG1vcmVIdG1sKVxuICAgICAgICAvLyBTY3JvbGwgdG8gdG9wLlxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCA1MDAsICdzd2luZycpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCwgb25jZSk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIERydXBhbC5iZWhhdmlvcnMuYW1hX2FuY2hvcnMgPSB7XG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gRnVuY3Rpb24gdG8gaGFuZGxlIHNjcm9sbGluZyB0byBhbmNob3JcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzY3JvbGxUb0FuY2hvcihoYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgaGVpZ2h0IG9mIHRoZSBoZWFkZXIgdG8gZGV0ZXJtaW5lIHRoZSBpbml0aWFsIG9mZnNldFxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJCgnaGVhZGVyJykub3V0ZXJIZWlnaHQoKSB8fCAwO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgaGVpZ2h0IG9mIHRoZSBwYWdlIGdyb3VwZXIgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDYwMSAmJiAkKCcuYW1hX3BhZ2VfZ3JvdXBpbmdfbmV3cycpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9ICQoJy5hbWFfcGFnZV9ncm91cGluZ19uZXdzJykub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgZGVza3RvcCBvZmZzZXQgYmFzZWQgb24gdGhlIHByZXNlbmNlIG9mIHRoZSB0b29sYmFyLWhvcml6b250YWwgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9ICQoJ2JvZHknKS5oYXNDbGFzcygndG9vbGJhci1ob3Jpem9udGFsJykgPyBvZmZzZXQgKyA4MCA6IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKGhhc2gpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9XCInICsgaGFzaC5zbGljZSgxKSArICdcIl0nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIC0gb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgNTAwXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gT24gY2xpY2sgb2YgYW55IGFuY2hvciBsaW5rXG4gICAgICAgICAgICAgICAgJCgnYVtocmVmXj1cIiNcIl0sIGFbaHJlZio9XCIjXCJdJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBzY3JvbGwgdG8gYW5jaG9yIHNvY2lhbCBsaW5rcywgdXJscyB3aXRoIGEgLyMvIGNvbXBvbmVudCwgYWNjb3JkaW9uIGhlYWRpbmdzIG9uIGRlc2t0b3Agb3IgYW55IG90aGVyIGV4dGVybmFsIGxpbmtzIHdpdGggYW5jaG9ycy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWdhLXNpdGVfZXZlbnRzJykgPT0gJ3NvY2lhbF9jbGljaycgfHwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzaC5pbmNsdWRlcygnIy8nKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgKCQodGhpcykucGFyZW50KCkuaXMoJ2R0JykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA5OTIpIHx8IFxuICAgICAgICAgICAgICAgICAgICAvXFwvY29tbWVudFxcL1xcZCsjLy50ZXN0KHRoaXMuaHJlZikgfHwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQXR0cmlidXRlKCdkYXRhLWV4dGxpbmsnKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXRobmFtZSAhPT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgaGFyZCBqdW1wLCB0aGUgZGVmYXVsdCBiZWhhdmlvclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGVyZm9ybSBhbmltYXRlZCBzY3JvbGxpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvQW5jaG9yKHRoaXMuaGFzaCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIE9uIHBhZ2UgbG9hZCB3aXRoIGFuY2hvciBpbiBVUkxcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9BbmNob3Iod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG59KShqUXVlcnksIERydXBhbCk7IiwiLyoqXG4gKiBAZmlsZVxuICogQXBwbGljYXRpb24gZHJvcGRvd24uXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYXBwTWVudSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAkKCcjYmxvY2stYWNjb3VudG5hdicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xhc3NfYWN0aXZlID0gJ2lzLWFjdGl2ZSc7XG5cbiAgICAgICAgJCgnLmFjY291bnRfbmF2X3RyaWdnZXInLCB0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAvLyBVbmZvY3VzIG9uIHRoZSBkcm9wZG93bi5cbiAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIGZvciBDU1MuXG4gICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgdG8gdGhlIGRyb3Bkb3duIFVMLlxuICAgICAgICAgICQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKCBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJy5hY2NvdW50X25hdl90cmlnZ2VyJywgdGhpcykucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKS5uZXh0KCkucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9wb2RjYXN0ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgLy9DaGVjayBudW1iZXIgb2YgbGlua3NcbiAgICAgICAgb2RkTGlua3MoKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBvZGRMaW5rcygpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gJChcInVsLmFtYV9fcG9kY2FzdC1wbGF5ZXJfX2xpbmtzIGxpXCIpLmxlbmd0aDtcbiAgICAgICAgdmFyIGxpbmtDb250YWluZXIgPSAkKFwidWwuYW1hX19wb2RjYXN0LXBsYXllcl9fbGlua3NcIik7XG5cbiAgICAgICAgaWYgKGNvdW50ID09IDMgfHwgY291bnQgPT0gMSkge1xuICAgICAgICAgIGxpbmtDb250YWluZXIuYWRkQ2xhc3MoJ29kZF9saW5rcycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpOyIsIi8qKlxuICogQGZpbGVcbiAqIE1vYmlsZSBmdW5jdGlvbmFsaXR5IGZvciB0aGUgbG9ja2VyIG1lbnUuXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsLCBvbmNlKSB7XG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfbG9ja2VyTWVudSA9IHtcbiAgICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgLy8gU2VsZWN0IHJlcXVpcmVkIGVsZW1lbnRzIGZyb20gdGhlIERPTS5cbiAgICAgICAgY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcbiAgICAgICAgY29uc3QgJG1lbnUgPSAkKCcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uJyk7XG4gICAgICAgIGNvbnN0ICR0cmlnZ2VyID0gJCgnLmFtYV9sb2NrZXJfbmF2aWdhdGlvbi10cmlnZ2VyJyk7XG4gICAgICAgIGNvbnN0ICRjYXRjaGVyID0gJCgnLmFtYV9sb2NrZXJfbmF2aWdhdGlvbi1jYXRjaGVyJyk7XG4gICAgICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICBjb25zdCBib2R5Rml4ZWQgPSAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGxvY2tlck1lbnUoKSB7XG4gICAgICAgICAgICAvLyBPcGVuIG1lbnUgb24gdHJpZ2dlciBjbGljay5cbiAgICAgICAgICAgICQob25jZSgnY2xpY2stdG8tc2hvdycsICcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uLXRyaWdnZXInLCBjb250ZXh0KSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAkbWVudS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICAkY2F0Y2hlci50b2dnbGVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgJGJvZHkuY3NzKHtcIm92ZXJmbG93XCI6XCJoaWRkZW5cIn0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBDbG9zZSBtZW51IG9uIGJhY2tncm91bmQgY2xpY2suXG4gICAgICAgICAgICAkKG9uY2UoJ2NsaWNrLXRvLWhpZGUnLCAnLmFtYV9sb2NrZXJfbmF2aWdhdGlvbi1jYXRjaGVyJywgY29udGV4dCkpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkY2F0Y2hlci50b2dnbGVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgJGJvZHkuY3NzKHtcIm92ZXJmbG93XCI6XCJhdXRvXCJ9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9ja2VyTWVudSgpO1xuXG4gICAgICB9XG4gICAgfTtcbiAgfSkoalF1ZXJ5LCBEcnVwYWwsIG9uY2UpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9zaWduSW5NZW51ID0ge1xuICAgICAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgdmFyICRleHBsb3JlTWVudSA9ICQoJy5hbWFfX2V4cGxvcmUtbWVudScpO1xuICAgICAgICAgICAgdmFyICRleHBsb3JlTWVudURyb3Bkb3duID0gJCgnLmFtYV9fZXhwbG9yZS1tZW51X19tZW51Jyk7XG4gICAgICAgICAgICB2YXIgaXNEcm9wZG93bk9wZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZHJvcGRvd25Eb3duTWVudShwYXJlbnRFbGVtZW50LCBtZW51RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEcm9wZG93bk9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQocGFyZW50RWxlbWVudCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlRG93bigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChwYXJlbnRFbGVtZW50KS5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlzRHJvcGRvd25PcGVuID0gIWlzRHJvcGRvd25PcGVuO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IG9mIHRoZSBjbGljayBpc24ndCB0aGUgY29udGFpbmVyIG5vciBhIGRlc2NlbmRhbnQgb2YgdGhlIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcmVudEVsZW1lbnQuaXMoZS50YXJnZXQpICYmIHBhcmVudEVsZW1lbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQocGFyZW50RWxlbWVudCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFNldCB0aW1lb3V0IGZvciB3aGVuIGEgdXNlciBtb3VzZXMgb3V0IG9mIHRoZSBtZW51XG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5tb3VzZWVudGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwYXJlbnRFbGVtZW50LnRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgfSkubW91c2VsZWF2ZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQocGFyZW50RWxlbWVudCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkcm9wZG93bkRvd25NZW51KCRleHBsb3JlTWVudSwgJGV4cGxvcmVNZW51RHJvcGRvd24pO1xuICAgICAgICB9XG4gICAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTsiLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLm1vYmlsZUhvbWVwYWdlQ3RhID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgLy8gQ2hlY2sgY2hhcmFjdGVyIGNvdW50IG9mIGFuY2hvciBlbGVtZW50cyB3aXRoaW4gdGhlIGFtYV9fbW9iaWxlLWhvbWVwYWdlLWN0YSBjb250YWluZXJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tDaGFyYWN0ZXJDb3VudCgpIHtcbiAgICAgICAgICAvLyBGaW5kIHRoZSBhbWFfX21vYmlsZS1ob21lcGFnZS1jdGEgY29udGFpbmVyXG4gICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoJy5hbWFfX21vYmlsZS1ob21lcGFnZS1jdGEnLCBjb250ZXh0KTtcblxuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgJ2NvbHVtbicgY2xhc3MgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKCdjb2x1bW4nKTtcblxuICAgICAgICAgIC8vIEZpbmQgYWxsIGFuY2hvciBlbGVtZW50cyB3aXRoaW4gdGhlIGFtYV9fbW9iaWxlLWhvbWVwYWdlLWN0YSBjb250YWluZXJcbiAgICAgICAgICB2YXIgYW5jaG9ycyA9IGNvbnRhaW5lci5maW5kKCdhJyk7XG5cbiAgICAgICAgICAvLyBFbnN1cmUgYW5jaG9ycyBhcmUgbm90IG51bGwgb3IgZW1wdHlcbiAgICAgICAgICBpZiAoYW5jaG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDaGVjayBpZiBhbnkgYW5jaG9yIHdpdGhpbiB0aGUgY29udGFpbmVyIGhhcyBhIGNoYXJhY3RlciBjb3VudCBncmVhdGVyIHRoYW4gMjVcbiAgICAgICAgICB2YXIgY2hlY2tDb3VudCA9IGFuY2hvcnMudG9BcnJheSgpLnNvbWUoZnVuY3Rpb24oYW5jaG9yKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIHNwYWNlcyBiZWZvcmUgY2hlY2tpbmcgdGhlIGNoYXJhY3RlciBjb3VudFxuICAgICAgICAgICAgdmFyIHRleHQgPSAkKGFuY2hvcikudGV4dCgpLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgICAgICAgICAgcmV0dXJuIHRleHQubGVuZ3RoID4gMjU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBBZGQgY2xhc3MgJ2NvbHVtbicgdG8gdGhlIGNvbnRhaW5lciBpZiBjb25kaXRpb24gaXMgbWV0XG4gICAgICAgICAgaWYgKGNoZWNrQ291bnQpIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKCcuYW1hX19tb2JpbGUtaG9tZXBhZ2UtY3RhJywgY29udGV4dCk7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ2NvbHVtbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrQ2hhcmFjdGVyQ291bnQoKTtcbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIl19
