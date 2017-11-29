### Description
This is a pattern for the site header.

### Status
* in Progress as of 5.0.0

### Pattern Contains
* molecules-ribbon-dropdown
* molecules-ribbon-user-menu

### JavaScript Used
* Header Search (js/modules/mobileNav.js) 
* Scrolling Nav (js/modules/scrollAnchors.js)
* Utility Nav (js/modules/utilNav.js)
* Main Nav (js/modules/mainNav.js)
* Google Translate (code is in the footer.twig)

### Variables
~~~
utilityNav: {
  type: utilityNav / required
}
headerSearch : {
  type: headerSearch / required
}
mainNav: [{
  type: mainNav / required
}]
~~~



<section class="ribbon">
  <div class="container grid">
      <div class="ribbon_container col-width-12">
        {% include "molecules-ribbon-dropdown" %}
        {% include "molecules-ribbon-user-menu" %}
      </div>
  </div>
</section>


---
el: ".ribbon"
title: "Ribbon"
---
The ecosystem ribbon is a nav dom element with class .ribbon that exists at the top of the body on all AMA corporate and wire AMA pages. This element is not sticky.