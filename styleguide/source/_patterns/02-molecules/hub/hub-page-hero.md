---
el: ".hub-page-hero"
title: "Hub Page Hero"
---
### Description

A hero CTA that consists of a title, optional description, optional background image, and optional cta button. The order of elements is determined using flexbox where different from the base pattern.

### Variant options
* [As cta only](?p=molecules-hub-hero-as-cta-only)
* [As fifty fifty](?p=molecules-hub-hero-as-fifty-fifty)
* [As fifty fifty left](?p=molecules-hub-hero-as-fifty-fifty-left)
* [As fifty fifty video](?p=molecules-hub-hero-as-fifty-fifty-video)
* [As side](?p=molecules-hub-hero-as-side)
* [As side right](?p=molecules-hub-hero-as-side-right)
* [As split](?p=molecules-hub-hero-as-split)
* [As split no overlay](?p=molecules-hub-hero-as-split-no-overlay)

[EWL-4995](https://issues.ama-assn.org/browse/EWL-4995)


### Use Case
The hero cards are used on the Hub pages 

~~~
  "hubPageHero": {
     heading {
       level:
         type: string / required
       text:
         type: string / required
       class:
         type: string / optional
     }
    button: {
      href:
        type: string (url) / optional
      info: 
        type: string / optional
      text: 
        type: string / required
      type:
        type: string / optional (ex: "button", "submit")
      style:
        type: string / optional ("secondary" or "")
       size:
        type: string / optional ("small", "block" or "")
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
