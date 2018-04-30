---
el: ".ama__column-teaser"
title: "Column Teaser"
---

A collection of up to three articles displayed in a column (meant for use in a sidebar). Displays an image (optional) and title.

[EWL-4433](https://issues.ama-assn.org/browse/EWL-4434)

### Use Case
A list of clickable articles related to the main content by shared taxonomy term.

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
