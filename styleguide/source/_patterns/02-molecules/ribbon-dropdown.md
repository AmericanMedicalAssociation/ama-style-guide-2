### Description
The dropdown navigation present in the header ribbon.

[EWL-4104](https://issues.ama-assn.org/browse/EWL-4104)


### JavaScript Used
* Main Nav (assets/js/nav.js)

### Variant options
* [user-menu](./?p=molecules/ribbon-dropdown~user-menu)
* [user-menu](./?p=molecules/ribbon-dropdown~user-menu-auth)

### Variables
~~~
  "ribbonDropdown": {
    "triggerText": string/required
    "unorderedList": [
      {
        "text": string/required: example(<a href=\"#\">AMA Wire</a>)
      }
    ]
  }
}]
~~~