### Description
A carousel of category article stubs that enables a user to further explore content by clicking on Article Title or Article Image. User can use the arrow buttons (or swipe on tablet and mobile) to scroll through pieces of content. 

[EWL-5287](https://issues.ama-assn.org/browse/EWL-5287)

### Variables
~~~
{
  "subcategoryExploration"": {
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
