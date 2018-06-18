---
title: "Promo as Inline"
el: ".ama__promo--inline"
---

This variant shows an example of the Promo pattern included as an inline/embeddable floated-left block.

See the base pattern for more info: [Promo](?p=molecules-promo)

### Tickets
[EWL-4512](https://issues.ama-assn.org/browse/EWL-4512)

### Variables
~~~
{
  promo: {
    style: "inline", 
    heading: {      
      text: 
        type: string / required    
    }
    button: {
      text: 
        type: string / required
      style: "secondary"
    }
    paragraph: {
      text: 
        type: string / required
    }
  }
}
~~~
