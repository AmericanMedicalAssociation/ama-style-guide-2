(function ($, Drupal) {
  Drupal.behaviors.glossary_load = {
    attach: function(context, settings) {

      $(document).ready(function() {

        var currUrl = window.location.href;

        //  look for any url query.
        var queryRegex = /\?/i;
        //  look for an empty name search
        var emptyRegex = /topic\=$/i;
        //  look for any topic being searched.
        var regex = /topic=(.*?)&|&topic=.*/i;

        //  'All' option should never be selected
        if($('#edit-name--2 a[name="name[All]"]').hasClass('bef-link--selected')) {
          $('#edit-name--2 a[name="name[All]"]').removeClass('bef-link--selected');
        }

        //  Check the url, if there is no active query or a blank search, highlight 'A'.
        if(!queryRegex.test(currUrl) || emptyRegex.test(currUrl)) {
          $('#edit-name--2 a[name="name[1]"]').addClass('bef-link--selected');
        }

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
