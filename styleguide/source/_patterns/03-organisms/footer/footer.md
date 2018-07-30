---
el: ".ama__footer"
title: "Footer"
---

The footer of the website. Includes the missions statement (static), social share, horizontal rule, footer menus, copyright and utility menu.

[EWL-4215](https://issues.ama-assn.org/browse/EWL-4215)

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
  },
  "social": [
    {
      "text":  string / required
      "icon":  string / required
      "url":  string / required (url)
    }
  ]
}
~~~
