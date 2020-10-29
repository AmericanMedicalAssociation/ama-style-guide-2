---
el: ".ama__page-grouping"
title: "Page Grouping"
---

A collection of up to three articles displayed in a column (meant for use in a sidebar). Displays an image (optional) and title.

[EWL-8301](https://issues.ama-assn.org/browse/EWL-8301)

### Use Case
Contains a list of all the partners mentioned within a Press Release so visitors know the logo, contact info, and business/organization summary of all parties involved in the press release.

### Variables
~~~
{
  "pageGrouping": {
    "title": "COVID-19 Resource Center",
    "image": "https://via.placeholder.com/142x80",
    "updateSection": {
      "title": "Featured Updates",
      "updates": [
        {
          "title": "Clinical Information",
          "url": "#"
        },
        {
          "title": "AMA Guides and Resources",
          "url": "#"
        },
        {
          "title": "Advocacy",
          "url": "#"
        },
        {
          "title": "Medical Ethics",
          "url": "#"
        }
      ]
    }
  }
}
~~~
