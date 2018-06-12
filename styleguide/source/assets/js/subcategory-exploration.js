$( ".ama__select-menu__select" ).selectmenu({
  width: false
});

$('.ama__subcategory-exploration__show-more').click(function() {
  $('.ama__subcategory-exploration__select').toggleClass('ama__subcategory-exploration__select--visible');
  $(this).toggleClass('ama__subcategory-exploration__show-more--expanded');
});
