---
title: Search Header
---

### Description
Search Header with components.

### Variant options
none

### Use Case
The produces a mechanism to search for content by keywords.

### Variables
~~~
{
  "searchHeader": [
    {
      "searchField": {
        "label": type: string / optional
        "name": type: string / optional
        "placeholder": type: string / optional
        "helpText": type: string / optional
      }
    },
    {
      "selectMenu":{
        "label": type: string / optional
        "required": type: boolean / optional
        "id":"text-select"
        "options":[{
          "value":"type: string / required
          "text": type: string / required
        }]
      }
    }
  ]
}
~~~
