---
el: ".ama__filter"
title: "Filters"
---

The Filter includes applied-filters and expand-list molecules. A button appears on the bottom of the page in mobile to collapse all panels.

[EWL-4594](https://issues.ama-assn.org/browse/EWL-4594)

### Use Case
Displays the filters on the primary sidebar on the event listing page

### Variables
~~~

{
  "filter": {
    "appliedFilters": {
      "label": type: string / required
      "clearAll": type: string / required
    },
    "expandList": [
      {
        "header": type: string / required,
        "content": type: string / required,
        "checkboxes": {
          "checks": [
            {
              "label": type: string / required
              "value": type: string / required,
              "index": type: integer / optional
            }
          }
        }
      }
    ],
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
    ],
    button: {
      href:
        type: string (url) / optional
      info: 
        type: string / optional
      text: 
        type: string / required
      type:
        type: string / optional (ex: "button", "submit")
      style:
        type: string / optional ("secondary" or "")
       size:
        type: string / optional ("small", "block" or "")
    }
  }
}

~~~
