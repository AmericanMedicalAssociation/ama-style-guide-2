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
      var width = ''
      var moreHtml = '<a href="#" class="more"> ...Read More</a>'
      var lessHtml = '<a href="#" class="less">Hide Content</a>'

      function getDimensions () {
        fullHeight = full.height() + 35
        width = $(window).width()
        if (width < 400) {
          truncHeight = trunc.height() + 25
        } else {
          truncHeight = trunc.height()
        }
      };

      /*
        * Animate the height of a dynamic height object? SIMPLE!
        * What a fool you would be to not think of so elegant a solution.
        * In the markup, there are hidden fulltext and summary divs.
        * They are absolutely positioned whithin the page template to keep an accurate height.
       */

      // Set height on pageload using the hidden divs.
      $('.desc-display', context).once('getHeight').each(function () {
        getDimensions()
        desc.css('height', truncHeight + 'px')
      });

      // Set the height again on window resize.
      $(window).on('resize', function () {
        getDimensions()
        if (desc.hasClass('full')) {
          desc.css('height', fullHeight + 'px')
        } else if (desc.hasClass('summary')) {
          desc.css('height', truncHeight + 'px')
        }
      });

      // On click, set the height to trigger css transition.
      desc.on('click', '.more', function () {
        getDimensions()
        desc.css('height', fullHeight + 'px')
        desc.addClass('full').removeClass('summary')
        // Swap the full copy into the display div.
        desc.html(fullText).append(lessHtml)
      });
      desc.on('click', '.less', function () {
        getDimensions()
        desc.css('height', truncHeight + 'px')
        desc.addClass('summary').removeClass('full')
        // Swap the truncated copy into the display div.
        desc.html(truncated).append(moreHtml)
        // Scroll to top.
        $('html, body').animate({ scrollTop: 0 }, 500, 'swing')
      });
    }
  };
})(jQuery, Drupal);
