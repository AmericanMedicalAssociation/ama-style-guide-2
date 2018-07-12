---
title: "Promo as Homepage"
el: ".ama__promo--homepage"
---

This variant shows an example of the Homepage Promo pattern.

See the base pattern for more info: [Promo](?p=molecules-promo)

### Tickets
[EWL-5460](https://issues.ama-assn.org/browse/EWL-5460)

### Variables
~~~
{
  "homepage": boolean / optional
  style: "background", (required, options: "background", "border")
  heading: {
    level: "1"
    text: 
      type: string / required
    class: "ama__h1"
  }
  button: {
    text: 
      type: string / required
    style: "block"
  }
}
~~~
