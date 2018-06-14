---
title: Partner Promo
---

### Description
Links the user to promotional content

Elements:
- Image (optional) 
– Title (required)
– Subtext (required)
- CTA (required)

User story: As a user I can navigate to promotional content.

[EWL-5299](https://issues.ama-assn.org/browse/EWL-5299)

### Variables
~~~~
  partnerPromo: {
    image: { // optional 
      alt: 
        type: string / required
      src: 
        type: string / required (url)
      height: 
        type: string / "100%"
      width: 
        type: string / "100%"
    }
    heading: 
      type: string / required
    paragraph:
      type: string / required
    button: {
      href: 
        type: string (url) / required
      info: 
        type: string / required
      text: 
        type: string / required
      type: 
        type: string / required ("button")
      style: 
        type: string / required ("primary")
      size: 
        type: string / optional (empty)
    }
  }
~~~~

