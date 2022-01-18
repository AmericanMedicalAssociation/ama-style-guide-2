---
el: ".ama__podcast-player"
title: "Podcast Player"
---

As a user, I want to listen to a podcast.

[EWL-9242](https://issues.ama-assn.org/browse/EWL-9242)

### Variables
~~~
{
   "podcastLinks": {
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
