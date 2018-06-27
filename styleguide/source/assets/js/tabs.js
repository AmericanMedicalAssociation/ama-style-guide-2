/*=======Resource Tabs=======*/

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
/*====== jQuery UI tabs ======*/


(function($) {
    $( ".ama__tabs" ).tabs();
    var viewportWidth = window.innerWidth;
    if (viewportWidth < 600) {
        $(".ama__resource-tabs").tabs();
    }else{
        $(".ama__resource-tabs").tabs({
            active: 1
        });
    }
    $(".ama__tabs > ul a").click(function(e){
        e.preventDefault();
        return false;
    });

    //Simulate click event on actual simpleTabs tab from mobile drop down.
    $('.ama__tabs-navigation--mobile select').on( "selectmenuchange", function( event, ui ) {
        var selectedValue = ui.item.value;
        $('a[href="#'+selectedValue+'"]').click();
    } );
})(jQuery);
