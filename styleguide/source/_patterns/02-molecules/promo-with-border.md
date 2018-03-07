---
title: "Promo with Border"
el: ".ama__promo.ama__promo--border"
---

This variant shows an example of the Promo pattern when `style:` is set to `border` instead of the default `background`.

See the base pattern for more info: [Promo](?p=molecules-promo)

### Tickets
[EWL-4514](https://issues.ama-assn.org/browse/EWL-4514)

### Variables
~~~
{
  style: "border", (required, options: "background", "border")
  heading: {
    level: "2"
    text: 
      type: string / required
    class: "ama__h2"
  }
  paragraph: {
    text: 
      type: string / required
  }
}
~~~
