(function ($, Drupal) {
  Drupal.behaviors.autocomplete = {
    attach: function(context, settings) {

      var $autosuggestionResults = $('ul#ui-id-2');
      var $displayDiv = $('.autosuggest-wrapper');
      var $searchInput = $('.searchbar-wrapper input');
      var $curatedTopics = $('.curated-topics .topic-wrapper-autocomplete');

      /* 'ul#ui-id-2' selector is being used because the views autocomplete filter module does not apply
          identifying classes on the input field or jqueryUI ul autocomplete-element that is shown and hidden.
          This selector will only work on this particular page. If we build more of these pages, we will need to
          possibly patch the module. */


  $(document).ready(function() {
    //$autosuggestionResults.append($curatedTopics);
   // $displayDiv.append($autosuggestionResults);
    //$displayDiv.append($curatedTopics);
    //$displayDiv.append($autosuggestionResults);
/*

    $.widget("custom.autocompletefooter", $.ui.autocomplete, {
      _renderMenu: function (ul, items) {
        var self = this;
        $.each(items, function (index, item) {
          self._renderItem(ul, item);
          if (index == items.length - 1) ul.append('<li class="footer-auto"> Footer of autocomplete!!</li>');
        });
      }
    });

*/
  });



    }
  };
})(jQuery, Drupal);
