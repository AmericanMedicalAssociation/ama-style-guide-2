(function ($, Drupal) {
  Drupal.behaviors.index = {
    attach: function (context, settings) {

      var fullText = $('.fulltext').html()
      var truncated = $('.truncated').html()
      var desc = $('.desc-display')
      var test = $('.ama__category-index .ama__layout--two-col-right--75-25__left')
      var content = test.html()
      var temp = $('.temp-div')
      var tempHeight = ''
      var truncHeight = ''

      $('.desc-display', context).once('getHeight').each(function () {
        test.html(content).append('<div class="temp-div">' + fullText + '</div>')
        truncHeight = desc.height()
        tempHeight = temp.height()
        truncHeight = desc.height()
        console.log(tempHeight)
        desc.css('height', truncHeight + 28 + 'px')
        temp.remove()
      })

      desc.on('click', '.more', function () {
        desc.addClass('full')
        desc.removeClass('summary')
        desc.css('height', tempHeight + 'px')
        desc.html(fullText).append('<span class="less">Hide Content</span>')
      })
      desc.on('click', '.less', function () {
        desc.removeClass('full')
        desc.css('height', truncHeight + 'px')
        desc.addClass('summary')
        desc.html(truncated).append('<span class="more"> ...Read More</span>')
      })

    }
  }
})(jQuery, Drupal)
