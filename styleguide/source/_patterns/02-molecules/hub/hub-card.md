---
el: '.hub-card'
title: 'Hub Card'
---
### Description
A hub card molecule consists of an optional image, optional description, and heading as well as an optional CTA. The order of elements is determined using flexbox where different from the base pattern.

### Variant options
* [As Portrait](?p=molecules-hub-card-as-portrait)
* [As with no image](?p=molecules-hub-card-with-no-image)
* [As with select](?p=molecules-hub-card-with-select)


[EWL-4995(https://issues.ama-assn.org/browse/EWL-4995)


### Use Case
The cards are used on the Hub pages 

~~~
  "hubCard": {
    "layout": string / required
    image {
      alt:
        type: string / required
      src:
        type: string (url) / required
      height:
        type: string / required
      width:
        type: string / required
    }
   heading {
     level:
       type: string / required
     text:
       type: string / required
     class:
       type: string / optional
   }
    paragraph {
      text:
        type: string
      class:
        type: string / optional
    }
  } 
}
~~~
