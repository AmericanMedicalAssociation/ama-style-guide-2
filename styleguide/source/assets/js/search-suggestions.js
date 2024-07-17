/**
 * @file
 * Attaches AMA Image Popup library.
 */

(function ($, Drupal) {

console.log('here');

    Drupal.behaviors.amaSearchSuggestions = {
        attach: function (context, settings) {
            console.log('Search suggestions attached');
            $('.ama__global-search form input', context).once('amaSearchFocus').on('focus', function () {
                // Your code to execute when the input is focused goes here
                console.log('Input focused'); // Example action
                $('.search-suggestions-wrapper').addClass('show');
            });
        }
    };

    Drupal.behaviors.amaSearchBlur = {
        attach: function (context, settings) {
            $('.ama__global-search form input', context).once('amaSearchBlur').on('blur', function () {
                // Your code to execute when the input loses focus goes here
                console.log('Input lost focus'); // Example action
                $('.search-suggestions-wrapper').removeClass('show');
            });
        }
    };

})(jQuery, Drupal);
