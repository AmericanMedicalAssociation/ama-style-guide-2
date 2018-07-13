---
title: Product
---

### Description
As a user, I can find out more about AMA products and click to learn more about them on their individual pages.


### Variables
~~~~
product: {
  image: {
    alt: string,
    src: string,
    height: integer,
    width: integer
  },
  heading: {
    level: integer,
    text: string,
    class: ama__h4 ama__h4--homepage
  },
  paragraph : {
    text: string,
    class: ama__product__description
  },
  link: {
    title: string,
    href: string,
    text: string,
    target: _self,
    class: ama__link--blue ama__product__link
  }
}
