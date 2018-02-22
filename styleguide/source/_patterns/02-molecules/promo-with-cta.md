---
title: "Promo with CTA"
el: ".ama__promo"
---

This variant shows an example of the Promo pattern when a CTA button is included, causing the pattern to render as a `<div>` instead of an `<a>`.

See the base pattern for more info: [Promo](/?p=molecules-promo)

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
  button: {
    text: 
      type: string / required
    style: "block"
  }
  paragraph: {
    text: 
      type: string / required
  }
}
~~~
