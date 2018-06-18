---
el: '.ama__info-card--event'
title: 'Information Card as Event Speaker'
---

### Description
[Information Card](p=molecules-info-card) variant molecule including a 100% width image and varying responsive widths (100% at mobile, 50% at tablet, 33% at desktop).

[EWL-4612 SG2 | Create "Info Card as Event Speaker" Variant](https://issues.ama-assn.org/browse/EWL-4612)

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
    },
    blurb {
      {
        text:
          type: string / optional
      }
    }
  }
}
~~~
