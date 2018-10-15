---

---
Appears differently depending on where it's placed in the layout: see [News with JAMA Examples]().

### Use Case
Provides links to relevant JAMA content, as well as a link that serves as a CTA for membership.

### Variants
There are two main layouts for the JAMA component, a horizontal and vertical layout. These layouts determine the image placement.

The vertical layout can have images or not have images.

There is also a special style for the homepage.

These layouts apply to the JAMA component as well as the JAMA stub for each link.

### Variables
~~~
{
  title: {
      text: 
        type: string / optional
      icon: 
        type: string (url) / optional
    },
  links jamaStub: {
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
