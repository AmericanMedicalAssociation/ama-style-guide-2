---
title: Agenda
---

### Description
A tabbed structure containing agenda dates for tab labels and [agenda tables](/?p=molecules-agenda-table) for tab content. This molecule is for use on [Event  pages](/?p=pages-event).


### Variables
~~~~
"agenda": {
  "agendaName": string (required),
  "agendaTabs":[
    {
      "tabTitle": string (required),
      "tabId": string (required),
      "table": (see "Agenda Table" molecule)
    },
    {
      "tabTitle": string (required),
      "tabId": "thur-jan-18",
      "table": (see "Agenda Table" molecule)
    },
    { ... }
  ]
}
~~~~

