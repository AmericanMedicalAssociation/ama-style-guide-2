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
        $('.ama__alert__close').click(function() {
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

      // On resize, reset sticky nav positining and state.
      $( window ).on('resize', function() {
        // Undo inline styles to prevent sticky nav from breaking on resize.
        $('.ama__main-navigation').removeAttr('style');
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
              zIndex: 501
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

      // This conditional has been added to prevent basicTable plugin to selectively not run on tables
      if (!$('table').hasClass('simpleTable')) {
        $('table').basictable({
          breakpoint: 1024
        });
      }

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
            $(e).children('ol').each(function (idx, f) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvZHlTY3JvbGxMb2NrLm1pbi5qcyIsImluaXQuanMiLCJhbGVydC5qcyIsImZvcm0taXRlbXMuanMiLCJuYXYuanMiLCJzdWJjYXRlZ29yeS5qcyIsInRhYnMuanMiLCJhY2NvcmRpb24uanMiLCJ3ZWJmb3Jtcy5qcyIsIm1haW4tbmF2aWdhdGlvbi5qcyIsImNhdGVnb3J5LW1lbnUuanMiLCJzaWduLWluLWRyb3Bkb3duLmpzIiwic2VhcmNoLWNoZWNrYm94LmpzIiwiYnAtY2FsY3VsYXRvci5qcyIsInJlc291cmNlLmpzIiwidGFibGVzLmpzIiwibGlzdGljbGUuanMiLCJtb2RhbC5qcyIsImluZGV4LXBhZ2UuanMiLCJ0b2MuanMiLCJhcHBsaWNhdGlvbi1kcm9wZG93bi5qcyIsInBvZGNhc3QtcGxheWVyLmpzIiwibG9ja2VyLW1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InN0eWxlZ3VpZGUtY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXCJleHBvcnRzXCJdLHQpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpdChleHBvcnRzKTtlbHNle3ZhciBvPXt9O3QobyksZS5ib2R5U2Nyb2xsTG9jaz1vfX0odGhpcyxmdW5jdGlvbihleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgdD0wLG89QXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKW9bdF09ZVt0XTtyZXR1cm4gb31yZXR1cm4gQXJyYXkuZnJvbShlKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbD0hMTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KXt2YXIgZT17Z2V0IHBhc3NpdmUoKXtsPSEwfX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSl9dmFyIGQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lm5hdmlnYXRvciYmd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSYmL2lQKGFkfGhvbmV8b2QpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0pLGM9W10sdT0hMSxhPS0xLHM9dm9pZCAwLHY9dm9pZCAwLGY9ZnVuY3Rpb24odCl7cmV0dXJuIGMuc29tZShmdW5jdGlvbihlKXtyZXR1cm4hKCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmV8fCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmUodCkpfSl9LG09ZnVuY3Rpb24oZSl7dmFyIHQ9ZXx8d2luZG93LmV2ZW50O3JldHVybiEhZih0LnRhcmdldCl8fCgxPHQudG91Y2hlcy5sZW5ndGh8fCh0LnByZXZlbnREZWZhdWx0JiZ0LnByZXZlbnREZWZhdWx0KCksITEpKX0sbz1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt2b2lkIDAhPT12JiYoZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dix2PXZvaWQgMCksdm9pZCAwIT09cyYmKGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9cyxzPXZvaWQgMCl9KX07ZXhwb3J0cy5kaXNhYmxlQm9keVNjcm9sbD1mdW5jdGlvbihpLGUpe2lmKGQpe2lmKCFpKXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJkaXNhYmxlQm9keVNjcm9sbCB1bnN1Y2Nlc3NmdWwgLSB0YXJnZXRFbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgd2hlbiBjYWxsaW5nIGRpc2FibGVCb2R5U2Nyb2xsIG9uIElPUyBkZXZpY2VzLlwiKTtpZihpJiYhYy5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQ9PT1pfSkpe3ZhciB0PXt0YXJnZXRFbGVtZW50Omksb3B0aW9uczplfHx7fX07Yz1bXS5jb25jYXQocihjKSxbdF0pLGkub250b3VjaHN0YXJ0PWZ1bmN0aW9uKGUpezE9PT1lLnRhcmdldFRvdWNoZXMubGVuZ3RoJiYoYT1lLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSl9LGkub250b3VjaG1vdmU9ZnVuY3Rpb24oZSl7dmFyIHQsbyxuLHI7MT09PWUudGFyZ2V0VG91Y2hlcy5sZW5ndGgmJihvPWkscj0odD1lKS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFktYSwhZih0LnRhcmdldCkmJihvJiYwPT09by5zY3JvbGxUb3AmJjA8cj9tKHQpOihuPW8pJiZuLnNjcm9sbEhlaWdodC1uLnNjcm9sbFRvcDw9bi5jbGllbnRIZWlnaHQmJnI8MD9tKHQpOnQuc3RvcFByb3BhZ2F0aW9uKCkpKX0sdXx8KGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMCl9fWVsc2V7bj1lLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZih2b2lkIDA9PT12KXt2YXIgZT0hIW4mJiEwPT09bi5yZXNlcnZlU2Nyb2xsQmFyR2FwLHQ9d2luZG93LmlubmVyV2lkdGgtZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO2UmJjA8dCYmKHY9ZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQsZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dCtcInB4XCIpfXZvaWQgMD09PXMmJihzPWRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3csZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiKX0pO3ZhciBvPXt0YXJnZXRFbGVtZW50Omksb3B0aW9uczplfHx7fX07Yz1bXS5jb25jYXQocihjKSxbb10pfXZhciBufSxleHBvcnRzLmNsZWFyQWxsQm9keVNjcm9sbExvY2tzPWZ1bmN0aW9uKCl7ZD8oYy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UudGFyZ2V0RWxlbWVudC5vbnRvdWNoc3RhcnQ9bnVsbCxlLnRhcmdldEVsZW1lbnQub250b3VjaG1vdmU9bnVsbH0pLHUmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsbSxsP3twYXNzaXZlOiExfTp2b2lkIDApLHU9ITEpLGM9W10sYT0tMSk6KG8oKSxjPVtdKX0sZXhwb3J0cy5lbmFibGVCb2R5U2Nyb2xsPWZ1bmN0aW9uKHQpe2lmKGQpe2lmKCF0KXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJlbmFibGVCb2R5U2Nyb2xsIHVuc3VjY2Vzc2Z1bCAtIHRhcmdldEVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGNhbGxpbmcgZW5hYmxlQm9keVNjcm9sbCBvbiBJT1MgZGV2aWNlcy5cIik7dC5vbnRvdWNoc3RhcnQ9bnVsbCx0Lm9udG91Y2htb3ZlPW51bGwsYz1jLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50IT09dH0pLHUmJjA9PT1jLmxlbmd0aCYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMSl9ZWxzZSAxPT09Yy5sZW5ndGgmJmNbMF0udGFyZ2V0RWxlbWVudD09PXQ/KG8oKSxjPVtdKTpjPWMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQhPT10fSl9fSk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBJbml0aWFsaXphdGlvbiBzY3JpcHQgZm9yIGdsb2JhbCBwcm9jZXNzZXNcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXG4vKipcbiAqXG4gKiBJbml0aWFsaXplIGZpdFZpZCBmb3IgWW91VHViZSB2aWVvcy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuXG5cdERydXBhbC5iZWhhdmlvcnMuZml0dmlkaW5pdCA9IHtcblx0IGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cdFx0XHQoZnVuY3Rpb24gKCQpIHtcblx0XHRcdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKCcudmlkZW8tY29udGFpbmVyJykuZml0VmlkcygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pKGpRdWVyeSk7XG5cdFx0fVxuXHR9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBhbGVydC5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbGVydCA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgdmFyIGFsZXJ0SWQgPSAkKCcuYW1hX19hbGVydF9fd3JhcCcpLmF0dHIoJ2lkJyk7XG4gICAgICB2YXIgYWxlcnRDb29raWUgPSBDb29raWVzLmdldCgnYWxlcnRDb29raWUnKTtcbiAgICAgIHZhciBhbGVydE5vZGUgPSBDb29raWVzLmdldCgnYWxlcnROb2RlJyk7XG5cbiAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICAvLyBJZiB0aGUgJ2hpZGUgY29va2llIGlzIG5vdCBzZXQgd2Ugc2hvdyB0aGUgYWxlcnRcbiAgICAgICAgaWYgKChhbGVydE5vZGUgIT09IGFsZXJ0SWQpIHx8IChhbGVydENvb2tpZSAhPT0gJzEnKSkge1xuICAgICAgICAgICQoJy5hbWFfX2FsZXJ0X193cmFwJykuY3NzKHtcbiAgICAgICAgICAgIFwidHJhbnNpdGlvblwiOiBcIm9wYWNpdHkgLjE1c1wiLFxuICAgICAgICAgICAgXCJvcGFjaXR5XCI6IFwiMVwiXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5jc3Moe1xuICAgICAgICAgICAgXCJkaXNwbGF5XCI6IFwibm9uZVwiXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGhlIGV2ZW50IHRoYXQgY2xvc2VzIHRoZSBwb3B1cCBhbmQgc2V0cyB0aGUgY29va2llIHRoYXQgdGVsbHMgdXMgdG9cbiAgICAgICAgLy8gbm90IHNob3cgaXQgYWdhaW4gdW50aWwgb25lIGRheSBoYXMgcGFzc2VkLlxuICAgICAgICAkKCcuYW1hX19hbGVydF9fY2xvc2UnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKCcuYW1hX19hbGVydF9fd3JhcCcpLmNzcyh7XG4gICAgICAgICAgICBcInRyYW5zaXRpb25cIjogXCJvcGFjaXR5IDJzXCIsXG4gICAgICAgICAgICBcIm9wYWNpdHlcIjogXCIwXCIsXG4gICAgICAgICAgICBcImRpc3BsYXlcIjogXCJub25lXCJcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgY29va2llc1xuICAgICAgICAgIENvb2tpZXMuc2V0KCdhbGVydENvb2tpZScsICcxJywgeyBleHBpcmVzOiAxfSk7XG4gICAgICAgICAgQ29va2llcy5zZXQoJ2FsZXJ0Tm9kZScsIGFsZXJ0SWQsIHsgZXhwaXJlczogMX0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogRm9ybSBmaWVsZHMgbWFza2luZ1xuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuZm9ybUl0ZW1zID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuICAgICAgICAgIC8vIERvIG5vdCBleGVjdXRlIGluIHRoZSBsYXlvdXQgYnVpbGRlciBlZGl0IGRpYWxvZ1xuICAgICAgICAgIGlmICghJCgnLmpzLW9mZi1jYW52YXMtZGlhbG9nLW9wZW4nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJy5tdWx0aXNlbGVjdCcpLm11bHRpc2VsZWN0KCk7XG5cbiAgICAgICAgICAgICQoJy5hbWFfX3Rvb2x0aXAnKS50b29sdGlwKHtcbiAgICAgICAgICAgICAgdG9vbHRpcENsYXNzOiBcImFtYV9fdG9vbHRpcC1idWJibGVcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKSB7XG4gICAgICAgICAgICAgIHZhciBtYXhfbGVuZ3RoID0gMTUwO1xuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX2VudGVyZWQgPSAkKCcudGV4dGFyZWEnKS52YWwoKS5sZW5ndGg7XG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfcmVtYWluaW5nID0gbWF4X2xlbmd0aCAtIGNoYXJhY3Rlcl9lbnRlcmVkO1xuICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuaHRtbChjaGFyYWN0ZXJfcmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgaWYgKG1heF9sZW5ndGggPCBjaGFyYWN0ZXJfZW50ZXJlZCkge1xuICAgICAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGpRdWVyeVVJIHNlbGVjdG1lbnUgbWV0aG9kIHRvIGluaXRpYXRlIGN1c3RvbSBkcm9wZG93biBtZW51XG4gICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLnNlbGVjdG1lbnUoKTtcblxuICAgICAgICAgIC8vIFdhaXQgZm9yIGEgc2hvcnQgZGVsYXkgdG8gZW5zdXJlIHRoZSBtZW51IGlzIGZ1bGx5IGxvYWRlZCBhbmQgaW5pdGlhbGl6ZWRcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gU2V0IGFyaWEtbGFiZWwgb24gc2VsZWN0bWVudSBidXR0b25cbiAgICAgICAgICAgIHZhciBpbml0aXRhbFNlbGVjdGVkT3B0aW9uVGV4dCA9ICQoJy51aS1zZWxlY3RtZW51LW1lbnUnKS5maW5kKCdkaXYudWktc3RhdGUtYWN0aXZlJykudGV4dCgpO1xuICAgICAgICAgICAgJCgnLnVpLXNlbGVjdG1lbnUtbWVudScpLmZpbmQoJ2Rpdi51aS1zdGF0ZS1hY3RpdmUnKS5hdHRyKCdhcmlhLWxhYmVsJywgJ1NvcnQgYnkgJyArIGluaXRpdGFsU2VsZWN0ZWRPcHRpb25UZXh0KTtcbiAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgLy8gU2V0IGFyaWEtbGFiZWwgb24gc2VsZWN0bWVudSBidXR0b24gd2hlbiBhbiBvcHRpb24gaXMgc2VsZWN0ZWRcbiAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0Jykuc2VsZWN0bWVudSh7XG4gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgICAgICAgICAvLyBHZXQgdGhlIHRleHQgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT3B0aW9uVGV4dCA9ICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLy8gU2V0IHRoZSBhcmlhLWxhYmVsIGF0dHJpYnV0ZSB0byB0aGUgdGV4dCBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uXG4gICAgICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5uZXh0KCcudWktc2VsZWN0bWVudS1idXR0b24nKS5maW5kKCcudWktc2VsZWN0bWVudS10ZXh0JykuYXR0cignYXJpYS1sYWJlbCcsICdTb3J0eSBieSAnICsgc2VsZWN0ZWRPcHRpb25UZXh0KTtcbiAgICAgICAgICAgICAgJCgnLnVpLXNlbGVjdG1lbnUtbWVudScpLmZpbmQoJy51aS1tZW51LWl0ZW0gZGl2LnVpLXN0YXRlLWFjdGl2ZScpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnU29ydCBieSAnICsgc2VsZWN0ZWRPcHRpb25UZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gUmVmcmVzaCBtZW51IHRvIHNldCBjaGFuZ2VzXG4gICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLnNlbGVjdG1lbnUoJ3JlZnJlc2gnKTtcblxuICAgICAgICAgICAgLy8gSWYgZm9jdXMgaXMgb24gdGhlIHNlbGVjdCBtZW51XG4gICAgICAgICAgICAvLyBPbmx5IHN1Ym1pdCBhZnRlciBoaXR0aW5nIGVudGVyXG4gICAgICAgICAgICAkKCcjZWRpdC1zb3J0LWJ5LS0zLWJ1dHRvbicpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBpZihlLndoaWNoID09IDkpIHtcbiAgICAgICAgICAgICAgICAkKCcjZWRpdC1zb3J0LWJ5LS0zLWJ1dHRvbicpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgaWYoZS53aGljaCA9PSAxMykge1xuICAgICAgICAgICAgICAgICAgICAkKCcjYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNoLXNvbHJwYWdlLTInKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFN1Ym1pdHMgdGhlIHNlYXJjaCBmb3JtIGFmdGVyIGEgc2VsZWN0IG1lbnUgaXRlbXMgaGFzIGJlZW4gc2VsZWN0ZWRcbiAgICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3Q6bm90KCNlZGl0LXNvcnQtYnktLTMpJykub24oJ3NlbGVjdG1lbnVjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJCgnI2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaC1zb2xycGFnZS0yJykuc3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCgnI2VkaXQtc29ydC1ieS0tMy1tZW51JykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQoJyNibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2gtc29scnBhZ2UtMicpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgICQoJyNlZGl0LXNvcnQtYnktLTMtbWVudScpLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBTdGFydCBzZWFyY2ggZmlsdGVyXG5cbiAgICAgICAgICAgIHZhciBhdmFpbGFibGVUYWdzID0gW1xuICAgICAgICAgICAgICBcIkFsYWJhbWFcIixcbiAgICAgICAgICAgICAgXCJBbGFza2FcIixcbiAgICAgICAgICAgICAgXCJBbWVyaWNhbiBTYW1vYVwiLFxuICAgICAgICAgICAgICBcIkFyaXpvbmFcIixcbiAgICAgICAgICAgICAgXCJBcmthbnNhc1wiLFxuICAgICAgICAgICAgICBcIkNhbGlmb3JuaWFcIixcbiAgICAgICAgICAgICAgXCJDb2xvcmFkb1wiLFxuICAgICAgICAgICAgICBcIkNvbm5lY3RpY3V0XCIsXG4gICAgICAgICAgICAgIFwiRGVsYXdhcmVcIixcbiAgICAgICAgICAgICAgXCJEaXN0cmljdCBPZiBDb2x1bWJpYVwiLFxuICAgICAgICAgICAgICBcIkZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYVwiLFxuICAgICAgICAgICAgICBcIkZsb3JpZGFcIixcbiAgICAgICAgICAgICAgXCJHZW9yZ2lhXCIsXG4gICAgICAgICAgICAgIFwiR3VhbVwiLFxuICAgICAgICAgICAgICBcIkhhd2FpaVwiLFxuICAgICAgICAgICAgICBcIklkYWhvXCIsXG4gICAgICAgICAgICAgIFwiSWxsaW5vaXNcIixcbiAgICAgICAgICAgICAgXCJJbmRpYW5hXCIsXG4gICAgICAgICAgICAgIFwiSW93YVwiLFxuICAgICAgICAgICAgICBcIkthbnNhc1wiLFxuICAgICAgICAgICAgICBcIktlbnR1Y2t5XCIsXG4gICAgICAgICAgICAgIFwiTG91aXNpYW5hXCIsXG4gICAgICAgICAgICAgIFwiTWFpbmVcIixcbiAgICAgICAgICAgICAgXCJNYXJzaGFsbCBJc2xhbmRzXCIsXG4gICAgICAgICAgICAgIFwiTWFyeWxhbmRcIixcbiAgICAgICAgICAgICAgXCJNYXNzYWNodXNldHRzXCIsXG4gICAgICAgICAgICAgIFwiTWljaGlnYW5cIixcbiAgICAgICAgICAgICAgXCJNaW5uZXNvdGFcIixcbiAgICAgICAgICAgICAgXCJNaXNzaXNzaXBwaVwiLFxuICAgICAgICAgICAgICBcIk1pc3NvdXJpXCIsXG4gICAgICAgICAgICAgIFwiTW9udGFuYVwiLFxuICAgICAgICAgICAgICBcIk5lYnJhc2thXCIsXG4gICAgICAgICAgICAgIFwiTmV2YWRhXCIsXG4gICAgICAgICAgICAgIFwiTmV3IEhhbXBzaGlyZVwiLFxuICAgICAgICAgICAgICBcIk5ldyBKZXJzZXlcIixcbiAgICAgICAgICAgICAgXCJOZXcgTWV4aWNvXCIsXG4gICAgICAgICAgICAgIFwiTmV3IFlvcmtcIixcbiAgICAgICAgICAgICAgXCJOb3J0aCBDYXJvbGluYVwiLFxuICAgICAgICAgICAgICBcIk5vcnRoIERha290YVwiLFxuICAgICAgICAgICAgICBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuICAgICAgICAgICAgICBcIk9oaW9cIixcbiAgICAgICAgICAgICAgXCJPa2xhaG9tYVwiLFxuICAgICAgICAgICAgICBcIk9yZWdvblwiLFxuICAgICAgICAgICAgICBcIlBhbGF1XCIsXG4gICAgICAgICAgICAgIFwiUGVubnN5bHZhbmlhXCIsXG4gICAgICAgICAgICAgIFwiUHVlcnRvIFJpY29cIixcbiAgICAgICAgICAgICAgXCJSaG9kZSBJc2xhbmRcIixcbiAgICAgICAgICAgICAgXCJTb3V0aCBDYXJvbGluYVwiLFxuICAgICAgICAgICAgICBcIlNvdXRoIERha290YVwiLFxuICAgICAgICAgICAgICBcIlRlbm5lc3NlZVwiLFxuICAgICAgICAgICAgICBcIlRleGFzXCIsXG4gICAgICAgICAgICAgIFwiVXRhaFwiLFxuICAgICAgICAgICAgICBcIlZlcm1vbnRcIixcbiAgICAgICAgICAgICAgXCJWaXJnaW4gSXNsYW5kc1wiLFxuICAgICAgICAgICAgICBcIlZpcmdpbmlhXCIsXG4gICAgICAgICAgICAgIFwiV2FzaGluZ3RvblwiLFxuICAgICAgICAgICAgICBcIldlc3QgVmlyZ2luaWFcIixcbiAgICAgICAgICAgICAgXCJXaXNjb25zaW5cIixcbiAgICAgICAgICAgICAgXCJXeW9taW5nXCJcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICQoIFwiI3NlYXJjaF9maWx0ZXJcIiApLmF1dG9jb21wbGV0ZSh7XG4gICAgICAgICAgICAgIHNvdXJjZTogYXZhaWxhYmxlVGFnc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQudWkuYXV0b2NvbXBsZXRlLnByb3RvdHlwZS5fcmVzaXplTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdmFyIHVsID0gdGhpcy5tZW51LmVsZW1lbnQ7XG4gICAgICAgICAgICAgIHVsLm91dGVyV2lkdGgodGhpcy5lbGVtZW50Lm91dGVyV2lkdGgoKSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIC8vIFN0YXJ0IHNlYXJjaCBmaWx0ZXIgd2l0aCBjaGVja2JveGVzXG5cbiAgICAgICAgICAgIHZhciBkYXRhTW9kZWwgPSBbXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQWxhYmFtYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0FsYXNrYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0FtZXJpY2FuIFNhbW9hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQXJpem9uYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0Fya2Fuc2FzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQ2FsaWZvcm5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0NvbG9yYWRvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQ29ubmVjdGljdXQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdEZWxhd2FyZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnRmxvcmlkYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0dlb3JnaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdHdWFtJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSGF3YWlpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSWRhaG8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdJbGxpbm9pcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ0luZGlhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdJb3dhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnS2Fuc2FzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnS2VudHVja3knLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdMb3Vpc2lhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNYWluZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01hcnNoYWxsIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNYXJ5bGFuZCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01hc3NhY2h1c2V0dHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNaWNoaWdhbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01pbm5lc290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ01pc3Npc3NpcHBpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWlzc291cmknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdNb250YW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmVicmFza2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXZhZGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXcgSGFtcHNoaXJlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEplcnNleScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05ldyBNZXhpY28nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXcgWW9yaycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ05vcnRoIENhcm9saW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGggRGFrb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnT2hpbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ09rbGFob21hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnT3JlZ29uJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnUGFsYXUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdQZW5uc3lsdmFuaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdQdWVydG8gUmljbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1Job2RlIElzbGFuZCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1NvdXRoIENhcm9saW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnU291dGggRGFrb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVGVubmVzc2VlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVGV4YXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdVdGFoJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVmVybW9udCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbiBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICdXYXNoaW5ndG9uJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICAgIHt0ZXh0OiAnV2VzdCBWaXJnaW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1dpc2NvbnNpbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAgICB7dGV4dDogJ1d5b21pbmcnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgICAge3RleHQ6ICcnLCB2YWx1ZTogJyd9XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxDaGFuZ2UoKXtcbiAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9ICQoJyNteUNoZWNrTGlzdCcpLmNoZWNrTGlzdCgnZ2V0U2VsZWN0aW9uJyk7XG5cbiAgICAgICAgICAgICAgJCgnI3NlbGVjdGVkSXRlbXMnKS50ZXh0KEpTT04uc3RyaW5naWZ5KHNlbGVjdGlvbikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mKGpRdWVyeS51aS5jaGVja0xpc3QpICE9ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICAgJCgnI2ZpbHRlckxpc3QnKS5jaGVja0xpc3Qoe1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtczogZGF0YU1vZGVsLFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBzZWxDaGFuZ2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoJ2Zvcm06bm90KFtjbGFzcyo9XCJsYXlvdXQtYnVpbGRlclwiXSkgW3R5cGU9Y2hlY2tib3hdJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICQoJ1t0eXBlPWNoZWNrYm94XScpLmNoZWNrYm94cmFkaW8oKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKCdmb3JtOm5vdChbY2xhc3MqPVwibGF5b3V0LWJ1aWxkZXJcIl0pIFt0eXBlPXJhZGlvXScpLmNoZWNrYm94cmFkaW8oKS5idXR0b25zZXQoKS5maW5kKCdsYWJlbCcpLmNzcygnd2lkdGgnLCAnMTkuNCUnKTtcblxuICAgICAgICAgICAgJCgnLnRleHRhcmVhJykua2V5dXAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBSYW5nZSBGaWVsZFxuICAgICAgICAgICAgdmFyIGxlZ2VuZCA9ICQoJy5hbWFfX3JhbmdlLWZpZWxkX19sZWdlbmQnKTtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSAkKCBcIiNjdXJyZW50VmFsdWVcIiApO1xuXG4gICAgICAgICAgICAkKFwiLmFtYV9fcmFuZ2UtZmllbGRcIikuc2xpZGVyKHtcbiAgICAgICAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgcmFuZ2U6ICdtaW4nLFxuICAgICAgICAgICAgICB2YWx1ZTogMSxcbiAgICAgICAgICAgICAgbWluOiAyMDAwLFxuICAgICAgICAgICAgICBtYXg6IDUwMDAsXG4gICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlID0galF1ZXJ5KHRoaXMpLmZpbmQoJy51aS1zbGlkZXItaGFuZGxlJyk7XG4gICAgICAgICAgICAgICAgdmFyIGJ1YmJsZSA9IGpRdWVyeSgnPGRpdiBjbGFzcz1cImFtYV9fcmFuZ2UtZmllbGRfX3ZhbHVlYm94XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgaGFuZGxlLmFwcGVuZChidWJibGUpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZ0LCB1aSkge1xuICAgICAgICAgICAgICAgIHVpLmhhbmRsZS5jaGlsZE5vZGVzWzBdLmlubmVySFRNTCA9ICckJyArIHVpLnZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5hcHBlbmQobGVnZW5kKTtcblxuICAgICAgICAgICAgLy8gRm9ybSBhY2NvcmRpb25cbiAgICAgICAgICAgICQoIFwiLnRhYmxpc3RcIiApLmFjY29yZGlvbih7XG4gICAgICAgICAgICAgIGhlYWRlcjogXCIuYW1hX19mb3JtLXN0ZXBzX19zdGVwXCIsXG4gICAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEV4cGFuZCBsaXN0XG4gICAgICAgICAgICBmdW5jdGlvbiBleHBhbmRMaXN0QWNjb3JkaW9uKGVsZW1lbnQsIG9wZW4pe1xuICAgICAgICAgICAgICAkKGVsZW1lbnQpLmFjY29yZGlvbih7XG4gICAgICAgICAgICAgICAgbXVsdGlwbGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaWNvbnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbmltYXRlOiA1MDAsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBvcGVuLFxuICAgICAgICAgICAgICAgIGFjdGl2YXRlIDogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICAgICAgICAgICAgaWYoJCh1aS5uZXdQYW5lbCkuaGFzQ2xhc3MoJ3VpLWFjY29yZGlvbi1jb250ZW50LWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICQodWkubmV3UGFuZWwpLnByZXYoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKHVpLm9sZFBhbmVsKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZigkKFwiLmFtYV9fZXhwYW5kLWxpc3RcIikuZmluZCgnLnVpLWNoZWNrYm94cmFkaW8tY2hlY2tlZCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICBleHBhbmRMaXN0QWNjb3JkaW9uKCcuYW1hX19leHBhbmQtbGlzdCcsIDApO1xuICAgICAgICAgICAgICAkKFwiLmFtYV9fZXhwYW5kLWxpc3QgLmFtYV9fZXhwYW5kLWxpc3RfX2hlYWRlclwiKS5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGV4cGFuZExpc3RBY2NvcmRpb24oJy5hbWFfX2V4cGFuZC1saXN0JywgZmFsc2UpO1xuICAgICAgICAgICAgICAkKFwiLmFtYV9fZXhwYW5kLWxpc3RcIikuY2hpbGRyZW4oJy5hbWFfX2V4cGFuZC1saXN0X19oZWFkZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENvbGxhcHNlIGFsbCBhY2NvcmRpb24gcGFuZWxzXG4gICAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX2NvbGxhcHNlLXBhbmVscyBidXR0b24nKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkKCcuYW1hX19leHBhbmQtbGlzdCAudWktYWNjb3JkaW9uLWhlYWRlcicpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ3VpLXN0YXRlLWFjdGl2ZScpIHx8ICQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBPcGVuIGFjY29yZGlvbiBwYW5lbHMgZm9yIG1vYmlsZVxuICAgICAgICAgICAgJCgnLmFtYV9fYXBwbGllZC1maWx0ZXJzX19zaG93LWZpbHRlcnMnKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QsIC5hbWFfX2FwcGxpZWQtZmlsdGVyc19fdGFncycpLnNsaWRlVG9nZ2xlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJy5hbWFfX2FwcGxpZWQtZmlsdGVyc19fc2hvdy1maWx0ZXJzJykudGV4dCgkKHRoaXMpLmlzKCc6dmlzaWJsZScpID8gJ0hpZGUgRmlsdGVyJyA6ICdGaWx0ZXInKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gbGlzdEZpbHRlcihpbnB1dCwgbGlzdCkgeyAvLyBoZWFkZXIgaXMgYW55IGVsZW1lbnQsIGxpc3QgaXMgYW4gdW5vcmRlcmVkIGxpc3RcbiAgICAgICAgICAgICAgLy8gY3VzdG9tIGNzcyBleHByZXNzaW9uIGZvciBhIGNhc2UtaW5zZW5zaXRpdmUgY29udGFpbnMoKVxuICAgICAgICAgICAgICBqUXVlcnkuZXhwclsnOiddLkNvbnRhaW5zID0gZnVuY3Rpb24oYSxpLG0pe1xuICAgICAgICAgICAgICAgIHJldHVybiAoYS50ZXh0Q29udGVudCB8fCBhLmlubmVyVGV4dCB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpLmluZGV4T2YobVszXS50b1VwcGVyQ2FzZSgpKT49MDtcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAkKGlucHV0KS5jaGFuZ2UoIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgICBpZihmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMgZmluZHMgYWxsIGxpbmtzIGluIGEgbGlzdCB0aGF0IGNvbnRhaW4gdGhlIGlucHV0LFxuICAgICAgICAgICAgICAgICAgLy8gYW5kIGhpZGUgdGhlIG9uZXMgbm90IGNvbnRhaW5pbmcgdGhlIGlucHV0IHdoaWxlIHNob3dpbmcgdGhlIG9uZXMgdGhhdCBkb1xuICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwic3Bhbjpub3QoOkNvbnRhaW5zKFwiICsgZmlsdGVyICsgXCIpKVwiKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJzcGFuOkNvbnRhaW5zKFwiICsgZmlsdGVyICsgXCIpXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwibGFiZWxcIikuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gb25seSBzaG93IHJlc3VsdHMgYWZ0ZXIgMyBjaGFyYWN0ZXJzIGFyZSBlbnRlcmVkXG4gICAgICAgICAgICAgIH0pLmtleXVwKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiggdGhpcy52YWx1ZS5sZW5ndGggPCA0ICkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICQodGhpcykuY2hhbmdlKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGlzdEZpbHRlcigkKFwiI2FtYV9fc2VhcmNoX19sb2NhdGlvblwiKSwgJChcIi5hbWFfX2Zvcm0tZ3JvdXBcIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYWtlIHRoZSBlbnRpcmUgc3Vic2NyaWJlIGJ1dHRvbiBjbGlja2FibGUuXG4gICAgICAgICAgJCgnZm9ybS5zYWxlc2ZvcmNlLXN1YnNjcmliZS1mb3JtLCAuYW1hX19pbnB1dC13cmFwcGVyLS1zdWJzY3JpYmUtbmV3cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzYWxlc2ZvcmNlLXN1YnNjcmliZS1mb3JtJykpIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgbGluayA9ICQodGhpcykuZmluZCgnYScpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGxpbms7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZigkKCcucGFyYWdyYXBoLS10eXBlLS1mb3JtLTUwLTUwIGRpdi5zdWNjZXNzX21lc3NhZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJy5wYXJhZ3JhcGgtLXR5cGUtLWZvcm0tNTAtNTAnKS5maW5kKCcuZm9ybS1jb250ZW50JykuYWRkQ2xhc3MoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogUmliYm9uIG5hdiB1c2VyIGludGVyYWN0aW9ucy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gJ2Fub255bW91cyBjbG9zdXJlJy4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5yaWJib25uYXYgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgZnVuY3Rpb24gc2V0U3RpY2t5TmF2KCkgeyBcbiAgICAgICAgLy8gTmVlZHMgZG9jIHJlYWR5IGJlY2F1c2UgdGhlIGFkbWluIHRvb2xiYXIgbmVlZHMgdG8gZ2V0IGxvYWRlZCB0byBkZXRlcm1pbmUgdGhlIHRvcCBzcGFjaW5nIGZvciBzdGlja3kgbmF2XG4gICAgICAgIHZhciAkYm9keUZpeGVkID0gJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnKTtcblxuICAgICAgICAvLyBTZXQgbWFpbiBuYXYgYW5kIHByb2R1Y3QgbmF2IHN0aWNreSBzdGF0ZSBiYXNlZCBvbiBhZG1pbiB0b29sYmFyIGFuZCBzY3JlZW4gc2l6ZS5cbiAgICAgICAgaWYoJGJvZHlGaXhlZCA9PT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24nKS51bnN0aWNrKCkucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZigkKHdpbmRvdykud2lkdGgoKSA8IDc2OCApIHsgLy8gSWYgbGVzcyB0aGFuIHRhYmxldFxuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbicpLnN0aWNreSh7ekluZGV4OiA1MDEgfSk7XG4gICAgICAgIH0gZWxzZSBpZigkKCcudG9vbGJhci10cmF5JykuaGFzQ2xhc3MoJ3Rvb2xiYXItdHJheS1ob3Jpem9udGFsJykpIHtcbiAgICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gJykuc3RpY2t5KHsgekluZGV4OiA1MDEsIHRvcFNwYWNpbmc6IDc5IH0pO1xuICAgICAgICB9IGVsc2UgaWYoJCgnLnRvb2xiYXItdHJheScpLmhhc0NsYXNzKCd0b29sYmFyLXRyYXktdmVydGljYWwnKSkge1xuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAnKS5zdGlja3koeyB6SW5kZXg6IDUwMSwgdG9wU3BhY2luZzogMzkgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uICcpLnN0aWNreSh7IHpJbmRleDogNTAxIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBzZXRTdGlja3lOYXYoKTtcblxuICAgICAgLy8gT24gcmVzaXplLCByZXNldCBzdGlja3kgbmF2IHBvc2l0aW5pbmcgYW5kIHN0YXRlLlxuICAgICAgJCggd2luZG93ICkub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBVbmRvIGlubGluZSBzdHlsZXMgdG8gcHJldmVudCBzdGlja3kgbmF2IGZyb20gYnJlYWtpbmcgb24gcmVzaXplLlxuICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24nKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICBzZXRTdGlja3lOYXYoKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc19hY3RpdmUgPSAnaXMtYWN0aXZlJztcblxuICAgICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duX190cmlnZ2VyJywgdGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgLy8gVW5mb2N1cyBvbiB0aGUgZHJvcGRvd24uXG4gICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyBmb3IgQ1NTLlxuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIHRvIHRoZSBkcm9wZG93biBVTC5cbiAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCkudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duX190cmlnZ2VyJywgdGhpcykucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogU3ViY2F0ZWdvcnlcbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5zdWJjYXRlZ29yaWVzID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIC8vIENyZWF0ZSBzdGF0aWMgdmFyIGZvciBzdWJjYXRlZ29yeSBpdGVtIGNvdW50LiBUbyBiZSB1c2VkIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHJlY2FsY3VsYXRpb25zIGFyZSBuZWVkZWQuXG4gICAgICB2YXIgc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbkNvbHVtbnMgPSAwO1xuXG4gICAgICBmdW5jdGlvbiBjaGVja1NpemUoKSB7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnkgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc3ViY2F0ZWdvcnknKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeUNvbnRhaW5lciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX19jb250YWluZXInKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeVRpdGxlID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3RpdGxlJyk7XG4gICAgICAgIC8vIFdlIHdhbnQgdGhlIHdpZHRoIG1pbnVzIHBhZGRpbmcgc28gdXNlIHdpZHRoKCkgaW5zdGVhZCBvZiBpbm5lcldpZHRoKCkuXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUV4cGxvcmF0aW9uV2lkdGggPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlcycpLndpZHRoKCk7XG4gICAgICAgIC8vIFN1YmNhdGVnb3J5IGl0ZW1zIGhhdmUgbWF4LXdpZHRoIG9mIDE4MHB4LiBUaGlzIHdpbGwgYmUgdXNlZCBmb3IgY2FsY3VsYXRpb25zIGluc3RlYWQgb2YgZXh0cmFjdGluZyBpdCB2aWEgalF1ZXJ5IGNhbGxzLlxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlJdGVtV2lkdGggPSAxODA7XG4gICAgICAgIHZhciBzdWJjYXRlZ29yeVRpdGxlV2lkdGggPSAkc3ViY2F0ZWdvcnlUaXRsZS5vdXRlcldpZHRoKCk7XG4gICAgICAgIHZhciB0b3RhbEdyaWRJdGVtcyA9ICRzdWJjYXRlZ29yeS5sZW5ndGggKyAxO1xuICAgICAgICAvLyBTdGFydCBjb2x1bW4gY291bnQgYXMgbG93ZXN0IHBvc3NpYmxlLlxuICAgICAgICB2YXIgY29sdW1uQ291bnQgPSAyO1xuICAgICAgICAvLyBTZXQgc3ViY2F0ZWdvcnkgcm93IGl0ZW1zIHRvIGxvd2VzdCB0aGF0IHNob3VsZCBkaXNwbGF5LlxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyA9IE1hdGguZmxvb3IoKHN1YmNhdGVnb3J5RXhwbG9yYXRpb25XaWR0aCAtIHN1YmNhdGVnb3J5VGl0bGVXaWR0aCkgLyBzdWJjYXRlZ29yeUl0ZW1XaWR0aCk7XG5cbiAgICAgICAgaWYgKHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgPCAyKSB7XG4gICAgICAgICAgLy8gVGhlIG1pbmltdW0gc3ViY2F0ZWdvcnkgaXRlbXMgcGVyIHJvdyBzaG91bGQgYmUgdHdvLiBJZiB0aGUgdmFyaWFibGUgY29tcHV0ZWQgdG8gbGVzcywgbWFudWFsbHkgY29ycmVjdCBpdC5cbiAgICAgICAgICBzdWJjYXRlZ29yeUl0ZW1zUGVyUm93ID0gMjtcbiAgICAgICAgICB0b3RhbEdyaWRJdGVtcyA9IHRvdGFsR3JpZEl0ZW1zIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2x1bW5Db3VudCA9IHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIGNoYW5nZXMgaW4gY29sdW1uIGNvdW50IGhhcyBvY2N1cnJlZCBhbmQgYWN0IGFjY29yZGluZ2x5XG4gICAgICAgIGlmIChzdWJjYXRlZ29yeUV4cGxvcmF0aW9uQ29sdW1ucyAhPT0gY29sdW1uQ291bnQpIHtcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgYWRkaXRpb25hbCBcImZpbGxlci1ib3hcIiBuZWVkZWQgdG8gY3JlYXRlIGNvbXBsZXRlIHJvd1xuICAgICAgICAgIHZhciBmaWxsZXJCb3hDb3VudCA9IGNvbHVtbkNvdW50IC0gKHRvdGFsR3JpZEl0ZW1zICUgY29sdW1uQ291bnQpO1xuICAgICAgICAgIGZpbGxHcmlkUm93KCRzdWJjYXRlZ29yeUNvbnRhaW5lciwgZmlsbGVyQm94Q291bnQpO1xuICAgICAgICAgIC8vIFVwZGF0ZSBwZXJzaXN0ZW50IGNvbHVtbiBjb3VudFxuICAgICAgICAgIHN1YmNhdGVnb3J5RXhwbG9yYXRpb25Db2x1bW5zID0gY29sdW1uQ291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgdmlld2FibGUgc3ViY2F0ZWdvcmllcy5cbiAgICAgICAgJHN1YmNhdGVnb3J5LmhpZGUoKTtcbiAgICAgICAgJHN1YmNhdGVnb3J5LnNsaWNlKDAsIHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcblxuICAgICAgICB2aWV3TW9yZSgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB2aWV3TW9yZSgpIHtcbiAgICAgICAgdmFyICR2aWV3TGVzcyA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWxlc3MnKTtcbiAgICAgICAgdmFyICR2aWV3TW9yZSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWFsbCcpO1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5ID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3N1YmNhdGVnb3J5Jyk7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnlDb250YWluZXIgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fY29udGFpbmVyJyk7XG5cbiAgICAgICAgJHZpZXdMZXNzLmhpZGUoKTtcbiAgICAgICAgJHZpZXdNb3JlLnNob3coKTtcblxuICAgICAgICAkKCcudmlld0FsbCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeS5mYWRlSW4oKTtcbiAgICAgICAgICAkdmlld01vcmUuaGlkZSgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeUNvbnRhaW5lci5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAkdmlld0xlc3Muc2hvdygpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy52aWV3TGVzcycpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeS5oaWRlKCk7XG4gICAgICAgICAgY2hlY2tTaXplKCk7XG4gICAgICAgICAgJHZpZXdMZXNzLmhpZGUoKTtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnlDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgJHZpZXdNb3JlLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgICAgZnVuY3Rpb24gZmlsbEdyaWRSb3coJGNvbnRhaW5lciwgY291bnQpIHtcbiAgICAgICAgdmFyIGZpbGxlckJveCA9ICc8ZGl2IGNsYXNzPVwiZmlsbGVyLWJveFwiPjwvZGl2Pic7XG4gICAgICAgIC8vIGNsZWFyIG91dCBjdXJyZW50IGZpbGxlciBib3hlc1xuICAgICAgICB2YXIgJGZpbGxlckJveGVzID0gJGNvbnRhaW5lci5maW5kKCcuZmlsbGVyLWJveCcpO1xuICAgICAgICAkZmlsbGVyQm94ZXMucmVtb3ZlKCk7XG4gICAgICAgIC8vIGZpbGwgb3V0IGdyaWQgcm93XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKGZpbGxlckJveCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcnVuIHRlc3Qgb24gaW5pdGlhbCBwYWdlIGxvYWRcbiAgICAgIGNoZWNrU2l6ZSgpO1xuXG4gICAgICAvLyBydW4gdGVzdCBvbiByZXNpemUgb2YgdGhlIHdpbmRvd1xuICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoZWNrU2l6ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyo9PT09PT0galF1ZXJ5IFVJIHRhYnMgPT09PT09Ki9cblxuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV90YWJzID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICB2YXIgZGVmYXVsdEFjdGl2ZVRhYiA9IDA7XG4gICAgICB2YXIgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgaWYgKHZpZXdwb3J0V2lkdGggPj0gNjAwICYmICQoJy5hbWFfX3Jlc291cmNlLXRhYnMnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRlZmF1bHRBY3RpdmVUYWIgPSAxO1xuICAgICAgfVxuXG4gICAgICAkKFwiLmFtYV9fdGFicywgLmFtYV9fcmVzb3VyY2UtdGFic1wiKS50YWJzKHtcbiAgICAgICAgYWN0aXZlOiBkZWZhdWx0QWN0aXZlVGFiLFxuICAgICAgICBhY3RpdmF0ZTogcmVtb3ZlSGlnaGxpZ2h0c1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFByZXZlbnQganVtcCBvbmNsaWNrXG4gICAgICAkKCcudWktdGFicy1hbmNob3InKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vU2ltdWxhdGUgY2xpY2sgZXZlbnQgb24gYWN0dWFsIHNpbXBsZVRhYnMgdGFiIGZyb20gbW9iaWxlIGRyb3AgZG93bi5cbiAgICAgICQoJy5hbWFfX3RhYnMtbmF2aWdhdGlvbi0tbW9iaWxlIHNlbGVjdCcpLm9uKFwic2VsZWN0bWVudWNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZFZhbHVlID0gdWkuaXRlbS52YWx1ZTtcbiAgICAgICAgJCgnYVtocmVmPVwiIycgKyBzZWxlY3RlZFZhbHVlICsgJ1wiXScpLmNsaWNrKCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gV2hlbiBjbGlja2luZyBhbiBpbmxpbmUgcmVzb3VyY2UgcGFnZSBsaW5rIHJlZmVyZW5jaW5nIGEgdGFiLCBvcGVuIHJlZmVyZW5jZWQgdGFiLlxuICAgICAgJCgnLmFtYV9fcmVzb3VyY2UtbGluay0taW5saW5lLCAuYW1hX19wYWdlLS1yZXNvdXJjZV9fcmVzb3VyY2UtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciAkdGFicyA9ICQoJy5hbWFfX3Jlc291cmNlLXRhYnMnKTtcbiAgICAgICAgc3dpdGNoVGFicygkdGFicywgdGhpcyk7XG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gcmVtb3ZlSGlnaGxpZ2h0cygpIHtcbiAgICAgICAgJCgnLmFtYV9yZXNvdXJjZS1oZWFkZXItLWhpZ2hsaWdodCcpLnJlbW92ZUNsYXNzKCdhbWFfcmVzb3VyY2UtaGVhZGVyLS1oaWdobGlnaHQnKTtcbiAgICAgIH1cblxuICAgICAgLypcbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gYW5pbWF0ZXMgdGhlIGJyb3dzZXIgc2Nyb2xsIGFjdGlvbiB3aXRoIGF0dGVudGlvbiB0byBrZXlib2FyZCBvbmx5IGFjY2Vzc2liaWxpdHkgY29uY2VybnNcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICR0YWJOYXZcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5IE9iamVjdH0gJHRhcmdldFxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoJHRhYk5hdiwgdGFiSGFzaCwgcG9zaXRpb25JblRhYikge1xuICAgICAgICB2YXIgc2Nyb2xsVGFyZ2V0ID0gd2luZG93LmlubmVyV2lkdGggPj0gMTIwMCA/ICcuYW1hX19yZXNvdXJjZS10YWJzX19jb250ZW50JyA6ICdodG1sLGJvZHknO1xuXG4gICAgICAgIC8vIFJlbW92ZSBwcmV2aW91cyBoaWdobGlnaHRzLCBpZiBhbnlcbiAgICAgICAgcmVtb3ZlSGlnaGxpZ2h0cygpO1xuXG4gICAgICAgIC8vIFRyeSB0byBmaW5kIHRhcmdldCBlbGVtZW50IG9mZnNldCwgYnV0IGRlZmF1bHQgdG8gemVyb1xuICAgICAgICB2YXIgc2Nyb2xsUG9zaXRpb24gPSAwO1xuICAgICAgICB2YXIgJHRhcmdldDtcbiAgICAgICAgaWYgKHBvc2l0aW9uSW5UYWIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciB0YWJFbGVtZW50cyA9ICQodGFiSGFzaCArICcgLmFtYV9fcmVzb3VyY2UtdGFic19faXRlbScpO1xuICAgICAgICAgIGlmICh0YWJFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIElmIGRlc2lyZWQgcG9zaXRpb24gaXMgbGFyZ2VyIHRoYW4gdGhlIHJlc3VsdCBzZXQsIHVzZSB0aGUgbGFzdCBlbGVtZW50XG4gICAgICAgICAgICBpZiAodGFiRWxlbWVudHMubGVuZ3RoIDw9IHBvc2l0aW9uSW5UYWIpIHtcbiAgICAgICAgICAgICAgcG9zaXRpb25JblRhYiA9IHRhYkVsZW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVzZXJzIGFyZSBpbnN0cnVjdGVkIHRvIGNvbnNpZGVyIDEgYXMgdGhlIGZpcnN0IGVsZW1lbnRcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0YWJFbGVtZW50c1twb3NpdGlvbkluVGFiIC0gMV07XG4gICAgICAgICAgICBzY3JvbGxQb3NpdGlvbiA9IHRhcmdldC5vZmZzZXRUb3A7XG4gICAgICAgICAgICAvLyBBZGQgaGlnaGxpZ2h0IHRvIHRhcmdldFxuICAgICAgICAgICAgJHRhcmdldCA9ICQodGFyZ2V0KS5maW5kKCcuYW1hX3Jlc291cmNlLWhlYWRlcicpOyAvLyBzYXZlIGZvciB1c2UgaW4gYW5pbWF0ZSgpIGNhbGxiYWNrXG4gICAgICAgICAgICAkdGFyZ2V0LmFkZENsYXNzKCdhbWFfcmVzb3VyY2UtaGVhZGVyLS1oaWdobGlnaHQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHRhcmdldCA9ICQodGFiSGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICQoc2Nyb2xsVGFyZ2V0KS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFBvc2l0aW9uXG4gICAgICAgIH0sIDg1MCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIFVwZGF0ZSBmb2N1cyBmb3Iga2V5Ym9hcmQgb25seSBuYXZpZ2F0aW9uXG4gICAgICAgICAgJHRhcmdldC5hdHRyKCd0YWJpbmRleCcsICctMScpLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgKiBUaGlzIGZ1bmN0aW9uIG9wZW5zIHJlZmVyZW5jZWQgdGFicyBmcm9tIGlubGluZSBsaW5rc1xuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5IE9iamVjdH0gJHRhYk9iaiBUaGUgZWxlbWVudCB3aGljaCBoYXMgdGhlIC50YWIoKSBmdW5jdGlvbiBhdHRhY2hlZC5cbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gbGlua1xuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBzd2l0Y2hUYWJzKCR0YWJPYmosIGxpbmspIHtcblxuICAgICAgICB2YXIgbGlua0hhc2ggPSBsaW5rLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgICAgIHZhciB3aWRnZXQgPSAkdGFiT2JqLmRhdGEoJ3VpLXRhYnMnKTtcblxuICAgICAgICB2YXIgdGFiSGFzaCwgcG9zaXRpb25JblRhYjtcbiAgICAgICAgdmFyIHBhcnRzID0gbGlua0hhc2guc3BsaXQoJy0nKTtcbiAgICAgICAgdGFiSGFzaCA9IHBhcnRzWzBdO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHBvc2l0aW9uSW5UYWIgPSBwYXJ0c1sxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBvbGQgbGluaywgdHJ5IHRvIGRldGVybWluZSBwb3NpdGlvbiBmcm9tIGxpbmsgdGV4dFxuICAgICAgICAgIHZhciBtYXRjaGVzID0gbGluay5pbm5lclRleHQubWF0Y2goLyhbMC05XSspL2cpO1xuICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICBwb3NpdGlvbkluVGFiID0gbWF0Y2hlcy5zaGlmdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVuc3VyZSBjb3JyZWN0IHRhYiBpcyBhY3RpdmVcbiAgICAgICAgdmFyIHRhYkluZGV4ID0gd2lkZ2V0Ll9nZXRJbmRleCh0YWJIYXNoKTtcbiAgICAgICAgJHRhYk9iai50YWJzKHtcbiAgICAgICAgICBhY3RpdmU6IHRhYkluZGV4XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNjcm9sbCB0byB0b3Agb2YgdWkgdGFicyBuYXZpZ2F0aW9uXG4gICAgICAgIHNtb290aFNjcm9sbCgkdGFiT2JqLCB0YWJIYXNoLCBwb3NpdGlvbkluVGFiKTtcblxuICAgICAgICAvLyBTdG9wIGJ1YmJsaW5nIGFuZCBkZWZhdWx0IGFjdGlvbnNcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qPT09PT09IGpRdWVyeSBVSSBhY2NvcmRpb24gPT09PT09Ki9cblxuKGZ1bmN0aW9uKCQpIHtcbiAgICAkKCBcIi5hbWFfX2FjY29yZGlvblwiICkuYWNjb3JkaW9uKHtcbiAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiLFxuICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgIH0pO1xufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIHZhciB2ZXJpZnlGaWVsZHMgPSBmdW5jdGlvbihmb3JtKSB7XG4gICAgdmFyICRzZWN0aW9ucyA9IGZvcm0uZmluZCgnc2VjdGlvbicpO1xuICAgIHZhciAkaW5wdXRzID0gJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIHNlY3Rpb24gKicpLmZpbHRlcignOmlucHV0Jyk7XG4gICAgdmFyICRpY29uRWxlbWVudCA9ICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKTtcbiAgICB2YXIgZXJyb3JTZWN0aW9ucyA9IFtdO1xuXG4gICAgJGlucHV0cy5lYWNoKGZ1bmN0aW9uKGksIGlucHV0KSB7XG4gICAgICAkY2xvc2VzdFNlY3Rpb24gPSAkKHRoaXMpLmNsb3Nlc3QoJ3NlY3Rpb24nKS5hdHRyKCdkYXRhLWRydXBhbC1zZWxlY3RvcicpLnRvU3RyaW5nKCk7XG4gICAgICBpZiAoJCh0aGlzKS5wcm9wKCdyZXF1aXJlZCcpICYmICQodGhpcykuaGFzQ2xhc3MoJ2Vycm9yJykpIHtcbiAgICAgICAgZXJyb3JTZWN0aW9ucy5wdXNoKCRjbG9zZXN0U2VjdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkc2VjdGlvbnMuZWFjaChmdW5jdGlvbihpLCBzZWN0aW9uKSB7XG4gICAgICBpZiAoJC5pbkFycmF5KCQodGhpcykuYXR0cignZGF0YS1kcnVwYWwtc2VsZWN0b3InKS50cmltKCkudG9TdHJpbmcoKSwgZXJyb3JTZWN0aW9ucykgIT09IC0xKSB7XG4gICAgICAgICQodGhpcykuZmluZCgkaWNvbkVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlZGl0IGVycm9yIGNvbXBsZXRlZCcpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICQodGhpcykuZmluZCgkaWNvbkVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlZGl0IGVycm9yIGNvbXBsZXRlZCcpLmFkZENsYXNzKCdjb21wbGV0ZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBmdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKGVtYWlsKSB7XG4gICAgdmFyIGVtYWlsUmVnID0gL14oW1xcdy1cXC5dK0AoW1xcdy1dK1xcLikrW1xcdy1dezIsNH0pPyQvO1xuICAgIHJldHVybiBlbWFpbFJlZy50ZXN0KGVtYWlsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpZWxkSXNSZXF1aXJlZChpbnB1dCkge1xuICAgIGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xuICAgIGlucHV0Lm5leHQoKS5yZW1vdmUoJy5mb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2UnKTtcbiAgICBpbnB1dC5hZnRlcignPGRpdiBjbGFzcz1cImZvcm0taXRlbS0tZXJyb3ItbWVzc2FnZVwiPkZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tGaWVsZChpbnB1dCkge1xuICAgIGlmIChpbnB1dC5wcm9wKCdyZXF1aXJlZCcpICYmIChpbnB1dC52YWwoKS5sZW5ndGggPT09IDAgfHwgaW5wdXQudmFsKCkgPT09IFwiXCIpKSB7XG4gICAgICBmaWVsZElzUmVxdWlyZWQoaW5wdXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmIChpbnB1dC5hdHRyKCd0eXBlJykgPT09ICdlbWFpbCcgJiYgIXZhbGlkYXRlRW1haWwoaW5wdXQudmFsKCkpKSB7XG4gICAgICAgIGZpZWxkSXNSZXF1aXJlZChpbnB1dCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaW5wdXQucmVtb3ZlQ2xhc3MoJ2Vycm9yJykubmV4dCgpLnJlbW92ZSgnLmZvcm0taXRlbS0tZXJyb3ItbWVzc2FnZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFN1Ym1pdHMgZmlyc3QgcGFnZSBvZiBDb250YWN0IFVzIGZvcm0gb24gcmFkaW8gYnV0dG9uIHNlbGVjdGlvblxuICAkLmZuLmNvbnRhY3RTdWJtaXQgPSBmdW5jdGlvbigpe1xuICAgIHZhciAkd2ViZm9ybV9idXR0b25zID0gJCgnLndlYmZvcm0tc3VibWlzc2lvbi1jb250YWN0LXVzLWZvcm0gaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XG4gICAgJHdlYmZvcm1fYnV0dG9ucy5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tY29udGFjdC11cy1mb3JtJykuc3VibWl0KCk7XG4gICAgfSk7XG4gIH1cbiAgJC5mbi5jb250YWN0U3VibWl0KCk7XG4gICQoIGRvY3VtZW50ICkuYWpheENvbXBsZXRlKGZ1bmN0aW9uKCkge1xuICAgICQuZm4uY29udGFjdFN1Ym1pdCgpO1xuICB9KTtcblxuICAvLyBHbyBiYWNrIHRvIHByZXZpb3VzIGJhY2sgaXMgdXNlciBjbGlja3MgZGVjbGluZSBzdWJtaXQgYnV0dG9uXG4gICQoJy5hbWFfX2J1dHRvbi0tZGVjbGluZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIgPT09IFwiXCIpIHtcbiAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWY9Jy8nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhpc3RvcnkuYmFjaygpO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGluaXRpYWxMb2FkID0gdHJ1ZTtcblxuICBEcnVwYWwuYmVoYXZpb3JzLndlYkZvcm0gPSB7XG4gICAgZGV0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MsIHRyaWdnZXIpIHtcbiAgICAgIGlmICh0cmlnZ2VyID09PSAnc2VyaWFsaXplJykge1xuICAgICAgICBpbml0aWFsTG9hZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIGlmICghaW5pdGlhbExvYWQpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0LmlubmVyVGV4dC5tYXRjaChcIkVycm9yIG1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAkKCcuYW1hX19zYWxlcy1sYW5kaW5nLXBhZ2VfX2Zvcm1fX2hlYWRpbmcnKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJC52YWxpZGF0b3IuYWRkTWV0aG9kKFxuICAgICAgICBcInJlZ2V4XCIsXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlLCBlbGVtZW50LCByZWdleHApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25hbChlbGVtZW50KSB8fCByZWdleHAudGVzdCh2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIFwiUGxlYXNlIGNoZWNrIHlvdXIgaW5wdXQuXCJcbiAgICAgICk7XG5cbiAgICAgIC8vIE9uIHdlYmZvcm0gc3VibWl0IGNoZWNrIHRvIHNlZSBpZiBhbGwgaW5wdXRzIGFyZSB2YWxpZFxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtJykudmFsaWRhdGUoe1xuICAgICAgICBpZ25vcmU6IFtdLFxuICAgICAgICBydWxlczoge1xuICAgICAgICAgICdlbWFpbCc6IHtcbiAgICAgICAgICAgIGVtYWlsOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICAndGVsZXBob25lJzoge1xuICAgICAgICAgICAgJ3JlZ2V4JzogL14oXFwrXFxkezEsMn1cXHMpP1xcKD9cXGR7M31cXCk/W1xccy4tXT9cXGR7M31bXFxzLi1dP1xcZHs0fSQvXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnYmlydGhfeWVhcic6IHtcbiAgICAgICAgICAgICdyZWdleCc6IC9eKDE5fDIwKVxcZHsyfSQvXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24oZXJyb3IsIGVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAoZWxlbWVudC5hdHRyKFwidHlwZVwiKSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50LnBhcmVudCgpLnNpYmxpbmdzKCkubGFzdCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZWxlbWVudC5pcyhcInNlbGVjdFwiKSkge1xuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudC5uZXh0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0sIHZhbGlkYXRvcikge1xuICAgICAgICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0b3IubnVtYmVyT2ZJbnZhbGlkcygpO1xuICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZigkKCcuanMtZm9ybS10eXBlLXJhZGlvJykuZmluZCgnbGFiZWwuZXJyb3InKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICQoJy5qcy1mb3JtLXR5cGUtcmFkaW8gbGFiZWwuZXJyb3InKS5wYXJlbnRzKCcuZmllbGRzZXQtd3JhcHBlcicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBpbnB1dHMgYXJlIHZhbGlkXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBsYWJlbC5lcnJvcicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYoICQodGhpcykudGV4dCgpICE9PSAnJykge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEFkZCB2YWxpZGF0aW9uIHRvIHNlbGVjdCBkcm9wZG93biBtZW51cyB1c2luZyBqUXVlcnkgVUlcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBzZWxlY3QnKS5zZWxlY3RtZW51KHtcbiAgICAgICAgc3R5bGU6ICdkcm9wZG93bicsXG4gICAgICAgIHRyYW5zZmVyQ2xhc3NlczogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJChcIi53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybVwiKS52YWxpZGF0ZSgpLmVsZW1lbnQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfbWFpbk5hdmlnYXRpb24gPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgdmFyICRjYXRlZ29yeU5hdldyYXBwZXIgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fd3JhcHBlcicpLFxuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnUnKSxcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2dyb3VwJyksXG4gICAgICAgICAgJG1vYmlsZVNlYXJjaFRyaWdnZXIgPSAkKCcuZ2xvYmFsLXNlYXJjaC10cmlnZ2VyJyksXG4gICAgICAgICAgJG1vYmlsZVNlYXJjaCA9ICQoJy5hbWFfX2dsb2JhbC1zZWFyY2gnKSxcbiAgICAgICAgICAkbWFpbk5hdiA9ICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAnKSxcbiAgICAgICAgICAkc3ViTWVudSA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19zdWJtZW51JyksXG4gICAgICAgICAgJHN1Yk1lbnVBcnRpY2xlID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2FydGljbGVzJyksXG4gICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSAwLFxuICAgICAgICAgIHByb2R1Y3ROYXZIZWlnaHQgPSAwLFxuICAgICAgICAgIGNhdGVnb3J5TmF2TWVudUhlaWdodCA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51Jykub3V0ZXJIZWlnaHQoKSxcbiAgICAgICAgICBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0ID0gMCxcbiAgICAgICAgICB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpLFxuICAgICAgICAgICRhbGVydF9iYW5uZXIgPSAkKCcuYW1hX19hbGVydF9fd3JhcCcpO1xuXG4gICAgICAvLyBDaGVja3MgaWYgdXNlciBhZ2VudCBpcyBhIG1vYmlsZSBkZXZpY2VcbiAgICAgIHZhciBkZXZpY2VBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhciBhZ2VudElEID0gZGV2aWNlQWdlbnQubWF0Y2goLyhhbmRyb2lkfHdlYm9zfGlwaG9uZXxpcG9kfGJsYWNrYmVycnkpLykgJiYgd2luZG93V2lkdGggPCA3Njg7XG5cbiAgICAgIC8vIFNldCBhbGVydCBiYW5uZXIgaGVpZ2h0IGlmIHByZXNlbnQuXG4gICAgICBpZigkYWxlcnRfYmFubmVyLmxlbmd0aCAmJiAkYWxlcnRfYmFubmVyLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgIGFsZXJ0QmFubmVySGVpZ2h0ID0gJGFsZXJ0X2Jhbm5lci5vdXRlckhlaWdodCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnRCYW5uZXJIZWlnaHQgPSAwO1xuICAgICAgfVxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGV0aGVyIG9yIG5vdCB0aGUgY2F0ZWdvcnkgbmF2IHNob3VsZCBoYXZlIHNjcm9sbGJhcnNcbiAgICAgIGZ1bmN0aW9uIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KSB7XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHZpZXdwb3J0IGhlaWdodCBpcyBwYXNzZWQgYmFjayB3aGVuIHRoZSB3aW5kb3cgZ2V0cyByZXNpemVkXG4gICAgICAgIGlmKHR5cGVvZiByZXNpemVWaWV3cG9ydEhlaWdodCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHJlc2l6ZVZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFdpbmRvdyBoZWlnaHQgaXMgdXNlZCBieSBkZWZhdWx0XG4gICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdWJ0cmFjdCB0aGUgbmF2aWdhdGlvbiBoZWlnaHQgZnJvbSB3aW5kb3cgaGVpZ2h0IHRvIGFzc2VzcyBjb250ZW50IGhlaWdodFxuICAgICAgICBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBtYWluIG1lbnUgcHVycGxlIGRyb3Bkb3duIGhlaWdodCBpcyBsYXJnZXIgdGhhbiB2aWV3cG9ydCBoZWlnaHRcbiAgICAgICAgaWYgKGNhdGVnb3J5TmF2TWVudUhlaWdodCArICRtYWluTmF2Lm91dGVySGVpZ2h0KCkgKyBwcm9kdWN0TmF2SGVpZ2h0ID4gdmlld3BvcnRIZWlnaHQgJiYgIWFnZW50SUQpIHtcblxuICAgICAgICAgIC8vIFNldCB0aGUgbWVudSBkcm9wZG93biB0aGUgc2FtZSBhcyB2aWV3cG9ydCB0byBlbmFibGUgc2Nyb2xsaW5nXG4gICAgICAgICAgdmFyIGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQgPSBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0IC0gJG1haW5OYXYub3V0ZXJIZWlnaHQoKSAtIHByb2R1Y3ROYXZIZWlnaHQgLSBhbGVydEJhbm5lckhlaWdodDtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLmFkZENsYXNzKCdzY3JvbGwnKS5vdXRlckhlaWdodChjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKTtcblxuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAub24oJ3Nob3cuc21hcGknLCBmdW5jdGlvbihlLCBtZW51KSB7XG4gICAgICAgICAgICBpZigkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fc3VibWVudScsIG1lbnUpLm91dGVySGVpZ2h0KCkgPiBjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19zdWJtZW51JywgbWVudSkub3V0ZXJIZWlnaHQoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19hcnRpY2xlcycsIG1lbnUpLm91dGVySGVpZ2h0KCkgPiBjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19hcnRpY2xlcycsIG1lbnUpLm91dGVySGVpZ2h0KGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpLmFkZENsYXNzKCdvbmVfYXJ0aWNsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAucmVtb3ZlQ2xhc3MoJ3Njcm9sbCcpLm91dGVySGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgJHN1Yk1lbnUub3V0ZXJIZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAkc3ViTWVudUFydGljbGUub3V0ZXJIZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIC8vIEhpZGUvU2hvdyBtZW51XG4gICAgICBmdW5jdGlvbiBoaWRlU2hvdygpIHtcbiAgICAgICAgaWYgKCQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51LnNsaWRlRG93bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoKGNhdGVnb3J5TmF2TWVudUhlaWdodCArICAkbWFpbk5hdi5vdXRlckhlaWdodCgpICsgcHJvZHVjdE5hdkhlaWdodCArIGFsZXJ0QmFubmVySGVpZ2h0KSA+IHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgICAgICAgIGJvZHlTY3JvbGxMb2NrLmRpc2FibGVCb2R5U2Nyb2xsKCRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAsIHtcbiAgICAgICAgICAgICAgICBhbGxvd1RvdWNoTW92ZTogZnVuY3Rpb24gYWxsb3dUb3VjaE1vdmUoZWwpIHtcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChlbCAmJiBlbCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdib2R5LXNjcm9sbC1sb2NrLWlnbm9yZScpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhZ2VudElEKSB7XG4gICAgICAgICAgICAgIC8vIE9ubHkgbWFrZSB0aGUgbWVudSBoZWlnaHQgc2FtZSBhcyB2aWV3cG9ydCBvbiBtb2JpbGUgZGV2aWNlc1xuICAgICAgICAgICAgICB2YXIgbW9iaWxlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICAgICAgICAkY2F0ZWdvcnlOYXZXcmFwcGVyLmhlaWdodChtb2JpbGVIZWlnaHQpLmFkZENsYXNzKCdzY3JvbGwnKTtcblxuICAgICAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLm9uKCdzaG93LnNtYXBpJywgZnVuY3Rpb24oZSwgbWVudSkge1xuICAgICAgICAgICAgICAgIGlmKCQobWVudSkub3V0ZXJIZWlnaHQoKSA+IG1vYmlsZUhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgJChtZW51KS5vdXRlckhlaWdodChtb2JpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgICAgIGNhdGVnb3J5TmF2SGVpZ2h0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuc2xpZGVVcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhlaWdodCgwKTtcbiAgICAgICAgICAgIGJvZHlTY3JvbGxMb2NrLmNsZWFyQWxsQm9keVNjcm9sbExvY2tzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ2xvc2VzIG1lbnUgb24gZG9jIGxvYWRcbiAgICAgICQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICAgICQoJy5hbWFfX2dsb2JhbC1tZW51JykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaGlkZVNob3coKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZiBzdGlja3kgbmF2IHdyYXBwZXIsIHJlbW92ZSBpZCB0byBwcmV2ZW50IGR1cGxpY2F0ZSBpZHMuXG4gICAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHN0aWNreVdyYXBwZXIgPSAkKCcuc3RpY2t5LXdyYXBwZXInKTtcbiAgICAgICAgaWYoJHN0aWNreVdyYXBwZXIubGVuZ3RoICYmICRzdGlja3lXcmFwcGVyLmhhcygnI3NoYXJlLXdyYXBwZXInKSkge1xuICAgICAgICAgICRzdGlja3lXcmFwcGVyLnJlbW92ZUF0dHIoJ2lkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZiBhIHVzZXIgY2xpY2tzIG91dHNpZGUgdGhlIG1lbnUgdGhlbiBjbG9zZSBpdFxuICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCEkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5pcyhlLnRhcmdldCkgJiYgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgIGhpZGVTaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKCRtb2JpbGVTZWFyY2hUcmlnZ2VyKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkbW9iaWxlU2VhcmNoLnNsaWRlVG9nZ2xlKCk7XG4gICAgICAgICRtb2JpbGVTZWFyY2hUcmlnZ2VyLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICB9KTtcblxuICAgICAgLy9TZXQgZm9jdXMgc3RhdGUgb24gbW9iaWxlIHRyaWdnZXIgYnV0dG9uXG4gICAgICAkKCRtb2JpbGVTZWFyY2hUcmlnZ2VyKS5mb2N1cyhmdW5jdGlvbigpe1xuICAgICAgICAkbW9iaWxlU2VhcmNoVHJpZ2dlci5jc3MoJ291dGxpbmUnLCAnb3V0bGluZTogMnB4IHNvbGlkICM4MGQ0ZjUnKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBtb3ZlU29jaWFsU2hhcmVQb3NpdGlvbigpe1xuICAgICAgICB2YXIgbWFpbk5hdlBvc2l0aW9uID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uIC5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICB2YXIgJGFtYVNvY2lhbFNoYXJlID0gJCgnLmFtYV9fc29jaWFsLXNoYXJlJyk7XG5cbiAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBlbm91Z2ggZm9yIHRoZSBzdGlja3kgbmF2XG4gICAgICAgIGlmKG1haW5OYXZQb3NpdGlvbiA+IDYwKSB7XG5cbiAgICAgICAgICB2YXIgc29jaWFsU3RpY2t5UG9zaXRpb24gPSBtYWluTmF2UG9zaXRpb24gLSA2MDtcbiAgICAgICAgICB2YXIgJHNvY2lhbEljb25zID0gJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJyk7XG5cbiAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdmlld3BvcnQgd2lkdGggaXMgZ3JlYXRlciA4NTBweCB0aGVuIHRoZSBzb2NpYWwgaWNvbnMgd2lsbCBiZSBzdGlja3lcbiAgICAgICAgICBpZigkc29jaWFsSWNvbnMubGVuZ3RoICYmICQod2luZG93KS53aWR0aCgpID4gODUwKSB7XG4gICAgICAgICAgICAkc29jaWFsSWNvbnMuc3RpY2t5KHtcbiAgICAgICAgICAgICAgd3JhcHBlckNsYXNzTmFtZTogJ2FtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlLXdyYXBwZXInLFxuICAgICAgICAgICAgICB6SW5kZXg6IDUwMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRzb2NpYWxJY29ucy5vbignc3RpY2t5LXN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAkYW1hU29jaWFsU2hhcmUuYWRkQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmNzcygnbGVmdCcsIHNvY2lhbFN0aWNreVBvc2l0aW9uKS5oaWRlKCkuZmFkZVRvKCdzbG93JywgMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNvY2lhbEljb25zLm9uKCdzdGlja3ktdXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAkYW1hU29jaWFsU2hhcmUuYWRkQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmhpZGUoKS5mYWRlVG8oJ3Nsb3cnLCAxKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkc29jaWFsSWNvbnMub24oJ3N0aWNreS1lbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5yZW1vdmVDbGFzcygnYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSW5pdGlhbGl6ZSBnZXRTb2NpYWxTaGFyZSgpXG4gICAgICBtb3ZlU29jaWFsU2hhcmVQb3NpdGlvbigpO1xuXG4gICAgICAvLyBPbnNjcm9sbCBjaGVjayB0byBzZWUgaWYgc29jaWFsIGljb24gcG9zaXRpb24gaXMgZ3JlYXRlciB0aGFuIGZvb3RlciBwb3NpdGlvblxuICAgICAgdmFyIGRlYm91bmNlX3RpbWVyO1xuICAgICAgaWYoJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlIC5hbWFfX3NvY2lhbC1zaGFyZScpLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyICRzb2NpYWxJY29ucyA9ICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZSAuYW1hX19zb2NpYWwtc2hhcmUnKTtcbiAgICAgICAgICB2YXIgc29jaWFsSWNvblBvc2l0aW9uQm90dG9tID0gJHNvY2lhbEljb25zLm9mZnNldCgpLnRvcCArICRzb2NpYWxJY29ucy5vdXRlckhlaWdodCgpO1xuICAgICAgICAgIHZhciBmb290ZXJQb3NpdGlvbiA9ICQoJ2Zvb3RlcicpLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgIGlmKGRlYm91bmNlX3RpbWVyKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGRlYm91bmNlX3RpbWVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWJvdW5jZV90aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoc29jaWFsSWNvblBvc2l0aW9uQm90dG9tID4gZm9vdGVyUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJykuZmFkZU91dCgnZmFzdCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJykuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuXG4gICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVzaXplVmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KTtcbiAgICAgIH0pO1xuXG4gICAgICAvL0NoZWNrcyB0aGUgbGF5b3V0IHBvc2l0aW9uIG9mIGFydGljbGUgb24gd2luZG93IHJlc2l6ZSBhbmQgbW92ZXMgdGhlIHNvY2lhbCBpY29ucyBhY2NvcmRpbmdseVxuICAgICAgJCggd2luZG93ICkucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWFnZW50SUQpIHtcbiAgICAgICAgICB2YXIgcmVzaXplVmlld3BvcnRIZWlnaHQgPSAkKHdpbmRvdykuaW5uZXJIZWlnaHQoKTtcbiAgICAgICAgICB2YXIgbWFpbk5hdlBvc2l0aW9uVXBkYXRlID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uIC5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0IC0gMTAwO1xuXG4gICAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQocmVzaXplVmlld3BvcnRIZWlnaHQpO1xuICAgICAgICAgICQoJy5hbWFfX3NvY2lhbC1zaGFyZS5hbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5jc3MoJ2xlZnQnLCBtYWluTmF2UG9zaXRpb25VcGRhdGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy9JZiBlbXB0eSBvciBvdGhlcndpc2UgdW5wb3B1bGF0ZWQgc2VhcmNoIGZpZWxkIChpLmUgc3BhY2VzIG9ubHkpXG4gICAgICAvL3ByZXZlbnQgc2VhcmNoIGZyb20gc3VibWl0dGluZyBhbmQgcmVsb2FkIGN1cnJlbnQgcGFnZVxuICAgICAgdmFyIHNlYXJjaEZvcm0gPSAkKFwiZm9ybVtpZF49J2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaC1zb2xycGFnZSddXCIpO1xuXG4gICAgICAkKHNlYXJjaEZvcm0sIHRoaXMpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIHNlYXJjaElucHV0ID0gJCh0aGlzKS5maW5kKFwiaW5wdXRbbmFtZSo9J3NlYXJjaCddXCIpO1xuXG4gICAgICAgICAgLy9UcmltIGFuZCBjaGVjayBpZiBzZWFyY2ggaW5wdXQgaGFzIGFueSB2YWx1ZVxuICAgICAgICAgIGlmICgkLnRyaW0oc2VhcmNoSW5wdXQudmFsKCkpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBzZWFyY2ggdGVybSBlbnRlcmVkJyk7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL0Vuc3VyZSBubyBzcGFjZXMgYmVmb3JlIG9yIGFmdGVyIHF1ZXJ5IGFyZSBjb3VudGVkIGluIHNlYXJjaFxuICAgICAgICAgICQodGhpcykuZmluZChzZWFyY2hJbnB1dCkuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy9TdWJtaXQgdHJpbW1lZCB2YWx1ZVxuICAgICAgICAgICAgJCh0aGlzKS52YWwoJC50cmltKCQodGhpcykudmFsKCkpKTtcbiAgICAgICAgICB9KTsgICBcbiAgICAgICAgICBcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcblxuXG5cbiIsIi8qKlxuICogU21hcnRNZW51cyBqUXVlcnkgUGx1Z2luIC0gdjEuMS4wIC0gU2VwdGVtYmVyIDE3LCAyMDE3XG4gKiBodHRwOi8vd3d3LnNtYXJ0bWVudXMub3JnL1xuICpcbiAqIENvcHlyaWdodCBWYXNpbCBEaW5rb3YsIFZhZGlrb20gV2ViIEx0ZC5cbiAqIGh0dHA6Ly92YWRpa29tLmNvbVxuICpcbiAqIExpY2Vuc2VkIE1JVFxuICovXG5cblxualF1ZXJ5KCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fZ3JvdXAnKS5zbWFydG1lbnVzKHtcbiAgc3ViSW5kaWNhdG9yc1BvczogJ2FwcGVuZCdcbn0pO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfc2lnbkluTWVudSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgdmFyICRzaWduSW5Ecm9wZG93biA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd24nKTtcbiAgICAgIHZhciAkc2lnbkluRHJvcGRvd25NZW51ID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bl9fbWVudScpO1xuICAgICAgdmFyICRzaWduSW5MaW5rID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bl9fdGV4dCcpO1xuICAgICAgdmFyICRleHBsb3JlTWVudSA9ICQoJy5hbWFfX2V4cGxvcmUtbWVudScpO1xuICAgICAgdmFyICRleHBsb3JlTWVudURyb3Bkb3duID0gJCgnLmFtYV9fZXhwbG9yZS1tZW51X19tZW51Jyk7XG5cbiAgICAgIGZ1bmN0aW9uIGRyb3Bkb3duRG93bk1lbnUocGFyZW50RWxlbWVudCwgbWVudUVsZW1lbnQpIHtcbiAgICAgICBwYXJlbnRFbGVtZW50LnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVG9nZ2xlKCk7XG4gICAgICAgICAgJChwYXJlbnRFbGVtZW50KS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9wIGxpbmsgZnJvbSBmaXJpbmdcbiAgICAgICAgJHNpZ25JbkxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgb2YgdGhlIGNsaWNrIGlzbid0IHRoZSBjb250YWluZXIgbm9yIGEgZGVzY2VuZGFudCBvZiB0aGUgY29udGFpbmVyXG4gICAgICAgICAgaWYgKCFwYXJlbnRFbGVtZW50LmlzKGUudGFyZ2V0KSAmJiBwYXJlbnRFbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XG4gICAgICAgICAgICAkKHBhcmVudEVsZW1lbnQpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU2V0IHRpbWVvdXQgZm9yIHdoZW4gYSB1c2VyIG1vdXNlcyBvdXQgb2YgdGhlIG1lbnVcbiAgICAgICAgICBwYXJlbnRFbGVtZW50Lm1vdXNlZW50ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCgpO1xuICAgICAgICAgIH0pLm1vdXNlbGVhdmUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJChtZW51RWxlbWVudCkuc2xpZGVVcCgpO1xuICAgICAgICAgICAgICAkKHBhcmVudEVsZW1lbnQpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGRyb3Bkb3duRG93bk1lbnUoJHNpZ25JbkRyb3Bkb3duLCAkc2lnbkluRHJvcGRvd25NZW51KTtcbiAgICAgIGRyb3Bkb3duRG93bk1lbnUoJGV4cGxvcmVNZW51LCAkZXhwbG9yZU1lbnVEcm9wZG93bik7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfc2VhcmNoX2NoZWNrYm94ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciAkY2F0ZWdvcnlTZWFyY2hJbnB1dCA9ICQoJyNzZWFyY2hfY2F0ZWdvcnknKTtcbiAgICAgIHZhciAkY2F0ZWdvcnlTZWFyY2hMaXN0ID0gJCgnLmZhY2V0cy13aWRnZXQtY2hlY2tib3ggdWwgbGknKTtcbiAgICAgIHZhciAkY2xlYXJTZWFyY2hGaWx0ZXIgPSAkKCcjYXBwbGllZEZpbHRlcnNSZW1vdmUnKTtcblxuICAgICAgLy8gRmlsdGVyIGxpc3QgdXNpbmcgalF1ZXJ5IGZpbHRlclxuICAgICAgZnVuY3Rpb24gZmlsdGVyTGlzdChzZWFyY2hCb3gsIGxpc3QpIHtcbiAgICAgICAgc2VhcmNoQm94LmtleXVwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgJHJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnZhbHVlLCAnaScpO1xuICAgICAgICAgIGxpc3QuaGlkZSgpLmZpbHRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHJlZ2V4LnRlc3QoJC50cmltKCQodGhpcykudGV4dCgpKSk7XG4gICAgICAgICAgfSkuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xlYXIgZmlsdGVyXG4gICAgICBmdW5jdGlvbiBjbGVhZkZpbHRlckxpc3QoY2xlYXJTZWFyY2hGaWx0ZXIpIHtcbiAgICAgICAgY2xlYXJTZWFyY2hGaWx0ZXIuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJGNhdGVnb3J5U2VhcmNoSW5wdXQudmFsKCcnKTtcbiAgICAgICAgICAkY2F0ZWdvcnlTZWFyY2hJbnB1dC50cmlnZ2VyKCdrZXl1cCcpO1xuXG4gICAgICAgICAgJCgnLmZhY2V0cy13aWRnZXQtY2hlY2tib3ggdWwgbGkgW3R5cGU9Y2hlY2tib3hdJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICQoJyNibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2gtc29scnBhZ2UtMicpLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSW52b2tlIGZpbHRlciBsaXN0XG4gICAgICBmaWx0ZXJMaXN0KCRjYXRlZ29yeVNlYXJjaElucHV0LCAkY2F0ZWdvcnlTZWFyY2hMaXN0KTtcblxuICAgICAgLy8gSW52b2tlIGNsZWFyIGZpbHRlclxuICAgICAgY2xlYWZGaWx0ZXJMaXN0KCRjbGVhclNlYXJjaEZpbHRlcik7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogYnAgY2FsY3VsYXRvci5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gJ2Fub255bW91cyBjbG9zdXJlJy4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5icENhbGN1bGF0b3IgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgLy8gQ2xvbmUgbGFzdCByb3cgb2YgdGFibGVcbiAgICAgICQoJy5hZGQtYnAtcm93JykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciAkdGFibGVCb2R5ID0gJCgnI2JwQ2FsY3VsYXRvciB0YWJsZScpLmZpbmQoJ3Rib2R5JyksXG4gICAgICAgICAgJHRyTGFzdCA9ICR0YWJsZUJvZHkuZmluZCgndHI6bGFzdCcpLFxuICAgICAgICAgICR0ck5ldyA9ICR0ckxhc3QuY2xvbmUoKTtcblxuICAgICAgICAvLyBBcHBlbmQgbmV3IGNsYXNzIG5hbWUgdG8gY2xvbmVkIHJvd1xuICAgICAgICAkdHJMYXN0LmJlZm9yZSgkdHJOZXcpLmFkZENsYXNzKCdjbG9uZWQnKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XG5cbiAgICAgICAgLy8gQWRkIG5ldyBuYW1lIHdpdGggaW5kZXhcbiAgICAgICAgJHRhYmxlQm9keS5maW5kKCd0cjpsYXN0IGlucHV0JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyICR0cklucHV0Q2xhc3NJbmRleCA9ICQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGggKyAxLFxuICAgICAgICAgICAgICAkdHJJbnB1dENsYXNzTmFtZSA9ICQodGhpcykuYXR0cignY2xhc3MnKTtcblxuICAgICAgICAgICQodGhpcykuYXR0cignbmFtZScsICR0cklucHV0Q2xhc3NOYW1lICsgJy0nICsgJHRySW5wdXRDbGFzc0luZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgndGQ6ZXEoMCknLCAkdHJMYXN0KS50ZXh0KCQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgLy8gV2hlbiBjbGVhci9yZXN0YXJ0IGJ1dHRvbiBpcyBjbGlja2VkIHJldHVybiB0YWJsZSB0byBpbml0aWFsIHN0YXRlXG4gICAgICAkKCcuY2xlYXItcmVzdGFydCcpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgY2xvbmVkIHJvd3NcbiAgICAgICAgdmFyICR0ckNsb25lZCA9ICQoJy5jbG9uZWQnKTtcbiAgICAgICAgJHRyQ2xvbmVkLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIFJlc2V0IHRvIGludGlhbCB2YWx1ZXNcbiAgICAgICAgJCgnI2JwQ2FsY3VsYXRvciBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykudmFsKCcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzZXQgZm9ybVxuICAgICAgICAkKCcjYnBDYWxjdWxhdG9yICcpLnZhbGlkYXRlKCkucmVzZXRGb3JtKCk7XG5cbiAgICAgICAgLy8gSGlkZSBvdXRwdXQgcm93XG4gICAgICAgICQoJy5icENhbGN1bGF0b3JfX3RhYmxlX19vdXRwdXQnKS5oaWRlKCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlIEJQXG4gICAgICBmdW5jdGlvbiBjYWxjdWxjYXRlQlAoYnBWYWx1ZSwgYnBPdXRwdXQpIHtcbiAgICAgICAgdmFyIGJwSW5wdXQgPSAwLCAvLyByb3cgY291bnRcbiAgICAgICAgICAgIGJwVG90YWwgPSAwLCAvLyBpbmNyZW1lbnRlZCBpbnB1dCB2YWx1ZXNcbiAgICAgICAgICAgIGJwQXZlcmFnZTsgLy8gYXZlcmFnZWQgYnBUb3RhbCAvIGJwSW5wdXRcblxuICAgICAgICBicFZhbHVlLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIElmIElucHV0IHZhbHVlcyBhcmUgZ3JlYXRlciB0aGFuIDAgdGhlbiB0dXJuIGludG8gYSBudW1iZXIgYW5kIHJvdW5kXG4gICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkgPiAwID8gTWF0aC5yb3VuZChwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCkpIDogZmFsc2U7XG5cbiAgICAgICAgICBpZiAodmFsICE9PSAwKSB7XG4gICAgICAgICAgICBicElucHV0ICs9IDE7XG4gICAgICAgICAgICBicFRvdGFsICs9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlXG4gICAgICAgIGJwQXZlcmFnZSA9IGJwVG90YWwgLyBicElucHV0ID4gMCA/IE1hdGgucm91bmQoYnBUb3RhbCAvIGJwSW5wdXQpIDogMDtcblxuICAgICAgICBicE91dHB1dC50ZXh0KGJwQXZlcmFnZSk7XG5cbiAgICAgICAgJCgnLmJwQ2FsY3VsYXRvcl9fdGFibGVfX291dHB1dCcpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gVmFsaWRhdGUgQlAgRm9ybVxuICAgICAgJCgnI2JwQ2FsY3VsYXRvcicpLnZhbGlkYXRlKHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIEJQIHdoZW4gY2FsY3VsYXRlIGlzIGNsaWNrZWRcbiAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24oZm9ybSkge1xuICAgICAgICAgIHZhciBzeXNCcFZhbHVlID0gJCgnLmJwQ2FsY3VsYXRvcl9fc3lzdG9saWMtaW5wdXQnKSxcbiAgICAgICAgICAgIHN5c0JwT3V0cHV0ID0gJCgnLmJwQ2FsY3VsYXRvcl9fc3lzdG9saWMtb3V0cHV0Jyk7XG5cbiAgICAgICAgICB2YXIgZGlhQnBWYWx1ZSA9ICQoJy5icENhbGN1bGF0b3JfX2RpYXN0b2xpYy1pbnB1dCcpLFxuICAgICAgICAgICAgZGlhQnBPdXRwdXQgPSAkKCcuYnBDYWxjdWxhdG9yX19kaWFzdG9saWMtb3V0cHV0Jyk7XG5cbiAgICAgICAgICBjYWxjdWxjYXRlQlAoc3lzQnBWYWx1ZSwgc3lzQnBPdXRwdXQpO1xuICAgICAgICAgIGNhbGN1bGNhdGVCUChkaWFCcFZhbHVlLCBkaWFCcE91dHB1dCk7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFNhZGx5IGFkZHMgZm9vdGVyIHRvIGxlZnQgcmVzb3VyY2UgcGFnZSBjb2x1bW4uXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMucmVzb3VyY2VQYWdlRm9vdGVyID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgJChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQoJ2JvZHkuYW1hX19yZXNvdXJjZS1wYWdlJykubGVuZ3RoKSB7XG4gICAgICAgICAgJCgnZm9vdGVyJywgY29udGV4dCkuY2xvbmUoKS5hcHBlbmRUbygnLmFtYV9fbGF5b3V0LS1zcGxpdF9fbGVmdCcpLmFkZENsYXNzKCdhbWFfX2Zvb3RlciBhbWFfX3Jlc291cmNlLXBhZ2VfX2Rlc2t0b3AtZm9vdGVyJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFJlc3BvbnNpdmUgVGFibGVzLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnJlc3BvbnNpdmVUYWJsZXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAvLyBUaGlzIGNvbmRpdGlvbmFsIGhhcyBiZWVuIGFkZGVkIHRvIHByZXZlbnQgYmFzaWNUYWJsZSBwbHVnaW4gdG8gc2VsZWN0aXZlbHkgbm90IHJ1biBvbiB0YWJsZXNcbiAgICAgIGlmICghJCgndGFibGUnKS5oYXNDbGFzcygnc2ltcGxlVGFibGUnKSkge1xuICAgICAgICAkKCd0YWJsZScpLmJhc2ljdGFibGUoe1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjRcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgZm9yY2VzIHRhYmxlcyBpbnNpZGUgb2YgdGhlIC5hbWFfX3Jlc291cmNlLS1zY2hlZHVsZXMgZGl2IHRvIGhhdmUgbW9iaWxlIGxvb2sgYW5kIGZlZWxcbiAgICAgICQoJy5hbWFfX3Jlc291cmNlLS1zY2hlZHVsZXMgdGFibGUnKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5iYXNpY3RhYmxlKCdzdGFydCcpO1xuICAgICAgfSk7XG5cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBMaXN0aWNsZSBDbGFzZXMuXG4gKlxuICogSGFuZGxpbmcgY2xhc3NlcyB0byBidWlsZCBsaXN0aWNsZSBwcm9wZXJseSBvdXRzaWRlIGNrZWRpdG9yLlxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCwgb25jZSkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmxpc3RpY2xlID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgaWYgKCQoJy5saXN0aWNsZScsIGNvbnRleHQpLmxlbmd0aCkge1xuICAgICAgICAkKCcubGlzdGljbGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbiAoaWR4LCBlKSB7XG4gICAgICAgICAgICAkKGUpLmFkZENsYXNzKCdsaXN0aWNsZV9faXRlbScpO1xuICAgICAgICAgICAgJChlKS5jaGlsZHJlbignb2wnKS5lYWNoKGZ1bmN0aW9uIChpZHgsIGYpIHtcbiAgICAgICAgICAgICAgJChmKS5hZGRDbGFzcygnbGlzdGljbGVfX2l0ZW0tc3ViJyk7XG4gICAgICAgICAgICAgICQoZikuY2hpbGRyZW4oJ2xpJykuYWRkQ2xhc3MoJ2xpc3RpY2xlX19pdGVtLXN1Yi1pdGVtJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvL2lmIHRoZXJlIGlzIGFuIGlubGluZSBwcm9tbyBvbiBhIHBhZ2Ugd2l0aCBhIGxpc3RpY2xlLCBkZXRlcm1pbmUgaWYgdGhlIGxpc3QgaXMgY2xvc2UgZW5vdWdoIGJlbmVhdGggdGhlIHByb21vIGluIHRoZSBkb20gdG8gYXNzdW1lIGl0IHdpbGwgYmUgZmxvYXRlZCBuZXh0IHRvIGl0LiBJIGNob3NlIHdpdGhpbiA1IHNpYmxpbmdzLlxuICAgICAgaWYoJCgnLmFtYV9fcHJvbW8tLWlubGluZSB+IC5saXN0aWNsZScpKSB7XG4gICAgICAgIHZhciBsZW5ndGggPSAkKCcuYW1hX19wcm9tby0taW5saW5lJykuZmlyc3QoKS5uZXh0VW50aWwoJy5saXN0aWNsZScpLmFkZEJhY2soKS5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPD0gNSkge1xuICAgICAgICAgICQoJy5hbWFfX3Byb21vLS1pbmxpbmUnKS5hZGRDbGFzcygnbGlzdGljbGUtbWFyZ2luJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vaWYgdGhlIGxpc3RpY2xlIGl0ZW0gY29udGFpbnMgYW4gaW1hZ2UsIHB1dCBhIGNsZWFyZml4IGRpdiBvbiB0aGUgaXRlbSBzbyBpZiBpdCBoYXMgYSB0cmFpbGluZyBpbWFnZSwgdGhlIG5leHQgaXRlbSB3b24ndCB3cmFwIG9uIGl0LlxuICAgICAgLy9BbHNvLCBkZXRlcm1pbmUgaXQgdGhlIGltYWdlIGlzIGFsbW9zdCAxMDAlIG9mIHRoZSBsaXN0IHdpZHRoLiBpZiBpdCBpcywgYWRkIGEgY2xhc3MgdG8gcmVtb3ZlIHRoZSBsZWZ0IG1hcmdpbiBhbmQgbWFrZSB0aGUgaW1hZ2UgMTAwJSB3aWR0aC4gSSBjaG9zZSA4MCUuXG4gICAgICBpZigkKCcubGlzdGljbGVfX2l0ZW0gaW1nJykpIHtcbiAgICAgICAgJCgnLmxpc3RpY2xlX19pdGVtIGltZycpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciB3aWR0aCA9ICQodGhpcykuY2xvc2VzdCgnLmxpc3RpY2xlX19pdGVtJykud2lkdGgoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKHdpZHRoKVxuICAgICAgICAgIHZhciBpbWFnZVdpZHRoID0gJCh0aGlzKS53aWR0aCgpXG4gICAgICAgICAgY29uc29sZS5sb2coaW1hZ2VXaWR0aClcbiAgICAgICAgICB2YXIgY2xlYXJmaXggPSAnPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+PC9kaXY+J1xuICAgICAgICAgICQob25jZSgnbGlzdGljbGUtaXRlbScsICcubGlzdGljbGVfX2l0ZW0nLCB0aGlzKSkuYXBwZW5kKGNsZWFyZml4KVxuICAgICAgICAgIGlmIChpbWFnZVdpZHRoID49IHdpZHRoKi43KSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCduby1tYXJnaW4nKVxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0ICgnZmlndXJlJykuYWRkQ2xhc3MoJ25vLW1hcmdpbicpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsLCBvbmNlKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEF0dGFjaGVzIEFNQSBJbWFnZSBQb3B1cCBsaWJyYXJ5LlxuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG5cdGZ1bmN0aW9uIGFsdGVyTW9kYWwgKGNvbnRleHQpIHtcblx0XHQkKCcudWktZGlhbG9nJykuY3NzKHtcInotaW5kZXhcIjogXCI1MDAwMVwifSk7XG5cdFx0JCgnLnVpLWRpYWxvZy10aXRsZScpLmhpZGUoKTtcblx0XHQkKCcudWktYnV0dG9uLWljb24tb25seSAudWktaWNvbicpLmhpZGUoKTtcblx0XHQvLyBTdHlsZWd1aWRlIHNwZWNpZmljIHRyZWF0bWVudCB0byBoaWRlIGFuZCBjc3MgdG8gZWxlbWVudHMuXG5cdFx0JCgnLnVpLWRyYWdnYWJsZSAudWktZGlhbG9nLXRpdGxlYmFyJykuY3NzKHtcblx0XHRcdFwiYm9yZGVyXCI6IFwibm9uZVwiLFxuXHRcdFx0XCJwYWRkaW5nOlwiOiBcIjBcIixcblx0XHRcdFwiYmFja2dyb3VuZFwiOiBcIm5vbmVcIlxuXHRcdH0pO1xuXHRcdCQoJy51aS13aWRnZXQtb3ZlcmxheScpLmNzcyh7XG5cdFx0XHRcIm9wYWNpdHlcIjogXCIuNVwiLFxuXHRcdFx0XCJ6LWluZGV4OlwiOiBcIjUwMDBcIlxuXHRcdH0pO1xuXHRcdCQoJy51aS1kaWFsb2cgLnVpLWRpYWxvZy10aXRsZWJhci1jbG9zZScpLmNzcyh7XG5cdFx0XHRcImJhY2tncm91bmRcIjogXCJ1cmwoJy9hc3NldHMvaW1hZ2VzL2ljb24tbW9kYWwtY2xvc2Uuc3ZnJylcIixcblx0XHRcdFwiYm9yZGVyXCI6IFwibm9uZVwiLFxuXHRcdFx0XCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG5cdFx0XHRcInJpZ2h0XCI6IFwiLTIwcHhcIixcblx0XHRcdFwidG9wXCI6IFwiLTEwcHhcIixcblx0XHRcdFwiaGVpZ2h0XCI6IFwiMjhweFwiLFxuXHRcdFx0XCJ3aWR0aFwiOiBcIjI4cHhcIixcblx0XHRcdFwicGFkZGluZ1wiOiBcIjBcIixcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNsb3NlTW9kYWwgKGNvbnRleHQpIHtcblx0XHQkKCcudWktaWNvbi1jbG9zZXRoaWNrJykudW5iaW5kKCdjbGljay5jbG9zZScpO1xuXHRcdCQoJy51aS1pY29uLWNsb3NldGhpY2snKS50cmlnZ2VyKCdjbGljaycpO1xuXHR9XG5cblx0RHJ1cGFsLmJlaGF2aW9ycy5hbWFfaW1hZ2VfcG9wdXAgPSB7XG5cdFx0YXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdFx0JChkb2N1bWVudCkub24oXCJkaWFsb2dvcGVuXCIsIFwiLnVpLWRpYWxvZ1wiLCBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG5cdFx0XHRcdGFsdGVyTW9kYWwoKTtcblx0XHRcdH0pO1xuXHRcdFx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi51aS13aWRnZXQtb3ZlcmxheVwiLCBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG5cdFx0XHRcdGNsb3NlTW9kYWwoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuXG4vKipcbiAqIEBmaWxlXG4gKiBBdHRhY2hlcyBBTUEgSW1hZ2UgUG9wdXAgbGlicmFyeS5cbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXHRmdW5jdGlvbiBhbHRlck1vZGFsIChjb250ZXh0KSB7XG5cdFx0JCgnLmFtYS1pbWFnZS1wb3B1cC1tb2RhbCAudWktZGlhbG9nLXRpdGxlJykuaGlkZSgpO1xuXHRcdCQoJy5hbWEtaW1hZ2UtcG9wdXAtbW9kYWwgLnVpLWJ1dHRvbi1pY29uLW9ubHkgLnVpLWljb24nKS5oaWRlKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBjbG9zZU1vZGFsIChjb250ZXh0KSB7XG5cdFx0JCgnLnVpLWljb24tY2xvc2V0aGljaycpLnVuYmluZCgnY2xpY2suY2xvc2UnKTtcblx0XHQkKCcudWktaWNvbi1jbG9zZXRoaWNrJykudHJpZ2dlcignY2xpY2snKTtcblx0fVxuXG5cdERydXBhbC5iZWhhdmlvcnMuYW1hX2ltYWdlX3BvcHVwID0ge1xuXHRcdGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwiZGlhbG9nb3BlblwiLCBcIi51aS1kaWFsb2dcIiwgZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0XHRcdGFsdGVyTW9kYWwoKTtcblx0XHRcdH0pO1xuXHRcdFx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi51aS13aWRnZXQtb3ZlcmxheVwiLCBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRcdFx0Y2xvc2VNb2RhbCgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCwgb25jZSkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmluZGV4ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgaWYgKCAkKCcuZGVzYy1kaXNwbGF5JykubGVuZ3RoICkge1xuXG4gICAgdmFyIGZ1bGwgPSAkKCcuZnVsbHRleHQnKTtcbiAgICB2YXIgdHJ1bmMgPSAkKCcudHJ1bmNhdGVkJylcbiAgICB2YXIgZGVzYyA9ICQoJy5kZXNjLWRpc3BsYXknKVxuICAgIHZhciBmdWxsVGV4dCA9ICQoJy5mdWxsdGV4dCcpLmh0bWwoKVxuICAgIHZhciB0cnVuY2F0ZWQgPSAkKCcudHJ1bmNhdGVkJykuaHRtbCgpXG4gICAgdmFyIGZ1bGxIZWlnaHQgPSAnJ1xuICAgIHZhciB0cnVuY0hlaWdodCA9ICcnXG4gICAgdmFyIG1vcmVIdG1sID0gJzxhIGFjY2Vzc2tleT1cImxcIiBocmVmPVwiI1wiIGFsdD1cIlJlYWQgTW9yZVwiIGNsYXNzPVwibW9yZVwiIHRhYmluZGV4PVwiMFwiPiAuLi5SZWFkIE1vcmU8L2E+J1xuICAgIHZhciBsZXNzSHRtbCA9ICc8YSBhY2Nlc3NrZXk9XCJsXCIgaHJlZj1cIiNcIiBhbHQ9XCJTaG93IExlc3NcIiBjbGFzcz1cImxlc3NcIiB0YWJpbmRleD1cIjBcIj5TaG93IExlc3M8L2E+J1xuICAgIHZhciB3aWR0aCA9ICcnXG5cbiAgICAgIGZ1bmN0aW9uIGdldERpbWVuc2lvbnMgKCkge1xuXG4gICAgICAgIC8vIElmIGNsb3Nlc3QgcGFyZW50IGluZGljYXRlcyBjYXRlZ29yeS5cbiAgICAgICAgLy8gQWRqdXN0IGhpZWdodCB2YWx1ZXMuXG4gICAgICAgIGlmIChkZXNjLmNsb3Nlc3QoJ2Rpdi5hbWFfX2NhdGVnb3J5JykpIHtcbiAgICAgICAgICB3aWR0aCA9ICQod2luZG93KS53aWR0aCgpXG4gICAgICAgICAgaWYgKHdpZHRoIDwgNDAwKSB7XG4gICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgMjVcbiAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMjBcbiAgICAgICAgICB9IGVsc2UgaWYgKHdpZHRoIDwgOTAwKSB7XG4gICAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyA1MVxuICAgICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDIwXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyAyNlxuICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAxNFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aWR0aCA9ICQod2luZG93KS53aWR0aCgpXG4gICAgICAgICAgaWYgKHdpZHRoIDwgNDAwKSB7XG4gICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgMjVcbiAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMjBcbiAgICAgICAgICB9IGVsc2UgaWYgKHdpZHRoIDwgOTAwKSB7XG4gICAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyAyNVxuICAgICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDIwXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KClcbiAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMTRcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8qXG4gICAgICAgICogQW5pbWF0ZSB0aGUgaGVpZ2h0IG9mIGEgZHluYW1pYyBoZWlnaHQgb2JqZWN0PyBTSU1QTEUhXG4gICAgICAgICogV2hhdCBhIGZvb2wgeW91IHdvdWxkIGJlIHRvIG5vdCB0aGluayBvZiBzbyBlbGVnYW50IGEgc29sdXRpb24uXG4gICAgICAgICogSW4gdGhlIG1hcmt1cCwgdGhlcmUgYXJlIGhpZGRlbiBmdWxsdGV4dCBhbmQgc3VtbWFyeSBkaXZzLlxuICAgICAgICAqIFRoZXkgYXJlIGFic29sdXRlbHkgcG9zaXRpb25lZCB3aGl0aGluIHRoZSBwYWdlIHRlbXBsYXRlIHRvIGtlZXAgYW4gYWNjdXJhdGUgaGVpZ2h0LlxuICAgICAgICovXG5cbiAgICAgIC8vIFNldCBoZWlnaHQgb24gcGFnZWxvYWQgdXNpbmcgdGhlIGhpZGRlbiBkaXZzLlxuICAgICAgJChvbmNlKCdnZXRIZWlnaHQnLCAnLmRlc2MtZGlzcGxheScsIGNvbnRleHQpKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXG4gICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCB0cnVuY0hlaWdodCArICdweCcpXG4gICAgICB9KTtcblxuICAgICAgLy8gU2V0IHRoZSBoZWlnaHQgYWdhaW4gb24gd2luZG93IHJlc2l6ZS5cbiAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXREaW1lbnNpb25zKClcbiAgICAgICAgaWYgKGRlc2MuaGFzQ2xhc3MoJ2Z1bGwnKSkge1xuICAgICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCBmdWxsSGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgfSBlbHNlIGlmIChkZXNjLmhhc0NsYXNzKCdzdW1tYXJ5JykpIHtcbiAgICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgdHJ1bmNIZWlnaHQgKyAncHgnKVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gT24gY2xpY2ssIHNldCB0aGUgaGVpZ2h0IHRvIHRyaWdnZXIgY3NzIHRyYW5zaXRpb24uXG4gICAgICBkZXNjLm9uKCdjbGljaycsICcubW9yZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXG4gICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCBmdWxsSGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgZGVzYy5hZGRDbGFzcygnZnVsbCcpLnJlbW92ZUNsYXNzKCdzdW1tYXJ5JylcbiAgICAgICAgLy8gU3dhcCB0aGUgZnVsbCBjb3B5IGludG8gdGhlIGRpc3BsYXkgZGl2LlxuICAgICAgICBkZXNjLmh0bWwoJC5wYXJzZUhUTUwoZnVsbFRleHQpKS5hcHBlbmQobGVzc0h0bWwpXG4gICAgICB9KTtcbiAgICAgIGRlc2Mub24oJ2NsaWNrJywgJy5sZXNzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXREaW1lbnNpb25zKClcbiAgICAgICAgZGVzYy5jc3MoJ2hlaWdodCcsIHRydW5jSGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgZGVzYy5hZGRDbGFzcygnc3VtbWFyeScpLnJlbW92ZUNsYXNzKCdmdWxsJylcbiAgICAgICAgLy8gU3dhcCB0aGUgdHJ1bmNhdGVkIGNvcHkgaW50byB0aGUgZGlzcGxheSBkaXYuXG4gICAgICAgIGRlc2MuaHRtbCgkLnBhcnNlSFRNTCh0cnVuY2F0ZWQpKS5hcHBlbmQobW9yZUh0bWwpXG4gICAgICAgIC8vIFNjcm9sbCB0byB0b3AuXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDUwMCwgJ3N3aW5nJylcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsLCBvbmNlKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3RvYyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5hbWEtLW5ld3MtdG9jIGEnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBoYXJkIGp1bXAsIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG5cbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpOyAvLyBTZXQgdGhlIHRhcmdldCBhcyB2YXJpYWJsZVxuICAgICAgICAgICAgLy8gcGVyZm9ybSBhbmltYXRlZCBzY3JvbGxpbmcgYnkgZ2V0dGluZyB0b3AtcG9zaXRpb24gb2YgdGFyZ2V0LWVsZW1lbnQgYW5kIHNldCBpdCBhcyBzY3JvbGwgdGFyZ2V0XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCh0YXJnZXQpLm9mZnNldCgpLnRvcCAtICQoJyNtYWluLWNvbnRlbnQnKS5vZmZzZXQoKS50b3AgKyAoJCgnLndvcmtiZW5jaC10YWJzJykuaGVpZ2h0KCk/JCgnLndvcmtiZW5jaC10YWJzJykuaGVpZ2h0KCk6MClcbiAgICAgICAgICAgIH0sIDYwMCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBBcHBsaWNhdGlvbiBkcm9wZG93bi5cbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hcHBNZW51ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgICQoJyNibG9jay1hY2NvdW50bmF2JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc19hY3RpdmUgPSAnaXMtYWN0aXZlJztcblxuICAgICAgICAkKCcuYWNjb3VudF9uYXZfdHJpZ2dlcicsIHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIC8vIFVuZm9jdXMgb24gdGhlIGRyb3Bkb3duLlxuICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgZm9yIENTUy5cbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyB0byB0aGUgZHJvcGRvd24gVUwuXG4gICAgICAgICAgJCh0aGlzKS5uZXh0KCkudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnLmFjY291bnRfbmF2X3RyaWdnZXInLCB0aGlzKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpLm5leHQoKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3BvZGNhc3QgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAvL0NoZWNrIG51bWJlciBvZiBsaW5rc1xuICAgICAgICBvZGRMaW5rcygpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIG9kZExpbmtzKCkge1xuICAgICAgICB2YXIgY291bnQgPSAkKFwidWwuYW1hX19wb2RjYXN0LXBsYXllcl9fbGlua3MgbGlcIikubGVuZ3RoO1xuICAgICAgICB2YXIgbGlua0NvbnRhaW5lciA9ICQoXCJ1bC5hbWFfX3BvZGNhc3QtcGxheWVyX19saW5rc1wiKTtcblxuICAgICAgICBpZiAoY291bnQgPT0gMyB8fCBjb3VudCA9PSAxKSB7XG4gICAgICAgICAgbGlua0NvbnRhaW5lci5hZGRDbGFzcygnb2RkX2xpbmtzJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7IiwiLyoqXG4gKiBAZmlsZVxuICogTW9iaWxlIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBsb2NrZXIgbWVudS5cbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwsIG9uY2UpIHtcbiAgICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9sb2NrZXJNZW51ID0ge1xuICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICAvLyBTZWxlY3QgcmVxdWlyZWQgZWxlbWVudHMgZnJvbSB0aGUgRE9NLlxuICAgICAgICBjb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuICAgICAgICBjb25zdCAkbWVudSA9ICQoJy5hbWFfbG9ja2VyX25hdmlnYXRpb24nKTtcbiAgICAgICAgY29uc3QgJHRyaWdnZXIgPSAkKCcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uLXRyaWdnZXInKTtcbiAgICAgICAgY29uc3QgJGNhdGNoZXIgPSAkKCcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uLWNhdGNoZXInKTtcbiAgICAgICAgY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgICAgIGNvbnN0IGJvZHlGaXhlZCA9ICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93Jyk7XG5cbiAgICAgICAgZnVuY3Rpb24gbG9ja2VyTWVudSgpIHtcbiAgICAgICAgICAgIC8vIE9wZW4gbWVudSBvbiB0cmlnZ2VyIGNsaWNrLlxuICAgICAgICAgICAgJChvbmNlKCdjbGljay10by1zaG93JywgJy5hbWFfbG9ja2VyX25hdmlnYXRpb24tdHJpZ2dlcicsIGNvbnRleHQpKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICRtZW51LmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgICRjYXRjaGVyLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAkYm9keS5jc3Moe1wib3ZlcmZsb3dcIjpcImhpZGRlblwifSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIENsb3NlIG1lbnUgb24gYmFja2dyb3VuZCBjbGljay5cbiAgICAgICAgICAgICQob25jZSgnY2xpY2stdG8taGlkZScsICcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uLWNhdGNoZXInLCBjb250ZXh0KSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRjYXRjaGVyLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICAkYm9keS5jc3Moe1wib3ZlcmZsb3dcIjpcImF1dG9cIn0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NrZXJNZW51KCk7XG5cbiAgICAgIH1cbiAgICB9O1xuICB9KShqUXVlcnksIERydXBhbCwgb25jZSk7XG4iXX0=
