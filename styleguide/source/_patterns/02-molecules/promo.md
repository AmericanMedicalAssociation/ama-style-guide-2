---
title: "Promo"
el: ".ama__promo"
---

A Promo is a flexible pattern that includes a heading, a description, a logo (optional), an image (optional), and a CTA button (optional).

### Important functional details
#### Background vs. border
This pattern can optionally have one of two background/border styles, shown via variants. The default style for this pattern is "Background." The JSON data for this pattern MUST include the "style:" line or the pattern will visually break. 

#### Render as link vs. render as div based on CTA
If this pattern includes a CTA, as shown in the variant [Promo With CTA](/?p=molecules-promo-with-cta), the containing element will render as a `div`. If this pattern does not include a CTA, the pattern wrapper will render as an `<a>  ` element.

### Variants
- [Promo With CTA](/?p=molecules-promo-with-cta) - example including a CTA, causing the pattern to render as a `div` instead of a link.
- [Promo With Image](/?p=molecules-promo-with-image) - example including an image.
- [Promo With Border](/?p=molecules-promo-with-border) - example of this pattern when `"style:"` is set to `border`.`

### Tickets
[EWL-4185](https://issues.ama-assn.org/browse/EWL-4185)
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
  "paragraph" : {
    "text": "A paragraph (from the Greek paragraphos, \"to write beside\" or \"written beside\") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose."
  }
}
~~~
