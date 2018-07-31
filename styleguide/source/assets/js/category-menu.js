(function ($, Drupal) {
  Drupal.behaviors.ama_categoryMenu = {
    attach: function (context, settings) {
      // Category Menu
      var categoryMenuSection = $('.ama_category_navigation_menu__section');
      var categoryMenuSectionFlyout = '.ama_category_navigation_menu__flyout';
      var categoryMenuCaret = '.ama_category_navigation_menu__section__caret';
      var timer;

      function openSubmenu(menu) {
        $(menu).children(categoryMenuSectionFlyout).show();
      }

      function closeSubmenu(menu) {
        $(menu).children(categoryMenuSectionFlyout).hide();
      }

      function flyOutStyle(menu) {
        // Show/hide carets
        $(categoryMenuSection).each(function(){
          if($(this).children(categoryMenuSectionFlyout).length > 0) {
            $(this).find(categoryMenuCaret).show();
          }
        });

        // Determines whether or not to use an accordion or flyout menu
        if($(categoryMenuSectionFlyout).css('position') === 'absolute') {
          // When the flyout menu is absolute then use desktop style
          categoryMenuSection.on("mouseover", function() {
            var $this = this;
            clearTimeout(timer);
            timer = setTimeout(function(){
              openSubmenu($this);
            }, 500 );
            // openSubmenu($this);
          }).on("mouseleave", function() {
            var $this = this;
            clearTimeout(timer);
            closeSubmenu($this);
          });
        } else {
          // If the flyout menu is not position absolute then it must be mobile. Use accordion
          categoryMenuSection.click(function() {
            $(this).toggleClass('active');
            $(this).children(categoryMenuSectionFlyout).slideToggle();
          });
        }
      }

      // Invoke the menu
      flyOutStyle();

      $(window).resize(function() {
        // This is just so testers will be happy when resizing the window the method will check if what style of menu to use
        flyOutStyle();
      });
    }
  };
})(jQuery, Drupal);
