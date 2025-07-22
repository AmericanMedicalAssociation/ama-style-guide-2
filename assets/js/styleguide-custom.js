
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

            // Expand list
            function expandListAccordion(element, open){
              $(element).accordion({
                multiple: true,
                icons: false,
                heightStyle: "content",
                collapsible: true,
                animate: 500,
                active: open,
                activate : function (event, ui) {
                  if($(ui.newPanel).hasClass('ui-accordion-content-active')) {
                    $(ui.newPanel).prev().addClass('active');
                  } else {
                    $(ui.oldPanel).siblings().removeClass('active');
                  }
                }
              });
            }

            if($(".ama__expand-list").find('.ui-checkboxradio-checked').length) {
              expandListAccordion('.ama__expand-list', 0);
              $(".ama__expand-list .ama__expand-list__header").first().addClass('active');
            } else {
              expandListAccordion('.ama__expand-list', false);
              $(".ama__expand-list").children('.ama__expand-list__header').removeClass('active');
            }

            // Collapse all accordion panels
            $('.ama__filter__collapse-panels button').click(function(){
              $('.ama__expand-list .ui-accordion-header').each( function() {
                if($(this).hasClass('ui-state-active') || $(this).hasClass('active')) {
                  $(this).click();
                }
              });
            });

            // Open accordion panels for mobile
            $('.ama__applied-filters__show-filters').unbind('click').click(function(){
              $('.ama__expand-list, .ama__applied-filters__tags').slideToggle(function() {
                $('.ama__applied-filters__show-filters').text($(this).is(':visible') ? 'Hide Filter' : 'Filter');
              });
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
      function filterTopics() {
        $('.abstract-additional-filters label').hide();
        $('.abstract-filters .ui-checkboxradio-checked').each(function() {
          var selectedTopic = $(this).attr('for');
          $('.abstract-additional-filters label[for="' + selectedTopic + '"').show();
        });
      }
      filterTopics();

      $(once('.abstract-topics-filter-button', context)).on('click', 'span', function(e) {
        if ($('.abstract-topics-checkboxes').hasClass('hidden')) {
          $('.abstract-topics-checkboxes').removeClass('hidden');
        }
        else {
          $('.abstract-topics-checkboxes').addClass('hidden');
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
            if ((categoryNavMenuHeight +  $mainNav.outerHeight() + productNavHeight + alertBannerHeight) > viewportHeight) {
              bodyScrollLock.disableBodyScroll($categoryNavigationMenuGroup, {
                allowTouchMove: function allowTouchMove(el) {
                  while (el && el !== document.body) {
                    if (el.getAttribute('body-scroll-lock-ignore') !== null) {
                      return true;
                    }
                    el = el.parentNode;
                  }
                }
              });
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
            bodyScrollLock.clearAllBodyScrollLocks();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvZHlTY3JvbGxMb2NrLm1pbi5qcyIsImluaXQuanMiLCJhbGVydC5qcyIsImJyb3dzZXItdGhlbWUuanMiLCJmb3JtLWl0ZW1zLmpzIiwibmF2LmpzIiwic3ViY2F0ZWdvcnkuanMiLCJ0YWJzLmpzIiwiYWNjb3JkaW9uLmpzIiwid2ViZm9ybXMuanMiLCJtYWluLW5hdmlnYXRpb24uanMiLCJjYXRlZ29yeS1tZW51LmpzIiwic2lnbi1pbi1kcm9wZG93bi5qcyIsInNlYXJjaC1jaGVja2JveC5qcyIsImJwLWNhbGN1bGF0b3IuanMiLCJwcm9kdWN0LW1lbnUuanMiLCJyZXNvdXJjZS5qcyIsInRhYmxlcy5qcyIsImxpc3RpY2xlLmpzIiwibW9kYWwuanMiLCJpbmRleC1wYWdlLmpzIiwiYW5jaG9yX2xpbmtzLmpzIiwiYXBwbGljYXRpb24tZHJvcGRvd24uanMiLCJwb2RjYXN0LXBsYXllci5qcyIsImxvY2tlci1tZW51LmpzIiwiZXhwbG9yZS1kcm9wZG93bi5qcyIsIm1vYmlsZS1ob21lcGFnZS1jdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InN0eWxlZ3VpZGUtY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIiwiLyoqXG4gKiBAZmlsZVxuICogSW5pdGlhbGl6YXRpb24gc2NyaXB0IGZvciBnbG9iYWwgcHJvY2Vzc2VzXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblxuLyoqXG4gKlxuICogSW5pdGlhbGl6ZSBmaXRWaWQgZm9yIFlvdVR1YmUgdmllb3MuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cblxuXHREcnVwYWwuYmVoYXZpb3JzLmZpdHZpZGluaXQgPSB7XG5cdCBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXHRcdFx0KGZ1bmN0aW9uICgkKSB7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JCgnLnZpZGVvLWNvbnRhaW5lcicpLmZpdFZpZHMoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KShqUXVlcnkpO1xuXHRcdH1cblx0fTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogYWxlcnQuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYWxlcnQgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBhbGVydElkID0gJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5hdHRyKCdpZCcpO1xuICAgICAgdmFyIGFsZXJ0Q29va2llID0gQ29va2llcy5nZXQoJ2FsZXJ0Q29va2llJyk7XG4gICAgICB2YXIgYWxlcnROb2RlID0gQ29va2llcy5nZXQoJ2FsZXJ0Tm9kZScpO1xuXG4gICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgLy8gSWYgdGhlICdoaWRlIGNvb2tpZSBpcyBub3Qgc2V0IHdlIHNob3cgdGhlIGFsZXJ0XG4gICAgICAgIGlmICgoYWxlcnROb2RlICE9PSBhbGVydElkKSB8fCAoYWxlcnRDb29raWUgIT09ICcxJykpIHtcbiAgICAgICAgICAkKCcuYW1hX19hbGVydF9fd3JhcCcpLmNzcyh7XG4gICAgICAgICAgICBcInRyYW5zaXRpb25cIjogXCJvcGFjaXR5IC4xNXNcIixcbiAgICAgICAgICAgIFwib3BhY2l0eVwiOiBcIjFcIlxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICQoJy5hbWFfX2FsZXJ0X193cmFwJykuY3NzKHtcbiAgICAgICAgICAgIFwiZGlzcGxheVwiOiBcIm5vbmVcIlxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRoZSBldmVudCB0aGF0IGNsb3NlcyB0aGUgcG9wdXAgYW5kIHNldHMgdGhlIGNvb2tpZSB0aGF0IHRlbGxzIHVzIHRvXG4gICAgICAgIC8vIG5vdCBzaG93IGl0IGFnYWluIHVudGlsIG9uZSBkYXkgaGFzIHBhc3NlZC5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuYW1hX19hbGVydF9fY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKCcuYW1hX19hbGVydF9fd3JhcCcpLmNzcyh7XG4gICAgICAgICAgICBcInRyYW5zaXRpb25cIjogXCJvcGFjaXR5IDJzXCIsXG4gICAgICAgICAgICBcIm9wYWNpdHlcIjogXCIwXCIsXG4gICAgICAgICAgICBcImRpc3BsYXlcIjogXCJub25lXCJcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgY29va2llc1xuICAgICAgICAgIENvb2tpZXMuc2V0KCdhbGVydENvb2tpZScsICcxJywgeyBleHBpcmVzOiAxfSk7XG4gICAgICAgICAgQ29va2llcy5zZXQoJ2FsZXJ0Tm9kZScsIGFsZXJ0SWQsIHsgZXhwaXJlczogMX0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogU2FkbHkgYWRkcyBmb290ZXIgdG8gbGVmdCByZXNvdXJjZSBwYWdlIGNvbHVtbi5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgICBEcnVwYWwuYmVoYXZpb3JzLmJyb3dzZXJ0aGVtZSA9IHtcbiAgICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHNldFRoZW1lQ29sb3IgPSAoY29sb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidGhlbWUtY29sb3JcIl0nKVxuICAgICAgICAgICAgICAgIGlmIChtZXRhKSB7XG4gICAgICAgICAgICAgICAgICBtZXRhLnNldEF0dHJpYnV0ZSgnY29udGVudCcsIGNvbG9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKFwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcIiBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihlbnRyaWVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGlzSW50ZXJzZWN0aW5nLCB0YXJnZXQgfSA9IGVudHJ5XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuZ2V0UHJvcGVydHlWYWx1ZShcImJhY2tncm91bmQtY29sb3JcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaGVtZUNvbG9yKGNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICByb290OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld3BvcnQnKSxcbiAgICAgICAgICAgICAgICAgIHJvb3RNYXJnaW46IFwiMXB4IDBweCAtMTAwJSAwcHhcIixcbiAgICAgICAgICAgICAgICAgIHRyZXNob2xkOiAwLjFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWN0aW9uJykuZm9yRWFjaChzZWN0aW9uID0+IHtcbiAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoc2VjdGlvbilcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoalF1ZXJ5KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KShqUXVlcnksIERydXBhbCk7XG4gICIsIi8qKlxuICogQGZpbGVcbiAqIEZvcm0gZmllbGRzIG1hc2tpbmdcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmZvcm1JdGVtcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAvLyBEbyBub3QgZXhlY3V0ZSBpbiB0aGUgbGF5b3V0IGJ1aWxkZXIgZWRpdCBkaWFsb2dcbiAgICAgICAgICBpZiAoISQoJy5qcy1vZmYtY2FudmFzLWRpYWxvZy1vcGVuJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCcubXVsdGlzZWxlY3QnKS5tdWx0aXNlbGVjdCgpO1xuXG4gICAgICAgICAgICAkKCcuYW1hX190b29sdGlwJykudG9vbHRpcCh7XG4gICAgICAgICAgICAgIHRvb2x0aXBDbGFzczogXCJhbWFfX3Rvb2x0aXAtYnViYmxlXCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBjb3VudF9yZW1haW5pbmdfY2hhcmFjdGVyKCkge1xuICAgICAgICAgICAgICB2YXIgbWF4X2xlbmd0aCA9IDE1MDtcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9lbnRlcmVkID0gJCgnLnRleHRhcmVhJykudmFsKCkubGVuZ3RoO1xuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX3JlbWFpbmluZyA9IG1heF9sZW5ndGggLSBjaGFyYWN0ZXJfZW50ZXJlZDtcbiAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLmh0bWwoY2hhcmFjdGVyX3JlbWFpbmluZyk7XG4gICAgICAgICAgICAgIGlmIChtYXhfbGVuZ3RoIDwgY2hhcmFjdGVyX2VudGVyZWQpIHtcbiAgICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLnRleHRhcmVhJykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBqUXVlcnlVSSBzZWxlY3RtZW51IG1ldGhvZCB0byBpbml0aWF0ZSBjdXN0b20gZHJvcGRvd24gbWVudVxuICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5zZWxlY3RtZW51KCk7XG5cbiAgICAgICAgICAvLyBXYWl0IGZvciBhIHNob3J0IGRlbGF5IHRvIGVuc3VyZSB0aGUgbWVudSBpcyBmdWxseSBsb2FkZWQgYW5kIGluaXRpYWxpemVkXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIFNldCBhcmlhLWxhYmVsIG9uIHNlbGVjdG1lbnUgYnV0dG9uXG4gICAgICAgICAgICB2YXIgaW5pdGl0YWxTZWxlY3RlZE9wdGlvblRleHQgPSAkKCcudWktc2VsZWN0bWVudS1tZW51JykuZmluZCgnZGl2LnVpLXN0YXRlLWFjdGl2ZScpLnRleHQoKTtcbiAgICAgICAgICAgICQoJy51aS1zZWxlY3RtZW51LW1lbnUnKS5maW5kKCdkaXYudWktc3RhdGUtYWN0aXZlJykuYXR0cignYXJpYS1sYWJlbCcsICdTb3J0IGJ5ICcgKyBpbml0aXRhbFNlbGVjdGVkT3B0aW9uVGV4dCk7XG4gICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgIC8vIFNldCBhcmlhLWxhYmVsIG9uIHNlbGVjdG1lbnUgYnV0dG9uIHdoZW4gYW4gb3B0aW9uIGlzIHNlbGVjdGVkXG4gICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLnNlbGVjdG1lbnUoe1xuICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgICAgICAgICAgLy8gR2V0IHRoZSB0ZXh0IG9mIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgb3B0aW9uXG4gICAgICAgICAgICAgIHZhciBzZWxlY3RlZE9wdGlvblRleHQgPSAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnRleHQoKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vIFNldCB0aGUgYXJpYS1sYWJlbCBhdHRyaWJ1dGUgdG8gdGhlIHRleHQgb2YgdGhlIHNlbGVjdGVkIG9wdGlvblxuICAgICAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0JykubmV4dCgnLnVpLXNlbGVjdG1lbnUtYnV0dG9uJykuZmluZCgnLnVpLXNlbGVjdG1lbnUtdGV4dCcpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnU29ydHkgYnkgJyArIHNlbGVjdGVkT3B0aW9uVGV4dCk7XG4gICAgICAgICAgICAgICQoJy51aS1zZWxlY3RtZW51LW1lbnUnKS5maW5kKCcudWktbWVudS1pdGVtIGRpdi51aS1zdGF0ZS1hY3RpdmUnKS5hdHRyKCdhcmlhLWxhYmVsJywgJ1NvcnQgYnkgJyArIHNlbGVjdGVkT3B0aW9uVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFJlZnJlc2ggbWVudSB0byBzZXQgY2hhbmdlc1xuICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5zZWxlY3RtZW51KCdyZWZyZXNoJyk7XG5cbiAgICAgICAgICAgIC8vIElmIGZvY3VzIGlzIG9uIHRoZSBzZWxlY3QgbWVudVxuICAgICAgICAgICAgLy8gT25seSBzdWJtaXQgYWZ0ZXIgaGl0dGluZyBlbnRlclxuICAgICAgICAgICAgJCgnI2VkaXQtc29ydC1ieS0tMy1idXR0b24nKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgaWYoZS53aGljaCA9PSA5KSB7XG4gICAgICAgICAgICAgICAgJCgnI2VkaXQtc29ydC1ieS0tMy1idXR0b24nKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgIGlmKGUud2hpY2ggPT0gMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaC1zb2xycGFnZS0yJykuc3VibWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBTdWJtaXRzIHRoZSBzZWFyY2ggZm9ybSBhZnRlciBhIHNlbGVjdCBtZW51IGl0ZW1zIGhhcyBiZWVuIHNlbGVjdGVkXG4gICAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0Om5vdCgjZWRpdC1zb3J0LWJ5LS0zKScpLm9uKCdzZWxlY3RtZW51Y2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICQoJyNibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2gtc29scnBhZ2UtMicpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoJyNlZGl0LXNvcnQtYnktLTMtbWVudScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCcjYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNoLXNvbHJwYWdlLTInKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAkKCcjZWRpdC1zb3J0LWJ5LS0zLW1lbnUnKS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gU3RhcnQgc2VhcmNoIGZpbHRlclxuXG4gICAgICAgICAgICB2YXIgYXZhaWxhYmxlVGFncyA9IFtcbiAgICAgICAgICAgICAgXCJBbGFiYW1hXCIsXG4gICAgICAgICAgICAgIFwiQWxhc2thXCIsXG4gICAgICAgICAgICAgIFwiQW1lcmljYW4gU2Ftb2FcIixcbiAgICAgICAgICAgICAgXCJBcml6b25hXCIsXG4gICAgICAgICAgICAgIFwiQXJrYW5zYXNcIixcbiAgICAgICAgICAgICAgXCJDYWxpZm9ybmlhXCIsXG4gICAgICAgICAgICAgIFwiQ29sb3JhZG9cIixcbiAgICAgICAgICAgICAgXCJDb25uZWN0aWN1dFwiLFxuICAgICAgICAgICAgICBcIkRlbGF3YXJlXCIsXG4gICAgICAgICAgICAgIFwiRGlzdHJpY3QgT2YgQ29sdW1iaWFcIixcbiAgICAgICAgICAgICAgXCJGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWFcIixcbiAgICAgICAgICAgICAgXCJGbG9yaWRhXCIsXG4gICAgICAgICAgICAgIFwiR2VvcmdpYVwiLFxuICAgICAgICAgICAgICBcIkd1YW1cIixcbiAgICAgICAgICAgICAgXCJIYXdhaWlcIixcbiAgICAgICAgICAgICAgXCJJZGFob1wiLFxuICAgICAgICAgICAgICBcIklsbGlub2lzXCIsXG4gICAgICAgICAgICAgIFwiSW5kaWFuYVwiLFxuICAgICAgICAgICAgICBcIklvd2FcIixcbiAgICAgICAgICAgICAgXCJLYW5zYXNcIixcbiAgICAgICAgICAgICAgXCJLZW50dWNreVwiLFxuICAgICAgICAgICAgICBcIkxvdWlzaWFuYVwiLFxuICAgICAgICAgICAgICBcIk1haW5lXCIsXG4gICAgICAgICAgICAgIFwiTWFyc2hhbGwgSXNsYW5kc1wiLFxuICAgICAgICAgICAgICBcIk1hcnlsYW5kXCIsXG4gICAgICAgICAgICAgIFwiTWFzc2FjaHVzZXR0c1wiLFxuICAgICAgICAgICAgICBcIk1pY2hpZ2FuXCIsXG4gICAgICAgICAgICAgIFwiTWlubmVzb3RhXCIsXG4gICAgICAgICAgICAgIFwiTWlzc2lzc2lwcGlcIixcbiAgICAgICAgICAgICAgXCJNaXNzb3VyaVwiLFxuICAgICAgICAgICAgICBcIk1vbnRhbmFcIixcbiAgICAgICAgICAgICAgXCJOZWJyYXNrYVwiLFxuICAgICAgICAgICAgICBcIk5ldmFkYVwiLFxuICAgICAgICAgICAgICBcIk5ldyBIYW1wc2hpcmVcIixcbiAgICAgICAgICAgICAgXCJOZXcgSmVyc2V5XCIsXG4gICAgICAgICAgICAgIFwiTmV3IE1leGljb1wiLFxuICAgICAgICAgICAgICBcIk5ldyBZb3JrXCIsXG4gICAgICAgICAgICAgIFwiTm9ydGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICAgICAgXCJOb3J0aCBEYWtvdGFcIixcbiAgICAgICAgICAgICAgXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIixcbiAgICAgICAgICAgICAgXCJPaGlvXCIsXG4gICAgICAgICAgICAgIFwiT2tsYWhvbWFcIixcbiAgICAgICAgICAgICAgXCJPcmVnb25cIixcbiAgICAgICAgICAgICAgXCJQYWxhdVwiLFxuICAgICAgICAgICAgICBcIlBlbm5zeWx2YW5pYVwiLFxuICAgICAgICAgICAgICBcIlB1ZXJ0byBSaWNvXCIsXG4gICAgICAgICAgICAgIFwiUmhvZGUgSXNsYW5kXCIsXG4gICAgICAgICAgICAgIFwiU291dGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICAgICAgXCJTb3V0aCBEYWtvdGFcIixcbiAgICAgICAgICAgICAgXCJUZW5uZXNzZWVcIixcbiAgICAgICAgICAgICAgXCJUZXhhc1wiLFxuICAgICAgICAgICAgICBcIlV0YWhcIixcbiAgICAgICAgICAgICAgXCJWZXJtb250XCIsXG4gICAgICAgICAgICAgIFwiVmlyZ2luIElzbGFuZHNcIixcbiAgICAgICAgICAgICAgXCJWaXJnaW5pYVwiLFxuICAgICAgICAgICAgICBcIldhc2hpbmd0b25cIixcbiAgICAgICAgICAgICAgXCJXZXN0IFZpcmdpbmlhXCIsXG4gICAgICAgICAgICAgIFwiV2lzY29uc2luXCIsXG4gICAgICAgICAgICAgIFwiV3lvbWluZ1wiXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAkKCBcIiNzZWFyY2hfZmlsdGVyXCIgKS5hdXRvY29tcGxldGUoe1xuICAgICAgICAgICAgICBzb3VyY2U6IGF2YWlsYWJsZVRhZ3NcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkLnVpLmF1dG9jb21wbGV0ZS5wcm90b3R5cGUuX3Jlc2l6ZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHZhciB1bCA9IHRoaXMubWVudS5lbGVtZW50O1xuICAgICAgICAgICAgICB1bC5vdXRlcldpZHRoKHRoaXMuZWxlbWVudC5vdXRlcldpZHRoKCkpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICAvLyBTdGFydCBzZWFyY2ggZmlsdGVyIHdpdGggY2hlY2tib3hlc1xuXG4gICAgICAgICAgICB2YXIgZGF0YU1vZGVsID0gW1xuICAgICAgICAgICAgICB7dGV4dDogJ0FsYWJhbWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdBbGFza2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdBbWVyaWNhbiBTYW1vYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0FyaXpvbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdBcmthbnNhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0NhbGlmb3JuaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdDb2xvcmFkbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0Nvbm5lY3RpY3V0JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnRGVsYXdhcmUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdEaXN0cmljdCBPZiBDb2x1bWJpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0ZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0Zsb3JpZGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdHZW9yZ2lhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnR3VhbScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0hhd2FpaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0lkYWhvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSWxsaW5vaXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdJbmRpYW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSW93YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0thbnNhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0tlbnR1Y2t5JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTG91aXNpYW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWFpbmUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNYXJzaGFsbCBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWFyeWxhbmQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNYXNzYWNodXNldHRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWljaGlnYW4nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNaW5uZXNvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNaXNzaXNzaXBwaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01pc3NvdXJpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTW9udGFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05lYnJhc2thJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV2YWRhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEhhbXBzaGlyZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05ldyBKZXJzZXknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXcgTWV4aWNvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IFlvcmsnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOb3J0aCBDYXJvbGluYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05vcnRoIERha290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ09oaW8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdPa2xhaG9tYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ09yZWdvbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1BhbGF1JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnUGVubnN5bHZhbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnUHVlcnRvIFJpY28nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdSaG9kZSBJc2xhbmQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdTb3V0aCBDYXJvbGluYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1NvdXRoIERha290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1Rlbm5lc3NlZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1RleGFzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVXRhaCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1Zlcm1vbnQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdWaXJnaW4gSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnV2FzaGluZ3RvbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1dlc3QgVmlyZ2luaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdXaXNjb25zaW4nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdXeW9taW5nJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnJywgdmFsdWU6ICcnfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsQ2hhbmdlKCl7XG4gICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSAkKCcjbXlDaGVja0xpc3QnKS5jaGVja0xpc3QoJ2dldFNlbGVjdGlvbicpO1xuXG4gICAgICAgICAgICAgICQoJyNzZWxlY3RlZEl0ZW1zJykudGV4dChKU09OLnN0cmluZ2lmeShzZWxlY3Rpb24pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihqUXVlcnkudWkuY2hlY2tMaXN0KSAhPSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICQoJyNmaWx0ZXJMaXN0JykuY2hlY2tMaXN0KHtcbiAgICAgICAgICAgICAgICBsaXN0SXRlbXM6IGRhdGFNb2RlbCxcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogc2VsQ2hhbmdlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCdmb3JtOm5vdChbY2xhc3MqPVwibGF5b3V0LWJ1aWxkZXJcIl0pIFt0eXBlPWNoZWNrYm94XScpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkKCdbdHlwZT1jaGVja2JveF0nKS5jaGVja2JveHJhZGlvKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCgnZm9ybTpub3QoW2NsYXNzKj1cImxheW91dC1idWlsZGVyXCJdKSBbdHlwZT1yYWRpb10nKS5jaGVja2JveHJhZGlvKCkuYnV0dG9uc2V0KCkuZmluZCgnbGFiZWwnKS5jc3MoJ3dpZHRoJywgJzE5LjQlJyk7XG5cbiAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLmtleXVwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBjb3VudF9yZW1haW5pbmdfY2hhcmFjdGVyKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gUmFuZ2UgRmllbGRcbiAgICAgICAgICAgIHZhciBsZWdlbmQgPSAkKCcuYW1hX19yYW5nZS1maWVsZF9fbGVnZW5kJyk7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gJCggXCIjY3VycmVudFZhbHVlXCIgKTtcblxuICAgICAgICAgICAgJChcIi5hbWFfX3JhbmdlLWZpZWxkXCIpLnNsaWRlcih7XG4gICAgICAgICAgICAgIGFuaW1hdGU6IHRydWUsXG4gICAgICAgICAgICAgIHJhbmdlOiAnbWluJyxcbiAgICAgICAgICAgICAgdmFsdWU6IDEsXG4gICAgICAgICAgICAgIG1pbjogMjAwMCxcbiAgICAgICAgICAgICAgbWF4OiA1MDAwLFxuICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGpRdWVyeSh0aGlzKS5maW5kKCcudWktc2xpZGVyLWhhbmRsZScpO1xuICAgICAgICAgICAgICAgIHZhciBidWJibGUgPSBqUXVlcnkoJzxkaXYgY2xhc3M9XCJhbWFfX3JhbmdlLWZpZWxkX192YWx1ZWJveFwiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIGhhbmRsZS5hcHBlbmQoYnViYmxlKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2dCwgdWkpIHtcbiAgICAgICAgICAgICAgICB1aS5oYW5kbGUuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgPSAnJCcgKyB1aS52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuYXBwZW5kKGxlZ2VuZCk7XG5cbiAgICAgICAgICAgIC8vIEZvcm0gYWNjb3JkaW9uXG4gICAgICAgICAgICAkKCBcIi50YWJsaXN0XCIgKS5hY2NvcmRpb24oe1xuICAgICAgICAgICAgICBoZWFkZXI6IFwiLmFtYV9fZm9ybS1zdGVwc19fc3RlcFwiLFxuICAgICAgICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBFeHBhbmQgbGlzdFxuICAgICAgICAgICAgZnVuY3Rpb24gZXhwYW5kTGlzdEFjY29yZGlvbihlbGVtZW50LCBvcGVuKXtcbiAgICAgICAgICAgICAgJChlbGVtZW50KS5hY2NvcmRpb24oe1xuICAgICAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGljb25zOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCIsXG4gICAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgYW5pbWF0ZTogNTAwLFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogb3BlbixcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZSA6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcbiAgICAgICAgICAgICAgICAgIGlmKCQodWkubmV3UGFuZWwpLmhhc0NsYXNzKCd1aS1hY2NvcmRpb24tY29udGVudC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICAkKHVpLm5ld1BhbmVsKS5wcmV2KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCh1aS5vbGRQYW5lbCkuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoJChcIi5hbWFfX2V4cGFuZC1saXN0XCIpLmZpbmQoJy51aS1jaGVja2JveHJhZGlvLWNoZWNrZWQnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZXhwYW5kTGlzdEFjY29yZGlvbignLmFtYV9fZXhwYW5kLWxpc3QnLCAwKTtcbiAgICAgICAgICAgICAgJChcIi5hbWFfX2V4cGFuZC1saXN0IC5hbWFfX2V4cGFuZC1saXN0X19oZWFkZXJcIikuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBleHBhbmRMaXN0QWNjb3JkaW9uKCcuYW1hX19leHBhbmQtbGlzdCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgJChcIi5hbWFfX2V4cGFuZC1saXN0XCIpLmNoaWxkcmVuKCcuYW1hX19leHBhbmQtbGlzdF9faGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDb2xsYXBzZSBhbGwgYWNjb3JkaW9uIHBhbmVsc1xuICAgICAgICAgICAgJCgnLmFtYV9fZmlsdGVyX19jb2xsYXBzZS1wYW5lbHMgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QgLnVpLWFjY29yZGlvbi1oZWFkZXInKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCd1aS1zdGF0ZS1hY3RpdmUnKSB8fCAkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gT3BlbiBhY2NvcmRpb24gcGFuZWxzIGZvciBtb2JpbGVcbiAgICAgICAgICAgICQoJy5hbWFfX2FwcGxpZWQtZmlsdGVyc19fc2hvdy1maWx0ZXJzJykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICQoJy5hbWFfX2V4cGFuZC1saXN0LCAuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3RhZ3MnKS5zbGlkZVRvZ2dsZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLnRleHQoJCh0aGlzKS5pcygnOnZpc2libGUnKSA/ICdIaWRlIEZpbHRlcicgOiAnRmlsdGVyJyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpc3RGaWx0ZXIoaW5wdXQsIGxpc3QpIHsgLy8gaGVhZGVyIGlzIGFueSBlbGVtZW50LCBsaXN0IGlzIGFuIHVub3JkZXJlZCBsaXN0XG4gICAgICAgICAgICAgIC8vIGN1c3RvbSBjc3MgZXhwcmVzc2lvbiBmb3IgYSBjYXNlLWluc2Vuc2l0aXZlIGNvbnRhaW5zKClcbiAgICAgICAgICAgICAgalF1ZXJ5LmV4cHJbJzonXS5Db250YWlucyA9IGZ1bmN0aW9uKGEsaSxtKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGEudGV4dENvbnRlbnQgfHwgYS5pbm5lclRleHQgfHwgXCJcIikudG9VcHBlckNhc2UoKS5pbmRleE9mKG1bM10udG9VcHBlckNhc2UoKSk+PTA7XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgJChpbnB1dCkuY2hhbmdlKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlciA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgICAgaWYoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGZpbmRzIGFsbCBsaW5rcyBpbiBhIGxpc3QgdGhhdCBjb250YWluIHRoZSBpbnB1dCxcbiAgICAgICAgICAgICAgICAgIC8vIGFuZCBoaWRlIHRoZSBvbmVzIG5vdCBjb250YWluaW5nIHRoZSBpbnB1dCB3aGlsZSBzaG93aW5nIHRoZSBvbmVzIHRoYXQgZG9cbiAgICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcInNwYW46bm90KDpDb250YWlucyhcIiArIGZpbHRlciArIFwiKSlcIikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwic3BhbjpDb250YWlucyhcIiArIGZpbHRlciArIFwiKVwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcImxhYmVsXCIpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgc2hvdyByZXN1bHRzIGFmdGVyIDMgY2hhcmFjdGVycyBhcmUgZW50ZXJlZFxuICAgICAgICAgICAgICB9KS5rZXl1cCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYoIHRoaXMudmFsdWUubGVuZ3RoIDwgNCApIHJldHVybjtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNoYW5nZSgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RGaWx0ZXIoJChcIiNhbWFfX3NlYXJjaF9fbG9jYXRpb25cIiksICQoXCIuYW1hX19mb3JtLWdyb3VwXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWFrZSB0aGUgZW50aXJlIHN1YnNjcmliZSBidXR0b24gY2xpY2thYmxlLlxuICAgICAgICAgICQoJ2Zvcm0uc2FsZXNmb3JjZS1zdWJzY3JpYmUtZm9ybSwgLmFtYV9faW5wdXQtd3JhcHBlci0tc3Vic2NyaWJlLW5ld3MnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2FsZXNmb3JjZS1zdWJzY3JpYmUtZm9ybScpKSB7XG4gICAgICAgICAgICAgIC8vIElmIG9uIHN1YnNjcmlwdGlvbnMgcGFnZSwgc2F2ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uIGJlZm9yZSBzdWJtaXR0aW5nIHRoZSBmb3JtXG4gICAgICAgICAgICAgIGlmKCQoJ2Rpdi52aWV3LW15LXN1YnNjcmlwdGlvbicpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzY3JvbGxQb3MnLCAkKHdpbmRvdykuc2Nyb2xsVG9wKCkpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAkKHRoaXMpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBsaW5rID0gJCh0aGlzKS5maW5kKCdhJykuYXR0cignaHJlZicpO1xuICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gbGluaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIEZvciBzdWJjcmlwdGlvbnMgcGFnZSwgb24gc3Vic2NyaWJlIGJ1dHRvbiBjbGljaywgcmVsb2FkIHRoZSBwYWdlIGF0IHRoZSBzYW1lIGxvY2F0aW9uIChpLmUgb2Zmc2V0IGZyb20gdG9wKVxuICAgICAgICAgIGlmKCQoJ2Rpdi52aWV3LW15LXN1YnNjcmlwdGlvbicpLmxlbmd0aCkgeyBcbiAgICAgICAgICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Njcm9sbFBvcycpKSB7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2Nyb2xsUG9zJykpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzY3JvbGxQb3MnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9KShqUXVlcnkpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hYnN0cmFjdEZvcm1GaWx0ZXJzID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICBmdW5jdGlvbiBmaWx0ZXJUb3BpY3MoKSB7XG4gICAgICAgICQoJy5hYnN0cmFjdC1hZGRpdGlvbmFsLWZpbHRlcnMgbGFiZWwnKS5oaWRlKCk7XG4gICAgICAgICQoJy5hYnN0cmFjdC1maWx0ZXJzIC51aS1jaGVja2JveHJhZGlvLWNoZWNrZWQnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBzZWxlY3RlZFRvcGljID0gJCh0aGlzKS5hdHRyKCdmb3InKTtcbiAgICAgICAgICAkKCcuYWJzdHJhY3QtYWRkaXRpb25hbC1maWx0ZXJzIGxhYmVsW2Zvcj1cIicgKyBzZWxlY3RlZFRvcGljICsgJ1wiJykuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGZpbHRlclRvcGljcygpO1xuXG4gICAgICAkKG9uY2UoJy5hYnN0cmFjdC10b3BpY3MtZmlsdGVyLWJ1dHRvbicsIGNvbnRleHQpKS5vbignY2xpY2snLCAnc3BhbicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoJy5hYnN0cmFjdC10b3BpY3MtY2hlY2tib3hlcycpLmhhc0NsYXNzKCdoaWRkZW4nKSkge1xuICAgICAgICAgICQoJy5hYnN0cmFjdC10b3BpY3MtY2hlY2tib3hlcycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkKCcuYWJzdHJhY3QtdG9waWNzLWNoZWNrYm94ZXMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTsiLCIvKipcbiAqIEBmaWxlXG4gKiBSaWJib24gbmF2IHVzZXIgaW50ZXJhY3Rpb25zLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiAnYW5vbnltb3VzIGNsb3N1cmUnLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5yaWJib25uYXYgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xhc3NfYWN0aXZlID0gJ2lzLWFjdGl2ZSc7XG5cbiAgICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bl9fdHJpZ2dlcicsIHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIC8vIFVuZm9jdXMgb24gdGhlIGRyb3Bkb3duLlxuICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgZm9yIENTUy5cbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyB0byB0aGUgZHJvcGRvd24gVUwuXG4gICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bl9fdHJpZ2dlcicsIHRoaXMpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSkuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogU3ViY2F0ZWdvcnlcbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5zdWJjYXRlZ29yaWVzID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIC8vIENyZWF0ZSBzdGF0aWMgdmFyIGZvciBzdWJjYXRlZ29yeSBpdGVtIGNvdW50LiBUbyBiZSB1c2VkIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHJlY2FsY3VsYXRpb25zIGFyZSBuZWVkZWQuXG4gICAgICB2YXIgc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbkNvbHVtbnMgPSAwO1xuXG4gICAgICBmdW5jdGlvbiBjaGVja1NpemUoKSB7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnkgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc3ViY2F0ZWdvcnknKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeUNvbnRhaW5lciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX19jb250YWluZXInKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeVRpdGxlID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3RpdGxlJyk7XG4gICAgICAgIC8vIFdlIHdhbnQgdGhlIHdpZHRoIG1pbnVzIHBhZGRpbmcgc28gdXNlIHdpZHRoKCkgaW5zdGVhZCBvZiBpbm5lcldpZHRoKCkuXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUV4cGxvcmF0aW9uV2lkdGggPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlcycpLndpZHRoKCk7XG4gICAgICAgIC8vIFN1YmNhdGVnb3J5IGl0ZW1zIGhhdmUgbWF4LXdpZHRoIG9mIDE4MHB4LiBUaGlzIHdpbGwgYmUgdXNlZCBmb3IgY2FsY3VsYXRpb25zIGluc3RlYWQgb2YgZXh0cmFjdGluZyBpdCB2aWEgalF1ZXJ5IGNhbGxzLlxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlJdGVtV2lkdGggPSAxODA7XG4gICAgICAgIHZhciBzdWJjYXRlZ29yeVRpdGxlV2lkdGggPSAkc3ViY2F0ZWdvcnlUaXRsZS5vdXRlcldpZHRoKCk7XG4gICAgICAgIHZhciB0b3RhbEdyaWRJdGVtcyA9ICRzdWJjYXRlZ29yeS5sZW5ndGggKyAxO1xuICAgICAgICAvLyBTdGFydCBjb2x1bW4gY291bnQgYXMgbG93ZXN0IHBvc3NpYmxlLlxuICAgICAgICB2YXIgY29sdW1uQ291bnQgPSAyO1xuICAgICAgICAvLyBTZXQgc3ViY2F0ZWdvcnkgcm93IGl0ZW1zIHRvIGxvd2VzdCB0aGF0IHNob3VsZCBkaXNwbGF5LlxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyA9IE1hdGguZmxvb3IoKHN1YmNhdGVnb3J5RXhwbG9yYXRpb25XaWR0aCAtIHN1YmNhdGVnb3J5VGl0bGVXaWR0aCkgLyBzdWJjYXRlZ29yeUl0ZW1XaWR0aCk7XG5cbiAgICAgICAgaWYgKHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgPCAyKSB7XG4gICAgICAgICAgLy8gVGhlIG1pbmltdW0gc3ViY2F0ZWdvcnkgaXRlbXMgcGVyIHJvdyBzaG91bGQgYmUgdHdvLiBJZiB0aGUgdmFyaWFibGUgY29tcHV0ZWQgdG8gbGVzcywgbWFudWFsbHkgY29ycmVjdCBpdC5cbiAgICAgICAgICBzdWJjYXRlZ29yeUl0ZW1zUGVyUm93ID0gMjtcbiAgICAgICAgICB0b3RhbEdyaWRJdGVtcyA9IHRvdGFsR3JpZEl0ZW1zIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2x1bW5Db3VudCA9IHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIGNoYW5nZXMgaW4gY29sdW1uIGNvdW50IGhhcyBvY2N1cnJlZCBhbmQgYWN0IGFjY29yZGluZ2x5XG4gICAgICAgIGlmIChzdWJjYXRlZ29yeUV4cGxvcmF0aW9uQ29sdW1ucyAhPT0gY29sdW1uQ291bnQpIHtcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgYWRkaXRpb25hbCBcImZpbGxlci1ib3hcIiBuZWVkZWQgdG8gY3JlYXRlIGNvbXBsZXRlIHJvd1xuICAgICAgICAgIHZhciBmaWxsZXJCb3hDb3VudCA9IGNvbHVtbkNvdW50IC0gKHRvdGFsR3JpZEl0ZW1zICUgY29sdW1uQ291bnQpO1xuICAgICAgICAgIGZpbGxHcmlkUm93KCRzdWJjYXRlZ29yeUNvbnRhaW5lciwgZmlsbGVyQm94Q291bnQpO1xuICAgICAgICAgIC8vIFVwZGF0ZSBwZXJzaXN0ZW50IGNvbHVtbiBjb3VudFxuICAgICAgICAgIHN1YmNhdGVnb3J5RXhwbG9yYXRpb25Db2x1bW5zID0gY29sdW1uQ291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgdmlld2FibGUgc3ViY2F0ZWdvcmllcy5cbiAgICAgICAgJHN1YmNhdGVnb3J5LmhpZGUoKTtcbiAgICAgICAgJHN1YmNhdGVnb3J5LnNsaWNlKDAsIHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcblxuICAgICAgICB2aWV3TW9yZSgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB2aWV3TW9yZSgpIHtcbiAgICAgICAgdmFyICR2aWV3TGVzcyA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWxlc3MnKTtcbiAgICAgICAgdmFyICR2aWV3TW9yZSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWFsbCcpO1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5ID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3N1YmNhdGVnb3J5Jyk7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnlDb250YWluZXIgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fY29udGFpbmVyJyk7XG5cbiAgICAgICAgJHZpZXdMZXNzLmhpZGUoKTtcbiAgICAgICAgJHZpZXdNb3JlLnNob3coKTtcblxuICAgICAgICAkKCcudmlld0FsbCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeS5mYWRlSW4oKTtcbiAgICAgICAgICAkdmlld01vcmUuaGlkZSgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeUNvbnRhaW5lci5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAkdmlld0xlc3Muc2hvdygpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy52aWV3TGVzcycpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeS5oaWRlKCk7XG4gICAgICAgICAgY2hlY2tTaXplKCk7XG4gICAgICAgICAgJHZpZXdMZXNzLmhpZGUoKTtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnlDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgJHZpZXdNb3JlLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgICAgZnVuY3Rpb24gZmlsbEdyaWRSb3coJGNvbnRhaW5lciwgY291bnQpIHtcbiAgICAgICAgdmFyIGZpbGxlckJveCA9ICc8ZGl2IGNsYXNzPVwiZmlsbGVyLWJveFwiPjwvZGl2Pic7XG4gICAgICAgIC8vIGNsZWFyIG91dCBjdXJyZW50IGZpbGxlciBib3hlc1xuICAgICAgICB2YXIgJGZpbGxlckJveGVzID0gJGNvbnRhaW5lci5maW5kKCcuZmlsbGVyLWJveCcpO1xuICAgICAgICAkZmlsbGVyQm94ZXMucmVtb3ZlKCk7XG4gICAgICAgIC8vIGZpbGwgb3V0IGdyaWQgcm93XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKGZpbGxlckJveCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcnVuIHRlc3Qgb24gaW5pdGlhbCBwYWdlIGxvYWRcbiAgICAgIGNoZWNrU2l6ZSgpO1xuXG4gICAgICAvLyBydW4gdGVzdCBvbiByZXNpemUgb2YgdGhlIHdpbmRvd1xuICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoZWNrU2l6ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyo9PT09PT0galF1ZXJ5IFVJIHRhYnMgPT09PT09Ki9cblxuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV90YWJzID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICB2YXIgZGVmYXVsdEFjdGl2ZVRhYiA9IDA7XG4gICAgICB2YXIgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgaWYgKHZpZXdwb3J0V2lkdGggPj0gNjAwICYmICQoJy5hbWFfX3Jlc291cmNlLXRhYnMnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRlZmF1bHRBY3RpdmVUYWIgPSAxO1xuICAgICAgfVxuXG4gICAgICAkKFwiLmFtYV9fdGFicywgLmFtYV9fcmVzb3VyY2UtdGFic1wiKS50YWJzKHtcbiAgICAgICAgYWN0aXZlOiBkZWZhdWx0QWN0aXZlVGFiLFxuICAgICAgICBhY3RpdmF0ZTogcmVtb3ZlSGlnaGxpZ2h0c1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFByZXZlbnQganVtcCBvbmNsaWNrXG4gICAgICAkKCcudWktdGFicy1hbmNob3InKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vU2ltdWxhdGUgY2xpY2sgZXZlbnQgb24gYWN0dWFsIHNpbXBsZVRhYnMgdGFiIGZyb20gbW9iaWxlIGRyb3AgZG93bi5cbiAgICAgICQoJy5hbWFfX3RhYnMtbmF2aWdhdGlvbi0tbW9iaWxlIHNlbGVjdCcpLm9uKFwic2VsZWN0bWVudWNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZFZhbHVlID0gdWkuaXRlbS52YWx1ZTtcbiAgICAgICAgJCgnYVtocmVmPVwiIycgKyBzZWxlY3RlZFZhbHVlICsgJ1wiXScpLmNsaWNrKCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gV2hlbiBjbGlja2luZyBhbiBpbmxpbmUgcmVzb3VyY2UgcGFnZSBsaW5rIHJlZmVyZW5jaW5nIGEgdGFiLCBvcGVuIHJlZmVyZW5jZWQgdGFiLlxuICAgICAgJCgnLmFtYV9fcmVzb3VyY2UtbGluay0taW5saW5lLCAuYW1hX19wYWdlLS1yZXNvdXJjZV9fcmVzb3VyY2UtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciAkdGFicyA9ICQoJy5hbWFfX3Jlc291cmNlLXRhYnMnKTtcbiAgICAgICAgc3dpdGNoVGFicygkdGFicywgdGhpcyk7XG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gcmVtb3ZlSGlnaGxpZ2h0cygpIHtcbiAgICAgICAgJCgnLmFtYV9yZXNvdXJjZS1oZWFkZXItLWhpZ2hsaWdodCcpLnJlbW92ZUNsYXNzKCdhbWFfcmVzb3VyY2UtaGVhZGVyLS1oaWdobGlnaHQnKTtcbiAgICAgIH1cblxuICAgICAgLypcbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gYW5pbWF0ZXMgdGhlIGJyb3dzZXIgc2Nyb2xsIGFjdGlvbiB3aXRoIGF0dGVudGlvbiB0byBrZXlib2FyZCBvbmx5IGFjY2Vzc2liaWxpdHkgY29uY2VybnNcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICR0YWJOYXZcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5IE9iamVjdH0gJHRhcmdldFxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoJHRhYk5hdiwgdGFiSGFzaCwgcG9zaXRpb25JblRhYikge1xuICAgICAgICB2YXIgc2Nyb2xsVGFyZ2V0ID0gd2luZG93LmlubmVyV2lkdGggPj0gMTIwMCA/ICcuYW1hX19yZXNvdXJjZS10YWJzX19jb250ZW50JyA6ICdodG1sLGJvZHknO1xuXG4gICAgICAgIC8vIFJlbW92ZSBwcmV2aW91cyBoaWdobGlnaHRzLCBpZiBhbnlcbiAgICAgICAgcmVtb3ZlSGlnaGxpZ2h0cygpO1xuXG4gICAgICAgIC8vIFRyeSB0byBmaW5kIHRhcmdldCBlbGVtZW50IG9mZnNldCwgYnV0IGRlZmF1bHQgdG8gemVyb1xuICAgICAgICB2YXIgc2Nyb2xsUG9zaXRpb24gPSAwO1xuICAgICAgICB2YXIgJHRhcmdldDtcbiAgICAgICAgaWYgKHBvc2l0aW9uSW5UYWIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciB0YWJFbGVtZW50cyA9ICQodGFiSGFzaCArICcgLmFtYV9fcmVzb3VyY2UtdGFic19faXRlbScpO1xuICAgICAgICAgIGlmICh0YWJFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIElmIGRlc2lyZWQgcG9zaXRpb24gaXMgbGFyZ2VyIHRoYW4gdGhlIHJlc3VsdCBzZXQsIHVzZSB0aGUgbGFzdCBlbGVtZW50XG4gICAgICAgICAgICBpZiAodGFiRWxlbWVudHMubGVuZ3RoIDw9IHBvc2l0aW9uSW5UYWIpIHtcbiAgICAgICAgICAgICAgcG9zaXRpb25JblRhYiA9IHRhYkVsZW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVzZXJzIGFyZSBpbnN0cnVjdGVkIHRvIGNvbnNpZGVyIDEgYXMgdGhlIGZpcnN0IGVsZW1lbnRcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0YWJFbGVtZW50c1twb3NpdGlvbkluVGFiIC0gMV07XG4gICAgICAgICAgICBzY3JvbGxQb3NpdGlvbiA9IHRhcmdldC5vZmZzZXRUb3A7XG4gICAgICAgICAgICAvLyBBZGQgaGlnaGxpZ2h0IHRvIHRhcmdldFxuICAgICAgICAgICAgJHRhcmdldCA9ICQodGFyZ2V0KS5maW5kKCcuYW1hX3Jlc291cmNlLWhlYWRlcicpOyAvLyBzYXZlIGZvciB1c2UgaW4gYW5pbWF0ZSgpIGNhbGxiYWNrXG4gICAgICAgICAgICAkdGFyZ2V0LmFkZENsYXNzKCdhbWFfcmVzb3VyY2UtaGVhZGVyLS1oaWdobGlnaHQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHRhcmdldCA9ICQodGFiSGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICQoc2Nyb2xsVGFyZ2V0KS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFBvc2l0aW9uXG4gICAgICAgIH0sIDg1MCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIFVwZGF0ZSBmb2N1cyBmb3Iga2V5Ym9hcmQgb25seSBuYXZpZ2F0aW9uXG4gICAgICAgICAgJHRhcmdldC5hdHRyKCd0YWJpbmRleCcsICctMScpLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgKiBUaGlzIGZ1bmN0aW9uIG9wZW5zIHJlZmVyZW5jZWQgdGFicyBmcm9tIGlubGluZSBsaW5rc1xuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5IE9iamVjdH0gJHRhYk9iaiBUaGUgZWxlbWVudCB3aGljaCBoYXMgdGhlIC50YWIoKSBmdW5jdGlvbiBhdHRhY2hlZC5cbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gbGlua1xuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBzd2l0Y2hUYWJzKCR0YWJPYmosIGxpbmspIHtcblxuICAgICAgICB2YXIgbGlua0hhc2ggPSBsaW5rLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgICAgIHZhciB3aWRnZXQgPSAkdGFiT2JqLmRhdGEoJ3VpLXRhYnMnKTtcblxuICAgICAgICB2YXIgdGFiSGFzaCwgcG9zaXRpb25JblRhYjtcbiAgICAgICAgdmFyIHBhcnRzID0gbGlua0hhc2guc3BsaXQoJy0nKTtcbiAgICAgICAgdGFiSGFzaCA9IHBhcnRzWzBdO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHBvc2l0aW9uSW5UYWIgPSBwYXJ0c1sxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBvbGQgbGluaywgdHJ5IHRvIGRldGVybWluZSBwb3NpdGlvbiBmcm9tIGxpbmsgdGV4dFxuICAgICAgICAgIHZhciBtYXRjaGVzID0gbGluay5pbm5lclRleHQubWF0Y2goLyhbMC05XSspL2cpO1xuICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICBwb3NpdGlvbkluVGFiID0gbWF0Y2hlcy5zaGlmdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVuc3VyZSBjb3JyZWN0IHRhYiBpcyBhY3RpdmVcbiAgICAgICAgdmFyIHRhYkluZGV4ID0gd2lkZ2V0Ll9nZXRJbmRleCh0YWJIYXNoKTtcbiAgICAgICAgJHRhYk9iai50YWJzKHtcbiAgICAgICAgICBhY3RpdmU6IHRhYkluZGV4XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNjcm9sbCB0byB0b3Agb2YgdWkgdGFicyBuYXZpZ2F0aW9uXG4gICAgICAgIHNtb290aFNjcm9sbCgkdGFiT2JqLCB0YWJIYXNoLCBwb3NpdGlvbkluVGFiKTtcblxuICAgICAgICAvLyBTdG9wIGJ1YmJsaW5nIGFuZCBkZWZhdWx0IGFjdGlvbnNcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qPT09PT09IGpRdWVyeSBVSSBhY2NvcmRpb24gPT09PT09Ki9cblxuKGZ1bmN0aW9uKCQpIHtcbiAgICAkKCBcIi5hbWFfX2FjY29yZGlvblwiICkuYWNjb3JkaW9uKHtcbiAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiLFxuICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgIH0pO1xufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIHZhciB2ZXJpZnlGaWVsZHMgPSBmdW5jdGlvbihmb3JtKSB7XG4gICAgdmFyICRzZWN0aW9ucyA9IGZvcm0uZmluZCgnc2VjdGlvbicpO1xuICAgIHZhciAkaW5wdXRzID0gJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIHNlY3Rpb24gKicpLmZpbHRlcignOmlucHV0Jyk7XG4gICAgdmFyICRpY29uRWxlbWVudCA9ICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKTtcbiAgICB2YXIgZXJyb3JTZWN0aW9ucyA9IFtdO1xuXG4gICAgJGlucHV0cy5lYWNoKGZ1bmN0aW9uKGksIGlucHV0KSB7XG4gICAgICAkY2xvc2VzdFNlY3Rpb24gPSAkKHRoaXMpLmNsb3Nlc3QoJ3NlY3Rpb24nKS5hdHRyKCdkYXRhLWRydXBhbC1zZWxlY3RvcicpLnRvU3RyaW5nKCk7XG4gICAgICBpZiAoJCh0aGlzKS5wcm9wKCdyZXF1aXJlZCcpICYmICQodGhpcykuaGFzQ2xhc3MoJ2Vycm9yJykpIHtcbiAgICAgICAgZXJyb3JTZWN0aW9ucy5wdXNoKCRjbG9zZXN0U2VjdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkc2VjdGlvbnMuZWFjaChmdW5jdGlvbihpLCBzZWN0aW9uKSB7XG4gICAgICBpZiAoJC5pbkFycmF5KCQodGhpcykuYXR0cignZGF0YS1kcnVwYWwtc2VsZWN0b3InKS50cmltKCkudG9TdHJpbmcoKSwgZXJyb3JTZWN0aW9ucykgIT09IC0xKSB7XG4gICAgICAgICQodGhpcykuZmluZCgkaWNvbkVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlZGl0IGVycm9yIGNvbXBsZXRlZCcpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICQodGhpcykuZmluZCgkaWNvbkVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlZGl0IGVycm9yIGNvbXBsZXRlZCcpLmFkZENsYXNzKCdjb21wbGV0ZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBmdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKGVtYWlsKSB7XG4gICAgdmFyIGVtYWlsUmVnID0gL14oW1xcdy1cXC5dK0AoW1xcdy1dK1xcLikrW1xcdy1dezIsNH0pPyQvO1xuICAgIHJldHVybiBlbWFpbFJlZy50ZXN0KGVtYWlsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpZWxkSXNSZXF1aXJlZChpbnB1dCkge1xuICAgIGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xuICAgIGlucHV0Lm5leHQoKS5yZW1vdmUoJy5mb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2UnKTtcbiAgICBpbnB1dC5hZnRlcignPGRpdiBjbGFzcz1cImZvcm0taXRlbS0tZXJyb3ItbWVzc2FnZVwiPkZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tGaWVsZChpbnB1dCkge1xuICAgIGlmIChpbnB1dC5wcm9wKCdyZXF1aXJlZCcpICYmIChpbnB1dC52YWwoKS5sZW5ndGggPT09IDAgfHwgaW5wdXQudmFsKCkgPT09IFwiXCIpKSB7XG4gICAgICBmaWVsZElzUmVxdWlyZWQoaW5wdXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmIChpbnB1dC5hdHRyKCd0eXBlJykgPT09ICdlbWFpbCcgJiYgIXZhbGlkYXRlRW1haWwoaW5wdXQudmFsKCkpKSB7XG4gICAgICAgIGZpZWxkSXNSZXF1aXJlZChpbnB1dCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaW5wdXQucmVtb3ZlQ2xhc3MoJ2Vycm9yJykubmV4dCgpLnJlbW92ZSgnLmZvcm0taXRlbS0tZXJyb3ItbWVzc2FnZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFN1Ym1pdHMgZmlyc3QgcGFnZSBvZiBDb250YWN0IFVzIGZvcm0gb24gcmFkaW8gYnV0dG9uIHNlbGVjdGlvblxuICAkLmZuLmNvbnRhY3RTdWJtaXQgPSBmdW5jdGlvbigpe1xuICAgIHZhciAkd2ViZm9ybV9idXR0b25zID0gJCgnLndlYmZvcm0tc3VibWlzc2lvbi1jb250YWN0LXVzLWZvcm0gaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XG4gICAgJHdlYmZvcm1fYnV0dG9ucy5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tY29udGFjdC11cy1mb3JtJykuc3VibWl0KCk7XG4gICAgfSk7XG4gIH1cbiAgJC5mbi5jb250YWN0U3VibWl0KCk7XG4gICQoIGRvY3VtZW50ICkuYWpheENvbXBsZXRlKGZ1bmN0aW9uKCkge1xuICAgICQuZm4uY29udGFjdFN1Ym1pdCgpO1xuICB9KTtcblxuICAvLyBHbyBiYWNrIHRvIHByZXZpb3VzIGJhY2sgaXMgdXNlciBjbGlja3MgZGVjbGluZSBzdWJtaXQgYnV0dG9uXG4gICQoJy5hbWFfX2J1dHRvbi0tZGVjbGluZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIgPT09IFwiXCIpIHtcbiAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWY9Jy8nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhpc3RvcnkuYmFjaygpO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGluaXRpYWxMb2FkID0gdHJ1ZTtcblxuICBEcnVwYWwuYmVoYXZpb3JzLndlYkZvcm0gPSB7XG4gICAgZGV0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MsIHRyaWdnZXIpIHtcbiAgICAgIGlmICh0cmlnZ2VyID09PSAnc2VyaWFsaXplJykge1xuICAgICAgICBpbml0aWFsTG9hZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIGlmICghaW5pdGlhbExvYWQpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0LmlubmVyVGV4dC5tYXRjaChcIkVycm9yIG1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAkKCcuYW1hX19zYWxlcy1sYW5kaW5nLXBhZ2VfX2Zvcm1fX2hlYWRpbmcnKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJC52YWxpZGF0b3IuYWRkTWV0aG9kKFxuICAgICAgICBcInJlZ2V4XCIsXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlLCBlbGVtZW50LCByZWdleHApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25hbChlbGVtZW50KSB8fCByZWdleHAudGVzdCh2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIFwiUGxlYXNlIGNoZWNrIHlvdXIgaW5wdXQuXCJcbiAgICAgICk7XG5cbiAgICAgIC8vIE9uIHdlYmZvcm0gc3VibWl0IGNoZWNrIHRvIHNlZSBpZiBhbGwgaW5wdXRzIGFyZSB2YWxpZFxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtJykudmFsaWRhdGUoe1xuICAgICAgICBpZ25vcmU6IFtdLFxuICAgICAgICBydWxlczoge1xuICAgICAgICAgICdlbWFpbCc6IHtcbiAgICAgICAgICAgIGVtYWlsOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICAndGVsZXBob25lJzoge1xuICAgICAgICAgICAgJ3JlZ2V4JzogL14oXFwrXFxkezEsMn1cXHMpP1xcKD9cXGR7M31cXCk/W1xccy4tXT9cXGR7M31bXFxzLi1dP1xcZHs0fSQvXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnYmlydGhfeWVhcic6IHtcbiAgICAgICAgICAgICdyZWdleCc6IC9eKDE5fDIwKVxcZHsyfSQvXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24oZXJyb3IsIGVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAoZWxlbWVudC5hdHRyKFwidHlwZVwiKSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50LnBhcmVudCgpLnNpYmxpbmdzKCkubGFzdCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZWxlbWVudC5pcyhcInNlbGVjdFwiKSkge1xuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudC5uZXh0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0sIHZhbGlkYXRvcikge1xuICAgICAgICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0b3IubnVtYmVyT2ZJbnZhbGlkcygpO1xuICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZigkKCcuanMtZm9ybS10eXBlLXJhZGlvJykuZmluZCgnbGFiZWwuZXJyb3InKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICQoJy5qcy1mb3JtLXR5cGUtcmFkaW8gbGFiZWwuZXJyb3InKS5wYXJlbnRzKCcuZmllbGRzZXQtd3JhcHBlcicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBpbnB1dHMgYXJlIHZhbGlkXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBsYWJlbC5lcnJvcicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYoICQodGhpcykudGV4dCgpICE9PSAnJykge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEFkZCB2YWxpZGF0aW9uIHRvIHNlbGVjdCBkcm9wZG93biBtZW51cyB1c2luZyBqUXVlcnkgVUlcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBzZWxlY3QnKS5zZWxlY3RtZW51KHtcbiAgICAgICAgc3R5bGU6ICdkcm9wZG93bicsXG4gICAgICAgIHRyYW5zZmVyQ2xhc3NlczogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJChcIi53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybVwiKS52YWxpZGF0ZSgpLmVsZW1lbnQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfbWFpbk5hdmlnYXRpb24gPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgdmFyICRjYXRlZ29yeU5hdldyYXBwZXIgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fd3JhcHBlcicpLFxuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnUnKSxcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2dyb3VwJyksXG4gICAgICAgICAgJG1vYmlsZVNlYXJjaFRyaWdnZXIgPSAkKCcuZ2xvYmFsLXNlYXJjaC10cmlnZ2VyJyksXG4gICAgICAgICAgJG1vYmlsZVNlYXJjaCA9ICQoJy5hbWFfX2dsb2JhbC1zZWFyY2gnKSxcbiAgICAgICAgICAkbWFpbk5hdiA9ICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAnKSxcbiAgICAgICAgICAkc3ViTWVudSA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19zdWJtZW51JyksXG4gICAgICAgICAgJHN1Yk1lbnVBcnRpY2xlID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2FydGljbGVzJyksXG4gICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSAwLFxuICAgICAgICAgIHByb2R1Y3ROYXZIZWlnaHQgPSAwLFxuICAgICAgICAgIGNhdGVnb3J5TmF2TWVudUhlaWdodCA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51Jykub3V0ZXJIZWlnaHQoKSxcbiAgICAgICAgICBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0ID0gMCxcbiAgICAgICAgICB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpLFxuICAgICAgICAgICRhbGVydF9iYW5uZXIgPSAkKCcuYW1hX19hbGVydF9fd3JhcCcpO1xuXG4gICAgICAvLyBDaGVja3MgaWYgdXNlciBhZ2VudCBpcyBhIG1vYmlsZSBkZXZpY2VcbiAgICAgIHZhciBkZXZpY2VBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhciBhZ2VudElEID0gZGV2aWNlQWdlbnQubWF0Y2goLyhhbmRyb2lkfHdlYm9zfGlwaG9uZXxpcG9kfGJsYWNrYmVycnkpLykgJiYgd2luZG93V2lkdGggPCA3Njg7XG5cbiAgICAgIC8vIFNldCBhbGVydCBiYW5uZXIgaGVpZ2h0IGlmIHByZXNlbnQuXG4gICAgICBpZigkYWxlcnRfYmFubmVyLmxlbmd0aCAmJiAkYWxlcnRfYmFubmVyLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgIGFsZXJ0QmFubmVySGVpZ2h0ID0gJGFsZXJ0X2Jhbm5lci5vdXRlckhlaWdodCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnRCYW5uZXJIZWlnaHQgPSAwO1xuICAgICAgfVxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGV0aGVyIG9yIG5vdCB0aGUgY2F0ZWdvcnkgbmF2IHNob3VsZCBoYXZlIHNjcm9sbGJhcnNcbiAgICAgIGZ1bmN0aW9uIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KSB7XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHZpZXdwb3J0IGhlaWdodCBpcyBwYXNzZWQgYmFjayB3aGVuIHRoZSB3aW5kb3cgZ2V0cyByZXNpemVkXG4gICAgICAgIGlmKHR5cGVvZiByZXNpemVWaWV3cG9ydEhlaWdodCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHJlc2l6ZVZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFdpbmRvdyBoZWlnaHQgaXMgdXNlZCBieSBkZWZhdWx0XG4gICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdWJ0cmFjdCB0aGUgbmF2aWdhdGlvbiBoZWlnaHQgZnJvbSB3aW5kb3cgaGVpZ2h0IHRvIGFzc2VzcyBjb250ZW50IGhlaWdodFxuICAgICAgICBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBtYWluIG1lbnUgcHVycGxlIGRyb3Bkb3duIGhlaWdodCBpcyBsYXJnZXIgdGhhbiB2aWV3cG9ydCBoZWlnaHRcbiAgICAgICAgaWYgKGNhdGVnb3J5TmF2TWVudUhlaWdodCArICRtYWluTmF2Lm91dGVySGVpZ2h0KCkgKyBwcm9kdWN0TmF2SGVpZ2h0ID4gdmlld3BvcnRIZWlnaHQgJiYgIWFnZW50SUQpIHtcblxuICAgICAgICAgIC8vIFNldCB0aGUgbWVudSBkcm9wZG93biB0aGUgc2FtZSBhcyB2aWV3cG9ydCB0byBlbmFibGUgc2Nyb2xsaW5nXG4gICAgICAgICAgdmFyIGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQgPSBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0IC0gJG1haW5OYXYub3V0ZXJIZWlnaHQoKSAtIHByb2R1Y3ROYXZIZWlnaHQgLSBhbGVydEJhbm5lckhlaWdodDtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLmFkZENsYXNzKCdzY3JvbGwnKS5vdXRlckhlaWdodChjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKTtcblxuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAub24oJ3Nob3cuc21hcGknLCBmdW5jdGlvbihlLCBtZW51KSB7XG4gICAgICAgICAgICBpZigkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fc3VibWVudScsIG1lbnUpLm91dGVySGVpZ2h0KCkgPiBjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19zdWJtZW51JywgbWVudSkub3V0ZXJIZWlnaHQoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19hcnRpY2xlcycsIG1lbnUpLm91dGVySGVpZ2h0KCkgPiBjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19hcnRpY2xlcycsIG1lbnUpLm91dGVySGVpZ2h0KGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpLmFkZENsYXNzKCdvbmVfYXJ0aWNsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAucmVtb3ZlQ2xhc3MoJ3Njcm9sbCcpLm91dGVySGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgJHN1Yk1lbnUub3V0ZXJIZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAkc3ViTWVudUFydGljbGUub3V0ZXJIZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIC8vIEhpZGUvU2hvdyBtZW51XG4gICAgICBmdW5jdGlvbiBoaWRlU2hvdygpIHtcbiAgICAgICAgaWYgKCQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51LnNsaWRlRG93bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoKGNhdGVnb3J5TmF2TWVudUhlaWdodCArICAkbWFpbk5hdi5vdXRlckhlaWdodCgpICsgcHJvZHVjdE5hdkhlaWdodCArIGFsZXJ0QmFubmVySGVpZ2h0KSA+IHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgICAgICAgIGJvZHlTY3JvbGxMb2NrLmRpc2FibGVCb2R5U2Nyb2xsKCRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAsIHtcbiAgICAgICAgICAgICAgICBhbGxvd1RvdWNoTW92ZTogZnVuY3Rpb24gYWxsb3dUb3VjaE1vdmUoZWwpIHtcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChlbCAmJiBlbCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdib2R5LXNjcm9sbC1sb2NrLWlnbm9yZScpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhZ2VudElEKSB7XG4gICAgICAgICAgICAgIC8vIE9ubHkgbWFrZSB0aGUgbWVudSBoZWlnaHQgc2FtZSBhcyB2aWV3cG9ydCBvbiBtb2JpbGUgZGV2aWNlc1xuICAgICAgICAgICAgICB2YXIgbW9iaWxlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICAgICAgICAkY2F0ZWdvcnlOYXZXcmFwcGVyLmhlaWdodChtb2JpbGVIZWlnaHQpLmFkZENsYXNzKCdzY3JvbGwnKTtcblxuICAgICAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLm9uKCdzaG93LnNtYXBpJywgZnVuY3Rpb24oZSwgbWVudSkge1xuICAgICAgICAgICAgICAgIGlmKCQobWVudSkub3V0ZXJIZWlnaHQoKSA+IG1vYmlsZUhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgJChtZW51KS5vdXRlckhlaWdodChtb2JpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgICAgIGNhdGVnb3J5TmF2SGVpZ2h0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuc2xpZGVVcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhlaWdodCgwKTtcbiAgICAgICAgICAgIGJvZHlTY3JvbGxMb2NrLmNsZWFyQWxsQm9keVNjcm9sbExvY2tzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ2xvc2VzIG1lbnUgb24gZG9jIGxvYWRcbiAgICAgICQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZUdsb2JhbE1lbnVBY3RpdmF0ZShlKSB7XG4gICAgICAgIC8vIEZvciBrZXlkb3duLCBvbmx5IGFjdCBvbiBFbnRlciBvciBTcGFjZVxuICAgICAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgICAgICBpZiAoIShlLmtleSA9PT0gJ0VudGVyJyB8fCBlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAzMikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHZhciAkY2hlY2tib3ggPSAkKCcjZ2xvYmFsLW1lbnUnKTtcbiAgICAgICAgICAkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsICEkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBGb3IgY2xpY2ssIGp1c3QgdG9nZ2xlIGlmIG5vdCBhbHJlYWR5IGhhbmRsZWRcbiAgICAgICAgaWYgKGUudHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgIHZhciAkY2hlY2tib3ggPSAkKCcjZ2xvYmFsLW1lbnUnKTtcbiAgICAgICAgICAkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsICEkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpKTtcbiAgICAgICAgfVxuICAgICAgICBoaWRlU2hvdygpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuXG4gICAgICAkKCcuYW1hX19nbG9iYWwtbWVudScpLm9uKCdjbGljayBrZXlkb3duJywgaGFuZGxlR2xvYmFsTWVudUFjdGl2YXRlKTtcblxuICAgICAgJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2dyb3VwID4gLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3NlY3Rpb24gPiBhJykub24oJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIEVzY2FwZSBpcyBwcmVzc2VkIGFuZCBmb2N1cyBpcyBvbiB0aGUgdWwgaXRzZWxmXG4gICAgICAgIGlmICgoZS5rZXkgPT09ICdFc2NhcGUnIHx8IGUua2V5Q29kZSA9PT0gMjcpICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMpIHtcbiAgICAgICAgICAkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgIGhpZGVTaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIENsZWFyIHNlYXJjaCBpbnB1dCBvbiBtYWluIG5hdiBvbiBzZWFyY2ggcGFnZVxuICAgICAgICBpZih3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcIi9zZWFyY2hcIikpIHtcbiAgICAgICAgICB2YXIgJHNlYXJjaElucHV0ID0gJChcImZvcm1baWQ9J2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaC1zb2xycGFnZSddXCIpLmZpbmQoXCJpbnB1dFtuYW1lPSdzZWFyY2gnXVwiKTtcbiAgICAgICAgICBpZigkc2VhcmNoSW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAkc2VhcmNoSW5wdXQudmFsKCcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZiBzdGlja3kgbmF2IHdyYXBwZXIsIHJlbW92ZSBpZCB0byBwcmV2ZW50IGR1cGxpY2F0ZSBpZHMuXG4gICAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHN0aWNreVdyYXBwZXIgPSAkKCdoZWFkZXIuc3RpY2t5LW5hdicpO1xuICAgICAgICBpZigkc3RpY2t5V3JhcHBlci5sZW5ndGggJiYgJHN0aWNreVdyYXBwZXIuaGFzKCcjc2hhcmUtd3JhcHBlcicpKSB7XG4gICAgICAgICAgJHN0aWNreVdyYXBwZXIucmVtb3ZlQXR0cignaWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIGEgdXNlciBjbGlja3Mgb3V0c2lkZSB0aGUgbWVudSB0aGVuIGNsb3NlIGl0XG4gICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoISRjYXRlZ29yeU5hdmlnYXRpb25NZW51LmlzKGUudGFyZ2V0KSAmJiAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgaGlkZVNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJG1vYmlsZVNlYXJjaFRyaWdnZXIpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtb2JpbGVTZWFyY2guc2xpZGVUb2dnbGUoXCJmYXN0XCIsIFwibGluZWFyXCIpO1xuICAgICAgICAkbW9iaWxlU2VhcmNoVHJpZ2dlci50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgICAkKCcjZWRpdC1zZWFyY2gnKS5mb2N1cygpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vU2V0IGZvY3VzIHN0YXRlIG9uIG1vYmlsZSB0cmlnZ2VyIGJ1dHRvblxuICAgICAgJCgkbW9iaWxlU2VhcmNoVHJpZ2dlcikuZm9jdXMoZnVuY3Rpb24oKXtcbiAgICAgICAgJG1vYmlsZVNlYXJjaFRyaWdnZXIuY3NzKCdvdXRsaW5lJywgJ291dGxpbmU6IDJweCBzb2xpZCAjODBkNGY1Jyk7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gbW92ZVNvY2lhbFNoYXJlUG9zaXRpb24oKXtcbiAgICAgICAgdmFyIG1haW5OYXZQb3NpdGlvbiA9ICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAuY29udGFpbmVyJykub2Zmc2V0KCkubGVmdDtcbiAgICAgICAgdmFyIGZpeGVkQ2xhc3MgPSAnYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJztcbiAgICAgICAgdmFyICRhbWFTb2NpYWxTaGFyZSA9ICQoJy5hbWFfX3NvY2lhbC1zaGFyZScpO1xuICAgICAgICB2YXIgJGFtYVNoYXJlQ29udGFpbmVyID0gJChcIi5hbWFfX2NhdGVnb3J5IC5hbWFfX21hc3RoZWFkX19jb250ZW50X19jb250YWluZXIsIC5hbWFfX3N1YmNhdGVnb3J5LWluZGV4IC5zaGFyZS1yb3dcIik7XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHZpZXdwb3J0IHdpZHRoIGlzIGdyZWF0ZXIgdGhhbiA4NTBweC5cbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gODUwKSB7XG4gICAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBlbm91Z2ggZm9yIHRoZSBzdGlja3kgbmF2XG4gICAgICAgICAgaWYobWFpbk5hdlBvc2l0aW9uID4gNjApIHtcblxuICAgICAgICAgICAgdmFyIHNvY2lhbFN0aWNreVBvc2l0aW9uID0gbWFpbk5hdlBvc2l0aW9uIC0gNjA7XG4gICAgICAgICAgICB2YXIgJHNvY2lhbEljb25zID0gJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJyk7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB2aWV3cG9ydCB3aWR0aCBpcyBncmVhdGVyIDg1MHB4IHRoZW4gdGhlIHNvY2lhbCBpY29ucyB3aWxsIGJlIHN0aWNreVxuICAgICAgICAgICAgaWYoJHNvY2lhbEljb25zLmxlbmd0aCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDg1MCkge1xuICAgICAgICAgICAgICAkc29jaWFsSWNvbnMuc3RpY2t5KHtcbiAgICAgICAgICAgICAgICB3cmFwcGVyQ2xhc3NOYW1lOiAnYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUtd3JhcHBlcicsXG4gICAgICAgICAgICAgICAgekluZGV4OiA1MDBcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgJHNvY2lhbEljb25zLm9uKCdzdGlja3ktc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJGFtYVNoYXJlQ29udGFpbmVyLmNzcygndmlzaWJpbGl0eScsJ3Zpc2libGUnKTtcbiAgICAgICAgICAgICAgICAkYW1hU29jaWFsU2hhcmUuYWRkQ2xhc3MoZml4ZWRDbGFzcykuY3NzKCdsZWZ0Jywgc29jaWFsU3RpY2t5UG9zaXRpb24pLmhpZGUoKS5mYWRlVG8oJ3Nsb3cnLCAxKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgJHNvY2lhbEljb25zLm9uKCdzdGlja3ktdXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRhbWFTb2NpYWxTaGFyZS5hZGRDbGFzcyhmaXhlZENsYXNzKS5oaWRlKCkuZmFkZVRvKCdzbG93JywgMSk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICRzb2NpYWxJY29ucy5vbignc3RpY2t5LWVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkYW1hU2hhcmVDb250YWluZXIuY3NzKCd2aXNpYmlsaXR5JywnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgJCgnLmFtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLnJlbW92ZUNsYXNzKGZpeGVkQ2xhc3MpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRW5zdXJlIHZpc2liaWxpdHkgaXMgaGlkZGVuIG9uIG1vYmlsZS5cbiAgICAgICAgICAkYW1hU2hhcmVDb250YWluZXIuY3NzKCd2aXNpYmlsaXR5JywnaGlkZGVuJyk7XG4gICAgICAgICAgJGFtYVNvY2lhbFNoYXJlLnJlbW92ZUNsYXNzKGZpeGVkQ2xhc3MpLmNzcygnbGVmdCcsICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJbml0aWFsaXplIGdldFNvY2lhbFNoYXJlKClcbiAgICAgIG1vdmVTb2NpYWxTaGFyZVBvc2l0aW9uKCk7XG5cbiAgICAgIC8vIE9uc2Nyb2xsIGNoZWNrIHRvIHNlZSBpZiBzb2NpYWwgaWNvbiBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gZm9vdGVyIHBvc2l0aW9uXG4gICAgICB2YXIgZGVib3VuY2VfdGltZXI7XG4gICAgICBpZigkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUgLmFtYV9fc29jaWFsLXNoYXJlJykuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgJHNvY2lhbEljb25zID0gJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlIC5hbWFfX3NvY2lhbC1zaGFyZScpO1xuICAgICAgICAgIHZhciBzb2NpYWxJY29uUG9zaXRpb25Cb3R0b20gPSAkc29jaWFsSWNvbnMub2Zmc2V0KCkudG9wICsgJHNvY2lhbEljb25zLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgdmFyIGZvb3RlclBvc2l0aW9uID0gJCgnZm9vdGVyJykub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgaWYoZGVib3VuY2VfdGltZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoZGVib3VuY2VfdGltZXIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRlYm91bmNlX3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZihzb2NpYWxJY29uUG9zaXRpb25Cb3R0b20gPiBmb290ZXJQb3NpdGlvbikge1xuICAgICAgICAgICAgICAkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUnKS5mYWRlT3V0KCdmYXN0Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUnKS5mYWRlSW4oJ2Zhc3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG5cbiAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXNpemVWaWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCA/IHdpbmRvdy5pbm5lckhlaWdodCA6ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQocmVzaXplVmlld3BvcnRIZWlnaHQpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vQ2hlY2tzIHRoZSBsYXlvdXQgcG9zaXRpb24gb2YgYXJ0aWNsZSBvbiB3aW5kb3cgcmVzaXplIGFuZCBtb3ZlcyB0aGUgc29jaWFsIGljb25zIGFjY29yZGluZ2x5XG4gICAgICAkKCB3aW5kb3cgKS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghYWdlbnRJRCkge1xuICAgICAgICAgIHZhciByZXNpemVWaWV3cG9ydEhlaWdodCA9ICQod2luZG93KS5pbm5lckhlaWdodCgpO1xuICAgICAgICAgIHZhciBtYWluTmF2UG9zaXRpb25VcGRhdGUgPSAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gLmNvbnRhaW5lcicpLm9mZnNldCgpLmxlZnQgLSAxMDA7XG5cbiAgICAgICAgICBjYXRlZ29yeU5hdkhlaWdodChyZXNpemVWaWV3cG9ydEhlaWdodCk7XG4gICAgICAgICAgJCgnLmFtYV9fc29jaWFsLXNoYXJlLmFtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmNzcygnbGVmdCcsIG1haW5OYXZQb3NpdGlvblVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvL0lmIGVtcHR5IG9yIG90aGVyd2lzZSB1bnBvcHVsYXRlZCBzZWFyY2ggZmllbGQgKGkuZSBzcGFjZXMgb25seSlcbiAgICAgIC8vcHJldmVudCBzZWFyY2ggZnJvbSBzdWJtaXR0aW5nIGFuZCByZWxvYWQgY3VycmVudCBwYWdlXG4gICAgICB2YXIgc2VhcmNoRm9ybSA9ICQoXCJmb3JtW2lkXj0nYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNoLXNvbHJwYWdlJ11cIik7XG5cbiAgICAgICQoc2VhcmNoRm9ybSwgdGhpcykuc3VibWl0KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgc2VhcmNoSW5wdXQgPSAkKHRoaXMpLmZpbmQoXCJpbnB1dFtuYW1lKj0nc2VhcmNoJ11cIik7XG5cbiAgICAgICAgICAvL1RyaW0gYW5kIGNoZWNrIGlmIHNlYXJjaCBpbnB1dCBoYXMgYW55IHZhbHVlXG4gICAgICAgICAgaWYgKCQudHJpbShzZWFyY2hJbnB1dC52YWwoKSkubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIHNlYXJjaCB0ZXJtIGVudGVyZWQnKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vRW5zdXJlIG5vIHNwYWNlcyBiZWZvcmUgb3IgYWZ0ZXIgcXVlcnkgYXJlIGNvdW50ZWQgaW4gc2VhcmNoXG4gICAgICAgICAgJCh0aGlzKS5maW5kKHNlYXJjaElucHV0KS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvL1N1Ym1pdCB0cmltbWVkIHZhbHVlXG4gICAgICAgICAgICAkKHRoaXMpLnZhbCgkLnRyaW0oJCh0aGlzKS52YWwoKSkpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG5cblxuXG4iLCIvKipcbiAqIFNtYXJ0TWVudXMgalF1ZXJ5IFBsdWdpbiAtIHYxLjEuMCAtIFNlcHRlbWJlciAxNywgMjAxN1xuICogaHR0cDovL3d3dy5zbWFydG1lbnVzLm9yZy9cbiAqXG4gKiBDb3B5cmlnaHQgVmFzaWwgRGlua292LCBWYWRpa29tIFdlYiBMdGQuXG4gKiBodHRwOi8vdmFkaWtvbS5jb21cbiAqXG4gKiBMaWNlbnNlZCBNSVRcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCwgb25jZSkge1xuICAgIERydXBhbC5iZWhhdmlvcnMuY2F0ZWdvcnlNZW51QmVoYXZpb3IgPSB7XG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBvbmNlKCdjYXRlZ29yeU1lbnVCZWhhdmlvcicsICcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fZ3JvdXAnLCBjb250ZXh0KS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5zbWFydG1lbnVzKHtcbiAgICAgICAgICAgICAgICAgICAgc3ViSW5kaWNhdG9yc1BvczogJ2FwcGVuZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsLCBvbmNlKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEF0dGFjaGVzIGJlaGF2aW9yIHRvIGludGVyYWN0IHdpdGggdXNlciBzaWduIGluIG1lbnVcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgICBEcnVwYWwuYmVoYXZpb3JzLmFtYVNpZ25Jbk1lbnUgPSB7XG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBjb25zdCAkZHJvcGRvd25CbG9jayA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd24nKTtcbiAgICAgICAgICAgIGNvbnN0ICRkcm9wZG93blRyaWdnZXIgPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duX190cmlnZ2VyJyk7XG4gICAgICAgICAgICBjb25zdCAkZHJvcGRvd25NZW51ID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bl9fbWVudScpO1xuICAgICAgICAgICAgY29uc3QgJHNpZ25JbkxpbmsgPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duX190cmlnZ2VyX190ZXh0Jyk7XG4gICAgICAgICAgICBsZXQgaXNEcm9wZG93bk9wZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0dXBEcm9wRG93bihkcm9wZG93bkJsb2NrLCB0cmlnZ2VyRWxlbWVudCwgbWVudUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBkcm9wZG93bkJsb2NrLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEcm9wZG93bk9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlTWVudSh0cmlnZ2VyRWxlbWVudCwgbWVudUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3Blbk1lbnUodHJpZ2dlckVsZW1lbnQsIG1lbnVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpc0Ryb3Bkb3duT3BlbiA9ICFpc0Ryb3Bkb3duT3BlbjtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzaWduSW5MaW5rLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRkcm9wZG93bkJsb2NrLm9uKCdmb2N1c291dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkZHJvcGRvd25CbG9jay5oYXMoZXZlbnQucmVsYXRlZFRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU1lbnUoJGRyb3Bkb3duVHJpZ2dlciwgJGRyb3Bkb3duTWVudSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZHJvcGRvd25CbG9jay5pcyhlLnRhcmdldCkgJiYgZHJvcGRvd25CbG9jay5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VNZW51KHRyaWdnZXJFbGVtZW50LCBtZW51RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkcm9wZG93bkJsb2NrLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZHJvcGRvd25CbG9jay50aW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgIH0pLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bkJsb2NrLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VNZW51KHRyaWdnZXJFbGVtZW50LCBtZW51RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lbnVFbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghJChlLnRhcmdldCkuaXMoJ2EnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvcGVuTWVudShwYXJlbnRFbGVtZW50LCBtZW51RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICBtZW51RWxlbWVudC5zaG93KCkuYWRkQ2xhc3MoJ2FtYV9fc2lnbi1pbi1kcm9wZG93bl9fbWVudS0tb3BlbicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBjbG9zZU1lbnUocGFyZW50RWxlbWVudCwgbWVudUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIENvb2tpZXMuZ2V0KCdzaWduSW5DdGEnKSAhPT0gJzEnICkgQ29va2llcy5zZXQoJ3NpZ25JbkN0YScsICcxJyk7XG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgIG1lbnVFbGVtZW50LmhpZGUoKS5yZW1vdmVDbGFzcygnYW1hX19zaWduLWluLWRyb3Bkb3duX19tZW51LS1vcGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldHVwRHJvcERvd24oJGRyb3Bkb3duQmxvY2ssICRkcm9wZG93blRyaWdnZXIsICRkcm9wZG93bk1lbnUpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcblxuLyoqXG4gKiBAZmlsZVxuICogQXR0YWNoZXMgYmVoYXZpb3IgdG8gb3BlbiBkaXNtaXNzYWJsZSBzaWduLWluIG1lbnUgd2hlbiB2aXNpdGluZyB0aGUgc2l0ZVxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICAgIERydXBhbC5iZWhhdmlvcnMuc2lnbkluQ3RhID0ge1xuICAgICAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBoYXNOb0N0YUNvb2tpZSgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaWduSW5DdGFDb29raWUgPSBDb29raWVzLmdldCgnc2lnbkluQ3RhJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpZ25JbkN0YUNvb2tpZSAhPT0gJzEnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRDdGFDb21wbGV0ZWQoZSl7XG4gICAgICAgICAgICAgICAgQ29va2llcy5zZXQoJ3NpZ25JbkN0YScsICcxJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBiaW5kQ29tcGxldGVkRXZlbnRzKGRyb3Bkb3duQmxvY2spe1xuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHNldEN0YUNvbXBsZXRlZCk7XG4gICAgICAgICAgICAgICAgZHJvcGRvd25CbG9jay5vbignY2xpY2snLCBzZXRDdGFDb21wbGV0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gc3RhcnRDdGEoc2lnbkluRHJvcGRvd24sIHNpZ25JbkRyb3Bkb3duTWVudSl7XG4gICAgICAgICAgICAgICAgaWYgKGhhc05vQ3RhQ29va2llKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2lnbkluRHJvcGRvd24uYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2lnbkluRHJvcGRvd25NZW51LmFkZENsYXNzKCdhbWFfX3NpZ24taW4tZHJvcGRvd25fX21lbnUtLW9wZW4nKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25JbkRyb3Bkb3duLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduSW5Ecm9wZG93bk1lbnUucmVtb3ZlQ2xhc3MoJ2FtYV9fc2lnbi1pbi1kcm9wZG93bl9fbWVudS0tb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3RhQ29tcGxldGVkKClcbiAgICAgICAgICAgICAgICAgICAgfSwgNzAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgJGRyb3Bkb3duQmxvY2sgPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duJyk7XG4gICAgICAgICAgICBjb25zdCAkc2lnbkluRHJvcGRvd25UcmlnZ2VyID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bl9fdHJpZ2dlcicpO1xuICAgICAgICAgICAgY29uc3QgJHNpZ25JbkRyb3Bkb3duTWVudSA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX21lbnUnKTtcbiAgICAgICAgICAgIGJpbmRDb21wbGV0ZWRFdmVudHMoJGRyb3Bkb3duQmxvY2spXG4gICAgICAgICAgICBzdGFydEN0YSgkc2lnbkluRHJvcGRvd25UcmlnZ2VyLCAkc2lnbkluRHJvcGRvd25NZW51KVxuICAgICAgICB9XG4gICAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiAgIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfc2VhcmNoX2NoZWNrYm94ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciAkY2F0ZWdvcnlTZWFyY2hJbnB1dCA9ICQoJyNzZWFyY2hfY2F0ZWdvcnknKTtcbiAgICAgIHZhciAkY2F0ZWdvcnlTZWFyY2hMaXN0ID0gJCgnLmZhY2V0cy13aWRnZXQtY2hlY2tib3ggdWwgbGknKTtcbiAgICAgIHZhciAkY2xlYXJTZWFyY2hGaWx0ZXIgPSAkKCcjYXBwbGllZEZpbHRlcnNSZW1vdmUnKTtcblxuICAgICAgLy8gRmlsdGVyIGxpc3QgdXNpbmcgalF1ZXJ5IGZpbHRlclxuICAgICAgZnVuY3Rpb24gZmlsdGVyTGlzdChzZWFyY2hCb3gsIGxpc3QpIHtcbiAgICAgICAgc2VhcmNoQm94LmtleXVwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgJHJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnZhbHVlLCAnaScpO1xuICAgICAgICAgIGxpc3QuaGlkZSgpLmZpbHRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHJlZ2V4LnRlc3QoJC50cmltKCQodGhpcykudGV4dCgpKSk7XG4gICAgICAgICAgfSkuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xlYXIgZmlsdGVyXG4gICAgICBmdW5jdGlvbiBjbGVhZkZpbHRlckxpc3QoY2xlYXJTZWFyY2hGaWx0ZXIpIHtcbiAgICAgICAgY2xlYXJTZWFyY2hGaWx0ZXIuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJGNhdGVnb3J5U2VhcmNoSW5wdXQudmFsKCcnKTtcbiAgICAgICAgICAkY2F0ZWdvcnlTZWFyY2hJbnB1dC50cmlnZ2VyKCdrZXl1cCcpO1xuXG4gICAgICAgICAgJCgnLmZhY2V0cy13aWRnZXQtY2hlY2tib3ggdWwgbGkgW3R5cGU9Y2hlY2tib3hdJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICQoJyNibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2gtc29scnBhZ2UtMicpLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSW52b2tlIGZpbHRlciBsaXN0XG4gICAgICBmaWx0ZXJMaXN0KCRjYXRlZ29yeVNlYXJjaElucHV0LCAkY2F0ZWdvcnlTZWFyY2hMaXN0KTtcblxuICAgICAgLy8gSW52b2tlIGNsZWFyIGZpbHRlclxuICAgICAgY2xlYWZGaWx0ZXJMaXN0KCRjbGVhclNlYXJjaEZpbHRlcik7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogYnAgY2FsY3VsYXRvci5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gJ2Fub255bW91cyBjbG9zdXJlJy4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5icENhbGN1bGF0b3IgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgLy8gQ2xvbmUgbGFzdCByb3cgb2YgdGFibGVcbiAgICAgICQoJy5hZGQtYnAtcm93JykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciAkdGFibGVCb2R5ID0gJCgnI2JwQ2FsY3VsYXRvciB0YWJsZScpLmZpbmQoJ3Rib2R5JyksXG4gICAgICAgICAgJHRyTGFzdCA9ICR0YWJsZUJvZHkuZmluZCgndHI6bGFzdCcpLFxuICAgICAgICAgICR0ck5ldyA9ICR0ckxhc3QuY2xvbmUoKTtcblxuICAgICAgICAvLyBBcHBlbmQgbmV3IGNsYXNzIG5hbWUgdG8gY2xvbmVkIHJvd1xuICAgICAgICAkdHJMYXN0LmJlZm9yZSgkdHJOZXcpLmFkZENsYXNzKCdjbG9uZWQnKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XG5cbiAgICAgICAgLy8gQWRkIG5ldyBuYW1lIHdpdGggaW5kZXhcbiAgICAgICAgJHRhYmxlQm9keS5maW5kKCd0cjpsYXN0IGlucHV0JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyICR0cklucHV0Q2xhc3NJbmRleCA9ICQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGggKyAxLFxuICAgICAgICAgICAgICAkdHJJbnB1dENsYXNzTmFtZSA9ICQodGhpcykuYXR0cignY2xhc3MnKTtcblxuICAgICAgICAgICQodGhpcykuYXR0cignbmFtZScsICR0cklucHV0Q2xhc3NOYW1lICsgJy0nICsgJHRySW5wdXRDbGFzc0luZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgndGQ6ZXEoMCknLCAkdHJMYXN0KS50ZXh0KCQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgLy8gV2hlbiBjbGVhci9yZXN0YXJ0IGJ1dHRvbiBpcyBjbGlja2VkIHJldHVybiB0YWJsZSB0byBpbml0aWFsIHN0YXRlXG4gICAgICAkKCcuY2xlYXItcmVzdGFydCcpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgY2xvbmVkIHJvd3NcbiAgICAgICAgdmFyICR0ckNsb25lZCA9ICQoJy5jbG9uZWQnKTtcbiAgICAgICAgJHRyQ2xvbmVkLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIFJlc2V0IHRvIGludGlhbCB2YWx1ZXNcbiAgICAgICAgJCgnI2JwQ2FsY3VsYXRvciBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykudmFsKCcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzZXQgZm9ybVxuICAgICAgICAkKCcjYnBDYWxjdWxhdG9yICcpLnZhbGlkYXRlKCkucmVzZXRGb3JtKCk7XG5cbiAgICAgICAgLy8gSGlkZSBvdXRwdXQgcm93XG4gICAgICAgICQoJy5icENhbGN1bGF0b3JfX3RhYmxlX19vdXRwdXQnKS5oaWRlKCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlIEJQXG4gICAgICBmdW5jdGlvbiBjYWxjdWxjYXRlQlAoYnBWYWx1ZSwgYnBPdXRwdXQpIHtcbiAgICAgICAgdmFyIGJwSW5wdXQgPSAwLCAvLyByb3cgY291bnRcbiAgICAgICAgICAgIGJwVG90YWwgPSAwLCAvLyBpbmNyZW1lbnRlZCBpbnB1dCB2YWx1ZXNcbiAgICAgICAgICAgIGJwQXZlcmFnZTsgLy8gYXZlcmFnZWQgYnBUb3RhbCAvIGJwSW5wdXRcblxuICAgICAgICBicFZhbHVlLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIElmIElucHV0IHZhbHVlcyBhcmUgZ3JlYXRlciB0aGFuIDAgdGhlbiB0dXJuIGludG8gYSBudW1iZXIgYW5kIHJvdW5kXG4gICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkgPiAwID8gTWF0aC5yb3VuZChwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCkpIDogZmFsc2U7XG5cbiAgICAgICAgICBpZiAodmFsICE9PSAwKSB7XG4gICAgICAgICAgICBicElucHV0ICs9IDE7XG4gICAgICAgICAgICBicFRvdGFsICs9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlXG4gICAgICAgIGJwQXZlcmFnZSA9IGJwVG90YWwgLyBicElucHV0ID4gMCA/IE1hdGgucm91bmQoYnBUb3RhbCAvIGJwSW5wdXQpIDogMDtcblxuICAgICAgICBicE91dHB1dC50ZXh0KGJwQXZlcmFnZSk7XG5cbiAgICAgICAgJCgnLmJwQ2FsY3VsYXRvcl9fdGFibGVfX291dHB1dCcpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gVmFsaWRhdGUgQlAgRm9ybVxuICAgICAgJCgnI2JwQ2FsY3VsYXRvcicpLnZhbGlkYXRlKHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIEJQIHdoZW4gY2FsY3VsYXRlIGlzIGNsaWNrZWRcbiAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24oZm9ybSkge1xuICAgICAgICAgIHZhciBzeXNCcFZhbHVlID0gJCgnLmJwQ2FsY3VsYXRvcl9fc3lzdG9saWMtaW5wdXQnKSxcbiAgICAgICAgICAgIHN5c0JwT3V0cHV0ID0gJCgnLmJwQ2FsY3VsYXRvcl9fc3lzdG9saWMtb3V0cHV0Jyk7XG5cbiAgICAgICAgICB2YXIgZGlhQnBWYWx1ZSA9ICQoJy5icENhbGN1bGF0b3JfX2RpYXN0b2xpYy1pbnB1dCcpLFxuICAgICAgICAgICAgZGlhQnBPdXRwdXQgPSAkKCcuYnBDYWxjdWxhdG9yX19kaWFzdG9saWMtb3V0cHV0Jyk7XG5cbiAgICAgICAgICBjYWxjdWxjYXRlQlAoc3lzQnBWYWx1ZSwgc3lzQnBPdXRwdXQpO1xuICAgICAgICAgIGNhbGN1bGNhdGVCUChkaWFCcFZhbHVlLCBkaWFCcE91dHB1dCk7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIE1vYmlsZSBmdW5jdGlvbmFsaXR5IGZvciB0aGUgcHJvZHVjdCBtZW51LlxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCwgb25jZSkge1xuICAgIERydXBhbC5iZWhhdmlvcnMuYW1hX3Byb2R1Y3RNZW51ID0ge1xuICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICAvLyBTZWxlY3QgcmVxdWlyZWQgZWxlbWVudHMgZnJvbSB0aGUgRE9NLlxuICAgICAgICBjb25zdCAkbWVudSA9ICQoJy5hbWFfX3Byb2R1Y3QtbmF2Jyk7XG4gICAgICAgIGNvbnN0ICR0cmlnZ2VyID0gJy5wcm9kdWN0LW1lbnUtdGl0bGUnO1xuICAgICAgICBjb25zdCAkY2F0Y2hlciA9ICQoJy5hbWFfX3Byb2R1Y3QtbmF2LWNhdGNoZXInKTtcbiAgICAgICAgY29uc3QgJG1lbnVJdGVtcyA9ICQoJy5hbWFfX3Byb2R1Y3QtbmF2IC5kcm9wZG93bi1jb250YWluZXIgdWwgbGknKTtcbiAgICAgICAgXG4gICAgICAgICQob25jZSgnZXhwYW5kLWNvbGxhcHNlJywgJHRyaWdnZXIsIGNvbnRleHQpKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmICgkbWVudS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgJCgnLmFtYV9fcHJvZHVjdC1uYXYuZXhwYW5kZWQgLmRyb3Bkb3duLWNvbnRhaW5lcicpLmNzcyh7XCJtYXgtaGVpZ2h0XCI6IFwiMjYycHhcIn0pO1xuICAgICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAkY2F0Y2hlci5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAkKCdib2R5JykuY3NzKHtcIm92ZXJmbG93XCI6XCJhdXRvXCJ9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkbWVudS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICRjYXRjaGVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICQoJ2JvZHknKS5jc3Moe1wib3ZlcmZsb3dcIjpcImhpZGRlblwifSk7XG4gICAgICAgICAgICAkbWVudUl0ZW1zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICgkKCB0aGlzICkuaW5uZXJIZWlnaHQoKSA9PSAnNjInKSB7XG4gICAgICAgICAgICAgICAgJG9wZW5Ecm9wZG93biA9ICQoJy5hbWFfX3Byb2R1Y3QtbmF2LmV4cGFuZGVkIC5kcm9wZG93bi1jb250YWluZXInKTtcbiAgICAgICAgICAgICAgICAkbWVudUhlaWdodCA9ICRvcGVuRHJvcGRvd24uaW5uZXJIZWlnaHQoKSArIDI0O1xuICAgICAgICAgICAgICAgICRvcGVuRHJvcGRvd24uY3NzKHtcIm1heC1oZWlnaHRcIjogJG1lbnVIZWlnaHQgKyBcInB4XCJ9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKG9uY2UoJ2NvbGxhcHNlLXByb2R1Y3QtbmF2JywgICRjYXRjaGVyLCBjb250ZXh0KSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICQoJy5hbWFfX3Byb2R1Y3QtbmF2LmV4cGFuZGVkIC5kcm9wZG93bi1jb250YWluZXInKS5jc3Moe1wibWF4LWhlaWdodFwiOiBcIjI2MnB4XCJ9KTtcbiAgICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgJGNhdGNoZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgJCgnYm9keScpLmNzcyh7XCJvdmVyZmxvd1wiOlwiYXV0b1wifSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pKGpRdWVyeSwgRHJ1cGFsLCBvbmNlKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFNhZGx5IGFkZHMgZm9vdGVyIHRvIGxlZnQgcmVzb3VyY2UgcGFnZSBjb2x1bW4uXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMucmVzb3VyY2VQYWdlRm9vdGVyID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgJChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQoJ2JvZHkuYW1hX19yZXNvdXJjZS1wYWdlJykubGVuZ3RoKSB7XG4gICAgICAgICAgJCgnZm9vdGVyJywgY29udGV4dCkuY2xvbmUoKS5hcHBlbmRUbygnLmFtYV9fbGF5b3V0LS1zcGxpdF9fbGVmdCcpLmFkZENsYXNzKCdhbWFfX2Zvb3RlciBhbWFfX3Jlc291cmNlLXBhZ2VfX2Rlc2t0b3AtZm9vdGVyJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFJlc3BvbnNpdmUgVGFibGVzLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnJlc3BvbnNpdmVUYWJsZXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgICB3aW5kb3cuc2NyZWVuLndpZHRoO1xuXG4gICAgICAvLyBUaGlzIGNvbmRpdGlvbmFsIGhhcyBiZWVuIGFkZGVkIHRvIHByZXZlbnQgYmFzaWNUYWJsZSBwbHVnaW4gdG8gc2VsZWN0aXZlbHkgbm90IHJ1biBvbiB0YWJsZXNcbiAgICAgIGlmICghJCgndGFibGUnKS5oYXNDbGFzcygnYnQnKSkge1xuICAgICAgICAkKCd0YWJsZScpLmJhc2ljdGFibGUoe1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDExODJcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCB0aGUgdGFibGUgYXMgYnQgZm9yIG1vYmlsZS5cbiAgICAgICAgJCgnLmFtYV9fZm9ydW0tdGFibGUtd3JhcCB0YWJsZScpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYod2luZG93LnNjcmVlbi53aWR0aCA8PSAxMTgyKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5iYXNpY3RhYmxlKCdzdGFydCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgLy8gdGhpcyBmb3JjZXMgdGFibGVzIGluc2lkZSBvZiB0aGUgLmFtYV9fcmVzb3VyY2UtLXNjaGVkdWxlcyBkaXYgdG8gaGF2ZSBtb2JpbGUgbG9vayBhbmQgZmVlbFxuICAgICAgJCgnLmFtYV9fcmVzb3VyY2UtLXNjaGVkdWxlcyB0YWJsZScpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkKHRoaXMpLmJhc2ljdGFibGUoJ3N0YXJ0Jyk7XG4gICAgICB9KTtcblxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIExpc3RpY2xlIENsYXNlcy5cbiAqXG4gKiBIYW5kbGluZyBjbGFzc2VzIHRvIGJ1aWxkIGxpc3RpY2xlIHByb3Blcmx5IG91dHNpZGUgY2tlZGl0b3IuXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsLCBvbmNlKSB7XG4gIERydXBhbC5iZWhhdmlvcnMubGlzdGljbGUgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICBpZiAoJCgnLmxpc3RpY2xlJywgY29udGV4dCkubGVuZ3RoKSB7XG4gICAgICAgICQoJy5saXN0aWNsZScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uIChpZHgsIGUpIHtcbiAgICAgICAgICAgICQoZSkuYWRkQ2xhc3MoJ2xpc3RpY2xlX19pdGVtJyk7XG4gICAgICAgICAgICAkKGUpLmZpbmQoJ29sLCB1bCcpLmVhY2goZnVuY3Rpb24gKGlkeCwgZikge1xuICAgICAgICAgICAgICAkKGYpLmFkZENsYXNzKCdsaXN0aWNsZV9faXRlbS1zdWInKTtcbiAgICAgICAgICAgICAgJChmKS5jaGlsZHJlbignbGknKS5hZGRDbGFzcygnbGlzdGljbGVfX2l0ZW0tc3ViLWl0ZW0nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy9pZiB0aGUgbGlzdGljbGUgaXRlbSBjb250YWlucyBhbiBpbWFnZSwgcHV0IGEgY2xlYXJmaXggZGl2IG9uIHRoZSBpdGVtIHNvIGlmIGl0IGhhcyBhIHRyYWlsaW5nIGltYWdlLCB0aGUgbmV4dCBpdGVtIHdvbid0IHdyYXAgb24gaXQuXG4gICAgICAvL0Fsc28sIGRldGVybWluZSBpdCB0aGUgaW1hZ2UgaXMgYWxtb3N0IDEwMCUgb2YgdGhlIGxpc3Qgd2lkdGguIGlmIGl0IGlzLCBhZGQgYSBjbGFzcyB0byByZW1vdmUgdGhlIGxlZnQgbWFyZ2luIGFuZCBtYWtlIHRoZSBpbWFnZSAxMDAlIHdpZHRoLiBJIGNob3NlIDgwJS5cbiAgICAgIGlmKCQoJy5saXN0aWNsZV9faXRlbSBpbWcnKSkge1xuICAgICAgICAkKCcubGlzdGljbGVfX2l0ZW0gaW1nJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHdpZHRoID0gJCh0aGlzKS5jbG9zZXN0KCcubGlzdGljbGVfX2l0ZW0nKS53aWR0aCgpXG4gICAgICAgICAgY29uc29sZS5sb2cod2lkdGgpXG4gICAgICAgICAgdmFyIGltYWdlV2lkdGggPSAkKHRoaXMpLndpZHRoKClcbiAgICAgICAgICBjb25zb2xlLmxvZyhpbWFnZVdpZHRoKVxuICAgICAgICAgIHZhciBjbGVhcmZpeCA9ICc8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj4nXG4gICAgICAgICAgJChvbmNlKCdsaXN0aWNsZS1pdGVtJywgJy5saXN0aWNsZV9faXRlbScsIHRoaXMpKS5hcHBlbmQoY2xlYXJmaXgpXG4gICAgICAgICAgaWYgKGltYWdlV2lkdGggPj0gd2lkdGgqLjcpIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ25vLW1hcmdpbicpXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QgKCdmaWd1cmUnKS5hZGRDbGFzcygnbm8tbWFyZ2luJylcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwsIG9uY2UpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogQXR0YWNoZXMgQU1BIEltYWdlIFBvcHVwIGxpYnJhcnkuXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblx0ZnVuY3Rpb24gYWx0ZXJNb2RhbCAoY29udGV4dCkge1xuXHRcdCQoJy51aS1kaWFsb2cnKS5jc3Moe1wiei1pbmRleFwiOiBcIjUwMDAxXCJ9KTtcblx0XHQkKCcudWktZGlhbG9nLXRpdGxlJykuaGlkZSgpO1xuXHRcdCQoJy51aS1idXR0b24taWNvbi1vbmx5IC51aS1pY29uJykuaGlkZSgpO1xuXHRcdC8vIFN0eWxlZ3VpZGUgc3BlY2lmaWMgdHJlYXRtZW50IHRvIGhpZGUgYW5kIGNzcyB0byBlbGVtZW50cy5cblx0XHQkKCcudWktZHJhZ2dhYmxlIC51aS1kaWFsb2ctdGl0bGViYXInKS5jc3Moe1xuXHRcdFx0XCJib3JkZXJcIjogXCJub25lXCIsXG5cdFx0XHRcInBhZGRpbmc6XCI6IFwiMFwiLFxuXHRcdFx0XCJiYWNrZ3JvdW5kXCI6IFwibm9uZVwiXG5cdFx0fSk7XG5cdFx0JCgnLnVpLXdpZGdldC1vdmVybGF5JykuY3NzKHtcblx0XHRcdFwib3BhY2l0eVwiOiBcIi41XCIsXG5cdFx0XHRcInotaW5kZXg6XCI6IFwiNTAwMFwiXG5cdFx0fSk7XG5cdFx0JCgnLnVpLWRpYWxvZyAudWktZGlhbG9nLXRpdGxlYmFyLWNsb3NlJykuY3NzKHtcblx0XHRcdFwiYmFja2dyb3VuZFwiOiBcInVybCgnL2Fzc2V0cy9pbWFnZXMvaWNvbi1tb2RhbC1jbG9zZS5zdmcnKVwiLFxuXHRcdFx0XCJib3JkZXJcIjogXCJub25lXCIsXG5cdFx0XHRcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcblx0XHRcdFwicmlnaHRcIjogXCItMjBweFwiLFxuXHRcdFx0XCJ0b3BcIjogXCItMTBweFwiLFxuXHRcdFx0XCJoZWlnaHRcIjogXCIyOHB4XCIsXG5cdFx0XHRcIndpZHRoXCI6IFwiMjhweFwiLFxuXHRcdFx0XCJwYWRkaW5nXCI6IFwiMFwiLFxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2xvc2VNb2RhbCAoY29udGV4dCkge1xuXHRcdCQoJy51aS1pY29uLWNsb3NldGhpY2snKS51bmJpbmQoJ2NsaWNrLmNsb3NlJyk7XG5cdFx0JCgnLnVpLWljb24tY2xvc2V0aGljaycpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdH1cblxuXHREcnVwYWwuYmVoYXZpb3JzLmFtYV9pbWFnZV9wb3B1cCA9IHtcblx0XHRhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImRpYWxvZ29wZW5cIiwgXCIudWktZGlhbG9nXCIsIGZ1bmN0aW9uIChldmVudCwgdWkpIHtcblx0XHRcdFx0YWx0ZXJNb2RhbCgpO1xuXHRcdFx0fSk7XG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnVpLXdpZGdldC1vdmVybGF5XCIsIGZ1bmN0aW9uIChldmVudCwgdWkpIHtcblx0XHRcdFx0Y2xvc2VNb2RhbCgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG5cbi8qKlxuICogQGZpbGVcbiAqIEF0dGFjaGVzIEFNQSBJbWFnZSBQb3B1cCBsaWJyYXJ5LlxuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cdGZ1bmN0aW9uIGFsdGVyTW9kYWwgKGNvbnRleHQpIHtcblx0XHQkKCcuYW1hLWltYWdlLXBvcHVwLW1vZGFsIC51aS1kaWFsb2ctdGl0bGUnKS5oaWRlKCk7XG5cdFx0JCgnLmFtYS1pbWFnZS1wb3B1cC1tb2RhbCAudWktYnV0dG9uLWljb24tb25seSAudWktaWNvbicpLmhpZGUoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNsb3NlTW9kYWwgKGNvbnRleHQpIHtcblx0XHQkKCcudWktaWNvbi1jbG9zZXRoaWNrJykudW5iaW5kKCdjbGljay5jbG9zZScpO1xuXHRcdCQoJy51aS1pY29uLWNsb3NldGhpY2snKS50cmlnZ2VyKCdjbGljaycpO1xuXHR9XG5cblx0RHJ1cGFsLmJlaGF2aW9ycy5hbWFfaW1hZ2VfcG9wdXAgPSB7XG5cdFx0YXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdFx0JChkb2N1bWVudCkub24oXCJkaWFsb2dvcGVuXCIsIFwiLnVpLWRpYWxvZ1wiLCBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRcdFx0YWx0ZXJNb2RhbCgpO1xuXHRcdFx0fSk7XG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnVpLXdpZGdldC1vdmVybGF5XCIsIGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRjbG9zZU1vZGFsKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsLCBvbmNlKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuaW5kZXggPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICBpZiAoICQoJy5kZXNjLWRpc3BsYXknKS5sZW5ndGggKSB7XG5cbiAgICB2YXIgZnVsbCA9ICQoJy5mdWxsdGV4dCcpO1xuICAgIHZhciB0cnVuYyA9ICQoJy50cnVuY2F0ZWQnKVxuICAgIHZhciBkZXNjID0gJCgnLmRlc2MtZGlzcGxheScpXG4gICAgdmFyIGZ1bGxUZXh0ID0gJCgnLmZ1bGx0ZXh0JykuaHRtbCgpXG4gICAgdmFyIHRydW5jYXRlZCA9ICQoJy50cnVuY2F0ZWQnKS5odG1sKClcbiAgICB2YXIgZnVsbEhlaWdodCA9ICcnXG4gICAgdmFyIHRydW5jSGVpZ2h0ID0gJydcbiAgICB2YXIgbW9yZUh0bWwgPSAnPGEgYWNjZXNza2V5PVwibFwiIGhyZWY9XCIjXCIgYWx0PVwiUmVhZCBNb3JlXCIgY2xhc3M9XCJtb3JlXCIgdGFiaW5kZXg9XCIwXCI+IC4uLlJlYWQgTW9yZTwvYT4nXG4gICAgdmFyIGxlc3NIdG1sID0gJzxhIGFjY2Vzc2tleT1cImxcIiBocmVmPVwiI1wiIGFsdD1cIlNob3cgTGVzc1wiIGNsYXNzPVwibGVzc1wiIHRhYmluZGV4PVwiMFwiPlNob3cgTGVzczwvYT4nXG4gICAgdmFyIHdpZHRoID0gJydcblxuICAgICAgZnVuY3Rpb24gZ2V0RGltZW5zaW9ucyAoKSB7XG5cbiAgICAgICAgLy8gSWYgY2xvc2VzdCBwYXJlbnQgaW5kaWNhdGVzIGNhdGVnb3J5LlxuICAgICAgICAvLyBBZGp1c3QgaGllZ2h0IHZhbHVlcy5cbiAgICAgICAgaWYgKGRlc2MuY2xvc2VzdCgnZGl2LmFtYV9fY2F0ZWdvcnknKSkge1xuICAgICAgICAgIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKClcbiAgICAgICAgICBpZiAod2lkdGggPCA0MDApIHtcbiAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyAyNVxuICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAyMFxuICAgICAgICAgIH0gZWxzZSBpZiAod2lkdGggPCA5MDApIHtcbiAgICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKSArIDUxXG4gICAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMjBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKSArIDI2XG4gICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDE0XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKClcbiAgICAgICAgICBpZiAod2lkdGggPCA0MDApIHtcbiAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyAyNVxuICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAyMFxuICAgICAgICAgIH0gZWxzZSBpZiAod2lkdGggPCA5MDApIHtcbiAgICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKSArIDI1XG4gICAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMjBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKVxuICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAxNFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLypcbiAgICAgICAgKiBBbmltYXRlIHRoZSBoZWlnaHQgb2YgYSBkeW5hbWljIGhlaWdodCBvYmplY3Q/IFNJTVBMRSFcbiAgICAgICAgKiBXaGF0IGEgZm9vbCB5b3Ugd291bGQgYmUgdG8gbm90IHRoaW5rIG9mIHNvIGVsZWdhbnQgYSBzb2x1dGlvbi5cbiAgICAgICAgKiBJbiB0aGUgbWFya3VwLCB0aGVyZSBhcmUgaGlkZGVuIGZ1bGx0ZXh0IGFuZCBzdW1tYXJ5IGRpdnMuXG4gICAgICAgICogVGhleSBhcmUgYWJzb2x1dGVseSBwb3NpdGlvbmVkIHdoaXRoaW4gdGhlIHBhZ2UgdGVtcGxhdGUgdG8ga2VlcCBhbiBhY2N1cmF0ZSBoZWlnaHQuXG4gICAgICAgKi9cblxuICAgICAgLy8gU2V0IGhlaWdodCBvbiBwYWdlbG9hZCB1c2luZyB0aGUgaGlkZGVuIGRpdnMuXG4gICAgICAkKG9uY2UoJ2dldEhlaWdodCcsICcuZGVzYy1kaXNwbGF5JywgY29udGV4dCkpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXREaW1lbnNpb25zKClcbiAgICAgICAgZGVzYy5jc3MoJ2hlaWdodCcsIHRydW5jSGVpZ2h0ICsgJ3B4JylcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTZXQgdGhlIGhlaWdodCBhZ2FpbiBvbiB3aW5kb3cgcmVzaXplLlxuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldERpbWVuc2lvbnMoKVxuICAgICAgICBpZiAoZGVzYy5oYXNDbGFzcygnZnVsbCcpKSB7XG4gICAgICAgICAgZGVzYy5jc3MoJ2hlaWdodCcsIGZ1bGxIZWlnaHQgKyAncHgnKVxuICAgICAgICB9IGVsc2UgaWYgKGRlc2MuaGFzQ2xhc3MoJ3N1bW1hcnknKSkge1xuICAgICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCB0cnVuY0hlaWdodCArICdweCcpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBPbiBjbGljaywgc2V0IHRoZSBoZWlnaHQgdG8gdHJpZ2dlciBjc3MgdHJhbnNpdGlvbi5cbiAgICAgIGRlc2Mub24oJ2NsaWNrJywgJy5tb3JlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXREaW1lbnNpb25zKClcbiAgICAgICAgZGVzYy5jc3MoJ2hlaWdodCcsIGZ1bGxIZWlnaHQgKyAncHgnKVxuICAgICAgICBkZXNjLmFkZENsYXNzKCdmdWxsJykucmVtb3ZlQ2xhc3MoJ3N1bW1hcnknKVxuICAgICAgICAvLyBTd2FwIHRoZSBmdWxsIGNvcHkgaW50byB0aGUgZGlzcGxheSBkaXYuXG4gICAgICAgIGRlc2MuaHRtbCgkLnBhcnNlSFRNTChmdWxsVGV4dCkpLmFwcGVuZChsZXNzSHRtbClcbiAgICAgIH0pO1xuICAgICAgZGVzYy5vbignY2xpY2snLCAnLmxlc3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldERpbWVuc2lvbnMoKVxuICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgdHJ1bmNIZWlnaHQgKyAncHgnKVxuICAgICAgICBkZXNjLmFkZENsYXNzKCdzdW1tYXJ5JykucmVtb3ZlQ2xhc3MoJ2Z1bGwnKVxuICAgICAgICAvLyBTd2FwIHRoZSB0cnVuY2F0ZWQgY29weSBpbnRvIHRoZSBkaXNwbGF5IGRpdi5cbiAgICAgICAgZGVzYy5odG1sKCQucGFyc2VIVE1MKHRydW5jYXRlZCkpLmFwcGVuZChtb3JlSHRtbClcbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRvcC5cbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgNTAwLCAnc3dpbmcnKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwsIG9uY2UpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9hbmNob3JzID0ge1xuICAgICAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIEZ1bmN0aW9uIHRvIGhhbmRsZSBzY3JvbGxpbmcgdG8gYW5jaG9yXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2Nyb2xsVG9BbmNob3IoaGFzaCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGhlaWdodCBvZiB0aGUgaGVhZGVyIHRvIGRldGVybWluZSB0aGUgaW5pdGlhbCBvZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9ICQoJ2hlYWRlcicpLm91dGVySGVpZ2h0KCkgfHwgMDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIGhlaWdodCBvZiB0aGUgcGFnZSBncm91cGVyIGlmIGl0IGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA2MDEgJiYgJCgnLmFtYV9wYWdlX2dyb3VwaW5nX25ld3MnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSAkKCcuYW1hX3BhZ2VfZ3JvdXBpbmdfbmV3cycpLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGRlc2t0b3Agb2Zmc2V0IGJhc2VkIG9uIHRoZSBwcmVzZW5jZSBvZiB0aGUgdG9vbGJhci1ob3Jpem9udGFsIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAkKCdib2R5JykuaGFzQ2xhc3MoJ3Rvb2xiYXItaG9yaXpvbnRhbCcpID8gb2Zmc2V0ICsgODAgOiBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChoYXNoKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPVwiJyArIGhhc2guc2xpY2UoMSkgKyAnXCJdJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcCAtIG9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUwMFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIE9uIGNsaWNrIG9mIGFueSBhbmNob3IgbGlua1xuICAgICAgICAgICAgICAgICQoJ2FbaHJlZl49XCIjXCJdLCBhW2hyZWYqPVwiI1wiXScpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3Qgc2Nyb2xsIHRvIGFuY2hvciBzb2NpYWwgbGlua3MsIHVybHMgd2l0aCBhIC8jLyBjb21wb25lbnQsIGFjY29yZGlvbiBoZWFkaW5ncyBvbiBkZXNrdG9wIG9yIGFueSBvdGhlciBleHRlcm5hbCBsaW5rcyB3aXRoIGFuY2hvcnMuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1nYS1zaXRlX2V2ZW50cycpID09ICdzb2NpYWxfY2xpY2snIHx8IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc2guaW5jbHVkZXMoJyMvJykgfHwgXG4gICAgICAgICAgICAgICAgICAgICgkKHRoaXMpLnBhcmVudCgpLmlzKCdkdCcpICYmICQod2luZG93KS53aWR0aCgpID4gOTkyKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgL1xcL2NvbW1lbnRcXC9cXGQrIy8udGVzdCh0aGlzLmhyZWYpIHx8IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0F0dHJpYnV0ZSgnZGF0YS1leHRsaW5rJykgfHwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0aG5hbWUgIT09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IGhhcmQganVtcCwgdGhlIGRlZmF1bHQgYmVoYXZpb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBlcmZvcm0gYW5pbWF0ZWQgc2Nyb2xsaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb0FuY2hvcih0aGlzLmhhc2gpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBPbiBwYWdlIGxvYWQgd2l0aCBhbmNob3IgaW4gVVJMXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvQW5jaG9yKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpOyIsIi8qKlxuICogQGZpbGVcbiAqIEFwcGxpY2F0aW9uIGRyb3Bkb3duLlxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFwcE1lbnUgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgJCgnI2Jsb2NrLWFjY291bnRuYXYnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsYXNzX2FjdGl2ZSA9ICdpcy1hY3RpdmUnO1xuXG4gICAgICAgICQoJy5hY2NvdW50X25hdl90cmlnZ2VyJywgdGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgLy8gVW5mb2N1cyBvbiB0aGUgZHJvcGRvd24uXG4gICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyBmb3IgQ1NTLlxuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIHRvIHRoZSBkcm9wZG93biBVTC5cbiAgICAgICAgICAkKHRoaXMpLm5leHQoKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayggZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCcuYWNjb3VudF9uYXZfdHJpZ2dlcicsIHRoaXMpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSkubmV4dCgpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfcG9kY2FzdCA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vQ2hlY2sgbnVtYmVyIG9mIGxpbmtzXG4gICAgICAgIG9kZExpbmtzKCk7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gb2RkTGlua3MoKSB7XG4gICAgICAgIHZhciBjb3VudCA9ICQoXCJ1bC5hbWFfX3BvZGNhc3QtcGxheWVyX19saW5rcyBsaVwiKS5sZW5ndGg7XG4gICAgICAgIHZhciBsaW5rQ29udGFpbmVyID0gJChcInVsLmFtYV9fcG9kY2FzdC1wbGF5ZXJfX2xpbmtzXCIpO1xuXG4gICAgICAgIGlmIChjb3VudCA9PSAzIHx8IGNvdW50ID09IDEpIHtcbiAgICAgICAgICBsaW5rQ29udGFpbmVyLmFkZENsYXNzKCdvZGRfbGlua3MnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTsiLCIvKipcbiAqIEBmaWxlXG4gKiBNb2JpbGUgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGxvY2tlciBtZW51LlxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCwgb25jZSkge1xuICAgIERydXBhbC5iZWhhdmlvcnMuYW1hX2xvY2tlck1lbnUgPSB7XG4gICAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIC8vIFNlbGVjdCByZXF1aXJlZCBlbGVtZW50cyBmcm9tIHRoZSBET00uXG4gICAgICAgIGNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgICAgIGNvbnN0ICRtZW51ID0gJCgnLmFtYV9sb2NrZXJfbmF2aWdhdGlvbicpO1xuICAgICAgICBjb25zdCAkdHJpZ2dlciA9ICQoJy5hbWFfbG9ja2VyX25hdmlnYXRpb24tdHJpZ2dlcicpO1xuICAgICAgICBjb25zdCAkY2F0Y2hlciA9ICQoJy5hbWFfbG9ja2VyX25hdmlnYXRpb24tY2F0Y2hlcicpO1xuICAgICAgICBjb25zdCAkYm9keSA9ICQoJ2JvZHknKTtcbiAgICAgICAgY29uc3QgYm9keUZpeGVkID0gJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnKTtcblxuICAgICAgICBmdW5jdGlvbiBsb2NrZXJNZW51KCkge1xuICAgICAgICAgICAgLy8gT3BlbiBtZW51IG9uIHRyaWdnZXIgY2xpY2suXG4gICAgICAgICAgICAkKG9uY2UoJ2NsaWNrLXRvLXNob3cnLCAnLmFtYV9sb2NrZXJfbmF2aWdhdGlvbi10cmlnZ2VyJywgY29udGV4dCkpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgJGNhdGNoZXIudG9nZ2xlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICRib2R5LmNzcyh7XCJvdmVyZmxvd1wiOlwiaGlkZGVuXCJ9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gQ2xvc2UgbWVudSBvbiBiYWNrZ3JvdW5kIGNsaWNrLlxuICAgICAgICAgICAgJChvbmNlKCdjbGljay10by1oaWRlJywgJy5hbWFfbG9ja2VyX25hdmlnYXRpb24tY2F0Y2hlcicsIGNvbnRleHQpKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJGNhdGNoZXIudG9nZ2xlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgICRib2R5LmNzcyh7XCJvdmVyZmxvd1wiOlwiYXV0b1wifSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2tlck1lbnUoKTtcblxuICAgICAgfVxuICAgIH07XG4gIH0pKGpRdWVyeSwgRHJ1cGFsLCBvbmNlKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfc2lnbkluTWVudSA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHZhciAkZXhwbG9yZU1lbnUgPSAkKCcuYW1hX19leHBsb3JlLW1lbnUnKTtcbiAgICAgICAgICAgIHZhciAkZXhwbG9yZU1lbnVEcm9wZG93biA9ICQoJy5hbWFfX2V4cGxvcmUtbWVudV9fbWVudScpO1xuICAgICAgICAgICAgdmFyIGlzRHJvcGRvd25PcGVuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRyb3Bkb3duRG93bk1lbnUocGFyZW50RWxlbWVudCwgbWVudUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRHJvcGRvd25PcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHBhcmVudEVsZW1lbnQpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZURvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQocGFyZW50RWxlbWVudCkuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpc0Ryb3Bkb3duT3BlbiA9ICFpc0Ryb3Bkb3duT3BlbjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHRhcmdldCBvZiB0aGUgY2xpY2sgaXNuJ3QgdGhlIGNvbnRhaW5lciBub3IgYSBkZXNjZW5kYW50IG9mIHRoZSBjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJlbnRFbGVtZW50LmlzKGUudGFyZ2V0KSAmJiBwYXJlbnRFbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHBhcmVudEVsZW1lbnQpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgdGltZW91dCBmb3Igd2hlbiBhIHVzZXIgbW91c2VzIG91dCBvZiB0aGUgbWVudVxuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQubW91c2VlbnRlcihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocGFyZW50RWxlbWVudC50aW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgIH0pLm1vdXNlbGVhdmUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC50aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHBhcmVudEVsZW1lbnQpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZHJvcGRvd25Eb3duTWVudSgkZXhwbG9yZU1lbnUsICRleHBsb3JlTWVudURyb3Bkb3duKTtcbiAgICAgICAgfVxuICAgIH07XG59KShqUXVlcnksIERydXBhbCk7IiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5tb2JpbGVIb21lcGFnZUN0YSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgIC8vIENoZWNrIGNoYXJhY3RlciBjb3VudCBvZiBhbmNob3IgZWxlbWVudHMgd2l0aGluIHRoZSBhbWFfX21vYmlsZS1ob21lcGFnZS1jdGEgY29udGFpbmVyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQ2hhcmFjdGVyQ291bnQoKSB7XG4gICAgICAgICAgLy8gRmluZCB0aGUgYW1hX19tb2JpbGUtaG9tZXBhZ2UtY3RhIGNvbnRhaW5lclxuICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKCcuYW1hX19tb2JpbGUtaG9tZXBhZ2UtY3RhJywgY29udGV4dCk7XG5cbiAgICAgICAgICAvLyBSZW1vdmUgdGhlICdjb2x1bW4nIGNsYXNzIGlmIGl0IGV4aXN0c1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcygnY29sdW1uJyk7XG5cbiAgICAgICAgICAvLyBGaW5kIGFsbCBhbmNob3IgZWxlbWVudHMgd2l0aGluIHRoZSBhbWFfX21vYmlsZS1ob21lcGFnZS1jdGEgY29udGFpbmVyXG4gICAgICAgICAgdmFyIGFuY2hvcnMgPSBjb250YWluZXIuZmluZCgnYScpO1xuXG4gICAgICAgICAgLy8gRW5zdXJlIGFuY2hvcnMgYXJlIG5vdCBudWxsIG9yIGVtcHR5XG4gICAgICAgICAgaWYgKGFuY2hvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgYW55IGFuY2hvciB3aXRoaW4gdGhlIGNvbnRhaW5lciBoYXMgYSBjaGFyYWN0ZXIgY291bnQgZ3JlYXRlciB0aGFuIDI1XG4gICAgICAgICAgdmFyIGNoZWNrQ291bnQgPSBhbmNob3JzLnRvQXJyYXkoKS5zb21lKGZ1bmN0aW9uKGFuY2hvcikge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBzcGFjZXMgYmVmb3JlIGNoZWNraW5nIHRoZSBjaGFyYWN0ZXIgY291bnRcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gJChhbmNob3IpLnRleHQoKS5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0Lmxlbmd0aCA+IDI1O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gQWRkIGNsYXNzICdjb2x1bW4nIHRvIHRoZSBjb250YWluZXIgaWYgY29uZGl0aW9uIGlzIG1ldFxuICAgICAgICAgIGlmIChjaGVja0NvdW50KSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJCgnLmFtYV9fbW9iaWxlLWhvbWVwYWdlLWN0YScsIGNvbnRleHQpO1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdjb2x1bW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja0NoYXJhY3RlckNvdW50KCk7XG4gICAgICB9KShqUXVlcnkpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiJdfQ==
