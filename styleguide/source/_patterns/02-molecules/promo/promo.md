---
title: "Promo"
el: ".ama__promo"
---

A Promo is a flexible pattern that includes a heading, a description, a logo (optional), an image (optional), and a Secondary CTA button (optional).

### Important functional details
#### Background vs. border
This pattern can optionally have one of two background/border styles, shown via variants. The default style for this pattern is "Background." The JSON data for this pattern MUST include the "style:" line or the pattern will visually break. 

#### Render as link vs. render as div based on CTA
If this pattern includes a CTA, as shown in the variant [Promo With CTA]?p=molecules-promo-with-cta), the containing element will render as a `div` and the CTA button will link to the provided URL. If this pattern does not include a CTA, the pattern wrapper will render as an `<a>  ` element.

#### CTA button styling
This pattern should only ever have a Secondary CTA button, and never a Primary or "block" button.

### Variants
- [Promo With CTA](?p=molecules-promo-with-cta) - example including a CTA, causing the pattern to render as a `div` instead of a link.
- [Promo With Image](?p=molecules-promo-with-image) - example including an image.
- [Promo With Border](?p=molecules-promo-with-border) - example of this pattern when `"style:"` is set to `border`.`
- [Promo As Inline](?p=molecules-promo-as-inline) - example of this pattern when `"style:"` is set to `inline`.`
- [Promo As Homepage](?p=molecules-promo-as-homepage) - example of this pattern when `"style:"` is set to `homepage`.`


### Tickets
[EWL-4185](https://issues.ama-assn.org/browse/EWL-4185)
[EWL-4514](https://issues.ama-assn.org/browse/EWL-4514)
[EWL-4514](https://issues.ama-assn.org/browse/EWL-5460)


### Use Case
This produces a container for a "Promotional" Item meant for addtional information with a call to action button.

### Variables
~~~
{
  style: "background", (required, options: "background", "border")
  heading: {
    level: "2"
    text: 
      type: string / required
    class: "ama__h2"
  }
  paragraph: {
    text: 
      type: string / required
  }
}
~~~
