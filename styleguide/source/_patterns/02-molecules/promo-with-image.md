---
title: "Promo with Image"
el: ".ama__promo"
---

This variant shows an example of the Promo pattern when an image is included.

See the base pattern for more info: [Promo](?p=molecules-promo)

### Tickets
[EWL-4514](https://issues.ama-assn.org/browse/EWL-4514)

### Variables
~~~
{
  style: "background", (required, options: "background", "border")
  heading: {
    level: "2"
    text: 
      type: string / required
    class: "ama__h2"
  }
  image: {
    alt: 
      type: string / required
    src: 
      type: string / required
  }
  paragraph: {
    text: 
      type: string / required
  }
}
~~~
