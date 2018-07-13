---
title: Alert
---

### Description
Alerts users about timely things at AMA.

[EWL-5444](https://issues.ama-assn.org/browse/EWL-5444)

### Variables
~~~~
  alert: {
    paragraph:
      type: text / required
    button: {
      href:
        type: text (url) / required
      info:
        type: text / required
      text:
        type: text / required
      type:
        type: text / required ("button")
      style:
        type: text / required ("homepage--secondary")
      size:
        type: text / optional (empty)
    }
  }
~~~~
