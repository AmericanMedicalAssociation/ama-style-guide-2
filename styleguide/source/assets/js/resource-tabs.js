$('*[data-resource]').click(function(){
  // Figure out which tab to display.
  $tab = findTab($(this));
  // Show the tab.
  showTab($tab);
});

// function showTab() - shows and hides the tab.
function showTab($tab) {
  $('.--is-active').removeClass('--is-active');
  // Show the section.
  $('.ama__resource-tabs__content section#' + $tab.attr('id')).addClass('--is-active');
  // Put an active state on the tab.
  $('.ama__resource-tabs__nav li[data-resource="' + $tab.attr('id') + '"]').addClass('--is-active');
}

// function findTab() - return object that is the section to be displayed.
function findTab($obj) {
  // Get the ID for the section to display.
  var resourceData =_getSectionID($obj);
  // Find out which tab the sectionID corresponds to.
  $('.ama__resource-tabs section').each(function() {
    var attrID = $(this).attr('id');
    if(attrID.indexOf(resourceData['sectionID']) >= 0) {
      $tab = $(this);
    }
  });
  return $tab;
}

// function _getSectionID() - return array containing the specific resource to show and the section element's ID attribute.
function _getSectionID($obj) {
  // Parse out the section ID from the clicked object.
  var resourceData = [];
  resourceData['resourceID'] = $obj.attr('data-resource');
  resourceData['sectionID'] = resourceData['resourceID']
    .substr(0, resourceData['resourceID'].indexOf('-'));
  if (!resourceData['sectionID']) {
    resourceData['sectionID'] = resourceData['resourceID'];
  }
  return resourceData;
}
