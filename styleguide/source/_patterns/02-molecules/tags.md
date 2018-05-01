---
title: Tags
---

### Description
An unordered list in which the list items are links with special "tag" styling. Displays tags side by side.

[EWL-4423](https://issues.ama-assn.org/browse/EWL-4423)

### Variant options
none

### Use Case
Produce clickable links to categories of content. Organize content into "buckets" that relate to user interests and business interests.

### Variables
~~~
{
  "tags": [
    {
      "text": string/required
      "url": string/required
    },
    {
      "text": string/required
      "url": string/required
    },
    // etc... 
  ]
}
~~~
