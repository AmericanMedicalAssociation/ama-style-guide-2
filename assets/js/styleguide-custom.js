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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvZHlTY3JvbGxMb2NrLm1pbi5qcyIsImluaXQuanMiLCJhbGVydC5qcyIsImZvcm0taXRlbXMuanMiLCJuYXYuanMiLCJzdWJjYXRlZ29yeS5qcyIsIndheWZpbmRlci5qcyIsInRhYnMuanMiLCJhY2NvcmRpb24uanMiLCJ3ZWJmb3Jtcy5qcyIsIm1haW4tbmF2aWdhdGlvbi5qcyIsImNhdGVnb3J5LW1lbnUuanMiLCJzaWduLWluLWRyb3Bkb3duLmpzIiwic2VhcmNoLWNoZWNrYm94LmpzIiwiYnAtY2FsY3VsYXRvci5qcyIsInJlc291cmNlLmpzIiwidGFibGVzLmpzIiwibGlzdGljbGUuanMiLCJtb2RhbC5qcyIsImluZGV4LXBhZ2UuanMiLCJ0b2MuanMiLCJhcHBsaWNhdGlvbi1kcm9wZG93bi5qcyIsInBvZGNhc3QtcGxheWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic3R5bGVndWlkZS1jdXN0b20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtcImV4cG9ydHNcIl0sdCk7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyl0KGV4cG9ydHMpO2Vsc2V7dmFyIG89e307dChvKSxlLmJvZHlTY3JvbGxMb2NrPW99fSh0aGlzLGZ1bmN0aW9uKGV4cG9ydHMpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7aWYoQXJyYXkuaXNBcnJheShlKSl7Zm9yKHZhciB0PTAsbz1BcnJheShlLmxlbmd0aCk7dDxlLmxlbmd0aDt0Kyspb1t0XT1lW3RdO3JldHVybiBvfXJldHVybiBBcnJheS5mcm9tKGUpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBsPSExO2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cpe3ZhciBlPXtnZXQgcGFzc2l2ZSgpe2w9ITB9fTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RQYXNzaXZlXCIsbnVsbCxlKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRlc3RQYXNzaXZlXCIsbnVsbCxlKX12YXIgZD1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cubmF2aWdhdG9yJiZ3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtJiYvaVAoYWR8aG9uZXxvZCkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSksYz1bXSx1PSExLGE9LTEscz12b2lkIDAsdj12b2lkIDAsZj1mdW5jdGlvbih0KXtyZXR1cm4gYy5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiEoIWUub3B0aW9ucy5hbGxvd1RvdWNoTW92ZXx8IWUub3B0aW9ucy5hbGxvd1RvdWNoTW92ZSh0KSl9KX0sbT1mdW5jdGlvbihlKXt2YXIgdD1lfHx3aW5kb3cuZXZlbnQ7cmV0dXJuISFmKHQudGFyZ2V0KXx8KDE8dC50b3VjaGVzLmxlbmd0aHx8KHQucHJldmVudERlZmF1bHQmJnQucHJldmVudERlZmF1bHQoKSwhMSkpfSxvPWZ1bmN0aW9uKCl7c2V0VGltZW91dChmdW5jdGlvbigpe3ZvaWQgMCE9PXYmJihkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodD12LHY9dm9pZCAwKSx2b2lkIDAhPT1zJiYoZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1zLHM9dm9pZCAwKX0pfTtleHBvcnRzLmRpc2FibGVCb2R5U2Nyb2xsPWZ1bmN0aW9uKGksZSl7aWYoZCl7aWYoIWkpcmV0dXJuIHZvaWQgY29uc29sZS5lcnJvcihcImRpc2FibGVCb2R5U2Nyb2xsIHVuc3VjY2Vzc2Z1bCAtIHRhcmdldEVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGNhbGxpbmcgZGlzYWJsZUJvZHlTY3JvbGwgb24gSU9TIGRldmljZXMuXCIpO2lmKGkmJiFjLnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGFyZ2V0RWxlbWVudD09PWl9KSl7dmFyIHQ9e3RhcmdldEVsZW1lbnQ6aSxvcHRpb25zOmV8fHt9fTtjPVtdLmNvbmNhdChyKGMpLFt0XSksaS5vbnRvdWNoc3RhcnQ9ZnVuY3Rpb24oZSl7MT09PWUudGFyZ2V0VG91Y2hlcy5sZW5ndGgmJihhPWUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZKX0saS5vbnRvdWNobW92ZT1mdW5jdGlvbihlKXt2YXIgdCxvLG4scjsxPT09ZS50YXJnZXRUb3VjaGVzLmxlbmd0aCYmKG89aSxyPSh0PWUpLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WS1hLCFmKHQudGFyZ2V0KSYmKG8mJjA9PT1vLnNjcm9sbFRvcCYmMDxyP20odCk6KG49bykmJm4uc2Nyb2xsSGVpZ2h0LW4uc2Nyb2xsVG9wPD1uLmNsaWVudEhlaWdodCYmcjwwP20odCk6dC5zdG9wUHJvcGFnYXRpb24oKSkpfSx1fHwoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLG0sbD97cGFzc2l2ZTohMX06dm9pZCAwKSx1PSEwKX19ZWxzZXtuPWUsc2V0VGltZW91dChmdW5jdGlvbigpe2lmKHZvaWQgMD09PXYpe3ZhciBlPSEhbiYmITA9PT1uLnJlc2VydmVTY3JvbGxCYXJHYXAsdD13aW5kb3cuaW5uZXJXaWR0aC1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7ZSYmMDx0JiYodj1kb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCxkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodD10K1wicHhcIil9dm9pZCAwPT09cyYmKHM9ZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyxkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIpfSk7dmFyIG89e3RhcmdldEVsZW1lbnQ6aSxvcHRpb25zOmV8fHt9fTtjPVtdLmNvbmNhdChyKGMpLFtvXSl9dmFyIG59LGV4cG9ydHMuY2xlYXJBbGxCb2R5U2Nyb2xsTG9ja3M9ZnVuY3Rpb24oKXtkPyhjLmZvckVhY2goZnVuY3Rpb24oZSl7ZS50YXJnZXRFbGVtZW50Lm9udG91Y2hzdGFydD1udWxsLGUudGFyZ2V0RWxlbWVudC5vbnRvdWNobW92ZT1udWxsfSksdSYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMSksYz1bXSxhPS0xKToobygpLGM9W10pfSxleHBvcnRzLmVuYWJsZUJvZHlTY3JvbGw9ZnVuY3Rpb24odCl7aWYoZCl7aWYoIXQpcmV0dXJuIHZvaWQgY29uc29sZS5lcnJvcihcImVuYWJsZUJvZHlTY3JvbGwgdW5zdWNjZXNzZnVsIC0gdGFyZ2V0RWxlbWVudCBtdXN0IGJlIHByb3ZpZGVkIHdoZW4gY2FsbGluZyBlbmFibGVCb2R5U2Nyb2xsIG9uIElPUyBkZXZpY2VzLlwiKTt0Lm9udG91Y2hzdGFydD1udWxsLHQub250b3VjaG1vdmU9bnVsbCxjPWMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQhPT10fSksdSYmMD09PWMubGVuZ3RoJiYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLG0sbD97cGFzc2l2ZTohMX06dm9pZCAwKSx1PSExKX1lbHNlIDE9PT1jLmxlbmd0aCYmY1swXS50YXJnZXRFbGVtZW50PT09dD8obygpLGM9W10pOmM9Yy5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGFyZ2V0RWxlbWVudCE9PXR9KX19KTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEluaXRpYWxpemF0aW9uIHNjcmlwdCBmb3IgZ2xvYmFsIHByb2Nlc3Nlc1xyXG4gKi9cclxuXHJcbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcblxyXG4vKipcclxuICpcclxuICogSW5pdGlhbGl6ZSBmaXRWaWQgZm9yIFlvdVR1YmUgdmllb3MuXHJcbiAqXHJcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxyXG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxyXG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcclxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxyXG4gKi9cclxuXHJcblx0RHJ1cGFsLmJlaGF2aW9ycy5maXR2aWRpbml0ID0ge1xyXG5cdCBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xyXG5cdFx0XHQoZnVuY3Rpb24gKCQpIHtcclxuXHRcdFx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JCgnLnZpZGVvLWNvbnRhaW5lcicpLmZpdFZpZHMoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSkoalF1ZXJ5KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG4iLCIvKipcclxuICogQGZpbGVcclxuICogYWxlcnQuXHJcbiAqXHJcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxyXG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxyXG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcclxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxyXG4gKi9cclxuIChmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcbiAgIERydXBhbC5iZWhhdmlvcnMuYWxlcnQgPSB7XHJcbiAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuICAgICAgdmFyIGFsZXJ0ID0gJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgJC5jb29raWUoJ2FtYV9fYWxlcnQtLScgKyBhbGVydCk7XHJcbiAgICAgICB2YXIgYWxlcnRDb29raWUgPSAkLmNvb2tpZSgnYW1hX19hbGVydC0tJyArIGFsZXJ0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAoZnVuY3Rpb24gKCQpIHtcclxuICAgICAgICAgLy8gSWYgdGhlICdoaWRlIGNvb2tpZSBpcyBub3Qgc2V0IHdlIHNob3cgdGhlIGFsZXJ0XHJcbiAgICAgICAgIGlmIChhbGVydENvb2tpZSAhPT0gJzEnKSB7XHJcbiAgICAgICAgICAgJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5jc3Moe1xyXG4gICAgICAgICAgICAgXCJ0cmFuc2l0aW9uXCI6IFwib3BhY2l0eSAuMTVzXCIsXHJcbiAgICAgICAgICAgICBcIm9wYWNpdHlcIjogXCIxXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5jc3Moe1xyXG4gICAgICAgICAgICBcImRpc3BsYXlcIjogXCJub25lXCJcclxuICAgICAgICAgICB9KTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLy8gQWRkIHRoZSBldmVudCB0aGF0IGNsb3NlcyB0aGUgcG9wdXAgYW5kIHNldHMgdGhlIGNvb2tpZSB0aGF0IHRlbGxzIHVzIHRvXHJcbiAgICAgICAgIC8vIG5vdCBzaG93IGl0IGFnYWluIHVudGlsIG9uZSBkYXkgaGFzIHBhc3NlZC5cclxuICAgICAgICAgJCgnLmFtYV9fYWxlcnRfX2Nsb3NlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5jc3Moe1xyXG4gICAgICAgICAgICBcInRyYW5zaXRpb25cIjogXCJvcGFjaXR5IDJzXCIsXHJcbiAgICAgICAgICAgICBcIm9wYWNpdHlcIjogXCIwXCIsXHJcbiAgICAgICAgICAgICBcImRpc3BsYXlcIjogXCJub25lXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgLy8gc2V0IHRoZSBjb29raWVcclxuICAgICAgICAgICAkLmNvb2tpZSgnYW1hX19hbGVydC0tJyArIGFsZXJ0LCAnMScsIHsgZXhwaXJlczogMX0pO1xyXG4gICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICB9KShqUXVlcnkpO1xyXG4gICAgIH1cclxuICAgfTtcclxuIH0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEZvcm0gZmllbGRzIG1hc2tpbmdcclxuICovXHJcblxyXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gIERydXBhbC5iZWhhdmlvcnMuZm9ybUl0ZW1zID0ge1xyXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuICAgICAgKGZ1bmN0aW9uICgkKSB7XHJcbiAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAvLyBEbyBub3QgZXhlY3V0ZSBpbiB0aGUgbGF5b3V0IGJ1aWxkZXIgZWRpdCBkaWFsb2dcclxuICAgICAgICAgIGlmICghJCgnLmpzLW9mZi1jYW52YXMtZGlhbG9nLW9wZW4nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJCgnLm11bHRpc2VsZWN0JykubXVsdGlzZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5hbWFfX3Rvb2x0aXAnKS50b29sdGlwKHtcclxuICAgICAgICAgICAgICB0b29sdGlwQ2xhc3M6IFwiYW1hX190b29sdGlwLWJ1YmJsZVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY291bnRfcmVtYWluaW5nX2NoYXJhY3RlcigpIHtcclxuICAgICAgICAgICAgICB2YXIgbWF4X2xlbmd0aCA9IDE1MDtcclxuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyX2VudGVyZWQgPSAkKCcudGV4dGFyZWEnKS52YWwoKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9yZW1haW5pbmcgPSBtYXhfbGVuZ3RoIC0gY2hhcmFjdGVyX2VudGVyZWQ7XHJcbiAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLmh0bWwoY2hhcmFjdGVyX3JlbWFpbmluZyk7XHJcbiAgICAgICAgICAgICAgaWYgKG1heF9sZW5ndGggPCBjaGFyYWN0ZXJfZW50ZXJlZCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnRleHRhcmVhJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuYWRkQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8galF1ZXJ5VUkgc2VsZWN0bWVudSBtZXRob2RcclxuICAgICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLnNlbGVjdG1lbnUoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gU3VibWl0cyB0aGUgc2VhcmNoIGZvcm0gYWZ0ZXIgYSBzZWxlY3QgbWVudSBpdGVtcyBoYXMgYmVlbiBzZWxlY3RlZFxyXG4gICAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0Jykub24oJ3NlbGVjdG1lbnVjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAkKCcjYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNoLXNvbHJwYWdlLTInKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0Jykub24oJ3NlbGVjdG1lbnVjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0YXJ0IHNlYXJjaCBmaWx0ZXJcclxuXHJcbiAgICAgICAgICAgIHZhciBhdmFpbGFibGVUYWdzID0gW1xyXG4gICAgICAgICAgICAgIFwiQWxhYmFtYVwiLFxyXG4gICAgICAgICAgICAgIFwiQWxhc2thXCIsXHJcbiAgICAgICAgICAgICAgXCJBbWVyaWNhbiBTYW1vYVwiLFxyXG4gICAgICAgICAgICAgIFwiQXJpem9uYVwiLFxyXG4gICAgICAgICAgICAgIFwiQXJrYW5zYXNcIixcclxuICAgICAgICAgICAgICBcIkNhbGlmb3JuaWFcIixcclxuICAgICAgICAgICAgICBcIkNvbG9yYWRvXCIsXHJcbiAgICAgICAgICAgICAgXCJDb25uZWN0aWN1dFwiLFxyXG4gICAgICAgICAgICAgIFwiRGVsYXdhcmVcIixcclxuICAgICAgICAgICAgICBcIkRpc3RyaWN0IE9mIENvbHVtYmlhXCIsXHJcbiAgICAgICAgICAgICAgXCJGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWFcIixcclxuICAgICAgICAgICAgICBcIkZsb3JpZGFcIixcclxuICAgICAgICAgICAgICBcIkdlb3JnaWFcIixcclxuICAgICAgICAgICAgICBcIkd1YW1cIixcclxuICAgICAgICAgICAgICBcIkhhd2FpaVwiLFxyXG4gICAgICAgICAgICAgIFwiSWRhaG9cIixcclxuICAgICAgICAgICAgICBcIklsbGlub2lzXCIsXHJcbiAgICAgICAgICAgICAgXCJJbmRpYW5hXCIsXHJcbiAgICAgICAgICAgICAgXCJJb3dhXCIsXHJcbiAgICAgICAgICAgICAgXCJLYW5zYXNcIixcclxuICAgICAgICAgICAgICBcIktlbnR1Y2t5XCIsXHJcbiAgICAgICAgICAgICAgXCJMb3Vpc2lhbmFcIixcclxuICAgICAgICAgICAgICBcIk1haW5lXCIsXHJcbiAgICAgICAgICAgICAgXCJNYXJzaGFsbCBJc2xhbmRzXCIsXHJcbiAgICAgICAgICAgICAgXCJNYXJ5bGFuZFwiLFxyXG4gICAgICAgICAgICAgIFwiTWFzc2FjaHVzZXR0c1wiLFxyXG4gICAgICAgICAgICAgIFwiTWljaGlnYW5cIixcclxuICAgICAgICAgICAgICBcIk1pbm5lc290YVwiLFxyXG4gICAgICAgICAgICAgIFwiTWlzc2lzc2lwcGlcIixcclxuICAgICAgICAgICAgICBcIk1pc3NvdXJpXCIsXHJcbiAgICAgICAgICAgICAgXCJNb250YW5hXCIsXHJcbiAgICAgICAgICAgICAgXCJOZWJyYXNrYVwiLFxyXG4gICAgICAgICAgICAgIFwiTmV2YWRhXCIsXHJcbiAgICAgICAgICAgICAgXCJOZXcgSGFtcHNoaXJlXCIsXHJcbiAgICAgICAgICAgICAgXCJOZXcgSmVyc2V5XCIsXHJcbiAgICAgICAgICAgICAgXCJOZXcgTWV4aWNvXCIsXHJcbiAgICAgICAgICAgICAgXCJOZXcgWW9ya1wiLFxyXG4gICAgICAgICAgICAgIFwiTm9ydGggQ2Fyb2xpbmFcIixcclxuICAgICAgICAgICAgICBcIk5vcnRoIERha290YVwiLFxyXG4gICAgICAgICAgICAgIFwiTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzXCIsXHJcbiAgICAgICAgICAgICAgXCJPaGlvXCIsXHJcbiAgICAgICAgICAgICAgXCJPa2xhaG9tYVwiLFxyXG4gICAgICAgICAgICAgIFwiT3JlZ29uXCIsXHJcbiAgICAgICAgICAgICAgXCJQYWxhdVwiLFxyXG4gICAgICAgICAgICAgIFwiUGVubnN5bHZhbmlhXCIsXHJcbiAgICAgICAgICAgICAgXCJQdWVydG8gUmljb1wiLFxyXG4gICAgICAgICAgICAgIFwiUmhvZGUgSXNsYW5kXCIsXHJcbiAgICAgICAgICAgICAgXCJTb3V0aCBDYXJvbGluYVwiLFxyXG4gICAgICAgICAgICAgIFwiU291dGggRGFrb3RhXCIsXHJcbiAgICAgICAgICAgICAgXCJUZW5uZXNzZWVcIixcclxuICAgICAgICAgICAgICBcIlRleGFzXCIsXHJcbiAgICAgICAgICAgICAgXCJVdGFoXCIsXHJcbiAgICAgICAgICAgICAgXCJWZXJtb250XCIsXHJcbiAgICAgICAgICAgICAgXCJWaXJnaW4gSXNsYW5kc1wiLFxyXG4gICAgICAgICAgICAgIFwiVmlyZ2luaWFcIixcclxuICAgICAgICAgICAgICBcIldhc2hpbmd0b25cIixcclxuICAgICAgICAgICAgICBcIldlc3QgVmlyZ2luaWFcIixcclxuICAgICAgICAgICAgICBcIldpc2NvbnNpblwiLFxyXG4gICAgICAgICAgICAgIFwiV3lvbWluZ1wiXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICAkKCBcIiNzZWFyY2hfZmlsdGVyXCIgKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICAgIHNvdXJjZTogYXZhaWxhYmxlVGFnc1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQudWkuYXV0b2NvbXBsZXRlLnByb3RvdHlwZS5fcmVzaXplTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICB2YXIgdWwgPSB0aGlzLm1lbnUuZWxlbWVudDtcclxuICAgICAgICAgICAgICB1bC5vdXRlcldpZHRoKHRoaXMuZWxlbWVudC5vdXRlcldpZHRoKCkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIFN0YXJ0IHNlYXJjaCBmaWx0ZXIgd2l0aCBjaGVja2JveGVzXHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YU1vZGVsID0gW1xyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQWxhYmFtYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQWxhc2thJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdBbWVyaWNhbiBTYW1vYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQXJpem9uYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnQXJrYW5zYXMnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0NhbGlmb3JuaWEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0NvbG9yYWRvJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdDb25uZWN0aWN1dCcsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnRGVsYXdhcmUnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0Zsb3JpZGEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0dlb3JnaWEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0d1YW0nLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0hhd2FpaScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnSWRhaG8nLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0lsbGlub2lzJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdJbmRpYW5hJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdJb3dhJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdLYW5zYXMnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ0tlbnR1Y2t5JywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdMb3Vpc2lhbmEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ01haW5lJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdNYXJzaGFsbCBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdNYXJ5bGFuZCcsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWFzc2FjaHVzZXR0cycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWljaGlnYW4nLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ01pbm5lc290YScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTWlzc2lzc2lwcGknLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ01pc3NvdXJpJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdNb250YW5hJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdOZWJyYXNrYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTmV2YWRhJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXcgSGFtcHNoaXJlJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXcgSmVyc2V5JywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXcgTWV4aWNvJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdOZXcgWW9yaycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGggQ2Fyb2xpbmEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ05vcnRoIERha290YScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdPaGlvJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdPa2xhaG9tYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnT3JlZ29uJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdQYWxhdScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnUGVubnN5bHZhbmlhJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdQdWVydG8gUmljbycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnUmhvZGUgSXNsYW5kJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdTb3V0aCBDYXJvbGluYScsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnU291dGggRGFrb3RhJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdUZW5uZXNzZWUnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ1RleGFzJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdVdGFoJywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdWZXJtb250JywgdmFsdWU6ICcyJ30sXHJcbiAgICAgICAgICAgICAge3RleHQ6ICdWaXJnaW4gSXNsYW5kcycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luaWEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ1dhc2hpbmd0b24nLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ1dlc3QgVmlyZ2luaWEnLCB2YWx1ZTogJzInfSxcclxuICAgICAgICAgICAgICB7dGV4dDogJ1dpc2NvbnNpbicsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnV3lvbWluZycsIHZhbHVlOiAnMid9LFxyXG4gICAgICAgICAgICAgIHt0ZXh0OiAnJywgdmFsdWU6ICcnfVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsQ2hhbmdlKCl7XHJcbiAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9ICQoJyNteUNoZWNrTGlzdCcpLmNoZWNrTGlzdCgnZ2V0U2VsZWN0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICQoJyNzZWxlY3RlZEl0ZW1zJykudGV4dChKU09OLnN0cmluZ2lmeShzZWxlY3Rpb24pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZihqUXVlcnkudWkuY2hlY2tMaXN0KSAhPSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgICAgJCgnI2ZpbHRlckxpc3QnKS5jaGVja0xpc3Qoe1xyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW1zOiBkYXRhTW9kZWwsXHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogc2VsQ2hhbmdlXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJ2Zvcm06bm90KFtjbGFzcyo9XCJsYXlvdXQtYnVpbGRlclwiXSkgW3R5cGU9Y2hlY2tib3hdJykuZWFjaCggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgJCgnW3R5cGU9Y2hlY2tib3hdJykuY2hlY2tib3hyYWRpbygpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJ2Zvcm06bm90KFtjbGFzcyo9XCJsYXlvdXQtYnVpbGRlclwiXSkgW3R5cGU9cmFkaW9dJykuY2hlY2tib3hyYWRpbygpLmJ1dHRvbnNldCgpLmZpbmQoJ2xhYmVsJykuY3NzKCd3aWR0aCcsICcxOS40JScpO1xyXG5cclxuICAgICAgICAgICAgJCgnLnRleHRhcmVhJykua2V5dXAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgY291bnRfcmVtYWluaW5nX2NoYXJhY3RlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJhbmdlIEZpZWxkXHJcbiAgICAgICAgICAgIHZhciBsZWdlbmQgPSAkKCcuYW1hX19yYW5nZS1maWVsZF9fbGVnZW5kJyk7XHJcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSAkKCBcIiNjdXJyZW50VmFsdWVcIiApO1xyXG5cclxuICAgICAgICAgICAgJChcIi5hbWFfX3JhbmdlLWZpZWxkXCIpLnNsaWRlcih7XHJcbiAgICAgICAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICByYW5nZTogJ21pbicsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgbWluOiAyMDAwLFxyXG4gICAgICAgICAgICAgIG1heDogNTAwMCxcclxuICAgICAgICAgICAgICBzdGVwOiAxLFxyXG4gICAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHZhciBoYW5kbGUgPSBqUXVlcnkodGhpcykuZmluZCgnLnVpLXNsaWRlci1oYW5kbGUnKTtcclxuICAgICAgICAgICAgICAgIHZhciBidWJibGUgPSBqUXVlcnkoJzxkaXYgY2xhc3M9XCJhbWFfX3JhbmdlLWZpZWxkX192YWx1ZWJveFwiPjwvZGl2PicpO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlLmFwcGVuZChidWJibGUpO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2dCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIHVpLmhhbmRsZS5jaGlsZE5vZGVzWzBdLmlubmVySFRNTCA9ICckJyArIHVpLnZhbHVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuYXBwZW5kKGxlZ2VuZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBGb3JtIGFjY29yZGlvblxyXG4gICAgICAgICAgICAkKCBcIi50YWJsaXN0XCIgKS5hY2NvcmRpb24oe1xyXG4gICAgICAgICAgICAgIGhlYWRlcjogXCIuYW1hX19mb3JtLXN0ZXBzX19zdGVwXCIsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRXhwYW5kIGxpc3RcclxuICAgICAgICAgICAgZnVuY3Rpb24gZXhwYW5kTGlzdEFjY29yZGlvbihlbGVtZW50LCBvcGVuKXtcclxuICAgICAgICAgICAgICAkKGVsZW1lbnQpLmFjY29yZGlvbih7XHJcbiAgICAgICAgICAgICAgICBtdWx0aXBsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGljb25zOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcclxuICAgICAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZTogNTAwLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBvcGVuLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZhdGUgOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmKCQodWkubmV3UGFuZWwpLmhhc0NsYXNzKCd1aS1hY2NvcmRpb24tY29udGVudC1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodWkubmV3UGFuZWwpLnByZXYoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh1aS5vbGRQYW5lbCkuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoJChcIi5hbWFfX2V4cGFuZC1saXN0XCIpLmZpbmQoJy51aS1jaGVja2JveHJhZGlvLWNoZWNrZWQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICBleHBhbmRMaXN0QWNjb3JkaW9uKCcuYW1hX19leHBhbmQtbGlzdCcsIDApO1xyXG4gICAgICAgICAgICAgICQoXCIuYW1hX19leHBhbmQtbGlzdCAuYW1hX19leHBhbmQtbGlzdF9faGVhZGVyXCIpLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGV4cGFuZExpc3RBY2NvcmRpb24oJy5hbWFfX2V4cGFuZC1saXN0JywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICQoXCIuYW1hX19leHBhbmQtbGlzdFwiKS5jaGlsZHJlbignLmFtYV9fZXhwYW5kLWxpc3RfX2hlYWRlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ29sbGFwc2UgYWxsIGFjY29yZGlvbiBwYW5lbHNcclxuICAgICAgICAgICAgJCgnLmFtYV9fZmlsdGVyX19jb2xsYXBzZS1wYW5lbHMgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAkKCcuYW1hX19leHBhbmQtbGlzdCAudWktYWNjb3JkaW9uLWhlYWRlcicpLmVhY2goIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygndWktc3RhdGUtYWN0aXZlJykgfHwgJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIE9wZW4gYWNjb3JkaW9uIHBhbmVscyBmb3IgbW9iaWxlXHJcbiAgICAgICAgICAgICQoJy5hbWFfX2FwcGxpZWQtZmlsdGVyc19fc2hvdy1maWx0ZXJzJykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QsIC5hbWFfX2FwcGxpZWQtZmlsdGVyc19fdGFncycpLnNsaWRlVG9nZ2xlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmFtYV9fYXBwbGllZC1maWx0ZXJzX19zaG93LWZpbHRlcnMnKS50ZXh0KCQodGhpcykuaXMoJzp2aXNpYmxlJykgPyAnSGlkZSBGaWx0ZXInIDogJ0ZpbHRlcicpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpc3RGaWx0ZXIoaW5wdXQsIGxpc3QpIHsgLy8gaGVhZGVyIGlzIGFueSBlbGVtZW50LCBsaXN0IGlzIGFuIHVub3JkZXJlZCBsaXN0XHJcbiAgICAgICAgICAgICAgLy8gY3VzdG9tIGNzcyBleHByZXNzaW9uIGZvciBhIGNhc2UtaW5zZW5zaXRpdmUgY29udGFpbnMoKVxyXG4gICAgICAgICAgICAgIGpRdWVyeS5leHByWyc6J10uQ29udGFpbnMgPSBmdW5jdGlvbihhLGksbSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGEudGV4dENvbnRlbnQgfHwgYS5pbm5lclRleHQgfHwgXCJcIikudG9VcHBlckNhc2UoKS5pbmRleE9mKG1bM10udG9VcHBlckNhc2UoKSk+PTA7XHJcbiAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgJChpbnB1dCkuY2hhbmdlKCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGlmKGZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGZpbmRzIGFsbCBsaW5rcyBpbiBhIGxpc3QgdGhhdCBjb250YWluIHRoZSBpbnB1dCxcclxuICAgICAgICAgICAgICAgICAgLy8gYW5kIGhpZGUgdGhlIG9uZXMgbm90IGNvbnRhaW5pbmcgdGhlIGlucHV0IHdoaWxlIHNob3dpbmcgdGhlIG9uZXMgdGhhdCBkb1xyXG4gICAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJzcGFuOm5vdCg6Q29udGFpbnMoXCIgKyBmaWx0ZXIgKyBcIikpXCIpLnBhcmVudCgpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgJChsaXN0KS5maW5kKFwic3BhbjpDb250YWlucyhcIiArIGZpbHRlciArIFwiKVwiKS5wYXJlbnQoKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJsYWJlbFwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHNob3cgcmVzdWx0cyBhZnRlciAzIGNoYXJhY3RlcnMgYXJlIGVudGVyZWRcclxuICAgICAgICAgICAgICB9KS5rZXl1cCggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiggdGhpcy52YWx1ZS5sZW5ndGggPCA0ICkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jaGFuZ2UoKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsaXN0RmlsdGVyKCQoXCIjYW1hX19zZWFyY2hfX2xvY2F0aW9uXCIpLCAkKFwiLmFtYV9fZm9ybS1ncm91cFwiKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBtYWtlIHRoZSBlbnRpcmUgc3Vic2NyaWJlIGJ1dHRvbiBjbGlja2FibGUuXHJcbiAgICAgICAgICAkKCdmb3JtLnNhbGVzZm9yY2Utc3Vic2NyaWJlLWZvcm0sIC5hbWFfX2lucHV0LXdyYXBwZXItLXN1YnNjcmliZS1uZXdzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2FsZXNmb3JjZS1zdWJzY3JpYmUtZm9ybScpKSB7XHJcbiAgICAgICAgICAgICAgJCh0aGlzKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgbGluayA9ICQodGhpcykuZmluZCgnYScpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gbGluaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pKGpRdWVyeSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG4iLCIvKipcclxuICogQGZpbGVcclxuICogUmliYm9uIG5hdiB1c2VyIGludGVyYWN0aW9ucy5cclxuICpcclxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XHJcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gJ2Fub255bW91cyBjbG9zdXJlJy4gU2VlOlxyXG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcclxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxyXG4gKi9cclxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuXHJcbiAgRHJ1cGFsLmJlaGF2aW9ycy5yaWJib25uYXYgPSB7XHJcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xyXG5cclxuICAgICAgLy8gTmVlZHMgZG9jIHJlYWR5IGJlY2F1c2UgdGhlIGFkbWluIHRvb2xiYXIgbmVlZHMgdG8gZ2V0IGxvYWRlZCB0byBkZXRlcm1pbmUgdGhlIHRvcCBzcGFjaW5nIGZvciBzdGlja3kgbmF2XHJcbiAgICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyICRib2R5Rml4ZWQgPSAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycpO1xyXG5cclxuICAgICAgICBpZigkYm9keUZpeGVkID09PSAnaGlkZGVuJykge1xyXG4gICAgICAgICAgJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uJykudW5zdGljaygpO1xyXG4gICAgICAgICAgJCgnLmFtYV9sb2NrZXJfbmF2aWdhdGlvbicpLnVuc3RpY2soKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjggKSB7IC8vIElmIGxlc3MgdGhhbiB0YWJsZXRcclxuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbicpLnN0aWNreSh7ekluZGV4OiA1MDF9KTtcclxuICAgICAgICAgICQoJy5hbWFfbG9ja2VyX25hdmlnYXRpb24nKS5zdGlja3koe3pJbmRleDogNTAxfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmKCQoJy50b29sYmFyLXRyYXknKS5oYXNDbGFzcygndG9vbGJhci10cmF5LWhvcml6b250YWwnKSkge1xyXG4gICAgICAgICAgJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uICcpLnN0aWNreSh7IHpJbmRleDogNTAxLCB0b3BTcGFjaW5nOiA3MiB9KTtcclxuICAgICAgICAgICQoJy5hbWFfbG9ja2VyX25hdmlnYXRpb24nKS5zdGlja3koeyB6SW5kZXg6IDUwMSwgdG9wU3BhY2luZzogMTMyIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZigkKCcudG9vbGJhci10cmF5JykuaGFzQ2xhc3MoJ3Rvb2xiYXItdHJheS12ZXJ0aWNhbCcpKSB7XHJcbiAgICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gJykuc3RpY2t5KHsgekluZGV4OiA1MDEsIHRvcFNwYWNpbmc6IDM5IH0pO1xyXG4gICAgICAgICAgJCgnLmFtYV9sb2NrZXJfbmF2aWdhdGlvbicpLnN0aWNreSh7IHpJbmRleDogNTAxLCB0b3BTcGFjaW5nOiA5OSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uICcpLnN0aWNreSh7IHpJbmRleDogNTAxIH0pO1xyXG4gICAgICAgICAgJCgnLmFtYV9sb2NrZXJfbmF2aWdhdGlvbicpLnN0aWNreSh7ekluZGV4OiA1MDEsIHRvcFNwYWNpbmc6IDYwfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2xhc3NfYWN0aXZlID0gJ2lzLWFjdGl2ZSc7XHJcblxyXG4gICAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd25fX3RyaWdnZXInLCB0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgLy8gVW5mb2N1cyBvbiB0aGUgZHJvcGRvd24uXHJcbiAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcclxuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgZm9yIENTUy5cclxuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcclxuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgdG8gdGhlIGRyb3Bkb3duIFVMLlxyXG4gICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bl9fdHJpZ2dlcicsIHRoaXMpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSkuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KShqUXVlcnksIERydXBhbCk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBTdWJjYXRlZ29yeVxyXG4gKlxyXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcclxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcclxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXHJcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcclxuICovXHJcbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcbiAgRHJ1cGFsLmJlaGF2aW9ycy5zdWJjYXRlZ29yaWVzID0ge1xyXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuXHJcbiAgICAgIC8vIENyZWF0ZSBzdGF0aWMgdmFyIGZvciBzdWJjYXRlZ29yeSBpdGVtIGNvdW50LiBUbyBiZSB1c2VkIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHJlY2FsY3VsYXRpb25zIGFyZSBuZWVkZWQuXHJcbiAgICAgIHZhciBzdWJjYXRlZ29yeUV4cGxvcmF0aW9uQ29sdW1ucyA9IDA7XHJcblxyXG4gICAgICBmdW5jdGlvbiBjaGVja1NpemUoKSB7XHJcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zdWJjYXRlZ29yeScpO1xyXG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnlDb250YWluZXIgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fY29udGFpbmVyJyk7XHJcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeVRpdGxlID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3RpdGxlJyk7XHJcbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgd2lkdGggbWludXMgcGFkZGluZyBzbyB1c2Ugd2lkdGgoKSBpbnN0ZWFkIG9mIGlubmVyV2lkdGgoKS5cclxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbldpZHRoID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXMnKS53aWR0aCgpO1xyXG4gICAgICAgIC8vIFN1YmNhdGVnb3J5IGl0ZW1zIGhhdmUgbWF4LXdpZHRoIG9mIDE4MHB4LiBUaGlzIHdpbGwgYmUgdXNlZCBmb3IgY2FsY3VsYXRpb25zIGluc3RlYWQgb2YgZXh0cmFjdGluZyBpdCB2aWEgalF1ZXJ5IGNhbGxzLlxyXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUl0ZW1XaWR0aCA9IDE4MDtcclxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlUaXRsZVdpZHRoID0gJHN1YmNhdGVnb3J5VGl0bGUub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgIHZhciB0b3RhbEdyaWRJdGVtcyA9ICRzdWJjYXRlZ29yeS5sZW5ndGggKyAxO1xyXG4gICAgICAgIC8vIFN0YXJ0IGNvbHVtbiBjb3VudCBhcyBsb3dlc3QgcG9zc2libGUuXHJcbiAgICAgICAgdmFyIGNvbHVtbkNvdW50ID0gMjtcclxuICAgICAgICAvLyBTZXQgc3ViY2F0ZWdvcnkgcm93IGl0ZW1zIHRvIGxvd2VzdCB0aGF0IHNob3VsZCBkaXNwbGF5LlxyXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUl0ZW1zUGVyUm93ID0gTWF0aC5mbG9vcigoc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbldpZHRoIC0gc3ViY2F0ZWdvcnlUaXRsZVdpZHRoKSAvIHN1YmNhdGVnb3J5SXRlbVdpZHRoKTtcclxuXHJcbiAgICAgICAgaWYgKHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgPCAyKSB7XHJcbiAgICAgICAgICAvLyBUaGUgbWluaW11bSBzdWJjYXRlZ29yeSBpdGVtcyBwZXIgcm93IHNob3VsZCBiZSB0d28uIElmIHRoZSB2YXJpYWJsZSBjb21wdXRlZCB0byBsZXNzLCBtYW51YWxseSBjb3JyZWN0IGl0LlxyXG4gICAgICAgICAgc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyA9IDI7XHJcbiAgICAgICAgICB0b3RhbEdyaWRJdGVtcyA9IHRvdGFsR3JpZEl0ZW1zIC0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29sdW1uQ291bnQgPSBzdWJjYXRlZ29yeUl0ZW1zUGVyUm93ICsgMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSBpZiBjaGFuZ2VzIGluIGNvbHVtbiBjb3VudCBoYXMgb2NjdXJyZWQgYW5kIGFjdCBhY2NvcmRpbmdseVxyXG4gICAgICAgIGlmIChzdWJjYXRlZ29yeUV4cGxvcmF0aW9uQ29sdW1ucyAhPT0gY29sdW1uQ291bnQpIHtcclxuICAgICAgICAgIC8vIERldGVybWluZSBhZGRpdGlvbmFsIFwiZmlsbGVyLWJveFwiIG5lZWRlZCB0byBjcmVhdGUgY29tcGxldGUgcm93XHJcbiAgICAgICAgICB2YXIgZmlsbGVyQm94Q291bnQgPSBjb2x1bW5Db3VudCAtICh0b3RhbEdyaWRJdGVtcyAlIGNvbHVtbkNvdW50KTtcclxuICAgICAgICAgIGZpbGxHcmlkUm93KCRzdWJjYXRlZ29yeUNvbnRhaW5lciwgZmlsbGVyQm94Q291bnQpO1xyXG4gICAgICAgICAgLy8gVXBkYXRlIHBlcnNpc3RlbnQgY29sdW1uIGNvdW50XHJcbiAgICAgICAgICBzdWJjYXRlZ29yeUV4cGxvcmF0aW9uQ29sdW1ucyA9IGNvbHVtbkNvdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHZpZXdhYmxlIHN1YmNhdGVnb3JpZXMuXHJcbiAgICAgICAgJHN1YmNhdGVnb3J5LmhpZGUoKTtcclxuICAgICAgICAkc3ViY2F0ZWdvcnkuc2xpY2UoMCwgc3ViY2F0ZWdvcnlJdGVtc1BlclJvdykuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xyXG5cclxuICAgICAgICB2aWV3TW9yZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiB2aWV3TW9yZSgpIHtcclxuICAgICAgICB2YXIgJHZpZXdMZXNzID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctbGVzcycpO1xyXG4gICAgICAgIHZhciAkdmlld01vcmUgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdmlldy1hbGwnKTtcclxuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5ID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3N1YmNhdGVnb3J5Jyk7XHJcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeUNvbnRhaW5lciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX19jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgJHZpZXdMZXNzLmhpZGUoKTtcclxuICAgICAgICAkdmlld01vcmUuc2hvdygpO1xyXG5cclxuICAgICAgICAkKCcudmlld0FsbCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAkc3ViY2F0ZWdvcnkuZmFkZUluKCk7XHJcbiAgICAgICAgICAkdmlld01vcmUuaGlkZSgpO1xyXG4gICAgICAgICAgJHN1YmNhdGVnb3J5Q29udGFpbmVyLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG4gICAgICAgICAgJHZpZXdMZXNzLnNob3coKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy52aWV3TGVzcycpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAkc3ViY2F0ZWdvcnkuaGlkZSgpO1xyXG4gICAgICAgICAgY2hlY2tTaXplKCk7XHJcbiAgICAgICAgICAkdmlld0xlc3MuaGlkZSgpO1xyXG4gICAgICAgICAgJHN1YmNhdGVnb3J5Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG4gICAgICAgICAgJHZpZXdNb3JlLnNob3coKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIGZ1bmN0aW9uIGZpbGxHcmlkUm93KCRjb250YWluZXIsIGNvdW50KSB7XHJcbiAgICAgICAgdmFyIGZpbGxlckJveCA9ICc8ZGl2IGNsYXNzPVwiZmlsbGVyLWJveFwiPjwvZGl2Pic7XHJcbiAgICAgICAgLy8gY2xlYXIgb3V0IGN1cnJlbnQgZmlsbGVyIGJveGVzXHJcbiAgICAgICAgdmFyICRmaWxsZXJCb3hlcyA9ICRjb250YWluZXIuZmluZCgnLmZpbGxlci1ib3gnKTtcclxuICAgICAgICAkZmlsbGVyQm94ZXMucmVtb3ZlKCk7XHJcbiAgICAgICAgLy8gZmlsbCBvdXQgZ3JpZCByb3dcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKGZpbGxlckJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBydW4gdGVzdCBvbiBpbml0aWFsIHBhZ2UgbG9hZFxyXG4gICAgICBjaGVja1NpemUoKTtcclxuXHJcbiAgICAgIC8vIHJ1biB0ZXN0IG9uIHJlc2l6ZSBvZiB0aGUgd2luZG93XHJcbiAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNoZWNrU2l6ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KShqUXVlcnksIERydXBhbCk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBJbnRlcmFjdGlvbnMgZm9yIHdheWZpbmRlci5cclxuICpcclxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XHJcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XHJcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxyXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXHJcbiAqL1xyXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gIERydXBhbC5iZWhhdmlvcnMud2F5ZmluZGVyID0ge1xyXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuICAgICAgKGZ1bmN0aW9uICgkKSB7XHJcbiAgICAgICAgaWYoJC5jb29raWUoJ2FtYV93YXlmaW5kZXJfY29va2llJykpIHtcclxuICAgICAgICAgICQuY29va2llLmpzb24gPSB0cnVlO1xyXG4gICAgICAgICAgLy8gUmVhZCB3YXlmaW5kZXIgY29va2llcyBzZXQgZnJvbSBhbWEtYXNzbiBkb21haW5zXHJcbiAgICAgICAgICB2YXIgYW1hX3dheWZpbmRlcl9jb29raWUgPSAkLmNvb2tpZSgnYW1hX3dheWZpbmRlcl9jb29raWUnKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYW1hX3dheWZpbmRlcl9jb29raWUgIT09ICd1bmRlZmluZWQnIHx8ICQoJy5yZWZlcnJlZCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgJCgnLmFtYV9fd2F5ZmluZGVyLS1yZWZlcnJlciBhJykuZmFkZUluKCkuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcclxuICAgICAgICAgICAgJCgnLmFtYV9fd2F5ZmluZGVyLS1yZWZlcnJlciBhJykuYXR0cihcImhyZWZcIiwgYW1hX3dheWZpbmRlcl9jb29raWVbMV0pO1xyXG4gICAgICAgICAgICAkKCcuYW1hX193YXlmaW5kZXItLXJlZmVycmVyIGEnKS50ZXh0KGFtYV93YXlmaW5kZXJfY29va2llWzBdKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5hbWFfd2F5ZmluZGVyX3JlZmVycmVyLS1saW5rLWJhY2snKS5mYWRlT3V0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KShqUXVlcnkpO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiLyo9PT09PT0galF1ZXJ5IFVJIHRhYnMgPT09PT09Ki9cclxuXHJcblxyXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3RhYnMgPSB7XHJcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xyXG4gICAgICB2YXIgZGVmYXVsdEFjdGl2ZVRhYiA9IDA7XHJcbiAgICAgIHZhciB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgIGlmICh2aWV3cG9ydFdpZHRoID49IDYwMCAmJiAkKCcuYW1hX19yZXNvdXJjZS10YWJzJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGRlZmF1bHRBY3RpdmVUYWIgPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkKFwiLmFtYV9fdGFicywgLmFtYV9fcmVzb3VyY2UtdGFic1wiKS50YWJzKHtcclxuICAgICAgICBhY3RpdmU6IGRlZmF1bHRBY3RpdmVUYWIsXHJcbiAgICAgICAgYWN0aXZhdGU6IHJlbW92ZUhpZ2hsaWdodHNcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBQcmV2ZW50IGp1bXAgb25jbGlja1xyXG4gICAgICAkKCcudWktdGFicy1hbmNob3InKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIC8vU2ltdWxhdGUgY2xpY2sgZXZlbnQgb24gYWN0dWFsIHNpbXBsZVRhYnMgdGFiIGZyb20gbW9iaWxlIGRyb3AgZG93bi5cclxuICAgICAgJCgnLmFtYV9fdGFicy1uYXZpZ2F0aW9uLS1tb2JpbGUgc2VsZWN0Jykub24oXCJzZWxlY3RtZW51Y2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCwgdWkpIHtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9IHVpLml0ZW0udmFsdWU7XHJcbiAgICAgICAgJCgnYVtocmVmPVwiIycgKyBzZWxlY3RlZFZhbHVlICsgJ1wiXScpLmNsaWNrKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gV2hlbiBjbGlja2luZyBhbiBpbmxpbmUgcmVzb3VyY2UgcGFnZSBsaW5rIHJlZmVyZW5jaW5nIGEgdGFiLCBvcGVuIHJlZmVyZW5jZWQgdGFiLlxyXG4gICAgICAkKCcuYW1hX19yZXNvdXJjZS1saW5rLS1pbmxpbmUsIC5hbWFfX3BhZ2UtLXJlc291cmNlX19yZXNvdXJjZS1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB2YXIgJHRhYnMgPSAkKCcuYW1hX19yZXNvdXJjZS10YWJzJyk7XHJcbiAgICAgICAgc3dpdGNoVGFicygkdGFicywgdGhpcyk7XHJcbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHJlbW92ZUhpZ2hsaWdodHMoKSB7XHJcbiAgICAgICAgJCgnLmFtYV9yZXNvdXJjZS1oZWFkZXItLWhpZ2hsaWdodCcpLnJlbW92ZUNsYXNzKCdhbWFfcmVzb3VyY2UtaGVhZGVyLS1oaWdobGlnaHQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLypcclxuICAgICAgICogVGhpcyBmdW5jdGlvbiBhbmltYXRlcyB0aGUgYnJvd3NlciBzY3JvbGwgYWN0aW9uIHdpdGggYXR0ZW50aW9uIHRvIGtleWJvYXJkIG9ubHkgYWNjZXNzaWJpbGl0eSBjb25jZXJuc1xyXG4gICAgICAgKlxyXG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICR0YWJOYXZcclxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFyZ2V0XHJcbiAgICAgICAqL1xyXG4gICAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoJHRhYk5hdiwgdGFiSGFzaCwgcG9zaXRpb25JblRhYikge1xyXG4gICAgICAgIHZhciBzY3JvbGxUYXJnZXQgPSB3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMjAwID8gJy5hbWFfX3Jlc291cmNlLXRhYnNfX2NvbnRlbnQnIDogJ2h0bWwsYm9keSc7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBwcmV2aW91cyBoaWdobGlnaHRzLCBpZiBhbnlcclxuICAgICAgICByZW1vdmVIaWdobGlnaHRzKCk7XHJcblxyXG4gICAgICAgIC8vIFRyeSB0byBmaW5kIHRhcmdldCBlbGVtZW50IG9mZnNldCwgYnV0IGRlZmF1bHQgdG8gemVyb1xyXG4gICAgICAgIHZhciBzY3JvbGxQb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgdmFyICR0YXJnZXQ7XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uSW5UYWIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdmFyIHRhYkVsZW1lbnRzID0gJCh0YWJIYXNoICsgJyAuYW1hX19yZXNvdXJjZS10YWJzX19pdGVtJyk7XHJcbiAgICAgICAgICBpZiAodGFiRWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vIElmIGRlc2lyZWQgcG9zaXRpb24gaXMgbGFyZ2VyIHRoYW4gdGhlIHJlc3VsdCBzZXQsIHVzZSB0aGUgbGFzdCBlbGVtZW50XHJcbiAgICAgICAgICAgIGlmICh0YWJFbGVtZW50cy5sZW5ndGggPD0gcG9zaXRpb25JblRhYikge1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uSW5UYWIgPSB0YWJFbGVtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVXNlcnMgYXJlIGluc3RydWN0ZWQgdG8gY29uc2lkZXIgMSBhcyB0aGUgZmlyc3QgZWxlbWVudFxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGFiRWxlbWVudHNbcG9zaXRpb25JblRhYiAtIDFdO1xyXG4gICAgICAgICAgICBzY3JvbGxQb3NpdGlvbiA9IHRhcmdldC5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgIC8vIEFkZCBoaWdobGlnaHQgdG8gdGFyZ2V0XHJcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKHRhcmdldCkuZmluZCgnLmFtYV9yZXNvdXJjZS1oZWFkZXInKTsgLy8gc2F2ZSBmb3IgdXNlIGluIGFuaW1hdGUoKSBjYWxsYmFja1xyXG4gICAgICAgICAgICAkdGFyZ2V0LmFkZENsYXNzKCdhbWFfcmVzb3VyY2UtaGVhZGVyLS1oaWdobGlnaHQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJHRhcmdldCA9ICQodGFiSGFzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICQoc2Nyb2xsVGFyZ2V0KS5hbmltYXRlKHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsUG9zaXRpb25cclxuICAgICAgICB9LCA4NTAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vIFVwZGF0ZSBmb2N1cyBmb3Iga2V5Ym9hcmQgb25seSBuYXZpZ2F0aW9uXHJcbiAgICAgICAgICAkdGFyZ2V0LmF0dHIoJ3RhYmluZGV4JywgJy0xJykuZm9jdXMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKlxyXG4gICAgICAgKiBUaGlzIGZ1bmN0aW9uIG9wZW5zIHJlZmVyZW5jZWQgdGFicyBmcm9tIGlubGluZSBsaW5rc1xyXG4gICAgICAgKlxyXG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICR0YWJPYmogVGhlIGVsZW1lbnQgd2hpY2ggaGFzIHRoZSAudGFiKCkgZnVuY3Rpb24gYXR0YWNoZWQuXHJcbiAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gbGlua1xyXG4gICAgICAgKi9cclxuICAgICAgZnVuY3Rpb24gc3dpdGNoVGFicygkdGFiT2JqLCBsaW5rKSB7XHJcblxyXG4gICAgICAgIHZhciBsaW5rSGFzaCA9IGxpbmsuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcclxuICAgICAgICB2YXIgd2lkZ2V0ID0gJHRhYk9iai5kYXRhKCd1aS10YWJzJyk7XHJcblxyXG4gICAgICAgIHZhciB0YWJIYXNoLCBwb3NpdGlvbkluVGFiO1xyXG4gICAgICAgIHZhciBwYXJ0cyA9IGxpbmtIYXNoLnNwbGl0KCctJyk7XHJcbiAgICAgICAgdGFiSGFzaCA9IHBhcnRzWzBdO1xyXG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICBwb3NpdGlvbkluVGFiID0gcGFydHNbMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIElmIG9sZCBsaW5rLCB0cnkgdG8gZGV0ZXJtaW5lIHBvc2l0aW9uIGZyb20gbGluayB0ZXh0XHJcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IGxpbmsuaW5uZXJUZXh0Lm1hdGNoKC8oWzAtOV0rKS9nKTtcclxuICAgICAgICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uSW5UYWIgPSBtYXRjaGVzLnNoaWZ0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFbnN1cmUgY29ycmVjdCB0YWIgaXMgYWN0aXZlXHJcbiAgICAgICAgdmFyIHRhYkluZGV4ID0gd2lkZ2V0Ll9nZXRJbmRleCh0YWJIYXNoKTtcclxuICAgICAgICAkdGFiT2JqLnRhYnMoe1xyXG4gICAgICAgICAgYWN0aXZlOiB0YWJJbmRleFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTY3JvbGwgdG8gdG9wIG9mIHVpIHRhYnMgbmF2aWdhdGlvblxyXG4gICAgICAgIHNtb290aFNjcm9sbCgkdGFiT2JqLCB0YWJIYXNoLCBwb3NpdGlvbkluVGFiKTtcclxuXHJcbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG4iLCIvKj09PT09PSBqUXVlcnkgVUkgYWNjb3JkaW9uID09PT09PSovXHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG4gICAgJCggXCIuYW1hX19hY2NvcmRpb25cIiApLmFjY29yZGlvbih7XHJcbiAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiLFxyXG4gICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxyXG4gICAgICAgIGFjdGl2ZTogZmFsc2VcclxuICAgIH0pO1xyXG59KShqUXVlcnkpO1xyXG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gIHZhciB2ZXJpZnlGaWVsZHMgPSBmdW5jdGlvbihmb3JtKSB7XHJcbiAgICB2YXIgJHNlY3Rpb25zID0gZm9ybS5maW5kKCdzZWN0aW9uJyk7XHJcbiAgICB2YXIgJGlucHV0cyA9ICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBzZWN0aW9uIConKS5maWx0ZXIoJzppbnB1dCcpO1xyXG4gICAgdmFyICRpY29uRWxlbWVudCA9ICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKTtcclxuICAgIHZhciBlcnJvclNlY3Rpb25zID0gW107XHJcblxyXG4gICAgJGlucHV0cy5lYWNoKGZ1bmN0aW9uKGksIGlucHV0KSB7XHJcbiAgICAgICRjbG9zZXN0U2VjdGlvbiA9ICQodGhpcykuY2xvc2VzdCgnc2VjdGlvbicpLmF0dHIoJ2RhdGEtZHJ1cGFsLXNlbGVjdG9yJykudG9TdHJpbmcoKTtcclxuICAgICAgaWYgKCQodGhpcykucHJvcCgncmVxdWlyZWQnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdlcnJvcicpKSB7XHJcbiAgICAgICAgZXJyb3JTZWN0aW9ucy5wdXNoKCRjbG9zZXN0U2VjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICRzZWN0aW9ucy5lYWNoKGZ1bmN0aW9uKGksIHNlY3Rpb24pIHtcclxuICAgICAgaWYgKCQuaW5BcnJheSgkKHRoaXMpLmF0dHIoJ2RhdGEtZHJ1cGFsLXNlbGVjdG9yJykudHJpbSgpLnRvU3RyaW5nKCksIGVycm9yU2VjdGlvbnMpICE9PSAtMSkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgkaWNvbkVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlZGl0IGVycm9yIGNvbXBsZXRlZCcpLmFkZENsYXNzKCdlcnJvcicpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgICQodGhpcykuZmluZCgkaWNvbkVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlZGl0IGVycm9yIGNvbXBsZXRlZCcpLmFkZENsYXNzKCdjb21wbGV0ZWQnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKGVtYWlsKSB7XHJcbiAgICB2YXIgZW1haWxSZWcgPSAvXihbXFx3LVxcLl0rQChbXFx3LV0rXFwuKStbXFx3LV17Miw0fSk/JC87XHJcbiAgICByZXR1cm4gZW1haWxSZWcudGVzdChlbWFpbCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmaWVsZElzUmVxdWlyZWQoaW5wdXQpIHtcclxuICAgIGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xyXG4gICAgaW5wdXQubmV4dCgpLnJlbW92ZSgnLmZvcm0taXRlbS0tZXJyb3ItbWVzc2FnZScpO1xyXG4gICAgaW5wdXQuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJmb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2VcIj5GaWVsZCBpcyByZXF1aXJlZC48L2Rpdj4nKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNoZWNrRmllbGQoaW5wdXQpIHtcclxuICAgIGlmIChpbnB1dC5wcm9wKCdyZXF1aXJlZCcpICYmIChpbnB1dC52YWwoKS5sZW5ndGggPT09IDAgfHwgaW5wdXQudmFsKCkgPT09IFwiXCIpKSB7XHJcbiAgICAgIGZpZWxkSXNSZXF1aXJlZChpbnB1dCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaWYgKGlucHV0LmF0dHIoJ3R5cGUnKSA9PT0gJ2VtYWlsJyAmJiAhdmFsaWRhdGVFbWFpbChpbnB1dC52YWwoKSkpIHtcclxuICAgICAgICBmaWVsZElzUmVxdWlyZWQoaW5wdXQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcicpLm5leHQoKS5yZW1vdmUoJy5mb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2UnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gU3VibWl0cyBmaXJzdCBwYWdlIG9mIENvbnRhY3QgVXMgZm9ybSBvbiByYWRpbyBidXR0b24gc2VsZWN0aW9uXHJcbiAgJC5mbi5jb250YWN0U3VibWl0ID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciAkd2ViZm9ybV9idXR0b25zID0gJCgnLndlYmZvcm0tc3VibWlzc2lvbi1jb250YWN0LXVzLWZvcm0gaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XHJcbiAgICAkd2ViZm9ybV9idXR0b25zLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWNvbnRhY3QtdXMtZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gICQuZm4uY29udGFjdFN1Ym1pdCgpO1xyXG4gICQoIGRvY3VtZW50ICkuYWpheENvbXBsZXRlKGZ1bmN0aW9uKCkge1xyXG4gICAgJC5mbi5jb250YWN0U3VibWl0KCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIEdvIGJhY2sgdG8gcHJldmlvdXMgYmFjayBpcyB1c2VyIGNsaWNrcyBkZWNsaW5lIHN1Ym1pdCBidXR0b25cclxuICAkKCcuYW1hX19idXR0b24tLWRlY2xpbmUnKS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LnJlZmVycmVyID09PSBcIlwiKSB7XHJcbiAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWY9Jy8nO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB2YXIgaW5pdGlhbExvYWQgPSB0cnVlO1xyXG5cclxuICBEcnVwYWwuYmVoYXZpb3JzLndlYkZvcm0gPSB7XHJcbiAgICBkZXRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncywgdHJpZ2dlcikge1xyXG4gICAgICBpZiAodHJpZ2dlciA9PT0gJ3NlcmlhbGl6ZScpIHtcclxuICAgICAgICBpbml0aWFsTG9hZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcclxuICAgICAgaWYgKCFpbml0aWFsTG9hZCkge1xyXG4gICAgICAgIGlmICghY29udGV4dC5pbm5lclRleHQubWF0Y2goXCJFcnJvciBtZXNzYWdlXCIpKSB7XHJcbiAgICAgICAgICAkKCcuYW1hX19zYWxlcy1sYW5kaW5nLXBhZ2VfX2Zvcm1fX2hlYWRpbmcnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAkLnZhbGlkYXRvci5hZGRNZXRob2QoXHJcbiAgICAgICAgXCJyZWdleFwiLFxyXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlLCBlbGVtZW50LCByZWdleHApIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIHx8IHJlZ2V4cC50ZXN0KHZhbHVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiUGxlYXNlIGNoZWNrIHlvdXIgaW5wdXQuXCJcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIE9uIHdlYmZvcm0gc3VibWl0IGNoZWNrIHRvIHNlZSBpZiBhbGwgaW5wdXRzIGFyZSB2YWxpZFxyXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0nKS52YWxpZGF0ZSh7XHJcbiAgICAgICAgaWdub3JlOiBbXSxcclxuICAgICAgICBydWxlczoge1xyXG4gICAgICAgICAgJ2VtYWlsJzoge1xyXG4gICAgICAgICAgICBlbWFpbDogdHJ1ZVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgICd0ZWxlcGhvbmUnOiB7XHJcbiAgICAgICAgICAgICdyZWdleCc6IC9eKFxcK1xcZHsxLDJ9XFxzKT9cXCg/XFxkezN9XFwpP1tcXHMuLV0/XFxkezN9W1xccy4tXT9cXGR7NH0kL1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgICdiaXJ0aF95ZWFyJzoge1xyXG4gICAgICAgICAgICAncmVnZXgnOiAvXigxOXwyMClcXGR7Mn0kL1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uKGVycm9yLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudC5hdHRyKFwidHlwZVwiKSA9PT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQucGFyZW50KCkuc2libGluZ3MoKS5sYXN0KCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoZWxlbWVudC5pcyhcInNlbGVjdFwiKSkge1xyXG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50Lm5leHQoKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnZhbGlkSGFuZGxlcjogZnVuY3Rpb24oZm9ybSwgdmFsaWRhdG9yKSB7XHJcbiAgICAgICAgICB2YXIgZXJyb3JzID0gdmFsaWRhdG9yLm51bWJlck9mSW52YWxpZHMoKTtcclxuICAgICAgICAgIGlmIChlcnJvcnMpIHtcclxuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLmFkZENsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKCQoJy5qcy1mb3JtLXR5cGUtcmFkaW8nKS5maW5kKCdsYWJlbC5lcnJvcicpLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAkKCcuanMtZm9ybS10eXBlLXJhZGlvIGxhYmVsLmVycm9yJykucGFyZW50cygnLmZpZWxkc2V0LXdyYXBwZXInKS5hZGRDbGFzcygnZXJyb3InKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGlucHV0cyBhcmUgdmFsaWRcclxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBsYWJlbC5lcnJvcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiggJCh0aGlzKS50ZXh0KCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5hZGRDbGFzcygnZXJyb3InKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gQWRkIHZhbGlkYXRpb24gdG8gc2VsZWN0IGRyb3Bkb3duIG1lbnVzIHVzaW5nIGpRdWVyeSBVSVxyXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gc2VsZWN0Jykuc2VsZWN0bWVudSh7XHJcbiAgICAgICAgc3R5bGU6ICdkcm9wZG93bicsXHJcbiAgICAgICAgdHJhbnNmZXJDbGFzc2VzOiB0cnVlLFxyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkKFwiLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtXCIpLnZhbGlkYXRlKCkuZWxlbWVudCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuXHJcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfbWFpbk5hdmlnYXRpb24gPSB7XHJcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xyXG5cclxuICAgICAgdmFyICRjYXRlZ29yeU5hdldyYXBwZXIgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fd3JhcHBlcicpLFxyXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudScpLFxyXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cCA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19ncm91cCcpLFxyXG4gICAgICAgICAgJG1vYmlsZVNlYXJjaFRyaWdnZXIgPSAkKCcuZ2xvYmFsLXNlYXJjaC10cmlnZ2VyJyksXHJcbiAgICAgICAgICAkbW9iaWxlU2VhcmNoID0gJCgnLmFtYV9fZ2xvYmFsLXNlYXJjaCcpLFxyXG4gICAgICAgICAgJG1haW5OYXYgPSAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gJyksXHJcbiAgICAgICAgICAkcHJvZHVjdE5hdiA9ICQoJy5hbWFfX3Byb2R1Y3QtbmF2JyksXHJcbiAgICAgICAgICAkc3ViTWVudSA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19zdWJtZW51JyksXHJcbiAgICAgICAgICAkc3ViTWVudUFydGljbGUgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnKSxcclxuICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0ID0gMCxcclxuICAgICAgICAgIHByb2R1Y3ROYXZIZWlnaHQgPSAwLFxyXG4gICAgICAgICAgY2F0ZWdvcnlOYXZNZW51SGVpZ2h0ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnUnKS5vdXRlckhlaWdodCgpLFxyXG4gICAgICAgICAgY2F0ZWdvcnlOYXZNZW51UmVzaXplZEhlaWdodCA9IDAsXHJcbiAgICAgICAgICB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpLFxyXG4gICAgICAgICAgJGFsZXJ0X2Jhbm5lciA9ICQoJy5hbWFfX2FsZXJ0X193cmFwJyk7XHJcblxyXG4gICAgICAvLyBDaGVja3MgaWYgdXNlciBhZ2VudCBpcyBhIG1vYmlsZSBkZXZpY2VcclxuICAgICAgdmFyIGRldmljZUFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICB2YXIgYWdlbnRJRCA9IGRldmljZUFnZW50Lm1hdGNoKC8oYW5kcm9pZHx3ZWJvc3xpcGhvbmV8aXBvZHxibGFja2JlcnJ5KS8pICYmIHdpbmRvd1dpZHRoIDwgNzY4O1xyXG5cclxuICAgICAgLy8gU2V0IHByb2R1Y3QgbmF2IGhlaWdodCBpZiBwcmVzZW50LlxyXG4gICAgICBpZigkcHJvZHVjdE5hdi5sZW5ndGggJiYgJHByb2R1Y3ROYXYuaXMoJzp2aXNpYmxlJykgKXtcclxuICAgICAgICBwcm9kdWN0TmF2SGVpZ2h0ID0gJHByb2R1Y3ROYXYuaGVpZ2h0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvZHVjdE5hdkhlaWdodCA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNldCBhbGVydCBiYW5uZXIgaGVpZ2h0IGlmIHByZXNlbnQuXHJcbiAgICAgIGlmKCRhbGVydF9iYW5uZXIubGVuZ3RoICYmICRhbGVydF9iYW5uZXIuaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICBhbGVydEJhbm5lckhlaWdodCA9ICRhbGVydF9iYW5uZXIub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydEJhbm5lckhlaWdodCA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHdoZXRoZXIgb3Igbm90IHRoZSBjYXRlZ29yeSBuYXYgc2hvdWxkIGhhdmUgc2Nyb2xsYmFyc1xyXG4gICAgICBmdW5jdGlvbiBjYXRlZ29yeU5hdkhlaWdodChyZXNpemVWaWV3cG9ydEhlaWdodCkge1xyXG5cclxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdmlld3BvcnQgaGVpZ2h0IGlzIHBhc3NlZCBiYWNrIHdoZW4gdGhlIHdpbmRvdyBnZXRzIHJlc2l6ZWRcclxuICAgICAgICBpZih0eXBlb2YgcmVzaXplVmlld3BvcnRIZWlnaHQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHJlc2l6ZVZpZXdwb3J0SGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBXaW5kb3cgaGVpZ2h0IGlzIHVzZWQgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdWJ0cmFjdCB0aGUgbmF2aWdhdGlvbiBoZWlnaHQgZnJvbSB3aW5kb3cgaGVpZ2h0IHRvIGFzc2VzcyBjb250ZW50IGhlaWdodFxyXG4gICAgICAgIGNhdGVnb3J5TmF2TWVudVJlc2l6ZWRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodDtcclxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgbWFpbiBtZW51IHB1cnBsZSBkcm9wZG93biBoZWlnaHQgaXMgbGFyZ2VyIHRoYW4gdmlld3BvcnQgaGVpZ2h0XHJcbiAgICAgICAgaWYgKGNhdGVnb3J5TmF2TWVudUhlaWdodCArICRtYWluTmF2Lm91dGVySGVpZ2h0KCkgKyBwcm9kdWN0TmF2SGVpZ2h0ID4gdmlld3BvcnRIZWlnaHQgJiYgIWFnZW50SUQpIHtcclxuXHJcbiAgICAgICAgICAvLyBTZXQgdGhlIG1lbnUgZHJvcGRvd24gdGhlIHNhbWUgYXMgdmlld3BvcnQgdG8gZW5hYmxlIHNjcm9sbGluZ1xyXG4gICAgICAgICAgdmFyIGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQgPSBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0IC0gJG1haW5OYXYub3V0ZXJIZWlnaHQoKSAtIHByb2R1Y3ROYXZIZWlnaHQgLSBhbGVydEJhbm5lckhlaWdodDtcclxuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAuYWRkQ2xhc3MoJ3Njcm9sbCcpLm91dGVySGVpZ2h0KGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpO1xyXG5cclxuICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAub24oJ3Nob3cuc21hcGknLCBmdW5jdGlvbihlLCBtZW51KSB7XHJcbiAgICAgICAgICAgIGlmKCQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19zdWJtZW51JywgbWVudSkub3V0ZXJIZWlnaHQoKSA+IGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpIHtcclxuICAgICAgICAgICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fc3VibWVudScsIG1lbnUpLm91dGVySGVpZ2h0KGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZigkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnLCBtZW51KS5vdXRlckhlaWdodCgpID4gY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCkge1xyXG4gICAgICAgICAgICAgICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19hcnRpY2xlcycsIG1lbnUpLm91dGVySGVpZ2h0KGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpLmFkZENsYXNzKCdvbmVfYXJ0aWNsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cC5yZW1vdmVDbGFzcygnc2Nyb2xsJykub3V0ZXJIZWlnaHQoJ2F1dG8nKTtcclxuICAgICAgICAgICRzdWJNZW51Lm91dGVySGVpZ2h0KCdhdXRvJyk7XHJcbiAgICAgICAgICAkc3ViTWVudUFydGljbGUub3V0ZXJIZWlnaHQoJ2F1dG8nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAvLyBIaWRlL1Nob3cgbWVudVxyXG4gICAgICBmdW5jdGlvbiBoaWRlU2hvdygpIHtcclxuICAgICAgICBpZiAoJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZURvd24oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoKGNhdGVnb3J5TmF2TWVudUhlaWdodCArICAkbWFpbk5hdi5vdXRlckhlaWdodCgpICsgcHJvZHVjdE5hdkhlaWdodCArIGFsZXJ0QmFubmVySGVpZ2h0KSA+IHZpZXdwb3J0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgYm9keVNjcm9sbExvY2suZGlzYWJsZUJvZHlTY3JvbGwoJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cCwge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZ1bmN0aW9uIGFsbG93VG91Y2hNb3ZlKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChlbCAmJiBlbCAhPT0gZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2JvZHktc2Nyb2xsLWxvY2staWdub3JlJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFnZW50SUQpIHtcclxuICAgICAgICAgICAgICAvLyBPbmx5IG1ha2UgdGhlIG1lbnUgaGVpZ2h0IHNhbWUgYXMgdmlld3BvcnQgb24gbW9iaWxlIGRldmljZXNcclxuICAgICAgICAgICAgICB2YXIgbW9iaWxlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICRjYXRlZ29yeU5hdldyYXBwZXIuaGVpZ2h0KG1vYmlsZUhlaWdodCkuYWRkQ2xhc3MoJ3Njcm9sbCcpO1xyXG5cclxuICAgICAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLm9uKCdzaG93LnNtYXBpJywgZnVuY3Rpb24oZSwgbWVudSkge1xyXG4gICAgICAgICAgICAgICAgaWYoJChtZW51KS5vdXRlckhlaWdodCgpID4gbW9iaWxlSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICQobWVudSkub3V0ZXJIZWlnaHQobW9iaWxlSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oZWlnaHQoJ2F1dG8nKTtcclxuICAgICAgICAgICAgICBjYXRlZ29yeU5hdkhlaWdodCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZVVwKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oZWlnaHQoMCk7XHJcbiAgICAgICAgICAgIGJvZHlTY3JvbGxMb2NrLmNsZWFyQWxsQm9keVNjcm9sbExvY2tzKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENsb3NlcyBtZW51IG9uIGRvYyBsb2FkXHJcbiAgICAgICQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICAkKCcuYW1hX19nbG9iYWwtbWVudScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaGlkZVNob3coKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIElmIGEgdXNlciBjbGlja3Mgb3V0c2lkZSB0aGUgbWVudSB0aGVuIGNsb3NlIGl0XHJcbiAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCEkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5pcyhlLnRhcmdldCkgJiYgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICBoaWRlU2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCRtb2JpbGVTZWFyY2hUcmlnZ2VyKS51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRtb2JpbGVTZWFyY2guc2xpZGVUb2dnbGUoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBmdW5jdGlvbiBtb3ZlU29jaWFsU2hhcmVQb3NpdGlvbigpe1xyXG4gICAgICAgIHZhciBtYWluTmF2UG9zaXRpb24gPSAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gLmNvbnRhaW5lcicpLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgdmFyICRhbWFTb2NpYWxTaGFyZSA9ICQoJy5hbWFfX3NvY2lhbC1zaGFyZScpO1xyXG5cclxuICAgICAgICAvLyBDaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGVub3VnaCBmb3IgdGhlIHN0aWNreSBuYXZcclxuICAgICAgICBpZihtYWluTmF2UG9zaXRpb24gPiA2MCkge1xyXG5cclxuICAgICAgICAgIHZhciBzb2NpYWxTdGlja3lQb3NpdGlvbiA9IG1haW5OYXZQb3NpdGlvbiAtIDYwO1xyXG4gICAgICAgICAgdmFyICRzb2NpYWxJY29ucyA9ICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZScpO1xyXG5cclxuICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB2aWV3cG9ydCB3aWR0aCBpcyBncmVhdGVyIDg1MHB4IHRoZW4gdGhlIHNvY2lhbCBpY29ucyB3aWxsIGJlIHN0aWNreVxyXG4gICAgICAgICAgaWYoJHNvY2lhbEljb25zLmxlbmd0aCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDg1MCkge1xyXG4gICAgICAgICAgICAkc29jaWFsSWNvbnMuc3RpY2t5KHtcclxuICAgICAgICAgICAgICB3cmFwcGVyQ2xhc3NOYW1lOiAnYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUtd3JhcHBlcicsXHJcbiAgICAgICAgICAgICAgekluZGV4OiA1MDFcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc29jaWFsSWNvbnMub24oJ3N0aWNreS1zdGFydCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAkYW1hU29jaWFsU2hhcmUuYWRkQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmNzcygnbGVmdCcsIHNvY2lhbFN0aWNreVBvc2l0aW9uKS5oaWRlKCkuZmFkZVRvKCdzbG93JywgMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNvY2lhbEljb25zLm9uKCdzdGlja3ktdXBkYXRlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICRhbWFTb2NpYWxTaGFyZS5hZGRDbGFzcygnYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJykuaGlkZSgpLmZhZGVUbygnc2xvdycsIDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzb2NpYWxJY29ucy5vbignc3RpY2t5LWVuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAkKCcuYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJykucmVtb3ZlQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEluaXRpYWxpemUgZ2V0U29jaWFsU2hhcmUoKVxyXG4gICAgICBtb3ZlU29jaWFsU2hhcmVQb3NpdGlvbigpO1xyXG5cclxuICAgICAgLy8gT25zY3JvbGwgY2hlY2sgdG8gc2VlIGlmIHNvY2lhbCBpY29uIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhhbiBmb290ZXIgcG9zaXRpb25cclxuICAgICAgdmFyIGRlYm91bmNlX3RpbWVyO1xyXG4gICAgICBpZigkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUgLmFtYV9fc29jaWFsLXNoYXJlJykuaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyICRzb2NpYWxJY29ucyA9ICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZSAuYW1hX19zb2NpYWwtc2hhcmUnKTtcclxuICAgICAgICAgIHZhciBzb2NpYWxJY29uUG9zaXRpb25Cb3R0b20gPSAkc29jaWFsSWNvbnMub2Zmc2V0KCkudG9wICsgJHNvY2lhbEljb25zLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICB2YXIgZm9vdGVyUG9zaXRpb24gPSAkKCdmb290ZXInKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgaWYoZGVib3VuY2VfdGltZXIpIHtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChkZWJvdW5jZV90aW1lcik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZGVib3VuY2VfdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoc29jaWFsSWNvblBvc2l0aW9uQm90dG9tID4gZm9vdGVyUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAkKCcuYW1hX19tYXN0aGVhZF9fY29udGVudF9fc2hhcmUnKS5mYWRlT3V0KCdmYXN0Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJykuZmFkZUluKCdmYXN0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHJlc2l6ZVZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvL0NoZWNrcyB0aGUgbGF5b3V0IHBvc2l0aW9uIG9mIGFydGljbGUgb24gd2luZG93IHJlc2l6ZSBhbmQgbW92ZXMgdGhlIHNvY2lhbCBpY29ucyBhY2NvcmRpbmdseVxyXG4gICAgICAkKCB3aW5kb3cgKS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCFhZ2VudElEKSB7XHJcbiAgICAgICAgICB2YXIgcmVzaXplVmlld3BvcnRIZWlnaHQgPSAkKHdpbmRvdykuaW5uZXJIZWlnaHQoKTtcclxuICAgICAgICAgIHZhciBtYWluTmF2UG9zaXRpb25VcGRhdGUgPSAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gLmNvbnRhaW5lcicpLm9mZnNldCgpLmxlZnQgLSAxMDA7XHJcblxyXG4gICAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQocmVzaXplVmlld3BvcnRIZWlnaHQpO1xyXG4gICAgICAgICAgJCgnLmFtYV9fc29jaWFsLXNoYXJlLmFtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmNzcygnbGVmdCcsIG1haW5OYXZQb3NpdGlvblVwZGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vSWYgZW1wdHkgb3Igb3RoZXJ3aXNlIHVucG9wdWxhdGVkIHNlYXJjaCBmaWVsZCAoaS5lIHNwYWNlcyBvbmx5KVxyXG4gICAgICAvL3ByZXZlbnQgc2VhcmNoIGZyb20gc3VibWl0dGluZyBhbmQgcmVsb2FkIGN1cnJlbnQgcGFnZVxyXG4gICAgICB2YXIgc2VhcmNoRm9ybSA9ICQoXCJmb3JtW2lkXj0nYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNoLXNvbHJwYWdlJ11cIik7XHJcblxyXG4gICAgICAkKHNlYXJjaEZvcm0sIHRoaXMpLnN1Ym1pdChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICB2YXIgc2VhcmNoSW5wdXQgPSAkKHRoaXMpLmZpbmQoXCJpbnB1dFtuYW1lKj0nc2VhcmNoJ11cIik7XHJcblxyXG4gICAgICAgICAgLy9UcmltIGFuZCBjaGVjayBpZiBzZWFyY2ggaW5wdXQgaGFzIGFueSB2YWx1ZVxyXG4gICAgICAgICAgaWYgKCQudHJpbShzZWFyY2hJbnB1dC52YWwoKSkubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBzZWFyY2ggdGVybSBlbnRlcmVkJyk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vRW5zdXJlIG5vIHNwYWNlcyBiZWZvcmUgb3IgYWZ0ZXIgcXVlcnkgYXJlIGNvdW50ZWQgaW4gc2VhcmNoXHJcbiAgICAgICAgICAkKHRoaXMpLmZpbmQoc2VhcmNoSW5wdXQpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy9TdWJtaXQgdHJpbW1lZCB2YWx1ZVxyXG4gICAgICAgICAgICAkKHRoaXMpLnZhbCgkLnRyaW0oJCh0aGlzKS52YWwoKSkpO1xyXG4gICAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgICBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG5cclxuXHJcblxyXG4iLCIvKipcclxuICogU21hcnRNZW51cyBqUXVlcnkgUGx1Z2luIC0gdjEuMS4wIC0gU2VwdGVtYmVyIDE3LCAyMDE3XHJcbiAqIGh0dHA6Ly93d3cuc21hcnRtZW51cy5vcmcvXHJcbiAqXHJcbiAqIENvcHlyaWdodCBWYXNpbCBEaW5rb3YsIFZhZGlrb20gV2ViIEx0ZC5cclxuICogaHR0cDovL3ZhZGlrb20uY29tXHJcbiAqXHJcbiAqIExpY2Vuc2VkIE1JVFxyXG4gKi9cclxuXHJcblxyXG5qUXVlcnkoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19ncm91cCcpLnNtYXJ0bWVudXMoe1xyXG4gIHN1YkluZGljYXRvcnNQb3M6ICdhcHBlbmQnXHJcbn0pO1xyXG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3NpZ25Jbk1lbnUgPSB7XHJcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xyXG4gICAgICB2YXIgJHNpZ25JbkRyb3Bkb3duID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bicpO1xyXG4gICAgICB2YXIgJHNpZ25JbkRyb3Bkb3duTWVudSA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX21lbnUnKTtcclxuICAgICAgdmFyICRzaWduSW5MaW5rID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bl9fdGV4dCcpO1xyXG4gICAgICB2YXIgJGV4cGxvcmVNZW51ID0gJCgnLmFtYV9fZXhwbG9yZS1tZW51Jyk7XHJcbiAgICAgIHZhciAkZXhwbG9yZU1lbnVEcm9wZG93biA9ICQoJy5hbWFfX2V4cGxvcmUtbWVudV9fbWVudScpO1xyXG5cclxuICAgICAgZnVuY3Rpb24gZHJvcGRvd25Eb3duTWVudShwYXJlbnRFbGVtZW50LCBtZW51RWxlbWVudCkge1xyXG4gICAgICAgcGFyZW50RWxlbWVudC51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgJChtZW51RWxlbWVudCkuc2xpZGVUb2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU3RvcCBsaW5rIGZyb20gZmlyaW5nXHJcbiAgICAgICAgJHNpZ25JbkxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IG9mIHRoZSBjbGljayBpc24ndCB0aGUgY29udGFpbmVyIG5vciBhIGRlc2NlbmRhbnQgb2YgdGhlIGNvbnRhaW5lclxyXG4gICAgICAgICAgaWYgKCFwYXJlbnRFbGVtZW50LmlzKGUudGFyZ2V0KSAmJiBwYXJlbnRFbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVXAoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBTZXQgdGltZW91dCBmb3Igd2hlbiBhIHVzZXIgbW91c2VzIG91dCBvZiB0aGUgbWVudVxyXG4gICAgICAgICAgcGFyZW50RWxlbWVudC5tb3VzZWVudGVyKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCgpO1xyXG4gICAgICAgICAgfSkubW91c2VsZWF2ZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgJChtZW51RWxlbWVudCkuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkcm9wZG93bkRvd25NZW51KCRzaWduSW5Ecm9wZG93biwgJHNpZ25JbkRyb3Bkb3duTWVudSk7XHJcbiAgICAgIGRyb3Bkb3duRG93bk1lbnUoJGV4cGxvcmVNZW51LCAkZXhwbG9yZU1lbnVEcm9wZG93bik7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3NlYXJjaF9jaGVja2JveCA9IHtcclxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgICB2YXIgJGNhdGVnb3J5U2VhcmNoSW5wdXQgPSAkKCcjc2VhcmNoX2NhdGVnb3J5Jyk7XHJcbiAgICAgIHZhciAkY2F0ZWdvcnlTZWFyY2hMaXN0ID0gJCgnLmZhY2V0cy13aWRnZXQtY2hlY2tib3ggdWwgbGknKTtcclxuICAgICAgdmFyICRjbGVhclNlYXJjaEZpbHRlciA9ICQoJyNhcHBsaWVkRmlsdGVyc1JlbW92ZScpO1xyXG5cclxuICAgICAgLy8gRmlsdGVyIGxpc3QgdXNpbmcgalF1ZXJ5IGZpbHRlclxyXG4gICAgICBmdW5jdGlvbiBmaWx0ZXJMaXN0KHNlYXJjaEJveCwgbGlzdCkge1xyXG4gICAgICAgIHNlYXJjaEJveC5rZXl1cChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgJHJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnZhbHVlLCAnaScpO1xyXG4gICAgICAgICAgbGlzdC5oaWRlKCkuZmlsdGVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRyZWdleC50ZXN0KCQudHJpbSgkKHRoaXMpLnRleHQoKSkpO1xyXG4gICAgICAgICAgfSkuc2hvdygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDbGVhciBmaWx0ZXJcclxuICAgICAgZnVuY3Rpb24gY2xlYWZGaWx0ZXJMaXN0KGNsZWFyU2VhcmNoRmlsdGVyKSB7XHJcbiAgICAgICAgY2xlYXJTZWFyY2hGaWx0ZXIuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICRjYXRlZ29yeVNlYXJjaElucHV0LnZhbCgnJyk7XHJcbiAgICAgICAgICAkY2F0ZWdvcnlTZWFyY2hJbnB1dC50cmlnZ2VyKCdrZXl1cCcpO1xyXG5cclxuICAgICAgICAgICQoJy5mYWNldHMtd2lkZ2V0LWNoZWNrYm94IHVsIGxpIFt0eXBlPWNoZWNrYm94XScpLmVhY2goIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnI2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaC1zb2xycGFnZS0yJykuc3VibWl0KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSW52b2tlIGZpbHRlciBsaXN0XHJcbiAgICAgIGZpbHRlckxpc3QoJGNhdGVnb3J5U2VhcmNoSW5wdXQsICRjYXRlZ29yeVNlYXJjaExpc3QpO1xyXG5cclxuICAgICAgLy8gSW52b2tlIGNsZWFyIGZpbHRlclxyXG4gICAgICBjbGVhZkZpbHRlckxpc3QoJGNsZWFyU2VhcmNoRmlsdGVyKTtcclxuICAgIH1cclxuICB9O1xyXG59KShqUXVlcnksIERydXBhbCk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBicCBjYWxjdWxhdG9yLlxyXG4gKlxyXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcclxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiAnYW5vbnltb3VzIGNsb3N1cmUnLiBTZWU6XHJcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxyXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLmJwQ2FsY3VsYXRvciA9IHtcclxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XHJcblxyXG4gICAgICAvLyBDbG9uZSBsYXN0IHJvdyBvZiB0YWJsZVxyXG4gICAgICAkKCcuYWRkLWJwLXJvdycpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyICR0YWJsZUJvZHkgPSAkKCcjYnBDYWxjdWxhdG9yIHRhYmxlJykuZmluZCgndGJvZHknKSxcclxuICAgICAgICAgICR0ckxhc3QgPSAkdGFibGVCb2R5LmZpbmQoJ3RyOmxhc3QnKSxcclxuICAgICAgICAgICR0ck5ldyA9ICR0ckxhc3QuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgLy8gQXBwZW5kIG5ldyBjbGFzcyBuYW1lIHRvIGNsb25lZCByb3dcclxuICAgICAgICAkdHJMYXN0LmJlZm9yZSgkdHJOZXcpLmFkZENsYXNzKCdjbG9uZWQnKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBuZXcgbmFtZSB3aXRoIGluZGV4XHJcbiAgICAgICAgJHRhYmxlQm9keS5maW5kKCd0cjpsYXN0IGlucHV0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgJHRySW5wdXRDbGFzc0luZGV4ID0gJCgnI2JwQ2FsY3VsYXRvciB0Ym9keT50cicpLmxlbmd0aCArIDEsXHJcbiAgICAgICAgICAgICAgJHRySW5wdXRDbGFzc05hbWUgPSAkKHRoaXMpLmF0dHIoJ2NsYXNzJyk7XHJcblxyXG4gICAgICAgICAgJCh0aGlzKS5hdHRyKCduYW1lJywgJHRySW5wdXRDbGFzc05hbWUgKyAnLScgKyAkdHJJbnB1dENsYXNzSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCd0ZDplcSgwKScsICR0ckxhc3QpLnRleHQoJCgnI2JwQ2FsY3VsYXRvciB0Ym9keT50cicpLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFdoZW4gY2xlYXIvcmVzdGFydCBidXR0b24gaXMgY2xpY2tlZCByZXR1cm4gdGFibGUgdG8gaW5pdGlhbCBzdGF0ZVxyXG4gICAgICAkKCcuY2xlYXItcmVzdGFydCcpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgY2xvbmVkIHJvd3NcclxuICAgICAgICB2YXIgJHRyQ2xvbmVkID0gJCgnLmNsb25lZCcpO1xyXG4gICAgICAgICR0ckNsb25lZC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgdG8gaW50aWFsIHZhbHVlc1xyXG4gICAgICAgICQoJyNicENhbGN1bGF0b3IgaW5wdXQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICQodGhpcykudmFsKCcnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgZm9ybVxyXG4gICAgICAgICQoJyNicENhbGN1bGF0b3IgJykudmFsaWRhdGUoKS5yZXNldEZvcm0oKTtcclxuXHJcbiAgICAgICAgLy8gSGlkZSBvdXRwdXQgcm93XHJcbiAgICAgICAgJCgnLmJwQ2FsY3VsYXRvcl9fdGFibGVfX291dHB1dCcpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlIEJQXHJcbiAgICAgIGZ1bmN0aW9uIGNhbGN1bGNhdGVCUChicFZhbHVlLCBicE91dHB1dCkge1xyXG4gICAgICAgIHZhciBicElucHV0ID0gMCwgLy8gcm93IGNvdW50XHJcbiAgICAgICAgICAgIGJwVG90YWwgPSAwLCAvLyBpbmNyZW1lbnRlZCBpbnB1dCB2YWx1ZXNcclxuICAgICAgICAgICAgYnBBdmVyYWdlOyAvLyBhdmVyYWdlZCBicFRvdGFsIC8gYnBJbnB1dFxyXG5cclxuICAgICAgICBicFZhbHVlLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgLy8gSWYgSW5wdXQgdmFsdWVzIGFyZSBncmVhdGVyIHRoYW4gMCB0aGVuIHR1cm4gaW50byBhIG51bWJlciBhbmQgcm91bmRcclxuICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpID4gMCA/IE1hdGgucm91bmQocGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApKSA6IGZhbHNlO1xyXG5cclxuICAgICAgICAgIGlmICh2YWwgIT09IDApIHtcclxuICAgICAgICAgICAgYnBJbnB1dCArPSAxO1xyXG4gICAgICAgICAgICBicFRvdGFsICs9IHZhbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIGF2ZXJhZ2VcclxuICAgICAgICBicEF2ZXJhZ2UgPSBicFRvdGFsIC8gYnBJbnB1dCA+IDAgPyBNYXRoLnJvdW5kKGJwVG90YWwgLyBicElucHV0KSA6IDA7XHJcblxyXG4gICAgICAgIGJwT3V0cHV0LnRleHQoYnBBdmVyYWdlKTtcclxuXHJcbiAgICAgICAgJCgnLmJwQ2FsY3VsYXRvcl9fdGFibGVfX291dHB1dCcpLnNob3coKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVmFsaWRhdGUgQlAgRm9ybVxyXG4gICAgICAkKCcjYnBDYWxjdWxhdG9yJykudmFsaWRhdGUoe1xyXG4gICAgICAgIC8vIENhbGN1bGF0ZSBCUCB3aGVuIGNhbGN1bGF0ZSBpcyBjbGlja2VkXHJcbiAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24oZm9ybSkge1xyXG4gICAgICAgICAgdmFyIHN5c0JwVmFsdWUgPSAkKCcuYnBDYWxjdWxhdG9yX19zeXN0b2xpYy1pbnB1dCcpLFxyXG4gICAgICAgICAgICBzeXNCcE91dHB1dCA9ICQoJy5icENhbGN1bGF0b3JfX3N5c3RvbGljLW91dHB1dCcpO1xyXG5cclxuICAgICAgICAgIHZhciBkaWFCcFZhbHVlID0gJCgnLmJwQ2FsY3VsYXRvcl9fZGlhc3RvbGljLWlucHV0JyksXHJcbiAgICAgICAgICAgIGRpYUJwT3V0cHV0ID0gJCgnLmJwQ2FsY3VsYXRvcl9fZGlhc3RvbGljLW91dHB1dCcpO1xyXG5cclxuICAgICAgICAgIGNhbGN1bGNhdGVCUChzeXNCcFZhbHVlLCBzeXNCcE91dHB1dCk7XHJcbiAgICAgICAgICBjYWxjdWxjYXRlQlAoZGlhQnBWYWx1ZSwgZGlhQnBPdXRwdXQpO1xyXG5cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIFNhZGx5IGFkZHMgZm9vdGVyIHRvIGxlZnQgcmVzb3VyY2UgcGFnZSBjb2x1bW4uXHJcbiAqXHJcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxyXG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxyXG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcclxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxyXG4gKi9cclxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLnJlc291cmNlUGFnZUZvb3RlciA9IHtcclxuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcclxuXHJcbiAgICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJ2JvZHkuYW1hX19yZXNvdXJjZS1wYWdlJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAkKCdmb290ZXInLCBjb250ZXh0KS5jbG9uZSgpLmFwcGVuZFRvKCcuYW1hX19sYXlvdXQtLXNwbGl0X19sZWZ0JykuYWRkQ2xhc3MoJ2FtYV9fZm9vdGVyIGFtYV9fcmVzb3VyY2UtcGFnZV9fZGVza3RvcC1mb290ZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIFJlc3BvbnNpdmUgVGFibGVzLlxyXG4gKlxyXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcclxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcclxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXHJcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcclxuICovXHJcbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcbiAgRHJ1cGFsLmJlaGF2aW9ycy5yZXNwb25zaXZlVGFibGVzID0ge1xyXG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xyXG5cclxuICAgICAgLy8gVGhpcyBjb25kaXRpb25hbCBoYXMgYmVlbiBhZGRlZCB0byBwcmV2ZW50IGJhc2ljVGFibGUgcGx1Z2luIHRvIHNlbGVjdGl2ZWx5IG5vdCBydW4gb24gdGFibGVzXHJcbiAgICAgIGlmICghJCgndGFibGUnKS5oYXNDbGFzcygnc2ltcGxlVGFibGUnKSkge1xyXG4gICAgICAgICQoJ3RhYmxlJykuYmFzaWN0YWJsZSh7XHJcbiAgICAgICAgICBicmVha3BvaW50OiAxMDI0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHRoaXMgZm9yY2VzIHRhYmxlcyBpbnNpZGUgb2YgdGhlIC5hbWFfX3Jlc291cmNlLS1zY2hlZHVsZXMgZGl2IHRvIGhhdmUgbW9iaWxlIGxvb2sgYW5kIGZlZWxcclxuICAgICAgJCgnLmFtYV9fcmVzb3VyY2UtLXNjaGVkdWxlcyB0YWJsZScpLmVhY2goIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuYmFzaWN0YWJsZSgnc3RhcnQnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIExpc3RpY2xlIENsYXNlcy5cclxuICpcclxuICogSGFuZGxpbmcgY2xhc3NlcyB0byBidWlsZCBsaXN0aWNsZSBwcm9wZXJseSBvdXRzaWRlIGNrZWRpdG9yLlxyXG4gKi9cclxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLmxpc3RpY2xlID0ge1xyXG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xyXG4gICAgICBpZiAoJCgnLmxpc3RpY2xlJywgY29udGV4dCkubGVuZ3RoKSB7XHJcbiAgICAgICAgJCgnLmxpc3RpY2xlJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbiAoaWR4LCBlKSB7XHJcbiAgICAgICAgICAgICQoZSkuYWRkQ2xhc3MoJ2xpc3RpY2xlX19pdGVtJyk7XHJcbiAgICAgICAgICAgICQoZSkuY2hpbGRyZW4oJ29sJykuZWFjaChmdW5jdGlvbiAoaWR4LCBmKSB7XHJcbiAgICAgICAgICAgICAgJChmKS5hZGRDbGFzcygnbGlzdGljbGVfX2l0ZW0tc3ViJyk7XHJcbiAgICAgICAgICAgICAgJChmKS5jaGlsZHJlbignbGknKS5hZGRDbGFzcygnbGlzdGljbGVfX2l0ZW0tc3ViLWl0ZW0nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICAvL2lmIHRoZXJlIGlzIGFuIGlubGluZSBwcm9tbyBvbiBhIHBhZ2Ugd2l0aCBhIGxpc3RpY2xlLCBkZXRlcm1pbmUgaWYgdGhlIGxpc3QgaXMgY2xvc2UgZW5vdWdoIGJlbmVhdGggdGhlIHByb21vIGluIHRoZSBkb20gdG8gYXNzdW1lIGl0IHdpbGwgYmUgZmxvYXRlZCBuZXh0IHRvIGl0LiBJIGNob3NlIHdpdGhpbiA1IHNpYmxpbmdzLlxyXG4gICAgICBpZigkKCcuYW1hX19wcm9tby0taW5saW5lIH4gLmxpc3RpY2xlJykpIHtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gJCgnLmFtYV9fcHJvbW8tLWlubGluZScpLmZpcnN0KCkubmV4dFVudGlsKCcubGlzdGljbGUnKS5hZGRCYWNrKCkubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW5ndGggPD0gNSkge1xyXG4gICAgICAgICAgJCgnLmFtYV9fcHJvbW8tLWlubGluZScpLmFkZENsYXNzKCdsaXN0aWNsZS1tYXJnaW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy9pZiB0aGUgbGlzdGljbGUgaXRlbSBjb250YWlucyBhbiBpbWFnZSwgcHV0IGEgY2xlYXJmaXggZGl2IG9uIHRoZSBpdGVtIHNvIGlmIGl0IGhhcyBhIHRyYWlsaW5nIGltYWdlLCB0aGUgbmV4dCBpdGVtIHdvbid0IHdyYXAgb24gaXQuXHJcbiAgICAgIC8vQWxzbywgZGV0ZXJtaW5lIGl0IHRoZSBpbWFnZSBpcyBhbG1vc3QgMTAwJSBvZiB0aGUgbGlzdCB3aWR0aC4gaWYgaXQgaXMsIGFkZCBhIGNsYXNzIHRvIHJlbW92ZSB0aGUgbGVmdCBtYXJnaW4gYW5kIG1ha2UgdGhlIGltYWdlIDEwMCUgd2lkdGguIEkgY2hvc2UgODAlLlxyXG4gICAgICBpZigkKCcubGlzdGljbGVfX2l0ZW0gaW1nJykpIHtcclxuICAgICAgICAkKCcubGlzdGljbGVfX2l0ZW0gaW1nJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgd2lkdGggPSAkKHRoaXMpLmNsb3Nlc3QoJy5saXN0aWNsZV9faXRlbScpLndpZHRoKClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHdpZHRoKVxyXG4gICAgICAgICAgdmFyIGltYWdlV2lkdGggPSAkKHRoaXMpLndpZHRoKClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGltYWdlV2lkdGgpXHJcbiAgICAgICAgICB2YXIgY2xlYXJmaXggPSAnPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+PC9kaXY+J1xyXG4gICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcubGlzdGljbGVfX2l0ZW0nKS5vbmNlKCkuYXBwZW5kKGNsZWFyZml4KVxyXG4gICAgICAgICAgaWYgKGltYWdlV2lkdGggPj0gd2lkdGgqLjcpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbm8tbWFyZ2luJylcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0ICgnZmlndXJlJykuYWRkQ2xhc3MoJ25vLW1hcmdpbicpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEF0dGFjaGVzIEFNQSBJbWFnZSBQb3B1cCBsaWJyYXJ5LlxyXG4gKi9cclxuXHJcbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcblx0ZnVuY3Rpb24gYWx0ZXJNb2RhbCAoY29udGV4dCkge1xyXG5cdFx0JCgnLnVpLWRpYWxvZycpLmNzcyh7XCJ6LWluZGV4XCI6IFwiNTAwMDFcIn0pO1xyXG5cdFx0JCgnLnVpLWRpYWxvZy10aXRsZScpLmhpZGUoKTtcclxuXHRcdCQoJy51aS1idXR0b24taWNvbi1vbmx5IC51aS1pY29uJykuaGlkZSgpO1xyXG5cdFx0Ly8gU3R5bGVndWlkZSBzcGVjaWZpYyB0cmVhdG1lbnQgdG8gaGlkZSBhbmQgY3NzIHRvIGVsZW1lbnRzLlxyXG5cdFx0JCgnLnVpLWRyYWdnYWJsZSAudWktZGlhbG9nLXRpdGxlYmFyJykuY3NzKHtcclxuXHRcdFx0XCJib3JkZXJcIjogXCJub25lXCIsXHJcblx0XHRcdFwicGFkZGluZzpcIjogXCIwXCIsXHJcblx0XHRcdFwiYmFja2dyb3VuZFwiOiBcIm5vbmVcIlxyXG5cdFx0fSk7XHJcblx0XHQkKCcudWktd2lkZ2V0LW92ZXJsYXknKS5jc3Moe1xyXG5cdFx0XHRcIm9wYWNpdHlcIjogXCIuNVwiLFxyXG5cdFx0XHRcInotaW5kZXg6XCI6IFwiNTAwMFwiXHJcblx0XHR9KTtcclxuXHRcdCQoJy51aS1kaWFsb2cgLnVpLWRpYWxvZy10aXRsZWJhci1jbG9zZScpLmNzcyh7XHJcblx0XHRcdFwiYmFja2dyb3VuZFwiOiBcInVybCgnL2Fzc2V0cy9pbWFnZXMvaWNvbi1tb2RhbC1jbG9zZS5zdmcnKVwiLFxyXG5cdFx0XHRcImJvcmRlclwiOiBcIm5vbmVcIixcclxuXHRcdFx0XCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXHJcblx0XHRcdFwicmlnaHRcIjogXCItMjBweFwiLFxyXG5cdFx0XHRcInRvcFwiOiBcIi0xMHB4XCIsXHJcblx0XHRcdFwiaGVpZ2h0XCI6IFwiMjhweFwiLFxyXG5cdFx0XHRcIndpZHRoXCI6IFwiMjhweFwiLFxyXG5cdFx0XHRcInBhZGRpbmdcIjogXCIwXCIsXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNsb3NlTW9kYWwgKGNvbnRleHQpIHtcclxuXHRcdCQoJy51aS1pY29uLWNsb3NldGhpY2snKS51bmJpbmQoJ2NsaWNrLmNsb3NlJyk7XHJcblx0XHQkKCcudWktaWNvbi1jbG9zZXRoaWNrJykudHJpZ2dlcignY2xpY2snKTtcclxuXHR9XHJcblxyXG5cdERydXBhbC5iZWhhdmlvcnMuYW1hX2ltYWdlX3BvcHVwID0ge1xyXG5cdFx0YXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCkge1xyXG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImRpYWxvZ29wZW5cIiwgXCIudWktZGlhbG9nXCIsIGZ1bmN0aW9uIChldmVudCwgdWkpIHtcclxuXHRcdFx0XHRhbHRlck1vZGFsKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnVpLXdpZGdldC1vdmVybGF5XCIsIGZ1bmN0aW9uIChldmVudCwgdWkpIHtcclxuXHRcdFx0XHRjbG9zZU1vZGFsKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG59KShqUXVlcnksIERydXBhbCk7XHJcblxyXG4vKipcclxuICogQGZpbGVcclxuICogQXR0YWNoZXMgQU1BIEltYWdlIFBvcHVwIGxpYnJhcnkuXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuXHRmdW5jdGlvbiBhbHRlck1vZGFsIChjb250ZXh0KSB7XHJcblx0XHQkKCcuYW1hLWltYWdlLXBvcHVwLW1vZGFsIC51aS1kaWFsb2ctdGl0bGUnKS5oaWRlKCk7XHJcblx0XHQkKCcuYW1hLWltYWdlLXBvcHVwLW1vZGFsIC51aS1idXR0b24taWNvbi1vbmx5IC51aS1pY29uJykuaGlkZSgpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY2xvc2VNb2RhbCAoY29udGV4dCkge1xyXG5cdFx0JCgnLnVpLWljb24tY2xvc2V0aGljaycpLnVuYmluZCgnY2xpY2suY2xvc2UnKTtcclxuXHRcdCQoJy51aS1pY29uLWNsb3NldGhpY2snKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdH1cclxuXHJcblx0RHJ1cGFsLmJlaGF2aW9ycy5hbWFfaW1hZ2VfcG9wdXAgPSB7XHJcblx0XHRhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwiZGlhbG9nb3BlblwiLCBcIi51aS1kaWFsb2dcIiwgZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcblx0XHRcdFx0YWx0ZXJNb2RhbCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi51aS13aWRnZXQtb3ZlcmxheVwiLCBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuXHRcdFx0XHRjbG9zZU1vZGFsKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufSkoalF1ZXJ5LCBEcnVwYWwpO1xyXG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xyXG4gIERydXBhbC5iZWhhdmlvcnMuaW5kZXggPSB7XHJcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xyXG5cclxuICBpZiAoICQoJy5kZXNjLWRpc3BsYXknKS5sZW5ndGggKSB7XHJcblxyXG4gICAgdmFyIGZ1bGwgPSAkKCcuZnVsbHRleHQnKTtcclxuICAgIHZhciB0cnVuYyA9ICQoJy50cnVuY2F0ZWQnKVxyXG4gICAgdmFyIGRlc2MgPSAkKCcuZGVzYy1kaXNwbGF5JylcclxuICAgIHZhciBmdWxsVGV4dCA9ICQoJy5mdWxsdGV4dCcpLmh0bWwoKVxyXG4gICAgdmFyIHRydW5jYXRlZCA9ICQoJy50cnVuY2F0ZWQnKS5odG1sKClcclxuICAgIHZhciBmdWxsSGVpZ2h0ID0gJydcclxuICAgIHZhciB0cnVuY0hlaWdodCA9ICcnXHJcbiAgICB2YXIgbW9yZUh0bWwgPSAnPGEgYWNjZXNza2V5PVwibFwiIGhyZWY9XCIjXCIgYWx0PVwiUmVhZCBNb3JlXCIgY2xhc3M9XCJtb3JlXCIgdGFiaW5kZXg9XCIwXCI+IC4uLlJlYWQgTW9yZTwvYT4nXHJcbiAgICB2YXIgbGVzc0h0bWwgPSAnPGEgYWNjZXNza2V5PVwibFwiIGhyZWY9XCIjXCIgYWx0PVwiU2hvdyBMZXNzXCIgY2xhc3M9XCJsZXNzXCIgdGFiaW5kZXg9XCIwXCI+U2hvdyBMZXNzPC9hPidcclxuICAgIHZhciB3aWR0aCA9ICcnXHJcblxyXG4gICAgICBmdW5jdGlvbiBnZXREaW1lbnNpb25zICgpIHtcclxuXHJcbiAgICAgICAgLy8gSWYgY2xvc2VzdCBwYXJlbnQgaW5kaWNhdGVzIGNhdGVnb3J5LlxyXG4gICAgICAgIC8vIEFkanVzdCBoaWVnaHQgdmFsdWVzLlxyXG4gICAgICAgIGlmIChkZXNjLmNsb3Nlc3QoJ2Rpdi5hbWFfX2NhdGVnb3J5JykpIHtcclxuICAgICAgICAgIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKClcclxuICAgICAgICAgIGlmICh3aWR0aCA8IDQwMCkge1xyXG4gICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgMjVcclxuICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAyMFxyXG4gICAgICAgICAgfSBlbHNlIGlmICh3aWR0aCA8IDkwMCkge1xyXG4gICAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyA1MVxyXG4gICAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMjBcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyAyNlxyXG4gICAgICAgICAgICBmdWxsSGVpZ2h0ID0gZnVsbC5oZWlnaHQoKSArIDE0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHdpZHRoID0gJCh3aW5kb3cpLndpZHRoKClcclxuICAgICAgICAgIGlmICh3aWR0aCA8IDQwMCkge1xyXG4gICAgICAgICAgICB0cnVuY0hlaWdodCA9IHRydW5jLmhlaWdodCgpICsgMjVcclxuICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAyMFxyXG4gICAgICAgICAgfSBlbHNlIGlmICh3aWR0aCA8IDkwMCkge1xyXG4gICAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KCkgKyAyNVxyXG4gICAgICAgICAgICAgIGZ1bGxIZWlnaHQgPSBmdWxsLmhlaWdodCgpICsgMjBcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRydW5jSGVpZ2h0ID0gdHJ1bmMuaGVpZ2h0KClcclxuICAgICAgICAgICAgZnVsbEhlaWdodCA9IGZ1bGwuaGVpZ2h0KCkgKyAxNFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8qXHJcbiAgICAgICAgKiBBbmltYXRlIHRoZSBoZWlnaHQgb2YgYSBkeW5hbWljIGhlaWdodCBvYmplY3Q/IFNJTVBMRSFcclxuICAgICAgICAqIFdoYXQgYSBmb29sIHlvdSB3b3VsZCBiZSB0byBub3QgdGhpbmsgb2Ygc28gZWxlZ2FudCBhIHNvbHV0aW9uLlxyXG4gICAgICAgICogSW4gdGhlIG1hcmt1cCwgdGhlcmUgYXJlIGhpZGRlbiBmdWxsdGV4dCBhbmQgc3VtbWFyeSBkaXZzLlxyXG4gICAgICAgICogVGhleSBhcmUgYWJzb2x1dGVseSBwb3NpdGlvbmVkIHdoaXRoaW4gdGhlIHBhZ2UgdGVtcGxhdGUgdG8ga2VlcCBhbiBhY2N1cmF0ZSBoZWlnaHQuXHJcbiAgICAgICAqL1xyXG5cclxuICAgICAgLy8gU2V0IGhlaWdodCBvbiBwYWdlbG9hZCB1c2luZyB0aGUgaGlkZGVuIGRpdnMuXHJcbiAgICAgICQoJy5kZXNjLWRpc3BsYXknLCBjb250ZXh0KS5vbmNlKCdnZXRIZWlnaHQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnZXREaW1lbnNpb25zKClcclxuICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgdHJ1bmNIZWlnaHQgKyAncHgnKVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFNldCB0aGUgaGVpZ2h0IGFnYWluIG9uIHdpbmRvdyByZXNpemUuXHJcbiAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGdldERpbWVuc2lvbnMoKVxyXG4gICAgICAgIGlmIChkZXNjLmhhc0NsYXNzKCdmdWxsJykpIHtcclxuICAgICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCBmdWxsSGVpZ2h0ICsgJ3B4JylcclxuICAgICAgICB9IGVsc2UgaWYgKGRlc2MuaGFzQ2xhc3MoJ3N1bW1hcnknKSkge1xyXG4gICAgICAgICAgZGVzYy5jc3MoJ2hlaWdodCcsIHRydW5jSGVpZ2h0ICsgJ3B4JylcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gT24gY2xpY2ssIHNldCB0aGUgaGVpZ2h0IHRvIHRyaWdnZXIgY3NzIHRyYW5zaXRpb24uXHJcbiAgICAgIGRlc2Mub24oJ2NsaWNrJywgJy5tb3JlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGdldERpbWVuc2lvbnMoKVxyXG4gICAgICAgIGRlc2MuY3NzKCdoZWlnaHQnLCBmdWxsSGVpZ2h0ICsgJ3B4JylcclxuICAgICAgICBkZXNjLmFkZENsYXNzKCdmdWxsJykucmVtb3ZlQ2xhc3MoJ3N1bW1hcnknKVxyXG4gICAgICAgIC8vIFN3YXAgdGhlIGZ1bGwgY29weSBpbnRvIHRoZSBkaXNwbGF5IGRpdi5cclxuICAgICAgICBkZXNjLmh0bWwoJC5wYXJzZUhUTUwoZnVsbFRleHQpKS5hcHBlbmQobGVzc0h0bWwpXHJcbiAgICAgIH0pO1xyXG4gICAgICBkZXNjLm9uKCdjbGljaycsICcubGVzcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnZXREaW1lbnNpb25zKClcclxuICAgICAgICBkZXNjLmNzcygnaGVpZ2h0JywgdHJ1bmNIZWlnaHQgKyAncHgnKVxyXG4gICAgICAgIGRlc2MuYWRkQ2xhc3MoJ3N1bW1hcnknKS5yZW1vdmVDbGFzcygnZnVsbCcpXHJcbiAgICAgICAgLy8gU3dhcCB0aGUgdHJ1bmNhdGVkIGNvcHkgaW50byB0aGUgZGlzcGxheSBkaXYuXHJcbiAgICAgICAgZGVzYy5odG1sKCQucGFyc2VIVE1MKHRydW5jYXRlZCkpLmFwcGVuZChtb3JlSHRtbClcclxuICAgICAgICAvLyBTY3JvbGwgdG8gdG9wLlxyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDUwMCwgJ3N3aW5nJylcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV90b2MgPSB7XHJcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xyXG4gICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuYW1hLS1uZXdzLXRvYyBhJykuYmluZCgnY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBoYXJkIGp1bXAsIHRoZSBkZWZhdWx0IGJlaGF2aW9yXHJcblxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTsgLy8gU2V0IHRoZSB0YXJnZXQgYXMgdmFyaWFibGVcclxuICAgICAgICAgICAgLy8gcGVyZm9ybSBhbmltYXRlZCBzY3JvbGxpbmcgYnkgZ2V0dGluZyB0b3AtcG9zaXRpb24gb2YgdGFyZ2V0LWVsZW1lbnQgYW5kIHNldCBpdCBhcyBzY3JvbGwgdGFyZ2V0XHJcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQodGFyZ2V0KS5vZmZzZXQoKS50b3AgLSAkKCcjbWFpbi1jb250ZW50Jykub2Zmc2V0KCkudG9wICsgKCQoJy53b3JrYmVuY2gtdGFicycpLmhlaWdodCgpPyQoJy53b3JrYmVuY2gtdGFicycpLmhlaWdodCgpOjApXHJcbiAgICAgICAgICAgIH0sIDYwMCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEFwcGxpY2F0aW9uIGRyb3Bkb3duLlxyXG4gKi9cclxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcclxuICBEcnVwYWwuYmVoYXZpb3JzLmFwcE1lbnUgPSB7XHJcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xyXG5cclxuICAgICAgJCgnI2Jsb2NrLWFjY291bnRuYXYnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2xhc3NfYWN0aXZlID0gJ2lzLWFjdGl2ZSc7XHJcblxyXG4gICAgICAgICQoJy5hY2NvdW50X25hdl90cmlnZ2VyJywgdGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIC8vIFVuZm9jdXMgb24gdGhlIGRyb3Bkb3duLlxyXG4gICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XHJcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIGZvciBDU1MuXHJcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XHJcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIHRvIHRoZSBkcm9wZG93biBVTC5cclxuICAgICAgICAgICQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJCgnLmFjY291bnRfbmF2X3RyaWdnZXInLCB0aGlzKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpLm5leHQoKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KShqUXVlcnksIERydXBhbCk7XHJcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XHJcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfcG9kY2FzdCA9IHtcclxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XHJcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vQ2hlY2sgbnVtYmVyIG9mIGxpbmtzXHJcbiAgICAgICAgb2RkTGlua3MoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBmdW5jdGlvbiBvZGRMaW5rcygpIHtcclxuICAgICAgICB2YXIgY291bnQgPSAkKFwidWwuYW1hX19wb2RjYXN0LXBsYXllcl9fbGlua3MgbGlcIikubGVuZ3RoO1xyXG4gICAgICAgIHZhciBsaW5rQ29udGFpbmVyID0gJChcInVsLmFtYV9fcG9kY2FzdC1wbGF5ZXJfX2xpbmtzXCIpO1xyXG5cclxuICAgICAgICBpZiAoY291bnQgPT0gMyB8fCBjb3VudCA9PSAxKSB7XHJcbiAgICAgICAgICBsaW5rQ29udGFpbmVyLmFkZENsYXNzKCdvZGRfbGlua3MnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG59KShqUXVlcnksIERydXBhbCk7Il19
