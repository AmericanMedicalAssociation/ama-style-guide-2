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
      $('.ama____page--resources__page-content a[href^="#"]').on('click',function (e) {
        if(lastHash == window.location.hash){
          var hash = window.location.hash;
          smoothScroll($('.ama__resource-tabs__nav'),$('.ama__resource-tabs__nav a[href="'+hash+'"]'));
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
