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
        var scrollTarget = window.innerWidth >= 1200 ? '.ama__resource-tabs__content' : 'html,body';
        $(scrollTarget).animate({
          scrollTop: 0
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
