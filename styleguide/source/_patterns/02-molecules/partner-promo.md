---
title: Partner Promo
---

### Description
Links the user to promotional content

Elements (all are required for use of this template): 
– Title 
– Subtext
- CTA 

User story: As a user I can navigate to promotional content.

[EWL-5299](https://issues.ama-assn.org/browse/EWL-5299)

### Variables
~~~~
  partnerPromo: {
    heading: 
      type: text / required
    paragraph:
      type: text / required
    button: {
      href: 
        type: text (url) / required
      info: 
        type: text / required
      text: 
        type: text / required
      type: 
        type: text / required ("button")
      style: 
        type: text / required ("primary")
      size: 
        type: text / optional (empty)
    }
  }
~~~~

