/**
 * @file
 * alert.
 *
 * JavaScript should be made compatible with libraries other than jQuery by
 * wrapping it with an "anonymous closure". See:
 * - https://drupal.org/node/1446420
 * - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
(function ($) {
  $(document).ready(function() {
    console.log('doc ready');

    // If the 'hide cookie is not set we show the alert
    if (!readCookie('hideAlert')) {
      console.log('no cookie');
      $('.ama__alert').fadeIn("slow");
    }

    // Add the event that closes the popup and sets the cookie that tells us to
    // not show it again until one day has passed.
    $('.ama__alert__close').click(function() {
      $('.ama__alert').fadeOut();
      console.log('cookie created');
      createCookie('hideAlert', true, 1);
      return false;
    });

  });

  // ---
  // And some generic cookie logic
  // ---
  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name,"",-1);
  }
})(jQuery);
