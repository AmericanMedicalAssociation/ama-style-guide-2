---
el: ".ama__org-nav"
title: "Org Nav"
---

As a user, I want to find specific information about AMA organizational groups.

[EWL-5440](https://issues.ama-assn.org/browse/EWL-5440)

### Variables
~~~
{
   "orgNav": {
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
