---
el: '.ama__people-listing-card'
title: 'People Listing'
---
### Description
A people listing molecule consists of an optional image, optional bio, and heading as well as an optional CTA.

### Variant options
* [As Card](?p=molecules-people-listing-as-card)
* [As Card with CTA](?p=molecules-people-listing-as-card-with-cta)

[EWL-5402](https://issues.ama-assn.org/browse/EWL-5402)


### Use Case
The cards are used on the Hub pages 

~~~
"peopleListingCard": {
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
  "speciality": {
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
  },
  
  
  "details": [
    {
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
  ],
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
}
~~~
