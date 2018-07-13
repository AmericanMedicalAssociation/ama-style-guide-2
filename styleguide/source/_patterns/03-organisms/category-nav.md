---
el: ".ama__category-nav"
title: "Category Nav"
---

As a user, I want to navigate to the main categories to find more content.

[EWL-5439](https://issues.ama-assn.org/browse/EWL-5439)

### Variables
~~~
{
   "catNav": {
     "links": [
       {
         "text":
           string / required
         "href":
           string / required (url)
       },
       // repeat for each link.
     ]
   }
}
~~~
