if($('.ama__people-listing__card-container').length){
  var $cardHeight = -1;

  $('.ama__people-listing__card-container .ama__people-listing-card').each(function() {
    $cardHeight = $cardHeight > $(this).height() ? $cardHeight : $(this).height();
    $(this).height($cardHeight);
  });
}
