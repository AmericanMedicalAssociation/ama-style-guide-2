---
el: '.ama__jama'
title: 'JAMA as Content Bottom'
---
*Appears differently depending on where it's placed in the layout: see [News with JAMA Examples]().

\* _NOTE: Since the requirements stated to build a pattern that displays differently depending on where it appears in the layout, we did not create an encapsulated version of its styling here at the molecule level. See the "News with JAMA Examples" page pattern to preview._

* [EWL-5040](https://issues.ama-assn.org/browse/EWL-5040)
* [EWL-5042](https://issues.ama-assn.org/browse/EWL-5042)

### Use Case
Provides links to relevant JAMA content, as well as a link that serves as a CTA for membership.

### Variants
* **JAMA as Sidebar (base) -**  meant to be used in the right rail of an A1 page. The base pattern. Unless placed in a `.ama__foo__page-content` or `.ama__page-foo__teasers`, its styling is not restricted to any one content area. 
* **JAMA as Content Bottom (this variant)\* -** variant that appears when this molecule is dropped into the "Page Content" section of a layout. 
* **JAMA as Three Up\* -** variant that appears when this molecule is displayed above the four-up teaser at the bottom of a News or Press Release page (dropped in `section.ama__page--foo__teasers` wrapper). 

### Variables
~~~
  jama {
    links {
      {
        title: 
          type: string / required
        href: 
          type: string (url) / required
        text: 
          type: string / required      
        src:
          type: string (image url) / optional
        width: 
          auto
        height:
          auto
        alt: 
          type: string / optional
      },
      // add more links as needed.
    }
  }

~~~
