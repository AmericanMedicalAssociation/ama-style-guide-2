---
title: Agenda Table
---

### Description
A two column HTML table for use with event details page. Contains date, session title and optionally the session description.


### Variables
~~~
table: 
  caption: 
    type: string
  rows [
    { 
      date: string,
      title: string,
      body: string (optional)
    },
    { 
      date: string,
      title: string,
      body: string (optional)
    },
    { ... }
  ]
~~~
