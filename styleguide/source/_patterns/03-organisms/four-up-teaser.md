---
el: ".ama__four-up-teaser"
title: "Four Up Teaser"
---

A collection of up to four articles displaying an image (optional), title, and metadata (optional). 

[EWL-4434](https://issues.ama-assn.org/browse/EWL-4434)

### Use Case
A collection of up to four clickable pages that appear on News Article, Press Release, and Event content types. Their selection is editorially driven and can be any page, not limited by content type. The same four pages appear in all locations and must be manually curated outside of any one node.

### Variables
~~~
{
  "items": [
    {
      "patternLab": true,
      "link": {
        "title": string/optional
        "href": string/required
        "text": string/required
        "class": "ama__link-black",
        "target": "_self"
      },
      "image": {
        "alt": string/required
        "src": "string/required
        "height": string/optional
        "width": string/optional
      },
      "date": string/optional
      "readtime": string/optional
    },
   ... # repeat for each item.
    }
  ]
}
~~~
