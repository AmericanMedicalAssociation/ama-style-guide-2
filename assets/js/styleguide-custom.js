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
       $.cookie('ama__alert--hide');
       var alertCookie = $.cookie('ama__alert--hide');
       
       (function ($) {
         // If the 'hide cookie is not set we show the alert
         if (alertCookie !== '1') {
           $('.ama__alert__wrap').fadeIn("slow");
         }

         // Add the event that closes the popup and sets the cookie that tells us to
         // not show it again until one day has passed.
         $('.ama__alert__close').click(function() {
           $('.ama__alert__wrap').fadeOut();
           // set the cookie
           $.cookie('ama__alert--hide', '1', { expires: 1});
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
            $('#block-exposedformacquia-searchpage').submit();
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
          return;
        } else if($(window).width() < 768 ) { // If less than tablet
          $('.ama__main-navigation').sticky({zIndex: 501});
        } else if($('.toolbar-tray').hasClass('toolbar-tray-horizontal')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 72 });
        } else if($('.toolbar-tray').hasClass('toolbar-tray-vertical')) {
          $('.ama__main-navigation ').sticky({ zIndex: 501, topSpacing: 39 });
        } else {
          $('.ama__main-navigation ').sticky({ zIndex: 501 });
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
 * Subcategory
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.subcategoriesExploration = {
    attach: function(context, settings) {

      var $subcategoryListContainer = $('.ama__subcategory-exploration__list');
      var $subcategoryList  = $('.ama__subcategory-exploration__list ul');
      var $subcategoryListExpander = $('.ama__subcategory-exploration__show-more');
      var $subcategoryListContainerHeight = $subcategoryListContainer.outerHeight() + 3;
      var $subcategoryListLinkText = $('.ama__subcategory-exploration__text');
      var $initialWindowWidth = $(window).width();

      // Determine when to show link based on window size.
      $(document).ready(function () {
        function showHideMoreLink () {
          // Set intial window width to 1024 pixel.
          // @todo: Check if this is an issue to set 1024 width limit.
          if ($initialWindowWidth <= 1024) {
            // If the unordered list outerHeight is greater than the parent container then show the show more link,
            // hide otherwise.
            if ($subcategoryList.outerHeight() > $subcategoryListContainerHeight) {
              $subcategoryListExpander.show();
            }
            if ($subcategoryList.outerHeight() < $subcategoryListContainerHeight) {
              $subcategoryListExpander.hide();
            }
          }
          if ($initialWindowWidth !== $(window).width()) {
            // If the unordered list outerHeight is greater than the parent container then show the show more link
            if ($subcategoryList.outerHeight() > $subcategoryListContainerHeight) {
              $subcategoryListExpander.show();

            } else {
              $subcategoryListExpander.hide();
            }
          }
        }

        showHideMoreLink();
          $(window).resize(showHideMoreLink);
      });


      // Drupal compels me to unbind clicks otherwise double clicks occur
      $subcategoryListExpander.unbind('click').click(function(e){
        e.stopPropagation();
        e.preventDefault();

        // Checks to see if the container has been expand or not by comparing initial outerHeight to current outerHeight
        if($subcategoryListContainer.outerHeight() > $subcategoryListContainerHeight) {
          $subcategoryListContainer.removeClass('ama__subcategory-exploration__list--expanded');
          $(this).removeClass('ama__subcategory-exploration__show-more--expanded');
          $subcategoryListLinkText.text('View all subcategories');
        }
        else {
          $subcategoryListContainer.addClass('ama__subcategory-exploration__list--expanded');
          $(this).addClass('ama__subcategory-exploration__show-more--expanded');
          $subcategoryListLinkText.text('View fewer subcategories');
        }
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

      // Copies email input values from email subscription and inserts into the other email subscription form on page
      $('.webform-submission-email-subscription-form').find('input[name=email]').keyup(function(e) {
        $('.webform-submission-email-subscription-form').find('input[name=email]').val($(this).val());
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
          windowWidth = $(window).width();

      // Checks if user agent is a mobile device
      var deviceAgent = navigator.userAgent.toLowerCase();
      var agentID = deviceAgent.match(/(android|webos|iphone|ipod|blackberry)/) && windowWidth < 768;

      if($productNav.length && $productNav.is(':visible') ){
        productNavHeight = $productNav.height();
      } else {
        productNavHeight = 0;
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
          var categoryNavMenuHeightResized = categoryNavMenuResizedHeight - $mainNav.outerHeight() - productNavHeight;
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
            if ((categoryNavMenuHeight +  $mainNav.outerHeight() + productNavHeight) > viewportHeight) {
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
            $('#block-exposedformacquia-searchpage').submit();
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
    }
  };
})(jQuery, Drupal);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvZHlTY3JvbGxMb2NrLm1pbi5qcyIsImluaXQuanMiLCJhbGVydC5qcyIsImZvcm0taXRlbXMuanMiLCJuYXYuanMiLCJzdWJjYXRlZ29yeS5qcyIsInN1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLmpzIiwid2F5ZmluZGVyLmpzIiwidGFicy5qcyIsImFjY29yZGlvbi5qcyIsIndlYmZvcm1zLmpzIiwibWFpbi1uYXZpZ2F0aW9uLmpzIiwiY2F0ZWdvcnktbWVudS5qcyIsInNpZ24taW4tZHJvcGRvd24uanMiLCJzZWFyY2gtY2hlY2tib3guanMiLCJicC1jYWxjdWxhdG9yLmpzIiwicmVzb3VyY2UuanMiLCJ0YWJsZXMuanMiLCJsaXN0aWNsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InN0eWxlZ3VpZGUtY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXCJleHBvcnRzXCJdLHQpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpdChleHBvcnRzKTtlbHNle3ZhciBvPXt9O3QobyksZS5ib2R5U2Nyb2xsTG9jaz1vfX0odGhpcyxmdW5jdGlvbihleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgdD0wLG89QXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKW9bdF09ZVt0XTtyZXR1cm4gb31yZXR1cm4gQXJyYXkuZnJvbShlKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbD0hMTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KXt2YXIgZT17Z2V0IHBhc3NpdmUoKXtsPSEwfX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSl9dmFyIGQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lm5hdmlnYXRvciYmd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSYmL2lQKGFkfGhvbmV8b2QpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0pLGM9W10sdT0hMSxhPS0xLHM9dm9pZCAwLHY9dm9pZCAwLGY9ZnVuY3Rpb24odCl7cmV0dXJuIGMuc29tZShmdW5jdGlvbihlKXtyZXR1cm4hKCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmV8fCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmUodCkpfSl9LG09ZnVuY3Rpb24oZSl7dmFyIHQ9ZXx8d2luZG93LmV2ZW50O3JldHVybiEhZih0LnRhcmdldCl8fCgxPHQudG91Y2hlcy5sZW5ndGh8fCh0LnByZXZlbnREZWZhdWx0JiZ0LnByZXZlbnREZWZhdWx0KCksITEpKX0sbz1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt2b2lkIDAhPT12JiYoZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dix2PXZvaWQgMCksdm9pZCAwIT09cyYmKGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9cyxzPXZvaWQgMCl9KX07ZXhwb3J0cy5kaXNhYmxlQm9keVNjcm9sbD1mdW5jdGlvbihpLGUpe2lmKGQpe2lmKCFpKXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJkaXNhYmxlQm9keVNjcm9sbCB1bnN1Y2Nlc3NmdWwgLSB0YXJnZXRFbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgd2hlbiBjYWxsaW5nIGRpc2FibGVCb2R5U2Nyb2xsIG9uIElPUyBkZXZpY2VzLlwiKTtpZihpJiYhYy5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQ9PT1pfSkpe3ZhciB0PXt0YXJnZXRFbGVtZW50Omksb3B0aW9uczplfHx7fX07Yz1bXS5jb25jYXQocihjKSxbdF0pLGkub250b3VjaHN0YXJ0PWZ1bmN0aW9uKGUpezE9PT1lLnRhcmdldFRvdWNoZXMubGVuZ3RoJiYoYT1lLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSl9LGkub250b3VjaG1vdmU9ZnVuY3Rpb24oZSl7dmFyIHQsbyxuLHI7MT09PWUudGFyZ2V0VG91Y2hlcy5sZW5ndGgmJihvPWkscj0odD1lKS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFktYSwhZih0LnRhcmdldCkmJihvJiYwPT09by5zY3JvbGxUb3AmJjA8cj9tKHQpOihuPW8pJiZuLnNjcm9sbEhlaWdodC1uLnNjcm9sbFRvcDw9bi5jbGllbnRIZWlnaHQmJnI8MD9tKHQpOnQuc3RvcFByb3BhZ2F0aW9uKCkpKX0sdXx8KGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMCl9fWVsc2V7bj1lLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZih2b2lkIDA9PT12KXt2YXIgZT0hIW4mJiEwPT09bi5yZXNlcnZlU2Nyb2xsQmFyR2FwLHQ9d2luZG93LmlubmVyV2lkdGgtZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO2UmJjA8dCYmKHY9ZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQsZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dCtcInB4XCIpfXZvaWQgMD09PXMmJihzPWRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3csZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiKX0pO3ZhciBvPXt0YXJnZXRFbGVtZW50Omksb3B0aW9uczplfHx7fX07Yz1bXS5jb25jYXQocihjKSxbb10pfXZhciBufSxleHBvcnRzLmNsZWFyQWxsQm9keVNjcm9sbExvY2tzPWZ1bmN0aW9uKCl7ZD8oYy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UudGFyZ2V0RWxlbWVudC5vbnRvdWNoc3RhcnQ9bnVsbCxlLnRhcmdldEVsZW1lbnQub250b3VjaG1vdmU9bnVsbH0pLHUmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsbSxsP3twYXNzaXZlOiExfTp2b2lkIDApLHU9ITEpLGM9W10sYT0tMSk6KG8oKSxjPVtdKX0sZXhwb3J0cy5lbmFibGVCb2R5U2Nyb2xsPWZ1bmN0aW9uKHQpe2lmKGQpe2lmKCF0KXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJlbmFibGVCb2R5U2Nyb2xsIHVuc3VjY2Vzc2Z1bCAtIHRhcmdldEVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGNhbGxpbmcgZW5hYmxlQm9keVNjcm9sbCBvbiBJT1MgZGV2aWNlcy5cIik7dC5vbnRvdWNoc3RhcnQ9bnVsbCx0Lm9udG91Y2htb3ZlPW51bGwsYz1jLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50IT09dH0pLHUmJjA9PT1jLmxlbmd0aCYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixtLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCksdT0hMSl9ZWxzZSAxPT09Yy5sZW5ndGgmJmNbMF0udGFyZ2V0RWxlbWVudD09PXQ/KG8oKSxjPVtdKTpjPWMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQhPT10fSl9fSk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBJbml0aWFsaXphdGlvbiBzY3JpcHQgZm9yIGdsb2JhbCBwcm9jZXNzZXNcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXG4vKipcbiAqXG4gKiBJbml0aWFsaXplIGZpdFZpZCBmb3IgWW91VHViZSB2aWVvcy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuXG5cdERydXBhbC5iZWhhdmlvcnMuZml0dmlkaW5pdCA9IHtcblx0IGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cdFx0XHQoZnVuY3Rpb24gKCQpIHtcblx0XHRcdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKCcudmlkZW8tY29udGFpbmVyJykuZml0VmlkcygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pKGpRdWVyeSk7XG5cdFx0fVxuXHR9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBhbGVydC5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuIChmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gICBEcnVwYWwuYmVoYXZpb3JzLmFsZXJ0ID0ge1xuICAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgICQuY29va2llKCdhbWFfX2FsZXJ0LS1oaWRlJyk7XG4gICAgICAgdmFyIGFsZXJ0Q29va2llID0gJC5jb29raWUoJ2FtYV9fYWxlcnQtLWhpZGUnKTtcbiAgICAgICBcbiAgICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgIC8vIElmIHRoZSAnaGlkZSBjb29raWUgaXMgbm90IHNldCB3ZSBzaG93IHRoZSBhbGVydFxuICAgICAgICAgaWYgKGFsZXJ0Q29va2llICE9PSAnMScpIHtcbiAgICAgICAgICAgJCgnLmFtYV9fYWxlcnRfX3dyYXAnKS5mYWRlSW4oXCJzbG93XCIpO1xuICAgICAgICAgfVxuXG4gICAgICAgICAvLyBBZGQgdGhlIGV2ZW50IHRoYXQgY2xvc2VzIHRoZSBwb3B1cCBhbmQgc2V0cyB0aGUgY29va2llIHRoYXQgdGVsbHMgdXMgdG9cbiAgICAgICAgIC8vIG5vdCBzaG93IGl0IGFnYWluIHVudGlsIG9uZSBkYXkgaGFzIHBhc3NlZC5cbiAgICAgICAgICQoJy5hbWFfX2FsZXJ0X19jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAkKCcuYW1hX19hbGVydF9fd3JhcCcpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgLy8gc2V0IHRoZSBjb29raWVcbiAgICAgICAgICAgJC5jb29raWUoJ2FtYV9fYWxlcnQtLWhpZGUnLCAnMScsIHsgZXhwaXJlczogMX0pO1xuICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICB9KTtcbiAgICAgICB9KShqUXVlcnkpO1xuICAgICB9XG4gICB9O1xuIH0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIEZvcm0gZmllbGRzIG1hc2tpbmdcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmZvcm1JdGVtcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAkKCcubXVsdGlzZWxlY3QnKS5tdWx0aXNlbGVjdCgpO1xuXG4gICAgICAgICAgJCgnLmFtYV9fdG9vbHRpcCcpLnRvb2x0aXAoe1xuICAgICAgICAgICAgdG9vbHRpcENsYXNzOiBcImFtYV9fdG9vbHRpcC1idWJibGVcIlxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZnVuY3Rpb24gY291bnRfcmVtYWluaW5nX2NoYXJhY3RlcigpIHtcbiAgICAgICAgICAgIHZhciBtYXhfbGVuZ3RoID0gMTUwO1xuICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9lbnRlcmVkID0gJCgnLnRleHRhcmVhJykudmFsKCkubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNoYXJhY3Rlcl9yZW1haW5pbmcgPSBtYXhfbGVuZ3RoIC0gY2hhcmFjdGVyX2VudGVyZWQ7XG4gICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuaHRtbChjaGFyYWN0ZXJfcmVtYWluaW5nKTtcbiAgICAgICAgICAgIGlmIChtYXhfbGVuZ3RoIDwgY2hhcmFjdGVyX2VudGVyZWQpIHtcbiAgICAgICAgICAgICAgJCgnLnRleHRhcmVhJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8galF1ZXJ5VUkgc2VsZWN0bWVudSBtZXRob2RcbiAgICAgICAgICAkKCcuYW1hX19zZWxlY3QtbWVudV9fc2VsZWN0Jykuc2VsZWN0bWVudSgpO1xuXG4gICAgICAgICAgLy8gU3VibWl0cyB0aGUgc2VhcmNoIGZvcm0gYWZ0ZXIgYSBzZWxlY3QgbWVudSBpdGVtcyBoYXMgYmVlbiBzZWxlY3RlZFxuICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5vbignc2VsZWN0bWVudWNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnI2Jsb2NrLWV4cG9zZWRmb3JtYWNxdWlhLXNlYXJjaHBhZ2UnKS5zdWJtaXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5vbignc2VsZWN0bWVudWNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFN0YXJ0IHNlYXJjaCBmaWx0ZXJcblxuICAgICAgICAgIHZhciBhdmFpbGFibGVUYWdzID0gW1xuICAgICAgICAgICAgXCJBbGFiYW1hXCIsXG4gICAgICAgICAgICBcIkFsYXNrYVwiLFxuICAgICAgICAgICAgXCJBbWVyaWNhbiBTYW1vYVwiLFxuICAgICAgICAgICAgXCJBcml6b25hXCIsXG4gICAgICAgICAgICBcIkFya2Fuc2FzXCIsXG4gICAgICAgICAgICBcIkNhbGlmb3JuaWFcIixcbiAgICAgICAgICAgIFwiQ29sb3JhZG9cIixcbiAgICAgICAgICAgIFwiQ29ubmVjdGljdXRcIixcbiAgICAgICAgICAgIFwiRGVsYXdhcmVcIixcbiAgICAgICAgICAgIFwiRGlzdHJpY3QgT2YgQ29sdW1iaWFcIixcbiAgICAgICAgICAgIFwiRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhXCIsXG4gICAgICAgICAgICBcIkZsb3JpZGFcIixcbiAgICAgICAgICAgIFwiR2VvcmdpYVwiLFxuICAgICAgICAgICAgXCJHdWFtXCIsXG4gICAgICAgICAgICBcIkhhd2FpaVwiLFxuICAgICAgICAgICAgXCJJZGFob1wiLFxuICAgICAgICAgICAgXCJJbGxpbm9pc1wiLFxuICAgICAgICAgICAgXCJJbmRpYW5hXCIsXG4gICAgICAgICAgICBcIklvd2FcIixcbiAgICAgICAgICAgIFwiS2Fuc2FzXCIsXG4gICAgICAgICAgICBcIktlbnR1Y2t5XCIsXG4gICAgICAgICAgICBcIkxvdWlzaWFuYVwiLFxuICAgICAgICAgICAgXCJNYWluZVwiLFxuICAgICAgICAgICAgXCJNYXJzaGFsbCBJc2xhbmRzXCIsXG4gICAgICAgICAgICBcIk1hcnlsYW5kXCIsXG4gICAgICAgICAgICBcIk1hc3NhY2h1c2V0dHNcIixcbiAgICAgICAgICAgIFwiTWljaGlnYW5cIixcbiAgICAgICAgICAgIFwiTWlubmVzb3RhXCIsXG4gICAgICAgICAgICBcIk1pc3Npc3NpcHBpXCIsXG4gICAgICAgICAgICBcIk1pc3NvdXJpXCIsXG4gICAgICAgICAgICBcIk1vbnRhbmFcIixcbiAgICAgICAgICAgIFwiTmVicmFza2FcIixcbiAgICAgICAgICAgIFwiTmV2YWRhXCIsXG4gICAgICAgICAgICBcIk5ldyBIYW1wc2hpcmVcIixcbiAgICAgICAgICAgIFwiTmV3IEplcnNleVwiLFxuICAgICAgICAgICAgXCJOZXcgTWV4aWNvXCIsXG4gICAgICAgICAgICBcIk5ldyBZb3JrXCIsXG4gICAgICAgICAgICBcIk5vcnRoIENhcm9saW5hXCIsXG4gICAgICAgICAgICBcIk5vcnRoIERha290YVwiLFxuICAgICAgICAgICAgXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIixcbiAgICAgICAgICAgIFwiT2hpb1wiLFxuICAgICAgICAgICAgXCJPa2xhaG9tYVwiLFxuICAgICAgICAgICAgXCJPcmVnb25cIixcbiAgICAgICAgICAgIFwiUGFsYXVcIixcbiAgICAgICAgICAgIFwiUGVubnN5bHZhbmlhXCIsXG4gICAgICAgICAgICBcIlB1ZXJ0byBSaWNvXCIsXG4gICAgICAgICAgICBcIlJob2RlIElzbGFuZFwiLFxuICAgICAgICAgICAgXCJTb3V0aCBDYXJvbGluYVwiLFxuICAgICAgICAgICAgXCJTb3V0aCBEYWtvdGFcIixcbiAgICAgICAgICAgIFwiVGVubmVzc2VlXCIsXG4gICAgICAgICAgICBcIlRleGFzXCIsXG4gICAgICAgICAgICBcIlV0YWhcIixcbiAgICAgICAgICAgIFwiVmVybW9udFwiLFxuICAgICAgICAgICAgXCJWaXJnaW4gSXNsYW5kc1wiLFxuICAgICAgICAgICAgXCJWaXJnaW5pYVwiLFxuICAgICAgICAgICAgXCJXYXNoaW5ndG9uXCIsXG4gICAgICAgICAgICBcIldlc3QgVmlyZ2luaWFcIixcbiAgICAgICAgICAgIFwiV2lzY29uc2luXCIsXG4gICAgICAgICAgICBcIld5b21pbmdcIlxuICAgICAgICAgIF07XG5cbiAgICAgICAgICAkKCBcIiNzZWFyY2hfZmlsdGVyXCIgKS5hdXRvY29tcGxldGUoe1xuICAgICAgICAgICAgc291cmNlOiBhdmFpbGFibGVUYWdzXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkLnVpLmF1dG9jb21wbGV0ZS5wcm90b3R5cGUuX3Jlc2l6ZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdWwgPSB0aGlzLm1lbnUuZWxlbWVudDtcbiAgICAgICAgICAgIHVsLm91dGVyV2lkdGgodGhpcy5lbGVtZW50Lm91dGVyV2lkdGgoKSk7XG4gICAgICAgICAgfTtcblxuXG4gICAgICAgICAgLy8gU3RhcnQgc2VhcmNoIGZpbHRlciB3aXRoIGNoZWNrYm94ZXNcblxuICAgICAgICAgIHZhciBkYXRhTW9kZWwgPSBbXG4gICAgICAgICAgICB7dGV4dDogJ0FsYWJhbWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQWxhc2thJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0FtZXJpY2FuIFNhbW9hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0FyaXpvbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQXJrYW5zYXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQ2FsaWZvcm5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdDb2xvcmFkbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdDb25uZWN0aWN1dCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdEZWxhd2FyZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdEaXN0cmljdCBPZiBDb2x1bWJpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnRmxvcmlkYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdHZW9yZ2lhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0d1YW0nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSGF3YWlpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0lkYWhvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0lsbGlub2lzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0luZGlhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSW93YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdLYW5zYXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnS2VudHVja3knLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTG91aXNpYW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01haW5lJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01hcnNoYWxsIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFyeWxhbmQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFzc2FjaHVzZXR0cycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaWNoaWdhbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaW5uZXNvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWlzc2lzc2lwcGknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWlzc291cmknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTW9udGFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZWJyYXNrYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXZhZGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEhhbXBzaGlyZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXcgSmVyc2V5JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05ldyBNZXhpY28nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmV3IFlvcmsnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGggQ2Fyb2xpbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGggRGFrb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdPaGlvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ09rbGFob21hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ09yZWdvbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdQYWxhdScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdQZW5uc3lsdmFuaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnUHVlcnRvIFJpY28nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnUmhvZGUgSXNsYW5kJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1NvdXRoIENhcm9saW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1NvdXRoIERha290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdUZW5uZXNzZWUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVGV4YXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVXRhaCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdWZXJtb250JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbiBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1dhc2hpbmd0b24nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnV2VzdCBWaXJnaW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdXaXNjb25zaW4nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnV3lvbWluZycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICcnLCB2YWx1ZTogJyd9XG4gICAgICAgICAgXTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHNlbENoYW5nZSgpe1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9ICQoJyNteUNoZWNrTGlzdCcpLmNoZWNrTGlzdCgnZ2V0U2VsZWN0aW9uJyk7XG5cbiAgICAgICAgICAgICQoJyNzZWxlY3RlZEl0ZW1zJykudGV4dChKU09OLnN0cmluZ2lmeShzZWxlY3Rpb24pKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mKGpRdWVyeS51aS5jaGVja0xpc3QpICE9ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICQoJyNmaWx0ZXJMaXN0JykuY2hlY2tMaXN0KHtcbiAgICAgICAgICAgICAgbGlzdEl0ZW1zOiBkYXRhTW9kZWwsXG4gICAgICAgICAgICAgIG9uQ2hhbmdlOiBzZWxDaGFuZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQoJ2Zvcm06bm90KFtjbGFzcyo9XCJsYXlvdXQtYnVpbGRlclwiXSkgW3R5cGU9Y2hlY2tib3hdJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCdbdHlwZT1jaGVja2JveF0nKS5jaGVja2JveHJhZGlvKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCdmb3JtOm5vdChbY2xhc3MqPVwibGF5b3V0LWJ1aWxkZXJcIl0pIFt0eXBlPXJhZGlvXScpLmNoZWNrYm94cmFkaW8oKS5idXR0b25zZXQoKS5maW5kKCdsYWJlbCcpLmNzcygnd2lkdGgnLCAnMTkuNCUnKTtcblxuICAgICAgICAgICQoJy50ZXh0YXJlYScpLmtleXVwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY291bnRfcmVtYWluaW5nX2NoYXJhY3RlcigpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gUmFuZ2UgRmllbGRcbiAgICAgICAgICB2YXIgbGVnZW5kID0gJCgnLmFtYV9fcmFuZ2UtZmllbGRfX2xlZ2VuZCcpO1xuICAgICAgICAgIHZhciBoYW5kbGUgPSAkKCBcIiNjdXJyZW50VmFsdWVcIiApO1xuXG4gICAgICAgICAgJChcIi5hbWFfX3JhbmdlLWZpZWxkXCIpLnNsaWRlcih7XG4gICAgICAgICAgICBhbmltYXRlOiB0cnVlLFxuICAgICAgICAgICAgcmFuZ2U6ICdtaW4nLFxuICAgICAgICAgICAgdmFsdWU6IDEsXG4gICAgICAgICAgICBtaW46IDIwMDAsXG4gICAgICAgICAgICBtYXg6IDUwMDAsXG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICB2YXIgaGFuZGxlID0galF1ZXJ5KHRoaXMpLmZpbmQoJy51aS1zbGlkZXItaGFuZGxlJyk7XG4gICAgICAgICAgICAgIHZhciBidWJibGUgPSBqUXVlcnkoJzxkaXYgY2xhc3M9XCJhbWFfX3JhbmdlLWZpZWxkX192YWx1ZWJveFwiPjwvZGl2PicpO1xuICAgICAgICAgICAgICBoYW5kbGUuYXBwZW5kKGJ1YmJsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2dCwgdWkpIHtcbiAgICAgICAgICAgICAgdWkuaGFuZGxlLmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gJyQnICsgdWkudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuYXBwZW5kKGxlZ2VuZCk7XG5cbiAgICAgICAgICAvLyBGb3JtIGFjY29yZGlvblxuICAgICAgICAgICQoIFwiLnRhYmxpc3RcIiApLmFjY29yZGlvbih7XG4gICAgICAgICAgICBoZWFkZXI6IFwiLmFtYV9fZm9ybS1zdGVwc19fc3RlcFwiLFxuICAgICAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBFeHBhbmQgbGlzdFxuICAgICAgICAgIGZ1bmN0aW9uIGV4cGFuZExpc3RBY2NvcmRpb24oZWxlbWVudCwgb3Blbil7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmFjY29yZGlvbih7XG4gICAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxuICAgICAgICAgICAgICBpY29uczogZmFsc2UsXG4gICAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcbiAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgICAgIGFuaW1hdGU6IDUwMCxcbiAgICAgICAgICAgICAgYWN0aXZlOiBvcGVuLFxuICAgICAgICAgICAgICBhY3RpdmF0ZSA6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcbiAgICAgICAgICAgICAgICBpZigkKHVpLm5ld1BhbmVsKS5oYXNDbGFzcygndWktYWNjb3JkaW9uLWNvbnRlbnQtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICQodWkubmV3UGFuZWwpLnByZXYoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQodWkub2xkUGFuZWwpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoJChcIi5hbWFfX2V4cGFuZC1saXN0XCIpLmZpbmQoJy51aS1jaGVja2JveHJhZGlvLWNoZWNrZWQnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGV4cGFuZExpc3RBY2NvcmRpb24oJy5hbWFfX2V4cGFuZC1saXN0JywgMCk7XG4gICAgICAgICAgICAkKFwiLmFtYV9fZXhwYW5kLWxpc3QgLmFtYV9fZXhwYW5kLWxpc3RfX2hlYWRlclwiKS5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhwYW5kTGlzdEFjY29yZGlvbignLmFtYV9fZXhwYW5kLWxpc3QnLCBmYWxzZSk7XG4gICAgICAgICAgICAkKFwiLmFtYV9fZXhwYW5kLWxpc3RcIikuY2hpbGRyZW4oJy5hbWFfX2V4cGFuZC1saXN0X19oZWFkZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ29sbGFwc2UgYWxsIGFjY29yZGlvbiBwYW5lbHNcbiAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX2NvbGxhcHNlLXBhbmVscyBidXR0b24nKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QgLnVpLWFjY29yZGlvbi1oZWFkZXInKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygndWktc3RhdGUtYWN0aXZlJykgfHwgJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gT3BlbiBhY2NvcmRpb24gcGFuZWxzIGZvciBtb2JpbGVcbiAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QsIC5hbWFfX2FwcGxpZWQtZmlsdGVyc19fdGFncycpLnNsaWRlVG9nZ2xlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLnRleHQoJCh0aGlzKS5pcygnOnZpc2libGUnKSA/ICdIaWRlIEZpbHRlcicgOiAnRmlsdGVyJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGxpc3RGaWx0ZXIoaW5wdXQsIGxpc3QpIHsgLy8gaGVhZGVyIGlzIGFueSBlbGVtZW50LCBsaXN0IGlzIGFuIHVub3JkZXJlZCBsaXN0XG4gICAgICAgICAgICAvLyBjdXN0b20gY3NzIGV4cHJlc3Npb24gZm9yIGEgY2FzZS1pbnNlbnNpdGl2ZSBjb250YWlucygpXG4gICAgICAgICAgICBqUXVlcnkuZXhwclsnOiddLkNvbnRhaW5zID0gZnVuY3Rpb24oYSxpLG0pe1xuICAgICAgICAgICAgICByZXR1cm4gKGEudGV4dENvbnRlbnQgfHwgYS5pbm5lclRleHQgfHwgXCJcIikudG9VcHBlckNhc2UoKS5pbmRleE9mKG1bM10udG9VcHBlckNhc2UoKSk+PTA7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkKGlucHV0KS5jaGFuZ2UoIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdmFyIGZpbHRlciA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgIGlmKGZpbHRlcikge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgZmluZHMgYWxsIGxpbmtzIGluIGEgbGlzdCB0aGF0IGNvbnRhaW4gdGhlIGlucHV0LFxuICAgICAgICAgICAgICAgIC8vIGFuZCBoaWRlIHRoZSBvbmVzIG5vdCBjb250YWluaW5nIHRoZSBpbnB1dCB3aGlsZSBzaG93aW5nIHRoZSBvbmVzIHRoYXQgZG9cbiAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJzcGFuOm5vdCg6Q29udGFpbnMoXCIgKyBmaWx0ZXIgKyBcIikpXCIpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJzcGFuOkNvbnRhaW5zKFwiICsgZmlsdGVyICsgXCIpXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGxpc3QpLmZpbmQoXCJsYWJlbFwiKS5zaG93KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAvLyBvbmx5IHNob3cgcmVzdWx0cyBhZnRlciAzIGNoYXJhY3RlcnMgYXJlIGVudGVyZWRcbiAgICAgICAgICAgIH0pLmtleXVwKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYoIHRoaXMudmFsdWUubGVuZ3RoIDwgNCApIHJldHVybjtcbiAgICAgICAgICAgICAgJCh0aGlzKS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RGaWx0ZXIoJChcIiNhbWFfX3NlYXJjaF9fbG9jYXRpb25cIiksICQoXCIuYW1hX19mb3JtLWdyb3VwXCIpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KShqUXVlcnkpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFJpYmJvbiBuYXYgdXNlciBpbnRlcmFjdGlvbnMuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuICdhbm9ueW1vdXMgY2xvc3VyZScuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXG4gIERydXBhbC5iZWhhdmlvcnMucmliYm9ubmF2ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIC8vIE5lZWRzIGRvYyByZWFkeSBiZWNhdXNlIHRoZSBhZG1pbiB0b29sYmFyIG5lZWRzIHRvIGdldCBsb2FkZWQgdG8gZGV0ZXJtaW5lIHRoZSB0b3Agc3BhY2luZyBmb3Igc3RpY2t5IG5hdlxuICAgICAgJChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRib2R5Rml4ZWQgPSAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycpO1xuXG4gICAgICAgIGlmKCRib2R5Rml4ZWQgPT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uJykudW5zdGljaygpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmKCQod2luZG93KS53aWR0aCgpIDwgNzY4ICkgeyAvLyBJZiBsZXNzIHRoYW4gdGFibGV0XG4gICAgICAgICAgJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uJykuc3RpY2t5KHt6SW5kZXg6IDUwMX0pO1xuICAgICAgICB9IGVsc2UgaWYoJCgnLnRvb2xiYXItdHJheScpLmhhc0NsYXNzKCd0b29sYmFyLXRyYXktaG9yaXpvbnRhbCcpKSB7XG4gICAgICAgICAgJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uICcpLnN0aWNreSh7IHpJbmRleDogNTAxLCB0b3BTcGFjaW5nOiA3MiB9KTtcbiAgICAgICAgfSBlbHNlIGlmKCQoJy50b29sYmFyLXRyYXknKS5oYXNDbGFzcygndG9vbGJhci10cmF5LXZlcnRpY2FsJykpIHtcbiAgICAgICAgICAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gJykuc3RpY2t5KHsgekluZGV4OiA1MDEsIHRvcFNwYWNpbmc6IDM5IH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoJy5hbWFfX21haW4tbmF2aWdhdGlvbiAnKS5zdGlja3koeyB6SW5kZXg6IDUwMSB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsYXNzX2FjdGl2ZSA9ICdpcy1hY3RpdmUnO1xuXG4gICAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd25fX3RyaWdnZXInLCB0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAvLyBVbmZvY3VzIG9uIHRoZSBkcm9wZG93bi5cbiAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIGZvciBDU1MuXG4gICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgdG8gdGhlIGRyb3Bkb3duIFVMLlxuICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayggZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duX190cmlnZ2VyJywgdGhpcykucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogU3ViY2F0ZWdvcnlcbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5zdWJjYXRlZ29yaWVzID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIC8vIENyZWF0ZSBzdGF0aWMgdmFyIGZvciBzdWJjYXRlZ29yeSBpdGVtIGNvdW50LiBUbyBiZSB1c2VkIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHJlY2FsY3VsYXRpb25zIGFyZSBuZWVkZWQuXG4gICAgICB2YXIgc3ViY2F0ZWdvcnlFeHBsb3JhdGlvbkNvbHVtbnMgPSAwO1xuXG4gICAgICBmdW5jdGlvbiBjaGVja1NpemUoKSB7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnkgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc3ViY2F0ZWdvcnknKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeUNvbnRhaW5lciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX19jb250YWluZXInKTtcbiAgICAgICAgdmFyICRzdWJjYXRlZ29yeVRpdGxlID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3RpdGxlJyk7XG4gICAgICAgIC8vIFdlIHdhbnQgdGhlIHdpZHRoIG1pbnVzIHBhZGRpbmcgc28gdXNlIHdpZHRoKCkgaW5zdGVhZCBvZiBpbm5lcldpZHRoKCkuXG4gICAgICAgIHZhciBzdWJjYXRlZ29yeUV4cGxvcmF0aW9uV2lkdGggPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlcycpLndpZHRoKCk7XG4gICAgICAgIC8vIFN1YmNhdGVnb3J5IGl0ZW1zIGhhdmUgbWF4LXdpZHRoIG9mIDE4MHB4LiBUaGlzIHdpbGwgYmUgdXNlZCBmb3IgY2FsY3VsYXRpb25zIGluc3RlYWQgb2YgZXh0cmFjdGluZyBpdCB2aWEgalF1ZXJ5IGNhbGxzLlxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlJdGVtV2lkdGggPSAxODA7XG4gICAgICAgIHZhciBzdWJjYXRlZ29yeVRpdGxlV2lkdGggPSAkc3ViY2F0ZWdvcnlUaXRsZS5vdXRlcldpZHRoKCk7XG4gICAgICAgIHZhciB0b3RhbEdyaWRJdGVtcyA9ICRzdWJjYXRlZ29yeS5sZW5ndGggKyAxO1xuICAgICAgICAvLyBTdGFydCBjb2x1bW4gY291bnQgYXMgbG93ZXN0IHBvc3NpYmxlLlxuICAgICAgICB2YXIgY29sdW1uQ291bnQgPSAyO1xuICAgICAgICAvLyBTZXQgc3ViY2F0ZWdvcnkgcm93IGl0ZW1zIHRvIGxvd2VzdCB0aGF0IHNob3VsZCBkaXNwbGF5LlxuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlJdGVtc1BlclJvdyA9IE1hdGguZmxvb3IoKHN1YmNhdGVnb3J5RXhwbG9yYXRpb25XaWR0aCAtIHN1YmNhdGVnb3J5VGl0bGVXaWR0aCkgLyBzdWJjYXRlZ29yeUl0ZW1XaWR0aCk7XG5cbiAgICAgICAgaWYgKHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgPCAyKSB7XG4gICAgICAgICAgLy8gVGhlIG1pbmltdW0gc3ViY2F0ZWdvcnkgaXRlbXMgcGVyIHJvdyBzaG91bGQgYmUgdHdvLiBJZiB0aGUgdmFyaWFibGUgY29tcHV0ZWQgdG8gbGVzcywgbWFudWFsbHkgY29ycmVjdCBpdC5cbiAgICAgICAgICBzdWJjYXRlZ29yeUl0ZW1zUGVyUm93ID0gMjtcbiAgICAgICAgICB0b3RhbEdyaWRJdGVtcyA9IHRvdGFsR3JpZEl0ZW1zIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2x1bW5Db3VudCA9IHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cgKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIGNoYW5nZXMgaW4gY29sdW1uIGNvdW50IGhhcyBvY2N1cnJlZCBhbmQgYWN0IGFjY29yZGluZ2x5XG4gICAgICAgIGlmIChzdWJjYXRlZ29yeUV4cGxvcmF0aW9uQ29sdW1ucyAhPT0gY29sdW1uQ291bnQpIHtcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgYWRkaXRpb25hbCBcImZpbGxlci1ib3hcIiBuZWVkZWQgdG8gY3JlYXRlIGNvbXBsZXRlIHJvd1xuICAgICAgICAgIHZhciBmaWxsZXJCb3hDb3VudCA9IGNvbHVtbkNvdW50IC0gKHRvdGFsR3JpZEl0ZW1zICUgY29sdW1uQ291bnQpO1xuICAgICAgICAgIGZpbGxHcmlkUm93KCRzdWJjYXRlZ29yeUNvbnRhaW5lciwgZmlsbGVyQm94Q291bnQpO1xuICAgICAgICAgIC8vIFVwZGF0ZSBwZXJzaXN0ZW50IGNvbHVtbiBjb3VudFxuICAgICAgICAgIHN1YmNhdGVnb3J5RXhwbG9yYXRpb25Db2x1bW5zID0gY29sdW1uQ291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgdmlld2FibGUgc3ViY2F0ZWdvcmllcy5cbiAgICAgICAgJHN1YmNhdGVnb3J5LmhpZGUoKTtcbiAgICAgICAgJHN1YmNhdGVnb3J5LnNsaWNlKDAsIHN1YmNhdGVnb3J5SXRlbXNQZXJSb3cpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcblxuICAgICAgICB2aWV3TW9yZSgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB2aWV3TW9yZSgpIHtcbiAgICAgICAgdmFyICR2aWV3TGVzcyA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWxlc3MnKTtcbiAgICAgICAgdmFyICR2aWV3TW9yZSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWFsbCcpO1xuICAgICAgICB2YXIgJHN1YmNhdGVnb3J5ID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3N1YmNhdGVnb3J5Jyk7XG4gICAgICAgIHZhciAkc3ViY2F0ZWdvcnlDb250YWluZXIgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fY29udGFpbmVyJyk7XG5cbiAgICAgICAgJHZpZXdMZXNzLmhpZGUoKTtcbiAgICAgICAgJHZpZXdNb3JlLnNob3coKTtcblxuICAgICAgICAkKCcudmlld0FsbCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeS5mYWRlSW4oKTtcbiAgICAgICAgICAkdmlld01vcmUuaGlkZSgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeUNvbnRhaW5lci5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAkdmlld0xlc3Muc2hvdygpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy52aWV3TGVzcycpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeS5oaWRlKCk7XG4gICAgICAgICAgY2hlY2tTaXplKCk7XG4gICAgICAgICAgJHZpZXdMZXNzLmhpZGUoKTtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnlDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgJHZpZXdNb3JlLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgICAgZnVuY3Rpb24gZmlsbEdyaWRSb3coJGNvbnRhaW5lciwgY291bnQpIHtcbiAgICAgICAgdmFyIGZpbGxlckJveCA9ICc8ZGl2IGNsYXNzPVwiZmlsbGVyLWJveFwiPjwvZGl2Pic7XG4gICAgICAgIC8vIGNsZWFyIG91dCBjdXJyZW50IGZpbGxlciBib3hlc1xuICAgICAgICB2YXIgJGZpbGxlckJveGVzID0gJGNvbnRhaW5lci5maW5kKCcuZmlsbGVyLWJveCcpO1xuICAgICAgICAkZmlsbGVyQm94ZXMucmVtb3ZlKCk7XG4gICAgICAgIC8vIGZpbGwgb3V0IGdyaWQgcm93XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKGZpbGxlckJveCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcnVuIHRlc3Qgb24gaW5pdGlhbCBwYWdlIGxvYWRcbiAgICAgIGNoZWNrU2l6ZSgpO1xuXG4gICAgICAvLyBydW4gdGVzdCBvbiByZXNpemUgb2YgdGhlIHdpbmRvd1xuICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoZWNrU2l6ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogU3ViY2F0ZWdvcnlcbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5zdWJjYXRlZ29yaWVzRXhwbG9yYXRpb24gPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICB2YXIgJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19saXN0Jyk7XG4gICAgICB2YXIgJHN1YmNhdGVnb3J5TGlzdCAgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fbGlzdCB1bCcpO1xuICAgICAgdmFyICRzdWJjYXRlZ29yeUxpc3RFeHBhbmRlciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zaG93LW1vcmUnKTtcbiAgICAgIHZhciAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVySGVpZ2h0ID0gJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lci5vdXRlckhlaWdodCgpICsgMztcbiAgICAgIHZhciAkc3ViY2F0ZWdvcnlMaXN0TGlua1RleHQgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fdGV4dCcpO1xuICAgICAgdmFyICRpbml0aWFsV2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcblxuICAgICAgLy8gRGV0ZXJtaW5lIHdoZW4gdG8gc2hvdyBsaW5rIGJhc2VkIG9uIHdpbmRvdyBzaXplLlxuICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZU1vcmVMaW5rICgpIHtcbiAgICAgICAgICAvLyBTZXQgaW50aWFsIHdpbmRvdyB3aWR0aCB0byAxMDI0IHBpeGVsLlxuICAgICAgICAgIC8vIEB0b2RvOiBDaGVjayBpZiB0aGlzIGlzIGFuIGlzc3VlIHRvIHNldCAxMDI0IHdpZHRoIGxpbWl0LlxuICAgICAgICAgIGlmICgkaW5pdGlhbFdpbmRvd1dpZHRoIDw9IDEwMjQpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSB1bm9yZGVyZWQgbGlzdCBvdXRlckhlaWdodCBpcyBncmVhdGVyIHRoYW4gdGhlIHBhcmVudCBjb250YWluZXIgdGhlbiBzaG93IHRoZSBzaG93IG1vcmUgbGluayxcbiAgICAgICAgICAgIC8vIGhpZGUgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgaWYgKCRzdWJjYXRlZ29yeUxpc3Qub3V0ZXJIZWlnaHQoKSA+ICRzdWJjYXRlZ29yeUxpc3RDb250YWluZXJIZWlnaHQpIHtcbiAgICAgICAgICAgICAgJHN1YmNhdGVnb3J5TGlzdEV4cGFuZGVyLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkc3ViY2F0ZWdvcnlMaXN0Lm91dGVySGVpZ2h0KCkgPCAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICRzdWJjYXRlZ29yeUxpc3RFeHBhbmRlci5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkaW5pdGlhbFdpbmRvd1dpZHRoICE9PSAkKHdpbmRvdykud2lkdGgoKSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHVub3JkZXJlZCBsaXN0IG91dGVySGVpZ2h0IGlzIGdyZWF0ZXIgdGhhbiB0aGUgcGFyZW50IGNvbnRhaW5lciB0aGVuIHNob3cgdGhlIHNob3cgbW9yZSBsaW5rXG4gICAgICAgICAgICBpZiAoJHN1YmNhdGVnb3J5TGlzdC5vdXRlckhlaWdodCgpID4gJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lckhlaWdodCkge1xuICAgICAgICAgICAgICAkc3ViY2F0ZWdvcnlMaXN0RXhwYW5kZXIuc2hvdygpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkc3ViY2F0ZWdvcnlMaXN0RXhwYW5kZXIuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNob3dIaWRlTW9yZUxpbmsoKTtcbiAgICAgICAgICAkKHdpbmRvdykucmVzaXplKHNob3dIaWRlTW9yZUxpbmspO1xuICAgICAgfSk7XG5cblxuICAgICAgLy8gRHJ1cGFsIGNvbXBlbHMgbWUgdG8gdW5iaW5kIGNsaWNrcyBvdGhlcndpc2UgZG91YmxlIGNsaWNrcyBvY2N1clxuICAgICAgJHN1YmNhdGVnb3J5TGlzdEV4cGFuZGVyLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIENoZWNrcyB0byBzZWUgaWYgdGhlIGNvbnRhaW5lciBoYXMgYmVlbiBleHBhbmQgb3Igbm90IGJ5IGNvbXBhcmluZyBpbml0aWFsIG91dGVySGVpZ2h0IHRvIGN1cnJlbnQgb3V0ZXJIZWlnaHRcbiAgICAgICAgaWYoJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lci5vdXRlckhlaWdodCgpID4gJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lckhlaWdodCkge1xuICAgICAgICAgICRzdWJjYXRlZ29yeUxpc3RDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2FtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX2xpc3QtLWV4cGFuZGVkJyk7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fc2hvdy1tb3JlLS1leHBhbmRlZCcpO1xuICAgICAgICAgICRzdWJjYXRlZ29yeUxpc3RMaW5rVGV4dC50ZXh0KCdWaWV3IGFsbCBzdWJjYXRlZ29yaWVzJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lci5hZGRDbGFzcygnYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fbGlzdC0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zaG93LW1vcmUtLWV4cGFuZGVkJyk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5TGlzdExpbmtUZXh0LnRleHQoJ1ZpZXcgZmV3ZXIgc3ViY2F0ZWdvcmllcycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG5cbiIsIi8qKlxuICogQGZpbGVcbiAqIEludGVyYWN0aW9ucyBmb3Igd2F5ZmluZGVyLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLndheWZpbmRlciA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgIGlmKCQuY29va2llKCdhbWFfd2F5ZmluZGVyX2Nvb2tpZScpKSB7XG4gICAgICAgICAgJC5jb29raWUuanNvbiA9IHRydWU7XG4gICAgICAgICAgLy8gUmVhZCB3YXlmaW5kZXIgY29va2llcyBzZXQgZnJvbSBhbWEtYXNzbiBkb21haW5zXG4gICAgICAgICAgdmFyIGFtYV93YXlmaW5kZXJfY29va2llID0gJC5jb29raWUoJ2FtYV93YXlmaW5kZXJfY29va2llJyk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhbWFfd2F5ZmluZGVyX2Nvb2tpZSAhPT0gJ3VuZGVmaW5lZCcgfHwgJCgnLnJlZmVycmVkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJCgnLmFtYV9fd2F5ZmluZGVyLS1yZWZlcnJlciBhJykuZmFkZUluKCkuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcbiAgICAgICAgICAgICQoJy5hbWFfX3dheWZpbmRlci0tcmVmZXJyZXIgYScpLmF0dHIoXCJocmVmXCIsIGFtYV93YXlmaW5kZXJfY29va2llWzFdKTtcbiAgICAgICAgICAgICQoJy5hbWFfX3dheWZpbmRlci0tcmVmZXJyZXIgYScpLnRleHQoYW1hX3dheWZpbmRlcl9jb29raWVbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuYW1hX3dheWZpbmRlcl9yZWZlcnJlci0tbGluay1iYWNrJykuZmFkZU91dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkoalF1ZXJ5KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKj09PT09PSBqUXVlcnkgVUkgdGFicyA9PT09PT0qL1xuXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3RhYnMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBkZWZhdWx0QWN0aXZlVGFiID0gMDtcbiAgICAgIHZhciB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBpZiAodmlld3BvcnRXaWR0aCA+PSA2MDAgJiYgJCgnLmFtYV9fcmVzb3VyY2UtdGFicycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZGVmYXVsdEFjdGl2ZVRhYiA9IDE7XG4gICAgICB9XG5cbiAgICAgICQoXCIuYW1hX190YWJzLCAuYW1hX19yZXNvdXJjZS10YWJzXCIpLnRhYnMoe1xuICAgICAgICBhY3RpdmU6IGRlZmF1bHRBY3RpdmVUYWIsXG4gICAgICAgIGFjdGl2YXRlOiByZW1vdmVIaWdobGlnaHRzXG4gICAgICB9KTtcblxuICAgICAgLy8gUHJldmVudCBqdW1wIG9uY2xpY2tcbiAgICAgICQoJy51aS10YWJzLWFuY2hvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cblxuICAgICAgLy9TaW11bGF0ZSBjbGljayBldmVudCBvbiBhY3R1YWwgc2ltcGxlVGFicyB0YWIgZnJvbSBtb2JpbGUgZHJvcCBkb3duLlxuICAgICAgJCgnLmFtYV9fdGFicy1uYXZpZ2F0aW9uLS1tb2JpbGUgc2VsZWN0Jykub24oXCJzZWxlY3RtZW51Y2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCwgdWkpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSB1aS5pdGVtLnZhbHVlO1xuICAgICAgICAkKCdhW2hyZWY9XCIjJyArIHNlbGVjdGVkVmFsdWUgKyAnXCJdJykuY2xpY2soKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBXaGVuIGNsaWNraW5nIGFuIGlubGluZSByZXNvdXJjZSBwYWdlIGxpbmsgcmVmZXJlbmNpbmcgYSB0YWIsIG9wZW4gcmVmZXJlbmNlZCB0YWIuXG4gICAgICAkKCcuYW1hX19yZXNvdXJjZS1saW5rLS1pbmxpbmUsIC5hbWFfX3BhZ2UtLXJlc291cmNlX19yZXNvdXJjZS1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyICR0YWJzID0gJCgnLmFtYV9fcmVzb3VyY2UtdGFicycpO1xuICAgICAgICBzd2l0Y2hUYWJzKCR0YWJzLCB0aGlzKTtcbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiByZW1vdmVIaWdobGlnaHRzKCkge1xuICAgICAgICAkKCcuYW1hX3Jlc291cmNlLWhlYWRlci0taGlnaGxpZ2h0JykucmVtb3ZlQ2xhc3MoJ2FtYV9yZXNvdXJjZS1oZWFkZXItLWhpZ2hsaWdodCcpO1xuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICogVGhpcyBmdW5jdGlvbiBhbmltYXRlcyB0aGUgYnJvd3NlciBzY3JvbGwgYWN0aW9uIHdpdGggYXR0ZW50aW9uIHRvIGtleWJvYXJkIG9ubHkgYWNjZXNzaWJpbGl0eSBjb25jZXJuc1xuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5IE9iamVjdH0gJHRhYk5hdlxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFyZ2V0XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbCgkdGFiTmF2LCB0YWJIYXNoLCBwb3NpdGlvbkluVGFiKSB7XG4gICAgICAgIHZhciBzY3JvbGxUYXJnZXQgPSB3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMjAwID8gJy5hbWFfX3Jlc291cmNlLXRhYnNfX2NvbnRlbnQnIDogJ2h0bWwsYm9keSc7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHByZXZpb3VzIGhpZ2hsaWdodHMsIGlmIGFueVxuICAgICAgICByZW1vdmVIaWdobGlnaHRzKCk7XG5cbiAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGFyZ2V0IGVsZW1lbnQgb2Zmc2V0LCBidXQgZGVmYXVsdCB0byB6ZXJvXG4gICAgICAgIHZhciBzY3JvbGxQb3NpdGlvbiA9IDA7XG4gICAgICAgIHZhciAkdGFyZ2V0O1xuICAgICAgICBpZiAocG9zaXRpb25JblRhYiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIHRhYkVsZW1lbnRzID0gJCh0YWJIYXNoICsgJyAuYW1hX19yZXNvdXJjZS10YWJzX19pdGVtJyk7XG4gICAgICAgICAgaWYgKHRhYkVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gSWYgZGVzaXJlZCBwb3NpdGlvbiBpcyBsYXJnZXIgdGhhbiB0aGUgcmVzdWx0IHNldCwgdXNlIHRoZSBsYXN0IGVsZW1lbnRcbiAgICAgICAgICAgIGlmICh0YWJFbGVtZW50cy5sZW5ndGggPD0gcG9zaXRpb25JblRhYikge1xuICAgICAgICAgICAgICBwb3NpdGlvbkluVGFiID0gdGFiRWxlbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXNlcnMgYXJlIGluc3RydWN0ZWQgdG8gY29uc2lkZXIgMSBhcyB0aGUgZmlyc3QgZWxlbWVudFxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRhYkVsZW1lbnRzW3Bvc2l0aW9uSW5UYWIgLSAxXTtcbiAgICAgICAgICAgIHNjcm9sbFBvc2l0aW9uID0gdGFyZ2V0Lm9mZnNldFRvcDtcbiAgICAgICAgICAgIC8vIEFkZCBoaWdobGlnaHQgdG8gdGFyZ2V0XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJCh0YXJnZXQpLmZpbmQoJy5hbWFfcmVzb3VyY2UtaGVhZGVyJyk7IC8vIHNhdmUgZm9yIHVzZSBpbiBhbmltYXRlKCkgY2FsbGJhY2tcbiAgICAgICAgICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2FtYV9yZXNvdXJjZS1oZWFkZXItLWhpZ2hsaWdodCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkdGFyZ2V0ID0gJCh0YWJIYXNoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJChzY3JvbGxUYXJnZXQpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsUG9zaXRpb25cbiAgICAgICAgfSwgODUwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gVXBkYXRlIGZvY3VzIGZvciBrZXlib2FyZCBvbmx5IG5hdmlnYXRpb25cbiAgICAgICAgICAkdGFyZ2V0LmF0dHIoJ3RhYmluZGV4JywgJy0xJykuZm9jdXMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLypcbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gb3BlbnMgcmVmZXJlbmNlZCB0YWJzIGZyb20gaW5saW5lIGxpbmtzXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFiT2JqIFRoZSBlbGVtZW50IHdoaWNoIGhhcyB0aGUgLnRhYigpIGZ1bmN0aW9uIGF0dGFjaGVkLlxuICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBsaW5rXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHN3aXRjaFRhYnMoJHRhYk9iaiwgbGluaykge1xuXG4gICAgICAgIHZhciBsaW5rSGFzaCA9IGxpbmsuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgICAgdmFyIHdpZGdldCA9ICR0YWJPYmouZGF0YSgndWktdGFicycpO1xuXG4gICAgICAgIHZhciB0YWJIYXNoLCBwb3NpdGlvbkluVGFiO1xuICAgICAgICB2YXIgcGFydHMgPSBsaW5rSGFzaC5zcGxpdCgnLScpO1xuICAgICAgICB0YWJIYXNoID0gcGFydHNbMF07XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcG9zaXRpb25JblRhYiA9IHBhcnRzWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIElmIG9sZCBsaW5rLCB0cnkgdG8gZGV0ZXJtaW5lIHBvc2l0aW9uIGZyb20gbGluayB0ZXh0XG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSBsaW5rLmlubmVyVGV4dC5tYXRjaCgvKFswLTldKykvZyk7XG4gICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uSW5UYWIgPSBtYXRjaGVzLnNoaWZ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW5zdXJlIGNvcnJlY3QgdGFiIGlzIGFjdGl2ZVxuICAgICAgICB2YXIgdGFiSW5kZXggPSB3aWRnZXQuX2dldEluZGV4KHRhYkhhc2gpO1xuICAgICAgICAkdGFiT2JqLnRhYnMoe1xuICAgICAgICAgIGFjdGl2ZTogdGFiSW5kZXhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRvcCBvZiB1aSB0YWJzIG5hdmlnYXRpb25cbiAgICAgICAgc21vb3RoU2Nyb2xsKCR0YWJPYmosIHRhYkhhc2gsIHBvc2l0aW9uSW5UYWIpO1xuXG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyo9PT09PT0galF1ZXJ5IFVJIGFjY29yZGlvbiA9PT09PT0qL1xuXG4oZnVuY3Rpb24oJCkge1xuICAgICQoIFwiLmFtYV9fYWNjb3JkaW9uXCIgKS5hY2NvcmRpb24oe1xuICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCIsXG4gICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgfSk7XG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgdmFyIHZlcmlmeUZpZWxkcyA9IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICB2YXIgJHNlY3Rpb25zID0gZm9ybS5maW5kKCdzZWN0aW9uJyk7XG4gICAgdmFyICRpbnB1dHMgPSAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gc2VjdGlvbiAqJykuZmlsdGVyKCc6aW5wdXQnKTtcbiAgICB2YXIgJGljb25FbGVtZW50ID0gJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpO1xuICAgIHZhciBlcnJvclNlY3Rpb25zID0gW107XG5cbiAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24oaSwgaW5wdXQpIHtcbiAgICAgICRjbG9zZXN0U2VjdGlvbiA9ICQodGhpcykuY2xvc2VzdCgnc2VjdGlvbicpLmF0dHIoJ2RhdGEtZHJ1cGFsLXNlbGVjdG9yJykudG9TdHJpbmcoKTtcbiAgICAgIGlmICgkKHRoaXMpLnByb3AoJ3JlcXVpcmVkJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXJyb3InKSkge1xuICAgICAgICBlcnJvclNlY3Rpb25zLnB1c2goJGNsb3Nlc3RTZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRzZWN0aW9ucy5lYWNoKGZ1bmN0aW9uKGksIHNlY3Rpb24pIHtcbiAgICAgIGlmICgkLmluQXJyYXkoJCh0aGlzKS5hdHRyKCdkYXRhLWRydXBhbC1zZWxlY3RvcicpLnRyaW0oKS50b1N0cmluZygpLCBlcnJvclNlY3Rpb25zKSAhPT0gLTEpIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCRpY29uRWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2VkaXQgZXJyb3IgY29tcGxldGVkJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCRpY29uRWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2VkaXQgZXJyb3IgY29tcGxldGVkJykuYWRkQ2xhc3MoJ2NvbXBsZXRlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcbiAgICB2YXIgZW1haWxSZWcgPSAvXihbXFx3LVxcLl0rQChbXFx3LV0rXFwuKStbXFx3LV17Miw0fSk/JC87XG4gICAgcmV0dXJuIGVtYWlsUmVnLnRlc3QoZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmllbGRJc1JlcXVpcmVkKGlucHV0KSB7XG4gICAgaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgaW5wdXQubmV4dCgpLnJlbW92ZSgnLmZvcm0taXRlbS0tZXJyb3ItbWVzc2FnZScpO1xuICAgIGlucHV0LmFmdGVyKCc8ZGl2IGNsYXNzPVwiZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlXCI+RmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0ZpZWxkKGlucHV0KSB7XG4gICAgaWYgKGlucHV0LnByb3AoJ3JlcXVpcmVkJykgJiYgKGlucHV0LnZhbCgpLmxlbmd0aCA9PT0gMCB8fCBpbnB1dC52YWwoKSA9PT0gXCJcIikpIHtcbiAgICAgIGZpZWxkSXNSZXF1aXJlZChpbnB1dCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKGlucHV0LmF0dHIoJ3R5cGUnKSA9PT0gJ2VtYWlsJyAmJiAhdmFsaWRhdGVFbWFpbChpbnB1dC52YWwoKSkpIHtcbiAgICAgICAgZmllbGRJc1JlcXVpcmVkKGlucHV0KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKS5uZXh0KCkucmVtb3ZlKCcuZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU3VibWl0cyBmaXJzdCBwYWdlIG9mIENvbnRhY3QgVXMgZm9ybSBvbiByYWRpbyBidXR0b24gc2VsZWN0aW9uXG4gICQuZm4uY29udGFjdFN1Ym1pdCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyICR3ZWJmb3JtX2J1dHRvbnMgPSAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWNvbnRhY3QtdXMtZm9ybSBpbnB1dFt0eXBlPVwicmFkaW9cIl0nKTtcbiAgICAkd2ViZm9ybV9idXR0b25zLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1jb250YWN0LXVzLWZvcm0nKS5zdWJtaXQoKTtcbiAgICB9KTtcbiAgfVxuICAkLmZuLmNvbnRhY3RTdWJtaXQoKTtcbiAgJCggZG9jdW1lbnQgKS5hamF4Q29tcGxldGUoZnVuY3Rpb24oKSB7XG4gICAgJC5mbi5jb250YWN0U3VibWl0KCk7XG4gIH0pO1xuXG4gIC8vIEdvIGJhY2sgdG8gcHJldmlvdXMgYmFjayBpcyB1c2VyIGNsaWNrcyBkZWNsaW5lIHN1Ym1pdCBidXR0b25cbiAgJCgnLmFtYV9fYnV0dG9uLS1kZWNsaW5lJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciA9PT0gXCJcIikge1xuICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZj0nLyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgaW5pdGlhbExvYWQgPSB0cnVlO1xuXG4gIERydXBhbC5iZWhhdmlvcnMud2ViRm9ybSA9IHtcbiAgICBkZXRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncywgdHJpZ2dlcikge1xuICAgICAgaWYgKHRyaWdnZXIgPT09ICdzZXJpYWxpemUnKSB7XG4gICAgICAgIGluaXRpYWxMb2FkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgaWYgKCFpbml0aWFsTG9hZCkge1xuICAgICAgICBpZiAoIWNvbnRleHQuaW5uZXJUZXh0Lm1hdGNoKFwiRXJyb3IgbWVzc2FnZVwiKSkge1xuICAgICAgICAgICQoJy5hbWFfX3NhbGVzLWxhbmRpbmctcGFnZV9fZm9ybV9faGVhZGluZycpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAkLnZhbGlkYXRvci5hZGRNZXRob2QoXG4gICAgICAgIFwicmVnZXhcIixcbiAgICAgICAgZnVuY3Rpb24odmFsdWUsIGVsZW1lbnQsIHJlZ2V4cCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIHx8IHJlZ2V4cC50ZXN0KHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJQbGVhc2UgY2hlY2sgeW91ciBpbnB1dC5cIlxuICAgICAgKTtcblxuICAgICAgLy8gT24gd2ViZm9ybSBzdWJtaXQgY2hlY2sgdG8gc2VlIGlmIGFsbCBpbnB1dHMgYXJlIHZhbGlkXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0nKS52YWxpZGF0ZSh7XG4gICAgICAgIGlnbm9yZTogW10sXG4gICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgJ2VtYWlsJzoge1xuICAgICAgICAgICAgZW1haWw6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgICd0ZWxlcGhvbmUnOiB7XG4gICAgICAgICAgICAncmVnZXgnOiAvXihcXCtcXGR7MSwyfVxccyk/XFwoP1xcZHszfVxcKT9bXFxzLi1dP1xcZHszfVtcXHMuLV0/XFxkezR9JC9cbiAgICAgICAgICB9LFxuICAgICAgICAgICdiaXJ0aF95ZWFyJzoge1xuICAgICAgICAgICAgJ3JlZ2V4JzogL14oMTl8MjApXFxkezJ9JC9cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbihlcnJvciwgZWxlbWVudCkge1xuICAgICAgICAgIGlmIChlbGVtZW50LmF0dHIoXCJ0eXBlXCIpID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQucGFyZW50KCkuc2libGluZ3MoKS5sYXN0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChlbGVtZW50LmlzKFwic2VsZWN0XCIpKSB7XG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50Lm5leHQoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkSGFuZGxlcjogZnVuY3Rpb24oZm9ybSwgdmFsaWRhdG9yKSB7XG4gICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRvci5udW1iZXJPZkludmFsaWRzKCk7XG4gICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCQoJy5qcy1mb3JtLXR5cGUtcmFkaW8nKS5maW5kKCdsYWJlbC5lcnJvcicpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgJCgnLmpzLWZvcm0tdHlwZS1yYWRpbyBsYWJlbC5lcnJvcicpLnBhcmVudHMoJy5maWVsZHNldC13cmFwcGVyJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGlucHV0cyBhcmUgdmFsaWRcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIGxhYmVsLmVycm9yJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiggJCh0aGlzKS50ZXh0KCkgIT09ICcnKSB7XG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gQWRkIHZhbGlkYXRpb24gdG8gc2VsZWN0IGRyb3Bkb3duIG1lbnVzIHVzaW5nIGpRdWVyeSBVSVxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIHNlbGVjdCcpLnNlbGVjdG1lbnUoe1xuICAgICAgICBzdHlsZTogJ2Ryb3Bkb3duJyxcbiAgICAgICAgdHJhbnNmZXJDbGFzc2VzOiB0cnVlLFxuICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKFwiLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtXCIpLnZhbGlkYXRlKCkuZWxlbWVudCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIENvcGllcyBlbWFpbCBpbnB1dCB2YWx1ZXMgZnJvbSBlbWFpbCBzdWJzY3JpcHRpb24gYW5kIGluc2VydHMgaW50byB0aGUgb3RoZXIgZW1haWwgc3Vic2NyaXB0aW9uIGZvcm0gb24gcGFnZVxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1lbWFpbC1zdWJzY3JpcHRpb24tZm9ybScpLmZpbmQoJ2lucHV0W25hbWU9ZW1haWxdJykua2V5dXAoZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWVtYWlsLXN1YnNjcmlwdGlvbi1mb3JtJykuZmluZCgnaW5wdXRbbmFtZT1lbWFpbF0nKS52YWwoJCh0aGlzKS52YWwoKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX21haW5OYXZpZ2F0aW9uID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciAkY2F0ZWdvcnlOYXZXcmFwcGVyID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX3dyYXBwZXInKSxcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudSA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51JyksXG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cCA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19ncm91cCcpLFxuICAgICAgICAgICRtb2JpbGVTZWFyY2hUcmlnZ2VyID0gJCgnLmdsb2JhbC1zZWFyY2gtdHJpZ2dlcicpLFxuICAgICAgICAgICRtb2JpbGVTZWFyY2ggPSAkKCcuYW1hX19nbG9iYWwtc2VhcmNoJyksXG4gICAgICAgICAgJG1haW5OYXYgPSAkKCcuYW1hX19tYWluLW5hdmlnYXRpb24gJyksXG4gICAgICAgICAgJHByb2R1Y3ROYXYgPSAkKCcuYW1hX19wcm9kdWN0LW5hdicpLFxuICAgICAgICAgICRzdWJNZW51ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnKSxcbiAgICAgICAgICAkc3ViTWVudUFydGljbGUgPSAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnKSxcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IDAsXG4gICAgICAgICAgcHJvZHVjdE5hdkhlaWdodCA9IDAsXG4gICAgICAgICAgY2F0ZWdvcnlOYXZNZW51SGVpZ2h0ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnUnKS5vdXRlckhlaWdodCgpLFxuICAgICAgICAgIGNhdGVnb3J5TmF2TWVudVJlc2l6ZWRIZWlnaHQgPSAwLFxuICAgICAgICAgIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cbiAgICAgIC8vIENoZWNrcyBpZiB1c2VyIGFnZW50IGlzIGEgbW9iaWxlIGRldmljZVxuICAgICAgdmFyIGRldmljZUFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIGFnZW50SUQgPSBkZXZpY2VBZ2VudC5tYXRjaCgvKGFuZHJvaWR8d2Vib3N8aXBob25lfGlwb2R8YmxhY2tiZXJyeSkvKSAmJiB3aW5kb3dXaWR0aCA8IDc2ODtcblxuICAgICAgaWYoJHByb2R1Y3ROYXYubGVuZ3RoICYmICRwcm9kdWN0TmF2LmlzKCc6dmlzaWJsZScpICl7XG4gICAgICAgIHByb2R1Y3ROYXZIZWlnaHQgPSAkcHJvZHVjdE5hdi5oZWlnaHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2R1Y3ROYXZIZWlnaHQgPSAwO1xuICAgICAgfVxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGV0aGVyIG9yIG5vdCB0aGUgY2F0ZWdvcnkgbmF2IHNob3VsZCBoYXZlIHNjcm9sbGJhcnNcbiAgICAgIGZ1bmN0aW9uIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KSB7XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHZpZXdwb3J0IGhlaWdodCBpcyBwYXNzZWQgYmFjayB3aGVuIHRoZSB3aW5kb3cgZ2V0cyByZXNpemVkXG4gICAgICAgIGlmKHR5cGVvZiByZXNpemVWaWV3cG9ydEhlaWdodCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHJlc2l6ZVZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFdpbmRvdyBoZWlnaHQgaXMgdXNlZCBieSBkZWZhdWx0XG4gICAgICAgICAgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdWJ0cmFjdCB0aGUgbmF2aWdhdGlvbiBoZWlnaHQgZnJvbSB3aW5kb3cgaGVpZ2h0IHRvIGFzc2VzcyBjb250ZW50IGhlaWdodFxuICAgICAgICBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQ7XG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBtYWluIG1lbnUgcHVycGxlIGRyb3Bkb3duIGhlaWdodCBpcyBsYXJnZXIgdGhhbiB2aWV3cG9ydCBoZWlnaHRcbiAgICAgICAgaWYgKGNhdGVnb3J5TmF2TWVudUhlaWdodCArICRtYWluTmF2Lm91dGVySGVpZ2h0KCkgKyBwcm9kdWN0TmF2SGVpZ2h0ID4gdmlld3BvcnRIZWlnaHQgJiYgIWFnZW50SUQpIHtcblxuICAgICAgICAgIC8vIFNldCB0aGUgbWVudSBkcm9wZG93biB0aGUgc2FtZSBhcyB2aWV3cG9ydCB0byBlbmFibGUgc2Nyb2xsaW5nXG4gICAgICAgICAgdmFyIGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQgPSBjYXRlZ29yeU5hdk1lbnVSZXNpemVkSGVpZ2h0IC0gJG1haW5OYXYub3V0ZXJIZWlnaHQoKSAtIHByb2R1Y3ROYXZIZWlnaHQ7XG4gICAgICAgICAgJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cC5hZGRDbGFzcygnc2Nyb2xsJykub3V0ZXJIZWlnaHQoY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCk7XG5cbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLm9uKCdzaG93LnNtYXBpJywgZnVuY3Rpb24oZSwgbWVudSkge1xuICAgICAgICAgICAgaWYoJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX3N1Ym1lbnUnLCBtZW51KS5vdXRlckhlaWdodCgpID4gY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCkge1xuICAgICAgICAgICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fc3VibWVudScsIG1lbnUpLm91dGVySGVpZ2h0KGNhdGVnb3J5TmF2TWVudUhlaWdodFJlc2l6ZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZigkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnLCBtZW51KS5vdXRlckhlaWdodCgpID4gY2F0ZWdvcnlOYXZNZW51SGVpZ2h0UmVzaXplZCkge1xuICAgICAgICAgICAgICAkKCcuYW1hX2NhdGVnb3J5X25hdmlnYXRpb25fbWVudV9fYXJ0aWNsZXMnLCBtZW51KS5vdXRlckhlaWdodChjYXRlZ29yeU5hdk1lbnVIZWlnaHRSZXNpemVkKS5hZGRDbGFzcygnb25lX2FydGljbGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudUdyb3VwLnJlbW92ZUNsYXNzKCdzY3JvbGwnKS5vdXRlckhlaWdodCgnYXV0bycpO1xuICAgICAgICAgICRzdWJNZW51Lm91dGVySGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgJHN1Yk1lbnVBcnRpY2xlLm91dGVySGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICAvLyBIaWRlL1Nob3cgbWVudVxuICAgICAgZnVuY3Rpb24gaGlkZVNob3coKSB7XG4gICAgICAgIGlmICgkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZURvd24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKChjYXRlZ29yeU5hdk1lbnVIZWlnaHQgKyAgJG1haW5OYXYub3V0ZXJIZWlnaHQoKSArIHByb2R1Y3ROYXZIZWlnaHQpID4gdmlld3BvcnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgYm9keVNjcm9sbExvY2suZGlzYWJsZUJvZHlTY3JvbGwoJGNhdGVnb3J5TmF2aWdhdGlvbk1lbnVHcm91cCwge1xuICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmdW5jdGlvbiBhbGxvd1RvdWNoTW92ZShlbCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGVsICYmIGVsICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2JvZHktc2Nyb2xsLWxvY2staWdub3JlJykgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFnZW50SUQpIHtcbiAgICAgICAgICAgICAgLy8gT25seSBtYWtlIHRoZSBtZW51IGhlaWdodCBzYW1lIGFzIHZpZXdwb3J0IG9uIG1vYmlsZSBkZXZpY2VzXG4gICAgICAgICAgICAgIHZhciBtb2JpbGVIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICRjYXRlZ29yeU5hdldyYXBwZXIuaGVpZ2h0KG1vYmlsZUhlaWdodCkuYWRkQ2xhc3MoJ3Njcm9sbCcpO1xuXG4gICAgICAgICAgICAgICRjYXRlZ29yeU5hdmlnYXRpb25NZW51R3JvdXAub24oJ3Nob3cuc21hcGknLCBmdW5jdGlvbihlLCBtZW51KSB7XG4gICAgICAgICAgICAgICAgaWYoJChtZW51KS5vdXRlckhlaWdodCgpID4gbW9iaWxlSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAkKG1lbnUpLm91dGVySGVpZ2h0KG1vYmlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZVVwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGVpZ2h0KDApO1xuICAgICAgICAgICAgYm9keVNjcm9sbExvY2suY2xlYXJBbGxCb2R5U2Nyb2xsTG9ja3MoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDbG9zZXMgbWVudSBvbiBkb2MgbG9hZFxuICAgICAgJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgICAgJCgnLmFtYV9fZ2xvYmFsLW1lbnUnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBoaWRlU2hvdygpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIGEgdXNlciBjbGlja3Mgb3V0c2lkZSB0aGUgbWVudSB0aGVuIGNsb3NlIGl0XG4gICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoISRjYXRlZ29yeU5hdmlnYXRpb25NZW51LmlzKGUudGFyZ2V0KSAmJiAkY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICQoJyNnbG9iYWwtbWVudScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgaGlkZVNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJG1vYmlsZVNlYXJjaFRyaWdnZXIpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtb2JpbGVTZWFyY2guc2xpZGVUb2dnbGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBtb3ZlU29jaWFsU2hhcmVQb3NpdGlvbigpe1xuICAgICAgICB2YXIgbWFpbk5hdlBvc2l0aW9uID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uIC5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICB2YXIgJGFtYVNvY2lhbFNoYXJlID0gJCgnLmFtYV9fc29jaWFsLXNoYXJlJyk7XG5cbiAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBlbm91Z2ggZm9yIHRoZSBzdGlja3kgbmF2XG4gICAgICAgIGlmKG1haW5OYXZQb3NpdGlvbiA+IDYwKSB7XG5cbiAgICAgICAgICB2YXIgc29jaWFsU3RpY2t5UG9zaXRpb24gPSBtYWluTmF2UG9zaXRpb24gLSA2MDtcbiAgICAgICAgICB2YXIgJHNvY2lhbEljb25zID0gJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJyk7XG5cbiAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdmlld3BvcnQgd2lkdGggaXMgZ3JlYXRlciA4NTBweCB0aGVuIHRoZSBzb2NpYWwgaWNvbnMgd2lsbCBiZSBzdGlja3lcbiAgICAgICAgICBpZigkc29jaWFsSWNvbnMubGVuZ3RoICYmICQod2luZG93KS53aWR0aCgpID4gODUwKSB7XG4gICAgICAgICAgICAkc29jaWFsSWNvbnMuc3RpY2t5KHtcbiAgICAgICAgICAgICAgd3JhcHBlckNsYXNzTmFtZTogJ2FtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlLXdyYXBwZXInLFxuICAgICAgICAgICAgICB6SW5kZXg6IDUwMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRzb2NpYWxJY29ucy5vbignc3RpY2t5LXN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAkYW1hU29jaWFsU2hhcmUuYWRkQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmNzcygnbGVmdCcsIHNvY2lhbFN0aWNreVBvc2l0aW9uKS5oaWRlKCkuZmFkZVRvKCdzbG93JywgMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNvY2lhbEljb25zLm9uKCdzdGlja3ktdXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAkYW1hU29jaWFsU2hhcmUuYWRkQ2xhc3MoJ2FtYV9fc29jaWFsLXNoYXJlLS1maXhlZCcpLmhpZGUoKS5mYWRlVG8oJ3Nsb3cnLCAxKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkc29jaWFsSWNvbnMub24oJ3N0aWNreS1lbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICQoJy5hbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5yZW1vdmVDbGFzcygnYW1hX19zb2NpYWwtc2hhcmUtLWZpeGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSW5pdGlhbGl6ZSBnZXRTb2NpYWxTaGFyZSgpXG4gICAgICBtb3ZlU29jaWFsU2hhcmVQb3NpdGlvbigpO1xuXG4gICAgICAvLyBPbnNjcm9sbCBjaGVjayB0byBzZWUgaWYgc29jaWFsIGljb24gcG9zaXRpb24gaXMgZ3JlYXRlciB0aGFuIGZvb3RlciBwb3NpdGlvblxuICAgICAgdmFyIGRlYm91bmNlX3RpbWVyO1xuICAgICAgaWYoJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlIC5hbWFfX3NvY2lhbC1zaGFyZScpLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyICRzb2NpYWxJY29ucyA9ICQoJy5hbWFfX21hc3RoZWFkX19jb250ZW50X19zaGFyZSAuYW1hX19zb2NpYWwtc2hhcmUnKTtcbiAgICAgICAgICB2YXIgc29jaWFsSWNvblBvc2l0aW9uQm90dG9tID0gJHNvY2lhbEljb25zLm9mZnNldCgpLnRvcCArICRzb2NpYWxJY29ucy5vdXRlckhlaWdodCgpO1xuICAgICAgICAgIHZhciBmb290ZXJQb3NpdGlvbiA9ICQoJ2Zvb3RlcicpLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgIGlmKGRlYm91bmNlX3RpbWVyKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGRlYm91bmNlX3RpbWVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWJvdW5jZV90aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoc29jaWFsSWNvblBvc2l0aW9uQm90dG9tID4gZm9vdGVyUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJykuZmFkZU91dCgnZmFzdCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCgnLmFtYV9fbWFzdGhlYWRfX2NvbnRlbnRfX3NoYXJlJykuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgNTApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuXG4gICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVzaXplVmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIGNhdGVnb3J5TmF2SGVpZ2h0KHJlc2l6ZVZpZXdwb3J0SGVpZ2h0KTtcbiAgICAgIH0pO1xuXG4gICAgICAvL0NoZWNrcyB0aGUgbGF5b3V0IHBvc2l0aW9uIG9mIGFydGljbGUgb24gd2luZG93IHJlc2l6ZSBhbmQgbW92ZXMgdGhlIHNvY2lhbCBpY29ucyBhY2NvcmRpbmdseVxuICAgICAgJCggd2luZG93ICkucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWFnZW50SUQpIHtcbiAgICAgICAgICB2YXIgcmVzaXplVmlld3BvcnRIZWlnaHQgPSAkKHdpbmRvdykuaW5uZXJIZWlnaHQoKTtcbiAgICAgICAgICB2YXIgbWFpbk5hdlBvc2l0aW9uVXBkYXRlID0gJCgnLmFtYV9fbWFpbi1uYXZpZ2F0aW9uIC5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0IC0gMTAwO1xuXG4gICAgICAgICAgY2F0ZWdvcnlOYXZIZWlnaHQocmVzaXplVmlld3BvcnRIZWlnaHQpO1xuICAgICAgICAgICQoJy5hbWFfX3NvY2lhbC1zaGFyZS5hbWFfX3NvY2lhbC1zaGFyZS0tZml4ZWQnKS5jc3MoJ2xlZnQnLCBtYWluTmF2UG9zaXRpb25VcGRhdGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG5cblxuXG4iLCIvKipcbiAqIFNtYXJ0TWVudXMgalF1ZXJ5IFBsdWdpbiAtIHYxLjEuMCAtIFNlcHRlbWJlciAxNywgMjAxN1xuICogaHR0cDovL3d3dy5zbWFydG1lbnVzLm9yZy9cbiAqXG4gKiBDb3B5cmlnaHQgVmFzaWwgRGlua292LCBWYWRpa29tIFdlYiBMdGQuXG4gKiBodHRwOi8vdmFkaWtvbS5jb21cbiAqXG4gKiBMaWNlbnNlZCBNSVRcbiAqL1xuXG5cbmpRdWVyeSgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2dyb3VwJykuc21hcnRtZW51cyh7XG4gIHN1YkluZGljYXRvcnNQb3M6ICdhcHBlbmQnXG59KTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3NpZ25Jbk1lbnUgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciAkc2lnbkluRHJvcGRvd24gPSAkKCcuYW1hX19zaWduLWluLWRyb3Bkb3duJyk7XG4gICAgICB2YXIgJHNpZ25JbkRyb3Bkb3duTWVudSA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX21lbnUnKTtcbiAgICAgIHZhciAkc2lnbkluTGluayA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX3RleHQnKTtcbiAgICAgIHZhciAkZXhwbG9yZU1lbnUgPSAkKCcuYW1hX19leHBsb3JlLW1lbnUnKTtcbiAgICAgIHZhciAkZXhwbG9yZU1lbnVEcm9wZG93biA9ICQoJy5hbWFfX2V4cGxvcmUtbWVudV9fbWVudScpO1xuXG4gICAgICBmdW5jdGlvbiBkcm9wZG93bkRvd25NZW51KHBhcmVudEVsZW1lbnQsIG1lbnVFbGVtZW50KSB7XG4gICAgICAgcGFyZW50RWxlbWVudC51bmJpbmQoJ2NsaWNrJykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9wIGxpbmsgZnJvbSBmaXJpbmdcbiAgICAgICAgJHNpZ25JbkxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgb2YgdGhlIGNsaWNrIGlzbid0IHRoZSBjb250YWluZXIgbm9yIGEgZGVzY2VuZGFudCBvZiB0aGUgY29udGFpbmVyXG4gICAgICAgICAgaWYgKCFwYXJlbnRFbGVtZW50LmlzKGUudGFyZ2V0KSAmJiBwYXJlbnRFbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU2V0IHRpbWVvdXQgZm9yIHdoZW4gYSB1c2VyIG1vdXNlcyBvdXQgb2YgdGhlIG1lbnVcbiAgICAgICAgICBwYXJlbnRFbGVtZW50Lm1vdXNlZW50ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCgpO1xuICAgICAgICAgIH0pLm1vdXNlbGVhdmUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJChtZW51RWxlbWVudCkuc2xpZGVVcCgpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBkcm9wZG93bkRvd25NZW51KCRzaWduSW5Ecm9wZG93biwgJHNpZ25JbkRyb3Bkb3duTWVudSk7XG4gICAgICBkcm9wZG93bkRvd25NZW51KCRleHBsb3JlTWVudSwgJGV4cGxvcmVNZW51RHJvcGRvd24pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX3NlYXJjaF9jaGVja2JveCA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICB2YXIgJGNhdGVnb3J5U2VhcmNoSW5wdXQgPSAkKCcjc2VhcmNoX2NhdGVnb3J5Jyk7XG4gICAgICB2YXIgJGNhdGVnb3J5U2VhcmNoTGlzdCA9ICQoJy5mYWNldHMtd2lkZ2V0LWNoZWNrYm94IHVsIGxpJyk7XG4gICAgICB2YXIgJGNsZWFyU2VhcmNoRmlsdGVyID0gJCgnI2FwcGxpZWRGaWx0ZXJzUmVtb3ZlJyk7XG5cbiAgICAgIC8vIEZpbHRlciBsaXN0IHVzaW5nIGpRdWVyeSBmaWx0ZXJcbiAgICAgIGZ1bmN0aW9uIGZpbHRlckxpc3Qoc2VhcmNoQm94LCBsaXN0KSB7XG4gICAgICAgIHNlYXJjaEJveC5rZXl1cChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyICRyZWdleCA9IG5ldyBSZWdFeHAodGhpcy52YWx1ZSwgJ2knKTtcbiAgICAgICAgICBsaXN0LmhpZGUoKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICRyZWdleC50ZXN0KCQudHJpbSgkKHRoaXMpLnRleHQoKSkpO1xuICAgICAgICAgIH0pLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENsZWFyIGZpbHRlclxuICAgICAgZnVuY3Rpb24gY2xlYWZGaWx0ZXJMaXN0KGNsZWFyU2VhcmNoRmlsdGVyKSB7XG4gICAgICAgIGNsZWFyU2VhcmNoRmlsdGVyLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICRjYXRlZ29yeVNlYXJjaElucHV0LnZhbCgnJyk7XG4gICAgICAgICAgJGNhdGVnb3J5U2VhcmNoSW5wdXQudHJpZ2dlcigna2V5dXAnKTtcblxuICAgICAgICAgICQoJy5mYWNldHMtd2lkZ2V0LWNoZWNrYm94IHVsIGxpIFt0eXBlPWNoZWNrYm94XScpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCcjYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNocGFnZScpLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSW52b2tlIGZpbHRlciBsaXN0XG4gICAgICBmaWx0ZXJMaXN0KCRjYXRlZ29yeVNlYXJjaElucHV0LCAkY2F0ZWdvcnlTZWFyY2hMaXN0KTtcblxuICAgICAgLy8gSW52b2tlIGNsZWFyIGZpbHRlclxuICAgICAgY2xlYWZGaWx0ZXJMaXN0KCRjbGVhclNlYXJjaEZpbHRlcik7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogYnAgY2FsY3VsYXRvci5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gJ2Fub255bW91cyBjbG9zdXJlJy4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5icENhbGN1bGF0b3IgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgLy8gQ2xvbmUgbGFzdCByb3cgb2YgdGFibGVcbiAgICAgICQoJy5hZGQtYnAtcm93JykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciAkdGFibGVCb2R5ID0gJCgnI2JwQ2FsY3VsYXRvciB0YWJsZScpLmZpbmQoJ3Rib2R5JyksXG4gICAgICAgICAgJHRyTGFzdCA9ICR0YWJsZUJvZHkuZmluZCgndHI6bGFzdCcpLFxuICAgICAgICAgICR0ck5ldyA9ICR0ckxhc3QuY2xvbmUoKTtcblxuICAgICAgICAvLyBBcHBlbmQgbmV3IGNsYXNzIG5hbWUgdG8gY2xvbmVkIHJvd1xuICAgICAgICAkdHJMYXN0LmJlZm9yZSgkdHJOZXcpLmFkZENsYXNzKCdjbG9uZWQnKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XG5cbiAgICAgICAgLy8gQWRkIG5ldyBuYW1lIHdpdGggaW5kZXhcbiAgICAgICAgJHRhYmxlQm9keS5maW5kKCd0cjpsYXN0IGlucHV0JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyICR0cklucHV0Q2xhc3NJbmRleCA9ICQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGggKyAxLFxuICAgICAgICAgICAgICAkdHJJbnB1dENsYXNzTmFtZSA9ICQodGhpcykuYXR0cignY2xhc3MnKTtcblxuICAgICAgICAgICQodGhpcykuYXR0cignbmFtZScsICR0cklucHV0Q2xhc3NOYW1lICsgJy0nICsgJHRySW5wdXRDbGFzc0luZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgndGQ6ZXEoMCknLCAkdHJMYXN0KS50ZXh0KCQoJyNicENhbGN1bGF0b3IgdGJvZHk+dHInKS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgLy8gV2hlbiBjbGVhci9yZXN0YXJ0IGJ1dHRvbiBpcyBjbGlja2VkIHJldHVybiB0YWJsZSB0byBpbml0aWFsIHN0YXRlXG4gICAgICAkKCcuY2xlYXItcmVzdGFydCcpLnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgY2xvbmVkIHJvd3NcbiAgICAgICAgdmFyICR0ckNsb25lZCA9ICQoJy5jbG9uZWQnKTtcbiAgICAgICAgJHRyQ2xvbmVkLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIFJlc2V0IHRvIGludGlhbCB2YWx1ZXNcbiAgICAgICAgJCgnI2JwQ2FsY3VsYXRvciBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykudmFsKCcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzZXQgZm9ybVxuICAgICAgICAkKCcjYnBDYWxjdWxhdG9yICcpLnZhbGlkYXRlKCkucmVzZXRGb3JtKCk7XG5cbiAgICAgICAgLy8gSGlkZSBvdXRwdXQgcm93XG4gICAgICAgICQoJy5icENhbGN1bGF0b3JfX3RhYmxlX19vdXRwdXQnKS5oaWRlKCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlIEJQXG4gICAgICBmdW5jdGlvbiBjYWxjdWxjYXRlQlAoYnBWYWx1ZSwgYnBPdXRwdXQpIHtcbiAgICAgICAgdmFyIGJwSW5wdXQgPSAwLCAvLyByb3cgY291bnRcbiAgICAgICAgICAgIGJwVG90YWwgPSAwLCAvLyBpbmNyZW1lbnRlZCBpbnB1dCB2YWx1ZXNcbiAgICAgICAgICAgIGJwQXZlcmFnZTsgLy8gYXZlcmFnZWQgYnBUb3RhbCAvIGJwSW5wdXRcblxuICAgICAgICBicFZhbHVlLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIElmIElucHV0IHZhbHVlcyBhcmUgZ3JlYXRlciB0aGFuIDAgdGhlbiB0dXJuIGludG8gYSBudW1iZXIgYW5kIHJvdW5kXG4gICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkgPiAwID8gTWF0aC5yb3VuZChwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCkpIDogZmFsc2U7XG5cbiAgICAgICAgICBpZiAodmFsICE9PSAwKSB7XG4gICAgICAgICAgICBicElucHV0ICs9IDE7XG4gICAgICAgICAgICBicFRvdGFsICs9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBhdmVyYWdlXG4gICAgICAgIGJwQXZlcmFnZSA9IGJwVG90YWwgLyBicElucHV0ID4gMCA/IE1hdGgucm91bmQoYnBUb3RhbCAvIGJwSW5wdXQpIDogMDtcblxuICAgICAgICBicE91dHB1dC50ZXh0KGJwQXZlcmFnZSk7XG5cbiAgICAgICAgJCgnLmJwQ2FsY3VsYXRvcl9fdGFibGVfX291dHB1dCcpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gVmFsaWRhdGUgQlAgRm9ybVxuICAgICAgJCgnI2JwQ2FsY3VsYXRvcicpLnZhbGlkYXRlKHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIEJQIHdoZW4gY2FsY3VsYXRlIGlzIGNsaWNrZWRcbiAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24oZm9ybSkge1xuICAgICAgICAgIHZhciBzeXNCcFZhbHVlID0gJCgnLmJwQ2FsY3VsYXRvcl9fc3lzdG9saWMtaW5wdXQnKSxcbiAgICAgICAgICAgIHN5c0JwT3V0cHV0ID0gJCgnLmJwQ2FsY3VsYXRvcl9fc3lzdG9saWMtb3V0cHV0Jyk7XG5cbiAgICAgICAgICB2YXIgZGlhQnBWYWx1ZSA9ICQoJy5icENhbGN1bGF0b3JfX2RpYXN0b2xpYy1pbnB1dCcpLFxuICAgICAgICAgICAgZGlhQnBPdXRwdXQgPSAkKCcuYnBDYWxjdWxhdG9yX19kaWFzdG9saWMtb3V0cHV0Jyk7XG5cbiAgICAgICAgICBjYWxjdWxjYXRlQlAoc3lzQnBWYWx1ZSwgc3lzQnBPdXRwdXQpO1xuICAgICAgICAgIGNhbGN1bGNhdGVCUChkaWFCcFZhbHVlLCBkaWFCcE91dHB1dCk7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFNhZGx5IGFkZHMgZm9vdGVyIHRvIGxlZnQgcmVzb3VyY2UgcGFnZSBjb2x1bW4uXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMucmVzb3VyY2VQYWdlRm9vdGVyID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgJChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQoJ2JvZHkuYW1hX19yZXNvdXJjZS1wYWdlJykubGVuZ3RoKSB7XG4gICAgICAgICAgJCgnZm9vdGVyJywgY29udGV4dCkuY2xvbmUoKS5hcHBlbmRUbygnLmFtYV9fbGF5b3V0LS1zcGxpdF9fbGVmdCcpLmFkZENsYXNzKCdhbWFfX2Zvb3RlciBhbWFfX3Jlc291cmNlLXBhZ2VfX2Rlc2t0b3AtZm9vdGVyJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFJlc3BvbnNpdmUgVGFibGVzLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLnJlc3BvbnNpdmVUYWJsZXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAvLyBUaGlzIGNvbmRpdGlvbmFsIGhhcyBiZWVuIGFkZGVkIHRvIHByZXZlbnQgYmFzaWNUYWJsZSBwbHVnaW4gdG8gc2VsZWN0aXZlbHkgbm90IHJ1biBvbiB0YWJsZXNcbiAgICAgIGlmICghJCgndGFibGUnKS5oYXNDbGFzcygnc2ltcGxlVGFibGUnKSkge1xuICAgICAgICAkKCd0YWJsZScpLmJhc2ljdGFibGUoe1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjRcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgZm9yY2VzIHRhYmxlcyBpbnNpZGUgb2YgdGhlIC5hbWFfX3Jlc291cmNlLS1zY2hlZHVsZXMgZGl2IHRvIGhhdmUgbW9iaWxlIGxvb2sgYW5kIGZlZWxcbiAgICAgICQoJy5hbWFfX3Jlc291cmNlLS1zY2hlZHVsZXMgdGFibGUnKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5iYXNpY3RhYmxlKCdzdGFydCcpO1xuICAgICAgfSk7XG5cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBMaXN0aWNsZSBDbGFzZXMuXG4gKlxuICogSGFuZGxpbmcgY2xhc3NlcyB0byBidWlsZCBsaXN0aWNsZSBwcm9wZXJseSBvdXRzaWRlIGNrZWRpdG9yLlxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmxpc3RpY2xlID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIGlmICgkKCcubGlzdGljbGUnLCBjb250ZXh0KS5sZW5ndGgpIHtcbiAgICAgICAgJCgnLmxpc3RpY2xlJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24gKGlkeCwgZSkge1xuICAgICAgICAgICAgJChlKS5hZGRDbGFzcygnbGlzdGljbGVfX2l0ZW0nKTtcbiAgICAgICAgICAgICQoZSkuY2hpbGRyZW4oJ29sJykuZWFjaChmdW5jdGlvbiAoaWR4LCBmKSB7XG4gICAgICAgICAgICAgICQoZikuYWRkQ2xhc3MoJ2xpc3RpY2xlX19pdGVtLXN1YicpO1xuICAgICAgICAgICAgICAkKGYpLmNoaWxkcmVuKCdsaScpLmFkZENsYXNzKCdsaXN0aWNsZV9faXRlbS1zdWItaXRlbScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiJdfQ==
