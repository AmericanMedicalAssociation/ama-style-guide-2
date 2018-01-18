---
el: '.inline-bio'
title: 'Inline Bio'
---
The Inline Biography component appears within a page's body text. It contains an optional image, name, title, specialty, and link to a full bio page.

[EWL-4420](https://issues.ama-assn.org/browse/EWL-4420)

### Variables
~~~
{
  bio: {
    image {
      alt:
        type: string / required
      src:
        type: string (url) / required
      height:
        type: string / required
      width:
        type: string / required
    },
    heading {
      level:
        type: string / required
      text:
        type: string / required
      class:
        type: string / optional
    },
    paragraph {
      text:
        type: string
      class:
        type: string / optional
    },
    link {
      href:
        type: string / required
      text:
        type: string / required
      class:
        type: string / optional
      target:
        type: string / optional
      title:
        type: string / optional
      icon:
        type: string / optional
    }
  }
}

~~~
