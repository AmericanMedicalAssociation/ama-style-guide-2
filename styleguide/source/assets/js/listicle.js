/**
 * @file
 * Listicle Clases.
 *
 * Handling classes to build listicle properly outside ckeditor.
 */
(function ($, Drupal) {
  Drupal.behaviors.listicle = {
    attach: function(context, settings) {
      if ($('.listicle', context).length) {
        $('.listicle').each(function () {
          $(this).children().each(function (idx, e) {
            $(e).addClass('listicle__item');
            $(e).children('ol').each(function (idx, f) {
              $(f).addClass('listicle__item-sub');
              $(f).children('li').addClass('listicle__item-sub-item');
            });
          });
        });
      }
      //if there is an inline promo on a page with a listicle, determine if the list is close enough beneath the promo in the dom to assume it will be floated next to it. I chose within 5 siblings.
      if($('.ama__promo--inline ~ .listicle')) {
        var length = $('.ama__promo--inline').first().nextUntil('.listicle').addBack().length;
        if (length <= 5) {
          $('.ama__promo--inline').addClass('listicle-margin');
        }
      }
      //if the listicle item contains an image, put a clearfix div on the item so if it has a trailing image, the next item won't wrap on it.
      //Also, determine it the image is almost 100% of the list width. if it is, add a class to remove the left margin and make the image 100% width. I chose 80%.
      if($('.listicle__item img')) {
        $('.listicle img').each(function () {
          var fixedThis = this
          var width = $('.listicle').width()
          var imageWidth = $(this).width()
          var clearfix = '<div class="clearfix"></div>'
          $(this).closest('.listicle__item').once().append(clearfix)
          if (imageWidth >= width*.8) {
            $(this).addClass('no-margin')
          }
        })
      }
    }
  };
})(jQuery, Drupal);
