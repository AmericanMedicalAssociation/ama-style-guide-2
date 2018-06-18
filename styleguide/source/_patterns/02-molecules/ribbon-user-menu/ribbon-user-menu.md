### Description
The user menu navigation present in the header ribbon.

[EWL-4104](https://issues.ama-assn.org/browse/EWL-4104)

### Variant options
* [user-menu](?p=molecules/ribbon-user-menu)
* [user-menu](?p=molecules/ribbon-user-menu-logged-in)

### Use Case
A mechanism for user links.

### Variables
~~~
  "userMenu": {
      "links": [
        {
          href:
            type: string / required
          text:
            type: string / required
          class:
            type: string / optional
          target:
            type: string / optional
          title:
            type: string / optional
        }
      }
    ],
    "loggedIn": {
      links": [
        {
         href:
           type: string / required
         text:
           type: string / required
         class:
           type: string / optional
         target:
           type: string / optional
         title:
           type: string / optional
         }
       }
     ]
    }
  }
~~~
