---
el: ".ama__topic_membership"
title: "Topic Membership with CTA"
---

The topic membership pattern includes a heading, a description, and a CTA button (optional). In this variant the CTA button is displayed as an example.

[EWL-3817](https://issues.ama-assn.org/browse/EWL-3817)
[EWL-4214](https://issues.ama-assn.org/browse/EWL-4214)

### Variant options
* [Base pattern (without CTA)](./?p=organisms-topic-membership)

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
  "button": {
    "text": string/optional
    "style": "primary"
  }
}
~~~
