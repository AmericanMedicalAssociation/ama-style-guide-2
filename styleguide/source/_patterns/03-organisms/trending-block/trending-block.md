---

---
Appears differently depending on where it's placed in the layout.

### Use Case
Provides links to trending AMA content, as well as a link that leads to the full trending page.

### Variants
There are two main layouts for the Trending block component
- vertical
- horizontal

Both of these layouts are for use on the homepage

### Variables
~~~
{
  title: {
      text: 
        type: string / optional
      icon: 
        type: string (url) / optional
    },
  links: {
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
