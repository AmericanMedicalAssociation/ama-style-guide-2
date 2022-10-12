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
        item.label = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
        return $("<li>")
            .attr("data-value", item.value)
            .append(item.label)
            .appendTo(ul);
      };
      const statesAndMajorUSCities = ['Alabama', 'Alaska', 'Arizona','Arlington', 'Arkansas','Atlanta', 'Aurora', 'Boston', 'Buffalo', 'Boise', 'Birmingham', 'California', 'Chicago', 'Cincinnati', 'Cleveland', 'Colorado', 'Columbus', 'Connecticut', 'Dallas', 'Delaware', 'Detroit', 'Denver', 'Enid', 'Everett', 'Florida', 'Fort Collins', 'Fullerton', 'Georgia', 'Glendale', 'Grand Rapids', 'Hawaii', 'Houston', 'Idaho', 'Illinois', 'Indiana', 'Indianapolis', 'Iowa', 'Jacksonville', 'Jersey City', 'Joliet', 'Kansas', 'Kentucky', 'Knoxville', 'Los Angeles', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Miami', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma','Oklahoma City','Omaha', 'Oregon', 'Orlando', 'Pennsylvania', 'Phoenix', 'Philadelphia', 'Pittsburgh', 'Rockford', 'Rhode Island', 'Rochester', 'San Diego', 'San Antonio', 'San Jose', 'Seattle', 'South Carolina', 'South Dakota', 'Tampa', 'Tennessee', 'Texas', 'Tucson', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
      // The id of the textfield.
      $( "#autoCompleteStates" ).autocomplete({
        classes: {
          "ui-autocomplete" : "dr-finder-autocomplete",
        },
        minLength: 2,
        source: statesAndMajorUSCities,
      });
    }
  };
})(jQuery, Drupal);