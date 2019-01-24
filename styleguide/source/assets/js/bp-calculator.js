/**
 * @file
 * bp calculator.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an 'anonymous closure'. See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */

(function ($, Drupal) {
  Drupal.behaviors.bpCalculator = {
    attach: function (context, settings) {

      // Clone last row of table
      $('.add-bp-row').click(function(e){
        e.preventDefault();
        var $tableBody = $('#bpCalculator table').find('tbody'),
          $trLast = $tableBody.find('tr:last'),
          $trNew = $trLast.clone(),
          $trInputClassName = $trLast.find('input').attr('class'),
          $trInputClassIndex = $('#bpCalculator tbody>tr').length + 1;
          // Add new name with index
          $trLast.before($trNew).addClass('cloned').find('input').val('').attr('name', $trInputClassName + '-' + $trInputClassIndex);

          $('td:eq(0)', $trLast).text($('#bpCalculator tbody>tr').length);
        return false;
      });

      // When clear/restart button is clicked return table to initial state
      $('.clear-restart').click(function(e){
        e.preventDefault();

        var $trCloned = $('.cloned');
        $trCloned.remove();

        $('#bpCalculator input').each(function () {
          $(this).val('');
        });

        $('.bpCalculator__table__output').hide();

        return false;
      });

      // Calculate average BP
      function calculcateBP(bpValue, bpOutput) {
        var bpInput = 0,
          bpTotal = 0,
          bpAverage;

        bpValue.each(function () {
          var val = $(this).val() > 0 ? Math.round(parseInt($(this).val(), 10)) : false;

          if (val !== 0) {
            bpInput += 1;
            bpTotal += val;
          }
        });

        bpAverage = bpTotal / bpInput > 0 ? bpTotal / bpInput : 0;

        bpOutput.val(bpAverage);

        $('.bpCalculator__table__output').show();
      }

      // Calculate BP when calculate is clicked

      // Validate BP Form
      $('#bpCalculator').validate({
        rules: {
        },
        messages: {
        },
        submitHandler: function(form) {
          var sysBpValue = $('.bpCalculator__systolic-input'),
            sysBpOutput = $('.bpCalculator__systolic-output');

          var diaBpValue = $('.bpCalculator__diastolic-input'),
            diaBpOutput = $('.bpCalculator__diastolic-output');

          calculcateBP(sysBpValue, sysBpOutput);
          calculcateBP(diaBpValue, diaBpOutput);

          return false;
        }
      });

    }
  };
})(jQuery, Drupal);
