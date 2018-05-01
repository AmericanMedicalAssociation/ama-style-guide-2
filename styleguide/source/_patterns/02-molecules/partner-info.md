---
el: '.ama__partner'
title: 'Partner Information'
---

### Description
Partner Information molecules contain a logo, a ["Information Card as Media Contact"](?p=molecules-info-card-as-media-contact), and a boilerplate description consisting of a heading and a paragraph.

[EWL-4487](https://issues.ama-assn.org/browse/EWL-4487)

### Use Case
Groups information relating to partners on press releases. Associates a logo with contact information, and boilerplate copy about an organization.

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
