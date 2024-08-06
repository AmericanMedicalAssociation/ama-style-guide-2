!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var o={};t(o),e.bodyScrollLock=o}}(this,function(exports){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}var d="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),c=[],u=!1,a=-1,s=void 0,v=void 0,f=function(t){return c.some(function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})},m=function(e){var t=e||window.event;return!!f(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))},o=function(){setTimeout(function(){void 0!==v&&(document.body.style.paddingRight=v,v=void 0),void 0!==s&&(document.body.style.overflow=s,s=void 0)})};exports.disableBodyScroll=function(i,e){if(d){if(!i)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(i&&!c.some(function(e){return e.targetElement===i})){var t={targetElement:i,options:e||{}};c=[].concat(r(c),[t]),i.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY)},i.ontouchmove=function(e){var t,o,n,r;1===e.targetTouches.length&&(o=i,r=(t=e).targetTouches[0].clientY-a,!f(t.target)&&(o&&0===o.scrollTop&&0<r?m(t):(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&r<0?m(t):t.stopPropagation()))},u||(document.addEventListener("touchmove",m,l?{passive:!1}:void 0),u=!0)}}else{n=e,setTimeout(function(){if(void 0===v){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(v=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===s&&(s=document.body.style.overflow,document.body.style.overflow="hidden")});var o={targetElement:i,options:e||{}};c=[].concat(r(c),[o])}var n},exports.clearAllBodyScrollLocks=function(){d?(c.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),u&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1),c=[],a=-1):(o(),c=[])},exports.enableBodyScroll=function(t){if(d){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,c=c.filter(function(e){return e.targetElement!==t}),u&&0===c.length&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1)}else 1===c.length&&c[0].targetElement===t?(o(),c=[]):c=c.filter(function(e){return e.targetElement!==t})}});

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
              $(this).submit();
            }
            else {
              var link = $(this).find('a').attr('href');
              location.href = link;
            }
          });

          if($('.paragraph--type--form-50-50 div.success_message').length) {
            $('.paragraph--type--form-50-50').find('.form-content').addClass('success');
          };
        });
      })(jQuery);
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

      $('.ama__global-menu').click(function (e) {
        hideShow();
        e.stopPropagation();
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
        $mobileSearch.slideToggle();
        $mobileSearchTrigger.toggleClass('open');
      });

      //Set focus state on mobile trigger button
      $($mobileSearchTrigger).focus(function(){
        $mobileSearchTrigger.css('outline', 'outline: 2px solid #80d4f5');
      });

      function moveSocialSharePosition(){
        var mainNavPosition = $('.ama__main-navigation .container').offset().left;
        var $amaSocialShare = $('.ama__social-share');

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
              $amaSocialShare.addClass('ama__social-share--fixed').css('left', socialStickyPosition).hide().fadeTo('slow', 1);
            });

            $socialIcons.on('sticky-update', function () {
              $amaSocialShare.addClass('ama__social-share--fixed').hide().fadeTo('slow', 1);
            });

            $socialIcons.on('sticky-end', function () {
              $('.ama__social-share--fixed').removeClass('ama__social-share--fixed');
            });
          }
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


jQuery('.ama_category_navigation_menu__group').smartmenus({
  subIndicatorsPos: 'append'
});

(function ($, Drupal) {
    Drupal.behaviors.ama_signInMenu = {
        attach: function (context, settings) {
            var $signInDropdown = $('.ama__sign-in-dropdown');
            var $signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
            var $signInLink = $('.ama__sign-in-dropdown__text');
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

                // Stop link from firing
                $signInLink.click(function(e) {
                    e.preventDefault();
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

            dropdownDownMenu($signInDropdown, $signInDropdownMenu);
            dropdownDownMenu($exploreMenu, $exploreMenuDropdown);
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
      //if there is an inline promo on a page with a listicle, determine if the list is close enough beneath the promo in the dom to assume it will be floated next to it. I chose within 5 siblings.
      if($('.ama__promo--inline ~ .listicle')) {
        var length = $('.ama__promo--inline').first().nextUntil('.listicle').addBack().length;
        if (length <= 5) {
          $('.ama__promo--inline').addClass('listicle-margin');
        }
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
  Drupal.behaviors.ama_toc = {
    attach: function (context, settings) {
      $(document).ready(function() {
        $('.ama--news-toc a').bind('click', function(e) {
            e.preventDefault(); // prevent hard jump, the default behavior

            var target = $(this).attr("href"); // Set the target as variable
            // perform animated scrolling by getting top-position of target-element and set it as scroll target
            $('html, body').stop().animate({
                scrollTop: $(target).offset().top - $('#main-content').offset().top + ($('.workbench-tabs').height()?$('.workbench-tabs').height():0)
            }, 600);

            return false;
        });
      });
    }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvZHlTY3JvbGxMb2NrLm1pbi5qcyIsImluaXQuanMiLCJhbGVydC5qcyIsImZvcm0taXRlbXMuanMiLCJuYXYuanMiLCJzdWJjYXRlZ29yeS5qcyIsInRhYnMuanMiLCJhY2NvcmRpb24uanMiLCJ3ZWJmb3Jtcy5qcyIsIm1haW4tbmF2aWdhdGlvbi5qcyIsImNhdGVnb3J5LW1lbnUuanMiLCJzaWduLWluLWRyb3Bkb3duLmpzIiwic2VhcmNoLWNoZWNrYm94LmpzIiwiYnAtY2FsY3VsYXRvci5qcyIsInJlc291cmNlLmpzIiwidGFibGVzLmpzIiwibGlzdGljbGUuanMiLCJtb2RhbC5qcyIsImluZGV4LXBhZ2UuanMiLCJ0b2MuanMiLCJhcHBsaWNhdGlvbi1kcm9wZG93bi5qcyIsInBvZGNhc3QtcGxheWVyLmpzIiwibG9ja2VyLW1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDclBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic3R5bGVndWlkZS1jdXN0b20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtcImV4cG9ydHNcIl0sdCk7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyl0KGV4cG9ydHMpO2Vsc2V7dmFyIG89e307dChvKSxlLmJvZHlTY3JvbGxMb2NrPW99fSh0aGlzLGZ1bmN0aW9uKGV4cG9ydHMpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7aWYoQXJyYXkuaXNBcnJheShlKSl7Zm9yKHZhciB0PTAsbz1BcnJheShlLmxlbmd0aCk7dDxlLmxlbmd0aDt0Kyspb1t0XT1lW3RdO3JldHVybiBvfXJldHVybiBBcnJheS5mcm9tKGUpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBsPSExO2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cpe3ZhciBlPXtnZXQgcGFzc2l2ZSgpe2w9ITB9fTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RQYXNzaXZlXCIsbnVsbCxlKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRlc3RQYXNzaXZlXCIsbnVsbCxlKX12YXIgZD1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cubmF2aWdhdG9yJiZ3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtJiYvaVAoYWR8aG9uZXxvZCkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSksYz1bXSx1PSExLGE9LTEscz12b2lkIDAsdj12b2lkIDAsZj1mdW5jdGlvbih0KXtyZXR1cm4gYy5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiEoIWUub3B0aW9ucy5hbGxvd1RvdWNoTW92ZXx8IWUub3B0aW9ucy5hbGxvd1RvdWNoTW92ZSh0KSl9KX0sbT1mdW5jdGlvbihlKXt2YXIgdD1lfHx3aW5kb3cuZXZlbnQ7cmV0dXJuISFmKHQudGFyZ2V0KXx8KDE8dC50b3VjaGVzLmxlbmd0aHx8KHQucHJldmVudERlZmF1bHQmJnQucHJldmVudERlZmF1bHQoKSwhMSkpfSxvPWZ1bmN0aW9uKCl7c2V0VGltZW91dChmdW5jdGlvbigpe3ZvaWQgMCE9PXYmJihkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodD12LHY9dm9pZCAwKSx2b2lkIDAhPT1zJiYoZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1zLHM9dm9pZCAwKX0pfTtleHBvcnRzLmRpc2FibGVCb2R5U2Nyb2xsPWZ1bmN0aW9uKGksZSl7aWYoZCl7aWYoIWkpcmV0dXJuIHZvaWQgY29uc29sZS5lcnJvcihcImRpc2FibGVCb2R5U2Nyb2xsIHVuc3VjY2Vzc2Z1bCAtIHRhcmdldEVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGNhbGxpbmcgZGlzYWJsZUJvZHlTY3JvbGwgb24gSU9TIGRldmljZXMuXCIpO2lmKGkmJiFjLnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGFyZ2V0RWxlbWVudD09PWl9KSl7dmFyIHQ9e3RhcmdldEVsZW1lbnQ6aSxvcHRpb25zOmV8fHt9fTtjPVtdLmNvbmNhdChyKGMpLFt0XSksaS5vbnRvdWNoc3RhcnQ9ZnVuY3Rpb24oZSl7MT09PWUudGFyZ2V0VG91Y2hlcy5sZW5ndGgmJihhPWUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZKX0saS5vbnRvdWNobW92ZT1mdW5jdGlvbihlKXt2YXIgdCxvLG4scjsxPT09ZS50YXJnZXRUb3VjaGVzLmxlbmd0aCYmKG89aSxyPSh0PWUpLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WS1hLCFmKHQudGFyZ2V0KSYmKG8mJjA9PT1vLnNjcm9sbFRvcCYmMDxyP20odCk6KG49bykmJm4uc2Nyb2xsSGVpZ2h0LW4uc2Nyb2xsVG9wPD1uLmNsaWVudEhlaWdodCYmcjwwP20odCk6dC5zdG9wUHJvcGFnYXRpb24oKSkpfSx1fHwoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLG0sbD97cGFzc2l2ZTohMX06dm9pZCAwKSx1PSEwKX19ZWxzZXtuPWUsc2V0VGltZW91dChmdW5jdGlvbigpe2lmKHZvaWQgMD09PXYpe3ZhciBlPSEhbiYmITA9PT1uLnJlc2VydmVTY3JvbGxCYXJHYXAsdD13aW5kb3cuaW5uZXJXaWR0aC1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7ZSYmMDx0JiYodj1kb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCxkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodD10K1wicHhcIil9dm9pZCAwPT09cyYmKHM9ZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyxkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIpfSk7dmFyIG89e3RhcmdldEVsZW1lbnQ6aSxvcHRpb25zOmV8fHt9fTtjPVtdLmNvbmNhdChyKGMpLFtvXSl9dmFyIG59LGV4cG9ydHMuY2xlYXJBbGxCb2R5U2Nyb2xsTG9ja3M9ZnVuY3Rpb24oKXtkPyhjLmZvckVhY2goZnVuY3Rpb24oZSl7ZS50YXJnZXRFbGVtZW50Lm9udG91Y2hzdGFydD1udWxsLGUudGFyZ2V0RWxlbWVudC5vbnRvdWNobW92ZT1udWxsfSksdSYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMSksYz1bXSxhPS0xKToobygpLGM9W10pfSxleHBvcnRzLmVuYWJsZUJvZHlTY3JvbGw9ZnVuY3Rpb24odCl7aWYoZCl7aWYoIXQpcmV0dXJuIHZvaWQgY29uc29sZS5lcnJvcihcImVuYWJsZUJvZHlTY3JvbGwgdW5zdWNjZXNzZnVsIC0gdGFyZ2V0RWxlbWVudCBtdXN0IGJlIHByb3ZpZGVkIHdoZW4gY2FsbGluZyBlbmFibGVCb2R5U2Nyb2xsIG9uIElPUyBkZXZpY2VzLlwiKTt0Lm9udG91Y2hzdGFydD1udWxsLHQub250b3VjaG1vdmU9bnVsbCxjPWMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQhPT10fSksdSYmMD09PWMubGVuZ3RoJiYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLG0sbD97cGFzc2l2ZTohMX06dm9pZCAwKSx1PSExKX1lbHNlIDE9PT1jLmxlbmd0aCYmY1swXS50YXJnZXRFbGVtZW50PT09dD8obygpLGM9W10pOmM9Yy5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGFyZ2V0RWxlbWVudCE9PXR9KX19KTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEluaXRpYWxpemF0aW9uIHNjcmlwdCBmb3IgZ2xvYmFsIHByb2Nlc3Nlc1xuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cbi8qKlxuICpcbiAqIEluaXRpYWxpemUgZml0VmlkIGZvciBZb3VUdWJlIHZpZW9zLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG5cblx0RHJ1cGFsLmJlaGF2aW9ycy5maXR2aWRpbml0ID0ge1xuXHQgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblx0XHRcdChmdW5jdGlvbiAoJCkge1xuXHRcdFx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHRcdFx0XHRcdCQoJy52aWRlby1jb250YWluZXInKS5maXRWaWRzKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSkoalF1ZXJ5KTtcblx0XHR9XG5cdH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIGFsZXJ0LlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFsZXJ0ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICB2YXIgYWxlcnRJZCA9ICQoJy5hbWFfX2FsZXJ0X193cmFwJykuYXR0cignaWQnKTtcbiAgICAgIHZhciBhbGVydENvb2tpZSA9IENvb2tpZXMuZ2V0KCdhbGVydENvb2tpZScpO1xuICAgICAgdmFyIGFsZXJ0Tm9kZSA9IENvb2tpZXMuZ2V0KCdhbGVydE5vZGUnKTtcblxuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgIC8vIElmIHRoZSAnaGlkZSBjb29raWUgaXMgbm90IHNldCB3ZSBzaG93IHRoZSBhbGVydFxuICAgICAgICBpZiAoKGFsZXJ0Tm9kZSAhPT0gYWxlcnRJZCkgfHwgKGFsZXJ0Q29va2llICE9PSAnMScpKSB7XG4gICAgICAgICAgJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5jc3Moe1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uXCI6IFwib3BhY2l0eSAuMTVzXCIsXG4gICAgICAgICAgICBcIm9wYWNpdHlcIjogXCIxXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkKCcuYW1hX19hbGVydF9fd3JhcCcpLmNzcyh7XG4gICAgICAgICAgICBcImRpc3BsYXlcIjogXCJub25lXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0aGUgZXZlbnQgdGhhdCBjbG9zZXMgdGhlIHBvcHVwIGFuZCBzZXRzIHRoZSBjb29raWUgdGhhdCB0ZWxscyB1cyB0b1xuICAgICAgICAvLyBub3Qgc2hvdyBpdCBhZ2FpbiB1bnRpbCBvbmUgZGF5IGhhcyBwYXNzZWQuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmFtYV9fYWxlcnRfX2Nsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5jc3Moe1xuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uXCI6IFwib3BhY2l0eSAyc1wiLFxuICAgICAgICAgICAgXCJvcGFjaXR5XCI6IFwiMFwiLFxuICAgICAgICAgICAgXCJkaXNwbGF5XCI6IFwibm9uZVwiXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIGNvb2tpZXNcbiAgICAgICAgICBDb29raWVzLnNldCgnYWxlcnRDb29raWUnLCAnMScsIHsgZXhwaXJlczogMX0pO1xuICAgICAgICAgIENvb2tpZXMuc2V0KCdhbGVydE5vZGUnLCBhbGVydElkLCB7IGV4cGlyZXM6IDF9KTtcblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9KShqUXVlcnkpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEZvcm0gZmllbGRzIG1hc2tpbmdcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmZvcm1JdGVtcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAvLyBEbyBub3QgZXhlY3V0ZSBpbiB0aGUgbGF5b3V0IGJ1aWxkZXIgZWRpdCBkaWFsb2dcbiAgICAgICAgICBpZiAoISQoJy5qcy1vZmYtY2FudmFzLWRpYWxvZy1vcGVuJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCcubXVsdGlzZWxlY3QnKS5tdWx0aXNlbGVjdCgpO1xuXG4gICAgICAgICAgICAkKCcuYW1hX190b29sdGlwJykudG9vbHRpcCh7XG4gICAgICAgICAgICAgIHRvb2x0aXBDbGFzczogXCJhbWFfX3Rvb2x0aXAtYnViYmxlXCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBjb3VudF9yZW1haW5pbmdfY2hhcmFjdGVyKCkge1xuICAgICAgICAgICAgICB2YXIgbWF4X2xlbmd0aCA9IDE1MDtcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9lbnRlcmVkID0gJCgnLnRleHRhcmVhJykudmFsKCkubGVuZ3RoO1xuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX3JlbWFpbmluZyA9IG1heF9sZW5ndGggLSBjaGFyYWN0ZXJfZW50ZXJlZDtcbiAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLmh0bWwoY2hhcmFjdGVyX3JlbWFpbmluZyk7XG4gICAgICAgICAgICAgIGlmIChtYXhfbGVuZ3RoIDwgY2hhcmFjdGVyX2VudGVyZWQpIHtcbiAgICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLnRleHRhcmVhJykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBqUXVlcnlVSSBzZWxlY3RtZW51IG1ldGhvZCB0byBpbml0aWF0ZSBjdXN0b20gZHJvcGRvd24gbWVudVxuICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5zZWxlY3RtZW51KCk7XG5cbiAgICAgICAgICAvLyBXYWl0IGZvciBhIHNob3J0IGRlbGF5IHRvIGVuc3VyZSB0aGUgbWVudSBpcyBmdWxseSBsb2FkZWQgYW5kIGluaXRpYWxpemVkXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIFNldCBhcmlhLWxhYmVsIG9uIHNlbGVjdG1lbnUgYnV0dG9uXG4gICAgICAgICAgICB2YXIgaW5pdGl0YWxTZWxlY3RlZE9wdGlvblRleHQgPSAkKCcudWktc2VsZWN0bWVudS1tZW51JykuZmluZCgnZGl2LnVpLXN0YXRlLWFjdGl2ZScpLnRleHQoKTtcbiAgICAgICAgICAgICQoJy51aS1zZWxlY3RtZW51LW1lbnUnKS5maW5kKCdkaXYudWktc3RhdGUtYWN0aXZlJykuYXR0cignYXJpYS1sYWJlbCcsICdTb3J0IGJ5ICcgKyBpbml0aXRhbFNlbGVjdGVkT3B0aW9uVGV4dCk7XG4gICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgIC8vIFNldCBhcmlhLWxhYmVsIG9uIHNlbGVjdG1lbnUgYnV0dG9uIHdoZW4gYW4gb3B0aW9uIGlzIHNlbGVjdGVkXG4gICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLnNlbGVjdG1lbnUoe1xuICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgICAgICAgICAgLy8gR2V0IHRoZSB0ZXh0IG9mIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgb3B0aW9uXG4gICAgICAgICAgICAgIHZhciBzZWxlY3RlZE9wdGlvblRleHQgPSAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnRleHQoKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vIFNldCB0aGUgYXJpYS1sYWJlbCBhdHRyaWJ1dGUgdG8gdGhlIHRleHQgb2YgdGhlIHNlbGVjdGVkIG9wdGlvblxuICAgICAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0JykubmV4dCgnLnVpLXNlbGVjdG1lbnUtYnV0dG9uJykuZmluZCgnLnVpLXNlbGVjdG1lbnUtdGV4dCcpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnU29ydHkgYnkgJyArIHNlbGVjdGVkT3B0aW9uVGV4dCk7XG4gICAgICAgICAgICAgICQoJy51aS1zZWxlY3RtZW51LW1lbnUnKS5maW5kKCcudWktbWVudS1pdGVtIGRpdi51aS1zdGF0ZS1hY3RpdmUnKS5hdHRyKCdhcmlhLWxhYmVsJywgJ1NvcnQgYnkgJyArIHNlbGVjdGVkT3B0aW9uVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFJlZnJlc2ggbWVudSB0byBzZXQgY2hhbmdlc1xuICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5zZWxlY3RtZW51KCdyZWZyZXNoJyk7XG5cbiAgICAgICAgICAgIC8vIElmIGZvY3VzIGlzIG9uIHRoZSBzZWxlY3QgbWVudVxuICAgICAgICAgICAgLy8gT25seSBzdWJtaXQgYWZ0ZXIgaGl0dGluZyBlbnRlclxuICAgICAgICAgICAgJCgnI2VkaXQtc29ydC1ieS0tMy1idXR0b24nKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgaWYoZS53aGljaCA9PSA5KSB7XG4gICAgICAgICAgICAgICAgJCgnI2VkaXQtc29ydC1ieS0tMy1idXR0b24nKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgIGlmKGUud2hpY2ggPT0gMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaC1zb2xycGFnZS0yJykuc3VibWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBTdWJtaXRzIHRoZSBzZWFyY2ggZm9ybSBhZnRlciBhIHNlbGVjdCBtZW51IGl0ZW1zIGhhcyBiZWVuIHNlbGVjdGVkXG4gICAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0Om5vdCgjZWRpdC1zb3J0LWJ5LS0zKScpLm9uKCdzZWxlY3RtZW51Y2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICQoJyNibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2gtc29scnBhZ2UtMicpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoJyNlZGl0LXNvcnQtYnktLTMtbWVudScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCcjYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNoLXNvbHJwYWdlLTInKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAkKCcjZWRpdC1zb3J0LWJ5LS0zLW1lbnUnKS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gU3RhcnQgc2VhcmNoIGZpbHRlclxuXG4gICAgICAgICAgICB2YXIgYXZhaWxhYmxlVGFncyA9IFtcbiAgICAgICAgICAgICAgXCJBbGFiYW1hXCIsXG4gICAgICAgICAgICAgIFwiQWxhc2thXCIsXG4gICAgICAgICAgICAgIFwiQW1lcmljYW4gU2Ftb2FcIixcbiAgICAgICAgICAgICAgXCJBcml6b25hXCIsXG4gICAgICAgICAgICAgIFwiQXJrYW5zYXNcIixcbiAgICAgICAgICAgICAgXCJDYWxpZm9ybmlhXCIsXG4gICAgICAgICAgICAgIFwiQ29sb3JhZG9cIixcbiAgICAgICAgICAgICAgXCJDb25uZWN0aWN1dFwiLFxuICAgICAgICAgICAgICBcIkRlbGF3YXJlXCIsXG4gICAgICAgICAgICAgIFwiRGlzdHJpY3QgT2YgQ29sdW1iaWFcIixcbiAgICAgICAgICAgICAgXCJGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWFcIixcbiAgICAgICAgICAgICAgXCJGbG9yaWRhXCIsXG4gICAgICAgICAgICAgIFwiR2VvcmdpYVwiLFxuICAgICAgICAgICAgICBcIkd1YW1cIixcbiAgICAgICAgICAgICAgXCJIYXdhaWlcIixcbiAgICAgICAgICAgICAgXCJJZGFob1wiLFxuICAgICAgICAgICAgICBcIklsbGlub2lzXCIsXG4gICAgICAgICAgICAgIFwiSW5kaWFuYVwiLFxuICAgICAgICAgICAgICBcIklvd2FcIixcbiAgICAgICAgICAgICAgXCJLYW5zYXNcIixcbiAgICAgICAgICAgICAgXCJLZW50dWNreVwiLFxuICAgICAgICAgICAgICBcIkxvdWlzaWFuYVwiLFxuICAgICAgICAgICAgICBcIk1haW5lXCIsXG4gICAgICAgICAgICAgIFwiTWFyc2hhbGwgSXNsYW5kc1wiLFxuICAgICAgICAgICAgICBcIk1hcnlsYW5kXCIsXG4gICAgICAgICAgICAgIFwiTWFzc2FjaHVzZXR0c1wiLFxuICAgICAgICAgICAgICBcIk1pY2hpZ2FuXCIsXG4gICAgICAgICAgICAgIFwiTWlubmVzb3RhXCIsXG4gICAgICAgICAgICAgIFwiTWlzc2lzc2lwcGlcIixcbiAgICAgICAgICAgICAgXCJNaXNzb3VyaVwiLFxuICAgICAgICAgICAgICBcIk1vbnRhbmFcIixcbiAgICAgICAgICAgICAgXCJOZWJyYXNrYVwiLFxuICAgICAgICAgICAgICBcIk5ldmFkYVwiLFxuICAgICAgICAgICAgICBcIk5ldyBIYW1wc2hpcmVcIixcbiAgICAgICAgICAgICAgXCJOZXcgSmVyc2V5XCIsXG4gICAgICAgICAgICAgIFwiTmV3IE1leGljb1wiLFxuICAgICAgICAgICAgICBcIk5ldyBZb3JrXCIsXG4gICAgICAgICAgICAgIFwiTm9ydGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICAgICAgXCJOb3J0aCBEYWtvdGFcIixcbiAgICAgICAgICAgICAgXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIixcbiAgICAgICAgICAgICAgXCJPaGlvXCIsXG4gICAgICAgICAgICAgIFwiT2tsYWhvbWFcIixcbiAgICAgICAgICAgICAgXCJPcmVnb25cIixcbiAgICAgICAgICAgICAgXCJQYWxhdVwiLFxuICAgICAgICAgICAgICBcIlBlbm5zeWx2YW5pYVwiLFxuICAgICAgICAgICAgICBcIlB1ZXJ0byBSaWNvXCIsXG4gICAgICAgICAgICAgIFwiUmhvZGUgSXNsYW5kXCIsXG4gICAgICAgICAgICAgIFwiU291dGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICAgICAgXCJTb3V0aCBEYWtvdGFcIixcbiAgICAgICAgICAgICAgXCJUZW5uZXNzZWVcIixcbiAgICAgICAgICAgICAgXCJUZXhhc1wiLFxuICAgICAgICAgICAgICBcIlV0YWhcIixcbiAgICAgICAgICAgICAgXCJWZXJtb250XCIsXG4gICAgICAgICAgICAgIFwiVmlyZ2luIElzbGFuZHNcIixcbiAgICAgICAgICAgICAgXCJWaXJnaW5pYVwiLFxuICAgICAgICAgICAgICBcIldhc2hpbmd0b25cIixcbiAgICAgICAgICAgICAgXCJXZXN0IFZpcmdpbmlhXCIsXG4gICAgICAgICAgICAgIFwiV2lzY29uc2luXCIsXG4gICAgICAgICAgICAgIFwiV3lvbWluZ1wiXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAkKCBcIiNzZWFyY2hfZmlsdGVyXCIgKS5hdXRvY29tcGxldGUoe1xuICAgICAgICAgICAgICBzb3VyY2U6IGF2YWlsYWJsZVRhZ3NcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkLnVpLmF1dG9jb21wbGV0ZS5wcm90b3R5cGUuX3Jlc2l6ZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHZhciB1bCA9IHRoaXMubWVudS5lbGVtZW50O1xuICAgICAgICAgICAgICB1bC5vdXRlcldpZHRoKHRoaXMuZWxlbWVudC5vdXRlcldpZHRoKCkpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICAvLyBTdGFydCBzZWFyY2ggZmlsdGVyIHdpdGggY2hlY2tib3hlc1xuXG4gICAgICAgICAgICB2YXIgZGF0YU1vZGVsID0gW1xuICAgICAgICAgICAgICB7dGV4dDogJ0FsYWJhbWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdBbGFza2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdBbWVyaWNhbiBTYW1vYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0FyaXpvbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdBcmthbnNhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0NhbGlmb3JuaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdDb2xvcmFkbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0Nvbm5lY3RpY3V0JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnRGVsYXdhcmUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdEaXN0cmljdCBPZiBDb2x1bWJpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0ZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0Zsb3JpZGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdHZW9yZ2lhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnR3VhbScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0hhd2FpaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0lkYWhvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSWxsaW5vaXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdJbmRpYW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSW93YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0thbnNhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0tlbnR1Y2t5JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTG91aXNpYW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWFpbmUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNYXJzaGFsbCBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWFyeWxhbmQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNYXNzYWNodXNldHRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWljaGlnYW4nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNaW5uZXNvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNaXNzaXNzaXBwaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01pc3NvdXJpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTW9udGFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05lYnJhc2thJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV2YWRhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEhhbXBzaGlyZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05ldyBKZXJzZXknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXcgTWV4aWNvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IFlvcmsnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOb3J0aCBDYXJvbGluYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05vcnRoIERha290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ09oaW8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdPa2xhaG9tYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ09yZWdvbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1BhbGF1JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnUGVubnN5bHZhbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnUHVlcnRvIFJpY28nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdSaG9kZSBJc2xhbmQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdTb3V0aCBDYXJvbGluYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1NvdXRoIERha290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1Rlbm5lc3NlZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1RleGFzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVXRhaCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1Zlcm1vbnQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdWaXJnaW4gSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnV2FzaGluZ3RvbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1dlc3QgVmlyZ2luaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdXaXNjb25zaW4nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdXeW9taW5nJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnJywgdmFsdWU6ICcnfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsQ2hhbmdlKCl7XG4gICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSAkKCcjbXlDaGVja0xpc3QnKS5jaGVja0xpc3QoJ2dldFNlbGVjdGlvbicpO1xuXG4gICAgICAgICAgICAgICQoJyNzZWxlY3RlZEl0ZW1zJykudGV4dChKU09OLnN0cmluZ2lmeShzZWxlY3Rpb24pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZihqUXVlcnkudWkuY2hlY2tMaXN0KSAhPSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICQoJyNmaWx0ZXJMaXN0JykuY2hlY2tMaXN0KHtcbiAgICAgICAgICAgICAgICBsaXN0SXRlbXM6IGRhdGFNb2RlbCxcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogc2VsQ2hhbmdlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCdmb3JtOm5vdChbY2xhc3MqPVwibGF5b3V0LWJ1aWxkZXJcIl0pIFt0eXBlPWNoZWNrYm94XScpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkKCdbdHlwZT1jaGVja2JveF0nKS5jaGVja2JveHJhZGlvKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCgnZm9ybTpub3QoW2NsYXNzKj1cImxheW91dC1idWlsZGVyXCJdKSBbdHlwZT1yYWRpb10nKS5jaGVja2JveHJhZGlvKCkuYnV0dG9uc2V0KCkuZmluZCgnbGFiZWwnKS5jc3MoJ3dpZHRoJywgJzE5LjQlJyk7XG5cbiAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLmtleXVwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBjb3VudF9yZW1haW5pbmdfY2hhcmFjdGVyKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gUmFuZ2UgRmllbGRcbiAgICAgICAgICAgIHZhciBsZWdlbmQgPSAkKCcuYW1hX19yYW5nZS1maWVsZF9fbGVnZW5kJyk7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gJCggXCIjY3VycmVudFZhbHVlXCIgKTtcblxuICAgICAgICAgICAgJChcIi5hbWFfX3JhbmdlLWZpZWxkXCIpLnNsaWRlcih7XG4gICAgICAgICAgICAgIGFuaW1hdGU6IHRydWUsXG4gICAgICAgICAgICAgIHJhbmdlOiAnbWluJyxcbiAgICAgICAgICAgICAgdmFsdWU6IDEsXG4gICAgICAgICAgICAgIG1pbjogMjAwMCxcbiAgICAgICAgICAgICAgbWF4OiA1MDAwLFxuICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGpRdWVyeSh0aGlzKS5maW5kKCcudWktc2xpZGVyLWhhbmRsZScpO1xuICAgICAgICAgICAgICAgIHZhciBidWJibGUgPSBqUXVlcnkoJzxkaXYgY2xhc3M9XCJhbWFfX3JhbmdlLWZpZWxkX192YWx1ZWJveFwiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIGhhbmRsZS5hcHBlbmQoYnViYmxlKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2dCwgdWkpIHtcbiAgICAgICAgICAgICAgICB1aS5oYW5kbGUuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgPSAnJCcgKyB1aS52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuYXBwZW5kKGxlZ2VuZCk7XG5cbiAgICAgICAgICAgIC8vIEZvcm0gYWNjb3JkaW9uXG4gICAgICAgICAgICAkKCBcIi50YWJsaXN0XCIgKS5hY2NvcmRpb24oe1xuICAgICAgICAgICAgICBoZWFkZXI6IFwiLmFtYV9fZm9ybS1zdGVwc19fc3RlcFwiLFxuICAgICAgICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBFeHBhbmQgbGlzdFxuICAgICAgICAgICAgZnVuY3Rpb24gZXhwYW5kTGlzdEFjY29yZGlvbihlbGVtZW50LCBvcGVuKXtcbiAgICAgICAgICAgICAgJChlbGVtZW50KS5hY2NvcmRpb24oe1xuICAgICAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGljb25zOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCIsXG4gICAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgYW5pbWF0ZTogNTAwLFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogb3BlbixcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZSA6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcbiAgICAgICAgICAgICAgICAgIGlmKCQodWkubmV3UGFuZWwpLmhhc0NsYXNzKCd1aS1hY2NvcmRpb24tY29udGVudC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICAkKHVpLm5ld1BhbmVsKS5wcmV2KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCh1aS5vbGRQYW5lbCkuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoJChcIi5hbWFfX2V4cGFuZC1saXN0XCIpLmZpbmQoJy51aS1jaGVja2JveHJhZGlvLWNoZWNrZWQnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZXhwYW5kTGlzdEFjY29yZGlvbignLmFtYV9fZXhwYW5kLWxpc3QnLCAwKTtcbiAgICAgICAgICAgICAgJChcIi5hbWFfX2V4cGFuZC1saXN0IC5hbWFfX2V4cGFuZC1saXN0X19oZWFkZXJcIikuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBleHBhbmRMaXN0QWNjb3JkaW9uKCcuYW1hX19leHBhbmQtbGlzdCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgJChcIi5hbWFfX2V4cGFuZC1saXN0XCIpLmNoaWxkcmVuKCcuYW1hX19leHBhbmQtbGlzdF9faGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDb2xsYXBzZSBhbGwgYWNjb3JkaW9uIHBhbmVsc1xuICAgICAgICAgICAgJCgnLmFtYV9fZmlsdGVyX19jb2xsYXBzZS1wYW5lbHMgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QgLnVpLWFjY29yZGlvbi1oZWFkZXInKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCd1aS1zdGF0ZS1hY3RpdmUnKSB8fCAkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gT3BlbiBhY2NvcmRpb24gcGFuZWxzIGZvciBtb2JpbGVcbiAgICAgICAgICAgICQoJy5hbWFfX2FwcGxpZWQtZmlsdGVyc19fc2hvdy1maWx0ZXJzJykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICQoJy5hbWFfX2V4cGFuZC1saXN0LCAuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3RhZ3MnKS5zbGlkZVRvZ2dsZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLnRleHQoJCh0aGlzKS5pcygnOnZpc2libGUnKSA/ICdIaWRlIEZpbHRlcicgOiAnRmlsdGVyJyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpc3RGaWx0ZXIoaW5wdXQsIGxpc3QpIHsgLy8gaGVhZGVyIGlzIGFueSBlbGVtZW50LCBsaXN0IGlzIGFuIHVub3JkZXJlZCBsaXN0XG4gICAgICAgICAgICAgIC8vIGN1c3RvbSBjc3MgZXhwcmVzc2lvbiBmb3IgYSBjYXNlLWluc2Vuc2l0aXZlIGNvbnRhaW5zKClcbiAgICAgICAgICAgICAgalF1ZXJ5LmV4cHJbJzonXS5Db250YWlucyA9IGZ1bmN0aW9uKGEsaSxtKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGEudGV4dENvbnRlbnQgfHwgYS5pbm5lclRleHQgfHwgXCJcIikudG9VcHBlckNhc2UoKS5pbmRleE9mKG1bM10udG9VcHBlckNhc2UoKSk+PTA7XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgJChpbnB1dCkuY2hhbmdlKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlciA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgICAgaWYoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGZpbmRzIGFsbCBsaW5rcyBpbiBhIGxpc3QgdGhhdCBjb250YWluIHRoZSBpbnB1dCxcbiAgICAgICAgICAgICAgICAgIC8vIGFuZCBoaWRlIHRoZSBvbmVzIG5vdCBjb250YWluaW5nIHRoZSBpbnB1dCB3aGlsZSBzaG93aW5nIHRoZSBvbmVzIHRoYXQgZG9cbiAgICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcInNwYW46bm90KDpDb250YWlucyhcIiArIGZpbHRlciArIFwiKSlcIikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwic3BhbjpDb250YWlucyhcIiArIGZpbHRlciArIFwiKVwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcImxhYmVsXCIpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgc2hvdyByZXN1bHRzIGFmdGVyIDMgY2hhcmFjdGVycyBhcmUgZW50ZXJlZFxuICAgICAgICAgICAgICB9KS5rZXl1cCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYoIHRoaXMudmFsdWUubGVuZ3RoIDwgNCApIHJldHVybjtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNoYW5nZSgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RGaWx0ZXIoJChcIiNhbWFfX3NlYXJjaF9fbG9jYXRpb25cIiksICQoXCIuYW1hX19mb3JtLWdyb3VwXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWFrZSB0aGUgZW50aXJlIHN1YnNjcmliZSBidXR0b24gY2xpY2thYmxlLlxuICAgICAgICAgICQoJ2Zvcm0uc2FsZXNmb3JjZS1zdWJzY3JpYmUtZm9ybSwgLmFtYV9faW5wdXQtd3JhcHBlci0tc3Vic2NyaWJlLW5ld3MnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2FsZXNmb3JjZS1zdWJzY3JpYmUtZm9ybScpKSB7XG4gICAgICAgICAgICAgICQodGhpcykuc3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIGxpbmsgPSAkKHRoaXMpLmZpbmQoJ2EnKS5hdHRyKCdocmVmJyk7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBsaW5rO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYoJCgnLnBhcmFncmFwaC0tdHlwZS0tZm9ybS01MC01MCBkaXYuc3VjY2Vzc19tZXNzYWdlJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCcucGFyYWdyYXBoLS10eXBlLS1mb3JtLTUwLTUwJykuZmluZCgnLmZvcm0tY29udGVudCcpLmFkZENsYXNzKCdzdWNjZXNzJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9KShqUXVlcnkpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFJpYmJvbiBuYXYgdXNlciBpbnRlcmFjdGlvbnMuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuICdhbm9ueW1vdXMgY2xvc3VyZScuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnJpYmJvbm5hdiA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc19hY3RpdmUgPSAnaXMtYWN0aXZlJztcblxuICAgICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duX190cmlnZ2VyJywgdGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgLy8gVW5mb2N1cyBvbiB0aGUgZHJvcGRvd24uXG4gICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyBmb3IgQ1NTLlxuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIHRvIHRoZSBkcm9wZG93biBVTC5cbiAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCkudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duX190cmlnZ2VyJywgdGhpcykucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBTdWJjYXRlZ29yeVxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnN1YmNhdGVnb3JpZXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgLy8gQ3JlYXRlIHN0YXRpYyB2YXIgZm9yIHN1YmNhdGVnb3J5IGl0ZW0gY291bnQuIFRvIGJlIHVzZWQgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgcmVjYWxjdWxhdGlvbnMgYXJlIG5lZWRlZC5cbiAgICAgIHZhciBzdWJjYXRlZ29yeUV4cGxvcmF0aW9uQ29sdW1ucyA9IDA7XG5cbiAgICAgIGZ1bmN0aW9uIGNoZWNrU2l6ZSgpIHtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zdWJjYXRlZ29yeScpO1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5Q29udGFpbmVyID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX2NvbnRhaW5lcicpO1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5VGl0bGUgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdGl0bGUnKTtcbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgd2lkdGggbWludXMgcGFkZGluZyBzbyB1c2Ugd2lkdGgoKSBpbnN0ZWFkIG9mIGlubmVyV2lkdGgoKS5cbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5RXhwbG9yYXRpb25XaWR0aCA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzJykud2lkdGgoKTtcbiAgICAgICAgLy8gU3ViY2F0ZWdvcnkgaXRlbXMgaGF2ZSBtYXgtd2lkdGggb2YgMTgwcHguIFRoaXMgd2lsbCBiZSB1c2VkIGZvciBjYWxjdWxhdGlvbnMgaW5zdGVhZCBvZiBleHRyYWN0aW5nIGl0IHZpYSBqUXVlcnkgY2FsbHMuXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUl0ZW1XaWR0aCA9IDE4MDtcbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5VGl0bGVXaWR0aCA9ICRzdWJjYXRlZ29yeVRpdGxlLm91dGVyV2lkdGgoKTtcbiAgICAgICAgdmFyIHRvdGFsR3JpZEl0ZW1zID0gJHN1YmNhdGVnb3J5Lmxlbmd0aCArIDE7XG4gICAgICAgIC8vIFN0YXJ0IGNvbHVtbiBjb3VudCBhcyBsb3dlc3QgcG9zc2libGUuXG4gICAgICAgIHZhciBjb2x1bW5Db3VudCA9IDI7XG4gICAgICAgIC8vIFNldCBzdWJjYXRlZ29yeSByb3cgaXRlbXMgdG8gbG93ZXN0IHRoYXQgc2hvdWxkIGRpc3BsYXkuXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUl0ZW1zUGVyUm93ID0gTWF0aC5mbG9vcigoc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbldpZHRoIC0gc3ViY2F0ZWdvcnlUaXRsZVdpZHRoKSAvIHN1YmNhdGVnb3J5SXRlbVdpZHRoKTtcblxuICAgICAgICBpZiAoc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyA8IDIpIHtcbiAgICAgICAgICAvLyBUaGUgbWluaW11bSBzdWJjYXRlZ29yeSBpdGVtcyBwZXIgcm93IHNob3VsZCBiZSB0d28uIElmIHRoZSB2YXJpYWJsZSBjb21wdXRlZCB0byBsZXNzLCBtYW51YWxseSBjb3JyZWN0IGl0LlxuICAgICAgICAgIHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgPSAyO1xuICAgICAgICAgIHRvdGFsR3JpZEl0ZW1zID0gdG90YWxHcmlkSXRlbXMgLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbkNvdW50ID0gc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyArIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgaWYgY2hhbmdlcyBpbiBjb2x1bW4gY291bnQgaGFzIG9jY3VycmVkIGFuZCBhY3QgYWNjb3JkaW5nbHlcbiAgICAgICAgaWYgKHN1YmNhdGVnb3J5RXhwbG9yYXRpb25Db2x1bW5zICE9PSBjb2x1bW5Db3VudCkge1xuICAgICAgICAgIC8vIERldGVybWluZSBhZGRpdGlvbmFsIFwiZmlsbGVyLWJveFwiIG5lZWRlZCB0byBjcmVhdGUgY29tcGxldGUgcm93XG4gICAgICAgICAgdmFyIGZpbGxlckJveENvdW50ID0gY29sdW1uQ291bnQgLSAodG90YWxHcmlkSXRlbXMgJSBjb2x1bW5Db3VudCk7XG4gICAgICAgICAgZmlsbEdyaWRSb3coJHN1YmNhdGVnb3J5Q29udGFpbmVyLCBmaWxsZXJCb3hDb3VudCk7XG4gICAgICAgICAgLy8gVXBkYXRlIHBlcnNpc3RlbnQgY29sdW1uIGNvdW50XG4gICAgICAgICAgc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbkNvbHVtbnMgPSBjb2x1bW5Db3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSB2aWV3YWJsZSBzdWJjYXRlZ29yaWVzLlxuICAgICAgICAkc3ViY2F0ZWdvcnkuaGlkZSgpO1xuICAgICAgICAkc3ViY2F0ZWdvcnkuc2xpY2UoMCwgc3ViY2F0ZWdvcnlJdGVtc1BlclJvdykuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuXG4gICAgICAgIHZpZXdNb3JlKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHZpZXdNb3JlKCkge1xuICAgICAgICB2YXIgJHZpZXdMZXNzID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctbGVzcycpO1xuICAgICAgICB2YXIgJHZpZXdNb3JlID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctYWxsJyk7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnkgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc3ViY2F0ZWdvcnknKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeUNvbnRhaW5lciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX19jb250YWluZXInKTtcblxuICAgICAgICAkdmlld0xlc3MuaGlkZSgpO1xuICAgICAgICAkdmlld01vcmUuc2hvdygpO1xuXG4gICAgICAgICQoJy52aWV3QWxsJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5LmZhZGVJbigpO1xuICAgICAgICAgICR2aWV3TW9yZS5oaWRlKCk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5Q29udGFpbmVyLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICR2aWV3TGVzcy5zaG93KCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnZpZXdMZXNzJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5LmhpZGUoKTtcbiAgICAgICAgICBjaGVja1NpemUoKTtcbiAgICAgICAgICAkdmlld0xlc3MuaGlkZSgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeUNvbnRhaW5lci5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAkdmlld01vcmUuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuXG4gICAgICBmdW5jdGlvbiBmaWxsR3JpZFJvdygkY29udGFpbmVyLCBjb3VudCkge1xuICAgICAgICB2YXIgZmlsbGVyQm94ID0gJzxkaXYgY2xhc3M9XCJmaWxsZXItYm94XCI+PC9kaXY+JztcbiAgICAgICAgLy8gY2xlYXIgb3V0IGN1cnJlbnQgZmlsbGVyIGJveGVzXG4gICAgICAgIHZhciAkZmlsbGVyQm94ZXMgPSAkY29udGFpbmVyLmZpbmQoJy5maWxsZXItYm94Jyk7XG4gICAgICAgICRmaWxsZXJCb3hlcy5yZW1vdmUoKTtcbiAgICAgICAgLy8gZmlsbCBvdXQgZ3JpZCByb3dcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoZmlsbGVyQm94KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBydW4gdGVzdCBvbiBpbml0aWFsIHBhZ2UgbG9hZFxuICAgICAgY2hlY2tTaXplKCk7XG5cbiAgICAgIC8vIHJ1biB0ZXN0IG9uIHJlc2l6ZSBvZiB0aGUgd2luZG93XG4gICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hlY2tTaXplKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKj09PT09PSBqUXVlcnkgVUkgdGFicyA9PT09PT0qL1xuXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3RhYnMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBkZWZhdWx0QWN0aXZlVGFiID0gMDtcbiAgICAgIHZhciB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBpZiAodmlld3BvcnRXaWR0aCA+PSA2MDAgJiYgJCgnLmFtYV9fcmVzb3VyY2UtdGFicycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZGVmYXVsdEFjdGl2ZVRhYiA9IDE7XG4gICAgICB9XG5cbiAgICAgICQoXCIuYW1hX190YWJzLCAuYW1hX19yZXNvdXJjZS10YWJzXCIpLnRhYnMoe1xuICAgICAgICBhY3RpdmU6IGRlZmF1bHRBY3RpdmVUYWIsXG4gICAgICAgIGFjdGl2YXRlOiByZW1vdmVIaWdobGlnaHRzXG4gICAgICB9KTtcblxuICAgICAgLy8gUHJldmVudCBqdW1wIG9uY2xpY2tcbiAgICAgICQoJy51aS10YWJzLWFuY2hvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cblxuICAgICAgLy9TaW11bGF0ZSBjbGljayBldmVudCBvbiBhY3R1YWwgc2ltcGxlVGFicyB0YWIgZnJvbSBtb2JpbGUgZHJvcCBkb3duLlxuICAgICAgJCgnLmFtYV9fdGFicy1uYXZpZ2F0aW9uLS1tb2JpbGUgc2VsZWN0Jykub24oXCJzZWxlY3RtZW51Y2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCwgdWkpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSB1aS5pdGVtLnZhbHVlO1xuICAgICAgICAkKCdhW2hyZWY9XCIjJyArIHNlbGVjdGVkVmFsdWUgKyAnXCJdJykuY2xpY2soKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBXaGVuIGNsaWNraW5nIGFuIGlubGluZSByZXNvdXJjZSBwYWdlIGxpbmsgcmVmZXJlbmNpbmcgYSB0YWIsIG9wZW4gcmVmZXJlbmNlZCB0YWIuXG4gICAgICAkKCcuYW1hX19yZXNvdXJjZS1saW5rLS1pbmxpbmUsIC5hbWFfX3BhZ2UtLXJlc291cmNlX19yZXNvdXJjZS1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyICR0YWJzID0gJCgnLmFtYV9fcmVzb3VyY2UtdGFicycpO1xuICAgICAgICBzd2l0Y2hUYWJzKCR0YWJzLCB0aGlzKTtcbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiByZW1vdmVIaWdobGlnaHRzKCkge1xuICAgICAgICAkKCcuYW1hX3Jlc291cmNlLWhlYWRlci0taGlnaGxpZ2h0JykucmVtb3ZlQ2xhc3MoJ2FtYV9yZXNvdXJjZS1oZWFkZXItLWhpZ2hsaWdodCcpO1xuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICogVGhpcyBmdW5jdGlvbiBhbmltYXRlcyB0aGUgYnJvd3NlciBzY3JvbGwgYWN0aW9uIHdpdGggYXR0ZW50aW9uIHRvIGtleWJvYXJkIG9ubHkgYWNjZXNzaWJpbGl0eSBjb25jZXJuc1xuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5IE9iamVjdH0gJHRhYk5hdlxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFyZ2V0XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbCgkdGFiTmF2LCB0YWJIYXNoLCBwb3NpdGlvbkluVGFiKSB7XG4gICAgICAgIHZhciBzY3JvbGxUYXJnZXQgPSB3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMjAwID8gJy5hbWFfX3Jlc291cmNlLXRhYnNfX2NvbnRlbnQnIDogJ2h0bWwsYm9keSc7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHByZXZpb3VzIGhpZ2hsaWdodHMsIGlmIGFueVxuICAgICAgICByZW1vdmVIaWdobGlnaHRzKCk7XG5cbiAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGFyZ2V0IGVsZW1lbnQgb2Zmc2V0LCBidXQgZGVmYXVsdCB0byB6ZXJvXG4gICAgICAgIHZhciBzY3JvbGxQb3NpdGlvbiA9IDA7XG4gICAgICAgIHZhciAkdGFyZ2V0O1xuICAgICAgICBpZiAocG9zaXRpb25JblRhYiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIHRhYkVsZW1lbnRzID0gJCh0YWJIYXNoICsgJyAuYW1hX19yZXNvdXJjZS10YWJzX19pdGVtJyk7XG4gICAgICAgICAgaWYgKHRhYkVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gSWYgZGVzaXJlZCBwb3NpdGlvbiBpcyBsYXJnZXIgdGhhbiB0aGUgcmVzdWx0IHNldCwgdXNlIHRoZSBsYXN0IGVsZW1lbnRcbiAgICAgICAgICAgIGlmICh0YWJFbGVtZW50cy5sZW5ndGggPD0gcG9zaXRpb25JblRhYikge1xuICAgICAgICAgICAgICBwb3NpdGlvbkluVGFiID0gdGFiRWxlbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXNlcnMgYXJlIGluc3RydWN0ZWQgdG8gY29uc2lkZXIgMSBhcyB0aGUgZmlyc3QgZWxlbWVudFxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRhYkVsZW1lbnRzW3Bvc2l0aW9uSW5UYWIgLSAxXTtcbiAgICAgICAgICAgIHNjcm9sbFBvc2l0aW9uID0gdGFyZ2V0Lm9mZnNldFRvcDtcbiAgICAgICAgICAgIC8vIEFkZCBoaWdobGlnaHQgdG8gdGFyZ2V0XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJCh0YXJnZXQpLmZpbmQoJy5hbWFfcmVzb3VyY2UtaGVhZGVyJyk7IC8vIHNhdmUgZm9yIHVzZSBpbiBhbmltYXRlKCkgY2FsbGJhY2tcbiAgICAgICAgICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2FtYV9yZXNvdXJjZS1oZWFkZXItLWhpZ2hsaWdodCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkdGFyZ2V0ID0gJCh0YWJIYXNoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJChzY3JvbGxUYXJnZXQpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsUG9zaXRpb25cbiAgICAgICAgfSwgODUwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gVXBkYXRlIGZvY3VzIGZvciBrZXlib2FyZCBvbmx5IG5hdmlnYXRpb25cbiAgICAgICAgICAkdGFyZ2V0LmF0dHIoJ3RhYmluZGV4JywgJy0xJykuZm9jdXMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLypcbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gb3BlbnMgcmVmZXJlbmNlZCB0YWJzIGZyb20gaW5saW5lIGxpbmtzXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFiT2JqIFRoZSBlbGVtZW50IHdoaWNoIGhhcyB0aGUgLnRhYigpIGZ1bmN0aW9uIGF0dGFjaGVkLlxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBsaW5rXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHN3aXRjaFRhYnMoJHRhYk9iaiwgbGluaykge1xuXG4gICAgICAgIHZhciBsaW5rSGFzaCA9IGxpbmsuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgICAgdmFyIHdpZGdldCA9ICR0YWJPYmouZGF0YSgndWktdGFicycpO1xuXG4gICAgICAgIHZhciB0YWJIYXNoLCBwb3NpdGlvbkluVGFiO1xuICAgICAgICB2YXIgcGFydHMgPSBsaW5rSGFzaC5zcGxpdCgnLScpO1xuICAgICAgICB0YWJIYXNoID0gcGFydHNbMF07XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcG9zaXRpb25JblRhYiA9IHBhcnRzWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIElmIG9sZCBsaW5rLCB0cnkgdG8gZGV0ZXJtaW5lIHBvc2l0aW9uIGZyb20gbGluayB0ZXh0XG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSBsaW5rLmlubmVyVGV4dC5tYXRjaCgvKFswLTldKykvZyk7XG4gICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uSW5UYWIgPSBtYXRjaGVzLnNoaWZ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW5zdXJlIGNvcnJlY3QgdGFiIGlzIGFjdGl2ZVxuICAgICAgICB2YXIgdGFiSW5kZXggPSB3aWRnZXQuX2dldEluZGV4KHRhYkhhc2gpO1xuICAgICAgICAkdGFiT2JqLnRhYnMoe1xuICAgICAgICAgIGFjdGl2ZTogdGFiSW5kZXhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRvcCBvZiB1aSB0YWJzIG5hdmlnYXRpb25cbiAgICAgICAgc21vb3RoU2Nyb2xsKCR0YWJPYmosIHRhYkhhc2gsIHBvc2l0aW9uSW5UYWIpO1xuXG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyo9PT09PT0galF1ZXJ5IFVJIGFjY29yZGlvbiA9PT09PT0qL1xuXG4oZnVuY3Rpb24oJCkge1xuICAgICQoIFwiLmFtYV9fYWNjb3JkaW9uXCIgKS5hY2NvcmRpb24oe1xuICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCIsXG4gICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgfSk7XG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgdmFyIHZlcmlmeUZpZWxkcyA9IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICB2YXIgJHNlY3Rpb25zID0gZm9ybS5maW5kKCdzZWN0aW9uJyk7XG4gICAgdmFyICRpbnB1dHMgPSAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gc2VjdGlvbiAqJykuZmlsdGVyKCc6aW5wdXQnKTtcbiAgICB2YXIgJGljb25FbGVtZW50ID0gJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpO1xuICAgIHZhciBlcnJvclNlY3Rpb25zID0gW107XG5cbiAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24oaSwgaW5wdXQpIHtcbiAgICAgICRjbG9zZXN0U2VjdGlvbiA9ICQodGhpcykuY2xvc2VzdCgnc2VjdGlvbicpLmF0dHIoJ2RhdGEtZHJ1cGFsLXNlbGVjdG9yJykudG9TdHJpbmcoKTtcbiAgICAgIGlmICgkKHRoaXMpLnByb3AoJ3JlcXVpcmVkJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXJyb3InKSkge1xuICAgICAgICBlcnJvclNlY3Rpb25zLnB1c2goJGNsb3Nlc3RTZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRzZWN0aW9ucy5lYWNoKGZ1bmN0aW9uKGksIHNlY3Rpb24pIHtcbiAgICAgIGlmICgkLmluQXJyYXkoJCh0aGlzKS5hdHRyKCdkYXRhLWRydXBhbC1zZWxlY3RvcicpLnRyaW0oKS50b1N0cmluZygpLCBlcnJvclNlY3Rpb25zKSAhPT0gLTEpIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCRpY29uRWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2VkaXQgZXJyb3IgY29tcGxldGVkJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCRpY29uRWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2VkaXQgZXJyb3IgY29tcGxldGVkJykuYWRkQ2xhc3MoJ2NvbXBsZXRlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcbiAgICB2YXIgZW1haWxSZWcgPSAvXihbXFx3LVxcLl0rQChbXFx3LV0rXFwuKStbXFx3LV17Miw0fSk/JC87XG4gICAgcmV0dXJuIGVtYWlsUmVnLnRlc3QoZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmllbGRJc1JlcXVpcmVkKGlucHV0KSB7XG4gICAgaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgaW5wdXQubmV4dCgpLnJlbW92ZSgnLmZvcm0taXRlbS0tZXJyb3ItbWVzc2FnZScpO1xuICAgIGlucHV0LmFmdGVyKCc8ZGl2IGNsYXNzPVwiZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlXCI+RmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0ZpZWxkKGlucHV0KSB7XG4gICAgaWYgKGlucHV0LnByb3AoJ3JlcXVpcmVkJykgJiYgKGlucHV0LnZhbCgpLmxlbmd0aCA9PT0gMCB8fCBpbnB1dC52YWwoKSA9PT0gXCJcIikpIHtcbiAgICAgIGZpZWxkSXNSZXF1aXJlZChpbnB1dCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKGlucHV0LmF0dHIoJ3R5cGUnKSA9PT0gJ2VtYWlsJyAmJiAhdmFsaWRhdGVFbWFpbChpbnB1dC52YWwoKSkpIHtcbiAgICAgICAgZmllbGRJc1JlcXVpcmVkKGlucHV0KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKS5uZXh0KCkucmVtb3ZlKCcuZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU3VibWl0cyBmaXJzdCBwYWdlIG9mIENvbnRhY3QgVXMgZm9ybSBvbiByYWRpbyBidXR0b24gc2VsZWN0aW9uXG4gICQuZm4uY29udGFjdFN1Ym1pdCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyICR3ZWJmb3JtX2J1dHRvbnMgPSAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWNvbnRhY3QtdXMtZm9ybSBpbnB1dFt0eXBlPVwicmFkaW9cIl0nKTtcbiAgICAkd2ViZm9ybV9idXR0b25zLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1jb250YWN0LXVzLWZvcm0nKS5zdWJtaXQoKTtcbiAgICB9KTtcbiAgfVxuICAkLmZuLmNvbnRhY3RTdWJtaXQoKTtcbiAgJCggZG9jdW1lbnQgKS5hamF4Q29tcGxldGUoZnVuY3Rpb24oKSB7XG4gICAgJC5mbi5jb250YWN0U3VibWl0KCk7XG4gIH0pO1xuXG4gIC8vIEdvIGJhY2sgdG8gcHJldmlvdXMgYmFjayBpcyB1c2VyIGNsaWNrcyBkZWNsaW5lIHN1Ym1pdCBidXR0b25cbiAgJCgnLmFtYV9fYnV0dG9uLS1kZWNsaW5lJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciA9PT0gXCJcIikge1xuICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZj0nLyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgaW5pdGlhbExvYWQgPSB0cnVlO1xuXG4gIERydXBhbC5iZWhhdmlvcnMud2ViRm9ybSA9IHtcbiAgICBkZXRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncywgdHJpZ2dlcikge1xuICAgICAgaWYgKHRyaWdnZXIgPT09ICdzZXJpYWxpemUnKSB7XG4gICAgICAgIGluaXRpYWxMb2FkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgaWYgKCFpbml0aWFsTG9hZCkge1xuICAgICAgICBpZiAoIWNvbnRleHQuaW5uZXJUZXh0Lm1hdGNoKFwiRXJyb3IgbWVzc2FnZVwiKSkge1xuICAgICAgICAgICQoJy5hbWFfX3NhbGVzLWxhbmRpbmctcGFnZV9fZm9ybV9faGVhZGluZycpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAkLnZhbGlkYXRvci5hZGRNZXRob2QoXG4gICAgICAgIFwicmVnZXhcIixcbiAgICAgICAgZnVuY3Rpb24odmFsdWUsIGVsZW1lbnQsIHJlZ2V4cCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIHx8IHJlZ2V4cC50ZXN0KHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJQbGVhc2UgY2hlY2sgeW91ciBpbnB1dC5cIlxuICAgICAgKTtcblxuICAgICAgLy8gT24gd2ViZm9ybSBzdWJtaXQgY2hlY2sgdG8gc2VlIGlmIGFsbCBpbnB1dHMgYXJlIHZhbGlkXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0nKS52YWxpZGF0ZSh7XG4gICAgICAgIGlnbm9yZTogW10sXG4gICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgJ2VtYWlsJzoge1xuICAgICAgICAgICAgZW1haWw6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgICd0ZWxlcGhvbmUnOiB7XG4gICAgICAgICAgICAncmVnZXgnOiAvXihcXCtcXGR7MSwyfVxccyk/XFwoP1xcZHszfVxcKT9bXFxzLi1dP1xcZHszfVtcXHMuLV0/XFxkezR9JC9cbiAgICAgICAgICB9LFxuICAgICAgICAgICdiaXJ0aF95ZWFyJzoge1xuICAgICAgICAgICAgJ3JlZ2V4JzogL14oMTl8MjApXFxkezJ9JC9cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbihlcnJvciwgZWxlbWVudCkge1xuICAgICAgICAgIGlmIChlbGVtZW50LmF0dHIoXCJ0eXBlXCIpID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQucGFyZW50KCkuc2libGluZ3MoKS5sYXN0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChlbGVtZW50LmlzKFwic2VsZWN0XCIpKSB7XG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50Lm5leHQoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkSGFuZGxlcjogZnVuY3Rpb24oZm9ybSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRvci5udW1iZXJPZkludmFsaWRzKCk7XG4gICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCQoJy5qcy1mb3JtLXR5cGUtcmFkaW8nKS5maW5kKCdsYWJlbC5lcnJvcicpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgJCgnLmpzLWZvcm0tdHlwZS1yYWRpbyBsYWJlbC5lcnJvcicpLnBhcmVudHMoJy5maWVsZHNldC13cmFwcGVyJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGlucHV0cyBhcmUgdmFsaWRcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIGxhYmVsLmVycm9yJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiggJCh0aGlzKS50ZXh0KCkgIT09ICcnKSB7XG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQWRkIHZhbGlkYXRpb24gdG8gc2VsZWN0IGRyb3Bkb3duIG1lbnVzIHVzaW5nIGpRdWVyeSBVSVxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIHNlbGVjdCcpLnNlbGVjdG1lbnUoe1xuICAgICAgICBzdHlsZTogJ2Ryb3Bkb3duJyxcbiAgICAgICAgdHJhbnNmZXJDbGFzc2VzOiB0cnVlLFxuICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKFwiLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtXCIpLnZhbGlkYXRlKCkuZWxlbWVudCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblxuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9tYWluTmF2aWdhdGlvbiA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICB2YXIgJGNhdGVnb3J5TmF2V3JhcHBlciA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl93cmFwcGVyJyksXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudScpLFxuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fZ3JvdXAnKSxcbiAgICAgICAgICAkbW9iaWxlU2VhcmNoVHJpZ2dlciA9ICQoJy5nbG9iYWwtc2VhcmNoLXRyaWdnZXInKSxcbiAgICAgICAgICAkbW9iaWxlU2VhcmNoID0gJCgnLmFtYV9fZ2xvYmFsLXNlYXJjaCcpLFxuICAgICAgICAgICRtYWluTmF2ID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uICcpLFxuICAgICAgICAgICRzdWJNZW51ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnKSxcbiAgICAgICAgICAkc3ViTWVudUFydGljbGUgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnKSxcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IDAsXG4gICAgICAgICAgcHJvZHVjdE5hdkhlaWdodCA9IDAsXG4gICAgICAgICAgY2F0ZWdvcnlOYXZNZW51SGVpZ2h0ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnUnKS5vdXRlckhlaWdodCgpLFxuICAgICAgICAgIGNhdGVnb3J5TmF2TWVudVJlc2l6ZWRIZWlnaHQgPSAwLFxuICAgICAgICAgIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCksXG4gICAgICAgICAgJGFsZXJ0X2Jhbm5lciA9ICQoJy5hbWFfX2FsZXJ0X193cmFwJyk7XG5cbiAgICAgIC8vIENoZWNrcyBpZiB1c2VyIGFnZW50IGlzIGEgbW9iaWxlIGRldmljZVxuICAgICAgdmFyIGRldmljZUFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIGFnZW50SUQgPSBkZXZpY2VBZ2VudC5tYXRjaCgvKGFuZHJvaWR8d2Vib3N8aXBob25lfGlwb2R8YmxhY2tiZXJyeSkvKSAmJiB3aW5kb3dXaWR0aCA8IDc2ODtcblxuICAgICAgLy8gU2V0IGFsZXJ0IGJhbm5lciBoZWlnaHQgaWYgcHJlc2VudC5cbiAgICAgIGlmKCRhbGVydF9iYW5uZXIubGVuZ3RoICYmICRhbGVydF9iYW5uZXIuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgYWxlcnRCYW5uZXJIZWlnaHQgPSAkYWxlcnRfYmFubmVyLm91dGVySGVpZ2h0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydEJhbm5lckhlaWdodCA9IDA7XG4gICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHdoZXRoZXIgb3Igbm90IHRoZSBjYXRlZ29yeSBuYXYgc2hvdWxkIGhhdmUgc2Nyb2xsYmFyc1xuICAgICAgZnVuY3Rpb24gY2F0ZWdvcnlOYXZIZWlnaHQocmVzaXplVmlld3BvcnRIZWlnaHQpIHtcblxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdmlld3BvcnQgaGVpZ2h0IGlzIHBhc3NlZCBiYWNrIHdoZW4gdGhlIHdpbmRvdyBnZXRzIHJlc2l6ZWRcbiAgICAgICAgaWYodHlwZW9mIHJlc2l6ZVZpZXdwb3J0SGVpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0ID0gcmVzaXplVmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gV2luZG93IGhlaWdodCBpcyB1c2VkIGJ5IGRlZmF1bHRcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCA/IHdpbmRvdy5pbm5lckhlaWdodCA6ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1YnRyYWN0IHRoZSBuYXZpZ2F0aW9uIGhlaWdodCBmcm9tIHdpbmRvdyBoZWlnaHQgdG8gYXNzZXNzIGNvbnRlbnQgaGVpZ2h0XG4gICAgICAgIGNhdGVnb3J5TmF2TWVudVJlc2l6ZWRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIG1haW4gbWVudSBwdXJwbGUgZHJvcGRvd24gaGVpZ2h0IGlzIGxhcmdlciB0aGFuIHZpZXdwb3J0IGhlaWdodFxuICAgICAgICBpZiAoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0ICsgJG1haW5OYXYub3V0ZXJIZWlnaHQoKSArIHByb2R1Y3ROYXZIZWlnaHQgPiB2aWV3cG9ydEhlaWdodCAmJiAhYWdlbnRJRCkge1xuXG4gICAgICAgICAgLy8gU2V0IHRoZSBtZW51IGRyb3Bkb3duIHRoZSBzYW1lIGFzIHZpZXdwb3J0IHRvIGVuYWJsZSBzY3JvbGxpbmdcbiAgICAgICAgICB2YXIgY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCA9IGNhdGVnb3J5TmF2TWVudVJlc2l6ZWRIZWlnaHQgLSAkbWFpbk5hdi5vdXRlckhlaWdodCgpIC0gcHJvZHVjdE5hdkhlaWdodCAtIGFsZXJ0QmFubmVySGVpZ2h0O1xuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAuYWRkQ2xhc3MoJ3Njcm9sbCcpLm91dGVySGVpZ2h0KGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpO1xuXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cC5vbignc2hvdy5zbWFwaScsIGZ1bmN0aW9uKGUsIG1lbnUpIHtcbiAgICAgICAgICAgIGlmKCQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19zdWJtZW51JywgbWVudSkub3V0ZXJIZWlnaHQoKSA+IGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnLCBtZW51KS5vdXRlckhlaWdodChjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2FydGljbGVzJywgbWVudSkub3V0ZXJIZWlnaHQoKSA+IGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2FydGljbGVzJywgbWVudSkub3V0ZXJIZWlnaHQoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCkuYWRkQ2xhc3MoJ29uZV9hcnRpY2xlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cC5yZW1vdmVDbGFzcygnc2Nyb2xsJykub3V0ZXJIZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAkc3ViTWVudS5vdXRlckhlaWdodCgnYXV0bycpO1xuICAgICAgICAgICRzdWJNZW51QXJ0aWNsZS5vdXRlckhlaWdodCgnYXV0bycpO1xuICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgLy8gSGlkZS9TaG93IG1lbnVcbiAgICAgIGZ1bmN0aW9uIGhpZGVTaG93KCkge1xuICAgICAgICBpZiAoJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuc2xpZGVEb3duKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0ICsgICRtYWluTmF2Lm91dGVySGVpZ2h0KCkgKyBwcm9kdWN0TmF2SGVpZ2h0ICsgYWxlcnRCYW5uZXJIZWlnaHQpID4gdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgYm9keVNjcm9sbExvY2suZGlzYWJsZUJvZHlTY3JvbGwoJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cCwge1xuICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmdW5jdGlvbiBhbGxvd1RvdWNoTW92ZShlbCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGVsICYmIGVsICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2JvZHktc2Nyb2xsLWxvY2staWdub3JlJykgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFnZW50SUQpIHtcbiAgICAgICAgICAgICAgLy8gT25seSBtYWtlIHRoZSBtZW51IGhlaWdodCBzYW1lIGFzIHZpZXdwb3J0IG9uIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgICAgIHZhciBtb2JpbGVIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICRjYXRlZ29yeU5hdldyYXBwZXIuaGVpZ2h0KG1vYmlsZUhlaWdodCkuYWRkQ2xhc3MoJ3Njcm9sbCcpO1xuXG4gICAgICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAub24oJ3Nob3cuc21hcGknLCBmdW5jdGlvbihlLCBtZW51KSB7XG4gICAgICAgICAgICAgICAgaWYoJChtZW51KS5vdXRlckhlaWdodCgpID4gbW9iaWxlSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAkKG1lbnUpLm91dGVySGVpZ2h0KG1vYmlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZVVwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGVpZ2h0KDApO1xuICAgICAgICAgICAgYm9keVNjcm9sbExvY2suY2xlYXJBbGxCb2R5U2Nyb2xsTG9ja3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDbG9zZXMgbWVudSBvbiBkb2MgbG9hZFxuICAgICAgJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgICAgJCgnLmFtYV9fZ2xvYmFsLW1lbnUnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBoaWRlU2hvdygpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIHN0aWNreSBuYXYgd3JhcHBlciwgcmVtb3ZlIGlkIHRvIHByZXZlbnQgZHVwbGljYXRlIGlkcy5cbiAgICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3RpY2t5V3JhcHBlciA9ICQoJ2hlYWRlci5zdGlja3ktbmF2Jyk7XG4gICAgICAgIGlmKCRzdGlja3lXcmFwcGVyLmxlbmd0aCAmJiAkc3RpY2t5V3JhcHBlci5oYXMoJyNzaGFyZS13cmFwcGVyJykpIHtcbiAgICAgICAgICAkc3RpY2t5V3JhcHBlci5yZW1vdmVBdHRyKCdpZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgYSB1c2VyIGNsaWNrcyBvdXRzaWRlIHRoZSBtZW51IHRoZW4gY2xvc2UgaXRcbiAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICghJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuaXMoZS50YXJnZXQpICYmICRjYXRlZ29yeU5hdmlnYXRpb25NZW51LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICBoaWRlU2hvdygpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJCgkbW9iaWxlU2VhcmNoVHJpZ2dlcikudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJG1vYmlsZVNlYXJjaC5zbGlkZVRvZ2dsZSgpO1xuICAgICAgICAkbW9iaWxlU2VhcmNoVHJpZ2dlci50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vU2V0IGZvY3VzIHN0YXRlIG9uIG1vYmlsZSB0cmlnZ2VyIGJ1dHRvblxuICAgICAgJCgkbW9iaWxlU2VhcmNoVHJpZ2dlcikuZm9jdXMoZnVuY3Rpb24oKXtcbiAgICAgICAgJG1vYmlsZVNlYXJjaFRyaWdnZXIuY3NzKCdvdXRsaW5lJywgJ291dGxpbmU6IDJweCBzb2xpZCAjODBkNGY1Jyk7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gbW92ZVNvY2lhbFNoYXJlUG9zaXRpb24oKXtcbiAgICAgICAgdmFyIG1haW5OYXZQb3NpdGlvbiA9ICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAuY29udGFpbmVyJykub2Zmc2V0KCkubGVmdDtcbiAgICAgICAgdmFyICRhbWFTb2NpYWxTaGFyZSA9ICQoJy5hbWFfX3NvY2lhbC1zaGFyZScpO1xuXG4gICAgICAgIC8vIENoZWNrcyB0byBzZWUgaWYgdGhlcmUgaXMgZW5vdWdoIGZvciB0aGUgc3RpY2t5IG5hdlxuICAgICAgICBpZihtYWluTmF2UG9zaXRpb24gPiA2MCkge1xuXG4gICAgICAgICAgdmFyIHNvY2lhbFN0aWNreVBvc2l0aW9uID0gbWFpbk5hdlBvc2l0aW9uIC0gNjA7XG4gICAgICAgICAgdmFyICRzb2NpYWxJY29ucyA9ICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZScpO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHZpZXdwb3J0IHdpZHRoIGlzIGdyZWF0ZXIgODUwcHggdGhlbiB0aGUgc29jaWFsIGljb25zIHdpbGwgYmUgc3RpY2t5XG4gICAgICAgICAgaWYoJHNvY2lhbEljb25zLmxlbmd0aCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDg1MCkge1xuICAgICAgICAgICAgJHNvY2lhbEljb25zLnN0aWNreSh7XG4gICAgICAgICAgICAgIHdyYXBwZXJDbGFzc05hbWU6ICdhbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZS13cmFwcGVyJyxcbiAgICAgICAgICAgICAgekluZGV4OiA1MDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkc29jaWFsSWNvbnMub24oJ3N0aWNreS1zdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgJGFtYVNvY2lhbFNoYXJlLmFkZENsYXNzKCdhbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5jc3MoJ2xlZnQnLCBzb2NpYWxTdGlja3lQb3NpdGlvbikuaGlkZSgpLmZhZGVUbygnc2xvdycsIDEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRzb2NpYWxJY29ucy5vbignc3RpY2t5LXVwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgJGFtYVNvY2lhbFNoYXJlLmFkZENsYXNzKCdhbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5oaWRlKCkuZmFkZVRvKCdzbG93JywgMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNvY2lhbEljb25zLm9uKCdzdGlja3ktZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAkKCcuYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJykucmVtb3ZlQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEluaXRpYWxpemUgZ2V0U29jaWFsU2hhcmUoKVxuICAgICAgbW92ZVNvY2lhbFNoYXJlUG9zaXRpb24oKTtcblxuICAgICAgLy8gT25zY3JvbGwgY2hlY2sgdG8gc2VlIGlmIHNvY2lhbCBpY29uIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhhbiBmb290ZXIgcG9zaXRpb25cbiAgICAgIHZhciBkZWJvdW5jZV90aW1lcjtcbiAgICAgIGlmKCQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZSAuYW1hX19zb2NpYWwtc2hhcmUnKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciAkc29jaWFsSWNvbnMgPSAkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUgLmFtYV9fc29jaWFsLXNoYXJlJyk7XG4gICAgICAgICAgdmFyIHNvY2lhbEljb25Qb3NpdGlvbkJvdHRvbSA9ICRzb2NpYWxJY29ucy5vZmZzZXQoKS50b3AgKyAkc29jaWFsSWNvbnMub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICB2YXIgZm9vdGVyUG9zaXRpb24gPSAkKCdmb290ZXInKS5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICBpZihkZWJvdW5jZV90aW1lcikge1xuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChkZWJvdW5jZV90aW1lcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGVib3VuY2VfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKHNvY2lhbEljb25Qb3NpdGlvbkJvdHRvbSA+IGZvb3RlclBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZScpLmZhZGVPdXQoJ2Zhc3QnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZScpLmZhZGVJbignZmFzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlc2l6ZVZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICBjYXRlZ29yeU5hdkhlaWdodChyZXNpemVWaWV3cG9ydEhlaWdodCk7XG4gICAgICB9KTtcblxuICAgICAgLy9DaGVja3MgdGhlIGxheW91dCBwb3NpdGlvbiBvZiBhcnRpY2xlIG9uIHdpbmRvdyByZXNpemUgYW5kIG1vdmVzIHRoZSBzb2NpYWwgaWNvbnMgYWNjb3JkaW5nbHlcbiAgICAgICQoIHdpbmRvdyApLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFhZ2VudElEKSB7XG4gICAgICAgICAgdmFyIHJlc2l6ZVZpZXdwb3J0SGVpZ2h0ID0gJCh3aW5kb3cpLmlubmVySGVpZ2h0KCk7XG4gICAgICAgICAgdmFyIG1haW5OYXZQb3NpdGlvblVwZGF0ZSA9ICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAuY29udGFpbmVyJykub2Zmc2V0KCkubGVmdCAtIDEwMDtcblxuICAgICAgICAgIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KTtcbiAgICAgICAgICAkKCcuYW1hX19zb2NpYWwtc2hhcmUuYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJykuY3NzKCdsZWZ0JywgbWFpbk5hdlBvc2l0aW9uVXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vSWYgZW1wdHkgb3Igb3RoZXJ3aXNlIHVucG9wdWxhdGVkIHNlYXJjaCBmaWVsZCAoaS5lIHNwYWNlcyBvbmx5KVxuICAgICAgLy9wcmV2ZW50IHNlYXJjaCBmcm9tIHN1Ym1pdHRpbmcgYW5kIHJlbG9hZCBjdXJyZW50IHBhZ2VcbiAgICAgIHZhciBzZWFyY2hGb3JtID0gJChcImZvcm1baWRePSdibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2gtc29scnBhZ2UnXVwiKTtcblxuICAgICAgJChzZWFyY2hGb3JtLCB0aGlzKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHZhciBzZWFyY2hJbnB1dCA9ICQodGhpcykuZmluZChcImlucHV0W25hbWUqPSdzZWFyY2gnXVwiKTtcblxuICAgICAgICAgIC8vVHJpbSBhbmQgY2hlY2sgaWYgc2VhcmNoIGlucHV0IGhhcyBhbnkgdmFsdWVcbiAgICAgICAgICBpZiAoJC50cmltKHNlYXJjaElucHV0LnZhbCgpKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gc2VhcmNoIHRlcm0gZW50ZXJlZCcpO1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy9FbnN1cmUgbm8gc3BhY2VzIGJlZm9yZSBvciBhZnRlciBxdWVyeSBhcmUgY291bnRlZCBpbiBzZWFyY2hcbiAgICAgICAgICAkKHRoaXMpLmZpbmQoc2VhcmNoSW5wdXQpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vU3VibWl0IHRyaW1tZWQgdmFsdWVcbiAgICAgICAgICAgICQodGhpcykudmFsKCQudHJpbSgkKHRoaXMpLnZhbCgpKSk7XG4gICAgICAgICAgfSk7ICAgXG4gICAgICAgICAgXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG5cblxuXG4iLCIvKipcbiAqIFNtYXJ0TWVudXMgalF1ZXJ5IFBsdWdpbiAtIHYxLjEuMCAtIFNlcHRlbWJlciAxNywgMjAxN1xuICogaHR0cDovL3d3dy5zbWFydG1lbnVzLm9yZy9cbiAqXG4gKiBDb3B5cmlnaHQgVmFzaWwgRGlua292LCBWYWRpa29tIFdlYiBMdGQuXG4gKiBodHRwOi8vdmFkaWtvbS5jb21cbiAqXG4gKiBMaWNlbnNlZCBNSVRcbiAqL1xuXG5cbmpRdWVyeSgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2dyb3VwJykuc21hcnRtZW51cyh7XG4gIHN1YkluZGljYXRvcnNQb3M6ICdhcHBlbmQnXG59KTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfc2lnbkluTWVudSA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHZhciAkc2lnbkluRHJvcGRvd24gPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duJyk7XG4gICAgICAgICAgICB2YXIgJHNpZ25JbkRyb3Bkb3duTWVudSA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX21lbnUnKTtcbiAgICAgICAgICAgIHZhciAkc2lnbkluTGluayA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX3RleHQnKTtcbiAgICAgICAgICAgIHZhciAkZXhwbG9yZU1lbnUgPSAkKCcuYW1hX19leHBsb3JlLW1lbnUnKTtcbiAgICAgICAgICAgIHZhciAkZXhwbG9yZU1lbnVEcm9wZG93biA9ICQoJy5hbWFfX2V4cGxvcmUtbWVudV9fbWVudScpO1xuICAgICAgICAgICAgdmFyIGlzRHJvcGRvd25PcGVuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRyb3Bkb3duRG93bk1lbnUocGFyZW50RWxlbWVudCwgbWVudUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRHJvcGRvd25PcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHBhcmVudEVsZW1lbnQpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZURvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQocGFyZW50RWxlbWVudCkuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpc0Ryb3Bkb3duT3BlbiA9ICFpc0Ryb3Bkb3duT3BlbjtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFN0b3AgbGluayBmcm9tIGZpcmluZ1xuICAgICAgICAgICAgICAgICRzaWduSW5MaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IG9mIHRoZSBjbGljayBpc24ndCB0aGUgY29udGFpbmVyIG5vciBhIGRlc2NlbmRhbnQgb2YgdGhlIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcmVudEVsZW1lbnQuaXMoZS50YXJnZXQpICYmIHBhcmVudEVsZW1lbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQocGFyZW50RWxlbWVudCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFNldCB0aW1lb3V0IGZvciB3aGVuIGEgdXNlciBtb3VzZXMgb3V0IG9mIHRoZSBtZW51XG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5tb3VzZWVudGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwYXJlbnRFbGVtZW50LnRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgfSkubW91c2VsZWF2ZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQocGFyZW50RWxlbWVudCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkcm9wZG93bkRvd25NZW51KCRzaWduSW5Ecm9wZG93biwgJHNpZ25JbkRyb3Bkb3duTWVudSk7XG4gICAgICAgICAgICBkcm9wZG93bkRvd25NZW51KCRleHBsb3JlTWVudSwgJGV4cGxvcmVNZW51RHJvcGRvd24pO1xuICAgICAgICB9XG4gICAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3NlYXJjaF9jaGVja2JveCA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICB2YXIgJGNhdGVnb3J5U2VhcmNoSW5wdXQgPSAkKCcjc2VhcmNoX2NhdGVnb3J5Jyk7XG4gICAgICB2YXIgJGNhdGVnb3J5U2VhcmNoTGlzdCA9ICQoJy5mYWNldHMtd2lkZ2V0LWNoZWNrYm94IHVsIGxpJyk7XG4gICAgICB2YXIgJGNsZWFyU2VhcmNoRmlsdGVyID0gJCgnI2FwcGxpZWRGaWx0ZXJzUmVtb3ZlJyk7XG5cbiAgICAgIC8vIEZpbHRlciBsaXN0IHVzaW5nIGpRdWVyeSBmaWx0ZXJcbiAgICAgIGZ1bmN0aW9uIGZpbHRlckxpc3Qoc2VhcmNoQm94LCBsaXN0KSB7XG4gICAgICAgIHNlYXJjaEJveC5rZXl1cChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyICRyZWdleCA9IG5ldyBSZWdFeHAodGhpcy52YWx1ZSwgJ2knKTtcbiAgICAgICAgICBsaXN0LmhpZGUoKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICRyZWdleC50ZXN0KCQudHJpbSgkKHRoaXMpLnRleHQoKSkpO1xuICAgICAgICAgIH0pLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENsZWFyIGZpbHRlclxuICAgICAgZnVuY3Rpb24gY2xlYWZGaWx0ZXJMaXN0KGNsZWFyU2VhcmNoRmlsdGVyKSB7XG4gICAgICAgIGNsZWFyU2VhcmNoRmlsdGVyLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICRjYXRlZ29yeVNlYXJjaElucHV0LnZhbCgnJyk7XG4gICAgICAgICAgJGNhdGVnb3J5U2VhcmNoSW5wdXQudHJpZ2dlcigna2V5dXAnKTtcblxuICAgICAgICAgICQoJy5mYWNldHMtd2lkZ2V0LWNoZWNrYm94IHVsIGxpIFt0eXBlPWNoZWNrYm94XScpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCcjYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNoLXNvbHJwYWdlLTInKS5zdWJtaXQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEludm9rZSBmaWx0ZXIgbGlzdFxuICAgICAgZmlsdGVyTGlzdCgkY2F0ZWdvcnlTZWFyY2hJbnB1dCwgJGNhdGVnb3J5U2VhcmNoTGlzdCk7XG5cbiAgICAgIC8vIEludm9rZSBjbGVhciBmaWx0ZXJcbiAgICAgIGNsZWFmRmlsdGVyTGlzdCgkY2xlYXJTZWFyY2hGaWx0ZXIpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIGJwIGNhbGN1bGF0b3IuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuICdhbm9ueW1vdXMgY2xvc3VyZScuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYnBDYWxjdWxhdG9yID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIC8vIENsb25lIGxhc3Qgcm93IG9mIHRhYmxlXG4gICAgICAkKCcuYWRkLWJwLXJvdycpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgJHRhYmxlQm9keSA9ICQoJyNicENhbGN1bGF0b3IgdGFibGUnKS5maW5kKCd0Ym9keScpLFxuICAgICAgICAgICR0ckxhc3QgPSAkdGFibGVCb2R5LmZpbmQoJ3RyOmxhc3QnKSxcbiAgICAgICAgICAkdHJOZXcgPSAkdHJMYXN0LmNsb25lKCk7XG5cbiAgICAgICAgLy8gQXBwZW5kIG5ldyBjbGFzcyBuYW1lIHRvIGNsb25lZCByb3dcbiAgICAgICAgJHRyTGFzdC5iZWZvcmUoJHRyTmV3KS5hZGRDbGFzcygnY2xvbmVkJykuZmluZCgnaW5wdXQnKS52YWwoJycpO1xuXG4gICAgICAgIC8vIEFkZCBuZXcgbmFtZSB3aXRoIGluZGV4XG4gICAgICAgICR0YWJsZUJvZHkuZmluZCgndHI6bGFzdCBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciAkdHJJbnB1dENsYXNzSW5kZXggPSAkKCcjYnBDYWxjdWxhdG9yIHRib2R5PnRyJykubGVuZ3RoICsgMSxcbiAgICAgICAgICAgICAgJHRySW5wdXRDbGFzc05hbWUgPSAkKHRoaXMpLmF0dHIoJ2NsYXNzJyk7XG5cbiAgICAgICAgICAkKHRoaXMpLmF0dHIoJ25hbWUnLCAkdHJJbnB1dENsYXNzTmFtZSArICctJyArICR0cklucHV0Q2xhc3NJbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ3RkOmVxKDApJywgJHRyTGFzdCkudGV4dCgkKCcjYnBDYWxjdWxhdG9yIHRib2R5PnRyJykubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFdoZW4gY2xlYXIvcmVzdGFydCBidXR0b24gaXMgY2xpY2tlZCByZXR1cm4gdGFibGUgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgJCgnLmNsZWFyLXJlc3RhcnQnKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBSZW1vdmUgYWxsIGNsb25lZCByb3dzXG4gICAgICAgIHZhciAkdHJDbG9uZWQgPSAkKCcuY2xvbmVkJyk7XG4gICAgICAgICR0ckNsb25lZC5yZW1vdmUoKTtcblxuICAgICAgICAvLyBSZXNldCB0byBpbnRpYWwgdmFsdWVzXG4gICAgICAgICQoJyNicENhbGN1bGF0b3IgaW5wdXQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLnZhbCgnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlc2V0IGZvcm1cbiAgICAgICAgJCgnI2JwQ2FsY3VsYXRvciAnKS52YWxpZGF0ZSgpLnJlc2V0Rm9ybSgpO1xuXG4gICAgICAgIC8vIEhpZGUgb3V0cHV0IHJvd1xuICAgICAgICAkKCcuYnBDYWxjdWxhdG9yX190YWJsZV9fb3V0cHV0JykuaGlkZSgpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgYXZlcmFnZSBCUFxuICAgICAgZnVuY3Rpb24gY2FsY3VsY2F0ZUJQKGJwVmFsdWUsIGJwT3V0cHV0KSB7XG4gICAgICAgIHZhciBicElucHV0ID0gMCwgLy8gcm93IGNvdW50XG4gICAgICAgICAgICBicFRvdGFsID0gMCwgLy8gaW5jcmVtZW50ZWQgaW5wdXQgdmFsdWVzXG4gICAgICAgICAgICBicEF2ZXJhZ2U7IC8vIGF2ZXJhZ2VkIGJwVG90YWwgLyBicElucHV0XG5cbiAgICAgICAgYnBWYWx1ZS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBJZiBJbnB1dCB2YWx1ZXMgYXJlIGdyZWF0ZXIgdGhhbiAwIHRoZW4gdHVybiBpbnRvIGEgbnVtYmVyIGFuZCByb3VuZFxuICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpID4gMCA/IE1hdGgucm91bmQocGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApKSA6IGZhbHNlO1xuXG4gICAgICAgICAgaWYgKHZhbCAhPT0gMCkge1xuICAgICAgICAgICAgYnBJbnB1dCArPSAxO1xuICAgICAgICAgICAgYnBUb3RhbCArPSB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgYXZlcmFnZVxuICAgICAgICBicEF2ZXJhZ2UgPSBicFRvdGFsIC8gYnBJbnB1dCA+IDAgPyBNYXRoLnJvdW5kKGJwVG90YWwgLyBicElucHV0KSA6IDA7XG5cbiAgICAgICAgYnBPdXRwdXQudGV4dChicEF2ZXJhZ2UpO1xuXG4gICAgICAgICQoJy5icENhbGN1bGF0b3JfX3RhYmxlX19vdXRwdXQnKS5zaG93KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFZhbGlkYXRlIEJQIEZvcm1cbiAgICAgICQoJyNicENhbGN1bGF0b3InKS52YWxpZGF0ZSh7XG4gICAgICAgIC8vIENhbGN1bGF0ZSBCUCB3aGVuIGNhbGN1bGF0ZSBpcyBjbGlja2VkXG4gICAgICAgIHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICAgICAgICB2YXIgc3lzQnBWYWx1ZSA9ICQoJy5icENhbGN1bGF0b3JfX3N5c3RvbGljLWlucHV0JyksXG4gICAgICAgICAgICBzeXNCcE91dHB1dCA9ICQoJy5icENhbGN1bGF0b3JfX3N5c3RvbGljLW91dHB1dCcpO1xuXG4gICAgICAgICAgdmFyIGRpYUJwVmFsdWUgPSAkKCcuYnBDYWxjdWxhdG9yX19kaWFzdG9saWMtaW5wdXQnKSxcbiAgICAgICAgICAgIGRpYUJwT3V0cHV0ID0gJCgnLmJwQ2FsY3VsYXRvcl9fZGlhc3RvbGljLW91dHB1dCcpO1xuXG4gICAgICAgICAgY2FsY3VsY2F0ZUJQKHN5c0JwVmFsdWUsIHN5c0JwT3V0cHV0KTtcbiAgICAgICAgICBjYWxjdWxjYXRlQlAoZGlhQnBWYWx1ZSwgZGlhQnBPdXRwdXQpO1xuXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBTYWRseSBhZGRzIGZvb3RlciB0byBsZWZ0IHJlc291cmNlIHBhZ2UgY29sdW1uLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnJlc291cmNlUGFnZUZvb3RlciA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgICQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKCdib2R5LmFtYV9fcmVzb3VyY2UtcGFnZScpLmxlbmd0aCkge1xuICAgICAgICAgICQoJ2Zvb3RlcicsIGNvbnRleHQpLmNsb25lKCkuYXBwZW5kVG8oJy5hbWFfX2xheW91dC0tc3BsaXRfX2xlZnQnKS5hZGRDbGFzcygnYW1hX19mb290ZXIgYW1hX19yZXNvdXJjZS1wYWdlX19kZXNrdG9wLWZvb3RlcicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBSZXNwb25zaXZlIFRhYmxlcy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5yZXNwb25zaXZlVGFibGVzID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICAgd2luZG93LnNjcmVlbi53aWR0aDtcblxuICAgICAgLy8gVGhpcyBjb25kaXRpb25hbCBoYXMgYmVlbiBhZGRlZCB0byBwcmV2ZW50IGJhc2ljVGFibGUgcGx1Z2luIHRvIHNlbGVjdGl2ZWx5IG5vdCBydW4gb24gdGFibGVzXG4gICAgICBpZiAoISQoJ3RhYmxlJykuaGFzQ2xhc3MoJ2J0JykpIHtcbiAgICAgICAgJCgndGFibGUnKS5iYXNpY3RhYmxlKHtcbiAgICAgICAgICBicmVha3BvaW50OiAxMTgyXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgdGhlIHRhYmxlIGFzIGJ0IGZvciBtb2JpbGUuXG4gICAgICAgICQoJy5hbWFfX2ZvcnVtLXRhYmxlLXdyYXAgdGFibGUnKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gMTE4Mikge1xuICAgICAgICAgICAgICAgICQodGhpcykuYmFzaWN0YWJsZSgnc3RhcnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMgZm9yY2VzIHRhYmxlcyBpbnNpZGUgb2YgdGhlIC5hbWFfX3Jlc291cmNlLS1zY2hlZHVsZXMgZGl2IHRvIGhhdmUgbW9iaWxlIGxvb2sgYW5kIGZlZWxcbiAgICAgICQoJy5hbWFfX3Jlc291cmNlLS1zY2hlZHVsZXMgdGFibGUnKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5iYXNpY3RhYmxlKCdzdGFydCcpO1xuICAgICAgfSk7XG5cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBMaXN0aWNsZSBDbGFzZXMuXG4gKlxuICogSGFuZGxpbmcgY2xhc3NlcyB0byBidWlsZCBsaXN0aWNsZSBwcm9wZXJseSBvdXRzaWRlIGNrZWRpdG9yLlxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCwgb25jZSkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmxpc3RpY2xlID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgaWYgKCQoJy5saXN0aWNsZScsIGNvbnRleHQpLmxlbmd0aCkge1xuICAgICAgICAkKCcubGlzdGljbGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbiAoaWR4LCBlKSB7XG4gICAgICAgICAgICAkKGUpLmFkZENsYXNzKCdsaXN0aWNsZV9faXRlbScpO1xuICAgICAgICAgICAgJChlKS5maW5kKCdvbCwgdWwnKS5lYWNoKGZ1bmN0aW9uIChpZHgsIGYpIHtcbiAgICAgICAgICAgICAgJChmKS5hZGRDbGFzcygnbGlzdGljbGVfX2l0ZW0tc3ViJyk7XG4gICAgICAgICAgICAgICQoZikuY2hpbGRyZW4oJ2xpJykuYWRkQ2xhc3MoJ2xpc3RpY2xlX19pdGVtLXN1Yi1pdGVtJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvL2lmIHRoZXJlIGlzIGFuIGlubGluZSBwcm9tbyBvbiBhIHBhZ2Ugd2l0aCBhIGxpc3RpY2xlLCBkZXRlcm1pbmUgaWYgdGhlIGxpc3QgaXMgY2xvc2UgZW5vdWdoIGJlbmVhdGggdGhlIHByb21vIGluIHRoZSBkb20gdG8gYXNzdW1lIGl0IHdpbGwgYmUgZmxvYXRlZCBuZXh0IHRvIGl0LiBJIGNob3NlIHdpdGhpbiA1IHNpYmxpbmdzLlxuICAgICAgaWYoJCgnLmFtYV9fcHJvbW8tLWlubGluZSB+IC5saXN0aWNsZScpKSB7XG4gICAgICAgIHZhciBsZW5ndGggPSAkKCcuYW1hX19wcm9tby0taW5saW5lJykuZmlyc3QoKS5uZXh0VW50aWwoJy5saXN0aWNsZScpLmFkZEJhY2soKS5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPD0gNSkge1xuICAgICAgICAgICQoJy5hbWFfX3Byb21vLS1pbmxpbmUnKS5hZGRDbGFzcygnbGlzdGljbGUtbWFyZ2luJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vaWYgdGhlIGxpc3RpY2xlIGl0ZW0gY29udGFpbnMgYW4gaW1hZ2UsIHB1dCBhIGNsZWFyZml4IGRpdiBvbiB0aGUgaXRlbSBzbyBpZiBpdCBoYXMgYSB0cmFpbGluZyBpbWFnZSwgdGhlIG5leHQgaXRlbSB3b24ndCB3cmFwIG9uIGl0LlxuICAgICAgLy9BbHNvLCBkZXRlcm1pbmUgaXQgdGhlIGltYWdlIGlzIGFsbW9zdCAxMDAlIG9mIHRoZSBsaXN0IHdpZHRoLiBpZiBpdCBpcywgYWRkIGEgY2xhc3MgdG8gcmVtb3ZlIHRoZSBsZWZ0IG1hcmdpbiBhbmQgbWFrZSB0aGUgaW1hZ2UgMTAwJSB3aWR0aC4gSSBjaG9zZSA4MCUuXG4gICAgICBpZigkKCcubGlzdGljbGVfX2l0ZW0gaW1nJykpIHtcbiAgICAgICAgJCgnLmxpc3RpY2xlX19pdGVtIGltZycpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciB3aWR0aCA9ICQodGhpcykuY2xvc2VzdCgnLmxpc3RpY2xlX19pdGVtJykud2lkdGgoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKHdpZHRoKVxuICAgICAgICAgIHZhciBpbWFnZVdpZHRoID0gJCh0aGlzKS53aWR0aCgpXG4gICAgICAgICAgY29uc29sZS5sb2coaW1hZ2VXaWR0aClcbiAgICAgICAgICB2YXIgY2xlYXJmaXggPSAnPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+PC9kaXY+J1xuICAgICAgICAgICQob25jZSgnbGlzdGljbGUtaXRlbScsICcubGlzdGljbGVfX2l0ZW0nLCB0aGlzKSkuYXBwZW5kKGNsZWFyZml4KVxuICAgICAgICAgIGlmIChpbWFnZVdpZHRoID49IHdpZHRoKi43KSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCduby1tYXJnaW4nKVxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0ICgnZmlndXJlJykuYWRkQ2xhc3MoJ25vLW1hcmdpbicpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsLCBvbmNlKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEF0dGFjaGVzIEFNQSBJbWFnZSBQb3B1cCBsaWJyYXJ5LlxuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cdGZ1bmN0aW9uIGFsdGVyTW9kYWwgKGNvbnRleHQpIHtcblx0XHQkKCcudWktZGlhbG9nJykuY3NzKHtcInotaW5kZXhcIjogXCI1MDAwMVwifSk7XG5cdFx0JCgnLnVpLWRpYWxvZy10aXRsZScpLmhpZGUoKTtcblx0XHQkKCcudWktYnV0dG9uLWljb24tb25seSAudWktaWNvbicpLmhpZGUoKTtcblx0XHQvLyBTdHlsZWd1aWRlIHNwZWNpZmljIHRyZWF0bWVudCB0byBoaWRlIGFuZCBjc3MgdG8gZWxlbWVudHMuXG5cdFx0JCgnLnVpLWRyYWdnYWJsZSAudWktZGlhbG9nLXRpdGxlYmFyJykuY3NzKHtcblx0XHRcdFwiYm9yZGVyXCI6IFwibm9uZVwiLFxuXHRcdFx0XCJwYWRkaW5nOlwiOiBcIjBcIixcblx0XHRcdFwiYmFja2dyb3VuZFwiOiBcIm5vbmVcIlxuXHRcdH0pO1xuXHRcdCQoJy51aS13aWRnZXQtb3ZlcmxheScpLmNzcyh7XG5cdFx0XHRcIm9wYWNpdHlcIjogXCIuNVwiLFxuXHRcdFx0XCJ6LWluZGV4OlwiOiBcIjUwMDBcIlxuXHRcdH0pO1xuXHRcdCQoJy51aS1kaWFsb2cgLnVpLWRpYWxvZy10aXRsZWJhci1jbG9zZScpLmNzcyh7XG5cdFx0XHRcImJhY2tncm91bmRcIjogXCJ1cmwoJy9hc3NldHMvaW1hZ2VzL2ljb24tbW9kYWwtY2xvc2Uuc3ZnJylcIixcblx0XHRcdFwiYm9yZGVyXCI6IFwibm9uZVwiLFxuXHRcdFx0XCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG5cdFx0XHRcInJpZ2h0XCI6IFwiLTIwcHhcIixcblx0XHRcdFwidG9wXCI6IFwiLTEwcHhcIixcblx0XHRcdFwiaGVpZ2h0XCI6IFwiMjhweFwiLFxuXHRcdFx0XCJ3aWR0aFwiOiBcIjI4cHhcIixcblx0XHRcdFwicGFkZGluZ1wiOiBcIjBcIixcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNsb3NlTW9kYWwgKGNvbnRleHQpIHtcblx0XHQkKCcudWktaWNvbi1jbG9zZXRoaWNrJykudW5iaW5kKCdjbGljay5jbG9zZScpO1xuXHRcdCQoJy51aS1pY29uLWNsb3NldGhpY2snKS50cmlnZ2VyKCdjbGljaycpO1xuXHR9XG5cblx0RHJ1cGFsLmJlaGF2aW9ycy5hbWFfaW1hZ2VfcG9wdXAgPSB7XG5cdFx0YXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdFx0JChkb2N1bWVudCkub24oXCJkaWFsb2dvcGVuXCIsIFwiLnVpLWRpYWxvZ1wiLCBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG5cdFx0XHRcdGFsdGVyTW9kYWwoKTtcblx0XHRcdH0pO1xuXHRcdFx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi51aS13aWRnZXQtb3ZlcmxheVwiLCBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG5cdFx0XHRcdGNsb3NlTW9kYWwoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuXG4vKipcbiAqIEBmaWxlXG4gKiBBdHRhY2hlcyBBTUEgSW1hZ2UgUG9wdXAgbGlicmFyeS5cbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXHRmdW5jdGlvbiBhbHRlck1vZGFsIChjb250ZXh0KSB7XG5cdFx0JCgnLmFtYS1pbWFnZS1wb3B1cC1tb2RhbCAudWktZGlhbG9nLXRpdGxlJykuaGlkZSgpO1xuXHRcdCQoJy5hbWEtaW1hZ2UtcG9wdXAtbW9kYWwgLnVpLWJ1dHRvbi1pY29uLW9ubHkgLnVpLWljb24nKS5oaWRlKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBjbG9zZU1vZGFsIChjb250ZXh0KSB7XG5cdFx0JCgnLnVpLWljb24tY2xvc2V0aGljaycpLnVuYmluZCgnY2xpY2suY2xvc2UnKTtcblx0XHQkKCcudWktaWNvbi1jbG9zZXRoaWNrJykudHJpZ2dlcignY2xpY2snKTtcblx0fVxuXG5cdERydXBhbC5iZWhhdmlvcnMuYW1hX2ltYWdlX3BvcHVwID0ge1xuXHRcdGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwiZGlhbG9nb3BlblwiLCBcIi51aS1kaWFsb2dcIiwgZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0XHRcdGFsdGVyTW9kYWwoKTtcblx0XHRcdH0pO1xuXHRcdFx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi51aS13aWRnZXQtb3ZlcmxheVwiLCBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRcdFx0Y2xvc2VNb2RhbCgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCwgb25jZSkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmluZGV4ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgaWYgKCAkKCcuZGVzYy1kaXNwbGF5JykubGVuZ3RoICkge1xuXG4gICAgdmFyIGZ1bGwgPSAkKCcuZnVsbHRleHQnKTtcbiAgICB2YXIgdHJ1bmMgPSAkKCcudHJ1bmNhdGVkJylcbiAgICB2YXIgZGVzYyA9ICQoJy5kZXNjLWRpc3BsYXknKVxuICAgIHZhciBmdWxsVGV4dCA9ICQoJy5mdWxsdGV4dCcpLmh0bWwoKVxuICAgIHZhciB0cnVuY2F0ZWQgPSAkKCcudHJ1bmNhdGVkJykuaHRtbCgpXG4gICAgdmFyIGZ1bGxIZWlnaHQgPSAnJ1xuICAgIHZhciB0cnVuY0hlaWdodCA9ICcnXG4gICAgdmFyIG1vcmVIdG1sID0gJzxhIGFjY2Vzc2tleT1cImxcIiBocmVmPVwiI1wiIGFsdD1cIlJlYWQgTW9yZVwiIGNsYXNzPVwibW9yZVwiIHRhYmluZGV4PVwiMFwiPiAuLi5SZWFkIE1vcmU8L2E+J1xuICAgIHZhciBsZXNzSHRtbCA9ICc8YSBhY2Nlc3NrZXk9XCJsXCIgaHJlZj1cIiNcIiBhbHQ9XCJTaG93IExlc3NcIiBjbGFzcz1cImxlc3NcIiB0YWJpbmRleD1cIjBcIj5TaG93IExlc3M8L2E+J1xuICAgIHZhciB3aWR0aCA9ICcnXG5cbiAgICAgIGZ1bmN0aW9uIGdldERpbWVuc2lvbnMgKCkge1xuXG4gICAgICAgIC8vIElmIGNsb3Nlc3QgcGFyZW50IGluZGljYXRlcyBjYXRlZ29yeS5cbiAgICAgICAgLy8gQWRqdXN0IGhpZWdodCB2YWx1ZXMuXG4gICAgICAgIGlmIChkZXNjLmNsb3Nlc3QoJ2Rpdi5hbWFfX2NhdGVnb3J5JykpIHtcbiAgICAgICAgICB3aWR0aCA9ICQod2luZG93KS53aWR0aCgpXG4gICAgICAgICAgaWYgKHdpZHRoIDwgNDAwKSB7XG4gICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgMjVcbiAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMjBcbiAgICAgICAgICB9IGVsc2UgaWYgKHdpZHRoIDwgOTAwKSB7XG4gICAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyA1MVxuICAgICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDIwXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyAyNlxuICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAxNFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aWR0aCA9ICQod2luZG93KS53aWR0aCgpXG4gICAgICAgICAgaWYgKHdpZHRoIDwgNDAwKSB7XG4gICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgMjVcbiAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMjBcbiAgICAgICAgICB9IGVsc2UgaWYgKHdpZHRoIDwgOTAwKSB7XG4gICAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyAyNVxuICAgICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDIwXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KClcbiAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMTRcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8qXG4gICAgICAgICogQW5pbWF0ZSB0aGUgaGVpZ2h0IG9mIGEgZHluYW1pYyBoZWlnaHQgb2JqZWN0PyBTSU1QTEUhXG4gICAgICAgICogV2hhdCBhIGZvb2wgeW91IHdvdWxkIGJlIHRvIG5vdCB0aGluayBvZiBzbyBlbGVnYW50IGEgc29sdXRpb24uXG4gICAgICAgICogSW4gdGhlIG1hcmt1cCwgdGhlcmUgYXJlIGhpZGRlbiBmdWxsdGV4dCBhbmQgc3VtbWFyeSBkaXZzLlxuICAgICAgICAqIFRoZXkgYXJlIGFic29sdXRlbHkgcG9zaXRpb25lZCB3aGl0aGluIHRoZSBwYWdlIHRlbXBsYXRlIHRvIGtlZXAgYW4gYWNjdXJhdGUgaGVpZ2h0LlxuICAgICAgICovXG5cbiAgICAgIC8vIFNldCBoZWlnaHQgb24gcGFnZWxvYWQgdXNpbmcgdGhlIGhpZGRlbiBkaXZzLlxuICAgICAgJChvbmNlKCdnZXRIZWlnaHQnLCAnLmRlc2MtZGlzcGxheScsIGNvbnRleHQpKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXG4gICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCB0cnVuY0hlaWdodCArICdweCcpXG4gICAgICB9KTtcblxuICAgICAgLy8gU2V0IHRoZSBoZWlnaHQgYWdhaW4gb24gd2luZG93IHJlc2l6ZS5cbiAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXREaW1lbnNpb25zKClcbiAgICAgICAgaWYgKGRlc2MuaGFzQ2xhc3MoJ2Z1bGwnKSkge1xuICAgICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCBmdWxsSGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgfSBlbHNlIGlmIChkZXNjLmhhc0NsYXNzKCdzdW1tYXJ5JykpIHtcbiAgICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgdHJ1bmNIZWlnaHQgKyAncHgnKVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gT24gY2xpY2ssIHNldCB0aGUgaGVpZ2h0IHRvIHRyaWdnZXIgY3NzIHRyYW5zaXRpb24uXG4gICAgICBkZXNjLm9uKCdjbGljaycsICcubW9yZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXG4gICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCBmdWxsSGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgZGVzYy5hZGRDbGFzcygnZnVsbCcpLnJlbW92ZUNsYXNzKCdzdW1tYXJ5JylcbiAgICAgICAgLy8gU3dhcCB0aGUgZnVsbCBjb3B5IGludG8gdGhlIGRpc3BsYXkgZGl2LlxuICAgICAgICBkZXNjLmh0bWwoJC5wYXJzZUhUTUwoZnVsbFRleHQpKS5hcHBlbmQobGVzc0h0bWwpXG4gICAgICB9KTtcbiAgICAgIGRlc2Mub24oJ2NsaWNrJywgJy5sZXNzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXREaW1lbnNpb25zKClcbiAgICAgICAgZGVzYy5jc3MoJ2hlaWdodCcsIHRydW5jSGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgZGVzYy5hZGRDbGFzcygnc3VtbWFyeScpLnJlbW92ZUNsYXNzKCdmdWxsJylcbiAgICAgICAgLy8gU3dhcCB0aGUgdHJ1bmNhdGVkIGNvcHkgaW50byB0aGUgZGlzcGxheSBkaXYuXG4gICAgICAgIGRlc2MuaHRtbCgkLnBhcnNlSFRNTCh0cnVuY2F0ZWQpKS5hcHBlbmQobW9yZUh0bWwpXG4gICAgICAgIC8vIFNjcm9sbCB0byB0b3AuXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDUwMCwgJ3N3aW5nJylcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsLCBvbmNlKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3RvYyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5hbWEtLW5ld3MtdG9jIGEnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBoYXJkIGp1bXAsIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG5cbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpOyAvLyBTZXQgdGhlIHRhcmdldCBhcyB2YXJpYWJsZVxuICAgICAgICAgICAgLy8gcGVyZm9ybSBhbmltYXRlZCBzY3JvbGxpbmcgYnkgZ2V0dGluZyB0b3AtcG9zaXRpb24gb2YgdGFyZ2V0LWVsZW1lbnQgYW5kIHNldCBpdCBhcyBzY3JvbGwgdGFyZ2V0XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCh0YXJnZXQpLm9mZnNldCgpLnRvcCAtICQoJyNtYWluLWNvbnRlbnQnKS5vZmZzZXQoKS50b3AgKyAoJCgnLndvcmtiZW5jaC10YWJzJykuaGVpZ2h0KCk/JCgnLndvcmtiZW5jaC10YWJzJykuaGVpZ2h0KCk6MClcbiAgICAgICAgICAgIH0sIDYwMCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBBcHBsaWNhdGlvbiBkcm9wZG93bi5cbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hcHBNZW51ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgICQoJyNibG9jay1hY2NvdW50bmF2JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc19hY3RpdmUgPSAnaXMtYWN0aXZlJztcblxuICAgICAgICAkKCcuYWNjb3VudF9uYXZfdHJpZ2dlcicsIHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIC8vIFVuZm9jdXMgb24gdGhlIGRyb3Bkb3duLlxuICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgZm9yIENTUy5cbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyB0byB0aGUgZHJvcGRvd24gVUwuXG4gICAgICAgICAgJCh0aGlzKS5uZXh0KCkudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnLmFjY291bnRfbmF2X3RyaWdnZXInLCB0aGlzKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpLm5leHQoKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3BvZGNhc3QgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAvL0NoZWNrIG51bWJlciBvZiBsaW5rc1xuICAgICAgICBvZGRMaW5rcygpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIG9kZExpbmtzKCkge1xuICAgICAgICB2YXIgY291bnQgPSAkKFwidWwuYW1hX19wb2RjYXN0LXBsYXllcl9fbGlua3MgbGlcIikubGVuZ3RoO1xuICAgICAgICB2YXIgbGlua0NvbnRhaW5lciA9ICQoXCJ1bC5hbWFfX3BvZGNhc3QtcGxheWVyX19saW5rc1wiKTtcblxuICAgICAgICBpZiAoY291bnQgPT0gMyB8fCBjb3VudCA9PSAxKSB7XG4gICAgICAgICAgbGlua0NvbnRhaW5lci5hZGRDbGFzcygnb2RkX2xpbmtzJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7IiwiLyoqXG4gKiBAZmlsZVxuICogTW9iaWxlIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBsb2NrZXIgbWVudS5cbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwsIG9uY2UpIHtcbiAgICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9sb2NrZXJNZW51ID0ge1xuICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICAvLyBTZWxlY3QgcmVxdWlyZWQgZWxlbWVudHMgZnJvbSB0aGUgRE9NLlxuICAgICAgICBjb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuICAgICAgICBjb25zdCAkbWVudSA9ICQoJy5hbWFfbG9ja2VyX25hdmlnYXRpb24nKTtcbiAgICAgICAgY29uc3QgJHRyaWdnZXIgPSAkKCcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uLXRyaWdnZXInKTtcbiAgICAgICAgY29uc3QgJGNhdGNoZXIgPSAkKCcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uLWNhdGNoZXInKTtcbiAgICAgICAgY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgICAgIGNvbnN0IGJvZHlGaXhlZCA9ICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93Jyk7XG5cbiAgICAgICAgZnVuY3Rpb24gbG9ja2VyTWVudSgpIHtcbiAgICAgICAgICAgIC8vIE9wZW4gbWVudSBvbiB0cmlnZ2VyIGNsaWNrLlxuICAgICAgICAgICAgJChvbmNlKCdjbGljay10by1zaG93JywgJy5hbWFfbG9ja2VyX25hdmlnYXRpb24tdHJpZ2dlcicsIGNvbnRleHQpKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICRtZW51LmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgICRjYXRjaGVyLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAkYm9keS5jc3Moe1wib3ZlcmZsb3dcIjpcImhpZGRlblwifSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIENsb3NlIG1lbnUgb24gYmFja2dyb3VuZCBjbGljay5cbiAgICAgICAgICAgICQob25jZSgnY2xpY2stdG8taGlkZScsICcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uLWNhdGNoZXInLCBjb250ZXh0KSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRjYXRjaGVyLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICAkYm9keS5jc3Moe1wib3ZlcmZsb3dcIjpcImF1dG9cIn0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NrZXJNZW51KCk7XG5cbiAgICAgIH1cbiAgICB9O1xuICB9KShqUXVlcnksIERydXBhbCwgb25jZSk7XG4iXX0=
