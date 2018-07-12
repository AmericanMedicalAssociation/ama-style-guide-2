---
el: ".ama__product-nav"
title: "Product Nav"
---

As a user, I want to find quick links to the product I need.



[EWL-5438](https://issues.ama-assn.org/browse/EWL-5438)

### Variables
~~~
{
   "productNav": {
     "links": [
        "text": 
          string / required ("JAMA Network")
        "title": 
          string / required ("JAMA Network")
        "href": 
          string / required (url)
        "target": 
          string / required ("_self")
        "class": 
          string / required ("ama__link--white")
      },
       // repeat for each link.
     ]
   }
}
~~~
