---
title: Your Products
---

### Description
A listing of products to appear on the homepage.


### Variables
~~~
{
  sectionTitle: {
    text: Your Products
  },
  link: {
    title: View all Products,
    href: string,
    text: View all Products,
    target: _self,
    class: ama__link--blue ama__products__view-all-link
  },
  products: [
  {
    image: {
      alt: string,
      src: string
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
  },
   ... # repeat for each item.
  ]
}
~~~
