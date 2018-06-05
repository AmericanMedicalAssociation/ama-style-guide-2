---
el: '.ama__info-card--contact'
title: 'Information Card as Contact'
---

### Description
[Information Card](p=molecules-info-card) variant molecule including a 50% width image that primarily appears in the right region content of a [Resource Page](?p=pages-resource).

[EWL-4930 SG2 | Create "Info Card as Contact" Variant](https://issues.ama-assn.org/browse/EWL-4930)

### Variables
~~~
{
  infoCard: {
    type: "contact", (required, options: "default", "media", "contact")
    heading {
      level:
        type: string / required
      text:
        type: string / required
      class:
        type: string / optional
    },
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
