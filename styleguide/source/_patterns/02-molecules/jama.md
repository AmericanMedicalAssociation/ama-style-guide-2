---
el: '.ama__jama'
title: 'JAMA / JAMA as Sidebar'
---
Appears differently depending on where it's placed in the layout: see [News with JAMA Examples]().

* [EWL-5039](https://issues.ama-assn.org/browse/EWL-5039)
* [EWL-5040](https://issues.ama-assn.org/browse/EWL-5040)
* [EWL-5041](https://issues.ama-assn.org/browse/EWL-5041)
* [EWL-5042](https://issues.ama-assn.org/browse/EWL-5042)

### Use Case
Provides links to relevant JAMA content, as well as a link that serves as a CTA for membership.

### Variants
* **JAMA as Sidebar (base) (this variant) -**  meant to be used in the right rail of an A1 page. The base pattern. Unless placed in a `.ama__foo__page-content` or `.ama__page-foo__teasers`, its styling is not restricted to any one content area. 
* **JAMA as Content Bottom\* -** variant that appears when this molecule is dropped into the "Page Content" section of a layout. 
* **JAMA as Three Up\* -** variant that appears when this molecule is displayed above the four-up teaser at the bottom of a News or Press Release page (dropped in `section.ama__page--foo__teasers` wrapper). 

### Variables
~~~
  jama {
    title: {
        text: 
          type: string / optional
        icon: 
          type: string (url) / optional
      },
    links {
      {
        subtitle:
          type: string / optional
        title: 
          type: string / required
        href: 
          type: string (url) / required
        heading: [
          level: 
            type: int "3"
          text: 
            type: string / required       
          class:
            type: string "ama__h3"
        ]      
      },
      // add more links as needed.
    }
  }

~~~
