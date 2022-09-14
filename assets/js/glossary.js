(function ($, Drupal) {
  Drupal.behaviors.glossary_load = {
    attach: function(context, settings) {

      $(document).ready(function() {

        var currUrl = window.location.href;

        //  look for any topic being searched.
        var regex = /topic=(.*?)&|&topic=.*/i;

        //  Loop through the filter links looking for a topic query parameter. If there is one, strip it out.
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
