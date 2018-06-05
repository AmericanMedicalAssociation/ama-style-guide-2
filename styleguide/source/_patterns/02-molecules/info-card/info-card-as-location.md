---
el: '.ama__info-card--location'
title: 'Information Card as Location'
---

### Description
[Information Card](p=molecules-info-card) variant molecule including an embedded Google map.

[EWL-4613 SG2 | Create "Info Card as Location" Variant](https://issues.ama-assn.org/browse/EWL-4613)

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
    link: 
      type: 
        string (leave empty)
    map:
      url:
        string (url)
      width: 
        100%
      height: 
        300
      
  }
}
~~~
