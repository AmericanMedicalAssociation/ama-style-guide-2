(function ($, Drupal) {
  Drupal.behaviors.autocomplete = {
    attach: function(context, settings) {

      var $autosuggestionResults = $('ul#ui-id-2');
      var $displayDiv = $('.autosuggest-wrapper');
      var $searchInput = $('.searchbar-wrapper input');
      var $curatedTopics = $('.curated-topics .topic-wrapper-autocomplete');


      //var newURL = location.href.split("?")[0];
      //window.history.pushState('object', document.title, newURL);
      //console.log('hiya');
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
