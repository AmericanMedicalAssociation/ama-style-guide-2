---
el: ".ama__promo-group"
title: "Promo Group"
---

A collection of three column wide promo molecules displaying an image (optional), paragraph text (optional), and button. 

[EWL-4893](https://issues.ama-assn.org/browse/EWL-4893)

### Variables
~~~
{
  "promoGroup": [
    {
      style: "background", (required)
      image: (optional) {
        alt: 
          type: string / required
        src: 
          type: string / required
        }
      paragraph: {
        text: 
          type: string / optional
        }
      button: {
        text: 
          type: string / required
        style: "block"
        }
    },
   ... # repeat for each item.
    }
  ]
}
~~~
