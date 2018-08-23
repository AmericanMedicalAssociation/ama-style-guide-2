### Description
A Search Result molecule contains a title, a category/subcategory, and a description.

Variants are managed by use of pseudo-patterns.

- "Search Result as Best Bets" is the variant of this pattern that appears when a page has been set as "best bet" for the keyword that was searched.

[EWL-5799](https://issues.ama-assn.org/browse/EWL-5799)
[EWL-5800](https://issues.ama-assn.org/browse/EWL-5800)

### Use Case
This produces a Search Result for use on the Search Results page. Entices a user to click on a search result which exists on a separate page.

~~~
### Variables
{
  "searchResult": {
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
  }
}
~~~
