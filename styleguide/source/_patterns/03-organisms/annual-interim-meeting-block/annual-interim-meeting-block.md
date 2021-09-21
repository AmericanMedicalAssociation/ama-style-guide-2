---
el: '.annual-interim'
title: 'Annual/Interim Meeting Block'
---
A text/containing elment that is part of a home page custom block to promote AMA's Annual, Interim, and Special Meetings.

[EWL-9032](https://issues.ama-assn.org/browse/EWL-9032)

### Variables
~~~
{
  left: {
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
