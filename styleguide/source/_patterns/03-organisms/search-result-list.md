---
el: ".ama__search-result-list"
title: "Search Result List"
---

A collection of up to ten search results displayed in a column (meant for use on the Search Results page).

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
      "category": {
        "text": string/optional,
        "class": "ama__search-result__category"
      },
      "bestBet": true/false,
      "paragraph": string/optional
    },
   ... # repeat for each item.
    }
  ]
}
~~~
