---
el: '.ama__jama'
title: 'JAMA'
---
The default JAMA molecule. It is meant to be used in the right rail of an A1 page, but this is the base pattern and its styling is not restricted to any one content area.

[EWL-5039](https://issues.ama-assn.org/browse/EWL-5039)

### Use Case
Provides links to relevant JAMA content, as well as a link that serves as a CTA for membership.

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
        class: 
          ama__link-hover-red
      },
      // add more links as needed.
    }
  }

~~~
