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
      var alert = $('.ama__alert__wrap').attr('id');
       $.cookie('ama__alert--' + alert);
       var alertCookie = $.cookie('ama__alert--' + alert);
            
       (function ($) {
         // If the 'hide cookie is not set we show the alert
         if (alertCookie !== '1') {
           $('.ama__alert__wrap').css({
             "transition": "opacity .15s",
             "opacity": "1"
            });
         } else {
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
           // set the cookie
           $.cookie('ama__alert--' + alert, '1', { expires: 1});
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

            // jQueryUI selectmenu method
            $('.ama__select-menu__select').selectmenu();
            
         

            // Submits the search form after a select menu items has been selected
            $('.ama__select-menu__select').on('selectmenuchange', function() {
              $('#block-exposedformacquia-search-solrpage-2').submit();
            });

            $('.ama__select-menu__select').on('selectmenuchange', function() {
              $(this).trigger('change');
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

      // Needs doc ready because the admin toolbar needs to get loaded to determine the top spacing for sticky nav
      $(function() {
        var $bodyFixed = $('body').css('overflow');

        if($bodyFixed === 'hidden') {
          $('.ama__main-navigation').unstick();
          $('.ama_locker_navigation').unstick();
          return;
        } else if($(window).width() < 768 ) { // If less than tablet
          $('.ama__main-navigation').sticky({zIndex: 501});
          $('.ama_locker_navigation').sticky({zIndex: 501});
        } else if($('.toolbar-tray').hasClass('toolbar-tray-horizontal')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 72 });
          $('.ama_locker_navigation').sticky({ zIndex: 501, topSpacing: 132 });
        } else if($('.toolbar-tray').hasClass('toolbar-tray-vertical')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 39 });
          $('.ama_locker_navigation').sticky({ zIndex: 501, topSpacing: 99 });
        } else {
          $('.ama__main-navigation ').sticky({ zIndex: 501 });
          $('.ama_locker_navigation').sticky({zIndex: 501, topSpacing: 60});
        }
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

        $(document).click( function(){
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

/**
 * @file
 * Interactions for wayfinder.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.wayfinder = {
    attach: function (context, settings) {
      (function ($) {
        if($.cookie('ama_wayfinder_cookie')) {
          $.cookie.json = true;
          // Read wayfinder cookies set from ama-assn domains
          var ama_wayfinder_cookie = $.cookie('ama_wayfinder_cookie');
          if (typeof ama_wayfinder_cookie !== 'undefined' || $('.referred').length > 0) {
            $('.ama__wayfinder--referrer a').fadeIn().css('display', 'flex');
            $('.ama__wayfinder--referrer a').attr("href", ama_wayfinder_cookie[1]);
            $('.ama__wayfinder--referrer a').text(ama_wayfinder_cookie[0]);
          } else {
            $('.ama_wayfinder_referrer--link-back').fadeOut();
          }
        }
      })(jQuery);
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
          $productNav = $('.ama__product-nav'),
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

      // Set product nav height if present.
      if($productNav.length && $productNav.is(':visible') ){
        productNavHeight = $productNav.height();
      } else {
        productNavHeight = 0;
      }

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

      // If a user clicks outside the menu then close it
      $(document).click(function (e) {
        if (!$categoryNavigationMenu.is(e.target) && $categoryNavigationMenu.has(e.target).length === 0) {
          $('#global-menu').prop('checked', false);
          hideShow();
        }
      });

      $($mobileSearchTrigger).unbind('click').click(function () {
        $mobileSearch.slideToggle();
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
        });

        // Stop link from firing
        $signInLink.click(function(e) {
          e.preventDefault();
        });

        $(document).click(function(e) {
          // if the target of the click isn't the container nor a descendant of the container
          if (!parentElement.is(e.target) && parentElement.has(e.target).length === 0) {
            $(menuElement).slideUp();
          }

          // Set timeout for when a user mouses out of the menu
          parentElement.mouseenter(function(){
            clearTimeout();
          }).mouseleave(function(){
            setTimeout(function(){
              $(menuElement).slideUp();
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
(function ($, Drupal) {
  Drupal.behaviors.listicle = {
    attach: function(context, settings) {
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
          $(this).closest('.listicle__item').once().append(clearfix)
          if (imageWidth >= width*.7) {
            $(this).addClass('no-margin')
            $(this).closest ('figure').addClass('no-margin')
          }
        })
      }
    }
  };
})(jQuery, Drupal);

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

(function ($, Drupal) {
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
    var moreHtml = '<a href="#" class="more"> ...Read More</a>'
    var lessHtml = '<a href="#" class="less">Show Less</a>'
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
      $('.desc-display', context).once('getHeight').each(function () {
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
})(jQuery, Drupal);

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvZHlTY3JvbGxMb2NrLm1pbi5qcyIsImluaXQuanMiLCJhbGVydC5qcyIsImZvcm0taXRlbXMuanMiLCJuYXYuanMiLCJzdWJjYXRlZ29yeS5qcyIsIndheWZpbmRlci5qcyIsInRhYnMuanMiLCJhY2NvcmRpb24uanMiLCJ3ZWJmb3Jtcy5qcyIsIm1haW4tbmF2aWdhdGlvbi5qcyIsImNhdGVnb3J5LW1lbnUuanMiLCJzaWduLWluLWRyb3Bkb3duLmpzIiwic2VhcmNoLWNoZWNrYm94LmpzIiwiYnAtY2FsY3VsYXRvci5qcyIsInJlc291cmNlLmpzIiwidGFibGVzLmpzIiwibGlzdGljbGUuanMiLCJtb2RhbC5qcyIsImluZGV4LXBhZ2UuanMiLCJ0b2MuanMiLCJhcHBsaWNhdGlvbi1kcm9wZG93bi5qcyIsInBvZGNhc3QtcGxheWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDclRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InN0eWxlZ3VpZGUtY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXCJleHBvcnRzXCJdLHQpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpdChleHBvcnRzKTtlbHNle3ZhciBvPXt9O3QobyksZS5ib2R5U2Nyb2xsTG9jaz1vfX0odGhpcyxmdW5jdGlvbihleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgdD0wLG89QXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKW9bdF09ZVt0XTtyZXR1cm4gb31yZXR1cm4gQXJyYXkuZnJvbShlKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbD0hMTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KXt2YXIgZT17Z2V0IHBhc3NpdmUoKXtsPSEwfX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSl9dmFyIGQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lm5hdmlnYXRvciYmd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSYmL2lQKGFkfGhvbmV8b2QpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0pLGM9W10sdT0hMSxhPS0xLHM9dm9pZCAwLHY9dm9pZCAwLGY9ZnVuY3Rpb24odCl7cmV0dXJuIGMuc29tZShmdW5jdGlvbihlKXtyZXR1cm4hKCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmV8fCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmUodCkpfSl9LG09ZnVuY3Rpb24oZSl7dmFyIHQ9ZXx8d2luZG93LmV2ZW50O3JldHVybiEhZih0LnRhcmdldCl8fCgxPHQudG91Y2hlcy5sZW5ndGh8fCh0LnByZXZlbnREZWZhdWx0JiZ0LnByZXZlbnREZWZhdWx0KCksITEpKX0sbz1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt2b2lkIDAhPT12JiYoZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dix2PXZvaWQgMCksdm9pZCAwIT09cyYmKGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9cyxzPXZvaWQgMCl9KX07ZXhwb3J0cy5kaXNhYmxlQm9keVNjcm9sbD1mdW5jdGlvbihpLGUpe2lmKGQpe2lmKCFpKXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJkaXNhYmxlQm9keVNjcm9sbCB1bnN1Y2Nlc3NmdWwgLSB0YXJnZXRFbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgd2hlbiBjYWxsaW5nIGRpc2FibGVCb2R5U2Nyb2xsIG9uIElPUyBkZXZpY2VzLlwiKTtpZihpJiYhYy5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQ9PT1pfSkpe3ZhciB0PXt0YXJnZXRFbGVtZW50Omksb3B0aW9uczplfHx7fX07Yz1bXS5jb25jYXQocihjKSxbdF0pLGkub250b3VjaHN0YXJ0PWZ1bmN0aW9uKGUpezE9PT1lLnRhcmdldFRvdWNoZXMubGVuZ3RoJiYoYT1lLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSl9LGkub250b3VjaG1vdmU9ZnVuY3Rpb24oZSl7dmFyIHQsbyxuLHI7MT09PWUudGFyZ2V0VG91Y2hlcy5sZW5ndGgmJihvPWkscj0odD1lKS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFktYSwhZih0LnRhcmdldCkmJihvJiYwPT09by5zY3JvbGxUb3AmJjA8cj9tKHQpOihuPW8pJiZuLnNjcm9sbEhlaWdodC1uLnNjcm9sbFRvcDw9bi5jbGllbnRIZWlnaHQmJnI8MD9tKHQpOnQuc3RvcFByb3BhZ2F0aW9uKCkpKX0sdXx8KGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMCl9fWVsc2V7bj1lLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZih2b2lkIDA9PT12KXt2YXIgZT0hIW4mJiEwPT09bi5yZXNlcnZlU2Nyb2xsQmFyR2FwLHQ9d2luZG93LmlubmVyV2lkdGgtZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO2UmJjA8dCYmKHY9ZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQsZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dCtcInB4XCIpfXZvaWQgMD09PXMmJihzPWRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3csZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiKX0pO3ZhciBvPXt0YXJnZXRFbGVtZW50Omksb3B0aW9uczplfHx7fX07Yz1bXS5jb25jYXQocihjKSxbb10pfXZhciBufSxleHBvcnRzLmNsZWFyQWxsQm9keVNjcm9sbExvY2tzPWZ1bmN0aW9uKCl7ZD8oYy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UudGFyZ2V0RWxlbWVudC5vbnRvdWNoc3RhcnQ9bnVsbCxlLnRhcmdldEVsZW1lbnQub250b3VjaG1vdmU9bnVsbH0pLHUmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsbSxsP3twYXNzaXZlOiExfTp2b2lkIDApLHU9ITEpLGM9W10sYT0tMSk6KG8oKSxjPVtdKX0sZXhwb3J0cy5lbmFibGVCb2R5U2Nyb2xsPWZ1bmN0aW9uKHQpe2lmKGQpe2lmKCF0KXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJlbmFibGVCb2R5U2Nyb2xsIHVuc3VjY2Vzc2Z1bCAtIHRhcmdldEVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGNhbGxpbmcgZW5hYmxlQm9keVNjcm9sbCBvbiBJT1MgZGV2aWNlcy5cIik7dC5vbnRvdWNoc3RhcnQ9bnVsbCx0Lm9udG91Y2htb3ZlPW51bGwsYz1jLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50IT09dH0pLHUmJjA9PT1jLmxlbmd0aCYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMSl9ZWxzZSAxPT09Yy5sZW5ndGgmJmNbMF0udGFyZ2V0RWxlbWVudD09PXQ/KG8oKSxjPVtdKTpjPWMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQhPT10fSl9fSk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBJbml0aWFsaXphdGlvbiBzY3JpcHQgZm9yIGdsb2JhbCBwcm9jZXNzZXNcclxuICovXHJcblxyXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEluaXRpYWxpemUgZml0VmlkIGZvciBZb3VUdWJlIHZpZW9zLlxyXG4gKlxyXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcclxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcclxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXHJcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcclxuICovXHJcblxyXG5cdERydXBhbC5iZWhhdmlvcnMuZml0dmlkaW5pdCA9IHtcclxuXHQgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuXHRcdFx0KGZ1bmN0aW9uICgkKSB7XHJcblx0XHRcdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCQoJy52aWRlby1jb250YWluZXInKS5maXRWaWRzKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pKGpRdWVyeSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIGFsZXJ0LlxyXG4gKlxyXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcclxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcclxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXHJcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcclxuICovXHJcbiAoZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gICBEcnVwYWwuYmVoYXZpb3JzLmFsZXJ0ID0ge1xyXG4gICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XHJcbiAgICAgIHZhciBhbGVydCA9ICQoJy5hbWFfX2FsZXJ0X193cmFwJykuYXR0cignaWQnKTtcclxuICAgICAgICQuY29va2llKCdhbWFfX2FsZXJ0LS0nICsgYWxlcnQpO1xyXG4gICAgICAgdmFyIGFsZXJ0Q29va2llID0gJC5jb29raWUoJ2FtYV9fYWxlcnQtLScgKyBhbGVydCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgKGZ1bmN0aW9uICgkKSB7XHJcbiAgICAgICAgIC8vIElmIHRoZSAnaGlkZSBjb29raWUgaXMgbm90IHNldCB3ZSBzaG93IHRoZSBhbGVydFxyXG4gICAgICAgICBpZiAoYWxlcnRDb29raWUgIT09ICcxJykge1xyXG4gICAgICAgICAgICQoJy5hbWFfX2FsZXJ0X193cmFwJykuY3NzKHtcclxuICAgICAgICAgICAgIFwidHJhbnNpdGlvblwiOiBcIm9wYWNpdHkgLjE1c1wiLFxyXG4gICAgICAgICAgICAgXCJvcGFjaXR5XCI6IFwiMVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICQoJy5hbWFfX2FsZXJ0X193cmFwJykuY3NzKHtcclxuICAgICAgICAgICAgXCJkaXNwbGF5XCI6IFwibm9uZVwiXHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8vIEFkZCB0aGUgZXZlbnQgdGhhdCBjbG9zZXMgdGhlIHBvcHVwIGFuZCBzZXRzIHRoZSBjb29raWUgdGhhdCB0ZWxscyB1cyB0b1xyXG4gICAgICAgICAvLyBub3Qgc2hvdyBpdCBhZ2FpbiB1bnRpbCBvbmUgZGF5IGhhcyBwYXNzZWQuXHJcbiAgICAgICAgICQoJy5hbWFfX2FsZXJ0X19jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICQoJy5hbWFfX2FsZXJ0X193cmFwJykuY3NzKHtcclxuICAgICAgICAgICAgXCJ0cmFuc2l0aW9uXCI6IFwib3BhY2l0eSAyc1wiLFxyXG4gICAgICAgICAgICAgXCJvcGFjaXR5XCI6IFwiMFwiLFxyXG4gICAgICAgICAgICAgXCJkaXNwbGF5XCI6IFwibm9uZVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIC8vIHNldCB0aGUgY29va2llXHJcbiAgICAgICAgICAgJC5jb29raWUoJ2FtYV9fYWxlcnQtLScgKyBhbGVydCwgJzEnLCB7IGV4cGlyZXM6IDF9KTtcclxuICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgfSkoalF1ZXJ5KTtcclxuICAgICB9XHJcbiAgIH07XHJcbiB9KShqUXVlcnksIERydXBhbCk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBGb3JtIGZpZWxkcyBtYXNraW5nXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLmZvcm1JdGVtcyA9IHtcclxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XHJcbiAgICAgIChmdW5jdGlvbiAoJCkge1xyXG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgIFxyXG4gICAgICAgICAgLy8gRG8gbm90IGV4ZWN1dGUgaW4gdGhlIGxheW91dCBidWlsZGVyIGVkaXQgZGlhbG9nXHJcbiAgICAgICAgICBpZiAoISQoJy5qcy1vZmYtY2FudmFzLWRpYWxvZy1vcGVuJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQoJy5tdWx0aXNlbGVjdCcpLm11bHRpc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAkKCcuYW1hX190b29sdGlwJykudG9vbHRpcCh7XHJcbiAgICAgICAgICAgICAgdG9vbHRpcENsYXNzOiBcImFtYV9fdG9vbHRpcC1idWJibGVcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKSB7XHJcbiAgICAgICAgICAgICAgdmFyIG1heF9sZW5ndGggPSAxNTA7XHJcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9lbnRlcmVkID0gJCgnLnRleHRhcmVhJykudmFsKCkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfcmVtYWluaW5nID0gbWF4X2xlbmd0aCAtIGNoYXJhY3Rlcl9lbnRlcmVkO1xyXG4gICAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5odG1sKGNoYXJhY3Rlcl9yZW1haW5pbmcpO1xyXG4gICAgICAgICAgICAgIGlmIChtYXhfbGVuZ3RoIDwgY2hhcmFjdGVyX2VudGVyZWQpIHtcclxuICAgICAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLmFkZENsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLmFkZENsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGpRdWVyeVVJIHNlbGVjdG1lbnUgbWV0aG9kXHJcbiAgICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5zZWxlY3RtZW51KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIFN1Ym1pdHMgdGhlIHNlYXJjaCBmb3JtIGFmdGVyIGEgc2VsZWN0IG1lbnUgaXRlbXMgaGFzIGJlZW4gc2VsZWN0ZWRcclxuICAgICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLm9uKCdzZWxlY3RtZW51Y2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgJCgnI2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaC1zb2xycGFnZS0yJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLm9uKCdzZWxlY3RtZW51Y2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTdGFydCBzZWFyY2ggZmlsdGVyXHJcblxyXG4gICAgICAgICAgICB2YXIgYXZhaWxhYmxlVGFncyA9IFtcclxuICAgICAgICAgICAgICBcIkFsYWJhbWFcIixcclxuICAgICAgICAgICAgICBcIkFsYXNrYVwiLFxyXG4gICAgICAgICAgICAgIFwiQW1lcmljYW4gU2Ftb2FcIixcclxuICAgICAgICAgICAgICBcIkFyaXpvbmFcIixcclxuICAgICAgICAgICAgICBcIkFya2Fuc2FzXCIsXHJcbiAgICAgICAgICAgICAgXCJDYWxpZm9ybmlhXCIsXHJcbiAgICAgICAgICAgICAgXCJDb2xvcmFkb1wiLFxyXG4gICAgICAgICAgICAgIFwiQ29ubmVjdGljdXRcIixcclxuICAgICAgICAgICAgICBcIkRlbGF3YXJlXCIsXHJcbiAgICAgICAgICAgICAgXCJEaXN0cmljdCBPZiBDb2x1bWJpYVwiLFxyXG4gICAgICAgICAgICAgIFwiRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhXCIsXHJcbiAgICAgICAgICAgICAgXCJGbG9yaWRhXCIsXHJcbiAgICAgICAgICAgICAgXCJHZW9yZ2lhXCIsXHJcbiAgICAgICAgICAgICAgXCJHdWFtXCIsXHJcbiAgICAgICAgICAgICAgXCJIYXdhaWlcIixcclxuICAgICAgICAgICAgICBcIklkYWhvXCIsXHJcbiAgICAgICAgICAgICAgXCJJbGxpbm9pc1wiLFxyXG4gICAgICAgICAgICAgIFwiSW5kaWFuYVwiLFxyXG4gICAgICAgICAgICAgIFwiSW93YVwiLFxyXG4gICAgICAgICAgICAgIFwiS2Fuc2FzXCIsXHJcbiAgICAgICAgICAgICAgXCJLZW50dWNreVwiLFxyXG4gICAgICAgICAgICAgIFwiTG91aXNpYW5hXCIsXHJcbiAgICAgICAgICAgICAgXCJNYWluZVwiLFxyXG4gICAgICAgICAgICAgIFwiTWFyc2hhbGwgSXNsYW5kc1wiLFxyXG4gICAgICAgICAgICAgIFwiTWFyeWxhbmRcIixcclxuICAgICAgICAgICAgICBcIk1hc3NhY2h1c2V0dHNcIixcclxuICAgICAgICAgICAgICBcIk1pY2hpZ2FuXCIsXHJcbiAgICAgICAgICAgICAgXCJNaW5uZXNvdGFcIixcclxuICAgICAgICAgICAgICBcIk1pc3Npc3NpcHBpXCIsXHJcbiAgICAgICAgICAgICAgXCJNaXNzb3VyaVwiLFxyXG4gICAgICAgICAgICAgIFwiTW9udGFuYVwiLFxyXG4gICAgICAgICAgICAgIFwiTmVicmFza2FcIixcclxuICAgICAgICAgICAgICBcIk5ldmFkYVwiLFxyXG4gICAgICAgICAgICAgIFwiTmV3IEhhbXBzaGlyZVwiLFxyXG4gICAgICAgICAgICAgIFwiTmV3IEplcnNleVwiLFxyXG4gICAgICAgICAgICAgIFwiTmV3IE1leGljb1wiLFxyXG4gICAgICAgICAgICAgIFwiTmV3IFlvcmtcIixcclxuICAgICAgICAgICAgICBcIk5vcnRoIENhcm9saW5hXCIsXHJcbiAgICAgICAgICAgICAgXCJOb3J0aCBEYWtvdGFcIixcclxuICAgICAgICAgICAgICBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxyXG4gICAgICAgICAgICAgIFwiT2hpb1wiLFxyXG4gICAgICAgICAgICAgIFwiT2tsYWhvbWFcIixcclxuICAgICAgICAgICAgICBcIk9yZWdvblwiLFxyXG4gICAgICAgICAgICAgIFwiUGFsYXVcIixcclxuICAgICAgICAgICAgICBcIlBlbm5zeWx2YW5pYVwiLFxyXG4gICAgICAgICAgICAgIFwiUHVlcnRvIFJpY29cIixcclxuICAgICAgICAgICAgICBcIlJob2RlIElzbGFuZFwiLFxyXG4gICAgICAgICAgICAgIFwiU291dGggQ2Fyb2xpbmFcIixcclxuICAgICAgICAgICAgICBcIlNvdXRoIERha290YVwiLFxyXG4gICAgICAgICAgICAgIFwiVGVubmVzc2VlXCIsXHJcbiAgICAgICAgICAgICAgXCJUZXhhc1wiLFxyXG4gICAgICAgICAgICAgIFwiVXRhaFwiLFxyXG4gICAgICAgICAgICAgIFwiVmVybW9udFwiLFxyXG4gICAgICAgICAgICAgIFwiVmlyZ2luIElzbGFuZHNcIixcclxuICAgICAgICAgICAgICBcIlZpcmdpbmlhXCIsXHJcbiAgICAgICAgICAgICAgXCJXYXNoaW5ndG9uXCIsXHJcbiAgICAgICAgICAgICAgXCJXZXN0IFZpcmdpbmlhXCIsXHJcbiAgICAgICAgICAgICAgXCJXaXNjb25zaW5cIixcclxuICAgICAgICAgICAgICBcIld5b21pbmdcIlxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgJCggXCIjc2VhcmNoX2ZpbHRlclwiICkuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgICBzb3VyY2U6IGF2YWlsYWJsZVRhZ3NcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkLnVpLmF1dG9jb21wbGV0ZS5wcm90b3R5cGUuX3Jlc2l6ZU1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHVsID0gdGhpcy5tZW51LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgdWwub3V0ZXJXaWR0aCh0aGlzLmVsZW1lbnQub3V0ZXJXaWR0aCgpKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBTdGFydCBzZWFyY2ggZmlsdGVyIHdpdGggY2hlY2tib3hlc1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFNb2RlbCA9IFtcclxuICAgICAgICAgICAgICB7dGV4dDogJ0FsYWJhbWEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0FsYXNrYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQW1lcmljYW4gU2Ftb2EnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0FyaXpvbmEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0Fya2Fuc2FzJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdDYWxpZm9ybmlhJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdDb2xvcmFkbycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQ29ubmVjdGljdXQnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0RlbGF3YXJlJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdEaXN0cmljdCBPZiBDb2x1bWJpYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdGbG9yaWRhJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdHZW9yZ2lhJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdHdWFtJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdIYXdhaWknLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0lkYWhvJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdJbGxpbm9pcycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSW5kaWFuYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSW93YScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnS2Fuc2FzJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdLZW50dWNreScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTG91aXNpYW5hJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdNYWluZScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWFyc2hhbGwgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWFyeWxhbmQnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ01hc3NhY2h1c2V0dHMnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ01pY2hpZ2FuJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdNaW5uZXNvdGEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ01pc3Npc3NpcHBpJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdNaXNzb3VyaScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTW9udGFuYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmVicmFza2EnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ05ldmFkYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEhhbXBzaGlyZScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEplcnNleScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IE1leGljbycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV3IFlvcmsnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ05vcnRoIENhcm9saW5hJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdOb3J0aCBEYWtvdGEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnT2hpbycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnT2tsYWhvbWEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ09yZWdvbicsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnUGFsYXUnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ1Blbm5zeWx2YW5pYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnUHVlcnRvIFJpY28nLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ1Job2RlIElzbGFuZCcsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnU291dGggQ2Fyb2xpbmEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ1NvdXRoIERha290YScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVGVubmVzc2VlJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdUZXhhcycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVXRhaCcsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVmVybW9udCcsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdXYXNoaW5ndG9uJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdXZXN0IFZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdXaXNjb25zaW4nLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ1d5b21pbmcnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJycsIHZhbHVlOiAnJ31cclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbENoYW5nZSgpe1xyXG4gICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSAkKCcjbXlDaGVja0xpc3QnKS5jaGVja0xpc3QoJ2dldFNlbGVjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgICAkKCcjc2VsZWN0ZWRJdGVtcycpLnRleHQoSlNPTi5zdHJpbmdpZnkoc2VsZWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YoalF1ZXJ5LnVpLmNoZWNrTGlzdCkgIT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgICAgICQoJyNmaWx0ZXJMaXN0JykuY2hlY2tMaXN0KHtcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtczogZGF0YU1vZGVsLFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IHNlbENoYW5nZVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKCdmb3JtOm5vdChbY2xhc3MqPVwibGF5b3V0LWJ1aWxkZXJcIl0pIFt0eXBlPWNoZWNrYm94XScpLmVhY2goIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICQoJ1t0eXBlPWNoZWNrYm94XScpLmNoZWNrYm94cmFkaW8oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCdmb3JtOm5vdChbY2xhc3MqPVwibGF5b3V0LWJ1aWxkZXJcIl0pIFt0eXBlPXJhZGlvXScpLmNoZWNrYm94cmFkaW8oKS5idXR0b25zZXQoKS5maW5kKCdsYWJlbCcpLmNzcygnd2lkdGgnLCAnMTkuNCUnKTtcclxuXHJcbiAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLmtleXVwKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBSYW5nZSBGaWVsZFxyXG4gICAgICAgICAgICB2YXIgbGVnZW5kID0gJCgnLmFtYV9fcmFuZ2UtZmllbGRfX2xlZ2VuZCcpO1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gJCggXCIjY3VycmVudFZhbHVlXCIgKTtcclxuXHJcbiAgICAgICAgICAgICQoXCIuYW1hX19yYW5nZS1maWVsZFwiKS5zbGlkZXIoe1xyXG4gICAgICAgICAgICAgIGFuaW1hdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgcmFuZ2U6ICdtaW4nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgIG1pbjogMjAwMCxcclxuICAgICAgICAgICAgICBtYXg6IDUwMDAsXHJcbiAgICAgICAgICAgICAgc3RlcDogMSxcclxuICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlID0galF1ZXJ5KHRoaXMpLmZpbmQoJy51aS1zbGlkZXItaGFuZGxlJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnViYmxlID0galF1ZXJ5KCc8ZGl2IGNsYXNzPVwiYW1hX19yYW5nZS1maWVsZF9fdmFsdWVib3hcIj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgICAgIGhhbmRsZS5hcHBlbmQoYnViYmxlKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5oYW5kbGUuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgPSAnJCcgKyB1aS52YWx1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmFwcGVuZChsZWdlbmQpO1xyXG5cclxuICAgICAgICAgICAgLy8gRm9ybSBhY2NvcmRpb25cclxuICAgICAgICAgICAgJCggXCIudGFibGlzdFwiICkuYWNjb3JkaW9uKHtcclxuICAgICAgICAgICAgICBoZWFkZXI6IFwiLmFtYV9fZm9ybS1zdGVwc19fc3RlcFwiLFxyXG4gICAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEV4cGFuZCBsaXN0XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGV4cGFuZExpc3RBY2NvcmRpb24oZWxlbWVudCwgb3Blbil7XHJcbiAgICAgICAgICAgICAgJChlbGVtZW50KS5hY2NvcmRpb24oe1xyXG4gICAgICAgICAgICAgICAgbXVsdGlwbGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpY29uczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCIsXHJcbiAgICAgICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGU6IDUwMCxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZTogb3BlbixcclxuICAgICAgICAgICAgICAgIGFjdGl2YXRlIDogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICBpZigkKHVpLm5ld1BhbmVsKS5oYXNDbGFzcygndWktYWNjb3JkaW9uLWNvbnRlbnQtYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHVpLm5ld1BhbmVsKS5wcmV2KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodWkub2xkUGFuZWwpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCQoXCIuYW1hX19leHBhbmQtbGlzdFwiKS5maW5kKCcudWktY2hlY2tib3hyYWRpby1jaGVja2VkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgZXhwYW5kTGlzdEFjY29yZGlvbignLmFtYV9fZXhwYW5kLWxpc3QnLCAwKTtcclxuICAgICAgICAgICAgICAkKFwiLmFtYV9fZXhwYW5kLWxpc3QgLmFtYV9fZXhwYW5kLWxpc3RfX2hlYWRlclwiKS5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBleHBhbmRMaXN0QWNjb3JkaW9uKCcuYW1hX19leHBhbmQtbGlzdCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAkKFwiLmFtYV9fZXhwYW5kLWxpc3RcIikuY2hpbGRyZW4oJy5hbWFfX2V4cGFuZC1saXN0X19oZWFkZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENvbGxhcHNlIGFsbCBhY2NvcmRpb24gcGFuZWxzXHJcbiAgICAgICAgICAgICQoJy5hbWFfX2ZpbHRlcl9fY29sbGFwc2UtcGFuZWxzIGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QgLnVpLWFjY29yZGlvbi1oZWFkZXInKS5lYWNoKCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ3VpLXN0YXRlLWFjdGl2ZScpIHx8ICQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICQodGhpcykuY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBPcGVuIGFjY29yZGlvbiBwYW5lbHMgZm9yIG1vYmlsZVxyXG4gICAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICQoJy5hbWFfX2V4cGFuZC1saXN0LCAuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3RhZ3MnKS5zbGlkZVRvZ2dsZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoJy5hbWFfX2FwcGxpZWQtZmlsdGVyc19fc2hvdy1maWx0ZXJzJykudGV4dCgkKHRoaXMpLmlzKCc6dmlzaWJsZScpID8gJ0hpZGUgRmlsdGVyJyA6ICdGaWx0ZXInKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0RmlsdGVyKGlucHV0LCBsaXN0KSB7IC8vIGhlYWRlciBpcyBhbnkgZWxlbWVudCwgbGlzdCBpcyBhbiB1bm9yZGVyZWQgbGlzdFxyXG4gICAgICAgICAgICAgIC8vIGN1c3RvbSBjc3MgZXhwcmVzc2lvbiBmb3IgYSBjYXNlLWluc2Vuc2l0aXZlIGNvbnRhaW5zKClcclxuICAgICAgICAgICAgICBqUXVlcnkuZXhwclsnOiddLkNvbnRhaW5zID0gZnVuY3Rpb24oYSxpLG0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChhLnRleHRDb250ZW50IHx8IGEuaW5uZXJUZXh0IHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihtWzNdLnRvVXBwZXJDYXNlKCkpPj0wO1xyXG4gICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICQoaW5wdXQpLmNoYW5nZSggZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlciA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBpZihmaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gdGhpcyBmaW5kcyBhbGwgbGlua3MgaW4gYSBsaXN0IHRoYXQgY29udGFpbiB0aGUgaW5wdXQsXHJcbiAgICAgICAgICAgICAgICAgIC8vIGFuZCBoaWRlIHRoZSBvbmVzIG5vdCBjb250YWluaW5nIHRoZSBpbnB1dCB3aGlsZSBzaG93aW5nIHRoZSBvbmVzIHRoYXQgZG9cclxuICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwic3Bhbjpub3QoOkNvbnRhaW5zKFwiICsgZmlsdGVyICsgXCIpKVwiKS5wYXJlbnQoKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcInNwYW46Q29udGFpbnMoXCIgKyBmaWx0ZXIgKyBcIilcIikucGFyZW50KCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwibGFiZWxcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gb25seSBzaG93IHJlc3VsdHMgYWZ0ZXIgMyBjaGFyYWN0ZXJzIGFyZSBlbnRlcmVkXHJcbiAgICAgICAgICAgICAgfSkua2V5dXAoIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMudmFsdWUubGVuZ3RoIDwgNCApIHJldHVybjtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGlzdEZpbHRlcigkKFwiI2FtYV9fc2VhcmNoX19sb2NhdGlvblwiKSwgJChcIi5hbWFfX2Zvcm0tZ3JvdXBcIikpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KShqUXVlcnkpO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIFJpYmJvbiBuYXYgdXNlciBpbnRlcmFjdGlvbnMuXHJcbiAqXHJcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxyXG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuICdhbm9ueW1vdXMgY2xvc3VyZScuIFNlZTpcclxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXHJcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcclxuICovXHJcbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcblxyXG4gIERydXBhbC5iZWhhdmlvcnMucmliYm9ubmF2ID0ge1xyXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuXHJcbiAgICAgIC8vIE5lZWRzIGRvYyByZWFkeSBiZWNhdXNlIHRoZSBhZG1pbiB0b29sYmFyIG5lZWRzIHRvIGdldCBsb2FkZWQgdG8gZGV0ZXJtaW5lIHRoZSB0b3Agc3BhY2luZyBmb3Igc3RpY2t5IG5hdlxyXG4gICAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciAkYm9keUZpeGVkID0gJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnKTtcclxuXHJcbiAgICAgICAgaWYoJGJvZHlGaXhlZCA9PT0gJ2hpZGRlbicpIHtcclxuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbicpLnVuc3RpY2soKTtcclxuICAgICAgICAgICQoJy5hbWFfbG9ja2VyX25hdmlnYXRpb24nKS51bnN0aWNrKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIGlmKCQod2luZG93KS53aWR0aCgpIDwgNzY4ICkgeyAvLyBJZiBsZXNzIHRoYW4gdGFibGV0XHJcbiAgICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24nKS5zdGlja3koe3pJbmRleDogNTAxfSk7XHJcbiAgICAgICAgICAkKCcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uJykuc3RpY2t5KHt6SW5kZXg6IDUwMX0pO1xyXG4gICAgICAgIH0gZWxzZSBpZigkKCcudG9vbGJhci10cmF5JykuaGFzQ2xhc3MoJ3Rvb2xiYXItdHJheS1ob3Jpem9udGFsJykpIHtcclxuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAnKS5zdGlja3koeyB6SW5kZXg6IDUwMSwgdG9wU3BhY2luZzogNzIgfSk7XHJcbiAgICAgICAgICAkKCcuYW1hX2xvY2tlcl9uYXZpZ2F0aW9uJykuc3RpY2t5KHsgekluZGV4OiA1MDEsIHRvcFNwYWNpbmc6IDEzMiB9KTtcclxuICAgICAgICB9IGVsc2UgaWYoJCgnLnRvb2xiYXItdHJheScpLmhhc0NsYXNzKCd0b29sYmFyLXRyYXktdmVydGljYWwnKSkge1xyXG4gICAgICAgICAgJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uICcpLnN0aWNreSh7IHpJbmRleDogNTAxLCB0b3BTcGFjaW5nOiAzOSB9KTtcclxuICAgICAgICAgICQoJy5hbWFfbG9ja2VyX25hdmlnYXRpb24nKS5zdGlja3koeyB6SW5kZXg6IDUwMSwgdG9wU3BhY2luZzogOTkgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAnKS5zdGlja3koeyB6SW5kZXg6IDUwMSB9KTtcclxuICAgICAgICAgICQoJy5hbWFfbG9ja2VyX25hdmlnYXRpb24nKS5zdGlja3koe3pJbmRleDogNTAxLCB0b3BTcGFjaW5nOiA2MH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzX2FjdGl2ZSA9ICdpcy1hY3RpdmUnO1xyXG5cclxuICAgICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duX190cmlnZ2VyJywgdGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIC8vIFVuZm9jdXMgb24gdGhlIGRyb3Bkb3duLlxyXG4gICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XHJcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIGZvciBDU1MuXHJcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XHJcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIHRvIHRoZSBkcm9wZG93biBVTC5cclxuICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayggZnVuY3Rpb24oKXtcclxuICAgICAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd25fX3RyaWdnZXInLCB0aGlzKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG4iLCIvKipcclxuICogQGZpbGVcclxuICogU3ViY2F0ZWdvcnlcclxuICpcclxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XHJcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XHJcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxyXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXHJcbiAqL1xyXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gIERydXBhbC5iZWhhdmlvcnMuc3ViY2F0ZWdvcmllcyA9IHtcclxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgICAvLyBDcmVhdGUgc3RhdGljIHZhciBmb3Igc3ViY2F0ZWdvcnkgaXRlbSBjb3VudC4gVG8gYmUgdXNlZCBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciByZWNhbGN1bGF0aW9ucyBhcmUgbmVlZGVkLlxyXG4gICAgICB2YXIgc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbkNvbHVtbnMgPSAwO1xyXG5cclxuICAgICAgZnVuY3Rpb24gY2hlY2tTaXplKCkge1xyXG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnkgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc3ViY2F0ZWdvcnknKTtcclxuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5Q29udGFpbmVyID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX2NvbnRhaW5lcicpO1xyXG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnlUaXRsZSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX190aXRsZScpO1xyXG4gICAgICAgIC8vIFdlIHdhbnQgdGhlIHdpZHRoIG1pbnVzIHBhZGRpbmcgc28gdXNlIHdpZHRoKCkgaW5zdGVhZCBvZiBpbm5lcldpZHRoKCkuXHJcbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5RXhwbG9yYXRpb25XaWR0aCA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzJykud2lkdGgoKTtcclxuICAgICAgICAvLyBTdWJjYXRlZ29yeSBpdGVtcyBoYXZlIG1heC13aWR0aCBvZiAxODBweC4gVGhpcyB3aWxsIGJlIHVzZWQgZm9yIGNhbGN1bGF0aW9ucyBpbnN0ZWFkIG9mIGV4dHJhY3RpbmcgaXQgdmlhIGpRdWVyeSBjYWxscy5cclxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlJdGVtV2lkdGggPSAxODA7XHJcbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5VGl0bGVXaWR0aCA9ICRzdWJjYXRlZ29yeVRpdGxlLm91dGVyV2lkdGgoKTtcclxuICAgICAgICB2YXIgdG90YWxHcmlkSXRlbXMgPSAkc3ViY2F0ZWdvcnkubGVuZ3RoICsgMTtcclxuICAgICAgICAvLyBTdGFydCBjb2x1bW4gY291bnQgYXMgbG93ZXN0IHBvc3NpYmxlLlxyXG4gICAgICAgIHZhciBjb2x1bW5Db3VudCA9IDI7XHJcbiAgICAgICAgLy8gU2V0IHN1YmNhdGVnb3J5IHJvdyBpdGVtcyB0byBsb3dlc3QgdGhhdCBzaG91bGQgZGlzcGxheS5cclxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyA9IE1hdGguZmxvb3IoKHN1YmNhdGVnb3J5RXhwbG9yYXRpb25XaWR0aCAtIHN1YmNhdGVnb3J5VGl0bGVXaWR0aCkgLyBzdWJjYXRlZ29yeUl0ZW1XaWR0aCk7XHJcblxyXG4gICAgICAgIGlmIChzdWJjYXRlZ29yeUl0ZW1zUGVyUm93IDwgMikge1xyXG4gICAgICAgICAgLy8gVGhlIG1pbmltdW0gc3ViY2F0ZWdvcnkgaXRlbXMgcGVyIHJvdyBzaG91bGQgYmUgdHdvLiBJZiB0aGUgdmFyaWFibGUgY29tcHV0ZWQgdG8gbGVzcywgbWFudWFsbHkgY29ycmVjdCBpdC5cclxuICAgICAgICAgIHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgPSAyO1xyXG4gICAgICAgICAgdG90YWxHcmlkSXRlbXMgPSB0b3RhbEdyaWRJdGVtcyAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbHVtbkNvdW50ID0gc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyArIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgaWYgY2hhbmdlcyBpbiBjb2x1bW4gY291bnQgaGFzIG9jY3VycmVkIGFuZCBhY3QgYWNjb3JkaW5nbHlcclxuICAgICAgICBpZiAoc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbkNvbHVtbnMgIT09IGNvbHVtbkNvdW50KSB7XHJcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgYWRkaXRpb25hbCBcImZpbGxlci1ib3hcIiBuZWVkZWQgdG8gY3JlYXRlIGNvbXBsZXRlIHJvd1xyXG4gICAgICAgICAgdmFyIGZpbGxlckJveENvdW50ID0gY29sdW1uQ291bnQgLSAodG90YWxHcmlkSXRlbXMgJSBjb2x1bW5Db3VudCk7XHJcbiAgICAgICAgICBmaWxsR3JpZFJvdygkc3ViY2F0ZWdvcnlDb250YWluZXIsIGZpbGxlckJveENvdW50KTtcclxuICAgICAgICAgIC8vIFVwZGF0ZSBwZXJzaXN0ZW50IGNvbHVtbiBjb3VudFxyXG4gICAgICAgICAgc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbkNvbHVtbnMgPSBjb2x1bW5Db3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB2aWV3YWJsZSBzdWJjYXRlZ29yaWVzLlxyXG4gICAgICAgICRzdWJjYXRlZ29yeS5oaWRlKCk7XHJcbiAgICAgICAgJHN1YmNhdGVnb3J5LnNsaWNlKDAsIHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcclxuXHJcbiAgICAgICAgdmlld01vcmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gdmlld01vcmUoKSB7XHJcbiAgICAgICAgdmFyICR2aWV3TGVzcyA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWxlc3MnKTtcclxuICAgICAgICB2YXIgJHZpZXdNb3JlID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctYWxsJyk7XHJcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zdWJjYXRlZ29yeScpO1xyXG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnlDb250YWluZXIgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgICR2aWV3TGVzcy5oaWRlKCk7XHJcbiAgICAgICAgJHZpZXdNb3JlLnNob3coKTtcclxuXHJcbiAgICAgICAgJCgnLnZpZXdBbGwnKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgJHN1YmNhdGVnb3J5LmZhZGVJbigpO1xyXG4gICAgICAgICAgJHZpZXdNb3JlLmhpZGUoKTtcclxuICAgICAgICAgICRzdWJjYXRlZ29yeUNvbnRhaW5lci5hZGRDbGFzcygnZXhwYW5kZWQnKTtcclxuICAgICAgICAgICR2aWV3TGVzcy5zaG93KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcudmlld0xlc3MnKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgJHN1YmNhdGVnb3J5LmhpZGUoKTtcclxuICAgICAgICAgIGNoZWNrU2l6ZSgpO1xyXG4gICAgICAgICAgJHZpZXdMZXNzLmhpZGUoKTtcclxuICAgICAgICAgICRzdWJjYXRlZ29yeUNvbnRhaW5lci5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcclxuICAgICAgICAgICR2aWV3TW9yZS5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICBmdW5jdGlvbiBmaWxsR3JpZFJvdygkY29udGFpbmVyLCBjb3VudCkge1xyXG4gICAgICAgIHZhciBmaWxsZXJCb3ggPSAnPGRpdiBjbGFzcz1cImZpbGxlci1ib3hcIj48L2Rpdj4nO1xyXG4gICAgICAgIC8vIGNsZWFyIG91dCBjdXJyZW50IGZpbGxlciBib3hlc1xyXG4gICAgICAgIHZhciAkZmlsbGVyQm94ZXMgPSAkY29udGFpbmVyLmZpbmQoJy5maWxsZXItYm94Jyk7XHJcbiAgICAgICAgJGZpbGxlckJveGVzLnJlbW92ZSgpO1xyXG4gICAgICAgIC8vIGZpbGwgb3V0IGdyaWQgcm93XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAkY29udGFpbmVyLmFwcGVuZChmaWxsZXJCb3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcnVuIHRlc3Qgb24gaW5pdGlhbCBwYWdlIGxvYWRcclxuICAgICAgY2hlY2tTaXplKCk7XHJcblxyXG4gICAgICAvLyBydW4gdGVzdCBvbiByZXNpemUgb2YgdGhlIHdpbmRvd1xyXG4gICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjaGVja1NpemUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG4iLCIvKipcclxuICogQGZpbGVcclxuICogSW50ZXJhY3Rpb25zIGZvciB3YXlmaW5kZXIuXHJcbiAqXHJcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxyXG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxyXG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcclxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxyXG4gKi9cclxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLndheWZpbmRlciA9IHtcclxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XHJcbiAgICAgIChmdW5jdGlvbiAoJCkge1xyXG4gICAgICAgIGlmKCQuY29va2llKCdhbWFfd2F5ZmluZGVyX2Nvb2tpZScpKSB7XHJcbiAgICAgICAgICAkLmNvb2tpZS5qc29uID0gdHJ1ZTtcclxuICAgICAgICAgIC8vIFJlYWQgd2F5ZmluZGVyIGNvb2tpZXMgc2V0IGZyb20gYW1hLWFzc24gZG9tYWluc1xyXG4gICAgICAgICAgdmFyIGFtYV93YXlmaW5kZXJfY29va2llID0gJC5jb29raWUoJ2FtYV93YXlmaW5kZXJfY29va2llJyk7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGFtYV93YXlmaW5kZXJfY29va2llICE9PSAndW5kZWZpbmVkJyB8fCAkKCcucmVmZXJyZWQnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICQoJy5hbWFfX3dheWZpbmRlci0tcmVmZXJyZXIgYScpLmZhZGVJbigpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XHJcbiAgICAgICAgICAgICQoJy5hbWFfX3dheWZpbmRlci0tcmVmZXJyZXIgYScpLmF0dHIoXCJocmVmXCIsIGFtYV93YXlmaW5kZXJfY29va2llWzFdKTtcclxuICAgICAgICAgICAgJCgnLmFtYV9fd2F5ZmluZGVyLS1yZWZlcnJlciBhJykudGV4dChhbWFfd2F5ZmluZGVyX2Nvb2tpZVswXSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuYW1hX3dheWZpbmRlcl9yZWZlcnJlci0tbGluay1iYWNrJykuZmFkZU91dCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkoalF1ZXJ5KTtcclxuICAgIH1cclxuICB9O1xyXG59KShqUXVlcnksIERydXBhbCk7XHJcbiIsIi8qPT09PT09IGpRdWVyeSBVSSB0YWJzID09PT09PSovXHJcblxyXG5cclxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV90YWJzID0ge1xyXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuICAgICAgdmFyIGRlZmF1bHRBY3RpdmVUYWIgPSAwO1xyXG4gICAgICB2YXIgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICBpZiAodmlld3BvcnRXaWR0aCA+PSA2MDAgJiYgJCgnLmFtYV9fcmVzb3VyY2UtdGFicycpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBkZWZhdWx0QWN0aXZlVGFiID0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJChcIi5hbWFfX3RhYnMsIC5hbWFfX3Jlc291cmNlLXRhYnNcIikudGFicyh7XHJcbiAgICAgICAgYWN0aXZlOiBkZWZhdWx0QWN0aXZlVGFiLFxyXG4gICAgICAgIGFjdGl2YXRlOiByZW1vdmVIaWdobGlnaHRzXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gUHJldmVudCBqdW1wIG9uY2xpY2tcclxuICAgICAgJCgnLnVpLXRhYnMtYW5jaG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9KTtcclxuXHJcblxyXG4gICAgICAvL1NpbXVsYXRlIGNsaWNrIGV2ZW50IG9uIGFjdHVhbCBzaW1wbGVUYWJzIHRhYiBmcm9tIG1vYmlsZSBkcm9wIGRvd24uXHJcbiAgICAgICQoJy5hbWFfX3RhYnMtbmF2aWdhdGlvbi0tbW9iaWxlIHNlbGVjdCcpLm9uKFwic2VsZWN0bWVudWNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSB1aS5pdGVtLnZhbHVlO1xyXG4gICAgICAgICQoJ2FbaHJlZj1cIiMnICsgc2VsZWN0ZWRWYWx1ZSArICdcIl0nKS5jbGljaygpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFdoZW4gY2xpY2tpbmcgYW4gaW5saW5lIHJlc291cmNlIHBhZ2UgbGluayByZWZlcmVuY2luZyBhIHRhYiwgb3BlbiByZWZlcmVuY2VkIHRhYi5cclxuICAgICAgJCgnLmFtYV9fcmVzb3VyY2UtbGluay0taW5saW5lLCAuYW1hX19wYWdlLS1yZXNvdXJjZV9fcmVzb3VyY2UtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyICR0YWJzID0gJCgnLmFtYV9fcmVzb3VyY2UtdGFicycpO1xyXG4gICAgICAgIHN3aXRjaFRhYnMoJHRhYnMsIHRoaXMpO1xyXG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBmdW5jdGlvbiByZW1vdmVIaWdobGlnaHRzKCkge1xyXG4gICAgICAgICQoJy5hbWFfcmVzb3VyY2UtaGVhZGVyLS1oaWdobGlnaHQnKS5yZW1vdmVDbGFzcygnYW1hX3Jlc291cmNlLWhlYWRlci0taGlnaGxpZ2h0Jyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qXHJcbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gYW5pbWF0ZXMgdGhlIGJyb3dzZXIgc2Nyb2xsIGFjdGlvbiB3aXRoIGF0dGVudGlvbiB0byBrZXlib2FyZCBvbmx5IGFjY2Vzc2liaWxpdHkgY29uY2VybnNcclxuICAgICAgICpcclxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFiTmF2XHJcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5IE9iamVjdH0gJHRhcmdldFxyXG4gICAgICAgKi9cclxuICAgICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKCR0YWJOYXYsIHRhYkhhc2gsIHBvc2l0aW9uSW5UYWIpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsVGFyZ2V0ID0gd2luZG93LmlubmVyV2lkdGggPj0gMTIwMCA/ICcuYW1hX19yZXNvdXJjZS10YWJzX19jb250ZW50JyA6ICdodG1sLGJvZHknO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgcHJldmlvdXMgaGlnaGxpZ2h0cywgaWYgYW55XHJcbiAgICAgICAgcmVtb3ZlSGlnaGxpZ2h0cygpO1xyXG5cclxuICAgICAgICAvLyBUcnkgdG8gZmluZCB0YXJnZXQgZWxlbWVudCBvZmZzZXQsIGJ1dCBkZWZhdWx0IHRvIHplcm9cclxuICAgICAgICB2YXIgc2Nyb2xsUG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHZhciAkdGFyZ2V0O1xyXG4gICAgICAgIGlmIChwb3NpdGlvbkluVGFiICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHZhciB0YWJFbGVtZW50cyA9ICQodGFiSGFzaCArICcgLmFtYV9fcmVzb3VyY2UtdGFic19faXRlbScpO1xyXG4gICAgICAgICAgaWYgKHRhYkVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyBJZiBkZXNpcmVkIHBvc2l0aW9uIGlzIGxhcmdlciB0aGFuIHRoZSByZXN1bHQgc2V0LCB1c2UgdGhlIGxhc3QgZWxlbWVudFxyXG4gICAgICAgICAgICBpZiAodGFiRWxlbWVudHMubGVuZ3RoIDw9IHBvc2l0aW9uSW5UYWIpIHtcclxuICAgICAgICAgICAgICBwb3NpdGlvbkluVGFiID0gdGFiRWxlbWVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFVzZXJzIGFyZSBpbnN0cnVjdGVkIHRvIGNvbnNpZGVyIDEgYXMgdGhlIGZpcnN0IGVsZW1lbnRcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRhYkVsZW1lbnRzW3Bvc2l0aW9uSW5UYWIgLSAxXTtcclxuICAgICAgICAgICAgc2Nyb2xsUG9zaXRpb24gPSB0YXJnZXQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICAvLyBBZGQgaGlnaGxpZ2h0IHRvIHRhcmdldFxyXG4gICAgICAgICAgICAkdGFyZ2V0ID0gJCh0YXJnZXQpLmZpbmQoJy5hbWFfcmVzb3VyY2UtaGVhZGVyJyk7IC8vIHNhdmUgZm9yIHVzZSBpbiBhbmltYXRlKCkgY2FsbGJhY2tcclxuICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnYW1hX3Jlc291cmNlLWhlYWRlci0taGlnaGxpZ2h0Jyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICR0YXJnZXQgPSAkKHRhYkhhc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkKHNjcm9sbFRhcmdldCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFBvc2l0aW9uXHJcbiAgICAgICAgfSwgODUwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAvLyBVcGRhdGUgZm9jdXMgZm9yIGtleWJvYXJkIG9ubHkgbmF2aWdhdGlvblxyXG4gICAgICAgICAgJHRhcmdldC5hdHRyKCd0YWJpbmRleCcsICctMScpLmZvY3VzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLypcclxuICAgICAgICogVGhpcyBmdW5jdGlvbiBvcGVucyByZWZlcmVuY2VkIHRhYnMgZnJvbSBpbmxpbmUgbGlua3NcclxuICAgICAgICpcclxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFiT2JqIFRoZSBlbGVtZW50IHdoaWNoIGhhcyB0aGUgLnRhYigpIGZ1bmN0aW9uIGF0dGFjaGVkLlxyXG4gICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGxpbmtcclxuICAgICAgICovXHJcbiAgICAgIGZ1bmN0aW9uIHN3aXRjaFRhYnMoJHRhYk9iaiwgbGluaykge1xyXG5cclxuICAgICAgICB2YXIgbGlua0hhc2ggPSBsaW5rLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcbiAgICAgICAgdmFyIHdpZGdldCA9ICR0YWJPYmouZGF0YSgndWktdGFicycpO1xyXG5cclxuICAgICAgICB2YXIgdGFiSGFzaCwgcG9zaXRpb25JblRhYjtcclxuICAgICAgICB2YXIgcGFydHMgPSBsaW5rSGFzaC5zcGxpdCgnLScpO1xyXG4gICAgICAgIHRhYkhhc2ggPSBwYXJ0c1swXTtcclxuICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgcG9zaXRpb25JblRhYiA9IHBhcnRzWzFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBJZiBvbGQgbGluaywgdHJ5IHRvIGRldGVybWluZSBwb3NpdGlvbiBmcm9tIGxpbmsgdGV4dFxyXG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSBsaW5rLmlubmVyVGV4dC5tYXRjaCgvKFswLTldKykvZyk7XHJcbiAgICAgICAgICBpZiAobWF0Y2hlcykge1xyXG4gICAgICAgICAgICBwb3NpdGlvbkluVGFiID0gbWF0Y2hlcy5zaGlmdCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRW5zdXJlIGNvcnJlY3QgdGFiIGlzIGFjdGl2ZVxyXG4gICAgICAgIHZhciB0YWJJbmRleCA9IHdpZGdldC5fZ2V0SW5kZXgodGFiSGFzaCk7XHJcbiAgICAgICAgJHRhYk9iai50YWJzKHtcclxuICAgICAgICAgIGFjdGl2ZTogdGFiSW5kZXhcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRvcCBvZiB1aSB0YWJzIG5hdmlnYXRpb25cclxuICAgICAgICBzbW9vdGhTY3JvbGwoJHRhYk9iaiwgdGFiSGFzaCwgcG9zaXRpb25JblRhYik7XHJcblxyXG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiLyo9PT09PT0galF1ZXJ5IFVJIGFjY29yZGlvbiA9PT09PT0qL1xyXG5cclxuKGZ1bmN0aW9uKCQpIHtcclxuICAgICQoIFwiLmFtYV9fYWNjb3JkaW9uXCIgKS5hY2NvcmRpb24oe1xyXG4gICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcclxuICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcclxuICAgICAgICBhY3RpdmU6IGZhbHNlXHJcbiAgICB9KTtcclxufSkoalF1ZXJ5KTtcclxuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICB2YXIgdmVyaWZ5RmllbGRzID0gZnVuY3Rpb24oZm9ybSkge1xyXG4gICAgdmFyICRzZWN0aW9ucyA9IGZvcm0uZmluZCgnc2VjdGlvbicpO1xyXG4gICAgdmFyICRpbnB1dHMgPSAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gc2VjdGlvbiAqJykuZmlsdGVyKCc6aW5wdXQnKTtcclxuICAgIHZhciAkaWNvbkVsZW1lbnQgPSAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJyk7XHJcbiAgICB2YXIgZXJyb3JTZWN0aW9ucyA9IFtdO1xyXG5cclxuICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbihpLCBpbnB1dCkge1xyXG4gICAgICAkY2xvc2VzdFNlY3Rpb24gPSAkKHRoaXMpLmNsb3Nlc3QoJ3NlY3Rpb24nKS5hdHRyKCdkYXRhLWRydXBhbC1zZWxlY3RvcicpLnRvU3RyaW5nKCk7XHJcbiAgICAgIGlmICgkKHRoaXMpLnByb3AoJ3JlcXVpcmVkJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXJyb3InKSkge1xyXG4gICAgICAgIGVycm9yU2VjdGlvbnMucHVzaCgkY2xvc2VzdFNlY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2VjdGlvbnMuZWFjaChmdW5jdGlvbihpLCBzZWN0aW9uKSB7XHJcbiAgICAgIGlmICgkLmluQXJyYXkoJCh0aGlzKS5hdHRyKCdkYXRhLWRydXBhbC1zZWxlY3RvcicpLnRyaW0oKS50b1N0cmluZygpLCBlcnJvclNlY3Rpb25zKSAhPT0gLTEpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJGljb25FbGVtZW50KS5yZW1vdmVDbGFzcygnZWRpdCBlcnJvciBjb21wbGV0ZWQnKS5hZGRDbGFzcygnZXJyb3InKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJGljb25FbGVtZW50KS5yZW1vdmVDbGFzcygnZWRpdCBlcnJvciBjb21wbGV0ZWQnKS5hZGRDbGFzcygnY29tcGxldGVkJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbCkge1xyXG4gICAgdmFyIGVtYWlsUmVnID0gL14oW1xcdy1cXC5dK0AoW1xcdy1dK1xcLikrW1xcdy1dezIsNH0pPyQvO1xyXG4gICAgcmV0dXJuIGVtYWlsUmVnLnRlc3QoZW1haWwpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZmllbGRJc1JlcXVpcmVkKGlucHV0KSB7XHJcbiAgICBpbnB1dC5hZGRDbGFzcygnZXJyb3InKTtcclxuICAgIGlucHV0Lm5leHQoKS5yZW1vdmUoJy5mb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2UnKTtcclxuICAgIGlucHV0LmFmdGVyKCc8ZGl2IGNsYXNzPVwiZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlXCI+RmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+Jyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjaGVja0ZpZWxkKGlucHV0KSB7XHJcbiAgICBpZiAoaW5wdXQucHJvcCgncmVxdWlyZWQnKSAmJiAoaW5wdXQudmFsKCkubGVuZ3RoID09PSAwIHx8IGlucHV0LnZhbCgpID09PSBcIlwiKSkge1xyXG4gICAgICBmaWVsZElzUmVxdWlyZWQoaW5wdXQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmIChpbnB1dC5hdHRyKCd0eXBlJykgPT09ICdlbWFpbCcgJiYgIXZhbGlkYXRlRW1haWwoaW5wdXQudmFsKCkpKSB7XHJcbiAgICAgICAgZmllbGRJc1JlcXVpcmVkKGlucHV0KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKS5uZXh0KCkucmVtb3ZlKCcuZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFN1Ym1pdHMgZmlyc3QgcGFnZSBvZiBDb250YWN0IFVzIGZvcm0gb24gcmFkaW8gYnV0dG9uIHNlbGVjdGlvblxyXG4gICQuZm4uY29udGFjdFN1Ym1pdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgJHdlYmZvcm1fYnV0dG9ucyA9ICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tY29udGFjdC11cy1mb3JtIGlucHV0W3R5cGU9XCJyYWRpb1wiXScpO1xyXG4gICAgJHdlYmZvcm1fYnV0dG9ucy5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1jb250YWN0LXVzLWZvcm0nKS5zdWJtaXQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAkLmZuLmNvbnRhY3RTdWJtaXQoKTtcclxuICAkKCBkb2N1bWVudCApLmFqYXhDb21wbGV0ZShmdW5jdGlvbigpIHtcclxuICAgICQuZm4uY29udGFjdFN1Ym1pdCgpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBHbyBiYWNrIHRvIHByZXZpb3VzIGJhY2sgaXMgdXNlciBjbGlja3MgZGVjbGluZSBzdWJtaXQgYnV0dG9uXHJcbiAgJCgnLmFtYV9fYnV0dG9uLS1kZWNsaW5lJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciA9PT0gXCJcIikge1xyXG4gICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmPScvJztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBoaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdmFyIGluaXRpYWxMb2FkID0gdHJ1ZTtcclxuXHJcbiAgRHJ1cGFsLmJlaGF2aW9ycy53ZWJGb3JtID0ge1xyXG4gICAgZGV0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MsIHRyaWdnZXIpIHtcclxuICAgICAgaWYgKHRyaWdnZXIgPT09ICdzZXJpYWxpemUnKSB7XHJcbiAgICAgICAgaW5pdGlhbExvYWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XHJcbiAgICAgIGlmICghaW5pdGlhbExvYWQpIHtcclxuICAgICAgICBpZiAoIWNvbnRleHQuaW5uZXJUZXh0Lm1hdGNoKFwiRXJyb3IgbWVzc2FnZVwiKSkge1xyXG4gICAgICAgICAgJCgnLmFtYV9fc2FsZXMtbGFuZGluZy1wYWdlX19mb3JtX19oZWFkaW5nJykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgJC52YWxpZGF0b3IuYWRkTWV0aG9kKFxyXG4gICAgICAgIFwicmVnZXhcIixcclxuICAgICAgICBmdW5jdGlvbih2YWx1ZSwgZWxlbWVudCwgcmVnZXhwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25hbChlbGVtZW50KSB8fCByZWdleHAudGVzdCh2YWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlBsZWFzZSBjaGVjayB5b3VyIGlucHV0LlwiXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBPbiB3ZWJmb3JtIHN1Ym1pdCBjaGVjayB0byBzZWUgaWYgYWxsIGlucHV0cyBhcmUgdmFsaWRcclxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtJykudmFsaWRhdGUoe1xyXG4gICAgICAgIGlnbm9yZTogW10sXHJcbiAgICAgICAgcnVsZXM6IHtcclxuICAgICAgICAgICdlbWFpbCc6IHtcclxuICAgICAgICAgICAgZW1haWw6IHRydWVcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAndGVsZXBob25lJzoge1xyXG4gICAgICAgICAgICAncmVnZXgnOiAvXihcXCtcXGR7MSwyfVxccyk/XFwoP1xcZHszfVxcKT9bXFxzLi1dP1xcZHszfVtcXHMuLV0/XFxkezR9JC9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAnYmlydGhfeWVhcic6IHtcclxuICAgICAgICAgICAgJ3JlZ2V4JzogL14oMTl8MjApXFxkezJ9JC9cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbihlcnJvciwgZWxlbWVudCkge1xyXG4gICAgICAgICAgaWYgKGVsZW1lbnQuYXR0cihcInR5cGVcIikgPT09IFwiY2hlY2tib3hcIikge1xyXG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50LnBhcmVudCgpLnNpYmxpbmdzKCkubGFzdCgpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnQuaXMoXCJzZWxlY3RcIikpIHtcclxuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudC5uZXh0KCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW52YWxpZEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0sIHZhbGlkYXRvcikge1xyXG4gICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRvci5udW1iZXJPZkludmFsaWRzKCk7XHJcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XHJcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5hZGRDbGFzcygnZXJyb3InKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZigkKCcuanMtZm9ybS10eXBlLXJhZGlvJykuZmluZCgnbGFiZWwuZXJyb3InKS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgJCgnLmpzLWZvcm0tdHlwZS1yYWRpbyBsYWJlbC5lcnJvcicpLnBhcmVudHMoJy5maWVsZHNldC13cmFwcGVyJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBpbnB1dHMgYXJlIHZhbGlkXHJcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gbGFiZWwuZXJyb3InKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYoICQodGhpcykudGV4dCgpICE9PSAnJykge1xyXG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEFkZCB2YWxpZGF0aW9uIHRvIHNlbGVjdCBkcm9wZG93biBtZW51cyB1c2luZyBqUXVlcnkgVUlcclxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIHNlbGVjdCcpLnNlbGVjdG1lbnUoe1xyXG4gICAgICAgIHN0eWxlOiAnZHJvcGRvd24nLFxyXG4gICAgICAgIHRyYW5zZmVyQ2xhc3NlczogdHJ1ZSxcclxuICAgICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJChcIi53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybVwiKS52YWxpZGF0ZSgpLmVsZW1lbnQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KShqUXVlcnksIERydXBhbCk7XHJcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcblxyXG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX21haW5OYXZpZ2F0aW9uID0ge1xyXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuXHJcbiAgICAgIHZhciAkY2F0ZWdvcnlOYXZXcmFwcGVyID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX3dyYXBwZXInKSxcclxuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnUnKSxcclxuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fZ3JvdXAnKSxcclxuICAgICAgICAgICRtb2JpbGVTZWFyY2hUcmlnZ2VyID0gJCgnLmdsb2JhbC1zZWFyY2gtdHJpZ2dlcicpLFxyXG4gICAgICAgICAgJG1vYmlsZVNlYXJjaCA9ICQoJy5hbWFfX2dsb2JhbC1zZWFyY2gnKSxcclxuICAgICAgICAgICRtYWluTmF2ID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uICcpLFxyXG4gICAgICAgICAgJHByb2R1Y3ROYXYgPSAkKCcuYW1hX19wcm9kdWN0LW5hdicpLFxyXG4gICAgICAgICAgJHN1Yk1lbnUgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fc3VibWVudScpLFxyXG4gICAgICAgICAgJHN1Yk1lbnVBcnRpY2xlID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2FydGljbGVzJyksXHJcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IDAsXHJcbiAgICAgICAgICBwcm9kdWN0TmF2SGVpZ2h0ID0gMCxcclxuICAgICAgICAgIGNhdGVnb3J5TmF2TWVudUhlaWdodCA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51Jykub3V0ZXJIZWlnaHQoKSxcclxuICAgICAgICAgIGNhdGVnb3J5TmF2TWVudVJlc2l6ZWRIZWlnaHQgPSAwLFxyXG4gICAgICAgICAgd2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKSxcclxuICAgICAgICAgICRhbGVydF9iYW5uZXIgPSAkKCcuYW1hX19hbGVydF9fd3JhcCcpO1xyXG5cclxuICAgICAgLy8gQ2hlY2tzIGlmIHVzZXIgYWdlbnQgaXMgYSBtb2JpbGUgZGV2aWNlXHJcbiAgICAgIHZhciBkZXZpY2VBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgdmFyIGFnZW50SUQgPSBkZXZpY2VBZ2VudC5tYXRjaCgvKGFuZHJvaWR8d2Vib3N8aXBob25lfGlwb2R8YmxhY2tiZXJyeSkvKSAmJiB3aW5kb3dXaWR0aCA8IDc2ODtcclxuXHJcbiAgICAgIC8vIFNldCBwcm9kdWN0IG5hdiBoZWlnaHQgaWYgcHJlc2VudC5cclxuICAgICAgaWYoJHByb2R1Y3ROYXYubGVuZ3RoICYmICRwcm9kdWN0TmF2LmlzKCc6dmlzaWJsZScpICl7XHJcbiAgICAgICAgcHJvZHVjdE5hdkhlaWdodCA9ICRwcm9kdWN0TmF2LmhlaWdodCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByb2R1Y3ROYXZIZWlnaHQgPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZXQgYWxlcnQgYmFubmVyIGhlaWdodCBpZiBwcmVzZW50LlxyXG4gICAgICBpZigkYWxlcnRfYmFubmVyLmxlbmd0aCAmJiAkYWxlcnRfYmFubmVyLmlzKCc6dmlzaWJsZScpKSB7XHJcbiAgICAgICAgYWxlcnRCYW5uZXJIZWlnaHQgPSAkYWxlcnRfYmFubmVyLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnRCYW5uZXJIZWlnaHQgPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGV0aGVyIG9yIG5vdCB0aGUgY2F0ZWdvcnkgbmF2IHNob3VsZCBoYXZlIHNjcm9sbGJhcnNcclxuICAgICAgZnVuY3Rpb24gY2F0ZWdvcnlOYXZIZWlnaHQocmVzaXplVmlld3BvcnRIZWlnaHQpIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHZpZXdwb3J0IGhlaWdodCBpcyBwYXNzZWQgYmFjayB3aGVuIHRoZSB3aW5kb3cgZ2V0cyByZXNpemVkXHJcbiAgICAgICAgaWYodHlwZW9mIHJlc2l6ZVZpZXdwb3J0SGVpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSByZXNpemVWaWV3cG9ydEhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gV2luZG93IGhlaWdodCBpcyB1c2VkIGJ5IGRlZmF1bHRcclxuICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3VidHJhY3QgdGhlIG5hdmlnYXRpb24gaGVpZ2h0IGZyb20gd2luZG93IGhlaWdodCB0byBhc3Nlc3MgY29udGVudCBoZWlnaHRcclxuICAgICAgICBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XHJcbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIG1haW4gbWVudSBwdXJwbGUgZHJvcGRvd24gaGVpZ2h0IGlzIGxhcmdlciB0aGFuIHZpZXdwb3J0IGhlaWdodFxyXG4gICAgICAgIGlmIChjYXRlZ29yeU5hdk1lbnVIZWlnaHQgKyAkbWFpbk5hdi5vdXRlckhlaWdodCgpICsgcHJvZHVjdE5hdkhlaWdodCA+IHZpZXdwb3J0SGVpZ2h0ICYmICFhZ2VudElEKSB7XHJcblxyXG4gICAgICAgICAgLy8gU2V0IHRoZSBtZW51IGRyb3Bkb3duIHRoZSBzYW1lIGFzIHZpZXdwb3J0IHRvIGVuYWJsZSBzY3JvbGxpbmdcclxuICAgICAgICAgIHZhciBjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkID0gY2F0ZWdvcnlOYXZNZW51UmVzaXplZEhlaWdodCAtICRtYWluTmF2Lm91dGVySGVpZ2h0KCkgLSBwcm9kdWN0TmF2SGVpZ2h0IC0gYWxlcnRCYW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLmFkZENsYXNzKCdzY3JvbGwnKS5vdXRlckhlaWdodChjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKTtcclxuXHJcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLm9uKCdzaG93LnNtYXBpJywgZnVuY3Rpb24oZSwgbWVudSkge1xyXG4gICAgICAgICAgICBpZigkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fc3VibWVudScsIG1lbnUpLm91dGVySGVpZ2h0KCkgPiBjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKSB7XHJcbiAgICAgICAgICAgICAgJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnLCBtZW51KS5vdXRlckhlaWdodChjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2FydGljbGVzJywgbWVudSkub3V0ZXJIZWlnaHQoKSA+IGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpIHtcclxuICAgICAgICAgICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnLCBtZW51KS5vdXRlckhlaWdodChjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKS5hZGRDbGFzcygnb25lX2FydGljbGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAucmVtb3ZlQ2xhc3MoJ3Njcm9sbCcpLm91dGVySGVpZ2h0KCdhdXRvJyk7XHJcbiAgICAgICAgICAkc3ViTWVudS5vdXRlckhlaWdodCgnYXV0bycpO1xyXG4gICAgICAgICAgJHN1Yk1lbnVBcnRpY2xlLm91dGVySGVpZ2h0KCdhdXRvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgLy8gSGlkZS9TaG93IG1lbnVcclxuICAgICAgZnVuY3Rpb24gaGlkZVNob3coKSB7XHJcbiAgICAgICAgaWYgKCQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnKSkge1xyXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuc2xpZGVEb3duKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKChjYXRlZ29yeU5hdk1lbnVIZWlnaHQgKyAgJG1haW5OYXYub3V0ZXJIZWlnaHQoKSArIHByb2R1Y3ROYXZIZWlnaHQgKyBhbGVydEJhbm5lckhlaWdodCkgPiB2aWV3cG9ydEhlaWdodCkge1xyXG4gICAgICAgICAgICAgIGJvZHlTY3JvbGxMb2NrLmRpc2FibGVCb2R5U2Nyb2xsKCRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAsIHtcclxuICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmdW5jdGlvbiBhbGxvd1RvdWNoTW92ZShlbCkge1xyXG4gICAgICAgICAgICAgICAgICB3aGlsZSAoZWwgJiYgZWwgIT09IGRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdib2R5LXNjcm9sbC1sb2NrLWlnbm9yZScpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhZ2VudElEKSB7XHJcbiAgICAgICAgICAgICAgLy8gT25seSBtYWtlIHRoZSBtZW51IGhlaWdodCBzYW1lIGFzIHZpZXdwb3J0IG9uIG1vYmlsZSBkZXZpY2VzXHJcbiAgICAgICAgICAgICAgdmFyIG1vYmlsZUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCA/IHdpbmRvdy5pbm5lckhlaWdodCA6ICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICAgICAgICAkY2F0ZWdvcnlOYXZXcmFwcGVyLmhlaWdodChtb2JpbGVIZWlnaHQpLmFkZENsYXNzKCdzY3JvbGwnKTtcclxuXHJcbiAgICAgICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cC5vbignc2hvdy5zbWFwaScsIGZ1bmN0aW9uKGUsIG1lbnUpIHtcclxuICAgICAgICAgICAgICAgIGlmKCQobWVudSkub3V0ZXJIZWlnaHQoKSA+IG1vYmlsZUhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAkKG1lbnUpLm91dGVySGVpZ2h0KG1vYmlsZUhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGVpZ2h0KCdhdXRvJyk7XHJcbiAgICAgICAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuc2xpZGVVcChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGVpZ2h0KDApO1xyXG4gICAgICAgICAgICBib2R5U2Nyb2xsTG9jay5jbGVhckFsbEJvZHlTY3JvbGxMb2NrcygpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDbG9zZXMgbWVudSBvbiBkb2MgbG9hZFxyXG4gICAgICAkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cclxuICAgICAgJCgnLmFtYV9fZ2xvYmFsLW1lbnUnKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGhpZGVTaG93KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBJZiBhIHVzZXIgY2xpY2tzIG91dHNpZGUgdGhlIG1lbnUgdGhlbiBjbG9zZSBpdFxyXG4gICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICghJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuaXMoZS50YXJnZXQpICYmICRjYXRlZ29yeU5hdmlnYXRpb25NZW51LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgaGlkZVNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJCgkbW9iaWxlU2VhcmNoVHJpZ2dlcikudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkbW9iaWxlU2VhcmNoLnNsaWRlVG9nZ2xlKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZnVuY3Rpb24gbW92ZVNvY2lhbFNoYXJlUG9zaXRpb24oKXtcclxuICAgICAgICB2YXIgbWFpbk5hdlBvc2l0aW9uID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uIC5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgIHZhciAkYW1hU29jaWFsU2hhcmUgPSAkKCcuYW1hX19zb2NpYWwtc2hhcmUnKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBlbm91Z2ggZm9yIHRoZSBzdGlja3kgbmF2XHJcbiAgICAgICAgaWYobWFpbk5hdlBvc2l0aW9uID4gNjApIHtcclxuXHJcbiAgICAgICAgICB2YXIgc29jaWFsU3RpY2t5UG9zaXRpb24gPSBtYWluTmF2UG9zaXRpb24gLSA2MDtcclxuICAgICAgICAgIHZhciAkc29jaWFsSWNvbnMgPSAkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUnKTtcclxuXHJcbiAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdmlld3BvcnQgd2lkdGggaXMgZ3JlYXRlciA4NTBweCB0aGVuIHRoZSBzb2NpYWwgaWNvbnMgd2lsbCBiZSBzdGlja3lcclxuICAgICAgICAgIGlmKCRzb2NpYWxJY29ucy5sZW5ndGggJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA4NTApIHtcclxuICAgICAgICAgICAgJHNvY2lhbEljb25zLnN0aWNreSh7XHJcbiAgICAgICAgICAgICAgd3JhcHBlckNsYXNzTmFtZTogJ2FtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlLXdyYXBwZXInLFxyXG4gICAgICAgICAgICAgIHpJbmRleDogNTAxXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNvY2lhbEljb25zLm9uKCdzdGlja3ktc3RhcnQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgJGFtYVNvY2lhbFNoYXJlLmFkZENsYXNzKCdhbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5jc3MoJ2xlZnQnLCBzb2NpYWxTdGlja3lQb3NpdGlvbikuaGlkZSgpLmZhZGVUbygnc2xvdycsIDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzb2NpYWxJY29ucy5vbignc3RpY2t5LXVwZGF0ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAkYW1hU29jaWFsU2hhcmUuYWRkQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmhpZGUoKS5mYWRlVG8oJ3Nsb3cnLCAxKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc29jaWFsSWNvbnMub24oJ3N0aWNreS1lbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgJCgnLmFtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLnJlbW92ZUNsYXNzKCdhbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJbml0aWFsaXplIGdldFNvY2lhbFNoYXJlKClcclxuICAgICAgbW92ZVNvY2lhbFNoYXJlUG9zaXRpb24oKTtcclxuXHJcbiAgICAgIC8vIE9uc2Nyb2xsIGNoZWNrIHRvIHNlZSBpZiBzb2NpYWwgaWNvbiBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gZm9vdGVyIHBvc2l0aW9uXHJcbiAgICAgIHZhciBkZWJvdW5jZV90aW1lcjtcclxuICAgICAgaWYoJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlIC5hbWFfX3NvY2lhbC1zaGFyZScpLmlzKCc6dmlzaWJsZScpKSB7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciAkc29jaWFsSWNvbnMgPSAkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUgLmFtYV9fc29jaWFsLXNoYXJlJyk7XHJcbiAgICAgICAgICB2YXIgc29jaWFsSWNvblBvc2l0aW9uQm90dG9tID0gJHNvY2lhbEljb25zLm9mZnNldCgpLnRvcCArICRzb2NpYWxJY29ucy5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgdmFyIGZvb3RlclBvc2l0aW9uID0gJCgnZm9vdGVyJykub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgIGlmKGRlYm91bmNlX3RpbWVyKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoZGVib3VuY2VfdGltZXIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRlYm91bmNlX3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmKHNvY2lhbEljb25Qb3NpdGlvbkJvdHRvbSA+IGZvb3RlclBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJykuZmFkZU91dCgnZmFzdCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZScpLmZhZGVJbignZmFzdCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByZXNpemVWaWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCA/IHdpbmRvdy5pbm5lckhlaWdodCA6ICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICBjYXRlZ29yeU5hdkhlaWdodChyZXNpemVWaWV3cG9ydEhlaWdodCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy9DaGVja3MgdGhlIGxheW91dCBwb3NpdGlvbiBvZiBhcnRpY2xlIG9uIHdpbmRvdyByZXNpemUgYW5kIG1vdmVzIHRoZSBzb2NpYWwgaWNvbnMgYWNjb3JkaW5nbHlcclxuICAgICAgJCggd2luZG93ICkucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghYWdlbnRJRCkge1xyXG4gICAgICAgICAgdmFyIHJlc2l6ZVZpZXdwb3J0SGVpZ2h0ID0gJCh3aW5kb3cpLmlubmVySGVpZ2h0KCk7XHJcbiAgICAgICAgICB2YXIgbWFpbk5hdlBvc2l0aW9uVXBkYXRlID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uIC5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0IC0gMTAwO1xyXG5cclxuICAgICAgICAgIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KTtcclxuICAgICAgICAgICQoJy5hbWFfX3NvY2lhbC1zaGFyZS5hbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5jc3MoJ2xlZnQnLCBtYWluTmF2UG9zaXRpb25VcGRhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvL0lmIGVtcHR5IG9yIG90aGVyd2lzZSB1bnBvcHVsYXRlZCBzZWFyY2ggZmllbGQgKGkuZSBzcGFjZXMgb25seSlcclxuICAgICAgLy9wcmV2ZW50IHNlYXJjaCBmcm9tIHN1Ym1pdHRpbmcgYW5kIHJlbG9hZCBjdXJyZW50IHBhZ2VcclxuICAgICAgdmFyIHNlYXJjaEZvcm0gPSAkKFwiZm9ybVtpZF49J2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaC1zb2xycGFnZSddXCIpO1xyXG5cclxuICAgICAgJChzZWFyY2hGb3JtLCB0aGlzKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgdmFyIHNlYXJjaElucHV0ID0gJCh0aGlzKS5maW5kKFwiaW5wdXRbbmFtZSo9J3NlYXJjaCddXCIpO1xyXG5cclxuICAgICAgICAgIC8vVHJpbSBhbmQgY2hlY2sgaWYgc2VhcmNoIGlucHV0IGhhcyBhbnkgdmFsdWVcclxuICAgICAgICAgIGlmICgkLnRyaW0oc2VhcmNoSW5wdXQudmFsKCkpLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gc2VhcmNoIHRlcm0gZW50ZXJlZCcpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL0Vuc3VyZSBubyBzcGFjZXMgYmVmb3JlIG9yIGFmdGVyIHF1ZXJ5IGFyZSBjb3VudGVkIGluIHNlYXJjaFxyXG4gICAgICAgICAgJCh0aGlzKS5maW5kKHNlYXJjaElucHV0KS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vU3VibWl0IHRyaW1tZWQgdmFsdWVcclxuICAgICAgICAgICAgJCh0aGlzKS52YWwoJC50cmltKCQodGhpcykudmFsKCkpKTtcclxuICAgICAgICAgIH0pOyAgIFxyXG4gICAgICAgICAgXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuXHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIFNtYXJ0TWVudXMgalF1ZXJ5IFBsdWdpbiAtIHYxLjEuMCAtIFNlcHRlbWJlciAxNywgMjAxN1xyXG4gKiBodHRwOi8vd3d3LnNtYXJ0bWVudXMub3JnL1xyXG4gKlxyXG4gKiBDb3B5cmlnaHQgVmFzaWwgRGlua292LCBWYWRpa29tIFdlYiBMdGQuXHJcbiAqIGh0dHA6Ly92YWRpa29tLmNvbVxyXG4gKlxyXG4gKiBMaWNlbnNlZCBNSVRcclxuICovXHJcblxyXG5cclxualF1ZXJ5KCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fZ3JvdXAnKS5zbWFydG1lbnVzKHtcclxuICBzdWJJbmRpY2F0b3JzUG9zOiAnYXBwZW5kJ1xyXG59KTtcclxuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9zaWduSW5NZW51ID0ge1xyXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuICAgICAgdmFyICRzaWduSW5Ecm9wZG93biA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd24nKTtcclxuICAgICAgdmFyICRzaWduSW5Ecm9wZG93bk1lbnUgPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duX19tZW51Jyk7XHJcbiAgICAgIHZhciAkc2lnbkluTGluayA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX3RleHQnKTtcclxuICAgICAgdmFyICRleHBsb3JlTWVudSA9ICQoJy5hbWFfX2V4cGxvcmUtbWVudScpO1xyXG4gICAgICB2YXIgJGV4cGxvcmVNZW51RHJvcGRvd24gPSAkKCcuYW1hX19leHBsb3JlLW1lbnVfX21lbnUnKTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGRyb3Bkb3duRG93bk1lbnUocGFyZW50RWxlbWVudCwgbWVudUVsZW1lbnQpIHtcclxuICAgICAgIHBhcmVudEVsZW1lbnQudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFN0b3AgbGluayBmcm9tIGZpcmluZ1xyXG4gICAgICAgICRzaWduSW5MaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgLy8gaWYgdGhlIHRhcmdldCBvZiB0aGUgY2xpY2sgaXNuJ3QgdGhlIGNvbnRhaW5lciBub3IgYSBkZXNjZW5kYW50IG9mIHRoZSBjb250YWluZXJcclxuICAgICAgICAgIGlmICghcGFyZW50RWxlbWVudC5pcyhlLnRhcmdldCkgJiYgcGFyZW50RWxlbWVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gU2V0IHRpbWVvdXQgZm9yIHdoZW4gYSB1c2VyIG1vdXNlcyBvdXQgb2YgdGhlIG1lbnVcclxuICAgICAgICAgIHBhcmVudEVsZW1lbnQubW91c2VlbnRlcihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoKTtcclxuICAgICAgICAgIH0pLm1vdXNlbGVhdmUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZHJvcGRvd25Eb3duTWVudSgkc2lnbkluRHJvcGRvd24sICRzaWduSW5Ecm9wZG93bk1lbnUpO1xyXG4gICAgICBkcm9wZG93bkRvd25NZW51KCRleHBsb3JlTWVudSwgJGV4cGxvcmVNZW51RHJvcGRvd24pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9zZWFyY2hfY2hlY2tib3ggPSB7XHJcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xyXG5cclxuICAgICAgdmFyICRjYXRlZ29yeVNlYXJjaElucHV0ID0gJCgnI3NlYXJjaF9jYXRlZ29yeScpO1xyXG4gICAgICB2YXIgJGNhdGVnb3J5U2VhcmNoTGlzdCA9ICQoJy5mYWNldHMtd2lkZ2V0LWNoZWNrYm94IHVsIGxpJyk7XHJcbiAgICAgIHZhciAkY2xlYXJTZWFyY2hGaWx0ZXIgPSAkKCcjYXBwbGllZEZpbHRlcnNSZW1vdmUnKTtcclxuXHJcbiAgICAgIC8vIEZpbHRlciBsaXN0IHVzaW5nIGpRdWVyeSBmaWx0ZXJcclxuICAgICAgZnVuY3Rpb24gZmlsdGVyTGlzdChzZWFyY2hCb3gsIGxpc3QpIHtcclxuICAgICAgICBzZWFyY2hCb3gua2V5dXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyICRyZWdleCA9IG5ldyBSZWdFeHAodGhpcy52YWx1ZSwgJ2knKTtcclxuICAgICAgICAgIGxpc3QuaGlkZSgpLmZpbHRlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkcmVnZXgudGVzdCgkLnRyaW0oJCh0aGlzKS50ZXh0KCkpKTtcclxuICAgICAgICAgIH0pLnNob3coKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2xlYXIgZmlsdGVyXHJcbiAgICAgIGZ1bmN0aW9uIGNsZWFmRmlsdGVyTGlzdChjbGVhclNlYXJjaEZpbHRlcikge1xyXG4gICAgICAgIGNsZWFyU2VhcmNoRmlsdGVyLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAkY2F0ZWdvcnlTZWFyY2hJbnB1dC52YWwoJycpO1xyXG4gICAgICAgICAgJGNhdGVnb3J5U2VhcmNoSW5wdXQudHJpZ2dlcigna2V5dXAnKTtcclxuXHJcbiAgICAgICAgICAkKCcuZmFjZXRzLXdpZGdldC1jaGVja2JveCB1bCBsaSBbdHlwZT1jaGVja2JveF0nKS5lYWNoKCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJyNibG9jay1leHBvc2VkZm9ybWFjcXVpYS1zZWFyY2gtc29scnBhZ2UtMicpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEludm9rZSBmaWx0ZXIgbGlzdFxyXG4gICAgICBmaWx0ZXJMaXN0KCRjYXRlZ29yeVNlYXJjaElucHV0LCAkY2F0ZWdvcnlTZWFyY2hMaXN0KTtcclxuXHJcbiAgICAgIC8vIEludm9rZSBjbGVhciBmaWx0ZXJcclxuICAgICAgY2xlYWZGaWx0ZXJMaXN0KCRjbGVhclNlYXJjaEZpbHRlcik7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG4iLCIvKipcclxuICogQGZpbGVcclxuICogYnAgY2FsY3VsYXRvci5cclxuICpcclxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XHJcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gJ2Fub255bW91cyBjbG9zdXJlJy4gU2VlOlxyXG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcclxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxyXG4gKi9cclxuXHJcbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcbiAgRHJ1cGFsLmJlaGF2aW9ycy5icENhbGN1bGF0b3IgPSB7XHJcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xyXG5cclxuICAgICAgLy8gQ2xvbmUgbGFzdCByb3cgb2YgdGFibGVcclxuICAgICAgJCgnLmFkZC1icC1yb3cnKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciAkdGFibGVCb2R5ID0gJCgnI2JwQ2FsY3VsYXRvciB0YWJsZScpLmZpbmQoJ3Rib2R5JyksXHJcbiAgICAgICAgICAkdHJMYXN0ID0gJHRhYmxlQm9keS5maW5kKCd0cjpsYXN0JyksXHJcbiAgICAgICAgICAkdHJOZXcgPSAkdHJMYXN0LmNsb25lKCk7XHJcblxyXG4gICAgICAgIC8vIEFwcGVuZCBuZXcgY2xhc3MgbmFtZSB0byBjbG9uZWQgcm93XHJcbiAgICAgICAgJHRyTGFzdC5iZWZvcmUoJHRyTmV3KS5hZGRDbGFzcygnY2xvbmVkJykuZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cclxuICAgICAgICAvLyBBZGQgbmV3IG5hbWUgd2l0aCBpbmRleFxyXG4gICAgICAgICR0YWJsZUJvZHkuZmluZCgndHI6bGFzdCBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyICR0cklucHV0Q2xhc3NJbmRleCA9ICQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGggKyAxLFxyXG4gICAgICAgICAgICAgICR0cklucHV0Q2xhc3NOYW1lID0gJCh0aGlzKS5hdHRyKCdjbGFzcycpO1xyXG5cclxuICAgICAgICAgICQodGhpcykuYXR0cignbmFtZScsICR0cklucHV0Q2xhc3NOYW1lICsgJy0nICsgJHRySW5wdXRDbGFzc0luZGV4KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgndGQ6ZXEoMCknLCAkdHJMYXN0KS50ZXh0KCQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBXaGVuIGNsZWFyL3Jlc3RhcnQgYnV0dG9uIGlzIGNsaWNrZWQgcmV0dXJuIHRhYmxlIHRvIGluaXRpYWwgc3RhdGVcclxuICAgICAgJCgnLmNsZWFyLXJlc3RhcnQnKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgYWxsIGNsb25lZCByb3dzXHJcbiAgICAgICAgdmFyICR0ckNsb25lZCA9ICQoJy5jbG9uZWQnKTtcclxuICAgICAgICAkdHJDbG9uZWQucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IHRvIGludGlhbCB2YWx1ZXNcclxuICAgICAgICAkKCcjYnBDYWxjdWxhdG9yIGlucHV0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkKHRoaXMpLnZhbCgnJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IGZvcm1cclxuICAgICAgICAkKCcjYnBDYWxjdWxhdG9yICcpLnZhbGlkYXRlKCkucmVzZXRGb3JtKCk7XHJcblxyXG4gICAgICAgIC8vIEhpZGUgb3V0cHV0IHJvd1xyXG4gICAgICAgICQoJy5icENhbGN1bGF0b3JfX3RhYmxlX19vdXRwdXQnKS5oaWRlKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgYXZlcmFnZSBCUFxyXG4gICAgICBmdW5jdGlvbiBjYWxjdWxjYXRlQlAoYnBWYWx1ZSwgYnBPdXRwdXQpIHtcclxuICAgICAgICB2YXIgYnBJbnB1dCA9IDAsIC8vIHJvdyBjb3VudFxyXG4gICAgICAgICAgICBicFRvdGFsID0gMCwgLy8gaW5jcmVtZW50ZWQgaW5wdXQgdmFsdWVzXHJcbiAgICAgICAgICAgIGJwQXZlcmFnZTsgLy8gYXZlcmFnZWQgYnBUb3RhbCAvIGJwSW5wdXRcclxuXHJcbiAgICAgICAgYnBWYWx1ZS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vIElmIElucHV0IHZhbHVlcyBhcmUgZ3JlYXRlciB0aGFuIDAgdGhlbiB0dXJuIGludG8gYSBudW1iZXIgYW5kIHJvdW5kXHJcbiAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKSA+IDAgPyBNYXRoLnJvdW5kKHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKSkgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICBpZiAodmFsICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGJwSW5wdXQgKz0gMTtcclxuICAgICAgICAgICAgYnBUb3RhbCArPSB2YWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlXHJcbiAgICAgICAgYnBBdmVyYWdlID0gYnBUb3RhbCAvIGJwSW5wdXQgPiAwID8gTWF0aC5yb3VuZChicFRvdGFsIC8gYnBJbnB1dCkgOiAwO1xyXG5cclxuICAgICAgICBicE91dHB1dC50ZXh0KGJwQXZlcmFnZSk7XHJcblxyXG4gICAgICAgICQoJy5icENhbGN1bGF0b3JfX3RhYmxlX19vdXRwdXQnKS5zaG93KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFZhbGlkYXRlIEJQIEZvcm1cclxuICAgICAgJCgnI2JwQ2FsY3VsYXRvcicpLnZhbGlkYXRlKHtcclxuICAgICAgICAvLyBDYWxjdWxhdGUgQlAgd2hlbiBjYWxjdWxhdGUgaXMgY2xpY2tlZFxyXG4gICAgICAgIHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0pIHtcclxuICAgICAgICAgIHZhciBzeXNCcFZhbHVlID0gJCgnLmJwQ2FsY3VsYXRvcl9fc3lzdG9saWMtaW5wdXQnKSxcclxuICAgICAgICAgICAgc3lzQnBPdXRwdXQgPSAkKCcuYnBDYWxjdWxhdG9yX19zeXN0b2xpYy1vdXRwdXQnKTtcclxuXHJcbiAgICAgICAgICB2YXIgZGlhQnBWYWx1ZSA9ICQoJy5icENhbGN1bGF0b3JfX2RpYXN0b2xpYy1pbnB1dCcpLFxyXG4gICAgICAgICAgICBkaWFCcE91dHB1dCA9ICQoJy5icENhbGN1bGF0b3JfX2RpYXN0b2xpYy1vdXRwdXQnKTtcclxuXHJcbiAgICAgICAgICBjYWxjdWxjYXRlQlAoc3lzQnBWYWx1ZSwgc3lzQnBPdXRwdXQpO1xyXG4gICAgICAgICAgY2FsY3VsY2F0ZUJQKGRpYUJwVmFsdWUsIGRpYUJwT3V0cHV0KTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KShqUXVlcnksIERydXBhbCk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBTYWRseSBhZGRzIGZvb3RlciB0byBsZWZ0IHJlc291cmNlIHBhZ2UgY29sdW1uLlxyXG4gKlxyXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcclxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcclxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXHJcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcclxuICovXHJcbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcbiAgRHJ1cGFsLmJlaGF2aW9ycy5yZXNvdXJjZVBhZ2VGb290ZXIgPSB7XHJcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCdib2R5LmFtYV9fcmVzb3VyY2UtcGFnZScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgJCgnZm9vdGVyJywgY29udGV4dCkuY2xvbmUoKS5hcHBlbmRUbygnLmFtYV9fbGF5b3V0LS1zcGxpdF9fbGVmdCcpLmFkZENsYXNzKCdhbWFfX2Zvb3RlciBhbWFfX3Jlc291cmNlLXBhZ2VfX2Rlc2t0b3AtZm9vdGVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KShqUXVlcnksIERydXBhbCk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBSZXNwb25zaXZlIFRhYmxlcy5cclxuICpcclxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XHJcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XHJcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxyXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXHJcbiAqL1xyXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gIERydXBhbC5iZWhhdmlvcnMucmVzcG9uc2l2ZVRhYmxlcyA9IHtcclxuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcclxuXHJcbiAgICAgIC8vIFRoaXMgY29uZGl0aW9uYWwgaGFzIGJlZW4gYWRkZWQgdG8gcHJldmVudCBiYXNpY1RhYmxlIHBsdWdpbiB0byBzZWxlY3RpdmVseSBub3QgcnVuIG9uIHRhYmxlc1xyXG4gICAgICBpZiAoISQoJ3RhYmxlJykuaGFzQ2xhc3MoJ3NpbXBsZVRhYmxlJykpIHtcclxuICAgICAgICAkKCd0YWJsZScpLmJhc2ljdGFibGUoe1xyXG4gICAgICAgICAgYnJlYWtwb2ludDogMTAyNFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0aGlzIGZvcmNlcyB0YWJsZXMgaW5zaWRlIG9mIHRoZSAuYW1hX19yZXNvdXJjZS0tc2NoZWR1bGVzIGRpdiB0byBoYXZlIG1vYmlsZSBsb29rIGFuZCBmZWVsXHJcbiAgICAgICQoJy5hbWFfX3Jlc291cmNlLS1zY2hlZHVsZXMgdGFibGUnKS5lYWNoKCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLmJhc2ljdGFibGUoJ3N0YXJ0Jyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICB9O1xyXG59KShqUXVlcnksIERydXBhbCk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBMaXN0aWNsZSBDbGFzZXMuXHJcbiAqXHJcbiAqIEhhbmRsaW5nIGNsYXNzZXMgdG8gYnVpbGQgbGlzdGljbGUgcHJvcGVybHkgb3V0c2lkZSBja2VkaXRvci5cclxuICovXHJcbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcbiAgRHJ1cGFsLmJlaGF2aW9ycy5saXN0aWNsZSA9IHtcclxuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcclxuICAgICAgaWYgKCQoJy5saXN0aWNsZScsIGNvbnRleHQpLmxlbmd0aCkge1xyXG4gICAgICAgICQoJy5saXN0aWNsZScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24gKGlkeCwgZSkge1xyXG4gICAgICAgICAgICAkKGUpLmFkZENsYXNzKCdsaXN0aWNsZV9faXRlbScpO1xyXG4gICAgICAgICAgICAkKGUpLmNoaWxkcmVuKCdvbCcpLmVhY2goZnVuY3Rpb24gKGlkeCwgZikge1xyXG4gICAgICAgICAgICAgICQoZikuYWRkQ2xhc3MoJ2xpc3RpY2xlX19pdGVtLXN1YicpO1xyXG4gICAgICAgICAgICAgICQoZikuY2hpbGRyZW4oJ2xpJykuYWRkQ2xhc3MoJ2xpc3RpY2xlX19pdGVtLXN1Yi1pdGVtJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgLy9pZiB0aGVyZSBpcyBhbiBpbmxpbmUgcHJvbW8gb24gYSBwYWdlIHdpdGggYSBsaXN0aWNsZSwgZGV0ZXJtaW5lIGlmIHRoZSBsaXN0IGlzIGNsb3NlIGVub3VnaCBiZW5lYXRoIHRoZSBwcm9tbyBpbiB0aGUgZG9tIHRvIGFzc3VtZSBpdCB3aWxsIGJlIGZsb2F0ZWQgbmV4dCB0byBpdC4gSSBjaG9zZSB3aXRoaW4gNSBzaWJsaW5ncy5cclxuICAgICAgaWYoJCgnLmFtYV9fcHJvbW8tLWlubGluZSB+IC5saXN0aWNsZScpKSB7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9ICQoJy5hbWFfX3Byb21vLS1pbmxpbmUnKS5maXJzdCgpLm5leHRVbnRpbCgnLmxpc3RpY2xlJykuYWRkQmFjaygpLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuZ3RoIDw9IDUpIHtcclxuICAgICAgICAgICQoJy5hbWFfX3Byb21vLS1pbmxpbmUnKS5hZGRDbGFzcygnbGlzdGljbGUtbWFyZ2luJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vaWYgdGhlIGxpc3RpY2xlIGl0ZW0gY29udGFpbnMgYW4gaW1hZ2UsIHB1dCBhIGNsZWFyZml4IGRpdiBvbiB0aGUgaXRlbSBzbyBpZiBpdCBoYXMgYSB0cmFpbGluZyBpbWFnZSwgdGhlIG5leHQgaXRlbSB3b24ndCB3cmFwIG9uIGl0LlxyXG4gICAgICAvL0Fsc28sIGRldGVybWluZSBpdCB0aGUgaW1hZ2UgaXMgYWxtb3N0IDEwMCUgb2YgdGhlIGxpc3Qgd2lkdGguIGlmIGl0IGlzLCBhZGQgYSBjbGFzcyB0byByZW1vdmUgdGhlIGxlZnQgbWFyZ2luIGFuZCBtYWtlIHRoZSBpbWFnZSAxMDAlIHdpZHRoLiBJIGNob3NlIDgwJS5cclxuICAgICAgaWYoJCgnLmxpc3RpY2xlX19pdGVtIGltZycpKSB7XHJcbiAgICAgICAgJCgnLmxpc3RpY2xlX19pdGVtIGltZycpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIHdpZHRoID0gJCh0aGlzKS5jbG9zZXN0KCcubGlzdGljbGVfX2l0ZW0nKS53aWR0aCgpXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh3aWR0aClcclxuICAgICAgICAgIHZhciBpbWFnZVdpZHRoID0gJCh0aGlzKS53aWR0aCgpXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpbWFnZVdpZHRoKVxyXG4gICAgICAgICAgdmFyIGNsZWFyZml4ID0gJzxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PidcclxuICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmxpc3RpY2xlX19pdGVtJykub25jZSgpLmFwcGVuZChjbGVhcmZpeClcclxuICAgICAgICAgIGlmIChpbWFnZVdpZHRoID49IHdpZHRoKi43KSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ25vLW1hcmdpbicpXHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCAoJ2ZpZ3VyZScpLmFkZENsYXNzKCduby1tYXJnaW4nKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG59KShqUXVlcnksIERydXBhbCk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBBdHRhY2hlcyBBTUEgSW1hZ2UgUG9wdXAgbGlicmFyeS5cclxuICovXHJcblxyXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG5cdGZ1bmN0aW9uIGFsdGVyTW9kYWwgKGNvbnRleHQpIHtcclxuXHRcdCQoJy51aS1kaWFsb2cnKS5jc3Moe1wiei1pbmRleFwiOiBcIjUwMDAxXCJ9KTtcclxuXHRcdCQoJy51aS1kaWFsb2ctdGl0bGUnKS5oaWRlKCk7XHJcblx0XHQkKCcudWktYnV0dG9uLWljb24tb25seSAudWktaWNvbicpLmhpZGUoKTtcclxuXHRcdC8vIFN0eWxlZ3VpZGUgc3BlY2lmaWMgdHJlYXRtZW50IHRvIGhpZGUgYW5kIGNzcyB0byBlbGVtZW50cy5cclxuXHRcdCQoJy51aS1kcmFnZ2FibGUgLnVpLWRpYWxvZy10aXRsZWJhcicpLmNzcyh7XHJcblx0XHRcdFwiYm9yZGVyXCI6IFwibm9uZVwiLFxyXG5cdFx0XHRcInBhZGRpbmc6XCI6IFwiMFwiLFxyXG5cdFx0XHRcImJhY2tncm91bmRcIjogXCJub25lXCJcclxuXHRcdH0pO1xyXG5cdFx0JCgnLnVpLXdpZGdldC1vdmVybGF5JykuY3NzKHtcclxuXHRcdFx0XCJvcGFjaXR5XCI6IFwiLjVcIixcclxuXHRcdFx0XCJ6LWluZGV4OlwiOiBcIjUwMDBcIlxyXG5cdFx0fSk7XHJcblx0XHQkKCcudWktZGlhbG9nIC51aS1kaWFsb2ctdGl0bGViYXItY2xvc2UnKS5jc3Moe1xyXG5cdFx0XHRcImJhY2tncm91bmRcIjogXCJ1cmwoJy9hc3NldHMvaW1hZ2VzL2ljb24tbW9kYWwtY2xvc2Uuc3ZnJylcIixcclxuXHRcdFx0XCJib3JkZXJcIjogXCJub25lXCIsXHJcblx0XHRcdFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxyXG5cdFx0XHRcInJpZ2h0XCI6IFwiLTIwcHhcIixcclxuXHRcdFx0XCJ0b3BcIjogXCItMTBweFwiLFxyXG5cdFx0XHRcImhlaWdodFwiOiBcIjI4cHhcIixcclxuXHRcdFx0XCJ3aWR0aFwiOiBcIjI4cHhcIixcclxuXHRcdFx0XCJwYWRkaW5nXCI6IFwiMFwiLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjbG9zZU1vZGFsIChjb250ZXh0KSB7XHJcblx0XHQkKCcudWktaWNvbi1jbG9zZXRoaWNrJykudW5iaW5kKCdjbGljay5jbG9zZScpO1xyXG5cdFx0JCgnLnVpLWljb24tY2xvc2V0aGljaycpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0fVxyXG5cclxuXHREcnVwYWwuYmVoYXZpb3JzLmFtYV9pbWFnZV9wb3B1cCA9IHtcclxuXHRcdGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuXHRcdFx0JChkb2N1bWVudCkub24oXCJkaWFsb2dvcGVuXCIsIFwiLnVpLWRpYWxvZ1wiLCBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XHJcblx0XHRcdFx0YWx0ZXJNb2RhbCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi51aS13aWRnZXQtb3ZlcmxheVwiLCBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XHJcblx0XHRcdFx0Y2xvc2VNb2RhbCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG5cclxuLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEF0dGFjaGVzIEFNQSBJbWFnZSBQb3B1cCBsaWJyYXJ5LlxyXG4gKi9cclxuXHJcbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcblx0ZnVuY3Rpb24gYWx0ZXJNb2RhbCAoY29udGV4dCkge1xyXG5cdFx0JCgnLmFtYS1pbWFnZS1wb3B1cC1tb2RhbCAudWktZGlhbG9nLXRpdGxlJykuaGlkZSgpO1xyXG5cdFx0JCgnLmFtYS1pbWFnZS1wb3B1cC1tb2RhbCAudWktYnV0dG9uLWljb24tb25seSAudWktaWNvbicpLmhpZGUoKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNsb3NlTW9kYWwgKGNvbnRleHQpIHtcclxuXHRcdCQoJy51aS1pY29uLWNsb3NldGhpY2snKS51bmJpbmQoJ2NsaWNrLmNsb3NlJyk7XHJcblx0XHQkKCcudWktaWNvbi1jbG9zZXRoaWNrJykudHJpZ2dlcignY2xpY2snKTtcclxuXHR9XHJcblxyXG5cdERydXBhbC5iZWhhdmlvcnMuYW1hX2ltYWdlX3BvcHVwID0ge1xyXG5cdFx0YXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCkge1xyXG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImRpYWxvZ29wZW5cIiwgXCIudWktZGlhbG9nXCIsIGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG5cdFx0XHRcdGFsdGVyTW9kYWwoKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIudWktd2lkZ2V0LW92ZXJsYXlcIiwgZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcblx0XHRcdFx0Y2xvc2VNb2RhbCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLmluZGV4ID0ge1xyXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuXHJcbiAgaWYgKCAkKCcuZGVzYy1kaXNwbGF5JykubGVuZ3RoICkge1xyXG5cclxuICAgIHZhciBmdWxsID0gJCgnLmZ1bGx0ZXh0Jyk7XHJcbiAgICB2YXIgdHJ1bmMgPSAkKCcudHJ1bmNhdGVkJylcclxuICAgIHZhciBkZXNjID0gJCgnLmRlc2MtZGlzcGxheScpXHJcbiAgICB2YXIgZnVsbFRleHQgPSAkKCcuZnVsbHRleHQnKS5odG1sKClcclxuICAgIHZhciB0cnVuY2F0ZWQgPSAkKCcudHJ1bmNhdGVkJykuaHRtbCgpXHJcbiAgICB2YXIgZnVsbEhlaWdodCA9ICcnXHJcbiAgICB2YXIgdHJ1bmNIZWlnaHQgPSAnJ1xyXG4gICAgdmFyIG1vcmVIdG1sID0gJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJtb3JlXCI+IC4uLlJlYWQgTW9yZTwvYT4nXHJcbiAgICB2YXIgbGVzc0h0bWwgPSAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cImxlc3NcIj5TaG93IExlc3M8L2E+J1xyXG4gICAgdmFyIHdpZHRoID0gJydcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGdldERpbWVuc2lvbnMgKCkge1xyXG5cclxuICAgICAgICAvLyBJZiBjbG9zZXN0IHBhcmVudCBpbmRpY2F0ZXMgY2F0ZWdvcnkuXHJcbiAgICAgICAgLy8gQWRqdXN0IGhpZWdodCB2YWx1ZXMuXHJcbiAgICAgICAgaWYgKGRlc2MuY2xvc2VzdCgnZGl2LmFtYV9fY2F0ZWdvcnknKSkge1xyXG4gICAgICAgICAgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKVxyXG4gICAgICAgICAgaWYgKHdpZHRoIDwgNDAwKSB7XHJcbiAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyAyNVxyXG4gICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDIwXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHdpZHRoIDwgOTAwKSB7XHJcbiAgICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKSArIDUxXHJcbiAgICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAyMFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKSArIDI2XHJcbiAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMTRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKVxyXG4gICAgICAgICAgaWYgKHdpZHRoIDwgNDAwKSB7XHJcbiAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyAyNVxyXG4gICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDIwXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHdpZHRoIDwgOTAwKSB7XHJcbiAgICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKSArIDI1XHJcbiAgICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAyMFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJ1bmNIZWlnaHQgPSB0cnVuYy5oZWlnaHQoKVxyXG4gICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDE0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLypcclxuICAgICAgICAqIEFuaW1hdGUgdGhlIGhlaWdodCBvZiBhIGR5bmFtaWMgaGVpZ2h0IG9iamVjdD8gU0lNUExFIVxyXG4gICAgICAgICogV2hhdCBhIGZvb2wgeW91IHdvdWxkIGJlIHRvIG5vdCB0aGluayBvZiBzbyBlbGVnYW50IGEgc29sdXRpb24uXHJcbiAgICAgICAgKiBJbiB0aGUgbWFya3VwLCB0aGVyZSBhcmUgaGlkZGVuIGZ1bGx0ZXh0IGFuZCBzdW1tYXJ5IGRpdnMuXHJcbiAgICAgICAgKiBUaGV5IGFyZSBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgd2hpdGhpbiB0aGUgcGFnZSB0ZW1wbGF0ZSB0byBrZWVwIGFuIGFjY3VyYXRlIGhlaWdodC5cclxuICAgICAgICovXHJcblxyXG4gICAgICAvLyBTZXQgaGVpZ2h0IG9uIHBhZ2Vsb2FkIHVzaW5nIHRoZSBoaWRkZW4gZGl2cy5cclxuICAgICAgJCgnLmRlc2MtZGlzcGxheScsIGNvbnRleHQpLm9uY2UoJ2dldEhlaWdodCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGdldERpbWVuc2lvbnMoKVxyXG4gICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCB0cnVuY0hlaWdodCArICdweCcpXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gU2V0IHRoZSBoZWlnaHQgYWdhaW4gb24gd2luZG93IHJlc2l6ZS5cclxuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXHJcbiAgICAgICAgaWYgKGRlc2MuaGFzQ2xhc3MoJ2Z1bGwnKSkge1xyXG4gICAgICAgICAgZGVzYy5jc3MoJ2hlaWdodCcsIGZ1bGxIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGVzYy5oYXNDbGFzcygnc3VtbWFyeScpKSB7XHJcbiAgICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgdHJ1bmNIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBPbiBjbGljaywgc2V0IHRoZSBoZWlnaHQgdG8gdHJpZ2dlciBjc3MgdHJhbnNpdGlvbi5cclxuICAgICAgZGVzYy5vbignY2xpY2snLCAnLm1vcmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ2V0RGltZW5zaW9ucygpXHJcbiAgICAgICAgZGVzYy5jc3MoJ2hlaWdodCcsIGZ1bGxIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgIGRlc2MuYWRkQ2xhc3MoJ2Z1bGwnKS5yZW1vdmVDbGFzcygnc3VtbWFyeScpXHJcbiAgICAgICAgLy8gU3dhcCB0aGUgZnVsbCBjb3B5IGludG8gdGhlIGRpc3BsYXkgZGl2LlxyXG4gICAgICAgIGRlc2MuaHRtbCgkLnBhcnNlSFRNTChmdWxsVGV4dCkpLmFwcGVuZChsZXNzSHRtbClcclxuICAgICAgfSk7XHJcbiAgICAgIGRlc2Mub24oJ2NsaWNrJywgJy5sZXNzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGdldERpbWVuc2lvbnMoKVxyXG4gICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCB0cnVuY0hlaWdodCArICdweCcpXHJcbiAgICAgICAgZGVzYy5hZGRDbGFzcygnc3VtbWFyeScpLnJlbW92ZUNsYXNzKCdmdWxsJylcclxuICAgICAgICAvLyBTd2FwIHRoZSB0cnVuY2F0ZWQgY29weSBpbnRvIHRoZSBkaXNwbGF5IGRpdi5cclxuICAgICAgICBkZXNjLmh0bWwoJC5wYXJzZUhUTUwodHJ1bmNhdGVkKSkuYXBwZW5kKG1vcmVIdG1sKVxyXG4gICAgICAgIC8vIFNjcm9sbCB0byB0b3AuXHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgNTAwLCAnc3dpbmcnKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfTtcclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3RvYyA9IHtcclxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XHJcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5hbWEtLW5ld3MtdG9jIGEnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IGhhcmQganVtcCwgdGhlIGRlZmF1bHQgYmVoYXZpb3JcclxuXHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpOyAvLyBTZXQgdGhlIHRhcmdldCBhcyB2YXJpYWJsZVxyXG4gICAgICAgICAgICAvLyBwZXJmb3JtIGFuaW1hdGVkIHNjcm9sbGluZyBieSBnZXR0aW5nIHRvcC1wb3NpdGlvbiBvZiB0YXJnZXQtZWxlbWVudCBhbmQgc2V0IGl0IGFzIHNjcm9sbCB0YXJnZXRcclxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCh0YXJnZXQpLm9mZnNldCgpLnRvcCAtICQoJyNtYWluLWNvbnRlbnQnKS5vZmZzZXQoKS50b3AgKyAoJCgnLndvcmtiZW5jaC10YWJzJykuaGVpZ2h0KCk/JCgnLndvcmtiZW5jaC10YWJzJykuaGVpZ2h0KCk6MClcclxuICAgICAgICAgICAgfSwgNjAwKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG4iLCIvKipcclxuICogQGZpbGVcclxuICogQXBwbGljYXRpb24gZHJvcGRvd24uXHJcbiAqL1xyXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gIERydXBhbC5iZWhhdmlvcnMuYXBwTWVudSA9IHtcclxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgICAkKCcjYmxvY2stYWNjb3VudG5hdicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjbGFzc19hY3RpdmUgPSAnaXMtYWN0aXZlJztcclxuXHJcbiAgICAgICAgJCgnLmFjY291bnRfbmF2X3RyaWdnZXInLCB0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgLy8gVW5mb2N1cyBvbiB0aGUgZHJvcGRvd24uXHJcbiAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcclxuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgZm9yIENTUy5cclxuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcclxuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgdG8gdGhlIGRyb3Bkb3duIFVMLlxyXG4gICAgICAgICAgJCh0aGlzKS5uZXh0KCkudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAkKCcuYWNjb3VudF9uYXZfdHJpZ2dlcicsIHRoaXMpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSkubmV4dCgpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9wb2RjYXN0ID0ge1xyXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy9DaGVjayBudW1iZXIgb2YgbGlua3NcclxuICAgICAgICBvZGRMaW5rcygpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIG9kZExpbmtzKCkge1xyXG4gICAgICAgIHZhciBjb3VudCA9ICQoXCJ1bC5hbWFfX3BvZGNhc3QtcGxheWVyX19saW5rcyBsaVwiKS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGxpbmtDb250YWluZXIgPSAkKFwidWwuYW1hX19wb2RjYXN0LXBsYXllcl9fbGlua3NcIik7XHJcblxyXG4gICAgICAgIGlmIChjb3VudCA9PSAzIHx8IGNvdW50ID09IDEpIHtcclxuICAgICAgICAgIGxpbmtDb250YWluZXIuYWRkQ2xhc3MoJ29kZF9saW5rcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTsiXX0=
