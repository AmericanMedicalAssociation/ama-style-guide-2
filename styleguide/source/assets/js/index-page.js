(function ($, Drupal) {
  Drupal.behaviors.index = {
    attach: function (context, settings) {

      var full = $('.fulltext')
      var trunc = $('.truncated')
      var desc = $('.desc-display')
      var fullText = $('.fulltext').html()
      var truncated = $('.truncated').html()
      var fullHeight = ''
      var truncHeight = ''
      var moreHtml = '<span class="more"> ...Read More</span>'
      var lessHtml = '<span class="less">Hide Content</span>'
      var resizeFull = ''
      var resizeTrunc = ''

      $('.desc-display', context).once('getHeight').each(function () {
        truncHeight = trunc.height()
        fullHeight = full.height() + 35
        desc.css('height', truncHeight + 'px')
      })

      $(window).on('resize', function () {
        if (desc.hasClass('full')) {
          resizeFull = full.height() + 35
          desc.css('height', resizeFull + 'px')
        } else if (desc.hasClass('summary')) {
          resizeTrunc = trunc.height()
          desc.css('height', resizeTrunc + 'px')
        }
      })

      desc.on('click', '.more', function () {
        truncHeight = trunc.height()
        fullHeight = full.height() + 35
        desc.css('height', fullHeight + 'px')
        desc.addClass('full')
        desc.removeClass('summary')
        desc.html(fullText).append(lessHtml)
      })
      desc.on('click', '.less', function () {
        truncHeight = trunc.height()
        fullHeight = full.height() + 35
        desc.css('height', truncHeight + 'px')
        desc.removeClass('full')
        desc.addClass('summary')
        desc.html(truncated).append(moreHtml)
        $('html, body').animate({ scrollTop: 0 }, 500)
      })
    }
  }
})(jQuery, Drupal)
