---
title: "Promo with CTA"
el: ".ama__promo"
---

This variant shows an example of the Promo pattern when a CTA button is included, causing the pattern to render as a `<div>` instead of an `<a>`.

See the base pattern for more info: [Promo](/?p=molecules-promo)

### Tickets
[EWL-4514](https://issues.ama-assn.org/browse/EWL-4514)

### Variables
~~~
{
  "style": "background", (required, value must be either "background" or "border")
  "heading": {
    "level": "2",
    "text": "This is an h2",
    "class": "ama__h2"
  },
  "button": {
    "text": "This is CTA text.",
    "style": "block"
  },
  "paragraph" : {
    "text": "A paragraph (from the Greek paragraphos, \"to write beside\" or \"written beside\") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose."
  }
}
~~~
