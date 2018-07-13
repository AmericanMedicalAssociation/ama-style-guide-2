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
                active: defaultActiveTab,
                create: function () {
                    var widget = $(this).data('ui-tabs');
                    $(window).on('hashchange', function () {
                        widget.option('active', widget._getIndex(location.hash));
                    });
                }
            });

            // Prevent jump onclick
            $('.ama__resource-tabs__nav a, .ama__tabs-navigation a').on('click', function (e) {
                e.preventDefault();
                return false;
            });

            //Simulate click event on actual simpleTabs tab from mobile drop down.
            $('.ama__tabs-navigation--mobile select').on("selectmenuchange", function (event, ui) {
                var selectedValue = ui.item.value;
                $('a[href="#' + selectedValue + '"]').click();
            });
        }
    };
})(jQuery, Drupal);
