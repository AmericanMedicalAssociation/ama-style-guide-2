---
title: Subscribe Promo
---

### Description
Collects users' email addresses to subscribe them to mailings

User story: As a user I can subscribe to AMA emails

[EWL-5301](https://issues.ama-assn.org/browse/EWL-5301)

### Variables
~~~~
  subscribePromo: {
    subjectTitle:
      type: text / optional
    heading: 
      type: text / required
    paragraph:
      type: text / required
    email: {
      label: 
        type: text / required
      name: 
        type: text / required
      placeholder: 
        type: text / required
    },
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
        type: text / required ("secondary")
      size: 
        type: text / optional (empty)
    }
  }
~~~~

