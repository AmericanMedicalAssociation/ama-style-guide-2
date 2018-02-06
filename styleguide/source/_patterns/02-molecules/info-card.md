---
el: '.info-card'
title: 'Information Card'
---
Information cards begin on the left and stack every two cards in desktop format. Information cards include a label (usually "Media Contact:"), name, title, phone number(s), fax number(s), and email.

[EWL-4487](https://issues.ama-assn.org/browse/EWL-4487)

### Variables
~~~
{
  infoCard: {
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
