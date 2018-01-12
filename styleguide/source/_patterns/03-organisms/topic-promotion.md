---
el: ".ama__topic_promotion"
title: "Topic Promotion"
---

A Topic Promotion is a flexible pattern that includes a heading, a description, an image (optional), and a CTA button (optional). If the CTA is omitted, the whole block will render as a link.

This pattern can optionally have one of two background/border styles.

[EWL-3818](https://issues.ama-assn.org/browse/EWL-3818)
[EWL-4185](https://issues.ama-assn.org/browse/EWL-4185)

### Variant options
These variants can be combined as needed by including the corresponding .json structures.
* [With CTA button](./?p=molecules/p=organisms-ribbon)
* [With image](./?p=organisms/p=organisms-ribbon-auth)
* [With border instead of backround](./?p=organisms/p=organisms-ribbon-auth)



### Variables
~~~
{
  "style": string/required (must choose "background" or "border")
  "heading": {
    "level": int/required
    "text": string/required
    "class": "ama__h2"
  },
  "link": string/required
  "paragraph" : {
    "text": string/required
  }
  (optional) "button": { 
    "text": string/required
    "style": "secondary"
  },
  (optional) "patternlab": true (use if including "image")
  (optional) "image": { 
    "alt": string/required
    "src": string/required
  },
}
~~~
