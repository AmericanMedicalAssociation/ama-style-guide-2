(function ($, Drupal) {
  Drupal.behaviors.glossary_load = {
    attach: function(context, settings) {

      $(document).ready(function() {
        var regex = /topic=(.*?)&|&topic=.*/i;
        $('#edit-name--2 a.bef-link').once().each(function (i, link) {
          var oldUrl = $(link).attr("href");
          if(regex.test(oldUrl)) {
            var newUrl = oldUrl.replace(regex, '');
            $(link).attr("href", newUrl);
          }
        })
      })

    }
  };
})(jQuery, Drupal);
