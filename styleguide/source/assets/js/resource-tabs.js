$('.ama__resource-tabs__nav li').click(function(){
  showTab($(this));
});

function showTab($tab) {
  console.log($tab);
  var dataTab = $tab.attr('data-tab');
  console.log(dataTab);
  $('.--is-active').removeClass('--is-active');
  $('.ama__resource-tabs__content section#' + dataTab).addClass('--is-active');
  $tab.addClass('--is-active');
}
