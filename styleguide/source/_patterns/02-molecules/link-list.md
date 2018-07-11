---
el: '.link-list'
title: 'Homepage Link List'
---
A list of links for the homepage. The list switches to an accordion in mobile view 

[EWL-5457](https://issues.ama-assn.org/browse/EWL-5457)

### Use Case
A list of links used on the homepage

### Variables
~~~
{
 "linkList": {
     heading {
       level:
         type: string / required
       text:
         type: string / required
       class:
         type: string / optional
     }
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
         icon:
           type: string / optional
       }
     ]
   }
}

~~~
