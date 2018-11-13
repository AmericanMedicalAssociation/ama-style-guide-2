/**
 * @file
 * Responsive Tables.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($, Drupal) {
  Drupal.behaviors.responsiveTables = {
    attach: function(context, settings) {

      var $tableCols = 0;

      $('table tbody tr').each(function(){

        var $currCount = 0;

        $(this).children('td').each(function(){

          $currCount++;

          var $colSpan = $(this).attr('colspan');

          if ($colSpan > 0) {
            $currCount = $currCount + ($colSpan - 1);
          }

          if ($currCount > $tableCols) {
            $tableCols = $currCount;
          }
        }); // next td

        if($currCount > 5) {
         $(this).parent().parent().addClass('table-list');
        }
      });

      $('th', context).each(function () {
        var eq = $(this).index();
        var child = eq + 1;
        var label = $(this).text();
        $("td:nth-child(" + child + ")").append('&nbsp;').attr('data-title', label).addClass('responsive');
      });
    }
  };
})(jQuery, Drupal);
