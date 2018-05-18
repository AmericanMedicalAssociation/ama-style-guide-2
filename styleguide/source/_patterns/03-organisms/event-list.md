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
      "link": {
        "title": string/optional
        "href": string/required
        "text": string/required
      },
      "location": {
        "text": string/optional
        "level": "3"
        "class": "ama__h3 ama__event-stub__location"
      },
      "date": string/optional,
      "image": {
        "alt": string/required
        "src": "string/required
        "height": "180"
        "width": "180"
      },
      "sticky": true/false
      "cme": true/false
      "discount": string/optional
      "paragraph": string/optional
    },
   ... # repeat for each item.
    }
  ]
}
~~~
