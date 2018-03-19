---
el: ".ama__membership"
title: "Membership"
---

The membership pattern includes a heading, a description, and a CTA button (optional).

[EWL-3817](https://issues.ama-assn.org/browse/EWL-3817)
[EWL-4214](https://issues.ama-assn.org/browse/EWL-4214)

### Variant options
* [With CTA button](?p=molecules-membership-with-cta)

### Variables
~~~
{
  "heading": {
    "level": int/required
    "text": string/required
    "class": "ama__h2"
  },
  "link": string/required
  "paragraph" : {
    "text": string/required
  },
  (optional) "button": {
    "text": string/optional
    "style": "primary"
  }
}
~~~
