---
el: ".ama__footer"
title: "Footer Hub Page"
---

The minimal footer of the hub pages. Includes the copyright and utility menu.

[EWL-10421](https://issues.ama-assn.org/browse/EWL-10421)
[EWL-10295](https://issues.ama-assn.org/browse/EWL-10295)

### Use Case
A global footer container for common links.

### Variables
~~~
{
  "menus": {
    "utility": [
      {
        "url": string/required (url),
        "text": string/required
      }
    ],
    "products": [
      {
        "url": string/required (url),
        "text": string/required
      }
    ],
    "secondaryUser": [
      [
        {
        "url": string/required (url),
        "text": string/required
        }
      ],
      [
        {
        "url": string/required (url),
        "text": string/required
        }
      ]
    ]
  }
}
~~~
