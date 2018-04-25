---
el: ".ama__promo-group"
title: "Promo Group"
---

A collection of three column wide promo molecules displaying an image (optional), title, and button. 

[EWL-4893(https://issues.ama-assn.org/browse/EWL-4893)

### Variables
~~~
{
  "promoGroup": [
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
    },
   ... # repeat for each item.
    }
  ]
}
~~~
