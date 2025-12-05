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

      $($mobileSearchTrigger).on('keydown', function(e) {
        // Check if Enter or Space is pressed and focus is on the button itself
        if ((e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) && e.target === this) {
          e.preventDefault();
          $mobileSearch.slideToggle("fast", "linear");
          $mobileSearchTrigger.toggleClass('open');
          $('#edit-search').focus();
        }
      });

      //$($mobileSearchTrigger) on escape key close the search field
      $($mobileSearch).on('keydown', function(e) {
        if ((e.key === 'Escape' || e.keyCode === 27)) {
          if ($mobileSearch.is(':visible')) {
            $mobileSearch.slideUp("fast", "linear");
            $mobileSearchTrigger.removeClass('open');
            $mobileSearchTrigger.focus();
          }
        }
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



