---
el: ".ama__partner-list"
title: "Partner List"
---

A collection of up to three articles displayed in a column (meant for use in a sidebar). Displays an image (optional) and title.

[EWL-4433](https://issues.ama-assn.org/browse/EWL-4434)

### Use Case
Contains a list of all the partners mentioned within a Press Release so visitors know the logo, contact info, and business/organization summary of all parties involved in the press release.

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
