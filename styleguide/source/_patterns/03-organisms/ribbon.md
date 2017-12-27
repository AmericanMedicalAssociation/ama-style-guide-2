### Description
The ecosystem ribbon is a nav dom element with class .ribbon that exists at the top of the body on all AMA corporate and wire AMA pages. This element is not sticky.

[EWL-4104](https://issues.ama-assn.org/browse/EWL-4104)


### JavaScript Used
* Main Nav (assets/js/nav.js)

### Variant options
* [user-menu](./?p=molecules/p=organisms-ribbon)
* [user-menu](./?p=organisms/p=organisms-ribbon-auth)


### Variables
~~~
  "ribbon": {
    "ribbonDropdown": {
      "triggerText": string/required
      "unorderedList": [
        {
          "text": string/required: example(<a href=\"#\">AMA Wire</a>)
        }
      ]
    },
    "userMenu": {
      "links": [
        {
          "title": string/required
          "href": string (url) / optional
          "text": string / optional
          "target": string / optional
        }
      ]
    }
  }
~~~
