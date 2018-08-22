---
el: ".ama__search-result-list"
title: "Search Result List"
---

A collection of up to ten search results and one search result as best bet displayed in a column (meant for use on the Search Results page).

### Use Case
Contains a list of all the search results based on search and filter criteria. Allows users to peruse content at a glance before going to the detail page for full information.

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
