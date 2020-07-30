(function ($, Drupal) {
  Drupal.behaviors.index = {
    attach: function (context, settings) {

      $textLength = $('.fulltext p').html().length

      // if (length > 50) {
      //   $('.fulltext p:last-child').once().append(' <span class="more visible"> ...Read More</span>');
      // }

      $('.more', context).on('click', function () {
        $('.less').toggleClass('visible')
        $('.more').toggleClass('visible')
      })
      $('.less', context).on('click', function () {
        $('.less').toggleClass('visible')
        $('.more').toggleClass('visible')
      })
    }
  }
})(jQuery, Drupal)
