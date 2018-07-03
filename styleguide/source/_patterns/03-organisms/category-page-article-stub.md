---
el: ".ama__category-page-article-stub"
title: "Category Page Article Stub"
---

A collection of up to four article stubs for category page displayed in a row.

[EWL-5294](https://issues.ama-assn.org/browse/EWL-5294)

### Use Case
A list of clickable article stubs for category and subcategory pages.

### Variables
~~~
{
  "categoryArticleStub": {
     "contentGroupingHeader": {
       "text": string/optional
     },
     "articleStubs": [
       {
       "link": {
         "title": type:  string/optional
         "href": type:  string/optional
         "text": ttype:  string/optional
       },
       image {
         alt: type: string / required
         src: type: string (url) / required
         height: type: string / required
         width: type: string / required
       },
       "headingLevel": type: string/required,
       "video": type: string/optional
       "related": type: string/optional
       "small": type: string/optional
       
       "categoryPage": {
         "headingLevel": string/optional
         "heading": {
           "level": type: integer/required
           "text": type:  string/optional
           "class": type:  string/optional
         }
       }
     }
    }
  }
~~~
