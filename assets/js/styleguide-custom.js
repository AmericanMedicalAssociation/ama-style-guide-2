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

          $('[type=checkbox]').checkboxradio();
          $('[type=radio]').checkboxradio().buttonset().find('label').css('width', '19.4%');

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
                  $(ui.oldPanel).prev().removeClass('active');
                }
              }
            });
          }

          if($(".ama__expand-list").find('.ui-checkboxradio-checked').length) {
            expandListAccordion('.ama__expand-list', 0);
            $(".ama__expand-list").children('.ama__expand-list__header').addClass('active');
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
          $('.ama__applied-filters__show-filters').click(function(){
            $('.ama__expand-list, .ama__applied-filters__tags').slideDown();
            $('.ama__filter__see-results').fadeIn();
            $(this).fadeOut();
          });

          // Close accordion panels
          $('.ama__filter__see-results').click(function(){
            $('.ama__expand-list, .ama__applied-filters__tags').slideUp();
            $('.ama__applied-filters__show-filters').fadeIn();
            $(this).fadeOut();
          });

          // search filter
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
 * wrapping it with an "anonymous closure". See:
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

        $(document).click( function(){
          $('.ama__ribbon__dropdown__trigger', this).removeClass(class_active).children().removeClass(class_active)
        });
      })
    }
  }
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
    attach: function(context, settings) {

      function checkSize(){
        var subcategoryWrapper = $('.ama__subcategory-exploration-with-images').outerWidth();
        var subcategoryTitle = $('.ama__subcategory-exploration-with-images__title').outerWidth();
        subcategory = $('.ama__subcategory-exploration__subcategory');
        subcategory.hide();

        if (subcategoryWrapper > 0 && subcategoryWrapper < 290 && subcategoryTitle > 200 ) {
          subcategory.slice(0, 2).css('display', 'block');
        } else if (subcategoryWrapper > 290 && subcategoryWrapper < 600 && subcategoryTitle > 200 ) {
          subcategory.slice(0, 3).css('display', 'block');
        } else if ((subcategoryWrapper > 300 && subcategoryWrapper < 700) && subcategoryTitle < 200) {
          subcategory.slice(0, 2).css('display', 'block');
        } else if ((subcategoryWrapper > 700 && subcategoryWrapper < 1000) && subcategoryTitle < 200) {
          subcategory.slice(0, 3).css('display', 'block');
        } else if ((subcategoryWrapper > 1000 && subcategoryWrapper < 1200) && subcategoryTitle < 200) {
          subcategory.slice(0, 4).css('display', 'block');
        } else {
          subcategory.slice(0, 5).css('display', 'block');
        }
      }

      function viewMore() {
        $('.ama__subcategory-exploration-with-images__view-less').hide();
        $('.ama__subcategory-exploration-with-images__view-all').show();

        $('.viewAll').click(function(e) {
          e.preventDefault();
          subcategory.fadeIn();
          $('.ama__subcategory-exploration-with-images__view-all').hide();
          $('.ama__subcategory-exploration-with-images__view-less').show();
        });

        $('.viewLess').click(function(e) {
          e.preventDefault();
          subcategory.hide();
          checkSize();
          $('.ama__subcategory-exploration-with-images__view-less').hide();
          $('.ama__subcategory-exploration-with-images__view-all').show();
        });
      }

      // run test on initial page load
      checkSize();
      viewMore();

      // run test on resize of the window
      $( window ).resize(function() {
        checkSize();
        viewMore();
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
      var $subcategoryListContainerHeight = $subcategoryListContainer.outerHeight();
      var $subcategoryListLinkText = $('.ama__subcategory-exploration__text');

      // If the unordered list height is greater than the parent container then show the show more link
      if ($subcategoryList.height() > $subcategoryListContainerHeight) {
        $subcategoryListExpander.show();
      }

      // Drupal compels me to unbind clicks otherwise double clicks occur
      $subcategoryListExpander.unbind('click').click(function(e){
        e.stopPropagation();
        e.preventDefault();

        // Checks to see if the container has been expand or not by comparing initial height to current height
        if($subcategoryListContainer.height() > $subcategoryListContainerHeight) {
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
        active: defaultActiveTab
      });

      // Prevent jump onclick
      $('.ui-tabs-anchor').on('click', function (e) {
        // Store window y location so we can restore after changing the hash
        // which would otherwise cause the window to jump down.
        var windowScrollY = window.scrollY;
        // Update window hash location, and restore to previous y-position.
        // Use currentTarget because target is sometimes the icon div.
        window.location.hash = e.currentTarget.hash;
        window.scroll({top: windowScrollY});
        // Stop bubbling and default actions
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
        var linkHash = this.getAttribute("href");
        switchTabs($tabs, linkHash);
        // Stop bubbling and default actions
        return false;
      });

      /*
       * This function animates the browser scroll action with attention to keyboard only accessibility concerns
       *
       * @param {jQuery Object} $tabNav
       * @param {jQuery Object} $target
       */
      function smoothScroll($tabNav, $target) {
        var navCoords = $tabNav[0].getBoundingClientRect();
        $('html,body').animate({
          scrollTop: window.scrollY + navCoords.top
        }, 850, function () {
          // update focus for keyboard only navigation
          $target.attr('tabindex', '-1');
          $target.focus();
        });
        // Stop bubbling and default actions
        return false;
      }

      /*
       * This function opens referenced tabs from inline links
       *
       * @param {jQuery Object} $tabObj The element which has the .tab() function attached.
       * @param {string} linkHash
       */
      function switchTabs($tabObj, linkHash) {
        var widget = $tabObj.data('ui-tabs');
        var tabIndex = widget._getIndex(linkHash);

        $tabObj.tabs({
          active: tabIndex
        });
        // Scroll to top of ui tabs navigation
        smoothScroll($tabObj, $(widget.active[0]));
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

  // Go back to previous back is user clicks decline submit button
  $('.ama__button--decline').click(function(e) {
    e.preventDefault();

    if (document.referrer == "") {
      document.location.href='/';
    }
    else {
      history.back();
    }
  });

  var initialLoad = true;

  Drupal.behaviors.webForm = {
    attach: function (context, settings) {
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

      var categoryNavigationMenu = $('.ama_category_navigation_menu');

      // Hide/Show menu
      function hideShow() {
        if($('#global-menu').prop('checked')) {
          categoryNavigationMenu.slideDown();
        } else {
          categoryNavigationMenu.slideUp();
        }
      }

      $('.ama__global-menu').click(function(e){
        e.stopPropagation();
        hideShow();
      });

      $(document).click(function(e) {
        if (!categoryNavigationMenu.is(e.target) && categoryNavigationMenu.has(e.target).length === 0) {
          $('#global-menu').prop('checked',false);
          hideShow();
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
  mainMenuSubOffsetX: 250,
  mainMenuSubOffsetY: 20,
  keepInViewport: true
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
        });
      }

      // Invoke filter list
      filterList($categorySearchInput, $categorySearchList);

      // Invoke clear filter
      cleafFilterList($clearSearchFilter);
    }
  };
})(jQuery, Drupal);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQuanMiLCJmb3JtLWl0ZW1zLmpzIiwibmF2LmpzIiwic3ViY2F0ZWdvcnkuanMiLCJzdWJjYXRlZ29yeS1leHBsb3JhdGlvbi5qcyIsIndheWZpbmRlci5qcyIsInRhYnMuanMiLCJhY2NvcmRpb24uanMiLCJ3ZWJmb3Jtcy5qcyIsIm1haW4tbmF2aWdhdGlvbi5qcyIsImNhdGVnb3J5LW1lbnUuanMiLCJzaWduLWluLWRyb3Bkb3duLmpzIiwic2VhcmNoLWNoZWNrYm94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InN0eWxlZ3VpZGUtY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogSW5pdGlhbGl6YXRpb24gc2NyaXB0IGZvciBnbG9iYWwgcHJvY2Vzc2VzXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblxuLyoqXG4gKlxuICogSW5pdGlhbGl6ZSBmaXRWaWQgZm9yIFlvdVR1YmUgdmllb3MuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cblxuXHREcnVwYWwuYmVoYXZpb3JzLmZpdHZpZGluaXQgPSB7XG5cdCBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXHRcdFx0KGZ1bmN0aW9uICgkKSB7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JCgnLnZpZGVvLWNvbnRhaW5lcicpLmZpdFZpZHMoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KShqUXVlcnkpO1xuXHRcdH1cblx0fTtcblxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogRm9ybSBmaWVsZHMgbWFza2luZ1xuICovXG5cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuZm9ybUl0ZW1zID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICQoJy5tdWx0aXNlbGVjdCcpLm11bHRpc2VsZWN0KCk7XG5cbiAgICAgICAgICAkKCcuYW1hX190b29sdGlwJykudG9vbHRpcCh7XG4gICAgICAgICAgICB0b29sdGlwQ2xhc3M6IFwiYW1hX190b29sdGlwLWJ1YmJsZVwiXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBjb3VudF9yZW1haW5pbmdfY2hhcmFjdGVyKCkge1xuICAgICAgICAgICAgdmFyIG1heF9sZW5ndGggPSAxNTA7XG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyX2VudGVyZWQgPSAkKCcudGV4dGFyZWEnKS52YWwoKS5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyX3JlbWFpbmluZyA9IG1heF9sZW5ndGggLSBjaGFyYWN0ZXJfZW50ZXJlZDtcbiAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5odG1sKGNoYXJhY3Rlcl9yZW1haW5pbmcpO1xuICAgICAgICAgICAgaWYgKG1heF9sZW5ndGggPCBjaGFyYWN0ZXJfZW50ZXJlZCkge1xuICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCgnLnRleHRhcmVhJykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICQoJy5jaGFyYWN0ZXItY291bnQnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBqUXVlcnlVSSBzZWxlY3RtZW51IG1ldGhvZFxuICAgICAgICAgICQoJy5hbWFfX3NlbGVjdC1tZW51X19zZWxlY3QnKS5zZWxlY3RtZW51KCk7XG5cbiAgICAgICAgICAvLyBTdWJtaXRzIHRoZSBzZWFyY2ggZm9ybSBhZnRlciBhIHNlbGVjdCBtZW51IGl0ZW1zIGhhcyBiZWVuIHNlbGVjdGVkXG4gICAgICAgICAgJCgnLmFtYV9fc2VsZWN0LW1lbnVfX3NlbGVjdCcpLm9uKCdzZWxlY3RtZW51Y2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCcjYmxvY2stZXhwb3NlZGZvcm1hY3F1aWEtc2VhcmNocGFnZScpLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gU3RhcnQgc2VhcmNoIGZpbHRlclxuXG4gICAgICAgICAgdmFyIGF2YWlsYWJsZVRhZ3MgPSBbXG4gICAgICAgICAgICBcIkFsYWJhbWFcIixcbiAgICAgICAgICAgIFwiQWxhc2thXCIsXG4gICAgICAgICAgICBcIkFtZXJpY2FuIFNhbW9hXCIsXG4gICAgICAgICAgICBcIkFyaXpvbmFcIixcbiAgICAgICAgICAgIFwiQXJrYW5zYXNcIixcbiAgICAgICAgICAgIFwiQ2FsaWZvcm5pYVwiLFxuICAgICAgICAgICAgXCJDb2xvcmFkb1wiLFxuICAgICAgICAgICAgXCJDb25uZWN0aWN1dFwiLFxuICAgICAgICAgICAgXCJEZWxhd2FyZVwiLFxuICAgICAgICAgICAgXCJEaXN0cmljdCBPZiBDb2x1bWJpYVwiLFxuICAgICAgICAgICAgXCJGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWFcIixcbiAgICAgICAgICAgIFwiRmxvcmlkYVwiLFxuICAgICAgICAgICAgXCJHZW9yZ2lhXCIsXG4gICAgICAgICAgICBcIkd1YW1cIixcbiAgICAgICAgICAgIFwiSGF3YWlpXCIsXG4gICAgICAgICAgICBcIklkYWhvXCIsXG4gICAgICAgICAgICBcIklsbGlub2lzXCIsXG4gICAgICAgICAgICBcIkluZGlhbmFcIixcbiAgICAgICAgICAgIFwiSW93YVwiLFxuICAgICAgICAgICAgXCJLYW5zYXNcIixcbiAgICAgICAgICAgIFwiS2VudHVja3lcIixcbiAgICAgICAgICAgIFwiTG91aXNpYW5hXCIsXG4gICAgICAgICAgICBcIk1haW5lXCIsXG4gICAgICAgICAgICBcIk1hcnNoYWxsIElzbGFuZHNcIixcbiAgICAgICAgICAgIFwiTWFyeWxhbmRcIixcbiAgICAgICAgICAgIFwiTWFzc2FjaHVzZXR0c1wiLFxuICAgICAgICAgICAgXCJNaWNoaWdhblwiLFxuICAgICAgICAgICAgXCJNaW5uZXNvdGFcIixcbiAgICAgICAgICAgIFwiTWlzc2lzc2lwcGlcIixcbiAgICAgICAgICAgIFwiTWlzc291cmlcIixcbiAgICAgICAgICAgIFwiTW9udGFuYVwiLFxuICAgICAgICAgICAgXCJOZWJyYXNrYVwiLFxuICAgICAgICAgICAgXCJOZXZhZGFcIixcbiAgICAgICAgICAgIFwiTmV3IEhhbXBzaGlyZVwiLFxuICAgICAgICAgICAgXCJOZXcgSmVyc2V5XCIsXG4gICAgICAgICAgICBcIk5ldyBNZXhpY29cIixcbiAgICAgICAgICAgIFwiTmV3IFlvcmtcIixcbiAgICAgICAgICAgIFwiTm9ydGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICAgIFwiTm9ydGggRGFrb3RhXCIsXG4gICAgICAgICAgICBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuICAgICAgICAgICAgXCJPaGlvXCIsXG4gICAgICAgICAgICBcIk9rbGFob21hXCIsXG4gICAgICAgICAgICBcIk9yZWdvblwiLFxuICAgICAgICAgICAgXCJQYWxhdVwiLFxuICAgICAgICAgICAgXCJQZW5uc3lsdmFuaWFcIixcbiAgICAgICAgICAgIFwiUHVlcnRvIFJpY29cIixcbiAgICAgICAgICAgIFwiUmhvZGUgSXNsYW5kXCIsXG4gICAgICAgICAgICBcIlNvdXRoIENhcm9saW5hXCIsXG4gICAgICAgICAgICBcIlNvdXRoIERha290YVwiLFxuICAgICAgICAgICAgXCJUZW5uZXNzZWVcIixcbiAgICAgICAgICAgIFwiVGV4YXNcIixcbiAgICAgICAgICAgIFwiVXRhaFwiLFxuICAgICAgICAgICAgXCJWZXJtb250XCIsXG4gICAgICAgICAgICBcIlZpcmdpbiBJc2xhbmRzXCIsXG4gICAgICAgICAgICBcIlZpcmdpbmlhXCIsXG4gICAgICAgICAgICBcIldhc2hpbmd0b25cIixcbiAgICAgICAgICAgIFwiV2VzdCBWaXJnaW5pYVwiLFxuICAgICAgICAgICAgXCJXaXNjb25zaW5cIixcbiAgICAgICAgICAgIFwiV3lvbWluZ1wiXG4gICAgICAgICAgXTtcblxuICAgICAgICAgICQoIFwiI3NlYXJjaF9maWx0ZXJcIiApLmF1dG9jb21wbGV0ZSh7XG4gICAgICAgICAgICBzb3VyY2U6IGF2YWlsYWJsZVRhZ3NcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQudWkuYXV0b2NvbXBsZXRlLnByb3RvdHlwZS5fcmVzaXplTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB1bCA9IHRoaXMubWVudS5lbGVtZW50O1xuICAgICAgICAgICAgdWwub3V0ZXJXaWR0aCh0aGlzLmVsZW1lbnQub3V0ZXJXaWR0aCgpKTtcbiAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAvLyBTdGFydCBzZWFyY2ggZmlsdGVyIHdpdGggY2hlY2tib3hlc1xuXG4gICAgICAgICAgdmFyIGRhdGFNb2RlbCA9IFtcbiAgICAgICAgICAgIHt0ZXh0OiAnQWxhYmFtYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdBbGFza2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQW1lcmljYW4gU2Ftb2EnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQXJpem9uYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdBcmthbnNhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdDYWxpZm9ybmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0NvbG9yYWRvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0Nvbm5lY3RpY3V0JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0RlbGF3YXJlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0ZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdGbG9yaWRhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0dlb3JnaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnR3VhbScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdIYXdhaWknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSWRhaG8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSWxsaW5vaXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSW5kaWFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdJb3dhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0thbnNhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdLZW50dWNreScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdMb3Vpc2lhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFpbmUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFyc2hhbGwgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNYXJ5bGFuZCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNYXNzYWNodXNldHRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01pY2hpZ2FuJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01pbm5lc290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaXNzaXNzaXBwaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaXNzb3VyaScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNb250YW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05lYnJhc2thJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05ldmFkYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXcgSGFtcHNoaXJlJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05ldyBKZXJzZXknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmV3IE1leGljbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXcgWW9yaycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOb3J0aCBDYXJvbGluYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOb3J0aCBEYWtvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ09oaW8nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnT2tsYWhvbWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnT3JlZ29uJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1BhbGF1JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1Blbm5zeWx2YW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdQdWVydG8gUmljbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdSaG9kZSBJc2xhbmQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnU291dGggQ2Fyb2xpbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnU291dGggRGFrb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1Rlbm5lc3NlZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdUZXhhcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdVdGFoJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1Zlcm1vbnQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVmlyZ2luaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnV2FzaGluZ3RvbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdXZXN0IFZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1dpc2NvbnNpbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdXeW9taW5nJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJycsIHZhbHVlOiAnJ31cbiAgICAgICAgICBdO1xuXG4gICAgICAgICAgZnVuY3Rpb24gc2VsQ2hhbmdlKCl7XG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gJCgnI215Q2hlY2tMaXN0JykuY2hlY2tMaXN0KCdnZXRTZWxlY3Rpb24nKTtcblxuICAgICAgICAgICAgJCgnI3NlbGVjdGVkSXRlbXMnKS50ZXh0KEpTT04uc3RyaW5naWZ5KHNlbGVjdGlvbikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YoalF1ZXJ5LnVpLmNoZWNrTGlzdCkgIT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgJCgnI2ZpbHRlckxpc3QnKS5jaGVja0xpc3Qoe1xuICAgICAgICAgICAgICBsaXN0SXRlbXM6IGRhdGFNb2RlbCxcbiAgICAgICAgICAgICAgb25DaGFuZ2U6IHNlbENoYW5nZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCgnW3R5cGU9Y2hlY2tib3hdJykuY2hlY2tib3hyYWRpbygpO1xuICAgICAgICAgICQoJ1t0eXBlPXJhZGlvXScpLmNoZWNrYm94cmFkaW8oKS5idXR0b25zZXQoKS5maW5kKCdsYWJlbCcpLmNzcygnd2lkdGgnLCAnMTkuNCUnKTtcblxuICAgICAgICAgICQoJy50ZXh0YXJlYScpLmtleXVwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY291bnRfcmVtYWluaW5nX2NoYXJhY3RlcigpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gUmFuZ2UgRmllbGRcbiAgICAgICAgICB2YXIgbGVnZW5kID0gJCgnLmFtYV9fcmFuZ2UtZmllbGRfX2xlZ2VuZCcpO1xuICAgICAgICAgIHZhciBoYW5kbGUgPSAkKCBcIiNjdXJyZW50VmFsdWVcIiApO1xuXG4gICAgICAgICAgJChcIi5hbWFfX3JhbmdlLWZpZWxkXCIpLnNsaWRlcih7XG4gICAgICAgICAgICBhbmltYXRlOiB0cnVlLFxuICAgICAgICAgICAgcmFuZ2U6ICdtaW4nLFxuICAgICAgICAgICAgdmFsdWU6IDEsXG4gICAgICAgICAgICBtaW46IDIwMDAsXG4gICAgICAgICAgICBtYXg6IDUwMDAsXG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICB2YXIgaGFuZGxlID0galF1ZXJ5KHRoaXMpLmZpbmQoJy51aS1zbGlkZXItaGFuZGxlJyk7XG4gICAgICAgICAgICAgIHZhciBidWJibGUgPSBqUXVlcnkoJzxkaXYgY2xhc3M9XCJhbWFfX3JhbmdlLWZpZWxkX192YWx1ZWJveFwiPjwvZGl2PicpO1xuICAgICAgICAgICAgICBoYW5kbGUuYXBwZW5kKGJ1YmJsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2dCwgdWkpIHtcbiAgICAgICAgICAgICAgdWkuaGFuZGxlLmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MID0gJyQnICsgdWkudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuYXBwZW5kKGxlZ2VuZCk7XG5cbiAgICAgICAgICAvLyBGb3JtIGFjY29yZGlvblxuICAgICAgICAgICQoIFwiLnRhYmxpc3RcIiApLmFjY29yZGlvbih7XG4gICAgICAgICAgICBoZWFkZXI6IFwiLmFtYV9fZm9ybS1zdGVwc19fc3RlcFwiLFxuICAgICAgICAgICAgaGVpZ2h0U3R5bGU6IFwiY29udGVudFwiXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBFeHBhbmQgbGlzdFxuICAgICAgICAgIGZ1bmN0aW9uIGV4cGFuZExpc3RBY2NvcmRpb24oZWxlbWVudCwgb3Blbil7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmFjY29yZGlvbih7XG4gICAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxuICAgICAgICAgICAgICBpY29uczogZmFsc2UsXG4gICAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcbiAgICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgICAgIGFuaW1hdGU6IDUwMCxcbiAgICAgICAgICAgICAgYWN0aXZlOiBvcGVuLFxuICAgICAgICAgICAgICBhY3RpdmF0ZSA6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcbiAgICAgICAgICAgICAgICBpZigkKHVpLm5ld1BhbmVsKS5oYXNDbGFzcygndWktYWNjb3JkaW9uLWNvbnRlbnQtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICQodWkubmV3UGFuZWwpLnByZXYoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQodWkub2xkUGFuZWwpLnByZXYoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZigkKFwiLmFtYV9fZXhwYW5kLWxpc3RcIikuZmluZCgnLnVpLWNoZWNrYm94cmFkaW8tY2hlY2tlZCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgZXhwYW5kTGlzdEFjY29yZGlvbignLmFtYV9fZXhwYW5kLWxpc3QnLCAwKTtcbiAgICAgICAgICAgICQoXCIuYW1hX19leHBhbmQtbGlzdFwiKS5jaGlsZHJlbignLmFtYV9fZXhwYW5kLWxpc3RfX2hlYWRlcicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhwYW5kTGlzdEFjY29yZGlvbignLmFtYV9fZXhwYW5kLWxpc3QnLCBmYWxzZSk7XG4gICAgICAgICAgICAkKFwiLmFtYV9fZXhwYW5kLWxpc3RcIikuY2hpbGRyZW4oJy5hbWFfX2V4cGFuZC1saXN0X19oZWFkZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ29sbGFwc2UgYWxsIGFjY29yZGlvbiBwYW5lbHNcbiAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX2NvbGxhcHNlLXBhbmVscyBidXR0b24nKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QgLnVpLWFjY29yZGlvbi1oZWFkZXInKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygndWktc3RhdGUtYWN0aXZlJykgfHwgJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gT3BlbiBhY2NvcmRpb24gcGFuZWxzIGZvciBtb2JpbGVcbiAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcuYW1hX19leHBhbmQtbGlzdCwgLmFtYV9fYXBwbGllZC1maWx0ZXJzX190YWdzJykuc2xpZGVEb3duKCk7XG4gICAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX3NlZS1yZXN1bHRzJykuZmFkZUluKCk7XG4gICAgICAgICAgICAkKHRoaXMpLmZhZGVPdXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIENsb3NlIGFjY29yZGlvbiBwYW5lbHNcbiAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX3NlZS1yZXN1bHRzJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5hbWFfX2V4cGFuZC1saXN0LCAuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3RhZ3MnKS5zbGlkZVVwKCk7XG4gICAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCh0aGlzKS5mYWRlT3V0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBzZWFyY2ggZmlsdGVyXG4gICAgICAgICAgZnVuY3Rpb24gbGlzdEZpbHRlcihpbnB1dCwgbGlzdCkgeyAvLyBoZWFkZXIgaXMgYW55IGVsZW1lbnQsIGxpc3QgaXMgYW4gdW5vcmRlcmVkIGxpc3RcbiAgICAgICAgICAgIC8vIGN1c3RvbSBjc3MgZXhwcmVzc2lvbiBmb3IgYSBjYXNlLWluc2Vuc2l0aXZlIGNvbnRhaW5zKClcbiAgICAgICAgICAgIGpRdWVyeS5leHByWyc6J10uQ29udGFpbnMgPSBmdW5jdGlvbihhLGksbSl7XG4gICAgICAgICAgICAgIHJldHVybiAoYS50ZXh0Q29udGVudCB8fCBhLmlubmVyVGV4dCB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpLmluZGV4T2YobVszXS50b1VwcGVyQ2FzZSgpKT49MDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICQoaW5wdXQpLmNoYW5nZSggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB2YXIgZmlsdGVyID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgaWYoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBmaW5kcyBhbGwgbGlua3MgaW4gYSBsaXN0IHRoYXQgY29udGFpbiB0aGUgaW5wdXQsXG4gICAgICAgICAgICAgICAgLy8gYW5kIGhpZGUgdGhlIG9uZXMgbm90IGNvbnRhaW5pbmcgdGhlIGlucHV0IHdoaWxlIHNob3dpbmcgdGhlIG9uZXMgdGhhdCBkb1xuICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcInNwYW46bm90KDpDb250YWlucyhcIiArIGZpbHRlciArIFwiKSlcIikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcInNwYW46Q29udGFpbnMoXCIgKyBmaWx0ZXIgKyBcIilcIikucGFyZW50KCkuc2hvdygpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcImxhYmVsXCIpLnNob3coKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIC8vIG9ubHkgc2hvdyByZXN1bHRzIGFmdGVyIDMgY2hhcmFjdGVycyBhcmUgZW50ZXJlZFxuICAgICAgICAgICAgfSkua2V5dXAoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiggdGhpcy52YWx1ZS5sZW5ndGggPCA0ICkgcmV0dXJuO1xuICAgICAgICAgICAgICAkKHRoaXMpLmNoYW5nZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdEZpbHRlcigkKFwiI2FtYV9fc2VhcmNoX19sb2NhdGlvblwiKSwgJChcIi5hbWFfX2Zvcm0tZ3JvdXBcIikpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogUmliYm9uIG5hdiB1c2VyIGludGVyYWN0aW9ucy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcblxuICBEcnVwYWwuYmVoYXZpb3JzLnJpYmJvbm5hdiA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc19hY3RpdmUgPSAnaXMtYWN0aXZlJztcblxuICAgICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duX190cmlnZ2VyJywgdGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgLy8gVW5mb2N1cyBvbiB0aGUgZHJvcGRvd24uXG4gICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgLy8gQWRkIG91ciBjbGFzcyBmb3IgQ1NTLlxuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIHRvIHRoZSBkcm9wZG93biBVTC5cbiAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCkudG9nZ2xlQ2xhc3MoY2xhc3NfYWN0aXZlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnLmFtYV9fcmliYm9uX19kcm9wZG93bl9fdHJpZ2dlcicsIHRoaXMpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSkuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhjbGFzc19hY3RpdmUpXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogQGZpbGVcbiAqIFN1YmNhdGVnb3J5XG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuc3ViY2F0ZWdvcmllcyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIGZ1bmN0aW9uIGNoZWNrU2l6ZSgpe1xuICAgICAgICB2YXIgc3ViY2F0ZWdvcnlXcmFwcGVyID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXMnKS5vdXRlcldpZHRoKCk7XG4gICAgICAgIHZhciBzdWJjYXRlZ29yeVRpdGxlID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3RpdGxlJykub3V0ZXJXaWR0aCgpO1xuICAgICAgICBzdWJjYXRlZ29yeSA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zdWJjYXRlZ29yeScpO1xuICAgICAgICBzdWJjYXRlZ29yeS5oaWRlKCk7XG5cbiAgICAgICAgaWYgKHN1YmNhdGVnb3J5V3JhcHBlciA+IDAgJiYgc3ViY2F0ZWdvcnlXcmFwcGVyIDwgMjkwICYmIHN1YmNhdGVnb3J5VGl0bGUgPiAyMDAgKSB7XG4gICAgICAgICAgc3ViY2F0ZWdvcnkuc2xpY2UoMCwgMikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3ViY2F0ZWdvcnlXcmFwcGVyID4gMjkwICYmIHN1YmNhdGVnb3J5V3JhcHBlciA8IDYwMCAmJiBzdWJjYXRlZ29yeVRpdGxlID4gMjAwICkge1xuICAgICAgICAgIHN1YmNhdGVnb3J5LnNsaWNlKDAsIDMpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9IGVsc2UgaWYgKChzdWJjYXRlZ29yeVdyYXBwZXIgPiAzMDAgJiYgc3ViY2F0ZWdvcnlXcmFwcGVyIDwgNzAwKSAmJiBzdWJjYXRlZ29yeVRpdGxlIDwgMjAwKSB7XG4gICAgICAgICAgc3ViY2F0ZWdvcnkuc2xpY2UoMCwgMikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHN1YmNhdGVnb3J5V3JhcHBlciA+IDcwMCAmJiBzdWJjYXRlZ29yeVdyYXBwZXIgPCAxMDAwKSAmJiBzdWJjYXRlZ29yeVRpdGxlIDwgMjAwKSB7XG4gICAgICAgICAgc3ViY2F0ZWdvcnkuc2xpY2UoMCwgMykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHN1YmNhdGVnb3J5V3JhcHBlciA+IDEwMDAgJiYgc3ViY2F0ZWdvcnlXcmFwcGVyIDwgMTIwMCkgJiYgc3ViY2F0ZWdvcnlUaXRsZSA8IDIwMCkge1xuICAgICAgICAgIHN1YmNhdGVnb3J5LnNsaWNlKDAsIDQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1YmNhdGVnb3J5LnNsaWNlKDAsIDUpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHZpZXdNb3JlKCkge1xuICAgICAgICAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdmlldy1sZXNzJykuaGlkZSgpO1xuICAgICAgICAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdmlldy1hbGwnKS5zaG93KCk7XG5cbiAgICAgICAgJCgnLnZpZXdBbGwnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN1YmNhdGVnb3J5LmZhZGVJbigpO1xuICAgICAgICAgICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWFsbCcpLmhpZGUoKTtcbiAgICAgICAgICAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdmlldy1sZXNzJykuc2hvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcudmlld0xlc3MnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN1YmNhdGVnb3J5LmhpZGUoKTtcbiAgICAgICAgICBjaGVja1NpemUoKTtcbiAgICAgICAgICAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdmlldy1sZXNzJykuaGlkZSgpO1xuICAgICAgICAgICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWFsbCcpLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJ1biB0ZXN0IG9uIGluaXRpYWwgcGFnZSBsb2FkXG4gICAgICBjaGVja1NpemUoKTtcbiAgICAgIHZpZXdNb3JlKCk7XG5cbiAgICAgIC8vIHJ1biB0ZXN0IG9uIHJlc2l6ZSBvZiB0aGUgd2luZG93XG4gICAgICAkKCB3aW5kb3cgKS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNoZWNrU2l6ZSgpO1xuICAgICAgICB2aWV3TW9yZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogU3ViY2F0ZWdvcnlcbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5zdWJjYXRlZ29yaWVzRXhwbG9yYXRpb24gPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICB2YXIgJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19saXN0Jyk7XG4gICAgICB2YXIgJHN1YmNhdGVnb3J5TGlzdCAgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fbGlzdCB1bCcpO1xuICAgICAgdmFyICRzdWJjYXRlZ29yeUxpc3RFeHBhbmRlciA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zaG93LW1vcmUnKTtcbiAgICAgIHZhciAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVySGVpZ2h0ID0gJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lci5vdXRlckhlaWdodCgpO1xuICAgICAgdmFyICRzdWJjYXRlZ29yeUxpc3RMaW5rVGV4dCA9ICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX190ZXh0Jyk7XG5cbiAgICAgIC8vIElmIHRoZSB1bm9yZGVyZWQgbGlzdCBoZWlnaHQgaXMgZ3JlYXRlciB0aGFuIHRoZSBwYXJlbnQgY29udGFpbmVyIHRoZW4gc2hvdyB0aGUgc2hvdyBtb3JlIGxpbmtcbiAgICAgIGlmICgkc3ViY2F0ZWdvcnlMaXN0LmhlaWdodCgpID4gJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lckhlaWdodCkge1xuICAgICAgICAkc3ViY2F0ZWdvcnlMaXN0RXhwYW5kZXIuc2hvdygpO1xuICAgICAgfVxuXG4gICAgICAvLyBEcnVwYWwgY29tcGVscyBtZSB0byB1bmJpbmQgY2xpY2tzIG90aGVyd2lzZSBkb3VibGUgY2xpY2tzIG9jY3VyXG4gICAgICAkc3ViY2F0ZWdvcnlMaXN0RXhwYW5kZXIudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gQ2hlY2tzIHRvIHNlZSBpZiB0aGUgY29udGFpbmVyIGhhcyBiZWVuIGV4cGFuZCBvciBub3QgYnkgY29tcGFyaW5nIGluaXRpYWwgaGVpZ2h0IHRvIGN1cnJlbnQgaGVpZ2h0XG4gICAgICAgIGlmKCRzdWJjYXRlZ29yeUxpc3RDb250YWluZXIuaGVpZ2h0KCkgPiAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVySGVpZ2h0KSB7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5TGlzdENvbnRhaW5lci5yZW1vdmVDbGFzcygnYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbl9fbGlzdC0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19zaG93LW1vcmUtLWV4cGFuZGVkJyk7XG4gICAgICAgICAgJHN1YmNhdGVnb3J5TGlzdExpbmtUZXh0LnRleHQoJ1ZpZXcgYWxsIHN1YmNhdGVnb3JpZXMnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnlMaXN0Q29udGFpbmVyLmFkZENsYXNzKCdhbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uX19saXN0LS1leHBhbmRlZCcpO1xuICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3Nob3ctbW9yZS0tZXhwYW5kZWQnKTtcbiAgICAgICAgICAkc3ViY2F0ZWdvcnlMaXN0TGlua1RleHQudGV4dCgnVmlldyBmZXdlciBzdWJjYXRlZ29yaWVzJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcblxuIiwiLyoqXG4gKiBAZmlsZVxuICogSW50ZXJhY3Rpb25zIGZvciB3YXlmaW5kZXIuXG4gKlxuICogSmF2YVNjcmlwdCBzaG91bGQgYmUgbWFkZSBjb21wYXRpYmxlIHdpdGggbGlicmFyaWVzIG90aGVyIHRoYW4galF1ZXJ5IGJ5XG4gKiB3cmFwcGluZyBpdCB3aXRoIGFuIFwiYW5vbnltb3VzIGNsb3N1cmVcIi4gU2VlOlxuICogLSBodHRwczovL2RydXBhbC5vcmcvbm9kZS8xNDQ2NDIwXG4gKiAtIGh0dHA6Ly93d3cuYWRlcXVhdGVseWdvb2QuY29tLzIwMTAvMy9KYXZhU2NyaXB0LU1vZHVsZS1QYXR0ZXJuLUluLURlcHRoXG4gKi9cbihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMud2F5ZmluZGVyID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgaWYoJC5jb29raWUoJ2FtYV93YXlmaW5kZXJfY29va2llJykpIHtcbiAgICAgICAgICAkLmNvb2tpZS5qc29uID0gdHJ1ZTtcbiAgICAgICAgICAvLyBSZWFkIHdheWZpbmRlciBjb29raWVzIHNldCBmcm9tIGFtYS1hc3NuIGRvbWFpbnNcbiAgICAgICAgICB2YXIgYW1hX3dheWZpbmRlcl9jb29raWUgPSAkLmNvb2tpZSgnYW1hX3dheWZpbmRlcl9jb29raWUnKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGFtYV93YXlmaW5kZXJfY29va2llICE9PSAndW5kZWZpbmVkJyB8fCAkKCcucmVmZXJyZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkKCcuYW1hX193YXlmaW5kZXItLXJlZmVycmVyIGEnKS5mYWRlSW4oKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuICAgICAgICAgICAgJCgnLmFtYV9fd2F5ZmluZGVyLS1yZWZlcnJlciBhJykuYXR0cihcImhyZWZcIiwgYW1hX3dheWZpbmRlcl9jb29raWVbMV0pO1xuICAgICAgICAgICAgJCgnLmFtYV9fd2F5ZmluZGVyLS1yZWZlcnJlciBhJykudGV4dChhbWFfd2F5ZmluZGVyX2Nvb2tpZVswXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5hbWFfd2F5ZmluZGVyX3JlZmVycmVyLS1saW5rLWJhY2snKS5mYWRlT3V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KShqUXVlcnkpO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qPT09PT09IGpRdWVyeSBVSSB0YWJzID09PT09PSovXG5cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfdGFicyA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgdmFyIGRlZmF1bHRBY3RpdmVUYWIgPSAwO1xuICAgICAgdmFyIHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGlmICh2aWV3cG9ydFdpZHRoID49IDYwMCAmJiAkKCcuYW1hX19yZXNvdXJjZS10YWJzJykubGVuZ3RoID4gMCkge1xuICAgICAgICBkZWZhdWx0QWN0aXZlVGFiID0gMTtcbiAgICAgIH1cblxuICAgICAgJChcIi5hbWFfX3RhYnMsIC5hbWFfX3Jlc291cmNlLXRhYnNcIikudGFicyh7XG4gICAgICAgIGFjdGl2ZTogZGVmYXVsdEFjdGl2ZVRhYlxuICAgICAgfSk7XG5cbiAgICAgIC8vIFByZXZlbnQganVtcCBvbmNsaWNrXG4gICAgICAkKCcudWktdGFicy1hbmNob3InKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyBTdG9yZSB3aW5kb3cgeSBsb2NhdGlvbiBzbyB3ZSBjYW4gcmVzdG9yZSBhZnRlciBjaGFuZ2luZyB0aGUgaGFzaFxuICAgICAgICAvLyB3aGljaCB3b3VsZCBvdGhlcndpc2UgY2F1c2UgdGhlIHdpbmRvdyB0byBqdW1wIGRvd24uXG4gICAgICAgIHZhciB3aW5kb3dTY3JvbGxZID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIC8vIFVwZGF0ZSB3aW5kb3cgaGFzaCBsb2NhdGlvbiwgYW5kIHJlc3RvcmUgdG8gcHJldmlvdXMgeS1wb3NpdGlvbi5cbiAgICAgICAgLy8gVXNlIGN1cnJlbnRUYXJnZXQgYmVjYXVzZSB0YXJnZXQgaXMgc29tZXRpbWVzIHRoZSBpY29uIGRpdi5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBlLmN1cnJlbnRUYXJnZXQuaGFzaDtcbiAgICAgICAgd2luZG93LnNjcm9sbCh7dG9wOiB3aW5kb3dTY3JvbGxZfSk7XG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuXG4gICAgICAvL1NpbXVsYXRlIGNsaWNrIGV2ZW50IG9uIGFjdHVhbCBzaW1wbGVUYWJzIHRhYiBmcm9tIG1vYmlsZSBkcm9wIGRvd24uXG4gICAgICAkKCcuYW1hX190YWJzLW5hdmlnYXRpb24tLW1vYmlsZSBzZWxlY3QnKS5vbihcInNlbGVjdG1lbnVjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9IHVpLml0ZW0udmFsdWU7XG4gICAgICAgICQoJ2FbaHJlZj1cIiMnICsgc2VsZWN0ZWRWYWx1ZSArICdcIl0nKS5jbGljaygpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFdoZW4gY2xpY2tpbmcgYW4gaW5saW5lIHJlc291cmNlIHBhZ2UgbGluayByZWZlcmVuY2luZyBhIHRhYiwgb3BlbiByZWZlcmVuY2VkIHRhYi5cbiAgICAgICQoJy5hbWFfX3Jlc291cmNlLWxpbmstLWlubGluZSwgLmFtYV9fcGFnZS0tcmVzb3VyY2VfX3Jlc291cmNlLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciAkdGFicyA9ICQoJy5hbWFfX3Jlc291cmNlLXRhYnMnKTtcbiAgICAgICAgdmFyIGxpbmtIYXNoID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICBzd2l0Y2hUYWJzKCR0YWJzLCBsaW5rSGFzaCk7XG4gICAgICAgIC8vIFN0b3AgYnViYmxpbmcgYW5kIGRlZmF1bHQgYWN0aW9uc1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgLypcbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gYW5pbWF0ZXMgdGhlIGJyb3dzZXIgc2Nyb2xsIGFjdGlvbiB3aXRoIGF0dGVudGlvbiB0byBrZXlib2FyZCBvbmx5IGFjY2Vzc2liaWxpdHkgY29uY2VybnNcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICR0YWJOYXZcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5IE9iamVjdH0gJHRhcmdldFxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoJHRhYk5hdiwgJHRhcmdldCkge1xuICAgICAgICB2YXIgbmF2Q29vcmRzID0gJHRhYk5hdlswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB3aW5kb3cuc2Nyb2xsWSArIG5hdkNvb3Jkcy50b3BcbiAgICAgICAgfSwgODUwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIGZvY3VzIGZvciBrZXlib2FyZCBvbmx5IG5hdmlnYXRpb25cbiAgICAgICAgICAkdGFyZ2V0LmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgJHRhcmdldC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLypcbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gb3BlbnMgcmVmZXJlbmNlZCB0YWJzIGZyb20gaW5saW5lIGxpbmtzXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0fSAkdGFiT2JqIFRoZSBlbGVtZW50IHdoaWNoIGhhcyB0aGUgLnRhYigpIGZ1bmN0aW9uIGF0dGFjaGVkLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxpbmtIYXNoXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHN3aXRjaFRhYnMoJHRhYk9iaiwgbGlua0hhc2gpIHtcbiAgICAgICAgdmFyIHdpZGdldCA9ICR0YWJPYmouZGF0YSgndWktdGFicycpO1xuICAgICAgICB2YXIgdGFiSW5kZXggPSB3aWRnZXQuX2dldEluZGV4KGxpbmtIYXNoKTtcblxuICAgICAgICAkdGFiT2JqLnRhYnMoe1xuICAgICAgICAgIGFjdGl2ZTogdGFiSW5kZXhcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFNjcm9sbCB0byB0b3Agb2YgdWkgdGFicyBuYXZpZ2F0aW9uXG4gICAgICAgIHNtb290aFNjcm9sbCgkdGFiT2JqLCAkKHdpZGdldC5hY3RpdmVbMF0pKTtcbiAgICAgICAgLy8gU3RvcCBidWJibGluZyBhbmQgZGVmYXVsdCBhY3Rpb25zXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKj09PT09PSBqUXVlcnkgVUkgYWNjb3JkaW9uID09PT09PSovXG5cbihmdW5jdGlvbigkKSB7XG4gICAgJCggXCIuYW1hX19hY2NvcmRpb25cIiApLmFjY29yZGlvbih7XG4gICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIixcbiAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICB9KTtcbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICB2YXIgdmVyaWZ5RmllbGRzID0gZnVuY3Rpb24oZm9ybSkge1xuICAgIHZhciAkc2VjdGlvbnMgPSBmb3JtLmZpbmQoJ3NlY3Rpb24nKTtcbiAgICB2YXIgJGlucHV0cyA9ICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBzZWN0aW9uIConKS5maWx0ZXIoJzppbnB1dCcpO1xuICAgIHZhciAkaWNvbkVsZW1lbnQgPSAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJyk7XG4gICAgdmFyIGVycm9yU2VjdGlvbnMgPSBbXTtcblxuICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbihpLCBpbnB1dCkge1xuICAgICAgJGNsb3Nlc3RTZWN0aW9uID0gJCh0aGlzKS5jbG9zZXN0KCdzZWN0aW9uJykuYXR0cignZGF0YS1kcnVwYWwtc2VsZWN0b3InKS50b1N0cmluZygpO1xuICAgICAgaWYgKCQodGhpcykucHJvcCgncmVxdWlyZWQnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdlcnJvcicpKSB7XG4gICAgICAgIGVycm9yU2VjdGlvbnMucHVzaCgkY2xvc2VzdFNlY3Rpb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHNlY3Rpb25zLmVhY2goZnVuY3Rpb24oaSwgc2VjdGlvbikge1xuICAgICAgaWYgKCQuaW5BcnJheSgkKHRoaXMpLmF0dHIoJ2RhdGEtZHJ1cGFsLXNlbGVjdG9yJykudHJpbSgpLnRvU3RyaW5nKCksIGVycm9yU2VjdGlvbnMpICE9PSAtMSkge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJGljb25FbGVtZW50KS5yZW1vdmVDbGFzcygnZWRpdCBlcnJvciBjb21wbGV0ZWQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJGljb25FbGVtZW50KS5yZW1vdmVDbGFzcygnZWRpdCBlcnJvciBjb21wbGV0ZWQnKS5hZGRDbGFzcygnY29tcGxldGVkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbCkge1xuICAgIHZhciBlbWFpbFJlZyA9IC9eKFtcXHctXFwuXStAKFtcXHctXStcXC4pK1tcXHctXXsyLDR9KT8kLztcbiAgICByZXR1cm4gZW1haWxSZWcudGVzdChlbWFpbCk7XG4gIH1cblxuICBmdW5jdGlvbiBmaWVsZElzUmVxdWlyZWQoaW5wdXQpIHtcbiAgICBpbnB1dC5hZGRDbGFzcygnZXJyb3InKTtcbiAgICBpbnB1dC5uZXh0KCkucmVtb3ZlKCcuZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlJyk7XG4gICAgaW5wdXQuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJmb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2VcIj5GaWVsZCBpcyByZXF1aXJlZC48L2Rpdj4nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRmllbGQoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQucHJvcCgncmVxdWlyZWQnKSAmJiAoaW5wdXQudmFsKCkubGVuZ3RoID09PSAwIHx8IGlucHV0LnZhbCgpID09PSBcIlwiKSkge1xuICAgICAgZmllbGRJc1JlcXVpcmVkKGlucHV0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoaW5wdXQuYXR0cigndHlwZScpID09PSAnZW1haWwnICYmICF2YWxpZGF0ZUVtYWlsKGlucHV0LnZhbCgpKSkge1xuICAgICAgICBmaWVsZElzUmVxdWlyZWQoaW5wdXQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcicpLm5leHQoKS5yZW1vdmUoJy5mb3JtLWl0ZW0tLWVycm9yLW1lc3NhZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBHbyBiYWNrIHRvIHByZXZpb3VzIGJhY2sgaXMgdXNlciBjbGlja3MgZGVjbGluZSBzdWJtaXQgYnV0dG9uXG4gICQoJy5hbWFfX2J1dHRvbi0tZGVjbGluZScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIgPT0gXCJcIikge1xuICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZj0nLyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgaW5pdGlhbExvYWQgPSB0cnVlO1xuXG4gIERydXBhbC5iZWhhdmlvcnMud2ViRm9ybSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgJC52YWxpZGF0b3IuYWRkTWV0aG9kKFxuICAgICAgICBcInJlZ2V4XCIsXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlLCBlbGVtZW50LCByZWdleHApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25hbChlbGVtZW50KSB8fCByZWdleHAudGVzdCh2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIFwiUGxlYXNlIGNoZWNrIHlvdXIgaW5wdXQuXCJcbiAgICAgICk7XG5cbiAgICAgIC8vIE9uIHdlYmZvcm0gc3VibWl0IGNoZWNrIHRvIHNlZSBpZiBhbGwgaW5wdXRzIGFyZSB2YWxpZFxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtJykudmFsaWRhdGUoe1xuICAgICAgICBpZ25vcmU6IFtdLFxuICAgICAgICBydWxlczoge1xuICAgICAgICAgICdlbWFpbCc6IHtcbiAgICAgICAgICAgIGVtYWlsOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICAndGVsZXBob25lJzoge1xuICAgICAgICAgICAgJ3JlZ2V4JzogL14oXFwrXFxkezEsMn1cXHMpP1xcKD9cXGR7M31cXCk/W1xccy4tXT9cXGR7M31bXFxzLi1dP1xcZHs0fSQvXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnYmlydGhfeWVhcic6IHtcbiAgICAgICAgICAgICdyZWdleCc6IC9eKDE5fDIwKVxcZHsyfSQvXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24oZXJyb3IsIGVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAoZWxlbWVudC5hdHRyKFwidHlwZVwiKSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50LnBhcmVudCgpLnNpYmxpbmdzKCkubGFzdCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZWxlbWVudC5pcyhcInNlbGVjdFwiKSkge1xuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudC5uZXh0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0sIHZhbGlkYXRvcikge1xuICAgICAgICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0b3IubnVtYmVyT2ZJbnZhbGlkcygpO1xuICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZigkKCcuanMtZm9ybS10eXBlLXJhZGlvJykuZmluZCgnbGFiZWwuZXJyb3InKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICQoJy5qcy1mb3JtLXR5cGUtcmFkaW8gbGFiZWwuZXJyb3InKS5wYXJlbnRzKCcuZmllbGRzZXQtd3JhcHBlcicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBpbnB1dHMgYXJlIHZhbGlkXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBsYWJlbC5lcnJvcicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYoICQodGhpcykudGV4dCgpICE9PSAnJykge1xuICAgICAgICAgICAgJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEFkZCB2YWxpZGF0aW9uIHRvIHNlbGVjdCBkcm9wZG93biBtZW51cyB1c2luZyBqUXVlcnkgVUlcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybSBzZWxlY3QnKS5zZWxlY3RtZW51KHtcbiAgICAgICAgc3R5bGU6ICdkcm9wZG93bicsXG4gICAgICAgIHRyYW5zZmVyQ2xhc3NlczogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJChcIi53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybVwiKS52YWxpZGF0ZSgpLmVsZW1lbnQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIihmdW5jdGlvbiAoJCwgRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMuYW1hX21haW5OYXZpZ2F0aW9uID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciBjYXRlZ29yeU5hdmlnYXRpb25NZW51ID0gJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnUnKTtcblxuICAgICAgLy8gSGlkZS9TaG93IG1lbnVcbiAgICAgIGZ1bmN0aW9uIGhpZGVTaG93KCkge1xuICAgICAgICBpZigkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICBjYXRlZ29yeU5hdmlnYXRpb25NZW51LnNsaWRlRG93bigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuc2xpZGVVcCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICQoJy5hbWFfX2dsb2JhbC1tZW51JykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGhpZGVTaG93KCk7XG4gICAgICB9KTtcblxuICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIWNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuaXMoZS50YXJnZXQpICYmIGNhdGVnb3J5TmF2aWdhdGlvbk1lbnUuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAkKCcjZ2xvYmFsLW1lbnUnKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgaGlkZVNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBTbWFydE1lbnVzIGpRdWVyeSBQbHVnaW4gLSB2MS4xLjAgLSBTZXB0ZW1iZXIgMTcsIDIwMTdcbiAqIGh0dHA6Ly93d3cuc21hcnRtZW51cy5vcmcvXG4gKlxuICogQ29weXJpZ2h0IFZhc2lsIERpbmtvdiwgVmFkaWtvbSBXZWIgTHRkLlxuICogaHR0cDovL3ZhZGlrb20uY29tXG4gKlxuICogTGljZW5zZWQgTUlUXG4gKi9cblxuXG5qUXVlcnkoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51X19ncm91cCcpLnNtYXJ0bWVudXMoe1xuICBtYWluTWVudVN1Yk9mZnNldFg6IDI1MCxcbiAgbWFpbk1lbnVTdWJPZmZzZXRZOiAyMCxcbiAga2VlcEluVmlld3BvcnQ6IHRydWVcbn0pO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfc2lnbkluTWVudSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgdmFyICRzaWduSW5Ecm9wZG93biA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd24nKTtcbiAgICAgIHZhciAkc2lnbkluRHJvcGRvd25NZW51ID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bl9fbWVudScpO1xuICAgICAgdmFyICRzaWduSW5MaW5rID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bl9fdGV4dCcpO1xuICAgICAgdmFyICRleHBsb3JlTWVudSA9ICQoJy5hbWFfX2V4cGxvcmUtbWVudScpO1xuICAgICAgdmFyICRleHBsb3JlTWVudURyb3Bkb3duID0gJCgnLmFtYV9fZXhwbG9yZS1tZW51X19tZW51Jyk7XG5cbiAgICAgIGZ1bmN0aW9uIGRyb3Bkb3duRG93bk1lbnUocGFyZW50RWxlbWVudCwgbWVudUVsZW1lbnQpIHtcbiAgICAgICBwYXJlbnRFbGVtZW50LnVuYmluZCgnY2xpY2snKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFN0b3AgbGluayBmcm9tIGZpcmluZ1xuICAgICAgICAkc2lnbkluTGluay5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgLy8gaWYgdGhlIHRhcmdldCBvZiB0aGUgY2xpY2sgaXNuJ3QgdGhlIGNvbnRhaW5lciBub3IgYSBkZXNjZW5kYW50IG9mIHRoZSBjb250YWluZXJcbiAgICAgICAgICBpZiAoIXBhcmVudEVsZW1lbnQuaXMoZS50YXJnZXQpICYmIHBhcmVudEVsZW1lbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICQobWVudUVsZW1lbnQpLnNsaWRlVXAoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTZXQgdGltZW91dCBmb3Igd2hlbiBhIHVzZXIgbW91c2VzIG91dCBvZiB0aGUgbWVudVxuICAgICAgICAgIHBhcmVudEVsZW1lbnQubW91c2VlbnRlcihmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KCk7XG4gICAgICAgICAgfSkubW91c2VsZWF2ZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGRyb3Bkb3duRG93bk1lbnUoJHNpZ25JbkRyb3Bkb3duLCAkc2lnbkluRHJvcGRvd25NZW51KTtcbiAgICAgIGRyb3Bkb3duRG93bk1lbnUoJGV4cGxvcmVNZW51LCAkZXhwbG9yZU1lbnVEcm9wZG93bik7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfc2VhcmNoX2NoZWNrYm94ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgIHZhciAkY2F0ZWdvcnlTZWFyY2hJbnB1dCA9ICQoJyNzZWFyY2hfY2F0ZWdvcnknKTtcbiAgICAgIHZhciAkY2F0ZWdvcnlTZWFyY2hMaXN0ID0gJCgnLmZhY2V0cy13aWRnZXQtY2hlY2tib3ggdWwgbGknKTtcbiAgICAgIHZhciAkY2xlYXJTZWFyY2hGaWx0ZXIgPSAkKCcjYXBwbGllZEZpbHRlcnNSZW1vdmUnKTtcblxuICAgICAgLy8gRmlsdGVyIGxpc3QgdXNpbmcgalF1ZXJ5IGZpbHRlclxuICAgICAgZnVuY3Rpb24gZmlsdGVyTGlzdChzZWFyY2hCb3gsIGxpc3QpIHtcbiAgICAgICAgc2VhcmNoQm94LmtleXVwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgJHJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnZhbHVlLCAnaScpO1xuICAgICAgICAgIGxpc3QuaGlkZSgpLmZpbHRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJHJlZ2V4LnRlc3QoJC50cmltKCQodGhpcykudGV4dCgpKSk7XG4gICAgICAgICAgfSkuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xlYXIgZmlsdGVyXG4gICAgICBmdW5jdGlvbiBjbGVhZkZpbHRlckxpc3QoY2xlYXJTZWFyY2hGaWx0ZXIpIHtcbiAgICAgICAgY2xlYXJTZWFyY2hGaWx0ZXIuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJGNhdGVnb3J5U2VhcmNoSW5wdXQudmFsKCcnKTtcbiAgICAgICAgICAkY2F0ZWdvcnlTZWFyY2hJbnB1dC50cmlnZ2VyKCdrZXl1cCcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSW52b2tlIGZpbHRlciBsaXN0XG4gICAgICBmaWx0ZXJMaXN0KCRjYXRlZ29yeVNlYXJjaElucHV0LCAkY2F0ZWdvcnlTZWFyY2hMaXN0KTtcblxuICAgICAgLy8gSW52b2tlIGNsZWFyIGZpbHRlclxuICAgICAgY2xlYWZGaWx0ZXJMaXN0KCRjbGVhclNlYXJjaEZpbHRlcik7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIl19
