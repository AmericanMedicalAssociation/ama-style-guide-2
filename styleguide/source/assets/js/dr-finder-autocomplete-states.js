/**
 * @file
 * Autocomplete.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */

(function ($, Drupal) {
  Drupal.behaviors.autoCompleteStates = {
    attach: function (context, settings) {
      // Add bold characters in result item.
      $.ui.autocomplete.prototype._renderItem = function (ul, item) {
        item.label = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
        return $("<li></li>")
          .data("item.autocomplete", item)
          .append("<b>" + item.label + "</b>")
          .appendTo(ul);
      };

      const statesAndCities = {
        'Alabama': [
          "Birmingham",
          "Montgomery",
          "Mobile",
          "Huntsville",
          "Tuscaloosa",
        ],
        'Alaska': [
          "Anchorage",
          "Fairbanks"
        ],
      }

      $( "#autoCompleteStates" ).autocomplete({
        minLength: 2,
        autoFocus: true,
        source: statesAndCities,
      });
    }
  };
})(jQuery, Drupal);
