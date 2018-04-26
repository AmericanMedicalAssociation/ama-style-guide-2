$('.ama__resource-tabs__nav li').click(function(){
  showTab($(this));
});

function showTab(tab) {
  if ($.type(tab) === 'object') {
    var sectionName = tab.attr('data-tab');
    $tab = tab;
  } else {
    var sectionName = tab;

  }

  console.log('showing ' + sectionName);
  $('.--is-active').removeClass('--is-active');
  $('.ama__resource-tabs__content section#' + sectionName).addClass('--is-active');
  $tab.addClass('--is-active');
}

$('.ama__page--resource__resource-link').click(function(){
  sectionName = getSectionName($(this));
  findTab(sectionName);
  console.log('show ' + $sectionName);

});

// Returns the section name of the clicked tab nav item.
function getSectionName($link) {

}

// Returns a DOM object that corresponds with the nav item associated
// with the clicked resource link.
function findTab($resourceLink) {
  console.log($resourceLink);
  var resource = $resourceLink.attr('data-resource');
  var resourceName = resource.substr(0, resource.indexOf('-'));
  console.log(resourceName);
  $('.ama__resource-tabs__nav li').each(function(){
    var dataTab = $(this).attr('data-tab');
    if(dataTab.indexOf(resourceName) >= 0) {
      console.log('found tab' + dataTab);
      return dataTab;
    }
  })
}
