
The label is similar in tone to "related coverage" but its text is an editable string.

Status: prototype

### Description
An opportunity for editors to call out articles that are topically similar to the the article that the user's currently reading. The linked page should always be a news article and the presentation should always be inline (rendered among the body content). In d8 will be a link to a Drupal entity.

This pattern is not a pseudopattern; rather, it is a wrapper for an "Article Preview as Inline" pattern, which includes a heading and the "Title Only" Article Preview variant.

[EWL-4422](https://issues.ama-assn.org/browse/EWL-4422)


### Variables
~~~
{
  "heading": {
    "level": int/required
    "text": string/required
    "class": "ama__article-preview-inline__label"
  },
  "link": {
    "href": string/required
    "text": string/required
    "title": string/optional
    "target": string/optional
    "class": "ama__article-preview-inline__link"
  }
}
~~~