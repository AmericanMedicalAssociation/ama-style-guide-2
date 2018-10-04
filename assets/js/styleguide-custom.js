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
          $( ".ama__expand-list" ).accordion({
            multiple: true,
            icons: false,
            heightStyle: "content",
            collapsible: true,
            active: false,
            animate: 500,
            activate : function (event, ui)
            {
              if($(ui.newPanel).hasClass('ui-accordion-content-active')) {
                $(ui.newPanel).prev().addClass('active');
              } else {
                $(ui.oldPanel).prev().removeClass('active');
              }
            }
          });

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
      var lastHash = null;
      if (viewportWidth >= 600 && $('.ama__resource-tabs').length > 0) {
        defaultActiveTab = 1;
      }

      $(".ama__tabs").tabs({
        active: defaultActiveTab
      });

      //Resource page specific tags
      $(".ama__resource-tabs").tabs({
        active: defaultActiveTab,
        create: function () {
          var widget = $(this).data('ui-tabs');
          $(window).on('hashchange', function () {
            widget.option('active', widget._getIndex(location.hash));
            lastHash = location.hash;

            // Scroll to top of ui tabs navigation
            smoothScroll($(widget.element), $(widget.active[0]));
            return false;
          });
        }
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
      });

      // Scroll to when there is no has change on resource page tab links
      $('.ama____page--resources__page-content a[href^="#"]').on('click', function (e) {
        if (lastHash == window.location.hash) {
          var hash = window.location.hash;
          smoothScroll($('.ama__resource-tabs__nav'), $('.ama__resource-tabs__nav a[href="' + hash + '"]'));
        }
      });

      //Simulate click event on actual simpleTabs tab from mobile drop down.
      $('.ama__tabs-navigation--mobile select').on("selectmenuchange", function (event, ui) {
        var selectedValue = ui.item.value;
        $('a[href="#' + selectedValue + '"]').click();
      });

      /*
       * This function animates the browser scroll action with attention to keyboard only accessibility concerns
       *
       * @param {jQuery Object] $tabNav
       * @param {jQuery Object] $target
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
(function ($, Drupal) {
  Drupal.behaviors.categoryMenu = {
    attach: function (context, settings) {
      $('.ama_category_navigation_menu__group').smartmenus({
        mainMenuSubOffsetX: 250,
        mainMenuSubOffsetY: 20,
        keepInViewport: true
      });
    }
  };
})(jQuery, Drupal);

(function ($, Drupal) {
  Drupal.behaviors.ama_signInMenu = {
    attach: function (context, settings) {
      var signInDropdown = $('.ama__sign-in-dropdown');
      var signInDropdownMenu = $('.ama__sign-in-dropdown__menu');
      var exploreMenu = $('.ama__explore-menu');
      var exploreMenuDropdown = $('.ama__explore-menu__menu');

      function dropdownDownMenu(parentElement, menuElement) {

        parentElement.unbind('click').click(function(e){
          e.stopPropagation();
          $(menuElement).slideToggle();
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

      dropdownDownMenu(signInDropdown, signInDropdownMenu);
      dropdownDownMenu(exploreMenu, exploreMenuDropdown);
    }
  };
})(jQuery, Drupal);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQuanMiLCJmb3JtLWl0ZW1zLmpzIiwibmF2LmpzIiwic3ViY2F0ZWdvcnkuanMiLCJ3YXlmaW5kZXIuanMiLCJ0YWJzLmpzIiwiYWNjb3JkaW9uLmpzIiwid2ViZm9ybXMuanMiLCJtYWluLW5hdmlnYXRpb24uanMiLCJjYXRlZ29yeS1tZW51LmpzIiwic2lnbi1pbi1kcm9wZG93bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic3R5bGVndWlkZS1jdXN0b20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlXG4gKiBJbml0aWFsaXphdGlvbiBzY3JpcHQgZm9yIGdsb2JhbCBwcm9jZXNzZXNcbiAqL1xuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXG4vKipcbiAqXG4gKiBJbml0aWFsaXplIGZpdFZpZCBmb3IgWW91VHViZSB2aWVvcy5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuXG5cdERydXBhbC5iZWhhdmlvcnMuZml0dmlkaW5pdCA9IHtcblx0IGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cdFx0XHQoZnVuY3Rpb24gKCQpIHtcblx0XHRcdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKCcudmlkZW8tY29udGFpbmVyJykuZml0VmlkcygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pKGpRdWVyeSk7XG5cdFx0fVxuXHR9O1xuXG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBGb3JtIGZpZWxkcyBtYXNraW5nXG4gKi9cblxuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5mb3JtSXRlbXMgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG4gICAgICAgICAgJCgnLm11bHRpc2VsZWN0JykubXVsdGlzZWxlY3QoKTtcblxuICAgICAgICAgICQoJy5hbWFfX3Rvb2x0aXAnKS50b29sdGlwKHtcbiAgICAgICAgICAgIHRvb2x0aXBDbGFzczogXCJhbWFfX3Rvb2x0aXAtYnViYmxlXCJcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKSB7XG4gICAgICAgICAgICB2YXIgbWF4X2xlbmd0aCA9IDE1MDtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfZW50ZXJlZCA9ICQoJy50ZXh0YXJlYScpLnZhbCgpLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJfcmVtYWluaW5nID0gbWF4X2xlbmd0aCAtIGNoYXJhY3Rlcl9lbnRlcmVkO1xuICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLmh0bWwoY2hhcmFjdGVyX3JlbWFpbmluZyk7XG4gICAgICAgICAgICBpZiAobWF4X2xlbmd0aCA8IGNoYXJhY3Rlcl9lbnRlcmVkKSB7XG4gICAgICAgICAgICAgICQoJy50ZXh0YXJlYScpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAkKCcuY2hhcmFjdGVyLWNvdW50JykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKCcudGV4dGFyZWEnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJCgnLmNoYXJhY3Rlci1jb3VudCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFN0YXJ0IHNlYXJjaCBmaWx0ZXJcblxuICAgICAgICAgIHZhciBhdmFpbGFibGVUYWdzID0gW1xuICAgICAgICAgICAgXCJBbGFiYW1hXCIsXG4gICAgICAgICAgICBcIkFsYXNrYVwiLFxuICAgICAgICAgICAgXCJBbWVyaWNhbiBTYW1vYVwiLFxuICAgICAgICAgICAgXCJBcml6b25hXCIsXG4gICAgICAgICAgICBcIkFya2Fuc2FzXCIsXG4gICAgICAgICAgICBcIkNhbGlmb3JuaWFcIixcbiAgICAgICAgICAgIFwiQ29sb3JhZG9cIixcbiAgICAgICAgICAgIFwiQ29ubmVjdGljdXRcIixcbiAgICAgICAgICAgIFwiRGVsYXdhcmVcIixcbiAgICAgICAgICAgIFwiRGlzdHJpY3QgT2YgQ29sdW1iaWFcIixcbiAgICAgICAgICAgIFwiRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhXCIsXG4gICAgICAgICAgICBcIkZsb3JpZGFcIixcbiAgICAgICAgICAgIFwiR2VvcmdpYVwiLFxuICAgICAgICAgICAgXCJHdWFtXCIsXG4gICAgICAgICAgICBcIkhhd2FpaVwiLFxuICAgICAgICAgICAgXCJJZGFob1wiLFxuICAgICAgICAgICAgXCJJbGxpbm9pc1wiLFxuICAgICAgICAgICAgXCJJbmRpYW5hXCIsXG4gICAgICAgICAgICBcIklvd2FcIixcbiAgICAgICAgICAgIFwiS2Fuc2FzXCIsXG4gICAgICAgICAgICBcIktlbnR1Y2t5XCIsXG4gICAgICAgICAgICBcIkxvdWlzaWFuYVwiLFxuICAgICAgICAgICAgXCJNYWluZVwiLFxuICAgICAgICAgICAgXCJNYXJzaGFsbCBJc2xhbmRzXCIsXG4gICAgICAgICAgICBcIk1hcnlsYW5kXCIsXG4gICAgICAgICAgICBcIk1hc3NhY2h1c2V0dHNcIixcbiAgICAgICAgICAgIFwiTWljaGlnYW5cIixcbiAgICAgICAgICAgIFwiTWlubmVzb3RhXCIsXG4gICAgICAgICAgICBcIk1pc3Npc3NpcHBpXCIsXG4gICAgICAgICAgICBcIk1pc3NvdXJpXCIsXG4gICAgICAgICAgICBcIk1vbnRhbmFcIixcbiAgICAgICAgICAgIFwiTmVicmFza2FcIixcbiAgICAgICAgICAgIFwiTmV2YWRhXCIsXG4gICAgICAgICAgICBcIk5ldyBIYW1wc2hpcmVcIixcbiAgICAgICAgICAgIFwiTmV3IEplcnNleVwiLFxuICAgICAgICAgICAgXCJOZXcgTWV4aWNvXCIsXG4gICAgICAgICAgICBcIk5ldyBZb3JrXCIsXG4gICAgICAgICAgICBcIk5vcnRoIENhcm9saW5hXCIsXG4gICAgICAgICAgICBcIk5vcnRoIERha290YVwiLFxuICAgICAgICAgICAgXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIixcbiAgICAgICAgICAgIFwiT2hpb1wiLFxuICAgICAgICAgICAgXCJPa2xhaG9tYVwiLFxuICAgICAgICAgICAgXCJPcmVnb25cIixcbiAgICAgICAgICAgIFwiUGFsYXVcIixcbiAgICAgICAgICAgIFwiUGVubnN5bHZhbmlhXCIsXG4gICAgICAgICAgICBcIlB1ZXJ0byBSaWNvXCIsXG4gICAgICAgICAgICBcIlJob2RlIElzbGFuZFwiLFxuICAgICAgICAgICAgXCJTb3V0aCBDYXJvbGluYVwiLFxuICAgICAgICAgICAgXCJTb3V0aCBEYWtvdGFcIixcbiAgICAgICAgICAgIFwiVGVubmVzc2VlXCIsXG4gICAgICAgICAgICBcIlRleGFzXCIsXG4gICAgICAgICAgICBcIlV0YWhcIixcbiAgICAgICAgICAgIFwiVmVybW9udFwiLFxuICAgICAgICAgICAgXCJWaXJnaW4gSXNsYW5kc1wiLFxuICAgICAgICAgICAgXCJWaXJnaW5pYVwiLFxuICAgICAgICAgICAgXCJXYXNoaW5ndG9uXCIsXG4gICAgICAgICAgICBcIldlc3QgVmlyZ2luaWFcIixcbiAgICAgICAgICAgIFwiV2lzY29uc2luXCIsXG4gICAgICAgICAgICBcIld5b21pbmdcIlxuICAgICAgICAgIF07XG5cbiAgICAgICAgICAkKCBcIiNzZWFyY2hfZmlsdGVyXCIgKS5hdXRvY29tcGxldGUoe1xuICAgICAgICAgICAgc291cmNlOiBhdmFpbGFibGVUYWdzXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkLnVpLmF1dG9jb21wbGV0ZS5wcm90b3R5cGUuX3Jlc2l6ZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdWwgPSB0aGlzLm1lbnUuZWxlbWVudDtcbiAgICAgICAgICAgIHVsLm91dGVyV2lkdGgodGhpcy5lbGVtZW50Lm91dGVyV2lkdGgoKSk7XG4gICAgICAgICAgfTtcblxuXG4gICAgICAgICAgLy8gU3RhcnQgc2VhcmNoIGZpbHRlciB3aXRoIGNoZWNrYm94ZXNcblxuICAgICAgICAgIHZhciBkYXRhTW9kZWwgPSBbXG4gICAgICAgICAgICB7dGV4dDogJ0FsYWJhbWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQWxhc2thJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0FtZXJpY2FuIFNhbW9hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0FyaXpvbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQXJrYW5zYXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnQ2FsaWZvcm5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdDb2xvcmFkbycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdDb25uZWN0aWN1dCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdEZWxhd2FyZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdEaXN0cmljdCBPZiBDb2x1bWJpYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnRmxvcmlkYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdHZW9yZ2lhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0d1YW0nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSGF3YWlpJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0lkYWhvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0lsbGlub2lzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ0luZGlhbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnSW93YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdLYW5zYXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnS2VudHVja3knLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTG91aXNpYW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01haW5lJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ01hcnNoYWxsIElzbGFuZHMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFyeWxhbmQnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWFzc2FjaHVzZXR0cycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaWNoaWdhbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdNaW5uZXNvdGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWlzc2lzc2lwcGknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTWlzc291cmknLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTW9udGFuYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZWJyYXNrYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXZhZGEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmV3IEhhbXBzaGlyZScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdOZXcgSmVyc2V5JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05ldyBNZXhpY28nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTmV3IFlvcmsnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGggQ2Fyb2xpbmEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnTm9ydGggRGFrb3RhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdPaGlvJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ09rbGFob21hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ09yZWdvbicsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdQYWxhdScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdQZW5uc3lsdmFuaWEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnUHVlcnRvIFJpY28nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnUmhvZGUgSXNsYW5kJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1NvdXRoIENhcm9saW5hJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1NvdXRoIERha290YScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdUZW5uZXNzZWUnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVGV4YXMnLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnVXRhaCcsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdWZXJtb250JywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbiBJc2xhbmRzJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1ZpcmdpbmlhJywgdmFsdWU6ICcyJ30sXG4gICAgICAgICAgICB7dGV4dDogJ1dhc2hpbmd0b24nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnV2VzdCBWaXJnaW5pYScsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICdXaXNjb25zaW4nLCB2YWx1ZTogJzInfSxcbiAgICAgICAgICAgIHt0ZXh0OiAnV3lvbWluZycsIHZhbHVlOiAnMid9LFxuICAgICAgICAgICAge3RleHQ6ICcnLCB2YWx1ZTogJyd9XG4gICAgICAgICAgXTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHNlbENoYW5nZSgpe1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9ICQoJyNteUNoZWNrTGlzdCcpLmNoZWNrTGlzdCgnZ2V0U2VsZWN0aW9uJyk7XG5cbiAgICAgICAgICAgICQoJyNzZWxlY3RlZEl0ZW1zJykudGV4dChKU09OLnN0cmluZ2lmeShzZWxlY3Rpb24pKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mKGpRdWVyeS51aS5jaGVja0xpc3QpICE9ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICQoJyNmaWx0ZXJMaXN0JykuY2hlY2tMaXN0KHtcbiAgICAgICAgICAgICAgbGlzdEl0ZW1zOiBkYXRhTW9kZWwsXG4gICAgICAgICAgICAgIG9uQ2hhbmdlOiBzZWxDaGFuZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQoJ1t0eXBlPWNoZWNrYm94XScpLmNoZWNrYm94cmFkaW8oKTtcbiAgICAgICAgICAkKCdbdHlwZT1yYWRpb10nKS5jaGVja2JveHJhZGlvKCkuYnV0dG9uc2V0KCkuZmluZCgnbGFiZWwnKS5jc3MoJ3dpZHRoJywgJzE5LjQlJyk7XG5cbiAgICAgICAgICAkKCcudGV4dGFyZWEnKS5rZXl1cChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvdW50X3JlbWFpbmluZ19jaGFyYWN0ZXIoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFJhbmdlIEZpZWxkXG4gICAgICAgICAgdmFyIGxlZ2VuZCA9ICQoJy5hbWFfX3JhbmdlLWZpZWxkX19sZWdlbmQnKTtcbiAgICAgICAgICB2YXIgaGFuZGxlID0gJCggXCIjY3VycmVudFZhbHVlXCIgKTtcblxuICAgICAgICAgICQoXCIuYW1hX19yYW5nZS1maWVsZFwiKS5zbGlkZXIoe1xuICAgICAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHJhbmdlOiAnbWluJyxcbiAgICAgICAgICAgIHZhbHVlOiAxLFxuICAgICAgICAgICAgbWluOiAyMDAwLFxuICAgICAgICAgICAgbWF4OiA1MDAwLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGpRdWVyeSh0aGlzKS5maW5kKCcudWktc2xpZGVyLWhhbmRsZScpO1xuICAgICAgICAgICAgICB2YXIgYnViYmxlID0galF1ZXJ5KCc8ZGl2IGNsYXNzPVwiYW1hX19yYW5nZS1maWVsZF9fdmFsdWVib3hcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgaGFuZGxlLmFwcGVuZChidWJibGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldnQsIHVpKSB7XG4gICAgICAgICAgICAgIHVpLmhhbmRsZS5jaGlsZE5vZGVzWzBdLmlubmVySFRNTCA9ICckJyArIHVpLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmFwcGVuZChsZWdlbmQpO1xuXG4gICAgICAgICAgLy8gRm9ybSBhY2NvcmRpb25cbiAgICAgICAgICAkKCBcIi50YWJsaXN0XCIgKS5hY2NvcmRpb24oe1xuICAgICAgICAgICAgaGVhZGVyOiBcIi5hbWFfX2Zvcm0tc3RlcHNfX3N0ZXBcIixcbiAgICAgICAgICAgIGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIlxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gRXhwYW5kIGxpc3RcbiAgICAgICAgICAkKCBcIi5hbWFfX2V4cGFuZC1saXN0XCIgKS5hY2NvcmRpb24oe1xuICAgICAgICAgICAgbXVsdGlwbGU6IHRydWUsXG4gICAgICAgICAgICBpY29uczogZmFsc2UsXG4gICAgICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCIsXG4gICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBhbmltYXRlOiA1MDAsXG4gICAgICAgICAgICBhY3RpdmF0ZSA6IGZ1bmN0aW9uIChldmVudCwgdWkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlmKCQodWkubmV3UGFuZWwpLmhhc0NsYXNzKCd1aS1hY2NvcmRpb24tY29udGVudC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICQodWkubmV3UGFuZWwpLnByZXYoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCh1aS5vbGRQYW5lbCkucHJldigpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gQ29sbGFwc2UgYWxsIGFjY29yZGlvbiBwYW5lbHNcbiAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX2NvbGxhcHNlLXBhbmVscyBidXR0b24nKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmFtYV9fZXhwYW5kLWxpc3QgLnVpLWFjY29yZGlvbi1oZWFkZXInKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygndWktc3RhdGUtYWN0aXZlJykgfHwgJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gT3BlbiBhY2NvcmRpb24gcGFuZWxzIGZvciBtb2JpbGVcbiAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcuYW1hX19leHBhbmQtbGlzdCwgLmFtYV9fYXBwbGllZC1maWx0ZXJzX190YWdzJykuc2xpZGVEb3duKCk7XG4gICAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX3NlZS1yZXN1bHRzJykuZmFkZUluKCk7XG4gICAgICAgICAgICAkKHRoaXMpLmZhZGVPdXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIENsb3NlIGFjY29yZGlvbiBwYW5lbHNcbiAgICAgICAgICAkKCcuYW1hX19maWx0ZXJfX3NlZS1yZXN1bHRzJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5hbWFfX2V4cGFuZC1saXN0LCAuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3RhZ3MnKS5zbGlkZVVwKCk7XG4gICAgICAgICAgICAkKCcuYW1hX19hcHBsaWVkLWZpbHRlcnNfX3Nob3ctZmlsdGVycycpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCh0aGlzKS5mYWRlT3V0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBzZWFyY2ggZmlsdGVyXG4gICAgICAgICAgZnVuY3Rpb24gbGlzdEZpbHRlcihpbnB1dCwgbGlzdCkgeyAvLyBoZWFkZXIgaXMgYW55IGVsZW1lbnQsIGxpc3QgaXMgYW4gdW5vcmRlcmVkIGxpc3RcbiAgICAgICAgICAgIC8vIGN1c3RvbSBjc3MgZXhwcmVzc2lvbiBmb3IgYSBjYXNlLWluc2Vuc2l0aXZlIGNvbnRhaW5zKClcbiAgICAgICAgICAgIGpRdWVyeS5leHByWyc6J10uQ29udGFpbnMgPSBmdW5jdGlvbihhLGksbSl7XG4gICAgICAgICAgICAgIHJldHVybiAoYS50ZXh0Q29udGVudCB8fCBhLmlubmVyVGV4dCB8fCBcIlwiKS50b1VwcGVyQ2FzZSgpLmluZGV4T2YobVszXS50b1VwcGVyQ2FzZSgpKT49MDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICQoaW5wdXQpLmNoYW5nZSggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB2YXIgZmlsdGVyID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgaWYoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBmaW5kcyBhbGwgbGlua3MgaW4gYSBsaXN0IHRoYXQgY29udGFpbiB0aGUgaW5wdXQsXG4gICAgICAgICAgICAgICAgLy8gYW5kIGhpZGUgdGhlIG9uZXMgbm90IGNvbnRhaW5pbmcgdGhlIGlucHV0IHdoaWxlIHNob3dpbmcgdGhlIG9uZXMgdGhhdCBkb1xuICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcInNwYW46bm90KDpDb250YWlucyhcIiArIGZpbHRlciArIFwiKSlcIikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcInNwYW46Q29udGFpbnMoXCIgKyBmaWx0ZXIgKyBcIilcIikucGFyZW50KCkuc2hvdygpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQobGlzdCkuZmluZChcImxhYmVsXCIpLnNob3coKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIC8vIG9ubHkgc2hvdyByZXN1bHRzIGFmdGVyIDMgY2hhcmFjdGVycyBhcmUgZW50ZXJlZFxuICAgICAgICAgICAgfSkua2V5dXAoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiggdGhpcy52YWx1ZS5sZW5ndGggPCA0ICkgcmV0dXJuO1xuICAgICAgICAgICAgICAkKHRoaXMpLmNoYW5nZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdEZpbHRlcigkKFwiI2FtYV9fc2VhcmNoX19sb2NhdGlvblwiKSwgJChcIi5hbWFfX2Zvcm0tZ3JvdXBcIikpO1xuXG4gICAgICAgIH0pO1xuICAgICAgfSkoalF1ZXJ5KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBSaWJib24gbmF2IHVzZXIgaW50ZXJhY3Rpb25zLlxuICpcbiAqIEphdmFTY3JpcHQgc2hvdWxkIGJlIG1hZGUgY29tcGF0aWJsZSB3aXRoIGxpYnJhcmllcyBvdGhlciB0aGFuIGpRdWVyeSBieVxuICogd3JhcHBpbmcgaXQgd2l0aCBhbiBcImFub255bW91cyBjbG9zdXJlXCIuIFNlZTpcbiAqIC0gaHR0cHM6Ly9kcnVwYWwub3JnL25vZGUvMTQ0NjQyMFxuICogLSBodHRwOi8vd3d3LmFkZXF1YXRlbHlnb29kLmNvbS8yMDEwLzMvSmF2YVNjcmlwdC1Nb2R1bGUtUGF0dGVybi1Jbi1EZXB0aFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuXG4gIERydXBhbC5iZWhhdmlvcnMucmliYm9ubmF2ID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG5cbiAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsYXNzX2FjdGl2ZSA9ICdpcy1hY3RpdmUnO1xuXG4gICAgICAgICQoJy5hbWFfX3JpYmJvbl9fZHJvcGRvd25fX3RyaWdnZXInLCB0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAvLyBVbmZvY3VzIG9uIHRoZSBkcm9wZG93bi5cbiAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcbiAgICAgICAgICAvLyBBZGQgb3VyIGNsYXNzIGZvciBDU1MuXG4gICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICAgIC8vIEFkZCBvdXIgY2xhc3MgdG8gdGhlIGRyb3Bkb3duIFVMLlxuICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oKS50b2dnbGVDbGFzcyhjbGFzc19hY3RpdmUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayggZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCcuYW1hX19yaWJib25fX2Ryb3Bkb3duX190cmlnZ2VyJywgdGhpcykucmVtb3ZlQ2xhc3MoY2xhc3NfYWN0aXZlKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKGNsYXNzX2FjdGl2ZSlcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgIH1cbiAgfVxufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyoqXG4gKiBAZmlsZVxuICogU3ViY2F0ZWdvcnlcbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5zdWJjYXRlZ29yaWVzID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3MpIHtcblxuICAgICAgZnVuY3Rpb24gY2hlY2tTaXplKCl7XG4gICAgICAgIHZhciBzdWJjYXRlZ29yeVdyYXBwZXIgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlcycpLm91dGVyV2lkdGgoKTtcbiAgICAgICAgdmFyIHN1YmNhdGVnb3J5VGl0bGUgPSAkKCcuYW1hX19zdWJjYXRlZ29yeS1leHBsb3JhdGlvbi13aXRoLWltYWdlc19fdGl0bGUnKS5vdXRlcldpZHRoKCk7XG4gICAgICAgIHN1YmNhdGVnb3J5ID0gJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb25fX3N1YmNhdGVnb3J5Jyk7XG4gICAgICAgIHN1YmNhdGVnb3J5LmhpZGUoKTtcblxuICAgICAgICBpZiAoc3ViY2F0ZWdvcnlXcmFwcGVyID4gMCAmJiBzdWJjYXRlZ29yeVdyYXBwZXIgPCAyOTAgJiYgc3ViY2F0ZWdvcnlUaXRsZSA+IDIwMCApIHtcbiAgICAgICAgICBzdWJjYXRlZ29yeS5zbGljZSgwLCAyKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdWJjYXRlZ29yeVdyYXBwZXIgPiAyOTAgJiYgc3ViY2F0ZWdvcnlXcmFwcGVyIDwgNjAwICYmIHN1YmNhdGVnb3J5VGl0bGUgPiAyMDAgKSB7XG4gICAgICAgICAgc3ViY2F0ZWdvcnkuc2xpY2UoMCwgMykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHN1YmNhdGVnb3J5V3JhcHBlciA+IDMwMCAmJiBzdWJjYXRlZ29yeVdyYXBwZXIgPCA3MDApICYmIHN1YmNhdGVnb3J5VGl0bGUgPCAyMDApIHtcbiAgICAgICAgICBzdWJjYXRlZ29yeS5zbGljZSgwLCAyKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgfSBlbHNlIGlmICgoc3ViY2F0ZWdvcnlXcmFwcGVyID4gNzAwICYmIHN1YmNhdGVnb3J5V3JhcHBlciA8IDEwMDApICYmIHN1YmNhdGVnb3J5VGl0bGUgPCAyMDApIHtcbiAgICAgICAgICBzdWJjYXRlZ29yeS5zbGljZSgwLCAzKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgfSBlbHNlIGlmICgoc3ViY2F0ZWdvcnlXcmFwcGVyID4gMTAwMCAmJiBzdWJjYXRlZ29yeVdyYXBwZXIgPCAxMjAwKSAmJiBzdWJjYXRlZ29yeVRpdGxlIDwgMjAwKSB7XG4gICAgICAgICAgc3ViY2F0ZWdvcnkuc2xpY2UoMCwgNCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3ViY2F0ZWdvcnkuc2xpY2UoMCwgNSkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdmlld01vcmUoKSB7XG4gICAgICAgICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWxlc3MnKS5oaWRlKCk7XG4gICAgICAgICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWFsbCcpLnNob3coKTtcblxuICAgICAgICAkKCcudmlld0FsbCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3ViY2F0ZWdvcnkuZmFkZUluKCk7XG4gICAgICAgICAgJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctYWxsJykuaGlkZSgpO1xuICAgICAgICAgICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWxlc3MnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy52aWV3TGVzcycpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3ViY2F0ZWdvcnkuaGlkZSgpO1xuICAgICAgICAgIGNoZWNrU2l6ZSgpO1xuICAgICAgICAgICQoJy5hbWFfX3N1YmNhdGVnb3J5LWV4cGxvcmF0aW9uLXdpdGgtaW1hZ2VzX192aWV3LWxlc3MnKS5oaWRlKCk7XG4gICAgICAgICAgJCgnLmFtYV9fc3ViY2F0ZWdvcnktZXhwbG9yYXRpb24td2l0aC1pbWFnZXNfX3ZpZXctYWxsJykuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gcnVuIHRlc3Qgb24gaW5pdGlhbCBwYWdlIGxvYWRcbiAgICAgIGNoZWNrU2l6ZSgpO1xuICAgICAgdmlld01vcmUoKTtcblxuICAgICAgLy8gcnVuIHRlc3Qgb24gcmVzaXplIG9mIHRoZSB3aW5kb3dcbiAgICAgICQoIHdpbmRvdyApLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICAgY2hlY2tTaXplKCk7XG4gICAgICAgIHZpZXdNb3JlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIvKipcbiAqIEBmaWxlXG4gKiBJbnRlcmFjdGlvbnMgZm9yIHdheWZpbmRlci5cbiAqXG4gKiBKYXZhU2NyaXB0IHNob3VsZCBiZSBtYWRlIGNvbXBhdGlibGUgd2l0aCBsaWJyYXJpZXMgb3RoZXIgdGhhbiBqUXVlcnkgYnlcbiAqIHdyYXBwaW5nIGl0IHdpdGggYW4gXCJhbm9ueW1vdXMgY2xvc3VyZVwiLiBTZWU6XG4gKiAtIGh0dHBzOi8vZHJ1cGFsLm9yZy9ub2RlLzE0NDY0MjBcbiAqIC0gaHR0cDovL3d3dy5hZGVxdWF0ZWx5Z29vZC5jb20vMjAxMC8zL0phdmFTY3JpcHQtTW9kdWxlLVBhdHRlcm4tSW4tRGVwdGhcbiAqL1xuKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy53YXlmaW5kZXIgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICBpZigkLmNvb2tpZSgnYW1hX3dheWZpbmRlcl9jb29raWUnKSkge1xuICAgICAgICAgICQuY29va2llLmpzb24gPSB0cnVlO1xuICAgICAgICAgIC8vIFJlYWQgd2F5ZmluZGVyIGNvb2tpZXMgc2V0IGZyb20gYW1hLWFzc24gZG9tYWluc1xuICAgICAgICAgIHZhciBhbWFfd2F5ZmluZGVyX2Nvb2tpZSA9ICQuY29va2llKCdhbWFfd2F5ZmluZGVyX2Nvb2tpZScpO1xuICAgICAgICAgIGlmICh0eXBlb2YgYW1hX3dheWZpbmRlcl9jb29raWUgIT09ICd1bmRlZmluZWQnIHx8ICQoJy5yZWZlcnJlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQoJy5hbWFfX3dheWZpbmRlci0tcmVmZXJyZXIgYScpLmZhZGVJbigpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XG4gICAgICAgICAgICAkKCcuYW1hX193YXlmaW5kZXItLXJlZmVycmVyIGEnKS5hdHRyKFwiaHJlZlwiLCBhbWFfd2F5ZmluZGVyX2Nvb2tpZVsxXSk7XG4gICAgICAgICAgICAkKCcuYW1hX193YXlmaW5kZXItLXJlZmVycmVyIGEnKS50ZXh0KGFtYV93YXlmaW5kZXJfY29va2llWzBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmFtYV93YXlmaW5kZXJfcmVmZXJyZXItLWxpbmstYmFjaycpLmZhZGVPdXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKGpRdWVyeSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyo9PT09PT0galF1ZXJ5IFVJIHRhYnMgPT09PT09Ki9cblxuXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV90YWJzID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICB2YXIgZGVmYXVsdEFjdGl2ZVRhYiA9IDA7XG4gICAgICB2YXIgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgdmFyIGxhc3RIYXNoID0gbnVsbDtcbiAgICAgIGlmICh2aWV3cG9ydFdpZHRoID49IDYwMCAmJiAkKCcuYW1hX19yZXNvdXJjZS10YWJzJykubGVuZ3RoID4gMCkge1xuICAgICAgICBkZWZhdWx0QWN0aXZlVGFiID0gMTtcbiAgICAgIH1cblxuICAgICAgJChcIi5hbWFfX3RhYnNcIikudGFicyh7XG4gICAgICAgIGFjdGl2ZTogZGVmYXVsdEFjdGl2ZVRhYlxuICAgICAgfSk7XG5cbiAgICAgIC8vUmVzb3VyY2UgcGFnZSBzcGVjaWZpYyB0YWdzXG4gICAgICAkKFwiLmFtYV9fcmVzb3VyY2UtdGFic1wiKS50YWJzKHtcbiAgICAgICAgYWN0aXZlOiBkZWZhdWx0QWN0aXZlVGFiLFxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgd2lkZ2V0ID0gJCh0aGlzKS5kYXRhKCd1aS10YWJzJyk7XG4gICAgICAgICAgJCh3aW5kb3cpLm9uKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2lkZ2V0Lm9wdGlvbignYWN0aXZlJywgd2lkZ2V0Ll9nZXRJbmRleChsb2NhdGlvbi5oYXNoKSk7XG4gICAgICAgICAgICBsYXN0SGFzaCA9IGxvY2F0aW9uLmhhc2g7XG5cbiAgICAgICAgICAgIC8vIFNjcm9sbCB0byB0b3Agb2YgdWkgdGFicyBuYXZpZ2F0aW9uXG4gICAgICAgICAgICBzbW9vdGhTY3JvbGwoJCh3aWRnZXQuZWxlbWVudCksICQod2lkZ2V0LmFjdGl2ZVswXSkpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gUHJldmVudCBqdW1wIG9uY2xpY2tcbiAgICAgICQoJy51aS10YWJzLWFuY2hvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIFN0b3JlIHdpbmRvdyB5IGxvY2F0aW9uIHNvIHdlIGNhbiByZXN0b3JlIGFmdGVyIGNoYW5naW5nIHRoZSBoYXNoXG4gICAgICAgIC8vIHdoaWNoIHdvdWxkIG90aGVyd2lzZSBjYXVzZSB0aGUgd2luZG93IHRvIGp1bXAgZG93bi5cbiAgICAgICAgdmFyIHdpbmRvd1Njcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgLy8gVXBkYXRlIHdpbmRvdyBoYXNoIGxvY2F0aW9uLCBhbmQgcmVzdG9yZSB0byBwcmV2aW91cyB5LXBvc2l0aW9uLlxuICAgICAgICAvLyBVc2UgY3VycmVudFRhcmdldCBiZWNhdXNlIHRhcmdldCBpcyBzb21ldGltZXMgdGhlIGljb24gZGl2LlxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGUuY3VycmVudFRhcmdldC5oYXNoO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsKHt0b3A6IHdpbmRvd1Njcm9sbFl9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTY3JvbGwgdG8gd2hlbiB0aGVyZSBpcyBubyBoYXMgY2hhbmdlIG9uIHJlc291cmNlIHBhZ2UgdGFiIGxpbmtzXG4gICAgICAkKCcuYW1hX19fX3BhZ2UtLXJlc291cmNlc19fcGFnZS1jb250ZW50IGFbaHJlZl49XCIjXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGxhc3RIYXNoID09IHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgICAgICBzbW9vdGhTY3JvbGwoJCgnLmFtYV9fcmVzb3VyY2UtdGFic19fbmF2JyksICQoJy5hbWFfX3Jlc291cmNlLXRhYnNfX25hdiBhW2hyZWY9XCInICsgaGFzaCArICdcIl0nKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvL1NpbXVsYXRlIGNsaWNrIGV2ZW50IG9uIGFjdHVhbCBzaW1wbGVUYWJzIHRhYiBmcm9tIG1vYmlsZSBkcm9wIGRvd24uXG4gICAgICAkKCcuYW1hX190YWJzLW5hdmlnYXRpb24tLW1vYmlsZSBzZWxlY3QnKS5vbihcInNlbGVjdG1lbnVjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9IHVpLml0ZW0udmFsdWU7XG4gICAgICAgICQoJ2FbaHJlZj1cIiMnICsgc2VsZWN0ZWRWYWx1ZSArICdcIl0nKS5jbGljaygpO1xuICAgICAgfSk7XG5cbiAgICAgIC8qXG4gICAgICAgKiBUaGlzIGZ1bmN0aW9uIGFuaW1hdGVzIHRoZSBicm93c2VyIHNjcm9sbCBhY3Rpb24gd2l0aCBhdHRlbnRpb24gdG8ga2V5Ym9hcmQgb25seSBhY2Nlc3NpYmlsaXR5IGNvbmNlcm5zXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtqUXVlcnkgT2JqZWN0XSAkdGFiTmF2XG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3RdICR0YXJnZXRcbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKCR0YWJOYXYsICR0YXJnZXQpIHtcbiAgICAgICAgdmFyIG5hdkNvb3JkcyA9ICR0YWJOYXZbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogd2luZG93LnNjcm9sbFkgKyBuYXZDb29yZHMudG9wXG4gICAgICAgIH0sIDg1MCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIHVwZGF0ZSBmb2N1cyBmb3Iga2V5Ym9hcmQgb25seSBuYXZpZ2F0aW9uXG4gICAgICAgICAgJHRhcmdldC5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICAgICR0YXJnZXQuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiLyo9PT09PT0galF1ZXJ5IFVJIGFjY29yZGlvbiA9PT09PT0qL1xuXG4oZnVuY3Rpb24oJCkge1xuICAgICQoIFwiLmFtYV9fYWNjb3JkaW9uXCIgKS5hY2NvcmRpb24oe1xuICAgICAgICBoZWlnaHRTdHlsZTogXCJjb250ZW50XCIsXG4gICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgfSk7XG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgdmFyIHZlcmlmeUZpZWxkcyA9IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICB2YXIgJHNlY3Rpb25zID0gZm9ybS5maW5kKCdzZWN0aW9uJyk7XG4gICAgdmFyICRpbnB1dHMgPSAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gc2VjdGlvbiAqJykuZmlsdGVyKCc6aW5wdXQnKTtcbiAgICB2YXIgJGljb25FbGVtZW50ID0gJCgnLmFtYV9fZm9ybS1zdGVwc19faWNvbicpO1xuICAgIHZhciBlcnJvclNlY3Rpb25zID0gW107XG5cbiAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24oaSwgaW5wdXQpIHtcbiAgICAgICRjbG9zZXN0U2VjdGlvbiA9ICQodGhpcykuY2xvc2VzdCgnc2VjdGlvbicpLmF0dHIoJ2RhdGEtZHJ1cGFsLXNlbGVjdG9yJykudG9TdHJpbmcoKTtcbiAgICAgIGlmICgkKHRoaXMpLnByb3AoJ3JlcXVpcmVkJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXJyb3InKSkge1xuICAgICAgICBlcnJvclNlY3Rpb25zLnB1c2goJGNsb3Nlc3RTZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRzZWN0aW9ucy5lYWNoKGZ1bmN0aW9uKGksIHNlY3Rpb24pIHtcbiAgICAgIGlmICgkLmluQXJyYXkoJCh0aGlzKS5hdHRyKCdkYXRhLWRydXBhbC1zZWxlY3RvcicpLnRyaW0oKS50b1N0cmluZygpLCBlcnJvclNlY3Rpb25zKSAhPT0gLTEpIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCRpY29uRWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2VkaXQgZXJyb3IgY29tcGxldGVkJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCRpY29uRWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2VkaXQgZXJyb3IgY29tcGxldGVkJykuYWRkQ2xhc3MoJ2NvbXBsZXRlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcbiAgICB2YXIgZW1haWxSZWcgPSAvXihbXFx3LVxcLl0rQChbXFx3LV0rXFwuKStbXFx3LV17Miw0fSk/JC87XG4gICAgcmV0dXJuIGVtYWlsUmVnLnRlc3QoZW1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmllbGRJc1JlcXVpcmVkKGlucHV0KSB7XG4gICAgaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgaW5wdXQubmV4dCgpLnJlbW92ZSgnLmZvcm0taXRlbS0tZXJyb3ItbWVzc2FnZScpO1xuICAgIGlucHV0LmFmdGVyKCc8ZGl2IGNsYXNzPVwiZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlXCI+RmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0ZpZWxkKGlucHV0KSB7XG4gICAgaWYgKGlucHV0LnByb3AoJ3JlcXVpcmVkJykgJiYgKGlucHV0LnZhbCgpLmxlbmd0aCA9PT0gMCB8fCBpbnB1dC52YWwoKSA9PT0gXCJcIikpIHtcbiAgICAgIGZpZWxkSXNSZXF1aXJlZChpbnB1dCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKGlucHV0LmF0dHIoJ3R5cGUnKSA9PT0gJ2VtYWlsJyAmJiAhdmFsaWRhdGVFbWFpbChpbnB1dC52YWwoKSkpIHtcbiAgICAgICAgZmllbGRJc1JlcXVpcmVkKGlucHV0KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKS5uZXh0KCkucmVtb3ZlKCcuZm9ybS1pdGVtLS1lcnJvci1tZXNzYWdlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gR28gYmFjayB0byBwcmV2aW91cyBiYWNrIGlzIHVzZXIgY2xpY2tzIGRlY2xpbmUgc3VibWl0IGJ1dHRvblxuICAkKCcuYW1hX19idXR0b24tLWRlY2xpbmUnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKGRvY3VtZW50LnJlZmVycmVyID09IFwiXCIpIHtcbiAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWY9Jy8nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhpc3RvcnkuYmFjaygpO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGluaXRpYWxMb2FkID0gdHJ1ZTtcblxuICBEcnVwYWwuYmVoYXZpb3JzLndlYkZvcm0gPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICQudmFsaWRhdG9yLmFkZE1ldGhvZChcbiAgICAgICAgXCJyZWdleFwiLFxuICAgICAgICBmdW5jdGlvbih2YWx1ZSwgZWxlbWVudCwgcmVnZXhwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgfHwgcmVnZXhwLnRlc3QodmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBcIlBsZWFzZSBjaGVjayB5b3VyIGlucHV0LlwiXG4gICAgICApO1xuXG4gICAgICAvLyBPbiB3ZWJmb3JtIHN1Ym1pdCBjaGVjayB0byBzZWUgaWYgYWxsIGlucHV0cyBhcmUgdmFsaWRcbiAgICAgICQoJy53ZWJmb3JtLXN1Ym1pc3Npb24tZm9ybScpLnZhbGlkYXRlKHtcbiAgICAgICAgaWdub3JlOiBbXSxcbiAgICAgICAgcnVsZXM6IHtcbiAgICAgICAgICAnZW1haWwnOiB7XG4gICAgICAgICAgICBlbWFpbDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ3RlbGVwaG9uZSc6IHtcbiAgICAgICAgICAgICdyZWdleCc6IC9eKFxcK1xcZHsxLDJ9XFxzKT9cXCg/XFxkezN9XFwpP1tcXHMuLV0/XFxkezN9W1xccy4tXT9cXGR7NH0kL1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2JpcnRoX3llYXInOiB7XG4gICAgICAgICAgICAncmVnZXgnOiAvXigxOXwyMClcXGR7Mn0kL1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uKGVycm9yLCBlbGVtZW50KSB7XG4gICAgICAgICAgaWYgKGVsZW1lbnQuYXR0cihcInR5cGVcIikgPT09IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgZXJyb3IuaW5zZXJ0QWZ0ZXIoZWxlbWVudC5wYXJlbnQoKS5zaWJsaW5ncygpLmxhc3QoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnQuaXMoXCJzZWxlY3RcIikpIHtcbiAgICAgICAgICAgIGVycm9yLmluc2VydEFmdGVyKGVsZW1lbnQubmV4dCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlcnJvci5pbnNlcnRBZnRlcihlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWRIYW5kbGVyOiBmdW5jdGlvbihmb3JtLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgICB2YXIgZXJyb3JzID0gdmFsaWRhdG9yLm51bWJlck9mSW52YWxpZHMoKTtcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoJCgnLmpzLWZvcm0tdHlwZS1yYWRpbycpLmZpbmQoJ2xhYmVsLmVycm9yJykubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAkKCcuanMtZm9ybS10eXBlLXJhZGlvIGxhYmVsLmVycm9yJykucGFyZW50cygnLmZpZWxkc2V0LXdyYXBwZXInKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBDaGVjayB0byBzZWUgaWYgaW5wdXRzIGFyZSB2YWxpZFxuICAgICAgJCgnLndlYmZvcm0tc3VibWlzc2lvbi1mb3JtIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gbGFiZWwuZXJyb3InKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKCAkKHRoaXMpLnRleHQoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICQoJy5hbWFfX2Zvcm0tc3RlcHNfX2ljb24nKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkKCcuYW1hX19mb3JtLXN0ZXBzX19pY29uJykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBBZGQgdmFsaWRhdGlvbiB0byBzZWxlY3QgZHJvcGRvd24gbWVudXMgdXNpbmcgalF1ZXJ5IFVJXG4gICAgICAkKCcud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm0gc2VsZWN0Jykuc2VsZWN0bWVudSh7XG4gICAgICAgIHN0eWxlOiAnZHJvcGRvd24nLFxuICAgICAgICB0cmFuc2ZlckNsYXNzZXM6IHRydWUsXG4gICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQoXCIud2ViZm9ybS1zdWJtaXNzaW9uLWZvcm1cIikudmFsaWRhdGUoKS5lbGVtZW50KHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIERydXBhbCk7XG4iLCIoZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmFtYV9tYWluTmF2aWdhdGlvbiA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuXG4gICAgICB2YXIgY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudSA9ICQoJy5hbWFfY2F0ZWdvcnlfbmF2aWdhdGlvbl9tZW51Jyk7XG5cbiAgICAgIC8vIEhpZGUvU2hvdyBtZW51XG4gICAgICBmdW5jdGlvbiBoaWRlU2hvdygpIHtcbiAgICAgICAgaWYoJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgY2F0ZWdvcnlOYXZpZ2F0aW9uTWVudS5zbGlkZURvd24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYXRlZ29yeU5hdmlnYXRpb25NZW51LnNsaWRlVXAoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAkKCcuYW1hX19nbG9iYWwtbWVudScpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBoaWRlU2hvdygpO1xuICAgICAgfSk7XG5cbiAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCFjYXRlZ29yeU5hdmlnYXRpb25NZW51LmlzKGUudGFyZ2V0KSAmJiBjYXRlZ29yeU5hdmlnYXRpb25NZW51LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJCgnI2dsb2JhbC1tZW51JykucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgIGhpZGVTaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgRHJ1cGFsKTtcbiIsIi8qKlxuICogU21hcnRNZW51cyBqUXVlcnkgUGx1Z2luIC0gdjEuMS4wIC0gU2VwdGVtYmVyIDE3LCAyMDE3XG4gKiBodHRwOi8vd3d3LnNtYXJ0bWVudXMub3JnL1xuICpcbiAqIENvcHlyaWdodCBWYXNpbCBEaW5rb3YsIFZhZGlrb20gV2ViIEx0ZC5cbiAqIGh0dHA6Ly92YWRpa29tLmNvbVxuICpcbiAqIExpY2Vuc2VkIE1JVFxuICovXG4oZnVuY3Rpb24gKCQsIERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLmNhdGVnb3J5TWVudSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgJCgnLmFtYV9jYXRlZ29yeV9uYXZpZ2F0aW9uX21lbnVfX2dyb3VwJykuc21hcnRtZW51cyh7XG4gICAgICAgIG1haW5NZW51U3ViT2Zmc2V0WDogMjUwLFxuICAgICAgICBtYWluTWVudVN1Yk9mZnNldFk6IDIwLFxuICAgICAgICBrZWVwSW5WaWV3cG9ydDogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIiwiKGZ1bmN0aW9uICgkLCBEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5hbWFfc2lnbkluTWVudSA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgdmFyIHNpZ25JbkRyb3Bkb3duID0gJCgnLmFtYV9fc2lnbi1pbi1kcm9wZG93bicpO1xuICAgICAgdmFyIHNpZ25JbkRyb3Bkb3duTWVudSA9ICQoJy5hbWFfX3NpZ24taW4tZHJvcGRvd25fX21lbnUnKTtcbiAgICAgIHZhciBleHBsb3JlTWVudSA9ICQoJy5hbWFfX2V4cGxvcmUtbWVudScpO1xuICAgICAgdmFyIGV4cGxvcmVNZW51RHJvcGRvd24gPSAkKCcuYW1hX19leHBsb3JlLW1lbnVfX21lbnUnKTtcblxuICAgICAgZnVuY3Rpb24gZHJvcGRvd25Eb3duTWVudShwYXJlbnRFbGVtZW50LCBtZW51RWxlbWVudCkge1xuXG4gICAgICAgIHBhcmVudEVsZW1lbnQudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgJChtZW51RWxlbWVudCkuc2xpZGVUb2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgb2YgdGhlIGNsaWNrIGlzbid0IHRoZSBjb250YWluZXIgbm9yIGEgZGVzY2VuZGFudCBvZiB0aGUgY29udGFpbmVyXG4gICAgICAgICAgaWYgKCFwYXJlbnRFbGVtZW50LmlzKGUudGFyZ2V0KSAmJiBwYXJlbnRFbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAkKG1lbnVFbGVtZW50KS5zbGlkZVVwKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU2V0IHRpbWVvdXQgZm9yIHdoZW4gYSB1c2VyIG1vdXNlcyBvdXQgb2YgdGhlIG1lbnVcbiAgICAgICAgICBwYXJlbnRFbGVtZW50Lm1vdXNlZW50ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCgpO1xuICAgICAgICAgIH0pLm1vdXNlbGVhdmUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJChtZW51RWxlbWVudCkuc2xpZGVVcCgpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBkcm9wZG93bkRvd25NZW51KHNpZ25JbkRyb3Bkb3duLCBzaWduSW5Ecm9wZG93bk1lbnUpO1xuICAgICAgZHJvcGRvd25Eb3duTWVudShleHBsb3JlTWVudSwgZXhwbG9yZU1lbnVEcm9wZG93bik7XG4gICAgfVxuICB9O1xufSkoalF1ZXJ5LCBEcnVwYWwpO1xuIl19
