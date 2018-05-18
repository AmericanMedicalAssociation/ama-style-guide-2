---
el: ".ama__event-list"
title: "Event List"
---

A collection of up to ten event stubs displayed in a column (meant for use on the Event Listing page).

### Use Case
Contains a list of all the event stubs based on search and filter criteria on the Event Listing page. Allows users to peruse events at a glance before going to the Event detail page for full information on each event.

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
