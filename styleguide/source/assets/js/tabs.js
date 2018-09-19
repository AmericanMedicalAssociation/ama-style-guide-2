/*====== jQuery UI tabs ======*/


(function ($, Drupal) {
  Drupal.behaviors.ama_tabs = {
    attach: function (context, settings) {
      var defaultActiveTab = 0;
      var viewportWidth = window.innerWidth;
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
          });
        }
      });

      // Prevent jump onclick
      $('.ui-tabs-anchor').on('click', function (e) {
        // Use e.currentTarget because e.target is sometimes the icon div
        var url = new URL(e.currentTarget.href);
        // Store window y location so we can restore after changing the hash
        // which would otherwise cause the window to jump down
        var windowScrollY = window.scrollY;
        // Update window hash location, and restore to previous y-position
        window.location.hash = url.hash;
        window.scroll({top: windowScrollY});
      });

      //Simulate click event on actual simpleTabs tab from mobile drop down.
      $('.ama__tabs-navigation--mobile select').on("selectmenuchange", function (event, ui) {
        var selectedValue = ui.item.value;
        $('a[href="#' + selectedValue + '"]').click();
      });
    }
  };
})(jQuery, Drupal);
