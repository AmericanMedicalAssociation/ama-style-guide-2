### Description
A Search Connector molecule contains a title, a subtitle/description, count and a url to property.

Variants are managed by use of pseudo-patterns.

[SC-12](https://issues.ama-assn.org/browse/SC-12)

### Use Case
This produces a Search Connector Result for use on the Search Results page (appears in sidebar). Entices a user to 
click on a search result which exists on a separate AMA web property search page.

~~~
### Variables
{
  "searchConnectorTitle": string/required,
  "searchConnectorHeaderText": string/required,
  "searchConnectorResults": [
    {
      "count": interger/required,
      "title": string/required,
      "subtitle": string/required,
      "href": string/required
    }
  ]
}
~~~
