### Description
Subcategory featured content organism is a collection of content that links the user to another piece of content, highlights no more than 3 pieces of content, and can hold all content types.


[EWL-5285: SG2 | Create "Subcategory Featured Content" Organism](https://issues.ama-assn.org/browse/EWL-5285)

### Use Case
A collection of linked featured content for use on subcategory pages.

### Variables
~~~
{
  "subcatFeaturedContent": {
     "contentGroupingHeader": {
       "text": string/optional
     },
     "content": [
       { (molecule) },
       { (molecule) }, 
       { (molecule) }
     }
  }
~~~
