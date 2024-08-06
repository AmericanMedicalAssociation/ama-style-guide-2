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

      function setStickyNav() { 
        // Needs doc ready because the admin toolbar needs to get loaded to determine the top spacing for sticky nav
        var $bodyFixed = $('body').css('overflow');

        // Set main nav and product nav sticky state based on admin toolbar and screen size.
        if($bodyFixed === 'hidden') {
          $('.ama__main-navigation').unstick().removeAttr('style');
          return;
        } else if($(window).width() < 768 ) { // If less than tablet
          $('.ama__main-navigation').sticky({zIndex: 501 });
        } else if($('.toolbar-tray').hasClass('toolbar-tray-horizontal')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 79 });
        } else if($('.toolbar-tray').hasClass('toolbar-tray-vertical')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 39 });
        } else {
          $('.ama__main-navigation ').sticky({ zIndex: 501 });
        }
      };

      setStickyNav();

      // On resize, reset sticky state.
      $( window ).on('resize', function() {
        // Undo inline styles to prevent sticky nav from breaking on resize.
        $('.ama__main-navigation ').unstick();
        setStickyNav();
      });

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
        $stickyWrapper = $('.sticky-wrapper');
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

      function dropdownDownMenu(parentElement, menuElement) {
       parentElement.unbind('click').click(function(e){
          e.stopPropagation();
          $(menuElement).slideToggle();
          $(parentElement).toggleClass('open');
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
          }

          // Set timeout for when a user mouses out of the menu
          parentElement.mouseenter(function(){
            clearTimeout();
          }).mouseleave(function(){
            setTimeout(function(){
              $(menuElement).slideUp();
              $(parentElement).removeClass('open');
            }, 2000);
          });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvZHlTY3JvbGxMb2NrLm1pbi5qcyIsImluaXQuanMiLCJhbGVydC5qcyIsImZvcm0taXRlbXMuanMiLCJuYXYuanMiLCJzdWJjYXRlZ29yeS5qcyIsInRhYnMuanMiLCJhY2NvcmRpb24uanMiLCJ3ZWJmb3Jtcy5qcyIsIm1haW4tbmF2aWdhdGlvbi5qcyIsImNhdGVnb3J5LW1lbnUuanMiLCJzaWduLWluLWRyb3Bkb3duLmpzIiwic2VhcmNoLWNoZWNrYm94LmpzIiwiYnAtY2FsY3VsYXRvci5qcyIsInJlc291cmNlLmpzIiwidGFibGVzLmpzIiwibGlzdGljbGUuanMiLCJtb2RhbC5qcyIsImluZGV4LXBhZ2UuanMiLCJ0b2MuanMiLCJhcHBsaWNhdGlvbi1kcm9wZG93bi5qcyIsInBvZGNhc3QtcGxheWVyLmpzIiwibG9ja2VyLW1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzdHlsZWd1aWRlLWN1c3RvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiFmdW5jdGlvbihlLHQpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW1wiZXhwb3J0c1wiXSx0KTtlbHNlIGlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzKXQoZXhwb3J0cyk7ZWxzZXt2YXIgbz17fTt0KG8pLGUuYm9keVNjcm9sbExvY2s9b319KHRoaXMsZnVuY3Rpb24oZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtpZihBcnJheS5pc0FycmF5KGUpKXtmb3IodmFyIHQ9MCxvPUFycmF5KGUubGVuZ3RoKTt0PGUubGVuZ3RoO3QrKylvW3RdPWVbdF07cmV0dXJuIG99cmV0dXJuIEFycmF5LmZyb20oZSl9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGw9ITE7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyl7dmFyIGU9e2dldCBwYXNzaXZlKCl7bD0hMH19O3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidGVzdFBhc3NpdmVcIixudWxsLGUpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidGVzdFBhc3NpdmVcIixudWxsLGUpfXZhciBkPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5uYXZpZ2F0b3ImJndpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0mJi9pUChhZHxob25lfG9kKS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtKSxjPVtdLHU9ITEsYT0tMSxzPXZvaWQgMCx2PXZvaWQgMCxmPWZ1bmN0aW9uKHQpe3JldHVybiBjLnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuISghZS5vcHRpb25zLmFsbG93VG91Y2hNb3ZlfHwhZS5vcHRpb25zLmFsbG93VG91Y2hNb3ZlKHQpKX0pfSxtPWZ1bmN0aW9uKGUpe3ZhciB0PWV8fHdpbmRvdy5ldmVudDtyZXR1cm4hIWYodC50YXJnZXQpfHwoMTx0LnRvdWNoZXMubGVuZ3RofHwodC5wcmV2ZW50RGVmYXVsdCYmdC5wcmV2ZW50RGVmYXVsdCgpLCExKSl9LG89ZnVuY3Rpb24oKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dm9pZCAwIT09diYmKGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0PXYsdj12b2lkIDApLHZvaWQgMCE9PXMmJihkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93PXMscz12b2lkIDApfSl9O2V4cG9ydHMuZGlzYWJsZUJvZHlTY3JvbGw9ZnVuY3Rpb24oaSxlKXtpZihkKXtpZighaSlyZXR1cm4gdm9pZCBjb25zb2xlLmVycm9yKFwiZGlzYWJsZUJvZHlTY3JvbGwgdW5zdWNjZXNzZnVsIC0gdGFyZ2V0RWxlbWVudCBtdXN0IGJlIHByb3ZpZGVkIHdoZW4gY2FsbGluZyBkaXNhYmxlQm9keVNjcm9sbCBvbiBJT1MgZGV2aWNlcy5cIik7aWYoaSYmIWMuc29tZShmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50PT09aX0pKXt2YXIgdD17dGFyZ2V0RWxlbWVudDppLG9wdGlvbnM6ZXx8e319O2M9W10uY29uY2F0KHIoYyksW3RdKSxpLm9udG91Y2hzdGFydD1mdW5jdGlvbihlKXsxPT09ZS50YXJnZXRUb3VjaGVzLmxlbmd0aCYmKGE9ZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFkpfSxpLm9udG91Y2htb3ZlPWZ1bmN0aW9uKGUpe3ZhciB0LG8sbixyOzE9PT1lLnRhcmdldFRvdWNoZXMubGVuZ3RoJiYobz1pLHI9KHQ9ZSkudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZLWEsIWYodC50YXJnZXQpJiYobyYmMD09PW8uc2Nyb2xsVG9wJiYwPHI/bSh0KToobj1vKSYmbi5zY3JvbGxIZWlnaHQtbi5zY3JvbGxUb3A8PW4uY2xpZW50SGVpZ2h0JiZyPDA/bSh0KTp0LnN0b3BQcm9wYWdhdGlvbigpKSl9LHV8fChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsbSxsP3twYXNzaXZlOiExfTp2b2lkIDApLHU9ITApfX1lbHNle249ZSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aWYodm9pZCAwPT09dil7dmFyIGU9ISFuJiYhMD09PW4ucmVzZXJ2ZVNjcm9sbEJhckdhcCx0PXdpbmRvdy5pbm5lcldpZHRoLWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtlJiYwPHQmJih2PWRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0LGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0PXQrXCJweFwiKX12b2lkIDA9PT1zJiYocz1kb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93LGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIil9KTt2YXIgbz17dGFyZ2V0RWxlbWVudDppLG9wdGlvbnM6ZXx8e319O2M9W10uY29uY2F0KHIoYyksW29dKX12YXIgbn0sZXhwb3J0cy5jbGVhckFsbEJvZHlTY3JvbGxMb2Nrcz1mdW5jdGlvbigpe2Q/KGMuZm9yRWFjaChmdW5jdGlvbihlKXtlLnRhcmdldEVsZW1lbnQub250b3VjaHN0YXJ0PW51bGwsZS50YXJnZXRFbGVtZW50Lm9udG91Y2htb3ZlPW51bGx9KSx1JiYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLG0sbD97cGFzc2l2ZTohMX06dm9pZCAwKSx1PSExKSxjPVtdLGE9LTEpOihvKCksYz1bXSl9LGV4cG9ydHMuZW5hYmxlQm9keVNjcm9sbD1mdW5jdGlvbih0KXtpZihkKXtpZighdClyZXR1cm4gdm9pZCBjb25zb2xlLmVycm9yKFwiZW5hYmxlQm9keVNjcm9sbCB1bnN1Y2Nlc3NmdWwgLSB0YXJnZXRFbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgd2hlbiBjYWxsaW5nIGVuYWJsZUJvZHlTY3JvbGwgb24gSU9TIGRldmljZXMuXCIpO3Qub250b3VjaHN0YXJ0PW51bGwsdC5vbnRvdWNobW92ZT1udWxsLGM9Yy5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGFyZ2V0RWxlbWVudCE9PXR9KSx1JiYwPT09Yy5sZW5ndGgmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsbSxsP3twYXNzaXZlOiExfTp2b2lkIDApLHU9ITEpfWVsc2UgMT09PWMubGVuZ3RoJiZjWzBdLnRhcmdldEVsZW1lbnQ9PT10PyhvKCksYz1bXSk6Yz1jLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50IT09dH0pfX0pO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogSW5pdGlhbGl6YXRpb24gc2NyaXB0IGZvciBnbG9iYWwgcHJvY2Vzc2VzXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblxuLyoqXG4gKlxuICogSW5pdGlhbGl6ZSBmaXRWaWQgZm9yIFlvdVR1YmUgdmllb3MuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cblxuXHREcnVwYWwuYmVoYXZpb3JzLmZpdHZpZGluaXQgPSB7XG5cdCBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXHRcdFx0KGZ1bmN0aW9uICgkKSB7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JCgnLnZpZGVvLWNvbnRhaW5lcicpLmZpdFZpZHMoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KShqUXVlcnkpO1xuXHRcdH1cblx0fTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogYWxlcnQuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYWxlcnQgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBhbGVydElkID0gJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5hdHRyKCdpZCcpO1xuICAgICAgdmFyIGFsZXJ0Q29va2llID0gQ29va2llcy5nZXQoJ2FsZXJ0Q29va2llJyk7XG4gICAgICB2YXIgYWxlcnROb2RlID0gQ29va2llcy5nZXQoJ2FsZXJ0Tm9kZScpO1xuXG4gICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgLy8gSWYgdGhlICdoaWRlIGNvb2tpZSBpcyBub3Qgc2V0IHdlIHNob3cgdGhlIGFsZXJ0XG4gICAgICAgIGlmICgoYWxlcnROb2RlICE9PSBhbGVydElkKSB8fCAoYWxlcnRDb29raWUgIT09ICcxJykpIHtcbiAgICAgICAgICAkKCcuYW1hX19hbGVydF9fd3JhcCcpLmNzcyh7XG4gICAgICAgICAgICBcInRyYW5zaXRpb25cIjogXCJvcGFjaXR5IC4xNXNcIixcbiAgICAgICAgICAgIFwib3BhY2l0eVwiOiBcIjFcIlxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICQoJy5hbWFfX2FsZXJ0X193cmFwJykuY3NzKHtcbiAgICAgICAgICAgIFwiZGlzcGxheVwiOiBcIm5vbmVcIlxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRoZSBldmVudCB0aGF0IGNsb3NlcyB0aGUgcG9wdXAgYW5kIHNldHMgdGhlIGNvb2tpZSB0aGF0IHRlbGxzIHVzIHRvXG4gICAgICAgIC8vIG5vdCBzaG93IGl0IGFnYWluIHVudGlsIG9uZSBkYXkgaGFzIHBhc3NlZC5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuYW1hX19hbGVydF9fY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKCcuYW1hX19hbGVydF9fd3JhcCcpLmNzcyh7XG4gICAgICAgICAgICBcInRyYW5zaXRpb25cIjogXCJvcGFjaXR5IDJzXCIsXG4gICAgICAgICAgICBcIm9wYWNpdHlcIjogXCIwXCIsXG4gICAgICAgICAgICBcImRpc3BsYXlcIjogXCJub25lXCJcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgY29va2llc1xuICAgICAgICAgIENvb2tpZXMuc2V0KCdhbGVydENvb2tpZScsICcxJywgeyBleHBpcmVzOiAxfSk7XG4gICAgICAgICAgQ29va2llcy5zZXQoJ2FsZXJ0Tm9kZScsIGFsZXJ0SWQsIHsgZXhwaXJlczogMX0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogRm9ybSBmaWVsZHMgbWFza2luZ1xuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuZm9ybUl0ZW1zID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuICAgICAgICAgIC8vIERvIG5vdCBleGVjdXRlIGluIHRoZSBsYXlvdXQgYnVpbGRlciBlZGl0IGRpYWxvZ1xuICAgICAgICAgIGlmICghJCgnLmpzLW9mZi1jYW52YXMtZGlhbG9nLW9wZW4nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJy5tdWx0aXNlbGVjdCcpLm11bHRpc2VsZWN0KCk7XG5cbiAgICAgICAgICAgICQoJy5hbWFfX3Rvb2x0aXAnKS50b29sdGlwKHtcbiAgICAgICAgICAgICAgdG9vbHRpcENsYXNzOiBcImFtYV9fdG9vbHRpcC1idWJibGVcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKSB7XG4gICAgICAgICAgICAgIHZhciBtYXhfbGVuZ3RoID0gMTUwO1xuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX2VudGVyZWQgPSAkKCcudGV4dGFyZWEnKS52YWwoKS5sZW5ndGg7XG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfcmVtYWluaW5nID0gbWF4X2xlbmd0aCAtIGNoYXJhY3Rlcl9lbnRlcmVkO1xuICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuaHRtbChjaGFyYWN0ZXJfcmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgaWYgKG1heF9sZW5ndGggPCBjaGFyYWN0ZXJfZW50ZXJlZCkge1xuICAgICAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGpRdWVyeVVJIHNlbGVjdG1lbnUgbWV0aG9kIHRvIGluaXRpYXRlIGN1c3RvbSBkcm9wZG93biBtZW51XG4gICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLnNlbGVjdG1lbnUoKTtcblxuICAgICAgICAgIC8vIFdhaXQgZm9yIGEgc2hvcnQgZGVsYXkgdG8gZW5zdXJlIHRoZSBtZW51IGlzIGZ1bGx5IGxvYWRlZCBhbmQgaW5pdGlhbGl6ZWRcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gU2V0IGFyaWEtbGFiZWwgb24gc2VsZWN0bWVudSBidXR0b25cbiAgICAgICAgICAgIHZhciBpbml0aXRhbFNlbGVjdGVkT3B0aW9uVGV4dCA9ICQoJy51aS1zZWxlY3RtZW51LW1lbnUnKS5maW5kKCdkaXYudWktc3RhdGUtYWN0aXZlJykudGV4dCgpO1xuICAgICAgICAgICAgJCgnLnVpLXNlbGVjdG1lbnUtbWVudScpLmZpbmQoJ2Rpdi51aS1zdGF0ZS1hY3RpdmUnKS5hdHRyKCdhcmlhLWxhYmVsJywgJ1NvcnQgYnkgJyArIGluaXRpdGFsU2VsZWN0ZWRPcHRpb25UZXh0KTtcbiAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgLy8gU2V0IGFyaWEtbGFiZWwgb24gc2VsZWN0bWVudSBidXR0b24gd2hlbiBhbiBvcHRpb24gaXMgc2VsZWN0ZWRcbiAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0Jykuc2VsZWN0bWVudSh7XG4gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgICAgICAgICAvLyBHZXQgdGhlIHRleHQgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT3B0aW9uVGV4dCA9ICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLy8gU2V0IHRoZSBhcmlhLWxhYmVsIGF0dHJpYnV0ZSB0byB0aGUgdGV4dCBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uXG4gICAgICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5uZXh0KCcudWktc2VsZWN0bWVudS1idXR0b24nKS5maW5kKCcudWktc2VsZWN0bWVudS10ZXh0JykuYXR0cignYXJpYS1sYWJlbCcsICdTb3J0eSBieSAnICsgc2VsZWN0ZWRPcHRpb25UZXh0KTtcbiAgICAgICAgICAgICAgJCgnLnVpLXNlbGVjdG1lbnUtbWVudScpLmZpbmQoJy51aS1tZW51LWl0ZW0gZGl2LnVpLXN0YXRlLWFjdGl2ZScpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnU29ydCBieSAnICsgc2VsZWN0ZWRPcHRpb25UZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gUmVmcmVzaCBtZW51IHRvIHNldCBjaGFuZ2VzXG4gICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLnNlbGVjdG1lbnUoJ3JlZnJlc2gnKTtcblxuICAgICAgICAgICAgLy8gSWYgZm9jdXMgaXMgb24gdGhlIHNlbGVjdCBtZW51XG4gICAgICAgICAgICAvLyBPbmx5IHN1Ym1pdCBhZnRlciBoaXR0aW5nIGVudGVyXG4gICAgICAgICAgICAkKCcjZWRpdC1zb3J0LWJ5LS0zLWJ1dHRvbicpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBpZihlLndoaWNoID09IDkpIHtcbiAgICAgICAgICAgICAgICAkKCcjZWRpdC1zb3J0LWJ5LS0zLWJ1dHRvbicpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgaWYoZS53aGljaCA9PSAxMykge1xuICAgICAgICAgICAgICAgICAgICAkKCcjYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNoLXNvbHJwYWdlLTInKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFN1Ym1pdHMgdGhlIHNlYXJjaCBmb3JtIGFmdGVyIGEgc2VsZWN0IG1lbnUgaXRlbXMgaGFzIGJlZW4gc2VsZWN0ZWRcbiAgICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3Q6bm90KCNlZGl0LXNvcnQtYnktLTMpJykub24oJ3NlbGVjdG1lbnVjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJCgnI2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaC1zb2xycGFnZS0yJykuc3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCgnI2VkaXQtc29ydC1ieS0tMy1tZW51JykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQoJyNibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2gtc29scnBhZ2UtMicpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgICQoJyNlZGl0LXNvcnQtYnktLTMtbWVudScpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBTdGFydCBzZWFyY2ggZmlsdGVyXG5cbiAgICAgICAgICAgIHZhciBhdmFpbGFibGVUYWdzID0gW1xuICAgICAgICAgICAgICBcIkFsYWJhbWFcIixcbiAgICAgICAgICAgICAgXCJBbGFza2FcIixcbiAgICAgICAgICAgICAgXCJBbWVyaWNhbiBTYW1vYVwiLFxuICAgICAgICAgICAgICBcIkFyaXpvbmFcIixcbiAgICAgICAgICAgICAgXCJBcmthbnNhc1wiLFxuICAgICAgICAgICAgICBcIkNhbGlmb3JuaWFcIixcbiAgICAgICAgICAgICAgXCJDb2xvcmFkb1wiLFxuICAgICAgICAgICAgICBcIkNvbm5lY3RpY3V0XCIsXG4gICAgICAgICAgICAgIFwiRGVsYXdhcmVcIixcbiAgICAgICAgICAgICAgXCJEaXN0cmljdCBPZiBDb2x1bWJpYVwiLFxuICAgICAgICAgICAgICBcIkZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYVwiLFxuICAgICAgICAgICAgICBcIkZsb3JpZGFcIixcbiAgICAgICAgICAgICAgXCJHZW9yZ2lhXCIsXG4gICAgICAgICAgICAgIFwiR3VhbVwiLFxuICAgICAgICAgICAgICBcIkhhd2FpaVwiLFxuICAgICAgICAgICAgICBcIklkYWhvXCIsXG4gICAgICAgICAgICAgIFwiSWxsaW5vaXNcIixcbiAgICAgICAgICAgICAgXCJJbmRpYW5hXCIsXG4gICAgICAgICAgICAgIFwiSW93YVwiLFxuICAgICAgICAgICAgICBcIkthbnNhc1wiLFxuICAgICAgICAgICAgICBcIktlbnR1Y2t5XCIsXG4gICAgICAgICAgICAgIFwiTG91aXNpYW5hXCIsXG4gICAgICAgICAgICAgIFwiTWFpbmVcIixcbiAgICAgICAgICAgICAgXCJNYXJzaGFsbCBJc2xhbmRzXCIsXG4gICAgICAgICAgICAgIFwiTWFyeWxhbmRcIixcbiAgICAgICAgICAgICAgXCJNYXNzYWNodXNldHRzXCIsXG4gICAgICAgICAgICAgIFwiTWljaGlnYW5cIixcbiAgICAgICAgICAgICAgXCJNaW5uZXNvdGFcIixcbiAgICAgICAgICAgICAgXCJNaXNzaXNzaXBwaVwiLFxuICAgICAgICAgICAgICBcIk1pc3NvdXJpXCIsXG4gICAgICAgICAgICAgIFwiTW9udGFuYVwiLFxuICAgICAgICAgICAgICBcIk5lYnJhc2thXCIsXG4gICAgICAgICAgICAgIFwiTmV2YWRhXCIsXG4gICAgICAgICAgICAgIFwiTmV3IEhhbXBzaGlyZVwiLFxuICAgICAgICAgICAgICBcIk5ldyBKZXJzZXlcIixcbiAgICAgICAgICAgICAgXCJOZXcgTWV4aWNvXCIsXG4gICAgICAgICAgICAgIFwiTmV3IFlvcmtcIixcbiAgICAgICAgICAgICAgXCJOb3J0aCBDYXJvbGluYVwiLFxuICAgICAgICAgICAgICBcIk5vcnRoIERha290YVwiLFxuICAgICAgICAgICAgICBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuICAgICAgICAgICAgICBcIk9oaW9cIixcbiAgICAgICAgICAgICAgXCJPa2xhaG9tYVwiLFxuICAgICAgICAgICAgICBcIk9yZWdvblwiLFxuICAgICAgICAgICAgICBcIlBhbGF1XCIsXG4gICAgICAgICAgICAgIFwiUGVubnN5bHZhbmlhXCIsXG4gICAgICAgICAgICAgIFwiUHVlcnRvIFJpY29cIixcbiAgICAgICAgICAgICAgXCJSaG9kZSBJc2xhbmRcIixcbiAgICAgICAgICAgICAgXCJTb3V0aCBDYXJvbGluYVwiLFxuICAgICAgICAgICAgICBcIlNvdXRoIERha290YVwiLFxuICAgICAgICAgICAgICBcIlRlbm5lc3NlZVwiLFxuICAgICAgICAgICAgICBcIlRleGFzXCIsXG4gICAgICAgICAgICAgIFwiVXRhaFwiLFxuICAgICAgICAgICAgICBcIlZlcm1vbnRcIixcbiAgICAgICAgICAgICAgXCJWaXJnaW4gSXNsYW5kc1wiLFxuICAgICAgICAgICAgICBcIlZpcmdpbmlhXCIsXG4gICAgICAgICAgICAgIFwiV2FzaGluZ3RvblwiLFxuICAgICAgICAgICAgICBcIldlc3QgVmlyZ2luaWFcIixcbiAgICAgICAgICAgICAgXCJXaXNjb25zaW5cIixcbiAgICAgICAgICAgICAgXCJXeW9taW5nXCJcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICQoIFwiI3NlYXJjaF9maWx0ZXJcIiApLmF1dG9jb21wbGV0ZSh7XG4gICAgICAgICAgICAgIHNvdXJjZTogYXZhaWxhYmxlVGFnc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQudWkuYXV0b2NvbXBsZXRlLnByb3RvdHlwZS5fcmVzaXplTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdmFyIHVsID0gdGhpcy5tZW51LmVsZW1lbnQ7XG4gICAgICAgICAgICAgIHVsLm91dGVyV2lkdGgodGhpcy5lbGVtZW50Lm91dGVyV2lkdGgoKSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIC8vIFN0YXJ0IHNlYXJjaCBmaWx0ZXIgd2l0aCBjaGVja2JveGVzXG5cbiAgICAgICAgICAgIHZhciBkYXRhTW9kZWwgPSBbXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQWxhYmFtYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0FsYXNrYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0FtZXJpY2FuIFNhbW9hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQXJpem9uYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0Fya2Fuc2FzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQ2FsaWZvcm5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0NvbG9yYWRvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQ29ubmVjdGljdXQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdEZWxhd2FyZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnRmxvcmlkYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0dlb3JnaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdHdWFtJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSGF3YWlpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSWRhaG8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdJbGxpbm9pcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0luZGlhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdJb3dhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnS2Fuc2FzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnS2VudHVja3knLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdMb3Vpc2lhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNYWluZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01hcnNoYWxsIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNYXJ5bGFuZCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01hc3NhY2h1c2V0dHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNaWNoaWdhbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01pbm5lc290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01pc3Npc3NpcHBpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWlzc291cmknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNb250YW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmVicmFza2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXZhZGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXcgSGFtcHNoaXJlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEplcnNleScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05ldyBNZXhpY28nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXcgWW9yaycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05vcnRoIENhcm9saW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGggRGFrb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnT2hpbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ09rbGFob21hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnT3JlZ29uJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnUGFsYXUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdQZW5uc3lsdmFuaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdQdWVydG8gUmljbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1Job2RlIElzbGFuZCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1NvdXRoIENhcm9saW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnU291dGggRGFrb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVGVubmVzc2VlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVGV4YXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdVdGFoJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVmVybW9udCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbiBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdXYXNoaW5ndG9uJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnV2VzdCBWaXJnaW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1dpc2NvbnNpbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1d5b21pbmcnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICcnLCB2YWx1ZTogJyd9XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxDaGFuZ2UoKXtcbiAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9ICQoJyNteUNoZWNrTGlzdCcpLmNoZWNrTGlzdCgnZ2V0U2VsZWN0aW9uJyk7XG5cbiAgICAgICAgICAgICAgJCgnI3NlbGVjdGVkSXRlbXMnKS50ZXh0KEpTT04uc3RyaW5naWZ5KHNlbGVjdGlvbikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGpRdWVyeS51aS5jaGVja0xpc3QpICE9ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICAgJCgnI2ZpbHRlckxpc3QnKS5jaGVja0xpc3Qoe1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtczogZGF0YU1vZGVsLFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBzZWxDaGFuZ2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoJ2Zvcm06bm90KFtjbGFzcyo9XCJsYXlvdXQtYnVpbGRlclwiXSkgW3R5cGU9Y2hlY2tib3hdJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICQoJ1t0eXBlPWNoZWNrYm94XScpLmNoZWNrYm94cmFkaW8oKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKCdmb3JtOm5vdChbY2xhc3MqPVwibGF5b3V0LWJ1aWxkZXJcIl0pIFt0eXBlPXJhZGlvXScpLmNoZWNrYm94cmFkaW8oKS5idXR0b25zZXQoKS5maW5kKCdsYWJlbCcpLmNzcygnd2lkdGgnLCAnMTkuNCUnKTtcblxuICAgICAgICAgICAgJCgnLnRleHRhcmVhJykua2V5dXAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBSYW5nZSBGaWVsZFxuICAgICAgICAgICAgdmFyIGxlZ2VuZCA9ICQoJy5hbWFfX3JhbmdlLWZpZWxkX19sZWdlbmQnKTtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSAkKCBcIiNjdXJyZW50VmFsdWVcIiApO1xuXG4gICAgICAgICAgICAkKFwiLmFtYV9fcmFuZ2UtZmllbGRcIikuc2xpZGVyKHtcbiAgICAgICAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgcmFuZ2U6ICdtaW4nLFxuICAgICAgICAgICAgICB2YWx1ZTogMSxcbiAgICAgICAgICAgICAgbWluOiAyMDAwLFxuICAgICAgICAgICAgICBtYXg6IDUwMDAsXG4gICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlID0galF1ZXJ5KHRoaXMpLmZpbmQoJy51aS1zbGlkZXItaGFuZGxlJyk7XG4gICAgICAgICAgICAgICAgdmFyIGJ1YmJsZSA9IGpRdWVyeSgnPGRpdiBjbGFzcz1cImFtYV9fcmFuZ2UtZmllbGRfX3ZhbHVlYm94XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgaGFuZGxlLmFwcGVuZChidWJibGUpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZ0LCB1aSkge1xuICAgICAgICAgICAgICAgIHVpLmhhbmRsZS5jaGlsZE5vZGVzWzBdLmlubmVySFRNTCA9ICckJyArIHVpLnZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5hcHBlbmQobGVnZW5kKTtcblxuICAgICAgICAgICAgLy8gRm9ybSBhY2NvcmRpb25cbiAgICAgICAgICAgICQoIFwiLnRhYmxpc3RcIiApLmFjY29yZGlvbih7XG4gICAgICAgICAgICAgIGhlYWRlcjogXCIuYW1hX19mb3JtLXN0ZXBzX19zdGVwXCIsXG4gICAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEV4cGFuZCBsaXN0XG4gICAgICAgICAgICBmdW5jdGlvbiBleHBhbmRMaXN0QWNjb3JkaW9uKGVsZW1lbnQsIG9wZW4pe1xuICAgICAgICAgICAgICAkKGVsZW1lbnQpLmFjY29yZGlvbih7XG4gICAgICAgICAgICAgICAgbXVsdGlwbGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaWNvbnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbmltYXRlOiA1MDAsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBvcGVuLFxuICAgICAgICAgICAgICAgIGFjdGl2YXRlIDogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICAgICAgICAgICAgaWYoJCh1aS5uZXdQYW5lbCkuaGFzQ2xhc3MoJ3VpLWFjY29yZGlvbi1jb250ZW50LWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICQodWkubmV3UGFuZWwpLnByZXYoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKHVpLm9sZFBhbmVsKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZigkKFwiLmFtYV9fZXhwYW5kLWxpc3RcIikuZmluZCgnLnVpLWNoZWNrYm94cmFkaW8tY2hlY2tlZCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICBleHBhbmRMaXN0QWNjb3JkaW9uKCcuYW1hX19leHBhbmQtbGlzdCcsIDApO1xuICAgICAgICAgICAgICAkKFwiLmFtYV9fZXhwYW5kLWxpc3QgLmFtYV9fZXhwYW5kLWxpc3RfX2hlYWRlclwiKS5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGV4cGFuZExpc3RBY2NvcmRpb24oJy5hbWFfX2V4cGFuZC1saXN0JywgZmFsc2UpO1xuICAgICAgICAgICAgICAkKFwiLmFtYV9fZXhwYW5kLWxpc3RcIikuY2hpbGRyZW4oJy5hbWFfX2V4cGFuZC1saXN0X19oZWFkZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENvbGxhcHNlIGFsbCBhY2NvcmRpb24gcGFuZWxzXG4gICAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX2NvbGxhcHNlLXBhbmVscyBidXR0b24nKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkKCcuYW1hX19leHBhbmQtbGlzdCAudWktYWNjb3JkaW9uLWhlYWRlcicpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ3VpLXN0YXRlLWFjdGl2ZScpIHx8ICQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBPcGVuIGFjY29yZGlvbiBwYW5lbHMgZm9yIG1vYmlsZVxuICAgICAgICAgICAgJCgnLmFtYV9fYXBwbGllZC1maWx0ZXJzX19zaG93LWZpbHRlcnMnKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QsIC5hbWFfX2FwcGxpZWQtZmlsdGVyc19fdGFncycpLnNsaWRlVG9nZ2xlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJy5hbWFfX2FwcGxpZWQtZmlsdGVyc19fc2hvdy1maWx0ZXJzJykudGV4dCgkKHRoaXMpLmlzKCc6dmlzaWJsZScpID8gJ0hpZGUgRmlsdGVyJyA6ICdGaWx0ZXInKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gbGlzdEZpbHRlcihpbnB1dCwgbGlzdCkgeyAvLyBoZWFkZXIgaXMgYW55IGVsZW1lbnQsIGxpc3QgaXMgYW4gdW5vcmRlcmVkIGxpc3RcbiAgICAgICAgICAgICAgLy8gY3VzdG9tIGNzcyBleHByZXNzaW9uIGZvciBhIGNhc2UtaW5zZW5zaXRpdmUgY29udGFpbnMoKVxuICAgICAgICAgICAgICBqUXVlcnkuZXhwclsnOiddLkNvbnRhaW5zID0gZnVuY3Rpb24oYSxpLG0pe1xuICAgICAgICAgICAgICAgIHJldHVybiAoYS50ZXh0Q29udGVudCB8fCBhLmlubmVyVGV4dCB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpLmluZGV4T2YobVszXS50b1VwcGVyQ2FzZSgpKT49MDtcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAkKGlucHV0KS5jaGFuZ2UoIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgICBpZihmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMgZmluZHMgYWxsIGxpbmtzIGluIGEgbGlzdCB0aGF0IGNvbnRhaW4gdGhlIGlucHV0LFxuICAgICAgICAgICAgICAgICAgLy8gYW5kIGhpZGUgdGhlIG9uZXMgbm90IGNvbnRhaW5pbmcgdGhlIGlucHV0IHdoaWxlIHNob3dpbmcgdGhlIG9uZXMgdGhhdCBkb1xuICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwic3Bhbjpub3QoOkNvbnRhaW5zKFwiICsgZmlsdGVyICsgXCIpKVwiKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJzcGFuOkNvbnRhaW5zKFwiICsgZmlsdGVyICsgXCIpXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwibGFiZWxcIikuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gb25seSBzaG93IHJlc3VsdHMgYWZ0ZXIgMyBjaGFyYWN0ZXJzIGFyZSBlbnRlcmVkXG4gICAgICAgICAgICAgIH0pLmtleXVwKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiggdGhpcy52YWx1ZS5sZW5ndGggPCA0ICkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICQodGhpcykuY2hhbmdlKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGlzdEZpbHRlcigkKFwiI2FtYV9fc2VhcmNoX19sb2NhdGlvblwiKSwgJChcIi5hbWFfX2Zvcm0tZ3JvdXBcIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYWtlIHRoZSBlbnRpcmUgc3Vic2NyaWJlIGJ1dHRvbiBjbGlja2FibGUuXG4gICAgICAgICAgJCgnZm9ybS5zYWxlc2ZvcmNlLXN1YnNjcmliZS1mb3JtLCAuYW1hX19pbnB1dC13cmFwcGVyLS1zdWJzY3JpYmUtbmV3cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzYWxlc2ZvcmNlLXN1YnNjcmliZS1mb3JtJykpIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgbGluayA9ICQodGhpcykuZmluZCgnYScpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGxpbms7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZigkKCcucGFyYWdyYXBoLS10eXBlLS1mb3JtLTUwLTUwIGRpdi5zdWNjZXNzX21lc3NhZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJy5wYXJhZ3JhcGgtLXR5cGUtLWZvcm0tNTAtNTAnKS5maW5kKCcuZm9ybS1jb250ZW50JykuYWRkQ2xhc3MoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogUmliYm9uIG5hdiB1c2VyIGludGVyYWN0aW9ucy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gJ2Fub255bW91cyBjbG9zdXJlJy4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5yaWJib25uYXYgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgZnVuY3Rpb24gc2V0U3RpY2t5TmF2KCkgeyBcbiAgICAgICAgLy8gTmVlZHMgZG9jIHJlYWR5IGJlY2F1c2UgdGhlIGFkbWluIHRvb2xiYXIgbmVlZHMgdG8gZ2V0IGxvYWRlZCB0byBkZXRlcm1pbmUgdGhlIHRvcCBzcGFjaW5nIGZvciBzdGlja3kgbmF2XG4gICAgICAgIHZhciAkYm9keUZpeGVkID0gJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnKTtcblxuICAgICAgICAvLyBTZXQgbWFpbiBuYXYgYW5kIHByb2R1Y3QgbmF2IHN0aWNreSBzdGF0ZSBiYXNlZCBvbiBhZG1pbiB0b29sYmFyIGFuZCBzY3JlZW4gc2l6ZS5cbiAgICAgICAgaWYoJGJvZHlGaXhlZCA9PT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24nKS51bnN0aWNrKCkucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZigkKHdpbmRvdykud2lkdGgoKSA8IDc2OCApIHsgLy8gSWYgbGVzcyB0aGFuIHRhYmxldFxuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbicpLnN0aWNreSh7ekluZGV4OiA1MDEgfSk7XG4gICAgICAgIH0gZWxzZSBpZigkKCcudG9vbGJhci10cmF5JykuaGFzQ2xhc3MoJ3Rvb2xiYXItdHJheS1ob3Jpem9udGFsJykpIHtcbiAgICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gJykuc3RpY2t5KHsgekluZGV4OiA1MDEsIHRvcFNwYWNpbmc6IDc5IH0pO1xuICAgICAgICB9IGVsc2UgaWYoJCgnLnRvb2xiYXItdHJheScpLmhhc0NsYXNzKCd0b29sYmFyLXRyYXktdmVydGljYWwnKSkge1xuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAnKS5zdGlja3koeyB6SW5kZXg6IDUwMSwgdG9wU3BhY2luZzogMzkgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uICcpLnN0aWNreSh7IHpJbmRleDogNTAxIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBzZXRTdGlja3lOYXYoKTtcblxuICAgICAgLy8gT24gcmVzaXplLCByZXNldCBzdGlja3kgc3RhdGUuXG4gICAgICAkKCB3aW5kb3cgKS5vbigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFVuZG8gaW5saW5lIHN0eWxlcyB0byBwcmV2ZW50IHN0aWNreSBuYXYgZnJvbSBicmVha2luZyBvbiByZXNpemUuXG4gICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAnKS51bnN0aWNrKCk7XG4gICAgICAgIHNldFN0aWNreU5hdigpO1xuICAgICAgfSk7XG5cbiAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsYXNzX2FjdGl2ZSA9ICdpcy1hY3RpdmUnO1xuXG4gICAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd25fX3RyaWdnZXInLCB0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAvLyBVbmZvY3VzIG9uIHRoZSBkcm9wZG93bi5cbiAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIGZvciBDU1MuXG4gICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgdG8gdGhlIGRyb3Bkb3duIFVMLlxuICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd25fX3RyaWdnZXInLCB0aGlzKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBTdWJjYXRlZ29yeVxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnN1YmNhdGVnb3JpZXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgLy8gQ3JlYXRlIHN0YXRpYyB2YXIgZm9yIHN1YmNhdGVnb3J5IGl0ZW0gY291bnQuIFRvIGJlIHVzZWQgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgcmVjYWxjdWxhdGlvbnMgYXJlIG5lZWRlZC5cbiAgICAgIHZhciBzdWJjYXRlZ29yeUV4cGxvcmF0aW9uQ29sdW1ucyA9IDA7XG5cbiAgICAgIGZ1bmN0aW9uIGNoZWNrU2l6ZSgpIHtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zdWJjYXRlZ29yeScpO1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5Q29udGFpbmVyID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX2NvbnRhaW5lcicpO1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5VGl0bGUgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdGl0bGUnKTtcbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgd2lkdGggbWludXMgcGFkZGluZyBzbyB1c2Ugd2lkdGgoKSBpbnN0ZWFkIG9mIGlubmVyV2lkdGgoKS5cbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5RXhwbG9yYXRpb25XaWR0aCA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzJykud2lkdGgoKTtcbiAgICAgICAgLy8gU3ViY2F0ZWdvcnkgaXRlbXMgaGF2ZSBtYXgtd2lkdGggb2YgMTgwcHguIFRoaXMgd2lsbCBiZSB1c2VkIGZvciBjYWxjdWxhdGlvbnMgaW5zdGVhZCBvZiBleHRyYWN0aW5nIGl0IHZpYSBqUXVlcnkgY2FsbHMuXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUl0ZW1XaWR0aCA9IDE4MDtcbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5VGl0bGVXaWR0aCA9ICRzdWJjYXRlZ29yeVRpdGxlLm91dGVyV2lkdGgoKTtcbiAgICAgICAgdmFyIHRvdGFsR3JpZEl0ZW1zID0gJHN1YmNhdGVnb3J5Lmxlbmd0aCArIDE7XG4gICAgICAgIC8vIFN0YXJ0IGNvbHVtbiBjb3VudCBhcyBsb3dlc3QgcG9zc2libGUuXG4gICAgICAgIHZhciBjb2x1bW5Db3VudCA9IDI7XG4gICAgICAgIC8vIFNldCBzdWJjYXRlZ29yeSByb3cgaXRlbXMgdG8gbG93ZXN0IHRoYXQgc2hvdWxkIGRpc3BsYXkuXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUl0ZW1zUGVyUm93ID0gTWF0aC5mbG9vcigoc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbldpZHRoIC0gc3ViY2F0ZWdvcnlUaXRsZVdpZHRoKSAvIHN1YmNhdGVnb3J5SXRlbVdpZHRoKTtcblxuICAgICAgICBpZiAoc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyA8IDIpIHtcbiAgICAgICAgICAvLyBUaGUgbWluaW11bSBzdWJjYXRlZ29yeSBpdGVtcyBwZXIgcm93IHNob3VsZCBiZSB0d28uIElmIHRoZSB2YXJpYWJsZSBjb21wdXRlZCB0byBsZXNzLCBtYW51YWxseSBjb3JyZWN0IGl0LlxuICAgICAgICAgIHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgPSAyO1xuICAgICAgICAgIHRvdGFsR3JpZEl0ZW1zID0gdG90YWxHcmlkSXRlbXMgLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbkNvdW50ID0gc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyArIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgaWYgY2hhbmdlcyBpbiBjb2x1bW4gY291bnQgaGFzIG9jY3VycmVkIGFuZCBhY3QgYWNjb3JkaW5nbHlcbiAgICAgICAgaWYgKHN1YmNhdGVnb3J5RXhwbG9yYXRpb25Db2x1bW5zICE9PSBjb2x1bW5Db3VudCkge1xuICAgICAgICAgIC8vIERldGVybWluZSBhZGRpdGlvbmFsIFwiZmlsbGVyLWJveFwiIG5lZWRlZCB0byBjcmVhdGUgY29tcGxldGUgcm93XG4gICAgICAgICAgdmFyIGZpbGxlckJveENvdW50ID0gY29sdW1uQ291bnQgLSAodG90YWxHcmlkSXRlbXMgJSBjb2x1bW5Db3VudCk7XG4gICAgICAgICAgZmlsbEdyaWRSb3coJHN1YmNhdGVnb3J5Q29udGFpbmVyLCBmaWxsZXJCb3hDb3VudCk7XG4gICAgICAgICAgLy8gVXBkYXRlIHBlcnNpc3RlbnQgY29sdW1uIGNvdW50XG4gICAgICAgICAgc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbkNvbHVtbnMgPSBjb2x1bW5Db3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSB2aWV3YWJsZSBzdWJjYXRlZ29yaWVzLlxuICAgICAgICAkc3ViY2F0ZWdvcnkuaGlkZSgpO1xuICAgICAgICAkc3ViY2F0ZWdvcnkuc2xpY2UoMCwgc3ViY2F0ZWdvcnlJdGVtc1BlclJvdykuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuXG4gICAgICAgIHZpZXdNb3JlKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHZpZXdNb3JlKCkge1xuICAgICAgICB2YXIgJHZpZXdMZXNzID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctbGVzcycpO1xuICAgICAgICB2YXIgJHZpZXdNb3JlID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctYWxsJyk7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnkgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc3ViY2F0ZWdvcnknKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeUNvbnRhaW5lciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX19jb250YWluZXInKTtcblxuICAgICAgICAkdmlld0xlc3MuaGlkZSgpO1xuICAgICAgICAkdmlld01vcmUuc2hvdygpO1xuXG4gICAgICAgICQoJy52aWV3QWxsJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5LmZhZGVJbigpO1xuICAgICAgICAgICR2aWV3TW9yZS5oaWRlKCk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5Q29udGFpbmVyLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICR2aWV3TGVzcy5zaG93KCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnZpZXdMZXNzJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5LmhpZGUoKTtcbiAgICAgICAgICBjaGVja1NpemUoKTtcbiAgICAgICAgICAkdmlld0xlc3MuaGlkZSgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeUNvbnRhaW5lci5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAkdmlld01vcmUuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuXG4gICAgICBmdW5jdGlvbiBmaWxsR3JpZFJvdygkY29udGFpbmVyLCBjb3VudCkge1xuICAgICAgICB2YXIgZmlsbGVyQm94ID0gJzxkaXYgY2xhc3M9XCJmaWxsZXItYm94XCI+PC9kaXY+JztcbiAgICAgICAgLy8gY2xlYXIgb3V0IGN1cnJlbnQgZmlsbGVyIGJveGVzXG4gICAgICAgIHZhciAkZmlsbGVyQm94ZXMgPSAkY29udGFpbmVyLmZpbmQoJy5maWxsZXItYm94Jyk7XG4gICAgICAgICRmaWxsZXJCb3hlcy5yZW1vdmUoKTtcbiAgICAgICAgLy8gZmlsbCBvdXQgZ3JpZCByb3dcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoZmlsbGVyQm94KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBydW4gdGVzdCBvbiBpbml0aWFsIHBhZ2UgbG9hZFxuICAgICAgY2hlY2tTaXplKCk7XG5cbiAgICAgIC8vIHJ1biB0ZXN0IG9uIHJlc2l6ZSBvZiB0aGUgd2luZG93XG4gICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hlY2tTaXplKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKj09PT09PSBqUXVlcnkgVUkgdGFicyA9PT09PT0qL1xuXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3RhYnMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBkZWZhdWx0QWN0aXZlVGFiID0gMDtcbiAgICAgIHZhciB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBpZiAodmlld3BvcnRXaWR0aCA+PSA2MDAgJiYgJCgnLmFtYV9fcmVzb3VyY2UtdGFicycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZGVmYXVsdEFjdGl2ZVRhYiA9IDE7XG4gICAgICB9XG5cbiAgICAgICQoXCIuYW1hX190YWJzLCAuYW1hX19yZXNvdXJjZS10YWJzXCIpLnRhYnMoe1xuICAgICAgICBhY3RpdmU6IGRlZmF1bHRBY3RpdmVUYWIsXG4gICAgICAgIGFjdGl2YXRlOiByZW1vdmVIaWdobGlnaHRzXG4gICAgICB9KTtcblxuICAgICAgLy8gUHJldmVudCBqdW1wIG9uY2xpY2tcbiAgICAgICQoJy51aS10YWJzLWFuY2hvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cblxuICAgICAgLy9TaW11bGF0ZSBjbGljayBldmVudCBvbiBhY3R1YWwgc2ltcGxlVGFicyB0YWIgZnJvbSBtb2JpbGUgZHJvcCBkb3duLlxuICAgICAgJCgnLmFtYV9fdGFicy1uYXZpZ2F0aW9uLS1tb2JpbGUgc2VsZWN0Jykub24oXCJzZWxlY3RtZW51Y2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCwgdWkpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSB1aS5pdGVtLnZhbHVlO1xuICAgICAgICAkKCdhW2hyZWY9XCIjJyArIHNlbGVjdGVkVmFsdWUgKyAnXCJdJykuY2xpY2soKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBXaGVuIGNsaWNraW5nIGFuIGlubGluZSByZXNvdXJjZSBwYWdlIGxpbmsgcmVmZXJlbmNpbmcgYSB0YWIsIG9wZW4gcmVmZXJlbmNlZCB0YWIuXG4gICAgICAkKCcuYW1hX19yZXNvdXJjZS1saW5rLS1pbmxpbmUsIC5hbWFfX3BhZ2UtLXJlc291cmNlX19yZXNvdXJjZS1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyICR0YWJzID0gJCgnLmFtYV9fcmVzb3VyY2UtdGFicycpO1xuICAgICAgICBzd2l0Y2hUYWJzKCR0YWJzLCB0aGlzKTtcbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiByZW1vdmVIaWdobGlnaHRzKCkge1xuICAgICAgICAkKCcuYW1hX3Jlc291cmNlLWhlYWRlci0taGlnaGxpZ2h0JykucmVtb3ZlQ2xhc3MoJ2FtYV9yZXNvdXJjZS1oZWFkZXItLWhpZ2hsaWdodCcpO1xuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICogVGhpcyBmdW5jdGlvbiBhbmltYXRlcyB0aGUgYnJvd3NlciBzY3JvbGwgYWN0aW9uIHdpdGggYXR0ZW50aW9uIHRvIGtleWJvYXJkIG9ubHkgYWNjZXNzaWJpbGl0eSBjb25jZXJuc1xuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5IE9iamVjdH0gJHRhYk5hdlxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFyZ2V0XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbCgkdGFiTmF2LCB0YWJIYXNoLCBwb3NpdGlvbkluVGFiKSB7XG4gICAgICAgIHZhciBzY3JvbGxUYXJnZXQgPSB3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMjAwID8gJy5hbWFfX3Jlc291cmNlLXRhYnNfX2NvbnRlbnQnIDogJ2h0bWwsYm9keSc7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHByZXZpb3VzIGhpZ2hsaWdodHMsIGlmIGFueVxuICAgICAgICByZW1vdmVIaWdobGlnaHRzKCk7XG5cbiAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGFyZ2V0IGVsZW1lbnQgb2Zmc2V0LCBidXQgZGVmYXVsdCB0byB6ZXJvXG4gICAgICAgIHZhciBzY3JvbGxQb3NpdGlvbiA9IDA7XG4gICAgICAgIHZhciAkdGFyZ2V0O1xuICAgICAgICBpZiAocG9zaXRpb25JblRhYiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIHRhYkVsZW1lbnRzID0gJCh0YWJIYXNoICsgJyAuYW1hX19yZXNvdXJjZS10YWJzX19pdGVtJyk7XG4gICAgICAgICAgaWYgKHRhYkVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gSWYgZGVzaXJlZCBwb3NpdGlvbiBpcyBsYXJnZXIgdGhhbiB0aGUgcmVzdWx0IHNldCwgdXNlIHRoZSBsYXN0IGVsZW1lbnRcbiAgICAgICAgICAgIGlmICh0YWJFbGVtZW50cy5sZW5ndGggPD0gcG9zaXRpb25JblRhYikge1xuICAgICAgICAgICAgICBwb3NpdGlvbkluVGFiID0gdGFiRWxlbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXNlcnMgYXJlIGluc3RydWN0ZWQgdG8gY29uc2lkZXIgMSBhcyB0aGUgZmlyc3QgZWxlbWVudFxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRhYkVsZW1lbnRzW3Bvc2l0aW9uSW5UYWIgLSAxXTtcbiAgICAgICAgICAgIHNjcm9sbFBvc2l0aW9uID0gdGFyZ2V0Lm9mZnNldFRvcDtcbiAgICAgICAgICAgIC8vIEFkZCBoaWdobGlnaHQgdG8gdGFyZ2V0XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJCh0YXJnZXQpLmZpbmQoJy5hbWFfcmVzb3VyY2UtaGVhZGVyJyk7IC8vIHNhdmUgZm9yIHVzZSBpbiBhbmltYXRlKCkgY2FsbGJhY2tcbiAgICAgICAgICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2FtYV9yZXNvdXJjZS1oZWFkZXItLWhpZ2hsaWdodCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkdGFyZ2V0ID0gJCh0YWJIYXNoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJChzY3JvbGxUYXJnZXQpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsUG9zaXRpb25cbiAgICAgICAgfSwgODUwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gVXBkYXRlIGZvY3VzIGZvciBrZXlib2FyZCBvbmx5IG5hdmlnYXRpb25cbiAgICAgICAgICAkdGFyZ2V0LmF0dHIoJ3RhYmluZGV4JywgJy0xJykuZm9jdXMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLypcbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gb3BlbnMgcmVmZXJlbmNlZCB0YWJzIGZyb20gaW5saW5lIGxpbmtzXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFiT2JqIFRoZSBlbGVtZW50IHdoaWNoIGhhcyB0aGUgLnRhYigpIGZ1bmN0aW9uIGF0dGFjaGVkLlxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBsaW5rXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHN3aXRjaFRhYnMoJHRhYk9iaiwgbGluaykge1xuXG4gICAgICAgIHZhciBsaW5rSGFzaCA9IGxpbmsuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgICAgdmFyIHdpZGdldCA9ICR0YWJPYmouZGF0YSgndWktdGFicycpO1xuXG4gICAgICAgIHZhciB0YWJIYXNoLCBwb3NpdGlvbkluVGFiO1xuICAgICAgICB2YXIgcGFydHMgPSBsaW5rSGFzaC5zcGxpdCgnLScpO1xuICAgICAgICB0YWJIYXNoID0gcGFydHNbMF07XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcG9zaXRpb25JblRhYiA9IHBhcnRzWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIElmIG9sZCBsaW5rLCB0cnkgdG8gZGV0ZXJtaW5lIHBvc2l0aW9uIGZyb20gbGluayB0ZXh0XG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSBsaW5rLmlubmVyVGV4dC5tYXRjaCgvKFswLTldKykvZyk7XG4gICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uSW5UYWIgPSBtYXRjaGVzLnNoaWZ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW5zdXJlIGNvcnJlY3QgdGFiIGlzIGFjdGl2ZVxuICAgICAgICB2YXIgdGFiSW5kZXggPSB3aWRnZXQuX2dldEluZGV4KHRhYkhhc2gpO1xuICAgICAgICAkdGFiT2JqLnRhYnMoe1xuICAgICAgICAgIGFjdGl2ZTogdGFiSW5kZXhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRvcCBvZiB1aSB0YWJzIG5hdmlnYXRpb25cbiAgICAgICAgc21vb3RoU2Nyb2xsKCR0YWJPYmosIHRhYkhhc2gsIHBvc2l0aW9uSW5UYWIpO1xuXG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyo9PT09PT0galF1ZXJ5IFVJIGFjY29yZGlvbiA9PT09PT0qL1xuXG4oZnVuY3Rpb24oJCkge1xuICAgICQoIFwiLmFtYV9fYWNjb3JkaW9uXCIgKS5hY2NvcmRpb24oe1xuICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCIsXG4gICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgfSk7XG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgdmFyIHZlcmlmeUZpZWxkcyA9IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICB2YXIgJHNlY3Rpb25zID0gZm9ybS5maW5kKCdzZWN0aW9uJyk7XG4gICAgdmFyICRpbnB1dHMgPSAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gc2VjdGlvbiAqJykuZmlsdGVyKCc6aW5wdXQnKTtcbiAgICB2YXIgJGljb25FbGVtZW50ID0gJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpO1xuICAgIHZhciBlcnJvclNlY3Rpb25zID0gW107XG5cbiAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24oaSwgaW5wdXQpIHtcbiAgICAgICRjbG9zZXN0U2VjdGlvbiA9ICQodGhpcykuY2xvc2VzdCgnc2VjdGlvbicpLmF0dHIoJ2RhdGEtZHJ1cGFsLXNlbGVjdG9yJykudG9TdHJpbmcoKTtcbiAgICAgIGlmICgkKHRoaXMpLnByb3AoJ3JlcXVpcmVkJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXJyb3InKSkge1xuICAgICAgICBlcnJvclNlY3Rpb25zLnB1c2goJGNsb3Nlc3RTZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRzZWN0aW9ucy5lYWNoKGZ1bmN0aW9uKGksIHNlY3Rpb24pIHtcbiAgICAgIGlmICgkLmluQXJyYXkoJCh0aGlzKS5hdHRyKCdkYXRhLWRydXBhbC1zZWxlY3RvcicpLnRyaW0oKS50b1N0cmluZygpLCBlcnJvclNlY3Rpb25zKSAhPT0gLTEpIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCRpY29uRWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2VkaXQgZXJyb3IgY29tcGxldGVkJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCRpY29uRWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2VkaXQgZXJyb3IgY29tcGxldGVkJykuYWRkQ2xhc3MoJ2NvbXBsZXRlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcbiAgICB2YXIgZW1haWxSZWcgPSAvXihbXFx3LVxcLl0rQChbXFx3LV0rXFwuKStbXFx3LV17Miw0fSk/JC87XG4gICAgcmV0dXJuIGVtYWlsUmVnLnRlc3QoZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmllbGRJc1JlcXVpcmVkKGlucHV0KSB7XG4gICAgaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgaW5wdXQubmV4dCgpLnJlbW92ZSgnLmZvcm0taXRlbS0tZXJyb3ItbWVzc2FnZScpO1xuICAgIGlucHV0LmFmdGVyKCc8ZGl2IGNsYXNzPVwiZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlXCI+RmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0ZpZWxkKGlucHV0KSB7XG4gICAgaWYgKGlucHV0LnByb3AoJ3JlcXVpcmVkJykgJiYgKGlucHV0LnZhbCgpLmxlbmd0aCA9PT0gMCB8fCBpbnB1dC52YWwoKSA9PT0gXCJcIikpIHtcbiAgICAgIGZpZWxkSXNSZXF1aXJlZChpbnB1dCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKGlucHV0LmF0dHIoJ3R5cGUnKSA9PT0gJ2VtYWlsJyAmJiAhdmFsaWRhdGVFbWFpbChpbnB1dC52YWwoKSkpIHtcbiAgICAgICAgZmllbGRJc1JlcXVpcmVkKGlucHV0KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKS5uZXh0KCkucmVtb3ZlKCcuZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU3VibWl0cyBmaXJzdCBwYWdlIG9mIENvbnRhY3QgVXMgZm9ybSBvbiByYWRpbyBidXR0b24gc2VsZWN0aW9uXG4gICQuZm4uY29udGFjdFN1Ym1pdCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyICR3ZWJmb3JtX2J1dHRvbnMgPSAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWNvbnRhY3QtdXMtZm9ybSBpbnB1dFt0eXBlPVwicmFkaW9cIl0nKTtcbiAgICAkd2ViZm9ybV9idXR0b25zLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1jb250YWN0LXVzLWZvcm0nKS5zdWJtaXQoKTtcbiAgICB9KTtcbiAgfVxuICAkLmZuLmNvbnRhY3RTdWJtaXQoKTtcbiAgJCggZG9jdW1lbnQgKS5hamF4Q29tcGxldGUoZnVuY3Rpb24oKSB7XG4gICAgJC5mbi5jb250YWN0U3VibWl0KCk7XG4gIH0pO1xuXG4gIC8vIEdvIGJhY2sgdG8gcHJldmlvdXMgYmFjayBpcyB1c2VyIGNsaWNrcyBkZWNsaW5lIHN1Ym1pdCBidXR0b25cbiAgJCgnLmFtYV9fYnV0dG9uLS1kZWNsaW5lJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciA9PT0gXCJcIikge1xuICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZj0nLyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgaW5pdGlhbExvYWQgPSB0cnVlO1xuXG4gIERydXBhbC5iZWhhdmlvcnMud2ViRm9ybSA9IHtcbiAgICBkZXRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncywgdHJpZ2dlcikge1xuICAgICAgaWYgKHRyaWdnZXIgPT09ICdzZXJpYWxpemUnKSB7XG4gICAgICAgIGluaXRpYWxMb2FkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgaWYgKCFpbml0aWFsTG9hZCkge1xuICAgICAgICBpZiAoIWNvbnRleHQuaW5uZXJUZXh0Lm1hdGNoKFwiRXJyb3IgbWVzc2FnZVwiKSkge1xuICAgICAgICAgICQoJy5hbWFfX3NhbGVzLWxhbmRpbmctcGFnZV9fZm9ybV9faGVhZGluZycpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAkLnZhbGlkYXRvci5hZGRNZXRob2QoXG4gICAgICAgIFwicmVnZXhcIixcbiAgICAgICAgZnVuY3Rpb24odmFsdWUsIGVsZW1lbnQsIHJlZ2V4cCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIHx8IHJlZ2V4cC50ZXN0KHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJQbGVhc2UgY2hlY2sgeW91ciBpbnB1dC5cIlxuICAgICAgKTtcblxuICAgICAgLy8gT24gd2ViZm9ybSBzdWJtaXQgY2hlY2sgdG8gc2VlIGlmIGFsbCBpbnB1dHMgYXJlIHZhbGlkXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0nKS52YWxpZGF0ZSh7XG4gICAgICAgIGlnbm9yZTogW10sXG4gICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgJ2VtYWlsJzoge1xuICAgICAgICAgICAgZW1haWw6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgICd0ZWxlcGhvbmUnOiB7XG4gICAgICAgICAgICAncmVnZXgnOiAvXihcXCtcXGR7MSwyfVxccyk/XFwoP1xcZHszfVxcKT9bXFxzLi1dP1xcZHszfVtcXHMuLV0/XFxkezR9JC9cbiAgICAgICAgICB9LFxuICAgICAgICAgICdiaXJ0aF95ZWFyJzoge1xuICAgICAgICAgICAgJ3JlZ2V4JzogL14oMTl8MjApXFxkezJ9JC9cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbihlcnJvciwgZWxlbWVudCkge1xuICAgICAgICAgIGlmIChlbGVtZW50LmF0dHIoXCJ0eXBlXCIpID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQucGFyZW50KCkuc2libGluZ3MoKS5sYXN0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChlbGVtZW50LmlzKFwic2VsZWN0XCIpKSB7XG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50Lm5leHQoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkSGFuZGxlcjogZnVuY3Rpb24oZm9ybSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRvci5udW1iZXJPZkludmFsaWRzKCk7XG4gICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCQoJy5qcy1mb3JtLXR5cGUtcmFkaW8nKS5maW5kKCdsYWJlbC5lcnJvcicpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgJCgnLmpzLWZvcm0tdHlwZS1yYWRpbyBsYWJlbC5lcnJvcicpLnBhcmVudHMoJy5maWVsZHNldC13cmFwcGVyJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGlucHV0cyBhcmUgdmFsaWRcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIGxhYmVsLmVycm9yJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiggJCh0aGlzKS50ZXh0KCkgIT09ICcnKSB7XG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQWRkIHZhbGlkYXRpb24gdG8gc2VsZWN0IGRyb3Bkb3duIG1lbnVzIHVzaW5nIGpRdWVyeSBVSVxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIHNlbGVjdCcpLnNlbGVjdG1lbnUoe1xuICAgICAgICBzdHlsZTogJ2Ryb3Bkb3duJyxcbiAgICAgICAgdHJhbnNmZXJDbGFzc2VzOiB0cnVlLFxuICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKFwiLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtXCIpLnZhbGlkYXRlKCkuZWxlbWVudCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblxuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9tYWluTmF2aWdhdGlvbiA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICB2YXIgJGNhdGVnb3J5TmF2V3JhcHBlciA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl93cmFwcGVyJyksXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudScpLFxuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fZ3JvdXAnKSxcbiAgICAgICAgICAkbW9iaWxlU2VhcmNoVHJpZ2dlciA9ICQoJy5nbG9iYWwtc2VhcmNoLXRyaWdnZXInKSxcbiAgICAgICAgICAkbW9iaWxlU2VhcmNoID0gJCgnLmFtYV9fZ2xvYmFsLXNlYXJjaCcpLFxuICAgICAgICAgICRtYWluTmF2ID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uICcpLFxuICAgICAgICAgICRzdWJNZW51ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnKSxcbiAgICAgICAgICAkc3ViTWVudUFydGljbGUgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnKSxcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IDAsXG4gICAgICAgICAgcHJvZHVjdE5hdkhlaWdodCA9IDAsXG4gICAgICAgICAgY2F0ZWdvcnlOYXZNZW51SGVpZ2h0ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnUnKS5vdXRlckhlaWdodCgpLFxuICAgICAgICAgIGNhdGVnb3J5TmF2TWVudVJlc2l6ZWRIZWlnaHQgPSAwLFxuICAgICAgICAgIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCksXG4gICAgICAgICAgJGFsZXJ0X2Jhbm5lciA9ICQoJy5hbWFfX2FsZXJ0X193cmFwJyk7XG5cbiAgICAgIC8vIENoZWNrcyBpZiB1c2VyIGFnZW50IGlzIGEgbW9iaWxlIGRldmljZVxuICAgICAgdmFyIGRldmljZUFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIGFnZW50SUQgPSBkZXZpY2VBZ2VudC5tYXRjaCgvKGFuZHJvaWR8d2Vib3N8aXBob25lfGlwb2R8YmxhY2tiZXJyeSkvKSAmJiB3aW5kb3dXaWR0aCA8IDc2ODtcblxuICAgICAgLy8gU2V0IGFsZXJ0IGJhbm5lciBoZWlnaHQgaWYgcHJlc2VudC5cbiAgICAgIGlmKCRhbGVydF9iYW5uZXIubGVuZ3RoICYmICRhbGVydF9iYW5uZXIuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgYWxlcnRCYW5uZXJIZWlnaHQgPSAkYWxlcnRfYmFubmVyLm91dGVySGVpZ2h0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydEJhbm5lckhlaWdodCA9IDA7XG4gICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHdoZXRoZXIgb3Igbm90IHRoZSBjYXRlZ29yeSBuYXYgc2hvdWxkIGhhdmUgc2Nyb2xsYmFyc1xuICAgICAgZnVuY3Rpb24gY2F0ZWdvcnlOYXZIZWlnaHQocmVzaXplVmlld3BvcnRIZWlnaHQpIHtcblxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdmlld3BvcnQgaGVpZ2h0IGlzIHBhc3NlZCBiYWNrIHdoZW4gdGhlIHdpbmRvdyBnZXRzIHJlc2l6ZWRcbiAgICAgICAgaWYodHlwZW9mIHJlc2l6ZVZpZXdwb3J0SGVpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0ID0gcmVzaXplVmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gV2luZG93IGhlaWdodCBpcyB1c2VkIGJ5IGRlZmF1bHRcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCA/IHdpbmRvdy5pbm5lckhlaWdodCA6ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1YnRyYWN0IHRoZSBuYXZpZ2F0aW9uIGhlaWdodCBmcm9tIHdpbmRvdyBoZWlnaHQgdG8gYXNzZXNzIGNvbnRlbnQgaGVpZ2h0XG4gICAgICAgIGNhdGVnb3J5TmF2TWVudVJlc2l6ZWRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIG1haW4gbWVudSBwdXJwbGUgZHJvcGRvd24gaGVpZ2h0IGlzIGxhcmdlciB0aGFuIHZpZXdwb3J0IGhlaWdodFxuICAgICAgICBpZiAoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0ICsgJG1haW5OYXYub3V0ZXJIZWlnaHQoKSArIHByb2R1Y3ROYXZIZWlnaHQgPiB2aWV3cG9ydEhlaWdodCAmJiAhYWdlbnRJRCkge1xuXG4gICAgICAgICAgLy8gU2V0IHRoZSBtZW51IGRyb3Bkb3duIHRoZSBzYW1lIGFzIHZpZXdwb3J0IHRvIGVuYWJsZSBzY3JvbGxpbmdcbiAgICAgICAgICB2YXIgY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCA9IGNhdGVnb3J5TmF2TWVudVJlc2l6ZWRIZWlnaHQgLSAkbWFpbk5hdi5vdXRlckhlaWdodCgpIC0gcHJvZHVjdE5hdkhlaWdodCAtIGFsZXJ0QmFubmVySGVpZ2h0O1xuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAuYWRkQ2xhc3MoJ3Njcm9sbCcpLm91dGVySGVpZ2h0KGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpO1xuXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cC5vbignc2hvdy5zbWFwaScsIGZ1bmN0aW9uKGUsIG1lbnUpIHtcbiAgICAgICAgICAgIGlmKCQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19zdWJtZW51JywgbWVudSkub3V0ZXJIZWlnaHQoKSA+IGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnLCBtZW51KS5vdXRlckhlaWdodChjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2FydGljbGVzJywgbWVudSkub3V0ZXJIZWlnaHQoKSA+IGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2FydGljbGVzJywgbWVudSkub3V0ZXJIZWlnaHQoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCkuYWRkQ2xhc3MoJ29uZV9hcnRpY2xlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cC5yZW1vdmVDbGFzcygnc2Nyb2xsJykub3V0ZXJIZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAkc3ViTWVudS5vdXRlckhlaWdodCgnYXV0bycpO1xuICAgICAgICAgICRzdWJNZW51QXJ0aWNsZS5vdXRlckhlaWdodCgnYXV0bycpO1xuICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgLy8gSGlkZS9TaG93IG1lbnVcbiAgICAgIGZ1bmN0aW9uIGhpZGVTaG93KCkge1xuICAgICAgICBpZiAoJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuc2xpZGVEb3duKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0ICsgICRtYWluTmF2Lm91dGVySGVpZ2h0KCkgKyBwcm9kdWN0TmF2SGVpZ2h0ICsgYWxlcnRCYW5uZXJIZWlnaHQpID4gdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgYm9keVNjcm9sbExvY2suZGlzYWJsZUJvZHlTY3JvbGwoJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cCwge1xuICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmdW5jdGlvbiBhbGxvd1RvdWNoTW92ZShlbCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGVsICYmIGVsICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2JvZHktc2Nyb2xsLWxvY2staWdub3JlJykgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFnZW50SUQpIHtcbiAgICAgICAgICAgICAgLy8gT25seSBtYWtlIHRoZSBtZW51IGhlaWdodCBzYW1lIGFzIHZpZXdwb3J0IG9uIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgICAgIHZhciBtb2JpbGVIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICRjYXRlZ29yeU5hdldyYXBwZXIuaGVpZ2h0KG1vYmlsZUhlaWdodCkuYWRkQ2xhc3MoJ3Njcm9sbCcpO1xuXG4gICAgICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAub24oJ3Nob3cuc21hcGknLCBmdW5jdGlvbihlLCBtZW51KSB7XG4gICAgICAgICAgICAgICAgaWYoJChtZW51KS5vdXRlckhlaWdodCgpID4gbW9iaWxlSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAkKG1lbnUpLm91dGVySGVpZ2h0KG1vYmlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZVVwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGVpZ2h0KDApO1xuICAgICAgICAgICAgYm9keVNjcm9sbExvY2suY2xlYXJBbGxCb2R5U2Nyb2xsTG9ja3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDbG9zZXMgbWVudSBvbiBkb2MgbG9hZFxuICAgICAgJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgICAgJCgnLmFtYV9fZ2xvYmFsLW1lbnUnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBoaWRlU2hvdygpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIHN0aWNreSBuYXYgd3JhcHBlciwgcmVtb3ZlIGlkIHRvIHByZXZlbnQgZHVwbGljYXRlIGlkcy5cbiAgICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3RpY2t5V3JhcHBlciA9ICQoJy5zdGlja3ktd3JhcHBlcicpO1xuICAgICAgICBpZigkc3RpY2t5V3JhcHBlci5sZW5ndGggJiYgJHN0aWNreVdyYXBwZXIuaGFzKCcjc2hhcmUtd3JhcHBlcicpKSB7XG4gICAgICAgICAgJHN0aWNreVdyYXBwZXIucmVtb3ZlQXR0cignaWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIGEgdXNlciBjbGlja3Mgb3V0c2lkZSB0aGUgbWVudSB0aGVuIGNsb3NlIGl0XG4gICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoISRjYXRlZ29yeU5hdmlnYXRpb25NZW51LmlzKGUudGFyZ2V0KSAmJiAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgaGlkZVNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJG1vYmlsZVNlYXJjaFRyaWdnZXIpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtb2JpbGVTZWFyY2guc2xpZGVUb2dnbGUoKTtcbiAgICAgICAgJG1vYmlsZVNlYXJjaFRyaWdnZXIudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgIH0pO1xuXG4gICAgICAvL1NldCBmb2N1cyBzdGF0ZSBvbiBtb2JpbGUgdHJpZ2dlciBidXR0b25cbiAgICAgICQoJG1vYmlsZVNlYXJjaFRyaWdnZXIpLmZvY3VzKGZ1bmN0aW9uKCl7XG4gICAgICAgICRtb2JpbGVTZWFyY2hUcmlnZ2VyLmNzcygnb3V0bGluZScsICdvdXRsaW5lOiAycHggc29saWQgIzgwZDRmNScpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIG1vdmVTb2NpYWxTaGFyZVBvc2l0aW9uKCl7XG4gICAgICAgIHZhciBtYWluTmF2UG9zaXRpb24gPSAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gLmNvbnRhaW5lcicpLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgIHZhciAkYW1hU29jaWFsU2hhcmUgPSAkKCcuYW1hX19zb2NpYWwtc2hhcmUnKTtcblxuICAgICAgICAvLyBDaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGVub3VnaCBmb3IgdGhlIHN0aWNreSBuYXZcbiAgICAgICAgaWYobWFpbk5hdlBvc2l0aW9uID4gNjApIHtcblxuICAgICAgICAgIHZhciBzb2NpYWxTdGlja3lQb3NpdGlvbiA9IG1haW5OYXZQb3NpdGlvbiAtIDYwO1xuICAgICAgICAgIHZhciAkc29jaWFsSWNvbnMgPSAkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUnKTtcblxuICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB2aWV3cG9ydCB3aWR0aCBpcyBncmVhdGVyIDg1MHB4IHRoZW4gdGhlIHNvY2lhbCBpY29ucyB3aWxsIGJlIHN0aWNreVxuICAgICAgICAgIGlmKCRzb2NpYWxJY29ucy5sZW5ndGggJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA4NTApIHtcbiAgICAgICAgICAgICRzb2NpYWxJY29ucy5zdGlja3koe1xuICAgICAgICAgICAgICB3cmFwcGVyQ2xhc3NOYW1lOiAnYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUtd3JhcHBlcicsXG4gICAgICAgICAgICAgIHpJbmRleDogNTAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNvY2lhbEljb25zLm9uKCdzdGlja3ktc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICRhbWFTb2NpYWxTaGFyZS5hZGRDbGFzcygnYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJykuY3NzKCdsZWZ0Jywgc29jaWFsU3RpY2t5UG9zaXRpb24pLmhpZGUoKS5mYWRlVG8oJ3Nsb3cnLCAxKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkc29jaWFsSWNvbnMub24oJ3N0aWNreS11cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICRhbWFTb2NpYWxTaGFyZS5hZGRDbGFzcygnYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJykuaGlkZSgpLmZhZGVUbygnc2xvdycsIDEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRzb2NpYWxJY29ucy5vbignc3RpY2t5LWVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLnJlbW92ZUNsYXNzKCdhbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJbml0aWFsaXplIGdldFNvY2lhbFNoYXJlKClcbiAgICAgIG1vdmVTb2NpYWxTaGFyZVBvc2l0aW9uKCk7XG5cbiAgICAgIC8vIE9uc2Nyb2xsIGNoZWNrIHRvIHNlZSBpZiBzb2NpYWwgaWNvbiBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gZm9vdGVyIHBvc2l0aW9uXG4gICAgICB2YXIgZGVib3VuY2VfdGltZXI7XG4gICAgICBpZigkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUgLmFtYV9fc29jaWFsLXNoYXJlJykuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgJHNvY2lhbEljb25zID0gJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlIC5hbWFfX3NvY2lhbC1zaGFyZScpO1xuICAgICAgICAgIHZhciBzb2NpYWxJY29uUG9zaXRpb25Cb3R0b20gPSAkc29jaWFsSWNvbnMub2Zmc2V0KCkudG9wICsgJHNvY2lhbEljb25zLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgdmFyIGZvb3RlclBvc2l0aW9uID0gJCgnZm9vdGVyJykub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgaWYoZGVib3VuY2VfdGltZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoZGVib3VuY2VfdGltZXIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRlYm91bmNlX3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZihzb2NpYWxJY29uUG9zaXRpb25Cb3R0b20gPiBmb290ZXJQb3NpdGlvbikge1xuICAgICAgICAgICAgICAkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUnKS5mYWRlT3V0KCdmYXN0Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUnKS5mYWRlSW4oJ2Zhc3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG5cbiAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXNpemVWaWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCA/IHdpbmRvdy5pbm5lckhlaWdodCA6ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQocmVzaXplVmlld3BvcnRIZWlnaHQpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vQ2hlY2tzIHRoZSBsYXlvdXQgcG9zaXRpb24gb2YgYXJ0aWNsZSBvbiB3aW5kb3cgcmVzaXplIGFuZCBtb3ZlcyB0aGUgc29jaWFsIGljb25zIGFjY29yZGluZ2x5XG4gICAgICAkKCB3aW5kb3cgKS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghYWdlbnRJRCkge1xuICAgICAgICAgIHZhciByZXNpemVWaWV3cG9ydEhlaWdodCA9ICQod2luZG93KS5pbm5lckhlaWdodCgpO1xuICAgICAgICAgIHZhciBtYWluTmF2UG9zaXRpb25VcGRhdGUgPSAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gLmNvbnRhaW5lcicpLm9mZnNldCgpLmxlZnQgLSAxMDA7XG5cbiAgICAgICAgICBjYXRlZ29yeU5hdkhlaWdodChyZXNpemVWaWV3cG9ydEhlaWdodCk7XG4gICAgICAgICAgJCgnLmFtYV9fc29jaWFsLXNoYXJlLmFtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmNzcygnbGVmdCcsIG1haW5OYXZQb3NpdGlvblVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvL0lmIGVtcHR5IG9yIG90aGVyd2lzZSB1bnBvcHVsYXRlZCBzZWFyY2ggZmllbGQgKGkuZSBzcGFjZXMgb25seSlcbiAgICAgIC8vcHJldmVudCBzZWFyY2ggZnJvbSBzdWJtaXR0aW5nIGFuZCByZWxvYWQgY3VycmVudCBwYWdlXG4gICAgICB2YXIgc2VhcmNoRm9ybSA9ICQoXCJmb3JtW2lkXj0nYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNoLXNvbHJwYWdlJ11cIik7XG5cbiAgICAgICQoc2VhcmNoRm9ybSwgdGhpcykuc3VibWl0KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgc2VhcmNoSW5wdXQgPSAkKHRoaXMpLmZpbmQoXCJpbnB1dFtuYW1lKj0nc2VhcmNoJ11cIik7XG5cbiAgICAgICAgICAvL1RyaW0gYW5kIGNoZWNrIGlmIHNlYXJjaCBpbnB1dCBoYXMgYW55IHZhbHVlXG4gICAgICAgICAgaWYgKCQudHJpbShzZWFyY2hJbnB1dC52YWwoKSkubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIHNlYXJjaCB0ZXJtIGVudGVyZWQnKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vRW5zdXJlIG5vIHNwYWNlcyBiZWZvcmUgb3IgYWZ0ZXIgcXVlcnkgYXJlIGNvdW50ZWQgaW4gc2VhcmNoXG4gICAgICAgICAgJCh0aGlzKS5maW5kKHNlYXJjaElucHV0KS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvL1N1Ym1pdCB0cmltbWVkIHZhbHVlXG4gICAgICAgICAgICAkKHRoaXMpLnZhbCgkLnRyaW0oJCh0aGlzKS52YWwoKSkpO1xuICAgICAgICAgIH0pOyAgIFxuICAgICAgICAgIFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuXG5cblxuIiwiLyoqXG4gKiBTbWFydE1lbnVzIGpRdWVyeSBQbHVnaW4gLSB2MS4xLjAgLSBTZXB0ZW1iZXIgMTcsIDIwMTdcbiAqIGh0dHA6Ly93d3cuc21hcnRtZW51cy5vcmcvXG4gKlxuICogQ29weXJpZ2h0IFZhc2lsIERpbmtvdiwgVmFkaWtvbSBXZWIgTHRkLlxuICogaHR0cDovL3ZhZGlrb20uY29tXG4gKlxuICogTGljZW5zZWQgTUlUXG4gKi9cblxuXG5qUXVlcnkoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19ncm91cCcpLnNtYXJ0bWVudXMoe1xuICBzdWJJbmRpY2F0b3JzUG9zOiAnYXBwZW5kJ1xufSk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9zaWduSW5NZW51ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICB2YXIgJHNpZ25JbkRyb3Bkb3duID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bicpO1xuICAgICAgdmFyICRzaWduSW5Ecm9wZG93bk1lbnUgPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duX19tZW51Jyk7XG4gICAgICB2YXIgJHNpZ25JbkxpbmsgPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duX190ZXh0Jyk7XG4gICAgICB2YXIgJGV4cGxvcmVNZW51ID0gJCgnLmFtYV9fZXhwbG9yZS1tZW51Jyk7XG4gICAgICB2YXIgJGV4cGxvcmVNZW51RHJvcGRvd24gPSAkKCcuYW1hX19leHBsb3JlLW1lbnVfX21lbnUnKTtcblxuICAgICAgZnVuY3Rpb24gZHJvcGRvd25Eb3duTWVudShwYXJlbnRFbGVtZW50LCBtZW51RWxlbWVudCkge1xuICAgICAgIHBhcmVudEVsZW1lbnQudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgJChtZW51RWxlbWVudCkuc2xpZGVUb2dnbGUoKTtcbiAgICAgICAgICAkKHBhcmVudEVsZW1lbnQpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFN0b3AgbGluayBmcm9tIGZpcmluZ1xuICAgICAgICAkc2lnbkluTGluay5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgLy8gaWYgdGhlIHRhcmdldCBvZiB0aGUgY2xpY2sgaXNuJ3QgdGhlIGNvbnRhaW5lciBub3IgYSBkZXNjZW5kYW50IG9mIHRoZSBjb250YWluZXJcbiAgICAgICAgICBpZiAoIXBhcmVudEVsZW1lbnQuaXMoZS50YXJnZXQpICYmIHBhcmVudEVsZW1lbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVXAoKTtcbiAgICAgICAgICAgICQocGFyZW50RWxlbWVudCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTZXQgdGltZW91dCBmb3Igd2hlbiBhIHVzZXIgbW91c2VzIG91dCBvZiB0aGUgbWVudVxuICAgICAgICAgIHBhcmVudEVsZW1lbnQubW91c2VlbnRlcihmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KCk7XG4gICAgICAgICAgfSkubW91c2VsZWF2ZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XG4gICAgICAgICAgICAgICQocGFyZW50RWxlbWVudCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZHJvcGRvd25Eb3duTWVudSgkc2lnbkluRHJvcGRvd24sICRzaWduSW5Ecm9wZG93bk1lbnUpO1xuICAgICAgZHJvcGRvd25Eb3duTWVudSgkZXhwbG9yZU1lbnUsICRleHBsb3JlTWVudURyb3Bkb3duKTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9zZWFyY2hfY2hlY2tib3ggPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgdmFyICRjYXRlZ29yeVNlYXJjaElucHV0ID0gJCgnI3NlYXJjaF9jYXRlZ29yeScpO1xuICAgICAgdmFyICRjYXRlZ29yeVNlYXJjaExpc3QgPSAkKCcuZmFjZXRzLXdpZGdldC1jaGVja2JveCB1bCBsaScpO1xuICAgICAgdmFyICRjbGVhclNlYXJjaEZpbHRlciA9ICQoJyNhcHBsaWVkRmlsdGVyc1JlbW92ZScpO1xuXG4gICAgICAvLyBGaWx0ZXIgbGlzdCB1c2luZyBqUXVlcnkgZmlsdGVyXG4gICAgICBmdW5jdGlvbiBmaWx0ZXJMaXN0KHNlYXJjaEJveCwgbGlzdCkge1xuICAgICAgICBzZWFyY2hCb3gua2V5dXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciAkcmVnZXggPSBuZXcgUmVnRXhwKHRoaXMudmFsdWUsICdpJyk7XG4gICAgICAgICAgbGlzdC5oaWRlKCkuZmlsdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkcmVnZXgudGVzdCgkLnRyaW0oJCh0aGlzKS50ZXh0KCkpKTtcbiAgICAgICAgICB9KS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBDbGVhciBmaWx0ZXJcbiAgICAgIGZ1bmN0aW9uIGNsZWFmRmlsdGVyTGlzdChjbGVhclNlYXJjaEZpbHRlcikge1xuICAgICAgICBjbGVhclNlYXJjaEZpbHRlci5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAkY2F0ZWdvcnlTZWFyY2hJbnB1dC52YWwoJycpO1xuICAgICAgICAgICRjYXRlZ29yeVNlYXJjaElucHV0LnRyaWdnZXIoJ2tleXVwJyk7XG5cbiAgICAgICAgICAkKCcuZmFjZXRzLXdpZGdldC1jaGVja2JveCB1bCBsaSBbdHlwZT1jaGVja2JveF0nKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcykucHJvcChcImNoZWNrZWRcIiwgZmFsc2UpO1xuICAgICAgICAgICAgJCgnI2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaC1zb2xycGFnZS0yJykuc3VibWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnZva2UgZmlsdGVyIGxpc3RcbiAgICAgIGZpbHRlckxpc3QoJGNhdGVnb3J5U2VhcmNoSW5wdXQsICRjYXRlZ29yeVNlYXJjaExpc3QpO1xuXG4gICAgICAvLyBJbnZva2UgY2xlYXIgZmlsdGVyXG4gICAgICBjbGVhZkZpbHRlckxpc3QoJGNsZWFyU2VhcmNoRmlsdGVyKTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBicCBjYWxjdWxhdG9yLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiAnYW5vbnltb3VzIGNsb3N1cmUnLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmJwQ2FsY3VsYXRvciA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAvLyBDbG9uZSBsYXN0IHJvdyBvZiB0YWJsZVxuICAgICAgJCgnLmFkZC1icC1yb3cnKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyICR0YWJsZUJvZHkgPSAkKCcjYnBDYWxjdWxhdG9yIHRhYmxlJykuZmluZCgndGJvZHknKSxcbiAgICAgICAgICAkdHJMYXN0ID0gJHRhYmxlQm9keS5maW5kKCd0cjpsYXN0JyksXG4gICAgICAgICAgJHRyTmV3ID0gJHRyTGFzdC5jbG9uZSgpO1xuXG4gICAgICAgIC8vIEFwcGVuZCBuZXcgY2xhc3MgbmFtZSB0byBjbG9uZWQgcm93XG4gICAgICAgICR0ckxhc3QuYmVmb3JlKCR0ck5ldykuYWRkQ2xhc3MoJ2Nsb25lZCcpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcblxuICAgICAgICAvLyBBZGQgbmV3IG5hbWUgd2l0aCBpbmRleFxuICAgICAgICAkdGFibGVCb2R5LmZpbmQoJ3RyOmxhc3QgaW5wdXQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgJHRySW5wdXRDbGFzc0luZGV4ID0gJCgnI2JwQ2FsY3VsYXRvciB0Ym9keT50cicpLmxlbmd0aCArIDEsXG4gICAgICAgICAgICAgICR0cklucHV0Q2xhc3NOYW1lID0gJCh0aGlzKS5hdHRyKCdjbGFzcycpO1xuXG4gICAgICAgICAgJCh0aGlzKS5hdHRyKCduYW1lJywgJHRySW5wdXRDbGFzc05hbWUgKyAnLScgKyAkdHJJbnB1dENsYXNzSW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCd0ZDplcSgwKScsICR0ckxhc3QpLnRleHQoJCgnI2JwQ2FsY3VsYXRvciB0Ym9keT50cicpLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBXaGVuIGNsZWFyL3Jlc3RhcnQgYnV0dG9uIGlzIGNsaWNrZWQgcmV0dXJuIHRhYmxlIHRvIGluaXRpYWwgc3RhdGVcbiAgICAgICQoJy5jbGVhci1yZXN0YXJ0JykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBjbG9uZWQgcm93c1xuICAgICAgICB2YXIgJHRyQ2xvbmVkID0gJCgnLmNsb25lZCcpO1xuICAgICAgICAkdHJDbG9uZWQucmVtb3ZlKCk7XG5cbiAgICAgICAgLy8gUmVzZXQgdG8gaW50aWFsIHZhbHVlc1xuICAgICAgICAkKCcjYnBDYWxjdWxhdG9yIGlucHV0JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXNldCBmb3JtXG4gICAgICAgICQoJyNicENhbGN1bGF0b3IgJykudmFsaWRhdGUoKS5yZXNldEZvcm0oKTtcblxuICAgICAgICAvLyBIaWRlIG91dHB1dCByb3dcbiAgICAgICAgJCgnLmJwQ2FsY3VsYXRvcl9fdGFibGVfX291dHB1dCcpLmhpZGUoKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2FsY3VsYXRlIGF2ZXJhZ2UgQlBcbiAgICAgIGZ1bmN0aW9uIGNhbGN1bGNhdGVCUChicFZhbHVlLCBicE91dHB1dCkge1xuICAgICAgICB2YXIgYnBJbnB1dCA9IDAsIC8vIHJvdyBjb3VudFxuICAgICAgICAgICAgYnBUb3RhbCA9IDAsIC8vIGluY3JlbWVudGVkIGlucHV0IHZhbHVlc1xuICAgICAgICAgICAgYnBBdmVyYWdlOyAvLyBhdmVyYWdlZCBicFRvdGFsIC8gYnBJbnB1dFxuXG4gICAgICAgIGJwVmFsdWUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gSWYgSW5wdXQgdmFsdWVzIGFyZSBncmVhdGVyIHRoYW4gMCB0aGVuIHR1cm4gaW50byBhIG51bWJlciBhbmQgcm91bmRcbiAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKSA+IDAgPyBNYXRoLnJvdW5kKHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKSkgOiBmYWxzZTtcblxuICAgICAgICAgIGlmICh2YWwgIT09IDApIHtcbiAgICAgICAgICAgIGJwSW5wdXQgKz0gMTtcbiAgICAgICAgICAgIGJwVG90YWwgKz0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIGF2ZXJhZ2VcbiAgICAgICAgYnBBdmVyYWdlID0gYnBUb3RhbCAvIGJwSW5wdXQgPiAwID8gTWF0aC5yb3VuZChicFRvdGFsIC8gYnBJbnB1dCkgOiAwO1xuXG4gICAgICAgIGJwT3V0cHV0LnRleHQoYnBBdmVyYWdlKTtcblxuICAgICAgICAkKCcuYnBDYWxjdWxhdG9yX190YWJsZV9fb3V0cHV0Jykuc2hvdygpO1xuICAgICAgfVxuXG4gICAgICAvLyBWYWxpZGF0ZSBCUCBGb3JtXG4gICAgICAkKCcjYnBDYWxjdWxhdG9yJykudmFsaWRhdGUoe1xuICAgICAgICAvLyBDYWxjdWxhdGUgQlAgd2hlbiBjYWxjdWxhdGUgaXMgY2xpY2tlZFxuICAgICAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbihmb3JtKSB7XG4gICAgICAgICAgdmFyIHN5c0JwVmFsdWUgPSAkKCcuYnBDYWxjdWxhdG9yX19zeXN0b2xpYy1pbnB1dCcpLFxuICAgICAgICAgICAgc3lzQnBPdXRwdXQgPSAkKCcuYnBDYWxjdWxhdG9yX19zeXN0b2xpYy1vdXRwdXQnKTtcblxuICAgICAgICAgIHZhciBkaWFCcFZhbHVlID0gJCgnLmJwQ2FsY3VsYXRvcl9fZGlhc3RvbGljLWlucHV0JyksXG4gICAgICAgICAgICBkaWFCcE91dHB1dCA9ICQoJy5icENhbGN1bGF0b3JfX2RpYXN0b2xpYy1vdXRwdXQnKTtcblxuICAgICAgICAgIGNhbGN1bGNhdGVCUChzeXNCcFZhbHVlLCBzeXNCcE91dHB1dCk7XG4gICAgICAgICAgY2FsY3VsY2F0ZUJQKGRpYUJwVmFsdWUsIGRpYUJwT3V0cHV0KTtcblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogU2FkbHkgYWRkcyBmb290ZXIgdG8gbGVmdCByZXNvdXJjZSBwYWdlIGNvbHVtbi5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5yZXNvdXJjZVBhZ2VGb290ZXIgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAkKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCgnYm9keS5hbWFfX3Jlc291cmNlLXBhZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAkKCdmb290ZXInLCBjb250ZXh0KS5jbG9uZSgpLmFwcGVuZFRvKCcuYW1hX19sYXlvdXQtLXNwbGl0X19sZWZ0JykuYWRkQ2xhc3MoJ2FtYV9fZm9vdGVyIGFtYV9fcmVzb3VyY2UtcGFnZV9fZGVza3RvcC1mb290ZXInKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogUmVzcG9uc2l2ZSBUYWJsZXMuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMucmVzcG9uc2l2ZVRhYmxlcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgIHdpbmRvdy5zY3JlZW4ud2lkdGg7XG5cbiAgICAgIC8vIFRoaXMgY29uZGl0aW9uYWwgaGFzIGJlZW4gYWRkZWQgdG8gcHJldmVudCBiYXNpY1RhYmxlIHBsdWdpbiB0byBzZWxlY3RpdmVseSBub3QgcnVuIG9uIHRhYmxlc1xuICAgICAgaWYgKCEkKCd0YWJsZScpLmhhc0NsYXNzKCdidCcpKSB7XG4gICAgICAgICQoJ3RhYmxlJykuYmFzaWN0YWJsZSh7XG4gICAgICAgICAgYnJlYWtwb2ludDogMTE4MlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHRoZSB0YWJsZSBhcyBidCBmb3IgbW9iaWxlLlxuICAgICAgICAkKCcuYW1hX19mb3J1bS10YWJsZS13cmFwIHRhYmxlJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZih3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDExODIpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmJhc2ljdGFibGUoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzIGZvcmNlcyB0YWJsZXMgaW5zaWRlIG9mIHRoZSAuYW1hX19yZXNvdXJjZS0tc2NoZWR1bGVzIGRpdiB0byBoYXZlIG1vYmlsZSBsb29rIGFuZCBmZWVsXG4gICAgICAkKCcuYW1hX19yZXNvdXJjZS0tc2NoZWR1bGVzIHRhYmxlJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICQodGhpcykuYmFzaWN0YWJsZSgnc3RhcnQnKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogTGlzdGljbGUgQ2xhc2VzLlxuICpcbiAqIEhhbmRsaW5nIGNsYXNzZXMgdG8gYnVpbGQgbGlzdGljbGUgcHJvcGVybHkgb3V0c2lkZSBja2VkaXRvci5cbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwsIG9uY2UpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5saXN0aWNsZSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgIGlmICgkKCcubGlzdGljbGUnLCBjb250ZXh0KS5sZW5ndGgpIHtcbiAgICAgICAgJCgnLmxpc3RpY2xlJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24gKGlkeCwgZSkge1xuICAgICAgICAgICAgJChlKS5hZGRDbGFzcygnbGlzdGljbGVfX2l0ZW0nKTtcbiAgICAgICAgICAgICQoZSkuZmluZCgnb2wsIHVsJykuZWFjaChmdW5jdGlvbiAoaWR4LCBmKSB7XG4gICAgICAgICAgICAgICQoZikuYWRkQ2xhc3MoJ2xpc3RpY2xlX19pdGVtLXN1YicpO1xuICAgICAgICAgICAgICAkKGYpLmNoaWxkcmVuKCdsaScpLmFkZENsYXNzKCdsaXN0aWNsZV9faXRlbS1zdWItaXRlbScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy9pZiB0aGVyZSBpcyBhbiBpbmxpbmUgcHJvbW8gb24gYSBwYWdlIHdpdGggYSBsaXN0aWNsZSwgZGV0ZXJtaW5lIGlmIHRoZSBsaXN0IGlzIGNsb3NlIGVub3VnaCBiZW5lYXRoIHRoZSBwcm9tbyBpbiB0aGUgZG9tIHRvIGFzc3VtZSBpdCB3aWxsIGJlIGZsb2F0ZWQgbmV4dCB0byBpdC4gSSBjaG9zZSB3aXRoaW4gNSBzaWJsaW5ncy5cbiAgICAgIGlmKCQoJy5hbWFfX3Byb21vLS1pbmxpbmUgfiAubGlzdGljbGUnKSkge1xuICAgICAgICB2YXIgbGVuZ3RoID0gJCgnLmFtYV9fcHJvbW8tLWlubGluZScpLmZpcnN0KCkubmV4dFVudGlsKCcubGlzdGljbGUnKS5hZGRCYWNrKCkubGVuZ3RoO1xuICAgICAgICBpZiAobGVuZ3RoIDw9IDUpIHtcbiAgICAgICAgICAkKCcuYW1hX19wcm9tby0taW5saW5lJykuYWRkQ2xhc3MoJ2xpc3RpY2xlLW1hcmdpbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL2lmIHRoZSBsaXN0aWNsZSBpdGVtIGNvbnRhaW5zIGFuIGltYWdlLCBwdXQgYSBjbGVhcmZpeCBkaXYgb24gdGhlIGl0ZW0gc28gaWYgaXQgaGFzIGEgdHJhaWxpbmcgaW1hZ2UsIHRoZSBuZXh0IGl0ZW0gd29uJ3Qgd3JhcCBvbiBpdC5cbiAgICAgIC8vQWxzbywgZGV0ZXJtaW5lIGl0IHRoZSBpbWFnZSBpcyBhbG1vc3QgMTAwJSBvZiB0aGUgbGlzdCB3aWR0aC4gaWYgaXQgaXMsIGFkZCBhIGNsYXNzIHRvIHJlbW92ZSB0aGUgbGVmdCBtYXJnaW4gYW5kIG1ha2UgdGhlIGltYWdlIDEwMCUgd2lkdGguIEkgY2hvc2UgODAlLlxuICAgICAgaWYoJCgnLmxpc3RpY2xlX19pdGVtIGltZycpKSB7XG4gICAgICAgICQoJy5saXN0aWNsZV9faXRlbSBpbWcnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgd2lkdGggPSAkKHRoaXMpLmNsb3Nlc3QoJy5saXN0aWNsZV9faXRlbScpLndpZHRoKClcbiAgICAgICAgICBjb25zb2xlLmxvZyh3aWR0aClcbiAgICAgICAgICB2YXIgaW1hZ2VXaWR0aCA9ICQodGhpcykud2lkdGgoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGltYWdlV2lkdGgpXG4gICAgICAgICAgdmFyIGNsZWFyZml4ID0gJzxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PidcbiAgICAgICAgICAkKG9uY2UoJ2xpc3RpY2xlLWl0ZW0nLCAnLmxpc3RpY2xlX19pdGVtJywgdGhpcykpLmFwcGVuZChjbGVhcmZpeClcbiAgICAgICAgICBpZiAoaW1hZ2VXaWR0aCA+PSB3aWR0aCouNykge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbm8tbWFyZ2luJylcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCAoJ2ZpZ3VyZScpLmFkZENsYXNzKCduby1tYXJnaW4nKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCwgb25jZSk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBBdHRhY2hlcyBBTUEgSW1hZ2UgUG9wdXAgbGlicmFyeS5cbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXHRmdW5jdGlvbiBhbHRlck1vZGFsIChjb250ZXh0KSB7XG5cdFx0JCgnLnVpLWRpYWxvZycpLmNzcyh7XCJ6LWluZGV4XCI6IFwiNTAwMDFcIn0pO1xuXHRcdCQoJy51aS1kaWFsb2ctdGl0bGUnKS5oaWRlKCk7XG5cdFx0JCgnLnVpLWJ1dHRvbi1pY29uLW9ubHkgLnVpLWljb24nKS5oaWRlKCk7XG5cdFx0Ly8gU3R5bGVndWlkZSBzcGVjaWZpYyB0cmVhdG1lbnQgdG8gaGlkZSBhbmQgY3NzIHRvIGVsZW1lbnRzLlxuXHRcdCQoJy51aS1kcmFnZ2FibGUgLnVpLWRpYWxvZy10aXRsZWJhcicpLmNzcyh7XG5cdFx0XHRcImJvcmRlclwiOiBcIm5vbmVcIixcblx0XHRcdFwicGFkZGluZzpcIjogXCIwXCIsXG5cdFx0XHRcImJhY2tncm91bmRcIjogXCJub25lXCJcblx0XHR9KTtcblx0XHQkKCcudWktd2lkZ2V0LW92ZXJsYXknKS5jc3Moe1xuXHRcdFx0XCJvcGFjaXR5XCI6IFwiLjVcIixcblx0XHRcdFwiei1pbmRleDpcIjogXCI1MDAwXCJcblx0XHR9KTtcblx0XHQkKCcudWktZGlhbG9nIC51aS1kaWFsb2ctdGl0bGViYXItY2xvc2UnKS5jc3Moe1xuXHRcdFx0XCJiYWNrZ3JvdW5kXCI6IFwidXJsKCcvYXNzZXRzL2ltYWdlcy9pY29uLW1vZGFsLWNsb3NlLnN2ZycpXCIsXG5cdFx0XHRcImJvcmRlclwiOiBcIm5vbmVcIixcblx0XHRcdFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuXHRcdFx0XCJyaWdodFwiOiBcIi0yMHB4XCIsXG5cdFx0XHRcInRvcFwiOiBcIi0xMHB4XCIsXG5cdFx0XHRcImhlaWdodFwiOiBcIjI4cHhcIixcblx0XHRcdFwid2lkdGhcIjogXCIyOHB4XCIsXG5cdFx0XHRcInBhZGRpbmdcIjogXCIwXCIsXG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBjbG9zZU1vZGFsIChjb250ZXh0KSB7XG5cdFx0JCgnLnVpLWljb24tY2xvc2V0aGljaycpLnVuYmluZCgnY2xpY2suY2xvc2UnKTtcblx0XHQkKCcudWktaWNvbi1jbG9zZXRoaWNrJykudHJpZ2dlcignY2xpY2snKTtcblx0fVxuXG5cdERydXBhbC5iZWhhdmlvcnMuYW1hX2ltYWdlX3BvcHVwID0ge1xuXHRcdGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwiZGlhbG9nb3BlblwiLCBcIi51aS1kaWFsb2dcIiwgZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRhbHRlck1vZGFsKCk7XG5cdFx0XHR9KTtcblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIudWktd2lkZ2V0LW92ZXJsYXlcIiwgZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRjbG9zZU1vZGFsKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcblxuLyoqXG4gKiBAZmlsZVxuICogQXR0YWNoZXMgQU1BIEltYWdlIFBvcHVwIGxpYnJhcnkuXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblx0ZnVuY3Rpb24gYWx0ZXJNb2RhbCAoY29udGV4dCkge1xuXHRcdCQoJy5hbWEtaW1hZ2UtcG9wdXAtbW9kYWwgLnVpLWRpYWxvZy10aXRsZScpLmhpZGUoKTtcblx0XHQkKCcuYW1hLWltYWdlLXBvcHVwLW1vZGFsIC51aS1idXR0b24taWNvbi1vbmx5IC51aS1pY29uJykuaGlkZSgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2xvc2VNb2RhbCAoY29udGV4dCkge1xuXHRcdCQoJy51aS1pY29uLWNsb3NldGhpY2snKS51bmJpbmQoJ2NsaWNrLmNsb3NlJyk7XG5cdFx0JCgnLnVpLWljb24tY2xvc2V0aGljaycpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdH1cblxuXHREcnVwYWwuYmVoYXZpb3JzLmFtYV9pbWFnZV9wb3B1cCA9IHtcblx0XHRhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImRpYWxvZ29wZW5cIiwgXCIudWktZGlhbG9nXCIsIGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRhbHRlck1vZGFsKCk7XG5cdFx0XHR9KTtcblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIudWktd2lkZ2V0LW92ZXJsYXlcIiwgZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0XHRcdGNsb3NlTW9kYWwoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwsIG9uY2UpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5pbmRleCA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gIGlmICggJCgnLmRlc2MtZGlzcGxheScpLmxlbmd0aCApIHtcblxuICAgIHZhciBmdWxsID0gJCgnLmZ1bGx0ZXh0Jyk7XG4gICAgdmFyIHRydW5jID0gJCgnLnRydW5jYXRlZCcpXG4gICAgdmFyIGRlc2MgPSAkKCcuZGVzYy1kaXNwbGF5JylcbiAgICB2YXIgZnVsbFRleHQgPSAkKCcuZnVsbHRleHQnKS5odG1sKClcbiAgICB2YXIgdHJ1bmNhdGVkID0gJCgnLnRydW5jYXRlZCcpLmh0bWwoKVxuICAgIHZhciBmdWxsSGVpZ2h0ID0gJydcbiAgICB2YXIgdHJ1bmNIZWlnaHQgPSAnJ1xuICAgIHZhciBtb3JlSHRtbCA9ICc8YSBhY2Nlc3NrZXk9XCJsXCIgaHJlZj1cIiNcIiBhbHQ9XCJSZWFkIE1vcmVcIiBjbGFzcz1cIm1vcmVcIiB0YWJpbmRleD1cIjBcIj4gLi4uUmVhZCBNb3JlPC9hPidcbiAgICB2YXIgbGVzc0h0bWwgPSAnPGEgYWNjZXNza2V5PVwibFwiIGhyZWY9XCIjXCIgYWx0PVwiU2hvdyBMZXNzXCIgY2xhc3M9XCJsZXNzXCIgdGFiaW5kZXg9XCIwXCI+U2hvdyBMZXNzPC9hPidcbiAgICB2YXIgd2lkdGggPSAnJ1xuXG4gICAgICBmdW5jdGlvbiBnZXREaW1lbnNpb25zICgpIHtcblxuICAgICAgICAvLyBJZiBjbG9zZXN0IHBhcmVudCBpbmRpY2F0ZXMgY2F0ZWdvcnkuXG4gICAgICAgIC8vIEFkanVzdCBoaWVnaHQgdmFsdWVzLlxuICAgICAgICBpZiAoZGVzYy5jbG9zZXN0KCdkaXYuYW1hX19jYXRlZ29yeScpKSB7XG4gICAgICAgICAgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKVxuICAgICAgICAgIGlmICh3aWR0aCA8IDQwMCkge1xuICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKSArIDI1XG4gICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDIwXG4gICAgICAgICAgfSBlbHNlIGlmICh3aWR0aCA8IDkwMCkge1xuICAgICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgNTFcbiAgICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAyMFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgMjZcbiAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMTRcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKVxuICAgICAgICAgIGlmICh3aWR0aCA8IDQwMCkge1xuICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKSArIDI1XG4gICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDIwXG4gICAgICAgICAgfSBlbHNlIGlmICh3aWR0aCA8IDkwMCkge1xuICAgICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgMjVcbiAgICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAyMFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpXG4gICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDE0XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvKlxuICAgICAgICAqIEFuaW1hdGUgdGhlIGhlaWdodCBvZiBhIGR5bmFtaWMgaGVpZ2h0IG9iamVjdD8gU0lNUExFIVxuICAgICAgICAqIFdoYXQgYSBmb29sIHlvdSB3b3VsZCBiZSB0byBub3QgdGhpbmsgb2Ygc28gZWxlZ2FudCBhIHNvbHV0aW9uLlxuICAgICAgICAqIEluIHRoZSBtYXJrdXAsIHRoZXJlIGFyZSBoaWRkZW4gZnVsbHRleHQgYW5kIHN1bW1hcnkgZGl2cy5cbiAgICAgICAgKiBUaGV5IGFyZSBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgd2hpdGhpbiB0aGUgcGFnZSB0ZW1wbGF0ZSB0byBrZWVwIGFuIGFjY3VyYXRlIGhlaWdodC5cbiAgICAgICAqL1xuXG4gICAgICAvLyBTZXQgaGVpZ2h0IG9uIHBhZ2Vsb2FkIHVzaW5nIHRoZSBoaWRkZW4gZGl2cy5cbiAgICAgICQob25jZSgnZ2V0SGVpZ2h0JywgJy5kZXNjLWRpc3BsYXknLCBjb250ZXh0KSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldERpbWVuc2lvbnMoKVxuICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgdHJ1bmNIZWlnaHQgKyAncHgnKVxuICAgICAgfSk7XG5cbiAgICAgIC8vIFNldCB0aGUgaGVpZ2h0IGFnYWluIG9uIHdpbmRvdyByZXNpemUuXG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXG4gICAgICAgIGlmIChkZXNjLmhhc0NsYXNzKCdmdWxsJykpIHtcbiAgICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgZnVsbEhlaWdodCArICdweCcpXG4gICAgICAgIH0gZWxzZSBpZiAoZGVzYy5oYXNDbGFzcygnc3VtbWFyeScpKSB7XG4gICAgICAgICAgZGVzYy5jc3MoJ2hlaWdodCcsIHRydW5jSGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIE9uIGNsaWNrLCBzZXQgdGhlIGhlaWdodCB0byB0cmlnZ2VyIGNzcyB0cmFuc2l0aW9uLlxuICAgICAgZGVzYy5vbignY2xpY2snLCAnLm1vcmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldERpbWVuc2lvbnMoKVxuICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgZnVsbEhlaWdodCArICdweCcpXG4gICAgICAgIGRlc2MuYWRkQ2xhc3MoJ2Z1bGwnKS5yZW1vdmVDbGFzcygnc3VtbWFyeScpXG4gICAgICAgIC8vIFN3YXAgdGhlIGZ1bGwgY29weSBpbnRvIHRoZSBkaXNwbGF5IGRpdi5cbiAgICAgICAgZGVzYy5odG1sKCQucGFyc2VIVE1MKGZ1bGxUZXh0KSkuYXBwZW5kKGxlc3NIdG1sKVxuICAgICAgfSk7XG4gICAgICBkZXNjLm9uKCdjbGljaycsICcubGVzcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXG4gICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCB0cnVuY0hlaWdodCArICdweCcpXG4gICAgICAgIGRlc2MuYWRkQ2xhc3MoJ3N1bW1hcnknKS5yZW1vdmVDbGFzcygnZnVsbCcpXG4gICAgICAgIC8vIFN3YXAgdGhlIHRydW5jYXRlZCBjb3B5IGludG8gdGhlIGRpc3BsYXkgZGl2LlxuICAgICAgICBkZXNjLmh0bWwoJC5wYXJzZUhUTUwodHJ1bmNhdGVkKSkuYXBwZW5kKG1vcmVIdG1sKVxuICAgICAgICAvLyBTY3JvbGwgdG8gdG9wLlxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCA1MDAsICdzd2luZycpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCwgb25jZSk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV90b2MgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuYW1hLS1uZXdzLXRvYyBhJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgaGFyZCBqdW1wLCB0aGUgZGVmYXVsdCBiZWhhdmlvclxuXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTsgLy8gU2V0IHRoZSB0YXJnZXQgYXMgdmFyaWFibGVcbiAgICAgICAgICAgIC8vIHBlcmZvcm0gYW5pbWF0ZWQgc2Nyb2xsaW5nIGJ5IGdldHRpbmcgdG9wLXBvc2l0aW9uIG9mIHRhcmdldC1lbGVtZW50IGFuZCBzZXQgaXQgYXMgc2Nyb2xsIHRhcmdldFxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQodGFyZ2V0KS5vZmZzZXQoKS50b3AgLSAkKCcjbWFpbi1jb250ZW50Jykub2Zmc2V0KCkudG9wICsgKCQoJy53b3JrYmVuY2gtdGFicycpLmhlaWdodCgpPyQoJy53b3JrYmVuY2gtdGFicycpLmhlaWdodCgpOjApXG4gICAgICAgICAgICB9LCA2MDApO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogQXBwbGljYXRpb24gZHJvcGRvd24uXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYXBwTWVudSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAkKCcjYmxvY2stYWNjb3VudG5hdicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xhc3NfYWN0aXZlID0gJ2lzLWFjdGl2ZSc7XG5cbiAgICAgICAgJCgnLmFjY291bnRfbmF2X3RyaWdnZXInLCB0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAvLyBVbmZvY3VzIG9uIHRoZSBkcm9wZG93bi5cbiAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIGZvciBDU1MuXG4gICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgdG8gdGhlIGRyb3Bkb3duIFVMLlxuICAgICAgICAgICQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKCBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJy5hY2NvdW50X25hdl90cmlnZ2VyJywgdGhpcykucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKS5uZXh0KCkucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9wb2RjYXN0ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgLy9DaGVjayBudW1iZXIgb2YgbGlua3NcbiAgICAgICAgb2RkTGlua3MoKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBvZGRMaW5rcygpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gJChcInVsLmFtYV9fcG9kY2FzdC1wbGF5ZXJfX2xpbmtzIGxpXCIpLmxlbmd0aDtcbiAgICAgICAgdmFyIGxpbmtDb250YWluZXIgPSAkKFwidWwuYW1hX19wb2RjYXN0LXBsYXllcl9fbGlua3NcIik7XG5cbiAgICAgICAgaWYgKGNvdW50ID09IDMgfHwgY291bnQgPT0gMSkge1xuICAgICAgICAgIGxpbmtDb250YWluZXIuYWRkQ2xhc3MoJ29kZF9saW5rcycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpOyIsIi8qKlxuICogQGZpbGVcbiAqIE1vYmlsZSBmdW5jdGlvbmFsaXR5IGZvciB0aGUgbG9ja2VyIG1lbnUuXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsLCBvbmNlKSB7XG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfbG9ja2VyTWVudSA9IHtcbiAgICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgLy8gU2VsZWN0IHJlcXVpcmVkIGVsZW1lbnRzIGZyb20gdGhlIERPTS5cbiAgICAgICAgY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcbiAgICAgICAgY29uc3QgJG1lbnUgPSAkKCcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uJyk7XG4gICAgICAgIGNvbnN0ICR0cmlnZ2VyID0gJCgnLmFtYV9sb2NrZXJfbmF2aWdhdGlvbi10cmlnZ2VyJyk7XG4gICAgICAgIGNvbnN0ICRjYXRjaGVyID0gJCgnLmFtYV9sb2NrZXJfbmF2aWdhdGlvbi1jYXRjaGVyJyk7XG4gICAgICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICBjb25zdCBib2R5Rml4ZWQgPSAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGxvY2tlck1lbnUoKSB7XG4gICAgICAgICAgICAvLyBPcGVuIG1lbnUgb24gdHJpZ2dlciBjbGljay5cbiAgICAgICAgICAgICQob25jZSgnY2xpY2stdG8tc2hvdycsICcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uLXRyaWdnZXInLCBjb250ZXh0KSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAkbWVudS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICAkY2F0Y2hlci50b2dnbGVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgJGJvZHkuY3NzKHtcIm92ZXJmbG93XCI6XCJoaWRkZW5cIn0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBDbG9zZSBtZW51IG9uIGJhY2tncm91bmQgY2xpY2suXG4gICAgICAgICAgICAkKG9uY2UoJ2NsaWNrLXRvLWhpZGUnLCAnLmFtYV9sb2NrZXJfbmF2aWdhdGlvbi1jYXRjaGVyJywgY29udGV4dCkpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkY2F0Y2hlci50b2dnbGVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgJGJvZHkuY3NzKHtcIm92ZXJmbG93XCI6XCJhdXRvXCJ9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9ja2VyTWVudSgpO1xuXG4gICAgICB9XG4gICAgfTtcbiAgfSkoalF1ZXJ5LCBEcnVwYWwsIG9uY2UpO1xuIl19
